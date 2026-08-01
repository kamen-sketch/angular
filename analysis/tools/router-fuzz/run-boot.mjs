import http from 'http'; import fs from 'fs'; import path from 'path';
import {chromium} from 'playwright';
const ROOT='/tmp/claude-0/-home-user-angular/6dfb30ce-dc86-5a77-b4e3-199a6ce5b187/scratchpad';
const MIME={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript'};
function resolve(p){for(const c of [p,p+'.js',path.join(p,'index.js')]){try{if(fs.statSync(c).isFile())return c;}catch{}}return null;}
const diterima=[];
const srv=http.createServer((req,res)=>{
  const u=decodeURIComponent(req.url.split('?')[0]);
  const f=resolve(path.join(ROOT,u));
  if(f && !u.endsWith('/')){res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/javascript'});res.end(fs.readFileSync(f));return;}
  // fallback ala SPA: path apa pun -> boot.html (persis perilaku server SPA/SSR)
  diterima.push(req.url);
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(fs.readFileSync(path.join(ROOT,'router-fuzz','boot.html')));
});
await new Promise(r=>srv.listen(0,r)); const port=srv.address().port;
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
for(const target of ['/admin','/admin)EVIL','/admin)"><img src=x onerror=alert(1)>','/admin)?q=EVIL#frag']){
  const page=await browser.newPage();
  diterima.length=0;
  await page.goto('http://localhost:'+port+target,{waitUntil:'load'});
  await page.waitForFunction('window.__BOOT__!==undefined',{timeout:20000}).catch(()=>{});
  const r=await page.evaluate(()=>window.__BOOT__??null);
  console.log('=== MUAT LANGSUNG:',JSON.stringify(target));
  console.log('  server menerima :',JSON.stringify(diterima[0]));
  if(r){
    console.log('  location SEBELUM boot:',JSON.stringify(r.sebelum));
    console.log('  location SESUDAH boot:',JSON.stringify(r.sesudah));
    console.log('  router.url:',r.routerUrl,'| rute:',r.rute);
    console.log('  guard:',JSON.stringify(r.guard));
    console.log('  DOM:',JSON.stringify(r.domTeks));
  } else console.log('  (gagal boot)');
  console.log();
  await page.close();
}
await browser.close(); srv.close();
