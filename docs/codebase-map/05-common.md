# `packages/common` — built-in directives, pipes, `HttpClient`, `Location`

`@angular/common` (186 files, ~43k lines) holds everything that is "browser platform-independent
application plumbing": the classic structural directives, the built-in pipes, locale/i18n
formatting, the URL/`Location` abstraction, `NgOptimizedImage`, and — under its own entry point —
`HttpClient`.

Entry points: `index.ts` (`src/common.ts`), `http/`, `http/testing/`, `testing/`, `upgrade/`, `locales/`.
Full file/symbol listing: [`generated/index-packages-common.md`](./generated/index-packages-common.md).

---

## 1. Directives (`src/directives/`)

`common_module.ts` declares `CommonModule` and the `COMMON_DIRECTIVES`/`COMMON_PIPES` arrays; every
directive is standalone, so the module is only a convenience re-export.

| File                          | Exports                                       | Notes                                                                                                 |
| ----------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ng_if.ts`                    | `NgIf`, `NgIfContext`                         | template guards (`ngTemplateGuard_ngIf`, `ngTemplateContextGuard`) are what make `*ngIf` narrow types |
| `ng_for_of.ts`                | `NgForOf`, `NgForOfContext`                   | diffing via `IterableDiffers` from core, `trackBy` support                                            |
| `ng_switch.ts`                | `NgSwitch`, `NgSwitchCase`, `NgSwitchDefault` |                                                                                                       |
| `ng_class.ts` / `ng_style.ts` | `NgClass`, `NgStyle`                          | delegate to the renderer's class/style APIs                                                           |
| `ng_template_outlet.ts`       | `NgTemplateOutlet`                            |                                                                                                       |
| `ng_component_outlet.ts`      | `NgComponentOutlet`                           | dynamic component creation with input binding                                                         |
| `ng_plural.ts`                | `NgPlural`, `NgPluralCase`                    | uses `NgLocalization`                                                                                 |
| `ng_optimized_image/`         | `NgOptimizedImage`, `provideImgixLoader` &c.  | see below                                                                                             |

**`NgOptimizedImage`** is a subsystem of its own: `ng_optimized_image.ts` is the directive,
`asserts.ts` + `error_helper.ts` hold the (extensive) dev-mode diagnostics, `lcp_image_observer.ts`
warns about un-prioritised LCP images, `preconnect_link_checker.ts` checks for a `preconnect` to the
image origin, `preload-link-creator.ts` emits `<link rel=preload>` for priority images,
`url.ts`/`tokens.ts` hold the shared config, and `image_loaders/` has one loader per CDN
(`cloudflare_loader.ts`, `cloudinary_loader.ts`, `imagekit_loader.ts`, `imgix_loader.ts`,
`netlify_loader.ts`) built on `image_loader.ts`.

## 2. Pipes (`src/pipes/`)

`async_pipe.ts` (`AsyncPipe` — subscribes to `Observable`/`Promise` and calls `markForCheck`),
`date_pipe.ts` (+ `date_pipe_config.ts`), `number_pipe.ts` (`DecimalPipe`, `PercentPipe`,
`CurrencyPipe`), `case_conversion_pipes.ts` (`UpperCasePipe`, `LowerCasePipe`, `TitleCasePipe`),
`json_pipe.ts`, `keyvalue_pipe.ts`, `slice_pipe.ts`, `i18n_plural_pipe.ts`, `i18n_select_pipe.ts`.

## 3. Locale data and formatting (`src/i18n/`)

`locale_data.ts` + `locale_data_api.ts` expose the generated CLDR data (`packages/common/locales/`
holds one generated file per locale plus `global/` variants); `format_date.ts` and
`format_number.ts` implement `formatDate`/`formatNumber`/`formatCurrency`/`formatPercent` used by
the pipes; `currencies.ts` carries the currency symbol/digit table; `localization.ts` defines
`NgLocalization` and its default plural-rule implementation.

## 4. `Location` (`src/location/`)

`location.ts` (`Location` service — `path()`, `go()`, `replaceState()`, `onUrlChange`),
`location_strategy.ts` (`LocationStrategy`, `PathLocationStrategy`, `APP_BASE_HREF`),
`hash_location_strategy.ts`, `platform_location.ts` (`PlatformLocation`, the injectable wrapper over
`window.history` that the server overrides), `navigation_adapter_for_location.ts` (adapting the
Navigation API), and `util.ts` (`joinWithSlash`, `normalizeQueryParams`, `stripTrailingSlash`).
`src/navigation/platform_navigation.ts` exposes the Navigation API itself.
`src/viewport_scroller.ts` implements `ViewportScroller`, used by the router's scroll restoration.

## 5. `@angular/common/http`

The HTTP client lives under its own entry point (`http/public_api.ts`).

- `client.ts` — `HttpClient`: the overloaded `get`/`post`/… surface that funnels into `request()`.
- `request.ts` / `response.ts` — `HttpRequest`, `HttpResponse`, `HttpHeaderResponse`,
  `HttpProgressEvent`, `HttpEvent` union; requests are immutable (`clone()`).
- `headers.ts`, `params.ts` — `HttpHeaders`, `HttpParams` with lazy parsing and copy-on-write.
- `backend.ts` — `HttpBackend`/`HttpHandler` abstractions; `xhr.ts` and `fetch.ts` are the two
  implementations (`withFetch()` selects the latter), `jsonp.ts` handles JSONP.
- `interceptor.ts` — both interceptor styles: the class-based `HttpInterceptor` and the functional
  `HttpInterceptorFn`, plus the chain builder that composes them around the backend.
- `context.ts` — `HttpContext`/`HttpContextToken` for passing per-request metadata to interceptors.
- `provider.ts` / `module.ts` — `provideHttpClient` with its features (`withInterceptors`,
  `withInterceptorsFromDi`, `withXsrfConfiguration`, `withNoXsrfProtection`, `withJsonpSupport`,
  `withRequestsMadeViaParent`, `withFetch`) and the legacy `HttpClientModule`.
- `xsrf.ts` — the XSRF token extraction/attachment interceptor.
- `transfer_cache.ts` — `withHttpTransferCache`, which records responses during SSR into
  `TransferState` so the client does not re-issue them.
- `resource.ts` / `resource_api.ts` — `httpResource`, the signal `Resource` wrapper over `HttpClient`.
- `http/testing/` — `HttpTestingController`, `HttpClientTestingBackend`, `provideHttpClientTesting`.

## 6. Other

`src/dom_adapter.ts` (`DomAdapter`, the last remnant of the platform abstraction),
`src/platform_id.ts` (`isPlatformBrowser`/`isPlatformServer` and `PLATFORM_ID` constants),
`src/cookie.ts`, `src/xhr.ts` (`XhrFactory`), `src/errors.ts` (the `RuntimeErrorCode` enum for this
package), and `src/private_export.ts` (the `ɵ` symbols other Angular packages rely on).
`upgrade/` provides `$location`-compatible shims for hybrid AngularJS apps.
