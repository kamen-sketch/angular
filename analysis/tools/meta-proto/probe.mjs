/**
 * F-17 — `Meta` service: pembacaan lewat rantai prototipe pada objek biasa.
 *
 * BERKAS  packages/platform-browser/src/browser/meta.ts
 *
 *     const META_KEYS_MAP: {[prop: string]: string} = {httpEquiv: 'http-equiv'};   // :209
 *     function getMetaKeyMap(prop: string): string {
 *       return META_KEYS_MAP[prop] || prop;                                        // :199
 *     }
 *
 * `META_KEYS_MAP` adalah objek literal biasa, sehingga ia MEWARISI seluruh
 * anggota `Object.prototype`. Untuk `prop` seperti `toString`, `constructor`,
 * atau `valueOf`, `META_KEYS_MAP[prop]` mengembalikan FUNGSI bawaan — truthy —
 * sehingga `|| prop` tidak pernah tercapai, dan fungsi itu diteruskan sebagai
 * NAMA ATRIBUT ke `el.setAttribute(...)`.
 *
 * Kelas yang sama dengan F-06 (i18n_parse.ts:841), di lokasi baru.
 *
 * Dipakai di dua tempat:
 *     :180  setMetaElementAttributes -> el.setAttribute(getMetaKeyMap(prop), ...)
 *     :195  containsAttributes       -> elem.getAttribute(getMetaKeyMap(key))
 *
 * Yang menarik: berkas yang SAMA sudah menunjukkan penulisnya sadar soal
 * masukan bermusuhan — `escapeSelectorValue` (:188-192) ditambahkan khusus
 * untuk mencegah injeksi selektor CSS. Kesadaran itu tidak sampai ke
 * `getMetaKeyMap`.
 *
 * Jalankan: node analysis/tools/meta-proto/probe.mjs <path-node_modules> [--shot x.png]
 */
import {createServer} from 'http';
import {readFileSync, existsSync, globSync} from 'fs';
import {join, extname} from 'path';
import {createRequire} from 'module';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node probe.mjs <path-ke-node_modules> [--shot out.png]');
  process.exit(2);
}
const iShot = process.argv.indexOf('--shot');
const shot = iShot > 0 ? process.argv[iShot + 1] : null;
const {chromium} = createRequire(join(nm, 'x.js'))('playwright');
const pkg = JSON.parse(
  readFileSync(join(nm, '@angular/platform-browser/package.json'), 'utf8'),
);

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
    '@angular/platform-browser': '/pkg/@angular/platform-browser/fesm2022/platform-browser.mjs',
    tslib: '/pkg/tslib/tslib.es6.mjs',
    rxjs: '/pkg/rxjs/dist/esm/index.js',
    'rxjs/operators': '/pkg/rxjs/dist/esm/operators/index.js',
  },
});

const PAGE = `<!doctype html><meta charset="utf-8">
<title>Meta service: pembacaan rantai prototipe</title>
<script type="importmap">${IMPORTMAP}</script>
<style>
 body{font:13.5px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;margin:22px;max-width:940px}
 h1{font-size:17px;margin:0 0 2px} .sub{color:#555;margin:0 0 14px}
 table{border-collapse:collapse;width:100%;margin-top:8px}
 td,th{border:1px solid #bbb;padding:5px 9px;text-align:left;vertical-align:top}
 th{background:#f4f4f4} .bad{background:#ffe1e1}.ok{background:#e8f6e8}
 code{background:#f2f2f2;padding:1px 4px}
</style>
<h1>Angular <code>Meta</code> service — kunci warisan <code>Object.prototype</code></h1>
<p class="sub"><code>META_KEYS_MAP[prop] || prop</code> pada objek literal biasa.</p>
<div id="out"></div>
<script type="module">
import '@angular/compiler';
const core = await import('@angular/core');
const pb = await import('@angular/platform-browser');
const {Meta} = pb;
const {Injector, DOCUMENT} = core;

// Meta memakai getDOM(), yang null sampai adapter DOM dipasang. Normalnya itu
// terjadi saat bootstrap platform. Jalan pertama harness ini melewatkannya,
// sehingga SEMUA baris gagal dengan "Cannot read properties of null" -- kegagalan
// harness yang menyamar sebagai temuan. Dipasang eksplisit di sini.
// (Tanpa backtick: teks ini berada di dalam template literal induk.)
pb['\u0275BrowserDomAdapter'].makeCurrent();

const injector = Injector.create({providers: [
  {provide: DOCUMENT, useValue: document},
  {provide: Meta, useClass: Meta, deps: []},
]});
const meta = injector.get(Meta);

// Reproduksi getMetaKeyMap apa adanya, untuk menampilkan APA yang dikembalikan.
const META_KEYS_MAP = {httpEquiv: 'http-equiv'};
const getMetaKeyMap = (prop) => META_KEYS_MAP[prop] || prop;

const CASES = [
  ['name',         'kunci lazim',                    false],
  ['httpEquiv',    'kunci yang MEMANG dipetakan',    false],
  ['property',     'kunci lazim',                    false],
  ['sesuatuAsing', 'kunci tak dikenal -> fallback',  false],
  ['toString',     'WARISAN Object.prototype',       true],
  ['constructor',  'WARISAN Object.prototype',       true],
  ['valueOf',      'WARISAN Object.prototype',       true],
  ['__proto__',    'WARISAN Object.prototype',       true],
];

const rows = [];
for (const [key, note, inherited] of CASES) {
  const mapped = getMetaKeyMap(key);
  const mappedDesc = typeof mapped === 'string' ? JSON.stringify(mapped) : typeof mapped;
  let outcome;
  try {
    const el = meta.addTag({[key]: 'nilai-uji'}, true);
    outcome = el ? 'ok — atribut disetel' : 'null';
  } catch (e) {
    outcome = 'LEMPAR — ' + e.name + ': ' + String(e.message).slice(0, 70);
  }
  rows.push({key, note, inherited, mapped: mappedDesc, outcome, threw: outcome.startsWith('LEMPAR')});
}
window.__rows = rows;

const esc = (s) => String(s).replace(/[&<>]/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
document.getElementById('out').innerHTML =
  '<table><tr><th>kunci di MetaDefinition</th><th>getMetaKeyMap mengembalikan</th>' +
  '<th>meta.addTag(...)</th><th>catatan</th></tr>' +
  rows.map((r) =>
    '<tr class="' + (r.threw ? 'bad' : 'ok') + '">' +
    '<td><code>' + esc(r.key) + '</code></td>' +
    '<td><code>' + esc(r.mapped) + '</code></td>' +
    '<td>' + esc(r.outcome) + '</td>' +
    '<td>' + esc(r.note) + '</td></tr>').join('') +
  '</table>' +
  '<p class="ok" style="padding:8px">Baris hijau <code>sesuatuAsing</code> adalah kontrol negatif: ' +
  'kunci tak dikenal yang BUKAN warisan tetap jatuh ke fallback dan bekerja normal. ' +
  'Jadi pemicunya spesifik pada anggota <code>Object.prototype</code>, bukan pada "kunci aneh" apa pun.</p>';
</script>`;

