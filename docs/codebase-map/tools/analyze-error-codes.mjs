/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Builds the catalogue of Angular's `NG…` error codes and checks the conventions that hold them
 * together. Writes `docs/codebase-map/generated/error-codes.md`.
 *
 * There are two independent code spaces, with two different conventions:
 *
 *  - **Runtime** codes (`packages/*​/src/errors.ts`) are thrown by the framework at run time.
 *    Each package owns a reserved numeric range, declared in the header of
 *    `packages/core/src/errors.ts`. A *negative* value means "this code has a guide on
 *    angular.dev"; `formatRuntimeError` uses the sign to decide whether to append the guide link,
 *    and renders the number as `NG0` + its absolute value.
 *
 *  - **Compile-time** codes (`packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.ts`) are
 *    reported as TypeScript diagnostics. `ngErrorCode()` turns each into the TS code `-99<code>`
 *    by string concatenation, and the formatter rewrites `TS-99<code>` to `NG<code>`. Here the
 *    "has a guide" marker is *not* the sign — it is membership of the `COMPILER_ERRORS_WITH_GUIDES`
 *    set in `docs.ts`.
 *
 * Because the two conventions differ, a negative value in the compile-time enum is always a bug:
 * `parseInt('-99' + -8024)` is `-99`, not `-998024`, so the diagnostic is emitted under the wrong
 * code and the `TS-99…` → `NG…` rewrite no longer matches it. This script fails on that, and on
 * duplicate or out-of-range runtime codes.
 *
 * Usage:
 *   node docs/codebase-map/tools/analyze-error-codes.mjs
 */

import {readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const PACKAGES = join(REPO_ROOT, 'packages');
const OUT_DIR = join(REPO_ROOT, 'docs', 'codebase-map', 'generated');
const GUIDES_DIR = join(REPO_ROOT, 'adev', 'src', 'content', 'reference', 'errors');

const ENUM_ENTRY = /^\s*([A-Z][A-Z0-9_]*)\s*=\s*(-?\d+)\s*,?\s*$/gm;
/** `*  - forms: 1000-1999` in the header of `packages/core/src/errors.ts`. */
const RESERVED_RANGE = /^\s*\*\s*-\s*([a-z-]+)(?:\s*\(this package\))?:\s*(\d+)-(\d+)\s*$/gm;

/** Secondary entry points file their codes under the owning package's range. */
const RANGE_OWNER = {'common/http': 'common', 'forms/signals': 'forms'};

/** `formatRuntimeErrorCode`: `NG0` + the absolute value. */
const runtimeCodeName = (value) => `NG0${Math.abs(value)}`;
/** Compile-time codes are rendered without the extra `0`. */
const compileCodeName = (value) => `NG${Math.abs(value)}`;

function findErrorFiles(dir, found = []) {
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) findErrorFiles(full, found);
    else if (entry.name === 'errors.ts') found.push(full);
  }
  return found;
}

function readReservedRanges() {
  const source = readFileSync(join(PACKAGES, 'core', 'src', 'errors.ts'), 'utf8');
  const ranges = new Map();
  for (const m of source.matchAll(RESERVED_RANGE)) {
    ranges.set(m[1], [Number(m[2]), Number(m[3])]);
  }
  return ranges;
}

function readRuntimeCodes() {
  /** @type {Map<string, {name: string, value: number, file: string}[]>} owner package -> codes */
  const byOwner = new Map();
  for (const file of findErrorFiles(PACKAGES)) {
    const rel = relative(REPO_ROOT, file).split(sep).join('/');
    // `packages/common/http/src/errors.ts` -> `common/http`
    const scope = rel.split('/').slice(1, -2).join('/');
    // `packages/compiler-cli/.../diagnostics/src/error_code.ts` is the compile-time space.
    if (scope.startsWith('compiler-cli')) continue;
    const source = readFileSync(file, 'utf8');
    // Several files import `RuntimeErrorCode` to throw with it; only the declaring file counts.
    if (!/enum\s+RuntimeErrorCode\b/.test(source)) continue;
    const owner = RANGE_OWNER[scope] ?? scope;
    if (!byOwner.has(owner)) byOwner.set(owner, []);
    for (const m of source.matchAll(ENUM_ENTRY)) {
      byOwner.get(owner).push({name: m[1], value: Number(m[2]), file: rel, scope});
    }
  }
  return byOwner;
}

function readCompileTimeCodes() {
  const file = join(
    PACKAGES,
    'compiler-cli/src/ngtsc/diagnostics/src/error_code.ts'.split('/').join(sep),
  );
  const source = readFileSync(file, 'utf8');
  const codes = [];
  for (const m of source.matchAll(ENUM_ENTRY)) {
    codes.push({name: m[1], value: Number(m[2])});
  }

  const docsFile = join(
    PACKAGES,
    'compiler-cli/src/ngtsc/diagnostics/src/docs.ts'.split('/').join(sep),
  );
  const withGuides = new Set(
    [...readFileSync(docsFile, 'utf8').matchAll(/ErrorCode\.([A-Z][A-Z0-9_]*)/g)].map((m) => m[1]),
  );
  return {codes, withGuides};
}

function readGuides() {
  if (!existsSync(GUIDES_DIR)) return new Set();
  return new Set(
    readdirSync(GUIDES_DIR)
      .filter((f) => /^NG\d+\.md$/.test(f))
      .map((f) => f.slice(0, -3)),
  );
}

