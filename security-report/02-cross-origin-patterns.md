# Path-style Angular Service Worker `dataGroups` patterns unintentionally match and cache cross-origin requests

| | |
|---|---|
| **Affected package** | `@angular/service-worker` |
| **Tested on** | 22.1.0 (npm artifact, unmodified `ngsw-worker.js`) |
| **Class** | Cache-scope confusion / security-relevant correctness flaw |
| **Proposed severity** | Low–Medium |
| **Proof of concept** | `poc/poc-f12.mjs`, `poc/index-f12.html` |
| **Evidence** | `evidence/cross-account.png` |

> **Report separately from `01-ignore-vary.md`.** Angular's documentation
> concedes that glob matching is partial, so this issue is likely to be triaged
> as a correctness bug. Filing them together risks the discussion being pulled
> into glob-matching and dragging the stronger `ignoreVary` finding down with
> it.

---

## Summary

`dataGroups.urls` written in path form (leading `/`) are compiled to regular
expressions **without origin binding** and then tested against the **absolute**
`Request.url` at runtime. A pattern that looks same-origin, such as `/api/**`,
therefore also matches unrelated cross-origin URLs whenever that substring
appears in their path **or query string**.

The consequence is that a caching policy the developer chose **deliberately**
for their own API is silently extended to third-party authenticated endpoints
they never configured.

---

## Root cause

**`packages/service-worker/config/src/generator.ts`**

```ts
// :96   assetGroups
patterns: (group.resources.urls || []).map((url) => urlToRegex(url, this.baseHref, true)),
// :104  dataGroups
patterns: group.urls.map((url) => urlToRegex(url, this.baseHref, true)),
```

Compare with three other sites in the same file, all of which anchor:

```ts
// :126  navigationUrls
return {positive, regex: `^${urlToRegex(url, baseHref)}$`};
// :153 / :158  build-time file matching
regex: new RegExp('^' + globToRegex(pattern) + '$'),
```

**`packages/service-worker/worker/src/data.ts:305`**

```ts
if (!this.patterns.some((pattern) => pattern.test(req.url))) {
```

`req.url` here is the complete absolute URL, scheme and host included. There is
no origin check anywhere along this path.

Its neighbour, **`assets.ts:126`**, normalises first:

```ts
if (this.urls.indexOf(url) !== -1 || this.patterns.some((pattern) => pattern.test(url)))
// url = adapter.normalizeUrl(req.url)
```

and `adapter.ts:84-88` does compare origins:

```ts
normalizeUrl(url: string): NormalizedUrl {
  const parsed = this.parseUrl(url, this.scopeUrl);
  return (parsed.origin === this.origin ? parsed.path : url) as NormalizedUrl;
}
```

### The precise problem statement

Angular's documentation does state that glob matching is partial and that
developers may anchor patterns themselves. **This report does not dispute
that.** The problem is narrower:

> A path-style `dataGroups` pattern is evaluated as an unanchored substring
> against a full absolute request URL. As a result, the configuration **cannot
> express** its natural meaning — "this path on the application's own origin" —
> without hard-coding the deployment origin into the regular expression.

Writing `^/api/.*$` does not help: it would never match at all, because what is
tested is an absolute URL. The only safe form is
`^https://app\.example\.com/api/.*$`, which requires the developer to:

- know that path-style patterns are tested against absolute URLs (undocumented);
- avoid the common `/api/**` form used by the documentation's own examples;
- hard-code the deployment origin;
- maintain different configuration for staging, production, custom domains and
  multi-tenant hosting.

A portable path-style configuration does not retain same-origin semantics at
runtime.

---

## Evidence

Verified in Chromium with a service worker genuinely registered through
`navigator.serviceWorker.register('/ngsw-worker.js')`.

```
application origin : http://localhost:PORT_A     (service worker registered here)
identity provider  : http://127.0.0.1:PORT_B     (a DIFFERENT origin)
ngsw-config        : dataGroups[{ urls:['/api/**'], strategy:'performance', maxAge:'1d' }]
```

```
T0  Alice signs in -> GET {IdP}/v2/api/profile   Authorization: Bearer ALICE
T1  Alice signs out
T2  Bob signs in on the same browser
                   -> GET the SAME URL           Authorization: Bearer BOB
```

