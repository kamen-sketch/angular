import {chromium} from 'playwright';
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await browser.newPage();
await page.setContent('<body></body>');
await page.addScriptTag({path:path.join(__dirname,'sanitizer.js')});
const res=await page.evaluate(()=>{
  // Broad battery: does the BUGGY sanitizer's OUTPUT, when reparsed by the
  // browser (as app does on el.innerHTML=S), ever change? If output is always
  // a fixed point, the loop bug has no security impact. If not -> real mXSS.
  const battery=[
    '<plaintext><img src=x onerror=alert(1)>',
    '<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>',
    '<svg><style><img src=x onerror=alert(1)></style></svg>',
    '<math><annotation-xml encoding="text/html"><style><img src=x onerror=alert(1)></style></annotation-xml></math>',
    '<noscript><p title="</noscript><img src=x onerror=alert(1)>">',
    '<select><option><style></option></select><img src=x onerror=alert(1)>',
    '<xmp><img src=x onerror=alert(1)>',
    '<table><td><svg><style><img src=x onerror=alert(1)></style>',
    '<svg><foreignObject><math><mtext><style><img src=x onerror=alert(1)>',
    '<form><math><mtext></form><mglyph><style><img src=x onerror=alert(1)>',
    '<a href="&#x3000;javascript:alert(1)">x</a>',
    '<div><svg><p><style><img src=x onerror=alert(1)>',
  ];
  function f(html){html='<body><remove></remove>'+html;const b=new DOMParser().parseFromString(html,'text/html').body;b.firstChild&&b.firstChild.remove();return b.innerHTML;}
  function liveImgOnerror(s){const d=document.createElement('div');d.innerHTML=s;return d.querySelectorAll('img[onerror],*[onerror],script').length;}
  const rows=[];
  let anyOutputUnstable=false, anyLiveDanger=false;
  for(const inp of battery){
    let out,threw=false;
    try{out=window.sanitizeHtml_BUGGY(inp).out;}catch(e){threw=true;out='THREW';}
    if(threw){rows.push({inp,note:'buggy threw'});continue;}
    const reparsed=f(out);
    const outputStable=(reparsed===out);
    const danger=liveImgOnerror(out);
    if(!outputStable)anyOutputUnstable=true;
    if(danger>0)anyLiveDanger=true;
    rows.push({inp, buggyOut:out, outputStable, reparsedOut:outputStable?'(same)':reparsed, liveDangerNodes:danger});
  }
  return {anyOutputUnstable, anyLiveDanger, rows};
});
console.log(JSON.stringify(res,null,2));
await browser.close();
