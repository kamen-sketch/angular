/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Generates the mechanical half of `docs/codebase-map`: for every source file in the
 * repository, one entry listing the symbols it exports and the modules it re-exports from.
 *
 * The hand-written map files (`docs/codebase-map/*.md`) explain *why* the code is shaped the
 * way it is; the generated index is the exhaustive *where*, so that no file in the repository
 * is left unaccounted for.
 *
 * Usage:
 *   node docs/codebase-map/tools/generate-index.mjs
 *
 * Writes:
 *   docs/codebase-map/generated/index-<group>.md  (one per package / app, e.g. `packages/core`)
 *   docs/codebase-map/generated/summary.md        (per-root and per-package totals)
 *
 * The script deliberately has no dependencies (not even TypeScript): it must be runnable in a
 * bare checkout, before `pnpm install`, so that the map can be refreshed at any time.
 */

import {readdirSync, readFileSync, statSync, writeFileSync, mkdirSync} from 'node:fs';
import {join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const OUT_DIR = join(REPO_ROOT, 'docs', 'codebase-map', 'generated');

/** Top-level directories that hold first-party source worth indexing. */
const ROOTS = ['packages', 'devtools', 'adev', 'modules', 'tools', 'integration', 'scripts'];

/** Directories that never contain first-party source. */
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'bazel-out',
  'bazel-bin',
  '.angular',
  '__snapshots__',
]);

const SOURCE_EXT = ['.ts', '.tsx', '.mts', '.cts', '.js', '.mjs', '.cjs'];

/**
 * Top-level `export <kind> <name>` declarations. Angular source is formatted by Prettier, so
 * top-level declarations reliably start at column 0 and this stays accurate without a parser.
 */
const DECL_RE =
  /^export\s+(?:declare\s+)?(?:abstract\s+)?(?:async\s+)?(function\*?|class|interface|type|enum|const enum|const|let|var|namespace)\s+([A-Za-z_$][\w$]*)/gm;
/** `export * from '...'` / `export * as ns from '...'`. */
const STAR_RE = /^export\s+\*(?:\s+as\s+([\w$]+))?\s+from\s+['"]([^'"]+)['"]/gm;
/** `export {a, b as c} from '...'` and bare `export {a, b}`. */
const NAMED_RE = /^export\s*\{([^}]*)\}\s*(?:from\s*['"]([^'"]+)['"])?/gms;
/** `export default ...`. */
const DEFAULT_RE = /^export\s+default\s/m;

/** Classifies a file so the index can separate implementation from tests and typings. */
function classify(path) {
  const p = path.split(sep).join('/');
  const base = p.slice(p.lastIndexOf('/') + 1);
  if (base.endsWith('.d.ts')) return 'typings';
  if (/(^|[._-])(spec|test)\.(m|c)?[jt]sx?$/.test(base) || base.endsWith('_spec.ts')) return 'spec';
  if (/(^|\/)(test|tests|testing)\//.test(p)) return 'test-support';
  return 'src';
}

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, {withFileTypes: true});
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.ng-dev') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (SOURCE_EXT.some((ext) => entry.name.endsWith(ext))) {
      yield full;
    }
  }
}

/** Extracts the export surface of a single source file. */
function describe(absPath) {
  const source = readFileSync(absPath, 'utf8');
  const decls = [];
  for (const m of source.matchAll(DECL_RE)) {
    decls.push({kind: m[1], name: m[2]});
  }
  const stars = [];
  for (const m of source.matchAll(STAR_RE)) {
    stars.push({as: m[1] ?? null, from: m[2]});
  }
  const named = [];
  for (const m of source.matchAll(NAMED_RE)) {
    const items = m[1]
      .split(',')
      .map((s) => s.trim().replace(/\s+/g, ' '))
      .filter(Boolean);
    if (items.length) named.push({items, from: m[2] ?? null});
  }
  return {
    lines: source.length === 0 ? 0 : source.split('\n').length,
    decls,
    stars,
    named,
    hasDefault: DEFAULT_RE.test(source),
    kind: classify(absPath),
  };
}

/** Renders one file's entry as a compact Markdown list item. */
function renderFile(relPath, info) {
  const parts = [`- \`${relPath}\` — ${info.lines} lines`];
  if (info.kind !== 'src') parts.push(` _(${info.kind})_`);
  const lines = [parts.join('')];

  if (info.decls.length) {
    const grouped = new Map();
    for (const d of info.decls) {
      if (!grouped.has(d.kind)) grouped.set(d.kind, []);
      grouped.get(d.kind).push(d.name);
    }
    for (const [kind, names] of grouped) {
      lines.push(`  - ${kind}: ${names.map((n) => `\`${n}\``).join(', ')}`);
    }
  }
  for (const s of info.stars) {
    lines.push(`  - re-exports${s.as ? ` as \`${s.as}\`` : ' *'} from \`${s.from}\``);
  }
  for (const n of info.named) {
    const from = n.from ? ` from \`${n.from}\`` : '';
    const shown = n.items
      .slice(0, 24)
      .map((i) => `\`${i}\``)
      .join(', ');
    const more = n.items.length > 24 ? `, …(+${n.items.length - 24})` : '';
    lines.push(`  - exports ${shown}${more}${from}`);
  }
  if (info.hasDefault) lines.push('  - has a default export');
  return lines.join('\n');
}

