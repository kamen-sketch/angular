<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/core/`

1089 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/core/`

- `packages/core/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/core/public_api.ts` — 17 lines
  - re-exports * from `./src/core`



## `packages/core/global/`

- `packages/core/global/index.ts` — 12 lines
  - re-exports * from `../src/render3/global_utils_api`



## `packages/core/primitives/defer/src/`

- `packages/core/primitives/defer/src/triggers.ts` — 221 lines
  - const: `viewportTriggers`, `interactionEventNames`, `hoverEventNames`
  - function: `onInteraction`, `onHover`, `createIntersectionObserver`, `onViewport`



## `packages/core/primitives/devtools/`

- `packages/core/primitives/devtools/index.ts` — 17 lines
  - exports `ProfilerEvent`, `type Profiler` from `./src/profiler_types`
  - exports `Framework` from `./src/framework`



## `packages/core/primitives/devtools/src/`

- `packages/core/primitives/devtools/src/debug_signal_graph.ts` — 39 lines
  - interface: `DebugSignalGraphNode`, `DebugSignalGraphEdge`, `DebugSignalGraph`
- `packages/core/primitives/devtools/src/framework.ts` — 15 lines
  - enum: `Framework`
- `packages/core/primitives/devtools/src/profiler_types.ts` — 165 lines
  - enum: `ProfilerEvent`
  - interface: `Profiler`
- `packages/core/primitives/devtools/src/tool_definitions.ts` — 44 lines
  - interface: `ToolDefinition`, `ToolGroup`, `DevtoolsToolDiscoveryEvent`



## `packages/core/primitives/di/`

- `packages/core/primitives/di/index.ts` — 15 lines
  - exports `setCurrentInjector`, `getCurrentInjector`, `inject` from `./src/injector`
  - exports `NOT_FOUND`, `NotFoundError`, `isNotFound` from `./src/not_found`
  - exports `defineInjectable`, `registerInjectable` from `./src/injection_token`



## `packages/core/primitives/di/src/`

- `packages/core/primitives/di/src/injection_token.ts` — 92 lines
  - interface: `InjectionToken`
  - function: `defineInjectable`, `registerInjectable`
  - type: `Constructor`
- `packages/core/primitives/di/src/injector.ts` — 50 lines
  - interface: `Injector`
  - function: `getCurrentInjector`, `setCurrentInjector`, `inject`, `inject`
- `packages/core/primitives/di/src/not_found.ts` — 37 lines
  - const: `NOT_FOUND`
  - class: `NotFoundError`
  - function: `isNotFound`
  - type: `NotFound`
- `packages/core/primitives/di/src/type.ts` — 69 lines
  - const: `Type`
  - function: `isType`
  - interface: `AbstractType`, `Type`
  - type: `Writable`



## `packages/core/primitives/dom-navigation/`

- `packages/core/primitives/dom-navigation/index.ts` — 10 lines
  - re-exports * from `./src/navigation_types`



## `packages/core/primitives/dom-navigation/src/`

- `packages/core/primitives/dom-navigation/src/navigation_types.ts` — 186 lines
  - interface: `NavigationEventMap`, `NavigationResult`, `NavigationHistoryEntryEventMap`, `NavigationUpdateCurrentEntryOptions`, `NavigationOptions`, `NavigationNavigateOptions`, `NavigationReloadOptions`, `NavigationCurrentEntryChangeEventInit`, `NavigateEventInit`, `NavigationInterceptOptions`
  - class: `Navigation`, `NavigationTransition`, `NavigationHistoryEntry`, `NavigationCurrentEntryChangeEvent`, `NavigateEvent`, `NavigationDestination`
  - type: `NavigationType`



## `packages/core/primitives/dom-navigation/testing/`

- `packages/core/primitives/dom-navigation/testing/fake_navigation.ts` — 1324 lines _(test-support)_
  - class: `FakeNavigation`, `FakeNavigationHistoryEntry`, `FakeNavigationDestination`
  - interface: `ExperimentalNavigationInterceptOptions`, `NavigationPrecommitController`, `ExperimentalNavigateEvent`, `FakeNavigateEvent`, `FakeNavigationCurrentEntryChangeEvent`
- `packages/core/primitives/dom-navigation/testing/index.ts` — 10 lines _(test-support)_
  - re-exports * from `./fake_navigation`



## `packages/core/primitives/dom-navigation/testing/test/`

- `packages/core/primitives/dom-navigation/testing/test/fake_platform_navigation.spec.ts` — 2176 lines _(spec)_



## `packages/core/primitives/event-dispatch/`

- `packages/core/primitives/event-dispatch/contract_binary.ts` — 12 lines
- `packages/core/primitives/event-dispatch/index.ts` — 24 lines
  - exports `Attribute` from `./src/attribute`
  - exports `getDefaulted as getActionCache` from `./src/cache`
  - exports `EventContractContainer` from `./src/event_contract_container`
  - exports `EventDispatcher`, `EventPhase`, `registerDispatcher` from `./src/event_dispatcher`
  - exports `EventInfoWrapper` from `./src/event_info`
  - exports `isEarlyEventType`, `isCaptureEventType` from `./src/event_type`
  - exports `EventContract` from `./src/eventcontract`
  - exports `bootstrapAppScopedEarlyEventContract`, `clearAppScopedEarlyEventContract`, `getAppScopedQueuedEventInfos`, `registerAppScopedDispatcher`, `removeAllAppScopedEventListeners` from `./src/bootstrap_app_scoped`



## `packages/core/primitives/event-dispatch/src/`

- `packages/core/primitives/event-dispatch/src/a11y_click.ts` — 65 lines
  - function: `updateEventInfoForA11yClick`, `preventDefaultForA11yClick`, `populateClickOnlyAction`
- `packages/core/primitives/event-dispatch/src/action_resolver.ts` — 293 lines
  - class: `ActionResolver`
- `packages/core/primitives/event-dispatch/src/attribute.ts` — 24 lines
  - const: `Attribute`
- `packages/core/primitives/event-dispatch/src/bootstrap_app_scoped.ts` — 77 lines
  - function: `bootstrapAppScopedEarlyEventContract`, `getAppScopedQueuedEventInfos`, `registerAppScopedDispatcher`, `removeAllAppScopedEventListeners`, `clearAppScopedEarlyEventContract`
- `packages/core/primitives/event-dispatch/src/bootstrap_global.ts` — 48 lines
  - function: `bootstrapGlobalEarlyEventContract`, `getGlobalQueuedEventInfos`, `registerGlobalDispatcher`, `removeAllGlobalEventListeners`, `clearGlobalEarlyEventContract`
- `packages/core/primitives/event-dispatch/src/cache.ts` — 70 lines
  - function: `get`, `getDefaulted`, `set`, `getParsed`, `setParsed`, `clear`
- `packages/core/primitives/event-dispatch/src/char.ts` — 22 lines
  - const: `Char`
- `packages/core/primitives/event-dispatch/src/dispatcher.ts` — 151 lines
  - type: `Replayer`
  - class: `Dispatcher`
  - function: `createEventReplayer`, `registerDispatcher`
- `packages/core/primitives/event-dispatch/src/earlyeventcontract.ts` — 146 lines
  - interface: `EarlyJsactionDataContainer`, `EarlyJsactionData`
  - class: `EarlyEventContract`
  - function: `createEarlyJsactionData`, `addEvents`, `getQueuedEventInfos`, `registerDispatcher`, `removeAllEventListeners`
- `packages/core/primitives/event-dispatch/src/event.ts` — 692 lines
  - function: `getBrowserEventType`, `addEventListener`, `removeEventListener`, `stopPropagation`, `preventDefault`, `getTarget`, `isModifiedClickEvent`, `isValidActionKeyTarget`, `shouldCallPreventDefaultOnNativeHtmlControl`, `isActionKeyEvent`, `isSpaceKeyEvent`, `isMouseSpecialEvent`, `createMouseSpecialEvent`, `getTouchData`, `recreateTouchEventAsClick`, `isNativeHTMLControl`
  - const: `isWebKit`, `isIe`, `isGecko`, `IDENTIFIER_TO_KEY_TRIGGER_MAPPING`, `testing`
- `packages/core/primitives/event-dispatch/src/event_contract_container.ts` — 70 lines
  - interface: `EventContractContainerManager`
  - class: `EventContractContainer`
- `packages/core/primitives/event-dispatch/src/event_contract_defines.ts` — 15 lines
  - const: `MOUSE_SPECIAL_SUPPORT`
- `packages/core/primitives/event-dispatch/src/event_dispatcher.ts` — 196 lines
  - type: `Replayer`
  - const: `PROPAGATION_STOPPED_SYMBOL`, `EventPhase`
  - class: `EventDispatcher`
  - function: `registerDispatcher`
- `packages/core/primitives/event-dispatch/src/event_handler.ts` — 23 lines
  - interface: `EventHandlerInfo`
- `packages/core/primitives/event-dispatch/src/event_info.ts` — 331 lines
  - interface: `ActionInfo`, `EventInfo`
  - function: `getEventType`, `setEventType`, `getEvent`, `setEvent`, `getTargetElement`, `setTargetElement`, `getContainer`, `setContainer`, `getTimestamp`, `setTimestamp`, `getAction`, `setAction`, `unsetAction`, `getActionName`, `getActionElement`, `getIsReplay`, `setIsReplay`, `getA11yClickKey`, `setA11yClickKey`, `getResolved`, `setResolved`, `cloneEventInfo`, `createEventInfoFromParameters`, `createEventInfo`
  - class: `EventInfoWrapper`
- `packages/core/primitives/event-dispatch/src/event_type.ts` — 381 lines
  - const: `EventType`, `MOUSE_SPECIAL_EVENT_TYPES`, `BUBBLE_EVENT_TYPES`, `CAPTURE_EVENT_TYPES`, `isCaptureEventType`, `isEarlyEventType`
- `packages/core/primitives/event-dispatch/src/eventcontract.ts` — 290 lines
  - interface: `UnrenamedEventContract`
  - type: `Dispatcher`
  - class: `EventContract`
- `packages/core/primitives/event-dispatch/src/key_code.ts` — 23 lines
  - const: `MAC_ENTER`, `ENTER`, `SPACE`, `KeyCode`
- `packages/core/primitives/event-dispatch/src/property.ts` — 35 lines
  - const: `Property`
- `packages/core/primitives/event-dispatch/src/restriction.ts` — 16 lines
  - enum: `Restriction`



## `packages/core/primitives/event-dispatch/test/`

- `packages/core/primitives/event-dispatch/test/dispatcher_test.ts` — 1133 lines _(spec)_
- `packages/core/primitives/event-dispatch/test/event_dispatcher_test.ts` — 276 lines _(spec)_
- `packages/core/primitives/event-dispatch/test/event_test.ts` — 831 lines _(spec)_
- `packages/core/primitives/event-dispatch/test/eventcontract_test.ts` — 607 lines _(spec)_
- `packages/core/primitives/event-dispatch/test/html.ts` — 16 lines _(test-support)_
  - const: `safeElement`, `testonlyHtml`



## `packages/core/primitives/signals/`

- `packages/core/primitives/signals/index.ts` — 79 lines
  - exports `ComputedNode`, `createComputed` from `./src/computed`
  - exports `ComputationFn`, `LinkedSignalNode`, `LinkedSignalGetter`, `PreviousValue`, `createLinkedSignal`, `linkedSignalSetFn`, `linkedSignalUpdateFn` from `./src/linked_signal`
  - exports `ValueEqualityFn`, `defaultEquals` from `./src/equality`
  - exports `setThrowInvalidWriteToSignalError` from `./src/errors`
  - exports `REACTIVE_NODE`, `Reactive`, `ReactiveHookFn`, `ReactiveNode`, `ReactiveNodeKind`, `SIGNAL`, `consumerAfterComputation`, `consumerBeforeComputation`, `consumerDestroy`, `consumerMarkDirty`, `consumerPollProducersForChange`, `finalizeConsumerAfterComputation`, `getActiveConsumer`, `isInNotificationPhase`, `isReactive`, `producerAccessed`, `producerIncrementEpoch`, `producerMarkClean`, `producerNotifyConsumers`, `producerUpdateValueVersion`, `producerUpdatesAllowed`, `resetConsumerBeforeComputation`, `runPostProducerCreatedFn`, `setActiveConsumer`, …(+2) from `./src/graph`
  - exports `SIGNAL_NODE`, `SignalGetter`, `SignalNode`, `createSignal`, `runPostSignalSetFn`, `setPostSignalSetFn`, `signalGetFn`, `signalSetFn`, `signalUpdateFn` from `./src/signal`
  - exports `Watch`, `WatchCleanupFn`, `WatchCleanupRegisterFn`, `createWatch` from `./src/watch`
  - exports `setAlternateWeakRefImpl` from `./src/weak_ref`
  - exports `untracked` from `./src/untracked`
  - exports `runEffect`, `BASE_EFFECT_NODE`, `BaseEffectNode` from `./src/effect`
  - exports `installDevToolsSignalFormatter` from `./src/formatter`



## `packages/core/primitives/signals/src/`

- `packages/core/primitives/signals/src/computed.ts` — 175 lines
  - interface: `ComputedNode`
  - type: `ComputedGetter`
  - function: `createComputed`
  - const: `UNSET`, `COMPUTING`, `ERRORED`
- `packages/core/primitives/signals/src/effect.ts` — 59 lines
  - type: `EffectCleanupFn`, `EffectCleanupRegisterFn`
  - interface: `BaseEffectNode`
  - const: `BASE_EFFECT_NODE`
  - function: `runEffect`
- `packages/core/primitives/signals/src/equality.ts` — 20 lines
  - type: `ValueEqualityFn`
  - function: `defaultEquals`
- `packages/core/primitives/signals/src/errors.ts` — 24 lines
  - function: `throwInvalidWriteToSignalError`, `setThrowInvalidWriteToSignalError`
- `packages/core/primitives/signals/src/formatter.ts` — 165 lines
  - function: `installDevToolsSignalFormatter`
- `packages/core/primitives/signals/src/graph.ts` — 585 lines
  - type: `Version`, `ReactiveHookFn`, `ReactiveNodeKind`
  - const: `SIGNAL`, `REACTIVE_NODE`
  - function: `setActiveConsumer`, `getActiveConsumer`, `isInNotificationPhase`, `isReactive`, `producerAccessed`, `producerIncrementEpoch`, `producerUpdateValueVersion`, `producerNotifyConsumers`, `producerUpdatesAllowed`, `consumerMarkDirty`, `producerMarkClean`, `consumerBeforeComputation`, `resetConsumerBeforeComputation`, `consumerAfterComputation`, `finalizeConsumerAfterComputation`, `consumerPollProducersForChange`, `consumerDestroy`, `runPostProducerCreatedFn`, `setPostProducerCreatedFn`
  - interface: `Reactive`, `ReactiveNode`
- `packages/core/primitives/signals/src/linked_signal.ts` — 193 lines
  - type: `ComputationFn`, `PreviousValue`, `LinkedSignalGetter`
  - interface: `LinkedSignalNode`
  - function: `createLinkedSignal`, `linkedSignalSetFn`, `linkedSignalUpdateFn`
  - const: `LINKED_SIGNAL_NODE`
- `packages/core/primitives/signals/src/signal.ts` — 126 lines
  - interface: `SignalNode`, `SignalGetter`
  - type: `SignalBaseGetter`, `SignalSetter`, `SignalUpdater`
  - function: `createSignal`, `setPostSignalSetFn`, `signalGetFn`, `signalSetFn`, `signalUpdateFn`, `runPostSignalSetFn`
  - const: `SIGNAL_NODE`
- `packages/core/primitives/signals/src/untracked.ts` — 25 lines
  - function: `untracked`
- `packages/core/primitives/signals/src/watch.ts` — 156 lines
  - type: `WatchCleanupFn`, `WatchCleanupRegisterFn`
  - interface: `Watch`, `WatchNode`
  - function: `createWatch`
- `packages/core/primitives/signals/src/weak_ref.ts` — 12 lines
  - function: `setAlternateWeakRefImpl`



## `packages/core/rxjs-interop/`

- `packages/core/rxjs-interop/index.ts` — 10 lines
  - re-exports * from `./src/index`
- `packages/core/rxjs-interop/public_api.ts` — 17 lines
  - re-exports * from `./src/index`



## `packages/core/rxjs-interop/src/`

- `packages/core/rxjs-interop/src/index.ts` — 16 lines
  - exports `outputFromObservable` from `./output_from_observable`
  - exports `outputToObservable` from `./output_to_observable`
  - exports `takeUntilDestroyed` from `./take_until_destroyed`
  - exports `toObservable`, `ToObservableOptions` from `./to_observable`
  - exports `toSignal`, `ToSignalOptions` from `./to_signal`
  - exports `pendingUntilEvent` from `./pending_until_event`
  - exports `RxResourceOptions`, `rxResource` from `./rx_resource`
- `packages/core/rxjs-interop/src/output_from_observable.ts` — 93 lines
  - function: `outputFromObservable`
- `packages/core/rxjs-interop/src/output_to_observable.ts` — 39 lines
  - function: `outputToObservable`
- `packages/core/rxjs-interop/src/pending_until_event.ts` — 65 lines
  - function: `pendingUntilEvent`
- `packages/core/rxjs-interop/src/rx_resource.ts` — 137 lines
  - interface: `RxResourceOptions`
  - function: `rxResource`, `rxResource`, `rxResource`
- `packages/core/rxjs-interop/src/take_until_destroyed.ts` — 44 lines
  - function: `takeUntilDestroyed`
- `packages/core/rxjs-interop/src/to_observable.ts` — 76 lines
  - interface: `ToObservableOptions`
  - function: `toObservable`
- `packages/core/rxjs-interop/src/to_signal.ts` — 267 lines
  - interface: `ToSignalOptions`
  - function: `toSignal`, `toSignal`, `toSignal`, `toSignal`, `toSignal`, `toSignal`



## `packages/core/rxjs-interop/test/`

- `packages/core/rxjs-interop/test/output_from_observable_spec.ts` — 177 lines _(spec)_
- `packages/core/rxjs-interop/test/output_to_observable_spec.ts` — 148 lines _(spec)_
- `packages/core/rxjs-interop/test/pending_until_event_spec.ts` — 252 lines _(spec)_
- `packages/core/rxjs-interop/test/rx_resource_spec.ts` — 416 lines _(spec)_
- `packages/core/rxjs-interop/test/take_until_destroyed_spec.ts` — 123 lines _(spec)_
- `packages/core/rxjs-interop/test/to_observable_spec.ts` — 180 lines _(spec)_
- `packages/core/rxjs-interop/test/to_signal_spec.ts` — 397 lines _(spec)_



## `packages/core/schematics/`

- `packages/core/schematics/rollup.config.js` — 68 lines



## `packages/core/schematics/migrations/can-match-snapshot-required/`

- `packages/core/schematics/migrations/can-match-snapshot-required/index.ts` — 25 lines
  - function: `migrate`
- `packages/core/schematics/migrations/can-match-snapshot-required/migration.spec.ts` — 91 lines _(spec)_
- `packages/core/schematics/migrations/can-match-snapshot-required/migration.ts` — 127 lines
  - interface: `UnitAnalysisMetadata`
  - class: `CanMatchSnapshotRequiredMigration`



## `packages/core/schematics/migrations/change-detection-eager/`

- `packages/core/schematics/migrations/change-detection-eager/index.ts` — 25 lines
  - function: `migrate`
- `packages/core/schematics/migrations/change-detection-eager/migration.spec.ts` — 164 lines _(spec)_
- `packages/core/schematics/migrations/change-detection-eager/migration.ts` — 212 lines
  - interface: `ChangeDetectionEagerMigrationPhase1Data`
  - class: `ChangeDetectionEagerMigration`



## `packages/core/schematics/migrations/http-xhr-backend/`

- `packages/core/schematics/migrations/http-xhr-backend/http-xhr-backend.spec.ts` — 108 lines _(spec)_
- `packages/core/schematics/migrations/http-xhr-backend/index.ts` — 21 lines
  - function: `migrate`
- `packages/core/schematics/migrations/http-xhr-backend/migration.ts` — 140 lines
  - interface: `CompilationUnitData`, `MigrationConfig`
  - class: `XhrBackendMigration`



## `packages/core/schematics/migrations/incremental-hydration/`

- `packages/core/schematics/migrations/incremental-hydration/index.ts` — 21 lines
  - function: `migrate`
- `packages/core/schematics/migrations/incremental-hydration/migration.spec.ts` — 73 lines _(spec)_
- `packages/core/schematics/migrations/incremental-hydration/migration.ts` — 124 lines
  - interface: `IncrementalHydrationMigrationData`
  - class: `IncrementalHydrationMigration`



## `packages/core/schematics/migrations/model-output/`

- `packages/core/schematics/migrations/model-output/index.ts` — 25 lines
  - function: `migrate`
- `packages/core/schematics/migrations/model-output/migration.spec.ts` — 227 lines _(spec)_
- `packages/core/schematics/migrations/model-output/migration.ts` — 312 lines
  - class: `ModelOutputMigrationData`, `ModelOutputCompilationUnitData`, `ModelOutputMigration`



## `packages/core/schematics/migrations/output-migration/`

- `packages/core/schematics/migrations/output-migration/output-migration.spec.ts` — 828 lines _(spec)_
  - class: `TestDir`, `TestDir`
- `packages/core/schematics/migrations/output-migration/output-migration.ts` — 528 lines
  - interface: `MigrationConfig`, `OutputMigrationData`, `CompilationUnitData`
  - class: `OutputMigration`
- `packages/core/schematics/migrations/output-migration/output-replacements.ts` — 219 lines
  - function: `calculateDeclarationReplacement`, `calculateImportReplacements`, `calculateNextFnReplacement`, `calculateNextFnReplacementInTemplate`, `calculateNextFnReplacementInHostBinding`, `calculateCompleteCallReplacement`, `calculatePipeCallReplacement`
- `packages/core/schematics/migrations/output-migration/output_helpers.ts` — 203 lines
  - interface: `ExtractedOutput`
  - function: `isOutputDeclarationEligibleForMigration`, `isPotentialPipeCallUsage`, `isPotentialNextCallUsage`, `isPotentialCompleteCallUsage`, `isTargetOutputDeclaration`, `getTargetPropertyDeclaration`, `getOutputDecorator`, `getUniqueIdForProperty`, `isTestRunnerImport`, `checkNonTsReferenceAccessesField`, `checkNonTsReferenceCallsField`



## `packages/core/schematics/migrations/safe-optional-chaining/`

- `packages/core/schematics/migrations/safe-optional-chaining/index.ts` — 21 lines
  - function: `migrate`
- `packages/core/schematics/migrations/safe-optional-chaining/migration.ts` — 774 lines
  - interface: `CompilationUnitData`, `MigrationConfig`
  - class: `SafeOptionalChainingMigration`
- `packages/core/schematics/migrations/safe-optional-chaining/safe-optional-chaining.spec.ts` — 628 lines _(spec)_



## `packages/core/schematics/migrations/self-closing-tags-migration/`

- `packages/core/schematics/migrations/self-closing-tags-migration/self-closing-tags-migration.spec.ts` — 286 lines _(spec)_
- `packages/core/schematics/migrations/self-closing-tags-migration/self-closing-tags-migration.ts` — 160 lines
  - interface: `MigrationConfig`, `SelfClosingTagsMigrationData`, `SelfClosingTagsCompilationUnitData`
  - class: `SelfClosingTagsMigration`
- `packages/core/schematics/migrations/self-closing-tags-migration/to-self-closing-tags.ts` — 117 lines
  - function: `migrateTemplateToSelfClosingTags`
  - class: `AngularElementCollector`



## `packages/core/schematics/migrations/signal-migration/src/`

- `packages/core/schematics/migrations/signal-migration/src/analysis_deps.ts` — 90 lines
  - interface: `AnalysisProgramInfo`
  - function: `prepareAnalysisInfo`
- `packages/core/schematics/migrations/signal-migration/src/best_effort_mode.ts` — 25 lines
  - function: `filterIncompatibilitiesForBestEffortMode`
- `packages/core/schematics/migrations/signal-migration/src/cli.ts` — 52 lines
  - function: `main`
- `packages/core/schematics/migrations/signal-migration/src/index.ts` — 29 lines
  - exports `type KnownInputInfo`, `KnownInputs` from `./input_detection/known_inputs`
  - exports `type InputNameNode`, `type InputNode`, `isInputContainerNode` from `./input_detection/input_node`
  - exports `type ClassFieldDescriptor` from `./passes/reference_resolution/known_fields`
  - exports `type InputDescriptor`, `getInputDescriptor`, `isInputDescriptor` from `./utils/input_id`
  - exports `SignalInputMigration` from `./migration`
  - exports `type MigrationConfig` from `./migration_config`
  - exports `type FieldIncompatibility`, `FieldIncompatibilityReason`, `ClassIncompatibilityReason`, `nonIgnorableFieldIncompatibilities` from `./passes/problematic_patterns/incompatibility`
  - exports `getMessageForClassIncompatibility`, `getMessageForFieldIncompatibility` from `./passes/problematic_patterns/incompatibility_human`
- `packages/core/schematics/migrations/signal-migration/src/migration.ts` — 278 lines
  - class: `SignalInputMigration`
- `packages/core/schematics/migrations/signal-migration/src/migration_config.ts` — 58 lines
  - interface: `MigrationConfig`
- `packages/core/schematics/migrations/signal-migration/src/migration_host.ts` — 39 lines
  - class: `MigrationHost`
- `packages/core/schematics/migrations/signal-migration/src/phase_analysis.ts` — 138 lines
  - function: `executeAnalysisPhase`
- `packages/core/schematics/migrations/signal-migration/src/phase_migrate.ts` — 68 lines
  - function: `executeMigrationPhase`
- `packages/core/schematics/migrations/signal-migration/src/result.ts` — 43 lines
  - class: `MigrationResult`
- `packages/core/schematics/migrations/signal-migration/src/write_replacements.ts` — 28 lines
  - function: `writeMigrationReplacements`



## `packages/core/schematics/migrations/signal-migration/src/batch/`

- `packages/core/schematics/migrations/signal-migration/src/batch/extract.ts` — 40 lines
  - function: `getCompilationUnitMetadata`
- `packages/core/schematics/migrations/signal-migration/src/batch/merge_unit_data.ts` — 149 lines
  - function: `combineCompilationUnitData`, `convertToGlobalMeta`
- `packages/core/schematics/migrations/signal-migration/src/batch/populate_global_data.ts` — 42 lines
  - function: `populateKnownInputsFromGlobalData`
- `packages/core/schematics/migrations/signal-migration/src/batch/test_bin.ts` — 57 lines
- `packages/core/schematics/migrations/signal-migration/src/batch/unit_data.ts` — 33 lines
  - interface: `CompilationUnitData`



## `packages/core/schematics/migrations/signal-migration/src/convert-input/`

- `packages/core/schematics/migrations/signal-migration/src/convert-input/convert_to_signal.ts` — 293 lines
  - function: `convertToSignalInput`
- `packages/core/schematics/migrations/signal-migration/src/convert-input/prepare_and_check.ts` — 224 lines
  - interface: `ConvertInputPreparation`
  - function: `prepareAndCheckForConversion`



## `packages/core/schematics/migrations/signal-migration/src/flow_analysis/`

- `packages/core/schematics/migrations/signal-migration/src/flow_analysis/flow_containers.ts` — 47 lines
  - function: `isControlFlowBoundary`, `getControlFlowContainer`
- `packages/core/schematics/migrations/signal-migration/src/flow_analysis/flow_node_internals.ts` — 140 lines
  - enum: `FlowFlags`
  - type: `FlowNode`
  - interface: `FlowNodeBase`, `FlowUnreachable`, `FlowStart`, `FlowLabel`, `FlowAssignment`, `FlowCall`, `FlowCondition`, `FlowSwitchClause`, `FlowSwitchClauseData`, `FlowArrayMutation`, `FlowReduceLabel`, `FlowReduceLabelData`
- `packages/core/schematics/migrations/signal-migration/src/flow_analysis/flow_node_traversal.ts` — 126 lines
  - function: `traverseFlowForInterestingNodes`, `getFlowNode`
- `packages/core/schematics/migrations/signal-migration/src/flow_analysis/index.ts` — 330 lines
  - type: `ControlFlowNodeIndex`, `InsertionCommonAncestor`
  - interface: `ControlFlowAnalysisNode`
  - function: `analyzeControlFlow`



## `packages/core/schematics/migrations/signal-migration/src/input_detection/`

- `packages/core/schematics/migrations/signal-migration/src/input_detection/directive_info.ts` — 71 lines
  - class: `DirectiveInfo`
- `packages/core/schematics/migrations/signal-migration/src/input_detection/input_decorator.ts` — 227 lines
  - interface: `ExtractedInput`
  - function: `extractDecoratorInput`
- `packages/core/schematics/migrations/signal-migration/src/input_detection/input_node.ts` — 29 lines
  - type: `InputNameNode`, `InputNode`
  - function: `isInputContainerNode`
- `packages/core/schematics/migrations/signal-migration/src/input_detection/known_inputs.ts` — 183 lines
  - type: `KnownInputInfo`
  - class: `KnownInputs`
- `packages/core/schematics/migrations/signal-migration/src/input_detection/nodes_to_input.ts` — 40 lines
  - function: `attemptRetrieveInputFromSymbol`



## `packages/core/schematics/migrations/signal-migration/src/passes/`

- `packages/core/schematics/migrations/signal-migration/src/passes/10_apply_import_manager.ts` — 27 lines
  - function: `pass10_applyImportManager`
