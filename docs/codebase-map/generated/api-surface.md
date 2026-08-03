<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/analyze-api-surface.mjs
-->

# Public API surface

Measured from the API goldens in `goldens/public-api/`, which are generated from the built
`.d.ts` and reviewed on every change, plus the stability tags in source. See
[`../21-api-surface.md`](../21-api-surface.md) for what the numbers mean.

## npm entry points

38 entry points across 50 goldens, 1230 exported declarations (1227 public, 3 `ɵ`-prefixed).

The **SemVer** column is package-level, from `contributing-docs/public-api-surface.md`.

| Entry point | SemVer | Declarations | `ɵ` private | Deprecated | Undocumented |
| --- | :-: | ---: | ---: | ---: | ---: |
| `@angular/animations` | yes | 38 | 0 | 37 | 0 |
| `@angular/animations/browser` | yes | 2 | 0 | 2 | 2 |
| `@angular/animations/browser/testing` | yes | 2 | 0 | 2 | 2 |
| `@angular/common` | yes | 102 | 0 | 36 | 7 |
| `@angular/common/http` | yes | 55 | 0 | 7 | 0 |
| `@angular/common/http/testing` | yes | 5 | 0 | 1 | 1 |
| `@angular/common/testing` | yes | 6 | 0 | 0 | 0 |
| `@angular/common/upgrade` | yes | 7 | 0 | 0 | 0 |
| `@angular/core` | yes | 329 | 0 | 9 | 29 |
| `@angular/core/primitives/di` | yes | 11 | 0 | 0 | 6 |
| `@angular/core/primitives/event-dispatch` | yes | 16 | 0 | 0 | 2 |
| `@angular/core/primitives/signals` | yes | 57 | 0 | 0 | 34 |
| `@angular/core/rxjs-interop` | yes | 15 | 0 | 0 | 5 |
| `@angular/core/testing` | yes | 27 | 0 | 0 | 8 |
| `@angular/elements` | yes | 9 | 0 | 0 | 1 |
| `@angular/forms` | yes | 80 | 0 | 0 | 6 |
| `@angular/forms/signals` | yes | 158 | 0 | 3 | 8 |
| `@angular/forms/signals/compat` | yes | 9 | 0 | 0 | 0 |
| `@angular/localize` | no | 7 | 3 | 0 | 0 |
| `@angular/localize/init` | no | 3 | 0 | 0 | 0 |
| `@angular/localize/tools` | no | 25 | 0 | 0 | 0 |
| `@angular/platform-browser` | yes | 35 | 0 | 1 | 1 |
| `@angular/platform-browser/animations` | yes | 6 | 0 | 5 | 0 |
| `@angular/platform-browser/animations/async` | yes | 1 | 0 | 1 | 0 |
| `@angular/platform-browser/testing` | yes | 2 | 0 | 0 | 0 |
| `@angular/platform-browser-dynamic` | yes | 3 | 0 | 2 | 3 |
| `@angular/platform-browser-dynamic/testing` | yes | 2 | 0 | 2 | 1 |
| `@angular/platform-server` | yes | 11 | 0 | 0 | 1 |
| `@angular/platform-server/init` | yes | 0 | 0 | 0 | 0 |
| `@angular/platform-server/testing` | yes | 2 | 0 | 2 | 0 |
| `@angular/router` | yes | 137 | 0 | 4 | 1 |
| `@angular/router/testing` | yes | 2 | 0 | 1 | 0 |
| `@angular/router/upgrade` | yes | 2 | 0 | 0 | 0 |
| `@angular/service-worker` | yes | 11 | 0 | 0 | 1 |
| `@angular/service-worker/config` | yes | 7 | 0 | 0 | 2 |
| `@angular/upgrade` | yes | 1 | 0 | 0 | 1 |
| `@angular/upgrade/static` | yes | 9 | 0 | 1 | 1 |
| `@angular/upgrade/static/testing` | yes | 2 | 0 | 0 | 0 |

## Internal-surface goldens

Not importable API. These track surfaces the team wants reviewed on every change anyway —
the runtime and compiler error codes, the `ng.*` debug utilities, the compiler options.

