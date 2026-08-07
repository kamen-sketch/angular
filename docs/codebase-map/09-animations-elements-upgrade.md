# `animations`, `elements`, `upgrade`

Three independent packages that all sit on top of the core runtime.

Generated indexes:
[`animations`](./generated/index-packages-animations.md) ·
[`elements`](./generated/index-packages-elements.md) ·
[`upgrade`](./generated/index-packages-upgrade.md)

---

## 1. `packages/animations` (61 files, ~13k lines)

The DSL-based animation system (`trigger`/`state`/`transition`/`animate`). Note this is the
_legacy_ system: the newer `animate.enter`/`animate.leave` support is CSS-class based and lives in
`packages/core` (`src/animation/`, `render3/instructions/animation.ts`).

**`animations/src/` — the declarative surface (no DOM dependency)**

- `animation_metadata.ts` — the DSL functions and their AST types: `trigger`, `state`,
  `transition`, `animate`, `style`, `keyframes`, `group`, `sequence`, `query`, `stagger`,
  `animateChild`, `useAnimation`, plus `AUTO_STYLE` and the `AnimationMetadataType` enum.
- `animation_builder.ts` — `AnimationBuilder`/`AnimationFactory` for imperative animations.
- `animation_event.ts` — `AnimationEvent` (what `(@trigger.done)` receives).
- `players/animation_player.ts` — the `AnimationPlayer` interface and `NoopAnimationPlayer`;
  `players/animation_group_player.ts` composes several players into one.

**`animations/browser/src/` — the engine**

- `dsl/animation_ast_builder.ts` — validates the metadata and builds the AST (`animation_ast.ts`),
  reporting errors via `error_helpers.ts`.
- `dsl/animation_timeline_builder.ts` — the core algorithm: walks the AST and produces
  `AnimationTimelineInstruction`s (keyframes with absolute offsets), resolving `query`/`stagger`,
  `animateChild` and sub-timelines.
- `dsl/animation_trigger.ts`, `dsl/animation_transition_expr.ts`,
  `dsl/animation_transition_factory.ts`, `dsl/animation_transition_instruction.ts` — matching a
  state change (`void => *`, `:enter`, `:leave`, boolean/param expressions) to a transition and
  building its instruction.
- `dsl/style_normalization/` — normalising style values (px suffixes, camelCase → kebab-case).
- `render/transition_animation_engine.ts` — the stateful engine: tracks elements entering and
  leaving, queues transitions, handles nested triggers and `disabled` regions, and flushes on
  microtask.
- `render/timeline_animation_engine.ts` — the engine used by `AnimationBuilder`.
- `render/animation_renderer.ts` + `render/renderer.ts` — the `Renderer2` decorator that intercepts
  `setProperty('@trigger', …)` and `listen('@trigger.done', …)` calls.
- `render/animation_driver.ts` and `render/web_animations/` — the `AnimationDriver` abstraction and
  its Web Animations API implementation (`web_animations_driver.ts`, `web_animations_player.ts`,
  `animatable_props_set.ts`); `render/special_cased_styles.ts` handles `display`/`visibility`
  specially.
- `create_engine.ts` — assembles the engine, used by `platform-browser/animations`.

## 2. `packages/elements` (14 files, ~2k lines)

Wraps an Angular component as a custom element.

- `create-custom-element.ts` — `createCustomElement(component, {injector})` returns an
  `NgElementConstructor`: a `HTMLElement` subclass with `observedAttributes` derived from the
  component's inputs, property accessors that forward to the strategy, and
  `connectedCallback`/`disconnectedCallback`/`attributeChangedCallback` delegating to the strategy.
- `element-strategy.ts` — the `NgElementStrategy`/`NgElementStrategyFactory` extension point.
- `component-factory-strategy.ts` — the default strategy: creates the component through
  `ComponentFactory`, mirrors inputs (with a scheduled initial flush so attributes set before
  upgrade are not lost), re-emits outputs as `CustomEvent`s, and detaches on disconnect.
- `extract-projectable-nodes.ts` — distributes the custom element's light DOM into the component's
  `ng-content` slots according to its `ngContentSelectors`.
- `utils.ts` — `camelToDashCase`/`strictEquals`/`scheduler` helpers.

## 3. `packages/upgrade` (45 files, ~13k lines)

Interoperability with AngularJS (Angular 1.x) for incremental migration.

- `src/common/src/angular1.ts` — the typed surface of the AngularJS API the package calls into.
- `src/common/src/downgrade_component.ts` + `downgrade_component_adapter.ts` — expose an Angular
  component as an AngularJS directive, bridging inputs/outputs and change detection.
- `src/common/src/downgrade_injectable.ts` — expose an Angular provider to AngularJS DI.
- `src/common/src/upgrade_helper.ts` + `component_info.ts` — the reverse direction: wrapping an
  AngularJS component/directive so Angular can render it, including transclusion handling.
- `src/common/src/constants.ts`, `util.ts`, `promise_util.ts`, `security/` — shared plumbing and
  the `$sce`↔`DomSanitizer` bridge.
- `static/` — the AOT-friendly entry point (`@angular/upgrade/static`): `UpgradeModule`,
  `downgradeModule`, `downgradeComponent`, `downgradeInjectable`, plus `static/testing/` helpers.
  This is the only supported entry point; the dynamic one was removed.
