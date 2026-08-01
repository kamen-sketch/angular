/**
 * F-12 langkah 2 — DAMPAK, dijalankan lewat ngsw-worker.js npm yang sebenarnya.
 *
 * Langkah 1 (pattern-anchor.mjs) hanya menunjukkan regexnya cocok. Itu belum
 * dampak. Di sini kita muat service worker Angular yang benar-benar dikirim
 * ke dalam ServiceWorkerGlobalScope tiruan, nyalakan install/activate, lalu
 * kirim event `fetch` sungguhan dan lihat APA YANG DIA LAKUKAN.
 *
 * Pertanyaan yang dijawab:
 *   1. Apakah SW mengambil alih permintaan LINTAS-ORIGIN yang tidak dimaksudkan
 *      developer, hanya karena path-nya memuat `/api/`?
 *   2. Kalau ya, apakah responsnya disimpan ke Cache Storage aplikasi dan
 *      DISAJIKAN ULANG dari cache pada permintaan berikutnya (strategi
 *      'performance'), sehingga jaringan tidak lagi disentuh?
 *
 * Kontrol negatif: URL lintas-origin yang TIDAK memuat `/api/` harus selalu
 * lewat ke jaringan setiap kali.
 *
 * Jalankan: node analysis/tools/ngsw/crossorigin-cache.mjs <path-node_modules>
 */
import {readFileSync} from 'fs';
import {createHash} from 'crypto';
import {join} from 'path';
import {pathToFileURL} from 'url';
import {muatWorker} from './mock-sw.mjs';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node crossorigin-cache.mjs <path-ke-node_modules>');
  process.exit(2);
}
const swDir = join(nm, '@angular/service-worker');
const pkg = JSON.parse(readFileSync(join(swDir, 'package.json'), 'utf8'));
const {Generator} = await import(
  pathToFileURL(join(swDir, 'fesm2022/config.mjs')).href
);

const SCOPE = 'https://app.example.com/';

// -- manifest dibuat oleh Generator npm, bukan ditulis tangan ----------------
const isiBerkas = {'/index.html': '<html>app</html>', '/main.js': 'console.log(1)'};
const fsPalsu = {
  list: async () => Object.keys(isiBerkas),
  read: async (p) => isiBerkas[p],
  // Hash harus SHA-1 asli dari isi berkas: SW memverifikasi aset yang diunduh
  // dengan sha1Binary() miliknya sendiri, dan hash palsu akan membuat instalasi
  // aset gagal sehingga versinya rusak sebelum uji dimulai.
  hash: async (p) => createHash('sha1').update(Buffer.from(isiBerkas[p], 'utf8')).digest('hex'),
  write: async () => {},
};
const manifest = await new Generator(fsPalsu, '/').process({
  index: '/index.html',
  assetGroups: [
    {name: 'app', installMode: 'prefetch', resources: {files: ['/index.html', '/main.js']}},
  ],
  dataGroups: [
    {
      name: 'api',
      urls: ['/api/**'],
      cacheConfig: {strategy: 'performance', maxSize: 100, maxAge: '1d'},
    },
  ],
  navigationUrls: ['/**', '!/api/**'],
});

