/**
 * F-12 — PoC di PERAMBAN SUNGGUHAN dengan Service Worker yang benar-benar
 * terdaftar, dan dampak utama: PENGUNGKAPAN RESPONS LINTAS-AKUN.
 *
 * Menutup dua keberatan triage terhadap versi sebelumnya:
 *   (1) "scope-nya tiruan"  -> di sini Chromium mendaftarkan `ngsw-worker.js`
 *       yang sebenarnya lewat navigator.serviceWorker.register(); seluruh
 *       Cache Storage, pencocokan Vary, dan interception adalah milik peramban.
 *   (2) "dampaknya cuma UI basi / otorisasi sisi klien"  -> dampak utama di
 *       sini adalah kerahasiaan: respons ber-otentikasi milik pengguna A
 *       disajikan ke pengguna B pada peramban yang sama, dan server pihak
 *       ketiga TIDAK PERNAH dihubungi sehingga tidak punya kesempatan menolak.
 *
 * SIAPKAN PANGGUNG
 *   origin aplikasi : http://localhost:PORT_A     (SW terdaftar di sini)
 *   origin IdP      : http://127.0.0.1:PORT_B     (origin BERBEDA)
 *   ngsw-config     : dataGroups[{ urls:['/api/**'], strategy:'performance' }]
 *
 * Developer memilih cache-first untuk `/api/**` MILIKNYA SENDIRI. Ia tidak
 * pernah mengonfigurasi apa pun untuk endpoint IdP. Pola path tanpa origin
 * binding itulah yang diam-diam memperluas kebijakan caching yang disengaja
 * ke endpoint ber-otentikasi milik pihak ketiga.
 *
 * LINI MASA
 *   T0  Alice login   -> GET  {IdP}/v2/api/profile   Authorization: Bearer ALICE
 *   T1  Alice logout
 *   T2  Bob login pada peramban yang sama
 *       GET URL yang sama                            Authorization: Bearer BOB
 *   T3  Siapa yang Bob lihat? Apakah IdP dihubungi?
 *
 * TIGA JALAN — satu variabel berubah tiap kali
 *   A  RENTAN   endpoint /v2/api/profile           (pola cocok)
 *   B  KONTROL  endpoint /v2/profile               (pola tidak cocok)
 *   C  BATAS    /v2/api/profile + `Vary: Authorization` dari IdP
 *
 * Jalankan: node analysis/tools/ngsw/browser/poc.mjs <path-node_modules> [--shot x.png]
 */
import {createServer} from 'http';
import {readFileSync, existsSync, globSync} from 'fs';
import {createHash} from 'crypto';
import {join, dirname} from 'path';
import {pathToFileURL, fileURLToPath} from 'url';
import {createRequire} from 'module';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node poc.mjs <path-ke-node_modules> [--shot out.png]');
  process.exit(2);
}
const iShot = process.argv.indexOf('--shot');
const shot = iShot > 0 ? process.argv[iShot + 1] : null;
const DIRINI = dirname(fileURLToPath(import.meta.url));

const {chromium} = createRequire(join(nm, 'x.js'))('playwright');
const swDir = join(nm, '@angular/service-worker');
const pkg = JSON.parse(readFileSync(join(swDir, 'package.json'), 'utf8'));
const {Generator} = await import(pathToFileURL(join(swDir, 'fesm2022/config.mjs')).href);

// ------------------------------------------------------------- server IdP --
// Origin BERBEDA dari aplikasi. Mengembalikan profil sesuai bearer token, dan
// menghitung berapa kali ia benar-benar dihubungi.
let hitIdp = 0;
let kirimVary = false;
const PROFIL = {
  ALICE: {name: 'Alice', email: 'alice@example.com', role: 'admin'},
  BOB: {name: 'Bob', email: 'bob@example.com', role: 'viewer'},
};

const srvIdp = createServer((req, res) => {
  const asal = req.headers.origin ?? '*';
  const korsBase = {
    'Access-Control-Allow-Origin': asal,
    'Access-Control-Allow-Headers': 'authorization,content-type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Max-Age': '0',
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(204, korsBase);
    res.end();
    return;
  }
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/hits') {
    res.writeHead(200, {...korsBase, 'Content-Type': 'application/json'});
    res.end(JSON.stringify({hits: hitIdp}));
    return;
  }
  if (u.pathname === '/v2/api/profile' || u.pathname === '/v2/profile') {
    hitIdp++;
    const bearer = (req.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
    const profil = PROFIL[bearer] ?? {name: 'anonim', role: 'none'};
    const kepala = {
      ...korsBase,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    };
    if (kirimVary) kepala['Vary'] = 'Authorization';
    res.writeHead(200, kepala);
    res.end(JSON.stringify(profil));
    return;
  }
  res.writeHead(404, korsBase);
  res.end('nope');
});
await new Promise((r) => srvIdp.listen(0, '127.0.0.1', r));
const IDP = `http://127.0.0.1:${srvIdp.address().port}`;

