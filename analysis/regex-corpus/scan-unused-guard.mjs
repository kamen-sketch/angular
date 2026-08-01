/**
 * G-22 — "penjaga menganggur" (unused guard).
 *
 * Kelas cacat: sebuah modul MENDEFINISIKAN pembungkus aman untuk sebuah
 * primitif yang bisa melempar / berbahaya (mis. `tryDecodeURIComponent`
 * membungkus `decodeURIComponent` dengan try/catch), TAPI modul yang sama
 * masih memanggil primitif mentahnya di tempat lain.
 *
 * Kenapa kelas ini bernilai: ia tidak menebak niat. Penulis modul SUDAH
 * menyatakan, lewat kodenya sendiri, bahwa primitif itu perlu dibungkus.
 * Setiap pemanggilan mentah yang tersisa di modul yang sama adalah
 * inkonsistensi yang bisa dibuktikan, bukan selera.
 *
 * Ini melengkapi scan-duplicated-security.mjs (kelas b): di sana kita mencari
 * logika keamanan yang DIGANDAKAN; di sini kita mencari logika keamanan yang
 * ADA tapi TIDAK DIPAKAI oleh tetangganya.
 *
 * Jalankan: node analysis/regex-corpus/scan-unused-guard.mjs
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative} from 'path';

const AKAR = process.cwd();

// Primitif yang layak dibungkus + tanda bahwa pembungkus ada di modul ini.
const PRIMITIF = [
  {
    nama: 'decodeURIComponent',
    panggil: /(?<![.\w])decodeURIComponent\s*\(/g,
    // pembungkus = fungsi yang isinya try { ... decodeURIComponent ... } catch
    pembungkus: /function\s+(\w+)\s*\([^)]*\)[^{]*\{\s*try\s*\{[^}]*decodeURIComponent/g,
  },
  {
    nama: 'decodeURI',
    panggil: /(?<![.\w])decodeURI\s*\(/g,
    pembungkus: /function\s+(\w+)\s*\([^)]*\)[^{]*\{\s*try\s*\{[^}]*decodeURI\s*\(/g,
  },
  {
    nama: 'JSON.parse',
    panggil: /(?<!\w)JSON\s*\.\s*parse\s*\(/g,
    pembungkus: /function\s+(\w+)\s*\([^)]*\)[^{]*\{\s*try\s*\{[^}]*JSON\s*\.\s*parse\s*\(/g,
  },
];

const LEWATI = /[._]spec\.ts$|\.d\.ts$|\/test\/|\/testing\/|node_modules/;

function kumpulkan(dir, keluar = []) {
  let entri;
  try {
    entri = readdirSync(dir);
  } catch {
    return keluar;
  }
  for (const n of entri) {
    const p = join(dir, n);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (n !== 'node_modules') kumpulkan(p, keluar);
    } else if (/\.m?ts$/.test(n) && !LEWATI.test(p)) {
      keluar.push(p);
    }
  }
  return keluar;
}

function baris(teks, idx) {
  return teks.slice(0, idx).split('\n').length;
}

const berkas = kumpulkan(join(AKAR, 'packages'));
const temuan = [];

for (const f of berkas) {
  let teks;
  try {
    teks = readFileSync(f, 'utf8');
  } catch {
    continue;
  }
  for (const p of PRIMITIF) {
    // prafilter murah
    if (!teks.includes(p.nama.split('.')[0])) continue;

    p.pembungkus.lastIndex = 0;
    const namaPembungkus = [];
    let mw;
    while ((mw = p.pembungkus.exec(teks))) namaPembungkus.push(mw[1]);
    if (!namaPembungkus.length) continue;

    // Panggilan mentah = panggilan primitif yang TIDAK berada di dalam badan
    // pembungkus itu sendiri. Kita perkirakan badan pembungkus sebagai 400 char
    // setelah deklarasinya (cukup untuk fungsi pembungkus yang selalu pendek).
    const zonaAman = [];
    for (const nm of namaPembungkus) {
      const re = new RegExp(`function\\s+${nm}\\s*\\(`, 'g');
      let m;
      while ((m = re.exec(teks))) zonaAman.push([m.index, m.index + 400]);
    }

    p.panggil.lastIndex = 0;
    let mc;
    const mentah = [];
    while ((mc = p.panggil.exec(teks))) {
      const i = mc.index;
      if (zonaAman.some(([a, b]) => i >= a && i <= b)) continue;
      mentah.push(baris(teks, i));
    }
    if (mentah.length) {
      temuan.push({
        rel: relative(AKAR, f),
        primitif: p.nama,
        pembungkus: namaPembungkus,
        barisMentah: mentah,
      });
    }
  }
}

console.log('='.repeat(78));
console.log('G-22 — PENJAGA MENGANGGUR');
console.log(`Berkas dipindai: ${berkas.length}`);
console.log('='.repeat(78));

if (!temuan.length) {
  console.log('\nTidak ada modul yang mendefinisikan pembungkus aman lalu tetap');
  console.log('memanggil primitif mentahnya.');
} else {
  for (const t of temuan) {
    console.log(`\n${t.rel}`);
    console.log(`  pembungkus aman ada : ${t.pembungkus.join(', ')}()  (membungkus ${t.primitif})`);
    console.log(`  tapi ${t.primitif} mentah tetap dipanggil di baris: ${t.barisMentah.join(', ')}`);
  }
  console.log(`\nTotal: ${temuan.length} modul.`);
}
