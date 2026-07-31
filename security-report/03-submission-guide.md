# Step-by-step: submitting these findings to Angular

Primary report: `01-ignore-vary.md`
Secondary report: `02-cross-origin-patterns.md`

---

## 0. Do not open a public issue

`01-ignore-vary.md` is disclosure of authenticated information. Follow Angular's
security process rather than the public issue tracker.

- Read the policy first: <https://angular.dev/best-practices/security>, the
  *Reporting vulnerabilities* section, and `SECURITY.md` in `angular/angular`.
- Angular routes security reports through Google's process at
  <https://g.co/vulnz> (Google Bug Hunters). The address `security@angular.io`
  is also listed in Angular's documentation.
- **Verify the current address and process in `SECURITY.md` before sending.**
  If it has changed, that is the only part of this guide that needs adjusting.
- Do not discuss technical detail in public issues, pull requests, chat or
  social media until there is a fix or the team says it is fine.

---

## 1. Reproduce from scratch on a clean machine

The point is to confirm someone else can run this without your repository.

```bash
mkdir ~/ngsw-poc && cd ~/ngsw-poc
cp <this-folder>/poc/package.json .
cp <this-folder>/poc/poc-f13.mjs .
cp <this-folder>/poc/index-f13.html .
npm install
npx playwright install chromium
node poc-f13.mjs --shot evidence.png
echo "exit=$?"
```

What you should see:

```
A  AS SHIPPED  (ignoreVary: true, straight from the Generator)
  manifest cacheQueryOptions        {"ignoreVary":true}
  server response header            Vary: Authorization
  T0 Alice (Bearer ALICE) received  {"name":"Alice", ... "role":"admin"}
  T2 Bob   (Bearer BOB)   received  {"name":"Alice", ... "role":"admin"}
  requests that reached server      1
     cache.match(bobRequest)                     -> undefined
     cache.match(bobRequest, {ignoreVary:true})  -> {"name":"Alice", ...}

B  PATCHED     (ignoreVary: false)
  T2 Bob   (Bearer BOB)   received  {"name":"Bob", ... "role":"viewer"}
  requests that reached server      2

exit=0
```

`exit=0` happens only when all four conditions hold. **If it is not 0, do not
send** — find out what changed first.

---

## 2. Capture the browser screenshot

`--shot evidence.png` produces it from arm A. Make sure the image contains all
four of the following, because this is what a triager reads first:

- the `T0 Alice` and `T2 Bob` rows, with different `Authorization` headers and
  an **identical URL**;
- `Server response header : Vary: Authorization`;
- `Requests that reached server : 1`;
- the block showing `cache.match(bobRequest) -> undefined` next to
  `cache.match(bobRequest, {ignoreVary: true}) -> Alice's response`.

Optional, and it strengthens the report — DevTools evidence:

1. Start the server, then open the printed URL in ordinary Chrome.
2. DevTools → **Application → Service Workers** — confirm `ngsw-worker.js` is
   *activated and is running*.
3. **Application → Cache Storage → `ngsw:/:1:data:api:cache`** — show the
   `/api/profile` entry and its `Vary: Authorization` response header.
4. **Network** — show Bob's request marked *(ServiceWorker)* with no
   corresponding outgoing request.

---

## 3. Assemble the attachments

Send as little as possible while still being runnable:

| file | contents |
|---|---|
| `01-ignore-vary.md` | the report |
| `evidence.png` | browser screenshot |
| `poc-f13.mjs` | proof of concept |
| `index-f13.html` | test page |
| `package.json` | dependency pins |
| `output.txt` | full terminal output from step 1 |

```bash
cd ~/ngsw-poc
node poc-f13.mjs > output.txt 2>&1
zip ngsw-ignorevary-poc.zip 01-ignore-vary.md evidence.png poc-f13.mjs index-f13.html package.json output.txt
```

---

## 4. Send it

**Primary route — Google Bug Hunters** (<https://g.co/vulnz>)

1. Sign in, start a new report, select **Angular**.
2. Title:
   `Angular Service Worker forces ignoreVary: true, replaying authenticated cached responses across authorization contexts`
3. Paste the contents of `01-ignore-vary.md` as the report body.
4. Attach `ngsw-ignorevary-poc.zip`.
5. Give your proposed severity: **Medium**, with the reasoning already written
   in the report's *Severity* section.

**Alternative route — email**

Send to `security@angular.io` with the same subject, body and attachments.
Mention that you are equally happy to file through g.co/vulnz if that is the
route they prefer.

---

## 5. Order the report this way

Triagers read from the top and stop as soon as they are convinced.

1. **One sentence of impact.** "After an authentication-context transition, the
   Angular Service Worker can disclose the previous principal's authenticated
   response to the next principal without contacting the server."
2. **Three lines of evidence** — server hit count 1, `cache.match` default
   `undefined`, `cache.match` with `ignoreVary:true` returning Alice's response.
3. **Root cause** — `generator.ts:203-210`, plus the public type
   `Pick<CacheQueryOptions, 'ignoreSearch'>`.
4. **The patched arm** — `ignoreVary: false` closes it.
5. Only then: prerequisites, boundaries and the suggested fix.

---

## 6. Phrasings to avoid

- Do not write that `Vary: Authorization` "prevents the response from being
  stored". It declares that the representation is selected by that request
  header, so a cache must take it into account when matching.
- Do not claim this breaks the same-origin policy. It does not.
- Do not claim no identity transition is needed. It is — name the realistic
  forms (account switcher, tenant switch, impersonation, sign-out/sign-in).
- Do not mix in the cross-origin pattern issue. One sentence at the end is
  enough. Otherwise the discussion drifts into glob matching and the stronger
  finding gets dragged down with it.
- Do not open a fix PR before the security team responds.

---

## 7. After sending

- Record the submission date and the report number.
- Angular/Google usually respond within a few business days. If there is no
  response after 14 days, send a short follow-up on the same thread.
- Agree a disclosure timeline before discussing this anywhere else.
- If they ask for a fix, offer the `buildCacheQueryOptions` patch together with
  a regression test asserting that `dataGroups` do **not** carry
  `ignoreVary: true`.

---

## If you also want to submit the cross-origin pattern issue

Send it **separately**, and only after the `ignoreVary` report has a number.

`02-cross-origin-patterns.md` is more likely to be treated as a correctness bug,
because Angular's documentation concedes that glob matching is partial. Its
submission route is the same, but propose Low–Medium and frame it as
*cache-scope confusion* rather than as a vulnerability in its own right.