const HEADER = (group, fileCount) => `<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — \`${group}/\`

${fileCount} indexed source files. Each entry lists the file's top-level exported symbols,
its \`export * from\` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [\`../README.md\`](../README.md) for how this index relates to the hand-written maps.

`;

/** `packages/core/src/di/index.ts` -> `packages/core`; `scripts/foo.mjs` -> `scripts`. */
function groupOf(relPath) {
  const segments = relPath.split('/');
  return segments.length > 2 ? `${segments[0]}/${segments[1]}` : segments[0];
}

function main() {
  mkdirSync(OUT_DIR, {recursive: true});
  const summary = [];

  for (const root of ROOTS) {
    const rootAbs = join(REPO_ROOT, root);
    try {
      if (!statSync(rootAbs).isDirectory()) continue;
    } catch {
      continue;
    }

    let fileCount = 0;
    let declCount = 0;
    let lineCount = 0;
    /** @type {Map<string, {files: number, decls: number, lines: number}>} */
    const byGroup = new Map();
    /** @type {Map<string, Map<string, string[]>>} group -> directory -> rendered entries */
    const entries = new Map();

    for (const abs of walk(rootAbs)) {
      const rel = relative(REPO_ROOT, abs).split(sep).join('/');
      const info = describe(abs);
      fileCount++;
      declCount += info.decls.length;
      lineCount += info.lines;

      const group = groupOf(rel);
      const dir = rel.slice(0, rel.lastIndexOf('/'));
      if (!entries.has(group)) entries.set(group, new Map());
      const byDir = entries.get(group);
      if (!byDir.has(dir)) byDir.set(dir, []);
      byDir.get(dir).push(renderFile(rel, info));

      if (!byGroup.has(group)) byGroup.set(group, {files: 0, decls: 0, lines: 0});
      const g = byGroup.get(group);
      g.files++;
      g.decls += info.decls.length;
      g.lines += info.lines;
    }

    if (fileCount === 0) continue;

    for (const [group, byDir] of entries) {
      const chunks = [HEADER(group, byGroup.get(group).files)];
      for (const dir of [...byDir.keys()].sort()) {
        chunks.push(`\n## \`${dir}/\`\n`);
        chunks.push(byDir.get(dir).sort().join('\n'));
        chunks.push('\n');
      }
      const slug = group.split('/').join('-');
      writeFileSync(join(OUT_DIR, `index-${slug}.md`), chunks.join('\n'), 'utf8');
    }

    summary.push({root, fileCount, declCount, lineCount, byGroup});
  }

  const lines = [
    '<!--',
    '  GENERATED FILE — do not edit by hand.',
    '  Regenerate with: node docs/codebase-map/tools/generate-index.mjs',
    '-->',
    '',
    '# Codebase size summary',
    '',
    'Counts cover first-party source only (see `ROOTS`/`SKIP_DIRS` in the generator).',
    '',
    '| Root | Files | Exported declarations | Lines |',
    '| --- | ---: | ---: | ---: |',
  ];
  let totalFiles = 0;
  let totalDecls = 0;
  let totalLines = 0;
  for (const s of summary) {
    lines.push(
      `| \`${s.root}/\` | ${s.fileCount} | ${s.declCount} | ${s.lineCount.toLocaleString('en-US')} |`,
    );
    totalFiles += s.fileCount;
    totalDecls += s.declCount;
    totalLines += s.lineCount;
  }
  lines.push(
    `| **total** | **${totalFiles}** | **${totalDecls}** | **${totalLines.toLocaleString('en-US')}** |`,
    '',
    '## Per package / app',
    '',
    '| Group | Files | Exported declarations | Lines |',
    '| --- | ---: | ---: | ---: |',
  );
  const groups = [];
  for (const s of summary) {
    for (const [group, g] of s.byGroup) groups.push([group, g]);
  }
  groups.sort((a, b) => b[1].lines - a[1].lines);
  for (const [group, g] of groups) {
    const slug = group.split('/').join('-');
    lines.push(
      `| [\`${group}\`](./index-${slug}.md) | ${g.files} | ${g.decls} | ${g.lines.toLocaleString('en-US')} |`,
    );
  }
  writeFileSync(join(OUT_DIR, 'summary.md'), lines.join('\n') + '\n', 'utf8');

  console.log(`Indexed ${totalFiles} files across ${summary.length} roots into ${OUT_DIR}`);
}

main();
