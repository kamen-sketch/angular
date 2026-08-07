/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Checks that the hand-written half of `docs/codebase-map` still accounts for every meaningful
 * source directory in the repository, and reports the ones it does not mention.
 *
 * The generated index (`generated/`) always covers 100% of files, so this script is about the
 * *explanatory* half: when a new subsystem is added, it should get at least a sentence in one of
 * the map documents rather than silently existing only as an index entry.
 *
 * Usage:
 *   node docs/codebase-map/tools/check-coverage.mjs
 *
 * Exits 0 when every directory is mentioned, 1 otherwise, listing what is missing. The check is
 * intentionally a name match rather than a path match: a directory counts as covered when its
 * name (or `<parent>/<name>`) appears anywhere in the map documents, which is how the maps
 * naturally refer to them.
 */

import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const MAP_DIR = join(REPO_ROOT, 'docs', 'codebase-map');

/** Roots whose directory structure the maps are expected to explain. */
const ROOTS = ['packages', 'devtools', 'adev', 'modules', 'tools'];

/**
 * Directories that carry no architectural meaning of their own, either because they are
 * scaffolding (`src`, `bin`) or because they are collections whose members are individually
 * uninteresting (one folder per example, per benchmark, per docs page).
 */
const IGNORED_NAMES = new Set([
  'node_modules',
  'test',
  'tests',
  '__snapshots__',
  'dist',
  'bazel-out',
  'assets',
  'bin',
  'public',
  'styles',
  'environments',
]);

/**
 * The maps describe subsystems, not leaves. A directory is inspected when it sits at depth 1 or 2
 * below a root (`packages/router`, `devtools/projects/protocol`), or when it is a direct child of
 * a package's `src/` (`packages/router/src/operators`). Everything deeper is covered by the
 * generated index instead.
 */
function isInspected(relPath) {
  const parts = relPath.split('/');
  if (parts.length <= 3) return true;
  return parts.length === 4 && parts[0] === 'packages' && parts[2] === 'src';
}

function readMaps() {
  return readdirSync(MAP_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readFileSync(join(MAP_DIR, f), 'utf8'))
    .join('\n');
}

function* directories(root) {
  const stack = [join(REPO_ROOT, root)];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try {
      entries = readdirSync(dir, {withFileTypes: true});
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
      if (IGNORED_NAMES.has(entry.name)) continue;
      const full = join(dir, entry.name);
      const rel = relative(REPO_ROOT, full).split(sep).join('/');
      if (!isInspected(rel)) continue;
      if (entry.name !== 'src') yield full;
      stack.push(full);
    }
  }
}

function main() {
  const maps = readMaps();
  const missing = [];

  for (const root of ROOTS) {
    try {
      if (!statSync(join(REPO_ROOT, root)).isDirectory()) continue;
    } catch {
      continue;
    }
    for (const dir of directories(root)) {
      const rel = relative(REPO_ROOT, dir).split(sep).join('/');
      const name = rel.slice(rel.lastIndexOf('/') + 1);
      const parentAndName = rel.split('/').slice(-2).join('/');
      if (!maps.includes(name) && !maps.includes(parentAndName)) {
        missing.push(rel);
      }
    }
  }

  if (missing.length === 0) {
    console.log('codebase map: every inspected directory is mentioned in a map document.');
    return;
  }

  console.error(`codebase map: ${missing.length} directories are not mentioned in any map:`);
  for (const m of missing.sort()) console.error(`  ${m}`);
  console.error(
    '\nAdd a sentence for each in the relevant docs/codebase-map/*.md, ' +
      'or add its name to IGNORED_NAMES if it carries no architectural meaning.',
  );
  process.exitCode = 1;
}

main();
