<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `devtools/projects/`

256 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `devtools/projects/demo-no-zone/src/`

- `devtools/projects/demo-no-zone/src/main.ts` — 13 lines



## `devtools/projects/demo-no-zone/src/app/`

- `devtools/projects/demo-no-zone/src/app/app.component.ts` — 25 lines
  - class: `AppComponent`



## `devtools/projects/ng-devtools/`

- `devtools/projects/ng-devtools/index.ts` — 10 lines
  - re-exports * from `./src/public-api`



## `devtools/projects/ng-devtools-backend/`

- `devtools/projects/ng-devtools-backend/index.ts` — 10 lines
  - re-exports * from `./src/public-api`



## `devtools/projects/ng-devtools-backend/src/`

- `devtools/projects/ng-devtools-backend/src/public-api.ts` — 17 lines
  - re-exports * from `./lib`
  - exports `findNodeFromSerializedPosition` from `./lib/directive-forest/component-tree/component-tree`
  - exports `viewSourceFromRouter` from `./lib/client-event-subscribers`
  - exports `type RoutePropertyType` from `./lib/router-tree/router-tree`



## `devtools/projects/ng-devtools-backend/src/lib/`

- `devtools/projects/ng-devtools-backend/src/lib/client-event-subscribers.spec.ts` — 74 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/client-event-subscribers.ts` — 691 lines
  - const: `subscribeToClientEvents`, `viewSourceFromRouter`
  - interface: `SerializableDirectiveInstanceType`, `SerializableComponentInstanceType`, `SerializableComponentTreeNode`
  - function: `sanitizeRouteData`
- `devtools/projects/ng-devtools-backend/src/lib/index.ts` — 16 lines
  - const: `initializeMessageBus`
- `devtools/projects/ng-devtools-backend/src/lib/version.ts` — 20 lines
  - const: `VERSION`



## `devtools/projects/ng-devtools-backend/src/lib/component-inspector/`

- `devtools/projects/ng-devtools-backend/src/lib/component-inspector/component-inspector.spec.ts` — 51 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/component-inspector/component-inspector.ts` — 123 lines
  - interface: `ComponentInspectorOptions`
  - class: `ComponentInspector`



## `devtools/projects/ng-devtools-backend/src/lib/console/`

- `devtools/projects/ng-devtools-backend/src/lib/console/set-console-reference.ts` — 71 lines
  - const: `setConsoleReference`



## `devtools/projects/ng-devtools-backend/src/lib/directive-forest/`

- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/core-enums.ts` — 28 lines
  - enum: `ChangeDetectionStrategy`, `AcxChangeDetectionStrategy`, `Framework`
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/index.ts` — 28 lines
  - const: `buildDirectiveForestWithStrategy`
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/manager.ts` — 101 lines
  - class: `DirectiveForestManager`
  - function: `getDirectiveForestManager`



## `devtools/projects/ng-devtools-backend/src/lib/directive-forest/component-tree/`

- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/component-tree/component-tree.spec.ts` — 187 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/component-tree/component-tree.ts` — 863 lines
  - const: `injectorToId`, `nodeInjectorToResolutionPath`, `idToInjector`, `getLatestComponentState`, `buildDirectiveForest`, `queryDirectiveForest`, `findNodeInForest`, `findNodeFromSerializedPosition`, `updateState`
  - function: `getInjectorId`, `getInjectorMetadata`, `getInjectorResolutionPath`, `getInjectorFromElementNode`, `getDirectiveCdStrategy`, `getInjectorProviders`, `serializeInjector`, `serializeProviderRecord`, `getElementInjectorElement`, `isElementInjector`, `getRootElements`, `logValue`, `serializeResolutionPath`, `findDirectiveAndHost`, `getDirectiveName`
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/component-tree/get-roots.spec.ts` — 49 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/component-tree/get-roots.ts` — 28 lines
  - function: `getAppRoots`



## `devtools/projects/ng-devtools-backend/src/lib/directive-forest/identity-tracker/`

- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/identity-tracker/identity-tracker.spec.ts` — 166 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/identity-tracker/identity-tracker.ts` — 205 lines
  - interface: `Type`, `IndexedNode`
  - type: `NodeArray`, `IndexingOutput`, `IdentityTrackerOpMode`
  - class: `IdentityTracker`
  - const: `indexForest`



## `devtools/projects/ng-devtools-backend/src/lib/directive-forest/property-mutation/`

- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/property-mutation/property-mutation.spec.ts` — 363 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/property-mutation/property-mutation.ts` — 227 lines
  - function: `mutateNestedProp`



## `devtools/projects/ng-devtools-backend/src/lib/directive-forest/tree-strategies/`

- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/tree-strategies/index.ts` — 25 lines
  - function: `selectTreeStrategy`
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/tree-strategies/ltree.ts` — 169 lines
  - const: `isLContainer`, `METADATA_PROPERTY_NAME`, `getDirectiveHostElement`
  - function: `getLViewFromDirectiveOrElementInstance`
  - class: `LTreeStrategy`
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/tree-strategies/render-tree.spec.ts` — 242 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/tree-strategies/render-tree.ts` — 203 lines
  - class: `RTreeStrategy`



## `devtools/projects/ng-devtools-backend/src/lib/directive-forest/utils/`

- `devtools/projects/ng-devtools-backend/src/lib/directive-forest/utils/control-flow.ts` — 135 lines
  - function: `isControlFlowBlock`, `mapToDevtoolsControlFlowModel`, `createControlFlowTreeNode`
  - class: `ControlFlowBlocksIterator`



## `devtools/projects/ng-devtools-backend/src/lib/hydration/`

- `devtools/projects/ng-devtools-backend/src/lib/hydration/hydration-highlighting.ts` — 100 lines
  - function: `highlightHydrationNodes`, `removeHydrationHighlights`



## `devtools/projects/ng-devtools-backend/src/lib/profiling/`

- `devtools/projects/ng-devtools-backend/src/lib/profiling/capture.ts` — 396 lines
  - const: `start`, `stop`
- `devtools/projects/ng-devtools-backend/src/lib/profiling/performance-track.spec.ts` — 32 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/profiling/performance-track.ts` — 119 lines
  - const: `disablePerformanceTrack`
  - function: `enablePerformanceTrack`



