# Security sinks

An inventory of every place where a value Angular carries can reach a browser capability that
executes code or loads a resource — and of the checks that stand between them.

This is a collection pass, not a review: it records what the sinks are, which table declares each
one, and where the value physically lands. Every entry was read from the file named beside it.

---

## 1. The shape of the pipeline

A bound value crosses five layers before it reaches the DOM:

```
template binding
  │
  ├─ 1. compile time  — the schema assigns a SecurityContext to <tag>|property
  │                     and the compiler emits a matching ɵɵsanitize* call
  ├─ 2. runtime       — that sanitizer runs, unless an injected Sanitizer overrides it
  ├─ 3. escape hatch  — a SafeValue from bypassSecurityTrust* short-circuits the sanitizer
  ├─ 4. Trusted Types — the string is promoted through one of two named policies
  └─ 5. DOM write     — renderer.setProperty / setAttribute / setStyle / setValue
```

Layer 1 decides _whether_ anything happens at all. A `<tag>|property` pair absent from the schema
gets `SecurityContext.NONE`, no sanitizer is emitted, and the value reaches layer 5 unexamined.
That makes the schema the load-bearing document of the whole area.

## 2. Declared sinks

### 2.1 The security schema — 48 `tag|attribute` pairs

`packages/core/src/sanitization/dom_security_schema.ts`
`packages/compiler/src/schema/dom_security_schema.ts`

Both files carry this banner:

```
//        DO NOT EDIT THIS LIST OF SECURITY SENSITIVE PROPERTIES WITHOUT A SECURITY REVIEW!
```

