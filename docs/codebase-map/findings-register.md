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
[25](#25-ɵdisableprofiling-has-no-consumer-at-all), which is the same module's other half.

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

## Gaps in repository tooling and data

### 16. `@deprecated` versions are parsed out of prose — `open`

`generate_manifest.mts` takes the first number anywhere in the tag comment. Two live cases:
`getLocaleCurrencyCode` renders as "deprecated since v4217" (from "ISO 4217"), and `ServerXhr` as
"v23" when 23 is the intended _removal_ version. Fixing it is a design choice — require an explicit
leading version, or correct the two comments — so it is recorded rather than changed.

### 17. Three paths match no review group — `open`

`docs/codebase-map` (111 files), `tools/bazel` (9), `goldens/vscode-extension` (2).
`.pullapprove.yml` fails any pull request that matches no group, so these are latent blockers. The
`tools/bazel` case is an enumeration style: `dev-infra` lists sibling directories one at a time.

### 18. Five `{@example}` tags point at a file that does not exist — `open`

`packages/private/testing/matchers/index.ts` (lines 28, 38, 48, 58, 78) reference
`packages/examples/testing/ts/matchers.ts`. Nothing catches it because that package is not
docs-extracted.

### 19. Five example projects are referenced by nothing — `open`

No build checks the reverse direction.

### 20. `analyze-contracts.mjs` skipped four emitted symbols — `fixed`

The analyzer required the `: o.ExternalReference` annotation, which the four type-checking entries
at the end of `Identifiers` omit. They were never checked for resolution against `core` while the
tool reported the contract complete. All four do resolve; the contract is now 215 symbols, not 211.

## Observations recorded so that they are not re-investigated

### 21. `createWatch` tracks its cleanup function; `effect()` does not — `open`

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

### 22. 63 `ɵ` names appear in the API goldens — `open`

Across 25 of the 50 golden files, only 3 as declared entries. The other 60 sit inside the
signatures of public symbols (`ɵfac`/`ɵɵFactoryDeclaration` on every exported class;
`ɵTypedOrUntyped` and a dozen siblings typing `FormGroup<T>`). So the `ɵ` prefix means "rename
freely" for `ɵMetadataOverrider` and "renaming this changes a public type" for `ɵTypedOrUntyped`,
and nothing marks which is which.

### 23. Dead guard and stale comment in `retrieveHydrationInfoImpl` — `open`

`packages/core/src/hydration/utils.ts:141` vs `:152`. The comment describes handling `<comp ngh="" />`,
but line 141 (`if (!nghAttrValue) return null;`) already returns for the empty string, so
`if (nghAttrValue !== '')` can never be false. Reading both writers in `annotate.ts` (`:232`, `:840`)
confirms the framework never emits `ngh=""` — they write `index.toString()` or `"a|b"`. Dead code
and a misleading comment, not a live bug.

### 24. `removeDehydratedViewList` does not reset its container — `unconfirmed`

`packages/core/src/hydration/cleanup.ts:56`. Its sibling `removeDehydratedViews` (`:53`) sets
`lContainer[DEHYDRATED_VIEWS] = retainedViews` and explains why — "do not trigger the lookup process
once again". `removeDehydratedViewList` removes the DOM nodes but leaves the array in place, so its
entries keep a `firstChild` pointing at a detached node. Whether anything consults that container
afterwards has not been established.

### 25. `ɵdisableProfiling` has no consumer at all — `open`

Exported from `core_private_export.ts:138`, absent from the `ng` global table (`enableProfiling` is
present, its counterpart is not), and imported nowhere. `profiler.ts:73` is the only other mention.

---

### 26. The di primitive's `inject` contradicts its own limp-mode comment — `open`

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

### 27. `ɵsetAlternateWeakRefImpl` is a published no-op — `open`

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

| Question                                                                                            | Answer                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TEMPLATES = 't'` and `DEFER_HYDRATE_TRIGGERS = 't'` collide (`hydration/interfaces.ts:37`, `:48`)  | No. `deferBlockInfo` is a separate object stored in `context.deferBlocks` → `__nghDeferData__`; `ngh` goes to `__nghData__`. Two disjoint schemas each using the short key.                                                                                      |
| Path compression round-trip                                                                         | Correct. `compress('b',[f,f,n])` → `"bf2n"` → `decompress` → `['b','f',2,'n',1]`.                                                                                                                                                                                |
| `navigateBetween` discards empty paths (`node_lookup_utils.ts:278`)                                 | No. `![]` is `false`, so `!parentPath` catches only `null`. Recursion terminates at `parentElement == null`.                                                                                                                                                     |
| `ngh="10\|25"` two-id encoding                                                                      | Correct in both read orders; the remaining id is written back, then the attribute removed.                                                                                                                                                                       |
| `previousTNode.type === TNodeType.Element` uses `===` on a bitmask (`node_lookup_utils.ts:161`)     | Correct. `interfaces/node.ts` states combined values "should never be used for `TNode.type`".                                                                                                                                                                    |
| Dev-only error text ships to production                                                             | No. Of 293 `RuntimeError` sites: 179 gate the argument, 36 sit in a lexical `ngDevMode` block, 51 are in transitively dev-only functions, 3 are registered through `ngDevMode ? […] : []`. Zero reachable.                                                       |
| `isDevMode()` used internally                                                                       | Never — 0 sites. It is a function call, so it cannot be folded; the framework avoids its own public API here deliberately.                                                                                                                                       |
| `untracked` restores the consumer if its callback throws (`untracked.ts:19`)                        | Yes, via `finally`; the comment says that is the point.                                                                                                                                                                                                          |
| `defaultThrowError` in `signals/errors.ts:11` throws a message-less `Error`                         | Only before a platform exists. `publishSignalConfiguration()` (`application_ref.ts:73`) installs the real `RuntimeError` and `createPlatform` calls it (`platform.ts:47`). Signals used standalone — an entry point outside the public API — get the bare error. |
| `producerAccessed`'s consecutive-read fast path does not refresh `lastReadVersion` (`graph.ts:232`) | Correct. The link was made earlier in the same run at the current version, and a producer cannot change version mid-computation because `producerUpdatesAllowed` rejects writes from a computation.                                                              |

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
