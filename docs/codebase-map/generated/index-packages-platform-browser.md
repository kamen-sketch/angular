<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/platform-browser/`

60 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/platform-browser/`

- `packages/platform-browser/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/platform-browser/public_api.ts` — 16 lines
  - re-exports * from `./src/platform-browser`



## `packages/platform-browser/animations/`

- `packages/platform-browser/animations/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/platform-browser/animations/public_api.ts` — 15 lines
  - re-exports * from `./src/animations`



## `packages/platform-browser/animations/async/`

- `packages/platform-browser/animations/async/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/platform-browser/animations/async/public_api.ts` — 15 lines
  - re-exports * from `./src/async-animations`



## `packages/platform-browser/animations/async/src/`

- `packages/platform-browser/animations/async/src/async-animations.ts` — 16 lines
  - re-exports * from `./private_export`
  - exports `provideAnimationsAsync` from `./providers`
- `packages/platform-browser/animations/async/src/async_animation_renderer.ts` — 329 lines
  - class: `AsyncAnimationRendererFactory`, `DynamicDelegationRenderer`
- `packages/platform-browser/animations/async/src/private_export.ts` — 13 lines
  - exports `AsyncAnimationRendererFactory as ɵAsyncAnimationRendererFactory`, `ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN` from `./async_animation_renderer`
- `packages/platform-browser/animations/async/src/providers.ts` — 80 lines
  - function: `provideAnimationsAsync`



## `packages/platform-browser/animations/async/test/`

- `packages/platform-browser/animations/async/test/animation_renderer_spec.ts` — 546 lines _(spec)_



## `packages/platform-browser/animations/src/`

- `packages/platform-browser/animations/src/animations.ts` — 24 lines
  - re-exports * from `./private_export`
  - exports `ANIMATION_MODULE_TYPE` from `@angular/core`
  - exports `BrowserAnimationsModule`, `BrowserAnimationsModuleConfig`, `NoopAnimationsModule`, `provideAnimations`, `provideNoopAnimations` from `./module`
- `packages/platform-browser/animations/src/module.ts` — 145 lines
  - interface: `BrowserAnimationsModuleConfig`
  - class: `BrowserAnimationsModule`, `NoopAnimationsModule`
  - function: `provideAnimations`, `provideNoopAnimations`
- `packages/platform-browser/animations/src/private_export.ts` — 10 lines
  - exports `InjectableAnimationEngine as ɵInjectableAnimationEngine` from `./providers`
- `packages/platform-browser/animations/src/providers.ts` — 100 lines
  - class: `InjectableAnimationEngine`
  - function: `instantiateDefaultStyleNormalizer`, `instantiateRendererFactory`
  - const: `BROWSER_NOOP_ANIMATIONS_PROVIDERS`, `BROWSER_ANIMATIONS_PROVIDERS`



## `packages/platform-browser/animations/test/`

- `packages/platform-browser/animations/test/animation_renderer_spec.ts` — 605 lines _(spec)_
- `packages/platform-browser/animations/test/noop_animations_module_spec.ts` — 145 lines _(spec)_



## `packages/platform-browser/src/`

- `packages/platform-browser/src/browser.ts` — 317 lines
  - interface: `BootstrapContext`
  - function: `bootstrapApplication`, `createApplication`, `provideProtractorTestingSupport`, `initDomAdapter`, `errorHandler`, `_document`
  - const: `platformBrowser`
  - class: `BrowserModule`
- `packages/platform-browser/src/errors.ts` — 33 lines
  - const enum: `RuntimeErrorCode`
- `packages/platform-browser/src/hydration.ts` — 313 lines
  - enum: `HydrationFeatureKind`
  - interface: `HydrationFeature`
  - function: `withNoHttpTransferCache`, `withHttpTransferCacheOptions`, `withI18nSupport`, `withEventReplay`, `withIncrementalHydration`, `withNoIncrementalHydration`, `provideClientHydration`