## `devtools/projects/ng-devtools-backend/src/lib/profiling/profiler/`

- `devtools/projects/ng-devtools-backend/src/lib/profiling/profiler/index.ts` — 49 lines
  - function: `getProfiler`
  - exports `type Hooks`, `Profiler` from `./shared`
- `devtools/projects/ng-devtools-backend/src/lib/profiling/profiler/native.ts` — 257 lines
  - class: `NgProfiler`
- `devtools/projects/ng-devtools-backend/src/lib/profiling/profiler/polyfill.ts` — 155 lines
  - class: `PatchingProfiler`
- `devtools/projects/ng-devtools-backend/src/lib/profiling/profiler/shared.ts` — 280 lines
  - interface: `Hooks`
  - class: `Profiler`
  - const: `getLifeCycleName`



## `devtools/projects/ng-devtools-backend/src/lib/router-tree/`

- `devtools/projects/ng-devtools-backend/src/lib/router-tree/router-tree.spec.ts` — 641 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/router-tree/router-tree.ts` — 302 lines
  - type: `RoutePropertyType`, `RouteGuard`
  - function: `getActiveRouteConfigs`, `parseRoutes`, `getRouterCallableConstructRef`



## `devtools/projects/ng-devtools-backend/src/lib/shared/`

- `devtools/projects/ng-devtools-backend/src/lib/shared/interfaces.ts` — 38 lines
  - interface: `DebuggingAPI`, `DirectiveInstanceType`, `ComponentInstanceType`, `ComponentTreeNode`
  - type: `DirectiveInstance`, `ComponentInstance`



## `devtools/projects/ng-devtools-backend/src/lib/shared/highlighter/`

- `devtools/projects/ng-devtools-backend/src/lib/shared/highlighter/dom.ts` — 144 lines
  - const: `OVERLAY_CLASS`
  - function: `createOverlayWithLabels`, `positionOverlayElement`, `setLabelElementVisibility`, `getComponentRect`
- `devtools/projects/ng-devtools-backend/src/lib/shared/highlighter/highlighter.spec.ts` — 281 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/shared/highlighter/highlights.spec.ts` — 252 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/shared/highlighter/highlights.ts` — 250 lines
  - type: `HighlightLabelDefinition`, `HighlightLabelProps`
  - interface: `HighlightLabel`, `HighlightTemplate`
  - enum: `HighlightType`
  - class: `Highlight`
  - const: `inspectElementHighlightTemplate`, `hydrationCompletedHighlightTemplate`, `hydrationMismatchedHighlightTemplate`, `hydrationSkippedHighlightTemplate`
- `devtools/projects/ng-devtools-backend/src/lib/shared/highlighter/index.ts` — 274 lines
  - function: `highlightElement`, `removeElementHighlights`, `removeAllHighlights`, `removeHighlightsByType`



## `devtools/projects/ng-devtools-backend/src/lib/shared/ng-debug-api/`

- `devtools/projects/ng-devtools-backend/src/lib/shared/ng-debug-api/ng-debug-api.spec.ts` — 196 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/shared/ng-debug-api/ng-debug-api.ts` — 111 lines
  - const: `ngDebugClient`
  - function: `ngDebugApiIsSupported`, `ngDebugDependencyInjectionApiIsSupported`, `ngDebugProfilerApiIsSupported`, `ngDebugRoutesApiIsSupported`, `ngDebugSignalGraphApiIsSupported`, `ngDebugTransferStateApiIsSupported`, `ngDebugSignalPropertiesInspectionApiIsSupported`
- `devtools/projects/ng-devtools-backend/src/lib/shared/ng-debug-api/supported-apis.spec.ts` — 20 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/shared/ng-debug-api/supported-apis.ts` — 41 lines
  - function: `getSupportedApis`



## `devtools/projects/ng-devtools-backend/src/lib/shared/state-serializer/`

- `devtools/projects/ng-devtools-backend/src/lib/shared/state-serializer/object-utils.ts` — 49 lines
  - function: `getKeys`
  - const: `getDescriptor`
- `devtools/projects/ng-devtools-backend/src/lib/shared/state-serializer/prop-type.spec.ts` — 93 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/shared/state-serializer/prop-type.ts` — 67 lines
  - const: `getPropType`
