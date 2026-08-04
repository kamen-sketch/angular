# Findings register

A running record of every defect, gap and unverified oddity this review has found, with the
evidence for each and its current status. Kept as a register rather than prose so that a finding
can be checked off, disputed, or picked up by someone else without rereading the analysis.

**Method rule (from review #14 onward):** pattern matching is used only to _locate_ candidate
files. Every claim below about behaviour comes from reading the file itself. Earlier findings that
came from a scan are marked, because four separate scans in this review produced numbers that had
to be retracted once the code was read — see [§ Retractions](#retractions).

Status values:

| Status         | Meaning                                                            |
| -------------- | ------------------------------------------------------------------ |
| `fixed`        | changed in this branch                                             |
| `open`         | confirmed, not changed                                             |
| `unconfirmed`  | the code reads wrong, but the consequence has not been established |
| `not-a-defect` | investigated and found correct; kept so it is not re-investigated  |

---

## Defects in framework code

### 1. `CONFLICTING_HOST_DIRECTIVE_BINDING` was negative — `fixed`

`packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.ts`

The compile-time error enum encodes "has a guide" as a negative value. This member was `-8024`, so
the diagnostic reported under the wrong code. Changed to `8024`; the API golden was updated to
match.

Verified statically only — the test suite has never been run in this environment.

### 2. Compile-time error guide links never rendered — `fixed`

`packages/compiler-cli/src/ngtsc/core/src/compiler.ts`

`addMessageTextDetails` could not map a `TS-99xxxx` diagnostic code back to its `ErrorCode`, so the
`https://angular.dev/errors/NGxxxx` suffix was never appended for the eight errors that have a
guide. Added `ngErrorCodeToErrorCode`, exported it, and rewrote the append path; 30 assertions
across four spec files were updated and one regression test added.

Verified statically only.

### 3. Defer-block hydration failures never reject their promises — `open`

`packages/core/src/defer/triggering.ts:539`

```js
for (const dehydratedBlockId in hydrationQueue) {
  // `in`, over a string[]
  blocksBeingHydrated.get(dehydratedBlockId)?.reject();
}
```

`hydrationQueue` is `string[]`, so `for…in` yields the indices `"0"`, `"1"`, … while `hydrating` is
keyed by block ids of the form `d<N>` (`hydration/annotate.ts:384`, carried on the `ngb`
attribute). Every `.get()` returns `undefined` and the optional call swallows it, so no promise is
ever rejected. The two neighbouring loops — `populateHydratingStateForQueue` (`:554`) and
`DehydratedBlockRegistry.cleanup` (`registry.ts:66`) — both use `for…of`, so this is a single
slip rather than a house style.

It hangs rather than merely no-ops because a promise reference outlives its map entry:
`hydration/utils.ts:624` captures `hydratingParentBlock.promise` for a nested block, and
`triggering.ts:407` awaits it. When the parent's hydration takes the error path, the promise is
neither rejected (this bug) nor reachable for later rejection (`registry.cleanup` deletes the
entry), so the nested block waits forever: it never hydrates and `replayQueuedEventsFn` is never
called, silently dropping queued user events. `pendingTasks.add()` happens after this point, so
application stability is not affected — the failure is invisible.

Confirmed by transcribing the path into a runnable model
(`scratchpad/repro.mjs`): `for…in` leaves the promise `PENDING`, `for…of` leaves it `REJECTED`.

**The one-word fix is not sufficient.** `packages/core/src/defer/triggering.ts` contains no `try`,
`catch` or `.catch(` anywhere, and all six call sites invoke `triggerHydrationFromBlockName`
fire-and-forget. Making the rejection fire would turn a silent hang into an unhandled rejection, so
the await at `:407` (or each call site) needs a handler in the same change.

No test covers this path; the function appears in
`packages/core/test/bundling/hydration/bundle.golden_symbols.json`, so it does ship.

### 4. `isInSkipHydrationBlock` tests the wrong node inside its own loop — `open`

`packages/core/src/hydration/skip_hydration.ts:60`

```js
export function isInSkipHydrationBlock(tNode: TNode): boolean {
  if (hasInSkipHydrationBlockFlag(tNode)) return true;        // (1)
  let currentTNode: TNode | null = tNode.parent;
  while (currentTNode) {
    if (hasInSkipHydrationBlockFlag(tNode) ||                 // (2) `tNode`, not `currentTNode`
        hasSkipHydrationAttrOnTNode(currentTNode)) {
      return true;
    }
    currentTNode = currentTNode.parent;
  }
  return false;
}
```

(2) re-tests the _argument_ on every iteration. (1) already returned for that case, so (2) is
loop-invariant and always `false`: the walk only ever checks the `ngSkipHydration` **attribute** on
ancestors, never the `inSkipHydrationBlock` **flag** on them. There is no reading under which
repeating `tNode` is meaningful, so this is a slip rather than a deliberate shortcut.

It matters because the two signals are not interchangeable. Reading both places that raise the flag:

- `render3/tnode_manipulation.ts:289` — `createTNode` stamps it while the instruction state is
  inside a skip-hydration root (`state.ts:263`, `skipHydrationRootTNode !== null`). Nodes stamped
  this way also have an attribute-bearing ancestor, so the attribute walk finds them anyway.
- `render3/node_manipulation.ts:1031` — `applyProjection` stamps the projected node at _apply_
  time, and its comment says why: "If a parent `<ng-content>` is located within a skip hydration
  block, annotate an actual node that is being projected with the same flag too." Projected content
  is created in the **declaring** view, so its ancestor chain never reaches the `ngSkipHydration`
  attribute. Here the flag is the only signal — and it is stamped on the projected **head** only.

So a descendant of a projected head has neither the flag nor an attribute-bearing ancestor, and the
predicate returns `false` for content that is in a skip-hydration block. Checking `currentTNode`
would find the flag on the projected head and return `true`.

Consumers of the predicate:

| Site                                        | What the wrong answer would do                                                                                                                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `linker/view_container_ref.ts:769`          | picks hydration mode instead of creation mode for a container the server never serialized; the next branch warns "Unexpected state: no hydration info available for a given TNode, which represents a view container" and falls back |
| `hydration/annotate.ts:630`, `:719`, `:773` | serializer decides whether to emit a node path for projected content                                                                                                                                                                 |
| `hydration/skip_hydration.ts:83`            | `isI18nInSkipHydrationBlock`                                                                                                                                                                                                         |

Related, and evidence the author knew the predicate does not check the node itself:
`isI18nInSkipHydrationBlock` (`:79`) ORs `hasSkipHydrationAttrOnTNode(parentTNode)` in front of the
call, because `isInSkipHydrationBlock` starts its walk at `tNode.parent`. Its first operand,
`hasInSkipHydrationBlockFlag(parentTNode)`, duplicates line (1) and is redundant.

**Consequence not established.** The dead check is unambiguous from the code; whether a view
container can in practice be a descendant of a projected head whose target is a skip-hydration
block, and reach `view_container_ref.ts:769`, has not been demonstrated. No test was found for it.

### 5. Three `InjectionToken` descriptions skip the `ngDevMode` guard — `open`

| File                                                    | Token                                   |
| ------------------------------------------------------- | --------------------------------------- |
| `packages/core/src/application/application_init.ts:150` | `APP_INITIALIZER` (`@publicApi`)        |
| `packages/core/src/application/application_ref.ts:62`   | `APP_BOOTSTRAP_LISTENER` (`@publicApi`) |
| `packages/core/src/defer/idle_service.ts:54`            | `IDLE_SERVICE`                          |

All three write `ngDevMode ? '…' : ''`. The other 100 such tokens in the repository write
`typeof ngDevMode !== 'undefined' && ngDevMode ? … : ''`. `ng_dev_mode.ts` documents why the
`typeof` matters: `ngDevMode` may be undeclared, and a bare reference then throws `ReferenceError`
(angular/angular#31595).

The risk is narrow, not theoretical: in an optimised build `ngDevMode` is substituted with `false`,
and in an unoptimised one `util/empty.ts` defines it at module load — but `packages/core/package.json`
declares `"sideEffects": false`, which permits a bundler to drop `empty.ts` when its exports are
unused. No lint rule enforces the idiom; 100 of 103 sites follow it by discipline alone.

Counts came from locating `new InjectionToken` occurrences and reading each one.

### 6. `withIncrementalHydration()` registers incremental hydration twice — `open`

`packages/platform-browser/src/hydration.ts:250` and `:289`

`provideClientHydration` collects the features it was passed into `providers`:

```ts
for (const {ɵproviders, ɵkind} of features) {
  featuresKind.add(ɵkind);
  if (ɵproviders.length) providers.push(ɵproviders);
}
```

and then separately adds incremental hydration by default:

```ts
featuresKind.has(HydrationFeatureKind.NoIncrementalHydration) ? [] : ɵwithIncrementalHydration(),
providers,
```

The default branch tests only for `NoIncrementalHydration`. It never checks whether the caller
already passed `withIncrementalHydration()`, so `provideClientHydration(withIncrementalHydration())`
puts `ɵwithIncrementalHydration()` into the provider list twice — once from `providers`, once from
the default. That call is exactly what the feature's own deprecation notice describes as
now-redundant ("Since v22.0.0, incremental hydration is enabled by default"), so the redundant form
is the one migrating applications still have.

The duplicated set includes an `APP_BOOTSTRAP_LISTENER` (`hydration/api.ts:356`, `multi: true`), so
`runIncrementalHydrationBootstrap` runs twice, and `processAndInitTriggers`
(`defer/triggering.ts:655`) has no idempotence guard: `setIdleTriggers`, `setTimerTriggers` and
`setViewportTriggers` each register a second callback per defer block — two `onIdle` callbacks, two
timers, two `IntersectionObserver` registrations.

**Severity is duplicated work, not double hydration.** `triggerHydrationFromBlockName` opens with
`if (blocksBeingHydrated.has(blockName)) return;` (`:383`) and populates that map synchronously at
`:402`, so the second firing returns early. `withEventReplay`, which is also inside the duplicated
set, defends itself explicitly with `appsWithEventReplay.has(appRef)` (`event_replay.ts:107`,
`:142`) — evidence that double registration was anticipated in one place and not the other.

No dev-mode warning fires for passing the redundant feature; the only conflict check is
`withIncrementalHydration()` together with `withNoIncrementalHydration()`.

### 7. The DOM security schema is duplicated with nothing enforcing the copies — `open`

`packages/core/src/sanitization/dom_security_schema.ts`
`packages/compiler/src/schema/dom_security_schema.ts`

The table that assigns a `SecurityContext` to each `tag|attribute` pair — 48 pairs, the document
that decides whether a binding is sanitized at all ([26](./26-security-sinks.md)) — exists twice.
The two files are currently **byte-for-byte identical** (`diff` reports no difference), and both
carry the banner:

```
//        DO NOT EDIT THIS LIST OF SECURITY SENSITIVE PROPERTIES WITHOUT A SECURITY REVIEW!
```

Nothing keeps them equal. Neither is generated from the other, and no test compares them — the
files that mention `SECURITY_SCHEMA` under `test/` exercise sanitizer behaviour, not schema
equality.

The copies are load-bearing at different times: the compiler's copy decides which `ɵɵsanitize*`
call to emit, and core's copy answers `getSecurityContext` at runtime for host bindings and for
`ɵɵvalidateAttribute`. A one-sided edit therefore does not fail loudly — it produces a build where
the compiler and the runtime disagree about whether a sink needs sanitizing.

Making the drift likelier: the core copy's `@see` correctly points at the compiler copy, but the
**compiler copy's `@see` points at itself** (`../../../compiler/src/schema/dom_security_schema.ts`
resolves to its own path from `packages/compiler/src/schema/`), so a reader who opens the compiler
copy is never told a second copy exists.

`sanitization.ts:320` carries a third "keep this in sync" comment, for
`SVG_ANIMATION_SENSITIVE_STATIC_VALUES`, with the same absence of enforcement — though that table
was checked and is consistent (see [26 §8](./26-security-sinks.md)).

### 8. The mXSS stabilization loop stops one round-trip early — `open`

`packages/core/src/sanitization/html_sanitizer.ts:312`

```js
// mXSS protection. Repeatedly parse the document to make sure it stabilizes, so that a browser
// trying to auto-correct incorrect HTML cannot cause formerly inert HTML to become dangerous.
let mXSSAttempts = 5;
let parsedHtml = unsafeHtml;

do {
  if (mXSSAttempts === 0) throw new Error('Failed to sanitize html because the input is unstable');
  mXSSAttempts--;

  unsafeHtml = parsedHtml;
  parsedHtml = inertBodyElement!.innerHTML;                       // (a) previous round's element
  inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml); // (b) parses (a)'s input
} while (unsafeHtml !== parsedHtml);
```

(a) reads `innerHTML` from the element parsed in the _previous_ iteration, while `unsafeHtml` has
already advanced to that element's output. The two are one step out of phase, so the comparison
always succeeds on the second iteration:

| iteration | `unsafeHtml` | `parsedHtml`                  | `inertBodyElement` | loop test          |
| --------- | ------------ | ----------------------------- | ------------------ | ------------------ |
| 1         | `H0`         | `serialize(parse(H0))` = `H1` | `parse(H0)`        | `H0 !== H1`        |
| 2         | `H1`         | `serialize(parse(H0))` = `H1` | `parse(H1)`        | `H1 !== H1` → exit |

The serializer is then handed `parse(H1)` without anything having checked that `H1` is stable.
Swapping (a) and (b) — parse first, then read back — makes it converge properly.

Verified by transcribing the loop with a synthetic parser of known fixpoint
(`scratchpad/mxss.mjs`):

```
as written                              round-trips: 2   serializer receives parse of "b"   stable? false
with getInertBodyElement() before .innerHTML   round-trips: 3   serializer receives parse of "c"   stable? true
as written, markup that never stabilizes (a<->b)   threw "input is unstable"? false
```

Two consequences follow. The loop performs exactly **one** meaningful round-trip rather than
iterating to a fixpoint, and `mXSSAttempts` is dead: the budget is never spent and
`Failed to sanitize html because the input is unstable` cannot be thrown, even for markup that
oscillates forever.

The shortfall is reachable in a real parser. Round-tripping test vectors through
`document.implementation.createHTMLDocument().body.innerHTML` in the Chromium in this environment:

| markup                                             | round-trips to a fixpoint |
| -------------------------------------------------- | ------------------------: |
| `<b>hi</b>`                                        |                         1 |
| `<noscript><p title="</noscript>…">`               |                         2 |
| `<svg><foreignObject><p></foreignObject>…`         |                         2 |
| `<math><mtext><table><mglyph><style><!--</style>…` |                     **3** |

**Not demonstrated to be exploitable, and should not be read as an XSS report.** The element and
attribute whitelist in `SanitizingHtmlSerializer` is the primary control, and it strips every tag
involved above — `svg`, `math`, `mglyph`, `style`, `noscript`, `form`, `template` are all absent
from `VALID_ELEMENTS`. What is established is narrower: this defence-in-depth layer does not do
what its own comment says it does, and its failure mode is silent rather than the intended throw.

### 9. The `DOMParser` fallback is handed markup meant for a different parser — `open`

`packages/core/src/sanitization/inert_body.ts:37`

```js
getInertBodyElement(html: string): HTMLElement | null {
  html = '<body><remove></remove>' + html;               // the parameter is reassigned
  try {
    const body = new window.DOMParser().parseFromString(…).body;
    if (body === null) {
      return this.inertDocumentHelper.getInertBodyElement(html);   // ← still the prefixed string
    }
    body.firstChild?.remove();                           // DOMParser path strips the sentinel
    return body;
  } catch {
    return null;
  }
}
```

The `<remove>` sentinel exists only to stop `DOMParser` hoisting tags into `<head>`, and the
`DOMParser` path deletes it again on the next line. The fallback path does not:
`InertDocumentHelper` assigns the string to a `<template>` and returns it unchanged, so `<remove>`
survives into the tree the sanitizer walks.

Two effects, both from the sentinel that should not be there. `SanitizingHtmlSerializer` meets an
element absent from `VALID_ELEMENTS`, sets `sanitizedSomething = true`, and `_sanitizeHtml` logs
"sanitizing HTML stripped some content" for input from which nothing was stripped. And the mXSS
comparison ([§ 8](#8-the-mxss-stabilization-loop-stops-one-round-trip-early)) then compares a
prefixed string against an unprefixed one.

Reachability is narrow: `isDOMParserAvailable()` must be true — otherwise `getInertBodyHelper`
returns `InertDocumentHelper` directly and it correctly receives the raw html — while
`parseFromString(…).body` returns `null`, the legacy iPad case the comment names. Not a security
hole, since the sentinel is stripped by the whitelist either way.

### 10. A computed's dependency list keeps one link per read, not per dependency — `open`

`packages/core/primitives/signals/src/graph.ts:256`

`producerAccessed` collapses a repeated read three ways. Two are always available — the same
producer twice in a row (`:232`), and the incremental-rebuild fast path (`:246`). The third catches
a _non-consecutive_ repeat:

```js
const prevConsumerLink = node.consumersTail;
if (
  prevConsumerLink !== undefined &&
  prevConsumerLink.consumer === activeConsumer &&
  (!isRecomputing || prevConsumerLink.knownValidAtEpoch === epoch)
) {
  return;
}
```

It tests `node.consumersTail` — the **producer's consumers list**. Only live consumers are inserted
there (`producerAccessed` ends with `if (isLive) producerAddLiveConsumer(...)`), so for a consumer
that is not live while it computes, this check can never fire and every read allocates a link.

Verified against the real `graph.ts`, imported through Node's type stripping
(`scratchpad/graphdeps.mjs`). Reading `A B A` produces the dependency list `[A, B, A]` for a
non-live consumer and `[A, B]` for a live one; `A B A B A` gives `[A, B, A, B, A]` versus `[A, B]`.

**This is not confined to unobserved computeds.** `createComputed` (`computed.ts:70`) orders its
getter as

```js
producerUpdateValueVersion(node); // the computation runs here
producerAccessed(node); // the consumer's back-link is created only afterwards
```

so a computed has no consumers during its _first_ computation and is therefore never live for it,
even when a template or effect is what triggered the read. And the duplicates persist: on later
computations the incremental-rebuild fast path matches each stale link in turn and reuses it, so
the list never shrinks while the read pattern repeats.

Measured with a computed read by an always-live consumer, reading two signals in a loop
(`scratchpad/graphfirst.mjs`, `scratchpad/graphdup.mjs`):

| reads per computation | links held | 200 dependency polls |
| --------------------: | ---------: | -------------------: |
|                     2 |          2 |              0.15 ms |
|                    20 |         20 |              0.45 ms |
|                   200 |        200 |              1.44 ms |
|                 2,000 |      2,000 |              1.04 ms |
|                20,000 |     20,000 |             12.89 ms |

A consumer that is live throughout holds 2 links at every size.

**Severity is memory and polling cost, not correctness.** `consumerPollProducersForChange` walks
the whole list, so the cost of checking whether a computed is stale scales with reads per
computation rather than with distinct dependencies. The realistic trigger is a computed that reads
one signal inside a loop over others — `rows().map(r => r.qty() * unitPrice())` alternates, so
`unitPrice` gets a fresh link per row.

## Gaps in repository tooling and data

### 11. `@deprecated` versions are parsed out of prose — `open`

`generate_manifest.mts` takes the first number anywhere in the tag comment. Two live cases:
`getLocaleCurrencyCode` renders as "deprecated since v4217" (from "ISO 4217"), and `ServerXhr` as
"v23" when 23 is the intended _removal_ version. Fixing it is a design choice — require an explicit
leading version, or correct the two comments — so it is recorded rather than changed.

### 12. Three paths match no review group — `open`

`docs/codebase-map` (111 files), `tools/bazel` (9), `goldens/vscode-extension` (2).
`.pullapprove.yml` fails any pull request that matches no group, so these are latent blockers. The
`tools/bazel` case is an enumeration style: `dev-infra` lists sibling directories one at a time.

### 13. Five `{@example}` tags point at a file that does not exist — `open`

`packages/private/testing/matchers/index.ts` (lines 28, 38, 48, 58, 78) reference
`packages/examples/testing/ts/matchers.ts`. Nothing catches it because that package is not
docs-extracted.

### 14. Five example projects are referenced by nothing — `open`

No build checks the reverse direction.

### 15. `analyze-contracts.mjs` skipped four emitted symbols — `fixed`

The analyzer required the `: o.ExternalReference` annotation, which the four type-checking entries
at the end of `Identifiers` omit. They were never checked for resolution against `core` while the
tool reported the contract complete. All four do resolve; the contract is now 215 symbols, not 211.

## Observations recorded so that they are not re-investigated

### 16. 63 `ɵ` names appear in the API goldens — `open`

Across 25 of the 50 golden files, only 3 as declared entries. The other 60 sit inside the
signatures of public symbols (`ɵfac`/`ɵɵFactoryDeclaration` on every exported class;
`ɵTypedOrUntyped` and a dozen siblings typing `FormGroup<T>`). So the `ɵ` prefix means "rename
freely" for `ɵMetadataOverrider` and "renaming this changes a public type" for `ɵTypedOrUntyped`,
and nothing marks which is which.

### 17. Dead guard and stale comment in `retrieveHydrationInfoImpl` — `open`

`packages/core/src/hydration/utils.ts:141` vs `:152`. The comment describes handling `<comp ngh="" />`,
but line 141 (`if (!nghAttrValue) return null;`) already returns for the empty string, so
`if (nghAttrValue !== '')` can never be false. Reading both writers in `annotate.ts` (`:232`, `:840`)
confirms the framework never emits `ngh=""` — they write `index.toString()` or `"a|b"`. Dead code
and a misleading comment, not a live bug.

### 18. `removeDehydratedViewList` does not reset its container — `unconfirmed`

`packages/core/src/hydration/cleanup.ts:56`. Its sibling `removeDehydratedViews` (`:53`) sets
`lContainer[DEHYDRATED_VIEWS] = retainedViews` and explains why — "do not trigger the lookup process
once again". `removeDehydratedViewList` removes the DOM nodes but leaves the array in place, so its
entries keep a `firstChild` pointing at a detached node. Whether anything consults that container
afterwards has not been established.

### 19. `ɵdisableProfiling` has no consumer at all — `open`

Exported from `core_private_export.ts:138`, absent from the `ng` global table (`enableProfiling` is
present, its counterpart is not), and imported nowhere. `profiler.ts:73` is the only other mention.

---

## Not defects — investigated and cleared

Recorded so the same questions are not re-opened.

| Question                                                                                           | Answer                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TEMPLATES = 't'` and `DEFER_HYDRATE_TRIGGERS = 't'` collide (`hydration/interfaces.ts:37`, `:48`) | No. `deferBlockInfo` is a separate object stored in `context.deferBlocks` → `__nghDeferData__`; `ngh` goes to `__nghData__`. Two disjoint schemas each using the short key.                                |
| Path compression round-trip                                                                        | Correct. `compress('b',[f,f,n])` → `"bf2n"` → `decompress` → `['b','f',2,'n',1]`.                                                                                                                          |
| `navigateBetween` discards empty paths (`node_lookup_utils.ts:278`)                                | No. `![]` is `false`, so `!parentPath` catches only `null`. Recursion terminates at `parentElement == null`.                                                                                               |
| `ngh="10\|25"` two-id encoding                                                                     | Correct in both read orders; the remaining id is written back, then the attribute removed.                                                                                                                 |
| `previousTNode.type === TNodeType.Element` uses `===` on a bitmask (`node_lookup_utils.ts:161`)    | Correct. `interfaces/node.ts` states combined values "should never be used for `TNode.type`".                                                                                                              |
| Dev-only error text ships to production                                                            | No. Of 293 `RuntimeError` sites: 179 gate the argument, 36 sit in a lexical `ngDevMode` block, 51 are in transitively dev-only functions, 3 are registered through `ngDevMode ? […] : []`. Zero reachable. |
| `isDevMode()` used internally                                                                      | Never — 0 sites. It is a function call, so it cannot be folded; the framework avoids its own public API here deliberately.                                                                                 |

---

## Retractions

Numbers this review published and then had to withdraw, all from pattern matching rather than
reading. Kept because they are the reason for the method rule at the top.

| Claim                                                            | Corrected to          | Cause                                                                 |
| ---------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------- |
| 259 exports missing from the index                               | —                     | `\w` is ASCII-only and does not match `ɵ` (hit five separate times)   |
| `core → platform-browser` and `compiler → core` dependency edges | do not exist          | `import` statements inside JSDoc samples                              |
| `ApplicationRef` and `Injectable` are `@deprecated`              | they are not          | lazy `[\s\S]*?` ran past `*/`                                         |
| `ɵmod` is a `core` export                                        | it is a property name | `\bas\s+(ɵ…)` matched the English "as" in "such as ɵmod"              |
| `common` publishes 29 `ɵ` names                                  | 18                    | a bare-identifier line pattern counted `import` specifiers as exports |
| 90 dev-only messages ship to production                          | 0                     | gating is at the call site and transitive, not at the message         |
| 5 defer-block sites are ungated                                  | 3, then 0             | per-line gate test missed `&&` continuations onto the next line       |
