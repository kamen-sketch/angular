/**
 * G-30 — KEWAJIBAN SINKRONISASI YANG DINYATAKAN SENDIRI OLEH KODE.
 *
 * MENGAPA PEMINDAI INI BERBEDA DARI G-22..G-29
 * --------------------------------------------
 * Seluruh pemindai sebelumnya mencocokkan BENTUK TEKS: jangkar regex yang
 * hilang, pembacaan rantai prototipe, penjaga yang menganggur, default boolean
 * yang bertentangan. Bentuk teks hanya ada bila cacatnya punya tanda tangan
 * sintaktis. Cacat LOGIKA tidak punya: tidak ada regex untuk "kondisi ini
 * terbalik", "seharusnya <= bukan <", atau "satu cabang enum terlewat".
 *
 * Pemindai ini memeriksa KESEPAKATAN, bukan bentuk. Bila kode sendiri menyatakan
 * "jaga agar tetap sinkron dengan X", maka ada dua tempat yang HARUS sepakat,
 * dan ketidaksepakatan di antara keduanya adalah cacat logika — apa pun
 * bentuknya. Orakelnya datang dari kodenya sendiri, bukan dari selera saya.
 *
 * Ini kelas yang sudah membayar dua kali tanpa alat:
 *   F-02  rujukan SECURITY_SENSITIVE_ELEMENTS yang menggantung di DUA berkas
 *   F-07  salinan pemetaan sanitizer yang berbeda perlakuan pada konteks ARRAY
 *
 * VALIDASI-DIRI: harus menemukan kembali rujukan menggantung F-02, atau keluar
 * dengan status bukan-nol.
 *
 * Jalankan: node analysis/regex-corpus/scan-declared-sync.mjs
 */
import {readFileSync, readdirSync, statSync, existsSync} from 'fs';
import {join, relative} from 'path';

const ROOT = process.cwd();
const SKIP = /[._]spec\.ts$|\/node_modules\//;

function collect(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const n of entries) {
    const p = join(dir, n);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (n !== 'node_modules') collect(p, out);
    } else if (/\.m?ts$/.test(n) && !SKIP.test(p)) {
      out.push(p);
    }
  }
  return out;
}

// Kalimat yang MENYATAKAN kewajiban, bukan sekadar menyebut kata "copy".
// "make a copy of this cursor" adalah keterangan implementasi, bukan kewajiban;
// karena itu bentuk imperatif/penunjuk-lokasi yang dicari.
const RE_SYNC =
  /(?:keep\s+(?:this|it|them|is)?\s*in\s+sync\s+with|must\s+be\s+kept\s+in\s+sync\s+with|is\s+an?\s+(?:exact\s+)?copy\s+of|mirrors?\s+the|duplicated\s+in)\s*([^\n]*)/gi;

// Rujukan ke BERKAS dan ke PENGENAL di dalam teks kewajiban itu.
const RE_PATH = /(packages\/[\w./@-]+\.ts)/;

