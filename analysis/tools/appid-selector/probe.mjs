/**
 * F-19 — `APP_ID` diinterpolasi MENTAH ke dalam selektor CSS.
 *
 * BERKAS  packages/platform-browser/src/dom/shared_styles_host.ts:71-73
 *
 *     const elements = doc.head?.querySelectorAll(
 *       `style[${APP_ID_ATTRIBUTE_NAME}="${appId}"],link[${APP_ID_ATTRIBUTE_NAME}="${appId}"]`,
 *     );
 *
 * Dipanggil dari konstruktor `SharedStylesHost` (:135), jadi ia berjalan pada
 * setiap bootstrap aplikasi yang memakai platform-browser.
 *
 * INI SINK KEDUA UNTUK AKAR MASALAH YANG SAMA DENGAN F-05.
 * `APP_ID` divalidasi oleh `validAppIdInitializer` (/^[a-zA-Z0-9\-_]+$/), tetapi
 * initializer itu HANYA didaftarkan di bawah ngDevMode:
 *     core/src/platform/platform_ref.ts:55      ...(ngDevMode ? [validAppIdInitializer] : [])
 *     core/src/application/create_application.ts:69   idem
 * Di build produksi validasi itu tidak berjalan sama sekali.
 *
 * POLA G-22 LAGI, KALI INI LINTAS BERKAS DALAM SATU PAKET:
 * `platform-browser` SUDAH punya penjaga untuk persis masalah ini —
 * `escapeSelectorValue` di browser/meta.ts:188-192, lengkap dengan komentarnya
 * "Escape backslashes and double quotes to prevent CSS selector injection."
 * Penjaga itu tidak dipakai di sini.
 *
 * Jalankan: node analysis/tools/appid-selector/probe.mjs <path-node_modules> [--shot x.png]
 */
import {readFileSync, globSync} from 'fs';
import {join} from 'path';
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