| Golden | Declarations | Tracks |
| --- | ---: | --- |
| `animations_errors` | 1 | `goldens/public-api/animations/errors.api.md` |
| `common_errors` | 1 | `goldens/public-api/common/errors.api.md` |
| `compiler_options_api` | 8 | `goldens/public-api/compiler-cli/compiler_options.api.md` |
| `core_errors` | 4 | `goldens/public-api/core/errors.api.md` |
| `error_code_api` | 1 | `goldens/public-api/compiler-cli/error_code.api.md` |
| `extended_template_diagnostic_name_api` | 1 | `goldens/public-api/compiler-cli/extended_template_diagnostic_name.api.md` |
| `forms_errors` | 1 | `goldens/public-api/forms/errors.api.md` |
| `http_errors` | 1 | `goldens/public-api/common/http/errors.api.md` |
| `ng_global_utils_api` | 13 | `goldens/public-api/core/global_utils.api.md` |
| `platform-browser_errors` | 1 | `goldens/public-api/platform-browser/errors.api.md` |
| `router_errors` | 1 | `goldens/public-api/router/errors.api.md` |
| `service-worker_errors` | 1 | `goldens/public-api/service-worker/errors.api.md` |

## By declaration kind

| Kind | Count |
| --- | ---: |
| `function` | 349 |
| `interface` | 277 |
| `class` | 277 |
| `type` | 143 |
| `const` | 141 |
| `enum` | 24 |
| `re-export` | 16 |
| `namespace` | 3 |

## Stability tiers declared in source

These come from JSDoc and are read by the docs pipeline, not by the goldens.

| Tag | Symbols |
| --- | ---: |
| `@experimental` | 16 |
| `@developerPreview` | 5 |
| `@publicApi` | 977 |
| `@deprecated` | 125 |

## `@experimental` symbols (16)

Not subject to the breaking-change policy (`contributing-docs/dev_preview_and_experimental.md`).
The "in a golden" column matters: the goldens record every release tag as `@public`, so a
symbol listed there looks stable in the reviewed API surface regardless of this tier.

| Symbol | In a golden | Declared in |
| --- | :-: | --- |
| `Client` | no | `packages/core/src/webmcp/types.ts` |
| `debounced` | yes | `packages/core/src/resource/debounce.ts` |
| `DebouncedOptions` | yes | `packages/core/src/resource/api.ts` |
| `DebounceTimer` | yes | `packages/core/src/resource/api.ts` |
| `declareExperimentalWebMcpTool` | yes | `packages/core/src/webmcp/declare_tool.ts` |
| `Execute` | no | `packages/core/src/webmcp/types.ts` |
| `ExperimentalAutoCleanupInjectorsFeature` | no | `packages/router/src/provide_router.ts` |
| `ExperimentalPlatformNavigationFeature` | no | `packages/router/src/provide_router.ts` |
| `PlatformNavigation` | yes | `packages/common/src/navigation/platform_navigation.ts` |
| `provideExperimentalWebMcpForms` | yes | `packages/forms/signals/src/webmcp/registration.ts` |
| `provideExperimentalWebMcpTools` | yes | `packages/core/src/webmcp/provide_tools.ts` |
| `resourceFromSnapshots` | yes | `packages/core/src/resource/from_snapshots.ts` |
| `ToolDescriptor` | no | `packages/core/src/webmcp/types.ts` |
| `withExperimentalAutoCleanupInjectors` | yes | `packages/router/src/provide_router.ts` |
| `withExperimentalPlatformNavigation` | yes | `packages/router/src/provide_router.ts` |
| `withProxyZone` | no | `packages/zone.js/lib/zone-spec/fake-async-test.ts` |

## `@developerPreview` symbols (5)

Not subject to the breaking-change policy (`contributing-docs/dev_preview_and_experimental.md`).
The "in a golden" column matters: the goldens record every release tag as `@public`, so a
symbol listed there looks stable in the reviewed API surface regardless of this tier.

| Symbol | In a golden | Declared in |
| --- | :-: | --- |
| `pendingUntilEvent` | yes | `packages/core/rxjs-interop/src/pending_until_event.ts` |
| `provideCheckNoChangesConfig` | yes | `packages/core/src/change_detection/provide_check_no_changes_config.ts` |
| `ViewTransitionInfo` | yes | `packages/router/src/utils/view_transition.ts` |
| `ViewTransitionsFeatureOptions` | yes | `packages/router/src/utils/view_transition.ts` |
| `withViewTransitions` | yes | `packages/router/src/provide_router.ts` |

