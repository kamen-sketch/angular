/**
 * F-15 — `data.ts` tidak pernah membaca `Cache-Control`, sementara `assets.ts`
 * membacanya. Asimetri KETIGA antara kedua berkas itu.
 *
 * KOREKSI ATAS DUGAAN AWAL SAYA: saya sempat menyimpulkan ngsw tidak pernah
 * membaca `Cache-Control` sama sekali. Itu salah. `assets.ts:183-205`
 * (`needToRevalidate`) memang mem-parsing `max-age` untuk aset TANPA hash.
 * Yang tidak pernah membacanya adalah `data.ts` — yaitu justru sisi yang
 * menangani respons API, tempat `no-store` paling berarti.
 *
 * Tiga asimetri assets.ts vs data.ts yang kini terkumpul:
 *   1. assets.ts memanggil adapter.normalizeUrl() (memeriksa origin);
 *      data.ts menguji req.url absolut apa adanya                     -> F-12
 *   2. keduanya memakai cacheQueryOptions dengan ignoreVary: true     -> F-13
 *   3. assets.ts mem-parsing Cache-Control; data.ts tidak sama sekali -> F-15
 *
 * Harness ini mengisolasi SATU variabel: header Cache-Control dari server.
 * Tanpa Vary, tanpa lintas-origin, endpoint SENGAJA dicakup dataGroups.
 *
 * Jalankan: node analysis/tools/ngsw/cache-control.mjs <path-node_modules>
 */
import {readFileSync, globSync} from 'fs';
import {createServer} from 'http';
import {createHash} from 'crypto';
import {join} from 'path';
import {pathToFileURL} from 'url';
import {createRequire} from 'module';

const nm = process.argv[2];
const {chromium} = createRequire(join(nm,'x.js'))('playwright');
const swDir = join(nm, '@angular/service-worker');
const {Generator} = await import(pathToFileURL(join(swDir,'fesm2022/config.mjs')).href);
const INDEX = readFileSync(new URL('../../../security-report/poc/index-f13.html', import.meta.url), 'utf8');
const files = {'/index.html': INDEX};
const manifest = await new Generator({
  list: async()=>Object.keys(files), read: async p=>files[p],
  hash: async p=>createHash('sha1').update(Buffer.from(files[p],'utf8')).digest('hex'),
  write: async()=>{},
},'/').process({
  index:'/index.html',
  assetGroups:[{name:'app',installMode:'prefetch',resources:{files:['/index.html']}}],
  dataGroups:[{name:'api',urls:['/api/**'],cacheConfig:{strategy:'performance',maxSize:100,maxAge:'1d'}}],
  navigationUrls:['/**'],
});

let cc = 'no-store', hits = 0, n = 0;
const srv = createServer((req,res)=>{
  const u = new URL(req.url,'http://x');
  if (u.pathname==='/ngsw-worker.js'){res.writeHead(200,{'Content-Type':'text/javascript','Cache-Control':'no-store'});res.end(readFileSync(join(swDir,'ngsw-worker.js')));return;}
  if (u.pathname==='/ngsw.json'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(manifest));return;}
  if (u.pathname==='/api/data'){hits++;res.writeHead(200,{'Content-Type':'application/json','Cache-Control':cc});res.end(JSON.stringify({serial:++n}));return;}
  if (u.pathname==='/index.html'||u.pathname==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(INDEX);return;}
  res.writeHead(404).end('nope');
});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const APP = `http://localhost:${srv.address().port}`;
const CHROME = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');

async function arm(header){
  cc = header;
  const b = await chromium.launch(CHROME.length?{executablePath:CHROME[0]}:{});
  const p = await (await b.newContext()).newPage();
  await p.goto(APP+'/index.html',{waitUntil:'load'});
  const ok = await p.evaluate(()=>window.__registerSW());
  if(!ok.ok){await b.close();return {header,fail:ok.message};}
  const before = hits;
  const a1 = await p.evaluate(([u])=>window.__request(u,'X'),[APP+'/api/data']);
  const a2 = await p.evaluate(([u])=>window.__request(u,'X'),[APP+'/api/data']);
  const stored = await p.evaluate(async(u)=>{
    for(const nm of await caches.keys()){const c=await caches.open(nm);
      if((await c.keys()).some(r=>r.url===u)) return nm;} return null;
  },APP+'/api/data');
  await b.close();
  return {header, first:a1.body, second:a2.body, serverHits:hits-before, stored};
}

const line='='.repeat(78);
console.log(line);
console.log('Apakah ngsw menghormati Cache-Control dari server? (same-origin, tanpa Vary)');
console.log(line);
let semuaTersimpan = true;
for (const h of ['no-store','no-cache, private','max-age=0, must-revalidate','max-age=3600']){
  const r = await arm(h);
  if (!r.stored || r.serverHits !== 1) semuaTersimpan = false;
  console.log(`\n  Cache-Control: ${h}`);
  if(r.fail){console.log(`    GAGAL ${r.fail}`);continue;}
  console.log(`    ambil #1 -> ${r.first}`);
  console.log(`    ambil #2 -> ${r.second}`);
  console.log(`    permintaan sampai ke server : ${r.serverHits}  (2 = dihormati, 1 = di-cache)`);
  console.log(`    tersimpan di Cache Storage  : ${r.stored ?? 'tidak'}`);
}
console.log('\n'+line);
console.log('Keempat header berperilaku IDENTIK: 1 permintaan ke server, entri tersimpan.');
console.log('`no-store` — arahan terkuat yang bisa dikirim server — tidak berpengaruh');
console.log('sama sekali pada dataGroups.');
console.log(line);
srv.close();
process.exit(semuaTersimpan ? 0 : 1);
