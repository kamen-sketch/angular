/**
 * F-21 — `encodeUriSegment` melepas escape pada ':' yang justru menjadi
 * pembatas nama outlet di dalam grup tanda kurung.
 *
 * BERKAS  packages/router/src/url_tree.ts
 *
 *     function encodeUriString(s) {                                  // :513
 *       return encodeURIComponent(s)
 *         .replace(/%40/g, '@')
 *         .replace(/%3A/gi, ':')        <-- ':' DIKEMBALIKAN jadi literal
 *         .replace(/%24/g, '$')
 *         .replace(/%2C/gi, ',');
 *     }
 *
 *     export function encodeUriSegment(s) {                          // :548
 *       return encodeUriString(s)
 *         .replace(/\(/g, '%28')        <-- '(' DIESCAPE, karena struktural
 *         .replace(/\)/g, '%29')        <-- ')' DIESCAPE, karena struktural
 *         .replace(/%26/gi, '&');
 *     }
 *
 * Di baris yang sama penulisnya mengescape '(' dan ')' TEPAT KARENA keduanya
 * struktural bagi gramatika URL router. ':' sama strukturalnya — parser
 * memakainya sebagai pembatas nama outlet — tetapi justru dilepas escape-nya:
 *
 *     private parseParens(allowPrimary, depth) {                     // url_tree.ts
 *       ...
 *       if (path.indexOf(':') > -1) {
 *         outletName = path.slice(0, path.indexOf(':'));
 *       } else if (allowPrimary) {
 *         outletName = PRIMARY_OUTLET;
 *       }
 *
 * Serializer TIDAK menuliskan awalan `k:` untuk outlet primer di dalam kurung
 * (serializeSegment, cabang non-root), sehingga titik dua PERTAMA yang ditemui
 * parser di sana berasal dari data — bukan dari sintaks.
 *
 * SIFAT YANG DIUJI — objektif, bukan selera saya:
 *     parse -> serialize -> parse tidak boleh MEMUNCULKAN NAMA OUTLET BARU.
 * Serializer dan parser ada di kelas yang sama (`DefaultUrlSerializer`), jadi
 * ini bukan perbandingan dengan spesifikasi luar melainkan dengan dirinya
 * sendiri. Serializer yang keluarannya tidak bisa dibaca ulang oleh parsernya
 * sendiri salah menurut ukurannya sendiri.
 *
 * CATATAN METODE — sifat pertama yang saya uji TERLALU LEBAR, dan kontrol
 * negatifnya yang membongkarnya. Mula-mula saya menguji "pohonnya identik".
 * Dengan ukuran itu `/p/(a%3Ab)` ikut gagal — dan saya nyaris mencatatnya
 * sebagai bagian dari temuan. Ternyata `/p/(ab)`, yang TIDAK punya titik dua
 * sama sekali, gagal dengan cara yang persis sama: grup kurung yang isinya
 * hanya satu anak primer memang DIRATAKAN ke daftar segmen induknya. Itu
 * normalisasi yang disengaja dan tidak ada hubungannya dengan titik dua.
 *
 * Jadi "pohon identik" mencampur dua efek berbeda. Sifat yang benar-benar
 * membedakan adalah HIMPUNAN NAMA OUTLET: perataan kurung tidak pernah
 * memunculkan nama baru, sedangkan cacat ini memunculkannya — diambil dari
 * data pengguna. Baris `/p/(ab)` sengaja DIPERTAHANKAN di tabel, ditandai
 * sebagai normalisasi yang diketahui, supaya catatan ini jujur bahwa uji
 * pertama saya salah dan mengapa.
 *
 * Jalankan: node analysis/tools/router-colon/probe.mjs <path-node_modules> [--shot x.png]
 */
import {readFileSync} from 'fs';
import {join} from 'path';
import {pathToFileURL} from 'url';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node probe.mjs <path-ke-node_modules> [--shot out.png]');
  process.exit(2);
}
const M = (p) => pathToFileURL(join(nm, p)).href;
await import(M('@angular/compiler/fesm2022/compiler.mjs'));
const router = await import(M('@angular/router/fesm2022/router.mjs'));
const pkg = JSON.parse(readFileSync(join(nm, '@angular/router/package.json'), 'utf8'));

const {DefaultUrlSerializer} = router;
const ser = new DefaultUrlSerializer();

/** Bentuk kanonik sebuah UrlSegmentGroup — inilah yang dibandingkan. */
function bentuk(g) {
  const anak = {};
  for (const k of Object.keys(g.children).sort()) anak[k] = bentuk(g.children[k]);
  return {
    seg: g.segments.map((s) => ({p: s.path, m: s.parameters})),
    anak,
  };
}
const kanonik = (tree) => JSON.stringify(bentuk(tree.root));

