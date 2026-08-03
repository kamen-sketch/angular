# Cross-cutting flows

The per-package maps describe _where_ code lives. This document follows five flows that cross
package boundaries, because those are the paths that are hardest to reconstruct from directory
listings alone.

---

## 1. A component, from source file to DOM

**Build time**

1. `ngtsc` (`compiler-cli/src/ngtsc/core/src/compiler.ts`) finds the class and matches it to the
   component `DecoratorHandler` (`annotations/component/src/handler.ts`).
2. `detect` → `analyze`: the decorator arguments are statically evaluated
   (`ngtsc/partial_evaluator/`), `templateUrl`/`styleUrls` are resolved (`annotations/component/
src/resources.ts`), and the template is parsed by `@angular/compiler`
   (`ml_parser/` → `render3/r3_template_transform.ts`).
3. `resolve`: the component's _scope_ — which directives and pipes its template may use — is
   computed by `ngtsc/scope/` from its NgModule or its standalone `imports`.
4. `typeCheck`: a type-check block is generated (`compiler/src/typecheck/type_check_block.ts`) into
   a shim file and TypeScript checks it; failures are mapped back to template offsets.
5. `compileFull`: `compileComponentFromMetadata` (`compiler/src/render3/view/compiler.ts`) builds
   the `ɵcmp` definition. The template function itself comes from the pipeline —
   `ingestComponent` → 72 ordered phases → `reify` → `chain` (`compiler/src/template/pipeline/`).
6. `ngtsc/transform/src/transform.ts` splices the static fields into the emitted JavaScript.

In `PARTIAL` mode (libraries) step 5 emits `ɵɵngDeclareComponent` instead, and the application
build re-runs the real compilation through `compiler-cli/linker/`.

**Runtime**

7. `ComponentFactory.create` (`core/src/render3/component_ref.ts`) creates the root `TView`/`LView`
   (`render3/view/construction.ts`), locates or creates the host element, instantiates directives
   on it, and calls `renderView` (`render3/instructions/render.ts`).
8. `renderView` runs the template function with `RenderFlags.Create`. Each `ɵɵelement`,
   `ɵɵtemplate`, `ɵɵtext`, `ɵɵlistener` … instruction writes into the `LView` slot at
   `HEADER_OFFSET + index` and into the shared `TView.data` on the first pass only.
9. `ApplicationRef.tick()` → `refreshView` runs the same function with `RenderFlags.Update`, where
   the `ɵɵproperty`/`ɵɵinterpolate`/`ɵɵstyleProp` instructions compare against their binding slots
   and write through the `Renderer` when a value changed.

## 2. Change detection, end to end

```
signal write / markForCheck / event listener / defer state change
        │
        ▼
ChangeDetectionScheduler.notify(NotificationSource.*)     core/src/change_detection/scheduling/
        │   (coalesced: one tick per microtask/timer race)
        ▼
ApplicationRef.tick() → _tick() → synchronize()           core/src/application/application_ref.ts
        │   loops synchronizeOnce() until dirtyFlags settle (max 10)
        ├── rootEffectScheduler.flush()                   → root effects
        ├── for each attached view: detectChangesInternal(lView, mode)
        │        └── detectChangesInView → refreshView     core/src/render3/instructions/change_detection.ts
        │              template → pre-order hooks → embedded views → content queries
        │              → content hooks → host bindings → child components → view queries
        │              → view hooks → effects → afterRender registration
        └── afterRenderManager.execute()                  → afterRender / afterNextRender
```

The two loops (the application-level one in `synchronize()` and the view-level one in
`detectChangesInViewWhileDirty`) exist for different reasons: the first re-runs when render hooks
or effects re-dirty the tree, the second re-runs when a view re-dirties an _already-visited_
ancestor. Both throw `INFINITE_CHANGE_DETECTION` rather than spinning.

## 3. Signals: why a write refreshes exactly the right view

1. `signal.set()` → `producerIncrementEpoch()` + `producerNotifyConsumers()`
   (`core/primitives/signals/src/graph.ts`).
