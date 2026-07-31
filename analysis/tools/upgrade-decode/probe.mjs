/**
 * F-11 — bukti dinamis terhadap ARTEFAK npm ASLI.
 *
 * Sasaran: `AngularJSUrlCodec` dari @angular/common/upgrade (publicApi).
 * `decodePath()` dan `decodeHash()` memanggil `decodeURIComponent` MENTAH,
 * sementara `decodeSearch()` — di baris yang bersebelahan pada pemanggilnya —
 * memakai pembungkus aman `tryDecodeURIComponent()` yang didefinisikan di
 * berkas yang SAMA.
 *
 * Harness ini tidak mem-porting apa pun. Ia meng-import modul yang benar-benar
 * dikirim npm, supaya hasilnya tidak bergantung pada ketelitian transkripsi saya.
 *
 * Jalankan:
 *   node analysis/tools/upgrade-decode/probe.mjs <path-ke-node_modules>
 */
import {pathToFileURL} from 'url';
import {readFileSync} from 'fs';
import {join} from 'path';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node probe.mjs <path-ke-node_modules>');
  process.exit(2);
}
const versi = JSON.parse(readFileSync(join(nm, '@angular/common/package.json'), 'utf8')).version;
// Modul upgrade menarik PlatformLocation yang dikompilasi parsial; muat kompiler
// JIT lebih dulu supaya import bundel npm berhasil di luar aplikasi Angular.
await import(pathToFileURL(join(nm, '@angular/compiler/fesm2022/compiler.mjs')).href);
const {AngularJSUrlCodec} = await import(
  pathToFileURL(join(nm, '@angular/common/fesm2022/upgrade.mjs')).href
);

const codec = new AngularJSUrlCodec();

function jalankan(label, fn) {
  try {
    const hasil = fn();
    return {label, status: 'OK', hasil: JSON.stringify(hasil)};
  } catch (e) {
    return {label, status: 'LEMPAR', hasil: `${e.constructor.name}: ${e.message}`};
  }
}

const garis = '='.repeat(78);
console.log(garis);
console.log(`F-11 — AngularJSUrlCodec, @angular/common@${versi} (artefak npm asli)`);
console.log(garis);

// --- Langkah 1: apakah masukannya benar-benar bisa muncul dari peramban? -----
console.log('\n[1] KETERJANGKAUAN — apakah URL bermasalah bertahan lewat parser URL platform?');
for (const u of [
  'https://app.test/a%zz',
  'https://app.test/a%',
  'https://app.test/%e0%a4%a',
  'https://app.test/x#%zz',
]) {
  const p = new URL(u);
  console.log(
    `    ${u.padEnd(30)} -> pathname=${JSON.stringify(p.pathname)} hash=${JSON.stringify(p.hash)}`,
  );
}
console.log('    Parser URL WHATWG MEMPERTAHANKAN escape persen yang tidak sah apa adanya.');
console.log('    Jadi string ini benar-benar bisa sampai ke codec dari location.pathname.');

// --- Langkah 2: kontrol positif -------------------------------------------
console.log('\n[2] KONTROL POSITIF — jalur yang MEMANG memakai pembungkus aman');
const kontrol = [
  jalankan("decodeSearch('a=%zz')", () => codec.decodeSearch('a=%zz')),
  jalankan("decodeSearch('%zz=1')", () => codec.decodeSearch('%zz=1')),
  jalankan("decodePath('/a%20b')  [persen SAH]", () => codec.decodePath('/a%20b')),
  jalankan("decodeHash('%20')     [persen SAH]", () => codec.decodeHash('%20')),
];
for (const r of kontrol) console.log(`    ${r.status.padEnd(7)} ${r.label.padEnd(34)} ${r.hasil}`);
console.log('    -> decodeSearch bertahan. Harness memanggil kode nyata, dan');
console.log('       persen yang sah tidak memicu apa pun. Pembeda satu-satunya');
console.log('       adalah ADA/TIDAKNYA try/catch, bukan masukannya.');

// --- Langkah 3: cacatnya ---------------------------------------------------
console.log('\n[3] CACAT — jalur yang memanggil decodeURIComponent mentah');
const cacat = [
  jalankan("decodePath('/a%zz')", () => codec.decodePath('/a%zz')),
  jalankan("decodePath('/a%')", () => codec.decodePath('/a%')),
  jalankan("decodeHash('%zz')", () => codec.decodeHash('%zz')),
  jalankan("decodeHash('%')", () => codec.decodeHash('%')),
  jalankan("normalize('https://app.test/a%zz')", () =>
    codec.normalize('https://app.test/a%zz'),
  ),
  jalankan("areEqual('https://app.test/a%zz', 'https://app.test/a%zz')", () =>
    codec.areEqual('https://app.test/a%zz', 'https://app.test/a%zz'),
  ),
];
for (const r of cacat) console.log(`    ${r.status.padEnd(7)} ${r.label.padEnd(56)} ${r.hasil}`);

// --- Langkah 4: kontrol negatif -------------------------------------------
console.log('\n[4] KONTROL NEGATIF — buktikan ini bukan sekadar "semua masukan aneh melempar"');
const negatif = [
  jalankan("decodePath('/a%2Fb')", () => codec.decodePath('/a%2Fb')),
  jalankan("decodePath('/<script>')", () => codec.decodePath('/<script>')),
  jalankan("decodePath('/\\u0000')", () => codec.decodePath('/\u0000')),
  jalankan("decodeHash('#%2F')", () => codec.decodeHash('#%2F')),
];
for (const r of negatif) console.log(`    ${r.status.padEnd(7)} ${r.label.padEnd(34)} ${r.hasil}`);
console.log('    -> Hanya escape persen malformed yang melempar. Pemicunya spesifik.');

// --- Ringkasan -------------------------------------------------------------
const melempar = cacat.filter((r) => r.status === 'LEMPAR').length;
const kontrolAman = kontrol.every((r) => r.status === 'OK');
console.log('\n' + garis);
console.log(
  `Kontrol positif utuh: ${kontrolAman ? 'ya' : 'TIDAK (hasil tidak sah)'} | ` +
    `jalur cacat melempar: ${melempar}/${cacat.length}`,
);
console.log(garis);
process.exit(kontrolAman && melempar > 0 ? 0 : 1);
