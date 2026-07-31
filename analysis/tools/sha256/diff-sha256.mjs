/**
 * Uji diferensial SHA-256 buatan sendiri milik Angular.
 *
 * SASARAN: `generateHash()` di packages/common/http/src/transfer_cache.ts:600.
 * Angular menuliskan implementasi SHA-256 SENDIRI (bukan Web Crypto) karena
 * pencarian transfer cache harus sinkron. Komentar di atas fungsi itu
 * menyatakan tujuannya eksplisit:
 *
 *   "The previous DJB2 hashing logic was vulnerable to pre-image and
 *    second-preimage attacks ... An attacker could craft colliding request
 *    inputs to poison the cache ... SHA-256 provides strong cryptographic
 *    collision resistance."
 *
 * Jadi ini kontrol keamanan yang dinyatakan sendiri oleh Angular. Primitif
 * kripto tulis-tangan adalah tempat yang wajar untuk salah, dan salahnya bisa
 * dibuktikan secara objektif: bandingkan dengan `crypto.createHash('sha256')`.
 *
 * KESETIAAN: fungsi tidak ditranskripsi tangan. Teks modul diambil apa adanya
 * dari bundel npm yang dikirim, hanya ditambah satu baris `export`.
 *
 * Jalankan: node analysis/tools/sha256/diff-sha256.mjs <path-node_modules>
 */
import {createHash} from 'crypto';
import {readFileSync, writeFileSync, unlinkSync} from 'fs';
import {join, dirname} from 'path';
import {pathToFileURL} from 'url';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node diff-sha256.mjs <path-ke-node_modules>');
  process.exit(2);
}

// Bundel npm dikompilasi parsial; muat kompiler JIT dulu agar http.mjs bisa
// diimpor di luar aplikasi Angular.
await import(pathToFileURL(join(nm, '@angular/compiler/fesm2022/compiler.mjs')).href);

const pkg = JSON.parse(readFileSync(join(nm, '@angular/common/package.json'), 'utf8'));
const sumber = join(nm, '@angular/common/fesm2022/http.mjs');
let teks = readFileSync(sumber, 'utf8');
if (!/function generateHash\s*\(/.test(teks)) {
  console.error('generateHash tidak ditemukan di bundel npm; hentikan daripada menebak.');
  process.exit(2);
}
// Satu-satunya modifikasi terhadap artefak npm.
teks += '\nexport {generateHash as __generateHash};\n';
// Bundel fesm memakai impor relatif ke chunk tetangganya, jadi salinannya harus
// diletakkan di DIREKTORI YANG SAMA agar resolusi tidak berubah.
const berkas = join(dirname(sumber), `__sha-probe-${process.pid}.mjs`);
writeFileSync(berkas, teks);
let generateHash;
try {
  ({__generateHash: generateHash} = await import(pathToFileURL(berkas).href));
} finally {
  unlinkSync(berkas);
}

const acuan = (s) => createHash('sha256').update(Buffer.from(s, 'utf8')).digest('hex');

// -------------------------------------------------------------------- korpus
const korpus = [];
const tambah = (s, ket) => korpus.push({s, ket});

tambah('', 'string kosong');
tambah('abc', 'vektor uji NIST');
tambah('a'.repeat(1000000).slice(0, 1000), 'blok panjang');

// Panjang batas padding: 55/56 (blok tunggal vs ganda), 63/64, 119/120.
for (const n of [1, 54, 55, 56, 57, 62, 63, 64, 65, 118, 119, 120, 121, 127, 128, 129]) {
  tambah('x'.repeat(n), `panjang batas ${n}`);
}

// Multi-byte UTF-8: TextEncoder vs Buffer harus sepakat.
tambah('héllo wörld', 'latin-1 diperluas');
tambah('日本語テキスト', 'CJK 3-byte');
tambah('👨‍👩‍👧‍👦 keluarga', 'emoji ZWJ 4-byte');
tambah('\u0000', 'kontrol + NUL');
tambah('\ud83d', 'surrogate tunggal (harus jadi U+FFFD)');

// Bentuk kunci cache yang sebenarnya: [method, responseType, url, body, params]
// digabung dengan \0.
const NUL = '\u0000';
for (const [m, rt, url, body, prm] of [
  ['GET', 'json', '/api/user', '', ''],
  ['GET', 'json', '/api/user', '', 'id=1'],
  ['POST', 'json', '/api/user', '{"a":1}', ''],
  ['GET', 'text', '/api/user', '', ''],
]) {
  tambah([m, rt, url, body, prm].join(NUL), `kunci cache nyata ${m} ${url} ${prm}`);
}

// Acak, panjang bervariasi — di sinilah bug carry/padding biasanya muncul.
let benih = 0x2f6e2b1;
const rnd = () => ((benih = (benih * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
for (let i = 0; i < 4000; i++) {
  const n = Math.floor(rnd() * 300);
  let s = '';
  for (let j = 0; j < n; j++) s += String.fromCharCode(Math.floor(rnd() * 0x2000));
  tambah(s, `acak n=${n}`);
}

// ---------------------------------------------------------------------- uji
const garis = '='.repeat(78);
console.log(garis);
console.log(`Uji diferensial SHA-256 — @angular/common@${pkg.version} (bundel npm)`);
console.log(`Acuan: node:crypto createHash('sha256')`);
console.log(garis);

const beda = [];
for (const {s, ket} of korpus) {
  let punyaAngular;
  try {
    punyaAngular = generateHash(s);
  } catch (e) {
    beda.push({ket, s, angular: `LEMPAR ${e.message}`, acuan: acuan(s)});
    continue;
  }
  const harap = acuan(s);
  if (punyaAngular !== harap) beda.push({ket, s, angular: punyaAngular, acuan: harap});
}

console.log(`\nMasukan diuji: ${korpus.length}`);

// Kontrol positif: pastikan pembanding memang MAMPU melihat perbedaan.
const rusak = generateHash('abc') === acuan('abd');
console.log(
  `Kontrol positif (hash beda untuk masukan beda): ` +
    `${generateHash('abc') !== generateHash('abd') && !rusak ? 'ok' : 'GAGAL'}`,
);
console.log(`Vektor NIST "abc": ${generateHash('abc')}`);
console.log(`                   ${acuan('abc')}  <- acuan`);

if (!beda.length) {
  console.log('\nTIDAK ADA PERBEDAAN. Implementasi SHA-256 Angular cocok dengan');
  console.log('node:crypto pada seluruh korpus, termasuk semua panjang batas padding.');
} else {
  console.log(`\n>>> PERBEDAAN: ${beda.length}\n`);
  for (const d of beda.slice(0, 12)) {
    console.log(`  ${d.ket}  (panjang ${d.s.length})`);
    console.log(`    angular ${d.angular}`);
    console.log(`    acuan   ${d.acuan}`);
    console.log(`    masukan ${JSON.stringify(d.s.slice(0, 60))}`);
  }
}
console.log('\n' + garis);
process.exit(beda.length ? 1 : 0);
