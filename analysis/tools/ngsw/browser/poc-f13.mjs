/**
 * F-13 — PoC MANDIRI, SAME-ORIGIN.
 *
 * Tidak bergantung pada F-12 sama sekali. Endpoint yang diuji berada di origin
 * aplikasi sendiri dan SENGAJA dicakup oleh `dataGroups` — jadi tidak ada ruang
 * bagi triage untuk mengatakan "endpoint itu masuk cache karena pola lintas-origin
 * yang keliru".
 *
 * KLAIM
 *   Angular selalu membangkitkan `cacheQueryOptions.ignoreVary = true` dan tidak
 *   mengekspos opsi untuk mematikannya. Akibatnya respons ber-cache yang membawa
 *   `Vary: Authorization` dapat dikembalikan untuk permintaan berikutnya dengan
 *   nilai header `Authorization` yang BERBEDA.
 *
 * ISTILAH YANG BENAR
 *   `Vary` BUKAN berarti "jangan cache". Artinya: representasi ini dipilih
 *   berdasarkan nilai header permintaan tersebut, sehingga cache HARUS
 *   mempertimbangkan header itu saat mencari kecocokan. Default Cache API adalah
 *   `ignoreVary: false`, sehingga peramban akan menolak respons Alice untuk
 *   permintaan Bob. Angular menimpa keputusan itu.
 *
 * DUA JALAN — hanya `ignoreVary` yang berbeda
 *   A  SEPERTI DIKIRIM  manifest apa adanya dari Generator (ignoreVary: true)
 *   B  DITAMBAL         manifest yang sama, cacheQueryOptions.ignoreVary = false
 *                       (persis yang akan dihasilkan generator yang diperbaiki)
 *
 * Jalankan:
 *   node analysis/tools/ngsw/browser/poc-f13.mjs <path-node_modules> [--shot x.png]
 */
import {createServer} from 'http';
import {readFileSync, globSync} from 'fs';
import {createHash} from 'crypto';
import {join, dirname} from 'path';
import {pathToFileURL, fileURLToPath} from 'url';
import {createRequire} from 'module';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node poc-f13.mjs <path-ke-node_modules> [--shot out.png]');
  process.exit(2);
}
const iShot = process.argv.indexOf('--shot');
const shot = iShot > 0 ? process.argv[iShot + 1] : null;
const DIRINI = dirname(fileURLToPath(import.meta.url));

const {chromium} = createRequire(join(nm, 'x.js'))('playwright');
const swDir = join(nm, '@angular/service-worker');
const pkg = JSON.parse(readFileSync(join(swDir, 'package.json'), 'utf8'));
const {Generator} = await import(pathToFileURL(join(swDir, 'fesm2022/config.mjs')).href);

const INDEX = readFileSync(join(DIRINI, 'index-f13.html'), 'utf8');
const isiBerkas = {'/index.html': INDEX};

// ------------------------------------------------ manifest dari Generator ---
const manifestAsli = await new Generator(
  {
    list: async () => Object.keys(isiBerkas),
    read: async (p) => isiBerkas[p],
    hash: async (p) => createHash('sha1').update(Buffer.from(isiBerkas[p], 'utf8')).digest('hex'),
    write: async () => {},
  },
  '/',
).process({
  index: '/index.html',
  assetGroups: [{name: 'app', installMode: 'prefetch', resources: {files: ['/index.html']}}],
  dataGroups: [
    {
      // SENGAJA mencakup /api/profile pada origin aplikasi sendiri.
      name: 'api',
      urls: ['/api/**'],
      cacheConfig: {strategy: 'performance', maxSize: 100, maxAge: '1d'},
    },
  ],
  navigationUrls: ['/**'],
});

// Manifest "ditambal" = persis yang akan dihasilkan generator yang diperbaiki.
const manifestDitambal = JSON.parse(JSON.stringify(manifestAsli));
manifestDitambal.dataGroups[0].cacheQueryOptions = {
  ...manifestDitambal.dataGroups[0].cacheQueryOptions,
  ignoreVary: false,
};

// ------------------------------------------------------------ server app ----
// SATU origin saja. Tidak ada lintas-origin di mana pun dalam PoC ini.
const PROFIL = {
  ALICE: {name: 'Alice', email: 'alice@example.com', role: 'admin'},
  BOB: {name: 'Bob', email: 'bob@example.com', role: 'viewer'},
};
let manifestAktif = manifestAsli;
let hitProfil = 0;