- `packages/core/schematics/migrations/signal-migration/src/passes/1_identify_inputs.ts` — 95 lines
  - function: `pass1__IdentifySourceFileAndDeclarationInputs`
- `packages/core/schematics/migrations/signal-migration/src/passes/2_find_source_file_references.ts` — 58 lines
  - function: `pass2_IdentifySourceFileReferences`
- `packages/core/schematics/migrations/signal-migration/src/passes/3_check_incompatible_patterns.ts` — 54 lines
  - function: `pass3__checkIncompatiblePatterns`
- `packages/core/schematics/migrations/signal-migration/src/passes/4_check_inheritance.ts` — 49 lines
  - function: `pass4__checkInheritanceOfInputs`
- `packages/core/schematics/migrations/signal-migration/src/passes/5_migrate_ts_references.ts` — 30 lines
  - function: `pass5__migrateTypeScriptReferences`
- `packages/core/schematics/migrations/signal-migration/src/passes/6_migrate_input_declarations.ts` — 72 lines
  - function: `pass6__migrateInputDeclarations`
- `packages/core/schematics/migrations/signal-migration/src/passes/7_migrate_template_references.ts` — 58 lines
  - function: `pass7__migrateTemplateReferences`
- `packages/core/schematics/migrations/signal-migration/src/passes/8_migrate_host_bindings.ts` — 62 lines
  - function: `pass8__migrateHostBindings`
- `packages/core/schematics/migrations/signal-migration/src/passes/9_migrate_ts_type_references.ts` — 30 lines
  - function: `pass9__migrateTypeScriptTypeReferences`



## `packages/core/schematics/migrations/signal-migration/src/passes/problematic_patterns/`

- `packages/core/schematics/migrations/signal-migration/src/passes/problematic_patterns/check_inheritance.ts` — 135 lines
  - interface: `InheritanceTracker`
  - function: `checkInheritanceOfKnownFields`
- `packages/core/schematics/migrations/signal-migration/src/passes/problematic_patterns/common_incompatible_patterns.ts` — 123 lines
  - function: `checkIncompatiblePatterns`
- `packages/core/schematics/migrations/signal-migration/src/passes/problematic_patterns/incompatibility.ts` — 83 lines
  - enum: `FieldIncompatibilityReason`, `ClassIncompatibilityReason`
  - const: `nonIgnorableFieldIncompatibilities`
  - interface: `FieldIncompatibility`
  - function: `isFieldIncompatibility`, `pickFieldIncompatibility`
- `packages/core/schematics/migrations/signal-migration/src/passes/problematic_patterns/incompatibility_human.ts` — 154 lines
  - function: `getMessageForFieldIncompatibility`, `getMessageForClassIncompatibility`
- `packages/core/schematics/migrations/signal-migration/src/passes/problematic_patterns/incompatibility_todos.ts` — 54 lines
  - function: `insertTodoForIncompatibility`
- `packages/core/schematics/migrations/signal-migration/src/passes/problematic_patterns/problematic_field_registry.ts` — 31 lines
  - interface: `ProblematicFieldRegistry`



## `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/`

- `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/migrate_host_bindings.ts` — 63 lines
  - function: `migrateHostBindings`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/migrate_template_references.ts` — 58 lines
  - function: `migrateTemplateReferences`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/migrate_ts_references.ts` — 97 lines
  - function: `migrateTypeScriptReferences`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/migrate_ts_type_references.ts` — 84 lines
  - function: `migrateTypeScriptTypeReferences`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/reference_migration_host.ts` — 19 lines
  - interface: `ReferenceMigrationHost`



## `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/helpers/`

- `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/helpers/create_block_arrow_function.ts` — 66 lines
  - function: `createNewBlockToInsertVariable`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/helpers/object_expansion_refs.ts` — 198 lines
  - interface: `IdentifierOfBindingElement`
  - function: `migrateBindingElementInputReference`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_migration/helpers/standard_reference.ts` — 211 lines
  - interface: `NarrowableTsReferences`
  - function: `migrateStandardTsReference`



## `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/`

- `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/identify_host_references.ts` — 180 lines
  - function: `identifyHostBindingReferences`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/identify_template_references.ts` — 147 lines
  - function: `identifyTemplateReferences`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/identify_ts_references.ts` — 127 lines
  - function: `identifyPotentialTypeScriptReference`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/index.ts` — 155 lines
  - function: `createFindAllSourceFileReferencesVisitor`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/known_fields.ts` — 52 lines
  - type: `ClassFieldUniqueKey`
  - interface: `ClassFieldDescriptor`, `KnownFields`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/reference_kinds.ts` — 160 lines
  - enum: `ReferenceKind`
  - interface: `TemplateReference`, `HostBindingReference`, `TsReference`, `TsClassTypeReference`
  - type: `Reference`
  - function: `isTsReference`, `isTemplateReference`, `isHostBindingReference`, `isTsClassTypeReference`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/reference_result.ts` — 15 lines
  - interface: `ReferenceResult`
- `packages/core/schematics/migrations/signal-migration/src/passes/reference_resolution/template_reference_visitor.ts` — 498 lines
  - interface: `TmplInputExpressionReference`
  - class: `TemplateReferenceVisitor`, `TemplateExpressionReferenceVisitor`



## `packages/core/schematics/migrations/signal-migration/src/pattern_advisors/`

- `packages/core/schematics/migrations/signal-migration/src/pattern_advisors/debug_element_component_instance.ts` — 85 lines
  - class: `DebugElementComponentInstance`
- `packages/core/schematics/migrations/signal-migration/src/pattern_advisors/partial_directive_type.ts` — 72 lines
  - class: `PartialDirectiveTypeInCatalystTests`
- `packages/core/schematics/migrations/signal-migration/src/pattern_advisors/spy_on_pattern.ts` — 52 lines
  - class: `SpyOnFieldPattern`



## `packages/core/schematics/migrations/signal-migration/src/utils/`

- `packages/core/schematics/migrations/signal-migration/src/utils/binding_elements.ts` — 41 lines
  - function: `resolveBindingElement`, `getBindingElementDeclaration`
- `packages/core/schematics/migrations/signal-migration/src/utils/class_member_names.ts` — 23 lines
  - function: `getMemberName`
- `packages/core/schematics/migrations/signal-migration/src/utils/extract_template.ts` — 89 lines
  - function: `attemptExtractTemplateDefinition`
- `packages/core/schematics/migrations/signal-migration/src/utils/grouped_ts_ast_visitor.ts` — 60 lines
  - class: `GroupedTsAstVisitor`
- `packages/core/schematics/migrations/signal-migration/src/utils/heritage_types.ts` — 28 lines
  - function: `getInheritedTypes`
- `packages/core/schematics/migrations/signal-migration/src/utils/inheritance_graph.ts` — 149 lines
  - type: `GraphNode`
  - class: `InheritanceGraph`
- `packages/core/schematics/migrations/signal-migration/src/utils/inheritance_sort.ts` — 61 lines
  - interface: `GraphNode`
  - function: `topologicalSort`
- `packages/core/schematics/migrations/signal-migration/src/utils/input_id.ts` — 69 lines
  - interface: `InputDescriptor`
  - function: `getInputDescriptor`, `getInputDescriptor`, `getInputDescriptor`, `isInputDescriptor`
- `packages/core/schematics/migrations/signal-migration/src/utils/is_descendant_of.ts` — 19 lines
  - function: `isNodeDescendantOf`
- `packages/core/schematics/migrations/signal-migration/src/utils/is_identifier_free_in_scope.ts` — 126 lines
  - const: `ReservedMarker`
  - interface: `LocalsContainer`
  - function: `isIdentifierFreeInScope`
- `packages/core/schematics/migrations/signal-migration/src/utils/remove_from_union.ts` — 25 lines
  - function: `removeFromUnionIfPossible`
- `packages/core/schematics/migrations/signal-migration/src/utils/traverse_access.ts` — 34 lines
  - function: `traverseAccess`
- `packages/core/schematics/migrations/signal-migration/src/utils/unique_names.ts` — 59 lines
  - class: `UniqueNamesGenerator`
- `packages/core/schematics/migrations/signal-migration/src/utils/unwrap_parent.ts` — 23 lines
  - function: `unwrapParent`
- `packages/core/schematics/migrations/signal-migration/src/utils/write_operators.ts` — 31 lines
  - const: `writeBinaryOperators`



## `packages/core/schematics/migrations/signal-migration/test/`

- `packages/core/schematics/migrations/signal-migration/test/batch_runner.ts` — 121 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden_test_runner.ts` — 54 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/migration_spec.ts` — 108 lines _(spec)_



## `packages/core/schematics/migrations/signal-migration/test/golden-test/`

- `packages/core/schematics/migrations/signal-migration/test/golden-test/any_test.ts` — 38 lines _(spec)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/base_class.ts` — 33 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/both_input_imports.ts` — 15 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/catalyst_async_test.ts` — 21 lines _(spec)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/catalyst_test.ts` — 21 lines _(spec)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/catalyst_test_partial.ts` — 19 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/constructor_initializations.ts` — 15 lines _(test-support)_
  - class: `MyComp`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/cross_references.ts` — 24 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/derived_class.ts` — 29 lines _(test-support)_
  - class: `Base2`, `Base3`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/derived_class_meta_input_alias.ts` — 15 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/derived_class_second_separate.ts` — 12 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/derived_class_separate_file.ts` — 13 lines _(test-support)_
  - class: `DerivedExternalWithInput`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/different_instantiations_of_reference.ts` — 48 lines _(test-support)_
  - class: `MatHint`, `MatFormFieldTest`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/existing_signal_import.ts` — 9 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/external_templates.ts` — 12 lines _(test-support)_
  - class: `WithTemplate`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/flow_cases.ts` — 18 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/getters.ts` — 21 lines _(test-support)_
  - class: `WithGetters`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/host_bindings.ts` — 48 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/identifier_collisions.ts` — 52 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/imports.ts` — 13 lines _(test-support)_
  - class: `TestCmp`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/index.ts` — 128 lines _(test-support)_
  - class: `AppComponent`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/index_access_input.ts` — 15 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/index_spec.ts` — 40 lines _(spec)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/inline_template.ts` — 11 lines _(test-support)_
  - class: `InlineTmpl`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/input_function_that_reference_this.ts` — 9 lines _(test-support)_
  - class: `TestComponent`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/jit_true_components.ts` — 28 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/loop_labels.ts` — 27 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/manual_instantiations.ts` — 6 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/manual_instantiations_external.ts` — 9 lines _(test-support)_
  - class: `ManualInstantiation`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/modifier_tests.ts` — 16 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/multiple_references_in_method.ts` — 13 lines _(test-support)_
  - class: `TestMigrationComponent`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/mutate.ts` — 18 lines _(test-support)_
  - class: `TestCmp`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/narrowing.ts` — 34 lines _(test-support)_
  - class: `Narrowing`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/nested_template_prop_access.ts` — 15 lines _(test-support)_
  - class: `NestedTemplatePropAccess`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/non_null_assertions.ts` — 16 lines _(test-support)_
  - class: `NonNullAssertions`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/object_expansion.ts` — 26 lines _(test-support)_
  - class: `ObjectExpansion`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/optimize_test.ts` — 14 lines _(spec)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/optional_inputs.ts` — 10 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/problematic_type_reference.ts` — 23 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/required-no-explicit-type-extra.ts` — 8 lines _(test-support)_
  - const: `COMPLEX_VAR`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/required-no-explicit-type.ts` — 16 lines _(test-support)_
  - const: `CONST`
  - class: `RequiredNoExplicitType`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/required.ts` — 8 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/safe_property_reads.ts` — 21 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/scope_sharing.ts` — 20 lines _(test-support)_
  - class: `TestCmp`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/shared_incompatible_scopes.ts` — 48 lines _(test-support)_
  - class: `ScopeMismatchTest`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/spy_on.ts` — 10 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/template_concat_string.ts` — 11 lines _(test-support)_
  - class: `WithConcatTemplate`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/template_icu.ts` — 17 lines _(test-support)_
  - class: `MyComp`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/template_ng_if.ts` — 35 lines _(test-support)_
  - class: `MyComp`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/template_ng_let.ts` — 17 lines _(test-support)_
  - class: `MyComp`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/template_object_shorthand.ts` — 14 lines _(test-support)_
  - class: `TemplateObjectShorthand`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/template_writes.ts` — 24 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/temporary_variables.ts` — 41 lines _(test-support)_
  - class: `OtherCmp`, `MyComp`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/ternary_narrowing.ts` — 26 lines _(test-support)_
  - class: `TernaryNarrowing`, `OtherComponent`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/transform_functions.ts` — 23 lines _(test-support)_
  - class: `TransformFunctions`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/transform_incompatible_types.ts` — 12 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/transform_no_explicit_types.ts` — 8 lines _(test-support)_
  - class: `TransformFunctions`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/with_getters.ts` — 26 lines _(test-support)_
  - class: `WithSettersAndGetters`
- `packages/core/schematics/migrations/signal-migration/test/golden-test/with_getters_reference.ts` — 14 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/with_jsdoc.ts` — 13 lines _(test-support)_
- `packages/core/schematics/migrations/signal-migration/test/golden-test/writing_to_inputs.ts` — 19 lines _(test-support)_
  - class: `TestCmp`



## `packages/core/schematics/migrations/signal-queries-migration/`

- `packages/core/schematics/migrations/signal-queries-migration/convert_query_property.ts` — 190 lines
  - function: `computeReplacementsToMigrateQuery`
- `packages/core/schematics/migrations/signal-queries-migration/field_tracking.ts` — 68 lines
  - function: `getClassFieldDescriptorForSymbol`, `getUniqueIDForClassProperty`
- `packages/core/schematics/migrations/signal-queries-migration/fn_first_last_replacement.ts` — 85 lines
  - function: `replaceQueryListFirstAndLastReferences`
- `packages/core/schematics/migrations/signal-queries-migration/fn_get_replacement.ts` — 79 lines
  - function: `replaceQueryListGetCall`
- `packages/core/schematics/migrations/signal-queries-migration/fn_to_array_removal.ts` — 82 lines
  - function: `removeQueryListToArrayCall`
- `packages/core/schematics/migrations/signal-queries-migration/identify_queries.ts` — 107 lines
  - interface: `ExtractedQuery`
  - function: `extractSourceQueryDefinition`
- `packages/core/schematics/migrations/signal-queries-migration/incompatibility.ts` — 49 lines
  - function: `markFieldIncompatibleInMetadata`, `filterBestEffortIncompatibilities`
- `packages/core/schematics/migrations/signal-queries-migration/incompatible_query_list_fns.ts` — 52 lines
  - function: `checkForIncompatibleQueryListAccesses`
- `packages/core/schematics/migrations/signal-queries-migration/index.ts` — 11 lines
  - re-exports * from `./migration_config`
  - re-exports * from `./migration`
- `packages/core/schematics/migrations/signal-queries-migration/known_queries.ts` — 190 lines
  - class: `KnownQueries`
- `packages/core/schematics/migrations/signal-queries-migration/migration.spec.ts` — 1650 lines _(spec)_
- `packages/core/schematics/migrations/signal-queries-migration/migration.ts` — 675 lines
  - interface: `CompilationUnitData`, `GlobalUnitData`
  - class: `SignalQueriesMigration`
- `packages/core/schematics/migrations/signal-queries-migration/migration_config.ts` — 53 lines
  - interface: `MigrationConfig`
- `packages/core/schematics/migrations/signal-queries-migration/property_accesses.ts` — 123 lines
  - function: `checkTsReferenceAccessesField`, `checkNonTsReferenceAccessesField`, `checkTsReferenceCallsField`, `checkNonTsReferenceCallsField`
  - interface: `FnCallExpression`
- `packages/core/schematics/migrations/signal-queries-migration/query_api_names.ts` — 24 lines
  - function: `queryFunctionNameToDecorator`
- `packages/core/schematics/migrations/signal-queries-migration/query_list_type.ts` — 35 lines
  - function: `extractQueryListType`



## `packages/core/schematics/migrations/strict-safe-navigation-narrow/`

- `packages/core/schematics/migrations/strict-safe-navigation-narrow/index.ts` — 41 lines
  - function: `migrate`
- `packages/core/schematics/migrations/strict-safe-navigation-narrow/migration.spec.ts` — 142 lines _(spec)_



## `packages/core/schematics/migrations/strict-templates-default/`

- `packages/core/schematics/migrations/strict-templates-default/index.ts` — 74 lines
  - function: `migrate`
- `packages/core/schematics/migrations/strict-templates-default/migration.spec.ts` — 201 lines _(spec)_



## `packages/core/schematics/ng-generate/cleanup-unused-imports/`

- `packages/core/schematics/ng-generate/cleanup-unused-imports/index.ts` — 48 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/cleanup-unused-imports/unused_imports_migration.ts` — 405 lines
  - interface: `CompilationUnitData`
  - class: `UnusedImportsMigration`



## `packages/core/schematics/ng-generate/common-to-standalone-migration/`

- `packages/core/schematics/ng-generate/common-to-standalone-migration/index.ts` — 60 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/common-to-standalone-migration/migration.ts` — 229 lines
  - interface: `CommonModuleReference`, `CommonModuleCompilationUnitData`
  - class: `CommonToStandaloneMigration`
- `packages/core/schematics/ng-generate/common-to-standalone-migration/types.ts` — 14 lines
  - interface: `MigrationConfig`
- `packages/core/schematics/ng-generate/common-to-standalone-migration/util.ts` — 309 lines
  - interface: `TemplateAnalysis`
  - function: `hasCommonModuleInImports`, `processResolvedTemplate`



## `packages/core/schematics/ng-generate/control-flow-migration/`

- `packages/core/schematics/ng-generate/control-flow-migration/cases.ts` — 132 lines
  - const: `boundcase`, `switchcase`, `nakedcase`, `switchdefault`, `nakeddefault`, `cases`
  - function: `migrateCase`
- `packages/core/schematics/ng-generate/control-flow-migration/fors.ts` — 275 lines
  - const: `ngfor`, `nakedngfor`, `commaSeparatedSyntax`, `stringPairs`
  - function: `migrateFor`
- `packages/core/schematics/ng-generate/control-flow-migration/identifier-lookup.ts` — 25 lines
  - function: `lookupIdentifiersInSourceFile`
- `packages/core/schematics/ng-generate/control-flow-migration/ifs.ts` — 307 lines
  - const: `ngif`, `boundngif`, `nakedngif`
  - function: `migrateIf`
- `packages/core/schematics/ng-generate/control-flow-migration/index.ts` — 151 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/control-flow-migration/migration.ts` — 109 lines
  - function: `migrateTemplate`
- `packages/core/schematics/ng-generate/control-flow-migration/switches.ts` — 122 lines
  - const: `ngswitch`
  - function: `migrateSwitch`
- `packages/core/schematics/ng-generate/control-flow-migration/types.ts` — 501 lines
  - const: `ngtemplate`, `boundngifelse`, `boundngifthenelse`, `boundngifthen`, `nakedngfor`, `startMarker`, `endMarker`, `startI18nMarker`, `endI18nMarker`, `importRemovals`, `importWithCommonRemovals`
  - type: `Offsets`, `Result`
  - interface: `ForAttributes`, `AliasAttributes`
  - class: `ElementToMigrate`, `Template`, `AnalyzedFile`, `CommonCollector`, `i18nCollector`, `ElementCollector`, `TemplateCollector`
- `packages/core/schematics/ng-generate/control-flow-migration/util.ts` — 1028 lines
  - function: `analyze`, `validateMigratedTemplate`, `validateI18nStructure`, `getPlaceholder`, `calculateNesting`, `hasLineBreaks`, `reduceNestingOffset`, `getTemplates`, `updateTemplates`, `processNgTemplates`, `canRemoveCommonModule`, `removeImports`, `getOriginals`, `getMainBlock`, `formatTemplate`
  - enum: `PlaceholderKind`



## `packages/core/schematics/ng-generate/inject-migration/`

- `packages/core/schematics/ng-generate/inject-migration/analysis.ts` — 468 lines
  - interface: `MigrationOptions`
  - const: `DI_PARAM_SYMBOLS`
  - function: `analyzeFile`, `getConstructorUnusedParameters`, `getSuperParameters`, `parameterReferencesOtherParameters`, `parameterDeclaresProperty`, `isNullableType`, `hasGenerics`, `isAccessedViaThis`, `isInlineFunction`
- `packages/core/schematics/ng-generate/inject-migration/index.ts` — 93 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/inject-migration/internal.ts` — 404 lines
  - function: `findUninitializedPropertiesToCombine`, `shouldCombineInInitializationOrder`
- `packages/core/schematics/ng-generate/inject-migration/migration.ts` — 1083 lines
  - function: `migrateFile`



## `packages/core/schematics/ng-generate/ngclass-to-class-migration/`

- `packages/core/schematics/ng-generate/ngclass-to-class-migration/index.ts` — 67 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/ngclass-to-class-migration/ngclass-to-class-migration.ts` — 279 lines
  - interface: `NgClassMigrationData`, `NgClassCompilationUnitData`
  - class: `NgClassMigration`
- `packages/core/schematics/ng-generate/ngclass-to-class-migration/ngclass_to_class_migration_spec.ts` — 1302 lines _(spec)_
- `packages/core/schematics/ng-generate/ngclass-to-class-migration/types.ts` — 22 lines
  - interface: `MigrationConfig`
- `packages/core/schematics/ng-generate/ngclass-to-class-migration/util.ts` — 541 lines
  - function: `migrateNgClassBindings`, `createNgClassImportsArrayRemoval`, `calculateImportReplacements`
  - class: `NgClassCollector`



## `packages/core/schematics/ng-generate/ngstyle-to-style-migration/`

- `packages/core/schematics/ng-generate/ngstyle-to-style-migration/index.ts` — 67 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/ngstyle-to-style-migration/ngstyle-to-style-migration.ts` — 232 lines
  - interface: `NgStyleMigrationData`, `NgStyleCompilationUnitData`
  - class: `NgStyleMigration`
- `packages/core/schematics/ng-generate/ngstyle-to-style-migration/types.ts` — 22 lines
  - interface: `MigrationConfig`
- `packages/core/schematics/ng-generate/ngstyle-to-style-migration/util.ts` — 451 lines
  - function: `migrateNgStyleBindings`, `createNgStyleImportsArrayRemoval`, `calculateImportReplacements`



## `packages/core/schematics/ng-generate/output-migration/`

- `packages/core/schematics/ng-generate/output-migration/index.ts` — 73 lines
  - function: `migrate`



## `packages/core/schematics/ng-generate/route-lazy-loading/`

- `packages/core/schematics/ng-generate/route-lazy-loading/index.ts` — 146 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/route-lazy-loading/to-lazy-routes.ts` — 413 lines
  - interface: `RouteMigrationData`
  - function: `migrateFileToLazyRoutes`
- `packages/core/schematics/ng-generate/route-lazy-loading/util.ts` — 120 lines
  - function: `isStandaloneComponent`, `isAngularRoutesArray`, `isRouterModuleCallExpression`, `isRouterCallExpression`, `isProvideRouterCallExpression`



## `packages/core/schematics/ng-generate/router-testing-module-migration/`

- `packages/core/schematics/ng-generate/router-testing-module-migration/index.ts` — 66 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/router-testing-module-migration/migration.ts` — 127 lines
  - interface: `CompilationUnitData`
  - class: `RouterTestingModuleMigration`
- `packages/core/schematics/ng-generate/router-testing-module-migration/types.ts` — 14 lines
  - interface: `MigrationConfig`
- `packages/core/schematics/ng-generate/router-testing-module-migration/utils.ts` — 624 lines
  - const: `ROUTER_TESTING_MODULE`, `SPY_LOCATION`, `ROUTER_MODULE`, `PROVIDE_LOCATION_MOCKS`, `ANGULAR_ROUTER_TESTING`, `ANGULAR_ROUTER`, `ANGULAR_COMMON`, `ANGULAR_COMMON_TESTING`, `IMPORTS_PROPERTY`, `PROVIDERS_PROPERTY`, `WITH_ROUTES_STATIC_METHOD`, `TESTBED_IDENTIFIER`, `CONFIGURE_TESTING_MODULE`
  - interface: `RouterTestingAnalysis`, `RouterTestingModuleUsage`
  - function: `findRouterTestingModuleUsages`, `processRouterTestingModuleUsage`



## `packages/core/schematics/ng-generate/self-closing-tags-migration/`

- `packages/core/schematics/ng-generate/self-closing-tags-migration/index.ts` — 59 lines
  - function: `migrate`



## `packages/core/schematics/ng-generate/service-migration/`

