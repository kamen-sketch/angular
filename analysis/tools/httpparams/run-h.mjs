import http from 'http'; import fs from 'fs'; import path from 'path';
import {chromium} from 'playwright';
const ROOT='/tmp/claude-0/-home-user-angular/6dfb30ce-dc86-5a77-b4e3-199a6ce5b187/scratchpad';
const MIME={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript'};
function r_(p){for(const c of [p,p+'.js',path.join(p,'index.js')]){try{if(fs.statSync(c).isFile())return c}catch{}}return null}
const srv=http.createServer((q,s)=>{const f=r_(path.join(ROOT,decodeURIComponent(q.url.split('?')[0])));if(!f){s.writeHead(404);s.end('nf');return}s.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/javascript'});s.end(fs.readFileSync(f))});
await new Promise(r=>srv.listen(0,r));const port=srv.address().port;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(`http://localhost:${port}/httpparams.html`,{waitUntil:'load'});
await p.waitForFunction('window.__H__!==undefined',{timeout:20000}).catch(()=>{});
console.log(JSON.stringify(await p.evaluate(()=>window.__H__??null),null,1));
console.log('pageerror:',errs.slice(0,2).join(' | ')||'(none)');
await b.close();srv.close();