| Context                | Namespace | Sinks                                                                                                                                                                           |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HTML`                 | —         | `iframe\|srcdoc`, `*\|innerHTML`, `*\|outerHTML`                                                                                                                                |
| `STYLE`                | —         | `*\|style`                                                                                                                                                                      |
| `URL`                  | —         | `*\|formAction`, `area\|href`, `a\|href`, `a\|xlink:href`, `form\|action`, `img\|src`, `video\|src`                                                                             |
| `URL`                  | `math`    | `*\|href`, `*\|xlink:href`                                                                                                                                                      |
| `URL`                  | `svg`     | `a\|href`, `a\|xlink:href`                                                                                                                                                      |
| `RESOURCE_URL`         | —         | `base\|href`, `embed\|src`, `frame\|src`, `iframe\|src`, `link\|href`, `object\|codebase`, `object\|data`                                                                       |
| `ATTRIBUTE_NO_BINDING` | `svg`     | `animate\|{attributeName,values,to,from}`, `set\|{to,attributeName}`, `animateMotion\|attributeName`, `animateTransform\|attributeName`                                         |
| `ATTRIBUTE_NO_BINDING` | —         | `iframe\|{sandbox,allow,allowFullscreen,referrerPolicy,csp,fetchPriority,credentialless}` and the same set plus `{attributeName,values,to,from}` under the pseudo-tag `unknown` |

Two things the table says about itself:

- **`SCRIPT` has no entries** — "no SCRIPT contexts here, they are never allowed due to the parser
  stripping them." The `SecurityContext.SCRIPT` enum member exists and `ɵɵsanitizeScript` exists,
  but nothing in the schema routes to them; that path is reachable only through an explicitly
  bypassed value.
- **Two entries are known-unnecessary**: `img|src` and `video|src` are commented as "safe and
  should be removed but they require a G3 clean-up as a small number of tests fail."

`unknown` is not an element. It is the pseudo-tag used when a directive's host bindings are
compiled without knowing which element the directive will land on, so the tag/attribute check is
deferred to `ɵɵvalidateAttribute` at runtime.

### 2.2 Trusted Types sinks — 7 pairs

`packages/compiler/src/schema/trusted_types_sinks.ts`, kept in sync with the
[W3C Trusted Types integration list](https://www.w3.org/TR/trusted-types/#integrations):

| Trusted type       | Sinks                                                           |
| ------------------ | --------------------------------------------------------------- |
| `TrustedHTML`      | `iframe\|srcdoc`, `*\|innerhtml`, `*\|outerhtml`                |
| `TrustedScriptURL` | `embed\|src`, `iframe\|src`, `object\|codebase`, `object\|data` |

This is a narrower list than the security schema and answers a different question: not "does this
need sanitizing" but "does the browser refuse a plain string here under a Trusted Types CSP".

## 3. Runtime sanitizers

All are `@codeGenApi` — the compiler emits calls to them, so their names are part of the
compiler→runtime contract ([19](./19-layering-and-contracts.md)).

| Function                     | Context                | Behaviour when not bypassed                        |
| ---------------------------- | ---------------------- | -------------------------------------------------- |
| `ɵɵsanitizeHtml`             | `HTML`                 | parses and strips via `_sanitizeHtml`              |
| `ɵɵsanitizeStyle`            | `STYLE`                | stringifies only                                   |
| `ɵɵsanitizeUrl`              | `URL`                  | `_sanitizeUrl` — prefixes `unsafe:` on failure     |
| `ɵɵsanitizeResourceUrl`      | `RESOURCE_URL`         | **throws**                                         |
| `ɵɵsanitizeScript`           | `SCRIPT`               | **throws**                                         |
| `ɵɵsanitizeUrlOrResourceUrl` | deferred               | picks URL vs RESOURCE_URL from the runtime tag     |
| `ɵɵvalidateAttribute`        | `ATTRIBUTE_NO_BINDING` | **throws**, or neutralizes the `<iframe>`          |
| `ɵɵtrustConstantHtml`        | —                      | promotes a template literal, rejects interpolation |
| `ɵɵtrustConstantResourceUrl` | —                      | promotes a template literal, rejects interpolation |

`packages/core/src/sanitization/sanitization.ts`.

The URL guard is a single pattern in `url_sanitizer.ts`, taken from the Closure sanitization
library:

```js
const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
```

`ɵɵvalidateAttribute` is the only sanitizer that acts on the DOM rather than the value: for an
`<iframe>` it calls `enforceIframeSecurity` (`iframe_attrs_validation.ts`), which clears `src` and
`srcdoc` and then removes the element from the document.

## 4. Escape hatches

Anything here bypasses layer 2 by design.

- **`bypassSanitizationTrust{Html,Style,Script,Url,ResourceUrl}`** (`bypass.ts`) wrap a string in a
  `SafeValueImpl` whose payload field is named `changingThisBreaksApplicationSecurity`. A
  `ResourceUrl` is accepted in a `URL` context ("strictly more trusted"); every other mismatch
  throws.
- **An injected `Sanitizer`** (`lView[ENVIRONMENT].sanitizer`) takes precedence over the built-in
  logic in every `ɵɵsanitize*` function — it is consulted first and its result is used as-is.

### `DomSanitizer` is not the sanitizer bindings use

This is worth stating plainly, because the names invite the opposite assumption. There are two
distinct tokens:

| Token                                     | Default                         | Reached by                                                                                                  |
| ----------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Sanitizer` (`sanitization/sanitizer.ts`) | `factory: () => null`           | `component_ref.ts:159` — `rootLViewInjector.get(Sanitizer, null)`, stored as `lView[ENVIRONMENT].sanitizer` |
| `DomSanitizer` (`platform-browser`)       | `useExisting: DomSanitizerImpl` | application code that injects it                                                                            |

Nothing in `platform-browser` provides `Sanitizer`, so in an ordinary application
`lView[ENVIRONMENT].sanitizer` is **`null`** and every template binding takes the built-in path —
`_sanitizeHtml` / `_sanitizeUrl`, promoted through the `angular` policy. `DomSanitizer` is a
service an application calls itself; its output only re-enters a binding if the application puts it
there. An application that wires `{provide: Sanitizer, useExisting: DomSanitizer}` moves the whole
binding path onto the custom-sanitizer branch, and therefore onto `angular#unsafe-bypass`.

