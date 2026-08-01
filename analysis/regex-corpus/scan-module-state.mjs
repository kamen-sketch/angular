/**
 * G-25 — state tingkat-modul pada kode yang berjalan di SERVER.
 *
 * Kenapa kelas ini bisa mencapai severity Medium, tidak seperti G-22..G-24:
 * di peramban, satu modul = satu pengguna. Di SSR, satu proses Node melayani
 * BANYAK pengguna secara bersamaan, dan modul ESM adalah singleton per proses.
 * Setiap binding tingkat-modul yang bisa berubah dan menyimpan data
 * per-permintaan otomatis dibagi lintas-pengguna.
 *
 * Ini kelas yang sama bentuknya dengan F-12/F-13 — batas identitas yang runtuh —
 * tetapi di sisi server, sehingga tidak butuh peramban bersama sama sekali.
 *
 * Yang dicari: binding tingkat-modul yang
 *   (a) `let`/`var`, ATAU `const` berisi wadah yang bisa dimutasi
 *       (Map/Set/Array/objek literal/WeakMap), DAN
 *   (b) benar-benar ditulis atau dimutasi di tempat lain dalam berkas itu.
 *
 * Konstanta beku, tabel lookup yang hanya dibaca, dan penghitung yang tidak
 * pernah menyimpan data pengguna BUKAN sasaran — triase memisahkannya.
 *
 * Jalankan: node analysis/regex-corpus/scan-module-state.mjs
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative} from 'path';

const ROOT = process.cwd();
const SKIP = /[._]spec\.ts$|\.d\.ts$|\/test\/|\/testing\/|node_modules/;

// Paket yang kodenya BENAR-BENAR dieksekusi di server saat SSR.
const SSR_PACKAGES = [
  'packages/platform-server/src',
  'packages/core/src',
  'packages/common/src',
  'packages/common/http/src',
  'packages/router/src',
  'packages/forms/src',
  'packages/animations/browser/src',
];

function collect(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const n of entries) {
    const p = join(dir, n);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (n !== 'node_modules') collect(p, out);
    } else if (/\.m?ts$/.test(n) && !SKIP.test(p)) {
      out.push(p);
    }
  }
  return out;
}

const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

// Deklarasi TINGKAT MODUL: tidak diindentasi (kolom 0), opsional `export`.
const RE_LET = /^(?:export\s+)?(let|var)\s+([\w$]+)\s*(?::[^=;\n]+)?(?:=\s*([^;\n]*))?;?\s*$/gm;
const RE_CONST_CONTAINER =
  /^(?:export\s+)?const\s+([\w$]+)\s*(?::[^=]+)?=\s*(new\s+(?:Map|Set|WeakMap|WeakSet)\b|\[\s*\]|\{\s*\})/gm;

const MUTATORS = /\.\s*(?:set|add|push|delete|clear|unshift|splice|pop|shift)\s*\(/;

const files = [];
for (const p of SSR_PACKAGES) collect(join(ROOT, p), files);

const findings = [];
for (const file of files) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const rel = relative(ROOT, file);
  const lines = text.split('\n');

  const candidates = [];

  RE_LET.lastIndex = 0;
  let m;
  while ((m = RE_LET.exec(text))) {
    candidates.push({name: m[2], kind: m[1], line: lineOf(text, m.index), init: (m[3] ?? '').trim()});
  }
  RE_CONST_CONTAINER.lastIndex = 0;
  while ((m = RE_CONST_CONTAINER.exec(text))) {
    candidates.push({
      name: m[1],
      kind: 'const-container',
      line: lineOf(text, m.index),
      init: m[2].trim(),
    });
  }

  for (const c of candidates) {
    // Apakah benar-benar DITULIS/DIMUTASI di tempat lain?
    const reWrite = new RegExp(
      `(?<![\\w$.])${c.name}\\s*(?:\\+\\+|--|\\+?=(?!=))|` +
        `(?<![\\w$.])${c.name}\\s*\\.\\s*(?:set|add|push|delete|clear|unshift|splice)\\s*\\(`,
      'g',
    );
    const writes = [];
    let w;
    while ((w = reWrite.exec(text))) {
      const ln = lineOf(text, w.index);
      if (ln !== c.line) writes.push(ln);
    }
    if (!writes.length) continue;

    findings.push({
      rel,
      ...c,
      writes: [...new Set(writes)],
      snippet: (lines[c.line - 1] ?? '').trim(),
    });
  }
}

// Urutkan: yang paling mungkin menyimpan data per-permintaan lebih dulu.
const HOT = /cache|store|state|map|registry|pending|current|active|last|session|token|user|request|response|context|instance/i;
findings.sort((a, b) => Number(HOT.test(b.name)) - Number(HOT.test(a.name)));

console.log('='.repeat(78));
console.log('G-25 — STATE TINGKAT-MODUL PADA KODE YANG BERJALAN DI SERVER');
console.log(`Berkas dipindai: ${files.length}   kandidat: ${findings.length}`);
console.log('='.repeat(78));
console.log('\nDi SSR, satu proses melayani banyak pengguna dan modul ESM adalah');
console.log('singleton per proses. Binding di bawah ini dibagi lintas-permintaan.\n');

for (const f of findings) {
  const hot = HOT.test(f.name);
  console.log(`${hot ? '* ' : '  '}${f.rel}:${f.line}   ${f.kind} ${f.name}`);
  console.log(`     | ${f.snippet.slice(0, 92)}`);
  console.log(`     ditulis/dimutasi di baris: ${f.writes.slice(0, 8).join(', ')}`);
}

console.log('\n' + '='.repeat(78));
console.log(`Total ${findings.length}; ditandai * = namanya mengisyaratkan data per-permintaan.`);
console.log('TRIASE: apakah yang disimpan berasal dari PERMINTAAN (URL, cookie, header,');
console.log('body, respons)? Kalau ya, dua render bersamaan bisa saling melihat.');
console.log('Penghitung murni dan tabel lookup yang hanya dibaca bukan sasaran.');
