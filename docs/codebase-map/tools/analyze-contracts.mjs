/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Derives two facts about the repository that cannot be read off the directory structure, and
 * writes them into `docs/codebase-map/generated/`:
 *
 *  1. **The package dependency graph** — which package imports which, split by the area of the
 *     package doing the importing (runtime code vs. schematics vs. testing entry points vs.
 *     build tools) and by import kind (value, `import type`, dynamic `import()`). The split
 *     matters: `@angular/core` has no runtime dependency on any other package, but its bundled
 *     schematics import the compiler and `compiler-cli`, which looks like a cycle until the areas
 *     are separated.
 *
 *  2. **The compiler → runtime instruction contract** — every `ExternalReference` in
 *     `packages/compiler/src/render3/r3_identifiers.ts` is a symbol the compiler may emit a call
 *     to, and every one of them must exist in `packages/core`. This resolves each identifier to
 *     the file that declares it, and fails if any cannot be resolved.
 *
 * Usage:
 *   node docs/codebase-map/tools/analyze-contracts.mjs
 *
 * Exits non-zero if an emitted identifier has no declaration in `packages/core`, which would mean
 * the compiler can generate a call into a runtime symbol that does not exist.
 *
 * Like the other scripts here it has no dependencies and does not need a build.
 */

import {readdirSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const PACKAGES = join(REPO_ROOT, 'packages');
const OUT_DIR = join(REPO_ROOT, 'docs', 'codebase-map', 'generated');

/** Strips comments so that `import` statements inside JSDoc samples are not counted. */
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '');
}