- `devtools/projects/ng-devtools-backend/src/lib/shared/state-serializer/serialized-descriptor-factory.ts` — 373 lines
  - interface: `CompositeType`, `TerminalType`
  - type: `PropertyData`, `Formatter`
  - function: `createShallowSerializedDescriptor`, `createLevelSerializedDescriptor`, `createNestedSerializedDescriptor`
- `devtools/projects/ng-devtools-backend/src/lib/shared/state-serializer/state-serializer.spec.ts` — 616 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/shared/state-serializer/state-serializer.ts` — 167 lines
  - function: `serializeDirectiveState`, `serializeValue`, `deeplySerializeSelectedProperties`



## `devtools/projects/ng-devtools-backend/src/lib/shared/utils/`

- `devtools/projects/ng-devtools-backend/src/lib/shared/utils/general.ts` — 68 lines
  - const: `runOutsideAngular`, `isCustomElement`
  - function: `isSignal`, `safelyReadSignalValue`, `unwrapSignal`
- `devtools/projects/ng-devtools-backend/src/lib/shared/utils/serialization.spec.ts` — 76 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/shared/utils/serialization.ts` — 52 lines
  - function: `sanitizeObject`
- `devtools/projects/ng-devtools-backend/src/lib/shared/utils/signal-graph-ref.spec.ts` — 42 lines _(spec)_
- `devtools/projects/ng-devtools-backend/src/lib/shared/utils/signal-graph-ref.ts` — 38 lines
  - class: `SignalGraphRef`



## `devtools/projects/ng-devtools/src/`

- `devtools/projects/ng-devtools/src/public-api.ts` — 17 lines
  - re-exports * from `./lib/application-operations`
  - re-exports * from `./lib/application-environment`
  - re-exports * from `./lib/application-providers/settings_provider`
  - exports `DevToolsComponent` from `./lib/devtools.component`



## `devtools/projects/ng-devtools/src/lib/`

- `devtools/projects/ng-devtools/src/lib/devtools.component.spec.ts` — 128 lines _(spec)_
  - class: `MockNgDevToolsTabs`
- `devtools/projects/ng-devtools/src/lib/devtools.component.ts` — 137 lines
  - const: `LAST_SUPPORTED_VERSION`
  - class: `DevToolsComponent`



## `devtools/projects/ng-devtools/src/lib/application-environment/`

- `devtools/projects/ng-devtools/src/lib/application-environment/index.ts` — 25 lines
  - interface: `Environment`, `Frame`
  - const: `TOP_LEVEL_FRAME_ID`
  - class: `ApplicationEnvironment`



## `devtools/projects/ng-devtools/src/lib/application-operations/`

- `devtools/projects/ng-devtools/src/lib/application-operations/index.ts` — 22 lines
  - class: `ApplicationOperations`



## `devtools/projects/ng-devtools/src/lib/application-providers/`

- `devtools/projects/ng-devtools/src/lib/application-providers/app_data.ts` — 73 lines
  - interface: `AppData`, `AppDataSignal`
  - const: `APP_DATA`
- `devtools/projects/ng-devtools/src/lib/application-providers/app_data_spec.ts` — 98 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/application-providers/deep_link.ts` — 19 lines
  - const: `DEEP_LINK_INSTANCE_ID`
- `devtools/projects/ng-devtools/src/lib/application-providers/settings_provider.ts` — 129 lines
  - function: `provideSettings`, `applyMigrations`
- `devtools/projects/ng-devtools/src/lib/application-providers/settings_provider_spec.ts` — 46 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/application-providers/settings_versions.ts` — 54 lines
  - const: `DATA_VERSION_KEY`, `LATEST_DATA_VERSION`
  - type: `SettingsData`
  - interface: `SettingsDataV2`, `SettingsDataV1`
- `devtools/projects/ng-devtools/src/lib/application-providers/supported_apis.ts` — 47 lines
  - interface: `SupportedApisSignal`
  - const: `SUPPORTED_APIS`
- `devtools/projects/ng-devtools/src/lib/application-providers/supported_apis_spec.ts` — 67 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/application-providers/window_provider.ts` — 14 lines
  - const: `WINDOW`



## `devtools/projects/ng-devtools/src/lib/application-services/`

- `devtools/projects/ng-devtools/src/lib/application-services/browser_styles_service.ts` — 77 lines
  - type: `Browser`
  - class: `BrowserStylesService`
- `devtools/projects/ng-devtools/src/lib/application-services/browser_styles_service_spec.ts` — 78 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/application-services/frame_manager.ts` — 151 lines
  - class: `FrameManager`
- `devtools/projects/ng-devtools/src/lib/application-services/frame_manager_spec.ts` — 199 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/application-services/settings.ts` — 48 lines
  - class: `Settings`
- `devtools/projects/ng-devtools/src/lib/application-services/settings_store.ts` — 60 lines
  - const: `SETTINGS_STORE_KEY`
  - class: `SettingsStore`
- `devtools/projects/ng-devtools/src/lib/application-services/settings_store_spec.ts` — 153 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/application-services/theme_service.ts` — 92 lines
  - class: `ThemeService`
