/**
 * F-11 — bukti di peramban sungguhan (Chromium).
 *
 * Kelemahan yang ditutup langkah ini: harness Node memberi string buatan tangan
 * ke codec. Di sini masukannya datang dari NAVIGASI ASLI — Chromium yang
 * menentukan isi `location.pathname` / `location.hash`, bukan saya. Kalau
 * peramban ternyata menormalkan `%zz`, hipotesisnya gugur di sini.
 *
 * Bundel yang dimuat adalah fesm2022/upgrade.mjs dari npm, disajikan apa adanya.
 *
 * Jalankan:
 *   node analysis/tools/upgrade-decode/browser-proof.mjs <path-node_modules> [--shot berkas.png]
 */
import {createServer} from 'http';
import {readFileSync, existsSync, globSync} from 'fs';
import {join, extname} from 'path';
import {createRequire} from 'module';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node browser-proof.mjs <path-ke-node_modules> [--shot out.png]');
  process.exit(2);
}
const iShot = process.argv.indexOf('--shot');
const shot = iShot > 0 ? process.argv[iShot + 1] : null;

const require_ = createRequire(join(nm, 'x.js'));
const {chromium} = require_('playwright');

const MIME = {
  '.mjs': 'text/javascript',
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.map': 'application/json',
};

// Bundel fesm npm memakai specifier bare (@angular/core, rxjs, tslib). Peramban
// tidak punya resolusi ala Node, jadi kita petakan lewat import map dan
// server melakukan penyelesaian ekstensi/index untuk impor internal rxjs.
const IMPORTMAP = JSON.stringify({
  imports: {
    '@angular/core': '/pkg/@angular/core/fesm2022/core.mjs',
    '@angular/core/primitives/signals': '/pkg/@angular/core/fesm2022/primitives-signals.mjs',
    '@angular/core/primitives/di': '/pkg/@angular/core/fesm2022/primitives-di.mjs',
    '@angular/core/primitives/event-dispatch':
      '/pkg/@angular/core/fesm2022/primitives-event-dispatch.mjs',
    '@angular/common': '/pkg/@angular/common/fesm2022/common.mjs',
    '@angular/common/http': '/pkg/@angular/common/fesm2022/http.mjs',
    '@angular/compiler': '/pkg/@angular/compiler/fesm2022/compiler.mjs',
    '@angular/upgrade/static': '/pkg/@angular/upgrade/fesm2022/static.mjs',
    '@angular/platform-browser': '/pkg/@angular/platform-browser/fesm2022/platform-browser.mjs',
    tslib: '/pkg/tslib/tslib.es6.mjs',
    rxjs: '/pkg/rxjs/dist/esm/index.js',
    'rxjs/operators': '/pkg/rxjs/dist/esm/operators/index.js',
  },
});

const HALAMAN = `<!doctype html><meta charset="utf-8">
<title>F-11 — AngularJSUrlCodec vs location peramban</title>
<script type="importmap">${IMPORTMAP}</script>
<style>
 body{font:14px/1.5 ui-monospace,monospace;margin:24px;max-width:900px}
 h1{font-size:18px} table{border-collapse:collapse;width:100%;margin-top:8px}
 td,th{border:1px solid #bbb;padding:5px 8px;text-align:left;vertical-align:top}
 .bad{background:#ffe1e1}.good{background:#e6f7e6}
 code{background:#f2f2f2;padding:1px 3px}
</style>
<h1>F-11 — <code>AngularJSUrlCodec</code> pada URL yang benar-benar dinavigasi Chromium</h1>
<p id="loc"></p>
<table id="t"><tr><th>pemanggilan</th><th>penjaga di sumber</th><th>hasil</th></tr></table>
<script type="module">
// Bundel npm dikompilasi parsial; kompiler JIT harus ada sebelum modul yang
// menarik PlatformLocation dimuat.
import '@angular/compiler';
const {AngularJSUrlCodec} = await import('/pkg/@angular/common/fesm2022/upgrade.mjs');
const c = new AngularJSUrlCodec();
document.getElementById('loc').innerHTML =
  'Nilai dari peramban, bukan dari skrip uji:<br>' +
  '<code>location.pathname</code> = <b>' + JSON.stringify(location.pathname) + '</b><br>' +
  '<code>location.search</code>&nbsp;&nbsp; = <b>' + JSON.stringify(location.search) + '</b><br>' +
  '<code>location.hash</code>&nbsp;&nbsp;&nbsp;&nbsp; = <b>' + JSON.stringify(location.hash) + '</b>';

const uji = [
  ['decodeSearch(location.search)', 'tryDecodeURIComponent (ADA)', () => c.decodeSearch(location.search.replace(/^\\?/, ''))],
  ['decodePath(location.pathname)', 'decodeURIComponent mentah', () => c.decodePath(location.pathname)],
  ['decodeHash(location.hash)', 'decodeURIComponent mentah', () => c.decodeHash(location.hash)],
];
const hasil = [];
const t = document.getElementById('t');
for (const [label, penjaga, fn] of uji) {
  let teks, kelas;
  try { teks = 'OK — ' + JSON.stringify(fn()); kelas = 'good'; }
  catch (e) { teks = 'LEMPAR — ' + e.name + ': ' + e.message; kelas = 'bad'; }
  hasil.push({label, penjaga, teks});
  const tr = document.createElement('tr');
  tr.className = kelas;
  for (const s of [label, penjaga, teks]) {
    const td = document.createElement('td'); td.textContent = s; tr.appendChild(td);
  }
  t.appendChild(tr);
}
window.__hasil = {loc: {pathname: location.pathname, search: location.search, hash: location.hash}, hasil};
</script>`;

