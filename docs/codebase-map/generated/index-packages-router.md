<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/router/`

114 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/router/`

- `packages/router/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/router/public_api.ts` — 17 lines
  - re-exports * from `./src/index`



## `packages/router/src/`

- `packages/router/src/activated_route_injector_feature.ts` — 20 lines
  - interface: `ActivatedRouteInjectorFeature`
  - const: `ACTIVATED_ROUTE_INJECTOR_FEATURE`
- `packages/router/src/apply_redirects.ts` — 208 lines
  - class: `NoMatch`, `AbsoluteRedirect`, `ApplyRedirects`
  - function: `namedOutletsRedirect`, `canLoadFails`
- `packages/router/src/create_router_state.ts` — 98 lines
  - function: `createRouterState`
- `packages/router/src/create_url_tree.ts` — 572 lines
  - function: `createUrlTreeFromSnapshot`, `createSegmentGroupFromRoute`, `createUrlTreeFromSegmentGroup`
- `packages/router/src/errors.ts` — 33 lines
  - const enum: `RuntimeErrorCode`
- `packages/router/src/events.ts` — 759 lines
  - type: `NavigationTrigger`, `PrivateRouterEvents`, `Event`
  - const: `IMPERATIVE_NAVIGATION`
  - enum: `EventType`, `NavigationCancellationCode`, `NavigationSkippedCode`
  - class: `RouterEvent`, `NavigationStart`, `NavigationEnd`, `NavigationCancel`, `NavigationSkipped`, `NavigationError`, `RoutesRecognized`, `GuardsCheckStart`, `GuardsCheckEnd`, `ResolveStart`, `ResolveEnd`, `RouteConfigLoadStart`, `RouteConfigLoadEnd`, `ChildActivationStart`, `ChildActivationEnd`, `ActivationStart`, `ActivationEnd`, `Scroll`, `BeforeActivateRoutes`, `BeforeRoutesRecognized`, `RedirectRequest`
  - function: `isRedirectingEvent`, `isPublicRouterEvent`, `stringifyEvent`
