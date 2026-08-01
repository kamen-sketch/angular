# Angular Service Worker — security findings

Self-contained submission bundle. Everything here can be re-run by a third party
with nothing but `npm install`; no Angular source code is transcribed by hand,
and no files in this repository are modified by the proofs of concept.

Tested against **`@angular/service-worker@22.1.0`** from npm, using the shipped
`ngsw-worker.js` unmodified.

---

## Contents

| file | what it is |
|---|---|
| `01-ignore-vary.md` | **Primary report.** Angular forces `ignoreVary: true`, replaying authenticated cached responses across authorization contexts. |
| `02-cross-origin-patterns.md` | Secondary report. Path-style `dataGroups` patterns match cross-origin request URLs. |
| `03-submission-guide.md` | Step-by-step procedure for reporting these to Angular. |
| `poc/poc-f13.mjs` + `poc/index-f13.html` | Proof of concept for the primary report. Same-origin. |
| `poc/poc-f12.mjs` + `poc/index-f12.html` | Proof of concept for the secondary report. Cross-origin. |
| `evidence/ignore-vary.png` | Browser screenshot, primary report. |
| `evidence/cross-account.png` | Browser screenshot, secondary report. |

---

## Running the proofs of concept

```bash
cd poc
npm install
npx playwright install chromium

node poc-f13.mjs --shot ../evidence/ignore-vary.png     # primary
node poc-f12.mjs --shot ../evidence/cross-account.png   # secondary
```

Both scripts are self-validating: they exit `0` **only** when the hypothesis is
confirmed **and** the negative control behaves correctly. A non-zero exit means
something changed and the result should not be trusted.

Both load the real `ngsw-worker.js` into Chromium and register it through
`navigator.serviceWorker.register()`. Cache Storage, `Vary` matching and request
interception are the browser's, not a simulation.

---

## The two findings in one paragraph each

**`01-ignore-vary.md` — primary.** Angular unconditionally generates
`cacheQueryOptions.ignoreVary = true` (`generator.ts:203-210`) and its public
config type is `Pick<CacheQueryOptions, 'ignoreSearch'>`, so applications have
no supported way to disable it. A server that correctly declares
`Vary: Authorization` is therefore not protected: the browser's default cache
matching would reject the previous principal's response for the next
principal's request, and Angular overrides that decision. Proven same-origin, on
an endpoint deliberately covered by `dataGroups`.

**`02-cross-origin-patterns.md` — secondary.** Path-style `dataGroups.urls` are
compiled without origin binding and tested against the absolute `Request.url`,
so `/api/**` also matches unrelated cross-origin URLs — even when the substring
appears only in a query string. The configuration cannot express "this path on
the application's own origin" without hard-coding the deployment origin.

---

## Report them separately

Angular's documentation concedes that glob matching is partial, which gives
triage a strong answer to the second finding. Filing both together risks the
discussion being pulled into glob-matching and dragging the first, much stronger
finding down with it. `03-submission-guide.md` explains the ordering.

---

## What is claimed, and what is not

Claimed, with runtime evidence:

- the previous principal's authenticated response body is served to the next
  principal on the same origin and browser profile;
- the second request never reaches the server, so the server cannot refuse it;
- the cause is `ignoreVary: true`, pinned by matching the same cache entry twice
  — once with the browser default (no match) and once with Angular's options
  (Alice's response);
- patching the manifest to `ignoreVary: false` closes it.

Not claimed:

- this does not break the same-origin policy — the page issued those requests
  itself and the worker gains no new read access;
- exploitation is not attacker-triggered; the cache is populated by normal use;
- it does require two distinguishable authorization contexts requesting the same
  URL within the cache lifetime. Realistic forms are listed in the report rather
  than glossed over.
