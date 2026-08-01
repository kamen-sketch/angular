/**
 * G-26 — ASIMETRI ANTAR-PEMANGGIL, LINTAS BERKAS.
 *
 * Kenapa pemindai ini ada: seluruh temuan nyata sesi ini berbentuk sama —
 * "operasi X dilakukan di banyak tempat; hampir semua tempat mendahuluinya
 * dengan penjaga G; SATU tempat tidak."
 *
 *   F-11  decodeURIComponent  dijaga tryDecodeURIComponent di parseKeyValue,
 *                             TIDAK di decodePath/decodeHash
 *   F-12  pattern.test(url)   didahului normalizeUrl di assets.ts,
 *                             TIDAK di data.ts
 *   F-15  Cache-Control       dibaca assets.ts, TIDAK di data.ts
 *
 * Tetapi ketiganya saya temukan di dalam SATU berkas, atau dengan membaca
 * manual. Pemindai sebelumnya (G-22..G-25) semuanya berbasis satu situs dalam
 * satu berkas. Itu celahnya.
 *
 * METODE — norma disimpulkan dari data, bukan dari tebakan saya
 * -------------------------------------------------------------
 * 1. Pecah SELURUH repositori menjadi badan-fungsi (pencocokan kurung).
 * 2. Untuk tiap badan, catat OPERASI apa saja yang muncul di dalamnya.
 * 3. Untuk tiap pasangan (operasi, penjaga), hitung berapa sering keduanya
 *    muncul bersama.
 * 4. Kalau sebuah penjaga menyertai operasi pada MAYORITAS situs (>= ambang)
 *    dan jumlah situsnya cukup, maka situs yang TIDAK memakainya adalah
 *    penyimpangan — dan itulah yang dilaporkan.
 *
 * Yang membedakan dari pemindai sebelumnya: saya tidak menyatakan penjaga mana
 * yang "seharusnya" dipakai. Kodebase yang menyatakannya sendiri, lewat
 * mayoritas. Saya hanya menanyakan siapa yang menyimpang.
 *
 * Jalankan: node analysis/regex-corpus/scan-caller-asymmetry.mjs [--min N] [--rate R]
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative} from 'path';

const ROOT = process.cwd();
const SKIP = /[._]spec\.ts$|\.d\.ts$|\/test\/|\/testing\/|node_modules|\/schematics\/|\/migrations\//;
const argMin = process.argv.indexOf('--min');
const argRate = process.argv.indexOf('--rate');
const MIN_SITES = argMin > 0 ? Number(process.argv[argMin + 1]) : 4;
const MIN_RATE = argRate > 0 ? Number(process.argv[argRate + 1]) : 0.7;

/**
 * OPERASI yang menarik: sesuatu yang memproses masukan yang mungkin ternoda.
 * Sengaja luas — penyaringnya adalah statistik, bukan daftar ini.
 */
