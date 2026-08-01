/**
 * G-23 — "default yang bertentangan".
 *
 * Kelas cacat: SATU opsi konfigurasi diberi nilai default yang BERBEDA di dua
 * tempat. Salah satu pemanggil fail-open, yang lain fail-closed, untuk opsi
 * yang sama.
 *
 * Kenapa kelas ini bernilai: sama seperti G-22, ia tidak menebak niat. Kalau
 * kode yang sama memberi default `false` di satu cabang dan `true` di cabang
 * lain untuk opsi yang identik, paling banyak satu di antaranya benar.
 * Pertanyaannya tinggal: yang mana, dan apa akibatnya.
 *
 * Contoh nyata yang memotivasi pemindai ini (ditemukan manual saat menelusuri
 * F-12): packages/service-worker/worker/src/data.ts
 *     :353  const okToCacheOpaque = this.config.cacheOpaqueResponses ?? false;
 *     :399  const okToCacheOpaque = this.config.cacheOpaqueResponses ?? true;
 * Opsi yang sama, berkas yang sama, 46 baris terpisah, default berlawanan.
 *
 * Jalankan: node analysis/regex-corpus/scan-conflicting-defaults.mjs
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative} from 'path';

const ROOT = process.cwd();
const SKIP = /[._]spec\.ts$|\.d\.ts$|\/test\/|\/testing\/|node_modules/;

// HANYA default BOOLEAN. Di situlah fail-open vs fail-closed hidup; default
// string seperti 'OK' vs 'Unknown Error' adalah pesan, bukan kebijakan.
// Pelajaran dari jalan pertama pemindai ini: tanpa batasan itu, keluarannya
// didominasi `region='...'` di dalam komentar JSDoc.
const DEFAULT_FORMS = [
  {
    id: 'nullish',
    re: /(?:^|[^\w.])([\w$]+(?:\.[\w$]+)*\.)?([\w$]+)\s*\?\?\s*(true|false)\b/g,
    nameGroup: 2,
    valueGroup: 3,
  },
  {
    id: 'or',
    re: /(?:^|[^\w.])([\w$]+(?:\.[\w$]+)*\.)?([\w$]+)\s*\|\|\s*(true|false)\b/g,
    nameGroup: 2,
    valueGroup: 3,
  },
  {
    id: 'destructure',
    re: /([\w$]+)\s*=\s*(true|false)\s*[,}]/g,
    nameGroup: 1,
    valueGroup: 2,
    requireLine: /\{/,
  },
  {
    id: 'ternary-undefined',
    re: /([\w$]+)\s*===?\s*undefined\s*\?\s*(true|false)\b/g,
    nameGroup: 1,
    valueGroup: 2,
  },
];

// Nama yang terlalu umum -> menghasilkan derau, bukan sinyal.
const NOISE = new Set([
  'value', 'v', 'x', 'y', 'i', 'j', 'n', 'a', 'b', 'result', 'res', 'ret',
  'length', 'size', 'index', 'count', 'name', 'type', 'id', 'key', 'data',
  'state', 'node', 'el', 'element', 'options', 'opts', 'config', 'flags',
  'first', 'last', 'next', 'prev', 'left', 'right', 'top', 'end', 'start',
]);

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

const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

const files = collect(join(ROOT, 'packages'));
const findings = [];

for (const file of files) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const rel = relative(ROOT, file);
  const lines = text.split('\n');

  // nama opsi -> Map(nilai -> [baris])
  const seen = new Map();

  for (const form of DEFAULT_FORMS) {
    form.re.lastIndex = 0;
    let m;
    while ((m = form.re.exec(text))) {
      const name = m[form.nameGroup];
      const value = m[form.valueGroup];
      if (!name || NOISE.has(name) || name.length < 4) continue;
      const line = lineOf(text, m.index);
      const src = lines[line - 1] ?? '';
      // Buang komentar: JSDoc dan `//` bukan kode dan tidak punya default.
      if (/^\s*(\*|\/\/|\/\*)/.test(src)) continue;
      if (form.requireLine && !form.requireLine.test(src)) continue;
      if (!seen.has(name)) seen.set(name, new Map());
      const byValue = seen.get(name);
      if (!byValue.has(value)) byValue.set(value, []);
      byValue.get(value).push(line);
    }
  }

  for (const [name, byValue] of seen) {
    if (byValue.size < 2) continue;
    findings.push({
      rel,
      name,
      variants: [...byValue.entries()].map(([value, ls]) => ({value, lines: ls})),
      snippets: [...byValue.values()].flat().map((l) => `${l}: ${(lines[l - 1] ?? '').trim()}`),
    });
  }
}

console.log('='.repeat(78));
console.log('G-23 — DEFAULT YANG BERTENTANGAN');
console.log(`Berkas dipindai: ${files.length}`);
console.log('='.repeat(78));

if (!findings.length) {
  console.log('\nTidak ada opsi yang diberi default berbeda di berkas yang sama.');
} else {
  for (const f of findings) {
    console.log(`\n${f.rel}`);
    console.log(`  opsi "${f.name}" diberi ${f.variants.length} default berbeda:`);
    for (const v of f.variants) console.log(`     ${v.value.padEnd(7)} di baris ${v.lines.join(', ')}`);
    for (const s of f.snippets.slice(0, 6)) console.log(`     | ${s.slice(0, 96)}`);
  }
  console.log(`\nTotal: ${findings.length} opsi.`);
}
console.log('\nTRIASE: mana yang fail-open? Apakah opsinya menyentuh masukan runtime');
console.log('(respons, cookie, header, URL) atau hanya nilai build-time?');

// VALIDASI-DIRI. Pemindai ini lahir dari satu contoh yang sudah diketahui;
// kalau ia tidak lagi menemukannya, regexnya rusak dan seluruh keluarannya
// tidak boleh dipercaya.
const jangkar = findings.find(
  (f) => f.rel.endsWith('service-worker/worker/src/data.ts') && f.name === 'cacheOpaqueResponses',
);
console.log('\n' + '='.repeat(78));
if (jangkar) {
  console.log('VALIDASI-DIRI: ok — contoh jangkar (cacheOpaqueResponses di data.ts)');
  console.log('ditemukan kembali oleh pemindai.');
} else {
  console.log('VALIDASI-DIRI GAGAL: contoh jangkar TIDAK ditemukan. Jangan percayai');
  console.log('keluaran di atas sebelum regexnya diperbaiki.');
}
console.log('='.repeat(78));
process.exit(jangkar ? 0 : 1);