2. Every consumer that read the signal is marked dirty. For a template read, that consumer is the
   view's `REACTIVE_TEMPLATE_CONSUMER` (`render3/reactivity/reactive_lview_consumer.ts`), created
   when `refreshView` bracketed the template execution with
   `consumerBeforeComputation`/`consumerAfterComputation`.
3. Marking it dirty calls `markAncestorsForTraversal` (`render3/util/view_utils.ts`), which sets
   `HasChildViewsToRefresh` up the parent chain — so the traversal can _find_ the dirty view
   without walking everything.
4. The consumer also notifies the `ChangeDetectionScheduler`, which schedules a tick.
5. During the tick, `detectChangesInView` descends only through views with
   `HasChildViewsToRefresh`, and refreshes a view when `consumerPollProducersForChange` confirms one
   of its producers actually changed value (not merely bumped its epoch).

This is why zoneless applications do not need `markForCheck`: the dependency edge recorded in step 2
is what makes the view reachable in step 5.

## 4. Server render → hydration → event replay

**On the server** (`platform-server/src/utils.ts`)

1. `renderApplication`/`renderModule` bootstrap the app on a Domino DOM.
2. The render waits for `ApplicationRef.whenStable()` — i.e. for `PendingTasks`
   (`core/src/pending_tasks.ts`) to drain, which is what `httpResource`, `resource()` and
   `APP_INITIALIZER` register into.
3. `annotateForHydration` (`core/src/hydration/annotate.ts`) walks every `LView` and writes an
   `ngh` attribute per host element plus a serialised payload: node counts, node paths for nodes
   that cannot be found by walking, container views, i18n data, `@defer` block ids and their hydrate
   triggers.
4. `TransferState` is serialised into the document (`platform-server/src/transfer_state.ts`),
   including any `httpResource`/`HttpClient` responses captured by `withHttpTransferCache`.
5. The event-replay script (`core/primitives/event-dispatch/`) is inlined, and the root elements of
   interactive regions get `jsaction` attributes so early clicks are recorded rather than lost.

**On the client** (`core/src/hydration/`)

6. `provideClientHydration()` puts the runtime in hydration mode. Instead of creating DOM nodes, the
   creation-mode instructions _claim_ existing ones: `retrieveHydrationInfo` reads the `ngh`
   payload, `node_lookup_utils.ts` resolves each node, `views.ts` matches dehydrated container
   views against the views the template creates, and `cleanup.ts` removes anything left over.
7. Mismatches raise the hydration errors in `error_handling.ts`; `skip_hydration.ts` implements the
   `ngSkipHydration` escape hatch.
8. `event_replay.ts` drains the recorded events once the corresponding component is hydrated.
9. With incremental hydration, a `@defer` block stays dehydrated until its `hydrate` trigger fires;
   `incremental_runtime.ts` + `defer/triggering.ts` then load the dependencies, hydrate that block's
   subtree, and replay any queued events for it.

## 5. Dependency injection resolution order

When `inject(Token)` runs inside a directive constructor, the lookup is:

1. **Node injectors** (`core/src/render3/di.ts`) — starting at the current `TNode`, each node
   injector's 8-bucket bloom filter is checked (`bloomHasToken`); on a hit,
   `searchTokensOnInjector` looks for a matching directive or `providers`/`viewProviders` entry.
   The walk honours `@Self` (stop immediately), `@SkipSelf` (start at the parent), `@Host` (stop at
   the host component boundary) and `@Optional`.
2. **Embedded view injector** (`lookupTokenUsingEmbeddedInjector`) — for views created with an
   explicit injector via `ViewContainerRef.createEmbeddedView(…, {injector})`.
3. **Module/environment injector** (`lookupTokenUsingModuleInjector` → `R3Injector.get` in
   `core/src/di/r3_injector.ts`) — walks the `EnvironmentInjector` chain: route injectors
   (`router/src/route_injector_cleanup.ts`), `@defer` block injectors
   (`core/src/defer/rendering.ts`), the application injector, then the platform injector.
4. **`NullInjector`** — throws `NG0201: No provider for …`, with the injection path recorded in
   step 1 used to build the error message.

Tree-shakable providers (`@Injectable({providedIn: 'root'})`) are not in any provider array; they
are found in step 3 by reading the token's own `ɵprov` definition.
