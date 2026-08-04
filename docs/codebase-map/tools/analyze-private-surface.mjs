/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Measures the `ɵ`-prefixed private surface — the API Angular's packages expose to each other but
 * not to applications — and writes `docs/codebase-map/generated/private-surface.md`.
 *
 * `contributing-docs/public-api-surface.md` excludes anything prefixed with `ɵ` from the public API,
 * and the goldens leave it out accordingly. That makes it invisible to the record reviewers read
 * ([21](../21-api-surface.md)), even though it is what actually couples the packages: `@angular/router`
 * cannot be built without `ɵRuntimeError`, and renaming that symbol breaks seven packages at once.
 *
 * The measurement distinguishes the ways a private symbol is reached, because they carry different
 * obligations:
 *
 *  - through the package entry point (`from '@angular/core'`) — a real cross-entry-point contract;
 *  - relatively from inside the declaring package — the prefix is then only about what gets
 *    published, not about coupling;
 *  - emitted by the compiler, which is the separate contract in
 *    `packages/compiler/src/render3/r3_identifiers.ts` ([19](../19-layering-and-contracts.md));
 *  - only from tests, which pins the symbol without any shipping code depending on it.
 *
 * Tests are counted separately rather than skipped. Skipping them is tempting — a spec is not a
 * shipping dependant — but it turns every symbol a spec is the sole importer of into a false
 * "nothing uses this" finding, and there are dozens of those.
 *
 * Usage:
 *   node docs/codebase-map/tools/analyze-private-surface.mjs
 *
 * Exits non-zero when a package imports a `ɵ` symbol its provider does not export.
 */

import {readdirSync, readFileSync, writeFileSync, mkdirSync, statSync} from 'node:fs';
import {join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const PACKAGES = join(REPO_ROOT, 'packages');
const OUT_DIR = join(REPO_ROOT, 'docs', 'codebase-map', 'generated');
const SCANNED_ROOTS = ['packages', 'devtools', 'adev', 'modules', 'integration'];

/**
 * `ɵ` is not an ASCII word character, so every pattern that touches these names has to admit it
 * explicitly — a `[\w$]*` identifier class silently skips the entire private surface.
 */
const PRIVATE_NAME = 'ɵ[A-Za-z0-9_$ɵ]*';

/**
 * An `export { … }` block, with or without a `from` clause. Both forms publish the names inside it.
 *
 * Matching the block rather than the individual names is what keeps imports out: a bare
 * `^\s*(ɵ…)\s*,?$` line pattern cannot tell `import {ɵRuntimeError} from '@angular/core'` from an
 * export, so it credits every package that *uses* a private symbol with *providing* it.
 */
const EXPORT_BLOCK = /export\s*\{([^}]*)\}/g;
const DECL_EXPORT = new RegExp(
  String.raw`^export\s+(?:declare\s+)?(?:abstract\s+)?(?:function\*?|class|interface|type|enum|const enum|const|let|var)\s+(${PRIVATE_NAME})`,
  'gm',
);
const IS_PRIVATE = new RegExp(String.raw`^${PRIVATE_NAME}$`);

/** The names an `export { … }` block publishes — the right-hand side of each `as`. */
function* exportedNames(block) {
  for (const specifier of block.split(',')) {
    const parts = specifier
      .trim()
      .replace(/^type\s+/, '')
      .split(/\s+as\s+/);
    const name = (parts.length > 1 ? parts[1] : parts[0]).trim();
    if (IS_PRIVATE.test(name)) yield name;
  }
}
/**
 * Both forms reach a symbol from another module. `export {ɵX} from '@angular/core/testing'` is easy
 * to overlook, but it is how the private surface is threaded between entry points — dropping it
 * reports genuinely re-exported symbols as having no consumer.
 */
const IMPORT = /^\s*(?:import|export)\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/gms;
/** The compiler's table of symbols it may emit. */
const EMITTED = /name:\s*'(ɵ[^']+)'/g;

/**
 * Removes comments while preserving line structure, so patterns anchored with `^` keep working.
 *
 * Stripping matters more than it looks: prose in a JSDoc comment reads like code to a regular
 * expression. `* Preserve an original def (such as ɵmod, ɵinj, etc)` matches an `\bas\s+(ɵ…)`
 * alias-export pattern on the English word "as", which is how `ɵmod` — a property name that no
 * package exports — first appeared in this report as a `core` export.
 */
function stripComments(source) {
  return source
    .replace(/\/\*(?:[^*]|\*(?!\/))*\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/^([ \t]*)\/\/.*$/gm, '$1');
}