- `packages/platform-browser/src/platform-browser.externs.js` — 27 lines
- `packages/platform-browser/src/platform-browser.ts` — 48 lines
  - re-exports * from `./private_export`
  - exports `bootstrapApplication`, `BootstrapContext`, `BrowserModule`, `createApplication`, `platformBrowser`, `provideProtractorTestingSupport` from `./browser`
  - exports `Meta`, `MetaDefinition` from `./browser/meta`
  - exports `Title` from `./browser/title`
  - exports `disableDebugTools`, `enableDebugTools` from `./browser/tools/tools`
  - exports `By` from `./dom/debug/by`
  - exports `provideCssVarNamespacing`, `REMOVE_STYLES_ON_COMPONENT_DESTROY` from `./dom/dom_renderer`
  - exports `CssVarNamespacer` from `./dom/css_var_namespacer`
  - exports `EVENT_MANAGER_PLUGINS`, `EventManager` from `./dom/events/event_manager`
  - exports `EventManagerPlugin` from `./dom/events/event_manager_plugin`
  - exports `HydrationFeature`, `HydrationFeatureKind`, `provideClientHydration`, `withEventReplay`, `withHttpTransferCacheOptions`, `withI18nSupport`, `withIncrementalHydration`, `withNoIncrementalHydration`, `withNoHttpTransferCache` from `./hydration`
  - exports `DomSanitizer`, `SafeHtml`, `SafeResourceUrl`, `SafeScript`, `SafeStyle`, `SafeUrl`, `SafeValue` from `./security/dom_sanitization_service`
  - exports `VERSION` from `./version`
- `packages/platform-browser/src/private_export.ts` — 18 lines
  - exports `ɵgetDOM` from `@angular/common`
  - exports `BrowserDomAdapter as ɵBrowserDomAdapter` from `./browser/browser_adapter`
  - exports `BrowserGetTestability as ɵBrowserGetTestability` from `./browser/testability`
  - exports `DomRendererFactory2 as ɵDomRendererFactory2` from `./dom/dom_renderer`
  - exports `DomEventsPlugin as ɵDomEventsPlugin` from `./dom/events/dom_events`
  - exports `KeyEventsPlugin as ɵKeyEventsPlugin` from `./dom/events/key_events`
  - exports `SharedStylesHost as ɵSharedStylesHost` from `./dom/shared_styles_host`
  - exports `RuntimeErrorCode as ɵRuntimeErrorCode` from `./errors`
  - exports `DomSanitizerImpl as ɵDomSanitizerImpl` from `./security/dom_sanitization_service`
- `packages/platform-browser/src/version.ts` — 21 lines
  - const: `VERSION`



## `packages/platform-browser/src/browser/`

- `packages/platform-browser/src/browser/browser_adapter.ts` — 98 lines
  - class: `BrowserDomAdapter`
- `packages/platform-browser/src/browser/meta.ts` — 210 lines
  - type: `MetaDefinition`
  - class: `Meta`
- `packages/platform-browser/src/browser/testability.ts` — 78 lines
  - class: `BrowserGetTestability`
- `packages/platform-browser/src/browser/title.ts` — 40 lines
  - class: `Title`



## `packages/platform-browser/src/browser/tools/`

- `packages/platform-browser/src/browser/tools/common_tools.ts` — 70 lines
  - class: `ChangeDetectionPerfRecord`, `AngularProfiler`
- `packages/platform-browser/src/browser/tools/tools.ts` — 43 lines
  - function: `enableDebugTools`, `disableDebugTools`



## `packages/platform-browser/src/dom/`

- `packages/platform-browser/src/dom/css_var_namespacer.ts` — 48 lines
  - class: `CssVarNamespacer`
- `packages/platform-browser/src/dom/dom_renderer.ts` — 718 lines
  - const: `NAMESPACE_URIS`, `COMPONENT_VARIABLE`, `HOST_ATTR`, `CONTENT_ATTR`, `REMOVE_STYLES_ON_COMPONENT_DESTROY`, `CSS_VAR_NAMESPACE`
  - function: `provideCssVarNamespacing`, `shimContentAttribute`, `shimHostAttribute`, `shimStylesContent`, `addBaseHrefToCssSourceMap`
  - class: `DomRendererFactory2`
