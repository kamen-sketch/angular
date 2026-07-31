/**
 * Detektor SALINAN YANG DI-RENAME — menutup titik buta scan-twin-drift.mjs.
 *
 * scan-twin-drift.mjs mengelompokkan berkas berdasarkan NAMA DASAR. Konsekuensinya
 * salinan yang berganti nama saat disalin (mis. html_sanitizer.ts -> icu_filter.ts)
 * lolos sama sekali, padahal justru salinan seperti itu yang paling mungkin
 * menyimpang: tidak ada nama yang mengingatkan bahwa keduanya bersaudara.
 *
 * Karena itu di sini perbandingannya SEMUA-PASANGAN, tanpa melihat nama. Biaya
 * O(n^2) ditekan dengan menyaring dulu ke berkas bermuatan keamanan saja, sehingga
 * jumlah kandidat turun drastis sebelum pembandingan.
 *
 * Jalankan: node analysis/regex-corpus/scan-renamed-copies.mjs [--all]
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative, basename} from 'path';

const AKAR = process.cwd();
const TARGET = join(AKAR, 'packages');
const tampilkanSemua = process.argv.includes('--all');

const LEWATI_DIR = new Set(['node_modules', 'dist', '.git', 'bazel-out', 'benchmarks']);
const LEWATI_BERKAS = /[._]spec\.ts$|\.d\.ts$/;

// Penyaring awal: hanya berkas yang benar-benar menyentuh urusan keamanan.
// Ini yang membuat O(n^2) tetap murah.
const MUATAN_KEAMANAN =
  /sanitiz|SecurityContext|trustedTypes|createPolicy|VALID_ATTRS|VALID_ELEMENTS|escapeHtml|innerHTML|allowlist|InertBody/i;

// Ambang: dua sinyal berdampingan, alasan sama seperti di scan-twin-drift.mjs —
// Jaccard kuat untuk berkas padat DATA, nama fungsi kuat untuk berkas padat LOGIKA.
const AMBANG_JACCARD = 0.4;
const AMBANG_FUNGSI = 3;

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

function sidikJari(teks) {
  const token = new Set();
  // Jalur impor dibuang: berkas sesaudara dalam satu pipeline berbagi banyak
  // impor, dan itu menggelembungkan kemiripan tanpa berarti keduanya salinan.
  const tanpaImpor = teks.replace(/^\s*import\s[\s\S]*?from\s*['"][^'"]+['"];?/gm, '');
  teks = tanpaImpor;
  for (const m of teks.matchAll(/'([^'\n\\]{2,80})'/g)) token.add('s:' + m[1]);
  for (const m of teks.matchAll(/"([^"\n\\]{2,80})"/g)) token.add('s:' + m[1]);
  for (const m of teks.matchAll(/\b([A-Z][A-Z0-9_]{3,})\b/g)) token.add('k:' + m[1]);
  // Kata kunci alur kendali menyerupai pemanggilan fungsi (`if (`, `for (`).
  // Tanpa penolakan ini, hampir semua berkas terlihat "berbagi fungsi".
  const BUKAN_FUNGSI = new Set([
    'if', 'for', 'while', 'switch', 'catch', 'return', 'typeof', 'do', 'else',
    'case', 'new', 'delete', 'await', 'yield', 'constructor', 'super', 'this',
    'used', 'returns', 'function',
  ]);
  const fungsi = new Set();
  for (const m of teks.matchAll(/(?:export\s+)?function\s+(\w+)/g)) {
    if (!BUKAN_FUNGSI.has(m[1])) fungsi.add(m[1]);
  }
  for (const m of teks.matchAll(/^\s{2}(?:private\s+|public\s+|protected\s+)?(\w+)\s*\(/gm)) {
    if (!BUKAN_FUNGSI.has(m[1])) fungsi.add(m[1]);
  }
  return {token, fungsi};
}

function jaccard(a, b) {
  if (!a.size && !b.size) return 1;
  let irisan = 0;
  for (const x of a) if (b.has(x)) irisan++;
  return irisan / (a.size + b.size - irisan);
}

const semua = kumpulkanBerkas(TARGET);
const kandidat = [];
for (const f of semua) {
  let teks;
  try {
    teks = readFileSync(f, 'utf8');
  } catch {
    continue;
  }
  if (!MUATAN_KEAMANAN.test(teks)) continue;
  const sj = sidikJari(teks);
  // Berkas terlalu kecil menghasilkan skor kemiripan yang tidak bermakna.
  if (sj.token.size < 6) continue;
  kandidat.push({jalur: relative(AKAR, f), nama: basename(f), ...sj});
}

// Perbandingan semua-pasangan (i<j agar tidak ganda).
const pasangan = [];
for (let i = 0; i < kandidat.length; i++) {
  for (let j = i + 1; j < kandidat.length; j++) {
    const a = kandidat[i];
    const b = kandidat[j];
    const jac = jaccard(a.token, b.token);
    let fungsiSama = 0;
    for (const f of a.fungsi) if (b.fungsi.has(f)) fungsiSama++;
    if (jac >= AMBANG_JACCARD || fungsiSama >= AMBANG_FUNGSI) {
      pasangan.push({a, b, jac, fungsiSama, samaNama: a.nama === b.nama});
    }
  }
}
pasangan.sort((x, y) => y.jac - x.jac || y.fungsiSama - x.fungsiSama);

const baru = pasangan.filter((p) => !p.samaNama);
const lama = pasangan.filter((p) => p.samaNama);

console.log('='.repeat(78));
console.log('DETEKTOR SALINAN YANG DI-RENAME');
console.log(`Berkas total: ${semua.length}   bermuatan keamanan: ${kandidat.length}`);
console.log(`Pembandingan pasangan: ${(kandidat.length * (kandidat.length - 1)) / 2}`);
console.log('='.repeat(78));

console.log(`\n--- BERBEDA NAMA (informasi baru; tak terjangkau scan-twin-drift) : ${baru.length}`);
const batas = tampilkanSemua ? baru.length : 12;
for (const p of baru.slice(0, batas)) {
  console.log(`\n  jaccard ${p.jac.toFixed(2)}  fungsi bersama ${p.fungsiSama}`);
  console.log(`    ${p.a.jalur}`);
  console.log(`    ${p.b.jalur}`);
  const bersama = [...p.a.fungsi].filter((f) => p.b.fungsi.has(f));
  if (bersama.length) console.log(`    fungsi sama: ${bersama.slice(0, 10).join(', ')}`);
}
if (baru.length > batas) console.log(`\n  ... +${baru.length - batas} lagi (pakai --all)`);
if (!baru.length) {
  console.log('  (tidak ada — tidak ditemukan salinan keamanan yang di-rename)');
}

console.log(`\n--- SAMA NAMA (validasi algoritma; sudah dicakup scan-twin-drift) : ${lama.length}`);
for (const p of lama.slice(0, 6)) {
  console.log(`  jaccard ${p.jac.toFixed(2)}  fungsi ${p.fungsiSama}  ${p.a.nama}`);
  console.log(`    ${p.a.jalur}`);
  console.log(`    ${p.b.jalur}`);
}

console.log('\n' + '='.repeat(78));
console.log('VALIDASI-DIRI');
console.log('='.repeat(78));
const schema = lama.find((p) => p.a.nama === 'dom_security_schema.ts');
console.log(
  `  [${schema ? 'DITEMUKAN' : 'TERLEWAT '}] pasangan dom_security_schema` +
    (schema ? `  -> jaccard ${schema.jac.toFixed(2)}` : ''),
);
console.log(
  '  Pasangan sama-nama berfungsi sebagai kontrol: algoritma yang sehat harus\n' +
    '  menemukannya tanpa memakai nama sama sekali.',
);
