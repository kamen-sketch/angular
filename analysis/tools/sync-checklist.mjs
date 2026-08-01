/**
 * Sinkronisasi checklist analisis.
 *
 * Sumber kebenaran = catatan per-subsistem di `analysis/subsystems/*.txt`.
 * Setiap baris catatan yang berbentuk:
 *
 *   [x] namaFungsi | path/ke/file.ts:123 | penjelasan singkat
 *
 * akan:
 *   1. mencentang entri yang sesuai di `analysis/functions/<area>.txt`  ([ ] -> [x])
 *   2. ditulis ulang ke `analysis/CHECKED-FUNCTIONS.txt` (log seluruh fungsi tercentang)
 *   3. dihitung ulang di `analysis/PROGRESS.txt`
 *
 * Jalankan:  node analysis/tools/sync-checklist.mjs
 */
import {readdirSync, readFileSync, writeFileSync, existsSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ANALYSIS = join(ROOT, 'analysis');
const SUBSYS = join(ANALYSIS, 'subsystems');
const FUNCS = join(ANALYSIS, 'functions');

const ENTRY = /^\[x\]\s+([^|]+?)\s*\|\s*([^|]+?):(\d+)\s*\|\s*(.*)$/;

// 1. kumpulkan catatan ----------------------------------------------------
const entries = [];
const seen = new Set();
const noteFiles = existsSync(SUBSYS) ? readdirSync(SUBSYS).filter((f) => f.endsWith('.txt')).sort() : [];
for (const nf of noteFiles) {
  const subsystem = nf.replace(/\.txt$/, '');
  for (const line of readFileSync(join(SUBSYS, nf), 'utf8').split('\n')) {
    const m = line.match(ENTRY);
    if (!m) continue;
    const [, name, file, lineNo, note] = m;
    const key = `${file}:${lineNo}:${name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({subsystem, name, file, line: Number(lineNo), note});
  }
}

// 2. centang inventory ----------------------------------------------------
const areaOf = (file) => {
  const seg = file.split('/');
  if (seg[0] === 'packages') return seg[1];
  if (seg[0] === 'adev') return 'adev';
  return seg[0];
};
const byArea = new Map();
for (const e of entries) {
  const area = areaOf(e.file);
  if (!byArea.has(area)) byArea.set(area, []);
  byArea.get(area).push(e);
}

let checkedInInventory = 0;
const unmatched = [];
const totals = new Map();
for (const invFile of readdirSync(FUNCS).filter((f) => f.endsWith('.txt'))) {
  const area = invFile.replace(/\.txt$/, '');
  const lines = readFileSync(join(FUNCS, invFile), 'utf8').split('\n');
  const wanted = new Map();
  for (const e of byArea.get(area) ?? []) wanted.set(`${e.file}|${e.name}|${e.line}`, e);

  let currentFile = '';
  let total = 0;
  let done = 0;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith('## ')) {
      currentFile = l.slice(3).trim();
      continue;
    }
    const m = l.match(/^\[( |x)\]\s+(\S+)\s+\((.*?)\)\s+:(\d+)$/);
    if (!m) continue;
    total++;
    const key = `${currentFile}|${m[2]}|${m[4]}`;
    if (wanted.has(key)) {
      lines[i] = `[x]${l.slice(3)}`;
      wanted.delete(key);
      checkedInInventory++;
      done++;
    } else if (m[1] === 'x') {
      done++;
    }
  }
  for (const e of wanted.values()) unmatched.push(e);
  totals.set(area, {total, done});
  writeFileSync(join(FUNCS, invFile), lines.join('\n'));
}

// 3. tulis log CHECKED-FUNCTIONS.txt --------------------------------------
const log = [
  'DAFTAR FUNGSI YANG SUDAH DIANALISIS',
  'Dihasilkan otomatis oleh analysis/tools/sync-checklist.mjs -- jangan diedit manual.',
  'Sumber: analysis/subsystems/*.txt',
  `Total fungsi tercentang: ${entries.length}`,
  '='.repeat(78),
];
let lastSub = '';
for (const e of entries.sort((a, b) => a.subsystem.localeCompare(b.subsystem) || a.file.localeCompare(b.file) || a.line - b.line)) {
  if (e.subsystem !== lastSub) {
    lastSub = e.subsystem;
    log.push('', `### ${lastSub}`);
  }
  log.push(`[x] ${e.name}  --  ${e.file}:${e.line}`);
  if (e.note) log.push(`      ${e.note}`);
}
writeFileSync(join(ANALYSIS, 'CHECKED-FUNCTIONS.txt'), log.join('\n') + '\n');

// 4. progres --------------------------------------------------------------
let gTotal = 0;
let gDone = 0;
const rows = [...totals].sort((a, b) => b[1].total - a[1].total).map(([area, {total, done}]) => {
  gTotal += total;
  gDone += done;
  const pct = total ? ((done / total) * 100).toFixed(1) : '0.0';
  const bar = '#'.repeat(Math.round((done / (total || 1)) * 20)).padEnd(20, '.');
  return `${area.padEnd(26)} ${String(done).padStart(5)}/${String(total).padEnd(6)} ${bar} ${pct.padStart(5)}%`;
});
writeFileSync(
  join(ANALYSIS, 'PROGRESS.txt'),
  [
    'PROGRES ANALISIS FUNGSI',
    `Diperbarui: ${new Date().toISOString().slice(0, 10)}`,
    '='.repeat(78),
    ...rows,
    '-'.repeat(78),
    `${'TOTAL'.padEnd(26)} ${String(gDone).padStart(5)}/${String(gTotal).padEnd(6)} ${((gDone / gTotal) * 100).toFixed(2)}%`,
    '',
    `Catatan subsistem: ${noteFiles.length} berkas di analysis/subsystems/`,
    '',
    'Entri catatan yang tidak punya padanan di inventory otomatis',
    '(umumnya konstanta multi-baris yang tidak terdeteksi pemindai):',
    ...(unmatched.length ? unmatched.map((u) => `  - ${u.name} (${u.file}:${u.line})`) : ['  - tidak ada']),
  ].join('\n') + '\n',
);

console.log(`entri catatan   : ${entries.length}`);
console.log(`tercentang baru : ${checkedInInventory}`);
console.log(`tidak cocok     : ${unmatched.length}`);
for (const u of unmatched.slice(0, 40)) console.log(`  ! ${u.name} ${u.file}:${u.line}`);
console.log(`progres global  : ${gDone}/${gTotal}`);
