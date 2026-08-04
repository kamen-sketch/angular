/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Checks the references angular.dev's guides make into real source files, and writes
 * `docs/codebase-map/generated/docs-examples.md`.
 *
 * Guides do not inline their code. They point at it:
 *
 *     <docs-code path="adev/src/content/examples/…/app.component.ts" region="template"/>
 *
 * The `path` is repo-root-relative and the optional `region` names a block delimited by
 * `#docregion` / `#enddocregion` comments in that file (see
 * `adev/shared-docs/pipeline/shared/regions/region-parser.mts`). Both halves are plain strings:
 * nothing type-checks them, and nothing in a normal build fails when an example is renamed, moved,
 * or has its region markers reshuffled — the guide simply stops showing the code it meant to show.
 *
 * Usage:
 *   node docs/codebase-map/tools/analyze-docs-examples.mjs
 *
 * Exits non-zero when a referenced path does not exist, or a referenced region is not declared in
 * the file it points at.
 */

import {readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync} from 'node:fs';
import {join, relative, sep, extname} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const CONTENT = join(REPO_ROOT, 'adev', 'src', 'content');
const OUT_DIR = join(REPO_ROOT, 'docs', 'codebase-map', 'generated');

/** A `<docs-code …>` tag, self-closing or paired; attributes may span lines. */
const DOCS_CODE = /<docs-code(?:-multifile)?\b([\s\S]*?)(?:\/>|>)/g;
const ATTR = (name) => new RegExp(`\\b${name}="([^"]*)"`);

/**
 * The other half of the contract: API reference docs pull their examples from JSDoc with
 * `{@example <path> region='<name>'}`, where the path is relative to `packages/examples`
 * (`adev/shared-docs/pipeline/api-gen/extraction/interpolate_code_examples.mts`).
 */