- `packages/core/schematics/ng-generate/service-migration/index.ts` — 97 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/service-migration/migration.ts` — 117 lines
  - function: `migrateFile`



## `packages/core/schematics/ng-generate/signal-input-migration/`

- `packages/core/schematics/ng-generate/signal-input-migration/index.ts` — 86 lines
  - function: `migrate`



## `packages/core/schematics/ng-generate/signal-queries-migration/`

- `packages/core/schematics/ng-generate/signal-queries-migration/index.ts` — 89 lines
  - function: `migrate`



## `packages/core/schematics/ng-generate/signals/`

- `packages/core/schematics/ng-generate/signals/index.ts` — 55 lines
  - function: `migrate`



## `packages/core/schematics/ng-generate/standalone-migration/`

- `packages/core/schematics/ng-generate/standalone-migration/index.ts` — 204 lines
  - function: `migrate`
- `packages/core/schematics/ng-generate/standalone-migration/prune-modules.ts` — 909 lines
  - function: `pruneNgModules`
- `packages/core/schematics/ng-generate/standalone-migration/standalone-bootstrap.ts` — 972 lines
  - function: `toStandaloneBootstrap`
- `packages/core/schematics/ng-generate/standalone-migration/to-standalone.ts` — 965 lines
  - type: `DeclarationImportsRemapper`
  - function: `toStandalone`, `convertNgModuleDeclarationToStandalone`, `potentialImportsToExpressions`, `findImportLocation`, `findTestObjectsToMigrate`, `findTemplateDependencies`, `extractDeclarationsFromModule`, `migrateTestDeclarations`
- `packages/core/schematics/ng-generate/standalone-migration/util.ts` — 382 lines
  - type: `NodeLookup`, `NamedClassDeclaration`, `ReferenceSpan`, `ReferencesByFile`
  - class: `UniqueItemTracker`, `ReferenceResolver`
  - function: `getNodeLookup`, `offsetsToNodes`, `findClassDeclaration`, `findLiteralProperty`, `getRelativeImportPath`, `knownInternalAliasRemapper`, `closestOrSelf`, `isClassReferenceInAngularModule`, `getTestingImports`, `isTestCall`



## `packages/core/schematics/test/`

- `packages/core/schematics/test/all-migrations.spec.ts` — 110 lines _(spec)_
- `packages/core/schematics/test/cleanup_unused_imports_migration_spec.ts` — 334 lines _(spec)_
- `packages/core/schematics/test/common_to_standalone_migration_spec.ts` — 1759 lines _(spec)_
- `packages/core/schematics/test/control_flow_migration_spec.ts` — 7132 lines _(spec)_
- `packages/core/schematics/test/helpers.ts` — 17 lines _(test-support)_
  - const: `dedent`
- `packages/core/schematics/test/inject_migration_spec.ts` — 3099 lines _(spec)_
- `packages/core/schematics/test/ngstyle_to_style_migration_spec.ts` — 542 lines _(spec)_
- `packages/core/schematics/test/output_migration_spec.ts` — 74 lines _(spec)_
- `packages/core/schematics/test/project_tsconfig_paths_spec.ts` — 104 lines _(spec)_
- `packages/core/schematics/test/queries_migration_spec.ts` — 138 lines _(spec)_
- `packages/core/schematics/test/router-testing-module-migration_spec.ts` — 924 lines _(spec)_
- `packages/core/schematics/test/self_closing_tags_migration_spec.ts` — 109 lines _(spec)_
- `packages/core/schematics/test/service_migration_spec.ts` — 293 lines _(spec)_
- `packages/core/schematics/test/signal_input_migration_spec.ts` — 163 lines _(spec)_
- `packages/core/schematics/test/signals_migration_spec.ts` — 126 lines _(spec)_
- `packages/core/schematics/test/standalone_migration_spec.ts` — 5762 lines _(spec)_
- `packages/core/schematics/test/standalone_routes_spec.ts` — 915 lines _(spec)_



## `packages/core/schematics/utils/`

- `packages/core/schematics/utils/change_tracker.ts` — 269 lines
  - type: `ImportRemapper`, `ChangesByFile`
  - interface: `PendingChange`
  - class: `ChangeTracker`
  - function: `normalizePath`
- `packages/core/schematics/utils/extract_metadata.ts` — 60 lines
  - interface: `AngularClassMetadata`
  - function: `extractAngularClassMetadata`
- `packages/core/schematics/utils/line_mappings.ts` — 68 lines
  - function: `getLineAndCharacterFromPosition`, `computeLineStartsMap`
- `packages/core/schematics/utils/load_esm.ts` — 58 lines
  - function: `loadEsmModule`, `loadCompilerCliMigrationsModule`
- `packages/core/schematics/utils/ng_component_template.ts` — 124 lines
  - interface: `ResolvedTemplate`
  - class: `NgComponentTemplateVisitor`
- `packages/core/schematics/utils/ng_decorators.ts` — 41 lines
  - type: `CallExpressionDecorator`
  - interface: `NgDecorator`
  - function: `getAngularDecorators`
- `packages/core/schematics/utils/parse_html.ts` — 184 lines
  - interface: `ParseResult`
  - type: `MigrateError`
  - function: `parseHtmlGracefully`, `parseTemplate`, `canRemoveCommonModule`
- `packages/core/schematics/utils/project_tsconfig_paths.ts` — 100 lines
  - function: `getProjectTsConfigPaths`
- `packages/core/schematics/utils/template_ast_visitor.ts` — 109 lines
  - class: `TemplateAstVisitor`



## `packages/core/schematics/utils/tsurge/`

- `packages/core/schematics/utils/tsurge/base_migration.ts` — 70 lines
  - type: `MigrationStats`
  - class: `TsurgeBaseMigration`
- `packages/core/schematics/utils/tsurge/index.ts` — 18 lines
  - re-exports * from `./base_migration`
  - re-exports * from `./migration`
  - re-exports * from `./program_info`
  - re-exports * from `./replacement`
  - re-exports * from `./helpers/unique_id`
  - re-exports * from `./helpers/serializable`
  - re-exports * from `./project_paths`
  - exports `getProgramInfoFromBaseInfo` from `./helpers/create_program`
  - exports `groupReplacementsByFile` from `./helpers/group_replacements`
- `packages/core/schematics/utils/tsurge/migration.ts` — 101 lines
  - type: `TsurgeMigration`
  - class: `TsurgeFunnelMigration`, `TsurgeComplexMigration`
- `packages/core/schematics/utils/tsurge/program_info.ts` — 64 lines
  - interface: `BaseProgramInfo`, `ProgramInfo`
- `packages/core/schematics/utils/tsurge/project_paths.ts` — 131 lines
  - type: `ProjectFileID`, `ProjectRootRelativePath`
  - interface: `ProjectFile`
  - function: `projectFile`
- `packages/core/schematics/utils/tsurge/replacement.ts` — 40 lines
  - class: `Replacement`, `TextUpdate`
  - function: `applyTextUpdates`



## `packages/core/schematics/utils/tsurge/executors/`

- `packages/core/schematics/utils/tsurge/executors/analyze_exec.ts` — 27 lines
  - function: `executeAnalyzePhase`
- `packages/core/schematics/utils/tsurge/executors/combine_exec.ts` — 25 lines
  - function: `executeCombinePhase`
- `packages/core/schematics/utils/tsurge/executors/global_meta_exec.ts` — 24 lines
  - function: `executeGlobalMetaPhase`
- `packages/core/schematics/utils/tsurge/executors/migrate_exec.ts` — 36 lines
  - function: `executeMigratePhase`



## `packages/core/schematics/utils/tsurge/helpers/`

- `packages/core/schematics/utils/tsurge/helpers/apply_import_manager.ts` — 103 lines
  - function: `applyImportManagerChanges`
- `packages/core/schematics/utils/tsurge/helpers/combine_units.ts` — 38 lines
  - function: `synchronouslyCombineUnitData`
- `packages/core/schematics/utils/tsurge/helpers/create_program.ts` — 97 lines
  - function: `createBaseProgramInfo`, `getProgramInfoFromBaseInfo`
- `packages/core/schematics/utils/tsurge/helpers/group_replacements.ts` — 31 lines
  - function: `groupReplacementsByFile`
- `packages/core/schematics/utils/tsurge/helpers/ngtsc_program.ts` — 49 lines
  - function: `createNgtscProgram`
- `packages/core/schematics/utils/tsurge/helpers/serializable.ts` — 16 lines
  - type: `Serializable`
  - function: `confirmAsSerializable`
- `packages/core/schematics/utils/tsurge/helpers/ts_parse_config.ts` — 34 lines
  - function: `parseTsconfigOrDie`
- `packages/core/schematics/utils/tsurge/helpers/ts_program.ts` — 49 lines
  - const: `defaultMigrationTsOptions`
  - function: `createPlainTsProgram`
- `packages/core/schematics/utils/tsurge/helpers/unique_id.ts` — 23 lines
  - type: `UniqueID`



## `packages/core/schematics/utils/tsurge/helpers/angular_devkit/`

- `packages/core/schematics/utils/tsurge/helpers/angular_devkit/devkit_filesystem.ts` — 200 lines
  - class: `DevkitMigrationFilesystem`
- `packages/core/schematics/utils/tsurge/helpers/angular_devkit/index.ts` — 11 lines
  - re-exports * from `./devkit_filesystem`
  - re-exports * from `./run_in_devkit`
- `packages/core/schematics/utils/tsurge/helpers/angular_devkit/run_in_devkit.spec.ts` — 157 lines _(spec)_
- `packages/core/schematics/utils/tsurge/helpers/angular_devkit/run_in_devkit.ts` — 181 lines
  - enum: `MigrationStage`
  - interface: `TsurgeDevkitMigration`
  - function: `runMigrationInDevkit`



## `packages/core/schematics/utils/tsurge/helpers/ast/`

- `packages/core/schematics/utils/tsurge/helpers/ast/insert_preceding_line.ts` — 32 lines
  - function: `insertPrecedingLine`
- `packages/core/schematics/utils/tsurge/helpers/ast/leading_space.ts` — 32 lines
  - function: `getLeadingLineWhitespaceOfNode`
- `packages/core/schematics/utils/tsurge/helpers/ast/lookup_property_access.ts` — 52 lines
  - function: `lookupPropertyAccess`



## `packages/core/schematics/utils/tsurge/helpers/google3/`

- `packages/core/schematics/utils/tsurge/helpers/google3/detection.ts` — 27 lines
  - function: `isGoogle3`, `google3UsePlainTsProgramIfNoKnownAngularOption`
- `packages/core/schematics/utils/tsurge/helpers/google3/target_detection.ts` — 8 lines
- `packages/core/schematics/utils/tsurge/helpers/google3/unified_module_resolution.ts` — 38 lines
  - function: `fileNameToModuleNameFactory`



## `packages/core/schematics/utils/tsurge/helpers/string_manipulation/`

- `packages/core/schematics/utils/tsurge/helpers/string_manipulation/cut_string_line_length.ts` — 37 lines
  - function: `cutStringToLineLimit`



## `packages/core/schematics/utils/tsurge/test/`

- `packages/core/schematics/utils/tsurge/test/g3_target_detection.spec.ts` — 78 lines _(spec)_
- `packages/core/schematics/utils/tsurge/test/output_helpers.ts` — 105 lines _(test-support)_
  - type: `OutputID`
  - function: `getIdOfOutput`, `findOutputDeclarationsAndReferences`
- `packages/core/schematics/utils/tsurge/test/output_migration.spec.ts` — 105 lines _(spec)_
- `packages/core/schematics/utils/tsurge/test/output_migration.ts` — 141 lines _(test-support)_
  - class: `OutputMigration`



## `packages/core/schematics/utils/tsurge/testing/`

- `packages/core/schematics/utils/tsurge/testing/dedent.ts` — 32 lines _(test-support)_
  - function: `dedent`
- `packages/core/schematics/utils/tsurge/testing/diff.ts` — 79 lines _(test-support)_
  - function: `diffText`
- `packages/core/schematics/utils/tsurge/testing/index.ts` — 14 lines _(test-support)_
  - re-exports * from `./diff`
  - re-exports * from `./run_single`
  - re-exports * from `./dedent`
  - re-exports * from `./jasmine`
  - re-exports * from `./test_run`
- `packages/core/schematics/utils/tsurge/testing/jasmine.ts` — 49 lines _(test-support)_
  - function: `setupTsurgeJasmineHelpers`
- `packages/core/schematics/utils/tsurge/testing/run_single.ts` — 77 lines _(test-support)_
  - function: `runTsurgeMigration`
- `packages/core/schematics/utils/tsurge/testing/test_run.ts` — 18 lines _(test-support)_
  - interface: `TestRun`



## `packages/core/schematics/utils/typescript/`

- `packages/core/schematics/utils/typescript/class_declaration.ts` — 56 lines
  - function: `getBaseTypeIdentifiers`, `findParentClassDeclaration`, `findClassDeclaration`, `hasExplicitConstructor`
- `packages/core/schematics/utils/typescript/compiler_host.ts` — 132 lines
  - function: `createMigrationProgram`, `createProgramOptions`, `canMigrateFile`
- `packages/core/schematics/utils/typescript/decorators.ts` — 29 lines
  - function: `getCallDecoratorImport`
- `packages/core/schematics/utils/typescript/find_base_classes.ts` — 33 lines
  - function: `findBaseClassDeclarations`
- `packages/core/schematics/utils/typescript/functions.ts` — 35 lines
  - function: `isFunctionLikeDeclaration`, `unwrapExpression`
- `packages/core/schematics/utils/typescript/imports.ts` — 217 lines
  - type: `Import`
  - function: `getImportOfIdentifier`, `getImportSpecifier`, `getImportSpecifiers`, `getNamedImports`, `replaceImport`, `removeSymbolFromNamedImports`, `findImportSpecifier`, `getRelativePath`
- `packages/core/schematics/utils/typescript/nodes.ts` — 83 lines
  - function: `hasModifier`, `closestNode`, `isNullCheck`, `isSafeAccess`
- `packages/core/schematics/utils/typescript/parse_tsconfig.ts` — 30 lines
  - function: `parseTsconfigFile`
- `packages/core/schematics/utils/typescript/property_name.ts` — 36 lines
  - function: `getPropertyNameText`, `hasPropertyNameText`, `findLiteralProperty`
- `packages/core/schematics/utils/typescript/symbol.ts` — 107 lines
  - function: `getValueSymbolOfDeclaration`, `isReferenceToImport`, `isNullableType`, `hasOneOfTypes`



## `packages/core/src/`

- `packages/core/src/authoring.ts` — 31 lines
  - exports `InputFunction` from `./authoring/input/input`
  - exports `InputOptions`, `InputOptionsWithoutTransform`, `InputOptionsWithTransform`, `InputSignal`, `InputSignalWithTransform`, `ɵINPUT_SIGNAL_BRAND_WRITE_TYPE` from `./authoring/input/input_signal`
  - exports `ɵUnwrapDirectiveSignalInputs` from `./authoring/input/input_type_checking`
  - exports `ModelFunction` from `./authoring/model/model`
  - exports `ModelOptions`, `ModelSignal` from `./authoring/model/model_signal`
  - exports `output`, `OutputOptions` from `./authoring/output/output`
  - exports `getOutputDestroyRef as ɵgetOutputDestroyRef`, `OutputEmitterRef` from `./authoring/output/output_emitter_ref`
  - exports `OutputRef`, `OutputRefSubscription` from `./authoring/output/output_ref`
  - exports `ContentChildFunction`, `ViewChildFunction` from `./authoring/queries`
- `packages/core/src/cached_injector_service.ts` — 60 lines
  - class: `CachedInjectorService`
- `packages/core/src/change_detection.ts` — 35 lines
  - exports `ChangeDetectionStrategy`, `ChangeDetectorRef`, `DefaultIterableDiffer`, `IterableChangeRecord`, `IterableChanges`, `IterableDiffer`, `IterableDifferFactory`, `IterableDiffers`, `KeyValueChangeRecord`, `KeyValueChanges`, `KeyValueDiffer`, `KeyValueDifferFactory`, `KeyValueDiffers`, `NgIterable`, `PipeTransform`, `SimpleChange`, `SimpleChanges`, `TrackByFunction` from `./change_detection/change_detection`
- `packages/core/src/console.ts` — 22 lines
  - class: `Console`
- `packages/core/src/core.externs.js` — 16 lines
- `packages/core/src/core.ts` — 152 lines
  - re-exports * from `./authoring`
  - re-exports * from `./change_detection`
  - re-exports * from `./core_private_export`
  - re-exports * from `./core_reactivity_export`
  - re-exports * from `./core_render3_private_export`
  - re-exports * from `./di`
  - re-exports * from `./linker`
  - re-exports * from `./linker/ng_module_factory_loader_impl`
  - re-exports * from `./metadata`
  - re-exports * from `./platform/platform_core_providers`
  - re-exports * from `./render`
  - re-exports * from `./resource`
  - re-exports * from `./version`
  - re-exports * from `./webmcp`
  - re-exports * from `./zone`
  - exports `input` from `./authoring/input/input`
  - exports `model` from `./authoring/model/model`
  - exports `contentChild`, `contentChildren`, `viewChild`, `viewChildren` from `./authoring/queries`
  - exports `AnimationCallbackEvent`, `AnimationFunction`, `MAX_ANIMATION_TIMEOUT` from `./animation/interfaces`
  - exports `ApplicationConfig`, `mergeApplicationConfig` from `./application/application_config`
  - exports `APP_INITIALIZER`, `ApplicationInitStatus`, `provideAppInitializer` from `./application/application_init`
  - exports `ApplicationModule` from `./application/application_module`
  - exports `APP_BOOTSTRAP_LISTENER`, `ApplicationRef`, `BootstrapOptions` from `./application/application_ref`
  - exports `ANIMATION_MODULE_TYPE`, `APP_ID`, `CSP_NONCE`, `PLATFORM_ID`, `PLATFORM_INITIALIZER` from `./application/application_tokens`
  - exports `REQUEST`, `REQUEST_CONTEXT`, `RESPONSE_INIT`, `ResponseInit` from `./application/platform_tokens`
  - exports `provideStabilityDebugging` from `./application/stability_debug_impl`
  - exports `provideCheckNoChangesConfig` from `./change_detection/provide_check_no_changes_config`
  - exports `NgZoneOptions`, `provideZoneChangeDetection` from `./change_detection/scheduling/ng_zone_scheduling`
  - exports `provideZonelessChangeDetection` from `./change_detection/scheduling/zoneless_scheduling_impl`
  - exports `asNativeElements`, `DebugElement`, `DebugEventListener`, `DebugNode`, `getDebugNode`, `Predicate` from `./debug/debug_node`
  - exports `IdleService`, `provideIdleServiceWith` from `./defer/idle_service`
  - exports `DOCUMENT` from `./document`
  - exports `ErrorHandler`, `provideBrowserGlobalErrorListeners` from `./error_handler`
  - exports `EventEmitter` from `./event_emitter`
  - exports `DEFAULT_CURRENCY_CODE`, `LOCALE_ID`, `MissingTranslationStrategy`, `TRANSLATIONS`, `TRANSLATIONS_FORMAT` from `./i18n/tokens`
  - exports `AbstractType`, `Type` from `./interface/type`
  - exports `provideNgReflectAttributes` from `./ng_reflect`
  - exports `PendingTasks` from `./pending_tasks`
  - exports `assertPlatform`, `createPlatform`, `createPlatformFactory`, `destroyPlatform`, `getPlatform`, `providePlatformInitializer`, `createOrReusePlatformInjector as ɵcreateOrReusePlatformInjector` from `./platform/platform`
  - exports `PlatformRef` from `./platform/platform_ref`
  - exports `AfterRenderRef` from `./render3/after_render/api`
  - exports `afterEveryRender`, `afterNextRender`, `AfterRenderOptions`, `ɵFirstAvailable` from `./render3/after_render/hooks`
  - exports `ComponentMirror`, `createComponent`, `reflectComponentType` from `./render3/component`
  - exports `enableProfiling` from `./render3/debug/chrome_dev_tools_performance`
  - exports `isStandalone` from `./render3/def_getters`
  - exports `Binding`, `DirectiveWithBindings`, `inputBinding`, `outputBinding`, `twoWayBinding` from `./render3/dynamic_bindings`
  - exports `createEnvironmentInjector`, `createNgModule` from `./render3/ng_module_ref`
  - exports `publishNonCoreGlobalUtil as ɵpublishNonCoreGlobalUtil` from `./render3/util/global_utils`
  - exports `Sanitizer` from `./sanitization/sanitizer`
  - exports `SecurityContext` from `./sanitization/dom_security_schema`
  - exports `GetTestability`, `setTestabilityGetter`, `Testability`, `TestabilityRegistry` from `./testability/testability`
  - exports `makeStateKey`, `StateKey`, `TransferState` from `./transfer_state`
  - exports `booleanAttribute`, `numberAttribute` from `./util/coercion`
  - exports `TypeDecorator` from `./util/decorators`
  - exports `DefaultExport` from `./util/default_export`
  - exports `enableProdMode`, `isDevMode` from `./util/is_dev_mode`
- `packages/core/src/core_private_export.ts` — 190 lines
  - exports `type NavigateEvent as ɵNavigateEvent`, `type Navigation as ɵNavigation`, `type NavigationCurrentEntryChangeEvent as ɵNavigationCurrentEntryChangeEvent`, `type NavigationDestination as ɵNavigationDestination`, `type NavigationHistoryEntry as ɵNavigationHistoryEntry`, `type NavigationInterceptOptions as ɵNavigationInterceptOptions`, `type NavigationNavigateOptions as ɵNavigationNavigateOptions`, `type NavigationOptions as ɵNavigationOptions`, `type NavigationReloadOptions as ɵNavigationReloadOptions`, `type NavigationResult as ɵNavigationResult`, `type NavigationTransition as ɵNavigationTransition`, `type NavigationType as ɵNavigationType`, `type NavigationUpdateCurrentEntryOptions as ɵNavigationUpdateCurrentEntryOptions` from `../primitives/dom-navigation`
  - exports `maybeUnwrapDefaultExport as ɵmaybeUnwrapDefaultExport` from `./util/default_export`
  - exports `setAlternateWeakRefImpl as ɵsetAlternateWeakRefImpl` from `../primitives/signals`
  - exports `ANIMATIONS_DISABLED as ɵANIMATIONS_DISABLED` from `./animation/interfaces`
  - exports `allLeavingAnimations as ɵallLeavingAnimations` from `./animation/longest_animation`
  - exports `IMAGE_CONFIG as ɵIMAGE_CONFIG`, `IMAGE_CONFIG_DEFAULTS as ɵIMAGE_CONFIG_DEFAULTS`, `ImageConfig as ɵImageConfig` from `./application/application_tokens`
  - exports `internalCreateApplication as ɵinternalCreateApplication` from `./application/create_application`
  - exports `TracingAction as ɵTracingAction`, `TracingService as ɵTracingService`, `TracingSnapshot as ɵTracingSnapshot` from `./application/tracing`
  - exports `type InputSignalNode as ɵInputSignalNode` from `./authoring/input/input_signal_node`
  - exports `defaultIterableDiffers as ɵdefaultIterableDiffers`, `defaultKeyValueDiffers as ɵdefaultKeyValueDiffers` from `./change_detection/change_detection`
  - exports `internalProvideZoneChangeDetection as ɵinternalProvideZoneChangeDetection`, `PROVIDED_NG_ZONE as ɵPROVIDED_NG_ZONE` from `./change_detection/scheduling/ng_zone_scheduling`
  - exports `ChangeDetectionScheduler as ɵChangeDetectionScheduler`, `NotificationSource as ɵNotificationSource`, `PROVIDED_ZONELESS as ɵPROVIDED_ZONELESS`, `ZONELESS_ENABLED as ɵZONELESS_ENABLED` from `./change_detection/scheduling/zoneless_scheduling`
  - exports `provideZonelessChangeDetectionInternal as ɵprovideZonelessChangeDetectionInternal` from `./change_detection/scheduling/zoneless_scheduling_impl`
  - exports `Console as ɵConsole` from `./console`
  - exports `DeferBlockDetails as ɵDeferBlockDetails`, `getDeferBlocks as ɵgetDeferBlocks` from `./defer/discovery`
  - exports `DeferBlockBehavior as ɵDeferBlockBehavior`, `DeferBlockConfig as ɵDeferBlockConfig`, `DeferBlockState as ɵDeferBlockState` from `./defer/interfaces`
  - exports `DEHYDRATED_BLOCK_REGISTRY as ɵDEHYDRATED_BLOCK_REGISTRY` from `./defer/registry`
  - exports `renderDeferBlockState as ɵrenderDeferBlockState` from `./defer/rendering`
  - exports `TimerScheduler as ɵTimerScheduler` from `./defer/timer_scheduler`
  - exports `triggerResourceLoading as ɵtriggerResourceLoading` from `./defer/triggering`
  - exports `convertToBitFlags as ɵconvertToBitFlags`, `setCurrentInjector as ɵsetCurrentInjector` from `./di/injector_compatibility`
  - exports `getInjectableDef as ɵgetInjectableDef`, `ɵɵInjectableDeclaration`, `ɵɵInjectorDef` from `./di/interface/defs`
  - exports `InternalEnvironmentProviders as ɵInternalEnvironmentProviders`, `isEnvironmentProviders as ɵisEnvironmentProviders` from `./di/interface/provider`
  - exports `INJECTOR_SCOPE as ɵINJECTOR_SCOPE` from `./di/scope`
  - exports `XSS_SECURITY_URL as ɵXSS_SECURITY_URL` from `./error_details_base_url`
  - exports `INTERNAL_APPLICATION_ERROR_HANDLER as ɵINTERNAL_APPLICATION_ERROR_HANDLER` from `./error_handler`
  - exports `formatRuntimeError as ɵformatRuntimeError`, `RuntimeError as ɵRuntimeError`, `RuntimeErrorCode as ɵRuntimeErrorCode` from `./errors`
  - exports `JSACTION_EVENT_CONTRACT as ɵJSACTION_EVENT_CONTRACT` from `./event_delegation_utils`
  - exports `annotateForHydration as ɵannotateForHydration` from `./hydration/annotate`
  - exports `CLIENT_RENDER_MODE_FLAG as ɵCLIENT_RENDER_MODE_FLAG`, `withDomHydration as ɵwithDomHydration`, `withI18nSupport as ɵwithI18nSupport`, `withIncrementalHydration as ɵwithIncrementalHydration` from `./hydration/api`
  - exports `CACHE_ACTIVE as ɵCACHE_ACTIVE` from `./hydration/cache`
  - exports `withEventReplay as ɵwithEventReplay` from `./hydration/event_replay`
  - exports `EVENT_REPLAY_QUEUE as ɵEVENT_REPLAY_QUEUE`, `IS_ENABLED_BLOCKING_INITIAL_NAVIGATION as ɵIS_ENABLED_BLOCKING_INITIAL_NAVIGATION`, `IS_HYDRATION_DOM_REUSE_ENABLED as ɵIS_HYDRATION_DOM_REUSE_ENABLED`, `IS_INCREMENTAL_HYDRATION_ENABLED as ɵIS_INCREMENTAL_HYDRATION_ENABLED`, `JSACTION_BLOCK_ELEMENT_MAP as ɵJSACTION_BLOCK_ELEMENT_MAP` from `./hydration/tokens`
  - exports `HydratedNode as ɵHydratedNode`, `HydrationInfo as ɵHydrationInfo`, `HydrationStatus as ɵHydrationStatus`, `readHydrationInfo as ɵreadHydrationInfo`, `resetIncrementalHydrationEnabledWarnedForTests as ɵresetIncrementalHydrationEnabledWarnedForTests`, `SSR_CONTENT_INTEGRITY_MARKER as ɵSSR_CONTENT_INTEGRITY_MARKER` from `./hydration/utils`
  - exports `CurrencyIndex as ɵCurrencyIndex`, `ExtraLocaleDataIndex as ɵExtraLocaleDataIndex`, `findLocaleData as ɵfindLocaleData`, `getLocaleCurrencyCode as ɵgetLocaleCurrencyCode`, `getLocalePluralCase as ɵgetLocalePluralCase`, `LocaleDataIndex as ɵLocaleDataIndex`, `registerLocaleData as ɵregisterLocaleData`, `unregisterAllLocaleData as ɵunregisterLocaleData` from `./i18n/locale_data_api`
  - exports `DEFAULT_LOCALE_ID as ɵDEFAULT_LOCALE_ID` from `./i18n/localization`
  - exports `Writable as ɵWritable` from `./interface/type`
  - exports `getClosestComponentName as ɵgetClosestComponentName` from `./internal/get_closest_component_name`
  - exports `getCurrentClosestComponentInstance as ɵgetCurrentClosestComponentInstance` from `./internal/get_current_closest_component_instance`
  - exports `clearResolutionOfComponentResourcesQueue as ɵclearResolutionOfComponentResourcesQueue`, `isComponentDefPendingResolution as ɵisComponentDefPendingResolution`, `resolveComponentResources as ɵresolveComponentResources`, `restoreComponentResolutionQueue as ɵrestoreComponentResolutionQueue` from `./metadata/resource_loading`
  - exports `PendingTasksInternal as ɵPendingTasksInternal` from `./pending_tasks_internal`
  - exports `ENABLE_ROOT_COMPONENT_BOOTSTRAP as ɵENABLE_ROOT_COMPONENT_BOOTSTRAP` from `./platform/bootstrap`
  - exports `disableProfiling as ɵdisableProfiling`, `enableProfiling as ɵenableProfiling`, `PERFORMANCE_MARK_PREFIX as ɵPERFORMANCE_MARK_PREFIX`, `startMeasuring as ɵstartMeasuring`, `stopMeasuring as ɵstopMeasuring` from `./profiler`
  - exports `ReflectionCapabilities as ɵReflectionCapabilities` from `./reflection/reflection_capabilities`
  - exports `AnimationRendererType as ɵAnimationRendererType` from `./render/api`
  - exports `InjectorProfilerContext as ɵInjectorProfilerContext`, `ProviderRecord as ɵProviderRecord`, `setInjectorProfilerContext as ɵsetInjectorProfilerContext` from `./render3/debug/injector_profiler`
  - exports `getComponentDef as ɵgetComponentDef` from `./render3/def_getters`
  - exports `getDocument as ɵgetDocument` from `./render3/interfaces/document`
  - exports `SHARED_STYLES_HOST as ɵSHARED_STYLES_HOST`, `SharedStylesHost as ɵSharedStylesHost` from `./render3/interfaces/shared_styles_host`
  - exports `chain as ɵchain`, `encapsulateResourceError as ɵencapsulateResourceError`, `ResourceImpl as ɵResourceImpl` from `./resource/resource`
  - exports `allowSanitizationBypassAndThrow as ɵallowSanitizationBypassAndThrow`, `BypassType as ɵBypassType`, `getSanitizationBypassType as ɵgetSanitizationBypassType`, `SafeHtml as ɵSafeHtml`, `SafeResourceUrl as ɵSafeResourceUrl`, `SafeScript as ɵSafeScript`, `SafeStyle as ɵSafeStyle`, `SafeUrl as ɵSafeUrl`, `SafeValue as ɵSafeValue`, `unwrapSafeValue as ɵunwrapSafeValue` from `./sanitization/bypass`
  - exports `_sanitizeHtml as ɵ_sanitizeHtml` from `./sanitization/html_sanitizer`
  - exports `_sanitizeUrl as ɵ_sanitizeUrl` from `./sanitization/url_sanitizer`
  - exports `TESTABILITY as ɵTESTABILITY`, `TESTABILITY_GETTER as ɵTESTABILITY_GETTER`, `USE_PENDING_TASKS as ɵUSE_PENDING_TASKS` from `./testability/testability`
  - exports `ɵassertType` from `./type_checking`
  - exports `booleanAttribute`, `numberAttribute` from `./util/coercion`
  - exports `devModeEqual as ɵdevModeEqual` from `./util/comparison`
  - exports `global as ɵglobal` from `./util/global`
  - exports `isPromise as ɵisPromise`, `isSubscribable as ɵisSubscribable` from `./util/lang`
  - exports `performanceMarkFeature as ɵperformanceMarkFeature` from `./util/performance`
  - exports `promiseWithResolvers as ɵpromiseWithResolvers` from `./util/promise_with_resolvers`
  - exports `stringify as ɵstringify`, `truncateMiddle as ɵtruncateMiddle` from `./util/stringify`
  - exports `NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR as ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR` from `./view/provider_flags`
- `packages/core/src/core_reactivity_export.ts` — 13 lines
  - re-exports * from `./core_reactivity_export_internal`
- `packages/core/src/core_reactivity_export_internal.ts` — 31 lines
  - exports `SIGNAL as ɵSIGNAL` from `../primitives/signals`
  - exports `isSignal`, `isWritableSignal`, `Signal`, `ValueEqualityFn` from `./render3/reactivity/api`
  - exports `computed`, `CreateComputedOptions` from `./render3/reactivity/computed`
  - exports `CreateSignalOptions`, `signal`, `WritableSignal`, `ɵunwrapWritableSignal` from `./render3/reactivity/signal`
  - exports `linkedSignal` from `./render3/reactivity/linked_signal`
  - exports `untracked` from `./render3/reactivity/untracked`
  - exports `CreateEffectOptions`, `effect`, `EffectRef`, `EffectCleanupFn`, `EffectCleanupRegisterFn` from `./render3/reactivity/effect`
  - exports `EffectScheduler as ɵEffectScheduler` from `./render3/reactivity/root_effect_scheduler`
  - exports `afterRenderEffect`, `ɵFirstAvailableSignal` from `./render3/reactivity/after_render_effect`
  - exports `assertNotInReactiveContext` from `./render3/reactivity/asserts`
- `packages/core/src/core_render3_private_export.ts` — 326 lines
  - exports `type DebugSignalGraph as ɵDebugSignalGraph`, `type DebugSignalGraphEdge as ɵDebugSignalGraphEdge`, `type DebugSignalGraphNode as ɵDebugSignalGraphNode`, `Framework as ɵFramework`, `Profiler as ɵProfiler`, `ProfilerEvent as ɵProfilerEvent` from `../primitives/devtools`
  - exports `compileNgModuleFactory as ɵcompileNgModuleFactory` from `./application/application_ngmodule_factory_compiler`
  - exports `injectChangeDetectorRef as ɵinjectChangeDetectorRef` from `./change_detection/change_detector_ref`
  - exports `createInjector as ɵcreateInjector` from `./di/create_injector`
  - exports `isInjectable as ɵisInjectable`, `NG_INJ_DEF as ɵNG_INJ_DEF`, `NG_PROV_DEF as ɵNG_PROV_DEF` from `./di/interface/defs`
  - exports `setAllowDuplicateNgModuleIdsForTest as ɵsetAllowDuplicateNgModuleIdsForTest`, `registerNgModuleType as ɵɵregisterNgModuleType` from `./linker/ng_module_registration`
  - exports `NgModuleDef as ɵNgModuleDef`, `NgModuleTransitiveScopes as ɵNgModuleTransitiveScopes` from `./metadata/ng_module_def`
  - exports `AfterRenderManager as ɵAfterRenderManager` from `./render3/after_render/manager`
  - exports `inferTagNameFromDefinition as ɵinferTagNameFromDefinition` from `./render3/component_ref`
  - exports `ɵɵenableIncrementalHydrationRuntime` from `./hydration/incremental_runtime`
  - exports `getLContext as ɵgetLContext` from `./render3/context_discovery`
  - exports `depsTracker as ɵdepsTracker` from `./render3/deps_tracker/deps_tracker`
  - exports `getComponentInstanceDeepLinkId as ɵgetComponentInstanceDeepLinkId` from `./render3/debug/chrome_dev_tools_performance`
  - exports `NG_COMP_DEF as ɵNG_COMP_DEF`, `NG_DIR_DEF as ɵNG_DIR_DEF`, `NG_ELEMENT_ID as ɵNG_ELEMENT_ID`, `NG_MOD_DEF as ɵNG_MOD_DEF`, `NG_PIPE_DEF as ɵNG_PIPE_DEF` from `./render3/fields`
  - exports `AcxChangeDetectionStrategy as ɵAcxChangeDetectionStrategy`, `AcxComponentDebugMetadata as ɵAcxComponentDebugMetadata`, `AcxDirectiveDebugMetadata as ɵAcxDirectiveDebugMetadata`, `AcxViewEncapsulation as ɵAcxViewEncapsulation`, `AngularComponentDebugMetadata as ɵAngularComponentDebugMetadata`, `AngularDirectiveDebugMetadata as ɵAngularDirectiveDebugMetadata`, `AttributeMarker as ɵAttributeMarker`, `BaseDirectiveDebugMetadata as ɵBaseDirectiveDebugMetadata`, `ComponentDef as ɵComponentDef`, `ComponentType as ɵComponentType`, `ControlDirectiveHost as ɵControlDirectiveHost`, `CssSelectorList as ɵCssSelectorList`, `ɵDEFER_BLOCK_CONFIG`, `ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR`, `ɵDeferBlockDependencyInterceptor`, `DirectiveDebugMetadata as ɵDirectiveDebugMetadata`, `DirectiveDef as ɵDirectiveDef`, `DirectiveType as ɵDirectiveType`, `getDirectives as ɵgetDirectives`, `getHostElement as ɵgetHostElement`, `ɵgetUnknownElementStrictMode`, `ɵgetUnknownPropertyStrictMode`, `NgModuleFactory as ɵNgModuleFactory`, `NgModuleType as ɵNgModuleType`, …(+182) from `./render3/index`
  - exports `CONTAINER_HEADER_OFFSET as ɵCONTAINER_HEADER_OFFSET` from `./render3/interfaces/container`
  - exports `LContext as ɵLContext` from `./render3/interfaces/context`
  - exports `setDocument as ɵsetDocument` from `./render3/interfaces/document`
  - exports `compileComponent as ɵcompileComponent`, `compileDirective as ɵcompileDirective` from `./render3/jit/directive`
  - exports `resetJitOptions as ɵresetJitOptions` from `./render3/jit/jit_options`
  - exports `compileNgModule as ɵcompileNgModule`, `compileNgModuleDefs as ɵcompileNgModuleDefs`, `flushModuleScopingQueueAsMuchAsPossible as ɵflushModuleScopingQueueAsMuchAsPossible`, `generateStandaloneInDeclarationsError as ɵgenerateStandaloneInDeclarationsError`, `patchComponentDefWithScope as ɵpatchComponentDefWithScope`, `resetCompiledComponents as ɵresetCompiledComponents`, `transitiveScopesFor as ɵtransitiveScopesFor` from `./render3/jit/module`
  - exports `FactoryTarget as ɵɵFactoryTarget`, `ɵɵngDeclareClassMetadata`, `ɵɵngDeclareClassMetadataAsync`, `ɵɵngDeclareComponent`, `ɵɵngDeclareDirective`, `ɵɵngDeclareFactory`, `ɵɵngDeclareInjectable`, `ɵɵngDeclareService`, `ɵɵngDeclareInjector`, `ɵɵngDeclareNgModule`, `ɵɵngDeclarePipe` from `./render3/jit/partial`
  - exports `compilePipe as ɵcompilePipe` from `./render3/jit/pipe`
  - exports `isNgModule as ɵisNgModule` from `./render3/jit/util`
  - exports `getAsyncClassMetadataFn as ɵgetAsyncClassMetadataFn` from `./render3/metadata`
  - exports `ControlFlowBlock as ɵControlFlowBlock`, `ControlFlowBlockType as ɵControlFlowBlockType`, `DeferBlockData as ɵDeferBlockData`, `ForLoopBlockData as ɵForLoopBlockData` from `./render3/util/control_flow_types`
  - exports `ExternalCoreGlobalUtils as ɵExternalCoreGlobalUtils`, `FrameworkAgnosticGlobalUtils as ɵFrameworkAgnosticGlobalUtils` from `./render3/util/global_utils`
  - exports `getTransferState as ɵgetTransferState` from `./render3/util/transfer_state_utils`
  - exports `isViewDirty as ɵisViewDirty`, `markForRefresh as ɵmarkForRefresh`, `ViewRef as ɵViewRef` from `./render3/view_ref`
  - exports `bypassSanitizationTrustHtml as ɵbypassSanitizationTrustHtml`, `bypassSanitizationTrustResourceUrl as ɵbypassSanitizationTrustResourceUrl`, `bypassSanitizationTrustScript as ɵbypassSanitizationTrustScript`, `bypassSanitizationTrustStyle as ɵbypassSanitizationTrustStyle`, `bypassSanitizationTrustUrl as ɵbypassSanitizationTrustUrl` from `./sanitization/bypass`
  - exports `ɵɵsanitizeHtml`, `ɵɵsanitizeResourceUrl`, `ɵɵsanitizeScript`, `ɵɵsanitizeStyle`, `ɵɵsanitizeUrl`, `ɵɵsanitizeUrlOrResourceUrl`, `ɵɵtrustConstantHtml`, `ɵɵtrustConstantResourceUrl`, `ɵɵvalidateAttribute` from `./sanitization/sanitization`
  - exports `noSideEffects as ɵnoSideEffects` from `./util/closure`
- `packages/core/src/di.ts` — 27 lines
  - re-exports * from `./di/index`
- `packages/core/src/document.ts` — 23 lines
  - const: `DOCUMENT`
- `packages/core/src/error_details_base_url.ts` — 37 lines
  - const: `DOC_PAGE_BASE_URL`, `ERROR_DETAILS_PAGE_BASE_URL`, `XSS_SECURITY_URL`
- `packages/core/src/error_handler.ts` — 176 lines
  - class: `ErrorHandler`
  - const: `INTERNAL_APPLICATION_ERROR_HANDLER`, `errorHandlerEnvironmentInitializer`
  - function: `provideBrowserGlobalErrorListeners`
- `packages/core/src/errors.ts` — 214 lines
  - const enum: `RuntimeErrorCode`
  - class: `RuntimeError`
  - function: `formatRuntimeErrorCode`, `formatRuntimeError`
- `packages/core/src/event_delegation_utils.ts` — 221 lines
  - const: `DEFER_BLOCK_SSR_ID_ATTRIBUTE`, `sharedStashFunction`, `sharedMapFunction`, `removeListeners`, `JSACTION_EVENT_CONTRACT`
  - function: `setJSActionAttributes`, `removeListenersFromBlocks`, `markEventHandledForElement`, `invokeListeners`, `setStashFn`, `stashEventListenerImpl`, `enableStashEventListenerImpl`
  - interface: `EventContractDetails`
  - type: `EventCallback`, `WrappedEventCallback`
- `packages/core/src/event_emitter.ts` — 201 lines
  - interface: `EventEmitter`
  - const: `EventEmitter`
- `packages/core/src/image_performance_warning.ts` — 233 lines
  - class: `ImagePerformanceWarning`
- `packages/core/src/linker.ts` — 20 lines
  - exports `Compiler`, `COMPILER_OPTIONS`, `CompilerFactory`, `CompilerOptions` from `./linker/compiler`
  - exports `ComponentRef` from `./linker/component_factory`
  - exports `DestroyRef` from `./linker/destroy_ref`
  - exports `ElementRef` from `./linker/element_ref`
  - exports `NgModuleFactory`, `NgModuleRef` from `./linker/ng_module_factory`
  - exports `getModuleFactory`, `getNgModuleById` from `./linker/ng_module_factory_loader`
  - exports `QueryList` from `./linker/query_list`
  - exports `TemplateRef` from `./linker/template_ref`
  - exports `ViewContainerRef` from `./linker/view_container_ref`
  - exports `EmbeddedViewRef`, `ViewRef` from `./linker/view_ref`
- `packages/core/src/metadata.ts` — 56 lines
  - exports `Attribute`, `AttributeDecorator` from `./di/metadata_attr`
  - exports `AfterContentChecked`, `AfterContentInit`, `AfterViewChecked`, `AfterViewInit`, `DoCheck`, `OnChanges`, `OnDestroy`, `OnInit` from `./change_detection/lifecycle_hooks`
  - exports `ContentChild`, `ContentChildDecorator`, `ContentChildren`, `ContentChildrenDecorator`, `Query`, `ViewChild`, `ViewChildDecorator`, `ViewChildren`, `ViewChildrenDecorator` from `./metadata/di`
  - exports `Component`, `ComponentDecorator`, `Directive`, `DirectiveDecorator`, `HostBinding`, `HostBindingDecorator`, `HostListener`, `HostListenerDecorator`, `Input`, `InputDecorator`, `Output`, `OutputDecorator`, `Pipe`, `PipeDecorator` from `./metadata/directives`
  - exports `DoBootstrap` from `./metadata/do_bootstrap`
  - exports `NgModule`, `NgModuleDecorator` from `./metadata/ng_module`
  - exports `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`, `SchemaMetadata` from `./metadata/schema`
  - exports `ViewEncapsulation` from `./metadata/view`
- `packages/core/src/ng_reflect.ts` — 70 lines
  - const: `NG_REFLECT_ATTRS_FLAG_DEFAULT`, `NG_REFLECT_ATTRS_FLAG`
  - function: `provideNgReflectAttributes`, `normalizeDebugBindingName`, `normalizeDebugBindingValue`
- `packages/core/src/pending_tasks.ts` — 93 lines
  - class: `PendingTasks`
- `packages/core/src/pending_tasks_internal.ts` — 92 lines
  - class: `PendingTasksInternal`
- `packages/core/src/profiler.ts` — 76 lines
  - const: `PERFORMANCE_MARK_PREFIX`
  - function: `startMeasuring`, `stopMeasuring`, `labels`, `enableProfiling`, `disableProfiling`
- `packages/core/src/r3_symbols.ts` — 43 lines
  - const: `ITS_JUST_ANGULAR`
  - exports `ɵɵinject` from `./di/injector_compatibility`
  - exports `ɵɵdefineInjectable`, `ɵɵdefineInjector`, `ɵɵInjectableDeclaration` from `./di/interface/defs`
  - exports `ɵɵdefineService` from `./di/interface/service`
  - exports `NgModuleDef` from `./metadata/ng_module_def`
  - exports `ɵɵdefineNgModule` from `./render3/definition`
  - exports `ɵɵFactoryDeclaration`, `ɵɵInjectorDeclaration`, `ɵɵNgModuleDeclaration` from `./render3/interfaces/public_definitions`
  - exports `setClassMetadata`, `setClassMetadataAsync` from `./render3/metadata`
  - exports `NgModuleFactory` from `./render3/ng_module_ref`
  - exports `noSideEffects as ɵnoSideEffects` from `./util/closure`
- `packages/core/src/render.ts` — 12 lines
  - exports `Renderer2`, `RendererFactory2`, `ListenerOptions` from `./render/api`
  - exports `RendererStyleFlags2`, `RendererType2` from `./render/api_flags`
- `packages/core/src/transfer_state.ts` — 170 lines
  - type: `StateKey`
  - function: `makeStateKey`, `retrieveTransferredState`
  - class: `TransferState`
- `packages/core/src/type_checking.ts` — 14 lines
- `packages/core/src/version.ts` — 31 lines
  - class: `Version`
  - const: `VERSION`
- `packages/core/src/zone.ts` — 11 lines
  - exports `NgZone`, `NoopNgZone as ɵNoopNgZone` from `./zone/ng_zone`



## `packages/core/src/animation/`

- `packages/core/src/animation/interfaces.ts` — 98 lines
  - const: `ANIMATIONS_DISABLED`, `MAX_ANIMATION_TIMEOUT`
  - type: `AnimationCallbackEvent`, `AnimationFunction`, `RunEnterAnimationFn`, `RunLeaveAnimationFn`, `AnimationClassBindingFn`
  - interface: `LongestAnimation`, `EnterNodeAnimations`, `LeaveNodeAnimations`, `AnimationLViewData`
- `packages/core/src/animation/longest_animation.ts` — 162 lines
  - function: `determineLongestAnimation`
  - const: `allLeavingAnimations`
- `packages/core/src/animation/queue.ts` — 120 lines
  - interface: `AnimationQueue`
  - const: `ANIMATION_QUEUE`
  - function: `addToAnimationQueue`, `removeAnimationsFromQueue`, `removeFromAnimationQueue`, `scheduleAnimationQueue`, `initializeAnimationQueueScheduler`, `queueEnterAnimations`
- `packages/core/src/animation/utils.ts` — 392 lines
  - const: `areAnimationSupported`, `noOpAnimationComplete`, `enterClassMap`, `longestAnimations`, `leavingNodes`, `reusedNodes`
  - function: `areAnimationsDisabled`, `assertAnimationTypes`, `assertElementNodes`, `trackEnterClasses`, `cleanupEnterClassData`, `clearLeavingNodes`, `cancelLeavingNodes`, `trackLeavingNodes`, `getLViewEnterAnimations`, `getLViewLeaveAnimations`, `getClassListFromValue`, `cancelAnimationsIfRunning`, `elementHasClassList`, `getEventTarget`, `isLongestAnimation`, `addAnimationToLView`, `cleanupAfterLeaveAnimations`, `clearLViewNodeAnimationResolvers`, `leaveAnimationFunctionCleanup`



## `packages/core/src/application/`

- `packages/core/src/application/application_config.ts` — 39 lines
  - interface: `ApplicationConfig`
  - function: `mergeApplicationConfig`
- `packages/core/src/application/application_init.ts` — 277 lines
  - const: `APP_INITIALIZER`
  - function: `provideAppInitializer`
  - class: `ApplicationInitStatus`
- `packages/core/src/application/application_module.ts` — 25 lines
  - class: `ApplicationModule`
- `packages/core/src/application/application_ngmodule_factory_compiler.ts` — 82 lines
  - function: `compileNgModuleFactory`
- `packages/core/src/application/application_ref.ts` — 900 lines
  - const: `APP_BOOTSTRAP_LISTENER`
  - function: `publishDefaultGlobalUtils`, `publishSignalConfiguration`, `optionsReducer`, `remove`
  - interface: `BootstrapOptions`
  - class: `ApplicationRef`
  - const enum: `ApplicationRefDirtyFlags`
- `packages/core/src/application/application_tokens.ts` — 192 lines
  - const: `APP_ID`, `validAppIdInitializer`, `PLATFORM_INITIALIZER`, `PLATFORM_ID`, `ANIMATION_MODULE_TYPE`, `CSP_NONCE`, `IMAGE_CONFIG_DEFAULTS`, `IMAGE_CONFIG`
  - type: `ImageConfig`
- `packages/core/src/application/create_application.ts` — 92 lines
  - function: `internalCreateApplication`
- `packages/core/src/application/platform_tokens.ts` — 94 lines
  - const: `REQUEST`, `RESPONSE_INIT`, `REQUEST_CONTEXT`
  - type: `ResponseInit`
- `packages/core/src/application/stability_debug.ts` — 18 lines
  - const: `DEBUG_TASK_TRACKER`
  - interface: `DebugTaskTracker`
- `packages/core/src/application/stability_debug_impl.ts` — 114 lines
  - function: `provideStabilityDebugging`
- `packages/core/src/application/tracing.ts` — 75 lines
  - enum: `TracingAction`
  - interface: `TracingSnapshot`, `TracingService`
  - const: `TracingService`



## `packages/core/src/authoring/`

- `packages/core/src/authoring/queries.ts` — 332 lines
  - interface: `ViewChildFunction`, `ContentChildFunction`
  - const: `viewChild`, `contentChild`
  - function: `viewChildren`, `viewChildren`, `viewChildren`, `contentChildFn`, `contentChildren`, `contentChildren`, `contentChildren`



## `packages/core/src/authoring/input/`

- `packages/core/src/authoring/input/input.ts` — 178 lines
  - function: `inputFunction`, `inputRequiredFunction`
  - interface: `InputFunction`
  - const: `input`
- `packages/core/src/authoring/input/input_signal.ts` — 152 lines
  - interface: `InputOptions`, `InputSignalWithTransform`, `InputSignal`
  - type: `InputOptionsWithoutTransform`, `InputOptionsWithTransform`
  - function: `createInputSignal`
- `packages/core/src/authoring/input/input_signal_node.ts` — 52 lines
  - const: `REQUIRED_UNSET_VALUE`, `INPUT_SIGNAL_NODE`
  - interface: `InputSignalNode`
- `packages/core/src/authoring/input/input_type_checking.ts` — 22 lines



## `packages/core/src/authoring/model/`

- `packages/core/src/authoring/model/model.ts` — 121 lines
  - function: `modelFunction`, `modelRequiredFunction`
  - interface: `ModelFunction`
  - const: `model`
- `packages/core/src/authoring/model/model_signal.ts` — 118 lines
  - interface: `ModelOptions`, `ModelSignal`
  - function: `createModelSignal`



## `packages/core/src/authoring/output/`

- `packages/core/src/authoring/output/output.ts` — 73 lines
  - interface: `OutputOptions`
  - function: `output`
- `packages/core/src/authoring/output/output_emitter_ref.ts` — 138 lines
  - class: `OutputEmitterRef`
  - function: `getOutputDestroyRef`
- `packages/core/src/authoring/output/output_ref.ts` — 54 lines
  - interface: `OutputRefSubscription`, `OutputRef`



## `packages/core/src/change_detection/`

- `packages/core/src/change_detection/change_detection.ts` — 55 lines
  - const: `defaultIterableDiffers`, `defaultKeyValueDiffers`
  - exports `SimpleChange`, `SimpleChanges` from `./simple_change`
  - exports `devModeEqual` from `../util/comparison`
  - exports `ChangeDetectorRef` from `./change_detector_ref`
  - exports `ChangeDetectionStrategy` from `./constants`
  - exports `DefaultIterableDiffer`, `DefaultIterableDifferFactory` from `./differs/default_iterable_differ`
  - exports `DefaultKeyValueDifferFactory` from `./differs/default_keyvalue_differ`
  - exports `IterableChangeRecord`, `IterableChanges`, `IterableDiffer`, `IterableDifferFactory`, `IterableDiffers`, `NgIterable`, `TrackByFunction` from `./differs/iterable_differs`
  - exports `KeyValueChangeRecord`, `KeyValueChanges`, `KeyValueDiffer`, `KeyValueDifferFactory`, `KeyValueDiffers` from `./differs/keyvalue_differs`
  - exports `PipeTransform` from `./pipe_transform`
- `packages/core/src/change_detection/change_detector_ref.ts` — 155 lines
  - class: `ChangeDetectorRef`
  - function: `injectChangeDetectorRef`
- `packages/core/src/change_detection/constants.ts` — 45 lines
  - enum: `ChangeDetectionStrategy`
- `packages/core/src/change_detection/lifecycle_hooks.ts` — 246 lines
  - interface: `OnChanges`, `OnInit`, `DoCheck`, `OnDestroy`, `AfterContentInit`, `AfterContentChecked`, `AfterViewInit`, `AfterViewChecked`
- `packages/core/src/change_detection/pipe_transform.ts` — 35 lines
  - interface: `PipeTransform`
- `packages/core/src/change_detection/provide_check_no_changes_config.ts` — 57 lines
  - function: `provideCheckNoChangesConfig`, `provideCheckNoChangesConfig`, `provideCheckNoChangesConfig`
- `packages/core/src/change_detection/simple_change.ts` — 55 lines
  - class: `SimpleChange`
  - type: `SimpleChanges`
- `packages/core/src/change_detection/use_exhaustive_check_no_changes.ts` — 16 lines
  - const: `USE_EXHAUSTIVE_CHECK_NO_CHANGES_DEFAULT`, `UseExhaustiveCheckNoChanges`



## `packages/core/src/change_detection/differs/`

- `packages/core/src/change_detection/differs/default_iterable_differ.ts` — 772 lines
  - class: `DefaultIterableDifferFactory`, `DefaultIterableDiffer`, `IterableChangeRecord_`
- `packages/core/src/change_detection/differs/default_keyvalue_differ.ts` — 294 lines
  - class: `DefaultKeyValueDifferFactory`, `DefaultKeyValueDiffer`
- `packages/core/src/change_detection/differs/iterable_differs.ts` — 265 lines
  - type: `NgIterable`
  - interface: `IterableDiffer`, `IterableChanges`, `IterableChangeRecord`, `TrackByFunction`, `IterableDifferFactory`
  - function: `defaultIterableDiffersFactory`, `getTypeNameForDebugging`
  - class: `IterableDiffers`
- `packages/core/src/change_detection/differs/keyvalue_differs.ts` — 188 lines
  - interface: `KeyValueDiffer`, `KeyValueChanges`, `KeyValueChangeRecord`, `KeyValueDifferFactory`
  - function: `defaultKeyValueDiffersFactory`
  - class: `KeyValueDiffers`



## `packages/core/src/change_detection/scheduling/`

- `packages/core/src/change_detection/scheduling/exhaustive_check_no_changes.ts` — 51 lines
  - function: `exhaustiveCheckNoChangesInterval`
- `packages/core/src/change_detection/scheduling/flags.ts` — 10 lines
  - const: `SCHEDULE_IN_ROOT_ZONE_DEFAULT`
- `packages/core/src/change_detection/scheduling/ng_zone_scheduling.ts` — 282 lines
  - class: `NgZoneChangeDetectionScheduler`, `ZoneStablePendingTask`
  - const: `PROVIDED_NG_ZONE`
  - function: `internalProvideZoneChangeDetection`, `provideZoneChangeDetection`, `getNgZoneOptions`
  - interface: `NgZoneOptions`
- `packages/core/src/change_detection/scheduling/zoneless_scheduling.ts` — 82 lines
  - const enum: `NotificationSource`
  - class: `ChangeDetectionScheduler`
  - const: `ZONELESS_ENABLED`, `PROVIDED_ZONELESS`, `SCHEDULE_IN_ROOT_ZONE`
- `packages/core/src/change_detection/scheduling/zoneless_scheduling_impl.ts` — 397 lines
  - class: `ChangeDetectionSchedulerImpl`
  - function: `provideZonelessChangeDetection`, `provideZonelessChangeDetectionInternal`



## `packages/core/src/compiler/`

- `packages/core/src/compiler/compiler_facade.ts` — 50 lines
  - const enum: `JitCompilerUsage`
  - function: `getCompilerFacade`
  - re-exports * from `./compiler_facade_interface`
- `packages/core/src/compiler/compiler_facade_interface.ts` — 435 lines
  - interface: `ExportedCompilerFacade`, `CompilerFacade`, `CoreEnvironment`, `R3DependencyMetadataFacade`, `R3DeclareDependencyMetadataFacade`, `R3PipeMetadataFacade`, `R3InjectableMetadataFacade`, `R3ServiceMetadataFacade`, `R3NgModuleMetadataFacade`, `R3InjectorMetadataFacade`, `R3HostDirectiveMetadataFacade`, `R3DirectiveMetadataFacade`, `R3ComponentMetadataFacade`, `R3DeclareDirectiveFacade`, `R3DeclareComponentFacade`, `R3DeclareDirectiveDependencyFacade`, `R3DeclarePipeDependencyFacade`, `R3DeclareNgModuleDependencyFacade`, `R3TemplateDependencyFacade`, `R3FactoryDefMetadataFacade`, `R3DeclareFactoryFacade`, `R3DeclareInjectableFacade`, `R3DeclareServiceFacade`, `R3QueryMetadataFacade`, `R3DeclareQueryMetadataFacade`, `R3DeclareInjectorFacade`, `R3DeclareNgModuleFacade`, `R3DeclarePipeFacade`, `ParseSourceSpan`
  - type: `ResourceLoader`, `Provider`, `Type`, `OpaqueValue`, `LegacyInputPartialMapping`, `R3DeclareTemplateDependencyFacade`, `ChangeDetectionStrategy`
  - enum: `FactoryTarget`, `R3TemplateDependencyKind`, `ViewEncapsulation`



## `packages/core/src/debug/`

- `packages/core/src/debug/debug_node.ts` — 756 lines
  - class: `DebugEventListener`, `DebugNode`, `DebugElement`
  - function: `asNativeElements`, `getDebugNode`, `getAllDebugNodes`, `indexDebugNode`, `removeDebugNodeFromIndex`
  - type: `Predicate`



## `packages/core/src/debug/ai/`

- `packages/core/src/debug/ai/di_graph.ts` — 263 lines
  - const: `diGraphTool`
- `packages/core/src/debug/ai/index.ts` — 10 lines
  - exports `registerAiTools` from `./registration`
- `packages/core/src/debug/ai/registration.ts` — 39 lines
  - function: `registerAiTools`
- `packages/core/src/debug/ai/serialized_di_graph.ts` — 120 lines
  - interface: `DiGraph`, `ElementSerializedInjector`, `EnvironmentSerializedInjector`, `NullSerializedInjector`, `SerializedProvider`
  - type: `SerializedInjector`
  - function: `serializeInjector`
- `packages/core/src/debug/ai/signal_graph.ts` — 82 lines
  - const: `signalGraphTool`
- `packages/core/src/debug/ai/traversal.ts` — 10 lines
  - exports `walkLViewDirectives` from `../../render3/util/view_traversal_utils`



## `packages/core/src/defer/`

- `packages/core/src/defer/cleanup.ts` — 65 lines
  - function: `storeTriggerCleanupFn`, `invokeTriggerCleanupFns`, `invokeAllTriggerCleanupFns`
- `packages/core/src/defer/discovery.ts` — 65 lines
  - interface: `DeferBlockDetails`
  - function: `getDeferBlocks`
- `packages/core/src/defer/dom_triggers.ts` — 211 lines
  - function: `onViewportWrapper`, `getTriggerLView`, `getTriggerElement`, `registerDomTrigger`
- `packages/core/src/defer/idle_scheduler.ts` — 167 lines
  - function: `onIdle`, `onIdleWrapper`
  - class: `IdleScheduler`
- `packages/core/src/defer/idle_service.ts` — 95 lines
  - interface: `IdleService`
  - const: `IDLE_SERVICE`
  - function: `provideIdleServiceWith`
- `packages/core/src/defer/instructions.ts` — 887 lines
- `packages/core/src/defer/interfaces.ts` — 353 lines
  - interface: `DehydratedDeferBlock`, `TDeferBlockDetails`, `HydrateTimerTriggerDetails`, `HydrateViewportTriggerDetails`, `LDeferBlockDetails`, `DeferBlockConfig`, `DeferBlockDependencyInterceptor`
  - type: `DependencyResolverFn`, `DeferredLoadingBlockConfig`, `DeferredPlaceholderBlockConfig`, `HydrateTriggerDetails`
  - const enum: `TriggerType`, `TDeferDetailsFlags`, `DeferBlockTrigger`
  - enum: `DeferDependenciesLoadingState`, `DeferBlockState`, `DeferBlockInternalState`, `DeferBlockBehavior`
  - const: `MINIMUM_SLOT`, `LOADING_AFTER_SLOT`, `NEXT_DEFER_BLOCK_STATE`, `DEFER_BLOCK_STATE`, `STATE_IS_FROZEN_UNTIL`, `LOADING_AFTER_CLEANUP_FN`, `TRIGGER_CLEANUP_FNS`, `PREFETCH_TRIGGER_CLEANUP_FNS`, `SSR_UNIQUE_ID`, `SSR_BLOCK_STATE`, `ON_COMPLETE_FNS`, `HYDRATE_TRIGGER_CLEANUP_FNS`
- `packages/core/src/defer/registry.ts` — 118 lines
  - const: `DEHYDRATED_BLOCK_REGISTRY`
  - class: `DehydratedBlockRegistry`
- `packages/core/src/defer/rendering.ts` — 507 lines
  - const: `DEFER_BLOCK_DEPENDENCY_INTERCEPTOR`, `DEFER_BLOCK_CONFIG`
  - function: `renderDeferBlockState`, `renderPlaceholder`, `renderDeferStateAfterResourceLoading`, `shouldTriggerDeferBlock`
- `packages/core/src/defer/timer_scheduler.ts` — 231 lines
  - function: `onTimer`, `scheduleTimerTrigger`
  - class: `TimerScheduler`
- `packages/core/src/defer/triggering.ts` — 743 lines
  - function: `scheduleDelayedTrigger`, `scheduleDelayedPrefetching`, `scheduleDelayedHydrating`, `triggerPrefetching`, `triggerResourceLoading`, `triggerDeferBlock`, `triggerHydrationFromBlockName`, `triggerHydrationForBlockQueue`, `deferBlockHasErrored`, `shouldAttachTrigger`, `hasHydrateTriggers`, `getHydrateTriggers`, `processAndInitTriggers`
- `packages/core/src/defer/utils.ts` — 197 lines
  - function: `getDeferBlockDataIndex`, `getLDeferBlockDetails`, `setLDeferBlockDetails`, `getTDeferBlockDetails`, `setTDeferBlockDetails`, `getTemplateIndexForState`, `getMinimumDurationForState`, `getLoadingBlockAfter`, `addDepsToRegistry`, `getPrimaryBlockTNode`, `assertDeferredDependenciesLoaded`, `isTDeferBlockDetails`, `isDeferBlock`, `trackTriggerForDebugging`



## `packages/core/src/di/`

- `packages/core/src/di/contextual.ts` — 89 lines
  - function: `runInInjectionContext`, `isInInjectionContext`, `assertInInjectionContext`
- `packages/core/src/di/create_injector.ts` — 57 lines
  - function: `createInjector`, `createInjectorWithoutInjectorInstances`
- `packages/core/src/di/forward_ref.ts` — 105 lines
  - interface: `ForwardRefFn`
  - function: `forwardRef`, `resolveForwardRef`, `isForwardRef`
- `packages/core/src/di/host_attribute_token.ts` — 43 lines
  - class: `HostAttributeToken`
- `packages/core/src/di/host_tag_name_token.ts` — 93 lines
  - const: `HOST_TAG_NAME`
- `packages/core/src/di/index.ts` — 58 lines
  - re-exports * from `./metadata`
  - exports `assertInInjectionContext`, `runInInjectionContext` from `./contextual`
  - exports `forwardRef`, `ForwardRefFn`, `resolveForwardRef` from `./forward_ref`
  - exports `HostAttributeToken` from `./host_attribute_token`
  - exports `HOST_TAG_NAME` from `./host_tag_name_token`
  - exports `ENVIRONMENT_INITIALIZER` from `./initializer_token`
  - exports `injectAsync`, `InjectAsyncOptions`, `onIdle`, `PrefetchTrigger` from `./inject_async`
  - exports `Injectable`, `InjectableDecorator`, `InjectableProvider` from `./injectable`
  - exports `InjectionToken` from `./injection_token`
  - exports `DestroyableInjector`, `Injector` from `./injector`
  - exports `inject`, `ɵɵinject`, `ɵɵinvalidFactoryDep` from `./injector_compatibility`
  - exports `INJECTOR` from `./injector_token`
  - exports `InjectableType`, `InjectorType`, `ɵɵdefineInjectable`, `ɵɵdefineInjector` from `./interface/defs`
  - exports `InjectOptions` from `./interface/injector`
  - exports `ClassProvider`, `ClassSansProvider`, `ConstructorProvider`, `ConstructorSansProvider`, `EnvironmentProviders`, `ExistingProvider`, `ExistingSansProvider`, `FactoryProvider`, `FactorySansProvider`, `ModuleWithProviders`, `Provider`, `StaticClassProvider`, `StaticClassSansProvider`, `StaticProvider`, `TypeProvider`, `ValueProvider`, `ValueSansProvider` from `./interface/provider`
  - exports `ɵɵdefineService` from `./interface/service`
  - exports `importProvidersFrom`, `ImportProvidersSource`, `makeEnvironmentProviders`, `provideEnvironmentInitializer` from `./provider_collection`
  - exports `ProviderToken` from `./provider_token`
  - exports `EnvironmentInjector`, `R3Injector as ɵR3Injector` from `./r3_injector`
  - exports `Service`, `ServiceDecorator` from `./service`
- `packages/core/src/di/initializer_token.ts` — 27 lines
  - const: `ENVIRONMENT_INITIALIZER`
- `packages/core/src/di/inject_async.ts` — 146 lines
  - function: `injectAsync`, `injectAsync`, `injectAsync`, `onIdle`
  - interface: `InjectAsyncOptions`
  - type: `PrefetchTrigger`
- `packages/core/src/di/inject_switch.ts` — 82 lines
  - function: `getInjectImplementation`, `setInjectImplementation`, `injectRootLimpMode`, `assertInjectImplementationNotEqual`
- `packages/core/src/di/injectable.ts` — 116 lines
  - type: `InjectableProvider`
  - interface: `InjectableDecorator`, `Injectable`
  - const: `Injectable`
  - exports `compileInjectable`
- `packages/core/src/di/injection_token.ts` — 134 lines
  - class: `InjectionToken`
  - interface: `InjectableDefToken`
- `packages/core/src/di/injector.ts` — 148 lines
  - class: `Injector`
  - interface: `DestroyableInjector`
- `packages/core/src/di/injector_compatibility.ts` — 388 lines
  - const: `THROW_IF_NOT_FOUND`, `NG_TEMP_TOKEN_PATH`, `SOURCE`
  - class: `RetrievingInjector`
  - type: `BackwardsCompatibleInjector`
  - function: `injectInjectorOnly`, `injectInjectorOnly`, `injectInjectorOnly`, `inject`, `inject`, `inject`, `inject`, `inject`, `inject`, `inject`, `convertToBitFlags`, `injectArgs`, `attachInjectFlag`, `getInjectFlag`
  - exports `getCurrentInjector`, `setCurrentInjector` from `../../primitives/di`
- `packages/core/src/di/injector_marker.ts` — 25 lines
  - const enum: `InjectorMarkers`
- `packages/core/src/di/injector_token.ts` — 27 lines
  - const: `INJECTOR`
- `packages/core/src/di/internal_tokens.ts` — 16 lines
  - const: `INJECTOR_DEF_TYPES`
- `packages/core/src/di/metadata.ts` — 251 lines
  - interface: `InjectDecorator`, `Inject`, `OptionalDecorator`, `Optional`, `SelfDecorator`, `Self`, `SkipSelfDecorator`, `SkipSelf`, `HostDecorator`, `Host`
  - const: `Inject`, `Optional`, `Self`, `SkipSelf`, `Host`
- `packages/core/src/di/metadata_attr.ts` — 68 lines
  - interface: `AttributeDecorator`, `Attribute`
  - const: `Attribute`
- `packages/core/src/di/null_injector.ts` — 30 lines
  - class: `NullInjector`
- `packages/core/src/di/provider_collection.ts` — 428 lines
  - function: `makeEnvironmentProviders`, `provideEnvironmentInitializer`, `importProvidersFrom`, `internalImportProvidersFrom`, `walkProviderTree`, `isValueProvider`, `isExistingProvider`, `isFactoryProvider`, `isTypeProvider`, `isClassProvider`
  - type: `ImportProvidersSource`, `SingleProvider`
  - const: `USE_VALUE`
- `packages/core/src/di/provider_token.ts` — 20 lines
  - type: `ProviderToken`
- `packages/core/src/di/r3_injector.ts` — 739 lines
  - function: `getNullInjector`, `providerToFactory`, `assertNotDestroyed`
  - class: `EnvironmentInjector`, `R3Injector`
- `packages/core/src/di/scope.ts` — 21 lines
  - type: `InjectorScope`
  - const: `INJECTOR_SCOPE`
- `packages/core/src/di/service.ts` — 83 lines
  - interface: `ServiceDecorator`, `Service`
  - const: `Service`



## `packages/core/src/di/interface/`

- `packages/core/src/di/interface/defs.ts` — 259 lines
  - interface: `InjectableType`, `InjectorType`, `InjectorTypeWithProviders`
  - function: `getInjectableDef`, `isInjectable`, `getInheritedInjectableDef`, `getInjectorDef`
  - const: `NG_PROV_DEF`, `NG_INJ_DEF`
- `packages/core/src/di/interface/injector.ts` — 82 lines
  - const enum: `DecoratorFlags`, `InternalInjectFlags`
  - interface: `InjectOptions`
- `packages/core/src/di/interface/provider.ts` — 397 lines
  - interface: `ValueSansProvider`, `ValueProvider`, `StaticClassSansProvider`, `StaticClassProvider`, `ConstructorSansProvider`, `ConstructorProvider`, `ExistingSansProvider`, `ExistingProvider`, `FactorySansProvider`, `FactoryProvider`, `TypeProvider`, `ClassSansProvider`, `ClassProvider`, `InternalEnvironmentProviders`, `ModuleWithProviders`
  - type: `StaticProvider`, `Provider`, `EnvironmentProviders`, `ProcessProvidersFunction`
  - function: `isEnvironmentProviders`
- `packages/core/src/di/interface/service.ts` — 37 lines



## `packages/core/src/di/jit/`

- `packages/core/src/di/jit/environment.ts` — 26 lines
  - const: `angularCoreDiEnv`
- `packages/core/src/di/jit/injectable.ts` — 132 lines
  - function: `compileInjectable`
- `packages/core/src/di/jit/service.ts` — 85 lines
  - function: `compileService`
- `packages/core/src/di/jit/util.ts` — 79 lines
  - function: `getReflect`, `reflectDependencies`, `convertDependencies`



## `packages/core/src/hydration/`

- `packages/core/src/hydration/annotate.ts` — 917 lines
  - interface: `HydrationContext`
  - function: `annotateForHydration`
- `packages/core/src/hydration/api.ts` — 388 lines
  - const: `APPLICATION_IS_STABLE_TIMEOUT`, `CLIENT_RENDER_MODE_FLAG`
  - function: `withDomHydration`, `withI18nSupport`, `withIncrementalHydration`
- `packages/core/src/hydration/cache.ts` — 17 lines
  - const: `CACHE_ACTIVE`
- `packages/core/src/hydration/cleanup.ts` — 164 lines
  - function: `removeDehydratedViews`, `removeDehydratedViewList`, `cleanupLContainer`, `cleanupLView`, `cleanupDehydratedViews`, `cleanupHydratedDeferBlocks`
- `packages/core/src/hydration/compression.ts` — 76 lines
  - function: `compressNodeLocation`, `decompressNodeLocation`
- `packages/core/src/hydration/error_handling.ts` — 493 lines
  - function: `validateMatchingNode`, `validateSiblingNodeExists`, `validateNodeExists`, `nodeNotFoundError`, `nodeNotFoundAtPathError`, `unsupportedProjectionOfDomNodes`, `invalidSkipHydrationHost`
- `packages/core/src/hydration/event_replay.ts` — 317 lines
  - function: `withEventReplay`, `collectDomEventsInfo`, `invokeRegisteredReplayListeners`
- `packages/core/src/hydration/i18n.ts` — 678 lines
  - function: `setIsI18nHydrationSupportEnabled`, `isI18nHydrationSupportEnabled`, `prepareI18nBlockForHydration`, `enablePrepareI18nBlockForHydrationImpl`, `isI18nHydrationEnabled`, `getOrComputeI18nChildren`, `trySerializeI18nBlock`, `claimDehydratedIcuCase`, `enableClaimDehydratedIcuCaseImpl`, `cleanupI18nHydrationData`
  - interface: `SerializedI18nBlock`
- `packages/core/src/hydration/incremental_runtime.ts` — 82 lines
  - function: `createDehydratedBlockRegistry`, `runIncrementalHydrationBootstrap`
- `packages/core/src/hydration/interfaces.ts` — 306 lines
  - const: `REFERENCE_NODE_HOST`, `REFERENCE_NODE_BODY`, `NODE_NAVIGATION_STEP_FIRST_CHILD`, `NODE_NAVIGATION_STEP_NEXT_SIBLING`, `ELEMENT_CONTAINERS`, `TEMPLATES`, `CONTAINERS`, `MULTIPLIER`, `NUM_ROOT_NODES`, `TEMPLATE_ID`, `NODES`, `DISCONNECTED_NODES`, `I18N_DATA`, `DEFER_BLOCK_ID`, `DEFER_BLOCK_STATE`, `DEFER_PARENT_BLOCK_ID`, `DEFER_HYDRATE_TRIGGERS`, `DEFER_PREFETCH_TRIGGERS`
  - type: `NodeNavigationStep`
  - interface: `SerializedElementContainers`, `SerializedView`, `SerializedContainerView`, `SerializedDeferBlock`, `SerializedTriggerDetails`, `DehydratedView`, `DehydratedContainerView`, `DehydratedIcuData`, `BlockSummary`, `ElementTrigger`
- `packages/core/src/hydration/node_lookup_utils.ts` — 436 lines
  - function: `isDisconnectedNode`, `isDisconnectedRNode`, `locateI18nRNodeByIndex`, `tryLocateRNodeByPath`, `locateNextRNode`, `siblingAfter`, `navigateBetween`, `calcPathBetween`, `calcPathForNode`, `gatherDeferBlocksCommentNodes`
- `packages/core/src/hydration/skip_hydration.ts` — 86 lines
  - const: `SKIP_HYDRATION_ATTR_NAME`
  - function: `hasSkipHydrationAttrOnTNode`, `hasSkipHydrationAttrOnRElement`, `hasInSkipHydrationBlockFlag`, `isInSkipHydrationBlock`, `isI18nInSkipHydrationBlock`
- `packages/core/src/hydration/tokens.ts` — 91 lines
  - const: `IS_HYDRATION_DOM_REUSE_ENABLED`, `PRESERVE_HOST_CONTENT_DEFAULT`, `PRESERVE_HOST_CONTENT`, `IS_I18N_HYDRATION_ENABLED`, `IS_EVENT_REPLAY_ENABLED`, `EVENT_REPLAY_ENABLED_DEFAULT`, `EVENT_REPLAY_QUEUE`, `IS_INCREMENTAL_HYDRATION_ENABLED`, `JSACTION_BLOCK_ELEMENT_MAP`, `IS_ENABLED_BLOCKING_INITIAL_NAVIGATION`
  - type: `EventReplayQueue`
- `packages/core/src/hydration/utils.ts` — 811 lines
  - const: `NGH_DATA_KEY`, `TRANSFER_STATE_DEFER_BLOCKS_INFO`, `NGH_DEFER_BLOCKS_KEY`, `NGH_ATTR_NAME`, `SSR_CONTENT_INTEGRITY_MARKER`
  - function: `isInternalHydrationTransferStateKey`, `retrieveHydrationInfoImpl`, `enableRetrieveHydrationInfoImpl`, `retrieveHydrationInfo`, `getLNodeForHydration`, `processTextNodeMarkersBeforeHydration`, `readHydrationInfo`, `markRNodeAsClaimedByHydration`, `markRNodeAsSkippedByHydration`, `countBlocksSkippedByHydration`, `markRNodeAsHavingHydrationMismatch`, `isRNodeClaimedForHydration`, `setSegmentHead`, `getSegmentHead`, `isIncrementalHydrationEnabled`, `resetIncrementalHydrationEnabledWarnedForTests`, `warnIncrementalHydrationNotConfigured`, `assertSsrIdDefined`, `getNgContainerSize`, `isSerializedElementContainer`, `getSerializedContainerViews`, `calcSerializedContainerSize`, `initDisconnectedNodes`, `isDisconnectedNode`, `canHydrateNode`, `processTextNodeBeforeSerialization`, `convertHydrateTriggersToJsAction`, `getParentBlockHydrationQueue`, `appendDeferBlocksToJSActionMap`, `retrieveDeferBlockDataImpl`, `enableRetrieveDeferBlockDataImpl`, `retrieveDeferBlockData`, `processBlockData`, `verifySsrContentsIntegrity`
  - const enum: `TextNodeMarker`
  - enum: `HydrationStatus`
  - type: `HydrationInfo`, `HydratedNode`
- `packages/core/src/hydration/views.ts` — 204 lines
  - function: `locateDehydratedViewsInContainer`, `enableFindMatchingDehydratedViewImpl`, `findMatchingDehydratedView`, `findAndReconcileMatchingDehydratedViewsImpl`, `findAndReconcileMatchingDehydratedViews`



## `packages/core/src/i18n/`

- `packages/core/src/i18n/locale_data_api.ts` — 186 lines
  - function: `registerLocaleData`, `findLocaleData`, `getLocaleCurrencyCode`, `getLocalePluralCase`, `getLocaleData`, `unregisterAllLocaleData`
  - const: `LocaleDataIndex`
  - const enum: `ExtraLocaleDataIndex`, `CurrencyIndex`
- `packages/core/src/i18n/locale_en.ts` — 21 lines
  - has a default export
- `packages/core/src/i18n/localization.ts` — 32 lines
  - function: `getPluralCase`
  - const: `DEFAULT_LOCALE_ID`, `USD_CURRENCY_CODE`
- `packages/core/src/i18n/tokens.ts` — 238 lines
  - function: `getGlobalLocale`
  - const: `LOCALE_ID`, `DEFAULT_CURRENCY_CODE`, `TRANSLATIONS`, `TRANSLATIONS_FORMAT`
  - enum: `MissingTranslationStrategy`
- `packages/core/src/i18n/utils.ts` — 19 lines
  - function: `isDetachedByI18n`



## `packages/core/src/interface/`

- `packages/core/src/interface/foreign_component.ts` — 71 lines
  - const: `RENDER`, `ON_DESTROY`, `CONTENT_ADAPTER`, `GET_CONTEXT`
  - type: `ForeignRenderFn`, `ForeignGetContextFn`, `ForeignOnDestroyFn`, `ForeignContentAdapterFn`
  - interface: `ForeignComponent`
- `packages/core/src/interface/type.ts` — 69 lines
  - const: `Type`
  - function: `isType`
  - interface: `AbstractType`, `Type`
  - type: `Writable`



## `packages/core/src/internal/`

- `packages/core/src/internal/get_closest_component_name.ts` — 74 lines
  - function: `getClosestComponentName`, `getComponentName`
- `packages/core/src/internal/get_current_closest_component_instance.ts` — 38 lines
  - function: `getCurrentClosestComponentInstance`



## `packages/core/src/linker/`

- `packages/core/src/linker/compiler.ts` — 98 lines
  - class: `Compiler`, `CompilerFactory`
  - type: `CompilerOptions`
  - const: `COMPILER_OPTIONS`
- `packages/core/src/linker/component_factory.ts` — 80 lines
  - class: `ComponentRef`
- `packages/core/src/linker/destroy_ref.ts` — 98 lines
  - class: `DestroyRef`, `NodeInjectorDestroyRef`
- `packages/core/src/linker/element_ref.ts` — 92 lines
  - function: `injectElementRef`, `createElementRef`, `unwrapElementRef`
  - class: `ElementRef`
- `packages/core/src/linker/ng_module_factory.ts` — 62 lines
  - class: `NgModuleRef`, `NgModuleFactory`
  - interface: `InternalNgModuleRef`
- `packages/core/src/linker/ng_module_factory_loader.ts` — 47 lines
  - function: `getModuleFactory`, `getNgModuleById`
- `packages/core/src/linker/ng_module_factory_loader_impl.ts` — 11 lines
  - has a default export
- `packages/core/src/linker/ng_module_registration.ts` — 70 lines
  - function: `registerNgModuleType`, `clearModulesForTest`, `getRegisteredNgModuleType`, `setAllowDuplicateNgModuleIdsForTest`
- `packages/core/src/linker/query_list.ts` — 191 lines
  - class: `QueryList`
- `packages/core/src/linker/template_ref.ts` — 141 lines
  - class: `TemplateRef`
  - function: `injectTemplateRef`, `createTemplateRef`
- `packages/core/src/linker/view_container_ref.ts` — 834 lines
  - class: `ViewContainerRef`
  - function: `injectViewContainerRef`, `createContainerRef`, `populateDehydratedViewsInLContainer`, `enableLocateOrCreateContainerRefImpl`
- `packages/core/src/linker/view_ref.ts` — 103 lines
  - class: `ViewRef`, `EmbeddedViewRef`



## `packages/core/src/metadata/`

- `packages/core/src/metadata/di.ts` — 505 lines
  - interface: `AttributeDecorator`, `Attribute`, `Query`, `ContentChildrenDecorator`, `ContentChildDecorator`, `ViewChildrenDecorator`, `ViewChildDecorator`
  - const: `emitDistinctChangesOnlyDefaultValue`, `ContentChildren`, `ContentChild`, `ViewChildren`, `ViewChild`
  - class: `Query`
  - type: `ContentChildren`, `ContentChild`, `ViewChildren`, `ViewChild`
- `packages/core/src/metadata/directives.ts` — 1103 lines
  - interface: `DirectiveDecorator`, `Directive`, `ComponentDecorator`, `Component`, `PipeDecorator`, `Pipe`, `InputDecorator`, `Input`, `OutputDecorator`, `Output`, `HostBindingDecorator`, `HostBinding`, `HostListenerDecorator`, `HostListener`
  - const: `Directive`, `Component`, `Pipe`, `Input`, `Output`, `HostBinding`, `HostListener`
- `packages/core/src/metadata/do_bootstrap.ts` — 37 lines
  - interface: `DoBootstrap`
- `packages/core/src/metadata/ng_module.ts` — 225 lines
  - interface: `NgModuleDecorator`, `NgModule`
  - const: `NgModule`
- `packages/core/src/metadata/ng_module_def.ts` — 78 lines
  - interface: `NgModuleType`, `NgModuleTransitiveScopes`, `NgModuleDef`
- `packages/core/src/metadata/resource_loading.ts` — 174 lines
  - function: `resolveComponentResources`, `maybeQueueResolutionOfComponentResources`, `isComponentDefPendingResolution`, `componentNeedsResolution`, `clearResolutionOfComponentResourcesQueue`, `restoreComponentResolutionQueue`, `isComponentResourceResolutionQueueEmpty`
- `packages/core/src/metadata/schema.ts` — 48 lines
  - interface: `SchemaMetadata`
  - const: `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`
- `packages/core/src/metadata/view.ts` — 56 lines
  - enum: `ViewEncapsulation`



## `packages/core/src/platform/`

- `packages/core/src/platform/bootstrap.ts` — 239 lines
  - const: `ENABLE_ROOT_COMPONENT_BOOTSTRAP`
  - interface: `BootstrapConfig`, `ModuleBootstrapConfig`, `ApplicationBootstrapConfig`
  - function: `bootstrap`, `bootstrap`, `bootstrap`, `setModuleBootstrapImpl`
- `packages/core/src/platform/platform.ts` — 228 lines
  - function: `createPlatform`, `createPlatformFactory`, `assertPlatform`, `getPlatform`, `destroyPlatform`, `createOrReusePlatformInjector`, `providePlatformInitializer`
- `packages/core/src/platform/platform_core_providers.ts` — 21 lines
  - const: `platformCore`
- `packages/core/src/platform/platform_destroy_listeners.ts` — 20 lines
  - const: `PLATFORM_DESTROY_LISTENERS`
- `packages/core/src/platform/platform_ref.ts` — 149 lines
  - class: `PlatformRef`



## `packages/core/src/reflection/`

- `packages/core/src/reflection/platform_reflection_capabilities.ts` — 30 lines
  - interface: `PlatformReflectionCapabilities`
- `packages/core/src/reflection/reflection_capabilities.ts` — 304 lines
  - const: `ES5_DELEGATE_CTOR`, `ES2015_INHERITED_CLASS`, `ES2015_INHERITED_CLASS_WITH_CTOR`, `ES2015_INHERITED_CLASS_WITH_DELEGATE_CTOR`
  - function: `isDelegateCtor`
  - class: `ReflectionCapabilities`



## `packages/core/src/render/`

- `packages/core/src/render/api.ts` — 286 lines
  - class: `RendererFactory2`, `Renderer2`
  - function: `injectRenderer2`
  - const enum: `AnimationRendererType`
  - interface: `ListenerOptions`
- `packages/core/src/render/api_flags.ts` — 66 lines
  - interface: `RendererType2`
  - enum: `RendererStyleFlags2`



## `packages/core/src/render3/`

- `packages/core/src/render3/apply_value_input_field.ts` — 23 lines
  - function: `applyValueToInputField`
- `packages/core/src/render3/assert.ts` — 200 lines
  - function: `assertTNodeForLView`, `assertTNodeCreationIndex`, `assertTNodeForTView`, `assertTNode`, `assertTIcu`, `assertComponentType`, `assertNgModuleType`, `assertCurrentTNodeIsParent`, `assertHasParent`, `assertLContainer`, `assertLViewOrUndefined`, `assertLView`, `assertFirstCreatePass`, `assertFirstUpdatePass`, `assertDirectiveDef`, `assertIndexInDeclRange`, `assertIndexInExpandoRange`, `assertBetween`, `assertProjectionSlots`, `assertParentView`, `assertNodeInjector`
- `packages/core/src/render3/bindings.ts` — 117 lines
  - function: `updateBinding`, `getBinding`, `bindingUpdated`, `bindingUpdated2`, `bindingUpdated3`, `bindingUpdated4`
- `packages/core/src/render3/chained_injector.ts` — 46 lines
  - class: `ChainedInjector`
- `packages/core/src/render3/collect_native_nodes.ts` — 124 lines
  - function: `collectNativeNodes`, `collectNativeNodesInLContainer`
- `packages/core/src/render3/component.ts` — 225 lines
  - function: `createComponent`, `reflectComponentType`
  - interface: `ComponentMirror`
- `packages/core/src/render3/component_ref.ts` — 641 lines
  - function: `inferTagNameFromDefinition`
  - class: `ComponentFactory`, `ComponentRef`
- `packages/core/src/render3/context_discovery.ts` — 355 lines
  - function: `getLContext`, `getComponentViewByInstance`, `attachLViewId`, `readLView`, `attachPatchData`, `readPatchedData`, `readPatchedLView`, `isComponentInstance`, `isDirectiveInstance`, `getDirectivesAtNodeIndex`, `getComponentAtNodeIndex`, `discoverLocalRefs`
- `packages/core/src/render3/def_getters.ts` — 88 lines
  - function: `getNgModuleDef`, `getNgModuleDefOrThrow`, `getComponentDef`, `getDirectiveDefOrThrow`, `getDirectiveDef`, `getPipeDef`, `isStandalone`
- `packages/core/src/render3/definition.ts` — 777 lines
  - function: `extractDirectiveDef`, `extractDefListOrFactory`
  - const: `GENERATED_COMP_IDS`
- `packages/core/src/render3/definition_factory.ts` — 38 lines
  - type: `FactoryFn`
  - function: `getFactoryDef`, `getFactoryDef`, `getFactoryDef`
- `packages/core/src/render3/di.ts` — 1060 lines
  - function: `setIncludeViewProviders`, `bloomAdd`, `getOrCreateNodeInjectorForNode`, `getInjectorIndex`, `getParentInjectorLocation`, `diPublicInInjector`, `injectAttributeImpl`, `getOrCreateInjectable`, `locateDirectiveOrProvider`, `getNodeInjectable`, `bloomHashBitOrFactory`, `bloomHasToken`, `getNodeInjectorLView`, `getNodeInjectorTNode`, `createNodeInjector`
  - class: `NodeInjector`
- `packages/core/src/render3/di_setup.ts` — 432 lines
  - function: `providersResolver`
- `packages/core/src/render3/dom_node_manipulation.ts` — 156 lines
  - function: `createTextNode`, `updateTextNode`, `createCommentNode`, `createElementNode`, `nativeInsertBefore`, `nativeAppendChild`, `nativeAppendOrInsertBefore`, `nativeRemoveNode`, `clearElementContents`, `setupStaticAttributes`
- `packages/core/src/render3/dynamic_bindings.ts` — 246 lines
  - const: `BINDING`
  - interface: `Binding`, `BindingInternal`, `DirectiveWithBindings`
  - function: `inputBinding`, `outputBinding`, `twoWayBinding`
- `packages/core/src/render3/errors.ts` — 173 lines
  - function: `assertStandaloneComponentType`, `assertComponentDef`, `throwMultipleComponentError`, `throwErrorIfNoChangesMode`, `getExpressionChangedErrorDetails`
- `packages/core/src/render3/errors_di.ts` — 163 lines
  - function: `cyclicDependencyError`, `cyclicDependencyErrorWithDetails`, `throwMixedMultiProviderError`, `throwInvalidProviderError`, `throwProviderNotFoundError`, `prependTokenToDependencyPath`, `augmentRuntimeError`, `createRuntimeError`, `getRuntimeErrorCode`
- `packages/core/src/render3/fields.ts` — 36 lines
  - const: `NG_COMP_DEF`, `NG_DIR_DEF`, `NG_PIPE_DEF`, `NG_MOD_DEF`, `NG_FACTORY_DEF`, `NG_ELEMENT_ID`, `NG_ENV_ID`
- `packages/core/src/render3/foreign_context.ts` — 29 lines
  - const: `FOREIGN_CONTEXT`
  - function: `provideForeignRootContext`
- `packages/core/src/render3/foreign_import.ts` — 45 lines
  - function: `foreignImport`
- `packages/core/src/render3/foreign_view.ts` — 135 lines
  - class: `ForeignViewRef`
  - function: `createForeignView`
- `packages/core/src/render3/global_utils_api.ts` — 33 lines
  - exports `applyChanges` from `./util/change_detection_utils`
  - exports `enableProfiling` from `./debug/chrome_dev_tools_performance`
  - exports `DirectiveDebugMetadata`, `getComponent`, `getContext`, `getDirectiveMetadata`, `getDirectives`, `getHostElement`, `getInjector`, `getListeners`, `getOwningComponent`, `getRootComponents`, `Listener` from `./util/discovery_utils`
- `packages/core/src/render3/hmr.ts` — 410 lines
- `packages/core/src/render3/hooks.ts` — 325 lines
  - function: `registerPreOrderHooks`, `registerPostOrderHooks`, `executeCheckHooks`, `executeInitAndCheckHooks`, `incrementInitPhaseFlags`
- `packages/core/src/render3/index.ts` — 259 lines
  - exports `NgModuleType` from `../metadata/ng_module_def`
  - exports `ComponentFactory`, `ComponentRef` from `./component_ref`
  - exports `ɵɵgetInheritedFactory` from `./di`
  - exports `getLocaleId`, `setLocaleId` from `./i18n/i18n_locale_id`
  - exports `ɵɵadvance`, `ɵɵariaProperty`, `ɵɵattribute`, `ɵɵinterpolate`, `ɵɵinterpolate1`, `ɵɵinterpolate2`, `ɵɵinterpolate3`, `ɵɵinterpolate4`, `ɵɵinterpolate5`, `ɵɵinterpolate6`, `ɵɵinterpolate7`, `ɵɵinterpolate8`, `ɵɵinterpolateV`, `ɵɵclassMap`, `ɵɵclassProp`, `ɵɵcomponentInstance`, `ɵɵdirectiveInject`, `ɵɵdomElement`, `ɵɵdomElementStart`, `ɵɵdomElementEnd`, `ɵɵdomElementContainer`, `ɵɵdomElementContainerStart`, `ɵɵdomElementContainerEnd`, `ɵɵdomTemplate`, …(+94) from `./instructions/all`
  - exports `ɵɵdeferEnableTimerScheduling`, `DEFER_BLOCK_DEPENDENCY_INTERCEPTOR as ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR`, `DEFER_BLOCK_CONFIG as ɵDEFER_BLOCK_CONFIG` from `../defer/rendering`
  - exports `ɵɵenableIncrementalHydrationRuntime` from `../hydration/incremental_runtime`
  - exports `DeferBlockDependencyInterceptor as ɵDeferBlockDependencyInterceptor` from `../defer/interfaces`
  - exports `ɵɵi18n`, `ɵɵi18nApply`, `ɵɵi18nAttributes`, `ɵɵi18nEnd`, `ɵɵi18nExp`, `ɵɵi18nPostprocess`, `ɵɵi18nStart` from `./instructions/i18n`
  - exports `RenderFlags` from `./interfaces/definition`
  - exports `AttributeMarker` from `./interfaces/attribute_marker`
  - exports `CssSelectorList`, `ProjectionSlots` from `./interfaces/projection`
  - exports `setClassMetadata`, `setClassMetadataAsync` from `./metadata`
  - exports `NgModuleFactory`, `NgModuleRef`, `createEnvironmentInjector` from `./ng_module_ref`
  - exports `ɵɵpipe`, `ɵɵpipeBind1`, `ɵɵpipeBind2`, `ɵɵpipeBind3`, `ɵɵpipeBind4`, `ɵɵpipeBindV` from `./pipe`
  - exports `ɵɵpureFunction0`, `ɵɵpureFunction1`, `ɵɵpureFunction2`, `ɵɵpureFunction3`, `ɵɵpureFunction4`, `ɵɵpureFunction5`, `ɵɵpureFunction6`, `ɵɵpureFunction7`, `ɵɵpureFunction8`, `ɵɵpureFunctionV` from `./pure_function`
  - exports `ɵɵdisableBindings`, `ɵɵenableBindings`, `ɵɵresetView`, `ɵɵrestoreView` from `./state`
  - exports `NO_CHANGE` from `./tokens`
  - exports `ɵɵresolveBody`, `ɵɵresolveDocument`, `ɵɵresolveWindow` from `./util/misc_utils`
  - exports `ɵɵtemplateRefExtractor` from `./view_engine_compatibility_prebound`
  - exports `ɵɵgetComponentDepsFactory` from `./local_compilation`
  - exports `ɵsetClassDebugInfo` from `./debug/set_debug_info`
  - exports `ɵɵreplaceMetadata`, `ɵɵgetReplaceMetadataURL` from `./hmr`
  - exports `store` from `./util/view_utils`
  - exports `ComponentDef`, `ComponentTemplate`, `ComponentType`, `BaseDirectiveDebugMetadata`, `AngularDirectiveDebugMetadata`, `AngularComponentDebugMetadata`, `AcxChangeDetectionStrategy`, `AcxViewEncapsulation`, `AcxDirectiveDebugMetadata`, `AcxComponentDebugMetadata`, `WizComponentDebugMetadata`, `ControlDirectiveHost`, `DirectiveDebugMetadata`, `DirectiveDef`, `DirectiveType`, `getComponent`, `getDirectiveMetadata`, `getDirectives`, `getHostElement`, `getRenderedText`, `PipeDef`, `ɵɵComponentDeclaration`, `ɵɵdefineComponent`, `ɵɵdefineDirective`, …(+15)
- `packages/core/src/render3/list_reconciliation.ts` — 476 lines
  - class: `LiveCollection`, `UniqueValueMultiKeyMap`
  - function: `reconcile`
- `packages/core/src/render3/local_compilation.ts` — 32 lines
- `packages/core/src/render3/metadata.ts` — 122 lines
  - function: `getAsyncClassMetadataFn`, `hasAsyncClassMetadata`, `setClassMetadataAsync`, `setClassMetadata`
- `packages/core/src/render3/namespaces.ts` — 15 lines
  - const: `NAMESPACE_URIS`
- `packages/core/src/render3/ng_module_ref.ts` — 174 lines
  - function: `createNgModule`, `createNgModuleRefWithProviders`, `createEnvironmentInjector`
  - class: `NgModuleRef`, `NgModuleFactory`, `EnvironmentNgModuleRefAdapter`
- `packages/core/src/render3/node_animations.ts` — 267 lines
  - function: `maybeQueueEnterAnimation`, `runLeaveAnimationsWithCallback`
- `packages/core/src/render3/node_assert.ts` — 48 lines
  - function: `assertTNodeType`, `assertPureTNodeType`
- `packages/core/src/render3/node_manipulation.ts` — 1143 lines
  - const enum: `WalkTNodeTreeAction`
  - function: `removeViewFromDOM`, `addViewToDOM`, `detachViewFromDOM`, `destroyViewTree`, `detachMovedView`, `destroyLView`, `getParentRElement`, `getClosestRElement`, `getInsertInFrontOfRNodeWithNoI18n`, `setI18nHandling`, `appendChild`, `getFirstNativeNode`, `getProjectionNodes`, `getBeforeNodeForView`, `applyView`, `applyView`, `applyView`, `applyProjection`, `applyStyling`
- `packages/core/src/render3/node_manipulation_i18n.ts` — 82 lines
  - function: `getInsertInFrontOfRNodeWithI18n`, `processI18nInsertBefore`
- `packages/core/src/render3/node_selector_matcher.ts` — 473 lines
  - function: `isInlineTemplate`, `isNodeMatchingSelector`, `isNodeMatchingSelectorList`, `getProjectAsAttrValue`, `isSelectorInSelectorList`, `stringifyCSSSelectorList`, `extractAttrsAndClassesFromSelector`
- `packages/core/src/render3/pipe.ts` — 321 lines
- `packages/core/src/render3/profiler.ts` — 61 lines
  - function: `setProfiler`
  - const: `profiler`
- `packages/core/src/render3/pure_function.ts` — 488 lines
  - function: `pureFunction1Internal`, `pureFunction2Internal`, `pureFunction3Internal`, `pureFunction4Internal`, `pureFunctionVInternal`
- `packages/core/src/render3/reactive_lview_consumer.ts` — 116 lines
  - interface: `ReactiveLViewConsumer`
  - function: `getOrBorrowReactiveLViewConsumer`, `maybeReturnReactiveLViewConsumer`, `getOrCreateTemporaryConsumer`, `viewShouldHaveReactiveConsumer`, `isReactiveLViewConsumer`
  - const: `REACTIVE_LVIEW_CONSUMER_NODE`, `TEMPORARY_CONSUMER_NODE`
- `packages/core/src/render3/scope.ts` — 90 lines
- `packages/core/src/render3/standalone_service.ts` — 68 lines
  - class: `StandaloneService`
- `packages/core/src/render3/state.ts` — 844 lines
  - enum: `CheckNoChangesMode`
  - function: `specOnlyIsInstructionStateEmpty`, `getElementDepthCount`, `increaseElementDepthCount`, `decreaseElementDepthCount`, `getBindingsEnabled`, `isInSkipHydrationBlock`, `isSkipHydrationRootTNode`, `enterSkipHydrationBlock`, `leaveSkipHydrationBlock`, `getLView`, `getTView`, `getCurrentTNode`, `getCurrentTNodePlaceholderOk`, `getCurrentParentTNode`, `setCurrentTNode`, `isCurrentTNodeParent`, `setCurrentTNodeAsNotParent`, `getContextLView`, `isInCheckNoChangesMode`, `isExhaustiveCheckNoChanges`, `setIsInCheckNoChangesMode`, `isRefreshingViews`, `setIsRefreshingViews`, `getBindingRoot`, `getBindingIndex`, `setBindingIndex`, `nextBindingIndex`, `incrementBindingIndex`, `isInI18nBlock`, `setInI18nBlock`, `setBindingRootForHostBindings`, `getCurrentDirectiveIndex`, `setCurrentDirectiveIndex`, `getCurrentDirectiveDef`, `getCurrentQueryIndex`, `setCurrentQueryIndex`, `enterDI`, `enterView`, `leaveView`, `nextContextImpl`, `getSelectedIndex`, `setSelectedIndex`, `getSelectedTNode`, `namespaceHTMLInternal`, `getNamespace`, `wasLastNodeCreated`, `lastNodeWasCreated`
  - const: `leaveDI`
- `packages/core/src/render3/tnode_manipulation.ts` — 344 lines
  - function: `getOrCreateTNode`, `getOrCreateTNode`, `getOrCreateTNode`, `getOrCreateTNode`, `getOrCreateTNode`, `getOrCreateTNode`, `getOrCreateTNode`, `getOrCreateTNode`, `createTNodeAtIndex`, `createTNode`, `createTNode`, `createTNode`, `createTNode`, `createTNode`, `createTNode`, `createTNode`, `createTNode`
- `packages/core/src/render3/tokens.ts` — 17 lines
  - interface: `NO_CHANGE`
  - const: `NO_CHANGE`
- `packages/core/src/render3/view_context.ts` — 29 lines
  - class: `ViewContext`
  - function: `injectViewContext`
- `packages/core/src/render3/view_engine_compatibility_prebound.ts` — 22 lines
- `packages/core/src/render3/view_manipulation.ts` — 88 lines
  - function: `createAndRenderEmbeddedLView`, `shouldAddViewToDom`
- `packages/core/src/render3/view_ref.ts` — 390 lines
  - class: `ViewRef`
  - function: `isViewDirty`, `markForRefresh`



## `packages/core/src/render3/after_render/`

- `packages/core/src/render3/after_render/api.ts` — 82 lines
  - const enum: `AfterRenderPhase`
  - interface: `AfterRenderRef`
- `packages/core/src/render3/after_render/hooks.ts` — 473 lines
  - interface: `AfterRenderOptions`
  - function: `afterEveryRender`, `afterEveryRender`, `afterEveryRender`, `afterNextRender`, `afterNextRender`, `afterNextRender`
  - const: `NOOP_AFTER_RENDER_REF`
- `packages/core/src/render3/after_render/manager.ts` — 231 lines
  - class: `AfterRenderManager`, `AfterRenderImpl`, `AfterRenderSequence`
  - const: `AFTER_RENDER_PHASES`
  - type: `AfterRenderHook`, `AfterRenderHooks`
- `packages/core/src/render3/after_render/view.ts` — 19 lines
  - function: `addAfterRenderSequencesForView`



## `packages/core/src/render3/debug/`

- `packages/core/src/render3/debug/chrome_dev_tools_performance.ts` — 388 lines
  - function: `getComponentInstanceDeepLinkId`, `assignComponentInstanceDeepLinkId`, `enableProfiling`
- `packages/core/src/render3/debug/framework_injector_profiler.ts` — 360 lines
  - function: `getFrameworkDIDebugData`, `setupFrameworkInjectorProfiler`
- `packages/core/src/render3/debug/injector_profiler.ts` — 392 lines
  - const enum: `InjectorProfilerEventType`
  - interface: `InjectorProfilerContext`, `InjectedServiceEvent`, `InjectorToCreateInstanceEvent`, `InjectorCreatedInstanceEvent`, `ProviderConfiguredEvent`, `EffectCreatedEvent`, `AfterRenderEffectPhaseCreatedEvent`, `ProviderRecord`, `InjectorCreatedInstance`, `InjectedService`, `InjectorProfiler`
  - type: `InjectorProfilerEvent`
  - function: `getInjectorProfilerContext`, `setInjectorProfilerContext`, `setInjectorProfiler`, `injectorProfiler`, `emitProviderConfiguredEvent`, `emitInjectorToCreateInstanceEvent`, `emitInstanceCreatedByInjectorEvent`, `emitInjectEvent`, `emitEffectCreatedEvent`, `emitAfterRenderEffectPhaseCreatedEvent`, `runInInjectorProfilerContext`
- `packages/core/src/render3/debug/set_debug_info.ts` — 27 lines
- `packages/core/src/render3/debug/special_providers.ts` — 28 lines
  - function: `registerSpecialProvider`, `getAllSpecialProviders`



## `packages/core/src/render3/deps_tracker/`

- `packages/core/src/render3/deps_tracker/api.ts` — 136 lines
  - interface: `NgModuleScope`, `StandaloneComponentScope`, `ComponentDependencies`, `DepsTrackerApi`
- `packages/core/src/render3/deps_tracker/deps_tracker.ts` — 319 lines
  - const: `depsTracker`, `TEST_ONLY`



## `packages/core/src/render3/features/`

- `packages/core/src/render3/features/control_feature.ts` — 25 lines
- `packages/core/src/render3/features/external_styles_feature.ts` — 43 lines
- `packages/core/src/render3/features/host_directives_feature.ts` — 346 lines
- `packages/core/src/render3/features/inherit_definition_feature.ts` — 229 lines
  - function: `getSuperType`
- `packages/core/src/render3/features/ng_onchanges_feature.ts` — 142 lines
  - function: `getNgOnChangesFeatureImpl`
- `packages/core/src/render3/features/providers_feature.ts` — 59 lines



## `packages/core/src/render3/i18n/`

- `packages/core/src/render3/i18n/i18n_apply.ts` — 602 lines
  - function: `setMaskBit`, `applyI18n`, `enableLocateOrCreateI18nNodeImpl`, `applyCreateOpCodes`
- `packages/core/src/render3/i18n/i18n_debug.ts` — 266 lines
  - function: `i18nCreateOpCodesToString`, `i18nUpdateOpCodesToString`, `icuCreateOpCodesToString`, `i18nRemoveOpCodesToString`
- `packages/core/src/render3/i18n/i18n_icu_container_visitor.ts` — 114 lines
  - interface: `IcuIteratorState`
  - function: `icuContainerIteratorNext`, `loadIcuContainerVisitor`, `createIcuIterator`
- `packages/core/src/render3/i18n/i18n_insert_before_index.ts` — 92 lines
  - function: `addTNodeAndUpdateInsertBeforeIndex`
- `packages/core/src/render3/i18n/i18n_locale_id.ts` — 41 lines
  - function: `setLocaleId`, `getLocaleId`
- `packages/core/src/render3/i18n/i18n_parse.ts` — 1013 lines
  - function: `i18nStartFirstCreatePass`, `i18nAttributesFirstPass`, `getTranslationForTemplate`
- `packages/core/src/render3/i18n/i18n_postprocess.ts` — 136 lines
  - function: `i18nPostprocess`
- `packages/core/src/render3/i18n/i18n_tree_shaking.ts` — 50 lines
  - function: `icuContainerIterate`, `ensureIcuContainerVisitorLoaded`
- `packages/core/src/render3/i18n/i18n_util.ts` — 162 lines
  - function: `getTIcu`, `setTIcu`, `setTNodeInsertBeforeIndex`, `createTNodePlaceholder`, `getCurrentICUCaseIndex`, `getParentFromIcuCreateOpCode`, `getRefFromIcuCreateOpCode`, `getInstructionFromIcuCreateOpCode`, `icuCreateOpCode`, `isRootTemplateMessage`



## `packages/core/src/render3/instructions/`

- `packages/core/src/render3/instructions/advance.ts` — 85 lines
  - function: `selectIndexInternal`
- `packages/core/src/render3/instructions/all.ts` — 68 lines
  - re-exports * from `../../defer/instructions`
  - re-exports * from `./advance`
  - re-exports * from `./aria_property`
  - re-exports * from `./attribute`
  - re-exports * from `./animation`
  - re-exports * from `./change_detection`
  - re-exports * from `./component_instance`
  - re-exports * from `./control`
  - re-exports * from `./control_flow`
  - re-exports * from `./di`
  - re-exports * from `./di_attr`
  - re-exports * from `./element`
  - re-exports * from `./element_container`
  - re-exports * from `./foreign_component`
  - re-exports * from `./get_current_view`
  - re-exports * from `./dom_property`
  - re-exports * from `./i18n`
  - re-exports * from `./listener`
  - re-exports * from `./namespace`
  - re-exports * from `./next_context`
  - re-exports * from `./projection`
  - re-exports * from `./property`
  - re-exports * from `./queries`
  - re-exports * from `./queries_signals`
  - re-exports * from `./storage`
  - re-exports * from `./styling`
  - re-exports * from `./template`
  - re-exports * from `./text`
  - re-exports * from `./text_interpolation`
  - re-exports * from `./two_way`
  - re-exports * from `./let_declaration`
  - re-exports * from `./attach_source_locations`
  - re-exports * from `./value_interpolation`
  - re-exports * from `./arrow_function`
  - exports `ɵgetUnknownElementStrictMode`, `ɵgetUnknownPropertyStrictMode`, `ɵsetUnknownElementStrictMode`, `ɵsetUnknownPropertyStrictMode` from `./element_validation`
- `packages/core/src/render3/instructions/animation.ts` — 527 lines
  - function: `runEnterAnimation`
- `packages/core/src/render3/instructions/aria_property.ts` — 57 lines
- `packages/core/src/render3/instructions/arrow_function.ts` — 34 lines
- `packages/core/src/render3/instructions/attach_source_locations.ts` — 48 lines
- `packages/core/src/render3/instructions/attribute.ts` — 43 lines
- `packages/core/src/render3/instructions/change_detection.ts` — 567 lines
  - const: `MAXIMUM_REFRESH_RERUNS`
  - function: `detectChangesInternal`, `checkNoChangesInternal`, `refreshView`
  - const enum: `ChangeDetectionMode`
- `packages/core/src/render3/instructions/component_instance.ts` — 25 lines
- `packages/core/src/render3/instructions/control.ts` — 394 lines
  - function: `controlCreateInternal`, `controlUpdateInternal`
- `packages/core/src/render3/instructions/control_flow.ts` — 634 lines
  - class: `RepeaterContext`
- `packages/core/src/render3/instructions/di.ts` — 86 lines
- `packages/core/src/render3/instructions/di_attr.ts` — 19 lines
- `packages/core/src/render3/instructions/dom_property.ts` — 88 lines
- `packages/core/src/render3/instructions/element.ts` — 390 lines
  - function: `enableLocateOrCreateElementNodeImpl`
- `packages/core/src/render3/instructions/element_container.ts` — 274 lines
  - function: `enableLocateOrCreateElementContainerNodeImpl`
- `packages/core/src/render3/instructions/element_validation.ts` — 321 lines
  - function: `validateElementIsKnown`, `isPropertyValid`, `handleUnknownPropertyError`, `reportUnknownPropertyError`, `getDeclarationComponentDef`, `isHostComponentStandalone`, `getTemplateLocationDetails`, `matchingSchemas`
  - const: `KNOWN_CONTROL_FLOW_DIRECTIVES`
- `packages/core/src/render3/instructions/foreign_component.ts` — 252 lines
- `packages/core/src/render3/instructions/get_current_view.ts` — 23 lines
- `packages/core/src/render3/instructions/i18n.ts` — 218 lines
- `packages/core/src/render3/instructions/interpolation.ts` — 313 lines
  - function: `interpolationV`, `interpolation1`, `interpolation2`, `interpolation3`, `interpolation4`, `interpolation5`, `interpolation6`, `interpolation7`, `interpolation8`
- `packages/core/src/render3/instructions/let_declaration.ts` — 72 lines
- `packages/core/src/render3/instructions/listener.ts` — 180 lines
  - function: `listenerInternal`
- `packages/core/src/render3/instructions/mark_view_dirty.ts` — 53 lines
  - function: `markViewDirty`
- `packages/core/src/render3/instructions/namespace.ts` — 10 lines
  - exports `ɵɵnamespaceHTML`, `ɵɵnamespaceMathML`, `ɵɵnamespaceSVG` from `../state`
- `packages/core/src/render3/instructions/next_context.ts` — 25 lines
- `packages/core/src/render3/instructions/projection.ts` — 226 lines
  - function: `matchingProjectionSlotIndex`
- `packages/core/src/render3/instructions/property.ts` — 68 lines
  - function: `setDirectiveInputsWhichShadowsStyling`
- `packages/core/src/render3/instructions/queries.ts` — 106 lines
- `packages/core/src/render3/instructions/queries_signals.ts` — 73 lines
- `packages/core/src/render3/instructions/render.ts` — 163 lines
  - function: `renderComponent`, `syncViewWithBlueprint`, `renderView`
- `packages/core/src/render3/instructions/shared.ts` — 830 lines
  - function: `executeTemplate`, `createDirectivesInstances`, `saveResolvedLocalsInData`, `locateHostElement`, `applyRootElementTransform`, `applyRootElementTransformImpl`, `enableApplyRootElementTransformImpl`, `setPropertyAndInputs`, `setDomProperty`, `markDirtyIfOnPush`, `setNgReflectProperties`, `invokeDirectivesHostBindings`, `invokeHostBindingsInCreationMode`, `findDirectiveDefMatches`, `elementAttributeInternal`, `setElementAttribute`, `elementLikeStartShared`, `elementLikeEndShared`, `storePropertyBindingMetadata`, `loadComponentRenderer`, `handleUncaughtError`, `setAllInputsForProperty`, `setDirectiveInput`
- `packages/core/src/render3/instructions/storage.ts` — 26 lines
- `packages/core/src/render3/instructions/styling.ts` — 1056 lines
  - function: `styleStringParser`, `classStringParser`, `checkStylingProperty`, `checkStylingMap`, `wrapInStaticStylingKey`, `toStylingKeyValueArray`, `styleKeyValueArraySet`, `classKeyValueArraySet`, `hasStylingInputShadow`
- `packages/core/src/render3/instructions/template.ts` — 412 lines
  - function: `declareNoDirectiveHostTemplate`, `enableLocateOrCreateContainerAnchorImpl`
- `packages/core/src/render3/instructions/text.ts` — 97 lines
  - function: `enableLocateOrCreateTextNodeImpl`
- `packages/core/src/render3/instructions/text_interpolation.ts` — 468 lines
- `packages/core/src/render3/instructions/two_way.ts` — 87 lines
- `packages/core/src/render3/instructions/value_interpolation.ts` — 330 lines
- `packages/core/src/render3/instructions/write_to_directive_input.ts` — 73 lines
  - function: `writeToDirectiveInput`



## `packages/core/src/render3/interfaces/`

- `packages/core/src/render3/interfaces/attribute_marker.ts` — 144 lines
  - const enum: `AttributeMarker`
- `packages/core/src/render3/interfaces/container.ts` — 137 lines
  - const: `TYPE`, `DEHYDRATED_VIEWS`, `NATIVE`, `VIEW_REFS`, `MOVED_VIEWS`, `CONTAINER_HEADER_OFFSET`
  - interface: `LContainer`
  - const enum: `LContainerFlags`
- `packages/core/src/render3/interfaces/context.ts` — 62 lines
  - class: `LContext`
- `packages/core/src/render3/interfaces/control.ts` — 88 lines
  - interface: `ControlDirectiveDef`, `ControlDirectiveHost`
- `packages/core/src/render3/interfaces/definition.ts` — 627 lines
  - type: `ComponentTemplate`, `ViewQueriesFunction`, `ProvidersResolver`, `ContentQueriesFunction`, `HostDirectiveResolution`, `HostDirectiveRanges`, `HostDirectiveBindingMap`, `HostDirectiveDefs`, `HostDirectiveConfig`, `InputTransformFunction`, `DirectiveDefListOrFactory`, `DirectiveDefList`, `DependencyDef`, `DirectiveTypesOrFactory`, `DirectiveTypeList`, `DependencyType`, `DependencyTypeList`, `TypeOrFactory`, `HostBindingsFunction`, `PipeDefListOrFactory`, `PipeDefList`, `PipeTypesOrFactory`, `PipeTypeList`, `RawScopeInfoFromDecorator`
  - interface: `ClassDebugInfo`, `ComponentType`, `DirectiveType`, `PipeType`, `DirectiveDef`, `ComponentDef`, `PipeDef`, `DirectiveDefFeature`, `HostDirectiveDef`, `ComponentDefFeature`, `NgModuleScopeInfoFromDecorator`
  - const enum: `RenderFlags`
- `packages/core/src/render3/interfaces/document.ts` — 65 lines
  - function: `setDocument`, `getDocument`
- `packages/core/src/render3/interfaces/i18n.ts` — 503 lines
  - interface: `I18nRemoveOpCodes`, `IcuCreateOpCodes`, `ELEMENT_MARKER`, `ICU_MARKER`, `I18nDebug`, `I18nCreateOpCodes`, `I18nUpdateOpCodes`, `TI18n`, `TIcu`, `IcuExpression`, `I18nTextNode`, `I18nElementNode`, `I18nICUNode`, `I18nPlaceholderNode`
  - const enum: `IcuCreateOpCode`, `I18nUpdateOpCode`, `IcuType`, `I18nPlaceholderType`, `I18nNodeKind`
  - const: `ELEMENT_MARKER`, `ICU_MARKER`
  - enum: `I18nCreateOpCode`
  - type: `I18nNode`
- `packages/core/src/render3/interfaces/injector.ts` — 298 lines
  - const enum: `NodeInjectorOffset`, `RelativeInjectorLocationFlags`
  - type: `RelativeInjectorLocation`
  - const: `NO_PARENT_INJECTOR`
  - class: `NodeInjectorFactory`
- `packages/core/src/render3/interfaces/input_flags.ts` — 15 lines
  - enum: `InputFlags`
- `packages/core/src/render3/interfaces/lview_tracking.ts` — 46 lines
  - function: `getUniqueLViewId`, `registerLView`, `getLViewById`, `unregisterLView`, `getTrackedLViews`
- `packages/core/src/render3/interfaces/node.ts` — 1014 lines
  - const enum: `TNodeName`, `TNodeType`, `TNodeFlags`, `TNodeProviderIndexes`
  - function: `toTNodeTypeAsString`, `isTNodeShape`, `isLetDeclaration`, `hasClassInput`, `hasStyleInput`
  - type: `TAttributes`, `TConstants`, `TConstantsFactory`, `TConstantsOrFactory`, `InsertBeforeIndex`, `TDirectiveHostNode`, `NodeOutputBindings`, `NodeInputBindings`, `InitialInputData`, `InitialInputs`, `HostDirectiveInputs`, `HostDirectiveOutputs`, `DirectiveIndexMap`, `TNodeWithLocalRefs`, `LocalRefExtractor`
  - interface: `TNode`, `TElementNode`, `TTextNode`, `TContainerNode`, `TElementContainerNode`, `TIcuContainerNode`, `TProjectionNode`, `TLetDeclarationNode`
- `packages/core/src/render3/interfaces/projection.ts` — 75 lines
  - type: `CssSelector`, `CssSelectorList`, `ProjectionSlots`
  - const enum: `SelectorFlags`
- `packages/core/src/render3/interfaces/public_definitions.ts` — 121 lines
  - type: `CtorDependency`
- `packages/core/src/render3/interfaces/query.ts` — 254 lines
  - interface: `TQueryMetadata`, `TQuery`, `TQueries`, `LQuery`, `LQueries`
  - const enum: `QueryFlags`
- `packages/core/src/render3/interfaces/renderer.ts` — 87 lines
  - type: `GlobalTargetName`, `GlobalTargetResolver`
  - interface: `Renderer`, `RendererFactory`
- `packages/core/src/render3/interfaces/renderer_dom.ts` — 115 lines
  - interface: `RNode`, `RElement`, `RCssStyleDeclaration`, `RDomTokenList`, `RText`, `RComment`, `RTemplate`
- `packages/core/src/render3/interfaces/sanitization.ts` — 19 lines
  - type: `SanitizerFn`
- `packages/core/src/render3/interfaces/shared_styles_host.ts` — 48 lines
  - const: `SHARED_STYLES_HOST`
  - interface: `SharedStylesHost`
- `packages/core/src/render3/interfaces/styling.ts` — 218 lines
  - type: `TStylingKey`, `TStylingKeyPrimitive`, `TStylingRange`
  - interface: `TStylingStatic`
  - const enum: `StylingRange`
  - function: `toTStylingRange`, `getTStylingRangePrev`, `getTStylingRangePrevDuplicate`, `setTStylingRangePrev`, `setTStylingRangePrevDuplicate`, `getTStylingRangeNext`, `setTStylingRangeNext`, `getTStylingRangeNextDuplicate`, `setTStylingRangeNextDuplicate`, `getTStylingRangeTail`
- `packages/core/src/render3/interfaces/type_checks.ts` — 64 lines
  - function: `isLView`, `isLContainer`, `isContentQueryHost`, `isComponentHost`, `isDirectiveHost`, `isComponentDef`, `isRootView`, `isProjectionTNode`, `hasI18n`, `isDestroyed`
- `packages/core/src/render3/interfaces/view.ts` — 961 lines
  - const: `HOST`, `TVIEW`, `FLAGS`, `PARENT`, `NEXT`, `T_HOST`, `HYDRATION`, `CLEANUP`, `CONTEXT`, `INJECTOR`, `ENVIRONMENT`, `RENDERER`, `CHILD_HEAD`, `CHILD_TAIL`, `DECLARATION_VIEW`, `DECLARATION_COMPONENT_VIEW`, `DECLARATION_LCONTAINER`, `PREORDER_HOOK_FLAGS`, `QUERIES`, `ID`, `EMBEDDED_VIEW_INJECTOR`, `ON_DESTROY_HOOKS`, `EFFECTS_TO_SCHEDULE`, `EFFECTS`, `REACTIVE_TEMPLATE_CONSUMER`, `AFTER_RENDER_SEQUENCES_TO_ADD`, `ANIMATIONS`, `HEADER_OFFSET`
  - interface: `OpaqueViewState`, `LView`, `LViewEnvironment`, `HostBindingOpCodes`, `TView`
  - const enum: `LViewFlags`, `InitPhaseState`, `PreOrderHookFlags`, `TViewType`
  - type: `HookFn`, `HookEntry`, `HookData`, `DestroyHookData`, `TData`



## `packages/core/src/render3/jit/`

- `packages/core/src/render3/jit/directive.ts` — 545 lines
  - function: `compileComponent`, `compileDirective`, `extendsDirectlyFromObject`, `directiveMetadata`, `convertToR3QueryMetadata`
- `packages/core/src/render3/jit/environment.ts` — 209 lines
  - const: `angularCoreEnv`
- `packages/core/src/render3/jit/jit_options.ts` — 44 lines
  - interface: `JitCompilerOptions`
  - function: `setJitOptions`, `getJitOptions`, `resetJitOptions`
- `packages/core/src/render3/jit/module.ts` — 688 lines
  - function: `flushModuleScopingQueueAsMuchAsPossible`, `compileNgModule`, `compileNgModuleDefs`, `generateStandaloneInDeclarationsError`, `resetCompiledComponents`, `patchComponentDefWithScope`, `transitiveScopesFor`, `transitiveScopesForNgModule`
- `packages/core/src/render3/jit/module_patch.ts` — 12 lines
  - function: `patchModuleCompilation`
- `packages/core/src/render3/jit/partial.ts` — 231 lines
  - exports `FactoryTarget` from `../../compiler/compiler_facade`
- `packages/core/src/render3/jit/pipe.ts` — 79 lines
  - function: `compilePipe`
- `packages/core/src/render3/jit/util.ts` — 88 lines
  - function: `isModuleWithProviders`, `isNgModule`, `isPipe`, `isDirective`, `isComponent`, `verifyStandaloneImport`



## `packages/core/src/render3/queries/`

- `packages/core/src/render3/queries/query.ts` — 558 lines
  - class: `TQueryMetadata_`
  - function: `loadQueryInternal`, `createViewQuery`, `createContentQuery`, `createTQuery`, `saveContentQueryAndDirectiveIndex`, `getTQuery`, `getQueryResults`
- `packages/core/src/render3/queries/query_execution.ts` — 79 lines
  - function: `refreshContentQueries`, `executeViewQueryFn`, `executeContentQueries`
- `packages/core/src/render3/queries/query_reactive.ts` — 147 lines
  - function: `createSingleResultOptionalQuerySignalFn`, `createSingleResultRequiredQuerySignalFn`, `createMultiResultQuerySignalFn`, `bindQueryToSignal`



## `packages/core/src/render3/reactivity/`

- `packages/core/src/render3/reactivity/after_render_effect.ts` — 457 lines
  - interface: `AfterRenderPhaseEffectNode`
  - class: `AfterRenderEffectSequence`
  - function: `afterRenderEffect`, `afterRenderEffect`, `afterRenderEffect`
- `packages/core/src/render3/reactivity/api.ts` — 58 lines
  - type: `Signal`, `ValueEqualityFn`
  - function: `isSignal`, `isWritableSignal`
- `packages/core/src/render3/reactivity/asserts.ts` — 35 lines
  - function: `assertNotInReactiveContext`
- `packages/core/src/render3/reactivity/computed.ts` — 43 lines
  - interface: `CreateComputedOptions`
  - function: `computed`
- `packages/core/src/render3/reactivity/effect.ts` — 335 lines
  - interface: `EffectRef`, `CreateEffectOptions`, `EffectNode`, `ViewEffectNode`, `RootEffectNode`
  - class: `EffectRefImpl`
  - type: `EffectCleanupFn`, `EffectCleanupRegisterFn`
  - function: `effect`, `createViewEffect`, `createRootEffect`
  - const: `EFFECT_NODE`, `ROOT_EFFECT_NODE`, `VIEW_EFFECT_NODE`
- `packages/core/src/render3/reactivity/linked_signal.ts` — 118 lines
  - function: `linkedSignal`, `linkedSignal`, `linkedSignal`
- `packages/core/src/render3/reactivity/root_effect_scheduler.ts` — 138 lines
  - interface: `SchedulableEffect`
  - class: `EffectScheduler`, `ZoneAwareEffectScheduler`
- `packages/core/src/render3/reactivity/signal.ts` — 100 lines
  - interface: `WritableSignal`, `CreateSignalOptions`
  - function: `signal`, `signalAsReadonlyFn`
- `packages/core/src/render3/reactivity/untracked.ts` — 19 lines
  - function: `untracked`
- `packages/core/src/render3/reactivity/view_effect_runner.ts` — 44 lines
  - function: `runEffectsInView`



## `packages/core/src/render3/styling/`

- `packages/core/src/render3/styling/class_differ.ts` — 47 lines
  - function: `classIndexOf`
- `packages/core/src/render3/styling/static_styling.ts` — 53 lines
  - function: `computeStaticStyling`
- `packages/core/src/render3/styling/style_binding_list.ts` — 466 lines
  - function: `insertTStylingBinding`
- `packages/core/src/render3/styling/styling_parser.ts` — 333 lines
  - function: `getLastParsedKey`, `getLastParsedValue`, `parseClassName`, `parseClassNameNext`, `parseStyle`, `parseStyleNext`, `resetParserState`, `consumeWhitespace`, `consumeClassToken`, `consumeStyleKey`, `consumeSeparator`, `consumeStyleValue`, `consumeQuotedText`



## `packages/core/src/render3/util/`

- `packages/core/src/render3/util/attrs_utils.ts` — 222 lines
  - function: `setUpAttributes`, `isNameOnlyAttributeMarker`, `isAnimationProp`, `mergeHostAttrs`, `mergeHostAttribute`
- `packages/core/src/render3/util/change_detection_utils.ts` — 44 lines
  - function: `applyChanges`
- `packages/core/src/render3/util/control_flow.ts` — 353 lines
  - function: `getControlFlowBlocks`
- `packages/core/src/render3/util/control_flow_types.ts` — 109 lines
  - enum: `ControlFlowBlockType`
  - interface: `ControlFlowBlockDataBase`, `DeferBlockData`, `ForLoopBlockData`, `ControlFlowBlockViewFinderConfig`, `RepeaterMetadataShape`
  - type: `ControlFlowBlock`, `ControlFlowBlockViewFinder`
- `packages/core/src/render3/util/discovery_utils.ts` — 534 lines
  - function: `getComponent`, `getContext`, `getOwningComponent`, `getRootComponents`, `getInjector`, `getInjectionTokens`, `getDirectives`, `getDirectiveMetadata`, `getLocalRefs`, `getHostElement`, `getRenderedText`, `getListeners`, `getComponentLView`
  - interface: `BaseDirectiveDebugMetadata`, `AngularDirectiveDebugMetadata`, `AngularComponentDebugMetadata`, `AcxDirectiveDebugMetadata`, `AcxComponentDebugMetadata`, `WizComponentDebugMetadata`, `Listener`
  - enum: `AcxChangeDetectionStrategy`, `AcxViewEncapsulation`
  - type: `DirectiveDebugMetadata`
- `packages/core/src/render3/util/global_utils.ts` — 236 lines
  - const: `GLOBAL_PUBLISH_EXPANDO_KEY`
  - interface: `ExternalCoreGlobalUtils`
  - function: `publishDefaultGlobalUtils`, `publishGlobalUtil`, `publishNonCoreGlobalUtil`
  - type: `FrameworkAgnosticGlobalUtils`
- `packages/core/src/render3/util/injector_discovery_utils.ts` — 693 lines
  - function: `getDependenciesFromInjectable`, `getInjectorProviders`, `getInjectorMetadata`, `getInjectorResolutionPath`
- `packages/core/src/render3/util/injector_utils.ts` — 63 lines
  - function: `hasParentInjector`, `getParentInjectorIndex`, `getParentInjectorViewOffset`, `getParentInjectorView`
- `packages/core/src/render3/util/misc_utils.ts` — 61 lines
  - const: `INTERPOLATION_DELIMITER`
  - function: `maybeUnwrapFn`
- `packages/core/src/render3/util/signal_debug.ts` — 197 lines
  - function: `getSignalGraph`
- `packages/core/src/render3/util/stringify_utils.ts` — 65 lines
  - function: `renderStringify`, `stringifyForError`, `debugStringifyTypeForError`
- `packages/core/src/render3/util/tags.ts` — 33 lines
  - function: `splitNsName`
- `packages/core/src/render3/util/transfer_state_utils.ts` — 40 lines
  - function: `getTransferState`
- `packages/core/src/render3/util/view_traversal_utils.ts` — 156 lines
  - function: `getRootView`, `getRootContext`, `getFirstLContainer`, `getNextLContainer`
  - function*: `walkLViewDirectives`
- `packages/core/src/render3/util/view_utils.ts` — 366 lines
  - function: `unwrapRNode`, `unwrapLView`, `getNativeByIndex`, `getNativeByTNode`, `getNativeByTNodeOrNull`, `getTNode`, `load`, `store`, `getComponentLViewByIndex`, `isCreationMode`, `viewAttachedToChangeDetector`, `viewAttachedToContainer`, `getConstant`, `getConstant`, `getConstant`, `getConstant`, `resetPreOrderHookFlags`, `markViewForRefresh`, `walkUpViews`, `requiresRefreshOrTraversal`, `updateAncestorTraversalFlagsOnAttach`, `markAncestorsForTraversal`, `storeLViewOnDestroy`, `removeLViewOnDestroy`, `getLViewParent`, `getOrCreateLViewCleanup`, `getOrCreateTViewCleanup`, `storeCleanupWithContext`



## `packages/core/src/render3/view/`

- `packages/core/src/render3/view/construction.ts` — 336 lines
  - function: `createTView`, `getOrCreateComponentTView`, `createLView`, `createComponentLView`, `getInitialLViewFlagsFromDef`, `allocExpando`, `addToEndOfViewTree`
- `packages/core/src/render3/view/container.ts` — 261 lines
  - function: `createLContainer`, `getLViewFromLContainer`, `addLViewToLContainer`, `removeLViewFromLContainer`, `detachView`, `trackMovedView`
- `packages/core/src/render3/view/directive_outputs.ts` — 139 lines
  - function: `createOutputListener`, `listenToDirectiveOutput`, `listenToOutput`
- `packages/core/src/render3/view/directives.ts` — 587 lines
  - type: `DirectiveMatcherStrategy`
  - function: `resolveDirectives`, `registerHostBindingOpCodes`
- `packages/core/src/render3/view/elements.ts` — 122 lines
  - function: `directiveHostFirstCreatePass`, `directiveHostEndFirstCreatePass`, `domOnlyFirstCreatePass`
- `packages/core/src/render3/view/listeners.ts` — 274 lines
  - function: `wrapListener`, `listenToDomEvent`, `storeListenerCleanup`



## `packages/core/src/resource/`

- `packages/core/src/resource/api.ts` — 336 lines
  - class: `ResourceDependencyError`, `ResourceParamsStatus`
  - interface: `ResourceParamsContext`, `Resource`, `WritableResource`, `ResourceRef`, `ResourceLoaderParams`, `BaseResourceOptions`, `PromiseResourceOptions`, `StreamingResourceOptions`, `DebouncedOptions`
  - type: `ResourceStatus`, `ResourceLoader`, `ResourceStreamingLoader`, `ResourceOptions`, `ResourceStreamItem`, `ResourceSnapshot`, `DebounceTimer`
- `packages/core/src/resource/debounce.ts` — 147 lines
  - function: `debounced`
- `packages/core/src/resource/from_snapshots.ts` — 54 lines
  - function: `resourceFromSnapshots`
- `packages/core/src/resource/index.ts` — 17 lines
  - re-exports * from `./api`
  - exports `debounced` from `./debounce`
  - exports `resourceFromSnapshots` from `./from_snapshots`
  - exports `isInParamsFunction as ɵisInParamsFunction`, `resource`, `setInParamsFunction as ɵsetInParamsFunction` from `./resource`
- `packages/core/src/resource/resource.ts` — 687 lines
  - function: `resource`, `resource`, `resource`, `encapsulateResourceError`, `isErrorLike`, `chain`, `isInParamsFunction`, `setInParamsFunction`, `invalidResourceCreationInParams`, `rethrowFatalErrors`
  - class: `ResourceImpl`, `ResourceValueError`
  - const: `paramsContext`



## `packages/core/src/sanitization/`

- `packages/core/src/sanitization/bypass.ts` — 200 lines
  - const enum: `BypassType`
  - interface: `SafeValue`, `SafeHtml`, `SafeStyle`, `SafeScript`, `SafeUrl`, `SafeResourceUrl`
  - function: `unwrapSafeValue`, `unwrapSafeValue`, `unwrapSafeValue`, `allowSanitizationBypassAndThrow`, `allowSanitizationBypassAndThrow`, `allowSanitizationBypassAndThrow`, `allowSanitizationBypassAndThrow`, `allowSanitizationBypassAndThrow`, `allowSanitizationBypassAndThrow`, `allowSanitizationBypassAndThrow`, `getSanitizationBypassType`, `bypassSanitizationTrustHtml`, `bypassSanitizationTrustStyle`, `bypassSanitizationTrustScript`, `bypassSanitizationTrustUrl`, `bypassSanitizationTrustResourceUrl`
- `packages/core/src/sanitization/dom_security_schema.ts` — 215 lines
  - enum: `SecurityContext`
  - const: `SVG_NAMESPACE`, `MATH_ML_NAMESPACE`
  - function: `SECURITY_SCHEMA`, `checkSecurityContext`
- `packages/core/src/sanitization/html_sanitizer.ts` — 356 lines
  - const: `VALID_ELEMENTS`, `VALID_ATTRS`
  - function: `getNodeName`, `_sanitizeHtml`, `getTemplateContent`
- `packages/core/src/sanitization/iframe_attrs_validation.ts` — 37 lines
  - function: `enforceIframeSecurity`
- `packages/core/src/sanitization/inert_body.ts` — 97 lines
  - function: `getInertBodyHelper`, `isDOMParserAvailable`
  - interface: `InertBodyHelper`
- `packages/core/src/sanitization/sanitization.ts` — 415 lines
  - function: `getUrlSanitizer`, `validateAgainstEventProperties`
- `packages/core/src/sanitization/sanitizer.ts` — 28 lines
  - class: `Sanitizer`
- `packages/core/src/sanitization/url_sanitizer.ts` — 49 lines
  - function: `_sanitizeUrl`



## `packages/core/src/testability/`

- `packages/core/src/testability/testability.externs.js` — 26 lines
- `packages/core/src/testability/testability.ts` — 377 lines
  - interface: `PublicTestability`, `PendingMacrotask`, `TaskData`, `GetTestability`
  - const: `TESTABILITY`, `TESTABILITY_GETTER`, `USE_PENDING_TASKS`
  - class: `Testability`, `TestabilityRegistry`
  - function: `setTestabilityGetter`



## `packages/core/src/util/`

- `packages/core/src/util/array_utils.ts` — 295 lines
  - function: `arrayEquals`, `flatten`, `deepForEach`, `addToArray`, `removeFromArray`, `newArray`, `newArray`, `newArray`, `arraySplice`, `arrayInsert`, `arrayInsert2`, `arrayIndexOfSorted`, `keyValueArraySet`, `keyValueArrayGet`, `keyValueArrayIndexOf`, `keyValueArrayDelete`
  - interface: `KeyValueArray`
- `packages/core/src/util/assert.ts` — 150 lines
  - function: `assertNumber`, `assertNumberInRange`, `assertString`, `assertFunction`, `assertEqual`, `assertNotEqual`, `assertSame`, `assertNotSame`, `assertLessThan`, `assertLessThanOrEqual`, `assertGreaterThan`, `assertGreaterThanOrEqual`, `assertNotDefined`, `assertDefined`, `throwError`, `throwError`, `throwError`, `assertDomNode`, `assertElement`, `assertIndexInRange`, `assertOneOf`, `assertNotReactive`
- `packages/core/src/util/callback_scheduler.ts` — 75 lines
  - function: `scheduleCallbackWithRafRace`, `scheduleCallbackWithMicrotask`
- `packages/core/src/util/char_code.ts` — 46 lines
  - const enum: `CharCode`
- `packages/core/src/util/closure.ts` — 21 lines
  - function: `noSideEffects`
- `packages/core/src/util/coercion.ts` — 48 lines
  - function: `booleanAttribute`, `numberAttribute`
- `packages/core/src/util/comparison.ts` — 26 lines
  - function: `devModeEqual`
- `packages/core/src/util/decorators.ts` — 200 lines
  - interface: `TypeDecorator`
  - const: `ANNOTATIONS`, `PARAMETERS`, `PROP_METADATA`
  - function: `makeDecorator`, `makeParamDecorator`, `makePropDecorator`
- `packages/core/src/util/default_export.ts` — 38 lines
  - interface: `DefaultExport`
  - function: `maybeUnwrapDefaultExport`
- `packages/core/src/util/dom.ts` — 53 lines
  - function: `escapeCommentText`
- `packages/core/src/util/empty.ts` — 29 lines
  - const: `EMPTY_OBJ`, `EMPTY_ARRAY`
- `packages/core/src/util/global.ts` — 17 lines
  - exports `_global as global`
- `packages/core/src/util/is_dev_mode.ts` — 45 lines
  - function: `isDevMode`, `enableProdMode`
- `packages/core/src/util/iterable.ts` — 52 lines
  - function: `isListLikeIterable`, `areIterablesEqual`, `iterateListLike`, `isJsObject`
- `packages/core/src/util/lang.ts` — 26 lines
  - function: `isPromise`, `isSubscribable`
- `packages/core/src/util/ng_dev_mode.ts` — 96 lines
  - function: `initNgDevMode`
- `packages/core/src/util/ng_hmr_mode.ts` — 24 lines
- `packages/core/src/util/ng_i18n_closure_mode.ts` — 31 lines
- `packages/core/src/util/ng_jit_mode.ts` — 15 lines
- `packages/core/src/util/ng_server_mode.ts` — 25 lines
- `packages/core/src/util/noop.ts` — 12 lines
  - function: `noop`
- `packages/core/src/util/performance.ts` — 26 lines
  - function: `performanceMarkFeature`
- `packages/core/src/util/promise_with_resolvers.ts` — 52 lines
  - interface: `PromiseWithResolvers`, `PromiseConstructor`
  - function: `promiseWithResolvers`
- `packages/core/src/util/property.ts` — 37 lines
  - function: `getClosureSafeProperty`, `fillProperties`
- `packages/core/src/util/stringify.ts` — 65 lines
  - function: `stringify`, `concatStringsWithSpace`, `truncateMiddle`



## `packages/core/src/util/security/`

- `packages/core/src/util/security/trusted_type_defs.ts` — 55 lines
  - type: `TrustedHTML`, `TrustedScript`, `TrustedScriptURL`
  - interface: `TrustedTypePolicyFactory`, `TrustedTypePolicy`
- `packages/core/src/util/security/trusted_types.ts` — 84 lines
  - function: `trustedHTMLFromString`, `trustedScriptURLFromString`
- `packages/core/src/util/security/trusted_types_bypass.ts` — 98 lines
  - function: `trustedHTMLFromStringBypass`, `trustedScriptFromStringBypass`, `trustedScriptURLFromStringBypass`



## `packages/core/src/view/`

- `packages/core/src/view/provider_flags.ts` — 27 lines
  - const: `NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR`



## `packages/core/src/webmcp/`

- `packages/core/src/webmcp/declare_tool.ts` — 76 lines
  - function: `declareExperimentalWebMcpTool`
- `packages/core/src/webmcp/index.ts` — 16 lines
  - exports `declareExperimentalWebMcpTool` from `./declare_tool`
  - exports `provideExperimentalWebMcpTools` from `./provide_tools`
- `packages/core/src/webmcp/provide_tools.ts` — 38 lines
  - function: `provideExperimentalWebMcpTools`
- `packages/core/src/webmcp/types.ts` — 94 lines
  - interface: `Client`, `ToolRegistrationOptions`, `ToolDescriptor`, `ModelContext`
  - type: `Execute`



## `packages/core/src/zone/`

- `packages/core/src/zone/async-stack-tagging.ts` — 62 lines
  - class: `AsyncStackTaggingZoneSpec`
- `packages/core/src/zone/ng_zone.ts` — 623 lines
  - const: `angularZoneInstanceIdProperty`
  - class: `NgZone`, `NoopNgZone`
  - interface: `NgZonePrivate`, `InternalNgZoneOptions`
  - function: `getNgZone`



## `packages/core/test/`

- `packages/core/test/application_config_spec.ts` — 53 lines _(spec)_
- `packages/core/test/application_init_spec.ts` — 268 lines _(spec)_
- `packages/core/test/application_module_spec.ts` — 87 lines _(spec)_
- `packages/core/test/application_ref_integration_spec.ts` — 100 lines _(spec)_
- `packages/core/test/application_ref_spec.ts` — 1068 lines _(spec)_
- `packages/core/test/change_detection_scheduler_spec.ts` — 988 lines _(spec)_
- `packages/core/test/component_fixture_spec.ts` — 672 lines _(spec)_
- `packages/core/test/defer_fixture_spec.ts` — 448 lines _(spec)_
- `packages/core/test/dev_mode_spec.ts` — 16 lines _(spec)_
- `packages/core/test/directive_lifecycle_integration_spec.ts` — 123 lines _(spec)_
- `packages/core/test/error_handler_spec.ts` — 148 lines _(spec)_
- `packages/core/test/event_emitter_spec.ts` — 232 lines _(spec)_
- `packages/core/test/fake_async_spec.ts` — 434 lines _(spec)_
- `packages/core/test/forward_ref_integration_spec.ts` — 83 lines _(spec)_
- `packages/core/test/runtime_error_spec.ts` — 50 lines _(spec)_
- `packages/core/test/test_bed_effect_spec.ts` — 186 lines _(spec)_
- `packages/core/test/test_bed_spec.ts` — 2967 lines _(spec)_
  - class: `HelloWorld`, `GreetingCmp`, `GreetingModule`, `SimpleCmp`, `WithRefsCmp`, `InheritedCmp`, `HostBindingDir`, `ComponentWithPropBindings`, `SimpleApp`, `ComponentWithInlineTemplate`, `HelloWorldModule`
- `packages/core/test/transfer_state_spec.ts` — 194 lines _(spec)_



## `packages/core/test/acceptance/`

- `packages/core/test/acceptance/after_render_effect_spec.ts` — 369 lines _(spec)_
- `packages/core/test/acceptance/after_render_hook_spec.ts` — 1505 lines _(spec)_
- `packages/core/test/acceptance/animation_spec.ts` — 2798 lines _(spec)_
  - class: `TestModule`
- `packages/core/test/acceptance/attach_source_locations_spec.ts` — 157 lines _(spec)_
- `packages/core/test/acceptance/attributes_spec.ts` — 268 lines _(spec)_
- `packages/core/test/acceptance/bootstrap_spec.ts` — 585 lines _(spec)_
  - class: `IdSelectorAppComponent`, `IdSelectorAppModule`, `MultipleSelectorsAppComponent`, `MultipleSelectorsAppModule`
- `packages/core/test/acceptance/change_detection_signals_in_zones_spec.ts` — 1019 lines _(spec)_
- `packages/core/test/acceptance/change_detection_spec.ts` — 1882 lines _(spec)_
- `packages/core/test/acceptance/change_detection_transplanted_view_spec.ts` — 1197 lines _(spec)_
- `packages/core/test/acceptance/chrome_dev_tools_performance_spec.ts` — 331 lines _(spec)_
- `packages/core/test/acceptance/common_integration_spec.ts` — 654 lines _(spec)_
- `packages/core/test/acceptance/component_spec.ts` — 998 lines _(spec)_
- `packages/core/test/acceptance/content_spec.ts` — 2387 lines _(spec)_
- `packages/core/test/acceptance/control_flow_for_spec.ts` — 1351 lines _(spec)_
- `packages/core/test/acceptance/control_flow_if_spec.ts` — 909 lines _(spec)_
- `packages/core/test/acceptance/control_flow_switch_spec.ts` — 359 lines _(spec)_
- `packages/core/test/acceptance/control_flow_utils_spec.ts` — 592 lines _(spec)_
- `packages/core/test/acceptance/create_component_spec.ts` — 2078 lines _(spec)_
- `packages/core/test/acceptance/csp_spec.ts` — 152 lines _(spec)_
- `packages/core/test/acceptance/defer_spec.ts` — 5506 lines _(spec)_
  - class: `DebugConsole`
  - function: `withDebugConsole`
- `packages/core/test/acceptance/destroy_ref_spec.ts` — 312 lines _(spec)_
- `packages/core/test/acceptance/di_forward_ref_spec.ts` — 90 lines _(spec)_
- `packages/core/test/acceptance/di_spec.ts` — 7197 lines _(spec)_
- `packages/core/test/acceptance/directive_spec.ts` — 1601 lines _(spec)_
- `packages/core/test/acceptance/discover_utils_spec.ts` — 599 lines _(spec)_
- `packages/core/test/acceptance/embedded_views_spec.ts` — 80 lines _(spec)_
- `packages/core/test/acceptance/env_injector_standalone_spec.ts` — 112 lines _(spec)_
- `packages/core/test/acceptance/environment_injector_spec.ts` — 329 lines _(spec)_
- `packages/core/test/acceptance/exports_spec.ts` — 302 lines _(spec)_
- `packages/core/test/acceptance/expressions_spec.ts` — 50 lines _(spec)_
- `packages/core/test/acceptance/hmr_spec.ts` — 2476 lines _(spec)_
- `packages/core/test/acceptance/host_binding_spec.ts` — 1876 lines _(spec)_
- `packages/core/test/acceptance/host_directives_spec.ts` — 4453 lines _(spec)_
- `packages/core/test/acceptance/i18n_spec.ts` — 3841 lines _(spec)_
  - class: `DialogDir`, `CloseBtn`
- `packages/core/test/acceptance/inherit_definition_feature_spec.ts` — 6029 lines _(spec)_
- `packages/core/test/acceptance/injector_profiler_spec.ts` — 1487 lines _(spec)_
- `packages/core/test/acceptance/integration_spec.ts` — 4030 lines _(spec)_
- `packages/core/test/acceptance/internal_spec.ts` — 169 lines _(spec)_
- `packages/core/test/acceptance/let_spec.ts` — 490 lines _(spec)_
- `packages/core/test/acceptance/lifecycle_spec.ts` — 5062 lines _(spec)_
- `packages/core/test/acceptance/listener_spec.ts` — 981 lines _(spec)_
- `packages/core/test/acceptance/local_compilation_spec.ts` — 301 lines _(spec)_
- `packages/core/test/acceptance/ng_module_spec.ts` — 1036 lines _(spec)_
- `packages/core/test/acceptance/ngmodule_scope_spec.ts` — 67 lines _(spec)_
- `packages/core/test/acceptance/outputs_spec.ts` — 370 lines _(spec)_
- `packages/core/test/acceptance/pending_tasks_spec.ts` — 151 lines _(spec)_
- `packages/core/test/acceptance/pipe_spec.ts` — 1090 lines _(spec)_
- `packages/core/test/acceptance/profiler_spec.ts` — 786 lines _(spec)_
- `packages/core/test/acceptance/property_binding_spec.ts` — 1013 lines _(spec)_
- `packages/core/test/acceptance/property_interpolation_spec.ts` — 277 lines _(spec)_
- `packages/core/test/acceptance/providers_spec.ts` — 857 lines _(spec)_
- `packages/core/test/acceptance/pure_function_spec.ts` — 741 lines _(spec)_
- `packages/core/test/acceptance/query_spec.ts` — 3411 lines _(spec)_
  - class: `QueryCompWithChanges`, `QueryCompWithNoChanges`, `QueryCompWithStrictChangeEmitParent`
- `packages/core/test/acceptance/renderer_factory_spec.ts` — 668 lines _(spec)_
  - class: `MockRendererFactory`
- `packages/core/test/acceptance/router_integration_spec.ts` — 60 lines _(spec)_
- `packages/core/test/acceptance/security_spec.ts` — 1395 lines _(spec)_
- `packages/core/test/acceptance/service_spec.ts` — 207 lines _(spec)_
- `packages/core/test/acceptance/signal_debug_spec.ts` — 468 lines _(spec)_
- `packages/core/test/acceptance/standalone_injector_spec.ts` — 107 lines _(spec)_
- `packages/core/test/acceptance/standalone_spec.ts` — 959 lines _(spec)_
- `packages/core/test/acceptance/styling_spec.ts` — 4014 lines _(spec)_
- `packages/core/test/acceptance/template_ref_spec.ts` — 374 lines _(spec)_
- `packages/core/test/acceptance/text_spec.ts` — 189 lines _(spec)_
- `packages/core/test/acceptance/tracing_spec.ts` — 184 lines _(spec)_
- `packages/core/test/acceptance/view_container_ref_spec.ts` — 3279 lines _(spec)_
  - class: `StructDir`
- `packages/core/test/acceptance/view_insertion_spec.ts` — 913 lines _(spec)_
- `packages/core/test/acceptance/view_ref_spec.ts` — 156 lines _(spec)_



## `packages/core/test/acceptance/authoring/`

- `packages/core/test/acceptance/authoring/authoring_test_compiler.ts` — 49 lines _(test-support)_
- `packages/core/test/acceptance/authoring/model_inputs_spec.ts` — 657 lines _(spec)_
- `packages/core/test/acceptance/authoring/output_function_spec.ts` — 400 lines _(spec)_
- `packages/core/test/acceptance/authoring/signal_inputs_spec.ts` — 664 lines _(spec)_
- `packages/core/test/acceptance/authoring/signal_queries_spec.ts` — 710 lines _(spec)_



## `packages/core/test/acceptance/foreign_component/`

- `packages/core/test/acceptance/foreign_component/foreign_component_context_spec.ts` — 167 lines _(spec)_
- `packages/core/test/acceptance/foreign_component/foreign_component_spec.ts` — 1214 lines _(spec)_



## `packages/core/test/acceptance/selectorless/`

- `packages/core/test/acceptance/selectorless/selectorless.spec.ts` — 25 lines _(spec)_



## `packages/core/test/animation/`

- `packages/core/test/animation/longest_animation_spec.ts` — 432 lines _(spec)_



## `packages/core/test/animation_utils/`

- `packages/core/test/animation_utils/tick_animation_frames.ts` — 15 lines _(test-support)_
  - function: `tickAnimationFrames`



## `packages/core/test/authoring/`

- `packages/core/test/authoring/input_signal_spec.ts` — 129 lines _(spec)_
- `packages/core/test/authoring/linked_signal_signature_test.ts` — 100 lines _(spec)_
  - class: `LinkedSignalSignatureTest`
- `packages/core/test/authoring/model_input_spec.ts` — 153 lines _(spec)_
- `packages/core/test/authoring/signal_input_signature_test.ts` — 139 lines _(spec)_
  - class: `InputSignatureTest`
- `packages/core/test/authoring/signal_model_signature_test.ts` — 63 lines _(spec)_
  - class: `SignalModelSignatureTest`
- `packages/core/test/authoring/signal_queries_signature_test.ts` — 233 lines _(spec)_
  - class: `SignalQuerySignatureTest`
- `packages/core/test/authoring/simple_changes_signature_test.ts` — 79 lines _(spec)_
  - class: `SimpleChangesSignatureTest`, `TestDir`
- `packages/core/test/authoring/type_tester.ts` — 97 lines _(test-support)_
- `packages/core/test/authoring/unwrap_writable_signal_signature_test.ts` — 44 lines _(spec)_
  - class: `SignalModelSignatureTest`



## `packages/core/test/bundling/animations-standalone/`

- `packages/core/test/bundling/animations-standalone/main.ts` — 34 lines _(test-support)_
- `packages/core/test/bundling/animations-standalone/treeshaking_spec.ts` — 26 lines _(spec)_



## `packages/core/test/bundling/create_component/`

- `packages/core/test/bundling/create_component/main.ts` — 57 lines _(test-support)_



## `packages/core/test/bundling/cyclic_import/`

- `packages/core/test/bundling/cyclic_import/integration_spec.ts` — 36 lines _(spec)_
- `packages/core/test/bundling/cyclic_import/main.ts` — 29 lines _(test-support)_
  - class: `DepComponent`, `Module`
- `packages/core/test/bundling/cyclic_import/trigger.ts` — 17 lines _(test-support)_
  - class: `TriggerComponent`



## `packages/core/test/bundling/defer/`

- `packages/core/test/bundling/defer/defer.component.ts` — 16 lines _(test-support)_
  - class: `DeferComponent`
- `packages/core/test/bundling/defer/main.ts` — 36 lines _(test-support)_
  - class: `AppComponent`
- `packages/core/test/bundling/defer/treeshaking_spec.ts` — 26 lines _(spec)_



## `packages/core/test/bundling/forms_reactive/`

- `packages/core/test/bundling/forms_reactive/forms_e2e_spec.ts` — 49 lines _(spec)_
- `packages/core/test/bundling/forms_reactive/main.ts` — 107 lines _(test-support)_
- `packages/core/test/bundling/forms_reactive/treeshaking_spec.ts` — 26 lines _(spec)_



## `packages/core/test/bundling/forms_template_driven/`

- `packages/core/test/bundling/forms_template_driven/forms_e2e_spec.ts` — 46 lines _(spec)_
- `packages/core/test/bundling/forms_template_driven/main.ts` — 77 lines _(test-support)_
- `packages/core/test/bundling/forms_template_driven/treeshaking_spec.ts` — 26 lines _(spec)_



## `packages/core/test/bundling/hydration/`

- `packages/core/test/bundling/hydration/main.ts` — 19 lines _(test-support)_
- `packages/core/test/bundling/hydration/treeshaking_spec.ts` — 26 lines _(spec)_



## `packages/core/test/bundling/image-directive/`

- `packages/core/test/bundling/image-directive/index.ts` — 72 lines _(test-support)_
  - class: `RootComponent`
- `packages/core/test/bundling/image-directive/playground.ts` — 51 lines _(test-support)_
  - class: `PlaygroundComponent`



## `packages/core/test/bundling/image-directive/e2e/`

- `packages/core/test/bundling/image-directive/e2e/browser-logs-util.ts` — 42 lines _(test-support)_
  - function: `collectBrowserLogs`, `verifyNoBrowserErrors`



## `packages/core/test/bundling/image-directive/e2e/basic/`

- `packages/core/test/bundling/image-directive/e2e/basic/basic.e2e-spec.ts` — 30 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/basic/basic.ts` — 24 lines _(test-support)_
  - class: `BasicComponent`