// Jalan pertama pemindai ini mengambil kata BerhurufBesar pertama dalam prosa,
// dan hasilnya penuh derau: "Security" dari "DOM Security Schema", "Mirrors"
// dari "Mirrors the plugin interface", "Array" dari "the Array.isArray check".
// Ketiganya kalimat biasa, bukan rujukan kode. Karena itu sekarang hanya
// diterima pengenal yang DITANDAI sebagai kode — di dalam backtick — atau yang
// berbentuk KONSTANTA_HURUF_BESAR.
const RE_IDENT_BACKTICK = /`([A-Za-z_$][\w$]*)`/;
const RE_IDENT_CAPS = /\b([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+)\b/;
const BAWAAN = new Set(['Array', 'Object', 'Map', 'Set', 'String', 'Number', 'Promise', 'Function']);
function ambilIdent(s) {
  const b = s.match(RE_IDENT_BACKTICK);
  if (b && !BAWAAN.has(b[1])) return b[1];
  const c = s.match(RE_IDENT_CAPS);
  if (c && !BAWAAN.has(c[1])) return c[1];
  return null;
}

const files = collect(join(ROOT, 'packages'));
const teks = new Map();
for (const f of files) {
  try {
    teks.set(f, readFileSync(f, 'utf8'));
  } catch {}
}

// Indeks pengenal yang benar-benar dideklarasikan di mana pun.
const dideklarasikan = new Set();
const RE_DECL =
  /(?:^|\n)\s*(?:export\s+)?(?:const|let|var|function|class|enum|interface|type)\s+([A-Za-z_$][\w$]*)/g;
for (const [, t] of teks) {
  RE_DECL.lastIndex = 0;
  let m;
  while ((m = RE_DECL.exec(t))) dideklarasikan.add(m[1]);
}

const lineOf = (t, i) => t.slice(0, i).split('\n').length;

const menggantung = []; // rujukan ke sesuatu yang tidak ada
const pasangan = []; // pasangan berkas yang bisa dibandingkan
const takTerselesaikan = [];

for (const [file, t] of teks) {
  const rel = relative(ROOT, file);
  RE_SYNC.lastIndex = 0;
  let m;
  while ((m = RE_SYNC.exec(t))) {
    const line = lineOf(t, m.index);
    // Teks kewajiban bisa membungkus ke baris berikutnya.
    const lines = t.split('\n');
    const konteks = lines
      .slice(line - 1, line + 2)
      .join(' ')
      .replace(/^\s*[*/]+\s*/gm, ' ');
    const pPath = konteks.match(RE_PATH);
    const target = pPath ? pPath[1] : null;
    const ident = ambilIdent(m[1] || '') ?? ambilIdent(konteks);

    if (ident && !dideklarasikan.has(ident)) {
      menggantung.push({rel, line, ident, target, konteks: konteks.trim().slice(0, 120)});
    } else if (target) {
      const ada = existsSync(join(ROOT, target));
      if (!ada) {
        menggantung.push({rel, line, ident: null, target, konteks: konteks.trim().slice(0, 120)});
      } else if (relative(ROOT, file) !== target) {
        pasangan.push({rel, line, target, ident});
      }
    } else {
      takTerselesaikan.push({rel, line, konteks: konteks.trim().slice(0, 110)});
    }
  }
}

const L = '='.repeat(78);
console.log(L);
console.log('G-30 — KEWAJIBAN SINKRONISASI YANG DINYATAKAN KODE SENDIRI');
console.log(`Berkas dipindai: ${files.length}`);
console.log(L);

console.log(`\n--- RUJUKAN MENGGANTUNG: menunjuk sesuatu yang TIDAK ADA (${menggantung.length}) ---`);
console.log('    Kewajiban yang tidak bisa dijalankan peninjau berikutnya.\n');
for (const d of menggantung) {
  console.log(`  ${d.rel}:${d.line}`);
  console.log(`     menunjuk: ${d.ident ? `pengenal "${d.ident}"` : ''}${d.target ? ` berkas ${d.target}` : ''}`);
  console.log(`     teks    : ${d.konteks}`);
}

console.log(`\n--- PASANGAN BERKAS yang dinyatakan harus sepakat (${pasangan.length}) ---`);
for (const p of pasangan) {
  console.log(`  ${p.rel}:${p.line}  <->  ${p.target}${p.ident ? `   (pengenal: ${p.ident})` : ''}`);
}

console.log(`\n--- Kewajiban yang TIDAK bisa saya selesaikan otomatis (${takTerselesaikan.length}) ---`);
console.log('    Dicatat apa adanya; ini batas alat, bukan pernyataan bersih.');
for (const u of takTerselesaikan.slice(0, 12)) {
  console.log(`  ${u.rel}:${u.line}  ${u.konteks}`);
}
if (takTerselesaikan.length > 12) console.log(`  ... dan ${takTerselesaikan.length - 12} lagi`);

console.log('\n' + L);
console.log('TRIASE: untuk tiap pasangan, apa TEPATNYA yang harus sepakat — nilai');
console.log('        konstanta, daftar anggota, atau urutan cabang? Bandingkan HAL ITU,');
console.log('        bukan seluruh berkas.');

// VALIDASI-DIRI terhadap F-02.
const f02 = menggantung.find((d) => d.ident === 'SECURITY_SENSITIVE_ELEMENTS');
console.log('\n' + L);
console.log(
  `VALIDASI-DIRI  F-02 (SECURITY_SENSITIVE_ELEMENTS menggantung): ` +
    `${f02 ? 'ditemukan' : 'TIDAK DITEMUKAN'}`,
);
if (!f02) {
  console.log('Pemindai buta terhadap kasus yang sudah diketahui — jangan percayai keluarannya.');
}
console.log(L);
process.exit(f02 ? 0 : 1);
