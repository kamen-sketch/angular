/**
 * G-24 — "konfigurasi lebih sempit daripada perilaku".
 *
 * Kelas cacat: sebuah tipe konfigurasi PUBLIK menyempitkan tipe internal dengan
 * `Pick<T, 'a' | 'b'>`, TETAPI implementasinya membangun nilai bertipe `T`
 * penuh dan mengisi properti DI LUAR daftar itu. Akibatnya framework menentukan
 * perilaku yang aplikasi tidak punya cara sah untuk mengubahnya.
 *
 * Kenapa kelas ini bernilai: seperti G-22 dan G-23, ia tidak menebak niat. Dua
 * pernyataan penulis sendiri saling bertentangan — "kamu boleh mengatur a dan b"
 * versus kode yang diam-diam juga mengatur c.
 *
 * Ini adalah generalisasi langsung dari cacat terkuat yang ditemukan sejauh ini:
 *   config/src/generator.ts:203-210   ignoreVary: true di-hardcode
 *   config/src/in.ts:44,64            Pick<CacheQueryOptions, 'ignoreSearch'>
 * Server yang mengirim `Vary: Authorization` karena itu tidak terlindungi, dan
 * aplikasi tidak dapat menyalakannya kembali.
 *
 * Jalankan: node analysis/regex-corpus/scan-narrow-config.mjs
 */
import {readFileSync, readdirSync, statSync} from 'fs';
import {join, relative} from 'path';

const ROOT = process.cwd();
const SKIP = /[._]spec\.ts$|\/test\/|\/testing\/|node_modules/;

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

/** Mengambil badan `{...}` yang dimulai pada `start`, dengan pencocokan kurung. */
function braceBlock(text, start) {
  let depth = 0;
  for (let i = start; i < text.length && i < start + 4000; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

/** Kunci literal tingkat atas di dalam sebuah badan objek. */
function topLevelKeys(block) {
  const keys = [];
  let depth = 0;
  const lines = block.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (depth === 1) {
      const m = trimmed.match(/^([A-Za-z_$][\w$]*)\s*:/);
      if (m) keys.push(m[1]);
    }
    for (const ch of line) {
      if (ch === '{' || ch === '[' || ch === '(') depth++;
      else if (ch === '}' || ch === ']' || ch === ')') depth--;
    }
  }
  return keys;
}

const files = collect(join(ROOT, 'packages'));

// Langkah 1: kumpulkan setiap Pick<T, ...> beserta daftar kunci yang diizinkan.
const picks = new Map(); // T -> {allowed:Set, sites:[{rel,line,raw}]}
const RE_PICK = /Pick<\s*([A-Za-z_$][\w$]*)\s*,\s*([^>]+)>/g;

const texts = new Map();
for (const f of files) {
  let t;
  try {
    t = readFileSync(f, 'utf8');
  } catch {
    continue;
  }
  texts.set(f, t);
  RE_PICK.lastIndex = 0;
  let m;
  while ((m = RE_PICK.exec(t))) {
    const type = m[1];
    const allowed = [...m[2].matchAll(/'([^']+)'|"([^"]+)"/g)].map((x) => x[1] ?? x[2]);
    if (!allowed.length) continue;
    if (!picks.has(type)) picks.set(type, {allowed: new Set(), sites: []});
    const entry = picks.get(type);
    for (const a of allowed) entry.allowed.add(a);
    entry.sites.push({rel: relative(ROOT, f), line: lineOf(t, m.index), raw: m[0]});
  }
}

// Langkah 2: cari pembangunan nilai bertipe T PENUH, dan kunci yang diisinya.
const findings = [];
for (const [type, {allowed, sites}] of picks) {
  const reBuild = new RegExp(
    // `): T {`  (fungsi mengembalikan T)   atau   `: T = {`  (konstanta bertipe T)
    `\\)\\s*:\\s*${type}\\s*\\{|:\\s*${type}\\s*=\\s*\\{`,
    'g',
  );
  for (const [f, t] of texts) {
    if (!t.includes(type)) continue;
    reBuild.lastIndex = 0;
    let m;
    while ((m = reBuild.exec(t))) {
      // Badan objek yang dikembalikan: cari `return {` atau `= {` sesudahnya.
      const after = t.slice(m.index, m.index + 1500);
      const rel = relative(ROOT, f);
      const objStart = m[0].includes('=')
        ? m.index + m[0].lastIndexOf('{')
        : (() => {
            const r = after.search(/return\s*\{/);
            return r === -1 ? -1 : m.index + r + after.slice(r).indexOf('{');
          })();
      if (objStart === -1) continue;
      const block = braceBlock(t, objStart);
      if (!block) continue;
      const keys = topLevelKeys(block);
      const extra = keys.filter((k) => !allowed.has(k) && !k.startsWith('...'));
      if (!extra.length) continue;
      findings.push({
        type,
        rel,
        line: lineOf(t, m.index),
        allowed: [...allowed],
        set: keys,
        extra,
        pickSites: sites,
        block: block.split('\n').slice(0, 8).join('\n'),
      });
    }
  }
}

console.log('='.repeat(78));
console.log('G-24 — KONFIGURASI LEBIH SEMPIT DARIPADA PERILAKU');
console.log(`Berkas dipindai: ${files.length}   tipe dengan Pick<>: ${picks.size}`);
console.log('='.repeat(78));

if (!findings.length) {
  console.log('\nTidak ada tipe yang di-Pick untuk konfigurasi publik sekaligus dibangun');
  console.log('dengan properti di luar daftar Pick-nya.');
} else {
  for (const f of findings) {
    console.log(`\n${f.rel}:${f.line}   membangun ${f.type} penuh`);
    console.log(`  konfigurasi publik hanya mengizinkan : ${f.allowed.join(', ')}`);
    console.log(`  tetapi implementasinya mengisi juga  : ${f.extra.join(', ')}   <-- tidak dapat dipilih aplikasi`);
    for (const s of f.pickSites.slice(0, 3)) {
      console.log(`  Pick di ${s.rel}:${s.line}  ${s.raw}`);
    }
    for (const l of f.block.split('\n')) console.log(`     | ${l.slice(0, 92)}`);
  }
  console.log(`\nTotal: ${findings.length} lokasi.`);
}

console.log('\nTRIASE: apakah properti yang tidak dapat dipilih itu menonaktifkan');
console.log('mekanisme keamanan yang dinyatakan pihak lain (server, peramban,');
console.log('spesifikasi)? Kalau ya, aplikasi tidak punya jalan keluar yang sah.');

// VALIDASI-DIRI terhadap cacat yang sudah diketahui.
const anchor = findings.find(
  (f) => f.type === 'CacheQueryOptions' && f.extra.includes('ignoreVary'),
);
console.log('\n' + '='.repeat(78));
if (anchor) {
  console.log('VALIDASI-DIRI: ok — pemindai menemukan kembali kasus jangkar');
  console.log('(ignoreVary di buildCacheQueryOptions).');
} else {
  console.log('VALIDASI-DIRI GAGAL: kasus jangkar tidak ditemukan. Jangan percayai');
  console.log('keluaran di atas sebelum regexnya diperbaiki.');
}
console.log('='.repeat(78));
process.exit(anchor ? 0 : 1);