function* sourceFiles(dir, {includeTests = false} = {}) {
  let entries;
  try {
    entries = readdirSync(dir, {withFileTypes: true});
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!includeTests && (entry.name === 'test' || entry.name === 'tests')) continue;
      yield* sourceFiles(full, {includeTests});
    } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
      yield full;
    }
  }
}

function packageNames() {
  return readdirSync(PACKAGES, {withFileTypes: true})
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

/** Every `ɵ` name a package declares or re-exports under, with the file it comes from. */
function privateExports(pkg) {
  const found = new Map();
  for (const file of sourceFiles(join(PACKAGES, pkg))) {
    const rel = relative(REPO_ROOT, file).split(sep).join('/');
    const source = stripComments(readFileSync(file, 'utf8'));
    DECL_EXPORT.lastIndex = 0;
    for (const m of source.matchAll(DECL_EXPORT)) if (!found.has(m[1])) found.set(m[1], rel);
    EXPORT_BLOCK.lastIndex = 0;
    for (const m of source.matchAll(EXPORT_BLOCK)) {
      for (const name of exportedNames(m[1])) if (!found.has(name)) found.set(name, rel);
    }
  }
  return found;
}

function main() {
  mkdirSync(OUT_DIR, {recursive: true});

  const packages = packageNames();
  const exportsByPackage = new Map(packages.map((p) => [p, privateExports(p)]));

  const emitted = new Set(
    [
      ...readFileSync(
        join(PACKAGES, 'compiler/src/render3/r3_identifiers.ts'.split('/').join(sep)),
        'utf8',
      ).matchAll(EMITTED),
    ].map((m) => m[1]),
  );

  /** `provider|symbol` -> usage record */
  const usage = new Map();
  /** `consumer|provider` -> Set of symbols */
  const edges = new Map();
  const unresolved = [];

  const record = (key) => {
    if (!usage.has(key)) {
      usage.set(key, {
        sites: 0,
        consumers: new Set(),
        entryPoint: false,
        relative: false,
        testOnly: true,
      });
    }
    return usage.get(key);
  };

  for (const root of SCANNED_ROOTS) {
    const rootDir = join(REPO_ROOT, root);
    try {
      if (!statSync(rootDir).isDirectory()) continue;
    } catch {
      continue;
    }
    for (const file of sourceFiles(rootDir, {includeTests: true})) {
      const rel = relative(REPO_ROOT, file).split(sep).join('/');
      // `packages/<pkg>/testing/` is a published entry point (`@angular/core/testing`), so its
      // imports are shipping consumers. Only `test/` directories and spec files are tests.
      const isTest = rel.includes('_spec.') || rel.includes('.spec.') || /(^|\/)tests?\//.test(rel);
      const owner = rel.startsWith('packages/') ? rel.split('/')[1] : null;
      const source = stripComments(readFileSync(file, 'utf8'));

      IMPORT.lastIndex = 0;
      for (const m of source.matchAll(IMPORT)) {
        const module = m[2];
        const names = m[1]
          .split(',')
          .map((i) =>
            i
              .trim()
              .split(/\s+as\s+/)[0]
              .trim(),
          )
          .filter((n) => n.startsWith('ɵ'));
        if (names.length === 0) continue;

        const viaEntryPoint = module.startsWith('@angular/');
        const provider = viaEntryPoint ? module.split('/')[1] : owner;
        if (!provider) continue;

        for (const name of names) {
          const u = record(`${provider}|${name}`);
          u.sites++;
          if (!isTest) u.testOnly = false;
          if (viaEntryPoint) {
            u.entryPoint = true;
            if (!isTest) u.consumers.add(owner ?? root);
            if (owner && owner !== provider && !isTest) {
              const edge = `${owner}|${provider}`;
              if (!edges.has(edge)) edges.set(edge, new Set());
              edges.get(edge).add(name);
            }
            if (exportsByPackage.has(provider) && !exportsByPackage.get(provider).has(name)) {
              unresolved.push(
                `${rel} imports \`${name}\` from \`@angular/${provider}\`, which does not export it`,
              );
            }
          } else {
            u.relative = true;
          }
        }
      }
    }
  }

  // --- report ---------------------------------------------------------------------------------
  const coreExports = exportsByPackage.get('core');
  const partition = {entryPoint: [], relativeOnly: [], emittedOnly: [], testOnly: [], none: []};
  for (const name of coreExports.keys()) {
    const u = usage.get(`core|${name}`);
    // A symbol the compiler emits is reached by generated code that never appears in this
    // repository, so that classification wins over an incidental test import.
    if (emitted.has(name)) partition.emittedOnly.push(name);
    else if (!u) partition.none.push(name);
    else if (u.testOnly) partition.testOnly.push(name);
    else if (u.entryPoint) partition.entryPoint.push(name);
    else partition.relativeOnly.push(name);
  }

  const lines = [
    '<!--',
    '  GENERATED FILE — do not edit by hand.',
    '  Regenerate with: node docs/codebase-map/tools/analyze-private-surface.mjs',
    '-->',
    '',
    '# The `ɵ` private surface',
    '',
    'Symbols excluded from the public API by the `ɵ` prefix, and how they are actually reached.',
    'See [`../25-private-surface.md`](../25-private-surface.md).',
    '',
    '## Where the private surface lives',
    '',
    'Every package that declares at least one `ɵ` name, and how many of them another package',
    'actually imports through its entry point.',
    '',
    '| Package | `ɵ` names published | Imported by other packages |',
    '| --- | ---: | ---: |',
    ...[...exportsByPackage]
      .map(([pkg, names]) => {
        const consumed = [...names.keys()].filter(
          (n) => (usage.get(`${pkg}|${n}`)?.consumers.size ?? 0) > 0,
        ).length;
        return [pkg, names.size, consumed];
      })
      .filter(([, size]) => size > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([pkg, size, consumed]) => `| \`${pkg}\` | ${size} | ${consumed} |`),
    '',
    '## `@angular/core`',
    '',
    `${coreExports.size} \`ɵ\` names, partitioned by consumer:`,
    '',
    '| Reached | Symbols |',
    '| --- | ---: |',
    `| as a compiler-emitted instruction | ${partition.emittedOnly.length} |`,
    `| through \`@angular/core\` by shipping code | ${partition.entryPoint.length} |`,
    `| only relatively, inside core | ${partition.relativeOnly.length} |`,
    `| only from tests | ${partition.testOnly.length} |`,
    `| no consumer in this repository | ${partition.none.length} |`,
    '',
    '## Cross-package private dependencies',
    '',
    "Each row is one package importing another package's `ɵ` symbols through its entry point, from",
    'shipping code (tests excluded).',
    '',
    '| Consumer | Provider | Distinct symbols |',
    '| --- | --- | ---: |',
  ];
  for (const [edge, names] of [...edges].sort((a, b) => b[1].size - a[1].size)) {
    const [consumer, provider] = edge.split('|');
    lines.push(`| \`${consumer}\` | \`@angular/${provider}\` | ${names.size} |`);
  }

  const crossPackage = [...usage.entries()]
    .filter(([, u]) => u.consumers.size > 0)
    .sort((a, b) => b[1].consumers.size - a[1].consumers.size || b[1].sites - a[1].sites);
  lines.push(
    '',
    '## Most depended-on private symbols',
    '',
    '| Symbol | Provider | Consumers | Import sites |',
    '| --- | --- | ---: | ---: |',
  );
  for (const [key, u] of crossPackage.slice(0, 25)) {
    const [provider, name] = key.split('|');
    lines.push(
      `| \`${name}\` | \`@angular/${provider}\` | ${[...u.consumers].sort().join(', ')} | ${u.sites} |`,
    );
  }

  const list = (names) =>
    names
      .sort()
      .map((n) => `- \`${n}\``)
      .join('\n') || 'None.';
  lines.push(
    '',
    `## \`@angular/core\` symbols reached only from tests (${partition.testOnly.length})`,
    '',
    'Published as private API, but nothing that ships imports them here.',
    '',
    list(partition.testOnly),
    '',
    `## \`@angular/core\` symbols with no consumer in this repository (${partition.none.length})`,
    '',
    'Neither imported nor emitted anywhere in this repository — they exist for consumers outside it.',
    '',
    list(partition.none),
  );

  writeFileSync(join(OUT_DIR, 'private-surface.md'), lines.join('\n') + '\n', 'utf8');

  console.log(
    `private surface: core exports ${coreExports.size} ɵ names ` +
      `(${partition.emittedOnly.length} compiler-emitted, ${partition.entryPoint.length} via the entry ` +
      `point, ${partition.relativeOnly.length} internal, ${partition.testOnly.length} test-only, ` +
      `${partition.none.length} unconsumed here); ${edges.size} cross-package edges`,
  );
  if (unresolved.length) {
    console.error(`\n${unresolved.length} unresolved private import(s):`);
    for (const u of unresolved) console.error(`  - ${u}`);
    process.exitCode = 1;
  } else {
    console.log('every cross-package ɵ import resolves in its provider.');
  }
}

main();
