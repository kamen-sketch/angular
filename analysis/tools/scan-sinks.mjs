/**
 * Pemindai SINK & SOURCE keamanan berbasis pola, untuk seluruh repositori.
 *
 * Motivasi: analisis taint pertama (analysis/TAINT-TO-SINK.txt) menelusuri sink
 * yang dipilih manual, sehingga cakupannya bergantung pada ingatan penganalisis.
 * Skrip ini membalik pendekatannya: seluruh berkas dipindai dengan katalog pola,
 * lalu hasilnya dikelompokkan supaya sink yang belum pernah ditinjau terlihat.
 *
 * Keluaran: analysis/SINK-INVENTORY.txt
 * Jalankan:  node analysis/tools/scan-sinks.mjs
 *            node analysis/tools/scan-sinks.mjs --include-tests
 *
 * ---------------------------------------------------------------------------
 * CATATAN RISET REGEX (alasan pola ditulis seperti ini)
 * ---------------------------------------------------------------------------
 * 1. JANGAN memakai \b untuk nama fungsi JavaScript.
 *    `\beval\b` cocok pada `a.eval(`, `$eval(`, dan `['eval']` karena `.` , `$`
 *    dan `'` bukan karakter kata. Diuji: 5 kecocokan, 4 di antaranya keliru.
 *    Gantinya lookbehind `(?<![\w$.])` yang menolak awalan identifier/properti.
 *    Node 22 mendukung lookbehind; ripgrep (Rust regex) TIDAK - itulah sebabnya
 *    pemindaian ini ditulis sebagai skrip, bukan satu baris grep.
 *
 * 2. Akses TAK LANGSUNG harus dipola terpisah.
 *    Lookbehind di atas justru membuang `global['eval'](...)` yang dipakai
 *    Angular di output_jit_trusted_types.ts. Karena itu ada pola khusus
 *    `INDIRECT_*` untuk bentuk `obj['nama']` dan `obj["nama"]`.
 *
 * 3. Bedakan TULIS dari BACA.
 *    `el.innerHTML` saja bukan sink; yang berbahaya adalah penugasan.
 *    Pola memakai `=(?!=)` agar `==` dan `===` tidak ikut, dan mengizinkan
 *    `+=` untuk penggabungan.
 *
 * 4. Properti bisa diakses lewat bracket: `el['innerHTML'] = x`.
 *    Setiap sink properti punya varian bracket.
 *
 * 5. Hilangkan komentar sebelum mencocokkan.
 *    Tanpa ini, dokumentasi yang menyebut `innerHTML` ikut terhitung. String
 *    TIDAK dihapus, karena kode hasil generate memang berupa string.
 *
 * 6. TypeScript menimbulkan positif palsu khas:
 *    - `Function` sebagai TIPE (`fn: Function`, `Array<Function>`) bukan
 *      pemanggilan konstruktor. Disaring dengan menolak baris beranotasi tipe.
 *    - deklarasi `declare function eval(...)` di berkas .d.ts (sudah dilewati).
 *
 * 7. Pola ditulis TANPA flag global di definisi; skrip menyalinnya per baris
 *    dengan `new RegExp(src, 'g')` agar `lastIndex` tidak bocor antar berkas.
 */
import {readdirSync, readFileSync, writeFileSync} from 'fs';
import {join, relative, dirname} from 'path';
import {fileURLToPath} from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'analysis', 'SINK-INVENTORY.txt');
const INCLUDE_TESTS = process.argv.includes('--include-tests');

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'bazel-out', 'third_party', '.bazel',
]);
const AREAS = ['packages', 'devtools', 'tools', 'adev', 'modules', 'scripts', 'dev-app'];

