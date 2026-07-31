/**
 * Angular Service Worker forces `ignoreVary: true` — standalone proof of concept.
 *
 * ENTIRELY SAME-ORIGIN. The endpoint under test lives on the application's own
 * origin and is deliberately covered by `dataGroups`, so there is no way to
 * attribute the caching to an over-broad cross-origin pattern.
 *
 * CLAIM
 *   Angular unconditionally generates `cacheQueryOptions.ignoreVary = true` and
 *   exposes no configuration option to disable it. Cached responses carrying
 *   `Vary: Authorization` can therefore be returned for later requests that
 *   carry a different `Authorization` header.
 *
 * TERMINOLOGY
 *   `Vary` does not mean "do not cache". It states that the representation is
 *   selected by the value of that request header, so a cache must take the
 *   header into account when matching. The Cache API default is
 *   `ignoreVary: false`, which is why the browser rejects Alice's response for
 *   Bob's request. Angular overrides that decision.
 *
 * TWO ARMS — only `ignoreVary` differs
 *   A  AS SHIPPED  manifest exactly as emitted by the Generator (ignoreVary: true)
 *   B  PATCHED     same manifest with cacheQueryOptions.ignoreVary = false,
 *                  i.e. what a fixed generator would emit
 *
 * Run:
 *   npm install
 *   node poc-f13.mjs [--shot evidence.png]
 */
import {createServer} from 'http';
import {readFileSync, globSync, existsSync} from 'fs';
import {createHash} from 'crypto';
import {join, dirname} from 'path';
import {pathToFileURL, fileURLToPath} from 'url';
import {createRequire} from 'module';

const HERE = dirname(fileURLToPath(import.meta.url));
const shotIndex = process.argv.indexOf('--shot');
const shot = shotIndex > 0 ? process.argv[shotIndex + 1] : null;

// Accept an explicit node_modules path, otherwise use the one next to this file.
const explicit = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null;
const nodeModules = explicit ?? join(HERE, 'node_modules');
if (!existsSync(join(nodeModules, '@angular/service-worker'))) {
  console.error(
    `@angular/service-worker not found under ${nodeModules}.\n` +
      `Run \`npm install\` in this directory first, or pass a node_modules path.`,
  );
  process.exit(2);
}

const {chromium} = createRequire(join(nodeModules, 'x.js'))('playwright');
const swDir = join(nodeModules, '@angular/service-worker');
const pkg = JSON.parse(readFileSync(join(swDir, 'package.json'), 'utf8'));
const {Generator} = await import(pathToFileURL(join(swDir, 'fesm2022/config.mjs')).href);

const INDEX = readFileSync(join(HERE, 'index-f13.html'), 'utf8');
const files = {'/index.html': INDEX};

// --------------------------------------------- manifest from the Generator --
const shippedManifest = await new Generator(
  {
    list: async () => Object.keys(files),
    read: async (p) => files[p],
    hash: async (p) => createHash('sha1').update(Buffer.from(files[p], 'utf8')).digest('hex'),
    write: async () => {},
  },
  '/',
).process({
  index: '/index.html',
  assetGroups: [{name: 'app', installMode: 'prefetch', resources: {files: ['/index.html']}}],
  dataGroups: [
    {
      // Deliberately covers /api/profile on the application's own origin.
      name: 'api',
      urls: ['/api/**'],
      cacheConfig: {strategy: 'performance', maxSize: 100, maxAge: '1d'},
    },
  ],
  navigationUrls: ['/**'],
});

// The "patched" manifest is exactly what a fixed generator would emit.
const patchedManifest = JSON.parse(JSON.stringify(shippedManifest));
patchedManifest.dataGroups[0].cacheQueryOptions = {
  ...patchedManifest.dataGroups[0].cacheQueryOptions,
  ignoreVary: false,
};

// ------------------------------------------------------- application server --
// A single origin. Nothing in this PoC is cross-origin.
const PROFILES = {
  ALICE: {name: 'Alice', email: 'alice@example.com', role: 'admin'},
  BOB: {name: 'Bob', email: 'bob@example.com', role: 'viewer'},
};
let activeManifest = shippedManifest;
let profileHits = 0;

