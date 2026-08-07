# `packages/service-worker` — `@angular/service-worker`

56 files, ~13k lines, split into four independent pieces that never import each other at runtime:

1. `src/` — the application-side API (`ServiceWorkerModule`, `SwUpdate`, `SwPush`);
2. `worker/` — the service worker script itself (`ngsw-worker.js`);
3. `config/` — the build-time generator that turns `ngsw-config.json` into `ngsw.json`;
4. `cli/` — the `ngsw-config` binary wrapping the generator.

Generated index: [`generated/index-packages-service-worker.md`](./generated/index-packages-service-worker.md)

---

## 1. Application side (`src/`)

- `module.ts` — `ServiceWorkerModule.register(script, options)`, which registers the worker after
  the app stabilises (or after the configured `registrationStrategy`: `registerWhenStable:<ms>`,
  `registerImmediately`, `registerWithDelay:<ms>`).
- `provider.ts` — the standalone equivalent, `provideServiceWorker`.
- `low_level.ts` — `NgswCommChannel`, the typed postMessage bridge to the worker, plus the
  `ERR_SW_NOT_SUPPORTED` handling and the `UpdateAvailableEvent`/`VersionEvent` types.
- `update.ts` — `SwUpdate`: `versionUpdates`, `unrecoverable`, `checkForUpdate()`,
  `activateUpdate()`.
- `push.ts` — `SwPush`: `messages`, `notificationClicks`, `subscription`, `requestSubscription()`,
  `unsubscribe()`.
- `errors.ts` — the package's `RuntimeErrorCode`s.

## 2. The worker (`worker/src/`)

- `driver.ts` (1,396 lines) — `Driver`, the top-level worker. It implements the `fetch`, `install`,
  `activate`, `message`, `push` and `notificationclick` handlers, tracks a `DriverReadyState`
  (`NORMAL`, `EXISTING_CLIENTS_ONLY`, `SAFE_MODE`), assigns each client to a manifest hash so a
  running tab keeps its version, and degrades to pass-through on unrecoverable state.
- `app-version.ts` — `AppVersion`: one manifest's worth of assets and data groups, and the
  request-handling logic for that version.
- `assets.ts` — the asset group strategies (`PrefetchAssetGroup`, `LazyAssetGroup`) and hash
  verification of cached files.
- `data.ts` — the data groups: freshness/performance strategies, LRU state, max age and max size.
- `manifest.ts` — the `Manifest` type and hashing.
- `database.ts`, `db-cache.ts`, `named-cache-storage.ts` — the persistence layer over the Cache API
  and its table abstraction.
- `idle.ts` — the idle-task queue (`IDLE_DELAY`/`MAX_IDLE_DELAY`) used to do cleanup off the
  critical path.
- `adapter.ts` — the wrapper over global service-worker APIs so the driver can be unit tested.
- `msg.ts`, `debug.ts`, `error.ts`, `sha1.ts`, `api.ts` — the message protocol, the
  `/ngsw/state` debug page, error types, and the hashing used to verify assets.

## 3. Config generation (`config/src/`)

- `generator.ts` — `Generator.process()` reads an `ngsw-config.json` (`in.ts` holds its schema:
  `assetGroups`, `dataGroups`, `navigationUrls`, `navigationRequestStrategy`, `appData`) and emits
  `ngsw.json` with every matched file's hash.
- `glob.ts` — the glob-to-regex translation used by `files` patterns.
- `duration.ts` — parsing of `"1d12h"`-style durations.
- `filesystem.ts` — the `Filesystem` abstraction so the generator can run over a virtual FS in tests.

## 4. CLI (`cli/`)

`main.ts` is the `ngsw-config` entry point: it wires `config/`'s generator to a real
`NodeFilesystem` (`filesystem.ts`) and writes the output. `safety-worker.js` at the package root is
the "uninstall everything" worker shipped for turning the service worker off.
