/**
 * VALIDASI HOLDOUT — mengukur DAYA TEMU pemindai pada kasus yang BUKAN kasus
 * yang melahirkannya.
 *
 * MENGAPA INI ADA
 * ---------------
 * Sampai sekarang setiap pemindai divalidasi dengan cara menemukan kembali
 * temuan yang MELAHIRKANNYA (G-27 harus menemukan F-06, F-17, F-20). Itu
 * berguna sebagai uji regresi, tetapi secara metodologis sama dengan menguji
 * model memakai data latihnya sendiri. Ia membuktikan pemindai tidak MUNDUR;
 * ia tidak membuktikan pemindai bisa MENEMUKAN.
 *
 * Berkas ini memisahkan keduanya. Mutan di bawah `mutants/` adalah cacat yang
 * SEMANTIKNYA IDENTIK dengan kelas yang dikenal, tetapi DITULIS BERBEDA —
 * simbol diganti, peta dibangun helper, dibaca lewat Reflect.get, lewat alias,
 * atau lewat optional chaining. Kontrol negatif (N*) benar-benar aman dan tidak
 * boleh pernah dilaporkan.
 *
 * DUA ANGKA YANG BERBEDA, DAN KEDUANYA PENTING:
 *   DAYA TEMU (recall)      — berapa banyak mutan yang tertangkap.
 *   KETEPATAN (specificity) — apakah kontrol negatif TIDAK tertangkap.
 * Pemindai yang ketat cenderung punya ketepatan tinggi dan daya temu rendah.
 * Itulah yang perlu terlihat sebagai ANGKA, bukan sebagai kesan.
 *
 * SIFAT RATCHET: berkas ini menyimpan garis dasar. Ia gagal bila daya temu
 * TURUN di bawah garis dasar, atau bila ada kontrol negatif yang tertangkap.
 * Naiknya daya temu tidak otomatis lulus — garis dasarnya harus dinaikkan
 * dengan sengaja, supaya perbaikan tercatat, bukan tak sengaja.
 *
 * Jalankan: node analysis/regex-corpus/holdout/validate-mutants.mjs
 */
