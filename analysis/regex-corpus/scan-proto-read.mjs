/**
 * G-27 — pembacaan lewat RANTAI PROTOTIPE pada peta objek literal.
 *
 * Kelas ini sudah membayar dua kali tanpa alat:
 *   F-06  i18n_parse.ts:841        VALID_ATTRS[lowerAttrName]      (baris 824 pakai hasOwnProperty)
 *   F-17  meta.ts:199              META_KEYS_MAP[prop] || prop
 *
 * Keduanya berbentuk sama: sebuah PETA dideklarasikan sebagai objek literal
 * (`const M = {...}`), lalu dibaca dengan kunci DINAMIS. Objek literal mewarisi
 * seluruh anggota `Object.prototype`, sehingga kunci seperti `toString`,
 * `constructor`, `valueOf`, atau `__proto__` mengembalikan nilai bawaan yang
 * truthy — dan setiap gerbang berbentuk `M[k]`, `M[k] || d`, atau `M[k] ?? d`
 * ikut bocor.
 *
 * Pemindai ini mencari pasangan (deklarasi peta, pembacaan dinamis) di berkas
 * yang sama, lalu MENYARING yang sudah dijaga: `Object.create(null)`,
 * `new Map`, `Object.hasOwn`, `hasOwnProperty`, atau `in`.
 *
 * Jalankan: node analysis/regex-corpus/scan-proto-read.mjs
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative} from 'path';

const ROOT = process.cwd();
const SKIP = /[._]spec\.ts$|\.d\.ts$|\/test\/|\/testing\/|node_modules/;

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

// Deklarasi peta. Jalan pertama pemindai ini hanya mengenali `= {` dan hanya
// melihat SATU berkas, sehingga ia buta terhadap F-06 — validasi-diri yang
// menangkapnya. `VALID_ATTRS` dibangun dengan `merge(...)` di html_sanitizer.ts
// lalu DIIMPOR ke i18n_parse.ts. Dua celah sekaligus, dan keduanya diperbaiki:
//   (a) peta yang dibangun fungsi/spread, bukan hanya literal;
//   (b) peta yang dideklarasikan di berkas lain lalu diimpor.
const RE_MAP_DECL =
  /(?:^|\n)\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=\n]*)?=\s*(\{|merge\s*\(|Object\s*\.\s*assign\s*\(\s*\{)/g;

// Impor bernama: `import {A, B as C} from '...'`
const RE_IMPORT = /import\s*\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g;

// Penjaga yang membuat peta itu aman.
const SAFE_DECL = /Object\s*\.\s*create\s*\(\s*null|new\s+(?:Map|Set|WeakMap)\b/;

/** Kunci yang jelas KONSTAN — bukan sasaran. */
const KUNCI_KONSTAN = /^(?:[A-Z][A-Z0-9_]*|\d+|i|j|k|idx|index)$/;

const files = collect(join(ROOT, 'packages'));
const texts = new Map();
for (const f of files) {
  try {
    texts.set(f, readFileSync(f, 'utf8'));
  } catch {}
}

// LANGKAH 1 — daftar global peta yang dideklarasikan di mana pun.
const globalMaps = new Map(); // nama -> {rel, line}
for (const [file, text] of texts) {
  const rel = relative(ROOT, file);
  const lines = text.split('\n');
  RE_MAP_DECL.lastIndex = 0;
  let m;
  while ((m = RE_MAP_DECL.exec(text))) {
    const name = m[1];
    const line = lineOf(text, m.index);
    if (SAFE_DECL.test(lines[line - 1] ?? '')) continue;
    if (name.length < 3) continue;
    if (!globalMaps.has(name)) globalMaps.set(name, {rel, line});
  }
}

const findings = [];

