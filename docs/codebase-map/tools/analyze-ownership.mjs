/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Maps every tracked file to the review group that owns it, and writes
 * `docs/codebase-map/generated/ownership.md`.
 *
 * `.pullapprove.yml` assigns reviewers by glob. Each group declares
 * `contains_any_globs(files, ['packages/compiler/**​/{*,.*}', …])`, and a pull request needs an
 * approval from every group whose globs it touches.
 *
 * The config carries an override that turns an unowned change into a failure:
 *
 *     - if: len(groups.active.exclude("required-minimum-review").exclude("global-*")) == 0 …
 *       status: failure
 *       explanation: 'At least one group must match this PR. …'
 *
 * So a path no group claims is not a silent gap — it is a pull request that cannot pass review
 * until somebody edits this config. Finding those paths before a PR hits them is the point of this
 * script.
 *
 * Usage:
 *   node docs/codebase-map/tools/analyze-ownership.mjs [path…]
 *
 * With no arguments it checks every tracked file. With arguments it checks just those paths, which
 * is how to answer "will my new directory block a PR?".
 *
 * Exits non-zero when a tracked path matches no group.
 */

import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const CONFIG = join(REPO_ROOT, '.pullapprove.yml');
const OUT_DIR = join(REPO_ROOT, 'docs', 'codebase-map', 'generated');

/**
 * Groups that never match on files: the repository-wide gates. They approve everything, so counting
 * them as owners would make every path look covered.
 */
const NON_FILE_GROUPS = new Set([
  'required-minimum-review',
  'global-approvers',
  'global-docs-approvers',
]);

/** Translates one PullApprove glob into a regular expression. */
function globToRegExp(glob) {
  let out = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        // `**/` matches any number of leading directories, including none.
        if (glob[i + 2] === '/') {
          out += '(?:[^/]+/)*';
          i += 2;
        } else {
          out += '.*';
          i += 1;
        }
      } else {
        out += '[^/]*';
      }
    } else if (c === '{') {
      const end = glob.indexOf('}', i);
      const alternatives = glob.slice(i + 1, end).split(',');
      out += `(?:${alternatives.map((a) => globToRegExp(a).source.slice(1, -1)).join('|')})`;
      i = end;
    } else if ('.+^$()|[]\\'.includes(c)) {
      out += `\\${c}`;
    } else if (c === '?') {
      out += '[^/]';
    } else {
      out += c;
    }
  }
  return new RegExp(`^${out}$`);
}

/**
 * Parses the groups out of `.pullapprove.yml`.
 *
 * The file is YAML with embedded PullApprove expressions, so the globs live inside a function call
 * in a block scalar rather than in YAML structure. Reading them line by line is both simpler and
 * more faithful than trying to model the expression language.
 */
