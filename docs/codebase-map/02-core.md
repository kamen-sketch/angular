# `packages/core` — the runtime

`@angular/core` is the largest package in the repository (~1,090 files, ~309k lines). It contains
the rendering engine, the dependency injection container, the reactivity primitives, and the
public authoring API (`@Component`, `signal`, `input`, `inject`, …).

Everything the compiler emits into a component's generated code eventually calls into this
package, so it is best read "runtime first": start with the data structures (`LView`/`TView`), then
the instruction set that mutates them, then the schedulers that decide when instructions run.

- Entry point: [`packages/core/index.ts`](../../packages/core/index.ts) → `public_api.ts` → `src/core.ts`
- Private surface for other Angular packages: `src/core_private_export.ts` (the `ɵ`-prefixed
  symbols) and `src/core_render3_private_export.ts` (the `ɵɵ` instruction set).
- Secondary entry points: `testing/`, `rxjs-interop/`, `primitives/*`, `schematics/`, and
  `global/` — which only re-exports `src/render3/global_utils_api.ts` so the `ng.*` debug helpers
  get their own section in the API docs.
- `third_party/` holds the vendored Trusted Types definitions (`trusted_types*.ts`) and
  `@mcp-b/webmcp-types`; `resources/best-practices.md` is the Angular style guidance shipped with
  the package for AI tooling.

Full file/symbol listing: [`generated/index-packages-core.md`](./generated/index-packages-core.md).

---

## 1. The two data structures everything hangs off

`src/render3/interfaces/view.ts` defines the pair that the whole renderer is built on.

**`TView` — static, one per template.** Created once per component/embedded template and shared by
every instance. Holds `template`, `firstCreatePass`/`firstUpdatePass` flags, `data` (`TData`:
`TNode`s, `DirectiveDef`s, `PipeDef`s at the same indices the instance data lives at), the hook
arrays (`preOrderHooks`, `contentHooks`, `viewHooks`, `destroyHooks` and their `*CheckHooks`
counterparts), `components` (indices of child component host nodes), `hostBindingOpCodes`, and
query definitions.

**`LView` — instance state, one per component instance / embedded view.** It is a plain `Array`
with a fixed header, and the header slot names are exported as numeric constants so that
instruction code reads `lView[TVIEW]` rather than a property lookup:

| Slot  | Constant                                                                                                                                                                                            | Holds                                                                                                                                |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 0     | `HOST`                                                                                                                                                                                              | host `RElement` for component views                                                                                                  |
| 1     | `TVIEW`                                                                                                                                                                                             | the shared `TView`                                                                                                                   |
| 2     | `FLAGS`                                                                                                                                                                                             | `LViewFlags` bitfield (`Dirty`, `CheckAlways`, `RefreshView`, `HasChildViewsToRefresh`, `Attached`, `Destroyed`, init-phase state …) |
| 3–4   | `PARENT`, `NEXT`                                                                                                                                                                                    | position in the logical view tree                                                                                                    |
| 5     | `T_HOST`                                                                                                                                                                                            | the `TNode` this view is attached at                                                                                                 |
| 6     | `HYDRATION`                                                                                                                                                                                         | dehydrated-view payload during hydration                                                                                             |
| 7     | `CLEANUP`                                                                                                                                                                                           | listener/teardown bookkeeping                                                                                                        |
| 8     | `CONTEXT`                                                                                                                                                                                           | component instance, or the embedded-view context                                                                                     |
| 9–11  | `INJECTOR`, `ENVIRONMENT`, `RENDERER`                                                                                                                                                               | DI + rendering environment                                                                                                           |
| 12–13 | `CHILD_HEAD`, `CHILD_TAIL`                                                                                                                                                                          | child view linked list                                                                                                               |
| 14–16 | `DECLARATION_VIEW`, `DECLARATION_COMPONENT_VIEW`, `DECLARATION_LCONTAINER`                                                                                                                          | where the template was _declared_ (differs from where it is _inserted_ for transplanted views)                                       |
| 17–26 | `PREORDER_HOOK_FLAGS`, `QUERIES`, `ID`, `EMBEDDED_VIEW_INJECTOR`, `ON_DESTROY_HOOKS`, `EFFECTS_TO_SCHEDULE`, `EFFECTS`, `REACTIVE_TEMPLATE_CONSUMER`, `AFTER_RENDER_SEQUENCES_TO_ADD`, `ANIMATIONS` | scheduling and reactivity bookkeeping                                                                                                |
| 27+   | `HEADER_OFFSET`                                                                                                                                                                                     | the instruction slots: nodes, directive instances, pipes, bindings                                                                   |