`DomSanitizerImpl.sanitize` also handles only six of the seven `SecurityContext` members;
`ATTRIBUTE_NO_BINDING` falls to `default:` and throws `Unexpected SecurityContext 6`. Nothing in
the runtime calls it with that value — `ɵɵvalidateAttribute` never consults the injected sanitizer
— so this is reachable only by an application passing a public enum member the service rejects.

## 5. Trusted Types promotion — two policies

| Policy name             | File                                    | Used for                                                           |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| `angular`               | `util/security/trusted_types.ts`        | values Angular itself vouches for — constants and sanitizer output |
| `angular#unsafe-bypass` | `util/security/trusted_types_bypass.ts` | `bypassSecurityTrust*` values and custom-sanitizer output          |

Splitting them is deliberate and useful: a CSP `trusted-types` directive can allow `angular`
without allowing `angular#unsafe-bypass`. Both fall back to plain strings when `trustedTypes` is
absent, and both swallow the `createPolicy` error that occurs when the name is already registered.

## 6. Where values actually land

`packages/platform-browser/src/dom/dom_renderer.ts` — no sanitization happens here; by this point
the value is whatever layers 1–4 produced.

| Method         | Sink                                                      |
| -------------- | --------------------------------------------------------- |
| `setProperty`  | `el[name] = value`                                        |
| `setAttribute` | `el.setAttribute(name, value)` / `el.setAttributeNS(...)` |
| `setStyle`     | `el.style[style] = value` / `el.style.setProperty(...)`   |
| `setValue`     | `node.nodeValue = value`                                  |

The instruction path that reaches them is `setDomProperty` and `setElementAttribute` in
`packages/core/src/render3/instructions/shared.ts`:

```js
// property
value = sanitizer != null ? sanitizer(value, tNode.value || '', propName) : value;
renderer.setProperty(element, propName, value);

// attribute
const strValue = sanitizer == null ? renderStringify(value) : sanitizer(value, tagName || '', name);
renderer.setAttribute(element, name, strValue, namespace);
```

with the comment that states the contract between the layers plainly: _"It is assumed that the
sanitizer is only added when the compiler determines that the property is risky, so sanitization
can be done without further checks."_ The runtime does not re-derive the security context for
properties; it trusts layer 1 to have emitted the right call.

## 7. Guards that are not sanitizers

- **`validateAgainstEventProperties`** (`sanitization.ts:267`) rejects any property binding whose
  name starts with `on`. It runs from `setDomProperty` under `ngDevMode && firstUpdatePass` only.
  That is defensible rather than a hole — assigning a _string_ to `el.onclick` does not create a
  handler, unlike `setAttribute('onclick', …)` — but it does mean the diagnostic is a development
  aid, not a production control.
- **`enforceIframeSecurity`** — described in §3.
- **The `<script>` parser strip** — the reason the schema has no `SCRIPT` entries.

## 8. Recorded while collecting

- The two copies of the security schema in §2.1 are **byte-for-byte identical**, and nothing in the
  repository enforces that: no test compares them, and neither is generated from the other. See
  [findings register § 7](./findings-register.md).
- `ɵɵsanitizeUrlOrResourceUrl` ends with `?? unsafeUrl`, which returns the raw value when no
  sanitizer applies. That is the intended `SecurityContext.NONE` path — the built-in sanitizers
  return `''` rather than `null`, so the nullish fallback cannot swallow a sanitized result.
- In `setElementAttribute`, the sanitizer's return value is discarded when `value == null`. This is
  deliberate and commented: the call is made for its side effect (neutralizing an `<iframe>`)
  before the attribute is removed.
