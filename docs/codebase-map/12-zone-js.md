# `packages/zone.js` — execution context tracking

Zone.js (260 files, ~38k lines) is an independent library that ships from this repository. It
monkey-patches asynchronous browser and Node APIs so that a _zone_ — an execution context — is
preserved across async boundaries. Angular's `NgZone` uses it to know when the application has
finished all async work and change detection should run. In zoneless applications (the default
direction of the framework) none of this is loaded.

Generated index: [`generated/index-packages-zone.js.md`](./generated/index-packages-zone.js.md)

---

## 1. Core (`lib/zone-impl.ts`, `lib/zone.ts`)

`zone-impl.ts` defines the whole public contract and the implementation:

- **`Zone`** — `fork(zoneSpec)`, `run`, `runGuarded`, `runTask`, `wrap`, `get(key)`, and the
  `Zone.current`/`Zone.root` accessors.
- **`ZoneSpec`** — the interception hooks a zone can install: `onFork`, `onIntercept`, `onInvoke`,
  `onHandleError`, `onScheduleTask`, `onInvokeTask`, `onCancelTask`, `onHasTask`.
- **`ZoneDelegate`** — the object that walks the parent chain when a hook is not implemented.
- **`Task`** — the unit of scheduled async work, with `TaskType`
  (`microTask` | `macroTask` | `eventTask`), a `TaskState` machine
  (`notScheduled` → `scheduling` → `scheduled` → `running` → `canceling`/`unknown`), and
  `TaskData` (delay, `isPeriodic`, …). `HasTaskState` is what `onHasTask` reports and is exactly
  what `NgZone.isStable` is derived from.
- **`ZonePrivate`/`PatchFn`** — the internal API every patch module uses to register itself, so
  patches can be loaded selectively.

## 2. Patches

**`lib/common/`** — the cross-platform patches: `promise.ts` (a fully spec-compliant, zone-aware
`Promise` that also tracks unhandled rejections), `timers.ts`
(`setTimeout`/`setInterval`/`setImmediate`), `events.ts` (the generic `addEventListener` patcher
with its listener-reuse optimisation), `fetch.ts`, `queue-microtask.ts`, `error-rewrite.ts`
(rewriting stack traces to hide zone frames), `to-string.ts` (keeping `Function.prototype.toString`
honest for patched functions), and `utils.ts` (the patching primitives `patchMethod`,
`patchPrototype`, `patchProperty`, `attachOriginToPatched`).

**`lib/browser/`** — DOM-specific patches: `browser.ts` is the entry point,
`event-target.ts` and `property-descriptor.ts` patch listeners and `on*` properties,
`define-property.ts`, `register-element.ts`/`custom-elements.ts` for custom-element callbacks,
`canvas.ts`, `message-port.ts`, plus `api-util.ts`/`browser-util.ts`.

**`lib/node/`** — `node.ts`/`main.ts` patch `EventEmitter` (`events.ts`), `fs` (`fs.ts`),
`process.nextTick`, and the Node timer variants.

**`lib/extra/`, `lib/mix/`, `lib/rxjs/`** — optional patches (WebSocket/`XMLHttpRequest` extras, the
mixed browser+node build, and the RxJS scheduler integration).

## 3. Zone specs (`lib/zone-spec/`)

Ready-made `ZoneSpec` implementations: `async-test.ts` (behind `waitForAsync`),
`fake-async-test.ts` (the virtual clock behind `fakeAsync`/`tick`/`flush`), `sync-test.ts`,
`proxy.ts`, `long-stack-trace.ts` (async stack stitching), `task-tracking.ts` (what
`ApplicationRef`'s stability debugging reads to say _which_ tasks are pending), and `wtf.ts`.

## 4. Test framework integration

`lib/testing/` exposes `zone-testing.ts` (the bundle Angular's test setup imports),
`async-testing.ts`, `fake-async.ts`, `promise-testing.ts`. `lib/jasmine/`, `lib/mocha/`,
`lib/jest/` and `lib/vitest/` patch each runner so `it`/`beforeEach` bodies run inside a test zone
and the runner waits for zone stability.

## 5. Build and layout

`bundles.bzl`/`tools.bzl` and the many `rollup-*.ts` files define the shipped bundle set — each
`rollup-*.ts` is a thin entry point that pulls in exactly one patch so consumers can opt in
(`zone.js/plugins/*`). `file-size-limit.json` + `check-file-size.js` guard bundle size in CI.
Documentation for the patched API surface lives alongside the code in `STANDARD-APIS.md`,
`NON-STANDARD-APIS.md`, `MODULE.md` and `DEVELOPER.md`.