// ------------------------------------------------- manifest dari Generator --
const INDEX = readFileSync(join(DIRINI, 'index.html'), 'utf8');
const isiBerkas = {'/index.html': INDEX};
const manifest = await new Generator(
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
      name: 'api',
      urls: ['/api/**'],
      cacheConfig: {strategy: 'performance', maxSize: 100, maxAge: '1d'},
    },
  ],
  navigationUrls: ['/**'],
});

// ------------------------------------------------------- server aplikasi ---
const srvApp = createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/ngsw-worker.js') {
    res.writeHead(200, {'Content-Type': 'text/javascript', 'Cache-Control': 'no-store'});
    res.end(readFileSync(join(swDir, 'ngsw-worker.js')));
    return;
  }
  if (u.pathname === '/ngsw.json') {
    res.writeHead(200, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'});
    res.end(JSON.stringify(manifest));
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
await new Promise((r) => srvApp.listen(0, '127.0.0.1', r));
const APP = `http://localhost:${srvApp.address().port}`;

// ------------------------------------------------------------------ jalan --
const CHROME = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');
const garis = '='.repeat(78);
console.log(garis);
console.log(`F-12 — PoC peramban sungguhan, Service Worker terdaftar`);
console.log(`@angular/service-worker@${pkg.version} (ngsw-worker.js npm apa adanya)`);
console.log(garis);
console.log(`\norigin aplikasi : ${APP}`);
console.log(`origin IdP      : ${IDP}   <- ORIGIN BERBEDA`);
console.log(`pola dataGroup  : ${JSON.stringify(manifest.dataGroups[0].patterns)}`);
console.log(`strategi        : performance, maxAge 1d`);

async function jalankan({nama, path, vary}) {
  kirimVary = vary;
  const browser = await chromium.launch(
    CHROME.length ? {executablePath: CHROME[0]} : {},
  );
  // Konteks baru = Cache Storage & pendaftaran SW yang bersih tiap jalan.
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('   [pageerror]', e.message));

  await page.goto(APP + '/index.html', {waitUntil: 'load'});
  const siap = await page.evaluate(() => window.__daftarkanSW());
  if (!siap.ok) {
    await browser.close();
    return {nama, gagal: siap.pesan};
  }

  const url = IDP + path;
  const hitAwal = (await (await fetch(IDP + '/hits')).json()).hits;

  // T0 — Alice login.
  const alice = await page.evaluate(([u]) => window.__ambil(u, 'ALICE'), [url]);
  // T1 — Alice logout (tidak ada yang perlu dilakukan; token berganti saja).
  // T2 — Bob login pada peramban YANG SAMA.
  const bob = await page.evaluate(([u]) => window.__ambil(u, 'BOB'), [url]);

  const hitAkhir = (await (await fetch(IDP + '/hits')).json()).hits;

  // Apa yang tersimpan di Cache Storage milik peramban (bukan tiruan)?
  // Sematkan sebabnya: cocokkan entri cache yang sama dua kali, dengan dan
  // tanpa ignoreVary.
  const ujiVary = await page.evaluate(([u]) => window.__ujiVary(u), [url]);

  const isiCache = await page.evaluate(async () => {
    const keluar = {};
    for (const nama of await caches.keys()) {
      const c = await caches.open(nama);
      const urls = (await c.keys()).map((r) => r.url);
      if (urls.length) keluar[nama] = urls;
    }
    return keluar;
  });

  if (shot && nama.startsWith('A')) {
    await page.evaluate(
      ([a, b]) => window.__lapor(a, b),
      [alice, bob],
    );
    await page.screenshot({path: shot, fullPage: true});
  }

  await browser.close();
  return {
    nama,
    url,
    alice,
    bob,
    hitIdpUntukProfil: hitAkhir - hitAwal,
    isiCache,
    ujiVary,
    bocor: bob.body === alice.body && alice.body.includes('Alice'),
  };
}

const ringkas = (s) => (s === null ? 'TIDAK COCOK' : s.length > 46 ? s.slice(0, 46) + '...' : s);

const hasil = [];
hasil.push(await jalankan({nama: 'A  RENTAN   /v2/api/profile (pola cocok)', path: '/v2/api/profile', vary: false}));
hasil.push(await jalankan({nama: 'B  KONTROL  /v2/profile (pola tidak cocok)', path: '/v2/profile', vary: false}));
hasil.push(await jalankan({nama: 'C  BATAS    /v2/api/profile + Vary: Authorization', path: '/v2/api/profile', vary: true}));

for (const h of hasil) {
  console.log('\n' + garis);
  console.log(h.nama);
  console.log(garis);
  if (h.gagal) {
    console.log(`  GAGAL: ${h.gagal}`);
    continue;
  }
  console.log(`  URL                          ${h.url}`);
  console.log(`  T0 Alice (Bearer ALICE)      ${h.alice.body}`);
  console.log(`  T2 Bob   (Bearer BOB)        ${h.bob.body}`);
  console.log(`  IdP dihubungi untuk profil   ${h.hitIdpUntukProfil}x  (2 = normal, 1 = Bob dari cache)`);
  const cacheLintas = Object.entries(h.isiCache)
    .map(([n, u]) => [n, u.filter((x) => x.startsWith(IDP))])
    .filter(([, u]) => u.length);
  if (cacheLintas.length) {
    for (const [n, u] of cacheLintas) {
      console.log(`  Cache Storage peramban       ${n}`);
      for (const x of u) console.log(`                               LINTAS-ORIGIN ${x}`);
    }
  } else {
    console.log('  Cache Storage peramban       (tidak ada URL IdP tersimpan)');
  }
  console.log(`  => Bob menerima data Alice?  ${h.bocor ? '>>> YA — PENGUNGKAPAN LINTAS-AKUN' : 'tidak'}`);
  for (const [n, v] of Object.entries(h.ujiVary ?? {})) {
    console.log(`  Cache.match(permintaan Bob) pada ${n}:`);
    console.log(`     {ignoreVary:true}  (yang dipakai ngsw) -> ${ringkas(v.denganIgnoreVaryTrue)}`);
    console.log(`     default peramban   (menghormati Vary)  -> ${ringkas(v.denganDefaultPeramban)}`);
  }
}

const A = hasil[0], B = hasil[1], C = hasil[2];
console.log('\n' + garis);
const terkonfirmasi = A.bocor && !B.bocor;
if (terkonfirmasi) {
  console.log('TERKONFIRMASI di Chromium dengan Service Worker terdaftar sungguhan.');
  console.log('');
  console.log('  A  Bob menerima profil, email, dan role ALICE. IdP dihubungi hanya');
  console.log(`     ${A.hitIdpUntukProfil}x, jadi server tidak pernah punya kesempatan menolak permintaan Bob.`);
  console.log('  B  Endpoint yang sama tanpa "/api/" di path -> SW tidak ikut campur');
  console.log('     -> Bob menerima datanya sendiri.');
  console.log(`  C  IdP mengirim \`Vary: Authorization\` — pertahanan sisi server yang`);
  console.log(`     BENAR untuk kasus ini. Kebocoran ${C.bocor ? 'TETAP TERJADI' : 'tidak terjadi'}.`);
  const v = Object.values(C.ujiVary ?? {})[0];
  if (v) {
    console.log('     Sebabnya disematkan pada entri cache yang sama:');
    console.log(`       {ignoreVary:true} -> ${ringkas(v.denganIgnoreVaryTrue)}`);
    console.log(`       default peramban  -> ${ringkas(v.denganDefaultPeramban)}`);
    console.log('     ngsw memakai ignoreVary:true (generator.ts:207), di-hardcode dan');
    console.log("     tidak dapat dimatikan: tipe publiknya Pick<CacheQueryOptions,'ignoreSearch'>.");
  }
  console.log('');
  console.log('Developer memilih cache-first untuk `/api/**` MILIKNYA SENDIRI. Ia tidak');
  console.log('pernah mengonfigurasi apa pun untuk endpoint IdP. Pola path tanpa origin');
  console.log('binding itulah yang memperluas kebijakan caching yang disengaja ke');
  console.log('endpoint ber-otentikasi milik pihak ketiga.');
} else {
  console.log(`Tidak terkonfirmasi (A.bocor=${A.bocor}, B.bocor=${B.bocor}).`);
}
console.log(garis);
if (shot) console.log(`\nTangkapan layar: ${shot}`);

srvApp.close();
srvIdp.close();
process.exit(terkonfirmasi ? 0 : 1);
