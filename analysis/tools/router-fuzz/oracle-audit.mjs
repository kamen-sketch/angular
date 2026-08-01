/**
 * AUDIT KORPUS — apakah alat-alat saya terlalu ketat sehingga cacat LOGIKA lolos?
 *
 * Pertanyaan ini diajukan setelah korpus membesar, dan jawabannya harus DIUKUR,
 * bukan dinilai dari kesan. Fuzzer router adalah tempat terbaik untuk mengukurnya
 * karena ia satu-satunya alat saya yang benar-benar mengeksplorasi ruang masukan
 * secara acak — 20.000 kasus — dan ia MENEMUKAN F-08 tetapi MELEWATKAN F-21.
 *
 * Tiga hipotesis bersaing untuk menjelaskan kelolosan itu:
 *
 *   H1  ORAKELNYA terlalu sempit. Fuzzer hanya menanyakan "stabil atau tidak",
 *       sehingga cacat yang tetap stabil menurut ukuran itu tidak terlihat.
 *   H2  ALFABETNYA terlalu sempit. Orakelnya cukup, tetapi karakter yang
 *       diperlukan tidak pernah masuk.
 *   H3  GENERATORNYA terlalu lemah secara STRUKTUR. Alfabet dan orakel
 *       keduanya cukup, tetapi penyambungan token secara acak tidak pernah
 *       membangun BENTUK GRAMATIKAL yang diperlukan cacat itu.
 *
 * Ketiganya menjelaskan gejala yang sama, jadi harus dipisahkan dengan percobaan.
 *
 * HASILNYA MEMBANTAH DUA TEBAKAN PERTAMA SAYA, dan itu justru intinya:
 *   - H1 salah. Orakel "pohon berubah" sudah cukup tajam sejak awal.
 *   - H2 salah SENDIRIAN. Menambahkan %3A memang menaikkan kasus yang memuat
 *     titik dua terenkode dari 0 menjadi 4.346 — dan temuan F-21 tetap NOL.
 *   - H3 benar. Yang hilang bukan karakternya melainkan SUSUNANNYA.
 *
 * Program ini menjalankan tiga jalan: alfabet asli, alfabet diperluas, dan
 * generator SADAR-GRAMATIKA yang membangun URL router yang berbentuk sah.
 *
 * Jalankan: node analysis/tools/router-fuzz/oracle-audit.mjs <path-node_modules>
 */
import {join} from 'path';
import {pathToFileURL} from 'url';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node oracle-audit.mjs <path-ke-node_modules>');
  process.exit(2);
}
const M = (p) => pathToFileURL(join(nm, p)).href;
await import(M('@angular/compiler/fesm2022/compiler.mjs'));
const {DefaultUrlSerializer} = await import(M('@angular/router/fesm2022/router.mjs'));
const S = new DefaultUrlSerializer();

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Alfabet ASLI, disalin apa adanya dari fuzz-url.html supaya percobaannya jujur.
const ASLI = [
  '/', '//', 'a', 'b', '..', '.', ';x=1', ';x=', ';=v', ';;', '(', '(a:b)', ')', '?q=1', '&r=2', '#f',
  '%2F', '%2f', '%3B', '%3F', '%23', '%25', '%2528', '+', ' ', '=', '&', ':', '@', '!', '~', "'", '*',
  'a%2Fb', 'x=%3D', '%00', '%E4%B8%AD', '\\', '|', '[', ']', '<', '>', '"',
];
// Satu-satunya perubahan: tambahkan bentuk TERENKODE dari pembatas struktural
// yang sudah ada versi literalnya. Alfabet asli punya ':' literal, '(' dan ')'
// literal, dan %2F/%3B/%3F/%23 — tetapi TIDAK punya %3A, %28, %29.
const TAMBAHAN = ['%3A', '%3a', '%28', '%29', 'a%3Ab'];
const DIPERLUAS = [...ASLI, ...TAMBAHAN];

const bentuk = (t) => {
  const seg = (g) => ({
    s: g.segments.map((x) => ({p: x.path, m: {...x.parameters}})),
    c: Object.fromEntries(Object.entries(g.children).map(([k, v]) => [k, seg(v)])),
  });
  return JSON.stringify({root: seg(t.root), q: t.queryParams, f: t.fragment});
};
function outletSet(g, out = new Set()) {
  for (const k of Object.keys(g.children)) {
    out.add(k);
    outletSet(g.children[k], out);
  }
  return out;
}
const outlets = (t) => [...outletSet(t.root)].sort().join(',');