const srv = createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/ngsw-worker.js') {
    res.writeHead(200, {'Content-Type': 'text/javascript', 'Cache-Control': 'no-store'});
    res.end(readFileSync(join(swDir, 'ngsw-worker.js')));
    return;
  }
  if (u.pathname === '/ngsw.json') {
    res.writeHead(200, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'});
    res.end(JSON.stringify(manifestAktif));
    return;
  }
  if (u.pathname === '/api/profile') {
    hitProfil++;
    const bearer = (req.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
    res.writeHead(200, {
      'Content-Type': 'application/json',
      // Server MENYATAKAN dengan benar bahwa representasi ini bervariasi
      // menurut header Authorization.
      Vary: 'Authorization',
      'Cache-Control': 'no-store',
    });
    res.end(JSON.stringify(PROFIL[bearer] ?? {name: 'anonim', role: 'none'}));
    return;
  }
  if (u.pathname === '/index.html' || u.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store'});
    res.end(INDEX);
    return;
  }
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('nope');
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const APP = `http://localhost:${srv.address().port}`;
const URL_PROFIL = APP + '/api/profile';

// ----------------------------------------------------------------- jalan ----
const CHROME = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');

async function jalankan({nama, manifest, ambilShot}) {
  manifestAktif = manifest;
  const browser = await chromium.launch(CHROME.length ? {executablePath: CHROME[0]} : {});
  const ctx = await browser.newContext(); // Cache Storage & pendaftaran SW bersih
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('   [pageerror]', e.message));

  await page.goto(APP + '/index.html', {waitUntil: 'load'});
  const siap = await page.evaluate(() => window.__daftarkanSW());
  if (!siap.ok) {
    await browser.close();
    return {nama, gagal: siap.pesan};
  }

  const hitAwal = hitProfil;
  // T0 — Alice login.
  const alice = await page.evaluate(([u]) => window.__ambil(u, 'ALICE'), [URL_PROFIL]);
  // T1 — Alice logout. T2 — Bob login pada profil peramban yang SAMA.
  const bob = await page.evaluate(([u]) => window.__ambil(u, 'BOB'), [URL_PROFIL]);
  const hitServer = hitProfil - hitAwal;

  const uji = await page.evaluate(([u]) => window.__ujiVary(u), [URL_PROFIL]);
  const cqo = JSON.stringify(manifest.dataGroups[0].cacheQueryOptions);

  await page.evaluate(
    ([d]) => window.__lapor(d),
    [{url: URL_PROFIL, alice, bob, hitServer, uji, cqo}],
  );
  if (ambilShot && shot) await page.screenshot({path: shot, fullPage: true});

  await browser.close();
  return {nama, alice, bob, hitServer, uji, cqo, bocor: bob.body === alice.body};
}

const garis = '='.repeat(78);
console.log(garis);
console.log('F-13 — Angular Service Worker memaksa ignoreVary: true');
console.log(`@angular/service-worker@${pkg.version}, ngsw-worker.js npm apa adanya`);
console.log(garis);
console.log(`
SAME-ORIGIN. Tidak ada lintas-origin sama sekali dalam PoC ini.
  origin & endpoint : ${URL_PROFIL}
  dataGroups        : urls ['/api/**'] -> SENGAJA mencakup endpoint ini
  strategi          : performance, maxAge 1d
  header respons    : Vary: Authorization

  T0  Alice login -> GET /api/profile   Authorization: Bearer ALICE
  T1  Alice logout
  T2  Bob login pada profil peramban yang sama
      GET URL yang SAMA                 Authorization: Bearer BOB`);

const A = await jalankan({
  nama: 'A  SEPERTI DIKIRIM  (ignoreVary: true, dari Generator)',
  manifest: manifestAsli,
  ambilShot: true,
});
const B = await jalankan({
  nama: 'B  DITAMBAL         (ignoreVary: false)',
  manifest: manifestDitambal,
  ambilShot: false,
});

for (const h of [A, B]) {
  console.log('\n' + garis);
  console.log(h.nama);
  console.log(garis);
  if (h.gagal) {
    console.log(`  GAGAL: ${h.gagal}`);
    continue;
  }
  console.log(`  manifest cacheQueryOptions        ${h.cqo}`);
  console.log(`  header respons server             Vary: ${h.alice.vary}`);
  console.log(`  T0 Alice (Bearer ALICE) menerima  ${h.alice.body}`);
  console.log(`  T2 Bob   (Bearer BOB)   menerima  ${h.bob.body}`);
  console.log(`  permintaan sampai ke server       ${h.hitServer}  (2 = normal, 1 = Bob dari cache)`);
  if (h.uji) {
    const r = (x) => (x === null ? 'undefined' : x);
    console.log(`  pada entri cache yang sama (${h.uji.cache}):`);
    console.log(`     cache.match(bobRequest)                     -> ${r(h.uji.denganDefaultPeramban)}`);
    console.log(`     cache.match(bobRequest, {ignoreVary:true})  -> ${r(h.uji.denganIgnoreVaryTrue)}`);
  }
  console.log(`  => Bob menerima data Alice?       ${h.bocor ? '>>> YA' : 'tidak'}`);
}

const terkonfirmasi = A.bocor && !B.bocor && A.hitServer === 1 && B.hitServer === 2;
console.log('\n' + garis);
if (terkonfirmasi) {
  console.log('TERKONFIRMASI — same-origin, tanpa melibatkan F-12 sama sekali.');
  console.log('');
  console.log('  Server MENYATAKAN dengan benar bahwa representasi ini bervariasi menurut');
  console.log('  header Authorization. Pencocokan cache baku peramban karena itu MENOLAK');
  console.log('  respons Alice untuk permintaan Bob — terlihat langsung pada entri cache');
  console.log('  yang sama: cache.match(bobRequest) mengembalikan undefined.');
  console.log('');
  console.log('  Angular menimpa keputusan itu dengan ignoreVary: true, dan permintaan Bob');
  console.log('  tidak pernah mencapai server (1 permintaan, bukan 2).');
  console.log('');
  console.log('  Dengan ignoreVary: false — persis yang akan dihasilkan generator yang');
  console.log('  diperbaiki — permintaan Bob mencapai jaringan dan ia menerima datanya');
  console.log('  sendiri (2 permintaan).');
  console.log('');
  console.log('  generator.ts:203-210  ignoreVary: true di-hardcode');
  console.log("  config/src/in.ts:44,64  Pick<CacheQueryOptions, 'ignoreSearch'>");
  console.log('                          -> aplikasi TIDAK PUNYA cara memilih false');
} else {
  console.log(
    `Tidak terkonfirmasi (A.bocor=${A.bocor} B.bocor=${B.bocor} ` +
      `A.hit=${A.hitServer} B.hit=${B.hitServer}).`,
  );
}
console.log(garis);
if (shot) console.log(`\nTangkapan layar (arm A): ${shot}`);

srv.close();
process.exit(terkonfirmasi ? 0 : 1);
