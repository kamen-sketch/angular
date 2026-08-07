# Triage — what to act on first

The [findings register](./findings-register.md) records 57 findings in the order they were
confirmed, which is the wrong order for deciding what to do. This ranks them.

Every fix proposed below was run against the cases that motivated the finding **and** against the
cases the current code already gets right, so a fix is only listed if it is verified not to
regress. Nothing here has been applied — the register's framework findings are all still `open`.

## How these are ranked

Three questions, in this order:

1. **Does it need an attacker, a misconfiguration, or nothing at all?** A defect that fires on
   ordinary use outranks one that needs a hostile input.
2. **Is the failure silent?** Wrong output with no diagnostic outranks a loud crash, because the
   crash gets fixed by whoever hits it.
3. **How contained is the fix?** A one-line change with a clear test is worth doing now; a
   change that needs a design decision goes to the bottom regardless of severity.

---

## Tier 1 — act first

### 1. `Validators.pattern` accepts what it should reject — [§ 45](./findings-register.md)

`Validators.pattern('yes|no')` compiles to `^yes|no$`, i.e. `(^yes)|(no$)`, so neither branch is
anchored at both ends and the validator accepts `catxxx` for `cat|dog`. No attacker precondition —
it misfires on ordinary use.

**Calibrating the impact honestly**, because it is easy to overstate:

- **This is not a vulnerability in Angular.** Client-side validation is a user-experience control,
  not an enforcement boundary; a server that trusts it is already broken independently of this bug.
  What the defect does is make an application's _existing_ missing server-side validation easier to
  walk past — it does not create the exposure.
- **The realistic damage is data integrity.** An alternation is the natural way to write an enum
  constraint — `draft|published`, `US|CA|MX` — and those fields silently accept arbitrary text that
  then gets stored.
- **The frequency is low.** Surveying every `Validators.pattern(…)` in `adev/` and `packages/forms`:
  all are character classes (`[a-zA-Z ]+`, `[aA]*`, `\d{5}`, `[a-zA-Z]+`). **Not one uses a
  top-level alternation**, which is the shape that breaks.

**What still makes it tier 1 is not severity — it is that the framework contradicts both its own
documentation and the platform.** The JSDoc states that `^` and `$` are added, so a reader
reasonably expects anchoring. The directive's selector is `[pattern][ngModel]` and it reflects the
value back onto the element, so the browser validates the identical string as `^(?:…)$`. On one
element, two engines return different verdicts for one attribute, and the developer wrote nothing
wrong. That is a framework defect regardless of how often it fires, and the fix is one line.

**Fix** (`packages/forms/src/validators.ts:573-586`) — replace the two `charAt` tests with the form
WHATWG specifies for the native `pattern` attribute:

```js
regexStr = `^(?:${pattern})$`;
regex = new RegExp(regexStr);
```

Verified: wrong on 3 of 8 patterns today, wrong on 0 of 8 after. `^ok$` still matches exactly `ok`,
so the pre-anchored case needs no special handling and both `charAt` tests become dead.

**Test to add** — the divergence is measurable against the platform, so assert it directly: for
`cat|dog`, `yes|no` and `price\$`, the validator's verdict must equal
`!input.validity.patternMismatch` for an `<input pattern="…">` carrying the same string.

**Caveat worth stating in the PR**: this makes the validator stricter, so applications relying on
the current looseness will start seeing errors. That is the point, but it is a behavioural change.

### 2. Node injector misses non-ASCII string tokens — [§ 49](./findings-register.md)

Silent, ordinary-use, and a one-character fix. `bloomAdd` masks the hash; the read side does not, so
for any string token whose first character is U+0100 or above the bucket index leaves the 8-slot
filter and the provider is never found.

**Fix** (`packages/core/src/render3/di.ts:830`):

```js
if (typeof token === 'string') {
  return token.charCodeAt(0) & BLOOM_MASK; // was: token.charCodeAt(0) || 0
}
```

Keep the `|| 0` for the empty-string case. Verified: read bucket equals write bucket for
`myToken`, `ÿtoken`, `ātoken`, `Ярлык` and `配置` after the change; three of those miss today.

**Test to add** — a node-level provider keyed by a non-Latin string token, injected by a child.
There is currently **no** `@Inject('…')` anywhere in `packages/core` whose first character is at or
above U+0100, in `src` or `test`.

### 3. `toDate` reads an 8-digit ISO date as a timestamp — [§ 40](./findings-register.md)

Public API (`formatDate`, and `DatePipe` through it), silent, and a compact date from a backend is
ordinary input. `'20150101'` renders as 1970-01-01.

