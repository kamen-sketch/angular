# `packages/router` — the router

`@angular/router` (114 files, ~39k lines) turns URLs into component trees. Almost all of its logic
is one long RxJS pipeline in `src/navigation_transition.ts`; the rest of the package is the data
model (`UrlTree`, `RouterState`), the operators that pipeline uses, and the directives.

Entry point: `index.ts` → `src/index.ts`.
Full file/symbol listing: [`generated/index-packages-router.md`](./generated/index-packages-router.md).

---

## 1. Data model

- `url_tree.ts` — `UrlTree`, `UrlSegment`, `UrlSegmentGroup`, `UrlSerializer`/
  `DefaultUrlSerializer`, and the matrix/query-param encoding. A `UrlTree` is the parsed,
  outlet-aware representation of a URL; everything downstream operates on it, not on strings.
- `router_state.ts` — `RouterState`/`RouterStateSnapshot` and `ActivatedRoute`/
  `ActivatedRouteSnapshot`. The non-snapshot variants expose observables **and** signals
  (`params`, `queryParams`, `data`, `title`) that stay alive across navigations; snapshots are
  immutable per navigation.
- `models.ts` — the `Route`/`Routes` config types, the guard/resolver interfaces
  (`CanActivateFn`, `CanDeactivateFn`, `CanMatchFn`, `ResolveFn`, `CanActivateChildFn`) and
  `RedirectCommand`. `models_deprecated.ts` keeps the class-based guard interfaces.
- `events.ts` — the full `Event` union: `NavigationStart`, `RouteConfigLoadStart/End`,
  `RoutesRecognized`, `GuardsCheckStart/End`, `ResolveStart/End`, `ActivationStart/End`,
  `ChildActivationStart/End`, `NavigationEnd`, `NavigationCancel` (+ `NavigationCancellationCode`),
  `NavigationError`, `NavigationSkipped` (+ `NavigationSkippedCode`), `Scroll`, `ViewTransitionEvent`.
- `errors.ts`, `navigation_canceling_error.ts` — the internal error carriers used to unwind the
  pipeline for redirects and cancellations.

## 2. The navigation pipeline (`src/navigation_transition.ts`)

`NavigationTransitions.setupNavigations()` builds one long `switchMap` chain over a
`Subject<NavigationTransition>`; using `switchMap` at the top is what makes a new navigation cancel
the in-flight one. In order, for each transition:

1. **Start** — fire `NavigationStart`, snapshot `currentNavigation`.
2. **Recognize** — `recognize()` (`src/recognize.ts`) matches the `UrlTree` against the config,
   applying redirects (`apply_redirects.ts`), running `canMatch` guards, lazily loading children
   (`router_config_loader.ts`, emitting `RouteConfigLoadStart`/`End`) and building the
   `RouterStateSnapshot`. `BeforeRoutesRecognized` then `RoutesRecognized` are fired. In
   `urlUpdateStrategy: 'eager'` mode the browser URL is updated here.
   If `UrlHandlingStrategy.shouldProcessUrl()` is false, the navigation is short-circuited with
   `NavigationSkipped`.
3. **Guards** — `GuardsCheckStart`, then `getAllRouteGuards` (`utils/preactivation.ts`) computes the
   `canDeactivate`/`canActivate`/`canActivateChild` checks by diffing current and target snapshots,
   and `checkGuards` (`operators/check_guards.ts`) runs them, honouring `prioritized_guard_value.ts`
   so the first rejection wins. Result: `GuardsCheckEnd`; a falsy result cancels with
   `GuardRejected`, a `RedirectCommand`/`UrlTree` result throws a redirecting error that restarts
   the pipeline at the new URL.
4. **Resolve** — `ResolveStart`, `resolveData` (`operators/resolve_data.ts`) runs the route
   resolvers with the configured `paramsInheritanceStrategy`, `ResolveEnd`. A resolver that
   completes without emitting cancels the navigation with `NoDataFromResolver`.
5. **Load components** — `loadComponent` for every matched route that has one, in parallel.
6. **Create router state** — `createRouterState` (`create_router_state.ts`) builds the new
   `RouterState`, reusing `ActivatedRoute` instances according to the `RouteReuseStrategy`
   (`route_reuse_strategy.ts`).
7. **View transition** — if `withViewTransitions()` is enabled, `utils/view_transition.ts` starts a
   `document.startViewTransition()` and the pipeline waits for its callback.
8. **Activate** — `activateRoutes` (`operators/activate_routes.ts`) walks the diff and
   attaches/detaches components in the `RouterOutlet`s via `RouterOutletContexts`
   (`router_outlet_context.ts`), firing `ActivationStart`/`ChildActivationStart` and their `End`
   counterparts.
9. **Finalize** — `NavigationEnd`, resolve the navigation promise, run
   `afterPreactivation`/cleanup, restore the URL on error (`NAVIGATION_ERROR_HANDLER` may convert an
   error into a redirect).

`statemanager/state_manager.ts` and `navigation_state_manager.ts` own the browser-history side:
reading `Location` events, pushing/replacing state, and restoring the URL when a navigation is
cancelled. `router_scroller.ts` implements `withInMemoryScrolling`, using `ViewportScroller` from
`@angular/common`.

## 3. Public surface

- `router.ts` — the `Router` service: `navigate`, `navigateByUrl`, `createUrlTree`
  (`create_url_tree.ts` implements relative-link resolution), `serializeUrl`, `parseUrl`,
  `isActive`, `events`, `routerState`, and the config accessors.
- `provide_router.ts` — `provideRouter` and its features: `withRouterConfig`,
  `withInMemoryScrolling`, `withDebugTracing`, `withPreloading`, `withDisabledInitialNavigation`,
  `withEnabledBlockingInitialNavigation`, `withHashLocation`, `withNavigationErrorHandler`,
  `withComponentInputBinding`, `withViewTransitions`, `withRouterUrlPropagation`-style tokens.
- `router_module.ts` — the NgModule form (`RouterModule.forRoot/forChild`).
- `directives/` — `RouterOutlet` (with named outlets and the `attach`/`detach` reuse hooks),
  `RouterLink` (also handles `[routerLink]` on non-anchor elements and `queryParamsHandling`),
  `RouterLinkActive`. `components/empty_outlet.ts` is the synthesised component for
  componentless routes.
- `router_preloader.ts` — `PreloadingStrategy`, `PreloadAllModules`, `NoPreloading`.
- `page_title_strategy.ts` — `TitleStrategy`/`DefaultTitleStrategy`.
- `url_handling_strategy.ts` — the hook that lets a hybrid app hand part of the URL to another
  router.
- `router_config.ts`, `router_config_loader.ts` — config validation
  (`utils/config.ts`) and lazy-loading of `loadChildren`/`loadComponent`.
- `router_devtools.ts` — the hooks Angular DevTools uses to inspect router state.
- `activated_route_injector_feature.ts`, `route_injector_cleanup.ts`,
  `operators/setup_activated_route_injectors.ts` — per-route environment injectors and their
  lifecycle.

## 4. Utilities (`src/utils/`)

`config_matching.ts` (the `matchWithChecks`/`match` implementation and `UrlMatcher` support),
`tree.ts` (the generic `Tree`/`TreeNode` used by `RouterState`), `collection.ts`,
`type_guards.ts`, `functional_guards.ts` (`mapToCanActivate` &c.), `navigations.ts`,
`preactivation.ts`, `view_transition.ts`, `first_value_from.ts`,
`abort_signal_to_observable.ts`. `operators/switch_tap.ts` is the small custom operator the
pipeline uses to run a side effect that may be async without changing the stream value.