## `packages/core/test/bundling/image-directive/e2e/fill-mode/`

- `packages/core/test/bundling/image-directive/e2e/fill-mode/fill-mode.e2e-spec.ts` — 48 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/fill-mode/fill-mode.ts` — 33 lines _(test-support)_
  - class: `FillModePassingComponent`, `FillModeFailingComponent`



## `packages/core/test/bundling/image-directive/e2e/image-distortion/`

- `packages/core/test/bundling/image-directive/e2e/image-distortion/image-distortion.e2e-spec.ts` — 142 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/image-distortion/image-distortion.ts` — 140 lines _(test-support)_
  - class: `ImageDistortionPassingComponent`, `ImageDistortionFailingComponent`



## `packages/core/test/bundling/image-directive/e2e/image-perf-warnings-lazy/`

- `packages/core/test/bundling/image-directive/e2e/image-perf-warnings-lazy/image-perf-warnings-lazy.e2e-spec.ts` — 38 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/image-perf-warnings-lazy/image-perf-warnings-lazy.ts` — 27 lines _(test-support)_
  - class: `ImagePerfWarningsLazyComponent`



## `packages/core/test/bundling/image-directive/e2e/image-perf-warnings-oversized/`

- `packages/core/test/bundling/image-directive/e2e/image-perf-warnings-oversized/image-perf-warnings-oversized.e2e-spec.ts` — 39 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/image-perf-warnings-oversized/image-perf-warnings-oversized.ts` — 21 lines _(test-support)_
  - class: `ImagePerfWarningsOversizedComponent`
