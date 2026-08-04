<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/analyze-private-surface.mjs
-->

# The `ɵ` private surface

Symbols excluded from the public API by the `ɵ` prefix, and how they are actually reached.
See [`../25-private-surface.md`](../25-private-surface.md).

## Where the private surface lives

Every package that declares at least one `ɵ` name, and how many of them another package
actually imports through its entry point.

| Package | `ɵ` names published | Imported by other packages |
| --- | ---: | ---: |
| `core` | 447 | 112 |
| `forms` | 32 | 7 |
| `animations` | 28 | 6 |
| `localize` | 19 | 0 |
| `common` | 18 | 14 |
| `platform-browser` | 12 | 1 |
| `compiler-cli` | 10 | 0 |
| `router` | 10 | 0 |
| `platform-server` | 8 | 1 |
| `upgrade` | 4 | 0 |

## `@angular/core`

447 `ɵ` names, partitioned by consumer:

| Reached | Symbols |
| --- | ---: |
| as a compiler-emitted instruction | 204 |
| through `@angular/core` by shipping code | 110 |
| only relatively, inside core | 53 |
| only from tests | 27 |
| no consumer in this repository | 53 |

## Cross-package private dependencies

Each row is one package importing another package's `ɵ` symbols through its entry point, from
shipping code (tests excluded).

| Consumer | Provider | Distinct symbols |
| --- | --- | ---: |
| `common` | `@angular/core` | 39 |
| `platform-browser` | `@angular/core` | 37 |
| `router` | `@angular/core` | 16 |
| `platform-server` | `@angular/core` | 10 |
| `forms` | `@angular/core` | 9 |
| `platform-browser` | `@angular/common` | 7 |
| `platform-browser` | `@angular/animations` | 6 |
| `platform-server` | `@angular/common` | 6 |
| `elements` | `@angular/core` | 5 |
| `upgrade` | `@angular/core` | 5 |
| `animations` | `@angular/core` | 3 |
| `compiler-cli` | `@angular/core` | 3 |
| `router` | `@angular/common` | 2 |
| `service-worker` | `@angular/core` | 2 |
| `forms` | `@angular/common` | 1 |
| `platform-server` | `@angular/platform-browser` | 1 |
| `private` | `@angular/common` | 1 |
| `private` | `@angular/core` | 1 |

## Most depended-on private symbols

| Symbol | Provider | Consumers | Import sites |
| --- | --- | ---: | ---: |
| `ɵRuntimeError` | `@angular/core` | animations, common, forms, platform-browser, platform-server, router, service-worker | 71 |
| `ɵformatRuntimeError` | `@angular/core` | common, forms, platform-browser, router, service-worker | 16 |
| `ɵgetDOM` | `@angular/common` | forms, platform-browser, platform-server, private | 31 |
| `ɵWritable` | `@angular/core` | animations, forms, platform-server, router | 13 |
| `ɵConsole` | `@angular/core` | common, platform-browser, router | 7 |
| `ɵperformanceMarkFeature` | `@angular/core` | common, platform-browser, router | 5 |
| `ɵisPromise` | `@angular/core` | common, forms, router | 5 |
| `ɵINTERNAL_APPLICATION_ERROR_HANDLER` | `@angular/core` | common, platform-server, router | 5 |
| `ɵNoopNgZone` | `@angular/core` | modules, upgrade | 6 |
| `ɵsetDocument` | `@angular/core` | platform-browser, platform-server | 6 |
| `ɵAnimationRendererType` | `@angular/core` | animations, platform-browser | 3 |
| `ɵTracingService` | `@angular/core` | common, platform-browser | 3 |
| `ɵTracingSnapshot` | `@angular/core` | common, platform-browser | 3 |
| `ɵChangeDetectionScheduler` | `@angular/core` | elements, platform-browser | 3 |
| `ɵNotificationSource` | `@angular/core` | elements, platform-browser | 3 |
| `ɵresolveComponentResources` | `@angular/core` | platform-browser, router | 3 |
| `ɵIS_HYDRATION_DOM_REUSE_ENABLED` | `@angular/core` | platform-server, router | 3 |
| `ɵunwrapSafeValue` | `@angular/core` | common, platform-browser | 2 |
| `ɵisSubscribable` | `@angular/core` | common, forms | 2 |
| `ɵsetRootDomAdapter` | `@angular/common` | platform-browser, platform-server | 2 |
| `ɵTESTABILITY` | `@angular/core` | platform-browser, platform-server | 2 |
| `ɵIS_ENABLED_BLOCKING_INITIAL_NAVIGATION` | `@angular/core` | platform-browser, router | 2 |
| `ɵɵNgModuleDeclaration` | `@angular/core` | compiler-cli | 39 |
| `ɵɵdefineInjectable` | `@angular/core` | common | 26 |
| `ɵɵDirectiveDeclaration` | `@angular/core` | compiler-cli | 25 |