function main() {
  mkdirSync(OUT_DIR, {recursive: true});

  const ranges = readReservedRanges();
  const runtime = readRuntimeCodes();
  const {codes: compileCodes, withGuides} = readCompileTimeCodes();
  const guides = readGuides();

  const problems = [];

  // --- runtime: ranges and duplicates -------------------------------------------------------
  for (const [owner, codes] of runtime) {
    const range = ranges.get(owner);
    if (!range) {
      problems.push(`no reserved range is declared for \`${owner}\``);
      continue;
    }
    const [lo, hi] = range;
    const seen = new Map();
    for (const c of codes) {
      const value = Math.abs(c.value);
      if (value < lo || value > hi) {
        problems.push(
          `${owner}: \`${c.name}\` = ${c.value} is outside the reserved range ${lo}-${hi}`,
        );
      }
      if (seen.has(value)) {
        problems.push(
          `${owner}: ${runtimeCodeName(value)} is used by both \`${seen.get(value)}\` and \`${c.name}\``,
        );
      }
      seen.set(value, c.name);
    }
  }

  // --- runtime: the sign must agree with the presence of a guide ----------------------------
  for (const [, codes] of runtime) {
    for (const c of codes) {
      if (c.value < 0 && !guides.has(runtimeCodeName(c.value))) {
        problems.push(
          `\`${c.name}\` is negative (claims to have a guide) but ` +
            `adev/src/content/reference/errors/${runtimeCodeName(c.value)}.md does not exist`,
        );
      }
    }
  }

  // --- compile-time: no negative values -----------------------------------------------------
  for (const c of compileCodes) {
    if (c.value < 0) {
      problems.push(
        `compile-time \`ErrorCode.${c.name}\` = ${c.value} is negative. The compile-time space ` +
          `does not use the sign to mark guides (that is COMPILER_ERRORS_WITH_GUIDES); ` +
          `ngErrorCode() would produce parseInt('-99' + ${c.value}) = ${parseInt('-99' + c.value)} ` +
          `instead of -99${Math.abs(c.value)}, so the diagnostic is reported under the wrong code`,
      );
    }
  }

  // --- output --------------------------------------------------------------------------------
  const lines = [
    '<!--',
    '  GENERATED FILE — do not edit by hand.',
    '  Regenerate with: node docs/codebase-map/tools/analyze-error-codes.mjs',
    '-->',
    '',
    '# Error code catalogue',
    '',
    'Every `NG…` code Angular can produce, in two independent spaces. See',
    '[`../20-error-codes.md`](../20-error-codes.md) for how the two conventions work.',
    '',
    '## Runtime codes',
    '',
    '`NG0` + the absolute value of a `RuntimeErrorCode` member. A negative value means the code has',
    'a guide at angular.dev and `formatRuntimeError` appends a link to it.',
    '',
    '| Package | Reserved range | Codes | With a guide |',
    '| --- | --- | ---: | ---: |',
  ];

  let runtimeTotal = 0;
  for (const owner of [...runtime.keys()].sort()) {
    const codes = runtime.get(owner);
    const range = ranges.get(owner);
    runtimeTotal += codes.length;
    lines.push(
      `| \`${owner}\` | ${range ? `${range[0]}–${range[1]}` : '—'} | ${codes.length} | ` +
        `${codes.filter((c) => c.value < 0).length} |`,
    );
  }
  lines.push(
    `| **total** | | **${runtimeTotal}** | **${
      [...runtime.values()].flat().filter((c) => c.value < 0).length
    }** |`,
    '',
  );

  for (const owner of [...runtime.keys()].sort()) {
    lines.push(
      `### \`${owner}\``,
      '',
      '| Code | Name | Guide | Declared in |',
      '| --- | --- | --- | --- |',
    );
    for (const c of runtime.get(owner).sort((a, b) => Math.abs(a.value) - Math.abs(b.value))) {
      const code = runtimeCodeName(c.value);
      lines.push(
        `| \`${code}\` | \`${c.name}\` | ${c.value < 0 ? `[guide](https://angular.dev/errors/${code})` : '—'} | \`${c.file}\` |`,
      );
    }
    lines.push('');
  }

  lines.push(
    '## Compile-time codes',
    '',
    '`ErrorCode` members from `packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.ts`,',
    'reported as TypeScript diagnostics with the code `-99<value>` and rendered as `NG<value>`.',
    'A guide is registered by adding the member to `COMPILER_ERRORS_WITH_GUIDES` in `docs.ts`.',
    '',
    `${compileCodes.length} codes, ${withGuides.size} of them with a guide.`,
    '',
    '| Code | Name | Guide |',
    '| --- | --- | --- |',
  );
  for (const c of compileCodes.sort((a, b) => Math.abs(a.value) - Math.abs(b.value))) {
    lines.push(
      `| \`${compileCodeName(c.value)}\` | \`${c.name}\` | ${withGuides.has(c.name) ? 'yes' : '—'} |`,
    );
  }

  lines.push('', '## Guide files with no matching code', '');
  const declared = new Set([
    ...[...runtime.values()].flat().map((c) => runtimeCodeName(c.value)),
    ...compileCodes.map((c) => compileCodeName(c.value)),
  ]);
  const orphans = [...guides].filter((g) => !declared.has(g)).sort();
  lines.push(orphans.length ? orphans.map((g) => `- \`${g}\``).join('\n') : 'None.', '');

  writeFileSync(join(OUT_DIR, 'error-codes.md'), lines.join('\n'), 'utf8');

  console.log(
    `runtime: ${runtimeTotal} codes across ${runtime.size} packages; ` +
      `compile-time: ${compileCodes.length} codes; guides: ${guides.size}`,
  );
  if (problems.length) {
    console.error(`\n${problems.length} problem(s) found:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exitCode = 1;
  } else {
    console.log('all error-code conventions hold.');
  }
}

main();
