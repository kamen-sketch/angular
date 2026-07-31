/**
 * F-11 langkah dampak — apakah lemparan `decodePath` benar-benar menjatuhkan
 * sesuatu, atau tertangkap di suatu tempat?
 *
 * Kita bangun `$locationShim` NYATA dari bundel npm dengan dependensi tiruan
 * yang minimal, lalu variasikan SATU hal: URL peramban awal. Jika konstruktor
 * melempar, berarti tidak ada try/catch di rantai
 *   constructor -> $$parseLinkUrl -> $$parse -> parseAppUrl -> decodePath
 * dan aplikasi hibrida (ngUpgrade) gagal bootstrap pada URL tersebut.
 *
 * Ini pembeda tunggal: dependensi, basis, dan urutan panggilan identik di
 * semua kasus; hanya string URL yang berubah.
 *
 * Jalankan: node analysis/tools/upgrade-decode/shim-e2e.mjs <path-node_modules>
 */
import {pathToFileURL} from 'url';
import {readFileSync} from 'fs';
import {join} from 'path';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node shim-e2e.mjs <path-ke-node_modules>');
  process.exit(2);
}
const versi = JSON.parse(readFileSync(join(nm, '@angular/common/package.json'), 'utf8')).version;
await import(pathToFileURL(join(nm, '@angular/compiler/fesm2022/compiler.mjs')).href);
const upgrade = await import(
  pathToFileURL(join(nm, '@angular/common/fesm2022/upgrade.mjs')).href
);
const {AngularJSUrlCodec, ɵ$LocationShim: LocationShim, $locationShim} = upgrade;

const Shim = LocationShim ?? $locationShim ?? upgrade['$locationShim'];
if (typeof Shim !== 'function') {
  console.error('Tidak menemukan kelas $locationShim di bundel. Ekspor:', Object.keys(upgrade));
  process.exit(2);
}

// Dependensi tiruan: hanya anggota yang benar-benar disentuh konstruktor.
function buatDeps(hrefAwal) {
  const u = new URL(hrefAwal);
  const platformLocation = {
    get href() {
      return hrefAwal;
    },
    // `PlatformLocation.protocol` mengikuti `location.protocol` peramban, yang
    // MENYERTAKAN titik dua ('https:'). getServerBase() merangkai
    // `${protocol}//${hostname}`, jadi menghilangkan titik dua di sini akan
    // membuat basis tidak cocok dan seluruh uji jadi no-op.
    protocol: u.protocol,
    hostname: u.hostname,
    port: u.port,
    pathname: u.pathname,
    search: u.search,
    hash: u.hash,
    getState: () => null,
    onPopState: () => () => {},
    onHashChange: () => () => {},
  };
  return {
    // $injector sebagai Promise yang tidak pernah selesai -> initialize() tidak
    // ikut berjalan, jadi yang diuji murni jalur konstruktor.
    $injector: {then: () => {}},
    location: {onUrlChange: () => () => {}},
    platformLocation,
    urlCodec: new AngularJSUrlCodec(),
    locationStrategy: {getBaseHref: () => '/', onPopState: () => {}},
  };
}

function coba(hrefAwal) {
  const d = buatDeps(hrefAwal);
  try {
    const shim = new Shim(d.$injector, d.location, d.platformLocation, d.urlCodec, d.locationStrategy);
    return {ok: true, path: shim.path(), hash: shim.hash()};
  } catch (e) {
    return {ok: false, err: `${e.constructor.name}: ${e.message}`};
  }
}

const garis = '='.repeat(78);
console.log(garis);
console.log(`F-11 dampak — konstruktor $locationShim, @angular/common@${versi} (npm)`);
console.log(garis);
console.log('\nDependensi identik di semua baris. Yang berubah HANYA URL awal.\n');

const kasus = [
  ['https://app.test/dashboard', 'baseline wajar'],
  ['https://app.test/a%20b', 'persen SAH di path'],
  ['https://app.test/dashboard?q=%zz', 'persen MALFORMED di query'],
  ['https://app.test/dashboard#%zz', 'persen MALFORMED di hash'],
  ['https://app.test/a%zz', 'persen MALFORMED di path'],
  ['https://app.test/a%', 'persen menggantung di path'],
];

let gagal = 0;
for (const [href, ket] of kasus) {
  const r = coba(href);
  if (!r.ok) gagal++;
  const status = r.ok ? 'bootstrap OK' : 'BOOTSTRAP GAGAL';
  console.log(`  ${status.padEnd(16)} ${href.padEnd(34)} ${ket}`);
  console.log(`  ${''.padEnd(16)} ${r.ok ? `path=${JSON.stringify(r.path)} hash=${JSON.stringify(r.hash)}` : r.err}`);
}

console.log('\n' + garis);
console.log(`Konstruktor gagal pada ${gagal}/${kasus.length} URL.`);
console.log('Perhatikan barisan query: persen malformed di QUERY selamat (decodeSearch');
console.log('memakai tryDecodeURIComponent), sedangkan di PATH dan HASH tidak. Ketiganya');
console.log('diuraikan pada tiga baris berurutan di parseAppUrl (location_shim.ts:369-371).');
console.log(garis);
