import http from 'http'; import fs from 'fs'; import path from 'path';
import {chromium} from 'playwright';
const ROOT='/tmp/claude-0/-home-user-angular/6dfb30ce-dc86-5a77-b4e3-199a6ce5b187/scratchpad';
const MIME={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript'};
function res_(p){for(const c of [p,p+'.js',path.join(p,'index.js')]){try{if(fs.statSync(c).isFile())return c}catch{}}return null}
const srv=http.createServer((req,res)=>{
  if(req.url.startsWith('/echo')){res.writeHead(200,{'Content-Type':'application/json'});res.end('{"ok":true}');return;}
  const f=res_(path.join(ROOT,decodeURIComponent(req.url.split('?')[0])));
  if(!f){res.writeHead(404);res.end('nf');return;}
  res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/javascript'});res.end(fs.readFileSync(f));
});
await new Promise(r=>srv.listen(0,r)); const port=srv.address().port;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await b.newPage();
const errs=[]; page.on('pageerror',e=>errs.push(e.message));
await page.goto(`http://localhost:${port}/router-fuzz/proto.html`,{waitUntil:'load'});
await page.waitForFunction('window.__PROTO__!==undefined',{timeout:25000}).catch(()=>{});
const r=await page.evaluate(()=>window.__PROTO__??null);
console.log(JSON.stringify(r,null,1));
console.log('pageerror:',errs.slice(0,2).join(' | ')||'(none)');
await b.close(); srv.close();