const MIME = {'.mjs': 'text/javascript', '.js': 'text/javascript', '.map': 'application/json'};
const srv = createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname.startsWith('/pkg/')) {
    const base = join(nm, u.pathname.slice(5));
    const f = [base, base + '.js', base + '.mjs', join(base, 'index.js')].find(
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
  res.end(PAGE);
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const port = srv.address().port;

const CHROME = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');
const browser = await chromium.launch(CHROME.length ? {executablePath: CHROME[0]} : {});
const page = await browser.newPage();
page.on('pageerror', (e) => console.error('  [pageerror]', e.message));
await page.goto(`http://127.0.0.1:${port}/`, {waitUntil: 'load'});
await page.waitForFunction(() => window.__rows !== undefined, null, {timeout: 20000});
const rows = await page.evaluate(() => window.__rows);

const line = '='.repeat(78);
console.log(line);
console.log(`F-17 — Meta service, @angular/platform-browser@${pkg.version} (artefak npm)`);
console.log(line);
console.log('\n  ' + 'kunci'.padEnd(16) + 'getMetaKeyMap ->'.padEnd(20) + 'meta.addTag(...)');
for (const r of rows) {
  console.log(
    `  ${r.threw ? '>>' : '  '}` +
      r.key.padEnd(14) +
      r.mapped.padEnd(20) +
      r.outcome,
  );
}

if (shot) {
  await page.screenshot({path: shot, fullPage: true});
  console.log(`\nTangkapan layar: ${shot}`);
}

const inheritedRows = rows.filter((r) => r.inherited);
const normalRows = rows.filter((r) => !r.inherited);
const allInheritedThrew = inheritedRows.length > 0 && inheritedRows.every((r) => r.threw);
const noNormalThrew = normalRows.every((r) => !r.threw);

console.log('\n' + line);
console.log(
  `Kunci warisan yang gagal: ${inheritedRows.filter((r) => r.threw).length}/${inheritedRows.length}   ` +
    `kunci normal yang gagal: ${normalRows.filter((r) => r.threw).length}/${normalRows.length}`,
);
if (allInheritedThrew && noNormalThrew) {
  console.log('TERKONFIRMASI. Kontrol negatif ("sesuatuAsing") membuktikan fallback');
  console.log('`|| prop` bekerja normal untuk kunci tak dikenal — jadi pemicunya');
  console.log('spesifik pada anggota Object.prototype, bukan pada kunci aneh apa pun.');
  console.log('');
  console.log('Perbaikan: META_KEYS_MAP = Object.assign(Object.create(null), {...})');
  console.log('atau `Object.hasOwn(META_KEYS_MAP, prop) ? META_KEYS_MAP[prop] : prop`.');
} else {
  console.log('Tidak terkonfirmasi.');
}
console.log(line);

await browser.close();
srv.close();
process.exit(allInheritedThrew && noNormalThrew ? 0 : 1);