- `packages/platform-browser/src/dom/shared_styles_host.ts` — 254 lines
  - function: `createLinkElement`
  - class: `SharedStylesHost`
- `packages/platform-browser/src/dom/util.ts` — 30 lines
  - function: `exportNgVar`



## `packages/platform-browser/src/dom/debug/`

- `packages/platform-browser/src/dom/debug/by.ts` — 70 lines
  - class: `By`



## `packages/platform-browser/src/dom/events/`

- `packages/platform-browser/src/dom/events/dom_events.ts` — 44 lines
  - class: `DomEventsPlugin`
- `packages/platform-browser/src/dom/events/event_manager.ts` — 115 lines
  - const: `EVENT_MANAGER_PLUGINS`
  - class: `EventManager`
- `packages/platform-browser/src/dom/events/event_manager_plugin.ts` — 44 lines
  - class: `EventManagerPlugin`
- `packages/platform-browser/src/dom/events/key_events.ts` — 201 lines
  - class: `KeyEventsPlugin`



## `packages/platform-browser/src/security/`

- `packages/platform-browser/src/security/dom_sanitization_service.ts` — 232 lines
  - interface: `SafeValue`, `SafeHtml`, `SafeStyle`, `SafeScript`, `SafeUrl`, `SafeResourceUrl`
  - class: `DomSanitizer`, `DomSanitizerImpl`
  - exports `SecurityContext`



## `packages/platform-browser/test/`

- `packages/platform-browser/test/hydration_spec.ts` — 181 lines _(spec)_
- `packages/platform-browser/test/testing_public_spec.ts` — 1208 lines _(spec)_



## `packages/platform-browser/test/browser/`

- `packages/platform-browser/test/browser/bootstrap_spec.ts` — 980 lines _(spec)_
- `packages/platform-browser/test/browser/bootstrap_standalone_spec.ts` — 322 lines _(spec)_
- `packages/platform-browser/test/browser/meta_spec.ts` — 276 lines _(spec)_
- `packages/platform-browser/test/browser/title_spec.ts` — 63 lines _(spec)_



## `packages/platform-browser/test/browser/tools/`

- `packages/platform-browser/test/browser/tools/tools_spec.ts` — 58 lines _(spec)_
  - function: `callNgProfilerTimeChangeDetection`



## `packages/platform-browser/test/dom/`

- `packages/platform-browser/test/dom/css_var_namespacer_spec.ts` — 60 lines _(spec)_
- `packages/platform-browser/test/dom/dom_renderer_spec.ts` — 789 lines _(spec)_
  - class: `SomeApp`, `IsolatedShadowComponentParentApp`, `SomeAppForCleanUp`
- `packages/platform-browser/test/dom/shadow_dom_spec.ts` — 287 lines _(spec)_
- `packages/platform-browser/test/dom/shared_styles_host_spec.ts` — 237 lines _(spec)_



## `packages/platform-browser/test/dom/events/`

- `packages/platform-browser/test/dom/events/event_manager_spec.ts` — 540 lines _(spec)_
- `packages/platform-browser/test/dom/events/key_events_spec.ts` — 525 lines _(spec)_
- `packages/platform-browser/test/dom/events/zone_event_unpatched.init.mjs` — 25 lines _(test-support)_
  - function: `configureZoneUnpatchedEvent`



## `packages/platform-browser/test/security/`

- `packages/platform-browser/test/security/dom_sanitization_service_spec.ts` — 20 lines _(spec)_



## `packages/platform-browser/testing/`

- `packages/platform-browser/testing/index.ts` — 15 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/platform-browser/testing/public_api.ts` — 17 lines _(test-support)_
  - re-exports * from `./src/testing`



## `packages/platform-browser/testing/src/`

- `packages/platform-browser/testing/src/browser.ts` — 37 lines _(test-support)_
  - const: `platformBrowserTesting`
  - class: `BrowserTestingModule`
- `packages/platform-browser/testing/src/dom_test_component_renderer.ts` — 47 lines _(test-support)_
  - class: `DOMTestComponentRenderer`
- `packages/platform-browser/testing/src/testing.ts` — 15 lines _(test-support)_
  - re-exports * from `./browser`