- `packages/router/src/index.ts` — 155 lines
  - re-exports * from `./models_deprecated`
  - re-exports * from `./private_export`
  - exports `createUrlTreeFromSnapshot` from `./create_url_tree`
  - exports `RouterLink`, `RouterLinkWithHref` from `./directives/router_link`
  - exports `RouterLinkActive` from `./directives/router_link_active`
  - exports `ROUTER_OUTLET_DATA`, `RouterOutlet`, `RouterOutletContract` from `./directives/router_outlet`
  - exports `ActivationEnd`, `ActivationStart`, `ChildActivationEnd`, `ChildActivationStart`, `Event`, `EventType`, `GuardsCheckEnd`, `GuardsCheckStart`, `NavigationCancel`, `NavigationCancellationCode as NavigationCancellationCode`, `NavigationEnd`, `NavigationError`, `NavigationSkipped`, `NavigationSkippedCode`, `NavigationStart`, `ResolveEnd`, `ResolveStart`, `RouteConfigLoadEnd`, `RouteConfigLoadStart`, `RouterEvent`, `RoutesRecognized`, `Scroll` from `./events`
  - exports `CanActivate`, `CanActivateChild`, `CanActivateChildFn`, `CanActivateFn`, `CanDeactivate`, `CanDeactivateFn`, `CanLoad`, `CanLoadFn`, `CanMatch`, `CanMatchFn`, `Data`, `DefaultExport`, `GuardResult`, `LoadChildren`, `LoadChildrenCallback`, `MaybeAsync`, `NavigationBehaviorOptions`, `OnSameUrlNavigation`, `PartialMatchRouteSnapshot`, `QueryParamsHandling`, `RedirectCommand`, `RedirectFunction`, `Resolve`, `ResolveData`, …(+6) from `./models`
  - exports `ViewTransitionInfo`, `ViewTransitionsFeatureOptions` from `./utils/view_transition`
  - exports `Navigation`, `NavigationExtras`, `UrlCreationOptions` from `./navigation_transition`
  - exports `DefaultTitleStrategy`, `TitleStrategy` from `./page_title_strategy`
  - exports `ComponentInputBindingFeature`, `DebugTracingFeature`, `DisabledInitialNavigationFeature`, `EnabledBlockingInitialNavigationFeature`, `InitialNavigationFeature`, `InMemoryScrollingFeature`, `NavigationErrorHandlerFeature`, `PreloadingFeature`, `provideRouter`, `RouterConfigurationFeature`, `RouterFeature`, `RouterFeatures`, `RouterHashLocationFeature`, `ViewTransitionsFeature`, `withComponentInputBinding`, `withDebugTracing`, `withDisabledInitialNavigation`, `withEnabledBlockingInitialNavigation`, `withExperimentalAutoCleanupInjectors`, `withExperimentalPlatformNavigation`, `withHashLocation`, `withInMemoryScrolling`, `withNavigationErrorHandler`, `withPreloading`, …(+2) from `./provide_router`
  - exports `BaseRouteReuseStrategy`, `destroyDetachedRouteHandle`, `DetachedRouteHandle`, `RouteReuseStrategy` from `./route_reuse_strategy`
  - exports `Router` from `./router`
  - exports `ExtraOptions`, `InitialNavigation`, `InMemoryScrollingOptions`, `ROUTER_CONFIGURATION`, `RouterConfigOptions`, `ComponentInputBindingOptions` from `./router_config`
  - exports `ROUTES` from `./router_config_loader`
  - exports `ROUTER_INITIALIZER`, `RouterModule` from `./router_module`
  - exports `ChildrenOutletContexts`, `OutletContext` from `./router_outlet_context`
  - exports `NoPreloading`, `PreloadAllModules`, `PreloadingStrategy`, `RouterPreloader` from `./router_preloader`
  - exports `ActivatedRoute`, `ActivatedRouteSnapshot`, `RouterState`, `RouterStateSnapshot` from `./router_state`
  - exports `convertToParamMap`, `defaultUrlMatcher`, `ParamMap`, `Params`, `PRIMARY_OUTLET` from `./shared`
  - exports `UrlHandlingStrategy` from `./url_handling_strategy`
  - exports `DefaultUrlSerializer`, `isActive`, `IsActiveMatchOptions`, `UrlSegment`, `UrlSegmentGroup`, `UrlSerializer`, `UrlTree` from `./url_tree`
  - exports `mapToCanActivate`, `mapToCanActivateChild`, `mapToCanDeactivate`, `mapToCanMatch`, `mapToResolve` from `./utils/functional_guards`
  - exports `VERSION` from `./version`
- `packages/router/src/models.ts` — 1621 lines
  - type: `OnSameUrlNavigation`, `DeprecatedGuard`, `DeprecatedResolve`, `GuardResult`, `MaybeAsync`, `Routes`, `UrlMatchResult`, `UrlMatcher`, `Data`, `ResolveData`, `LoadChildrenCallback`, `LoadChildren`, `QueryParamsHandling`, `RedirectFunction`, `RunGuardsAndResolvers`, `CanActivateFn`, `CanActivateChildFn`, `CanDeactivateFn`, `CanMatchFn`, `PartialMatchRouteSnapshot`, `ResolveFn`, `CanLoadFn`
  - class: `RedirectCommand`
  - interface: `Route`, `LoadedRouterConfig`, `CanActivate`, `CanActivateChild`, `CanDeactivate`, `CanMatch`, `Resolve`, `CanLoad`, `NavigationBehaviorOptions`
  - exports `DefaultExport` from `@angular/core`
- `packages/router/src/models_deprecated.ts` — 14 lines
  - exports `DeprecatedGuard`, `DeprecatedResolve` from `./models`