**Fix** (`packages/common/src/i18n/format_date.ts:948-958`) — try the ISO pattern first, and accept
it only when the month and day are in range; otherwise fall through to the existing numeric branch.
That is what separates a date from an epoch string, and it is checkable:

```
20150101        ISO date    ok        1420070400000   timestamp   ok
20151231        ISO date    ok        1234567890      timestamp   ok
19700101        ISO date    ok        20151301        timestamp   ok   (month 13)
                                      20150132        timestamp   ok   (day 32)
```

Verified on all eight. The reordering alone is not enough — `1420070400000` also matches the ISO
pattern, as year 142007040 month 00 day 00, which is exactly what the range check rejects.

### 4. `[style]` throws on a data URL in a shorthand — [§ 50](./findings-register.md)

Loud rather than silent, which lowers it — but in production it is `new Error()` **with no
message**, from a `[style]` binding, and `background: #fff url(data:…;base64,…)` is ordinary CSS.

**Fix** (`packages/core/src/render3/styling/styling_parser.ts:267`) — replace the positional test
`startIndex === i - 4` with a boundary test, which honours the same intent the comment states
(don't treat `foo_URL()` as a url):

```js
// `url(` is a url only when it is not the tail of a longer identifier
```

Verified against both the cases that must match and the case the comment cares about:

| value                          | current    | proposed |
| ------------------------------ | ---------- | -------- |
| `url(data:a;b)`                | yes        | yes      |
| `#fff url(data:a;b) no-repeat` | **no**     | yes      |
| `url(a), url(data:x;y)`        | first only | both     |
| `foo_URL(data:a;b)`            | no         | no       |
| `myurl(data:a;b)`              | no         | no       |

---

## Tier 2 — worth fixing, narrower trigger

| #                                                 | Why it is below tier 1                                                                                                                          | Fix                                                                                       |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [42](./findings-register.md) locale `constructor` | Attacker-reachable in SSR, but needs the global locale files **and** a locale from user input                                                   | `Object.create(null)` for the global registry, or gate the read with `Object.hasOwn`      |
| [36](./findings-register.md) `findEndOfBlock`     | Corrupts the rendered message — but the trigger needs a long escape that the compiler does not emit, and whether any bundler does is unverified | derive `rawIndex` rather than tracking it                                                 |
| [41](./findings-register.md) `formatCurrency`     | Data-driven and silent, but only for ISO 4217 `XXX`                                                                                             | escape the replacement, and strip the placeholder from the pattern rather than the result |
| [44](./findings-register.md) XSRF cookie          | Denial of write access, needs a `%` in the cookie                                                                                               | treat an undecodable token as absent — `token != null` already handles it                 |
| [48](./findings-register.md) animation `NaN`      | Developer-facing, and it does throw eventually                                                                                                  | require a digit: `-?\d*\.?\d+`                                                            |
| [54](./findings-register.md) `&#12ab;`            | Silently drops author text, but a malformed entity is rare                                                                                      | pass `isHex` into `isDigitEntityEnd`                                                      |
| [46](./findings-register.md) SW `hasOwnProperty`  | Needs a push server relaying a hostile key                                                                                                      | `Object.hasOwn(desc, name)`                                                               |
| [52](./findings-register.md) `1.2.3` lexes to 1.2 | A typo, and the value is visibly wrong                                                                                                          | a `seenPeriod` flag beside `hasSeparators`                                                |
| [56](./findings-register.md) `??` not foldable    | Developer experience, not correctness — the build fails loudly                                                                                  | add `QuestionQuestionToken` to `BINARY_OPERATORS`                                         |
| [57](./findings-register.md) `@for` dup-key warn  | Dev-mode diagnostic only; the rendered list is correct either way                                                                               | call `recordDuplicateKeys` in both cleanup loops                                          |

## Not worth prioritising, and why

- **[38](./findings-register.md), [18](./findings-register.md)** — latent in code the published
  build cannot execute. Worth folding into whatever change next touches those files; not worth a
  change of their own. The bundle-size half of 38 is the part with a real cost.
- **[15](./findings-register.md), [37](./findings-register.md), [51](./findings-register.md),
  [55](./findings-register.md)** — the prototype-map and placeholder-collision family. Each is a
  real hazard and none is reachable with keys the framework generates. Best addressed as one sweep
  using the idioms already present in the codebase (`Object.create(null)`, `Object.hasOwn`, a
  `\0` field separator) rather than as separate fixes.
- **[7](./findings-register.md), [53](./findings-register.md)** — two unenforced duplicate copies
  (the DOM security schema, `escapeXml`). Both are correct today. The action is a test that compares
  the copies, not an edit to either.

## Taint to sink

Version under review: **22.2.0-next.0**, commit `d684c4dc`. This repository is the release source,
so the paths below are the shipped ones; where a symbol's presence in a build is in question it is
noted.

"Taint" here means data the application does not author — end-user input, an HTTP response, a URL
segment, a cookie, a push payload, a translation file. The question is not whether a defect exists
but whether untrusted data reaches something that matters.

| Finding                                           | Taint source                             | What it reaches                  | Sink                       | Blast radius          |
| ------------------------------------------------- | ---------------------------------------- | -------------------------------- | -------------------------- | --------------------- |
| [45](./findings-register.md) `Validators.pattern` | form control value (end user)            | a client-side validation verdict | integrity, not enforcement | that form submission  |
| [42](./findings-register.md) locale registry      | URL segment / `Accept-Language`          | a `TypeError` during render      | availability               | one SSR request → 500 |
| [44](./findings-register.md) XSRF cookie          | cookie (any same-site writer)            | every mutating request fails     | availability               | one browser           |
| [46](./findings-register.md) SW push payload      | push message                             | notification silently suppressed | availability               | one device            |
| [50](./findings-register.md) `[style]`            | a bound style string                     | an unmessaged `Error`            | availability               | one browser tab       |
| [40](./findings-register.md) `toDate`             | API response                             | rendered text                    | none — wrong output        | one view              |
| [49](./findings-register.md) bloom filter         | _none_ — the token is developer-authored | DI resolution                    | none — no taint            | —                     |

**No finding in this review is a vulnerability in Angular.** 45 comes closest — it is the only one
where untrusted input reaches a decision an application might be relying on — but a client-side
validation verdict is a user-experience control, not an enforcement boundary. It makes an
application's own missing server-side validation easier to walk past; it does not create the
exposure. The rest are wrong output or availability faults.

**None of the availability faults is a server-level denial of service**, and the distinction matters
for how they are prioritised:

- **44 and 50 never touch a server.** `parseCookieValue` and the style parser both run in the
  browser, so the failure is confined to the tab it happens in. For 44 the _trigger_ can be global —
  a server emitting a token with a raw `%` breaks every client — but the failure is still each
  browser failing on its own, not the server falling over.
- **42 is the only one with a server-side component, and it is still per-request.** `LOCALE_DATA` is
  genuinely module-level and shared across requests in an SSR process, so the poisoned entry
  persists. But it is keyed `constructor` and answers only lookups for that same key — a request for
  `fr` is unaffected — and `constructor` is the _only_ reachable inherited name, so there is no
  unbounded growth either. The `TypeError` is raised inside the render, which the server awaits, so
  it becomes a 500 for that request rather than a process exit.

So the honest reading is: one wrong form verdict, one failed request, one broken tab. Nothing here
takes down a service. That is why 42 and 44 sit in tier 2 despite being attacker-reachable — the
cost of hitting them is bounded, and bounded per victim.

**No finding in this review is taint reaching an injection sink** — every injection sink that was
driven adversarially held, which is recorded in [26 § 9–14](./26-security-sinks.md).

That is why 45 leads the tier-1 list. Its shipping evidence is direct: `Validators.pattern` and the
`PatternValidator` directive are both in the published API
(`goldens/public-api/forms/index.api.md:1020`, `:842`), and `patternValidator` appears in 2 of the
bundling goldens. `bloomHashBitOrFactory` appears in all 8, core DI being unconditional.
`styleStringParser` and `toDate` appear in none — but that is tree-shaking in those particular test
applications, none of which uses a `[style]` map binding or `DatePipe`; `formatDate` is public API
and ships for any application that imports it.

## Blocked, and on what exactly

Not on Bazel specifically — on the environment's **network egress allowlist**, which blocks every
route to a released build:

```
registry.npmjs.org      403  Host not in allowlist: registry.npmjs.org.
                             Add this host to your network egress settings to allow access.
bcr.bazel.build         blocked  (Bazel's module registry)
unpkg.com               000      (connection refused)
cdn.jsdelivr.net        000      (connection refused)
```

`registry.npmjs.org` is in the proxy's `noProxy` list, so those requests go direct and are refused
upstream; the proxy is not the thing saying no. There are no vendored `node_modules` and no
prebuilt `@angular/*` artifacts on disk.

So neither `pnpm bazel test` nor `npm install @angular/forms` can run here, and the findings —
including the two compiler-cli fixes already committed on this branch — remain **statically
verified only**. The error message names the fix: adding `registry.npmjs.org` to the environment's
egress settings would make an npm-installed verification possible without Bazel.