const JSDOC_EXAMPLE = /\{@example\s+(\S+)\s+region=(['"])([^'"]+)\2\s*\}/g;
const EXAMPLES_ROOT = 'packages/examples';

/** Example projects live one level below these roots. */
const EXAMPLE_PROJECT_ROOTS = ['adev/src/content/examples', 'packages/examples'];

/**
 * Guides keep retired or not-yet-ready markup inside HTML comments, and those references are not
 * live — checking them reports failures for code that was deliberately parked. Comments are
 * blanked rather than deleted so that reported line numbers stay correct.
 */
function stripHtmlComments(markdown) {
  return markdown.replace(/<!--[\s\S]*?-->/g, (comment) => comment.replace(/[^\n]/g, ' '));
}

/**
 * The region-marker comment styles, from `regions/region-matchers/`. A region name list is
 * comma-separated, and an empty list means the whole file.
 */
const REGION_MARKERS = [
  /^\s*\/\/\s*#docregion\s*(.*?)\s*$/, // inline C: ts, js, mjs, es6, jade, pug, json
  /^\s*\/\*\s*#docregion\s*(.*?)\s*\*\/\s*$/, // block C: css
  /^\s*<!--\s*#docregion\s*(.*?)\s*(?:-->)?\s*$/, // html, svg
  /^\s*#\s*#docregion\s*(.*?)\s*$/, // inline hash: conf, yaml, yml, sh
];

function* filesWithExtension(dir, ext) {
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* filesWithExtension(full, ext);
    else if (entry.name.endsWith(ext)) yield full;
  }
}

function* markdownFiles(dir) {
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* markdownFiles(full);
    else if (entry.name.endsWith('.md')) yield full;
  }
}

/** All region names declared in a file, per the pipeline's own splitting rules. */
function declaredRegions(source) {
  const names = new Set();
  for (const line of source.split(/\r?\n/)) {
    for (const marker of REGION_MARKERS) {
      const m = marker.exec(line);
      if (!m) continue;
      const list = m[1].trim();
      if (list === '')
        names.add(''); // the whole-file region
      else for (const name of list.split(',')) names.add(name.trim());
      break;
    }
  }
  return names;
}

function main() {
  mkdirSync(OUT_DIR, {recursive: true});

  const references = [];
  for (const file of markdownFiles(CONTENT)) {
    const guide = relative(REPO_ROOT, file).split(sep).join('/');
    const source = stripHtmlComments(readFileSync(file, 'utf8'));
    for (const m of source.matchAll(DOCS_CODE)) {
      const attrs = m[1];
      const path = ATTR('path').exec(attrs)?.[1];
      if (!path) continue;
      references.push({
        guide,
        path,
        region: ATTR('region').exec(attrs)?.[1],
        line: source.slice(0, m.index).split('\n').length,
      });
    }
  }

  // `{@example}` references from JSDoc in the framework packages.
  for (const file of filesWithExtension(join(REPO_ROOT, 'packages'), '.ts')) {
    const rel = relative(REPO_ROOT, file).split(sep).join('/');
    const source = readFileSync(file, 'utf8');
    for (const m of source.matchAll(JSDOC_EXAMPLE)) {
      references.push({
        guide: rel,
        path: `${EXAMPLES_ROOT}/${m[1]}`,
        region: m[3],
        line: source.slice(0, m.index).split('\n').length,
        viaJsDoc: true,
      });
    }
  }

  const problems = [];
  const regionCache = new Map();
  let missingPaths = 0;
  let missingRegions = 0;

  const warnings = [];
  for (const ref of references) {
    const target = join(REPO_ROOT, ref.path.split('/').join(sep));
    if (!existsSync(target)) {
      const message = `${ref.guide}:${ref.line} points at \`${ref.path}\`, which does not exist`;
      // `packages/private` ships no docs, so the API extractor never processes its JSDoc and never
      // resolves these tags. The reference is still dangling, but it cannot break a build today.
      if (ref.guide.startsWith('packages/private/')) warnings.push(message);
      else problems.push(message);
      missingPaths++;
      continue;
    }
    // A `live` example points at a whole project directory rather than a single file.
    if (!statSync(target).isFile()) continue;
    if (ref.region === undefined || ref.region === '') continue;
    if (!regionCache.has(ref.path)) {
      regionCache.set(ref.path, declaredRegions(readFileSync(target, 'utf8')));
    }
    if (!regionCache.get(ref.path).has(ref.region)) {
      problems.push(
        `${ref.guide}:${ref.line} asks for region \`${ref.region}\` of \`${ref.path}\`, ` +
          `which declares no such region`,
      );
      missingRegions++;
    }
  }

  // Which files the guides draw from, and how heavily.
  const byTarget = new Map();
  for (const ref of references) {
    byTarget.set(ref.path, (byTarget.get(ref.path) ?? 0) + 1);
  }
  const byArea = new Map();
  for (const [path, n] of byTarget) {
    const area = path.startsWith('adev/src/content/examples/')
      ? 'adev/src/content/examples'
      : path.startsWith('packages/examples/')
        ? 'packages/examples'
        : path.startsWith('packages/')
          ? 'packages (framework source)'
          : path.split('/').slice(0, 2).join('/');
    byArea.set(area, (byArea.get(area) ?? 0) + n);
  }

  // The inverse question, which no build answers: which example projects does nothing reference?
  // A missing path fails the docs build loudly; an example nobody points at just accumulates.
  const referencedProjects = new Set();
  for (const ref of references) {
    for (const root of EXAMPLE_PROJECT_ROOTS) {
      if (ref.path.startsWith(`${root}/`)) {
        referencedProjects.add(`${root}/${ref.path.slice(root.length + 1).split('/')[0]}`);
      }
    }
  }
  const orphanProjects = [];
  for (const root of EXAMPLE_PROJECT_ROOTS) {
    const dir = join(REPO_ROOT, root.split('/').join(sep));
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
      const project = `${root}/${entry.name}`;
      if (!referencedProjects.has(project)) orphanProjects.push(project);
    }
  }

  const guides = new Set(references.map((r) => r.guide));
  const lines = [
    '<!--',
    '  GENERATED FILE — do not edit by hand.',
    '  Regenerate with: node docs/codebase-map/tools/analyze-docs-examples.mjs',
    '-->',
    '',
    '# Guide → example-code references',
    '',
    `${references.length} \`<docs-code path="…">\` references across ${guides.size} guide files,`,
    `pointing at ${byTarget.size} distinct source files;`,
    `${references.filter((r) => r.region).length} of them name a \`#docregion\`.`,
    '',
    'See [`../23-docs-examples.md`](../23-docs-examples.md).',
    '',
    '## Where the referenced code lives',
    '',
    '| Area | References |',
    '| --- | ---: |',
  ];
  for (const [area, n] of [...byArea].sort((a, b) => b[1] - a[1])) {
    lines.push(`| \`${area}\` | ${n} |`);
  }

  lines.push('', '## Most-referenced files', '', '| File | References |', '| --- | ---: |');
  for (const [path, n] of [...byTarget].sort((a, b) => b[1] - a[1]).slice(0, 25)) {
    lines.push(`| \`${path}\` | ${n} |`);
  }

  lines.push(
    '',
    `## Example projects nothing references (${orphanProjects.length})`,
    '',
    'Directories under the example roots that no `<docs-code>` and no `{@example}` points at.',
    'Nothing fails because of these — they are simply carried by the build without being rendered.',
    '',
  );
  lines.push(orphanProjects.length ? orphanProjects.map((p) => `- \`${p}\``).join('\n') : 'None.');

  lines.push(
    '',
    '## Guides with the most references',
    '',
    '| Guide | References |',
    '| --- | ---: |',
  );
  const byGuide = new Map();
  for (const ref of references) byGuide.set(ref.guide, (byGuide.get(ref.guide) ?? 0) + 1);
  for (const [guide, n] of [...byGuide].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    lines.push(`| \`${guide}\` | ${n} |`);
  }

  writeFileSync(join(OUT_DIR, 'docs-examples.md'), lines.join('\n') + '\n', 'utf8');

  console.log(
    `docs examples: ${references.length} references from ${guides.size} guides to ` +
      `${byTarget.size} files, ${references.filter((r) => r.region).length} with a region; ` +
      `${orphanProjects.length} example project(s) referenced by nothing`,
  );
  if (warnings.length) {
    console.warn(
      `\n${warnings.length} dangling reference(s) in packages that are not doc-extracted:`,
    );
    for (const w of warnings) console.warn(`  - ${w}`);
  }
  if (problems.length) {
    console.error(
      `\n${problems.length} broken reference(s) — ${missingPaths} missing file(s), ` +
        `${missingRegions} missing region(s):`,
    );
    for (const p of problems) console.error(`  - ${p}`);
    process.exitCode = 1;
  } else {
    console.log('every referenced path and region resolves.');
  }
}

main();
