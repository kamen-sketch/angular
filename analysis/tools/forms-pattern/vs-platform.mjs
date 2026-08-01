/**
 * F-14 langkah 2 — pembanding platform.
 *
 * Pertanyaan yang menentukan: apa yang "seharusnya" dilakukan `pattern`?
 * Jawabannya tidak perlu ditebak. HTML Standard mendefinisikan atribut
 * `pattern` pada `<input>` dikompilasi dengan cara yang setara dengan
 * membungkus polanya: "^(?:" + pattern + ")$".
 *
 *   https://html.spec.whatwg.org/multipage/input.html#the-pattern-attribute
 *
 * Angular menyediakan `Validators.pattern` DAN direktif `[pattern]`
 * (forms/src/directives/validators.ts:695 -> patternValidator yang sama), dan
 * dokumentasinya sendiri menyandingkan keduanya dengan `<input pattern="...">`.
 * Jadi peramban adalah acuan yang sah, bukan selera saya.
 *
 * Harness ini menjalankan pola yang SAMA lewat dua jalur di dalam Chromium:
 *   - validasi bawaan peramban  : input.checkValidity() / patternMismatch
 *   - Validators.pattern Angular: dari bundel npm yang dikirim
 * lalu melaporkan setiap ketidaksepakatan.
 *
 * Jalankan: node analysis/tools/forms-pattern/vs-platform.mjs <path-node_modules> [--shot x.png]
 */
import {createServer} from 'http';
import {readFileSync, existsSync, globSync} from 'fs';
import {join, extname} from 'path';
import {createRequire} from 'module';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node vs-platform.mjs <path-ke-node_modules> [--shot out.png]');
  process.exit(2);
}
const iShot = process.argv.indexOf('--shot');
const shot = iShot > 0 ? process.argv[iShot + 1] : null;
const {chromium} = createRequire(join(nm, 'x.js'))('playwright');
const pkg = JSON.parse(readFileSync(join(nm, '@angular/forms/package.json'), 'utf8'));

const CASES = [
  ['cat|dog', ['cat', 'dog', 'bulldog', 'catastrophe', 'a-very-evil-dog', 'lizard']],
  // Alternatif di TENGAH tidak menyentuh `^` maupun `$` sama sekali, sehingga
  // ia cocok sebagai substring di mana pun. Ini bentuk terburuknya.
  ['admin|user|guest', ['admin', 'guest', 'abuserx', 'no-user-here-really', 'superadmin']],
  ['read|write|delete', ['read', 'can-write-anything', 'x-delete']],
  ['jpg|png|gif', ['jpg', 'png', 'evil.svg.gif', 'jpg.exe']],
  ['[0-9]+\\$', ['12$', '12$ dan lain-lain']],
  ['(cat|dog)', ['bulldog', 'cat']],
  ['[a-z]+', ['abc', 'abc1']],
];

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
    '@angular/forms': '/pkg/@angular/forms/fesm2022/forms.mjs',
    '@angular/platform-browser': '/pkg/@angular/platform-browser/fesm2022/platform-browser.mjs',
    tslib: '/pkg/tslib/tslib.es6.mjs',
    rxjs: '/pkg/rxjs/dist/esm/index.js',
    'rxjs/operators': '/pkg/rxjs/dist/esm/operators/index.js',
  },
});

