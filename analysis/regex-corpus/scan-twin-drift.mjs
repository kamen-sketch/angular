/**
 * Detektor "berkas kembar yang menyimpang" — pelengkap kelas (b).
 *
 * scan-duplicated-security.mjs mencari LOGIKA yang dibangun ulang.
 * Berkas ini mencari DATA yang disalin: dua berkas dengan nama sama di paket
 * berbeda yang seharusnya identik, lalu membandingkan isinya.
 *
 * Kasus yang sudah diketahui: `dom_security_schema.ts` ada dua salinan
 * (compiler + core) dan komentarnya sendiri menuntut keduanya sinkron. Versi
 * pertama pemeriksa sinkronisasi dulu MELEWATKAN 18 entri karena memarse
 * per-baris, padahal banyak entri membentang beberapa baris. Karena itu di sini
 * perbandingan memakai himpunan literal string, bukan diff baris demi baris.
 *
 * Jalankan: node analysis/regex-corpus/scan-twin-drift.mjs
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative, basename} from 'path';

const AKAR = process.cwd();
const TARGET = join(AKAR, 'packages');
const LEWATI_DIR = new Set(['node_modules', 'dist', '.git', 'bazel-out', 'benchmarks']);
const LEWATI_BERKAS = /[._]spec\.ts$|\.d\.ts$/;

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

const berkas = kumpulkanBerkas(TARGET);

// Kelompokkan berdasarkan nama dasar; hanya yang bermuatan keamanan.
const RELEVAN = /sanitiz|security|schema|trusted|escape/i;
const perNama = new Map();
for (const f of berkas) {
  const b = basename(f);
  if (!RELEVAN.test(b)) continue;
  if (!perNama.has(b)) perNama.set(b, []);
  perNama.get(b).push(f);
}

/**
 * Sidik jari isi: himpunan literal string + nama konstanta SCREAMING_CASE.
 * Sengaja TIDAK membandingkan baris, karena entri bisa membentang banyak baris
 * dan penyusunan ulang format akan menghasilkan derau palsu.
 */
function sidikJari(teks) {
  const literal = new Set();
  for (const m of teks.matchAll(/'([^'\n\\]{1,80})'/g)) literal.add(m[1]);
  for (const m of teks.matchAll(/"([^"\n\\]{1,80})"/g)) literal.add(m[1]);
  const konstanta = new Set();
  for (const m of teks.matchAll(/\b([A-Z][A-Z0-9_]{3,})\b/g)) konstanta.add(m[1]);
  // Nama fungsi dipakai sebagai sinyal kembar terpisah — lihat `adalahKembar`.
  const fungsi = new Set();
  for (const m of teks.matchAll(/(?:export\s+)?function\s+(\w+)/g)) fungsi.add(m[1]);
  return {literal, konstanta, fungsi};
}

const beda = (a, b) => [...a].filter((x) => !b.has(x));

/**
 * Kemiripan Jaccard atas sidik jari gabungan.
 *
 * Pengelompokan berdasarkan NAMA DASAR saja terlalu naif: `schema.ts` muncul 5
 * kali di paket yang sama sekali berbeda dan `sanitization.ts` 4 kali (sebagian
 * hanya fixture uji). Semua itu KEBETULAN SENAMA, bukan salinan. Gerbang ini
 * menuntut kedua berkas benar-benar berbagi isi sebelum selisihnya dianggap
 * bermakna.
 */
function kemiripan(a, b) {
  const ga = new Set([...a.literal, ...a.konstanta]);
  const gb = new Set([...b.literal, ...b.konstanta]);
  if (!ga.size && !gb.size) return 1;
  let irisan = 0;
  for (const x of ga) if (gb.has(x)) irisan++;
  return irisan / (ga.size + gb.size - irisan);
}
const AMBANG_KEMIRIPAN = 0.3;
const AMBANG_FUNGSI = 2;

/**
 * Uji kembar gabungan.
 *
 * Jaccard atas literal saja TIDAK cukup: `trusted_types.ts` (core vs upgrade)
 * hanya mencetak 0.143 karena sidik jarinya kecil (5 vs 3 elemen), sehingga
 * beberapa perbedaan sah langsung menenggelamkan skornya — padahal keduanya
 * jelas kembar (sama-sama mendefinisikan `getPolicy`, dan strukturnya paralel).
 *
 * Karena itu dua sinyal dipakai berdampingan:
 *   - literal/konstanta bersama  -> kuat untuk berkas padat DATA (schema)
 *   - nama fungsi bersama        -> kuat untuk berkas padat LOGIKA (policy)
 */