- `packages/router/src/navigation_canceling_error.ts` — 63 lines
  - const: `NAVIGATION_CANCELING_ERROR`
  - type: `NavigationCancelingError`, `RedirectingNavigationCancelingError`
  - function: `redirectingNavigationError`, `navigationCancelingError`, `isRedirectingNavigationCancelingError`, `isNavigationCancelingError`
- `packages/router/src/navigation_transition.ts` — 1057 lines
  - interface: `UrlCreationOptions`, `NavigationExtras`, `Navigation`, `NavigationTransition`
  - type: `RestoredState`
  - const: `NAVIGATION_ERROR_HANDLER`
  - class: `NavigationTransitions`
  - function: `isBrowserTriggeredNavigation`
- `packages/router/src/page_title_strategy.ts` — 86 lines
  - class: `TitleStrategy`, `DefaultTitleStrategy`
- `packages/router/src/private_export.ts` — 15 lines
  - exports `ɵEmptyOutletComponent` from `./components/empty_outlet`
  - exports `RestoredState as ɵRestoredState` from `./navigation_transition`
  - exports `loadChildren as ɵloadChildren` from `./router_config_loader`
  - exports `ROUTER_PROVIDERS as ɵROUTER_PROVIDERS` from `./router_module`
  - exports `afterNextNavigation as ɵafterNextNavigation` from `./utils/navigations`
  - exports `withActivatedRouteInjectors as ɵwithActivatedRouteInjectors` from `./provide_router`
- `packages/router/src/provide_router.ts` — 945 lines
  - function: `provideRouter`, `rootRoute`, `withInMemoryScrolling`, `withExperimentalPlatformNavigation`, `getBootstrapListener`, `withEnabledBlockingInitialNavigation`, `withDisabledInitialNavigation`, `withDebugTracing`, `withPreloading`, `withRouterConfig`, `withHashLocation`, `withNavigationErrorHandler`, `withExperimentalAutoCleanupInjectors`, `withComponentInputBinding`, `withViewTransitions`, `withActivatedRouteInjectors`
  - interface: `RouterFeature`
  - type: `InMemoryScrollingFeature`, `ExperimentalPlatformNavigationFeature`, `EnabledBlockingInitialNavigationFeature`, `InitialNavigationFeature`, `DisabledInitialNavigationFeature`, `DebugTracingFeature`, `PreloadingFeature`, `RouterConfigurationFeature`, `RouterHashLocationFeature`, `NavigationErrorHandlerFeature`, `ExperimentalAutoCleanupInjectorsFeature`, `ComponentInputBindingFeature`, `ViewTransitionsFeature`, `ActivatedRouteInjectorFeature`, `RouterFeatures`
  - const enum: `RouterFeatureKind`
- `packages/router/src/recognize.ts` — 610 lines
  - function: `recognize`
  - class: `Recognizer`
- `packages/router/src/route_injector_cleanup.ts` — 105 lines
  - const: `ROUTE_INJECTOR_CLEANUP`
  - function: `routeInjectorCleanup`
- `packages/router/src/route_reuse_strategy.ts` — 161 lines
  - type: `DetachedRouteHandle`, `DetachedRouteHandleInternal`
  - function: `destroyDetachedRouteHandle`
  - interface: `ExperimentalRouteReuseStrategy`
  - class: `RouteReuseStrategy`, `BaseRouteReuseStrategy`, `DefaultRouteReuseStrategy`
- `packages/router/src/router.ts` — 725 lines
  - class: `Router`
- `packages/router/src/router_config.ts` — 314 lines
  - type: `InitialNavigation`
  - interface: `RouterConfigOptions`, `InMemoryScrollingOptions`, `ComponentInputBindingOptions`, `ExtraOptions`
  - const: `ROUTER_CONFIGURATION`
- `packages/router/src/router_config_loader.ts` — 180 lines
  - const: `ROUTES`
  - class: `RouterConfigLoader`
  - function: `loadChildren`
- `packages/router/src/router_devtools.ts` — 37 lines
  - function: `getLoadedRoutes`, `getRouterInstance`, `navigateByUrl`