- `packages/core/test/bundling/image-directive/e2e/image-perf-warnings-oversized/svg-no-perf-oversized-warnings.ts` — 21 lines _(test-support)_
  - class: `SvgNoOversizedPerfWarningsComponent`



## `packages/core/test/bundling/image-directive/e2e/lcp-check/`

- `packages/core/test/bundling/image-directive/e2e/lcp-check/lcp-check.e2e-spec.ts` — 43 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/lcp-check/lcp-check.ts` — 46 lines _(test-support)_
  - class: `LcpCheckComponent`



## `packages/core/test/bundling/image-directive/e2e/lcp-check-duplicate/`

- `packages/core/test/bundling/image-directive/e2e/lcp-check-duplicate/lcp-check-duplicate.e2e-spec.ts` — 36 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/lcp-check-duplicate/lcp-check-duplicate.ts` — 42 lines _(test-support)_
  - class: `LcpCheckDuplicate`



## `packages/core/test/bundling/image-directive/e2e/oversized-image/`

- `packages/core/test/bundling/image-directive/e2e/oversized-image/oversized-image.e2e-spec.ts` — 31 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/oversized-image/oversized-image.ts` — 46 lines _(test-support)_
  - class: `OversizedImageComponentPassing`, `OversizedImageComponentFailing`



## `packages/core/test/bundling/image-directive/e2e/preconnect-check/`

- `packages/core/test/bundling/image-directive/e2e/preconnect-check/preconnect-check.e2e-spec.ts` — 50 lines _(spec)_
- `packages/core/test/bundling/image-directive/e2e/preconnect-check/preconnect-check.ts` — 58 lines _(test-support)_
  - class: `PreconnectCheckComponent`



## `packages/core/test/bundling/router/`

- `packages/core/test/bundling/router/main.ts` — 79 lines _(test-support)_
- `packages/core/test/bundling/router/treeshaking_spec.ts` — 26 lines _(spec)_



## `packages/core/test/bundling/standalone_bootstrap/`

- `packages/core/test/bundling/standalone_bootstrap/main.ts` — 19 lines _(test-support)_
- `packages/core/test/bundling/standalone_bootstrap/treeshaking_spec.ts` — 26 lines _(spec)_



## `packages/core/test/change_detection/`

- `packages/core/test/change_detection/util.ts` — 166 lines _(test-support)_
  - function: `iterableDifferToString`, `iterableChangesAsString`, `kvChangesAsString`, `testChangesAsString`



## `packages/core/test/change_detection/differs/`

- `packages/core/test/change_detection/differs/default_iterable_differ_spec.ts` — 758 lines _(spec)_
- `packages/core/test/change_detection/differs/default_keyvalue_differ_spec.ts` — 285 lines _(spec)_
- `packages/core/test/change_detection/differs/iterable_differs_spec.ts` — 102 lines _(spec)_
- `packages/core/test/change_detection/differs/keyvalue_differs_spec.ts` — 37 lines _(spec)_



## `packages/core/test/compiler/`

- `packages/core/test/compiler/compiler_facade_spec.ts` — 75 lines _(spec)_



## `packages/core/test/debug/`

- `packages/core/test/debug/debug_node_spec.ts` — 1435 lines _(spec)_
- `packages/core/test/debug/di_graph_spec.ts` — 657 lines _(spec)_
- `packages/core/test/debug/stability_debug_spec.ts` — 65 lines _(spec)_



## `packages/core/test/debug/ai/`

- `packages/core/test/debug/ai/registration_spec.ts` — 49 lines _(spec)_
- `packages/core/test/debug/ai/signal_graph_spec.ts` — 81 lines _(spec)_



## `packages/core/test/di/`

- `packages/core/test/di/forward_ref_spec.ts` — 19 lines _(spec)_
- `packages/core/test/di/injector_spec.ts` — 31 lines _(spec)_
- `packages/core/test/di/r3_injector_spec.ts` — 514 lines _(spec)_
- `packages/core/test/di/static_injector_spec.ts` — 212 lines _(spec)_



## `packages/core/test/di/inject_async/`

- `packages/core/test/di/inject_async/inject_async_spec.ts` — 340 lines _(spec)_
- `packages/core/test/di/inject_async/test_service.ts` — 13 lines _(test-support)_
  - has a default export



## `packages/core/test/dom/`

- `packages/core/test/dom/dom_adapter_spec.ts` — 73 lines _(spec)_
- `packages/core/test/dom/shim_spec.ts` — 26 lines _(spec)_



## `packages/core/test/hydration/`

- `packages/core/test/hydration/compression_spec.ts` — 53 lines _(spec)_
- `packages/core/test/hydration/marker_spec.ts` — 63 lines _(spec)_



## `packages/core/test/i18n/`

- `packages/core/test/i18n/locale_data_api_spec.ts` — 117 lines _(spec)_



## `packages/core/test/legacy_animation/`

- `packages/core/test/legacy_animation/legacy_animation_integration_spec.ts` — 4778 lines _(spec)_
- `packages/core/test/legacy_animation/legacy_animation_query_integration_spec.ts` — 3735 lines _(spec)_
- `packages/core/test/legacy_animation/legacy_animation_router_integration_spec.ts` — 602 lines _(spec)_
- `packages/core/test/legacy_animation/legacy_animations_with_web_animations_integration_spec.ts` — 730 lines _(spec)_



## `packages/core/test/linker/`

- `packages/core/test/linker/change_detection_integration_spec.ts` — 2221 lines _(spec)_
- `packages/core/test/linker/inheritance_integration_spec.ts` — 96 lines _(spec)_
- `packages/core/test/linker/integration_spec.ts` — 3083 lines _(spec)_
  - class: `DirectiveWithMultipleExportAsNames`, `ParentCmp`
- `packages/core/test/linker/ng_container_integration_spec.ts` — 131 lines _(spec)_
- `packages/core/test/linker/ng_module_integration_spec.ts` — 1210 lines _(spec)_
- `packages/core/test/linker/projection_integration_spec.ts` — 1126 lines _(spec)_
- `packages/core/test/linker/query_integration_spec.ts` — 1179 lines _(spec)_
- `packages/core/test/linker/query_list_spec.ts` — 199 lines _(spec)_
- `packages/core/test/linker/regression_integration_spec.ts` — 632 lines _(spec)_
  - class: `FakeRecursiveComp`
- `packages/core/test/linker/resource_loader_mock.ts` — 147 lines _(test-support)_
  - class: `MockResourceLoader`
- `packages/core/test/linker/security_integration_spec.ts` — 423 lines _(spec)_
- `packages/core/test/linker/source_map_integration_node_only_spec.ts` — 325 lines _(spec)_
- `packages/core/test/linker/source_map_util.ts` — 38 lines _(test-support)_
  - interface: `SourceLocation`
  - function: `originalPositionFor`, `extractSourceMap`
- `packages/core/test/linker/view_injector_integration_spec.ts` — 1170 lines _(spec)_
  - class: `PipeNeedsService`, `DuplicatePipe1`, `DuplicatePipe2`



## `packages/core/test/metadata/`

- `packages/core/test/metadata/di_spec.ts` — 131 lines _(spec)_
- `packages/core/test/metadata/resource_loading_spec.ts` — 220 lines _(spec)_



## `packages/core/test/reflection/`

- `packages/core/test/reflection/es2015_inheritance_fixture.ts` — 23 lines _(test-support)_
  - class: `ChildNoCtor`, `ChildWithCtor`, `ChildNoCtorPrivateProps`



## `packages/core/test/render3/`

- `packages/core/test/render3/change_detection_spec.ts` — 48 lines _(spec)_
- `packages/core/test/render3/deps_tracker_spec.ts` — 1388 lines _(spec)_
- `packages/core/test/render3/di_spec.ts` — 187 lines _(spec)_
- `packages/core/test/render3/foreign_component_spec.ts` — 370 lines _(spec)_
- `packages/core/test/render3/foreign_view_spec.ts` — 171 lines _(spec)_
- `packages/core/test/render3/global_utils_spec.ts` — 99 lines _(spec)_
- `packages/core/test/render3/i18n_debug_spec.ts` — 211 lines _(spec)_
- `packages/core/test/render3/imported_renderer2.ts` — 74 lines _(test-support)_
  - class: `SimpleDomEventsPlugin`
  - function: `getRendererFactory2`
- `packages/core/test/render3/instructions_spec.ts` — 699 lines _(spec)_
- `packages/core/test/render3/integration_spec.ts` — 776 lines _(spec)_
- `packages/core/test/render3/is_shape_of.ts` — 210 lines _(test-support)_
  - type: `ShapeOf`
  - function: `isShapeOf`, `isTI18n`, `isTIcu`, `isTView`, `isTNode`, `isDOMNode`, `isDOMElement`, `isDOMText`
- `packages/core/test/render3/is_shape_of_spec.ts` — 39 lines _(spec)_
- `packages/core/test/render3/jit_environment_spec.ts` — 98 lines _(spec)_
- `packages/core/test/render3/list_reconciliation_spec.ts` — 530 lines _(spec)_
- `packages/core/test/render3/load_domino.ts` — 28 lines _(test-support)_
- `packages/core/test/render3/matchers.ts` — 260 lines _(test-support)_
  - function: `matchObjectShape`, `matchTView`, `matchTNode`, `matchTI18n`, `matchTIcu`, `matchDomElement`, `matchDomText`, `matchI18nMutableOpCodes`
- `packages/core/test/render3/matchers_spec.ts` — 103 lines _(spec)_
- `packages/core/test/render3/metadata_spec.ts` — 69 lines _(spec)_
- `packages/core/test/render3/multi_map_spec.ts` — 67 lines _(spec)_
- `packages/core/test/render3/node_selector_matcher_spec.ts` — 754 lines _(spec)_
- `packages/core/test/render3/providers_helper.ts` — 137 lines _(test-support)_
  - interface: `ComponentTest`
  - function: `expectProvidersScenario`
- `packages/core/test/render3/providers_spec.ts` — 1347 lines _(spec)_
- `packages/core/test/render3/query_spec.ts` — 113 lines _(spec)_
- `packages/core/test/render3/reactive_safety_spec.ts` — 240 lines _(spec)_
- `packages/core/test/render3/reactivity_spec.ts` — 1047 lines _(spec)_
- `packages/core/test/render3/testing_spec.ts` — 59 lines _(spec)_
- `packages/core/test/render3/utils.ts` — 142 lines _(test-support)_
  - function: `dedent`, `matchDebug`, `buildFailureMessage`
- `packages/core/test/render3/view_fixture.ts` — 268 lines _(test-support)_
  - class: `ViewFixture`
- `packages/core/test/render3/view_utils_spec.ts` — 32 lines _(spec)_



## `packages/core/test/render3/i18n/`

- `packages/core/test/render3/i18n/i18n_insert_before_index_spec.ts` — 214 lines _(spec)_
- `packages/core/test/render3/i18n/i18n_parse_spec.ts` — 356 lines _(spec)_
- `packages/core/test/render3/i18n/i18n_spec.ts` — 1005 lines _(spec)_



## `packages/core/test/render3/instructions/`

- `packages/core/test/render3/instructions/mock_renderer_factory.ts` — 95 lines _(test-support)_
  - class: `MockRendererFactory`
- `packages/core/test/render3/instructions/shared_spec.ts` — 94 lines _(spec)_
  - function: `enterViewWithOneDiv`, `clearFirstUpdatePass`, `rewindBindingIndex`
- `packages/core/test/render3/instructions/styling_spec.ts` — 620 lines _(spec)_



## `packages/core/test/render3/interfaces/`

- `packages/core/test/render3/interfaces/node_spec.ts` — 36 lines _(spec)_



## `packages/core/test/render3/ivy/`

- `packages/core/test/render3/ivy/jit_spec.ts` — 552 lines _(spec)_



## `packages/core/test/render3/jit/`

- `packages/core/test/render3/jit/declare_classmetadata_spec.ts` — 88 lines _(spec)_
- `packages/core/test/render3/jit/declare_component_spec.ts` — 722 lines _(spec)_
- `packages/core/test/render3/jit/declare_directive_spec.ts` — 406 lines _(spec)_
- `packages/core/test/render3/jit/declare_factory_spec.ts` — 98 lines _(spec)_
- `packages/core/test/render3/jit/declare_injectable_spec.ts` — 187 lines _(spec)_
- `packages/core/test/render3/jit/declare_injector_spec.ts` — 45 lines _(spec)_
- `packages/core/test/render3/jit/declare_ng_module_spec.ts` — 147 lines _(spec)_
- `packages/core/test/render3/jit/declare_pipe_spec.ts` — 65 lines _(spec)_
- `packages/core/test/render3/jit/directive_spec.ts` — 168 lines _(spec)_
- `packages/core/test/render3/jit/matcher.ts` — 60 lines _(test-support)_
  - function: `functionContaining`



## `packages/core/test/render3/styling_next/`

- `packages/core/test/render3/styling_next/class_differ_spec.ts` — 29 lines _(spec)_
- `packages/core/test/render3/styling_next/static_styling_spec.ts` — 60 lines _(spec)_
- `packages/core/test/render3/styling_next/style_binding_list_spec.ts` — 587 lines _(spec)_
  - function: `getStylingBindingHead`



## `packages/core/test/render3/util/`

- `packages/core/test/render3/util/attr_util_spec.ts` — 176 lines _(spec)_
- `packages/core/test/render3/util/stringify_util_spec.ts` — 48 lines _(spec)_
- `packages/core/test/render3/util/view_traversal_utils_spec.ts` — 100 lines _(spec)_



## `packages/core/test/resource/`

- `packages/core/test/resource/chain_spec.ts` — 99 lines _(spec)_
- `packages/core/test/resource/debounce_spec.ts` — 346 lines _(spec)_
- `packages/core/test/resource/params_status_spec.ts` — 127 lines _(spec)_
- `packages/core/test/resource/resource_snapshot_spec.ts` — 132 lines _(spec)_
- `packages/core/test/resource/resource_spec.ts` — 1189 lines _(spec)_



## `packages/core/test/sanitization/`

- `packages/core/test/sanitization/html_sanitizer_spec.ts` — 308 lines _(spec)_
- `packages/core/test/sanitization/sanitization_spec.ts` — 221 lines _(spec)_
- `packages/core/test/sanitization/url_sanitizer_spec.ts` — 75 lines _(spec)_



## `packages/core/test/signals/`

- `packages/core/test/signals/computed_spec.ts` — 343 lines _(spec)_
- `packages/core/test/signals/effect_util.ts` — 40 lines _(test-support)_
  - function: `testingEffect`, `flushEffects`, `resetEffects`
- `packages/core/test/signals/glitch_free_spec.ts` — 45 lines _(spec)_
- `packages/core/test/signals/is_signal_spec.ts` — 64 lines _(spec)_
- `packages/core/test/signals/linked_signal_spec.ts` — 524 lines _(spec)_
- `packages/core/test/signals/non_reactive_spec.ts` — 106 lines _(spec)_
- `packages/core/test/signals/signal_graph_leak_spec.ts` — 69 lines _(spec)_
- `packages/core/test/signals/signal_spec.ts` — 233 lines _(spec)_
- `packages/core/test/signals/watch_spec.ts` — 339 lines _(spec)_



## `packages/core/test/strict_types/`

- `packages/core/test/strict_types/inheritance_spec.ts` — 40 lines _(spec)_



## `packages/core/test/testability/`

- `packages/core/test/testability/testability_spec.ts` — 342 lines _(spec)_



## `packages/core/test/util/`

- `packages/core/test/util/array_utils_spec.ts` — 142 lines _(spec)_
- `packages/core/test/util/coercion_spec.ts` — 134 lines _(spec)_
- `packages/core/test/util/comparison.ts` — 56 lines _(test-support)_
- `packages/core/test/util/decorators_spec.ts` — 75 lines _(spec)_
- `packages/core/test/util/dom_spec.ts` — 50 lines _(spec)_
- `packages/core/test/util/global_spec.ts` — 23 lines _(spec)_
- `packages/core/test/util/iterable.ts` — 19 lines _(test-support)_
  - class: `TestIterable`
- `packages/core/test/util/lang_spec.ts` — 28 lines _(spec)_
- `packages/core/test/util/stringify_spec.ts` — 35 lines _(spec)_



## `packages/core/test/webmcp/`

- `packages/core/test/webmcp/declare_tool_spec.ts` — 236 lines _(spec)_
- `packages/core/test/webmcp/provide_tools_spec.ts` — 129 lines _(spec)_



## `packages/core/test/zone/`

- `packages/core/test/zone/async-tagging-console.spec.ts` — 145 lines _(spec)_
- `packages/core/test/zone/ng_zone_spec.ts` — 1383 lines _(spec)_



## `packages/core/testing/`

- `packages/core/testing/index.ts` — 15 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/core/testing/public_api.ts` — 20 lines _(test-support)_
  - re-exports * from `./src/testing`
  - re-exports * from `./src/testing_private_export`
  - exports `Log as ɵLog` from `./src/testing_internal`