`HEADER_OFFSET` is why generated code says `ɵɵelement(0, …)` but the runtime writes to index 27:
instruction indices are template-relative and translated exactly once, at the instruction boundary.

Companion interfaces in the same directory:

- `node.ts` — `TNode` (`TElementNode`, `TContainerNode`, `TElementContainerNode`, `TProjectionNode`,
  `TIcuContainerNode`, `TLetDeclarationNode`) with `TNodeFlags`/`TNodeType`, the attribute/input/output
  maps and the styling linked-list pointers.
- `container.ts` — `LContainer`, the array that holds embedded views for `@if`/`@for`/`ViewContainerRef`.
- `definition.ts` — `ComponentDef`, `DirectiveDef`, `PipeDef`, `NgModuleDef`: the objects the
  compiler emits as `ɵcmp`/`ɵdir`/`ɵpipe`/`ɵmod` static fields.
- `renderer.ts` / `renderer_dom.ts` — the `Renderer` abstraction (`RElement`, `RNode`, `RText`,
  `RComment`) that lets the same instruction code drive the DOM, the server, or a test renderer.
- `attribute_marker.ts`, `styling.ts`, `i18n.ts`, `query.ts`, `injector.ts`, `control.ts` — the
  encodings for compiled attribute arrays, styling op-codes, i18n op-codes, queries, node injectors
  and control-flow blocks.

## 2. Instruction execution state

`src/render3/state.ts` holds the ambient state that instructions read implicitly. It is a
hand-rolled stack of `LFrame` objects (allocated once and reused — `allocLFrame`/`createLFrame`) with
`enterView`/`leaveView` pushing and popping, plus `enterDI`/`leaveDI` for injection.

Key accessors used by nearly every instruction: `getLView`, `getTView`, `getCurrentTNode`,
`setCurrentTNode`, `getSelectedIndex`/`setSelectedIndex` (what `ɵɵadvance` moves), the binding
cursor (`getBindingIndex`, `nextBindingIndex`, `incrementBindingIndex`, `getBindingRoot`), the
host-binding cursor (`setBindingRootForHostBindings`, `getCurrentDirectiveIndex`), the i18n and
hydration-skip flags (`setInI18nBlock`, `enterSkipHydrationBlock`), and the `CheckNoChangesMode`
flags (`Off` / `OnlyDirtyViews` / `Exhaustive`).

## 3. The instruction set — `src/render3/instructions/`

These are the `ɵɵ`-prefixed functions the compiler emits. Every one runs in two phases driven by
`RenderFlags.Create` / `RenderFlags.Update`, and `all.ts` is the barrel the compiler links against.

