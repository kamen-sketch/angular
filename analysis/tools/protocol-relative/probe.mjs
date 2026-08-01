/**
 * F-22 — bahaya URL protokol-relatif ("//host") dijaga di DUA dari TIGA tempat
 * ia bisa muncul. Yang ketiga adalah sisi serialisasi + joinWithSlash.
 *
 * ASAL PERTANYAANNYA. Router menuliskan bahaya ini sendiri, lengkap dengan
 * alasannya, di sisi PARSE:
 *
 *     packages/router/src/url_tree.ts  parseRootSegment()
 *       // Consume all leading slashes. Multiple consecutive leading slashes
 *       // (e.g. `///path`) are not meaningful and would otherwise produce a
 *       // `//path`-style serialized URL, which browsers interpret as
 *       // protocol-relative (resolving to a different origin) and reject with
 *       // a SecurityError when passed to `history.pushState`/`replaceState`.
 *       while (this.consumeOptional('/')) {}
 *
 * Pertanyaan yang dibawa ke paket lain: apakah penjaga yang sama ada di jalur
 * KELUARnya? `prepareExternalUrl` — yang mengisi atribut `href` RouterLink dan
 * memberi makan `pushState` — seluruhnya adalah `joinWithSlash`:
 *
 *     packages/common/src/location/location_strategy.ts:152
 *       override prepareExternalUrl(internal) {
 *         return joinWithSlash(this._baseHref, internal);
 *       }
 *
 *     packages/common/src/location/util.ts  joinWithSlash()
 *       if (!start) return end;                                  <- lolos apa adanya
 *       if (start.endsWith('/'))
 *         return end.startsWith('/') ? start + end.slice(1) : start + end;
 *
 * Dengan baseHref '' atau '/' — keduanya lazim — "//host" lewat utuh.
 *
 * YANG MEMBUAT INI LAYAK DICATAT adalah dua KONTROL POSITIFNYA: bahaya yang
 * sama sudah dijaga di dua tempat lain (parse, dan jalur commands). Kalau
 * hanya satu tempat yang menjaga, "ini memang disengaja" masih masuk akal.
 * Dengan dua dari tiga dijaga, tempat ketiga lebih mirip kelalaian.
 *
 * DAN SAYA TIDAK MENGKLAIM LEBIH DARI ITU — lihat bagian KETERJANGKAUAN:
 * jalur normal (router.navigate dengan commands) TERBUKTI aman di sini.
 *
 * Jalankan: node analysis/tools/protocol-relative/probe.mjs <path-node_modules>
 */
import {readFileSync, globSync} from 'fs';
import {join} from 'path';
import {pathToFileURL} from 'url';
import {createRequire} from 'module';
import http from 'http';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node probe.mjs <path-ke-node_modules>');
  process.exit(2);
}
const M = (p) => pathToFileURL(join(nm, p)).href;
await import(M('@angular/compiler/fesm2022/compiler.mjs'));
const common = await import(M('@angular/common/fesm2022/common.mjs'));
const router = await import(M('@angular/router/fesm2022/router.mjs'));
const vCommon = JSON.parse(readFileSync(join(nm, '@angular/common/package.json'), 'utf8')).version;
const vRouter = JSON.parse(readFileSync(join(nm, '@angular/router/package.json'), 'utf8')).version;

const {Location} = common;
const {DefaultUrlSerializer, UrlTree, UrlSegment, UrlSegmentGroup, createUrlTreeFromSnapshot} =
  router;
const ser = new DefaultUrlSerializer();
const joinWithSlash = Location.joinWithSlash; // API PUBLIK, isi prepareExternalUrl

const line = '='.repeat(78);
const protoRel = (s) => /^\/\/+/.test(s);

console.log(line);
console.log(`F-22 — URL protokol-relatif; @angular/common@${vCommon}, @angular/router@${vRouter}`);
console.log(line);