function parseGroups() {
  const lines = readFileSync(CONFIG, 'utf8').split('\n');
  const groups = [];
  let current = null;
  let section = null;

  for (const line of lines) {
    const groupMatch = /^ {2}([a-zA-Z0-9_-]+):\s*$/.exec(line);
    if (groupMatch && !/^ {2}#/.test(line)) {
      current = {name: groupMatch[1], globs: [], excludes: [], reviewers: []};
      groups.push(current);
      section = null;
      continue;
    }
    if (!current) continue;

    if (/^ {4}conditions:/.test(line)) section = 'conditions';
    else if (/^ {4}reviewers:/.test(line)) section = 'reviewers';
    else if (/^ {4}\w+:/.test(line)) section = null;

    if (section === 'conditions') {
      for (const m of line.matchAll(/'([^']+)'/g)) {
        // `files.exclude('yarn.lock')` names an exception, not an owned path.
        if (/exclude\(\s*$/.test(line.slice(0, m.index))) current.excludes.push(m[1]);
        else current.globs.push(m[1]);
      }
    } else if (section === 'reviewers') {
      // Names may carry a trailing comment giving the person's full name, and many carry a `~`
      // prefix. The config does not document what the prefix means, and it is not the
      // `availability.users_unavailable` mechanism — that lists `devversion`, who appears without a
      // prefix. The counts are reported as observed rather than interpreted.
      const user = /^ {8}- (~?)([A-Za-z0-9_-]+)\s*(?:#.*)?$/.exec(line);
      if (user) current.reviewers.push({name: user[2], tilde: user[1] === '~'});
    }
  }
  return groups.filter((g) => g.globs.length > 0 || g.reviewers.length > 0);
}

function main() {
  mkdirSync(OUT_DIR, {recursive: true});

  const groups = parseGroups();
  const fileGroups = groups.filter((g) => !NON_FILE_GROUPS.has(g.name) && g.globs.length > 0);
  for (const g of fileGroups) {
    g.matchers = g.globs.map(globToRegExp);
    g.excluders = g.excludes.map(globToRegExp);
  }

  const requested = process.argv.slice(2);
  const files = requested.length
    ? requested
    : execFileSync('git', ['ls-files'], {cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 64 << 20})
        .split('\n')
        .filter(Boolean);

  const owners = new Map(); // file -> group names
  const counts = new Map(); // group -> files owned
  const unowned = [];

  for (const file of files) {
    const matched = fileGroups
      .filter(
        (g) => g.matchers.some((re) => re.test(file)) && !g.excluders.some((re) => re.test(file)),
      )
      .map((g) => g.name);
    if (matched.length === 0) unowned.push(file);
    owners.set(file, matched);
    for (const name of matched) counts.set(name, (counts.get(name) ?? 0) + 1);
  }

  // Roll the unowned files up to their shallowest common directories, so the report names areas
  // rather than listing thousands of files.
  const unownedAreas = new Map();
  for (const file of unowned) {
    const parts = file.split('/');
    const area = parts.length === 1 ? file : parts.slice(0, 2).join('/');
    unownedAreas.set(area, (unownedAreas.get(area) ?? 0) + 1);
  }

  const lines = [
    '<!--',
    '  GENERATED FILE — do not edit by hand.',
    '  Regenerate with: node docs/codebase-map/tools/analyze-ownership.mjs',
    '-->',
    '',
    '# Code ownership',
    '',
    `${files.length} tracked files matched against ${fileGroups.length} file-matching review groups`,
    `from \`.pullapprove.yml\`. See [\`../24-ownership.md\`](../24-ownership.md).`,
    '',
    '## Groups',
    '',
    '| Group | Reviewers | `~`-prefixed | Files owned | Globs |',
    '| --- | ---: | ---: | ---: | ---: |',
  ];
  for (const g of [...fileGroups].sort(
    (a, b) => (counts.get(b.name) ?? 0) - (counts.get(a.name) ?? 0),
  )) {
    lines.push(
      `| \`${g.name}\` | ${g.reviewers.length} | ` +
        `${g.reviewers.filter((r) => r.tilde).length} | ` +
        `${counts.get(g.name) ?? 0} | ${g.globs.length} |`,
    );
  }

  const gates = groups.filter((g) => NON_FILE_GROUPS.has(g.name));
  if (gates.length) {
    lines.push('', '## Repository-wide groups', '', '| Group | Reviewers |', '| --- | ---: |');
    for (const g of gates) lines.push(`| \`${g.name}\` | ${g.reviewers.length} |`);
  }

  lines.push(
    '',
    `## Paths no group owns (${unowned.length} files)`,
    '',
    'A pull request touching only these fails PullApprove with "At least one group must match this',
    'PR", so they have to be adopted by a group before they can be changed.',
    '',
  );
  if (unownedAreas.size === 0) {
    lines.push('None.');
  } else {
    lines.push('| Area | Files |', '| --- | ---: |');
    for (const [area, n] of [...unownedAreas].sort((a, b) => b[1] - a[1])) {
      lines.push(`| \`${area}\` | ${n} |`);
    }
  }

  writeFileSync(join(OUT_DIR, 'ownership.md'), lines.join('\n') + '\n', 'utf8');

  console.log(
    `ownership: ${files.length} files, ${fileGroups.length} file-matching groups, ` +
      `${unowned.length} unowned file(s) across ${unownedAreas.size} area(s)`,
  );
  if (unowned.length) {
    console.error('\nPaths no review group claims:');
    for (const [area, n] of [...unownedAreas].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
      console.error(`  - ${area} (${n} file${n === 1 ? '' : 's'})`);
    }
    process.exitCode = 1;
  }
}

main();
