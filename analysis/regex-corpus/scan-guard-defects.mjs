/**
 * Pemindai kelas cacat "garda yang gagal menjaga" (kelompok GUARD pada corpus.mjs).
 *
 * Berbeda dari scan-sinks.mjs yang mencari OPERASI BERBAHAYA, pemindai ini mencari
 * PERLINDUNGAN YANG TIDAK MENUTUP. Seluruh temuan nyata sesi ini berada di kelas itu.
 *
 * Validasi-diri: pemindai dianggap sehat bila menemukan kembali F-01, F-05, dan F-06.
 *
 * Jalankan: node analysis/regex-corpus/scan-guard-defects.mjs [--all]
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative} from 'path';
import {GUARDS} from './corpus.mjs';

const AKAR = process.cwd();
const TARGET = join(AKAR, 'packages');
const tampilkanSemua = process.argv.includes('--all');

// Berkas yang diperiksa: sumber TS yang benar-benar dikirim/berjalan.
const LEWATI_DIR = new Set(['node_modules', 'dist', '.git', 'bazel-out', 'benchmarks']);
const LEWATI_BERKAS = /[._]spec\.ts$|\.d\.ts$|_spec\.ts$/;

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
const hasil = new Map(GUARDS.map((g) => [g.id, []]));

for (const f of berkas) {
  let teks;
  try {
    teks = readFileSync(f, 'utf8');
  } catch {
    continue;
  }
  const rel = relative(AKAR, f);
  const baris = teks.split('\n');

  for (const g of GUARDS) {
    if (g.multiline) {
      // Pola lintas-baris: cari pada teks utuh, lalu petakan offset -> nomor baris.
      const re = new RegExp(g.re.source, g.re.flags.includes('g') ? g.re.flags : g.re.flags + 'g');
      let m;
      while ((m = re.exec(teks))) {
        const nomor = teks.slice(0, m.index).split('\n').length;
        hasil.get(g.id).push({berkas: rel, baris: nomor, kutipan: baris[nomor - 1]?.trim() ?? ''});
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    } else {
      for (let i = 0; i < baris.length; i++) {
        const m = baris[i].match(g.re);
        if (!m) continue;

        // Filter konteks: pola hanya dihitung bila sinyal pendukung muncul di
        // sekitarnya. Ini yang memisahkan "kode yang dibangun" dari "prosa galat".
        if (g.konteks) {
          const lebar = g.konteksBaris ?? 5;
          const sekitar = baris.slice(Math.max(0, i - lebar), i + lebar + 1).join('\n');
          if (!g.konteks.test(sekitar)) continue;
        }

        hasil.get(g.id).push({
          berkas: rel,
          baris: i + 1,
          kutipan: baris[i].trim(),
          simbol: g.verifikasiSimbol ? m[1] : undefined,
        });
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Triase otomatis untuk pola ber-verifikasiSimbol (G-07):
// ambil simbol yang dirujuk, lalu buktikan ada/tidaknya di seluruh repositori.
// ---------------------------------------------------------------------------
const perluVerifikasi = GUARDS.filter((g) => g.verifikasiSimbol);
if (perluVerifikasi.length) {
  const simbol = new Set();
  for (const g of perluVerifikasi) {
    for (const t of hasil.get(g.id)) if (t.simbol) simbol.add(t.simbol);
  }
  if (simbol.size) {
    const hitung = new Map([...simbol].map((s) => [s, 0]));
    const cari = new RegExp(`\\b(${[...simbol].join('|')})\\b`, 'g');
    for (const f of berkas) {
      let teks;
      try {
        teks = readFileSync(f, 'utf8');
      } catch {
        continue;
      }
      let m;
      while ((m = cari.exec(teks))) hitung.set(m[1], hitung.get(m[1]) + 1);
    }
    // Sebuah simbol bisa dirujuk oleh BEBERAPA komentar (schema Angular punya dua
    // salinan, keduanya menyebut SECURITY_SENSITIVE_ELEMENTS). Karena itu ambang
    // tetap seperti "<= 1" salah. Yang benar: kurangi jumlah kemunculan dengan
    // jumlah baris-komentar yang merujuknya. Sisa 0 berarti simbol HANYA hidup di
    // dalam komentar — tidak ada definisinya di mana pun.
    const rujukan = new Map();
    for (const g of perluVerifikasi) {
      for (const t of hasil.get(g.id)) {
        if (t.simbol) rujukan.set(t.simbol, (rujukan.get(t.simbol) ?? 0) + 1);
      }
    }
    for (const g of perluVerifikasi) {
      hasil.set(
        g.id,
        hasil.get(g.id).map((t) => {
          if (!t.simbol) return t;
          const total = hitung.get(t.simbol) ?? 0;
          return {...t, jumlahSimbol: total, sisaSimbol: total - (rujukan.get(t.simbol) ?? 0)};
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Laporan
// ---------------------------------------------------------------------------
console.log('='.repeat(78));
console.log('PEMINDAI KELAS "GARDA YANG GAGAL MENJAGA"');
console.log(`Berkas diperiksa: ${berkas.length}`);
console.log('='.repeat(78));

for (const g of GUARDS) {
  let temuan = hasil.get(g.id);

  // Untuk pola ber-verifikasi, tampilkan lebih dulu yang simbolnya TIDAK ADA.
  let catatanVerifikasi = '';
  if (g.verifikasiSimbol) {
    const menggantung = temuan.filter((t) => t.sisaSimbol !== undefined && t.sisaSimbol <= 0);
    catatanVerifikasi =
      `  verifikasi: ${menggantung.length} dari ${temuan.length} rujukan MENGGANTUNG ` +
      `(simbol tidak ditemukan di tempat lain)\n`;
    temuan = [...menggantung, ...temuan.filter((t) => !menggantung.includes(t))];
  }

  console.log(`\n${g.id}  (${temuan.length} kecocokan${g.konteks ? ', setelah filter konteks' : ''})`);
  console.log(`  hipotesis : ${g.hipotesis}`);
  console.log(`  triase    : ${g.triase}`);
  if (catatanVerifikasi) process.stdout.write(catatanVerifikasi);
  const batas = tampilkanSemua ? temuan.length : 6;
  for (const t of temuan.slice(0, batas)) {
    const tanda =
      t.sisaSimbol !== undefined && t.sisaSimbol <= 0 ? `  <-- MENGGANTUNG (${t.simbol})` : '';
    console.log(`    ${t.berkas}:${t.baris}${tanda}`);
    console.log(`      ${t.kutipan.slice(0, 108)}`);
  }
  if (temuan.length > batas) console.log(`    ... +${temuan.length - batas} lagi (pakai --all)`);
}

// ---------------------------------------------------------------------------
// VALIDASI-DIRI: apakah pemindai menemukan kembali temuan yang sudah diketahui?
// ---------------------------------------------------------------------------
const harusKetemu = [
  {kode: 'F-01', pola: 'G-05-anggaran-percobaan', berkas: 'html_sanitizer.ts', baris: 314},
  {kode: 'F-05', pola: 'G-01-guard-dev-only', berkas: 'platform_ref.ts', baris: 55},
  {kode: 'F-05', pola: 'G-04-interpolasi-ke-string-kutip', berkas: 'utils.ts', baris: 174},
  {kode: 'F-06', pola: 'G-02-gate-bracket', berkas: 'i18n_parse.ts', baris: 841},
  {kode: 'F-02', pola: 'G-07-sinkron-dua-salinan', berkas: 'dom_security_schema.ts', baris: 112},
];

console.log('\n' + '='.repeat(78));
console.log('VALIDASI-DIRI — apakah pola menemukan kembali temuan yang sudah diketahui?');
console.log('='.repeat(78));
let lolos = 0;
for (const h of harusKetemu) {
  const temuan = hasil.get(h.pola) ?? [];
  const cocok = temuan.find((t) => t.berkas.endsWith(h.berkas) && Math.abs(t.baris - h.baris) <= 3);
  const status = cocok ? 'DITEMUKAN' : 'TERLEWAT ';
  if (cocok) lolos++;
  console.log(
    `  [${status}] ${h.kode} via ${h.pola}` + (cocok ? `  -> ${cocok.berkas}:${cocok.baris}` : ''),
  );
}
console.log(`\n  Skor validasi-diri: ${lolos}/${harusKetemu.length}`);
if (lolos === harusKetemu.length) {
  console.log('  Seluruh temuan yang diketahui ditemukan kembali — pola dianggap sehat.');
} else {
  console.log('  Ada pola yang gagal menemukan temuannya sendiri — perlu diperbaiki.');
}
