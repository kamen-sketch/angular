/**
 * Pembangun inventory fungsi untuk monorepo Angular (tanpa dependensi eksternal).
 *
 * Memindai seluruh berkas .ts sumber (bukan spec/test) di packages/, devtools/,
 * tools/, adev/src, modules/, scripts/, dev-app/ lalu menuliskan checklist per
 * area ke `analysis/functions/<area>.txt`.
 *
 * Jalankan:  node analysis/tools/build-inventory.mjs
 * Lalu:      node analysis/tools/sync-checklist.mjs   (mengembalikan tanda [x])
 */
import {readdirSync, readFileSync, writeFileSync, mkdirSync} from 'fs';
import {join, relative, dirname} from 'path';
import {fileURLToPath} from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'analysis', 'functions');
const SKIP = new Set(['node_modules', '.git', 'dist', 'bazel-out', 'third_party']);

function walk(dir, out = []) {
  for (const e of readdirSync(dir, {withFileTypes: true})) {
    if (SKIP.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.m?ts$/.test(e.name) && !/\.d\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

// `testing/` folders are public API (TestBed, RouterTestingHarness, ...) so they stay in.
const isTestPath = (rel) =>
  /(^|\/)test\//.test(rel) || /[._]spec\.ts$/.test(rel) || /(^|\/)(fixtures|test_helpers)\//.test(rel);

// --- lightweight line-oriented scanner -------------------------------------
const ID = '[\\p{L}_$][\\p{L}\\p{N}_$]*';
const MOD = '(?:public\\s+|private\\s+|protected\\s+|override\\s+|readonly\\s+|declare\\s+)*';
const RE_FN = new RegExp(`^(export\\s+)?(declare\\s+)?(async\\s+)?function\\s*(\\*)?\\s*(${ID})\\s*(<|\\()`, 'u');
const RE_CLASS = new RegExp(`^(export\\s+)?(default\\s+)?(abstract\\s+)?class\\s+(${ID})`, 'u');
const RE_ARROW = new RegExp(
  `^(export\\s+)?(const|let|var)\\s+(${ID})\\s*(:\\s*[^=]+?)?=\\s*(async\\s*)?(<[^=]*?>)?\\s*\\(([^;]*)$`,
  'u',
);
const RE_ARROW_SIMPLE = new RegExp(
  `^(export\\s+)?(const|let|var)\\s+(${ID})\\s*=\\s*(async\\s+)?[\\w$]+\\s*=>`,
  'u',
);
const RE_METHOD = new RegExp(
  `^(${MOD})(static\\s+)?(abstract\\s+)?(async\\s+)?(get\\s+|set\\s+)?(\\*\\s*)?(${ID}|\\[[^\\]]+\\])\\s*(<[^(]*)?\\(`,
  'u',
);
const RE_CTOR = new RegExp(`^(${MOD})constructor\\s*\\(`, 'u');
const KEYWORDS = new Set([
  'if', 'for', 'while', 'switch', 'catch', 'return', 'do', 'else', 'new', 'typeof', 'await',
  'yield', 'case', 'throw', 'super', 'this', 'delete', 'void', 'in', 'of', 'function', 'import',
  'export', 'const', 'let', 'var', 'class', 'interface', 'type', 'enum', 'declare', 'with',
]);

function stripComments(src) {
  // Replaces comment bodies with blanks so line numbers stay stable.
  let out = '';
  let i = 0;
  let state = 'code'; // code | line | block | sq | dq | tpl
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (state === 'code') {
      if (c === '/' && n === '/') { state = 'line'; out += '  '; i += 2; continue; }
      if (c === '/' && n === '*') { state = 'block'; out += '  '; i += 2; continue; }
      if (c === "'") state = 'sq';
      else if (c === '"') state = 'dq';
      else if (c === '`') state = 'tpl';
      out += c; i++; continue;
    }
    if (state === 'line') {
      if (c === '\n') { state = 'code'; out += c; } else out += ' ';
      i++; continue;
    }
    if (state === 'block') {
      if (c === '*' && n === '/') { state = 'code'; out += '  '; i += 2; continue; }
      out += c === '\n' ? '\n' : ' '; i++; continue;
    }
    // string states
    if (c === '\\') { out += '  '; i += 2; continue; }
    if ((state === 'sq' && c === "'") || (state === 'dq' && c === '"') || (state === 'tpl' && c === '`')) {
      state = 'code';
    }
    out += c === '\n' ? '\n' : c;
    i++;
  }
  return out;
}

function jsdocSummary(rawLines, declLine) {
  // Walk upward from the declaration collecting a JSDoc/line-comment summary.
  let i = declLine - 2;
  while (i >= 0 && /^\s*(@|\/\/\s*(tslint|eslint|@ts-))/.test(rawLines[i] ?? '')) i--;
  if (i < 0) return '';
  const line = (rawLines[i] ?? '').trim();
  if (line === '*/') {
    const parts = [];
    let j = i - 1;
    while (j >= 0 && !/\/\*\*?/.test(rawLines[j])) {
      const t = rawLines[j].trim().replace(/^\*\s?/, '');
      if (t && !t.startsWith('@')) parts.unshift(t);
      j--;
    }
    return parts.join(' ').slice(0, 160);
  }
  if (line.startsWith('//')) return line.replace(/^\/+\s*/, '').slice(0, 160);
  const one = line.match(/^\/\*\*(.*)\*\/$/);
  return one ? one[1].trim().slice(0, 160) : '';
}

function scanFile(abs) {
  const raw = readFileSync(abs, 'utf8');
  const rawLines = raw.split('\n');
  const code = stripComments(raw).split('\n');
  const symbols = [];
  let depth = 0;
  let classStack = []; // {name, depth}
  const RE_CONST_HEAD = /^(export\s+)?(const|let|var)\s+([A-Za-z_$][\w$]*)\s*(:[^=]*)?=\s*$/;
  for (let idx = 0; idx < code.length; idx++) {
    const line = code[idx];
    let trimmed = line.trim();
    // `export const X: T =` with the initializer starting on the next line.
    if (RE_CONST_HEAD.test(trimmed) && code[idx + 1] !== undefined) {
      trimmed = trimmed + ' ' + code[idx + 1].trim();
    }
    const indentDepth = depth;
    let m;

    if (trimmed && !trimmed.startsWith('*')) {
      const owner = classStack.length && classStack[classStack.length - 1].depth === indentDepth - 1
        ? classStack[classStack.length - 1].name
        : null;

      if ((m = trimmed.match(RE_CLASS))) {
        symbols.push({
          kind: 'class', name: m[4], line: idx + 1, exported: !!m[1], owner: null,
          sig: trimmed.replace(/\s*\{.*$/, '').slice(0, 150), doc: jsdocSummary(rawLines, idx + 1),
        });
        classStack.push({name: m[4], depth: indentDepth});
      } else if ((m = trimmed.match(RE_FN))) {
        symbols.push({
          kind: 'function', name: m[5], line: idx + 1, exported: !!m[1], owner: null,
          sig: trimmed.replace(/\s*\{\s*$/, '').slice(0, 150), doc: jsdocSummary(rawLines, idx + 1),
        });
      } else if ((m = trimmed.match(RE_ARROW)) || (m = trimmed.match(RE_ARROW_SIMPLE))) {
        // Guard: RE_ARROW's open paren must actually start an arrow parameter list.
        const isArrow = /=>/.test(trimmed) || /\(\s*$/.test(trimmed) || /,\s*$/.test(trimmed);
        if (isArrow && indentDepth === 0) {
          symbols.push({
            kind: 'arrow', name: m[3], line: idx + 1, exported: !!m[1], owner: null,
            sig: trimmed.slice(0, 150), doc: jsdocSummary(rawLines, idx + 1),
          });
        }
      } else if (owner && (m = trimmed.match(RE_CTOR))) {
        symbols.push({
          kind: 'ctor', name: 'constructor', line: idx + 1, exported: false, owner,
          sig: trimmed.slice(0, 150), doc: '',
        });
      } else if (owner && (m = trimmed.match(RE_METHOD))) {
        const name = m[7];
        const kw = trimmed.split(/[\s(]/)[0];
        if (!KEYWORDS.has(name) && !KEYWORDS.has(kw) && !/^\s*\}/.test(trimmed)) {
          symbols.push({
            kind: (m[5] || '').trim() ? 'accessor' : 'method',
            name, line: idx + 1, exported: false, owner,
            sig: trimmed.replace(/\s*\{\s*$/, '').slice(0, 150), doc: jsdocSummary(rawLines, idx + 1),
          });
        }
      }
    }

    for (const ch of line) {
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        while (classStack.length && depth <= classStack[classStack.length - 1].depth) classStack.pop();
      }
    }
  }
  return symbols;
}

// --- run --------------------------------------------------------------------
const AREAS = ['packages', 'devtools', 'tools', 'adev/src', 'modules', 'scripts', 'dev-app'];
const files = AREAS.flatMap((a) => {
  try {
    return walk(join(ROOT, a));
  } catch {
    return [];
  }
}).map((f) => relative(ROOT, f)).sort();
const byPkg = new Map();
let total = 0;
for (const rel of files) {
  if (isTestPath(rel)) continue;
  const seg = rel.split('/');
  const pkg = seg[0] === 'packages' ? seg[1] : seg[0] === 'adev' ? 'adev' : seg[0];
  if (pkg.endsWith('.ts')) continue;
  const syms = scanFile(join(ROOT, rel));
  if (!syms.length) continue;
  if (!byPkg.has(pkg)) byPkg.set(pkg, new Map());
  byPkg.get(pkg).set(rel, syms);
  total += syms.length;
}

mkdirSync(OUT, {recursive: true});
const summary = [];
for (const [pkg, filesMap] of [...byPkg].sort()) {
  const lines = [];
  let count = 0;
  const counts = {function: 0, arrow: 0, class: 0, method: 0, accessor: 0, ctor: 0};
  for (const [rel, syms] of filesMap) {
    lines.push('');
    lines.push(`## ${rel}`);
    for (const s of syms) {
      count++;
      counts[s.kind] = (counts[s.kind] ?? 0) + 1;
      const label = s.owner ? `${s.owner}.${s.name}` : s.name;
      const flags = [s.exported ? 'export' : '', s.kind].filter(Boolean).join(' ');
      lines.push(`[ ] ${label}  (${flags}) :${s.line}`);
      if (s.doc) lines.push(`      -- ${s.doc}`);
    }
  }
  const header = [
    `INVENTORY FUNGSI :: ${pkg}`,
    `Total simbol: ${count} | file: ${filesMap.size}`,
    `Rincian: ${Object.entries(counts).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(', ')}`,
    `Legenda: [ ] belum dianalisis  |  [x] sudah dianalisis (lihat analysis/CHECKED-FUNCTIONS.txt)`,
    `Format: [ ] Nama  (export|kind) :baris`,
    '='.repeat(78),
  ];
  writeFileSync(join(OUT, `${pkg}.txt`), header.concat(lines).join('\n') + '\n');
  summary.push({pkg, count, files: filesMap.size, counts});
}

summary.sort((a, b) => b.count - a.count);
console.log('TOTAL SYMBOLS', total);
for (const s of summary) {
  console.log(s.pkg.padEnd(26), String(s.count).padStart(6), 'files', String(s.files).padStart(4));
}
