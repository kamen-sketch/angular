<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/platform-server/`

38 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/platform-server/`

- `packages/platform-server/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/platform-server/public_api.ts` — 19 lines
  - re-exports * from `./src/platform-server`



## `packages/platform-server/init/`

- `packages/platform-server/init/index.ts` — 13 lines
  - const: `ɵɵmoduleMarker`



## `packages/platform-server/init/src/`

- `packages/platform-server/init/src/init.ts` — 18 lines
- `packages/platform-server/init/src/shims.ts` — 21 lines
  - function: `applyShims`



## `packages/platform-server/init/test/`

- `packages/platform-server/init/test/shims_spec.ts` — 44 lines _(spec)_



## `packages/platform-server/src/`

- `packages/platform-server/src/domino_adapter.ts` — 128 lines
  - function: `setDomTypes`, `parseDocument`, `serializeDocument`
  - class: `DominoAdapter`
- `packages/platform-server/src/errors.ts` — 22 lines
  - const enum: `RuntimeErrorCode`
- `packages/platform-server/src/http.ts` — 111 lines
  - class: `ServerXhr`
  - const: `SERVER_HTTP_PROVIDERS`
- `packages/platform-server/src/location.ts` — 126 lines
  - class: `ServerPlatformLocation`
- `packages/platform-server/src/platform-server.ts` — 18 lines
  - re-exports * from `./private_export`
  - exports `PlatformState` from `./platform_state`
  - exports `provideServerRendering` from `./provide_server`
  - exports `platformServer`, `ServerModule` from `./server`
  - exports `BEFORE_APP_SERIALIZED`, `INITIAL_CONFIG`, `PlatformConfig` from `./tokens`
  - exports `renderApplication`, `renderModule` from `./utils`
  - exports `RuntimeErrorCode` from `./errors`
  - exports `VERSION` from `./version`
- `packages/platform-server/src/platform_state.ts` — 69 lines
  - class: `PlatformState`
  - function: `enableDomEmulation`
- `packages/platform-server/src/private_export.ts` — 19 lines
  - exports `INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS`, `SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS` from `./server`
  - exports `SERVER_CONTEXT as ɵSERVER_CONTEXT`, `renderInternal as ɵrenderInternal` from `./utils`
  - exports `ENABLE_DOM_EMULATION as ɵENABLE_DOM_EMULATION` from `./tokens`
  - exports `DominoAdapter as ɵDominoAdapter` from `./domino_adapter`
  - exports `isHostAllowed as ɵisHostAllowed` from `./utils`
- `packages/platform-server/src/provide_server.ts` — 46 lines
  - function: `provideServerRendering`
- `packages/platform-server/src/server.ts` — 150 lines
  - const: `INTERNAL_SERVER_PLATFORM_PROVIDERS`, `SERVER_RENDER_PROVIDERS`, `PLATFORM_SERVER_PROVIDERS`
  - class: `ServerModule`
  - function: `platformServer`
- `packages/platform-server/src/server_events.ts` — 33 lines
  - class: `ServerEventManagerPlugin`
- `packages/platform-server/src/tokens.ts` — 47 lines
  - interface: `PlatformConfig`
  - const: `INITIAL_CONFIG`, `BEFORE_APP_SERIALIZED`, `ENABLE_DOM_EMULATION`
- `packages/platform-server/src/transfer_state.ts` — 112 lines
  - const: `TRANSFER_STATE_SERIALIZATION_PROVIDERS`
  - function: `createScript`
- `packages/platform-server/src/types.d.ts` — 24 lines _(typings)_
- `packages/platform-server/src/url.ts` — 154 lines
  - interface: `ResolveUrlOptions`
  - function: `resolveUrl`, `resolveUrl`, `resolveUrl`
- `packages/platform-server/src/utils.ts` — 426 lines
  - const: `EVENT_DISPATCH_SCRIPT_ID`, `SERVER_CONTEXT`
  - function: `renderInternal`, `renderModule`, `renderApplication`, `isHostAllowed`
- `packages/platform-server/src/version.ts` — 21 lines
  - const: `VERSION`



## `packages/platform-server/test/`

- `packages/platform-server/test/dom_utils.ts` — 183 lines _(test-support)_
  - function: `stripUtilAttributes`, `getAppContents`, `resetTViewsFor`, `hydrate`, `insertDomInDocument`, `prepareEnvironment`, `prepareEnvironmentAndHydrate`, `clearDocument`
- `packages/platform-server/test/event_replay_spec.ts` — 897 lines _(spec)_
- `packages/platform-server/test/full_app_hydration_spec.ts` — 7926 lines _(spec)_
- `packages/platform-server/test/hydration_utils.ts` — 311 lines _(test-support)_
  - const: `NGH_ATTR_NAME`, `EMPTY_TEXT_NODE_COMMENT`, `TEXT_NODE_SEPARATOR_COMMENT`, `SKIP_HYDRATION_ATTR_NAME`, `SKIP_HYDRATION_ATTR_NAME_LOWER_CASE`, `TRANSFER_STATE_TOKEN_ID`, `EVENT_DISPATCH_SCRIPT`, `DEFAULT_DOCUMENT`
  - function: `getComponentRef`, `stripSsrIntegrityMarker`, `stripTransferDataScript`, `stripExcessiveSpaces`, `verifyClientAndSSRContentsMatch`, `verifyNodeHasMismatchInfo`, `isTransferStateScript`, `isSsrContentsIntegrityMarker`, `verifyAllNodesClaimedForHydration`, `verifyAllChildNodesClaimedForHydration`, `verifyNodeWasHydrated`, `verifyNodeWasNotHydrated`, `verifyNoNodesWereClaimedForHydration`, `verifyNodeHasSkipHydrationMarker`, `verifyHasLog`, `verifyHasNoLog`, `timeout`, `getHydrationInfoFromTransferState`, `withNoopErrorHandler`, `withDebugConsole`, `ssr`, `verifyEmptyConsole`, `clearConsole`, `resetNgDevModeCounters`
  - class: `DebugConsole`
- `packages/platform-server/test/incremental_hydration_spec.ts` — 3152 lines _(spec)_
- `packages/platform-server/test/integration_spec.ts` — 1699 lines _(spec)_
  - class: `MyServerAppModule`, `PendingTasksAppModule`, `HttpClientExampleModule`, `MyHttpInterceptor`, `HttpInterceptorExampleModule`
- `packages/platform-server/test/platform_location_spec.ts` — 222 lines _(spec)_
- `packages/platform-server/test/render_spec.ts` — 39 lines _(spec)_
- `packages/platform-server/test/transfer_state_spec.ts` — 165 lines _(spec)_
- `packages/platform-server/test/url_spec.ts` — 106 lines _(spec)_
- `packages/platform-server/test/utils_spec.ts` — 173 lines _(spec)_



## `packages/platform-server/testing/`

- `packages/platform-server/testing/index.ts` — 15 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/platform-server/testing/public_api.ts` — 17 lines _(test-support)_
  - re-exports * from `./src/testing`



## `packages/platform-server/testing/src/`

- `packages/platform-server/testing/src/server.ts` — 50 lines _(test-support)_
  - const: `platformServerTesting`
  - class: `ServerTestingModule`
- `packages/platform-server/testing/src/testing.ts` — 15 lines _(test-support)_
  - re-exports * from `./server`



## `packages/platform-server/third_party/domino/`

- `packages/platform-server/third_party/domino/bundled-domino.d.ts` — 17 lines _(typings)_
  - has a default export