// --- katalog pola ----------------------------------------------------------
// kind: 'sink' | 'source' | 'guard'
// risk: 'tinggi' | 'sedang' | 'info'
const PATTERNS = [
  // === EKSEKUSI KODE ===
  {
    id: 'eval-langsung', kind: 'sink', risk: 'tinggi',
    desc: 'Pemanggilan eval() langsung',
    re: /(?<![\w$.])eval\s*\(/,
  },
  {
    id: 'eval-taklangsung', kind: 'sink', risk: 'tinggi',
    desc: "Akses eval lewat bracket, mis. global['eval'](...)",
    re: /\[\s*['"`]eval['"`]\s*\]\s*\(/,
  },
  {
    id: 'function-constructor', kind: 'sink', risk: 'tinggi',
    desc: 'new Function(...) / Function(...) sebagai konstruktor kode',
    re: /(?<![\w$.])(?:new\s+)?Function\s*\(/,
    // Saring anotasi tipe TS: `: Function`, `<Function>`, `as Function`.
    reject: /(?::\s*Function|<\s*Function|as\s+Function|\bFunction\s*\|)/,
  },
  {
    id: 'timer-string', kind: 'sink', risk: 'tinggi',
    desc: 'setTimeout/setInterval dengan argumen string (dievaluasi sebagai kode)',
    re: /(?<![\w$.])set(?:Timeout|Interval)\s*\(\s*['"`]/,
  },
  {
    id: 'import-dinamis', kind: 'sink', risk: 'sedang',
    desc: 'import() dinamis dengan ekspresi non-literal',
    re: /(?<![\w$.])import\s*\(\s*(?!['"`])/,
  },
  {
    id: 'worker-importscripts', kind: 'sink', risk: 'sedang',
    desc: 'importScripts() / new Worker() memuat kode eksternal',
    re: /(?<![\w$.])(?:importScripts|Worker)\s*\(/,
  },

  // === HTML / DOM ===
  {
    id: 'innerhtml-tulis', kind: 'sink', risk: 'tinggi',
    desc: 'Penugasan ke innerHTML/outerHTML',
    re: /\.\s*(?:inner|outer)HTML\s*\+?=(?!=)/,
  },
  {
    id: 'innerhtml-bracket', kind: 'sink', risk: 'tinggi',
    desc: "Penugasan innerHTML lewat bracket, mis. el['innerHTML'] = x",
    re: /\[\s*['"`](?:inner|outer)HTML['"`]\s*\]\s*\+?=(?!=)/,
  },
  {
    id: 'insertadjacenthtml', kind: 'sink', risk: 'tinggi',
    desc: 'insertAdjacentHTML()',
    re: /\.\s*insertAdjacentHTML\s*\(/,
  },
  {
    id: 'document-write', kind: 'sink', risk: 'tinggi',
    desc: 'document.write() / writeln()',
    re: /\.\s*write(?:ln)?\s*\(/,
    require: /document|doc\b|\bwin(?:dow)?\./,
  },
  {
    id: 'range-fragment', kind: 'sink', risk: 'tinggi',
    desc: 'createContextualFragment() mem-parse HTML menjadi node hidup',
    re: /\.\s*createContextualFragment\s*\(/,
  },
  {
    id: 'domparser', kind: 'sink', risk: 'sedang',
    desc: 'DOMParser.parseFromString() (inert, tapi sumber node)',
    re: /\.\s*parseFromString\s*\(/,
  },
  {
    id: 'srcdoc-tulis', kind: 'sink', risk: 'tinggi',
    desc: 'Penugasan ke iframe.srcdoc',
    re: /\.\s*srcdoc\s*\+?=(?!=)/,
  },

  // === URL / PEMUATAN RESOURCE ===
  {
    id: 'src-href-tulis', kind: 'sink', risk: 'sedang',
    desc: 'Penugasan ke .src / .href / .action / .data / .codebase',
    re: /\.\s*(?:src|href|action|formAction|codebase)\s*\+?=(?!=)/,
  },
  {
    id: 'setattribute-berbahaya', kind: 'sink', risk: 'sedang',
    desc: 'setAttribute dengan nama atribut sensitif (literal)',
    re: /\.\s*setAttribute\s*\(\s*['"`](?:src|href|srcdoc|action|formaction|data|codebase|xlink:href|style|sandbox|allow|csp)['"`]/i,
  },
  {
    id: 'setattribute-dinamis', kind: 'sink', risk: 'sedang',
    desc: 'setAttribute dengan nama atribut dari variabel (tidak bisa dinilai statis)',
    re: /\.\s*setAttribute\s*\(\s*(?!['"`])[A-Za-z_$]/,
    // Nama atribut yang berupa KONSTANTA (NGH_ATTR_NAME) atau anggota enum
    // (Attribute.JSACTION) tetap statis walau bukan literal string, jadi bukan
    // kandidat taint. Tanpa penyaring ini, 8 dari 10 kecocokan pertama adalah
    // positif palsu.
    reject: /setAttribute\s*\(\s*(?:[A-Z][A-Z0-9_]*\s*[,)]|\w+\.[A-Z][A-Z0-9_]*\s*[,)])/,
  },
  {
    id: 'lokasi-navigasi', kind: 'sink', risk: 'sedang',
    desc: 'location.href= / location.assign / replace / window.open',
    // Versi pertama memakai `(?<![\w$.])open\s*\(` untuk menangkap `open(...)`
    // global. Itu KELIRU: ia mencocokkan deklarasi metode bernama `open`
    // (mis. `async open(name: string)` di service-worker) - 3 dari 3 kecocokan
    // adalah positif palsu. Penerima kini dibatasi pada objek global saja.
    re: /(?:location\s*\.\s*(?:href|protocol)\s*\+?=(?!=)|location\s*\.\s*(?:assign|replace)\s*\(|(?:window|self|globalThis|top|parent)\s*\.\s*open\s*\()/,
  },

  {
    id: 'sw-navigasi', kind: 'sink', risk: 'sedang',
    desc: 'clients.openWindow() / client.navigate() / scope.fetch() di Service Worker',
    // Ditambahkan setelah triase: pola `lokasi-navigasi` hanya mengenal
    // window.open dan location.*, sehingga MELEWATKAN seluruh keluarga navigasi
    // Service Worker. Padahal di driver.ts URL-nya berasal dari payload push.
    re: /\.\s*(?:openWindow|navigate)\s*\(|scope\s*\.\s*fetch\s*\(/,
  },

  // === TRUSTED TYPES ===
  {
    id: 'trusted-types-policy', kind: 'guard', risk: 'info',
    desc: 'createPolicy / createHTML / createScript / createScriptURL',
    re: /\.\s*create(?:Policy|HTML|Script|ScriptURL)\s*\(/,
  },

  // === SPESIFIK ANGULAR ===
  {
    id: 'bypass-sanitasi', kind: 'sink', risk: 'tinggi',
    desc: 'bypassSecurityTrust* / bypassSanitizationTrust* (taint menembus guard)',
    re: /(?<![\w$.])bypass(?:Security|Sanitization)Trust\w*\s*\(/,
  },
  {
    id: 'unwrap-safevalue', kind: 'sink', risk: 'sedang',
    desc: 'unwrapSafeValue() melepas nilai mentah dari pembungkus SafeValue',
    re: /(?<![\w$.])unwrapSafeValue\s*\(/,
  },
  {
    id: 'sanitizer-runtime', kind: 'guard', risk: 'info',
    desc: 'Pemanggilan ɵɵsanitize* / _sanitizeHtml / _sanitizeUrl',
    re: /(?<![\w$.])(?:ɵɵsanitize\w+|_sanitize(?:Html|Url))\s*\(/,
  },
  {
    id: 'trust-konstan', kind: 'guard', risk: 'info',
    desc: 'ɵɵtrustConstantHtml / ɵɵtrustConstantResourceUrl',
    re: /(?<![\w$.])ɵɵtrustConstant\w+/,
  },

  // === NODE / SSR ===
  {
    id: 'child-process', kind: 'sink', risk: 'tinggi',
    desc: 'exec / execSync / spawn (eksekusi perintah OS)',
    re: /(?<![\w$.])(?:exec|execSync|execFile|spawn|spawnSync)\s*\(/,
  },
  {
    id: 'fs-tulis', kind: 'sink', risk: 'sedang',
    desc: 'writeFile / appendFile / rm / unlink dengan path dinamis',
    re: /(?<![\w$.])(?:writeFileSync|writeFile|appendFileSync|rmSync|unlinkSync)\s*\(/,
  },

  // === SOURCE (titik masuk data tidak tepercaya) ===
  {
    id: 'src-lokasi', kind: 'source', risk: 'info',
    desc: 'location.search / hash / href, document.URL, referrer',
    re: /(?:location\s*\.\s*(?:search|hash|href|pathname)|document\s*\.\s*(?:URL|referrer|documentURI))/,
  },
  {
    id: 'src-postmessage', kind: 'source', risk: 'sedang',
    desc: "postMessage / listener 'message' (data lintas-origin)",
    re: /(?:\.\s*postMessage\s*\(|['"`]message['"`]\s*,\s*(?:this\.)?\w*(?:handler|listener|on\w+))/,
  },
  {
    id: 'src-storage', kind: 'source', risk: 'info',
    desc: 'localStorage / sessionStorage / document.cookie',
    re: /(?:localStorage|sessionStorage)\s*\.\s*getItem\s*\(|document\s*\.\s*cookie/,
  },
  {
    id: 'src-windowname', kind: 'source', risk: 'sedang',
    desc: 'window.name (bertahan lintas navigasi, sepenuhnya dikendalikan penyerang)',
    re: /window\s*\.\s*name(?!\s*[:=]\s*['"`])/,
  },
];

// --- pemindaian -------------------------------------------------------------
function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, {withFileTypes: true});
  } catch {
    return out;
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(m|c)?[jt]s$/.test(e.name) && !/\.d\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

/** Mengosongkan isi komentar tetapi mempertahankan nomor baris. */
function stripComments(src) {
  let out = '';
  let state = 'code';
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    const n = src[i + 1];
    if (state === 'code') {
      if (c === '/' && n === '/') { state = 'line'; out += '  '; i++; continue; }
      if (c === '/' && n === '*') { state = 'block'; out += '  '; i++; continue; }
      out += c;
      continue;
    }
    if (state === 'line') {
      if (c === '\n') { state = 'code'; out += c; } else out += ' ';
      continue;
    }
    if (c === '*' && n === '/') { state = 'code'; out += '  '; i++; continue; }
    out += c === '\n' ? '\n' : ' ';
  }
  return out;
}

const isTest = (rel) =>
  /(^|\/)test\//.test(rel) || /[._]spec\.[jt]s$/.test(rel) || /(^|\/)(fixtures|testing)\//.test(rel);

const areaOf = (rel) => {
  const seg = rel.split('/');
  return seg[0] === 'packages' ? `packages/${seg[1]}` : seg[0];
};

const files = AREAS.flatMap((a) => walk(join(ROOT, a))).map((f) => relative(ROOT, f)).sort();
const hits = new Map(PATTERNS.map((p) => [p.id, []]));
let scanned = 0;

for (const rel of files) {
  const testFile = isTest(rel);
  if (testFile && !INCLUDE_TESTS) continue;
  scanned++;
  const lines = stripComments(readFileSync(join(ROOT, rel), 'utf8')).split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    for (const p of PATTERNS) {
      const re = new RegExp(p.re.source, p.re.flags.replace('g', ''));
      if (!re.test(line)) continue;
      if (p.reject && p.reject.test(line)) continue;
      if (p.require && !p.require.test(line)) continue;
      hits.get(p.id).push({file: rel, line: i + 1, text: line.trim().slice(0, 120), testFile});
    }
  }
}

// --- laporan ----------------------------------------------------------------
const rank = {tinggi: 0, sedang: 1, info: 2};
const ordered = [...PATTERNS].sort(
  (a, b) => rank[a.risk] - rank[b.risk] || a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id),
);

const report = [
  'INVENTARIS SINK & SOURCE KEAMANAN (hasil pemindaian pola)',
  'Dihasilkan otomatis oleh analysis/tools/scan-sinks.mjs -- jangan diedit manual.',
  `Berkas dipindai: ${scanned}${INCLUDE_TESTS ? ' (termasuk test)' : ' (test dikecualikan)'}`,
  `Pola dipakai   : ${PATTERNS.length}`,
  '',
  'Catatan: hasil ini adalah KANDIDAT, bukan kerentanan. Setiap baris perlu',
  'ditinjau manual; lihat analysis/TAINT-TO-SINK.txt untuk rantai yang sudah',
  'ditelusuri sampai tuntas.',
  '='.repeat(78),
  '',
  'RINGKASAN',
  '-'.repeat(78),
];

for (const p of ordered) {
  const list = hits.get(p.id);
  const areas = new Set(list.map((h) => areaOf(h.file)));
  report.push(
    `${p.risk.padEnd(7)} ${p.kind.padEnd(7)} ${p.id.padEnd(26)} ${String(list.length).padStart(5)} kecocokan  ${areas.size} area`,
  );
}

report.push('', '='.repeat(78), '', 'RINCIAN PER POLA', '');
for (const p of ordered) {
  const list = hits.get(p.id);
  report.push('-'.repeat(78));
  report.push(`## ${p.id}  [${p.risk}/${p.kind}]  -- ${list.length} kecocokan`);
  report.push(`   ${p.desc}`);
  report.push(`   regex: ${p.re}`);
  if (p.reject) report.push(`   tolak: ${p.reject}`);
  if (p.require) report.push(`   syarat: ${p.require}`);
  report.push('');
  if (list.length === 0) {
    report.push('   (tidak ada kecocokan)');
    report.push('');
    continue;
  }
  const byArea = new Map();
  for (const h of list) {
    const a = areaOf(h.file);
    if (!byArea.has(a)) byArea.set(a, []);
    byArea.get(a).push(h);
  }
  for (const [area, items] of [...byArea].sort((a, b) => b[1].length - a[1].length)) {
    report.push(`   [${area}] ${items.length}`);
    for (const h of items.slice(0, 25)) {
      report.push(`     ${h.file}:${h.line}  ${h.text}`);
    }
    if (items.length > 25) report.push(`     ... dan ${items.length - 25} lainnya`);
  }
  report.push('');
}

writeFileSync(OUT, report.join('\n') + '\n');

console.log(`berkas dipindai : ${scanned}`);
console.log(`pola            : ${PATTERNS.length}`);
for (const p of ordered) {
  const n = hits.get(p.id).length;
  if (n) console.log(`  ${p.risk.padEnd(7)} ${p.id.padEnd(26)} ${String(n).padStart(5)}`);
}
console.log(`\nlaporan -> ${relative(ROOT, OUT)}`);
