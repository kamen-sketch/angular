<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/analyze-devtools-protocol.mjs
-->

# DevTools message protocol

The 48 events declared in
`devtools/projects/protocol/src/lib/messages.ts`, with the side of the bus that emits each and
the side that listens. See [`../22-devtools-protocol.md`](../22-devtools-protocol.md).

The **raw** column marks events that travel over the shell's untyped `{topic, args}` port
envelope rather than the typed `MessageBus`.

| Event | Emitted by | Listened to by | Raw |
| --- | --- | --- | :-: |
| `handshake` | other (spec), shell | shell | — |
| `shutdown` | shell | backend | — |
| `queryNgAvailability` | panel | backend | — |
| `ngAvailability` | backend | panel | — |
| `inspectorStart` | other (spec), panel | backend, shell | — |
| `inspectorEnd` | panel | backend, shell | — |
| `getSignalGraph` | panel | backend | — |
| `latestSignalGraph` | backend | panel | — |
| `getSignalNestedProperties` | panel | backend | — |
| `signalNestedProperties` | backend | panel | — |
| `getNestedProperties` | other (spec), panel | backend | — |
| `nestedProperties` | backend | other (spec), panel | — |
| `setSelectedComponent` | panel | backend | — |
| `getRoutes` | panel | backend | — |
| `updateRouterTree` | backend | panel | — |
| `navigateRoute` | panel | backend | — |
| `componentTreeDirty` | backend | panel | — |
| `getLatestComponentExplorerView` | other (spec), panel | backend | — |
| `latestComponentExplorerView` | backend | panel | — |
| `updateState` | panel | backend | — |
| `logValue` | panel | backend | — |
| `startProfiling` | panel | backend | — |
| `stopProfiling` | panel | backend | — |
| `sendProfilerChunk` | backend | panel | — |
| `profilerResults` | backend | panel | — |
| `createHighlightOverlay` | panel | backend | — |
| `removeHighlightOverlay` | panel | backend | — |
| `createHydrationOverlay` | panel | backend | — |
| `removeHydrationOverlay` | panel | backend | — |
| `highlightComponent` | backend | panel | — |
| `selectComponent` | backend | panel | — |
| `removeComponentHighlight` | backend | panel | — |
| `enablePerformanceTrack` | panel, shell | backend | — |
| `disablePerformanceTrack` | panel, shell | backend | — |
| `getInjectorProviders` | panel | backend | — |
| `latestInjectorProviders` | backend | panel | — |
| `logProvider` | panel | backend | — |
| `getTransferState` | panel | backend | — |
| `transferStateData` | backend | panel | — |
| `contentScriptConnected` | shell, shell (spec) | panel | yes |
| `contentScriptDisconnected` | shell | panel | yes |
| `enableFrameConnection` | panel, shell (spec) | shell | yes |
| `frameConnected` | shell, shell (spec) | panel | yes |
| `detectAngular` | shell | shell | — |
| `backendInstalled` | shell | shell | — |
| `backendReady` | shell, shell (spec) | shell | yes |
| `devtoolsShutdown` | shell | backend | yes |
| `log` | panel | backend | — |
