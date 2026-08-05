# Findings register

A running record of every defect, gap and unverified oddity this review has found, with the
evidence for each and its current status. Kept as a register rather than prose so that a finding
can be checked off, disputed, or picked up by someone else without rereading the analysis.

**Method rule (from review #14 onward):** pattern matching is used only to _locate_ candidate
files. Every claim below about behaviour comes from reading the file itself. Earlier findings that
came from a scan are marked, because four separate scans in this review produced numbers that had
to be retracted once the code was read — see [§ Retractions](#retractions).

Numbers are stable identifiers assigned in the order findings were confirmed, not positions. A
finding is filed under the section that classifies it, so the numbering within a section can skip —
findings referenced elsewhere keep the number they were published under.

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

### 11. `linkedSignal.set()` passes the internal `ERRORED` sentinel to a user's `equal` — `open`

`packages/core/primitives/signals/src/linked_signal.ts:106`

`update()` guards the errored state explicitly, and says why:

```js
export function linkedSignalUpdateFn(node, updater) {
  producerUpdateValueVersion(node);
  // update() on a linked signal can't work if the current state is ERRORED, as there's no value.
  if (node.value === ERRORED) throw node.error;
  signalUpdateFn(node, updater);
  producerMarkClean(node);
}
```

`set()` has no such guard:

```js
export function linkedSignalSetFn(node, newValue) {
  producerUpdateValueVersion(node);
  signalSetFn(node, newValue); // → if (!node.equal(node.value, newValue)) …
  producerMarkClean(node);
}
```

When the computation has thrown, `node.value` holds the `ERRORED` symbol, so `signalSetFn`
(`signal.ts:91`) calls `node.equal(ERRORED, newValue)`. `ValueEqualityFn<T>` is declared
`(a: T, b: T) => boolean`, so this hands a `Symbol` to a function typed to receive the signal's
value — a type violation visible only at runtime.

Run against the real sources (`scratchpad/linkederr.mjs`), for a `linkedSignal` whose computation
threw:

| equality function                 | `set()`                                                                  | `update()`                            |
| --------------------------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| default (`Object.is`)             | succeeds                                                                 | throws the original computation error |
| `(a, b) => a.id === b.id`         | succeeds, but `a` is `Symbol(ERRORED)`                                   | throws the original error             |
| `(a, b) => a.id.toFixed(0) === …` | **`TypeError: Cannot read properties of undefined (reading 'toFixed')`** | throws the original error             |

The default case is safe by luck: `Object.is` accepts anything, and property reads on a `Symbol`
yield `undefined` rather than throwing, so the second row survives too. Any `equal` that calls a
method on its first argument fails, with a message naming neither the linked signal nor the error
that actually occurred.

`set()` is also the natural way to recover from a failed computation, which is exactly when the
state is errored. Unlike `update()`, it does not need the old value at all — the only thing
consuming it is the equality check.

### 12. Defer-trigger cleanups identify their registration by key, not by identity — `open`

`packages/core/primitives/defer/src/triggers.ts`

Each `on…` function returns a cleanup closure that captures the `DeferEventEntry` it created. The
closures then decide what to tear down by asking whether _a_ registration exists for the element,
never whether it is the one they belong to. `onViewport` guards with

```js
if (!viewportTriggers.get(trigger)?.has(key)) return;
```

which makes a second call to the same cleanup safe — and that is clearly what it is for — but not a
call that arrives after the element has been registered again. `onHover` and `onInteraction` have
no guard at all.

Exercised against the real file, which has no imports and runs directly under Node's type
stripping, with a stub `IntersectionObserver` and element (`scratchpad/viewport.mjs`,
`scratchpad/hover.mjs`):

```
1. double cleanup, no re-registration
   observers created: 1, disconnected: 1
   trigger still registered: false                     ← correct

2. re-register the same element, then call the stale cleanup
   new callback fired before the stale cleanup: 1
   new callback fired after  the stale cleanup: 0      ← the live registration is gone
   trigger still registered afterwards: false
```

The two families fail differently, from the same cause:

- **`onViewport` cancels the live registration.** The stale closure deletes the _new_ entry from
  `viewportTriggers`, while the new `IntersectionObserver` keeps observing the element. The
  observer callback checks `viewportTriggers.has(current.target)` before dispatching, so it now
  finds nothing and the block never triggers on scroll. Silent.
- **`onHover` / `onInteraction` leak listeners.** The stale closure removes the _old_ listener,
  which is no longer attached, and then deletes the element from the map. The live listener stays
  bound but is unreachable, so the next registration attaches a second full set:

```
after re-registration, listeners attached: 3
after stale cleanup, listeners attached: 3
new callback still fires: true
after a third registration, listeners attached: 6
```

A guard on identity rather than presence — `viewportTriggers.get(trigger)?.get(key) !== entry` —
closes both.

**Reachability from Angular's own code is not established.** `invokeTriggerCleanupFns` on
`DehydratedBlockRegistry` runs each cleanup once and then drops the list, so the ordinary path does
not produce a stale call. What is established is that the primitive's contract — "call the returned function to
clean up" — is not safe under re-registration, and that the guard which exists was written for the
adjacent case.

Two smaller things in the same file: `triggerConfig.set(key, entry)` at `:172` is dead, because
`:178` does it unconditionally on both branches; and `config.count` can go negative through the
stale path, which is what stops the observer from being disconnected afterwards.

### 13. The two copies of `ɵɵInjectableDeclaration` have drifted — `open`

`packages/core/primitives/di/src/injection_token.ts:26`
`packages/core/src/di/interface/defs.ts:37`

The same interface is declared twice, and the copies no longer agree:

| Field        | `core/src/di/interface/defs.ts`                                               | `core/primitives/di`                                 |
| ------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------- |
| `providedIn` | `InjectorType<any> \| 'root' \| 'platform' \| 'any' \| 'environment' \| null` | `Type<any> \| 'root' \| 'platform' \| 'any' \| null` |
| `factory`    | required                                                                      | optional                                             |
| `value`      | `T \| undefined`, required                                                    | optional                                             |

`'environment'` is a real scope, not a leftover: `scope.ts:11` declares
`InjectorScope = 'root' \| 'platform' \| 'environment'`, `r3_injector.ts:232` branches on it, and
two injectables in core are declared with it — `cached_injector_service.ts:56` and
`render3/standalone_service.ts:64`.

The primitive's own `defineInjectable` accepts the scope its return type cannot hold, and reaches
for a cast to bridge the two:

```ts
export function defineInjectable<T>(opts: {
  providedIn?: Type<any> | 'root' | 'platform' | 'any' | 'environment' | null;  // accepts it
  …
}): ɵɵInjectableDeclaration<T> {
  return {providedIn: (opts.providedIn as any) || null, …};                     // can't store it
}
```

So the `as any` is not a stylistic shortcut; it is compensating for the drift. The gap has been
felt elsewhere too — `environment_injector_spec.ts:154` writes `providedIn: 'environment' as any`.

Core's copy is the authoritative one: it is marked `@codeGenApi` and carries the note "The
ViewEngine compiler emits code with this type for injectables. This code is deployed to npm, and
should be treated as public api." The primitive's copy is a narrower restatement behind
`@angular/core/primitives`, which `contributing-docs/public-api-surface.md` excludes from the
public API.

This is the same shape as [7](#7-the-dom-security-schema-is-duplicated-with-nothing-enforcing-the-copies):
two hand-maintained copies of one declaration with nothing keeping them equal. Here they have
already diverged.

### 14. `enableProfiling`'s support check stops guarding after the first call — `open`

`packages/core/src/profiler.ts:61`

The platform-support check and the log-once flag share a single condition:

```js
export function enableProfiling() {
  if (
    !warningLogged &&
    (typeof performance === 'undefined' || !performance.mark || !performance.measure)
  ) {
    warningLogged = true;
    console.warn('Performance API is not supported on this platform');
    return;
  }
  enablePerfLogging = true;
}
```

Once the warning has been logged, `!warningLogged` is `false`, so the whole condition is `false`
regardless of platform support and execution falls through to `enablePerfLogging = true`. The
second call enables exactly what the first one refused.

Run against the real file, which has no imports, with `globalThis.performance` deleted
(`scratchpad/proftest.mjs`):

```
warnings logged: 1 ["Performance API is not supported on this platform"]
1st enableProfiling() + measure -> no error
2nd enableProfiling() + measure -> ReferenceError: performance is not defined
```

`startMeasuring` then reaches `performance.mark` on a platform that has no `performance`. Gating
only the `console.warn` on `warningLogged`, and returning on any unsupported platform, fixes it.

**Scope is narrow, and worth stating precisely.** This module has **no consumer anywhere in the
repository**: `enableProfiling`, `disableProfiling`, `startMeasuring`, `stopMeasuring` and
`PERFORMANCE_MARK_PREFIX` are re-exported from `core_private_export.ts:137-143` as `ɵ` symbols and
nothing — in `packages/`, `adev/`, `devtools/` or `modules/` — imports any of them.

There is also a name collision to be aware of before touching either. `@angular/core` exports two
different functions called `enableProfiling`:

| Symbol             | Implementation                                      | Status                                               |
| ------------------ | --------------------------------------------------- | ---------------------------------------------------- |
| `enableProfiling`  | `render3/debug/chrome_dev_tools_performance.ts:375` | `@publicApi v21.0`, returns a teardown function      |
| `ɵenableProfiling` | `src/profiler.ts:61`                                | private, no in-repo consumer, the one described here |

The public one is unaffected. Sibling of
[28](#28-ɵdisableprofiling-has-no-consumer-at-all), which is the same module's other half.

### 15. The jsaction parse cache is a plain object keyed by attribute text — `open`

`packages/core/primitives/event-dispatch/src/cache.ts:14`

```js
const parseCache: {[key: string]: {[key: string]: string | undefined}} = {};

export function getParsed(text: string) {
  return parseCache[text];
}
export function setParsed(text, parsed) {
  parseCache[text] = parsed;
}
```

The key is the raw `jsaction` attribute value, and the object carries `Object.prototype`, so
attribute values that happen to name a prototype member are not ordinary keys. Run against the real
file (`scratchpad/cachetest.mjs`):

```
getParsed("click:foo"     ) -> undefined          truthy: false
getParsed("constructor"   ) -> function Object    truthy: true
getParsed("toString"      ) -> function toString  truthy: true
getParsed("hasOwnProperty") -> function …         truthy: true
getParsed("__proto__"     ) -> {}                 truthy: true
```

Two consequences, both silent.

**Reads skip parsing.** `parseActions` (`action_resolver.ts:259`) does
`actionMap = cache.getParsed(jsactionAttribute); if (!actionMap) { …parse… }`. A truthy inherited
member makes it skip the parse and store the inherited function as the element's action map, so an
element whose whole attribute is `constructor`, `toString`, `valueOf` or `hasOwnProperty` never
gets its actions bound.

**Writes poison the cache.** `setParsed('__proto__', …)` sets the _prototype_ of `parseCache`
rather than a key, which leaks the stored map across unrelated keys:

```
after setParsed("__proto__", {click:"x"}):
  getParsed("__proto__") -> {"click":"x"}
  getParsed("click")     -> "x"        ← a different attribute's lookup now resolves
```

So one element carrying `jsaction="__proto__"` can silently disable a second element carrying
`jsaction="click"`, whose action map becomes the string `"x"`.

**Not reachable through Angular's own attributes.** `setJSActionAttributes`
(`core/src/event_delegation_utils.ts:39-44`) always writes `eventType + ':;'` per event, so the
values Angular generates contain a colon and a semicolon and can never equal a bare prototype
member name. The hazard belongs to hand-authored `jsaction` attributes — the general use of this
package, which is published as `@angular/core/primitives/event-dispatch`.

`Object.create(null)` closes both, and the repository already uses exactly that idiom for the same
reason: `dom_security_schema.ts:63` defines `createNullObj = () => Object.create(null)` for its
attribute-keyed lookups.

Separately, `parseCache` is never bounded or cleared, so it grows with the number of distinct
attribute strings seen. Small for Angular's generated values; unbounded in principle.

**A second plain object in the same flow**, added after reading `action_resolver.ts` in full. The
map `parseCache` stores is itself built as `{}` (`action_resolver.ts:261`), and its keys are the
event types parsed out of the attribute (`:270`), not the whole attribute string — a different key
space from the one above, so it needs checking separately. It is milder in both directions:

- **Writes.** `actionMap[type] = action` assigns a **string**, and assigning a primitive to
  `__proto__` is a silent no-op rather than a reparenting. So `jsaction="__proto__:handler"` simply
  loses that one mapping — own keys `[]`, prototype untouched — and the loss is then cached by
  `setParsed`. `constructor:handler` and `toString:handler` create ordinary shadowing own keys and
  work correctly. (Object semantics exercised directly; the parse loop's real imports pull in the
  DOM.)
- **Reads.** `actionMap[getEventType(eventInfo)]` (`:233`) would return an inherited function for an
  event type named `toString`, `constructor` or `valueOf`, and `setAction` (`:235`) would store that
  function where the rest of the code expects an action-name string. **Not reachable through
  Angular**: `collectDomEventsInfo` filters with `isEarlyEventType` (`hydration/event_replay.ts:248`),
  and `EARLY_EVENT_TYPES` (`event_type.ts:375`) is a fixed allowlist of real DOM event names, none
  of which is an `Object.prototype` member. A standalone consumer calling `EventContract.addEvent`
  (`eventcontract.ts:152`), which accepts any string, is not protected.

Cleared while checking this: `EMPTY_ACTION_MAP` (`:22`) is a process-wide singleton and a parsed map
is shared by every element with the same attribute text (`:274`, `:276`), so anything mutating a map
in place would corrupt unrelated elements. Nothing does — `populateClickOnlyAction`
(`a11y_click.ts:46-64`), the only code handed the map from outside, reads `actionMap[CLICKONLY]`
twice and writes solely to the `EventInfo`.

### 16. `registerDispatcher` on the early event contract has no effect — `open`

`packages/core/primitives/event-dispatch/src/earlyeventcontract.ts:68`

The early contract builds its handler around a local binding and then publishes that binding as a
property:

```js
export function createEarlyJsactionData(container: HTMLElement) {
  const q: EventInfo[] = [];
  const d = (eventInfo: EventInfo) => {
    q.push(eventInfo);
  };
  const h = (event: Event) => {
    d(createEventInfoFromParameters(…));   // ← the closed-over `const d`
  };
  return {c: container, q, et: [], etc: [], d, h};
}

export function registerDispatcher(earlyJsactionData, dispatcher) {
  earlyJsactionData.d = dispatcher;        // ← replaces the property, not the binding
}
```

`h` calls the `const d` it captured, so replacing `.d` cannot change where events go. The intent is
stated plainly in the interface docs — `d` is "Dispatcher handler. Initializes to populating `q`",
and `q` is "List used to push `EventInfo` objects **if the dispatcher is not registered**" — and
that switchover never happens.

Run against the real file (`scratchpad/earlytest.mjs`), registering a dispatcher and then firing a
click through the handler the contract installed:

```
events delivered to the new dispatcher : 0
events still pushed onto the queue `q` : 1
```

**Angular does not depend on it.** `EventContract.replayEarlyEvents` (`eventcontract.ts:192`) reads
`earlyJsactionData.q` directly, replays it, then calls `removeAllEventListeners` — it never invokes
`.d`. And `hydration/event_replay.ts:223` calls a _different_ `registerDispatcher`, the one in
`event_dispatcher.ts` re-exported at `index.ts:13`. There are three functions of that name in this
package.

It is still reachable from outside: `registerAppScopedDispatcher` wraps the ineffective one
(`bootstrap_app_scoped.ts:56`) and is exported from the package index at `index.ts:21`.
`registerGlobalDispatcher` (`bootstrap_global.ts:35`) wraps it too, though that one is not on the
index. A consumer calling either gets silence — no error, no events, and a queue that grows until
someone drains it.

Assigning through the object (`earlyJsactionData.d(...)` inside `h`) is the smaller fix; returning
a mutable holder is the other.

### 17. `EventDispatcher` patches events non-configurably, and reads a bare `ngDevMode` — `open`

`packages/core/primitives/event-dispatch/src/event_dispatcher.ts`

Two things in one file, both about this package being publishable on its own as
`@angular/core/primitives/event-dispatch`.

**Event patching is not idempotent.** `patchEventInstance` (`:172`) defaults to
`configurable: false`, and `prepareEventForBubbling` (`:105`) redefines `stopPropagation` and
`stopImmediatePropagation` on every `dispatchToDelegate`. On a real `Event` those methods live on
the prototype, so the first patch creates an own property that is neither writable nor
configurable, and a second one throws:

```
after 1st patch: {"value":"[fn]","writable":false,"enumerable":false,"configurable":false}
2nd patch -> TypeError: Cannot redefine property: stopPropagation
currentTarget re-patch -> ok (configurable: true)
```

The contrast is the evidence that re-entry was thought about once: `prepareEventForDispatch`
(`:140`) passes `configurable: true` for `currentTarget` with the comment "`currentTarget` is going
to get reassigned every dispatch", because the `while (eventInfoWrapper.getAction())` loop patches
it repeatedly. Nothing gives the same treatment to the bubbling patches, which are outside that
loop — so they are safe only while no `Event` object reaches `dispatchToDelegate` twice.

**Reachability, traced afterwards: closed in the npm build, open in the Google-internal one.** Four
routes were checked.

| Route                                                    | Result                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One type registered in both phases by the early contract | Closed. `BUBBLE_EVENT_TYPES` (52) and `CAPTURE_EVENT_TYPES` (5) are disjoint, and `event_replay.ts:251` classifies each type into exactly one bucket.                                                                                                                                                                |
| Two containers both ancestors of the target              | Closed. `initEventReplay` (`event_replay.ts:208`) builds exactly one `EventContractContainer`.                                                                                                                                                                                                                       |
| The same type registered twice on one contract           | Closed. `addEvent` returns early on `eventType in this.eventHandlers`.                                                                                                                                                                                                                                               |
| **Fan-out in `replayEarlyEventInfos`**                   | **The live route.** `eventcontract.ts:214` expands one early `EventInfo` through `getEventTypesForBrowserEventType` and calls `handleEventInfo` per result, and `cloneEventInfo` (`event_info.ts:167`) copies the wrapper while keeping the _same_ `event` object. Two results therefore dispatch one `Event` twice. |

That last route is gated by a build flag. `browserEventTypeToExtraEventTypes` is only populated when
`getBrowserEventType(eventType) !== eventType`, which holds for exactly `mouseenter`, `mouseleave`,
`pointerenter` and `pointerleave` — and those four are exactly `MOUSE_SPECIAL_EVENT_TYPES`, which
`addEvent` refuses to register while `MOUSE_SPECIAL_SUPPORT` is `false`. `event_contract_defines.ts`
sets it `false` for the published package and marks the `true` variant `g3-only`. So the fan-out
table is always empty here, and reachable where that flag is on and both the base and derived types
are registered.

**A bare `ngDevMode` in a standalone package.** `:130` and `:135` read it directly:

```js
throw new Error(
  PREVENT_DEFAULT_ERROR_MESSAGE + (ngDevMode ? PREVENT_DEFAULT_ERROR_MESSAGE_DETAILS : ''),
);
```

The neighbouring import is types-only despite how it reads:

```js
// Necessary to make the `ngDevMode` global types available.
import '../../../src/util/ng_dev_mode'; // 3p-only
```

`ng_dev_mode.ts` has no top-level statement — it declares the global and defines `initNgDevMode`,
which something else must call — so importing it defines nothing at runtime. Inside an Angular
application `ngDevMode` is initialised long before replay, so this is fine there. A consumer using
the primitive on its own gets `ReferenceError: ngDevMode is not defined` from the patched
`preventDefault`, replacing the intended message with an unrelated one, at exactly the moment the
diagnostic was supposed to help.

Also worth noting for the layering map: this primitive reaches up into `packages/core/src/` for
that import, which no other primitive does.

### 18. `Dispatcher`'s replay queue is never drained — `open`

`packages/core/primitives/event-dispatch/src/dispatcher.ts:98`

```js
private scheduleEventInfoWrapperReplay(eventInfoWrapper: EventInfoWrapper) {
  this.replayEventInfoWrappers.push(eventInfoWrapper);
  if (this.eventReplayScheduled) return;
  this.eventReplayScheduled = true;
  Promise.resolve().then(() => {
    this.eventReplayScheduled = false;
    this.eventReplayer!(this.replayEventInfoWrappers);   // handed over, never cleared
  });
}
```

`replayEventInfoWrappers` is only ever pushed to (`:99`) and read (`:106`) — nothing in the file
clears it, and `createEventReplayer` (`:115`) iterates without draining either. A second batch
arriving after the microtask has run therefore replays the first batch again: push A, flush `[A]`,
push B, flush `[A, B]`.

**The path is dead, which is why this has not bitten.** `eventReplayer` is optional and the only
`new Dispatcher(...)` in the repository — `event_dispatcher.ts:64` — passes just
`{actionResolver}`. With it undefined, `dispatch`'s guard
`if (this.eventReplayer && eventInfoWrapper.getIsReplay())` never holds and
`scheduleEventInfoWrapperReplay` is never reached. Neither `Dispatcher` nor `createEventReplayer`
is exported from the package index, so no consumer can supply one either.

So: a latent double-replay in code that nothing can currently execute. Recorded because the queue
and the flag read as if they were maintained, and the next person to wire an `eventReplayer` would
inherit it.

### 31. The compiler emits i18n descriptions that `$localize` truncates on read-back — `open`

`packages/localize/src/utils/src/messages.ts:253`

```js
const [meaningAndDesc, customId] = meaningDescAndId.split(ID_SEPARATOR, 2);
let [meaning, description]: (string | undefined)[] = meaningAndDesc.split(MEANING_SEPARATOR, 2);
```

The same metadata block has two parsers, and they disagree. The compiler's
`parseI18nMeta` (`packages/compiler/src/render3/view/i18n/meta.ts:317`) splits on the **first**
separator and keeps the whole remainder:

```js
const idIndex = meta.indexOf(I18N_ID_SEPARATOR);
const descIndex = meta.indexOf(I18N_MEANING_SEPARATOR);
[meaningAndDesc, customId] =
  idIndex > -1 ? [meta.slice(0, idIndex), meta.slice(idIndex + 2)] : [meta, ''];
[meaning, description] =
  descIndex > -1
    ? [meaningAndDesc.slice(0, descIndex), meaningAndDesc.slice(descIndex + 1)]
    : ['', meaningAndDesc];
```

`slice` keeps everything after the separator; `split(sep, 2)` discards it. So a description
containing a second `|` survives the compiler and is dropped by `$localize`.

The two are not independent — they are the write and read halves of one wire format.
`LocalizedString.serializeI18nHead` (`packages/compiler/src/output/output_ast.ts:759`) takes the
compiler's parse and re-joins it with the same separators, and `parseMetadata` is what reads that
string back.

Round-trip measured by running both real functions against each other (compiler `parseI18nMeta`
verbatim, `serializeI18nHead` mirrored, then `parseMetadata`):

| `i18n="…"` in the template          | compiler reads meaning/description/id             | `$localize` reads back                        |
| ----------------------------------- | ------------------------------------------------- | --------------------------------------------- |
| `meaning\|plain description`        | `"meaning"` / `"plain description"` / `""`        | same                                          |
| `meaning\|Click here \| then there` | `"meaning"` / `"Click here \| then there"` / `""` | `"meaning"` / `"Click here "` — **truncated** |
| `A \| B \| C`                       | `"A "` / `" B \| C"` / `""`                       | `"A "` / `" B "` — **truncated**              |
| `meaning\|desc@@my-id`              | `"meaning"` / `"desc"` / `"my-id"`                | same                                          |
| `meaning\|desc@@id@@extra`          | `"meaning"` / `"desc"` / `"id@@extra"`            | id `"id"` — **truncated**                     |

A single `|` in a description is not a divergence — both halves treat the leading segment as the
meaning, which is the documented ambiguity of the format. The divergence starts at the **second**
separator.

Impact runs to the translators, not to the runtime. `parseMetadata` feeds `parseMessage`
(`messages.ts:181`), whose `description` (`:212`) is what the extraction serializers write out —
XLIFF1 `:77`, XLIFF2 `:83`, XMB `:77`, ARB `:56`. So `i18n="date|Sort by date | descending"`
reaches the translator as the note "Sort by date ". Message **lookup** is unaffected: the id is
`customId || computeMsgId(messageString, meaning)` (`:202`), and neither input is truncated in the
realistic cases — `meaning` is the leading segment, so it is always intact.

The `customId` row is the same root cause with an unrealistic trigger (`@@` inside an id), and the
`parsePlaceholder` variant (`:290`) is not reachable at all: its `associatedMessageId` is
`computeMsgId` output, which is decimal digits.

No test pins the current behaviour — `messages_spec.ts` covers `:meaning|description:`,
`:meaning|:`, and `:meaning|@@id:`, but nothing with a separator inside a field. So this is
untested behaviour rather than a decision that was recorded.

Contrast with `translations.ts:56`, a few lines away, where the analogous hazard **is** handled
deliberately and documented in a comment (see finding 15).

### 32. `XmlFile` drops empty attributes, and its three callers disagree about that — `open`

`packages/localize/tools/src/extract/translation_files/xml_file.ts:35`

```js
for (const [attrName, attrValue] of Object.entries(attributes)) {
  if (attrValue) {
    // truthiness, so '' is dropped exactly like undefined
    this.output += ` ${attrName}="${escapeXml(attrValue)}"`;
  }
}
```

The attribute type is `string | undefined`, and the test conflates the two. That is not a neutral
choice, because the three serializers built on this writer hold **opposite** conventions about it:

- **XMB depends on the drop.** `xmb_translation_serializer.ts:77` passes
  `{id, desc: message.description, meaning: message.meaning}` with no guard at all, and
  `ParsedMessage` normalises both to `''` (`messages.ts:211`, `:212`). Every message without a
  meaning relies on `''` being omitted rather than emitted as `meaning=""`.
- **XLIFF 1 and 2 are written as if it does not happen.** `xliff2_translation_serializer.ts:148`,
  `:166`, `:169` and `xliff1_translation_serializer.ts:124`, `:127` all guard with
  `!== undefined` — a distinction that only means anything if `''` reaches the output. It does not.

So one of the two conventions is wrong, and the writer cannot satisfy both.

For the `disp`/`equiv-text` attributes the `!== undefined` guards are merely redundant: the producer
already normalises at `tools/src/source_file_utils.ts:497`, `text: startPath.getSource() || undefined`.

The value that _can_ be `''` is the placeholder **name**, which both XLIFF serializers pass
unconditionally — `equiv: placeholderName` (`xliff2:160`) and `{id}` (`xliff1:119`). It reaches `''`
because `parsePlaceholder` returns `block.split(ID_SEPARATOR)[0]` (`messages.ts:294`) and an empty
`::` block makes that the empty string, while `parseMessage`'s destructuring default
(`messages.ts:188`) only substitutes `computePlaceholderName(i)` for `undefined`:

```
parsePlaceholder('::x')            {"messagePart":"x","placeholderName":""}
placeholder written  ':NAME:'   ->  ["NAME"]
placeholder written  '::'       ->  [""]      <- default did NOT apply
placeholder written  (no block) ->  ["PH"]    <- default DID apply
```

Run against the real `XmlFile`, the name then disappears from the output entirely:

```
xml.startTag('ph', {id: '0', equiv: '',     type: 'x'}, {selfClosing: true})  ->  <ph id="0" type="x"/>
xml.startTag('ph', {id: '0', equiv: 'NAME', type: 'x'}, {selfClosing: true})  ->  <ph id="0" equiv="NAME" type="x"/>
```

That output does not survive its own reader. `MessageSerializer.visitElement` fetches the name with
`getAttrOrThrow` (`message_serialization/message_serializer.ts:51`) against the configured
`nameAttribute` — `equiv` for XLIFF 2 (`xliff2_translation_parser.ts:162`), `id` for XLIFF 1
(`xliff1_translation_parser.ts:164`) — and `getAttrOrThrow` throws on a missing attribute
(`translation_utils.ts:23-28`). Notably it throws only on `undefined`; `getAttribute` (`:31`)
returns `''` for `equiv=""` quite happily. **The reader already draws the distinction the writer
erases** — had the attribute been written as `equiv=""`, the round trip would have worked.

Reachability is narrow: the compiler always emits a placeholder name, so an empty `::` block only
comes from hand-written `$localize` tagged strings. The failure is at least loud — a `ParseError`
at translate time, not silent corruption. Recorded because the fix is confined to one line and the
`!== undefined` guards in both XLIFF serializers currently document an intent the writer does not
honour.

Cleared while reading the same file: `escapeXml` (`xml_file.ts:105`) replaces `&` **first**, so
entities are not double-escaped — `<script>&"'` renders as `&lt;script&gt;&amp;&quot;&apos;`,
confirmed against the real function. The one `rawText` escape bypass (`xmb:46`) writes a constant
DOCTYPE.

### 33. A shared XML helper reports every format as XLIFF 1.2 — `open`

`packages/localize/tools/src/translate/translation_files/translation_parsers/translation_utils.ts:130`

```js
if (rootElements.length > 1) {
  xml.errors.push(
    new ParseError(
      xml.rootNodes[1].sourceSpan,
      'Unexpected root node. XLIFF 1.2 files should only have a single <xliff> root node.',
      ParseErrorLevel.WARNING,
    ),
  );
}
```

`canParseXml` is a generic helper parameterised by `rootNodeName`, and it has three callers:

| Caller                            | Call                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| `xliff1_translation_parser.ts:36` | `canParseXml(filePath, contents, 'xliff', {version: '1.2'})` |
| `xliff2_translation_parser.ts:35` | `canParseXml(filePath, contents, 'xliff', {version: '2.0'})` |
| `xtb_translation_parser.ts:41`    | `canParseXml(filePath, contents, 'translationbundle', {})`   |

Only the first matches the message. An XTB file with two `<translationbundle>` roots is told that
"XLIFF 1.2 files should only have a single `<xliff>` root node" — wrong format _and_ wrong element
name — and an XLIFF 2.0 file is told it is XLIFF 1.2.

The parameter is in scope and the function's other two messages use it correctly (`:113`
`` `The XML file does not contain a <${rootNodeName}> root node.` ``, `:123`
`` `The <${rootNodeName}> node does not have the required attribute…` ``), so this is a line left
behind when the helper was generalised out of the XLIFF 1.2 parser rather than a deliberate
specialisation. Diagnostic text only; nothing downstream branches on it.

Two things in the same file that look wrong and are not, checked because both would be worse than
the above:

- **`getInnerRange` asserts non-null on `endSourceSpan` (`:61`).** It is null only for
  `INCOMPLETE_TAG_OPEN`, where `parser.ts:457-460` also pushes a `TreeError`. `ParseError`'s level
  defaults to `ParseErrorLevel.ERROR` (`compiler/src/parse_util.ts:158`), `canParseXml` rejects on
  any ERROR (`:104`), and `TranslationLoader.loadBundle` only calls `parse()` after `analyze()`
  returned `canParse: true` (`translation_loader.ts:67-77`) — there is no forced-format path. So
  the element tree handed to `parseInnerRange` never contains an unterminated tag.
- **A self-closing `<target/>` produces an inverted lexer range.** `XmlTagDefinition.canSelfClose`
  is `true`, so `<target/>` is valid XML with no error, and `parser.ts:453` sets `endSourceSpan` to
  the _full_ start-tag span. `getInnerRange` then returns `startPos` = offset after `/>` and
  `endPos` = offset of `<`, i.e. `startPos > endPos`. This is harmless: the cursor's
  `state.offset >= this.end` test (`lexer.ts:1723`) yields `$EOF` on the first peek, the tokenizer
  loop at `:230` never runs, and the result is zero nodes — which is the correct reading of an
  empty translation.

### 34. One `$localize` arity check raises a diagnostic, its twin crashes — `open`

`packages/localize/tools/src/source_file_utils.ts:156`

```js
if (cooked.isCallExpression()) {
  let call = cooked;
  if (call.get('arguments').length === 0) {
    // No arguments so perhaps it is a `__templateObject()` call.
    call = unwrapLazyLoadHelperCall(call);
  }
  cooked = call.get('arguments')[0];
  if (!cooked.isExpression()) {          // TypeError when there is still no argument
```

`unwrapLazyLoadHelperCall` does not guarantee it returns a call with arguments. Its last line
(`:365`) is `return call` — the _original_ zero-argument call, the one whose emptiness sent us here.
That path is taken whenever the helper's returned expression is neither a call (`:331`) nor an
identifier (`:335`); `getReturnedExpression` accepts any expression, so a helper returning an array
literal or a member expression lands there. `call.get('arguments')[0]` is then `undefined` and
`.isExpression()` throws.

The same situation on the outer call, 60 lines earlier, is handled properly:

```js
let cooked = call.get('arguments')[0];
if (cooked === undefined) {
  throw new BabelParseError(call.node, '`$localize` called without any arguments.');
}
```

The difference is not cosmetic, because the two error types take different routes out. Every
translate and extract plugin branches on the type — `es2015_translate_plugin.ts:55`:

```js
} catch (e) {
  if (isBabelParseError(e)) {
    throw buildCodeFrameError(fs, path, state.file, e);   // filename + code frame
  } else {
    throw e;                                              // raw, no location
  }
}
```

So the guarded case names the file and points at the offending `$localize` call, while this one
surfaces as a bare `Cannot read properties of undefined (reading 'isExpression')` with nothing
identifying which file or which call produced it — during a build that may be processing thousands
of them.

### 35. A dead optional chain in `getFileFromPath` — `open`

`packages/localize/tools/src/source_file_utils.ts:509`

```js
function getFileFromPath(fs: PathManipulation, path: NodePath | undefined): AbsoluteFsPath | null {
  // The file field is not guaranteed to be present for all node paths
  const opts = (path?.hub as {file?: File}).file?.opts;
```

The parentheses end the optional chain. `?.` short-circuits only to the end of _its own_ chain, and
`(path?.hub as T)` closes it, so `.file` is a fresh member access on whatever the parenthesised
expression evaluated to. When that is `undefined`, it throws rather than short-circuiting:

```
as written       path undefined       -> TypeError: Cannot read properties of undefined (reading 'file')
as written       path.hub undefined   -> TypeError: Cannot read properties of undefined (reading 'file')
as written       path.hub present     -> {"filename":"x"}
unbroken chain   path undefined       -> undefined
unbroken chain   path.hub undefined   -> undefined
unbroken chain   path.hub present     -> {"filename":"x"}
```

Both the signature (`path: NodePath | undefined`) and the comment above it say the author meant to
tolerate a missing value here; the `?.` was the mechanism, and it does nothing. The `as {file?: File}`
cast is what hides it — it replaces the type of `path?.hub`, which included `undefined`, with one
that does not, so the compiler cannot flag the unguarded `.file`.

Latent rather than live: `getLocation` is the only caller, and it passes `startPath` (non-optional)
at `:485` and guards the optional one with `endPath &&` at `:491`. Whether `path.hub` itself can be
`undefined` at runtime is the open half — the cast exists precisely because Babel's declared type
for `hub` does not carry `file`, and this environment cannot install `@babel/core` (pinned at
`8.0.1` in `package.json`; the registry is blocked) to check whether `hub` is optional there. So:
the guard is provably inoperative, and how often it would need to fire is unresolved.

### 36. `findEndOfBlock` desynchronises on any escape longer than two raw characters — `open`

`packages/localize/src/utils/src/messages.ts:344`

```js
for (let cookedIndex = 1, rawIndex = 1; cookedIndex < cooked.length; cookedIndex++, rawIndex++) {
  if (raw[rawIndex] === '\\') {
    rawIndex++; // one extra, whatever the escape's real length
  } else if (cooked[cookedIndex] === BLOCK_MARKER) {
    return cookedIndex;
  }
}
```

The loop walks `cooked` and `raw` in lockstep, consulting `raw` only to tell an escaped `\:` from a
real block terminator. An escape always costs one character in `cooked`, so the compensation is a
single extra `rawIndex++`. That is right for `\n`, `\t`, `\0`, `\\` and `\:` — two raw characters —
and wrong for every longer form. After one of those, `rawIndex` lags, `raw[rawIndex]` no longer
points at the character it is being asked about, and a later `\:` stops being recognised as escaped.

Measured with the real function, each block containing one escape followed by an escaped colon:

| escape in the block | raw length | result                               |
| ------------------- | ---------- | ------------------------------------ |
| none                | –          | ok                                   |
| `\n`                | 2          | ok                                   |
| `\0`                | 2          | ok                                   |
| `\x41`              | 4          | **wrong** — block ends 2 chars early |
| `\u0041`            | 6          | **wrong** — block ends 2 chars early |
| `\u{41}`            | 7          | **wrong** — block ends 2 chars early |

The consequence is not confined to metadata. The block terminator is where the _message_ starts, so
an early return moves text out of the block and into the message:

```
raw     ":Caf\u00e9\: hello:MESSAGE"
cooked  ":Café: hello:MESSAGE"
parsed  {"text":" hello:MESSAGE","description":"Café"}
        expected: text "MESSAGE", description "Café: hello"
```

That is the rendered user-facing string — the tail of the developer's description leaks into the UI.
It also changes `messageString`, and therefore `computeMsgId` (`messages.ts:202`), so the translation
lookup misses as well. Both `parseMetadata` and `parsePlaceholder` reach it through `splitBlock`
(`:323`), and the pass-through runtime reaches it through `stripBlock`
(`src/localize/src/localize.ts:180`), so extraction, translation and untranslated rendering are all
affected.

**The compiler supplies half the trigger on its own.** `escapeColons`
(`compiler/src/output/output_ast.ts:830`) rewrites _every_ colon in a metadata block as `\:`:

```js
const escapeColons = (str: string): string => str.replace(/:/g, '\\:');
```

so any `i18n` description containing a colon — `i18n="Note: check the date"` — is emitted with the
`\:` this bug mishandles. What it does not supply is the preceding long escape: `escapeSlashes`
(`:828`) only doubles backslashes and `escapeForTemplateLiteral` (`:831`) only handles the backtick
and `${`, so the compiler's own output stays clean, as the first row of the end-to-end run confirms.

Reachability therefore splits:

- **Unconditional.** A hand-written `$localize` whose metadata block contains a `\x`/`\u` escape and
  a colon hits this with no build tooling involved.
- **Conditional, and the reason this is filed as a defect rather than a curiosity.** Escaping
  non-ASCII to `\uXXXX` is ordinary minifier behaviour, and `@angular/localize/tools` is designed to
  run over bundled output — that is what the `__makeTemplateObject` and lazy-helper handling in
  `source_file_utils.ts` exists for. A description reading `Café: hello` would then arrive as
  `:Caf\u00e9\: hello:` and corrupt exactly as shown above. **I could not verify which tool in the
  CLI pipeline, if any, actually emits that escape** — `node_modules` is absent and the registry is
  blocked in this environment — so treat the second row of the run above as a demonstration of the
  mechanism, not as evidence that a released build produces it.

The fix does not need the escape table: `rawIndex` can be derived rather than tracked, or the raw
string consulted only at the candidate terminator.

### 37. Every tools translation bundle is a plain object keyed by message id — `open`

`packages/localize/src/utils/src/translations.ts:58`

```js
let translation = translations[message.id];
if (message.legacyIds !== undefined) {
  for (let i = 0; i < message.legacyIds.length && translation === undefined; i++) {
    translation = translations[message.legacyIds[i]];
  }
}
if (translation === undefined) {
  throw new MissingTranslationError(message);
}
```

The key is a message id — a developer's `@@custom-id`, or an `id` attribute read verbatim out of a
translation file. The container is whatever the caller passed. The runtime builds it safely:

```js
// packages/localize/src/translate.ts:74
$localize.TRANSLATIONS = Object.create(null);
```

with a comment explaining exactly why. Every parser in the tools package does not:

| File                                 | Line                              |
| ------------------------------------ | --------------------------------- |
| `xliff1_translation_parser.ts`       | `:58`, `:78` — `translations: {}` |
| `xliff2_translation_parser.ts`       | `:68`                             |
| `xtb_translation_parser.ts`          | `:56`                             |
| `arb_translation_parser.ts`          | `:77`                             |
| `source_file_translation_handler.ts` | `:97`                             |

Run against the real `translate`, one bundle of each kind, all three consequences reproduce:

```
--- read side: does a lookup for an inherited name miss? ---
  constructor      tools {}: function <- FOUND        Object.create(null): undefined (ok)
  toString         tools {}: function <- FOUND        Object.create(null): undefined (ok)
  __proto__        tools {}: object   <- FOUND        Object.create(null): undefined (ok)

--- what translate() does with id "constructor" ---
  tools {}             TypeError (wrong): Cannot read properties of undefined (reading 'map')
  Object.create(null)  MissingTranslationError (correct)

--- write side: storing under "__proto__" ---
  tools {}             stored as own key: false | readable back: false
  Object.create(null)  stored as own key: true  | readable back: true

--- duplicate detection (xliff1:128) ---
  first sighting of real-id        -> accepted (ok)
  first sighting of constructor    -> reported as DUPLICATE (wrong)
  first sighting of toString       -> reported as DUPLICATE (wrong)
```

Three distinct failures, in increasing order of how badly they end:

1. **Lookup finds a function.** `translations['constructor']` returns `Object.prototype.constructor`,
   which is not `undefined`, so the guard at `:65` passes and `translation.placeholderNames.map`
   throws a `TypeError` in place of the `MissingTranslationError` the caller handles. That handler
   is `source_file_utils.ts:430`, which routes a missing translation to the configured
   `missingTranslation` strategy — warn, error or ignore — so a build that was configured to
   tolerate missing translations crashes instead.
2. **Writes under `__proto__` vanish.** `bundle.translations[id] = translation`
   (`xliff1_translation_parser.ts:167`) assigns through the inherited setter, reparenting the bundle
   rather than storing the entry. No error, and the translation is simply absent afterwards.
3. **A first sighting is reported as a duplicate.** `if (bundle.translations[id] !== undefined)`
   (`:128`) is true on the very first `<trans-unit id="constructor">`, and the resulting
   `ParseErrorLevel.ERROR` makes `TranslationLoader.loadBundle` throw
   (`translation_loader.ts:78-82`). The whole translation file is rejected with
   `Duplicated translations for message "constructor"` for a message that appears exactly once.

This is the third instance of the same hazard in this review — see finding 15 for the jsaction parse
cache, and `translate.ts:74` for the one place it is handled deliberately. The ids involved are
ordinary English words, so no adversary is required; `@@constructor` is a plausible thing to type.

### 38. `createMouseSpecialEvent` hands the application an event with no methods — `open`

`packages/core/primitives/event-dispatch/src/event.ts:421`

```js
const copy = {};
for (const property in e) {
  if (property === 'srcElement' || property === 'target') continue;
  const value = e[key];
  if (typeof value === 'function') continue; // every method is skipped
  copy[key] = value;
}
```

The result is a plain object, and `action_resolver.ts:190` installs it as the `EventInfo`'s event
(`setEvent(eventInfo, copiedEvent)`), so it is what a `mouseenter`/`mouseleave` handler receives.
Skipping functions is deliberate — you cannot copy a method onto a plain object and have it work on
the copy — but nothing puts substitutes back.

The sibling factory ten lines down does. `recreateTouchEventAsClick` (`:495`) runs the same loop and
then reinstalls working stand-ins at `:521` and `:523`:

```js
click['defaultPrevented'] = false;
click['preventDefault'] = syntheticPreventDefault;
click['_propagationStopped'] = false;
click['stopPropagation'] = syntheticStopPropagation;
```

Run in Chromium against a real `MouseEvent`, the difference is exactly that:

```
  preventDefault             real Event: function | createMouseSpecialEvent: undefined | recreateTouchEventAsClick: function
  stopPropagation            real Event: function | createMouseSpecialEvent: undefined | recreateTouchEventAsClick: function
  stopImmediatePropagation   real Event: function | createMouseSpecialEvent: undefined | recreateTouchEventAsClick: undefined
  composedPath               real Event: function | createMouseSpecialEvent: undefined | recreateTouchEventAsClick: undefined

  direct copy.preventDefault() -> TypeError: copy.preventDefault is not a function
  instanceof Event: real=true copy=false
  data properties copied: 45
```

So a handler calling `event.preventDefault()` throws, and the library's own
`eventLib.preventDefault` (`:111`) fails silently instead — its fallback is
`e.returnValue = false`, which on a plain object sets an ignored property. `stopPropagation` (`:104`)
degrades the same way through `cancelBubble`.

**Not reachable in the published build**, which is why it has not bitten:

- `MOUSE_SPECIAL_SUPPORT` is a hard `false` in the 3p build
  (`event_contract_defines.ts`; the `goog.define` form is g3-only), and `EventContract.addEvent`
  returns early for the mouse special types when it is false (`eventcontract.ts:157`).
- The one `new ActionResolver` in the package (`event_dispatcher.ts:63`) passes only
  `{clickModSupport}`, so `syntheticMouseEventSupport` keeps its `false` default and the branch
  guarding this call (`action_resolver.ts:164`) never opens.
- Neither `ActionResolver` nor `createMouseSpecialEvent` is exported from `index.ts`, so a
  standalone consumer of `@angular/core/primitives/event-dispatch` cannot enable it either.

Only `test/dispatcher_test.ts:317` constructs a resolver with the flag on. Recorded for the same
reason as finding 18: two factories in one file, written to the same shape, and only one of them
restores what the copy loop removes.

**And unlike the other dead subsystem in this file, it ships.** `event.ts` carries a second body of
unreachable code — the a11y-click machinery, whose entry point `addA11yClickSupport`
(`action_resolver.ts:282`) has no production caller either; the only hits in `packages/core` are in
`test/dispatcher_test.ts`. Checking both against the eight bundle goldens:

| Symbol                              | In any golden bundle                                 |
| ----------------------------------- | ---------------------------------------------------- |
| `isActionKeyEvent`                  | no                                                   |
| `isValidActionKeyTarget`            | no                                                   |
| `IDENTIFIER_TO_KEY_TRIGGER_MAPPING` | no                                                   |
| `updateEventInfoForA11yClick`       | no                                                   |
| `NATIVELY_FOCUSABLE_ELEMENTS`       | no                                                   |
| `isSpaceKeyEvent`                   | no                                                   |
| `recreateTouchEventAsClick`         | no                                                   |
| `getTouchData`                      | no                                                   |
| `isMouseSpecialEvent`               | **yes** — `hydration/bundle.golden_symbols.json:728` |
| `createMouseSpecialEvent`           | **yes** — `:450`                                     |

The difference is how each is guarded. Nothing references the a11y functions at all until
`addA11yClickSupport` is called, so they drop cleanly. The mouse-special pair is referenced directly
inside `if (this.syntheticMouseEventSupport)` (`action_resolver.ts:164`) — an instance field assigned
in a constructor, which a bundler cannot fold away the way it can a module-level `false`. So the
branch is provably dead by inspection and provably alive to the optimiser.

That lands in the one place the file argues it must not: `eventcontract.ts:28-30` states the binary
compiled from this code "MUST be kept as small as possible" because it is inlined into the page.
Making `syntheticMouseEventSupport` fold — deriving it from `MOUSE_SPECIAL_SUPPORT` rather than from
a constructor argument — would remove both symbols and make the correctness question above moot.

### 39. An unpaired quote in a date format is deleted, and the rest becomes date data — `open`

`packages/common/src/i18n/format_date.ts:38`

```js
const DATE_FORMATS_SPLIT =
  /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|…|O{1,4}))([\s\S]*)/;
```

The pattern has no `^`. `formatDate`'s tokenizer (`:100-113`) calls `exec` and keeps only group 1
(the token) and group 2 (the remainder), so **anything before the match position is discarded** —
it is in neither capture group and nothing else looks at it.

Exactly one character can fail to start a match. Alternative 1 accepts everything outside
`BEGHLMOSWYZabcdhmswyz'`, and every excluded letter begins a token in alternative 3, so the only way
to reach the end of the alternation is an apostrophe with no closing partner. When that happens the
apostrophe is deleted and the text it was meant to quote is re-tokenised as format specifiers.

Run against the real regex and the real loop:

| format           | renders as              | what the tokens are                      |
| ---------------- | ----------------------- | ---------------------------------------- |
| `'Week' w`       | `Week <w>`              | correct — quote is paired                |
| `'Week w`        | `<W>eek <w>`            | `W` = week-of-month                      |
| `'Updated`       | `Up<d><a>te<d>`         | `d` = day, `a` = AM/PM                   |
| `'Est. delivery` | `<E><s>t. <d>eliver<y>` | `E` = weekday, `s` = seconds, `y` = year |
| `MMM d 'yy`      | `<MMM> <d> <yy>`        | the apostrophe is simply gone            |

So `formatDate(d, "'Updated", 'en')` returns something like `Up15AMte15` rather than `Updated`, with
no error in any mode. Dropping a closing quote is an ordinary typo, and the failure is silent and
produces plausible-looking output — digits and weekday names embedded in what should be literal
text — so it is the kind of thing that reaches production.

The file already validates formats, which is why this reads as an oversight rather than a decision:
`assertValidDateFormat` (`:153`) runs under `ngDevMode` and throws `SUSPICIOUS_DATE_FORMAT` for the
much subtler `Y`-versus-`y` mix-up. The same error code would fit here.

Anchoring the pattern with `^` would also fix it without a new check: the tokenizer's `else` branch
(`:109-112`) already pushes an unmatched remainder as a single literal part, which is the sensible
reading of a malformed tail.

**Cleared while measuring this**: `MAX_DATE_FORMAT_LENGTH = 256` (`:40`, enforced at `:94`) is not
guarding catastrophic backtracking. The nested quantifier `(?:[^']|'')*` looks like the classic
shape, but the two branches are disjoint on their first character, so there is nothing to backtrack
over. Timed on the real regex, well past the limit:

```
  quotes x256          len=256    iterations=1      0.3ms
  quotes x4096         len=4096   iterations=1      0.0ms
  open quote + junk    len=4096   iterations=1      0.1ms
  alternating          len=4096   iterations=2048   8.0ms
  all tokens           len=4080   iterations=4080   20.5ms
```

Linear in the number of tokens, not exponential in length. (`parts = parts.concat(…)` inside the
loop is quadratic in allocations, which is what the last two rows show; at the 256-char limit it is
immaterial.)

### 40. `toDate` reads an 8-digit ISO date as a millisecond timestamp — `open`

`packages/common/src/i18n/format_date.ts:948`

```js
const parsedNb = parseFloat(value);

// any string that only contains numbers, like "1234" but not like "1234hello"
if (!isNaN((value as any) - parsedNb)) {
  return new Date(parsedNb);
}

let match: RegExpMatchArray | null;
if ((match = value.match(ISO8601_DATE_REGEX))) {
  return isoStringToDate(match);
}
```

`ISO8601_DATE_REGEX` (`:33`) is written to accept the ISO 8601 **basic** format — the `-?` between
each component is deliberate, and the pattern matches `20150101` as year 2015, month 01, day 01.
But a string of digits never gets that far: the numeric-timestamp branch above it accepts anything
that coerces to a number, and `20150101` does.

```
does ISO8601_DATE_REGEX itself accept the basic format?
  20150101         yes -> y=2015 m=01 d=01

what toDate actually returns:
  "2015"             short-ISO   2015-01-01T00:00:00.000Z
  "2015-01-01"       short-ISO   2015-01-01T00:00:00.000Z
  "20150101"         TIMESTAMP   1970-01-01T05:35:50.101Z   <- 20150101 ms after the epoch
  "20150101T120000"  ISO8601     2015-01-01T12:00:00.000Z
```

The last two rows are the same calendar date written two ways, and only one of them survives.
`20150101T120000` reaches the ISO branch solely because the `T` makes the numeric coercion `NaN`;
strip the time and the identical date silently becomes 1970.

This is reachable from `DatePipe`: `transform` calls `formatDate` (`date_pipe.ts:275`), which calls
`toDate` (`:93`), and `formatDate` is itself public API (`goldens/public-api/common/index.api.md:183`).
A compact `YYYYMMDD` date from a backend is an ordinary thing to bind, and the result is a
plausible-looking 1970 date rather than an error.

The ordering is not gratuitous — a 13-digit epoch string like `1420070400000` would otherwise be
mangled by the ISO pattern, which would read it as year 142007040, month 00, day 00. So the numeric
branch does need to come first; it is simply too broad, catching the one width that is also a valid
basic-format date.

Two smaller things confirmed in the same run:

- **The comment's own example is wrong.** `:950` offers `"1234"` as a string that "only contains
  numbers" and should become a timestamp. It never reaches that line — `/^(\d{4}…)$/` at `:936`
  claims it first and returns the **year 1234**.
- **The guard and the value disagree on non-decimal literals.** The test coerces the whole string
  (`value - parsedNb`) while the result uses `parseFloat`, which stops at the first non-decimal
  character. So `"0x10"` passes the guard as 16 and is then constructed from 0 — `new Date(0)`.
  Same for `"0b101"` and `"0o17"`. Exotic input, but it shows the two halves of the branch are not
  measuring the same thing.

### 41. `formatCurrency` substitutes the currency symbol into an unescaped `replace` — `open`

`packages/common/src/i18n/format_number.ts:203`

```js
return (
  res
    .replace(CURRENCY_CHAR, currency)
    // if we have 2 time the currency character, the second one is ignored
    .replace(CURRENCY_CHAR, '')
    .trim()
);
```

`CURRENCY_CHAR` is `¤`, and `res` is the formatted number still carrying the placeholder from the
locale pattern — for `en` that pattern is `¤#,##0.00`
(`packages/core/src/i18n/locale_en.ts:20`), so `res` is `¤1,234.00` with exactly one `¤`. Two
separate problems come out of these two lines.

**A real currency code renders with no symbol.** Angular's own generated table contains

```js
"XXX":["¤"]   // packages/common/src/i18n/currencies.ts
```

`XXX` is the ISO 4217 code for "no currency", and its symbol _is_ the placeholder character. So the
first `replace` swaps `¤` for `¤` — leaving the string unchanged — and the second one, whose job is
to strip a _duplicate_ placeholder, strips the symbol that was just installed:

```
code     symbol     formatCurrency output
USD      "$"        "$1,234.00"
CAD      "CA$"      "CA$1,234.00"
XXX      "¤"        "1,234.00"        <- symbol gone
UNKNOWN  "UNKNOWN"  "UNKNOWN1,234.00"
```

The comment describes the case it was written for — a pattern containing two placeholders — and does
not anticipate the replacement itself being one.

**The replacement string is never escaped.** `String.prototype.replace` interprets the four
substitution forms — `$&`, `$'`, `$$`, and dollar-backtick — in the replacement, and `currency`
reaches this line verbatim from
`CurrencyPipe.transform`, whose `display` parameter is typed
`'code' | 'symbol' | 'symbol-narrow' | string | boolean` and documented as accepting a custom string
— `currency = display` (`pipes/number_pipe.ts`). `currencyCode` reaches it the same way when
`display` is `'code'`.

```
  display="US$"                -> "US$1,234.00"          ok
  display="$$"                 -> "$1,234.00"            ok by accident ($$ is an escaped $)
  display="$&"                 -> "1,234.00"             inserts the match, then it is stripped
  display="$`"                 -> "1,234.00"             inserts the text before the match
  display="$'"                 -> "1,234.001,234.00"     inserts the text after the match
```

The `$'` row duplicates the amount. This is corruption of a money value, not just a cosmetic
problem — though it needs a currency label containing `$` followed by one of four characters, so it
is far less likely to be hit than the `XXX` case above. Both are fixed by the same change: escape
the replacement (or use a function replacement, which never interprets `$`) and make the
duplicate-placeholder cleanup target the pattern rather than the result.

**Cleared in the same pass**, each checked because it looked wrong:

- **`parseNumber`'s overflow boundary** (`:444`, `integerLen > MAX_DIGITS` with `MAX_DIGITS = 22`)
  looked like an off-by-one, since `1e21` yields `integerLen === 22` and a `digits` array of length
  1. It is correct: `roundNumber`'s fraction-padding loop (`:505`) runs `fractionLen` from `-21` up
     to `0` and pushes the 21 missing zeros. Verified against the real functions —
     `1e21` → `1,000,000,000,000,000,000,000`, `9e21` → `9,000,000,000,000,000,000,000`,
     `1e22` → `1E+22`.
- **`digitsInfo` with `minFrac > maxFrac`** (e.g. `'1.5-2'`) is not silently accepted. The
  correction at `:77` only fires when the max part is absent, but `roundNumber` throws
  `INVALID_NUMBER_OF_DIGITS_AFTER_FRACTION` at `:458` for the explicit case.
- **`getNumberOfCurrencyDigits` and `getCurrencySymbol` index `CURRENCIES_EN` with a caller-supplied
  code** (`locale_data_api.ts:799`, `:771`), and that table is a plain object literal. Inherited
  names return a function or `Object.prototype`, both truthy, so the `|| CURRENCIES_EN[code] || []`
  guard does not stop them — but every read that follows is a numeric index, which is `undefined` on
  both, and the final guards (`typeof digits === 'number'`, `currency[Symbol] || code`) fall back
  correctly. Safe, though by two layers of luck rather than by design.

### 42. The second locale registry is a plain object, and `constructor` reaches it — `open`

`packages/core/src/i18n/locale_data_api.ts:111`

Locale lookup consults two registries. The first is hardened, deliberately and with a comment:

```js
/**
 * This const is used to store the locale data registered with `registerLocaleData`.
 * Use `Object.create(null)` to prevent prototype pollution.
 */
let LOCALE_DATA: {[localeId: string]: any} = /* @__PURE__ */ Object.create(null);   // :18
```

The second is not:

```js
export function getLocaleData(normalizedLocale: string): any {
  if (!(normalizedLocale in LOCALE_DATA)) {
    const globalLocaleData =
      global.ng && global.ng.common && global.ng.common.locales &&
      global.ng.common.locales[normalizedLocale];       // <- plain object
    // Only cache global locale data when an entry is actually found, to avoid
    // caching missing lookups. In SSR this cache is process-wide across requests,
    // so caching `undefined` would retain attacker-controlled locale identifiers
    // indefinitely. …
    if (globalLocaleData !== undefined) {
      LOCALE_DATA[normalizedLocale] = globalLocaleData;
    }
    return globalLocaleData;
  }
  return LOCALE_DATA[normalizedLocale];
}
```

`global.ng.common.locales` is created by the generated global locale files as a bare literal —
`global.ng.common.locales ??= {}` (`common/locales/generate-locales-tool/locale-global-file.ts:31`),
which is what ships in `@angular/common/locales/global/*.js` for apps that load locale data by
script tag. So the truthiness guard at `:117` does not stop an inherited member: it is not
`undefined`, so it is returned **and cached**.

`normalizeLocale` (`:183`) lowercases and maps `_` to `-`, which turns out to disqualify almost
every candidate — but not all of them:

```
  constructor        -> constructor        STILL an inherited name
  __proto__          -> --proto--          no longer matches
  toString           -> tostring           no longer matches
  hasOwnProperty     -> hasownproperty     no longer matches
  __defineGetter__   -> --definegetter--   no longer matches
```

`constructor` is the only member of `Object.prototype` that is all-lowercase and free of
underscores, so it is the one key that survives normalisation. Run against the real functions:

```
findLocaleData(locale):
  "fr"             returned ["fr","…real fr data…"]
  "constructor"    returned function Object
  "__proto__"      MISSING_LOCALE_DATA: Missing locale data for the locale "__proto__".
  "zz-ZZ"          MISSING_LOCALE_DATA: Missing locale data for the locale "zz-ZZ".

LOCALE_DATA after those lookups (the process-wide SSR cache):
  fr=["fr","…real fr data…"]  constructor=function Object

what a consumer then does with it (common/locale_data_api.ts:528):
  data[NumberFormats][Currency] -> TypeError: Cannot read properties of undefined (reading '2')
```

Two things follow, and the second is the reason this is filed here rather than as a curiosity.

1. **The wrong error, in the wrong place.** `findLocaleData` exists to raise `MISSING_LOCALE_DATA`
   for an unknown locale. For this one string it returns the `Object` function instead, and the
   failure surfaces later as a `TypeError` inside number or date formatting, naming neither the
   locale nor the cause. Every index into the returned "data" is numeric, and numeric properties of
   a function are all `undefined`, so this degrades to crashes rather than to wrong values — there
   is no path to execution here.
2. **It defeats the mitigation written directly above it.** The comment at `:112-116` reasons about
   SSR, a process-wide cache, and "attacker-controlled locale identifiers" being retained
   indefinitely. That is exactly what happens: `LOCALE_DATA['constructor'] = Object` is written on
   the first such request and never removed (only `unregisterAllLocaleData` clears it). The
   author's threat model is already the right one; the fix addressed caching `undefined` and left
   the truthy-inherited case open.

It is bounded — `constructor` is the only reachable name, so this is one stale entry, not unbounded
growth — and it needs an app that loads locale data via the global script-tag files, which is a
documented supported form. Locale strings commonly come from a URL segment or `Accept-Language`, so
reaching it does not require anything unusual.

The fix mirrors what the file already does one screen up: build the global registry with
`Object.create(null)`, or gate the read with `Object.hasOwn`.

## Gaps in repository tooling and data

### 19. `@deprecated` versions are parsed out of prose — `open`

`generate_manifest.mts` takes the first number anywhere in the tag comment. Two live cases:
`getLocaleCurrencyCode` renders as "deprecated since v4217" (from "ISO 4217"), and `ServerXhr` as
"v23" when 23 is the intended _removal_ version. Fixing it is a design choice — require an explicit
leading version, or correct the two comments — so it is recorded rather than changed.

### 20. Three paths match no review group — `open`

`docs/codebase-map` (111 files), `tools/bazel` (9), `goldens/vscode-extension` (2).
`.pullapprove.yml` fails any pull request that matches no group, so these are latent blockers. The
`tools/bazel` case is an enumeration style: `dev-infra` lists sibling directories one at a time.

### 21. Five `{@example}` tags point at a file that does not exist — `open`

`packages/private/testing/matchers/index.ts` (lines 28, 38, 48, 58, 78) reference
`packages/examples/testing/ts/matchers.ts`. Nothing catches it because that package is not
docs-extracted.

### 22. Five example projects are referenced by nothing — `open`

No build checks the reverse direction.

### 23. `analyze-contracts.mjs` skipped four emitted symbols — `fixed`

The analyzer required the `: o.ExternalReference` annotation, which the four type-checking entries
at the end of `Identifiers` omit. They were never checked for resolution against `core` while the
tool reported the contract complete. All four do resolve; the contract is now 215 symbols, not 211.

## Observations recorded so that they are not re-investigated

### 24. `createWatch` tracks its cleanup function; `effect()` does not — `open`

`packages/core/primitives/signals/src/watch.ts:118`

`run()` opens the consumer context and then runs the user's cleanup inside it:

```js
const prevConsumer = consumerBeforeComputation(node);
try {
  node.cleanupFn(); // ← the active consumer is the watch
  node.cleanupFn = NOOP_CLEANUP_FN;
  node.fn(registerOnCleanup);
} finally {
  consumerAfterComputation(node, prevConsumer);
}
```

so any signal read while tearing down becomes a dependency of the watch. `destroyWatchNode`
(`:86`) runs the same user function with no consumer active, so the identical callback is tracked
on one path and untracked on the other.

Confirmed against the real sources (`scratchpad/watchcleanup.mjs`). A signal read **only** inside
the cleanup appears in the watch's dependency list after the second run, ahead of the one the body
reads — cleanup runs first — and changing it schedules the watch:

```
after first run  deps: [ 'usedByFn' ]
after second run deps: [ 'readOnlyInCleanup', 'usedByFn' ]
active consumer while cleanup ran: the watch
setting the cleanup-only signal scheduled the watch 1 time(s)

active consumer while cleanup ran on destroy(): none
```

**This does not reach applications.** The public `effect()` does not use `createWatch`; it has its
own `EffectNode`, whose `cleanup()` (`render3/reactivity/effect.ts:239`) untracks explicitly:

```js
const prevConsumer = setActiveConsumer(null);
try { while (this.cleanupFns.length) this.cleanupFns.pop()!(); }
finally { this.cleanupFns = []; setActiveConsumer(prevConsumer); }
```

and both `ROOT_EFFECT_NODE.destroy` and `VIEW_EFFECT_NODE.destroy` route through that same method,
so the public API is consistent on both paths.

`createWatch` has **no callers in this repository** — it is only re-exported from
`packages/core/primitives/signals/index.ts`, and `contributing-docs/public-api-surface.md`
excludes `@angular/core/primitives` from the public API. So this is two implementations of one
concept disagreeing, where the supported one is right and the other is reachable only from outside
the repository.

Recorded rather than reported as a defect, and worth knowing before anyone re-bases `effect()` on
the primitive.

A method note: the first version of this test showed the cleanup never running at all. `run()`
returns early unless a dependency actually changed (`watch.ts:113`), so the second `run()` was a
no-op — the test had to move a signal between runs before it exercised anything.

### 25. 63 `ɵ` names appear in the API goldens — `open`

Across 25 of the 50 golden files, only 3 as declared entries. The other 60 sit inside the
signatures of public symbols (`ɵfac`/`ɵɵFactoryDeclaration` on every exported class;
`ɵTypedOrUntyped` and a dozen siblings typing `FormGroup<T>`). So the `ɵ` prefix means "rename
freely" for `ɵMetadataOverrider` and "renaming this changes a public type" for `ɵTypedOrUntyped`,
and nothing marks which is which.

### 26. Dead guard and stale comment in `retrieveHydrationInfoImpl` — `open`

`packages/core/src/hydration/utils.ts:141` vs `:152`. The comment describes handling `<comp ngh="" />`,
but line 141 (`if (!nghAttrValue) return null;`) already returns for the empty string, so
`if (nghAttrValue !== '')` can never be false. Reading both writers in `annotate.ts` (`:232`, `:840`)
confirms the framework never emits `ngh=""` — they write `index.toString()` or `"a|b"`. Dead code
and a misleading comment, not a live bug.

### 27. `removeDehydratedViewList` leaves entries that suppress DOM insertion — `open`

`packages/core/src/hydration/cleanup.ts:56`

Its sibling `removeDehydratedViews` (`:53`) sets `lContainer[DEHYDRATED_VIEWS] = retainedViews` and
explains why — "do not trigger the lookup process once again". `removeDehydratedViewList` removes
the DOM nodes but leaves the array in place, and `removeDehydratedView` (`:71`) never nulls
`dehydratedView.firstChild`, so each entry keeps a live reference to a node that is no longer in the
document.

**The container is consulted afterwards.** This entry previously said that was unestablished; it is
now traced. `applyDeferBlockState` calls `findMatchingDehydratedViewForDeferBlock`
(`defer/rendering.ts:222`), which reads `lContainer[DEHYDRATED_VIEWS]` directly and matches on the
serialized block state. The result is then passed straight into the insertion decision:

```js
addLViewToLContainer(
  lContainer,
  embeddedLView,
  viewIndex,
  shouldAddViewToDom(activeBlockTNode, dehydratedView),
);
```

and `shouldAddViewToDom` (`render3/view_manipulation.ts:80`) is

```js
return !dehydratedView || dehydratedView.firstChild === null || hasInSkipHydrationBlockFlag(tNode);
```

A stale entry is neither absent nor null-headed, so it returns `false` and the freshly created view
is **not attached to the DOM** — while the nodes it was meant to reuse have already been removed.
The block renders nothing.

Reached through the error path at `defer/triggering.ts:469`, which calls `removeDehydratedViewList`
and breaks out of the hydration loop. It fires only when the state subsequently applied matches the
state the server serialized, since that is the match key; a different state finds nothing and
attaches normally. Setting `firstChild = null` in `removeDehydratedView`, or resetting the array as
the sibling does, closes it.

### 28. `ɵdisableProfiling` has no consumer at all — `open`

Exported from `core_private_export.ts:138`, absent from the `ng` global table (`enableProfiling` is
present, its counterpart is not), and imported nowhere. `profiler.ts:73` is the only other mention.

---

### 29. The di primitive's `inject` contradicts its own limp-mode comment — `open`

`packages/core/primitives/di/src/injector.ts:22`

The module variable documents three states:

```ts
/**
 * Current injector value used by `inject`.
 * - `undefined`: it is an error to call `inject`
 * - `null`: `inject` can be called but there is no injector (limp-mode).
 * - Injector instance: Use the injector for resolution.
 */
let _currentInjector: Injector | undefined | null = undefined;
```

but `inject` collapses the first two:

```ts
const currentInjector = getCurrentInjector();
if (!currentInjector) {
  throw new Error('Current injector is not set.');
}
```

`!null` is `true`, so the documented limp-mode throws exactly like the "it is an error" state, and
the distinction the comment draws cannot be observed through this function.

No consumer is affected today: core imports `Injector`, `InjectionToken`, `NotFound`, `isNotFound`
and `getCurrentInjector` from this primitive, but **not `inject`** — it has its own in
`di/injector_compatibility.ts`. `NotFoundError` is likewise never constructed anywhere in the
repository, though `isNotFound` recognises it by name for throwers outside it.

Recorded with [18](#18-createwatch-tracks-its-cleanup-function-effect-does-not) and
[22](#22-ɵdisableprofiling-has-no-consumer-at-all): primitives published from an entry point
outside the public API, with no in-repo consumer to keep them honest.

### 30. `ɵsetAlternateWeakRefImpl` is a published no-op — `open`

`packages/core/primitives/signals/src/weak_ref.ts`

The whole file:

```ts
export function setAlternateWeakRefImpl(impl: unknown) {
  // TODO: remove this function
}
```

It takes an argument, ignores it, and does nothing — yet it is still published twice: from
`packages/core/primitives/signals/index.ts:63`, and from `core_private_export.ts:25` as
`ɵsetAlternateWeakRefImpl`. Nothing in the repository calls it.

That combination is worse than an unused export. The name promises the ability to swap in a
`WeakRef` implementation — exactly the hook an environment without native `WeakRef` would reach
for — and a caller outside this repository gets silence rather than an error or a warning. The
`TODO` says the intent is removal, so the function is waiting on a deprecation rather than on a
decision.

Related to [21](#21-ɵdisableprofiling-has-no-consumer-at-all): both are private exports with no
in-repo consumer, but that one still does something.

## Not defects — investigated and cleared

Recorded so the same questions are not re-opened.

| Question                                                                                            | Answer                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TEMPLATES = 't'` and `DEFER_HYDRATE_TRIGGERS = 't'` collide (`hydration/interfaces.ts:37`, `:48`)  | No. `deferBlockInfo` is a separate object stored in `context.deferBlocks` → `__nghDeferData__`; `ngh` goes to `__nghData__`. Two disjoint schemas each using the short key.                                                                                                             |
| Path compression round-trip                                                                         | Correct. `compress('b',[f,f,n])` → `"bf2n"` → `decompress` → `['b','f',2,'n',1]`.                                                                                                                                                                                                       |
| `navigateBetween` discards empty paths (`node_lookup_utils.ts:278`)                                 | No. `![]` is `false`, so `!parentPath` catches only `null`. Recursion terminates at `parentElement == null`.                                                                                                                                                                            |
| `ngh="10\|25"` two-id encoding                                                                      | Correct in both read orders; the remaining id is written back, then the attribute removed.                                                                                                                                                                                              |
| `previousTNode.type === TNodeType.Element` uses `===` on a bitmask (`node_lookup_utils.ts:161`)     | Correct. `interfaces/node.ts` states combined values "should never be used for `TNode.type`".                                                                                                                                                                                           |
| Dev-only error text ships to production                                                             | No. Of 293 `RuntimeError` sites: 179 gate the argument, 36 sit in a lexical `ngDevMode` block, 51 are in transitively dev-only functions, 3 are registered through `ngDevMode ? […] : []`. Zero reachable.                                                                              |
| `isDevMode()` used internally                                                                       | Never — 0 sites. It is a function call, so it cannot be folded; the framework avoids its own public API here deliberately.                                                                                                                                                              |
| `untracked` restores the consumer if its callback throws (`untracked.ts:19`)                        | Yes, via `finally`; the comment says that is the point.                                                                                                                                                                                                                                 |
| `defaultThrowError` in `signals/errors.ts:11` throws a message-less `Error`                         | Only before a platform exists. `publishSignalConfiguration()` (`application_ref.ts:73`) installs the real `RuntimeError` and `createPlatform` calls it (`platform.ts:47`). Signals used standalone — an entry point outside the public API — get the bare error.                        |
| `producerAccessed`'s consecutive-read fast path does not refresh `lastReadVersion` (`graph.ts:232`) | Correct. The link was made earlier in the same run at the current version, and a producer cannot change version mid-computation because `producerUpdatesAllowed` rejects writes from a computation.                                                                                     |
| `extractIcuPlaceholders` mutates `braces.lastIndex` mid-iteration (`icu_parsing.ts:75`)             | Correct. Ran the real function over 17 inputs — the two doc examples, 4-deep nesting, unbalanced braces both ways, `{}`, names containing `{` and XML metacharacters. Every one re-joins to the exact input, none throws, and the piece count stays odd as the serializers assume.      |
| `StateStack`'s `assert` (`icu_parsing.ts:177`) can be tripped by a malformed ICU                    | No. `'placeholder'` is never left on the stack: after it is pushed, the caller either pops it (name found) or replaces it via `nestedIcu` (name falsy). So `nestedIcu`'s precondition holds by construction, and the `else` branch at `:83` is never entered with a placeholder on top. |

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