- `SVG_ANIMATION_SENSITIVE_STATIC_VALUES` (`sanitization.ts:323`) covers only `animate` and `set`,
  while the schema's SVG `ATTRIBUTE_NO_BINDING` list also names `animateMotion` and
  `animateTransform`. Checked and consistent: the latter two contribute only `attributeName`, which
  is never bindable, so they need no entry in the static-value table.

## 9. A second sink class: untrusted keys into shared maps

Everything above concerns values flowing into the DOM. A separate sink shape recurs across the
framework and does not touch the DOM at all: **a caller-supplied string used as a property key on an
object that carries `Object.prototype`**. The read then returns an inherited function or object
instead of missing, and a truthiness or `!= null` guard lets it through.

The repository already knows this pattern and fixes it in three places, each with a comment saying
why — so the instances below are omissions rather than an unrecognised risk:

| Hardened                                    | How                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `core/src/i18n/locale_data_api.ts:18`       | `LOCALE_DATA = Object.create(null)` — "to prevent prototype pollution"  |
| `localize/src/translate.ts:74`              | `Object.create(null)`, with a comment naming `__proto__` explicitly     |
| `sanitization/dom_security_schema.ts:63`    | `createNullObj = () => Object.create(null)` for attribute-keyed lookups |
| `common/src/i18n/format_date.ts:37`, `:575` | `NAMED_FORMATS`, `DATE_FORMATS` both `Object.create(null)`              |

Collected sites where the key is caller- or data-supplied and the map is not hardened:

| Site                                                                 | Key comes from                         | Status                                                                                  |
| -------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------- |
| `core/src/i18n/locale_data_api.ts:111`                               | locale string (URL, `Accept-Language`) | **defect** — [register § 42](./findings-register.md)                                    |
| `event-dispatch/src/cache.ts:14`                                     | `jsaction` attribute text              | **defect** — [register § 15](./findings-register.md)                                    |
| `event-dispatch/src/action_resolver.ts:261`                          | event types parsed from the attribute  | **defect (mild)** — register § 15                                                       |
| `localize/tools/…/*_translation_parser.ts`                           | message id from a translation file     | **defect** — [register § 37](./findings-register.md)                                    |
| `common/src/i18n/currencies.ts` via `locale_data_api.ts:771`, `:799` | currency code                          | cleared — every read after the guard is a numeric index, and functions have none        |
| `common/src/i18n/format_date.ts:319`, `:332`, `:599`                 | `role`/`type`/`tagName`                | cleared — every key is `.toUpperCase()`d, and no `Object.prototype` member is uppercase |

Two properties decide whether a site is exploitable, and both are worth checking first:

- **What normalisation runs on the key.** Uppercasing immunises completely; there is no uppercase
  member of `Object.prototype`. Lowercasing does not — `constructor` survives it. Angular's
  `normalizeLocale` also maps `_` to `-`, which is what disqualifies `__proto__` and the
  `__define*__` family and leaves `constructor` as the sole reachable name in § 42.
- **What the code does with the result.** A numeric index into the returned value (`currency[0]`,
  `data[14]`) is `undefined` on both a function and `Object.prototype`, so the damage stops at a
  fallback or a `TypeError`. A _call_, or a string index, carries further.

None of the instances found in this review reach code execution. They produce crashes, silently
dropped entries, and — where the value is cached, as in § 42 — a stale entry that outlives the
request that created it.

## 10. `NgOptimizedImage` — the CSS `url()` and image-URL sinks

`NgOptimizedImage` writes three things the rest of this document does not cover, because none of
them go through a `ɵɵsanitize*` call: the `src` and `srcset` attributes (via
`Renderer2.setAttribute`, which no sanitizer intercepts) and a CSS `url(...)` in
`[style.background-image]`.