// ---------------------------------------------------------------------------
console.log('\n[1] joinWithSlash(baseHref, url) — isi prepareExternalUrl, API publik\n');
const BASE = ['', '/', '/app', '/app/'];
const URL_IN = ['/x', '//evil.test/x', '///evil.test/x'];
const tabel1 = [];
console.log('      baseHref    url                  hasil');
for (const b of BASE) {
  for (const u of URL_IN) {
    const r = joinWithSlash(b, u);
    const buruk = protoRel(r);
    tabel1.push({b, u, r, buruk});
    console.log(
      `  ${buruk ? '>>' : '  '}${JSON.stringify(b).padEnd(10)}  ${JSON.stringify(u).padEnd(20)} ` +
        `${JSON.stringify(r).padEnd(22)}${buruk ? 'PROTOKOL-RELATIF' : ''}`,
    );
  }
}
console.log('\n  Perhatikan baris "/app": baseHref yang tidak kosong MENETRALKAN "//",');
console.log('  karena hasilnya jadi berawalan satu garis miring. Jadi yang berbahaya');
console.log('  justru baseHref default — "" dan "/".');

// ---------------------------------------------------------------------------
console.log('\n[2] KONTROL POSITIF — bahaya yang sama, dijaga di dua tempat lain\n');
console.log('  (a) sisi PARSE  parseRootSegment() membuang semua garis miring awal:');
const parseRows = [];
for (const u of ['//evil.test/x', '///evil.test/x', '/x']) {
  const out = ser.serialize(ser.parse(u));
  parseRows.push({u, out, aman: !protoRel(out)});
  console.log(`        parse(${JSON.stringify(u).padEnd(18)}) -> ${JSON.stringify(out)}`);
}
console.log('\n  (b) jalur COMMANDS  computeNavigation() membuang bagian kosong di indeks 0:');
const rootSnap = {
  _urlSegment: new UrlSegmentGroup([], {}),
  _lastPathIndex: -1,
  parent: null,
  url: [],
  outlet: 'primary',
  children: [],
};
rootSnap.pathFromRoot = [rootSnap];
rootSnap.root = rootSnap;
const cmdRows = [];
for (const cmds of [['', 'x'], ['//evil.test'], ['/', 'x'], ['a', ''], ['x']]) {
  let out;
  try {
    out = ser.serialize(createUrlTreeFromSnapshot(rootSnap, cmds));
  } catch (e) {
    out = 'THREW ' + e.message.slice(0, 40);
  }
  cmdRows.push({cmds, out, aman: !protoRel(out)});
  console.log(`        createUrlTree(${JSON.stringify(cmds).padEnd(18)}) -> ${JSON.stringify(out)}`);
}

// ---------------------------------------------------------------------------
console.log('\n[3] Sisi SERIALISASI — tidak ada penjaga setara\n');
const mk = (paths) =>
  new UrlTree(
    new UrlSegmentGroup([], {
      primary: new UrlSegmentGroup(
        paths.map((p) => new UrlSegment(p, {})),
        {},
      ),
    }),
    {},
    null,
  );
const serRows = [];
for (const paths of [['x'], ['', 'x'], ['a', '']]) {
  const out = ser.serialize(mk(paths));
  const buruk = protoRel(out);
  serRows.push({paths, out, buruk});
  console.log(
    `  ${buruk ? '>>' : '  '}UrlTree dgn segmen ${JSON.stringify(paths).padEnd(12)} -> ` +
      `serialize ${JSON.stringify(out).padEnd(8)}${buruk ? 'PROTOKOL-RELATIF' : ''}`,
  );
}
console.log('\n  UrlTree/UrlSegment/UrlSegmentGroup adalah API PUBLIK, dan RouterLink');
console.log('  serta navigateByUrl menerima UrlTree secara langsung.');

// ---------------------------------------------------------------------------
console.log('\n[4] Perilaku peramban sebenarnya (Chromium) — apa akibatnya\n');
const {chromium} = createRequire(join(nm, 'x.js'))('playwright');
const srv = http.createServer((q, r) => {
  r.writeHead(200, {'content-type': 'text/html'});
  r.end('<h1>app</h1>');
});
await new Promise((res) => srv.listen(0, '127.0.0.1', res));
const port = srv.address().port;
const CH = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');
const browser = await chromium.launch(CH.length ? {executablePath: CH[0]} : {});
const page = await browser.newPage();
await page.goto(`http://127.0.0.1:${port}/app`);
const bro = await page.evaluate(() => {
  const res = {origin: location.origin, href: {}, push: {}};
  const a = document.createElement('a');
  for (const h of ['/x', '//evil.test/x', '///evil.test/x', '/app//evil.test']) {
    a.setAttribute('href', h);
    res.href[h] = a.href;
  }
  for (const u of ['/x', '//evil.test/x']) {
    try {
      history.pushState(null, '', u);
      res.push[u] = 'ok -> ' + location.href;
    } catch (e) {
      res.push[u] = e.name;
    }
  }
  return res;
});
await browser.close();
srv.close();