/** Himpunan SEMUA nama outlet yang muncul di mana pun dalam pohon. */
function outletSet(g, out = new Set()) {
  for (const k of Object.keys(g.children)) {
    out.add(k);
    outletSet(g.children[k], out);
  }
  return out;
}
const outletStr = (tree) => [...outletSet(tree.root)].sort().join(',');

const KASUS = [
  // --- yang diselidiki: ':' di segmen PERTAMA outlet primer dalam kurung ---
  {
    url: '/p/(a%3Ab//aux:x)',
    ket: "':' terenkode, outlet primer di dalam kurung",
    sasaran: true,
  },
  {
    url: '/p/(admin%3Adash//aux:x)',
    ket: "idem, nilai lebih realistis",
    sasaran: true,
  },
  // --- KONTROL NEGATIF ---
  // Fungsi yang SAMA mengescape '(' dan ')'. Kalau keduanya round-trip dan ':'
  // tidak, maka pembedanya memang karakter itu — bukan "kurung merusak semua".
  {url: '/p/(a%28b//aux:x)', ket: "'(' terenkode — DIESCAPE encodeUriSegment", sasaran: false},
  {url: '/p/(a%29b//aux:x)', ket: "')' terenkode — DIESCAPE encodeUriSegment", sasaran: false},
  {url: '/p/(a%2Fb//aux:x)', ket: "'/' terenkode — tetap %2F", sasaran: false},
  {url: '/p/(a%3Bb//aux:x)', ket: "';' terenkode — tetap %3B", sasaran: false},
  // ':' di posisi yang TIDAK struktural — harus baik-baik saja.
  {url: '/p/a%3Ab', ket: "':' di segmen biasa, tanpa kurung", sasaran: false},
  {url: '/p/(aux:a%3Ab)', ket: "':' di segmen outlet BERNAMA (ada awalan k:)", sasaran: false},
  // Tanpa ':' sama sekali — kontrol dasar.
  {url: '/p/(ab//aux:x)', ket: 'tanpa titik dua sama sekali', sasaran: false},
  // Pasangan yang membongkar uji pertama saya. Keduanya DIRATAKAN (grup kurung
  // berisi satu anak primer), dan yang tanpa titik dua diratakan juga — jadi
  // perataan itu bukan efek titik dua. Tidak satu pun memunculkan outlet baru.
  {url: '/p/(a%3Ab)', ket: 'kurung 1 anak primer — DIRATAKAN (normalisasi)', sasaran: false},
  {url: '/p/(ab)', ket: 'idem TANPA titik dua — diratakan juga', sasaran: false},
];

const baris = [];
for (const k of KASUS) {
  const t1 = ser.parse(k.url);
  const s1 = ser.serialize(t1);
  const t2 = ser.parse(s1);
  const s2 = ser.serialize(t2);
  const o1 = outletStr(t1);
  const o2 = outletStr(t2);
  baris.push({
    ...k,
    s1,
    s2,
    o1,
    o2,
    c1: kanonik(t1),
    c2: kanonik(t2),
    // Sifat yang dinilai: tidak ada nama outlet BARU.
    stabil: o1 === o2,
    // Dicatat terpisah, hanya sebagai keterangan — bukan dasar penilaian.
    pohonSama: kanonik(t1) === kanonik(t2),
  });
}

const line = '='.repeat(78);
console.log(line);
console.log(`F-21 — round-trip DefaultUrlSerializer, @angular/router@${pkg.version} (artefak npm)`);
console.log(line);
console.log('\nSifat yang dinilai: parse -> serialize -> parse tidak memunculkan NAMA OUTLET BARU.');
console.log('Serializer dan parser adalah kelas yang SAMA, jadi ini uji konsistensi-diri.');
console.log('Kolom "pohon" hanya keterangan — lihat CATATAN METODE di kepala berkas.\n');

for (const r of baris) {
  console.log(`  ${r.stabil ? '  ' : '>>'}${r.url}`);
  console.log(`      ${r.ket}`);
  console.log(`      serialize : ${r.s1}`);
  console.log(
    `      outlet    : {${r.o1}} -> {${r.o2}}   ${r.stabil ? 'sama' : 'OUTLET BARU MUNCUL'}` +
      `   [pohon ${r.pohonSama ? 'sama' : 'beda — diratakan'}]`,
  );
  if (!r.stabil) {
    console.log(`      pohon ke-1: ${r.c1}`);
    console.log(`      pohon ke-2: ${r.c2}`);
  }
}