- `devtools/projects/ng-devtools/src/lib/application-services/theme_service_spec.ts` — 126 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/application-services/theme_types.ts` — 14 lines
  - type: `ThemePreference`, `ThemeUi`



## `devtools/projects/ng-devtools/src/lib/application-services/test-utils/`

- `devtools/projects/ng-devtools/src/lib/application-services/test-utils/app_operations_mock.ts` — 65 lines
  - class: `AppOperationsMock`
- `devtools/projects/ng-devtools/src/lib/application-services/test-utils/settings_mock.ts` — 35 lines
  - class: `SettingsMock`
  - const: `SETTINGS_MOCK`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/devtools-tabs.component.ts` — 190 lines
  - class: `DevToolsTabsComponent`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/devtools-tabs.spec.ts` — 169 lines _(spec)_
  - class: `MockDirectiveExplorerComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-explorer.component.ts` — 401 lines
  - class: `DirectiveExplorerComponent`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-explorer.spec.ts` — 452 lines _(spec)_



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/diffing/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/diffing/diffing.spec.ts` — 107 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/diffing/index.ts` — 124 lines
  - interface: `MovedRecord`
  - const: `diff`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/directive-forest-filter-fn-generator.spec.ts` — 508 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/directive-forest-filter-fn-generator.ts` — 245 lines
  - interface: `ParsedFilter`
  - function: `tokenizeDirectiveForestFilter`, `parseDirectiveForestFilter`
  - const: `directiveForestFilterFnGenerator`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/directive-forest-utils.spec.ts` — 149 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/directive-forest-utils.ts` — 56 lines
  - const: `isChildOf`, `parentCollapsed`, `getDirectivesArrayString`, `matchesDirectiveOrComponentId`, `getFullNodeNameString`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/directive-forest.component.ts` — 462 lines
  - class: `DirectiveForestComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/breadcrumbs/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/breadcrumbs/breadcrumbs.component.ts` — 78 lines
  - class: `BreadcrumbsComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/component-data-source/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/component-data-source/component-data-source.spec.ts` — 254 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/component-data-source/index.ts` — 228 lines
  - interface: `FlatNode`
  - class: `ComponentDataSource`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/index-forest/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/index-forest/index-forest.spec.ts` — 229 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/index-forest/index.ts` — 61 lines
  - interface: `IndexedNode`
  - const: `indexForest`, `findNodeByPosition`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/tree-node/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/tree-node/tree-node.component.spec.ts` — 283 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/directive-forest/tree-node/tree-node.component.ts` — 167 lines
  - type: `NodeTextMatch`
  - class: `TreeNodeComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-pane.component.ts` — 57 lines
  - class: `PropertyPaneComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/defer-view/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/defer-view/defer-view.component.ts` — 43 lines
  - class: `DeferViewComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/for-loop-view/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/for-loop-view/for-loop-data-serializer.ts` — 49 lines
  - function: `buildForLoopDataTree`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/for-loop-view/for-loop-view.component.ts` — 32 lines
  - class: `ForLoopViewComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-pane-header/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-pane-header/property-pane-header.component.ts` — 34 lines
  - class: `PropertyPaneHeaderComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-pane-header/component-metadata/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-pane-header/component-metadata/component-metadata.component.spec.ts` — 259 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-pane-header/component-metadata/component-metadata.component.ts` — 121 lines
  - class: `ComponentMetadataComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view.component.ts` — 58 lines
  - class: `PropertyViewComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/property-view-body.component.ts` — 92 lines
  - class: `PropertyViewBodyComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/dependency-viewer/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/dependency-viewer/dependency-viewer.component.ts` — 24 lines
  - class: `DependencyViewerComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/dependency-viewer/resolution-path/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/dependency-viewer/resolution-path/resolution-path.component.spec.ts` — 64 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/dependency-viewer/resolution-path/resolution-path.component.ts` — 31 lines
  - const: `NODE_TYPE_CLASS_MAP`
  - class: `ResolutionPathComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/prop-actions-menu/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-body/prop-actions-menu/prop-actions-menu.component.ts` — 219 lines
  - class: `PropActionsMenuComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-header/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-pane/property-view/property-view-header/property-view-header.component.ts` — 53 lines
  - class: `PropertyViewHeaderComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/arrayify-props.spec.ts` — 99 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/arrayify-props.ts` — 28 lines
  - const: `arrayifyProps`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/directive-property-resolver.spec.ts` — 179 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/directive-property-resolver.ts` — 193 lines
  - interface: `DirectiveTreeData`
  - const: `constructPathOfKeysToPropertyValue`
  - class: `DirectivePropertyResolver`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/element-property-resolver.spec.ts` — 143 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/element-property-resolver.ts` — 82 lines
  - class: `ElementPropertyResolver`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/flatten.ts` — 51 lines
  - const: `getTreeFlattener`, `expandable`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/property-data-source.spec.ts` — 71 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/property-data-source.ts` — 134 lines
  - class: `PropertyDataSource`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/property-resolver/property-expanded-directive-properties.ts` — 48 lines
  - const: `getExpandedDirectiveProperties`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/signal-graph-manager/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/signal-graph-manager/signal-graph-manager.spec.ts` — 94 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/signal-graph-manager/signal-graph-manager.ts` — 78 lines
  - class: `SignalGraphManager`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/signal-graph-pane/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/directive-explorer/signal-graph-pane/signal-graph-pane.component.ts` — 122 lines
  - class: `SignalGraphPaneComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/injector-tree/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/injector-tree/injector-tree-fns.spec.ts` — 11680 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/injector-tree/injector-tree-fns.ts` — 359 lines
  - interface: `InjectorPath`, `InjectorTreeNode`
  - type: `InjectorTreeVisualizer`, `InjectorTreeD3Node`
  - function: `getInjectorIdsToRootFromNode`, `generateEdgeIdsFromNodeIds`, `equalInjector`, `findExistingPath`, `transformInjectorResolutionPathsIntoTree`, `grabInjectorPathsFromDirectiveForest`, `splitInjectorPathsIntoElementAndEnvironmentPaths`, `filterOutInjectorsWithNoProviders`, `filterOutAngularInjectors`, `d3InjectorTreeLinkModifier`, `d3InjectorTreeNodeModifier`, `areInjectorTreeNodesEqual`, `areInjectorTreesEqual`, `isElementTreeInjector`, `isEnvironmentTreeInjector`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/injector-tree/injector-tree.component.ts` — 424 lines
  - class: `InjectorTreeComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/injector-tree/injector-providers/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/injector-tree/injector-providers/injector-providers.component.ts` — 73 lines
  - class: `InjectorProvidersComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/file-api-service.ts` — 42 lines
  - class: `FileApiService`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/profiler.component.ts` — 129 lines
  - class: `ProfilerComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/profiler-import-dialog/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/profiler-import-dialog/profiler-import-dialog.component.ts` — 30 lines
  - class: `ProfilerImportDialogComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/filter.spec.ts` — 276 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/filter.ts` — 149 lines
  - type: `Filter`
  - const: `noopFilter`, `parseFilter`, `createFilter`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-timeline.component.ts` — 86 lines
  - class: `RecordingTimelineComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/frame-selector/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/frame-selector/frame-selector.component.ts` — 282 lines
  - class: `FrameSelectorComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/frame-merger.spec.ts` — 187 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/frame-merger.ts` — 71 lines
  - const: `mergeFrames`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/record-formatter-spec-constants.ts` — 448 lines
  - const: `SIMPLE_RECORD`, `SIMPLE_FORMATTED_FLAMEGRAPH_RECORD`, `SIMPLE_FORMATTED_TREE_MAP_RECORD`, `NESTED_RECORD`, `NESTED_FORMATTED_FLAMEGRAPH_RECORD`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/record-formatter.spec.ts` — 244 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/record-formatter.ts` — 70 lines
  - interface: `TimelineView`, `AppEntry`, `GraphNode`
  - class: `RecordFormatter`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/bargraph-formatter/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/bargraph-formatter/bargraph-formatter.ts` — 97 lines
  - interface: `BargraphNode`
  - class: `BarGraphFormatter`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/bargraph-formatter/index.ts` — 10 lines
  - re-exports * from `./bargraph-formatter`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/flamegraph-formatter/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/flamegraph-formatter/flamegraph-formatter.spec.ts` — 45 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/flamegraph-formatter/flamegraph-formatter.ts` — 102 lines
  - interface: `FlamegraphNode`
  - const: `ROOT_LEVEL_ELEMENT_LABEL`
  - class: `FlamegraphFormatter`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/flamegraph-formatter/index.ts` — 10 lines
  - re-exports * from `./flamegraph-formatter`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/tree-map-formatter/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/tree-map-formatter/index.ts` — 10 lines
  - re-exports * from `./tree-map-formatter`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/tree-map-formatter/tree-map-formatter.spec.ts` — 32 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/record-formatter/tree-map-formatter/tree-map-formatter.ts` — 72 lines
  - interface: `TreeMapNode`
  - class: `TreeMapFormatter`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-timeline-controls/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-timeline-controls/recording-timeline-controls.component.ts` — 26 lines
  - class: `RecordingTimelineControlsComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/recording-visualizer-types.ts` — 23 lines
  - interface: `SelectedEntry`, `SelectedDirective`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/recording-visualizer.component.ts` — 67 lines
  - class: `RecordingVisualizerComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/bargraph-visualizer/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/bargraph-visualizer/bargraph-visualizer.component.ts` — 46 lines
  - class: `BargraphVisualizerComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/bargraph-visualizer/bar-chart/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/bargraph-visualizer/bar-chart/bar-chart.component.ts` — 53 lines
  - class: `BarChartComponent`
  - function: `createBarText`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/execution-details/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/execution-details/execution-details.component.ts` — 20 lines
  - class: `ExecutionDetailsComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/flamegraph-visualizer/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/flamegraph-visualizer/flamegraph-visualizer.component.ts` — 82 lines
  - class: `FlamegraphVisualizerComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/profile-formatter/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/profile-formatter/profile-formatter.ts` — 51 lines
  - const: `formatDirectiveProfile`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/tree-map-visualizer/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/recording-visualizer/tree-map-visualizer/tree-map-visualizer.component.ts` — 84 lines
  - class: `TreeMapVisualizerComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/shared/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/shared/estimate-frame-rate.spec.ts` — 24 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/shared/estimate-frame-rate.ts` — 13 lines
  - function: `estimateFrameRate`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/shared/visualization-mode.ts` — 14 lines
  - enum: `VisualizationMode`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/visualizer-controls/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/profiler/recording-timeline/visualizer-controls/visualizer-controls.component.ts` — 35 lines
  - class: `VisualizerControlsComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-tree-fns.spec.ts` — 101 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-tree-fns.ts` — 65 lines
  - interface: `RouterTreeNode`
  - type: `RouterTreeVisualizer`, `RouterTreeD3Node`
  - function: `getRouteLabel`, `mapRoute`, `transformRoutesIntoVisTree`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-tree.component.spec.ts` — 118 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-tree.component.ts` — 231 lines
  - class: `RouterTreeComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-details-row/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-details-row/route-data-serializer.spec.ts` — 256 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-details-row/route-data-serializer.ts` — 75 lines
  - function: `buildRouteDataTree`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-details-row/route-details-row.component.spec.ts` — 117 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/router-tree/router-details-row/route-details-row.component.ts` — 69 lines
  - type: `RowType`, `ActionBtnType`
  - class: `RouteDetailsRowComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/settings/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/settings/settings.component.ts` — 56 lines
  - class: `SettingsComponent`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/tab-update/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/tab-update/index.ts` — 24 lines
  - class: `TabUpdate`



