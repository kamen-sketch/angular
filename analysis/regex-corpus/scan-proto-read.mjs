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

// BENTUK KETIGA — peta sebagai PROPERTI KELAS, dibaca lewat `this.NAMA[k]`.
//
// Ini ditambahkan SETELAH F-20, dan bukan karena pemindainya melaporkan sesuatu:
// F-20 ditemukan lewat penelusuran fitur, lalu terbukti tak terlihat di sini.
//
//     packages/core/src/transfer_state.ts:82
//         store: Record<string, unknown | undefined> = {};
//
// Tidak ada `const`, tidak ada `let`. Dua jalan pertama pemindai ini menuntut
// salah satunya, jadi seluruh peta milik kelas — di seluruh repositori — luput.
//
// Sengaja MENUNTUT anotasi tipe atau kata kunci pengubah. `foo = {}` telanjang
// di dalam badan fungsi adalah penugasan ulang variabel biasa, bukan deklarasi
// peta; tanpa syarat ini derau menenggelamkan sinyalnya.
const RE_PROP_DECL =
  /(?:^|\n)[ \t]+(?:(?:private|public|protected|readonly|static|declare|override)\s+)*([A-Za-z_$][\w$]*)\s*(?:!\s*)?(?::\s*(?:Record<|\{|Map<|[A-Za-z_$][\w$.]*(?:<[^=\n]*>)?)[^=\n]*)=\s*(\{\s*\}|\{\s*$|merge\s*\(|Object\s*\.\s*assign\s*\(\s*\{)/g;

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

// LANGKAH 3 — peta milik kelas, dibaca lewat `this.NAMA[k]`.
//
// Penjaganya diperiksa PER-PEMBACAAN, bukan per-berkas maupun per-peta.
//
// Dua kali menyempit, dan validasi-diri yang memaksa keduanya. Uji tingkat
// BERKAS menyatakan transfer_state.ts "dijaga" karena `hasOwnProperty` muncul
// di baris 111 dan 134. Uji tingkat PETA masih menyatakan `this.store`
// "dijaga" karena `this.store.hasOwnProperty` muncul — di dalam `hasKey()`,
// dua puluh baris dari `get()` yang tidak dijaga.
//
// Itu bukan detail: penjaga-yang-ada-tapi-tidak-di-sini ADALAH cacatnya. Uji
// yang menganggapnya aman justru membutakan pemindai terhadap kelas temuan
// yang paling produktif sepanjang audit ini. Jadi pertanyaannya harus:
// dijagakah PEMBACAAN INI, di tempatnya sendiri.
//
// Jendela "N baris ke atas" adalah jawaban yang SALAH, dan triase yang
// membuktikannya: placeholder.ts:158 membaca `this._placeHolderNameCounts[base]`
// enam baris di bawah penjaganya —
//     const seen = this._placeHolderNameCounts.hasOwnProperty(base);   :152
//     if (!seen) { ...; return base; }
//     const id = this._placeHolderNameCounts[base];                    :158
// Penjaganya dihoist ke boolean lalu dipakai untuk keluar lebih awal. Jendela
// sempit melaporkannya sebagai cacat; jendela lebar akan menelan F-20.
//
// Pembedanya bukan JARAK melainkan BATAS METODE. Penjaga F-20 ada di `hasKey()`,
// metode yang berbeda dari `get()` — sejauh apa pun jendelanya, itu tetap bukan
// penjaga bagi pembacaan di `get()`. Jadi carilah penjaga di dalam metode yang
// MELINGKUPI pembacaan itu, dan tidak lebih jauh.

/** Awal-akhir badan metode yang melingkupi `line` (1-berbasis). */
function metodePelingkup(lines, line) {
  // Anggota kelas ditulis pada indentasi dua spasi di gaya berkas Angular.
  const RE_ANGGOTA = /^ {2}(?:(?:private|public|protected|static|readonly|async|override|get|set)\s+)*[A-Za-z_$][\w$]*\s*(?:<[^>]*>)?\s*\(/;
  let awal = -1;
  for (let i = line - 1; i >= 0; i--) {
    if (RE_ANGGOTA.test(lines[i])) {
      awal = i;
      break;
    }
  }
  if (awal < 0) return null;
  let akhir = lines.length;
  for (let i = awal + 1; i < lines.length; i++) {
    if (/^ {2}\}/.test(lines[i])) {
      akhir = i;
      break;
    }
  }
  return line - 1 <= akhir ? {awal, akhir} : null;
}
const findingsProp = [];
for (const [file, text] of texts) {
  const rel = relative(ROOT, file);
  const lines = text.split('\n');

  const props = new Map(); // nama -> baris deklarasi
  RE_PROP_DECL.lastIndex = 0;
  let m;
  while ((m = RE_PROP_DECL.exec(text))) {
    const name = m[1];
    const line = lineOf(text, m.index);
    const src = lines[line - 1] ?? '';
    if (SAFE_DECL.test(src)) continue;
    // Kata kunci kontrol yang kebetulan berbentuk sama.
    if (/^(?:if|for|while|switch|catch|return|case|else|do)$/.test(name)) continue;
    if (name.length < 3) continue;
    props.set(name, line);
  }
  if (!props.size) continue;

  for (const [name, declLine] of props) {
    const reRead = new RegExp(`this\\s*\\.\\s*${name}\\s*\\[\\s*([A-Za-z_$][\\w$.]*)\\s*\\]`, 'g');
    let r;
    const reads = [];
    while ((r = reRead.exec(text))) {
      const key = r[1];
      if (KUNCI_KONSTAN.test(key)) continue;
      const line = lineOf(text, r.index);
      const src = (lines[line - 1] ?? '').trim();
      if (/^\s*(\*|\/\/)/.test(src)) continue;
      // Penulisan dan penghapusan bukan gerbang pembacaan.
      if (/\]\s*=(?!=)/.test(src.slice(src.indexOf(name)))) continue;
      if (/\bdelete\s+this\s*\./.test(src)) continue;
      // Dijagakah pembacaan INI? Cari penjaga di dalam metode yang melingkupinya.
      // Kalau batas metode tidak terdeteksi, jatuh kembali ke jendela sempit —
      // memilih false negative daripada melebar tanpa batas.
      const mp = metodePelingkup(lines, line);
      const jendela = mp
        ? lines.slice(mp.awal, mp.akhir + 1).join('\n')
        : lines.slice(Math.max(0, line - 5), line).join('\n');
      const g = (re) => new RegExp(re.replace('NAMA', name)).test(jendela);
      const dijaga =
        g(String.raw`this\s*\.\s*NAMA\s*\.\s*hasOwnProperty\s*\(`) ||
        g(String.raw`Object\s*\.\s*hasOwn\s*\(\s*this\s*\.\s*NAMA`) ||
        g(String.raw`hasOwnProperty\s*\.\s*call\s*\(\s*this\s*\.\s*NAMA`) ||
        g(String.raw`\bin\s+this\s*\.\s*NAMA\b`);
      reads.push({line, key, src, dijaga});
    }
    if (!reads.length) continue;

    const takDijagaDi = reads.filter((r) => !r.dijaga);
    if (!takDijagaDi.length) continue; // semua pembacaan dijaga di tempatnya
    // Adakah penjaga untuk peta ini DI MANA PUN di berkas ini? Kalau ada,
    // temuannya adalah ASIMETRI — bentuk F-20, dan yang paling layak ditriase.
    const adaPenjagaLain = new RegExp(
      String.raw`this\s*\.\s*${name}\s*\.\s*hasOwnProperty\s*\(|Object\s*\.\s*hasOwn\s*\(\s*this\s*\.\s*${name}|\bin\s+this\s*\.\s*${name}\b`,
    ).test(text);

    findingsProp.push({
      rel,
      name,
      declLine,
      reads: takDijagaDi,
      total: reads.length,
      asimetri: adaPenjagaLain,
    });
  }
}
// Asimetri lebih dulu: penjaganya ADA di berkas ini, hanya tidak di pembacaan ini.
findingsProp.sort(
  (a, b) => Number(b.asimetri) - Number(a.asimetri) || b.reads.length - a.reads.length,
);

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

console.log(
  `\n--- BENTUK KETIGA: peta PROPERTI KELAS, dibaca lewat this.NAMA[k] (${findingsProp.length}) ---`,
);
console.log('    (penjaga dinilai per-PEMBACAAN — lihat komentar langkah 3)');
const asimetri = findingsProp.filter((f) => f.asimetri);
console.log(
  `\n  >>> ASIMETRI — penjaga untuk peta ini ADA di berkasnya, tapi tidak di` +
    ` pembacaan ini (${asimetri.length}):`,
);
for (const f of asimetri) {
  console.log(`\n  ${f.rel}`);
  console.log(
    `    this.${f.name} :${f.declLine}   ${f.reads.length} dari ${f.total} pembacaan tak dijaga`,
  );
  for (const r of f.reads.slice(0, 4)) console.log(`       :${r.line}  ${r.src.slice(0, 90)}`);
}
console.log(`\n  Tanpa penjaga di mana pun (${findingsProp.length - asimetri.length}):`);
for (const f of findingsProp.filter((x) => !x.asimetri)) {
  console.log(
    `    ${f.rel}  this.${f.name}:${f.declLine}  ${f.reads.length}/${f.total} pembacaan`,
  );
}

console.log('\n' + '='.repeat(78));
console.log('TRIASE: (1) bisakah kuncinya bernilai toString/constructor/valueOf/__proto__?');
console.log('        (2) dari mana kuncinya berasal — masukan runtime atau nilai build-time?');
console.log('        (3) apa akibat nilai bawaan yang truthy: gerbang terbuka, atau lemparan?');

// VALIDASI-DIRI terhadap dua kasus yang sudah diketahui.
const f06 = findings.find((f) => f.rel.endsWith('i18n/i18n_parse.ts') && f.name === 'VALID_ATTRS');
const f17 = findings.find((f) => f.rel.endsWith('browser/meta.ts') && f.name === 'META_KEYS_MAP');
// F-20 harus muncul di langkah 3 DAN harus terdaftar sebagai tak-dijaga.
// F-20 harus muncul, dan harus masuk kelompok ASIMETRI — bukan sekadar
// "tanpa penjaga di mana pun". Justru keberadaan `hasKey()` yang membuatnya
// bisa dinilai, jadi pemindai yang melaporkannya di kelompok yang salah tetap
// dianggap gagal.
const f20 = findingsProp.find(
  (f) => f.rel.endsWith('core/src/transfer_state.ts') && f.name === 'store' && f.asimetri,
);
// KONTROL NEGATIF dari berkas yang SAMA: `onSerializeCallbacks` dibaca di :136
// tepat di dalam `if (...hasOwnProperty(key))` pada :134. Ia TIDAK boleh
// terlapor sama sekali. Jika ikut muncul, jendela penjaganya tidak berfungsi
// dan seluruh langkah 3 hanya derau.
const kontrol = findingsProp.find(
  (f) => f.rel.endsWith('core/src/transfer_state.ts') && f.name === 'onSerializeCallbacks',
);
const kontrolOk = !kontrol;

console.log('\n' + '='.repeat(78));
console.log(
  `VALIDASI-DIRI  F-06 (VALID_ATTRS): ${f06 ? 'ditemukan' : 'TIDAK DITEMUKAN'}` +
    `   F-17 (META_KEYS_MAP): ${f17 ? 'ditemukan' : 'TIDAK DITEMUKAN'}`,
);
console.log(
  `               F-20 (this.store, tak dijaga): ${f20 ? 'ditemukan' : 'TIDAK DITEMUKAN'}` +
    `   kontrol negatif (onSerializeCallbacks dijaga): ${kontrolOk ? 'ya' : 'TIDAK'}`,
);
if (!f06 || !f17 || !f20 || !kontrolOk) {
  console.log('Pemindai buta terhadap kasus yang sudah diketahui — jangan percayai keluarannya.');
}
console.log('='.repeat(78));
process.exit(f06 && f17 && f20 && kontrolOk ? 0 : 1);
