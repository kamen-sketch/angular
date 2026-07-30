/**
 * Verifikasi sinkronisasi DUA skema keamanan DOM.
 *
 * Latar belakang (lihat analysis/TAINT-TO-SINK.txt bagian 11, temuan P1):
 * keputusan "apakah sebuah binding perlu disanitasi" diambil COMPILER memakai
 *   packages/compiler/src/schema/dom_security_schema.ts
 * sementara pemeriksaan ulang saat runtime memakai salinannya di
 *   packages/core/src/sanitization/dom_security_schema.ts
 *
 * Kedua berkas hanya diikat oleh komentar ("Keep is a copy of DOM Security
 * Schema"); tidak ditemukan uji otomatis yang membandingkan keduanya. Entri
 * yang ada di satu berkas tetapi tidak di berkas lain berarti ada kombinasi
 * tag+atribut yang lolos tanpa sanitasi, atau sebaliknya diperiksa runtime
 * tanpa sanitizer yang dipasang compiler.
 *
 * CATATAN PARSING (penting):
 * Versi pertama skrip ini memakai regex per-baris `['tag', ['a','b']]` sehingga
 * DIAM-DIAM MELEWATKAN blok yang ditulis multi-baris - termasuk blok
 * ATTRIBUTE_NO_BINDING berisi kombinasi iframe/unknown x sandbox|allow|csp|...
 * yang justru paling sensitif. Versi ini membaca isi argumen `registerContext`
 * secara utuh (penghitungan kurung, tahan komentar dan pemenggalan baris),
 * sehingga tata letak kode tidak lagi memengaruhi hasil.
 *
 * Keluar dengan kode 1 bila ada perbedaan.
 *
 * Jalankan:  node analysis/tools/check-security-schema-sync.mjs
 */
import {readFileSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const COMPILER_SCHEMA = 'packages/compiler/src/schema/dom_security_schema.ts';
const CORE_SCHEMA = 'packages/core/src/sanitization/dom_security_schema.ts';

/** Menghapus komentar agar tidak ikut terbaca sebagai kode. */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ');
}

/** Mengambil teks argumen di dalam sepasang kurung, mulai dari `openIndex`. */
function readBalanced(src, openIndex, open = '(', close = ')') {
  let depth = 0;
  for (let i = openIndex; i < src.length; i++) {
    if (src[i] === open) depth++;
    else if (src[i] === close) {
      depth--;
      if (depth === 0) return {text: src.slice(openIndex + 1, i), end: i};
    }
  }
  throw new Error('Kurung tidak seimbang saat mem-parse skema keamanan.');
}

/**
 * Mengekstrak entri `KONTEKS|namespace|tag|atribut` dari sebuah berkas skema,
 * tanpa bergantung pada posisi baris.
 */
function extractEntries(relPath) {
  const source = stripComments(readFileSync(join(ROOT, relPath), 'utf8'));
  const entries = new Set();

  for (const call of source.matchAll(/registerContext\s*\(/g)) {
    const openIndex = call.index + call[0].length - 1;
    const {text: args} = readBalanced(source, openIndex);

    const ctx = args.match(/SecurityContext\.(\w+)/);
    if (!ctx) continue;
    const context = ctx[1];

    // Argumen kedua: nama namespace (identifier) atau `undefined`.
    const afterCtx = args.slice(ctx.index + ctx[0].length);
    const nsMatch = afterCtx.match(/^\s*,\s*([A-Za-z_$][\w$]*)/);
    const namespace = nsMatch ? nsMatch[1] : 'undefined';

    // Argumen ketiga: array spesifikasi `[[tag, [attr, ...]], ...]`.
    const specsStart = args.indexOf('[', ctx.index);
    if (specsStart === -1) continue;
    const {text: specsBody} = readBalanced(args, specsStart, '[', ']');

    // Setiap spesifikasi: '<tag>' diikuti array nama atribut.
    const specRe = /'([^']+)'\s*,\s*\[/g;
    let spec;
    while ((spec = specRe.exec(specsBody)) !== null) {
      const tag = spec[1];
      const attrsOpen = specRe.lastIndex - 1;
      const {text: attrsBody, end} = readBalanced(specsBody, attrsOpen, '[', ']');
      for (const attr of attrsBody.matchAll(/'([^']+)'/g)) {
        entries.add(`${context}|${namespace}|${tag.toLowerCase()}|${attr[1].toLowerCase()}`);
      }
      specRe.lastIndex = end;
    }
  }
  return entries;
}

