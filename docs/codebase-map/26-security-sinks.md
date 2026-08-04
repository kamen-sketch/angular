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
