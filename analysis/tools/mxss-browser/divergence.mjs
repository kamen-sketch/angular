import {chromium} from 'playwright';
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await browser.newPage();
await page.setContent('<body></body>');
await page.addScriptTag({path:path.join(__dirname,'sanitizer.js')});
const res=await page.evaluate(()=>{
  const targets=[
    ['mtext','<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>'],
    ['plaintext','<plaintext><img src=x onerror=alert(1)>'],
    ['annotation-xml','<math><annotation-xml encoding="text/html"><style><img src=x onerror=alert(1)></style></annotation-xml></math>'],
    ['svg style img','<svg><style><img src=x onerror=alert(1)></style></svg>'],
  ];
  function liveDanger(s){const d=document.createElement('div');d.innerHTML=s;return d.querySelectorAll('img[onerror]').length;}
  const out={};
  for(const [name,inp] of targets){
    let buggy,fixed,bthrew=false,fthrew=false;
    try{buggy=window.sanitizeHtml_BUGGY(inp);}catch(e){bthrew=true;buggy={out:'THREW: '+e.message,iterations:'-'};}
    try{fixed=window.sanitizeHtml_FIXED(inp);}catch(e){fthrew=true;fixed={out:'THREW: '+e.message,iterations:'-'};}
    out[name]={input:inp,
      buggyIters:buggy.iterations, buggyOut:buggy.out,
      fixedIters:fixed.iterations, fixedOut:fixed.out,
      differ:(bthrew||fthrew)?('control-flow: buggy '+(bthrew?'threw':'ok')+' / fixed '+(fthrew?'threw':'ok')):(buggy.out!==fixed.out),
      buggyOutLiveImgOnerror:bthrew?'-':liveDanger(buggy.out),
      fixedOutLiveImgOnerror:fthrew?'-':liveDanger(fixed.out)};
  }
  return out;
});
console.log(JSON.stringify(res,null,2));
await browser.close();