const PAGE = `<!doctype html><meta charset="utf-8">
<title>Validators.pattern Angular vs atribut pattern bawaan peramban</title>
<script type="importmap">${IMPORTMAP}</script>
<style>
 body{font:13.5px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;margin:22px;max-width:960px}
 h1{font-size:17px;margin:0 0 2px}
 .sub{color:#555;margin:0 0 14px}
 table{border-collapse:collapse;width:100%;margin-top:8px}
 td,th{border:1px solid #bbb;padding:5px 9px;text-align:left}
 th{background:#f4f4f4}
 .bad{background:#ffe1e1}.ok{background:#e8f6e8}
 code{background:#f2f2f2;padding:1px 4px}
</style>
<h1>Angular <code>Validators.pattern</code> vs atribut <code>pattern</code> bawaan peramban</h1>
<p class="sub">Pola yang sama, nilai yang sama, dua penilai. HTML Standard mengompilasi
<code>pattern</code> sebagai <code>^(?:…)$</code>.</p>
<div id="out"></div>
<script type="module">
import '@angular/compiler';
const {Validators, FormControl} = await import('@angular/forms');

const CASES = ${JSON.stringify(CASES)};

function browserAccepts(pattern, value) {
  const input = document.createElement('input');
  input.type = 'text';
  input.setAttribute('pattern', pattern);
  input.value = value;
  document.body.appendChild(input);
  const ok = !input.validity.patternMismatch;
  input.remove();
  return ok;
}

const angularAccepts = (pattern, value) =>
  Validators.pattern(pattern)(new FormControl(value)) === null;

const rows = [];
for (const [pattern, values] of CASES) {
  for (const value of values) {
    const browser = browserAccepts(pattern, value);
    const angular = angularAccepts(pattern, value);
    rows.push({pattern, value, browser, angular, disagree: browser !== angular});
  }
}
window.__rows = rows;

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
document.getElementById('out').innerHTML =
  '<table><tr><th>pattern</th><th>value</th><th>&lt;input pattern&gt; peramban</th>' +
  '<th>Validators.pattern Angular</th></tr>' +
  rows.map((r) =>
    '<tr class="' + (r.disagree ? 'bad' : 'ok') + '">' +
    '<td><code>' + esc(r.pattern) + '</code></td>' +
    '<td><code>' + esc(r.value) + '</code></td>' +
    '<td>' + (r.browser ? 'valid' : 'ditolak') + '</td>' +
    '<td>' + (r.angular ? 'valid' : 'ditolak') + '</td></tr>').join('') +
  '</table>' +
  '<p class="bad" style="padding:8px">Baris merah: peramban MENOLAK nilai itu, Angular MENERIMANYA.</p>';
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
console.log(`F-14 — Angular vs atribut pattern peramban  (@angular/forms@${pkg.version})`);
console.log(line);
console.log('\nHTML Standard mengompilasi atribut `pattern` sebagai "^(?:" + pattern + ")$".');
console.log('Jadi peramban adalah acuan yang sah untuk apa yang pola itu SEHARUSNYA berarti.\n');
console.log(
  '  ' +
    'pattern'.padEnd(18) +
    'value'.padEnd(26) +
    'peramban'.padEnd(10) +
    'Angular',
);
for (const r of rows) {
  console.log(
    `  ${r.disagree ? '>>> ' : '    '}`.slice(0, 4) +
      r.pattern.padEnd(18) +
      JSON.stringify(r.value).padEnd(26) +
      (r.browser ? 'valid' : 'ditolak').padEnd(10) +
      (r.angular ? 'VALID' : 'ditolak') +
      (r.disagree ? '   <-- TIDAK SEPAKAT' : ''),
  );
}

if (shot) {
  await page.screenshot({path: shot, fullPage: true});
  console.log(`\nTangkapan layar: ${shot}`);
}

const disagreements = rows.filter((r) => r.disagree);
const angularLooser = disagreements.filter((r) => r.angular && !r.browser);
console.log('\n' + line);
console.log(`Ketidaksepakatan: ${disagreements.length}/${rows.length}`);
console.log(`Di antaranya, Angular LEBIH LONGGAR daripada peramban: ${angularLooser.length}`);
if (angularLooser.length) {
  console.log('\nSetiap baris itu adalah nilai yang ditolak validasi bawaan peramban');
  console.log('untuk pola yang sama, tetapi diterima validator Angular.');
}
console.log(line);

await browser.close();
srv.close();
process.exit(angularLooser.length ? 0 : 1);