const server = createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/ngsw-worker.js') {
    res.writeHead(200, {'Content-Type': 'text/javascript', 'Cache-Control': 'no-store'});
    res.end(readFileSync(join(swDir, 'ngsw-worker.js')));
    return;
  }
  if (u.pathname === '/ngsw.json') {
    res.writeHead(200, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'});
    res.end(JSON.stringify(activeManifest));
    return;
  }
  if (u.pathname === '/api/profile') {
    profileHits++;
    const bearer = (req.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
    res.writeHead(200, {
      'Content-Type': 'application/json',
      // The server correctly declares that this representation is selected by
      // the Authorization request header.
      Vary: 'Authorization',
      'Cache-Control': 'no-store',
    });
    res.end(JSON.stringify(PROFILES[bearer] ?? {name: 'anonymous', role: 'none'}));
    return;
  }
  if (u.pathname === '/index.html' || u.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store'});
    res.end(INDEX);
    return;
  }
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('not found');
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const APP = `http://localhost:${server.address().port}`;
const PROFILE_URL = APP + '/api/profile';

// ------------------------------------------------------------------- arms ---
const CHROME = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');

async function runArm({label, manifest, takeShot}) {
  activeManifest = manifest;
  const browser = await chromium.launch(CHROME.length ? {executablePath: CHROME[0]} : {});
  const ctx = await browser.newContext(); // clean Cache Storage + SW registration
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('   [pageerror]', e.message));

  await page.goto(APP + '/index.html', {waitUntil: 'load'});
  const ready = await page.evaluate(() => window.__registerSW());
  if (!ready.ok) {
    await browser.close();
    return {label, failed: ready.message};
  }

  const before = profileHits;
  // T0 — Alice signs in.
  const alice = await page.evaluate(([u]) => window.__request(u, 'ALICE'), [PROFILE_URL]);
  // T1 — Alice signs out. T2 — Bob signs in, SAME browser profile.
  const bob = await page.evaluate(([u]) => window.__request(u, 'BOB'), [PROFILE_URL]);
  const serverHits = profileHits - before;

  const probe = await page.evaluate(([u]) => window.__varyProbe(u), [PROFILE_URL]);
  const cacheQueryOptions = JSON.stringify(manifest.dataGroups[0].cacheQueryOptions);

  await page.evaluate(
    ([d]) => window.__report(d),
    [{url: PROFILE_URL, alice, bob, serverHits, probe, cacheQueryOptions}],
  );
  if (takeShot && shot) await page.screenshot({path: shot, fullPage: true});

  await browser.close();
  return {label, alice, bob, serverHits, probe, cacheQueryOptions, leaked: bob.body === alice.body};
}

const line = '='.repeat(78);
console.log(line);
console.log('Angular Service Worker forces ignoreVary: true');
console.log(`@angular/service-worker@${pkg.version}, unmodified ngsw-worker.js from npm`);
console.log(line);
console.log(`
SAME-ORIGIN. Nothing in this proof of concept is cross-origin.
  origin & endpoint : ${PROFILE_URL}
  dataGroups        : urls ['/api/**'] -> deliberately covers this endpoint
  strategy          : performance, maxAge 1d
  response header   : Vary: Authorization

  T0  Alice signs in -> GET /api/profile   Authorization: Bearer ALICE
  T1  Alice signs out
  T2  Bob signs in on the same browser profile
      GET the SAME URL                     Authorization: Bearer BOB`);

const A = await runArm({
  label: 'A  AS SHIPPED  (ignoreVary: true, straight from the Generator)',
  manifest: shippedManifest,
  takeShot: true,
});
const B = await runArm({
  label: 'B  PATCHED     (ignoreVary: false)',
  manifest: patchedManifest,
  takeShot: false,
});

for (const arm of [A, B]) {
  console.log('\n' + line);
  console.log(arm.label);
  console.log(line);
  if (arm.failed) {
    console.log(`  FAILED: ${arm.failed}`);
    continue;
  }
  const show = (x) => (x === null ? 'undefined' : x);
  console.log(`  manifest cacheQueryOptions        ${arm.cacheQueryOptions}`);
  console.log(`  server response header            Vary: ${arm.alice.vary}`);
  console.log(`  T0 Alice (Bearer ALICE) received  ${arm.alice.body}`);
  console.log(`  T2 Bob   (Bearer BOB)   received  ${arm.bob.body}`);
  console.log(`  requests that reached server      ${arm.serverHits}   (2 = normal, 1 = Bob from cache)`);
  if (arm.probe) {
    console.log(`  against the same cache entry (${arm.probe.cache}):`);
    console.log(`     cache.match(bobRequest)                     -> ${show(arm.probe.withBrowserDefault)}`);
    console.log(`     cache.match(bobRequest, {ignoreVary:true})  -> ${show(arm.probe.withIgnoreVaryTrue)}`);
  }
  console.log(`  => Bob received Alice's data?     ${arm.leaked ? '>>> YES' : 'no'}`);
}

const confirmed = A.leaked && !B.leaked && A.serverHits === 1 && B.serverHits === 2;
console.log('\n' + line);
if (confirmed) {
  console.log('CONFIRMED — same-origin, no cross-origin pattern involved.');
  console.log('');
  console.log('  The server correctly declares that this representation is selected by the');
  console.log('  Authorization request header. The browser’s default cache matching');
  console.log('  therefore rejects Alice’s response for Bob’s request — visible directly on');
  console.log('  the same cache entry: cache.match(bobRequest) returns undefined.');
  console.log('');
  console.log('  Angular overrides that decision with ignoreVary: true, and Bob’s request');
  console.log('  never reaches the server (1 request, not 2).');
  console.log('');
  console.log('  With ignoreVary: false — what a fixed generator would emit — Bob’s request');
  console.log('  reaches the network and he receives his own data (2 requests).');
  console.log('');
  console.log('  generator.ts:203-210    ignoreVary: true is hardcoded');
  console.log("  config/src/in.ts:44,64  Pick<CacheQueryOptions, 'ignoreSearch'>");
  console.log('                          -> applications have no way to select false');
} else {
  console.log(
    `NOT confirmed (A.leaked=${A.leaked} B.leaked=${B.leaked} ` +
      `A.hits=${A.serverHits} B.hits=${B.serverHits}).`,
  );
}
console.log(line);
if (shot) console.log(`\nScreenshot (arm A): ${shot}`);

server.close();
process.exit(confirmed ? 0 : 1);
