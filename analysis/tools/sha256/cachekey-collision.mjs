/**
 * Menguji SATU klaim keamanan yang ditulis Angular sendiri di atas
 * `makeCacheKey` (packages/common/http/src/transfer_cache.ts:424-426):
 *
 *   "Joining with `|` lets a shifted field boundary ... collapse to the same
 *    string and thus the same hash. `\0` cannot occur in a valid url or in
 *    encoded params, so the field boundaries can't be forged by field content."
 *
 * Klaimnya ada dua bagian:
 *   (a) `\0` tidak bisa muncul di URL atau params terenkode;
 *   (b) karena itu batas antar-medan tidak bisa dipalsukan oleh isi medan.
 *
 * Bagian (b) bergantung penuh pada (a). Uji ini menyerang (a) — dan (a) hanya
 * berbicara tentang URL dan PARAMS. Ia diam soal medan ketiga yang ikut
 * digabung: BODY yang sudah diserialkan. Kalau salah satu medan bisa memuat
 * `\0`, dua permintaan yang BERBEDA menghasilkan kunci cache yang SAMA.
 *
 * Kunci = [method, responseType, url, serializedBody, encodedParams].join('\0')
 *
 * KESETIAAN: `makeCacheKey` dan `generateHash` diambil dari bundel npm yang
 * dikirim; hanya satu baris `export` ditambahkan. Tidak ada transkripsi tangan.
 *
 * Jalankan: node analysis/tools/sha256/cachekey-collision.mjs <path-node_modules>
 */
import {readFileSync, writeFileSync, unlinkSync} from 'fs';
import {join, dirname} from 'path';
import {pathToFileURL} from 'url';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node cachekey-collision.mjs <path-ke-node_modules>');
  process.exit(2);
}

await import(pathToFileURL(join(nm, '@angular/compiler/fesm2022/compiler.mjs')).href);
const pkg = JSON.parse(readFileSync(join(nm, '@angular/common/package.json'), 'utf8'));

const sumber = join(nm, '@angular/common/fesm2022/http.mjs');
let teks = readFileSync(sumber, 'utf8');
for (const nama of ['makeCacheKey', 'generateHash']) {
  if (!new RegExp(`function ${nama}\\s*\\(`).test(teks)) {
    console.error(`${nama} tidak ada di bundel npm; hentikan daripada menebak.`);
    process.exit(2);
  }
}
teks += '\nexport {makeCacheKey as __makeCacheKey, generateHash as __generateHash};\n';
const berkas = join(dirname(sumber), `__ck-probe-${process.pid}.mjs`);
writeFileSync(berkas, teks);
let makeCacheKey, HttpRequest;
try {
  const m = await import(pathToFileURL(berkas).href);
  makeCacheKey = m.__makeCacheKey;
  HttpRequest = m.HttpRequest;
} finally {
  unlinkSync(berkas);
}

const NUL = '\u0000';
const garis = '='.repeat(78);
console.log(garis);
console.log(`Kunci transfer cache — @angular/common@${pkg.version} (bundel npm)`);
console.log(garis);

// -- Langkah 1: apakah `\0` benar-benar bertahan sampai ke medan kunci? ------
console.log('\n[1] Apakah medan kunci bisa memuat NUL?');
const contoh = [
  ['url', new HttpRequest('POST', `/api/x${NUL}SISIPAN`, 'b')],
  ['body string', new HttpRequest('POST', '/api/x', `b${NUL}c`)],
  ['params', new HttpRequest('GET', '/api/x', {params: undefined})],
];
for (const [medan, req] of contoh) {
  const sb = req.serializeBody();
  console.log(
    `    ${medan.padEnd(12)} url=${JSON.stringify(req.url)}  ` +
      `serializeBody()=${JSON.stringify(typeof sb === 'string' ? sb : String(sb))}`,
  );
}
const paramsNul = new HttpRequest('GET', '/api/x').clone({
  setParams: {q: `a${NUL}b`},
});
console.log(`    params dienkode -> ${JSON.stringify(paramsNul.params.toString())}`);
console.log(
  '    -> params MEMANG aman (URLSearchParams mengenkode NUL jadi %00),\n' +
    '       tetapi `url` dan `serializeBody()` MENERUSKAN NUL apa adanya.',
);

// -- Langkah 2: kontrol positif ---------------------------------------------
console.log('\n[2] KONTROL POSITIF — kunci memang membedakan permintaan berbeda');
const kontrol = [
  ['GET /api/a', new HttpRequest('GET', '/api/a')],
  ['GET /api/b', new HttpRequest('GET', '/api/b')],
  ['POST /api/a body=1', new HttpRequest('POST', '/api/a', '1')],
  ['POST /api/a body=2', new HttpRequest('POST', '/api/a', '2')],
];
const kunciKontrol = kontrol.map(([l, r]) => [l, String(makeCacheKey(r, r.url))]);
for (const [l, k] of kunciKontrol) console.log(`    ${l.padEnd(20)} ${k.slice(0, 24)}...`);
const unikKontrol = new Set(kunciKontrol.map(([, k]) => k)).size;
console.log(`    ${unikKontrol}/4 kunci unik -> pembanding berfungsi.`);

// -- Langkah 3: tabrakan --------------------------------------------------
console.log('\n[3] TABRAKAN — dua permintaan berbeda, satu kunci');

const pasangan = [
  {
    ket: 'geser batas url|body',
    a: new HttpRequest('POST', '/api/x', `RAHASIA${NUL}`),
    b: new HttpRequest('POST', `/api/x${NUL}RAHASIA`, ''),
  },
  {
    ket: 'geser batas body|params',
    a: new HttpRequest('POST', '/api/y', `p${NUL}q=1`),
    b: new HttpRequest('POST', '/api/y', 'p').clone({setParams: {q: '1'}}),
  },
  {
    ket: 'geser batas responseType|url',
    a: new HttpRequest('GET', `${NUL}/api/z`, null, {responseType: 'text'}),
    b: new HttpRequest('GET', '/api/z', null, {responseType: `text${NUL}`}),
  },
];

let tabrakan = 0;
for (const {ket, a, b} of pasangan) {
  const ka = String(makeCacheKey(a, a.url));
  const kb = String(makeCacheKey(b, b.url));
  const sama = ka === kb;
  if (sama) tabrakan++;
  console.log(`\n  ${sama ? '>>> TABRAKAN' : '    beda      '}  ${ket}`);
  const gambar = (r) =>
    `method=${JSON.stringify(r.method)} url=${JSON.stringify(r.url)} ` +
    `body=${JSON.stringify(r.serializeBody())} params=${JSON.stringify(r.params.toString())}`;
  console.log(`      A  ${gambar(a)}`);
  console.log(`      B  ${gambar(b)}`);
  console.log(`      kunci A ${ka}`);
  console.log(`      kunci B ${kb}`);
}

console.log('\n' + garis);
console.log(`Tabrakan: ${tabrakan}/${pasangan.length}`);
console.log(garis);
process.exit(tabrakan > 0 ? 0 : 1);