| | endpoint | T0 Alice received | T2 Bob received | IdP contacted |
|---|---|---|---|---|
| **A VULNERABLE** | `/v2/api/profile` | Alice | **Alice** | **1×** |
| **B CONTROL** | `/v2/profile` | Alice | Bob | 2× |
| **C BOUNDARY** | `/v2/api/profile` + `Vary: Authorization` | Alice | **Alice** | **1×** |

Browser Cache Storage after A and C:

```
ngsw:/:1:data:api:cache
  CROSS-ORIGIN  http://127.0.0.1:PORT_B/v2/api/profile
```

Bob received Alice's name, email and role. **Bob's request never reached the
identity provider**, so the server had no opportunity to refuse it.

Control B isolates the variable: same endpoint, same code, same tokens — only
the shape of the path differs.

### Arm C — the correct server-side control does not help

The IdP sends `Vary: Authorization`. The disclosure still happens. The cause is
pinned on the same cache entry:

```
Cache.match(bobRequest) on ngsw:/:1:data:api:cache
   {ignoreVary:true}  (what ngsw uses) -> {"name":"Alice", ... "role":"admin"}
   browser default    (honours Vary)   -> NO MATCH
```

This is the subject of the separate report `01-ignore-vary.md`, which
reproduces it **same-origin** and does not depend on this issue at all.

### Boundaries, stated plainly

- Requires two distinguishable authorization contexts requesting the same URL
  within the service worker cache lifetime (see `01-ignore-vary.md` for the
  realistic forms this takes).
- The application must actually fetch a third-party endpoint whose path or
  query contains the pattern substring.
- No attacker action is needed to populate the cache; normal use at T0 does it.

---

## Secondary impact

Both run through the same shipped `ngsw-worker.js`. They attack **client-side**
checks, so they are decisive only where that check is the only one — which is
why they are secondary.

### (a) Emergency key rotation never reaches the browser

Verification uses real WebCrypto (ECDSA P-256 / ES256).

```
T0  k1 valid, application fetches JWKS from {IdP}/v1/api/keys
T1  k1 LEAKS; the IdP rotates it out -> JWKS contains only k2
T2  a role=admin JWT signed with k1 is presented
```

The token's signature is **cryptographically valid**; what is wrong is that the
key has been revoked by emergency rotation. The terms "forged" and "invalid
signature" would be inaccurate and are not used.

```
A VULNERABLE  JWKS at /v1/api/keys, pattern \/api\/.*
              IdP contacted after rotation = false  -> ADMIN ACCESS GRANTED
B CONTROL     JWKS at /v1/keys                      -> denied (kid absent)
C FIXED       pattern ^https:\/\/app\.example\.com\/api\/.*$ -> denied
```

### (b) Access revocation does not take effect

Assumes no client-side JWT verification:

```
A VULNERABLE  entitlements at /v2/api/entitlements, IdP contacted after revocation = false
              application sees {"role":"admin","active":true}
B CONTROL     entitlements at /v2/entitlements,     IdP contacted = true
              application sees {"role":"viewer","active":false}
```

---

## Reproduction

```bash
cd security-report/poc
npm install
npx playwright install chromium
node poc-f12.mjs --shot ../evidence/cross-account.png
echo "exit=$?"
```

Exits `0` only when arm A leaks and arm B does not.

---

## Suggested fix

Angular **does** deliberately support cross-origin data caching — its
documentation discusses opaque responses and `cacheOpaqueResponses`. A fix must
not remove that. The proposal only gives sensible semantics to patterns that
begin with `/`:

1. A pattern beginning with `/` is treated as a path on the service worker's
   own origin.
2. A pattern containing a scheme or origin, e.g. `https://cdn.example/**`, keeps
   its current cross-origin treatment.
3. Path-style matching is performed against the normalised `pathname + search`,
   not against another origin's full absolute URL.

Conceptually, in `data.ts`:

```ts
const parsed = new URL(req.url);

if (configuredPattern.startsWith('/')) {
  if (parsed.origin !== adapter.origin) {
    return false;
  }
  return pattern.test(parsed.pathname + parsed.search);
}

return pattern.test(req.url);
```

This preserves explicit cross-origin support while making `/api/**` mean what
it reads as.

---

## Realistic severity

| condition | severity |
|---|---|
| evidence of cross-account data disclosure or a concrete privileged operation | Medium |
| only stale client-side entitlements or UI | Low |
| if triage holds that partial matching and cache staleness are documented | Informational / Won't fix |

This report presents evidence for the first row and states its boundaries for
the other two.
