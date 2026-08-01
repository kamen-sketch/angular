// Replikasi tagSet/merge dari html_sanitizer.ts:18-32 (memakai {} biasa)
function tagSet(tags){const res={};for(const t of tags.split(','))res[t]=true;return res;}
function merge(...sets){const res={};for(const s of sets)for(const v in s)if(s.hasOwnProperty(v))res[v]=true;return res;}
const URI_ATTRS=tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
const HTML_ATTRS=tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,class,cols,colspan,height,hidden,id,lang,rel,role,rows,sizes,span,srcset,start,style,target,title,type,value,width');
const ARIA_ATTRS=tagSet('aria-label,aria-hidden');
const VALID_ATTRS=merge(URI_ATTRS,HTML_ATTRS,ARIA_ATTRS);

const protoNames=['constructor','toString','valueOf','hasOwnProperty','isPrototypeOf',
  'propertyIsEnumerable','toLocaleString','__proto__','__defineGetter__','__lookupGetter__'];

console.log('nama atribut        | hasOwnProperty (baris 824) | akses bracket (baris 841)');
console.log('-'.repeat(76));
let bypass=0;
for(const n of protoNames){
  const own=VALID_ATTRS.hasOwnProperty(n);
  const bracket=!!VALID_ATTRS[n];
  if(!own && bracket) bypass++;
  console.log(n.padEnd(20)+'| '+String(own).padEnd(26)+'| '+bracket+(!own&&bracket?'   <-- LOLOS':''));
}
console.log('-'.repeat(76));
console.log('Jumlah nama yang menembus gate baris 841 tapi ditolak baris 824:',bypass);
console.log();
console.log('Apakah ada nama prototipe yang JUGA atribut HTML berbahaya?');
const dangerous=['onerror','onload','href','src','srcdoc','formaction','action','data','style'];
console.log('  nama berbahaya yang ada di rantai prototipe:',
  dangerous.filter(d=>!VALID_ATTRS.hasOwnProperty(d)&&!!VALID_ATTRS[d]).join(', ')||'(tidak ada)');