// ---------------------------------------------------------------------------
// KETERJANGKAUAN — dibangun dari DATA, bukan diurai dari URL yang dibuat-buat.
//
// Bagian di atas berangkat dari string URL, sehingga wajar ditanya: apakah ini
// hanya artefak parsing? Bagian ini menjawabnya dengan membangun UrlTree
// memakai kelas publik yang sama dengan yang dipakai `Router.createUrlTree`,
// lalu MENYERAHKANNYA ke serializer. Nilai penggunanya tidak pernah menyentuh
// sintaks URL — ia hanya sebuah string di dalam sebuah segmen.
// ---------------------------------------------------------------------------
const {UrlTree, UrlSegment, UrlSegmentGroup} = router;

function pohonAplikasi(nilaiPengguna) {
  const grupPrimer = new UrlSegmentGroup([new UrlSegment(nilaiPengguna, {})], {});
  const grupAux = new UrlSegmentGroup([new UrlSegment('x', {})], {});
  const induk = new UrlSegmentGroup([new UrlSegment('p', {})], {
    primary: grupPrimer,
    aux: grupAux,
  });
  return new UrlTree(new UrlSegmentGroup([], {primary: induk}), {}, null);
}

const NILAI = [
  {v: 'laporan', ket: 'nilai biasa (kontrol negatif)'},
  {v: 'admin:dash', ket: 'nilai pengguna memuat titik dua'},
];
console.log('\n' + line);
console.log('KETERJANGKAUAN — UrlTree dibangun dari data lewat API publik');
console.log(line);
console.log('\nrouter.navigate([\'p\', <nilai>]) dengan outlet "aux" bersebelahan:\n');
const barisJangkau = [];
for (const {v, ket} of NILAI) {
  const t = pohonAplikasi(v);
  const s = ser.serialize(t);
  const t2 = ser.parse(s);
  const o1 = outletStr(t);
  const o2 = outletStr(t2);
  // Apakah segmen milik outlet primer masih utuh setelah bolak-balik?
  const utuh = JSON.stringify(bentuk(t2.root)).includes(JSON.stringify({p: v, m: {}}));
  barisJangkau.push({v, ket, s, o1, o2, ok: o1 === o2 && utuh});
  console.log(`  ${o1 === o2 && utuh ? '  ' : '>>'}nilai = ${JSON.stringify(v)}   (${ket})`);
  console.log(`      URL yang ditulis ke address bar : ${s}`);
  console.log(`      outlet {${o1}} -> {${o2}}   segmen utuh: ${utuh}`);
}

const jangkauRusak = barisJangkau.filter((r) => !r.ok);
const jangkauKontrol = barisJangkau.filter((r) => r.ket.includes('kontrol')).every((r) => r.ok);

const rusak = baris.filter((r) => r.sasaran && !r.stabil);
const kontrolStabil = baris.filter((r) => !r.sasaran).every((r) => r.stabil);

console.log('\n' + line);
console.log(
  `Kasus sasaran yang TIDAK stabil: ${rusak.length}/${baris.filter((r) => r.sasaran).length}   ` +
    `semua kontrol negatif stabil: ${kontrolStabil}`,
);

if (rusak.length && kontrolStabil) {
  console.log('');
  console.log('TERKONFIRMASI, dan kontrol negatifnya yang membuat ini bermakna:');
  console.log("  '(' dan ')' — DIESCAPE oleh encodeUriSegment — round-trip dengan benar.");
  console.log("  '/' dan ';' — dibiarkan terenkode          — round-trip dengan benar.");
  console.log("  ':' di segmen biasa dan di outlet BERNAMA  — round-trip dengan benar.");
  console.log("  ':' di segmen PERTAMA outlet primer dalam kurung — TIDAK.");
  console.log('');
  console.log('Jadi pemicunya bukan "kurung merusak segalanya", melainkan satu karakter');
  console.log('di satu posisi: tempat parser membaca nama outlet, dan tempat serializer');
  console.log('tidak menuliskan awalan `k:` apa pun sehingga titik dua pertama yang');
  console.log('ditemui parser berasal dari DATA.');
  console.log('');
  console.log('Inkonsistensi-diri: encodeUriSegment mengescape ( dan ) TEPAT KARENA');
  console.log('keduanya struktural bagi gramatika ini, di baris yang sama tempat');
  console.log('encodeUriString melepas escape pada : yang sama strukturalnya.');
  console.log('');
  console.log(
    `Keterjangkauan: ${jangkauRusak.length} dari ${barisJangkau.length} nilai yang dibangun ` +
      `lewat API publik rusak, kontrolnya utuh: ${jangkauKontrol}.`,
  );
  console.log('Nilai penggunanya tidak pernah menyentuh sintaks URL — ia hanya sebuah');
  console.log('string di dalam sebuah segmen. Serializer sendiri yang menjadikannya sintaks.');
} else {
  console.log('Tidak terkonfirmasi.');
}
console.log(line);
process.exit(rusak.length && kontrolStabil && jangkauRusak.length && jangkauKontrol ? 0 : 1);