// LANGKAH 2 — untuk tiap berkas, gabungkan peta LOKAL dan peta yang DIIMPOR.
for (const [file, text] of texts) {
  const rel = relative(ROOT, file);
  const lines = text.split('\n');

  const maps = new Map(); // nama -> {line, asal}
  RE_MAP_DECL.lastIndex = 0;
  let m;
  while ((m = RE_MAP_DECL.exec(text))) {
    const name = m[1];
    const line = lineOf(text, m.index);
    if (SAFE_DECL.test(lines[line - 1] ?? '')) continue;
    if (name.length < 3) continue;
    maps.set(name, {line, asal: 'lokal'});
  }
  RE_IMPORT.lastIndex = 0;
  while ((m = RE_IMPORT.exec(text))) {
    for (const raw of m[1].split(',')) {
      const nama = raw.trim().split(/\s+as\s+/).pop()?.trim();
      if (!nama || maps.has(nama)) continue;
      const asal = globalMaps.get(nama);
      if (asal) maps.set(nama, {line: asal.line, asal: asal.rel});
    }
  }
  if (!maps.size) continue;

  for (const [name, {line: declLine, asal}] of maps) {
    // Pembacaan dengan kunci dinamis: NAME[ident] — bukan NAME['literal'] atau NAME[0].
    const reRead = new RegExp(
      `(?<![\\w$.])${name}\\s*\\[\\s*([A-Za-z_$][\\w$.]*)\\s*\\]`,
      'g',
    );
    let r;
    const reads = [];
    while ((r = reRead.exec(text))) {
      const key = r[1];
      if (KUNCI_KONSTAN.test(key)) continue;
      const line = lineOf(text, r.index);
      if (line === declLine) continue;
      const src = (lines[line - 1] ?? '').trim();
      if (/^\s*(\*|\/\/)/.test(src)) continue;
      // Penulisan (`M[k] = v`) bukan pembacaan gerbang — lewati.
      if (/\]\s*=(?!=)/.test(src.slice(src.indexOf(name)))) continue;
      reads.push({line, key, src});
    }
    if (!reads.length) continue;

    // Apakah berkas ini menjaga pembacaannya di suatu tempat?
    const guarded =
      /Object\s*\.\s*hasOwn\s*\(/.test(text) ||
      /hasOwnProperty\s*\.\s*call\s*\(/.test(text) ||
      new RegExp(`['"\`][\\w$]+['"\`]\\s+in\\s+${name}`).test(text) ||
      new RegExp(`\\bin\\s+${name}\\b`).test(text);

    findings.push({rel, name, declLine, asal, reads, guarded});
  }
}

// Yang belum dijaga sama sekali lebih dulu.
findings.sort((a, b) => Number(a.guarded) - Number(b.guarded) || b.reads.length - a.reads.length);

console.log('='.repeat(78));
console.log('G-27 — PEMBACAAN RANTAI PROTOTIPE PADA PETA OBJEK LITERAL');
console.log(`Berkas dipindai: ${files.length}   pasangan (peta, pembacaan dinamis): ${findings.length}`);
console.log('='.repeat(78));

const takDijaga = findings.filter((f) => !f.guarded);
const sebagian = findings.filter((f) => f.guarded);

console.log(`\n--- TANPA penjaga apa pun di berkasnya (${takDijaga.length}) ---`);
for (const f of takDijaga) {
  console.log(`\n${f.rel}`);
  console.log(
    `  peta "${f.name}" dideklarasikan di ` +
      (f.asal === 'lokal' ? `baris ${f.declLine}` : `${f.asal}:${f.declLine} (DIIMPOR)`),
  );
  for (const r of f.reads.slice(0, 4)) console.log(`     :${r.line}  ${r.src.slice(0, 92)}`);
}

console.log(`\n--- Berkasnya PUNYA penjaga di suatu tempat (${sebagian.length}) ---`);
console.log('    (kandidat asimetri: apakah penjaga itu dipakai di SEMUA pembacaan?)');
for (const f of sebagian) {
  console.log(
    `  ${f.rel}  peta "${f.name}" ` +
      (f.asal === 'lokal' ? `:${f.declLine}` : `<- ${f.asal}:${f.declLine}`) +
      `  ${f.reads.length} pembacaan`,
  );
}

console.log('\n' + '='.repeat(78));
console.log('TRIASE: (1) bisakah kuncinya bernilai toString/constructor/valueOf/__proto__?');
console.log('        (2) dari mana kuncinya berasal — masukan runtime atau nilai build-time?');
console.log('        (3) apa akibat nilai bawaan yang truthy: gerbang terbuka, atau lemparan?');

// VALIDASI-DIRI terhadap dua kasus yang sudah diketahui.
const f06 = findings.find((f) => f.rel.endsWith('i18n/i18n_parse.ts') && f.name === 'VALID_ATTRS');
const f17 = findings.find((f) => f.rel.endsWith('browser/meta.ts') && f.name === 'META_KEYS_MAP');
console.log('\n' + '='.repeat(78));
console.log(`VALIDASI-DIRI  F-06 (VALID_ATTRS): ${f06 ? 'ditemukan' : 'TIDAK DITEMUKAN'}` +
  `   F-17 (META_KEYS_MAP): ${f17 ? 'ditemukan' : 'TIDAK DITEMUKAN'}`);
if (!f06 || !f17) {
  console.log('Pemindai buta terhadap kasus yang sudah diketahui — jangan percayai keluarannya.');
}
console.log('='.repeat(78));
process.exit(f06 && f17 ? 0 : 1);
