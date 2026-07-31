/**
 * Detektor kelas (b): LOGIKA KEAMANAN YANG DIDUPLIKASI.
 *
 * Gagasan intinya satu aturan tegas — bedakan impor PERILAKU dari impor DATA.
 *
 *   Mengimpor `ɵɵsanitizeHtml` / `_sanitizeUrl`  -> MENDELEGASIKAN. Aman: satu
 *      implementasi, satu tempat diperbaiki.
 *   Mengimpor `VALID_ATTRS` / `getInertBodyHelper` -> MEMBANGUN ULANG. Konstanta
 *      allowlist dan helper parsing hanya dibutuhkan bila penyaringannya ditulis
 *      sendiri. Di situlah salinan kedua bisa menyimpang dari aslinya.
 *
 * Inilah jalur yang menuntun ke F-06: `i18n_parse.ts` mengimpor VALID_ATTRS/
 * VALID_ELEMENTS dari html_sanitizer lalu menulis penelusuran pohonnya sendiri
 * (`walkIcuTree`) — dan gate-nya memakai akses bracket, bukan hasOwnProperty.
 *
 * Temuan itu didapat lewat MEMBACA daftar impor, bukan lewat regex sink. Berkas
 * ini mengubah pembacaan manual tersebut menjadi pemeriksaan otomatis.
 *
 * Jalankan: node analysis/regex-corpus/scan-duplicated-security.mjs [--all]
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative, resolve, dirname} from 'path';

const AKAR = process.cwd();
const TARGET = join(AKAR, 'packages');
const tampilkanSemua = process.argv.includes('--all');

const LEWATI_DIR = new Set(['node_modules', 'dist', '.git', 'bazel-out', 'benchmarks']);
const LEWATI_BERKAS = /[._]spec\.ts$|\.d\.ts$/;

// ---------------------------------------------------------------------------
// "Rumah keamanan": modul yang MEMILIKI logika keamanan kanonik.
// ---------------------------------------------------------------------------
const RUMAH_KEAMANAN = [
  /core\/src\/sanitization\//,
  /compiler\/src\/schema\/dom_security_schema/,
  /compiler\/src\/schema\/trusted_types_sinks/,
  /core\/src\/util\/security\//,
];
const adalahRumah = (p) => RUMAH_KEAMANAN.some((re) => re.test(p));

// ---------------------------------------------------------------------------
// Klasifikasi simbol yang diimpor DARI rumah keamanan.
// ---------------------------------------------------------------------------
// Impor PERILAKU — pemanggil menyerahkan seluruh pekerjaan. Tidak mencurigakan.
const DELEGASI = [
  /^_?sanitize(Html|Url|Style|Script|ResourceUrl)$/,
  /^ɵɵsanitize\w+$/,
  /^ɵɵvalidateAttribute$/,
  /^ɵɵtrustConstant\w+$/,
  /^DomSanitizer$/,
  /^Sanitizer$/,
  /^enforceIframeSecurity$/,
  /^trusted(HTML|Script|ScriptURL)From\w*$/,
];

// Impor DATA/PRIMITIF — hanya berguna bila penyaringan dibangun ulang sendiri.
// `bobot` mencerminkan seberapa kuat sinyalnya.
const BAHAN_MENTAH = [
  {re: /^VALID_(ATTRS|ELEMENTS)$/, bobot: 3, apa: 'konstanta allowlist'},
  {re: /^(URI_ATTRS|HTML_ATTRS|ARIA_ATTRS|VOID_ELEMENTS|BLOCK_ELEMENTS|INLINE_ELEMENTS)$/, bobot: 3, apa: 'konstanta allowlist'},
  {re: /^getInertBodyHelper$/, bobot: 3, apa: 'helper parsing HTML mentah'},
  {re: /^InertBodyHelper$/, bobot: 1, apa: 'tipe helper parsing'},
  {re: /^getTemplateContent$/, bobot: 2, apa: 'primitif traversal'},
  {re: /^getNodeName$/, bobot: 2, apa: 'primitif traversal'},
  {re: /^(SECURITY_SCHEMA|checkSecurityContext)$/, bobot: 2, apa: 'tabel/lookup schema keamanan'},
  {re: /^isDOMParserAvailable$/, bobot: 1, apa: 'deteksi parser'},
];

const klasifikasi = (nama) => {
  if (DELEGASI.some((re) => re.test(nama))) return {jenis: 'delegasi', bobot: 0};
  const m = BAHAN_MENTAH.find((b) => b.re.test(nama));
  if (m) return {jenis: 'bahan-mentah', bobot: m.bobot, apa: m.apa};
  return {jenis: 'lain', bobot: 0};
};

// ---------------------------------------------------------------------------
// Bukti bahwa berkas benar-benar MENYARING sendiri (bukan sekadar meneruskan).
// ---------------------------------------------------------------------------
const BUKTI_GATE = [
  {re: /\.hasOwnProperty\s*\(/, apa: 'gate hasOwnProperty'},
  {re: /(?:VALID_ATTRS|VALID_ELEMENTS|URI_ATTRS|VOID_ELEMENTS)\s*\[/, apa: 'gate akses bracket'},
  {re: /\.(?:firstChild|nextSibling|childNodes)\b/, apa: 'penelusuran DOM sendiri'},
  {re: /\.attributes\b/, apa: 'iterasi atribut sendiri'},
  {re: /nodeType\s*===?\s*Node\./, apa: 'pembedaan jenis simpul sendiri'},
];

function kumpulkanBerkas(dir, keluar = []) {
  let entri;
  try {
    entri = readdirSync(dir);
  } catch {
    return keluar;
  }
  for (const nama of entri) {
    const p = join(dir, nama);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (!LEWATI_DIR.has(nama)) kumpulkanBerkas(p, keluar);
    } else if (/\.m?ts$/.test(nama) && !LEWATI_BERKAS.test(nama)) {
      keluar.push(p);
    }
  }
  return keluar;
}

// `[^}]*` sengaja dipakai agar impor multi-baris ikut tertangkap —
// pelajaran dari pemeriksa schema yang dulu kehilangan 18 entri karena
// memarse per-baris.
const IMPOR = /import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g;

const berkas = kumpulkanBerkas(TARGET);
const laporan = [];

for (const f of berkas) {
  const rel = relative(AKAR, f);
  if (adalahRumah(rel)) continue; // rumah keamanan tidak menduplikasi dirinya

  let teks;
  try {
    teks = readFileSync(f, 'utf8');
  } catch {
    continue;
  }
  if (!/sanitiz|security|inert_body/.test(teks)) continue; // saring cepat

  const bahan = [];
  const delegasi = [];
  let m;
  IMPOR.lastIndex = 0;
  while ((m = IMPOR.exec(teks))) {
    const spec = m[2];
    if (!spec.startsWith('.')) continue;
    const tujuan = relative(AKAR, resolve(dirname(f), spec));
    if (!adalahRumah(tujuan)) continue;

    for (const bagian of m[1].split(',')) {
      // `A as B` -> nama aslinya A yang menentukan sifat impornya
      const nama = bagian.trim().split(/\s+as\s+/)[0].trim();
      if (!nama) continue;
      const k = klasifikasi(nama);
      if (k.jenis === 'bahan-mentah') bahan.push({nama, ...k, dari: tujuan});
      else if (k.jenis === 'delegasi') delegasi.push(nama);
    }
  }
  if (!bahan.length) continue;

  const bukti = BUKTI_GATE.filter((b) => b.re.test(teks)).map((b) => b.apa);
  const skor = bahan.reduce((s, b) => s + b.bobot, 0) + bukti.length;
  laporan.push({berkas: rel, bahan, delegasi, bukti, skor});
}

laporan.sort((a, b) => b.skor - a.skor);

// ---------------------------------------------------------------------------
// Laporan
// ---------------------------------------------------------------------------
console.log('='.repeat(78));
console.log('DETEKTOR LOGIKA KEAMANAN YANG DIDUPLIKASI (kelas b)');
console.log(`Berkas diperiksa: ${berkas.length}   Berkas ditandai: ${laporan.length}`);
console.log('='.repeat(78));
console.log('\nAturan: mengimpor PERILAKU (ɵɵsanitize*) = mendelegasikan, aman.');
console.log('        mengimpor DATA (VALID_ATTRS, getInertBodyHelper) = membangun ulang.\n');

const batas = tampilkanSemua ? laporan.length : 8;
for (const l of laporan.slice(0, batas)) {
  console.log(`\n[skor ${l.skor}] ${l.berkas}`);
  console.log('  bahan mentah yang diimpor:');
  for (const b of l.bahan) console.log(`    - ${b.nama}  (${b.apa}, bobot ${b.bobot})`);
  if (l.delegasi.length) console.log(`  juga mendelegasikan lewat: ${l.delegasi.join(', ')}`);
  console.log(`  bukti menyaring sendiri: ${l.bukti.length ? l.bukti.join('; ') : '(tidak ada)'}`);
}
if (laporan.length > batas) console.log(`\n... +${laporan.length - batas} lagi (pakai --all)`);

// ---------------------------------------------------------------------------
// VALIDASI-DIRI
// ---------------------------------------------------------------------------
console.log('\n' + '='.repeat(78));
console.log('VALIDASI-DIRI');
console.log('='.repeat(78));
const puncak = laporan[0];
const i18n = laporan.find((l) => l.berkas.endsWith('i18n_parse.ts'));
console.log(
  `  [${i18n ? 'DITEMUKAN' : 'TERLEWAT '}] F-06 via i18n_parse.ts` +
    (i18n ? `  -> skor ${i18n.skor}, peringkat ${laporan.indexOf(i18n) + 1}` : ''),
);
console.log(
  `  [${puncak && puncak.berkas.endsWith('i18n_parse.ts') ? 'BENAR    ' : 'PERIKSA  '}] ` +
    `kandidat berperingkat teratas: ${puncak ? puncak.berkas : '(tidak ada)'}`,
);