const STATIC_IMPORT =
  /^\s*(?:export|import)\s+(type\s+)?[^;'"]*?from\s*['"](@angular\/[^'"]+)['"]/gm;
const DYNAMIC_IMPORT = /import\s*\(\s*['"](@angular\/[^'"]+)['"]/g;

/** Which part of a package a file belongs to; cross-package edges mean different things per area. */
function areaOf(relPathInPackage) {
  if (relPathInPackage.startsWith('schematics/')) return 'schematics';
  if (relPathInPackage.startsWith('tools/')) return 'tools';
  if (relPathInPackage.startsWith('testing/') || relPathInPackage.includes('/testing/')) {
    return 'testing';
  }
  return 'runtime';
}

function* sourceFiles(dir) {
  let entries;
  try {
    entries = readdirSync(dir, {withFileTypes: true});
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'test' || entry.name === 'tests') {
        continue;
      }
      yield* sourceFiles(full);
    } else if (/\.m?ts$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      if (entry.name.includes('_spec.') || entry.name.includes('.spec.')) continue;
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

// ---------------------------------------------------------------------------
// 1. Dependency graph
// ---------------------------------------------------------------------------

function buildDependencyGraph() {
  /** @type {Map<string, number>} `from|to|area|kind` -> count */
  const edges = new Map();
  const bump = (key) => edges.set(key, (edges.get(key) ?? 0) + 1);

  for (const pkg of packageNames()) {
    const pkgDir = join(PACKAGES, pkg);
    for (const file of sourceFiles(pkgDir)) {
      const relInPkg = relative(pkgDir, file).split(sep).join('/');
      const area = areaOf(relInPkg);
      const source = stripComments(readFileSync(file, 'utf8'));

      for (const m of source.matchAll(STATIC_IMPORT)) {
        const target = m[2].split('/')[1];
        if (target !== pkg) bump(`${pkg}|${target}|${area}|${m[1] ? 'type' : 'value'}`);
      }
      for (const m of source.matchAll(DYNAMIC_IMPORT)) {
        const target = m[1].split('/')[1];
        if (target !== pkg) bump(`${pkg}|${target}|${area}|dynamic`);
      }
    }
  }
  return edges;
}

// ---------------------------------------------------------------------------
// 2. Compiler → runtime instruction contract
// ---------------------------------------------------------------------------

// The static field name can itself contain `ɵ` (e.g. `static ɵɵdefineInjectable`), and JavaScript's
// `\w` is ASCII-only, so the field pattern has to spell out the non-ASCII characters it may hold.
//
// The `: o.ExternalReference` annotation is optional in the source — the four type-checking entries
// at the end of `Identifiers` omit it and are inferred instead. Requiring it silently dropped them
// from this contract, so they are matched either way.
const IDENTIFIER_ENTRY =
  /static\s+([\w$ɵ]+)\s*(?::\s*o\.ExternalReference\s*)?=\s*\{\s*name:\s*'([^']+)'\s*,\s*moduleName:\s*([\w$]+)/g;

function emittedIdentifiers() {
  const file = join(PACKAGES, 'compiler', 'src', 'render3', 'r3_identifiers.ts');
  const source = readFileSync(file, 'utf8');
  return [...source.matchAll(IDENTIFIER_ENTRY)].map((m) => ({
    field: m[1],
    name: m[2],
    moduleName: m[3],
  }));
}

const DECLARATION =
  /^export\s+(?:declare\s+)?(?:abstract\s+)?(?:async\s+)?(?:function\*?|class|interface|type|enum|const enum|const|let|var)\s+([A-Za-z_$ɵ][\w$ɵ]*)/gm;
/** `foo as ɵɵbar` in a re-export barrel. */
const ALIAS = /([A-Za-z_$][\w$]*)\s+as\s+([ɵ][\w$ɵ]*)/g;

function coreDeclarations() {
  /** @type {Map<string, string>} symbol -> repo-relative file that declares or aliases it */
  const declarations = new Map();
  const aliases = new Map();
  for (const file of sourceFiles(join(PACKAGES, 'core'))) {
    const rel = relative(REPO_ROOT, file).split(sep).join('/');
    const source = readFileSync(file, 'utf8');
    for (const m of source.matchAll(DECLARATION)) {
      if (!declarations.has(m[1])) declarations.set(m[1], rel);
    }
    for (const m of source.matchAll(ALIAS)) {
      if (!aliases.has(m[2])) aliases.set(m[2], {file: rel, original: m[1]});
    }
  }
  return {declarations, aliases};
}

function resolveIdentifiers(identifiers, {declarations, aliases}) {
  return identifiers.map((id) => {
    if (declarations.has(id.name)) {
      return {...id, declaredIn: declarations.get(id.name), via: null};
    }
    const alias = aliases.get(id.name);
    if (alias && declarations.has(alias.original)) {
      return {...id, declaredIn: declarations.get(alias.original), via: alias.original};
    }
    if (alias) return {...id, declaredIn: alias.file, via: alias.original};
    return {...id, declaredIn: null, via: null};
  });
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

const GENERATED_HEADER = `<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/analyze-contracts.mjs
-->
`;

function writeDependencyGraph(edges) {
  const rows = [...edges.entries()]
    .map(([key, count]) => {
      const [from, to, area, kind] = key.split('|');
      return {from, to, area, kind, count};
    })
    .sort(
      (a, b) =>
        a.from.localeCompare(b.from) || a.to.localeCompare(b.to) || a.area.localeCompare(b.area),
    );

  const lines = [
    GENERATED_HEADER,
    '# Package dependency graph',
    '',
    'Cross-package imports between `packages/*`, counted from source with comments stripped',
    '(so `import` statements inside JSDoc samples are not counted) and with specs and `test/`',
    'directories excluded.',
    '',
    '- **area** — where in the importing package the import lives. `runtime` is shipped code;',
    '  `schematics` is the bundled `ng update`/`ng generate` code; `testing` is a testing entry',
    '  point; `tools` is a build-time CLI. Only `runtime` edges constrain the layering of the',
    '  shipped framework.',
    '- **kind** — `value` is a normal import, `type` is `import type` (erased at build time),',
    '  `dynamic` is `import()` (a lazily loaded, optional dependency).',
    '',
    '| From | To | Area | Kind | Imports |',
    '| --- | --- | --- | --- | ---: |',
  ];
  for (const r of rows) {
    lines.push(`| \`${r.from}\` | \`@angular/${r.to}\` | ${r.area} | ${r.kind} | ${r.count} |`);
  }

  const runtimeTargets = new Map();
  for (const r of rows) {
    if (r.area !== 'runtime') continue;
    if (!runtimeTargets.has(r.from)) runtimeTargets.set(r.from, new Set());
    runtimeTargets.get(r.from).add(r.to);
  }
  lines.push(
    '',
    '## Runtime dependencies only',
    '',
    'The same data reduced to shipped code, which is the layering that actually constrains the',
    'framework. Packages with no row here depend on nothing else in the repository.',
    '',
    '| Package | Depends on |',
    '| --- | --- |',
  );
  for (const pkg of packageNames()) {
    const deps = runtimeTargets.get(pkg);
    if (!deps) continue;
    lines.push(
      `| \`${pkg}\` | ${[...deps]
        .sort()
        .map((d) => `\`${d}\``)
        .join(', ')} |`,
    );
  }
  const leaves = packageNames().filter((p) => !runtimeTargets.has(p));
  lines.push('', `No runtime dependencies: ${leaves.map((p) => `\`${p}\``).join(', ')}.`, '');

  writeFileSync(join(OUT_DIR, 'package-dependencies.md'), lines.join('\n'), 'utf8');
  return {rows, runtimeTargets};
}

function writeInstructionMap(resolved) {
  const byFile = new Map();
  for (const id of resolved) {
    const key = id.declaredIn ?? '(unresolved)';
    if (!byFile.has(key)) byFile.set(key, []);
    byFile.get(key).push(id);
  }

  const lines = [
    GENERATED_HEADER,
    '# Compiler → runtime instruction contract',
    '',
    `\`packages/compiler/src/render3/r3_identifiers.ts\` declares ${resolved.length} symbols the`,
    'compiler may emit references to. Every one of them must be declared in `packages/core`; this',
    'table resolves each to the file that declares it, grouped by that file. A symbol reached',
    'through a re-export alias (for example `setClassMetadata as ɵsetClassMetadata`) shows the',
    'original name in the `via` column.',
    '',
  ];

  for (const [file, ids] of [...byFile.entries()].sort((a, b) => b[1].length - a[1].length)) {
    lines.push(`## \`${file}\` — ${ids.length}`, '');
    lines.push('| Emitted symbol | via |', '| --- | --- |');
    for (const id of ids.sort((a, b) => a.name.localeCompare(b.name))) {
      lines.push(`| \`${id.name}\` | ${id.via ? `\`${id.via}\`` : '—'} |`);
    }
    lines.push('');
  }

  writeFileSync(join(OUT_DIR, 'instruction-contract.md'), lines.join('\n'), 'utf8');
}

function main() {
  mkdirSync(OUT_DIR, {recursive: true});

  const edges = buildDependencyGraph();
  const {rows} = writeDependencyGraph(edges);

  const identifiers = emittedIdentifiers();
  const resolved = resolveIdentifiers(identifiers, coreDeclarations());
  writeInstructionMap(resolved);

  const unresolved = resolved.filter((id) => id.declaredIn === null);
  console.log(
    `dependency graph: ${rows.length} edges across ${new Set(rows.map((r) => r.from)).size} packages`,
  );
  console.log(
    `instruction contract: ${resolved.length} emitted symbols, ` +
      `${resolved.length - unresolved.length} resolved in packages/core`,
  );
  if (unresolved.length > 0) {
    console.error('\nEmitted symbols with no declaration in packages/core:');
    for (const id of unresolved) console.error(`  ${id.name} (Identifiers.${id.field})`);
    process.exitCode = 1;
  }
}

main();
