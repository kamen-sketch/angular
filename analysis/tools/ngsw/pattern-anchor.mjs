/**
 * F-12 langkah 1 — pola runtime service worker tidak di-anchor.
 *
 * Di SATU berkas, packages/service-worker/config/src/generator.ts, ada empat
 * tempat yang mengubah glob menjadi regex:
 *
 *   :126  processNavigationUrls   ->  `^${urlToRegex(url, baseHref)}$`   ANCHOR
 *   :153  globListToMatcher (neg) ->  '^' + globToRegex(...) + '$'       ANCHOR
 *   :158  globListToMatcher (pos) ->  '^' + globToRegex(...) + '$'       ANCHOR
 *   :96   assetGroups.patterns    ->  urlToRegex(url, baseHref, true)    TANPA
 *   :104  dataGroups.patterns     ->  urlToRegex(url, baseHref, true)    TANPA
 *
 * Dua yang tanpa anchor justru yang dipakai SAAT RUNTIME oleh service worker:
 *   worker/src/data.ts:305    this.patterns.some(p => p.test(req.url))
 *   worker/src/assets.ts:126  this.patterns.some(p => p.test(url))
 *
 * `data.ts` menguji terhadap `req.url` LENGKAP — termasuk skema dan host. Regex
 * tanpa anchor cocok di mana saja dalam string itu, jadi pola yang dimaksudkan
 * untuk satu path pada origin sendiri juga cocok untuk URL LINTAS-ORIGIN yang
 * kebetulan memuat path tersebut.
 *
 * Harness ini menjalankan `Generator` npm yang sebenarnya, bukan menebak
 * keluarannya.
 *
 * Jalankan: node analysis/tools/ngsw/pattern-anchor.mjs <path-node_modules>
 */
import {readFileSync} from 'fs';
import {join} from 'path';
import {pathToFileURL} from 'url';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node pattern-anchor.mjs <path-ke-node_modules>');
  process.exit(2);
}
const M = (p) => pathToFileURL(join(nm, p)).href;
const pkg = JSON.parse(
  readFileSync(join(nm, '@angular/service-worker/package.json'), 'utf8'),
);
const {Generator} = await import(M('@angular/service-worker/fesm2022/config.mjs'));

// Filesystem tiruan seminimal mungkin — Generator hanya butuh list/hash/read.
const berkas = {
  '/index.html': '<html>app</html>',
  '/main.js': 'console.log(1)',
};
const fs = {
  list: async () => Object.keys(berkas),
  read: async (p) => berkas[p],
  hash: async (p) => 'h' + p.length,
  write: async () => {},
};

const config = {
  index: '/index.html',
  assetGroups: [
    {
      name: 'app',
      installMode: 'prefetch',
      resources: {files: ['/index.html', '/main.js'], urls: ['/assets/**']},
    },
  ],
  dataGroups: [
    {
      name: 'api',
      urls: ['/api/**'],
      cacheConfig: {strategy: 'performance', maxSize: 100, maxAge: '1d'},
    },
  ],
  navigationUrls: ['/**', '!/api/**'],
};

const manifest = await new Generator(fs, '/').process(config);

const garis = '='.repeat(78);
console.log(garis);
console.log(`Pola manifest ngsw — @angular/service-worker@${pkg.version} (Generator npm)`);
console.log(garis);

console.log('\nKonfigurasi yang sama menghasilkan DUA gaya regex:\n');
console.log(`  dataGroups[0].patterns    ${JSON.stringify(manifest.dataGroups[0].patterns)}`);
console.log(`  assetGroups[0].patterns   ${JSON.stringify(manifest.assetGroups[0].patterns)}`);
console.log(`  navigationUrls            ${JSON.stringify(manifest.navigationUrls)}`);

const polaData = manifest.dataGroups[0].patterns[0];
const navPositif = manifest.navigationUrls.find((n) => n.positive).regex;
const navNegatif = manifest.navigationUrls.find((n) => !n.positive).regex;

console.log(`\n  dataGroups di-anchor?     ${/^\^/.test(polaData) && /\$$/.test(polaData)}`);
console.log(`  navigationUrls di-anchor? ${/^\^/.test(navNegatif) && /\$$/.test(navNegatif)}`);

// Reproduksi persis pemakaian runtime: data.ts:305 menguji req.url LENGKAP.
const cocokData = (url) => new RegExp(polaData).test(url);
// isNavigationRequest memotong prefix scope dulu, lalu menguji regex ter-anchor.
const SCOPE = 'https://app.example.com';
const cocokNav = (url) => {
  const dipotong = url.startsWith(SCOPE) ? url.slice(SCOPE.length) : url;
  const tanpaQuery = dipotong.replace(/[?#].*$/, '');
  return new RegExp(navPositif).test(tanpaQuery) && !new RegExp(navNegatif).test(tanpaQuery);
};

console.log('\n' + garis);
console.log('Perilaku pencocokan pada URL yang sama');
console.log(garis);
console.log('\n  URL                                              dataGroup  navigationUrls');

const kasus = [
  ['https://app.example.com/api/orders', 'dimaksudkan: cocok'],
  ['https://app.example.com/home', 'dimaksudkan: tidak'],
  ['https://evil.example.net/x/api/orders', 'LINTAS-ORIGIN'],
  ['https://evil.example.net/api/orders', 'LINTAS-ORIGIN'],
  ['https://cdn.other.test/track?u=/api/orders', 'LINTAS-ORIGIN di query'],
  ['https://app.example.com/redirect?to=/api/x', 'path sendiri, di query'],
];
for (const [url, ket] of kasus) {
  const d = cocokData(url);
  const n = cocokNav(url);
  console.log(`  ${url.padEnd(48)} ${String(d).padEnd(10)} ${String(n).padEnd(6)} ${ket}`);
}

const lintasOrigin = kasus
  .filter(([u]) => !u.startsWith(SCOPE))
  .filter(([u]) => cocokData(u));

console.log('\n' + garis);
if (lintasOrigin.length) {
  console.log(`Pola dataGroup mencocokkan ${lintasOrigin.length} URL LINTAS-ORIGIN.`);
  console.log('Pola navigationUrls — dari konfigurasi yang sama, di berkas yang sama,');
  console.log('30 baris di atasnya — tidak, karena ia di-anchor.');
} else {
  console.log('Tidak ada pencocokan lintas-origin; hipotesis gugur.');
}
console.log(garis);
process.exit(lintasOrigin.length ? 0 : 1);