const srv = createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname.startsWith('/pkg/')) {
    const dasar = join(nm, u.pathname.slice(5));
    // Impor internal rxjs tanpa ekstensi -> tiru resolusi Node.
    const f = [dasar, dasar + '.js', dasar + '.mjs', join(dasar, 'index.js')].find(
      (p) => existsSync(p) && !p.endsWith('/'),
    );
    if (f) {
      res.writeHead(200, {'content-type': MIME[extname(f)] ?? 'text/javascript'});
      res.end(readFileSync(f));
      return;
    }
    res.writeHead(404).end('404 ' + u.pathname);
    return;
  }
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
  res.end(HALAMAN);
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const port = srv.address().port;

// Cari biner Chromium yang benar-benar terpasang (nama direktori memuat revisi).
const CANDIDAT = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');
const browser = await chromium.launch(
  CANDIDAT.length ? {executablePath: CANDIDAT[0]} : {},
);
const page = await browser.newPage();
// Kalau modul gagal dimuat, kita harus TAHU, bukan menebak dari hasil kosong.
page.on('pageerror', (e) => console.error('  [pageerror]', e.message));
page.on('console', (m) => {
  if (m.type() === 'error') console.error('  [console.error]', m.text());
});
page.on('requestfailed', (r) => console.error('  [gagal muat]', r.url()));

const target = `http://127.0.0.1:${port}/a%zz?q=%zz#%zz`;
console.log('='.repeat(78));
console.log('F-11 — bukti Chromium');
console.log('='.repeat(78));
console.log(`\nNavigasi ke: ${target}\n`);

await page.goto(target, {waitUntil: 'load'});
// Skrip modul memakai top-level await, jadi ia selesai SETELAH event `load`.
// Tunggu hasilnya, jangan asumsikan sudah ada.
await page.waitForFunction(() => window.__hasil !== undefined, null, {timeout: 20000});
const out = await page.evaluate(() => window.__hasil);

console.log('Yang DIBERIKAN peramban (bukan string buatan harness):');
console.log(`  location.pathname = ${JSON.stringify(out.loc.pathname)}`);
console.log(`  location.search   = ${JSON.stringify(out.loc.search)}`);
console.log(`  location.hash     = ${JSON.stringify(out.loc.hash)}`);
console.log('\nHasil pemanggilan codec npm asli di dalam Chromium:');
for (const h of out.hasil) {
  console.log(`  ${h.label.padEnd(31)} [${h.penjaga.padEnd(27)}] ${h.teks}`);
}

if (shot) {
  await page.screenshot({path: shot, fullPage: true});
  console.log(`\nTangkapan layar: ${shot}`);
}

const lempar = out.hasil.filter((h) => h.teks.startsWith('LEMPAR')).length;
console.log('\n' + '='.repeat(78));
console.log(`Melempar: ${lempar}/3. Chromium MEMPERTAHANKAN "%zz" apa adanya di`);
console.log('pathname dan hash, jadi masukannya nyata, bukan sintetis.');
console.log('='.repeat(78));

await browser.close();
srv.close();
process.exit(lempar === 2 ? 0 : 1);