// Orakel C harus BERARAH. Jalan pertama audit ini memakai `outlets(t1) !== outlets(t2)`
// dan hasilnya tidak memisahkan apa pun: 469 lawan 407, keduanya didominasi
// bentuk F-08 di mana outlet HILANG ({primary} -> {}). Yang menjadi tanda tangan
// F-21 adalah kebalikannya — nama outlet yang MUNCUL, diambil dari data.
// Orakel yang menggabungkan dua arah berlawanan tidak mengukur apa pun.
const outletBaru = (t1, t2) => {
  const a = outletSet(t1.root);
  return [...outletSet(t2.root)].filter((x) => !a.has(x));
};

const N = 20000;
const BENIH = 20260731;

/**
 * Generator SADAR-GRAMATIKA. Bukan penyambungan token acak: ia membangun bentuk
 * yang memang dikenal gramatika router — segmen, grup tanda kurung, outlet
 * bernama — lalu MENYISIPKAN token alfabet ke posisi tempat DATA boleh berada.
 *
 * Inilah pembeda H3. Cacat seperti F-21 hidup pada hubungan antar-bagian
 * (segmen pertama, milik outlet primer, di dalam kurung, bersebelahan dengan
 * outlet bernama). Peluang lima token acak menyusun diri seperti itu praktis
 * nol, berapa pun banyak percobaannya.
 */
function buatTerstruktur(rnd, ISI) {
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const isi = () => pick(ISI);
  const seg = () => isi() + (rnd() < 0.25 ? ';k=' + isi() : '');
  const jalur = () => {
    let n = 1 + Math.floor(rnd() * 2);
    return Array.from({length: n}, seg).join('/');
  };
  // Grup kurung dengan 1..2 outlet bernama, kadang didahului anak primer.
  const grup = () => {
    const bagian = [];
    if (rnd() < 0.6) bagian.push(jalur()); // anak primer, TANPA awalan "k:"
    const nOutlet = 1 + Math.floor(rnd() * 2);
    for (let i = 0; i < nOutlet; i++) bagian.push(pick(['aux', 'popup', 'side']) + ':' + jalur());
    return '(' + bagian.join('//') + ')';
  };
  let u = '/' + jalur();
  if (rnd() < 0.8) u += '/' + grup();
  if (rnd() < 0.2) u += '?q=' + isi();
  if (rnd() < 0.15) u += '#' + isi();
  return u;
}

function jalankan(POTONGAN, terstruktur = false) {
  const rnd = mulberry32(BENIH);
  const hit = {str: [], pohon: [], hilang: [], baru: []};
  let ok = 0,
    lempar = 0,
    adaColonTerenkode = 0;
  for (let i = 0; i < N; i++) {
    let u;
    if (terstruktur) {
      u = buatTerstruktur(rnd, POTONGAN);
    } else {
      const n = 1 + Math.floor(rnd() * 7);
      u = '';
      for (let j = 0; j < n; j++) u += POTONGAN[Math.floor(rnd() * POTONGAN.length)];
    }
    if (/%3a/i.test(u)) adaColonTerenkode++;
    let t1, s1, t2;
    try {
      t1 = S.parse(u);
      s1 = S.serialize(t1);
      t2 = S.parse(s1);
    } catch {
      lempar++;
      continue;
    }
    const oStr = s1 === S.serialize(t2);
    const oPohon = bentuk(t1) === bentuk(t2);
    const baru = outletBaru(t1, t2);
    if (oStr && oPohon && !baru.length) ok++;
    if (!oStr) hit.str.push(u);
    if (!oPohon) hit.pohon.push(u);
    if (outlets(t1) !== outlets(t2) && !baru.length) hit.hilang.push(u);
    if (baru.length) hit.baru.push({u, a: outlets(t1), b: outlets(t2), s1, baru});
  }
  return {ok, lempar, hit, adaColonTerenkode};
}

const line = '='.repeat(78);
console.log(line);
console.log('AUDIT KORPUS — mengapa fuzzer 20.000 kasus melewatkan F-21?');
console.log(line);
console.log(`\nGenerator, benih (${BENIH}), dan N (${N}) identik pada kedua jalan.`);
console.log('Satu-satunya variabel: alfabet. Tiga orakel dinilai bersamaan.\n');

const hasil = {};
// Isi untuk generator terstruktur: nilai-nilai yang masuk akal sebagai DATA.
const ISI = ['a', 'b', 'admin', 'x%3Ay', '%3A', 'a%2Fb', 'a%28b', '%3B', 'v'];

