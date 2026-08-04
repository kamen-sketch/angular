# The DevTools message protocol

DevTools is the one part of this repository that is split across processes it does not control.
The panel UI runs in the browser's DevTools window, the agent runs inside the inspected page, and
the extension shell relays between them. Nothing is shared except messages, so the protocol
_is_ the architecture — and unlike the compiler→runtime contract ([19](./19-layering-and-contracts.md)),
only part of it is checked by the compiler.

Measured by [`tools/analyze-devtools-protocol.mjs`](./tools/analyze-devtools-protocol.mjs), which
writes [`generated/devtools-protocol.md`](./generated/devtools-protocol.md).

```bash
node docs/codebase-map/tools/analyze-devtools-protocol.mjs
```

---

## 1. The contract

`devtools/projects/protocol/src/lib/messages.ts` declares **48 events** in one `Events` interface,
each a function type describing the payload:

```ts
export interface Events {
  getSignalGraph: (query: ElementPosition) => void;
  latestSignalGraph: (graph: DebugSignalGraph | null) => void;
  …
}
```

`MessageBus<T>` is generic over that interface — `on<E extends keyof T>(topic: E, cb: T[E])` — so
on the typed path TypeScript already guarantees the topic exists and the payload matches. What it
cannot check is whether an event is wired at _both_ ends: each side compiles in isolation, so an
event that nothing emits, or one that nothing listens for, is invisible to both the compiler and
the tests. That is what the analyzer checks, and today all 48 events have an emitter and a
listener outside specs.

## 2. Which way the messages flow

Reducing every event to (side that emits) → (side that listens):

| Direction       | Events | What they are                                                                                                                         |
| --------------- | -----: | ------------------------------------------------------------------------------------------------------------------------------------- |
| panel → backend |     18 | requests: `getSignalGraph`, `getRoutes`, `getNestedProperties`, `startProfiling`, `updateState`, the highlight overlays …             |
| backend → panel |     13 | answers and pushes: `latestSignalGraph`, `latestComponentExplorerView`, `profilerResults`, `componentTreeDirty`, `updateRouterTree` … |
| shell involved  |     17 | connection lifecycle, frame management, and the two Angular-detection events                                                          |

The panel→backend and backend→panel halves are near-symmetric because most of the protocol is
request/response pairs named `getX` / `latestX`. The asymmetry is `componentTreeDirty` — a push
with no request, which is how the backend tells the panel to re-query after the app re-renders.

## 3. Two transports, and only one of them is typed

The `MessageBus` is not the only way protocol messages travel. The extension shell
(`devtools/projects/shell-browser/src/app/tab_manager.ts`) relays over raw `chrome.runtime` ports
instead, posting an untyped envelope and switching on its contents:

```ts
tab.devtools!.postMessage({
  topic: 'contentScriptConnected',
  args: [parseInt(frameId, 10), connection.port.name, connection.port.sender!.url],
});
…
if (message.topic === 'enableFrameConnection') { … }
```

Exactly **six** events travel this way, and they are precisely the ones that manage the connection
itself:

| Event                       | Emitted by | Listened to by |
| --------------------------- | ---------- | -------------- |
| `contentScriptConnected`    | shell      | panel          |
| `contentScriptDisconnected` | shell      | panel          |
| `enableFrameConnection`     | panel      | shell          |
| `frameConnected`            | shell      | panel          |
| `backendReady`              | shell      | shell          |
| `devtoolsShutdown`          | shell      | backend        |

That split is reasonable — you cannot use the bus to negotiate the connection the bus runs over —
but it means the six events with the _least_ type safety are also the ones whose failure modes are
hardest to see: a mismatch here does not break a feature, it makes the panel show nothing at all
for a frame. They are the first thing to check when DevTools attaches but stays empty, and the
reason the relay has a dedicated spec of its own (`tab_manager_spec.ts`, ten cases over the
connect/disconnect/enable sequence) where the typed events are covered by the features that use
them.

## 4. Reading the protocol as a feature list

Because every panel feature must ask the backend for its data, the event list doubles as an
inventory of what DevTools can do, and each event points at the subsystem behind it:

| Events                                                                                                                                              | Feature                                     | Backend implementation                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| `getLatestComponentExplorerView`, `latestComponentExplorerView`, `componentTreeDirty`, `setSelectedComponent`, `updateState`, `getNestedProperties` | component explorer and property editor      | `directive-forest/`                                              |
| `getSignalGraph`, `latestSignalGraph`, `getSignalNestedProperties`                                                                                  | signal graph                                | `packages/core/primitives/devtools/debug_signal_graph.ts`        |
| `startProfiling`, `stopProfiling`, `sendProfilerChunk`, `profilerResults`, `enablePerformanceTrack`                                                 | profiler                                    | `profiling/`, driven by core's `ProfilerEvent`                   |
| `getRoutes`, `updateRouterTree`, `navigateRoute`                                                                                                    | router tree                                 | `router-tree/`, reading `packages/router/src/router_devtools.ts` |
| `getInjectorProviders`, `latestInjectorProviders`, `logProvider`                                                                                    | injector tree                               | `packages/core`'s injector debug APIs                            |
| `createHydrationOverlay`, `removeHydrationOverlay`                                                                                                  | hydration overlay                           | `hydration/`                                                     |
| `getTransferState`, `transferStateData`                                                                                                             | transfer-state inspector                    | SSR `TransferState`                                              |
| `inspectorStart`, `inspectorEnd`, `createHighlightOverlay`, `highlightComponent`, `selectComponent`                                                 | hover-to-inspect                            | `component-inspector/`                                           |
| `queryNgAvailability`, `ngAvailability`, `detectAngular`, `backendInstalled`                                                                        | "is this an Angular app, and which version" | `shared-utils/angular-check.ts`                                  |

The profiler is the only feature that streams, and it uses two events to do it
(`client-event-subscribers.ts`): `startProfiling` installs a callback that emits
`sendProfilerChunk` once **per frame** as the recording runs, while `stopProfiling` emits
`profilerResults` **once** with the accumulated result. A long recording therefore reaches the
panel incrementally rather than as one message the port would have to carry whole.

## 5. Measurement notes

Three refinements were needed before the numbers meant anything, and each is a trap for any future
tooling here:

- **`.on('click', …)` is not always a bus subscription.** DevTools uses d3, whose selections expose
  the same method name. The analyzer requires the receiver to be named like a bus.
- **The shell's raw envelope is invisible to a bus-only scan.** Scanning only `MessageBus` calls
  reported five events as having no emitter; they were all being sent by `postMessage({topic})`.
- **Specs synthesise topics.** `tab_manager_spec.ts` sends `{topic: 'test'}` to exercise the relay,
  which is not a protocol violation. Spec usages are tracked but excluded from the checks.
