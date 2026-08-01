/**
 * F-20 — `TransferState.get()` membaca lewat rantai prototipe, sementara
 * `hasKey()` tepat di bawahnya memakai `hasOwnProperty`.
 *
 * BERKAS  packages/core/src/transfer_state.ts
 *
 *     store: Record<string, unknown | undefined> = {};          // :82  objek literal
 *
 *     get<T>(key: StateKey<T>, defaultValue: T): T {
 *       return this.store[key] !== undefined ? (this.store[key] as T) : defaultValue;   // :90
 *     }                                                          ^ TANPA penjaga
 *
 *     hasKey<T>(key: StateKey<T>): boolean {
 *       return this.store.hasOwnProperty(key);                   // :111  DENGAN penjaga
 *     }
 *
 * Dua puluh baris, satu kelas, dua perlakuan. `get()` mengembalikan anggota
 * `Object.prototype` alih-alih `defaultValue` yang diminta pemanggil.
 *
 * Ditemukan saat menelusuri core/src/resource: `resource({id})` meneruskan
 * string pilihan developer LANGSUNG sebagai StateKey (resource.ts:83,
 * `options.id as StateKey<T>`) tanpa hashing maupun namespacing.
 *
 * Jalan pemanggilan di resource.ts:290 KEBETULAN aman karena ia memanggil
 * `hasKey()` lebih dulu. Yang tidak aman adalah API publiknya sendiri.
 *
 * Jalankan: node analysis/tools/transferstate-get/probe.mjs <path-node_modules>
 */
import {readFileSync} from 'fs';
import {join} from 'path';
import {pathToFileURL} from 'url';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node probe.mjs <path-ke-node_modules>');
  process.exit(2);
}
const M = (p) => pathToFileURL(join(nm, p)).href;
await import(M('@angular/compiler/fesm2022/compiler.mjs'));
const core = await import(M('@angular/core/fesm2022/core.mjs'));
const pkg = JSON.parse(readFileSync(join(nm, '@angular/core/package.json'), 'utf8'));

const {Injector, TransferState, DOCUMENT, APP_ID, makeStateKey} = core;

const injector = Injector.create({
  providers: [
    {provide: DOCUMENT, useValue: {getElementById: () => null}},
    {provide: APP_ID, useValue: 'ng'},
    TransferState,
  ],
});
const ts = injector.get(TransferState);

const PENANDA = Symbol('default-milik-pemanggil');
const DEFAULT = {penanda: 'INI-DEFAULT-SAYA'};

const KUNCI = [
  {k: 'profil', warisan: false, ket: 'kunci biasa'},
  {k: 'user-42', warisan: false, ket: 'kunci biasa'},
  {k: 'toString', warisan: true, ket: 'anggota Object.prototype'},
  {k: 'constructor', warisan: true, ket: 'anggota Object.prototype'},
  {k: 'valueOf', warisan: true, ket: 'anggota Object.prototype'},
  {k: 'hasOwnProperty', warisan: true, ket: 'anggota Object.prototype'},
];

const line = '='.repeat(78);
console.log(line);
console.log(`F-20 — TransferState.get(), @angular/core@${pkg.version} (artefak npm)`);
console.log(line);
console.log('\nStore KOSONG. Setiap get() seharusnya mengembalikan defaultValue pemanggil.\n');
console.log('  kunci              hasKey()   get(kunci, DEFAULT) mengembalikan');

const rows = [];
for (const {k, warisan, ket} of KUNCI) {
  const key = makeStateKey(k);
  const has = ts.hasKey(key);
  const got = ts.get(key, DEFAULT);
  const benar = got === DEFAULT;
  rows.push({k, warisan, ket, has, benar, tipe: typeof got});
  console.log(
    `  ${benar ? '  ' : '>>'}${k.padEnd(17)}${String(has).padEnd(11)}` +
      (benar ? 'DEFAULT (benar)' : `${typeof got} — BUKAN default, ini ${String(got).slice(0, 34)}`),
  );
}

console.log('\n  Asimetri di dalam satu kelas:');
console.log('    hasKey()  -> this.store.hasOwnProperty(key)   transfer_state.ts:111  DIJAGA');
console.log('    get()     -> this.store[key] !== undefined    transfer_state.ts:90   TIDAK');

const warisanSalah = rows.filter((r) => r.warisan && !r.benar);
const biasaBenar = rows.filter((r) => !r.warisan).every((r) => r.benar);
const hasKeySelaluBenar = rows.every((r) => r.has === false);

console.log('\n' + line);
console.log(
  `Kunci warisan yang mengembalikan BUKAN default: ${warisanSalah.length}/` +
    `${rows.filter((r) => r.warisan).length}   ` +
    `kunci biasa benar: ${biasaBenar}   hasKey() konsisten false: ${hasKeySelaluBenar}`,
);
if (warisanSalah.length && biasaBenar && hasKeySelaluBenar) {
  console.log('');
  console.log('TERKONFIRMASI. Tiga hal sekaligus:');
  console.log('  1. `hasKey()` menjawab false dengan BENAR untuk semua kunci warisan.');
  console.log('  2. `get()` pada store yang sama mengembalikan anggota Object.prototype,');
  console.log('     bukan defaultValue yang diminta pemanggil.');
  console.log('  3. Kunci biasa berperilaku benar — jadi pemicunya spesifik, bukan');
  console.log('     "semua kunci aneh rusak".');
  console.log('');
  console.log('Perbaikan satu baris:');
  console.log('    get<T>(key, defaultValue) {');
  console.log('      return this.store.hasOwnProperty(key) ? this.store[key] : defaultValue;');
  console.log('    }');
  console.log('  atau jadikan store `Object.create(null)`.');
} else {
  console.log('Tidak terkonfirmasi.');
}
console.log(line);
process.exit(warisanSalah.length && biasaBenar && hasKeySelaluBenar ? 0 : 1);
