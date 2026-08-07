<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/service-worker/`

56 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/service-worker/`

- `packages/service-worker/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/service-worker/public_api.ts` — 17 lines
  - re-exports * from `./src/index`
- `packages/service-worker/safety-worker.js` — 31 lines



## `packages/service-worker/cli/`

- `packages/service-worker/cli/esbuild.config.js` — 22 lines
- `packages/service-worker/cli/filesystem.ts` — 57 lines
  - class: `NodeFilesystem`
- `packages/service-worker/cli/main.ts` — 30 lines
- `packages/service-worker/cli/sha1.ts` — 218 lines
  - function: `sha1`, `sha1Binary`



## `packages/service-worker/config/`

- `packages/service-worker/config/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/service-worker/config/public_api.ts` — 12 lines
  - exports `Filesystem` from `./src/filesystem`
  - exports `Generator` from `./src/generator`
  - exports `AssetGroup`, `Config`, `DataGroup`, `Duration`, `Glob` from `./src/in`



## `packages/service-worker/config/src/`

- `packages/service-worker/config/src/duration.ts` — 49 lines
  - function: `parseDurationToMs`
- `packages/service-worker/config/src/filesystem.ts` — 21 lines
  - interface: `Filesystem`
- `packages/service-worker/config/src/generator.ts` — 211 lines
  - class: `Generator`
  - function: `processNavigationUrls`
- `packages/service-worker/config/src/glob.ts` — 46 lines
  - function: `globToRegex`
- `packages/service-worker/config/src/in.ts` — 66 lines
  - type: `Glob`, `Duration`
  - interface: `Config`, `AssetGroup`, `DataGroup`



## `packages/service-worker/config/test/`

- `packages/service-worker/config/test/generator_spec.ts` — 591 lines _(spec)_



## `packages/service-worker/config/testing/`

- `packages/service-worker/config/testing/mock.ts` — 55 lines _(test-support)_
  - class: `MockFilesystem`, `HashTrackingMockFilesystem`



## `packages/service-worker/src/`

- `packages/service-worker/src/errors.ts` — 20 lines
  - const enum: `RuntimeErrorCode`
- `packages/service-worker/src/index.ts` — 21 lines
  - exports `NoNewVersionDetectedEvent`, `UnrecoverableStateEvent`, `VersionDetectedEvent`, `VersionEvent`, `VersionInstallationFailedEvent`, `VersionReadyEvent` from `./low_level`
  - exports `ServiceWorkerModule` from `./module`
  - exports `provideServiceWorker`, `SwRegistrationOptions` from `./provider`
  - exports `SwPush` from `./push`
  - exports `SwUpdate` from `./update`
- `packages/service-worker/src/low_level.ts` — 280 lines
  - const: `ERR_SW_NOT_SUPPORTED`
  - interface: `NoNewVersionDetectedEvent`, `VersionDetectedEvent`, `VersionInstallationFailedEvent`, `VersionReadyEvent`, `UnrecoverableStateEvent`, `PushEvent`, `TypedEvent`
  - type: `VersionEvent`, `IncomingEvent`
  - class: `NgswCommChannel`
- `packages/service-worker/src/module.ts` — 40 lines
  - class: `ServiceWorkerModule`
- `packages/service-worker/src/provider.ts` — 256 lines
  - const: `SCRIPT`
  - function: `ngswAppInitializer`, `ngswCommChannelFactory`, `provideServiceWorker`
  - class: `SwRegistrationOptions`
- `packages/service-worker/src/push.ts` — 299 lines
  - class: `SwPush`
- `packages/service-worker/src/update.ts` — 138 lines
  - class: `SwUpdate`



## `packages/service-worker/test/`

- `packages/service-worker/test/comm_spec.ts` — 567 lines _(spec)_
- `packages/service-worker/test/integration_spec.ts` — 166 lines _(spec)_
- `packages/service-worker/test/provider_spec.ts` — 496 lines _(spec)_



## `packages/service-worker/testing/`

- `packages/service-worker/testing/mock.ts` — 107 lines _(test-support)_
  - const: `patchDecodeBase64`
  - class: `MockServiceWorkerContainer`, `MockServiceWorker`, `MockServiceWorkerRegistration`, `MockPushManager`, `MockPushSubscription`



## `packages/service-worker/worker/`

- `packages/service-worker/worker/main.ts` — 17 lines



## `packages/service-worker/worker/src/`

- `packages/service-worker/worker/src/adapter.ts` — 109 lines
  - class: `Adapter`