## `devtools/projects/ng-devtools/src/lib/devtools-tabs/transfer-state/`

- `devtools/projects/ng-devtools/src/lib/devtools-tabs/transfer-state/transfer-state.component.spec.ts` — 208 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/transfer-state/transfer-state.component.ts` — 266 lines
  - const: `COPY_FEEDBACK_TIMEOUT`, `LOADING_TIMEOUT`
  - class: `TransferStateComponent`
- `devtools/projects/ng-devtools/src/lib/devtools-tabs/transfer-state/value-tree-builder.ts` — 94 lines
  - function: `buildValueTree`



## `devtools/projects/ng-devtools/src/lib/shared/angie/`

- `devtools/projects/ng-devtools/src/lib/shared/angie/angie.component.ts` — 42 lines
  - class: `AngieComponent`



## `devtools/projects/ng-devtools/src/lib/shared/button/`

- `devtools/projects/ng-devtools/src/lib/shared/button/button.component.spec.ts` — 48 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/button/button.component.ts` — 31 lines
  - class: `ButtonComponent`



## `devtools/projects/ng-devtools/src/lib/shared/docs-ref-button/`

- `devtools/projects/ng-devtools/src/lib/shared/docs-ref-button/docs-ref-button.component.ts` — 34 lines
  - class: `DocsRefButtonComponent`