## Deprecations (125)

Grouped by the version in the `@deprecated` tag, which the docs manifest reads as the first
number in the tag comment. 34 of them state no version, so their manifest
entry records `version: undefined`; no policy in this repository requires one.

| Since | Symbols |
| --- | --- |
| 4217 | `getLocaleCurrencyCode` |
| 23 | `ServerXhr` |
| 22.1 | `HttpClientJsonpModule`, `JsonpCallbackContext`, `JsonpClientBackend`, `JsonpInterceptor`, `jsonpCallbackContext`, `jsonpInterceptorFn`, `withJsonpSupport` |
| 22.0 | `withIncrementalHydration` |
| 20.2 | `AUTO_STYLE`, `AnimateChildOptions`, `AnimateTimings`, `AnimationAnimateChildMetadata`, `AnimationAnimateMetadata`, `AnimationAnimateRefMetadata`, `AnimationBuilder`, `AnimationDriver`, `AnimationEvent`, `AnimationFactory`, `AnimationGroupMetadata`, `AnimationKeyframesSequenceMetadata`, `AnimationMetadata`, `AnimationMetadataType`, `AnimationOptions`, `AnimationPlayer`, `AnimationQueryMetadata`, `AnimationQueryOptions`, `AnimationReferenceMetadata`, `AnimationSequenceMetadata`, `AnimationStaggerMetadata`, `AnimationStateMetadata`, `AnimationStyleMetadata`, `AnimationTransitionMetadata`, `AnimationTriggerMetadata`, `BootstrapOptions`, `BrowserAnimationsModule`, `BrowserAnimationsModuleConfig`, `MockAnimationDriver`, `MockAnimationPlayer`, `NoopAnimationDriver`, `NoopAnimationPlayer`, `NoopAnimationsModule`, `animate`, `animateChild`, `animation`, `group`, `keyframes`, `provideAnimations`, `provideAnimationsAsync`, `provideNoopAnimations`, `query`, `sequence`, `stagger`, `state`, `style`, `transition`, `trigger`, `useAnimation` |
| 20.0 | `NgForOf`, `NgForOfContext`, `NgIf`, `NgIfContext`, `NgSwitch`, `NgSwitchCase`, `NgSwitchDefault`, `ServerTestingModule`, `platformServerTesting` |
| 19.0 | `APP_INITIALIZER`, `ENVIRONMENT_INITIALIZER`, `PLATFORM_INITIALIZER` |
| 18.0 | `FormatWidth` |
| 18 | `getCurrencySymbol`, `getLocaleDateFormat`, `getLocaleDateTimeFormat`, `getLocaleDayNames`, `getLocaleDayPeriods`, `getLocaleDirection`, `getLocaleEraNames`, `getLocaleExtraDayPeriodRules`, `getLocaleExtraDayPeriods`, `getLocaleFirstDayOfWeek`, `getLocaleId`, `getLocaleMonthNames`, `getLocaleNumberFormat`, `getLocaleNumberSymbol`, `getLocalePluralCase`, `getLocaleTimeFormat`, `getLocaleWeekEndRange`, `getNumberOfCurrencyDigits` |
| 4.0 | `DefaultIterableDiffer` |
| (no version) | `BrowserDynamicTestingModule`, `CanLoad`, `CanLoadFn`, `Compiler`, `CompilerFactory`, `DATE_PIPE_DEFAULT_TIMEZONE`, `DeprecatedGuard`, `DeprecatedResolve`, `FormStyle`, `HttpClientTestingModule`, `HttpClientXsrfModule`, `JitCompilerFactory`, `MethodIdentifier`, `NgModuleFactory`, `NumberFormatStyle`, `NumberSymbol`, `Plural`, `RouterTestingModule`, `Time`, `TranslationWidth`, `WeekDay`, `WithField`, `WithOptionalField`, `WithoutField`, `getAngularLib`, `getInheritedInjectableDef`, `getLocaleCurrencyName`, `getLocaleCurrencySymbol`, `getModuleFactory`, `platformBrowserDynamic`, `platformBrowserDynamicTesting`, `setAngularLib`, `tempPrint`, `withFetch` |