| Sink                       | Guard                                                                  | Verified                                                                        |
| -------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `[style.background-image]` | `escapeCssUrl` (`ng_optimized_image/url.ts:50`)                        | 14 adversarial placeholders through a real Chromium CSS parser, 0 breakouts     |
| `src` / `srcset`           | the loader builds the URL; `isAbsoluteUrl` rejects an absolute `ngSrc` | guard is leaky — [register § 43](./findings-register.md) — but no origin escape |

Two structural notes that matter more than either guard:

- **The style write is a single CSSOM property assignment.** `DomRenderer2.setStyle`
  (`platform-browser/src/dom/dom_renderer.ts:424-433`) calls `el.style.setProperty(…)` or assigns
  `el.style[prop]`, neither of which can introduce a sibling declaration however the value is
  shaped. `escapeCssUrl` is defence in depth over that, not the only barrier.
- **The image loaders concatenate, they do not parse.** Every built-in loader interpolates `ngSrc`
  into a path segment of the configured CDN origin, so a scheme-like prefix in `ngSrc` becomes part
  of the path rather than a new origin. That is what keeps § 43's leaky guard from being a
  redirect primitive.

`img|src` is in the security schema (§ 2.1) but is one of the two entries commented there as "safe
and should be removed", so the fact that `NgOptimizedImage` bypasses sanitization by writing the
attribute through the renderer does not lose a control that was doing work.

## 11. The router URL sink — measured, and it holds

`DefaultUrlSerializer` (`router/src/url_tree.ts:447`) is the one place a string from the address bar
becomes application state and then becomes an address-bar string again. Two properties matter: a
value must survive the round trip unchanged, and a hostile URL must not be able to escape the
origin. Both were tested by running the real serializer and parser (staged into the scratchpad with
parameter properties desugared for `node --experimental-strip-types`).

**Round trip — lossless.** Every character with structural meaning in a URL was pushed through
all six positions and read back — the separators, the parenthesis pair, percent, plus, space,
quote, backslash, and the pre-encoded forms of slash and hash:

| Position           | Result               |
| ------------------ | -------------------- |
| path segment       | lossless (24 probes) |
| matrix param key   | lossless             |
| matrix param value | lossless             |
| query param key    | lossless             |
| query param value  | lossless             |
| fragment           | lossless             |

The only mismatches were the empty string — an empty segment or an empty param key, which the
parser's `+`-quantified patterns (`SEGMENT_RE` and friends, `:584-607`) cannot express.

The encoders look asymmetric and are not: `encodeUriSegment` (`:548`) deliberately un-encodes `%26`
back to `&`, and `encodeUriQuery` (`:528`) un-encodes `%3B` to `;`. Each un-encoded character is
absent from the exclusion set of the pattern that parses that position, so both survive.

**Hostile input — collapses to a same-origin path, and is stable.** 18 URLs shaped for
redirect or confusion, checked for `serialize(parse(u))` and then for stability under a second pass:

```
//evil.example/path        -> "/evil.example/path"    stable
///evil.example/path       -> "/evil.example/path"    stable
https://evil.example/x     -> "/https:"               stable
/\/evil.example            -> "/%5C/evil.example"     stable
/%2e%2e/admin              -> "/../admin"             stable

rewritten by one pass: 10/18   unstable on second pass: 0
```

No input produced an oscillation, and no input kept an authority component: a leading `//` becomes an
ordinary first segment. Confirmed at the write end too — `history.pushState` resolved every one of
these against the document without the origin changing.

Recorded as informational, not defects, because each is a degenerate input degrading rather than a
control failing:

- `/a//b` serializes to `/a` — an empty segment truncates the rest of the path.
- `/a?=v` drops the parameter, since an empty query key cannot round-trip.
- `/%2e%2e/admin` serializes as `/../admin`, decoding the escape. This does **not** create a
  divergence: the browser resolves `%2e%2e` and `..` identically in `pushState` — `/a/%2e%2e/b`
  resolves to `/b` whether or not the router decoded it first — so the address bar ends in the same
  place either way.