## `@angular/core` symbols reached only from tests (27)

Published as private API, but nothing that ships imports them here.

- `ɵCLIENT_RENDER_MODE_FLAG`
- `ɵDEHYDRATED_BLOCK_REGISTRY`
- `ɵDirectiveDebugMetadata`
- `ɵEVENT_REPLAY_QUEUE`
- `ɵExternalCoreGlobalUtils`
- `ɵHydrationStatus`
- `ɵInjectorProfilerContext`
- `ɵJSACTION_BLOCK_ELEMENT_MAP`
- `ɵJSACTION_EVENT_CONTRACT`
- `ɵLog`
- `ɵMetadataOverrider`
- `ɵNgModuleDef`
- `ɵR3Injector`
- `ɵSafeHtml`
- `ɵTimerScheduler`
- `ɵTracingAction`
- `ɵcreateInjector`
- `ɵcreateOrReusePlatformInjector`
- `ɵdefaultKeyValueDiffers`
- `ɵgetClosestComponentName`
- `ɵgetDocument`
- `ɵgetTransferState`
- `ɵreadHydrationInfo`
- `ɵresetIncrementalHydrationEnabledWarnedForTests`
- `ɵsetCurrentInjector`
- `ɵsetInjectorProfilerContext`
- `ɵunregisterLocaleData`

## `@angular/core` symbols with no consumer in this repository (53)

Neither imported nor emitted anywhere in this repository — they exist for consumers outside it.

- `ɵAcxDirectiveDebugMetadata`
- `ɵAfterRenderManager`
- `ɵAngularDirectiveDebugMetadata`
- `ɵAttributeMarker`
- `ɵBaseDirectiveDebugMetadata`
- `ɵComponentDef`
- `ɵComponentType`
- `ɵCssSelectorList`
- `ɵDebugSignalGraphEdge`
- `ɵDebugSignalGraphNode`
- `ɵDeferBlockConfig`
- `ɵDirectiveType`
- `ɵENABLE_ROOT_COMPONENT_BOOTSTRAP`
- `ɵForLoopBlockData`
- `ɵHydrationInfo`
- `ɵIS_INCREMENTAL_HYDRATION_ENABLED`
- `ɵInputSignalNode`
- `ɵLContext`
- `ɵNG_ELEMENT_ID`
- `ɵNG_PROV_DEF`
- `ɵNO_CHANGE`
- `ɵNavigationDestination`
- `ɵNavigationInterceptOptions`
- `ɵNavigationType`
- `ɵPROVIDED_NG_ZONE`
- `ɵPROVIDED_ZONELESS`
- `ɵPipeDef`
- `ɵProfiler`
- `ɵRender3ComponentRef`
- `ɵRenderFlags`
- `ɵSafeResourceUrl`
- `ɵSafeScript`
- `ɵSafeStyle`
- `ɵSafeUrl`
- `ɵUnwrapInputSignalWriteType`
- `ɵWizComponentDebugMetadata`
- `ɵcompileNgModule`
- `ɵcompileNgModuleFactory`
- `ɵconvertToBitFlags`
- `ɵdefaultIterableDiffers`
- `ɵdevModeEqual`
- `ɵdisableProfiling`
- `ɵgetCleanupHook`
- `ɵgetComponentInstanceDeepLinkId`
- `ɵgetCurrentClosestComponentInstance`
- `ɵgetDirectives`
- `ɵgetHostElement`
- `ɵgetLContext`
- `ɵgetSanitizationBypassType`
- `ɵinjectChangeDetectorRef`
- `ɵnoSideEffects`
- `ɵsetAlternateWeakRefImpl`
- `ɵstore`