## `packages/core/testing/src/`

- `packages/core/testing/src/application_error_handler.ts` — 43 lines _(test-support)_
  - const: `RETHROW_APPLICATION_ERRORS_DEFAULT`
  - class: `TestBedApplicationErrorHandler`
- `packages/core/testing/src/async.ts` — 46 lines _(test-support)_
  - function: `waitForAsync`
- `packages/core/testing/src/component_fixture.ts` — 295 lines _(test-support)_
  - class: `ComponentFixture`
- `packages/core/testing/src/defer.ts` — 102 lines _(test-support)_
  - class: `DeferBlockFixture`
- `packages/core/testing/src/fake_async.ts` — 187 lines _(test-support)_
  - function: `resetFakeAsyncZone`, `resetFakeAsyncZoneIfExists`, `fakeAsync`, `tick`, `flush`, `discardPeriodicTasks`, `flushMicrotasks`
- `packages/core/testing/src/logger.ts` — 37 lines _(test-support)_
  - class: `Log`
- `packages/core/testing/src/metadata_override.ts` — 19 lines _(test-support)_
  - type: `MetadataOverride`
- `packages/core/testing/src/metadata_overrider.ts` — 149 lines _(test-support)_
  - class: `MetadataOverrider`
- `packages/core/testing/src/resolvers.ts` — 129 lines _(test-support)_
  - interface: `Resolver`
  - class: `DirectiveResolver`, `ComponentResolver`, `PipeResolver`, `NgModuleResolver`