- `packages/router/src/router_module.ts` — 263 lines
  - const: `ROUTER_FORROOT_GUARD`, `ROUTER_PROVIDERS`, `ROUTER_INITIALIZER`
  - class: `RouterModule`
  - function: `provideRouterScroller`, `provideForRootGuard`
- `packages/router/src/router_outlet_context.ts` — 95 lines
  - class: `OutletContext`, `ChildrenOutletContexts`
- `packages/router/src/router_preloader.ts` — 200 lines
  - class: `PreloadingStrategy`, `PreloadAllModules`, `NoPreloading`, `RouterPreloader`
- `packages/router/src/router_scroller.ts` — 168 lines
  - const: `ROUTER_SCROLLER`
  - class: `RouterScroller`
- `packages/router/src/router_state.ts` — 551 lines
  - class: `RouterState`, `ActivatedRoute`, `ActivatedRouteSnapshot`, `RouterStateSnapshot`
  - function: `createEmptyState`, `createEmptyStateSnapshot`, `getInherited`, `advanceActivatedRoute`, `equalParamsAndUrlSegments`, `hasStaticTitle`
  - type: `ParamsInheritanceStrategy`, `Inherited`
  - const: `DEFAULT_PARAMS_INHERITANCE_STRATEGY`
- `packages/router/src/shared.ts` — 219 lines
  - const: `PRIMARY_OUTLET`, `RouteTitleKey`
  - type: `Params`
  - interface: `ParamMap`
  - function: `convertToParamMap`, `defaultUrlMatcher`
- `packages/router/src/url_handling_strategy.ts` — 61 lines
  - class: `UrlHandlingStrategy`, `DefaultUrlHandlingStrategy`
- `packages/router/src/url_tree.ts` — 887 lines
  - interface: `IsActiveMatchOptions`
  - const: `exactMatchOptions`, `subsetMatchOptions`
  - function: `isActive`, `containsTree`, `equalSegments`, `equalPath`, `mapChildrenIntoArray`, `serializePaths`, `encodeUriQuery`, `encodeUriFragment`, `encodeUriSegment`, `decode`, `decodeQuery`, `serializePath`, `createRoot`, `squashSegmentGroup`, `isUrlTree`
  - class: `UrlTree`, `UrlSegmentGroup`, `UrlSegment`, `UrlSerializer`, `DefaultUrlSerializer`
- `packages/router/src/version.ts` — 21 lines
  - const: `VERSION`



## `packages/router/src/components/`

- `packages/router/src/components/empty_outlet.ts` — 51 lines
  - class: `ɵEmptyOutletComponent`
  - function: `standardizeConfig`
  - exports `ɵEmptyOutletComponent as EmptyOutletComponent`



## `packages/router/src/directives/`

- `packages/router/src/directives/router_link.ts` — 593 lines
  - class: `ReactiveRouterState`, `RouterLink`
  - exports `RouterLink as RouterLinkWithHref`
- `packages/router/src/directives/router_link_active.ts` — 307 lines
  - class: `RouterLinkActive`
- `packages/router/src/directives/router_outlet.ts` — 541 lines
  - const: `ROUTER_OUTLET_DATA`, `INPUT_BINDER`
  - interface: `RouterOutletContract`
  - class: `RouterOutlet`, `RoutedComponentInputBinder`



## `packages/router/src/operators/`

- `packages/router/src/operators/activate_routes.ts` — 240 lines
  - class: `ActivateRoutes`
- `packages/router/src/operators/check_guards.ts` — 288 lines
  - function: `checkGuards`, `runCanLoadGuards`, `runCanMatchGuards`
- `packages/router/src/operators/prioritized_guard_value.ts` — 50 lines
  - function: `prioritizedGuardValue`
- `packages/router/src/operators/recognize.ts` — 42 lines
  - function: `recognize`
- `packages/router/src/operators/resolve_data.ts` — 141 lines
  - function: `resolveData`
- `packages/router/src/operators/setup_activated_route_injectors.ts` — 65 lines
  - function: `setupActivatedRouteInjectors`
