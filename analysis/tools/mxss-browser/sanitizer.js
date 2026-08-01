"use strict";

// =====================================================================
// VERBATIM PORT of packages/core/src/sanitization/inert_body.ts
// (DOMParserHelper strategy — the one Chromium uses)
// =====================================================================
function getInertBodyElement(html) {
  html = '<body><remove></remove>' + html;
  try {
    const body = new window.DOMParser().parseFromString(html, 'text/html').body;
    if (body === null) return null;
    body.firstChild && body.firstChild.remove();
    return body;
  } catch { return null; }
}

// =====================================================================
// VERBATIM PORT of the constants + SanitizingHtmlSerializer
// from packages/core/src/sanitization/html_sanitizer.ts
// =====================================================================
function tagSet(tags){const r={};for(const t of tags.split(','))r[t]=true;return r;}
function merge(...sets){const r={};for(const s of sets)for(const v in s)if(s.hasOwnProperty(v))r[v]=true;return r;}
const VOID_ELEMENTS=tagSet('area,br,col,hr,img,wbr');
const OPTIONAL_END_TAG_BLOCK_ELEMENTS=tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
const OPTIONAL_END_TAG_INLINE_ELEMENTS=tagSet('rp,rt');
const OPTIONAL_END_TAG_ELEMENTS=merge(OPTIONAL_END_TAG_INLINE_ELEMENTS,OPTIONAL_END_TAG_BLOCK_ELEMENTS);
const BLOCK_ELEMENTS=merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS,tagSet('address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'));
const INLINE_ELEMENTS=merge(OPTIONAL_END_TAG_INLINE_ELEMENTS,tagSet('a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'));
const VALID_ELEMENTS=merge(VOID_ELEMENTS,BLOCK_ELEMENTS,INLINE_ELEMENTS,OPTIONAL_END_TAG_ELEMENTS);
const URI_ATTRS=tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
const HTML_ATTRS=tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width');
const ARIA_ATTRS=tagSet('aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext');
const VALID_ATTRS=merge(URI_ATTRS,HTML_ATTRS,ARIA_ATTRS);
const SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS=tagSet('script,style,template');

const SAFE_URL_PATTERN=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function _sanitizeUrl(url){url=String(url);if(url.match(SAFE_URL_PATTERN))return url;return 'unsafe:'+url;}