| File                                                                               | Instructions / responsibility                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shared.ts`                                                                        | The engine shared by all of them: `executeTemplate`, directive matching and instantiation (`findDirectiveDefMatches`, `createDirectivesInstances`, `invokeDirectivesHostBindings`), input writes (`setPropertyAndInputs`, `setDirectiveInput`, `setAllInputsForProperty`), `locateHostElement`, `elementLikeStartShared`/`elementLikeEndShared`, `handleUncaughtError` |
| `render.ts`                                                                        | `renderView` — the creation-mode pass over a view                                                                                                                                                                                                                                                                                                                      |
| `element.ts`, `element_container.ts`, `text.ts`, `template.ts`                     | node creation (`ɵɵelement*`, `ɵɵelementContainer*`, `ɵɵtext`, `ɵɵtemplate`)                                                                                                                                                                                                                                                                                            |
| `advance.ts`                                                                       | `ɵɵadvance` — moves the selected index and flushes pending per-node work                                                                                                                                                                                                                                                                                               |
| `property.ts`, `dom_property.ts`, `attribute.ts`, `aria_property.ts`, `two_way.ts` | binding writes, incl. `ɵɵtwoWayProperty`/`ɵɵtwoWayListener`                                                                                                                                                                                                                                                                                                            |
| `interpolation.ts`, `text_interpolation.ts`, `value_interpolation.ts`              | the `ɵɵinterpolate*` families                                                                                                                                                                                                                                                                                                                                          |
| `styling.ts` (1,055 lines)                                                         | `ɵɵstyleProp`/`ɵɵclassProp`/`ɵɵstyleMap`/`ɵɵclassMap` and the styling reconciliation algorithm over the `TStylingKey` linked list                                                                                                                                                                                                                                      |
| `listener.ts`                                                                      | `ɵɵlistener`/`ɵɵsyntheticHostListener`, wiring to `CLEANUP`                                                                                                                                                                                                                                                                                                            |
| `control_flow.ts` (633 lines)                                                      | `@if`/`@for`/`@switch` runtime: `ɵɵconditional`, `ɵɵrepeater*`, backed by `list_reconciliation.ts`                                                                                                                                                                                                                                                                     |
| `control.ts`                                                                       | the newer `ɵɵdomElement`-style control instructions and block scaffolding                                                                                                                                                                                                                                                                                              |
| `change_detection.ts`                                                              | `refreshView`, `detectChangesInternal`, `checkNoChangesInternal` (§4)                                                                                                                                                                                                                                                                                                  |
| `di.ts`, `di_attr.ts`                                                              | `ɵɵdirectiveInject`, `ɵɵinjectAttribute`                                                                                                                                                                                                                                                                                                                               |
| `queries.ts`, `queries_signals.ts`                                                 | `ɵɵcontentQuery`/`ɵɵviewQuery` and their signal-based counterparts                                                                                                                                                                                                                                                                                                     |
| `projection.ts`                                                                    | `ɵɵprojectionDef`/`ɵɵprojection` (content projection / `ng-content`)                                                                                                                                                                                                                                                                                                   |
| `i18n.ts`                                                                          | `ɵɵi18n*` instructions delegating to `render3/i18n/`                                                                                                                                                                                                                                                                                                                   |
| `animation.ts`                                                                     | the `animate.enter`/`animate.leave` runtime (§9)                                                                                                                                                                                                                                                                                                                       |
| `let_declaration.ts`                                                               | `@let` storage                                                                                                                                                                                                                                                                                                                                                         |
| `foreign_component.ts`                                                             | interop entry point for embedding non-Angular components                                                                                                                                                                                                                                                                                                               |
| `element_validation.ts`                                                            | dev-mode unknown-element/property diagnostics                                                                                                                                                                                                                                                                                                                          |
| `attach_source_locations.ts`                                                       | `ngSrc`-style debug source mapping for DevTools                                                                                                                                                                                                                                                                                                                        |

View construction lives one directory up, in `src/render3/view/`: `construction.ts`
(`createTView`, `getOrCreateComponentTView`, `createLView`, `createComponentLView`,
`allocExpando`, `addToEndOfViewTree`), plus `elements.ts`, `directives.ts`, `container.ts`,
`listeners.ts` and `directive_outputs.ts`.

Supporting modules next to the instructions: `node_manipulation.ts` (view insertion/removal/
destruction — the biggest file in `render3/`), `dom_node_manipulation.ts`, `tnode_manipulation.ts`,
`node_selector_matcher.ts` (CSS selector matching for directives), `pure_function.ts` (the
`ɵɵpureFunction*` memoisation slots), `pipe.ts`, `hooks.ts`, `di.ts` (node injector),
`definition.ts` (`ɵɵdefineComponent` & friends), `component_ref.ts`, `view_ref.ts`, `hmr.ts`.
`deps_tracker/` holds the `DepsTracker` singleton that answers "which directives and pipes are in
scope for this component" at runtime — the transitive NgModule scope, the standalone component
scope, and their caches. It is what makes local (per-file) compilation and HMR possible, since in
those modes the scope cannot be baked into the definition at build time.

## 4. Change detection

The traversal lives in `instructions/change_detection.ts` and is driven from `ApplicationRef`.

**`detectChangesInternal(lView, mode)`** wraps `rendererFactory.begin()/end()` around
`detectChangesInViewWhileDirty`, which runs `detectChangesInView` and then keeps re-running it in
`ChangeDetectionMode.Targeted` while `requiresRefreshOrTraversal(lView)` is still true, throwing
`INFINITE_CHANGE_DETECTION` after `MAXIMUM_REFRESH_RERUNS` (100).

**`detectChangesInView(lView, mode)`** decides whether to refresh a view. It refreshes if any of:

1. `mode === Global` and the view is `CheckAlways`;
2. `mode === Global` and the view is `Dirty` (and not in a check-no-changes pass);
3. the view has the `RefreshView` flag (any mode);
4. the view's `REACTIVE_TEMPLATE_CONSUMER` is dirty **and** `consumerPollProducersForChange` confirms
   a real producer change — this is how signal writes target a specific view;
5. dev-mode exhaustive check-no-changes.

It clears `HasChildViewsToRefresh | RefreshView` _before_ refreshing, so work done during the refresh
can re-dirty the view. If the view itself is not refreshed but has `HasChildViewsToRefresh`, it
descends in `Targeted` mode with the active reactive consumer set to `null`.

**`refreshView(tView, lView, templateFn, context)`** is the fixed order of operations for one view:

1. enter the view and establish the reactive consumer (`getOrBorrowReactiveLViewConsumer`, or a
   temporary consumer for views created via `ViewContainerRef.createEmbeddedView().detectChanges()`);
2. reset pre-order hook flags, reset the binding index, run the template in `RenderFlags.Update`;
3. pre-order hooks — `ngOnChanges`, `ngOnInit`, `ngDoCheck`;
4. `markTransplantedViewsForRefresh`, then `runEffectsInView`;
5. refresh embedded views (`detectChangesInEmbeddedViews`, `Global`);
6. refresh content queries, then content hooks (`ngAfterContentInit`, `ngAfterContentChecked`);
7. `processHostBindingOpCodes` — replays `TView.hostBindingOpCodes` (negative entries select an
   element, positive triples carry directive index + binding root + host binding fn);
8. refresh child components (`detectChangesInChildComponents`, `Global`);
9. view queries, then view hooks (`ngAfterViewInit`, `ngAfterViewChecked`);
10. flush `EFFECTS_TO_SCHEDULE`, register after-render sequences, clear `Dirty`/`FirstLViewPass`.

On a thrown error it calls `markAncestorsForTraversal(lView)` so an aborted pass does not leave
unreachable dirty views behind.

**Application level — `src/application/application_ref.ts`.** `ApplicationRef` keeps a
`dirtyFlags` bitfield (`ViewTreeGlobal`, `ViewTreeTraversal`, `ViewTreeCheck`, `AfterRender`,
`RootEffects`). `tick()` → `_tick()` → `synchronize()`, which loops `synchronizeOnce()` until the
flags settle (max 10 passes, else `INFINITE_CHANGE_DETECTION`). One pass:

1. flush root effects (`rootEffectScheduler.flush()`);
2. for each attached view, `detectChangesInternal` in `Global` mode if `ViewTreeGlobal` was requested
   and zoneless is off, otherwise `Targeted`;
3. clear `ViewTreeCheck` (a `markForCheck()` _during_ checking does not force another pass, for
   backwards compatibility), then `syncDirtyFlagsWithViews()` and loop back if anything is still dirty;
4. otherwise run `afterRenderManager.execute()` for the `AfterRender` flag.

**Scheduling — `src/change_detection/scheduling/`.**
`zoneless_scheduling.ts` declares the abstract `ChangeDetectionScheduler` and the
`NotificationSource` enum (the reason a tick was requested: signal write, `markForCheck`, listener,
deferred-block state change, …). `zoneless_scheduling_impl.ts` implements it: coalesces
notifications into a single scheduled tick, races a `setTimeout` against a microtask/
`requestAnimationFrame`, and in dev mode guards against runaway microtask loops
(`CONSECUTIVE_MICROTASK_NOTIFICATION_LIMIT`). `ng_zone_scheduling.ts` provides the zone-based
alternative (`provideZoneChangeDetection`, `NgZoneChangeDetectionScheduler`, `ZoneStablePendingTask`).

## 5. Reactivity

Two layers, deliberately separated so the graph can be reused outside the renderer:

**`packages/core/primitives/signals/`** — framework-agnostic push/pull graph.
`graph.ts` defines `ReactiveNode` and the producer/consumer protocol: `producerAccessed`
(records a dependency edge while a consumer is active), `producerIncrementEpoch`,
`producerUpdateValueVersion`, `producerNotifyConsumers`, `consumerBeforeComputation` /
`consumerAfterComputation` (the bracket around a tracked computation),
`consumerPollProducersForChange` (the pull side that decides whether a dirty consumer _actually_
changed), and `consumerDestroy`. Edges are `ReactiveLink` records held in intrusive linked lists, so
adding/removing dependencies is allocation-light. Built on top: `signal.ts`, `computed.ts`,
`linked_signal.ts`, `effect.ts` (`watch`), `equality.ts`, `untracked.ts`, `weak_ref.ts`.

**`src/render3/reactivity/`** — the Angular-facing wrappers: `signal.ts`, `computed.ts`,
`linked_signal.ts`, `untracked.ts`, `effect.ts` (component and root effects, `EffectScheduler`),
`root_effect_scheduler.ts`, `view_effect_runner.ts`, `after_render_effect.ts` (the phased
`afterRenderEffect` with `earlyRead`/`write`/`mixedReadWrite`/`read` phases), plus
`reactive_lview_consumer.ts`, which pools the per-view consumer nodes that make a signal write
dirty exactly the views that read it.

`src/resource/` builds on the graph: `resource()` (`ResourceImpl`), streaming resources,
`from_snapshots.ts`, `debounce.ts`, and transfer-state integration for SSR. `rxjs-interop/`
bridges to RxJS: `toSignal`, `toObservable`, `rxResource`, `takeUntilDestroyed`,
`outputFromObservable`, `outputToObservable`, `pendingUntilEvent`.

## 6. Dependency injection

**Environment injectors — `src/di/`.** `r3_injector.ts` holds `R3Injector`, the tree-shakable
injector implementation: it walks `InjectorDef`s, resolves providers to `Record`s with the
`NOT_YET`/`CIRCULAR` sentinels, and supports `runInContext`/destroy hooks.
`injector_compatibility.ts` implements the ambient `inject()` (including `InjectOptions` →
`InternalInjectFlags` conversion and the `HostAttributeToken` overloads) and the injection-context
machinery. Also here: `injectable.ts` (`@Injectable`), `injection_token.ts`,
`provider_collection.ts` (`importProvidersFrom`, `makeEnvironmentProviders`, provider flattening),
`forward_ref.ts`, `scope.ts`, `contextual.ts`, `create_injector.ts`, `inject_async.ts`,
`initializer_token.ts`, `null_injector.ts`, and the `interface/`+`jit/` subfolders.
`packages/core/primitives/di/` holds the shared primitives (`InjectionToken`, `Injector`,
`NotFound`) used by both core and the compiler.

**Node injectors — `src/render3/di.ts`.** The element-tree injector. Each node injector reserves 9
slots (8 bloom-filter buckets + a parent location) in `LView`/`TView`. `bloomAdd` hashes a token
into the filter; `bloomHasToken` checks it; `getOrCreateNodeInjectorForNode` allocates the slots;
`getOrCreateInjectable` walks up the node tree (`lookupTokenUsingNodeInjector`) honouring
`Self`/`SkipSelf`/`Host`/`Optional`, then falls back to the module/environment injector
(`lookupTokenUsingModuleInjector`) or the embedded-view injector
(`lookupTokenUsingEmbeddedInjector`). `getNodeInjectable` performs lazy factory instantiation with
`ɵɵdirectiveInject` semantics and records the injection path for dev-mode error messages.
`di_setup.ts` handles `providers`/`viewProviders` declared on directives.

## 7. Authoring API (signal-based)

`src/authoring/` implements the declarative primitives that the compiler recognises by identity:

- `input/` — `input()` / `input.required()` (`InputFunction`), `createInputSignal`, and
  `INPUT_SIGNAL_NODE` with the `REQUIRED_UNSET_VALUE` sentinel that throws when read before a value
  is bound; transforms live on the node so writes go through `transform` once.
- `model/` — `model()` returns a `ModelSignal`, simultaneously a `WritableSignal`, an `InputSignal`
  and an `OutputRef` (that is how `[(x)]` desugars).
- `output/` — `output()` returns an `OutputEmitterRef` (`emit`, `subscribe`, destroy-aware).
- `queries.ts` — `viewChild`, `viewChildren`, `contentChild`, `contentChildren`, each with a
  `.required` variant, backed by `instructions/queries_signals.ts`.

The decorator-based metadata (`@Component`, `@Directive`, `@Input`, `@NgModule`, …) lives in
`src/metadata/`, and `src/render3/jit/` compiles it at runtime when AOT output is not available
(`jit/directive.ts`, `jit/module.ts`, `jit/injectable.ts`, `jit/environment.ts`).

## 8. Three algorithms worth reading in full

These are the parts of the runtime where the data layout _is_ the algorithm, and where reading the
code without knowing the encoding is unproductive.

**Styling (`instructions/styling.ts`, `interfaces/styling.ts`).** The problem it solves is
priority: a class can be set by a static `class="…"` attribute, by `[class.x]`, by `[class]`, and
by any number of directive host bindings, and the winner must be stable regardless of the order
instructions happen to run in. The solution is a linked list threaded through `TData`, where each
styling binding stores a `TStylingKey` — a property name for `ɵɵstyleProp`/`ɵɵclassProp`, `null`
for a map binding (`ɵɵstyleMap`/`ɵɵclassMap`), or `false` for a binding that must be ignored
because a directive shadows the `class`/`style` input. Static values are folded into the key as a
`TStylingStatic` `KeyValueArray` so the list can be walked without a separate lookup. On the first
update pass `stylingFirstUpdatePass` inserts the binding into the list at the right priority
(`wrapInStaticStylingKey`, `collectStylingFromDirectives`, `collectStylingFromTAttrs`); afterwards
`checkStylingProperty`/`checkStylingMap` only diff values, and `findStylingValue` walks the list to
decide which binding currently owns a property before `updateStyling` touches the DOM.

**Lifecycle hooks (`render3/hooks.ts`).** Hooks are not stored per directive instance; they are
flattened into number/function pairs in `TView.preOrderHooks`, `contentHooks`, `viewHooks` and
their `*CheckHooks` variants (`HookData`/`DestroyHookData` in `interfaces/view.ts`). Even indices
are the `LView` index of the context to call the hook on, odd indices the function.
`registerPreOrderHooks`/`registerPostOrderHooks` build these arrays during the first create pass.
At runtime `executeInitAndCheckHooks` runs init hooks exactly once by tracking a two-bit init phase
in `LView[FLAGS]` (`InitPhaseState`: OnInit → AfterContentInit → AfterViewInit → completed) and
advancing it with `incrementInitPhaseFlags`; once the phase completes, only `executeCheckHooks`
runs. This is why `ngOnInit` cannot re-run and why hook ordering is a property of the `TView`,
not of the directive.

**Queries (`render3/queries/`).** `query.ts` holds the `TQueries`/`LQueries` pair — again a
static/instance split, so the matching predicates are computed once per template.
`query_execution.ts` implements the decorator-based `@ViewChild`/`@ContentChildren` refresh that
`refreshView` calls (`refreshContentQueries`, `executeViewQueryFn`), materialising results into
`QueryList`s. `query_reactive.ts` implements the signal-based `viewChild()`/`contentChildren()`:
the results are a computed signal whose dirtiness is driven by the same query bookkeeping, which is
why signal queries do not need `QueryList.changes` subscriptions.

## 9. Deferred loading and hydration

**`src/defer/`** implements `@defer`. `instructions.ts` holds the `ɵɵdefer*` instructions;
`interfaces.ts` defines `TDeferBlockDetails`/`LDeferBlockDetails` and `DeferBlockState`
(`Placeholder` → `Loading` → `Complete` / `Error`); `triggering.ts` attaches triggers and runs
`triggerResourceLoading`; `dom_triggers.ts` implements `on viewport|interaction|hover`;
`idle_scheduler.ts`/`timer_scheduler.ts` implement `on idle`/`on timer`; `rendering.ts` applies
state transitions with minimum/after timers (`applyDeferBlockStateWithScheduling`) and creates the
per-block environment injector; `registry.ts` + `discovery.ts` back incremental hydration.

**`src/hydration/`** implements SSR hydration. `annotate.ts` runs on the server and serialises each
`LView` into the `ngh` payload (`serializeLView`, `serializeLContainer`, node paths, i18n,
disconnected nodes, defer-block ids, `jsaction` attributes for event replay). On the client,
`api.ts` (`provideClientHydration` and its feature flags), `node_lookup_utils.ts`,
`views.ts` (matching dehydrated views to newly created ones), `cleanup.ts` (removing leftover DOM),
`compression.ts` (the compact node-path encoding), `event_replay.ts` (replaying events captured by
the event-dispatch primitives), `i18n.ts`, and `incremental_runtime.ts` (hydrate-on-trigger).
`packages/core/primitives/event-dispatch/` is the standalone early-event-contract library that
records events before the app bootstraps.

## 10. Rendering-adjacent subsystems

- `src/render3/i18n/` — `i18nApply` op-code interpreter, ICU handling, `i18n_parse.ts`,
  `i18n_postprocess.ts`; `src/i18n/` holds locale data plumbing (`locale_data_api.ts`, `locale_en.ts`).
- `src/render3/styling/` + `instructions/styling.ts` — the style/class reconciliation algorithm.
- `src/animation/` and `instructions/animation.ts` — the CSS-class based `animate.enter`/
  `animate.leave` support (`longest_animation.ts` computes when an animation finishes; `queue.ts`
  batches DOM writes).
- `src/sanitization/` — `DomSanitizer` bypass tokens, the sanitizers the compiler emits
  (`ɵɵsanitizeHtml`, `ɵɵsanitizeUrl`, …), Trusted Types adapters (`trusted_types.ts`,
  `trusted_types_bypass.ts`), and `url_sanitizer.ts`/`html_sanitizer.ts`.
- `src/linker/` — the public handles over the internals: `TemplateRef`, `ViewContainerRef`,
  `ElementRef`, `ViewRef`, `ComponentFactory`, `QueryList`, `DestroyRef`, `NgModuleFactory`.
- `src/platform/` — `PlatformRef`, `createPlatform`, platform-level providers and destroy listeners.
- `src/application/` — `ApplicationRef`, `bootstrapApplication` plumbing
  (`create_application.ts` → `internalCreateApplication`), `ApplicationInitStatus`
  (`APP_INITIALIZER`/`provideAppInitializer`), `application_tokens.ts`, `tracing.ts`,
  and `stability_debug*.ts` (why the app is not stable yet).
- `src/debug/` — `DebugNode`/`DebugElement` and the `ai/` helpers DevTools uses.
- `src/webmcp/` — experimental Model-Context-Protocol tool exposure:
  `declareExperimentalWebMcpTool`, `provideExperimentalWebMcpTools`, `ToolDescriptor`.
- `src/zone/` + `zone.ts` — `NgZone`, `NoopNgZone`; `src/pending_tasks.ts` — `PendingTasks`, the
  stability signal SSR and `whenStable` rely on.
- `src/profiler.ts` + `render3/profiler.ts` — the `ProfilerEvent` hooks DevTools consumes.

## 11. Testing surface

`testing/src/` is the `@angular/core/testing` entry point: `test_bed.ts` (`TestBed`), the
`TestBedCompiler` that recompiles overridden components, `component_fixture.ts`
(`ComponentFixture.whenStable`, `autoDetectChanges`), `fake_async.ts`/`async.ts`
(`fakeAsync`, `tick`, `flush`, `waitForAsync`), `defer.ts` (`DeferBlockFixture`),
`metadata_override*.ts`, and `application_error_handler.ts`.

`packages/private/testing/` holds internal-only helpers (`useAutoTick`, `timeout`) that
`AGENTS.md` points at for zoneless, async-first tests.

## 12. Reading paths

- **"What happens on bootstrap?"** `bootstrapApplication` (defined in
  [`packages/platform-browser/src/browser.ts`](../../packages/platform-browser/src/browser.ts), not in
  core) → `ɵinternalCreateApplication` (`src/application/create_application.ts`) →
  `ApplicationRef.bootstrap` → `ComponentFactory.create` (`render3/component_ref.ts`) →
  `renderView` (`instructions/shared.ts`) → first `tick()`.
- **"What happens when a signal changes?"** `signal.set` → `producerIncrementEpoch` +
  `producerNotifyConsumers` (`primitives/signals/graph.ts`) → the view's
  `REACTIVE_TEMPLATE_CONSUMER` marks itself dirty and calls `markAncestorsForTraversal` →
  `ChangeDetectionSchedulerImpl` schedules a tick → `ApplicationRef.synchronize` →
  `detectChangesInView` sees a dirty consumer → `refreshView`.
- **"Where does `[prop]="x"` end up?"** compiler emits `ɵɵproperty('prop', ctx.x)` →
  `instructions/property.ts` → `bindingUpdated` (`render3/bindings.ts`) compares the new value
  against the binding slot → `setPropertyAndInputs` (`instructions/shared.ts`), which writes to
  matching directive inputs first and otherwise sanitizes and calls `Renderer.setProperty`.