// Pastikan bentuk yang diselidiki BENAR-BENAR ada di artefak npm.
const chunk = readFileSync(
  join(nm, '@angular/platform-browser/fesm2022/_dom_renderer-chunk.mjs'),
  'utf8',
);
const adaSink = /style\[\$\{APP_ID_ATTRIBUTE_NAME\}="\$\{appId\}"\]|ng-app-id="\$\{/.test(chunk) ||
  /querySelectorAll\(`style\[/.test(chunk);
if (!adaSink) {
  console.error('Bentuk selektor tidak ditemukan di bundel npm; hentikan daripada menebak.');
  process.exit(2);
}

// `escapeSelectorValue` dari meta.ts:188-192 — penjaga yang SUDAH ADA di paket
// yang sama, disalin apa adanya untuk dipakai sebagai pembanding.
const escapeSelectorValue = (value) =>
  `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const APP_ID_ATTRIBUTE_NAME = 'ng-app-id';

/** shared_styles_host.ts:71-73 apa adanya. */
function selectorSaatIni(appId) {
  return `style[${APP_ID_ATTRIBUTE_NAME}="${appId}"],link[${APP_ID_ATTRIBUTE_NAME}="${appId}"]`;
}
/** Bentuk yang sama, tetapi memakai penjaga yang sudah ada di paket ini. */
function selectorDijaga(appId) {
  const v = escapeSelectorValue(appId);
  return `style[${APP_ID_ATTRIBUTE_NAME}=${v}],link[${APP_ID_ATTRIBUTE_NAME}=${v}]`;
}

const APP_IDS = [
  {id: 'ng', ket: 'default'},
  {id: 'my-app_2', ket: 'lolos validator dev (a-zA-Z0-9-_)'},
  {id: 'x" ], * , [z="', ket: 'keluar dari selektor -> cocokkan SEMUA'},
  {id: 'a"b', ket: 'kutip tunggal tak seimbang'},
  {id: 'a\\b', ket: 'backslash'},
];

const CHROME = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');
const browser = await chromium.launch(CHROME.length ? {executablePath: CHROME[0]} : {});
const page = await browser.newPage();
page.on('pageerror', (e) => console.error('  [pageerror]', e.message));

// <head> yang realistis: dua elemen milik Angular, dan beberapa milik pihak lain
// yang TIDAK boleh ikut terpilih.
await page.setContent(
  '<!doctype html><html><head>' +
    '<style ng-app-id="ng">.a{}</style>' +
    '<link ng-app-id="ng" rel="stylesheet" href="/a.css">' +
    '<title>t</title>' +
    '<meta name="csrf" content="RAHASIA">' +
    '<link rel="stylesheet" href="/pihak-ketiga.css">' +
    '<style>.milik-orang-lain{}</style>' +
    '</head><body></body></html>',
);

const rows = await page.evaluate(
  ({cases}) =>
    cases.map((c) => {
      const nilai = (sel) => {
        try {
          const els = [...document.head.querySelectorAll(sel)];
          return {
            sah: true,
            jumlah: els.length,
            tag: els.map((e) => e.tagName.toLowerCase()).join(','),
            // Apakah ada elemen yang BUKAN milik Angular ikut terpilih?
            asing: els.filter((e) => !e.hasAttribute('ng-app-id')).length,
          };
        } catch (e) {
          return {sah: false, jumlah: 0, tag: '', asing: 0, err: e.name};
        }
      };
      return {...c, kini: nilai(c.selKini), dijaga: nilai(c.selDijaga)};
    }),
  {
    cases: APP_IDS.map((a) => ({
      ...a,
      selKini: selectorSaatIni(a.id),
      selDijaga: selectorDijaga(a.id),
    })),
  },
);

const line = '='.repeat(78);
console.log(line);
console.log(`F-19 — APP_ID -> selektor CSS, @angular/platform-browser@${pkg.version}`);
console.log(line);
console.log('\n<head> uji: 2 elemen milik Angular (ng-app-id="ng") + title, meta csrf,');
console.log('link pihak ketiga, dan style milik orang lain.\n');
console.log('  APP_ID                  saat ini                    dengan escapeSelectorValue');
for (const r of rows) {
  const k = r.kini.sah
    ? `${r.kini.jumlah} elemen (${r.kini.asing} ASING)`
    : `DITOLAK ${r.kini.err}`;
  const d = r.dijaga.sah
    ? `${r.dijaga.jumlah} elemen (${r.dijaga.asing} asing)`
    : `DITOLAK ${r.dijaga.err}`;
  const buruk = r.kini.asing > 0 || (!r.kini.sah && r.dijaga.sah);
  console.log(`  ${buruk ? '>>' : '  '}${JSON.stringify(r.id).padEnd(22)}${k.padEnd(28)}${d}`);
}

console.log('\n  Selektor yang benar-benar terbentuk:');
for (const r of rows) {
  console.log(`    ${JSON.stringify(r.id).padEnd(22)} -> ${r.selKini.slice(0, 74)}`);
}

if (shot) {
  await page.setContent(
    '<style>body{font:13px ui-monospace,monospace;margin:20px}table{border-collapse:collapse}' +
      'td,th{border:1px solid #bbb;padding:5px 9px;vertical-align:top}' +
      '.bad{background:#ffe1e1}.ok{background:#e8f6e8}code{background:#f2f2f2;padding:1px 3px}</style>' +
      '<h3>APP_ID diinterpolasi mentah ke selektor CSS (shared_styles_host.ts:71-73)</h3>' +
      '<p>&lt;head&gt; uji berisi 2 elemen Angular (<code>ng-app-id="ng"</code>) dan 4 elemen milik pihak lain.<br>' +
      '"ASING" = elemen tanpa <code>ng-app-id</code> yang ikut terpilih.</p>' +
      '<table><tr><th>APP_ID</th><th>selektor yang terbentuk</th><th>saat ini</th>' +
      '<th>dengan escapeSelectorValue (sudah ada di meta.ts)</th></tr>' +
      rows
        .map((r) => {
          const buruk = r.kini.asing > 0 || (!r.kini.sah && r.dijaga.sah);
          const f = (v) =>
            v.sah ? `${v.jumlah} elemen, ${v.asing} ASING` : `DITOLAK ${v.err}`;
          return (
            '<tr class="' + (buruk ? 'bad' : 'ok') + '">' +
            '<td><code>' + JSON.stringify(r.id) + '</code></td>' +
            '<td><small><code>' + r.selKini.replace(/[<>&]/g, (c) => ({'<':'&lt;','>':'&gt;','&':'&amp;'})[c]) + '</code></small></td>' +
            '<td>' + f(r.kini) + '</td><td>' + f(r.dijaga) + '</td></tr>'
          );
        })
        .join('') +
      '</table>',
  );
  await page.screenshot({path: shot, fullPage: true});
  console.log(`\nTangkapan layar: ${shot}`);
}

const kebocoran = rows.filter((r) => r.kini.asing > 0);
const lemparan = rows.filter((r) => !r.kini.sah && r.dijaga.sah);
const kontrolAman = rows
  .filter((r) => /^[a-zA-Z0-9\-_]+$/.test(r.id))
  .every((r) => r.kini.sah && r.kini.asing === 0);

console.log('\n' + line);
console.log(
  `APP_ID yang menarik elemen ASING: ${kebocoran.length}   ` +
    `yang membuat selektor DITOLAK: ${lemparan.length}   ` +
    `kontrol (a-zA-Z0-9-_) aman: ${kontrolAman}`,
);
if ((kebocoran.length || lemparan.length) && kontrolAman) {
  console.log('');
  console.log('TERKONFIRMASI. Kontrol negatifnya: setiap APP_ID yang LOLOS validator');
  console.log('dev (/^[a-zA-Z0-9\\-_]+$/) berperilaku benar. Jadi pemicunya persis');
  console.log('karakter yang validator itu tolak — dan validator itu TIDAK BERJALAN');
  console.log('di build produksi (ngDevMode-only, platform_ref.ts:55).');
  console.log('');
  console.log('Perbaikan: pakai escapeSelectorValue yang SUDAH ADA di paket ini');
  console.log('(browser/meta.ts:188-192), atau validasi APP_ID di luar ngDevMode.');
} else {
  console.log('Tidak terkonfirmasi.');
}
console.log(line);

await browser.close();
process.exit((kebocoran.length || lemparan.length) && kontrolAman ? 0 : 1);