const SURROGATE_PAIR_REGEXP=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
const NON_ALPHANUMERIC_REGEXP=/([^\#-~ |!])/g;
function encodeEntities(value){
  return value.replace(/&/g,'&amp;')
    .replace(SURROGATE_PAIR_REGEXP,function(m){const hi=m.charCodeAt(0),low=m.charCodeAt(1);return '&#'+((hi-0xd800)*0x400+(low-0xdc00)+0x10000)+';';})
    .replace(NON_ALPHANUMERIC_REGEXP,function(m){return '&#'+m.charCodeAt(0)+';';})
    .replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function getNodeName(node){const n=node.nodeName;return typeof n==='string'?n:'FORM';}
function getTemplateContent(el){return 'content' in el && el.nodeType===Node.ELEMENT_NODE && el.nodeName==='TEMPLATE'?el.content:null;}

class SanitizingHtmlSerializer{
  constructor(){this.sanitizedSomething=false;this.buf=[];}
  sanitizeChildren(el){
    let current=el.firstChild;let traverseContent=true;let parentNodes=[];
    while(current){
      if(current.nodeType===Node.ELEMENT_NODE){traverseContent=this.startElement(current);}
      else if(current.nodeType===Node.TEXT_NODE){this.chars(current.nodeValue);}
      else{this.sanitizedSomething=true;}
      if(traverseContent && current.firstChild){parentNodes.push(current);current=current.firstChild;continue;}
      while(current){
        if(current.nodeType===Node.ELEMENT_NODE){this.endElement(current);}
        let next=current.nextSibling;
        if(next){current=next;break;}
        current=parentNodes.pop();
      }
    }
    return this.buf.join('');
  }
  startElement(element){
    const tagName=getNodeName(element).toLowerCase();
    if(!VALID_ELEMENTS.hasOwnProperty(tagName)){this.sanitizedSomething=true;return !SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS.hasOwnProperty(tagName);}
    this.buf.push('<');this.buf.push(tagName);
    const elAttrs=element.attributes;
    for(let i=0;i<elAttrs.length;i++){
      const elAttr=elAttrs.item(i);const attrName=elAttr.name;const lower=attrName.toLowerCase();
      if(!VALID_ATTRS.hasOwnProperty(lower)){this.sanitizedSomething=true;continue;}
      let value=elAttr.value;
      if(URI_ATTRS[lower])value=_sanitizeUrl(value);
      this.buf.push(' ',attrName,'="',encodeEntities(value),'"');
    }
    this.buf.push('>');return true;
  }
  endElement(current){
    const tagName=getNodeName(current).toLowerCase();
    if(VALID_ELEMENTS.hasOwnProperty(tagName)&&!VOID_ELEMENTS.hasOwnProperty(tagName)){this.buf.push('</');this.buf.push(tagName);this.buf.push('>');}
  }
  chars(chars){this.buf.push(encodeEntities(chars));}
}

// =====================================================================
// f = one parse+serialize round (the operation the loop iterates)
// =====================================================================
function f(html){const b=getInertBodyElement(html);return b?b.innerHTML:'';}

// True number of rounds needed to reach a DOM fixed point (uncapped-ish).
function roundsToFixedPoint(H0,cap=20){
  let cur=H0,n=0;
  while(n<cap){const nxt=f(cur);n++;if(nxt===cur)return{rounds:n,stable:cur};cur=nxt;}
  return{rounds:Infinity,stable:cur};
}

// =====================================================================
// VERBATIM the BUGGY loop from html_sanitizer.ts:304-346, instrumented.
// Returns the final sanitized string AND the iteration count.
// =====================================================================
function sanitizeHtml_BUGGY(unsafeHtmlInput){
  let inertBodyElement=null;
  let iterations=0;
  try{
    let unsafeHtml=unsafeHtmlInput?String(unsafeHtmlInput):'';
    inertBodyElement=getInertBodyElement(unsafeHtml);
    let mXSSAttempts=5;
    let parsedHtml=unsafeHtml;
    do{
      if(mXSSAttempts===0)throw new Error('Failed to sanitize html because the input is unstable');
      mXSSAttempts--;iterations++;
      unsafeHtml=parsedHtml;
      parsedHtml=inertBodyElement.innerHTML;                 // (A) read
      inertBodyElement=getInertBodyElement(unsafeHtml);      // (B) parse
    }while(unsafeHtml!==parsedHtml);
    const sanitizer=new SanitizingHtmlSerializer();
    const safeHtml=sanitizer.sanitizeChildren(getTemplateContent(inertBodyElement)||inertBodyElement);
    return{out:safeHtml,iterations};
  }finally{
    if(inertBodyElement){const parent=getTemplateContent(inertBodyElement)||inertBodyElement;while(parent.firstChild)parent.firstChild.remove();}
  }
}

// =====================================================================
// CORRECTED loop: swap (A) and (B) so parsedHtml is read from an element
// freshly parsed from the CURRENT unsafeHtml. This is a true fixed-point loop.
// =====================================================================
function sanitizeHtml_FIXED(unsafeHtmlInput){
  let inertBodyElement=null;
  let iterations=0;
  try{
    let unsafeHtml=unsafeHtmlInput?String(unsafeHtmlInput):'';
    inertBodyElement=getInertBodyElement(unsafeHtml);
    let mXSSAttempts=5;
    let parsedHtml=unsafeHtml;
    do{
      if(mXSSAttempts===0)throw new Error('Failed to sanitize html because the input is unstable');
      mXSSAttempts--;iterations++;
      unsafeHtml=parsedHtml;
      inertBodyElement=getInertBodyElement(unsafeHtml);      // (B) parse first
      parsedHtml=inertBodyElement.innerHTML;                 // (A) then read
    }while(unsafeHtml!==parsedHtml);
    const sanitizer=new SanitizingHtmlSerializer();
    const safeHtml=sanitizer.sanitizeChildren(getTemplateContent(inertBodyElement)||inertBodyElement);
    return{out:safeHtml,iterations};
  }finally{
    if(inertBodyElement){const parent=getTemplateContent(inertBodyElement)||inertBodyElement;while(parent.firstChild)parent.firstChild.remove();}
  }
}


window.getInertBodyElement=getInertBodyElement;window.f=f;window.roundsToFixedPoint=roundsToFixedPoint;window.sanitizeHtml_BUGGY=sanitizeHtml_BUGGY;window.sanitizeHtml_FIXED=sanitizeHtml_FIXED;