/** Mengelompokkan entri ATTRIBUTE_NO_BINDING menjadi {namespace: {tag: [attr]}}. */
function attributeNoBindingByTag(entries) {
  const out = new Map();
  for (const e of entries) {
    const [context, namespace, tag, attr] = e.split('|');
    if (context !== 'ATTRIBUTE_NO_BINDING') continue;
    const key = `${namespace}|${tag}`;
    if (!out.has(key)) out.set(key, new Set());
    out.get(key).add(attr);
  }
  return out;
}

/** Membaca daftar identifier string dari sebuah deklarasi array bernama. */
function readNamedStringArray(relPath, declaration) {
  const source = stripComments(readFileSync(join(ROOT, relPath), 'utf8'));
  const start = source.indexOf(declaration);
  if (start === -1) return null;
  const open = source.indexOf('[', start);
  if (open === -1) return null;
  const {text} = readBalanced(source, open, '[', ']');
  return [...text.matchAll(/'([^']+)'/g)].map((m) => m[1].toLowerCase()).sort();
}

const compilerEntries = extractEntries(COMPILER_SCHEMA);
const coreEntries = extractEntries(CORE_SCHEMA);

const onlyInCompiler = [...compilerEntries].filter((e) => !coreEntries.has(e)).sort();
const onlyInCore = [...coreEntries].filter((e) => !compilerEntries.has(e)).sort();

console.log(`compiler : ${compilerEntries.size} kombinasi  (${COMPILER_SCHEMA})`);
console.log(`core     : ${coreEntries.size} kombinasi  (${CORE_SCHEMA})`);

const problems = [];

if (compilerEntries.size === 0 || coreEntries.size === 0) {
  problems.push('Tidak ada entri yang terbaca - format berkas mungkin berubah.');
}
for (const e of onlyInCompiler) problems.push(`hanya di compiler : ${e}`);
for (const e of onlyInCore) problems.push(`hanya di core     : ${e}`);

// --- Pemeriksaan 2: `unknown` harus mencakup gabungan seluruh atribut
// ATTRIBUTE_NO_BINDING dari semua tag. `unknown` dipakai ketika elemen host
// belum diketahui saat kompilasi; bila ada atribut yang terdaftar untuk sebuah
// tag konkret tetapi tidak ada di `unknown`, maka host binding pada selector
// generik akan lolos tanpa pemeriksaan runtime.
const byTag = attributeNoBindingByTag(compilerEntries);
const unknownAttrs = byTag.get('undefined|unknown') ?? new Set();
const allTagAttrs = new Set();
for (const [key, attrs] of byTag) {
  if (key === 'undefined|unknown') continue;
  for (const a of attrs) allTagAttrs.add(a);
}
const missingFromUnknown = [...allTagAttrs].filter((a) => !unknownAttrs.has(a)).sort();
for (const a of missingFromUnknown) {
  problems.push(`atribut '${a}' terdaftar untuk tag konkret tetapi tidak ada di entri 'unknown'`);
}

// --- Pemeriksaan 3: daftar atribut iframe di skema harus sama dengan salinan
// manual di uji akseptansi (berkas itu sendiri menyatakan "*Must* be in sync").
const ACCEPTANCE_TEST = 'packages/core/test/acceptance/security_spec.ts';
const iframeAttrs = [...(byTag.get('undefined|iframe') ?? [])].sort();
const testAttrs = readNamedStringArray(ACCEPTANCE_TEST, 'SECURITY_SENSITIVE_ATTRS = [');
if (testAttrs === null) {
  problems.push(`tidak dapat membaca SECURITY_SENSITIVE_ATTRS dari ${ACCEPTANCE_TEST}`);
} else if (JSON.stringify(iframeAttrs) !== JSON.stringify(testAttrs)) {
  problems.push(
    `daftar atribut iframe berbeda dengan ${ACCEPTANCE_TEST}\n` +
      `      skema: ${iframeAttrs.join(', ')}\n` +
      `      uji  : ${testAttrs.join(', ')}`,
  );
}

console.log(`unknown  : ${unknownAttrs.size} atribut (penampung host binding generik)`);
console.log(`iframe   : ${iframeAttrs.length} atribut sensitif`);

if (problems.length === 0) {
  console.log('\nOK: skema compiler & core identik, `unknown` lengkap, uji akseptansi selaras.');
  process.exit(0);
}

console.log('\nMASALAH DITEMUKAN (format: KONTEKS|namespace|tag|atribut)');
for (const p of problems) console.log(`  - ${p}`);
console.log(
  '\nSetiap perbedaan perlu ditinjau: entri yang hanya ada di core tidak akan\n' +
    'mendapat sanitizer dari compiler, dan entri yang hanya ada di compiler tidak\n' +
    'akan diperiksa ulang oleh runtime.',
);
process.exit(1);