function adalahKembar(a, b) {
  const mirip = kemiripan(a, b);
  let fungsiSama = 0;
  for (const f of a.fungsi) if (b.fungsi.has(f)) fungsiSama++;
  return {
    kembar: mirip >= AMBANG_KEMIRIPAN || fungsiSama >= AMBANG_FUNGSI,
    mirip,
    fungsiSama,
  };
}

console.log('='.repeat(78));
console.log('DETEKTOR BERKAS KEMBAR YANG MENYIMPANG');
console.log(`Berkas diperiksa: ${berkas.length}`);
console.log('='.repeat(78));

let pasangan = 0;
let menyimpang = 0;

for (const [nama, daftar] of [...perNama].sort()) {
  if (daftar.length < 2) continue;
  pasangan++;

  const sidik = daftar.map((f) => ({
    jalur: relative(AKAR, f),
    ...sidikJari(readFileSync(f, 'utf8')),
  }));

  // Bandingkan setiap salinan terhadap salinan pertama.
  const dasar = sidik[0];
  let adaSelisih = false;
  const rincian = [];

  const kebetulan = [];
  for (const s of sidik.slice(1)) {
    const uji = adalahKembar(dasar, s);
    const mirip = uji.mirip;
    if (!uji.kembar) {
      kebetulan.push({s, mirip});
      continue;
    }
    const literalHilang = beda(dasar.literal, s.literal);
    const literalTambah = beda(s.literal, dasar.literal);
    const konstHilang = beda(dasar.konstanta, s.konstanta);
    const konstTambah = beda(s.konstanta, dasar.konstanta);
    if (literalHilang.length || literalTambah.length || konstHilang.length || konstTambah.length) {
      adaSelisih = true;
      rincian.push({s, mirip, fungsiSama: uji.fungsiSama, literalHilang, literalTambah, konstHilang, konstTambah});
    }
  }

  // Seluruh "salinan" ternyata hanya kebetulan senama -> bukan kembar sama sekali.
  if (kebetulan.length === sidik.length - 1 && !adaSelisih) {
    pasangan--;
    continue;
  }

  console.log(`\n${nama}  (${daftar.length} salinan)`);
  for (const s of sidik) console.log(`  - ${s.jalur}`);
  for (const k of kebetulan) {
    console.log(`  (kebetulan senama, kemiripan ${k.mirip.toFixed(2)} < ${AMBANG_KEMIRIPAN}): ${k.s.jalur}`);
  }

  if (!adaSelisih) {
    console.log(`  IDENTIK: ${dasar.literal.size} literal, ${dasar.konstanta.size} konstanta — sinkron.`);
    continue;
  }

  menyimpang++;
  for (const r of rincian) {
    console.log(`  MENYIMPANG terhadap ${dasar.jalur} (kemiripan ${r.mirip.toFixed(2)}, fungsi bersama ${r.fungsiSama}):`);
    const tampil = (label, arr) => {
      if (!arr.length) return;
      console.log(`    ${label} (${arr.length}): ${arr.slice(0, 12).map((x) => JSON.stringify(x)).join(', ')}${arr.length > 12 ? ' …' : ''}`);
    };
    tampil('literal hanya di salinan dasar', r.literalHilang);
    tampil('literal hanya di salinan ini  ', r.literalTambah);
    tampil('konstanta hanya di dasar      ', r.konstHilang);
    tampil('konstanta hanya di salinan ini', r.konstTambah);
  }
}

console.log('\n' + '='.repeat(78));
console.log(`Pasangan kembar ditemukan: ${pasangan}   menyimpang: ${menyimpang}`);
console.log('='.repeat(78));
console.log(
  '\nCatatan triase: selisih TIDAK otomatis berarti cacat. Salinan sering berbeda\n' +
    'secara sah (impor, tipe, pesan galat). Yang penting diperiksa manusia adalah\n' +
    'selisih pada DATA KEAMANAN — nama tag, nama atribut, nilai SecurityContext.',
);
