# `devtools/` — Angular DevTools browser extension

315 files, ~48k lines. A Chrome/Firefox DevTools extension for inspecting and profiling Angular
applications, built as a small multi-project Angular workspace inside the framework repository so
it always builds against the current framework sources.

Generated indexes:
[`devtools/projects`](./generated/index-devtools-projects.md) ·
[`devtools/src`](./generated/index-devtools-src.md)

---

## 1. Architecture

DevTools runs in two isolated JavaScript contexts that can only communicate by message passing:

```
 ┌─────────────────────┐            ┌───────────────────────────┐
 │ ng-devtools (UI)    │  message   │ ng-devtools-backend       │
 │ runs in the         │◄──bus────► │ runs in the inspected     │
 │ DevTools panel      │  protocol  │ page, next to the app     │
 └─────────────────────┘            └───────────────────────────┘
```

`projects/protocol/` defines the contract between them and is the right place to start reading:

- `lib/messages.ts` — every message and payload type: the directive forest, property descriptors,
  the signal graph (`DebugSignalGraphNode`/`DebugSignalGraphEdge`), profiler frames, router trees,
  injector trees, and the control-flow block details (`@defer` state and triggers, `@for` items and
  track expression).
- `lib/message-bus.ts` — the abstract `MessageBus<T>`; `lib/priority-aware-message-bus.ts` adds
  prioritisation so high-frequency profiler messages cannot starve interactive requests.

Concrete buses live in `devtools/src/iframe-message-bus.ts` (demo app in an iframe),
`zone-unaware-iframe-message-bus.ts`, and `projects/shell-browser/` (the real extension, over
`chrome.runtime`).

## 2. `projects/ng-devtools-backend/` — the in-page agent

Runs inside the inspected application and uses the framework's debug APIs
(`packages/core/src/render3/util/global_utils.ts`, `packages/core/primitives/devtools/`).

- `client-event-subscribers.ts` — the message handlers; this is the backend's entry point.
- `directive-forest/` — building the component/directive tree: `manager.ts`,
  `component-tree/` (reading component instances, inputs/outputs, and their metadata),
  `tree-strategies/` (different traversal strategies depending on the framework version),
  `identity-tracker/` (stable ids for nodes across re-renders), `property-mutation/` (writing
  values back into the running app from the panel), `core-enums.ts`, `utils/`.
- `profiling/` — `capture.ts` and `profiler/` hook the framework's `ProfilerEvent`s to record
  change-detection frames; `performance-track.ts` writes those frames into the browser's own
  Performance panel track.
- `component-inspector/` — the hover-to-highlight overlay.
- `hydration/` — visualising hydration status per node.
- `router-tree/` — extracting the router configuration and current state.
- `console/` — the `ng.*` console helpers exposed on the inspected page.

## 3. `projects/ng-devtools/` — the panel UI

An Angular application rendered inside the DevTools panel.
`lib/devtools.component.ts` hosts `lib/devtools-tabs/`, one directory per tab:

- `directive-explorer/` — the component tree plus the property editor (the largest tab).
- `profiler/` — recording controls, the flame graph / bar chart, and frame details.
- `injector-tree/` — the DI hierarchy visualisation.
- `router-tree/` — routes and the active route.
- `transfer-state/` — inspecting SSR `TransferState`.
- `settings/` and `tab-update/` — panel preferences and tab lifecycle.

`lib/application-environment/`, `lib/application-operations/`, `lib/application-providers/` and
`lib/application-services/` abstract "how do I talk to the inspected page", so the same UI runs
against the real extension, against the demo app, and in tests.
`lib/shared/` holds the reusable widgets.

## 4. Shells and support

- `projects/shell-browser/` — the packaged extension: `manifest/` (MV3 manifests per browser),
  `devtools.ts`/`devtools.html` (panel registration), background/content scripts under `app/`,
  and `popups/`.
- `projects/demo-no-zone/` — a zoneless demo application used for manual testing.
- `projects/shared-utils/` — `angular-check.ts` (detecting whether a page runs Angular and which
  version) and small shared helpers.
- `devtools/src/` — the standalone dev harness that hosts the panel UI next to a demo app in an
  iframe, so the extension can be developed without reloading a browser extension.
- `devtools/cypress/` — end-to-end tests driving the harness.
- `devtools/tools/angular-optimization/` — the esbuild plugin used when bundling the extension,
  plus `ensure-no-linker-decl.mjs`, which fails the build if any partially-compiled
  `ɵɵngDeclare*` call survives into the shipped bundle (the extension ships without the linker).