- `packages/router/src/operators/switch_tap.ts` — 29 lines
  - function: `switchTap`



## `packages/router/src/statemanager/`

- `packages/router/src/statemanager/navigation_state_manager.ts` — 605 lines
  - class: `NavigationStateManager`
- `packages/router/src/statemanager/state_manager.ts` — 325 lines
  - class: `StateManager`, `HistoryStateManager`



## `packages/router/src/utils/`

- `packages/router/src/utils/abort_signal_to_observable.ts` — 34 lines
  - function: `abortSignalToObservable`, `takeUntilAbort`
- `packages/router/src/utils/collection.ts` — 94 lines
  - function: `shallowEqualArrays`, `shallowEqual`, `getDataKeys`, `equalArraysOrString`, `last`, `wrapIntoObservable`, `wrapIntoPromise`
- `packages/router/src/utils/config.ts` — 242 lines
  - function: `getOrCreateRouteInjectorIfNeeded`, `getLoadedRoutes`, `getLoadedInjector`, `getLoadedComponent`, `getProvidersInjector`, `validateConfig`, `assertStandalone`, `getOutlet`, `sortByMatchingOutlets`
- `packages/router/src/utils/config_matching.ts` — 246 lines
  - interface: `MatchResult`
  - function: `createPreMatchRouteSnapshot`, `matchWithChecks`, `match`, `split`, `emptyPathMatch`, `noLeftoversInUrl`
- `packages/router/src/utils/first_value_from.ts` — 21 lines
  - function: `firstValueFrom`
- `packages/router/src/utils/functional_guards.ts` — 105 lines
  - function: `mapToCanMatch`, `mapToCanActivate`, `mapToCanActivateChild`, `mapToCanDeactivate`, `mapToResolve`
- `packages/router/src/utils/navigations.ts` — 67 lines
  - function: `afterNextNavigation`
- `packages/router/src/utils/preactivation.ts` — 234 lines
  - class: `CanActivate`, `CanDeactivate`
  - type: `Checks`
  - function: `getAllRouteGuards`, `getCanActivateChild`, `getTokenOrFunctionIdentity`
- `packages/router/src/utils/tree.ts` — 116 lines
  - class: `Tree`, `TreeNode`
  - function: `nodeChildrenAsMap`
- `packages/router/src/utils/type_guards.ts` — 56 lines
  - function: `isFunction`, `isBoolean`, `isCanLoad`, `isCanActivate`, `isCanActivateChild`, `isCanDeactivate`, `isCanMatch`, `isEmptyError`
- `packages/router/src/utils/view_transition.ts` — 130 lines
  - const: `CREATE_VIEW_TRANSITION`, `VIEW_TRANSITION_OPTIONS`
  - interface: `ViewTransitionsFeatureOptions`, `ViewTransitionInfo`
  - function: `createViewTransition`



## `packages/router/test/`

- `packages/router/test/activated_route_injector.spec.ts` — 229 lines _(spec)_
- `packages/router/test/apply_redirects.spec.ts` — 1943 lines _(spec)_
- `packages/router/test/bootstrap.spec.ts` — 640 lines _(spec)_
- `packages/router/test/computed_state_restoration.spec.ts` — 561 lines _(spec)_
- `packages/router/test/config.spec.ts` — 183 lines _(spec)_
- `packages/router/test/create_router_state.spec.ts` — 268 lines _(spec)_
- `packages/router/test/create_url_tree.spec.ts` — 842 lines _(spec)_
- `packages/router/test/default_export_component.ts` — 16 lines _(test-support)_
  - has a default export
- `packages/router/test/default_export_routes.ts` — 19 lines _(test-support)_
  - class: `TestRoute`
  - has a default export
- `packages/router/test/helpers.ts` — 53 lines _(test-support)_
  - class: `Logger`
  - type: `ARSArgs`
  - function: `createActivatedRouteSnapshot`