// -- "jaringan": setiap panggilan mengembalikan nilai yang BERBEDA ----------
// Kalau permintaan kedua mengembalikan nilai pertama, berarti ia dari cache.
let penghitung = 0;
const hitPerUrl = new Map();
async function jaringan(req) {
  const u = req.url;
  hitPerUrl.set(u, (hitPerUrl.get(u) ?? 0) + 1);
  if (u.endsWith('/ngsw.json') || u.includes('ngsw.json?')) {
    return new Response(JSON.stringify(manifest), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  }
  const lokal = Object.keys(isiBerkas).find((f) => u === SCOPE.replace(/\/$/, '') + f);
  if (lokal) {
    return new Response(isiBerkas[lokal], {status: 200});
  }
  return new Response(`respons-#${++penghitung}`, {status: 200});
}

const scope = muatWorker(join(swDir, 'ngsw-worker.js'), SCOPE, jaringan);

await scope.kirim('install');
await scope.kirim('activate');
// Di peramban, `activate` mem-post {action:'INITIALIZE'} ke worker aktif, dan
// pesan itu kembali sebagai event `message` yang memicu inisialisasi (unduh
// ngsw.json, bangun AppVersion). Tanpa menyampaikannya, SW tidak pernah punya
// manifest dan seluruh uji jadi no-op yang menyesatkan.
for (const pesan of scope.pesanKeDiriSendiri) {
  await scope.kirim('message', {data: pesan, source: null, ports: []});
}
if (!scope.pesanKeDiriSendiri.length) {
  console.error('Tidak ada pesan INITIALIZE; alur bootstrap SW berubah. Hentikan.');
  process.exit(2);
}

/** Mengirim event fetch nyata dan mengembalikan body + apakah jaringan tersentuh. */
async function ambil(url, ke = 1) {
  const sebelum = hitPerUrl.get(url) ?? 0;
  const req = new Request(url, {mode: 'cors'});
  const res = await scope.kirim('fetch', {
    request: req,
    clientId: 'klien-1',
    resultingClientId: undefined,
  });
  const sesudah = hitPerUrl.get(url) ?? 0;
  return {
    ditangani: res !== undefined,
    body: res ? await res.clone().text() : '(SW tidak mengambil alih)',
    jaringanDisentuh: sesudah > sebelum,
    ke,
  };
}

const garis = '='.repeat(78);
console.log(garis);
console.log(`F-12 dampak — ngsw-worker.js @angular/service-worker@${pkg.version} (npm)`);
console.log(garis);
console.log(`\nscope aplikasi : ${SCOPE}`);
console.log(`pola dataGroup : ${JSON.stringify(manifest.dataGroups[0].patterns)}`);
console.log('strategi       : performance (sajikan dari cache bila ada)');

const kasus = [
  ['https://app.example.com/api/orders', 'origin sendiri — MEMANG dimaksudkan'],
  ['https://payments.other-company.test/v1/api/charge', 'LINTAS-ORIGIN, path memuat /api/'],
  ['https://analytics.other.test/t?u=/api/x', 'LINTAS-ORIGIN, /api/ hanya di QUERY'],
  ['https://payments.other-company.test/v1/charge', 'KONTROL NEGATIF — tanpa /api/'],
];

const hasil = [];
for (const [url, ket] of kasus) {
  const a = await ambil(url, 1);
  const b = await ambil(url, 2);
  hasil.push({url, ket, a, b});
}

console.log('\n' + garis);
for (const {url, ket, a, b} of hasil) {
  const disajikanDariCache = b.ditangani && !b.jaringanDisentuh && b.body === a.body;
  console.log(`\n  ${url}`);
  console.log(`    ${ket}`);
  console.log(
    `    ambil #1  ditangani SW=${a.ditangani}  jaringan=${a.jaringanDisentuh}  body=${JSON.stringify(a.body)}`,
  );
  console.log(
    `    ambil #2  ditangani SW=${b.ditangani}  jaringan=${b.jaringanDisentuh}  body=${JSON.stringify(b.body)}`,
  );
  console.log(`    -> disajikan dari cache pada #2: ${disajikanDariCache ? 'YA' : 'tidak'}`);
}

// Isi Cache Storage aplikasi setelah semuanya.
console.log('\n' + garis);
console.log('Isi Cache Storage aplikasi (nama cache -> URL yang tersimpan)');
console.log(garis);
const asing = [];
for (const [nama, cache] of scope.caches.caches) {
  const urls = Array.from(cache.entri.keys());
  const luar = urls.filter((u) => !u.startsWith(SCOPE.replace(/\/$/, '')));
  if (luar.length) {
    console.log(`\n  ${nama}`);
    for (const u of luar) {
      console.log(`    LINTAS-ORIGIN  ${u}`);
      asing.push(u);
    }
  }
}
if (!asing.length) console.log('\n  (tidak ada URL lintas-origin tersimpan)');

console.log('\n' + garis);
const kontrol = hasil.find((h) => h.ket.startsWith('KONTROL NEGATIF'));
const kontrolBenar = !kontrol.b.ditangani || kontrol.b.jaringanDisentuh;
if (asing.length && kontrolBenar) {
  console.log(`TERKONFIRMASI: ${asing.length} respons LINTAS-ORIGIN disimpan di Cache`);
  console.log('Storage aplikasi dan disajikan ulang tanpa menyentuh jaringan, hanya');
  console.log('karena URL-nya MEMUAT `/api/` di mana pun. Kontrol negatif (URL');
  console.log('lintas-origin tanpa `/api/`) tetap lewat ke jaringan setiap kali.');
} else {
  console.log(`Tidak terkonfirmasi (asing=${asing.length}, kontrolBenar=${kontrolBenar}).`);
}
console.log(garis);
process.exit(asing.length && kontrolBenar ? 0 : 1);
