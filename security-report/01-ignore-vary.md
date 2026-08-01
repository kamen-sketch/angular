# Angular Service Worker forces `ignoreVary: true`, replaying authenticated cached responses across authorization contexts

| | |
|---|---|
| **Affected package** | `@angular/service-worker` |
| **Tested on** | 22.1.0 (npm artifact, unmodified `ngsw-worker.js`) |
| **Class** | Sensitive information disclosure / cache key confusion |
| **Proposed severity** | Medium |
| **Proof of concept** | `poc/poc-f13.mjs`, `poc/index-f13.html` |
| **Evidence** | `evidence/ignore-vary.png` |

---

## Summary

Angular unconditionally generates `cacheQueryOptions.ignoreVary = true` for
every asset group and data group, and **exposes no configuration option to
disable it**. Cached responses carrying `Vary: Authorization` can therefore be
returned for later requests carrying a different `Authorization` header.

After an authentication-context transition, the Angular Service Worker can
disclose the previous principal's authenticated response to the next principal
**without contacting the server**.

The server does the right thing. The browser is able to enforce it. Angular
silently disables it, and the developer cannot turn it back on.

> **Terminology.** `Vary` does not mean "do not cache". It states that the
> representation is selected by the value of that request header, so a cache
> must take that header into account when matching. The Cache API default is
> `ignoreVary: false`.

---

## Root cause

**`packages/service-worker/config/src/generator.ts:203-210`**

```ts
function buildCacheQueryOptions(
  inOptions?: Pick<CacheQueryOptions, 'ignoreSearch'>,
): CacheQueryOptions {
  return {
    ignoreVary: true,
    ...inOptions,
  };
}
```

Called for **every** group — `assetGroups` (`:94`) and `dataGroups` (`:112`) —
so the value ends up in the shipped `ngsw.json`.

**The public configuration type does not allow `ignoreVary`:**

`packages/service-worker/config/src/in.ts:44` and `:64`, plus
`goldens/public-api/service-worker/config/index.api.md:10,54`

```ts
cacheQueryOptions?: Pick<CacheQueryOptions, 'ignoreSearch'>;
```

Because `inOptions` is spread **after** `ignoreVary: true`, the value is
technically overridable — but the public type never permits a developer to
supply it. There is no supported path to `ignoreVary: false`.

**The runtime passes it straight through:**

`packages/service-worker/worker/src/data.ts:502`

```ts
let res = await cache.match(req, this.config.cacheQueryOptions);
```

**The documentation does not mention it.**
`adev/src/content/ecosystem/service-workers/config.md:154` documents only
`ignoreSearch`. The docs state that `cacheQueryOptions` is passed to
`Cache.match()`, but not that Angular always adds `ignoreVary: true`.

---

## Evidence

The proof of concept below is **entirely same-origin**. The endpoint under test
lives on the application's own origin and is **deliberately** covered by
`dataGroups`; no cross-origin pattern is involved.

Verified in Chromium with a service worker genuinely registered through
`navigator.serviceWorker.register('/ngsw-worker.js')`. Cache Storage, `Vary`
matching and request interception all belong to the browser.

### Configuration

```jsonc
// ngsw-config.json
{
  "index": "/index.html",
  "dataGroups": [{
    "name": "api",
    "urls": ["/api/**"],
    "cacheConfig": { "strategy": "performance", "maxSize": 100, "maxAge": "1d" }
  }]
}
```

### Requests

```
Alice Authorization header:  Bearer ALICE
Bob   Authorization header:  Bearer BOB
Request URL:                 identical — http://localhost:PORT/api/profile
Response header:             Vary: Authorization
```

### Results

```
Requests that reached the application server: 1    (2 = normal, 1 = Bob served from cache)

Browser default:
  cache.match(bobRequest)                      -> undefined

Angular's options:
  cache.match(bobRequest, {ignoreVary: true})  -> {"name":"Alice","email":"alice@example.com","role":"admin"}

Patched Angular (ignoreVary: false):
  Bob's request reaches the network             -> {"name":"Bob","email":"bob@example.com","role":"viewer"}
  requests that reached the server              -> 2
```

Both `cache.match` calls run against the **same cache entry**, in-page, right
after ngsw writes it. The browser rejects that match; Angular forces it.

### Generated manifest

```json
{
  "dataGroups": [
    {
      "name": "api",
      "patterns": ["\\/api\\/.*"],
      "cacheQueryOptions": { "ignoreVary": true }
    }
  ]
}
```

---

## Impact

After an authentication-context transition on the same origin and browser
profile, the previous principal's authenticated response is served to the next
principal. In this proof of concept: name, email address and role. The second
principal's request **never reaches the server**, so the server has no
opportunity to refuse it.

