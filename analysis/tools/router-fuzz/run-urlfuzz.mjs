import http from 'http';
import fs from 'fs';
import path from 'path';
import {chromium} from 'playwright';
const ROOT='/tmp/claude-0/-home-user-angular/6dfb30ce-dc86-5a77-b4e3-199a6ce5b187/scratchpad';
const MIME={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.json':'application/json'};
// rxjs ESM mengimpor tanpa ekstensi ('./internal/Observable'), yang ditolak
// peramban. Server ini meniru resolusi Node: coba apa adanya, lalu +.js, lalu
// /index.js.
function resolve(p){
  for(const c of [p, p+'.js', path.join(p,'index.js')]){
    try{ if(fs.statSync(c).isFile()) return c; }catch{}
  }
  return null;
}
const miss=new Set();
const srv=http.createServer((req,res)=>{
  const raw=path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  const p=resolve(raw);
  if(!p){ miss.add(req.url); res.writeHead(404); res.end('nf'); return; }
  fs.readFile(p,(e,d)=>{
    if(e){miss.add(req.url);res.writeHead(404);res.end('nf');return;}
    res.writeHead(200,{'Content-Type':MIME[path.extname(p)]||'text/javascript'});
    res.end(d);
  });
});
globalThis.__miss=miss;
await new Promise(r=>srv.listen(0,r));
const port=srv.address().port;
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:2});
const errs=[];
page.on('pageerror',e=>errs.push(e.message));
page.on('console',m=>{if(m.type()==='error')errs.push('[console] '+m.text());});
await page.goto(`http://localhost:${port}/router-fuzz/fuzz-url.html`,{waitUntil:'load'});
await page.waitForFunction('window.__URLFUZZ__!==undefined',{timeout:600000}).catch(()=>{});
const r=await page.evaluate(()=>window.__URLFUZZ__??null);
console.log('HASIL:',JSON.stringify(r));
console.log('ERRORS:',errs.slice(0,3).join(' | ')||'(none)');
console.log('404 unik:',[...globalThis.__miss].slice(0,8).join(', ')||'(none)');
await page.screenshot({path:path.join(ROOT,'router-fuzz','url-fuzz-proof.png'),fullPage:true});
console.log('screenshot -> real-npm-proof.png');
await browser.close();srv.close();