- `packages/core/testing/src/styling.ts` — 84 lines _(test-support)_
  - function: `getSortedClassName`, `getElementClasses`, `getSortedStyle`, `getElementStyles`
- `packages/core/testing/src/test_bed.ts` — 999 lines _(test-support)_
  - interface: `TestBedStatic`, `TestComponentOptions`, `TestBed`
  - function: `getTestBed`, `inject`, `withModule`, `withModule`, `withModule`
  - class: `TestBedImpl`, `InjectSetupWrapper`
  - const: `TestBed`
- `packages/core/testing/src/test_bed_common.ts` — 142 lines _(test-support)_
  - const: `TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT`, `THROW_ON_UNKNOWN_ELEMENTS_DEFAULT`, `THROW_ON_UNKNOWN_PROPERTIES_DEFAULT`, `DEFER_BLOCK_DEFAULT_BEHAVIOR`, `ANIMATIONS_ENABLED_DEFAULT`, `ComponentFixtureAutoDetect`, `ComponentFixtureNoNgZone`
  - class: `TestComponentRenderer`
  - interface: `TestModuleMetadata`, `TestEnvironmentOptions`, `ModuleTeardownOptions`
- `packages/core/testing/src/test_bed_compiler.ts` — 1267 lines _(test-support)_
  - class: `TestBedCompiler`