- `packages/router/test/page_title_strategy_spec.ts` — 214 lines _(spec)_
  - class: `BlankCmp`, `RootCmp`, `TestModule`, `TitleResolver`
- `packages/router/test/recognize.spec.ts` — 1195 lines _(spec)_
- `packages/router/test/regression_integration.spec.ts` — 576 lines _(spec)_
- `packages/router/test/route_injector_cleanup.spec.ts` — 418 lines _(spec)_
- `packages/router/test/router.spec.ts` — 927 lines _(spec)_
- `packages/router/test/router_devtools.spec.ts` — 109 lines _(spec)_
  - class: `SimpleStandaloneComponent`, `RootCmp`
- `packages/router/test/router_link_active.spec.ts` — 116 lines _(spec)_
- `packages/router/test/router_link_spec.ts` — 333 lines _(spec)_
- `packages/router/test/router_navigation_extras.spec.ts` — 104 lines _(spec)_
- `packages/router/test/router_preloader.spec.ts` — 911 lines _(spec)_
- `packages/router/test/router_scroller.spec.ts` — 377 lines _(spec)_
- `packages/router/test/router_state.spec.ts` — 312 lines _(spec)_
- `packages/router/test/shared.spec.ts` — 55 lines _(spec)_
- `packages/router/test/standalone.spec.ts` — 553 lines _(spec)_
  - class: `SimpleStandaloneComponent`, `NotStandaloneComponent`, `RootCmp`
- `packages/router/test/trailing_slash_integration.spec.ts` — 179 lines _(spec)_
- `packages/router/test/url_serializer.spec.ts` — 489 lines _(spec)_
- `packages/router/test/url_tree.spec.ts` — 377 lines _(spec)_
- `packages/router/test/view_transitions.spec.ts` — 114 lines _(spec)_
- `packages/router/test/with_platform_navigation.spec.ts` — 453 lines _(spec)_



## `packages/router/test/directives/`

- `packages/router/test/directives/router_outlet.spec.ts` — 675 lines _(spec)_



## `packages/router/test/integration/`

- `packages/router/test/integration/duplicate_in_flight_navigations.spec.ts` — 202 lines _(spec)_
  - function: `duplicateInFlightNavigationsIntegrationSuite`
- `packages/router/test/integration/eager_url_update_strategy.spec.ts` — 250 lines _(spec)_
  - function: `eagerUrlUpdateStrategyIntegrationSuite`
- `packages/router/test/integration/guards.spec.ts` — 2493 lines _(spec)_
  - function: `guardsIntegrationSuite`
- `packages/router/test/integration/integration.spec.ts` — 981 lines _(spec)_
- `packages/router/test/integration/integration_helpers.ts` — 504 lines _(test-support)_
  - const: `ROUTER_DIRECTIVES`
  - function: `simulateLocationChange`, `expectEvents`, `onlyNavigationStartAndEnd`, `advance`, `createRoot`
  - class: `StringLinkCmp`, `StringLinkButtonCmp`, `AbsoluteLinkCmp`, `DummyLinkCmp`, `AbsoluteSimpleLinkCmp`, `RelativeLinkCmp`, `LinkWithQueryParamsAndFragment`, `LinkWithState`, `DivLinkWithState`, `LinkWithBrowserUrl`, `DivLinkWithBrowserUrl`, `SimpleCmp`, `CollectParamsCmp`, `BlankCmp`, `ModuleWithBlankCmpAsRoute`, `TeamCmp`, `TwoOutletsCmp`, `UserCmp`, `WrapperCmp`, `QueryParamsAndFragmentCmp`, `EmptyQueryParamsCmp`, `RouteCmp`, `RelativeLinkInIfCmp`, `OutletInNgIf`, `DummyLinkWithParentCmp`, `ComponentRecordingRoutePathAndUrl`, `RootCmp`, `RootCmpWithOnInit`, `RootCmpWithTwoOutlets`, `RootCmpWithNamedOutlet`, `ThrowingCmp`, `ConditionalThrowingCmp`, `LazyComponent`, `TestModule`