## `devtools/projects/ng-devtools/src/lib/shared/filter/`

- `devtools/projects/ng-devtools/src/lib/shared/filter/filter.component.spec.ts` — 119 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/filter/filter.component.ts` — 133 lines
  - type: `FilterMatch`, `FilterFn`, `FilterFnGenerator`
  - class: `FilterComponent`



## `devtools/projects/ng-devtools/src/lib/shared/icon/`

- `devtools/projects/ng-devtools/src/lib/shared/icon/icon.component.ts` — 25 lines
  - type: `IconName`
  - class: `IconComponent`



## `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/`

- `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/object-tree-explorer.component.ts` — 94 lines
  - class: `ObjectTreeExplorerComponent`
- `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/object-tree-explorer.spec.ts` — 148 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/object-tree-types.ts` — 50 lines
  - interface: `FlatNode`, `Property`



## `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/prop-value-highlighter/`

- `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/prop-value-highlighter/prop-value-highlighter.directive.ts` — 54 lines
  - class: `PropValueHighlighterDirective`



## `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/property-editor/`

- `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/property-editor/property-editor.component.ts` — 105 lines
  - class: `PropertyEditorComponent`



## `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/property-preview/`

- `devtools/projects/ng-devtools/src/lib/shared/object-tree-explorer/property-preview/property-preview.component.ts` — 35 lines
  - class: `PropertyPreviewComponent`



## `devtools/projects/ng-devtools/src/lib/shared/signal-details/`

- `devtools/projects/ng-devtools/src/lib/shared/signal-details/signal-details.component.ts` — 125 lines
  - class: `SignalDetailsComponent`



## `devtools/projects/ng-devtools/src/lib/shared/signal-details/signal-value-tree/`

- `devtools/projects/ng-devtools/src/lib/shared/signal-details/signal-value-tree/signal-data-source.ts` — 134 lines
  - const: `arrayifyProps`
  - class: `SignalDataSource`
- `devtools/projects/ng-devtools/src/lib/shared/signal-details/signal-value-tree/signal-value-tree.component.ts` — 66 lines
  - class: `SignalValueTreeComponent`



## `devtools/projects/ng-devtools/src/lib/shared/signal-graph/`

- `devtools/projects/ng-devtools/src/lib/shared/signal-graph/devtools-signal-graph.spec.ts` — 728 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/signal-graph/devtools-signal-graph.ts` — 221 lines
  - function: `convertToDevtoolsSignalGraph`
- `devtools/projects/ng-devtools/src/lib/shared/signal-graph/index.ts` — 12 lines
  - re-exports * from `./devtools-signal-graph`
  - re-exports * from `./utils`
  - re-exports * from `./signal-graph-types`
- `devtools/projects/ng-devtools/src/lib/shared/signal-graph/signal-graph-types.ts` — 71 lines
  - type: `DevtoolsClusterNodeType`, `DevtoolsSignalGraphNode`
  - interface: `DevtoolsSignalNode`, `DevtoolsClusterNode`, `DevtoolsSignalGraphEdge`, `DevtoolsSignalGraphCluster`, `DevtoolsSignalGraph`
- `devtools/projects/ng-devtools/src/lib/shared/signal-graph/utils.spec.ts` — 188 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/signal-graph/utils.ts` — 93 lines
  - function: `isClusterNode`, `isSignalNode`, `getNodeNames`, `checkClusterMatch`, `getNodeLabel`
  - type: `ClusterLabelFormatType`



