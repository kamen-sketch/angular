/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Checks the liveness of the Angular DevTools message protocol and writes
 * `docs/codebase-map/generated/devtools-protocol.md`.
 *
 * DevTools runs in two isolated contexts that can only talk over a `MessageBus`: the panel UI
 * (`devtools/projects/ng-devtools`) and the in-page agent (`devtools/projects/ng-devtools-backend`),
 * with the extension shell relaying between them. The `Events` interface in
 * `devtools/projects/protocol/src/lib/messages.ts` is the contract.
 *
 * TypeScript already guarantees that every `emit`/`on`/`once` names a *declared* event — the bus is
 * generic over `keyof T`. What it cannot see is whether each declared event is actually wired at
 * both ends. An event nothing emits is dead weight in the contract; an event nothing listens to is
 * a message sent into the void. Both are invisible to the compiler and to tests, because each side
 * type-checks in isolation.
 *
 * Usage:
 *   node docs/codebase-map/tools/analyze-devtools-protocol.mjs
 *
 * Exits non-zero when a declared event has no emitter or no listener anywhere in the repository.
 */

import {readdirSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const DEVTOOLS = join(REPO_ROOT, 'devtools');
const PROTOCOL = join(DEVTOOLS, 'projects/protocol/src/lib/messages.ts'.split('/').join(sep));
const OUT_DIR = join(REPO_ROOT, 'docs', 'codebase-map', 'generated');

/** Which side of the bus a file sits on. */
function sideOf(relPath) {
  if (relPath.startsWith('devtools/projects/ng-devtools-backend/')) return 'backend';
  if (relPath.startsWith('devtools/projects/ng-devtools/')) return 'panel';
  if (relPath.startsWith('devtools/projects/shell-browser/')) return 'shell';
  if (relPath.startsWith('devtools/src/')) return 'dev harness';
  if (relPath.startsWith('devtools/projects/demo-no-zone/')) return 'demo';
  return 'other';
}

/** `handshake: () => void;` — one entry of the `Events` interface. */
const EVENT_DECL = /^\s{2}([a-zA-Z][\w]*)\s*:\s*\(/gm;
/**
 * `messageBus.emit('topic'` / `this._messageBus.on('topic'` / `bus.once('topic'`.
 *
 * The receiver has to be named, not just any `.on('…')`: DevTools also uses d3 selections, whose
 * `.on('click', …)` is otherwise indistinguishable from a bus subscription.
 */
const BUS_CALL = /([A-Za-z_$][\w$]*)\.(emit|on|once)\(\s*['"]([a-zA-Z][\w]*)['"]/g;
/** Receivers that are message buses. */
const IS_BUS = /(?:^bus$|[Mm]essageBus$)/;

/**
 * The extension shell does not use a `MessageBus`. It relays the same protocol over raw
 * `chrome.runtime` ports, sending `postMessage({topic: 'x', args: [...]})` and switching on
 * `message.topic === 'x'`. Those uses carry no types at all, so they matter more to this analysis
 * than the bus ones, not less.
 */
const RAW_EMIT = /topic:\s*['"]([a-zA-Z][\w]*)['"]/g;
const RAW_LISTEN = /\.topic\s*===\s*['"]([a-zA-Z][\w]*)['"]/g;

function declaredEvents() {
  const source = readFileSync(PROTOCOL, 'utf8');
  const body = source.slice(source.indexOf('export interface Events {'));
  const end = body.indexOf('\n}');
  return [...body.slice(0, end).matchAll(EVENT_DECL)].map((m) => m[1]);
}

function* sourceFiles(dir) {
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(full);
    else if (entry.name.endsWith('.ts')) yield full;
  }
}

function collectUsages() {
  /** @type {Map<string, {emit: Set<string>, listen: Set<string>, emitProd: boolean, listenProd: boolean, raw: boolean}>} */
  const usages = new Map();

  const record = (topic, bucket, side, isSpec, viaRaw) => {
    if (!usages.has(topic)) {
      usages.set(topic, {
        emit: new Set(),
        listen: new Set(),
        emitProd: false,
        listenProd: false,
        raw: false,
      });
    }
    const u = usages.get(topic);
    u[bucket].add(isSpec ? `${side} (spec)` : side);
    if (!isSpec) {
      u[bucket === 'emit' ? 'emitProd' : 'listenProd'] = true;
      if (viaRaw) u.raw = true;
    }
  };

  for (const file of sourceFiles(DEVTOOLS)) {
    const rel = relative(REPO_ROOT, file).split(sep).join('/');
    const isSpec = /\.spec\.ts$|_spec\.ts$/.test(rel);
    const side = sideOf(rel);
    const source = readFileSync(file, 'utf8');

    for (const m of source.matchAll(BUS_CALL)) {
      const [, receiver, kind, topic] = m;
      if (!IS_BUS.test(receiver)) continue;
      record(topic, kind === 'emit' ? 'emit' : 'listen', side, isSpec, false);
    }
    for (const m of source.matchAll(RAW_EMIT)) record(m[1], 'emit', side, isSpec, true);
    for (const m of source.matchAll(RAW_LISTEN)) record(m[1], 'listen', side, isSpec, true);
  }
  return usages;
}

function main() {
  mkdirSync(OUT_DIR, {recursive: true});
  const events = declaredEvents();
  const usages = collectUsages();
  const problems = [];

  const rows = events.map((name) => {
    const u = usages.get(name) ?? {
      emit: new Set(),
      listen: new Set(),
      emitProd: false,
      listenProd: false,
      raw: false,
    };
    if (!u.emitProd) problems.push(`\`${name}\` is declared but nothing outside specs emits it`);
    if (!u.listenProd)
      problems.push(`\`${name}\` is declared but nothing outside specs listens for it`);
    return {name, emit: [...u.emit].sort(), listen: [...u.listen].sort(), raw: u.raw};
  });

  // A topic used on the typed bus but absent from `Events` would not compile; the raw port
  // envelope is unchecked, though, so an undeclared topic there is a real gap. Specs are exempt:
  // they synthesise topics like `test` to exercise the relay itself.
  for (const [topic, u] of usages) {
    if (!events.includes(topic) && (u.emitProd || u.listenProd)) {
      problems.push(
        `\`${topic}\` travels over the port envelope but is not declared in \`Events\``,
      );
    }
  }

  const lines = [
    '<!--',
    '  GENERATED FILE — do not edit by hand.',
    '  Regenerate with: node docs/codebase-map/tools/analyze-devtools-protocol.mjs',
    '-->',
    '',
    '# DevTools message protocol',
    '',
    `The ${events.length} events declared in`,
    '`devtools/projects/protocol/src/lib/messages.ts`, with the side of the bus that emits each and',
    'the side that listens. See [`../22-devtools-protocol.md`](../22-devtools-protocol.md).',
    '',
    "The **raw** column marks events that travel over the shell's untyped `{topic, args}` port",
    'envelope rather than the typed `MessageBus`.',
    '',
    '| Event | Emitted by | Listened to by | Raw |',
    '| --- | --- | --- | :-: |',
  ];
  for (const r of rows) {
    lines.push(
      `| \`${r.name}\` | ${r.emit.length ? r.emit.join(', ') : '**nothing**'} | ` +
        `${r.listen.length ? r.listen.join(', ') : '**nothing**'} | ${r.raw ? 'yes' : '—'} |`,
    );
  }

  writeFileSync(join(OUT_DIR, 'devtools-protocol.md'), lines.join('\n') + '\n', 'utf8');

  const wired = rows.filter((r) => r.emit.length && r.listen.length).length;
  console.log(`protocol: ${events.length} events declared, ${wired} wired at both ends`);
  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exitCode = 1;
  } else {
    console.log('every declared event has an emitter and a listener.');
  }
}

main();
