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
 * yang ada di satu berkas tetapi tidak di berkas lain berarti ada pasangan
 * tag+properti yang lolos tanpa sanitasi, atau sebaliknya diperiksa runtime
 * tanpa sanitizer yang dipasang compiler.
 *
 * Skrip ini membandingkan isi keduanya secara struktural.
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

/** Mengekstrak entri `konteks|namespace|tag|properti` dari sebuah berkas skema. */
function extractEntries(relPath) {
  const source = readFileSync(join(ROOT, relPath), 'utf8');
  const schemaFn = source.match(/SECURITY_SCHEMA\(\)[\s\S]*?\n}\n/)?.[0] ?? source;
  const entries = new Set();
  let context = null;

  for (const line of schemaFn.split('\n')) {
    const ctx = line.match(
      /registerContext\(SecurityContext\.(\w+),\s*(?:\/\*\*\s*Namespace\s*\*\/\s*)?(\w+)?/,
    );
    if (ctx) {
      context = {name: ctx[1], namespace: ctx[2] ?? 'undefined'};
    }
    if (context === null) continue;

    for (const entry of line.matchAll(/\['([^']+)',\s*\[([^\]]*)\]\]/g)) {
      const tag = entry[1];
      const props = entry[2]
        .split(',')
        .map((p) => p.trim().replace(/^'|'$/g, ''))
        .filter(Boolean);
      for (const prop of props) {
        entries.add(`${context.name}|${context.namespace}|${tag}|${prop}`);
      }
    }
  }
  return entries;
}

const compilerEntries = extractEntries(COMPILER_SCHEMA);
const coreEntries = extractEntries(CORE_SCHEMA);

const onlyInCompiler = [...compilerEntries].filter((e) => !coreEntries.has(e)).sort();
const onlyInCore = [...coreEntries].filter((e) => !compilerEntries.has(e)).sort();

console.log(`compiler : ${compilerEntries.size} entri  (${COMPILER_SCHEMA})`);
console.log(`core     : ${coreEntries.size} entri  (${CORE_SCHEMA})`);

if (onlyInCompiler.length === 0 && onlyInCore.length === 0) {
  console.log('\nOK: kedua skema keamanan identik.');
  process.exit(0);
}

console.log('\nPERBEDAAN DITEMUKAN (format: KONTEKS|namespace|tag|properti)');
for (const e of onlyInCompiler) console.log(`  hanya di compiler : ${e}`);
for (const e of onlyInCore) console.log(`  hanya di core     : ${e}`);
console.log(
  '\nSetiap perbedaan perlu ditinjau: entri yang hanya ada di core tidak akan\n' +
    'mendapat sanitizer dari compiler, dan entri yang hanya ada di compiler tidak\n' +
    'akan diperiksa ulang oleh runtime.',
);
process.exit(1);