## `devtools/projects/ng-devtools/src/lib/shared/signals-visualizer/`

- `devtools/projects/ng-devtools/src/lib/shared/signals-visualizer/signal-node-filter-fn-generator.spec.ts` — 226 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/signals-visualizer/signal-node-filter-fn-generator.ts` — 145 lines
  - interface: `SignalNodeFilterSource`
  - function: `tokenizeSignalNodeFilter`, `parseSignalNodeFilter`
  - const: `signalNodeFilterFnGenerator`
- `devtools/projects/ng-devtools/src/lib/shared/signals-visualizer/signals-visualizer.component.ts` — 259 lines
  - class: `SignalsVisualizerComponent`
- `devtools/projects/ng-devtools/src/lib/shared/signals-visualizer/signals-visualizer.ts` — 803 lines
  - type: `DependenciesHighlightEvent`
  - class: `SignalsGraphVisualizer`
- `devtools/projects/ng-devtools/src/lib/shared/signals-visualizer/visualizer-types.ts` — 43 lines
  - interface: `DagreRegularNode`, `DagreCluster`, `DagreEdge`
  - type: `DagreNode`



## `devtools/projects/ng-devtools/src/lib/shared/split/`

- `devtools/projects/ng-devtools/src/lib/shared/split/interface.ts` — 66 lines
  - type: `Direction`, `Unit`
  - interface: `IPoint`, `IArea`, `ISplitSnapshot`, `IAreaSnapshot`, `ISplitSideAbsorptionCapacity`, `IAreaAbsorptionCapacity`, `IOutputData`, `IOutputAreaSizes`
- `devtools/projects/ng-devtools/src/lib/shared/split/responsive-split.directive.spec.ts` — 137 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/split/responsive-split.directive.ts` — 75 lines
  - const: `RESIZE_DEBOUNCE`
  - type: `ResponsiveSplitConfig`
  - class: `ResponsiveSplitDirective`
- `devtools/projects/ng-devtools/src/lib/shared/split/split.component.ts` — 740 lines
  - class: `SplitComponent`
- `devtools/projects/ng-devtools/src/lib/shared/split/splitArea.directive.ts` — 190 lines
  - class: `SplitAreaDirective`
- `devtools/projects/ng-devtools/src/lib/shared/split/utils.ts` — 296 lines
  - function: `getPointFromEvent`, `getElementPixelSize`, `getInputBoolean`, `getInputPositiveNumber`, `isUserSizesValid`, `getAreaMinSize`, `getAreaMaxSize`, `getGutterSideAbsorptionCapacity`, `updateAreaSize`



## `devtools/projects/ng-devtools/src/lib/shared/tree-visualizer/`

- `devtools/projects/ng-devtools/src/lib/shared/tree-visualizer/graph-renderer.ts` — 44 lines
  - class: `GraphRenderer`
- `devtools/projects/ng-devtools/src/lib/shared/tree-visualizer/tree-visualizer.component.ts` — 130 lines
  - class: `TreeVisualizerComponent`
- `devtools/projects/ng-devtools/src/lib/shared/tree-visualizer/tree-visualizer.ts` — 460 lines
  - interface: `TreeNode`, `TreeVisualizerConfig`
  - type: `TreeD3Node`, `SvgD3Node`, `SvgD3Link`, `TreeNodeEqualityFn`
  - class: `TreeVisualizer`



## `devtools/projects/ng-devtools/src/lib/shared/utils/`

- `devtools/projects/ng-devtools/src/lib/shared/utils/control-flow.ts` — 25 lines
  - const: `BlockType`