- `packages/router/test/integration/lazy_loading.spec.ts` — 1169 lines _(spec)_
  - function: `lazyLoadingIntegrationSuite`
- `packages/router/test/integration/navigation.spec.ts` — 1054 lines _(spec)_
  - function: `navigationIntegrationTestSuite`
- `packages/router/test/integration/navigation_errors.spec.ts` — 441 lines _(spec)_
  - function: `navigationErrorsIntegrationSuite`
- `packages/router/test/integration/redirects.spec.ts` — 138 lines _(spec)_
  - function: `redirectsIntegrationSuite`
- `packages/router/test/integration/route_data.spec.ts` — 730 lines _(spec)_
  - function: `routeDataIntegrationSuite`
- `packages/router/test/integration/route_reuse_strategy.spec.ts` — 496 lines _(spec)_
  - function: `routeReuseIntegrationSuite`
- `packages/router/test/integration/router_events.spec.ts` — 153 lines _(spec)_
  - function: `routerEventsIntegrationSuite`
- `packages/router/test/integration/router_link_active.spec.ts` — 310 lines _(spec)_
  - function: `routerLinkActiveIntegrationSuite`
- `packages/router/test/integration/router_links.spec.ts` — 489 lines _(spec)_
  - function: `routerLinkIntegrationSpec`



## `packages/router/test/operators/`

- `packages/router/test/operators/prioritized_guard_value.spec.ts` — 217 lines _(spec)_
- `packages/router/test/operators/resolve_data.spec.ts` — 254 lines _(spec)_



## `packages/router/test/utils/`

- `packages/router/test/utils/tree.spec.ts` — 56 lines _(spec)_



## `packages/router/testing/`

- `packages/router/testing/index.ts` — 15 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/router/testing/public_api.ts` — 17 lines _(test-support)_
  - re-exports * from `./src/testing`



## `packages/router/testing/src/`

- `packages/router/testing/src/router_testing_harness.ts` — 180 lines _(test-support)_
  - class: `RootFixtureService`, `RootCmp`, `RouterTestingHarness`
- `packages/router/testing/src/router_testing_module.ts` — 75 lines _(test-support)_
  - class: `RouterTestingModule`
- `packages/router/testing/src/testing.ts` — 27 lines _(test-support)_
  - re-exports * from `./router_testing_module`
  - exports `RouterTestingHarness` from `./router_testing_harness`
  - exports `RouterOutlet as ɵɵRouterOutlet` from `../../src/directives/router_outlet`
  - exports `RouterLink as ɵɵRouterLink` from `../../src/directives/router_link`
  - exports `RouterLinkActive as ɵɵRouterLinkActive` from `../../src/directives/router_link_active`
  - exports `EmptyOutletComponent as ɵɵEmptyOutletComponent` from `../../src/components/empty_outlet`



## `packages/router/testing/test/`

- `packages/router/testing/test/router_testing_harness.spec.ts` — 147 lines _(spec)_



## `packages/router/upgrade/`

- `packages/router/upgrade/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/router/upgrade/public_api.ts` — 17 lines
  - re-exports * from `./src/upgrade`



## `packages/router/upgrade/src/`

- `packages/router/upgrade/src/upgrade.ts` — 157 lines
  - const: `RouterUpgradeInitializer`
  - function: `locationSyncBootstrapListener`, `setUpLocationSync`



## `packages/router/upgrade/test/`

- `packages/router/upgrade/test/upgrade.spec.ts` — 206 lines _(spec)_
  - function: `injectorFactory`
  - class: `$rootScopeMock`
- `packages/router/upgrade/test/upgrade_location_test_module.ts` — 114 lines _(test-support)_
  - interface: `LocationUpgradeTestingConfig`
  - const: `LOC_UPGRADE_TEST_CONFIG`, `APP_BASE_HREF_RESOLVED`
  - class: `LocationUpgradeTestModule`
  - function: `provide$location`