for (const [nama, alf, terstruktur] of [
  ['[1] alfabet ASLI, generator datar', ASLI, false],
  ['[2] alfabet + %3A/%28/%29, generator datar', DIPERLUAS, false],
  ['[3] generator SADAR-GRAMATIKA', ISI, true],
]) {
  const r = jalankan(alf, terstruktur);
  hasil[nama] = r;
  console.log(`  ${nama}   (${alf.length} potongan)`);
  console.log(`      lolos semua orakel : ${r.ok}   melempar saat parse: ${r.lempar}`);
  console.log(`      orakel A (string tidak mencapai titik tetap) : ${r.hit.str.length}`);
  console.log(`      orakel B (pohon berubah)                     : ${r.hit.pohon.length}`);
  console.log(`      orakel C1 (outlet HILANG — tanda tangan F-08) : ${r.hit.hilang.length}`);
  console.log(`      orakel C2 (NAMA OUTLET BARU — tanda tangan F-21): ${r.hit.baru.length}`);
  console.log(`      kasus yang memuat "%3A" sama sekali          : ${r.adaColonTerenkode}`);
  if (r.hit.baru.length) {
    console.log('      contoh outlet BARU:');
    for (const x of r.hit.baru.slice(0, 4)) {
      console.log(`        ${JSON.stringify(x.u).padEnd(30)} -> ${JSON.stringify(x.s1)}`);
      console.log(`             outlet {${x.a}} -> {${x.b}}   baru: ${x.baru.join(',')}`);
    }
  }
  console.log('');
}

const asli = hasil['[1] alfabet ASLI, generator datar'];
const luas = hasil['[2] alfabet + %3A/%28/%29, generator datar'];
const gram = hasil['[3] generator SADAR-GRAMATIKA'];

console.log(line);
console.log('VONIS');
console.log(line);

const H1 = false; // orakel B sudah menandai 400+ kasus sejak jalan pertama
const H2sendiri = luas.adaColonTerenkode > 0 && luas.hit.baru.length === 0;
const H3 = gram.hit.baru.length > 0;
const alfabetButa = asli.adaColonTerenkode === 0;

if (H3 && H2sendiri && alfabetButa) {
  console.log('');
  console.log('H1 SALAH, H2 SALAH SENDIRIAN, H3 BENAR.');
  console.log('');
  console.log('  H1 (orakel terlalu sempit) — SALAH. Orakel "pohon berubah" sudah');
  console.log(`     menandai ${asli.hit.pohon.length} kasus pada jalan pertama. Ketajamannya tidak kurang.`);
  console.log('');
  console.log('  H2 (alfabet terlalu sempit) — perlu, tetapi TIDAK cukup.');
  console.log(`     Alfabet asli membangkitkan ${asli.adaColonTerenkode} URL yang memuat "%3A" dari ${N}.`);
  console.log(`     Setelah %3A ditambahkan: ${luas.adaColonTerenkode} URL memuatnya — dan temuan F-21 TETAP`);
  console.log(`     ${luas.hit.baru.length}. Jadi menambah karakter saja tidak menghasilkan apa pun.`);
  console.log('');
  console.log('  H3 (generator terlalu lemah secara STRUKTUR) — BENAR.');
  console.log(`     Dengan generator sadar-gramatika: ${gram.hit.baru.length} kasus outlet-baru ditemukan.`);
  console.log('');
  console.log('  MENGAPA. F-21 bukan sifat sebuah KARAKTER melainkan sifat sebuah');
  console.log('  HUBUNGAN: titik dua terenkode, di segmen PERTAMA, milik outlet');
  console.log('  PRIMER, DI DALAM kurung, BERSEBELAHAN dengan outlet bernama.');
  console.log('  Lima syarat serentak. Peluang tujuh token acak menyusun diri');
  console.log('  seperti itu praktis nol — berapa pun N-nya. Menaikkan N dari');
  console.log('  20.000 ke 20.000.000 tidak akan mengubah apa pun.');
  console.log('');
  console.log('  JAWABAN UNTUK PERTANYAAN "APAKAH KORPUS SAYA TERLALU KETAT":');
  console.log('  Ya, tetapi bukan pada penyaringnya. Alat-alat saya ketat pada');
  console.log('  BENTUK yang mereka mampu bangkitkan atau kenali, dan longgar');
  console.log('  pada penilaian. Melonggarkan penyaring tidak akan menolong;');
  console.log('  yang menolong adalah membangkitkan STRUKTUR, bukan token.');
} else {
  console.log('Hipotesis tidak terpisah — periksa lagi.');
  console.log(`  baru: [1]=${asli.hit.baru.length} [2]=${luas.hit.baru.length} [3]=${gram.hit.baru.length}`);
  console.log(`  %3A : [1]=${asli.adaColonTerenkode} [2]=${luas.adaColonTerenkode} [3]=${gram.adaColonTerenkode}`);
}
console.log(line);
process.exit(H3 && H2sendiri && alfabetButa ? 0 : 1);