- `packages/service-worker/worker/src/api.ts` — 126 lines
  - enum: `UpdateCacheStatus`
  - type: `NormalizedUrl`
  - interface: `UpdateSource`, `UrlMetadata`, `CacheState`, `DebugLogger`, `DebugState`, `DebugVersion`, `DebugIdleState`, `Debuggable`
- `packages/service-worker/worker/src/app-version.ts` — 327 lines
  - class: `AppVersion`
- `packages/service-worker/worker/src/assets.ts` — 723 lines
  - class: `AssetGroup`, `PrefetchAssetGroup`, `LazyAssetGroup`
- `packages/service-worker/worker/src/data.ts` — 656 lines
  - class: `DataGroup`
- `packages/service-worker/worker/src/database.ts` — 69 lines
  - interface: `Table`, `Database`
  - class: `NotFound`
- `packages/service-worker/worker/src/db-cache.ts` — 90 lines
  - class: `CacheDatabase`, `CacheTable`
- `packages/service-worker/worker/src/debug.ts` — 128 lines
  - class: `DebugHandler`
- `packages/service-worker/worker/src/driver.ts` — 1396 lines
  - function: `isLocalhost`
  - enum: `DriverReadyState`
  - class: `Driver`
- `packages/service-worker/worker/src/error.ts` — 24 lines
  - class: `SwCriticalError`, `SwUnrecoverableStateError`
  - function: `errorToString`
- `packages/service-worker/worker/src/idle.ts` — 114 lines
  - interface: `IdleTask`
  - class: `IdleScheduler`
- `packages/service-worker/worker/src/manifest.ts` — 51 lines
  - type: `ManifestHash`
  - interface: `Manifest`, `AssetGroupConfig`, `DataGroupConfig`
  - function: `hashManifest`
- `packages/service-worker/worker/src/msg.ts` — 39 lines
  - interface: `MsgAny`, `MsgCheckForUpdates`, `MsgActivateUpdate`, `MsgCheckVersion`
  - function: `isMsgCheckForUpdates`, `isMsgActivateUpdate`, `isMsgCheckVersion`
- `packages/service-worker/worker/src/named-cache-storage.ts` — 49 lines
  - interface: `NamedCache`
  - class: `NamedCacheStorage`
- `packages/service-worker/worker/src/service-worker.d.ts` — 20 lines _(typings)_
- `packages/service-worker/worker/src/sha1.ts` — 218 lines
  - function: `sha1`, `sha1Binary`



## `packages/service-worker/worker/test/`

- `packages/service-worker/worker/test/data_spec.ts` — 428 lines _(spec)_
- `packages/service-worker/worker/test/happy_spec.ts` — 2927 lines _(spec)_
- `packages/service-worker/worker/test/idle_spec.ts` — 188 lines _(spec)_
- `packages/service-worker/worker/test/localhost_spec.ts` — 93 lines _(spec)_
- `packages/service-worker/worker/test/prefetch_spec.ts` — 132 lines _(spec)_



## `packages/service-worker/worker/testing/`

- `packages/service-worker/worker/testing/cache.ts` — 230 lines _(test-support)_
  - interface: `DehydratedResponse`
  - type: `DehydratedCache`, `DehydratedCacheStorage`
  - class: `MockCacheStorage`, `MockCache`
  - function: `clearAllCaches`
- `packages/service-worker/worker/testing/clients.ts` — 115 lines _(test-support)_
  - class: `MockClient`, `MockWindowClient`, `MockClients`
- `packages/service-worker/worker/testing/events.ts` — 138 lines _(test-support)_
  - class: `MockEvent`, `MockExtendableEvent`, `MockActivateEvent`, `MockFetchEvent`, `MockInstallEvent`, `MockExtendableMessageEvent`, `MockNotificationEvent`, `MockPushEvent`
- `packages/service-worker/worker/testing/fetch.ts` — 241 lines _(test-support)_
  - class: `MockBody`, `MockHeaders`, `MockRequest`, `MockResponse`
- `packages/service-worker/worker/testing/mock.ts` — 309 lines _(test-support)_
  - type: `HeaderMap`
  - class: `MockFile`, `MockFileSystemBuilder`, `MockFileSystem`, `MockServerStateBuilder`, `MockServerState`
  - function: `tmpManifestSingleAssetGroup`, `tmpHashTableForFs`, `tmpHashTable`
- `packages/service-worker/worker/testing/scope.ts` — 386 lines _(test-support)_
  - class: `SwTestHarnessBuilder`, `SwTestHarnessImpl`, `AssetGroupBuilder`, `ConfigBuilder`
  - type: `SwTestHarness`
- `packages/service-worker/worker/testing/utils.ts` — 55 lines _(test-support)_
  - function: `envIsSupported`, `normalizeUrl`, `parseUrl`