- `packages/core/testing/src/test_hooks.ts` — 39 lines _(test-support)_
  - function: `getCleanupHook`
- `packages/core/testing/src/testing.ts` — 49 lines _(test-support)_
  - re-exports * from `./async`
  - re-exports * from `./metadata_override`
  - exports `ComponentFixture` from `./component_fixture`
  - exports `resetFakeAsyncZone`, `discardPeriodicTasks`, `fakeAsync`, `flush`, `flushMicrotasks`, `tick` from `./fake_async`
  - exports `TestBed`, `getTestBed`, `TestBedStatic`, `inject`, `InjectSetupWrapper`, `withModule`, `TestComponentOptions` from `./test_bed`
  - exports `TestComponentRenderer`, `ComponentFixtureAutoDetect`, `ComponentFixtureNoNgZone`, `TestModuleMetadata`, `TestEnvironmentOptions`, `ModuleTeardownOptions` from `./test_bed_common`
  - exports `MetadataOverrider as ɵMetadataOverrider` from `./metadata_overrider`
  - exports `ɵDeferBlockBehavior as DeferBlockBehavior`, `ɵDeferBlockState as DeferBlockState` from `../../src/core`
  - exports `DeferBlockFixture` from `./defer`
- `packages/core/testing/src/testing_internal.ts` — 12 lines _(test-support)_
  - re-exports * from `./logger`
  - exports `inject` from `./test_bed`
- `packages/core/testing/src/testing_private_export.ts` — 11 lines _(test-support)_
  - exports `FakeNavigation as ɵFakeNavigation` from `../../primitives/dom-navigation/testing`
  - exports `getCleanupHook as ɵgetCleanupHook` from `./test_hooks`



## `packages/core/third_party/@mcp-b/webmcp-types/`

- `packages/core/third_party/@mcp-b/webmcp-types/index.d.ts` — 10 lines _(typings)_
  - exports `InferArgsFromInputSchema`, `JsonSchemaForInference` from `./dist/json-schema.js`