const asalUji = new URL(bro.origin);
console.log(`  origin halaman uji: ${bro.origin}\n`);
console.log('  sebagai <a href> (jalur RouterLink):');
let lintasOrigin = 0;
for (const [k, v] of Object.entries(bro.href)) {
  const lintas = !v.startsWith(bro.origin);
  if (lintas) lintasOrigin++;
  console.log(`    ${lintas ? '>>' : '  '}${k.padEnd(20)} -> ${v}${lintas ? '   LINTAS ORIGIN' : ''}`);
}
console.log('\n  sebagai history.pushState (jalur Location.go):');
for (const [k, v] of Object.entries(bro.push)) {
  console.log(`    ${v.includes('Error') ? '>>' : '  '}${k.padEnd(20)} -> ${v}`);
}

// ---------------------------------------------------------------------------
const joinBocor = tabel1.filter((r) => r.buruk);
const parseAman = parseRows.every((r) => r.aman);
const cmdAman = cmdRows.every((r) => r.aman);
const serBocor = serRows.filter((r) => r.buruk);
const baseNonKosongAman = tabel1.filter((r) => r.b.startsWith('/a')).every((r) => !r.buruk);

console.log('\n' + line);
console.log(
  `joinWithSlash meloloskan "//": ${joinBocor.length}/${tabel1.length}   ` +
    `parse dijaga: ${parseAman}   commands dijaga: ${cmdAman}   ` +
    `serialize bocor: ${serBocor.length}   lintas-origin di peramban: ${lintasOrigin}`,
);

const ok =
  joinBocor.length > 0 && parseAman && cmdAman && serBocor.length > 0 && lintasOrigin > 0 &&
  baseNonKosongAman;

if (ok) {
  console.log('');
  console.log('TERKONFIRMASI sebagai CELAH PERTAHANAN-BERLAPIS — dan BUKAN lebih dari itu.');
  console.log('');
  console.log('Yang terbukti:');
  console.log('  - Bahaya "//" dijaga di sisi PARSE dan di jalur COMMANDS (dua kontrol');
  console.log('    positif). Jadi proyek ini memang menganggapnya bahaya.');
  console.log('  - Tidak dijaga di sisi SERIALISASI maupun di joinWithSlash, padahal');
  console.log('    joinWithSlash-lah seluruh isi prepareExternalUrl.');
  console.log('  - Peramban memang memperlakukan "//host" sebagai origin LAIN pada href,');
  console.log('    dan menolak pushState dengan SecurityError — persis seperti yang');
  console.log('    ditulis komentar penjaga di sisi parse.');
  console.log('');
  console.log('Yang TIDAK saya klaim:');
  console.log('  - Jalur normal TIDAK terpengaruh. router.navigate([...]) dengan commands');
  console.log('    string terbukti aman di bagian [2b], termasuk ["//evil.test"].');
  console.log('  - Untuk mencapainya aplikasi harus membangun UrlTree sendiri dengan');
  console.log('    segmen pertama kosong, atau memanggil Location.go/prepareExternalUrl');
  console.log('    dengan path berawalan "//". Keduanya jalur yang jarang.');
  console.log('  - Karena itu ini catatan PENGERASAN, bukan kerentanan yang ditunjukkan.');
  console.log('');
  console.log('Perbaikan: terapkan penjaga yang SUDAH ADA di sisi keluar — runtuhkan');
  console.log('garis miring awal yang beruntun di joinWithSlash, tempat baseHref dan');
  console.log('path bertemu dan satu-satunya tempat hasil akhirnya terlihat.');
} else {
  console.log('Tidak terkonfirmasi.');
}
console.log(line);
process.exit(ok ? 0 : 1);