- `devtools/projects/ng-devtools/src/lib/shared/utils/debouncer.spec.ts` — 61 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/utils/debouncer.ts` — 54 lines
  - class: `Debouncer`
- `devtools/projects/ng-devtools/src/lib/shared/utils/formatting.spec.ts` — 78 lines _(spec)_
- `devtools/projects/ng-devtools/src/lib/shared/utils/formatting.ts` — 43 lines
  - function: `formatBytes`, `getFormattedValue`



## `devtools/projects/protocol/`

- `devtools/projects/protocol/index.ts` — 10 lines
  - re-exports * from `./src/public-api`



## `devtools/projects/protocol/src/`

- `devtools/projects/protocol/src/public-api.ts` — 16 lines
  - re-exports * from `./lib/messages`
  - re-exports * from `./lib/message-bus`
  - re-exports * from `./lib/priority-aware-message-bus`



## `devtools/projects/protocol/src/lib/`

- `devtools/projects/protocol/src/lib/message-bus.ts` — 17 lines
  - type: `Parameters`
  - class: `MessageBus`
- `devtools/projects/protocol/src/lib/messages.ts` — 463 lines
  - interface: `DebugSignalGraphNode`, `DebugSignalGraphEdge`, `DebugSignalGraph`, `SignalNodePosition`, `DirectiveType`, `ComponentType`, `ControlFlowBlock`, `DeferBlock`, `DeferBlockDetails`, `ForLoopBlock`, `DevToolsNode`, `SerializedInjector`, `SerializedProviderRecord`, `InjectedService`, `Descriptor`, `DirectivesProperties`, `BaseDirectiveMetadata`, `AngularDirectiveMetadata`, `AcxDirectiveMetadata`, `WizComponentMetadata`, `SerializedInjectedService`, `Properties`, `DirectivePosition`, `NestedProp`, `ComponentExplorerViewProperties`, `AllPropertiesQuery`, `SelectedPropertiesQuery`, `ComponentExplorerViewQuery`, `ComponentExplorerView`, `LifecycleProfile`, `OutputProfile`, `DirectiveProfile`, `ElementProfile`, `ProfilerFrame`, `UpdatedStateData`, `Route`, `AngularDetection`, `SupportedApis`, `Events`
  - type: `HydrationStatus`, `RenderedDeferBlock`, `ChangeDetection`, `ContainerType`, `DirectiveMetadata`, `ElementPosition`, `PropertyQuery`, `RunGuardsAndResolvers`, `Topic`, `TransferStateValue`
  - enum: `ControlFlowBlockType`, `PropType`, `PropertyQueryTypes`
- `devtools/projects/protocol/src/lib/priority-aware-message-bus.spec.ts` — 65 lines _(spec)_
- `devtools/projects/protocol/src/lib/priority-aware-message-bus.ts` — 115 lines
  - class: `PriorityAwareMessageBus`



## `devtools/projects/shared-utils/`

- `devtools/projects/shared-utils/index.ts` — 10 lines
  - re-exports * from `./src/public-api`



## `devtools/projects/shared-utils/src/`

- `devtools/projects/shared-utils/src/public-api.ts` — 15 lines
  - re-exports * from `./lib/shared-utils`
  - re-exports * from `./lib/angular-check`



## `devtools/projects/shared-utils/src/lib/`

- `devtools/projects/shared-utils/src/lib/angular-check.spec.ts` — 118 lines _(spec)_
- `devtools/projects/shared-utils/src/lib/angular-check.ts` — 67 lines
  - const: `appIsAngularInDevMode`, `appIsAngularIvy`, `appIsAngular`, `appIsSupportedAngularVersion`, `getAngularVersion`
  - function: `isHydrationEnabled`
- `devtools/projects/shared-utils/src/lib/shared-utils.spec.ts` — 76 lines _(spec)_
- `devtools/projects/shared-utils/src/lib/shared-utils.ts` — 30 lines
  - const: `arrayEquals`



## `devtools/projects/shell-browser/`

- `devtools/projects/shell-browser/set-version.js` — 63 lines



## `devtools/projects/shell-browser/src/`

- `devtools/projects/shell-browser/src/devtools.ts` — 93 lines
- `devtools/projects/shell-browser/src/main.ts` — 14 lines



## `devtools/projects/shell-browser/src/app/`

- `devtools/projects/shell-browser/src/app/app.component.spec.ts` — 36 lines _(spec)_
- `devtools/projects/shell-browser/src/app/app.component.ts` — 65 lines
  - class: `AppComponent`
- `devtools/projects/shell-browser/src/app/app.config.ts` — 46 lines
  - const: `appConfig`
- `devtools/projects/shell-browser/src/app/backend.ts` — 56 lines
- `devtools/projects/shell-browser/src/app/background.ts` — 102 lines
- `devtools/projects/shell-browser/src/app/chrome-application-environment.ts` — 20 lines
  - class: `ChromeApplicationEnvironment`
- `devtools/projects/shell-browser/src/app/chrome-application-operations.ts` — 95 lines
  - class: `ChromeApplicationOperations`
- `devtools/projects/shell-browser/src/app/chrome-message-bus.ts` — 87 lines
  - class: `ChromeMessageBus`
- `devtools/projects/shell-browser/src/app/chrome-window-extensions.ts` — 128 lines
  - const: `initializeExtendedWindowOperations`
- `devtools/projects/shell-browser/src/app/comm-utils.spec.ts` — 34 lines _(spec)_
- `devtools/projects/shell-browser/src/app/comm-utils.ts` — 39 lines
  - function: `stripUrlQueryParamsAndFragment`, `getContentScriptUri`, `getBackendUri`, `getDetectAngularScriptUri`
- `devtools/projects/shell-browser/src/app/content-script.ts` — 134 lines
- `devtools/projects/shell-browser/src/app/detect-angular.ts` — 65 lines
- `devtools/projects/shell-browser/src/app/devtools-connected-flag.ts` — 21 lines
- `devtools/projects/shell-browser/src/app/konami-code.service.ts` — 52 lines
  - class: `KonamiCodeService`
- `devtools/projects/shell-browser/src/app/ng-validate.ts` — 17 lines
- `devtools/projects/shell-browser/src/app/same-page-message-bus.ts` — 121 lines
  - type: `BusStatus`
  - class: `SamePageMessageBus`
- `devtools/projects/shell-browser/src/app/tab_manager.ts` — 252 lines
  - interface: `ContentScriptConnection`, `DevToolsConnection`, `Tabs`
  - class: `TabManager`
- `devtools/projects/shell-browser/src/app/tab_manager_spec.ts` — 477 lines _(spec)_



## `devtools/projects/shell-browser/src/environments/`

- `devtools/projects/shell-browser/src/environments/environment.ts` — 12 lines
  - const: `environment`

