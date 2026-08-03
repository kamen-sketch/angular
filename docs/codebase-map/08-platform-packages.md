# Platform packages — browser, browser-dynamic, server, ssr

These packages provide the environment-specific half of the runtime: the `Renderer` that talks to
the DOM, the sanitizer, event plugins, and the server-side rendering entry points.

Generated indexes:
[`platform-browser`](./generated/index-packages-platform-browser.md) ·
[`platform-browser-dynamic`](./generated/index-packages-platform-browser-dynamic.md) ·
[`platform-server`](./generated/index-packages-platform-server.md)

---

## 1. `packages/platform-browser` (60 files, ~11k lines)

The default platform. `src/browser.ts` is the entry point and defines
**`bootstrapApplication`** (which delegates to core's `ɵinternalCreateApplication`),
`platformBrowser`, `BrowserModule`, and the browser provider set — this is where an application's
`DOCUMENT`, `ErrorHandler`, testability and `APP_ID` come from.

- `src/dom/dom_renderer.ts` — `DomRendererFactory2` and the concrete `Renderer2` implementations
  for each `ViewEncapsulation` mode (emulated attribute scoping, shadow DOM, none).
- `src/dom/shared_styles_host.ts` — deduplicated `<style>` injection shared across component
  instances, including the SSR-hydration path that adopts server-rendered styles.
- `src/dom/css_var_namespacer.ts` — CSS custom-property namespacing for emulated encapsulation.
- `src/dom/events/` — the pluggable event system: `event_manager.ts` (`EventManager`,
  `EVENT_MANAGER_PLUGINS`), `event_manager_plugin.ts`, `dom_events.ts` (the default plugin),
  `key_events.ts` (`keydown.enter`-style pseudo-events).
- `src/security/dom_sanitization_service.ts` — `DomSanitizer`, `bypassSecurityTrust*`.
- `src/browser/` — `browser_adapter.ts` (the `DomAdapter` implementation), `title.ts` (`Title`),
  `meta.ts` (`Meta`), `testability.ts`, and `tools/` (the `ng.profiler` debug tools).
- `src/hydration.ts` — `provideClientHydration` re-export plus the browser-side hydration providers
  and event-replay wiring.
- `src/dom/debug/by.ts` — the `By` predicates (`By.css`, `By.directive`) used with `DebugElement`.

**`platform-browser/animations`** wires the legacy `@angular/animations` engine into the browser
renderer: `src/module.ts` (`BrowserAnimationsModule`, `NoopAnimationsModule`), `src/providers.ts`
(`provideAnimations`, `provideNoopAnimations`), `src/animations.ts`.
**`platform-browser/animations/async`** (`provideAnimationsAsync`) defers loading the animation
engine until the first animation runs — `async_animation_renderer.ts` swaps a no-op renderer for the
real one once the dynamic import resolves.

## 2. `packages/platform-browser-dynamic` (13 files)

JIT bootstrapping for applications that ship the compiler: `platform-browser-dynamic.ts`
(`platformBrowserDynamic`, `BrowserDynamicTestingModule`), `compiler_factory.ts`,
`platform_providers.ts`, and `resource_loader/` (the `ResourceLoader` that fetches `templateUrl`
and `styleUrls` at runtime).

## 3. `packages/platform-server` (38 files, ~17k lines)

Server-side rendering.

- `src/server.ts` — `platformServer`, `ServerModule`, `PLATFORM_SERVER_PROVIDERS`, and the
  Domino DOM adapter bootstrap (`initDominoAdapter`).
- `src/utils.ts` — the actual render entry points. `renderApplication(bootstrap, options)` and
  `renderModule(moduleType, options)` both funnel into `renderInternal`, which:
  1. creates a server platform with the provided `document`/`url`,
  2. bootstraps the application and waits for stability (`PendingTasks`, `ApplicationRef.whenStable`),
  3. calls `prepareForHydration` — serialising the view tree via core's hydration `annotateForHydration`,
  4. appends the server-context marker (`ng-server-context`) and the SSR content-integrity marker,
  5. inserts the event-replay bootstrap script (`EVENT_DISPATCH_SCRIPT_ID`) listing the event types
     to replay,
  6. serialises the document to a string and destroys the platform.
     `isHostAllowed`/`validateAllowedHosts` guard the `url` option against host-header abuse.
- `src/transfer_state.ts` — serialises `TransferState` into the emitted HTML.
- `src/http.ts` — a server `HttpBackend` that resolves relative URLs against the request URL.
- `src/location.ts`, `src/url.ts` — server implementations of `PlatformLocation`.
- `src/platform_state.ts` — `PlatformState` (access to the rendered `Document`).
- `src/tokens.ts` — `PLATFORM_INITIALIZER`-adjacent tokens such as `INITIAL_CONFIG`,
  `BEFORE_APP_SERIALIZED`, `SERVER_CONTEXT`.
- `src/domino_adapter.ts` — the `DomAdapter` over the Domino DOM implementation.
- `src/server_events.ts`, `src/provide_server.ts` — `provideServerRendering` and its features.

## 4. `packages/ssr`

Not an implementation. It contains only `docs/_index.ts` and `docs/_node.ts`, which re-export
`@angular/ssr` and `@angular/ssr/node` so the API-doc extraction pipeline can pick up their types.
The `@angular/ssr` implementation itself lives in the Angular CLI repository.