import {execFileSync} from 'child_process';
import {readdirSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..'); // /home/user/angular
const MUTANTS = join(HERE, 'mutants');

/**
 * GARIS DASAR — diukur, bukan diinginkan.
 * Dinaikkan hanya bersamaan dengan perbaikan pemindai yang disengaja.
 */
const GARIS_DASAR = {
  'scan-proto-read.mjs': {dayaTemu: 5, dari: 5},
};

const KASUS = readdirSync(join(MUTANTS, 'packages', 'mut', 'src')).sort();
const mutan = KASUS.filter((f) => f.startsWith('m'));
const negatif = KASUS.filter((f) => f.startsWith('n'));

const line = '='.repeat(78);
console.log(line);
console.log('VALIDASI HOLDOUT — daya temu pemindai pada kasus di LUAR data latihnya');
console.log(line);
console.log(`\nMutan (cacat sama, ditulis berbeda): ${mutan.length}`);
for (const f of mutan) console.log(`    ${f}`);
console.log(`Kontrol negatif (benar-benar aman): ${negatif.length}`);
for (const f of negatif) console.log(`    ${f}`);

let gagal = false;
for (const [pemindai, dasar] of Object.entries(GARIS_DASAR)) {
  let out;
  try {
    out = execFileSync('node', [join(ROOT, 'analysis', 'regex-corpus', pemindai)], {
      cwd: ROOT,
      env: {...process.env, CORPUS_ROOT: MUTANTS, CORPUS_NO_SELFVALIDATE: '1'},
      encoding: 'utf8',
    });
  } catch (e) {
    out = (e.stdout || '') + (e.stderr || '');
  }

  // "Tertangkap" harus berarti DILAPORKAN SEBAGAI CACAT, bukan sekadar disebut.
  // Jalan pertama harness ini memakai `out.includes(f)` dan langsung menuduh
  // n2-guarded sebagai salah-lapor — padahal pemindai menempatkannya dengan
  // BENAR di daftar "berkasnya punya penjaga", yang memang bukan tuduhan cacat.
  // Harness yang tidak membedakan bagian keluaran akan menghukum pemindai atas
  // penilaian yang justru tepat.
  const BAGIAN_CACAT = /--- TANPA penjaga apa pun[\s\S]*?(?=\n--- |\n={10})|ASIMETRI —[\s\S]*?(?=\n  Tanpa penjaga|\n={10})|--- Tanpa penjaga di mana pun[\s\S]*?(?=\n={10})/g;
  const wilayahCacat = (out.match(BAGIAN_CACAT) || []).join('\n');
  const tertangkap = (f) => wilayahCacat.includes(f);
  const mDitemukan = mutan.filter(tertangkap);
  const nDitemukan = negatif.filter(tertangkap);

  console.log('\n' + line);
  console.log(`PEMINDAI: ${pemindai}`);
  console.log(line);
  for (const f of mutan) {
    console.log(`  ${tertangkap(f) ? 'TERTANGKAP  ' : '>>LOLOS     '}${f}`);
  }
  for (const f of negatif) {
    console.log(`  ${tertangkap(f) ? '>>SALAH LAPOR' : 'benar diam  '}${f}`);
  }

  const dayaTemu = mDitemukan.length;
  const pct = ((dayaTemu / mutan.length) * 100).toFixed(0);
  console.log('');
  console.log(`  DAYA TEMU  : ${dayaTemu}/${mutan.length}  (${pct}%)   garis dasar: ${dasar.dayaTemu}/${dasar.dari}`);
  console.log(`  KETEPATAN  : ${negatif.length - nDitemukan.length}/${negatif.length} kontrol negatif benar didiamkan`);

  if (nDitemukan.length) {
    console.log('  >> GAGAL: kontrol negatif tertangkap — pemindai melaporkan kode yang aman.');
    gagal = true;
  }
  if (dayaTemu < dasar.dayaTemu) {
    console.log('  >> GAGAL: daya temu TURUN di bawah garis dasar.');
    gagal = true;
  }
  if (dayaTemu > dasar.dayaTemu) {
    console.log('  >> Daya temu NAIK di atas garis dasar. Naikkan GARIS_DASAR dengan sengaja.');
    gagal = true;
  }
}

console.log('\n' + line);
console.log('APA YANG ANGKA INI KATAKAN');
console.log(line);
console.log(`
Garis dasar pertama harness ini adalah 1/5 (20%) dengan ketepatan 2/2. Satu-
satunya mutan yang tertangkap saat itu hanyalah yang berganti NAMA; begitu
sintaksisnya berubah, pemindai buta — padahal semantik cacatnya persis sama.

Sekarang 5/5 dengan ketepatan tetap 2/2, dan yang menutup jaraknya ada dua,
keduanya berasal dari kegagalan yang TERUKUR, bukan dari tebakan:

  m2, m4  lapisan def-use intra-berkas — pabrik peta, pemanggilannya, dan
          alias, diselesaikan sampai titik tetap di dalam satu berkas.
  m3, m5  memperluas BENTUK SINK: \`Reflect.get(M, k)\` dan \`M?.[k]\` menelusuri
          rantai prototipe persis seperti \`M[k]\`.

Yang paling perlu dicatat: DUA dari empat kegagalan itu disebabkan penyaring
peredam derau SAYA SENDIRI, bukan oleh keterbatasan leksikal.
  - \`k\` dibuang karena ada di daftar "kunci jelas konstan" (i|j|k|idx|index),
    daftar yang dimaksudkan untuk indeks ARRAY — padahal di m5 \`k\` adalah
    parameter fungsi, kunci yang sepenuhnya dinamis.
  - \`t\` dibuang karena ambang panjang nama 3 karakter.
Penyaring yang dipasang untuk menaikkan ketepatan ternyata menurunkan daya
temu tanpa terlihat, dan hanya holdout yang menunjukkannya.

BIAYA DERAU DI REPOSITORI SUNGGUHAN: NOL pasangan tambahan (39 sebelum dan
sesudah; bentuk-ketiga tetap 10), dan validasi-diri F-06/F-17/F-20 tetap lulus.
Jadi kenaikan daya temu ini bukan hasil melonggarkan ambang secara membabi buta.

BATASNYA, dinyatakan terus terang: def-use ini INTRA-BERKAS dan hanya mengenali
tiga bentuk (pabrik, pemanggilan, alias). Ia bukan taint analysis, tidak
mengikuti nilai lewat parameter, properti, callback, atau modul. Kelas mutan di
sini pun masih satu — prototipe. Pemindai lain belum punya holdout sama sekali.
`);
process.exit(gagal ? 1 : 0);