### Prerequisites, stated plainly

Exploitation requires **two distinguishable authorization contexts requesting
the same URL within the lifetime of the service worker cache**. That does not
have to mean two people sharing a computer. The same condition arises with:

- Alice signs out, Bob signs in;
- tenant or organisation switching;
- a SaaS product's built-in account switcher;
- an administrator using impersonation and then returning to their own account;
- a token changing after a role or identity change;
- one person holding both a personal and a business account;
- kiosks and shared workstations.

### The server's other standard defence also fails

The same proof-of-concept server sends **`Cache-Control: no-store`** on that
response — the strongest directive a server can send. It makes no difference.
`analysis/tools/ngsw/cache-control.mjs` isolates that single variable
(same-origin, no `Vary`, endpoint deliberately covered by `dataGroups`):

```
Cache-Control: no-store                  -> stored, 1 request to server
Cache-Control: no-cache, private         -> stored, 1 request to server
Cache-Control: max-age=0, must-revalidate-> stored, 1 request to server
Cache-Control: max-age=3600              -> stored, 1 request to server
```

All four behave identically. `worker/src/data.ts` never reads `Cache-Control`
at all — while its sibling `worker/src/assets.ts:183-205` does parse it, for
unhashed asset expiry. The side that handles **API responses**, where
`no-store` matters most, is the side that ignores it.

This is stated as a supporting fact, not as a separate vulnerability: Cache
Storage is a programmatic cache and does not implement HTTP caching semantics,
so "we do not consult `Cache-Control`" is a defensible design position on its
own. What it removes is the rebuttal that the operator should have protected
themselves. **The server deployed both standard defences — `Cache-Control:
no-store` and `Vary: Authorization` — and neither prevented the cross-principal
replay.**

### Why several common rebuttals do not apply

| rebuttal | why it does not apply |
|---|---|
| "just stale UI" | the leaked value is an authenticated response body, not a rendering |
| "client-side authorization is not authoritative" | this is a confidentiality breach, not an authorization decision |
| "the endpoint was caught by an over-broad cross-origin pattern" | this PoC is same-origin and the endpoint is deliberately covered |
| "the server forgot to distinguish responses" | the server sends `Vary: Authorization` correctly |
| "cache poisoning by an attacker" | there is no attacker; this happens through normal use |
| "this is default browser behaviour" | the Cache API default is `ignoreVary: false` |
| "the developer chose cache-first" | true, but they were given no option to preserve `Vary` semantics |
| "the server should have sent `no-store`" | it did; `data.ts` never reads `Cache-Control` |

### Severity

**Medium** is the most defensible claim: the confidentiality impact is concrete,
but it is bounded by the need for an identity transition within the same browser
profile.

Severity would be higher where any of the following holds for a given
application. This report does **not** claim them without further evidence:

- a SaaS product with built-in account or tenant switching;
- responses containing financial, medical, token or sensitive PII data;
- the same endpoint serving many tenants;
- account switching being a normal flow rather than shared physical devices;
- an attacker being able to trigger or direct a victim into switching accounts;
- the cache surviving a sign-out that users believe clears their session.

---

## Reproduction

```bash
cd security-report/poc
npm install
npx playwright install chromium
node poc-f13.mjs --shot ../evidence/ignore-vary.png
echo "exit=$?"
```

The script exits `0` **only if all four conditions hold**: arm A leaks Alice's
data to Bob, arm B does not, arm A touches the server once, arm B twice.

---

## Suggested fix

Minimal:

```ts
function buildCacheQueryOptions(
  inOptions?: Pick<CacheQueryOptions, 'ignoreSearch' | 'ignoreVary'>,
): CacheQueryOptions {
  return {
    ignoreVary: false,
    ...inOptions,
  };
}
```

If `ignoreVary: true` needs to be preserved for static-asset compatibility, the
data cache and the asset cache can carry different defaults:

```
assetGroups : the existing behaviour may stay — contents are hashed and do not
              depend on request headers
dataGroups  : ignoreVary false by default — per-user responses are the common
              case here
```

This change has compatibility consequences: some applications will see fewer
cache hits where their server sends a broad `Vary` such as
`Vary: Accept-Encoding`. We consider the security of authenticated data
responses more important than treating all responses as the same variant,
particularly since developers currently have no choice at all.

---

## Related finding

During testing, the same behaviour was also reachable for unintended
cross-origin requests, because path-style patterns are matched against absolute
URLs. That issue is independently reproducible and is **not required** for this
report. See `02-cross-origin-patterns.md`.