const OPS = {
  'decodeURIComponent': /(?<![.\w])decodeURIComponent\s*\(/,
  'decodeURI': /(?<![.\w])decodeURI\s*\(/,
  'JSON.parse': /(?<!\w)JSON\s*\.\s*parse\s*\(/,
  'new RegExp': /(?<![.\w])new\s+RegExp\s*\(/,
  'regex.test': /\.\s*test\s*\(/,
  'cache.match': /\.\s*match\s*\(\s*\w+\s*,/,
  'new URL': /(?<![.\w])new\s+URL\s*\(/,
  'setAttribute': /\.\s*setAttribute\s*\(/,
  'innerHTML': /\.\s*(?:inner|outer)HTML\s*=/,
  'headers.get': /\.\s*headers\s*\.\s*get\s*\(/,
  'dynamic-index-write': /\w+\s*\[\s*(?!['"`\d])[A-Za-z_$][\w$.]*\s*\]\s*=(?!=)/,
  'fetch': /(?<![.\w])fetch\s*\(|\.\s*fetch\s*\(/,
};

/**
 * PENJAGA: sesuatu yang menormalkan, memvalidasi, membatasi, atau menangkap.
 * Sekali lagi sengaja luas.
 */
const GUARDS = {
  'try/catch': /\btry\s*\{/,
  'normalizeUrl': /normalizeUrl\s*\(/,
  'hasOwn': /Object\s*\.\s*hasOwn\s*\(|hasOwnProperty\s*\.\s*call\s*\(|\.\s*hasOwnProperty\s*\(/,
  'origin-check': /\.\s*origin\s*[!=]==?|origin\s*===?\s*\w*[Oo]rigin/,
  'anchor-regex': /['"`]\^|\$['"`]|\^\(\?:/,
  'sanitize': /sanitiz\w*\s*\(/i,
  'allowlist-includes': /\.\s*(?:includes|indexOf|has)\s*\(/,
  'null-guard': /(?:\?\?|\|\|)\s*(?:null|undefined|''|""|\{\}|\[\])|===?\s*(?:null|undefined)/,
  'instanceof-check': /\binstanceof\b/,
  'typeof-check': /\btypeof\b/,
  'length-bound': /\.\s*length\s*[<>]|\.\s*slice\s*\(|\.\s*substring\s*\(/,
};

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

/** Ambil badan `{...}` mulai dari indeks `open`, dengan pencocokan kurung. */
function body(text, open, max = 12000) {
  let depth = 0;
  for (let i = open; i < text.length && i < open + max; i++) {
    const c = text[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return text.slice(open, i + 1);
    }
  }
  return null;
}

/**
 * Pecah berkas menjadi badan-fungsi.
 *
 * Versi pertama pemindai ini memakai satu regex besar dan hanya menemukan 175
 * badan dari 1831 berkas — jelas rusak, dan kalau tidak diperiksa ia akan
 * melaporkan "bersih" karena kebutaan, bukan karena tidak ada apa-apa.
 *
 * Versi ini jauh lebih sederhana dan karena itu lebih andal: cari setiap `{`
 * yang MENGIKUTI daftar parameter `)` (dengan tipe kembalian opsional) atau
 * sebuah panah `=>`. Itu menangkap fungsi, metode, konstruktor, getter, arrow,
 * dan callback sekaligus. Namanya diambil dari identifier terdekat sebelum
 * `(` — cukup untuk pelaporan, dan tidak dipakai untuk logika apa pun.
 */
// `if (...) {`, `for (...) {`, `while (...) {`, `catch (...) {`, `switch (...) {`
// juga berbentuk `)` diikuti `{`. Jalan kedua pemindai ini menghitung semuanya
// sebagai "fungsi", sehingga satu fungsi terpecah menjadi belasan situs semu
// dan statistiknya jadi omong kosong. Ditolak di sini.
const KENDALI = /^(?:if|for|while|switch|catch|do|else|with)$/;

function functions(text) {
  const out = [];
  const RE_OPEN = /(\)\s*(?::\s*[^{;=()]+)?|=>)\s*\{/g;
  let m;
  while ((m = RE_OPEN.exec(text))) {
    const open = RE_OPEN.lastIndex - 1;
    const head = text.slice(Math.max(0, m.index - 160), m.index + 1);
    // Identifier tepat sebelum '(' pembuka parameter, kalau ada.
    const nm = head.match(/([\w$]+)\s*(?:<[^>]*>)?\s*\([^()]*$/);
    const name = nm ? nm[1] : '(anonim)';
    if (KENDALI.test(name)) continue;
    const b = body(text, open);
    if (!b || b.length < 60) continue;
    out.push({name, start: open, end: open + b.length, src: b});
  }
  // Arrow dan callback DI DALAM sebuah fungsi juga tertangkap, sehingga satu
  // fungsi nyata bisa muncul sebagai beberapa situs dan statistiknya membengkak
  // — itulah asal "penyimpangan" semu assets.ts:183/188/238 pada jalan ketiga.
  // Unit yang benar untuk analisis asimetri adalah fungsi TERLUAR, jadi badan
  // yang sepenuhnya berada di dalam badan lain dibuang.
  out.sort((a, b2) => a.start - b2.start || b2.end - a.end);
  const terluar = [];
  let batasAkhir = -1;
  for (const f of out) {
    if (f.start < batasAkhir) continue;
    terluar.push(f);
    batasAkhir = f.end;
  }
  return terluar;
}

const files = collect(join(ROOT, 'packages'));
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

// Kumpulkan situs: satu entri per (badan-fungsi, operasi).
const sites = []; // {rel, line, fn, op, guards:Set}
for (const file of files) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const rel = relative(ROOT, file);
  for (const fn of functions(text)) {
    const present = [];
    for (const [op, re] of Object.entries(OPS)) if (re.test(fn.src)) present.push(op);
    if (!present.length) continue;
    const guards = new Set();
    for (const [g, re] of Object.entries(GUARDS)) if (re.test(fn.src)) guards.add(g);
    for (const op of present) {
      sites.push({rel, line: lineOf(text, fn.start), fn: fn.name, op, guards});
    }
  }
}

// Norma harus LOKAL, bukan global.
//
// Jalan pertama menghitung ko-okurensi di seluruh repositori dan menghasilkan
// nol penyimpangan — bukan karena bersih, melainkan karena `regex.test` muncul
// di 1000+ tempat dengan konteks yang sama sekali berbeda, sehingga "norma"
// global tidak berarti apa-apa.
//
// Yang benar adalah membandingkan TETANGGA: berkas di direktori yang sama
// mengerjakan hal yang sejenis. Persis di situlah F-12 dan F-15 hidup —
// assets.ts vs data.ts, bersebelahan di worker/src.
const byDirOp = new Map(); // "dir|op" -> [situs]
for (const s of sites) {
  const dir = s.rel.slice(0, s.rel.lastIndexOf('/'));
  const key = `${dir}|${s.op}`;
  if (!byDirOp.has(key)) byDirOp.set(key, []);
  byDirOp.get(key).push(s);
}

const deviants = [];
for (const [key, list] of byDirOp) {
  const [dir, op] = key.split('|');
  // Butuh cukup tetangga agar "mayoritas" punya arti, tetapi tidak sebanyak
  // ambang global — satu direktori jarang punya puluhan situs sejenis.
  if (list.length < MIN_SITES) continue;
  const berkasBerbeda = new Set(list.map((s) => s.rel)).size;
  if (berkasBerbeda < 2) continue; // asimetri butuh minimal dua berkas
  for (const guard of Object.keys(GUARDS)) {
    const withGuard = list.filter((s) => s.guards.has(guard));
    const without = list.filter((s) => !s.guards.has(guard));
    const rate = withGuard.length / list.length;
    if (rate < MIN_RATE || !without.length) continue;
    // Penyimpangan harus MINORITAS yang jelas, bukan separuh-separuh.
    if (without.length > Math.max(2, list.length * 0.3)) continue;
    deviants.push({dir, op, guard, rate, total: list.length, without, withGuard});
  }
}

deviants.sort((a, b) => b.rate - a.rate || a.without.length - b.without.length);

console.log('='.repeat(78));
console.log('G-26 — ASIMETRI ANTAR-PEMANGGIL (norma disimpulkan dari mayoritas)');
console.log(
  `Berkas: ${files.length}   badan-fungsi dengan operasi menarik: ${sites.length}   ` +
    `ambang: >=${MIN_SITES} situs, >=${(MIN_RATE * 100) | 0}% memakai penjaga`,
);
console.log('='.repeat(78));

if (!deviants.length) {
  console.log('\nTidak ada penyimpangan pada ambang ini.');
} else {
  for (const d of deviants) {
    console.log(`\n${d.dir}`);
    console.log(
      `  [${d.op}] + penjaga "${d.guard}": ${((d.rate * 100) | 0)}% dari ${d.total} situs di direktori ini memakainya.`,
    );
    console.log(`  MEMAKAI (${d.withGuard.length}):`);
    for (const s of d.withGuard.slice(0, 5)) console.log(`     ${s.rel.split('/').pop()}:${s.line}  ${s.fn}()`);
    console.log(`  TIDAK MEMAKAI (${d.without.length}):`);
    for (const s of d.without) console.log(`  >> ${s.rel.split('/').pop()}:${s.line}  ${s.fn}()`);
  }
  console.log(`\nTotal pasangan menyimpang: ${deviants.length}`);
}

console.log('\nTRIASE: penyimpangan BUKAN berarti cacat. Tanyakan tiga hal —');
console.log('  1. apakah masukannya benar-benar runtime (URL, cookie, header, respons)?');
console.log('  2. apakah penjaga itu memang relevan di situs ini, atau kebetulan saja?');
console.log('  3. apakah ada penjaga LAIN di situs ini yang menggantikan perannya?');
console.log('Pemindai ini menyaring 2000+ berkas menjadi daftar yang bisa dibaca manual.');
