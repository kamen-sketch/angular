<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/common/`

186 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/common/`

- `packages/common/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/common/public_api.ts` — 17 lines
  - re-exports * from `./src/common`



## `packages/common/http/`

- `packages/common/http/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/common/http/public_api.ts` — 73 lines
  - re-exports * from `./src/private_export`
  - exports `HttpBackend`, `HttpHandler`, `// The following private symbols isn't used outside this package but has a usage in G3. HttpInterceptorHandler as ɵHttpInterceptingHandler` from `./src/backend`
  - exports `HttpClient`, `HttpClientCommonOptions` from `./src/client`
  - exports `HttpContext`, `HttpContextToken` from `./src/context`
  - exports `FetchBackend` from `./src/fetch`
  - exports `HttpHeaders` from `./src/headers`
  - exports `HTTP_INTERCEPTORS`, `HttpHandlerFn`, `HttpInterceptor`, `HttpInterceptorFn` from `./src/interceptor`
  - exports `JsonpClientBackend`, `JsonpInterceptor` from `./src/jsonp`
  - exports `HttpClientJsonpModule`, `HttpClientModule`, `HttpClientXsrfModule` from `./src/module`
  - exports `HttpParameterCodec`, `HttpParams`, `HttpParamsOptions`, `HttpUrlEncodingCodec` from `./src/params`
  - exports `HttpFeature`, `HttpFeatureKind`, `provideHttpClient`, `withFetch`, `withInterceptors`, `withInterceptorsFromDi`, `withJsonpSupport`, `withNoXsrfProtection`, `withRequestsMadeViaParent`, `withXhr`, `withXsrfConfiguration` from `./src/provider`
  - exports `HttpRequest`, `HttpRequestOptions` from `./src/request`
  - exports `httpResource`, `HttpResourceFn` from `./src/resource`
  - exports `HttpResourceOptions`, `HttpResourceRef`, `HttpResourceRequest` from `./src/resource_api`
  - exports `HttpDownloadProgressEvent`, `HttpErrorResponse`, `HttpEvent`, `HttpEventType`, `HttpHeaderResponse`, `HttpProgressEvent`, `HttpResponse`, `HttpResponseBase`, `HttpSentEvent`, `HttpStatusCode`, `HttpUploadProgressEvent`, `HttpUserEvent` from `./src/response`
  - exports `HTTP_TRANSFER_CACHE_ORIGIN_MAP`, `HttpTransferCacheOptions`, `withHttpTransferCache as ɵwithHttpTransferCache` from `./src/transfer_cache`
  - exports `HttpXhrBackend` from `./src/xhr`
  - exports `HttpXsrfTokenExtractor` from `./src/xsrf`



## `packages/common/http/src/`

- `packages/common/http/src/backend.ts` — 150 lines
  - class: `HttpBackend`, `HttpInterceptorHandler`, `HttpHandler`
  - function: `resetFetchBackendWarningFlag`
- `packages/common/http/src/client.ts` — 2668 lines
  - interface: `HttpClientCommonOptions`
  - class: `HttpClient`
- `packages/common/http/src/context.ts` — 115 lines
  - class: `HttpContextToken`, `HttpContext`
- `packages/common/http/src/errors.ts` — 55 lines
  - const enum: `RuntimeErrorCode`
- `packages/common/http/src/fetch.ts` — 456 lines
  - const: `HTTP_FETCH_MAX_RESPONSE_SIZE`
  - class: `FetchBackend`, `FetchFactory`
- `packages/common/http/src/headers.ts` — 295 lines
  - class: `HttpHeaders`
- `packages/common/http/src/interceptor.ts` — 253 lines
  - interface: `HttpInterceptor`
  - type: `HttpHandlerFn`, `HttpInterceptorFn`, `ChainedInterceptorFn`
  - function: `interceptorChainEndFn`, `adaptLegacyInterceptorToChain`, `chainedInterceptorFn`, `legacyInterceptorFnFactory`
  - const: `HTTP_INTERCEPTORS`, `HTTP_INTERCEPTOR_FNS`, `HTTP_ROOT_INTERCEPTOR_FNS`, `REQUESTS_CONTRIBUTE_TO_STABILITY`
- `packages/common/http/src/jsonp.ts` — 350 lines
  - const: `JSONP_ERR_NO_CALLBACK`, `JSONP_ERR_WRONG_METHOD`, `JSONP_ERR_WRONG_RESPONSE_TYPE`, `JSONP_ERR_HEADERS_NOT_SUPPORTED`, `JSONP_ERR_UNSAFE_URL`
  - class: `JsonpCallbackContext`, `JsonpClientBackend`, `JsonpInterceptor`
  - function: `jsonpCallbackContext`, `jsonpInterceptorFn`
- `packages/common/http/src/module.ts` — 122 lines
  - class: `HttpClientXsrfModule`, `HttpClientModule`, `HttpClientJsonpModule`
- `packages/common/http/src/params.ts` — 362 lines
  - interface: `HttpParameterCodec`, `HttpParamsOptions`
  - class: `HttpUrlEncodingCodec`, `HttpParams`
- `packages/common/http/src/private_export.ts` — 14 lines
  - exports `HTTP_FETCH_MAX_RESPONSE_SIZE as ɵHTTP_FETCH_MAX_RESPONSE_SIZE` from `./fetch`
  - exports `HTTP_ROOT_INTERCEPTOR_FNS as ɵHTTP_ROOT_INTERCEPTOR_FNS`, `REQUESTS_CONTRIBUTE_TO_STABILITY as ɵREQUESTS_CONTRIBUTE_TO_STABILITY` from `./interceptor`
- `packages/common/http/src/provider.ts` — 331 lines
  - enum: `HttpFeatureKind`
  - interface: `HttpFeature`
  - function: `provideHttpClient`, `withInterceptors`, `withInterceptorsFromDi`, `withXsrfConfiguration`, `withNoXsrfProtection`, `withJsonpSupport`, `withRequestsMadeViaParent`, `withFetch`, `withXhr`
- `packages/common/http/src/request.ts` — 631 lines
  - const: `CONTENT_TYPE_HEADER`, `ACCEPT_HEADER`, `TEXT_CONTENT_TYPE`, `JSON_CONTENT_TYPE`, `ACCEPT_HEADER_VALUE`
  - type: `HttpResponseType`, `HttpTransferCacheRequestOptions`
  - interface: `HttpRequestOptions`
  - class: `HttpRequest`
- `packages/common/http/src/resource.ts` — 464 lines
  - interface: `HttpResourceFn`
  - const: `httpResource`
- `packages/common/http/src/resource_api.ts` — 213 lines
  - interface: `HttpResourceRequest`, `HttpResourceOptions`, `HttpResourceRef`
- `packages/common/http/src/response.ts` — 519 lines
  - enum: `HttpEventType`, `HttpStatusCode`
  - interface: `HttpProgressEvent`, `HttpDownloadProgressEvent`, `HttpUploadProgressEvent`, `HttpSentEvent`, `HttpUserEvent`, `HttpJsonParseError`
  - type: `HttpEvent`
  - class: `HttpResponseBase`, `HttpHeaderResponse`, `HttpResponse`, `HttpErrorResponse`
  - const: `HTTP_STATUS_CODE_OK`, `HTTP_STATUS_CODE_NO_CONTENT`
- `packages/common/http/src/transfer_cache.ts` — 730 lines
  - interface: `HttpTransferCacheOptions`
  - const: `HTTP_TRANSFER_CACHE_ORIGIN_MAP`, `BODY`, `HEADERS`, `STATUS`, `STATUS_TEXT`, `REQ_URL`, `RESPONSE_TYPE`, `CACHE_OPTIONS`
  - function: `retrieveStateFromCache`, `transferCacheInterceptorFn`, `withHttpTransferCache`, `generateHash`
- `packages/common/http/src/xhr.ts` — 449 lines
  - class: `HttpXhrBackend`
- `packages/common/http/src/xsrf.ts` — 142 lines
  - const: `XSRF_ENABLED`, `XSRF_DEFAULT_COOKIE_NAME`, `XSRF_COOKIE_NAME`, `XSRF_DEFAULT_HEADER_NAME`, `XSRF_HEADER_NAME`
  - class: `HttpXsrfCookieExtractor`, `HttpXsrfTokenExtractor`, `HttpXsrfInterceptor`
  - function: `xsrfInterceptorFn`



## `packages/common/http/test/`

- `packages/common/http/test/client_spec.ts` — 309 lines _(spec)_
- `packages/common/http/test/context_spec.ts` — 62 lines _(spec)_
- `packages/common/http/test/fetch_spec.ts` — 862 lines _(spec)_
  - class: `MockFetchFactory`
- `packages/common/http/test/headers_spec.ts` — 228 lines _(spec)_
- `packages/common/http/test/jsonp_mock.ts` — 82 lines _(test-support)_
  - class: `MockScriptElement`, `MockDocument`
- `packages/common/http/test/jsonp_spec.ts` — 205 lines _(spec)_
- `packages/common/http/test/module_spec.ts` — 150 lines _(spec)_
- `packages/common/http/test/params_spec.ts` — 246 lines _(spec)_
- `packages/common/http/test/provider_spec.ts` — 785 lines _(spec)_
- `packages/common/http/test/request_spec.ts` — 319 lines _(spec)_
- `packages/common/http/test/resource_spec.ts` — 503 lines _(spec)_
- `packages/common/http/test/response_spec.ts` — 120 lines _(spec)_
- `packages/common/http/test/transfer_cache_spec.ts` — 1273 lines _(spec)_
- `packages/common/http/test/xhr_mock.ts` — 153 lines _(test-support)_
  - class: `MockXhrFactory`, `MockXMLHttpRequestUpload`, `MockXMLHttpRequest`
- `packages/common/http/test/xhr_spec.ts` — 470 lines _(spec)_
- `packages/common/http/test/xsrf_spec.ts` — 203 lines _(spec)_



## `packages/common/http/testing/`

- `packages/common/http/testing/index.ts` — 10 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/common/http/testing/public_api.ts` — 13 lines _(test-support)_
  - exports `HttpTestingController`, `RequestMatch` from `./src/api`
  - exports `HttpClientTestingModule` from `./src/module`
  - exports `provideHttpClientTesting` from `./src/provider`
  - exports `TestRequest` from `./src/request`



## `packages/common/http/testing/src/`

- `packages/common/http/testing/src/api.ts` — 125 lines _(test-support)_
  - interface: `RequestMatch`
  - class: `HttpTestingController`
- `packages/common/http/testing/src/backend.ts` — 171 lines _(test-support)_
  - class: `HttpClientTestingBackend`
- `packages/common/http/testing/src/module.ts` — 28 lines _(test-support)_
  - class: `HttpClientTestingModule`
- `packages/common/http/testing/src/provider.ts` — 23 lines _(test-support)_
  - function: `provideHttpClientTesting`
- `packages/common/http/testing/src/request.ts` — 251 lines _(test-support)_
  - class: `TestRequest`



## `packages/common/http/testing/test/`

- `packages/common/http/testing/test/request_spec.ts` — 170 lines _(spec)_



## `packages/common/locales/`

- `packages/common/locales/closure-locale.ts` — 2052 lines
  - const: `locale_af`, `locale_extra_af`, `locale_am`, `locale_extra_am`, `locale_ar`, `locale_extra_ar`, `locale_ar_DZ`, `locale_extra_ar_DZ`, `locale_az`, `locale_extra_az`, `locale_be`, `locale_extra_be`, `locale_bg`, `locale_extra_bg`, `locale_bn`, `locale_extra_bn`, `locale_br`, `locale_extra_br`, `locale_bs`, `locale_extra_bs`, `locale_ca`, `locale_extra_ca`, `locale_chr`, `locale_extra_chr`, `locale_cs`, `locale_extra_cs`, `locale_cy`, `locale_extra_cy`, `locale_da`, `locale_extra_da`, `locale_de`, `locale_extra_de`, `locale_de_AT`, `locale_extra_de_AT`, `locale_de_CH`, `locale_extra_de_CH`, `locale_el`, `locale_extra_el`, `locale_en_AU`, `locale_extra_en_AU`, `locale_en_CA`, `locale_extra_en_CA`, `locale_en_GB`, `locale_extra_en_GB`, `locale_en_IE`, `locale_extra_en_IE`, `locale_en_IN`, `locale_extra_en_IN`, `locale_en_SG`, `locale_extra_en_SG`, `locale_en_ZA`, `locale_extra_en_ZA`, `locale_es`, `locale_extra_es`, `locale_es_419`, `locale_extra_es_419`, `locale_es_MX`, `locale_extra_es_MX`, `locale_es_US`, `locale_extra_es_US`, `locale_et`, `locale_extra_et`, `locale_eu`, `locale_extra_eu`, `locale_fa`, `locale_extra_fa`, `locale_fi`, `locale_extra_fi`, `locale_fr`, `locale_extra_fr`, `locale_fr_CA`, `locale_extra_fr_CA`, `locale_ga`, `locale_extra_ga`, `locale_gl`, `locale_extra_gl`, `locale_gsw`, `locale_extra_gsw`, `locale_gu`, `locale_extra_gu`, `locale_haw`, `locale_extra_haw`, `locale_hi`, `locale_extra_hi`, `locale_hr`, `locale_extra_hr`, `locale_hu`, `locale_extra_hu`, `locale_hy`, `locale_extra_hy`, `locale_id`, `locale_extra_id`, `locale_in`, `locale_extra_in`, `locale_is`, `locale_extra_is`, `locale_it`, `locale_extra_it`, `locale_he`, `locale_extra_he`, `locale_iw`, `locale_extra_iw`, `locale_ja`, `locale_extra_ja`, `locale_ka`, `locale_extra_ka`, `locale_kk`, `locale_extra_kk`, `locale_km`, `locale_extra_km`, `locale_kn`, `locale_extra_kn`, `locale_ko`, `locale_extra_ko`, `locale_ky`, `locale_extra_ky`, `locale_ln`, `locale_extra_ln`, `locale_lo`, `locale_extra_lo`, `locale_lt`, `locale_extra_lt`, `locale_lv`, `locale_extra_lv`, `locale_mk`, `locale_extra_mk`, `locale_ml`, `locale_extra_ml`, `locale_mn`, `locale_extra_mn`, `locale_ro_MD`, `locale_extra_ro_MD`, `locale_mo`, `locale_extra_mo`, `locale_mr`, `locale_extra_mr`, `locale_ms`, `locale_extra_ms`, `locale_mt`, `locale_extra_mt`, `locale_my`, `locale_extra_my`, `locale_ne`, `locale_extra_ne`, `locale_nl`, `locale_extra_nl`, `locale_nb`, `locale_extra_nb`, `locale_no`, `locale_no_NO`, `locale_extra_no`, `locale_extra_no_NO`, `locale_or`, `locale_extra_or`, `locale_pa`, `locale_extra_pa`, `locale_pl`, `locale_extra_pl`, `locale_pt`, `locale_extra_pt`, `locale_pt_BR`, `locale_extra_pt_BR`, `locale_pt_PT`, `locale_extra_pt_PT`, `locale_ro`, `locale_extra_ro`, `locale_ru`, `locale_extra_ru`, `locale_sr_Latn`, `locale_extra_sr_Latn`, `locale_sh`, `locale_extra_sh`, `locale_si`, `locale_extra_si`, `locale_sk`, `locale_extra_sk`, `locale_sl`, `locale_extra_sl`, `locale_sq`, `locale_extra_sq`, `locale_sr`, `locale_extra_sr`, `locale_sv`, `locale_extra_sv`, `locale_sw`, `locale_extra_sw`, `locale_ta`, `locale_extra_ta`, `locale_te`, `locale_extra_te`, `locale_th`, `locale_extra_th`, `locale_fil`, `locale_extra_fil`, `locale_tl`, `locale_extra_tl`, `locale_tr`, `locale_extra_tr`, `locale_uk`, `locale_extra_uk`, `locale_ur`, `locale_extra_ur`, `locale_uz`, `locale_extra_uz`, `locale_vi`, `locale_extra_vi`, `locale_zh`, `locale_extra_zh`, `locale_zh_Hans`, `locale_extra_zh_Hans`, `locale_zh_Hans_CN`, `locale_zh_CN`, `locale_extra_zh_Hans_CN`, `locale_extra_zh_CN`, `locale_zh_Hant_HK`, `locale_extra_zh_Hant_HK`, `locale_zh_HK`, `locale_extra_zh_HK`, `locale_zh_Hant`, `locale_extra_zh_Hant`, `locale_zh_Hant_TW`, `locale_zh_TW`, `locale_extra_zh_Hant_TW`, `locale_extra_zh_TW`, `locale_zu`, `locale_extra_zu`
- `packages/common/locales/ff-CM.ts` — 67 lines
  - has a default export
- `packages/common/locales/ff-GN.ts` — 67 lines
  - has a default export
- `packages/common/locales/ff-MR.ts` — 67 lines
  - has a default export



## `packages/common/locales/extra/`

- `packages/common/locales/extra/ff-CM.ts` — 19 lines
  - has a default export
- `packages/common/locales/extra/ff-GN.ts` — 19 lines
  - has a default export
- `packages/common/locales/extra/ff-MR.ts` — 19 lines
  - has a default export



## `packages/common/locales/generate-locales-tool/`

- `packages/common/locales/generate-locales-tool/array-deduplication.ts` — 53 lines
  - function: `removeDuplicates`
- `packages/common/locales/generate-locales-tool/cldr-data.ts` — 159 lines
  - type: `CldrLocaleData`, `CldrLocaleAliasReason`
  - class: `CldrData`
- `packages/common/locales/generate-locales-tool/closure-locale-file.ts` — 270 lines
  - function: `generateClosureLocaleFile`
- `packages/common/locales/generate-locales-tool/day-periods.ts` — 107 lines
  - function: `getDayPeriods`, `getDayPeriodRules`, `getDayPeriodsAmPm`, `getDayPeriodsNoAmPm`
- `packages/common/locales/generate-locales-tool/file-header.ts` — 18 lines
  - const: `fileHeader`
- `packages/common/locales/generate-locales-tool/locale-base-currencies.ts` — 78 lines
  - type: `BaseCurrencySymbols`, `BaseCurrencies`, `CurrenciesSymbols`
  - function: `generateBaseCurrenciesFile`, `generateBaseCurrencies`
  - const: `CURRENCIES_EN`
- `packages/common/locales/generate-locales-tool/locale-currencies.ts` — 96 lines
  - function: `generateLocaleCurrencies`, `getCurrencySettings`
- `packages/common/locales/generate-locales-tool/locale-extra-file.ts` — 84 lines
  - function: `generateLocaleExtra`, `generateLocaleExtraDataArrayCode`
  - has a default export
- `packages/common/locales/generate-locales-tool/locale-file.ts` — 255 lines
  - function: `generateLocale`, `generateBasicLocaleString`
  - has a default export
- `packages/common/locales/generate-locales-tool/locale-global-file.ts` — 45 lines
  - function: `generateLocaleGlobalFile`
- `packages/common/locales/generate-locales-tool/object-stringify.ts` — 32 lines
  - function: `stringify`
- `packages/common/locales/generate-locales-tool/plural-function.ts` — 49 lines
  - function: `getPluralFunction`



## `packages/common/locales/generate-locales-tool/bin/`

- `packages/common/locales/generate-locales-tool/bin/base-locale.ts` — 17 lines
  - const: `BASE_LOCALE`
- `packages/common/locales/generate-locales-tool/bin/get-base-currencies-file.ts` — 25 lines
- `packages/common/locales/generate-locales-tool/bin/get-base-locale-file.ts` — 29 lines
- `packages/common/locales/generate-locales-tool/bin/get-closure-locale-file.ts` — 29 lines
- `packages/common/locales/generate-locales-tool/bin/write-locale-files-to-dist.ts` — 50 lines



## `packages/common/locales/global/`

- `packages/common/locales/global/ff-CM.js` — 75 lines
- `packages/common/locales/global/ff-GN.js` — 75 lines
- `packages/common/locales/global/ff-MR.js` — 75 lines



## `packages/common/src/`

- `packages/common/src/common.ts` — 117 lines
  - re-exports * from `./private_export`
  - re-exports * from `./location/index`
  - exports `formatDate` from `./i18n/format_date`
  - exports `formatCurrency`, `formatNumber`, `formatPercent` from `./i18n/format_number`
  - exports `NgLocaleLocalization`, `NgLocalization` from `./i18n/localization`
  - exports `registerLocaleData` from `./i18n/locale_data`
  - exports `PlatformNavigation` from `./navigation/platform_navigation`
  - exports `Plural`, `NumberFormatStyle`, `FormStyle`, `Time`, `TranslationWidth`, `FormatWidth`, `NumberSymbol`, `WeekDay`, `getNumberOfCurrencyDigits`, `getCurrencySymbol`, `getLocaleDayPeriods`, `getLocaleDayNames`, `getLocaleMonthNames`, `getLocaleId`, `getLocaleEraNames`, `getLocaleWeekEndRange`, `getLocaleFirstDayOfWeek`, `getLocaleDateFormat`, `getLocaleDateTimeFormat`, `getLocaleExtraDayPeriodRules`, `getLocaleExtraDayPeriods`, `getLocalePluralCase`, `getLocaleTimeFormat`, `getLocaleNumberSymbol`, …(+5) from `./i18n/locale_data_api`
  - exports `parseCookieValue as ɵparseCookieValue` from `./cookie`
  - exports `CommonModule` from `./common_module`
  - exports `NgClass`, `NgFor`, `NgForOf`, `NgForOfContext`, `NgIf`, `NgIfContext`, `NgPlural`, `NgPluralCase`, `NgStyle`, `NgSwitch`, `NgSwitchCase`, `NgSwitchDefault`, `NgTemplateOutlet`, `NgComponentOutlet` from `./directives/index`
  - exports `AsyncPipe`, `DatePipe`, `DatePipeConfig`, `DATE_PIPE_DEFAULT_TIMEZONE`, `DATE_PIPE_DEFAULT_OPTIONS`, `I18nPluralPipe`, `I18nSelectPipe`, `JsonPipe`, `LowerCasePipe`, `CurrencyPipe`, `DecimalPipe`, `PercentPipe`, `SlicePipe`, `UpperCasePipe`, `TitleCasePipe`, `KeyValuePipe`, `KeyValue` from `./pipes/index`
  - exports `PLATFORM_BROWSER_ID as ɵPLATFORM_BROWSER_ID`, `PLATFORM_SERVER_ID as ɵPLATFORM_SERVER_ID`, `isPlatformBrowser`, `isPlatformServer` from `./platform_id`
  - exports `VERSION` from `./version`
  - exports `ViewportScroller`, `NullViewportScroller as ɵNullViewportScroller` from `./viewport_scroller`
  - exports `XhrFactory` from `./xhr`
  - exports `IMAGE_CONFIG`, `ImageConfig`, `IMAGE_LOADER`, `ImageLoader`, `ImageLoaderConfig`, `NgOptimizedImage`, `ImagePlaceholderConfig`, `PRECONNECT_CHECK_BLOCKLIST`, `provideCloudflareLoader`, `provideCloudinaryLoader`, `provideImageKitLoader`, `provideImgixLoader`, `provideNetlifyLoader` from `./directives/ng_optimized_image`
  - exports `normalizeQueryParams as ɵnormalizeQueryParams` from `./location/util`
  - exports `DOCUMENT` from `@angular/core`
- `packages/common/src/common_module.ts` — 29 lines
  - class: `CommonModule`
- `packages/common/src/cookie.ts` — 21 lines
  - function: `parseCookieValue`
- `packages/common/src/dom_adapter.ts` — 58 lines
  - function: `getDOM`, `setRootDomAdapter`
  - class: `DomAdapter`
- `packages/common/src/errors.ts` — 65 lines
  - const enum: `RuntimeErrorCode`
- `packages/common/src/platform_id.ts` — 27 lines
  - const: `PLATFORM_BROWSER_ID`, `PLATFORM_SERVER_ID`
  - function: `isPlatformBrowser`, `isPlatformServer`
- `packages/common/src/private_export.ts` — 16 lines
  - exports `DomAdapter as ɵDomAdapter`, `getDOM as ɵgetDOM`, `setRootDomAdapter as ɵsetRootDomAdapter` from `./dom_adapter`
  - exports `NavigationAdapterForLocation as ɵNavigationAdapterForLocation` from `./location/navigation_adapter_for_location`
  - exports `PRECOMMIT_HANDLER_SUPPORTED as ɵPRECOMMIT_HANDLER_SUPPORTED` from `./navigation/platform_navigation`
- `packages/common/src/version.ts` — 21 lines
  - const: `VERSION`
- `packages/common/src/viewport_scroller.ts` — 248 lines
  - class: `ViewportScroller`, `BrowserViewportScroller`, `NullViewportScroller`
- `packages/common/src/xhr.ts` — 30 lines
  - class: `BrowserXhr`, `XhrFactory`



## `packages/common/src/directives/`

- `packages/common/src/directives/index.ts` — 54 lines
  - const: `COMMON_DIRECTIVES`
  - exports `NgClass`, `NgComponentOutlet`, `NgFor`, `NgForOf`, `NgForOfContext`, `NgIf`, `NgIfContext`, `NgPlural`, `NgPluralCase`, `NgStyle`, `NgSwitch`, `NgSwitchCase`, `NgSwitchDefault`, `NgTemplateOutlet`
- `packages/common/src/directives/ng_class.ts` — 200 lines
  - class: `NgClass`
- `packages/common/src/directives/ng_component_outlet.ts` — 222 lines
  - class: `NgComponentOutlet`
- `packages/common/src/directives/ng_for_of.ts` — 356 lines
  - class: `NgForOfContext`, `NgForOf`
  - exports `NgForOf as NgFor`
- `packages/common/src/directives/ng_if.ts` — 290 lines
  - class: `NgIf`, `NgIfContext`
- `packages/common/src/directives/ng_plural.ts` — 118 lines
  - class: `NgPlural`, `NgPluralCase`
- `packages/common/src/directives/ng_style.ts` — 113 lines
  - class: `NgStyle`
- `packages/common/src/directives/ng_switch.ts` — 279 lines
  - class: `SwitchView`, `NgSwitch`, `NgSwitchCase`, `NgSwitchDefault`
- `packages/common/src/directives/ng_template_outlet.ts` — 143 lines
  - class: `NgTemplateOutlet`



## `packages/common/src/directives/ng_optimized_image/`

- `packages/common/src/directives/ng_optimized_image/asserts.ts` — 27 lines
  - function: `assertDevMode`
- `packages/common/src/directives/ng_optimized_image/error_helper.ts` — 16 lines
  - function: `imgDirectiveDetails`
- `packages/common/src/directives/ng_optimized_image/index.ts` — 19 lines
  - exports `ɵIMAGE_CONFIG as IMAGE_CONFIG`, `ɵImageConfig as ImageConfig` from `@angular/core`
  - exports `provideCloudflareLoader` from `./image_loaders/cloudflare_loader`
  - exports `provideCloudinaryLoader` from `./image_loaders/cloudinary_loader`
  - exports `IMAGE_LOADER`, `ImageLoader`, `ImageLoaderConfig` from `./image_loaders/image_loader`
  - exports `provideImageKitLoader` from `./image_loaders/imagekit_loader`
  - exports `provideImgixLoader` from `./image_loaders/imgix_loader`
  - exports `provideNetlifyLoader` from `./image_loaders/netlify_loader`
  - exports `ImagePlaceholderConfig`, `NgOptimizedImage` from `./ng_optimized_image`
  - exports `PRECONNECT_CHECK_BLOCKLIST` from `./preconnect_link_checker`
- `packages/common/src/directives/ng_optimized_image/lcp_image_observer.ts` — 203 lines
  - class: `LCPImageObserver`
- `packages/common/src/directives/ng_optimized_image/ng_optimized_image.ts` — 1476 lines
  - const: `ABSOLUTE_SRCSET_DENSITY_CAP`, `RECOMMENDED_SRCSET_DENSITY_CAP`, `DATA_URL_WARN_LIMIT`, `DATA_URL_ERROR_LIMIT`, `BUILT_IN_LOADERS`
  - function: `resetImagePriorityCount`, `assertValidNgSrcset`, `booleanOrUrlAttribute`
  - interface: `ImagePlaceholderConfig`
  - class: `NgOptimizedImage`
- `packages/common/src/directives/ng_optimized_image/preconnect_link_checker.ts` — 154 lines
  - const: `PRECONNECT_CHECK_BLOCKLIST`
  - class: `PreconnectLinkChecker`
- `packages/common/src/directives/ng_optimized_image/preload-link-creator.ts` — 113 lines
  - class: `PreloadLinkCreator`
- `packages/common/src/directives/ng_optimized_image/tokens.ts` — 30 lines
  - const: `DEFAULT_PRELOADED_IMAGES_LIMIT`, `PRELOADED_IMAGES`
- `packages/common/src/directives/ng_optimized_image/url.ts` — 63 lines
  - function: `getUrl`, `isAbsoluteUrl`, `extractHostname`, `isValidPath`, `normalizePath`, `normalizeSrc`, `escapeCssUrl`



## `packages/common/src/directives/ng_optimized_image/image_loaders/`

- `packages/common/src/directives/ng_optimized_image/image_loaders/cloudflare_loader.ts` — 56 lines
  - const: `provideCloudflareLoader`
- `packages/common/src/directives/ng_optimized_image/image_loaders/cloudinary_loader.ts` — 84 lines
  - const: `cloudinaryLoaderInfo`, `provideCloudinaryLoader`
- `packages/common/src/directives/ng_optimized_image/image_loaders/constants.ts` — 13 lines
  - const: `PLACEHOLDER_QUALITY`
- `packages/common/src/directives/ng_optimized_image/image_loaders/image_loader.ts` — 146 lines
  - interface: `ImageLoaderConfig`
  - type: `ImageLoader`, `ImageLoaderInfo`
  - const: `noopImageLoader`, `IMAGE_LOADER`
  - function: `createImageLoader`
- `packages/common/src/directives/ng_optimized_image/image_loaders/imagekit_loader.ts` — 76 lines
  - const: `imageKitLoaderInfo`, `provideImageKitLoader`
  - function: `createImagekitUrl`
- `packages/common/src/directives/ng_optimized_image/image_loaders/imgix_loader.ts` — 74 lines
  - const: `imgixLoaderInfo`, `provideImgixLoader`
- `packages/common/src/directives/ng_optimized_image/image_loaders/netlify_loader.ts` — 122 lines
  - const: `netlifyLoaderInfo`
  - function: `provideNetlifyLoader`
- `packages/common/src/directives/ng_optimized_image/image_loaders/normalized_options.ts` — 26 lines
  - function: `normalizeLoaderTransform`



## `packages/common/src/i18n/`

- `packages/common/src/i18n/currencies.ts` — 14 lines
  - type: `CurrenciesSymbols`
  - const: `CURRENCIES_EN`
- `packages/common/src/i18n/format_date.ts` — 1004 lines
  - const: `ISO8601_DATE_REGEX`
  - function: `formatDate`, `getThursdayThisIsoWeek`, `toDate`, `isoStringToDate`, `isDate`
- `packages/common/src/i18n/format_number.ts` — 541 lines
  - const: `NUMBER_FORMAT_REGEXP`
  - function: `formatCurrency`, `formatPercent`, `formatNumber`, `parseIntAutoRadix`
- `packages/common/src/i18n/locale_data.ts` — 23 lines
  - function: `registerLocaleData`
- `packages/common/src/i18n/locale_data_api.ts` — 805 lines
  - enum: `NumberFormatStyle`, `Plural`, `FormStyle`, `TranslationWidth`, `FormatWidth`, `WeekDay`
  - const: `NumberSymbol`, `getLocalePluralCase`
  - type: `NumberSymbol`, `Time`
  - function: `getLocaleId`, `getLocaleDayPeriods`, `getLocaleDayNames`, `getLocaleMonthNames`, `getLocaleEraNames`, `getLocaleFirstDayOfWeek`, `getLocaleWeekEndRange`, `getLocaleDateFormat`, `getLocaleTimeFormat`, `getLocaleDateTimeFormat`, `getLocaleNumberSymbol`, `getLocaleNumberFormat`, `getLocaleCurrencySymbol`, `getLocaleCurrencyName`, `getLocaleCurrencyCode`, `getLocaleExtraDayPeriodRules`, `getLocaleExtraDayPeriods`, `getLocaleDirection`, `getCurrencySymbol`, `getNumberOfCurrencyDigits`
- `packages/common/src/i18n/localization.ts` — 92 lines
  - class: `NgLocalization`, `NgLocaleLocalization`
  - function: `getPluralCategory`



## `packages/common/src/location/`

- `packages/common/src/location/hash_location_strategy.ts` — 109 lines
  - class: `HashLocationStrategy`
- `packages/common/src/location/index.ts` — 25 lines
  - exports `HashLocationStrategy` from `./hash_location_strategy`
  - exports `Location`, `PopStateEvent` from `./location`
  - exports `APP_BASE_HREF`, `LocationStrategy`, `NoTrailingSlashPathLocationStrategy`, `PathLocationStrategy`, `TrailingSlashPathLocationStrategy` from `./location_strategy`
  - exports `BrowserPlatformLocation`, `LOCATION_INITIALIZED`, `LocationChangeEvent`, `LocationChangeListener`, `PlatformLocation` from `./platform_location`
- `packages/common/src/location/location.ts` — 338 lines
  - interface: `PopStateEvent`
  - class: `Location`
  - function: `createLocation`
- `packages/common/src/location/location_strategy.ts` — 231 lines
  - class: `LocationStrategy`, `PathLocationStrategy`, `NoTrailingSlashPathLocationStrategy`, `TrailingSlashPathLocationStrategy`
  - const: `APP_BASE_HREF`
- `packages/common/src/location/navigation_adapter_for_location.ts` — 88 lines
  - class: `NavigationAdapterForLocation`
- `packages/common/src/location/platform_location.ts` — 184 lines
  - class: `PlatformLocation`, `BrowserPlatformLocation`
  - const: `LOCATION_INITIALIZED`
  - interface: `LocationChangeEvent`, `LocationChangeListener`
- `packages/common/src/location/util.ts` — 60 lines
  - function: `joinWithSlash`, `stripTrailingSlash`, `normalizeQueryParams`



## `packages/common/src/navigation/`

- `packages/common/src/navigation/platform_navigation.ts` — 69 lines
  - const: `PRECOMMIT_HANDLER_SUPPORTED`
  - class: `PlatformNavigation`



## `packages/common/src/pipes/`

- `packages/common/src/pipes/async_pipe.ts` — 244 lines
  - class: `AsyncPipe`
- `packages/common/src/pipes/case_conversion_pipes.ts` — 130 lines
  - class: `LowerCasePipe`, `TitleCasePipe`, `UpperCasePipe`
- `packages/common/src/pipes/date_pipe.ts` — 281 lines
  - const: `DATE_PIPE_DEFAULT_TIMEZONE`, `DATE_PIPE_DEFAULT_OPTIONS`
  - class: `DatePipe`
- `packages/common/src/pipes/date_pipe_config.ts` — 27 lines
  - interface: `DatePipeConfig`
  - const: `DEFAULT_DATE_FORMAT`
- `packages/common/src/pipes/i18n_plural_pipe.ts` — 62 lines
  - class: `I18nPluralPipe`
- `packages/common/src/pipes/i18n_select_pipe.ts` — 59 lines
  - class: `I18nSelectPipe`
- `packages/common/src/pipes/index.ts` — 63 lines
  - const: `COMMON_PIPES`
  - exports `AsyncPipe`, `CurrencyPipe`, `DATE_PIPE_DEFAULT_OPTIONS`, `DATE_PIPE_DEFAULT_TIMEZONE`, `DatePipe`, `DatePipeConfig`, `DecimalPipe`, `I18nPluralPipe`, `I18nSelectPipe`, `JsonPipe`, `KeyValue`, `KeyValuePipe`, `LowerCasePipe`, `PercentPipe`, `SlicePipe`, `TitleCasePipe`, `UpperCasePipe`
- `packages/common/src/pipes/json_pipe.ts` — 43 lines
  - class: `JsonPipe`
- `packages/common/src/pipes/keyvalue_pipe.ts` — 170 lines
  - interface: `KeyValue`
  - class: `KeyValuePipe`
  - function: `defaultComparator`
- `packages/common/src/pipes/number_pipe.ts` — 337 lines
  - class: `DecimalPipe`, `PercentPipe`, `CurrencyPipe`
- `packages/common/src/pipes/slice_pipe.ts` — 95 lines
  - class: `SlicePipe`
- `packages/common/src/pipes/utils.ts` — 30 lines
  - function: `invalidPipeArgumentError`, `warnIfSignal`



## `packages/common/test/`

- `packages/common/test/cookie_spec.ts` — 34 lines _(spec)_
- `packages/common/test/viewport_scroller_spec.ts` — 199 lines _(spec)_



## `packages/common/test/directives/`

- `packages/common/test/directives/ng_class_spec.ts` — 534 lines _(spec)_
- `packages/common/test/directives/ng_component_outlet_spec.ts` — 512 lines _(spec)_
  - class: `TestModule`, `TestModule2`, `TestModule3`
- `packages/common/test/directives/ng_for_spec.ts` — 466 lines _(spec)_
- `packages/common/test/directives/ng_if_spec.ts` — 343 lines _(spec)_
- `packages/common/test/directives/ng_optimized_image_spec.ts` — 2764 lines _(spec)_
- `packages/common/test/directives/ng_plural_spec.ts` — 199 lines _(spec)_
- `packages/common/test/directives/ng_style_spec.ts` — 299 lines _(spec)_
- `packages/common/test/directives/ng_switch_spec.ts` — 320 lines _(spec)_
- `packages/common/test/directives/ng_template_outlet_spec.ts` — 552 lines _(spec)_
- `packages/common/test/directives/non_bindable_spec.ts` — 69 lines _(spec)_



## `packages/common/test/i18n/`

- `packages/common/test/i18n/format_date_spec.ts` — 556 lines _(spec)_
- `packages/common/test/i18n/format_number_spec.ts` — 168 lines _(spec)_
- `packages/common/test/i18n/locale_data_api_spec.ts` — 244 lines _(spec)_
- `packages/common/test/i18n/localization_spec.ts` — 192 lines _(spec)_



## `packages/common/test/image_loaders/`

- `packages/common/test/image_loaders/image_loader_spec.ts` — 520 lines _(spec)_



## `packages/common/test/location/`

- `packages/common/test/location/location_spec.ts` — 323 lines _(spec)_
- `packages/common/test/location/provide_location_mocks_spec.ts` — 23 lines _(spec)_



## `packages/common/test/navigation/`

- `packages/common/test/navigation/navigation_spec.ts` — 26 lines _(spec)_



## `packages/common/test/pipes/`

- `packages/common/test/pipes/async_pipe_spec.ts` — 316 lines _(spec)_
- `packages/common/test/pipes/case_conversion_pipes_spec.ts` — 199 lines _(spec)_
- `packages/common/test/pipes/date_pipe_spec.ts` — 231 lines _(spec)_
- `packages/common/test/pipes/i18n_plural_pipe_spec.ts` — 89 lines _(spec)_
- `packages/common/test/pipes/i18n_select_pipe_spec.ts` — 76 lines _(spec)_
- `packages/common/test/pipes/json_pipe_spec.ts` — 99 lines _(spec)_
- `packages/common/test/pipes/keyvalue_pipe_spec.ts` — 367 lines _(spec)_
- `packages/common/test/pipes/number_pipe_spec.ts` — 248 lines _(spec)_
- `packages/common/test/pipes/slice_pipe_spec.ts` — 136 lines _(spec)_
- `packages/common/test/pipes/util.ts` — 14 lines _(test-support)_
  - function: `timeout`



## `packages/common/testing/`

- `packages/common/testing/index.ts` — 15 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/common/testing/public_api.ts` — 17 lines _(test-support)_
  - re-exports * from `./src/testing`



## `packages/common/testing/src/`

- `packages/common/testing/src/location_mock.ts` — 218 lines _(test-support)_
  - class: `SpyLocation`
- `packages/common/testing/src/mock_location_strategy.ts` — 105 lines _(test-support)_
  - class: `MockLocationStrategy`
- `packages/common/testing/src/mock_platform_location.ts` — 362 lines _(test-support)_
  - interface: `MockPlatformLocationConfig`
  - const: `MOCK_PLATFORM_LOCATION_CONFIG`
  - class: `MockPlatformLocation`, `FakeNavigationPlatformLocation`
- `packages/common/testing/src/private_export.ts` — 12 lines _(test-support)_
  - exports `provideFakePlatformNavigation as ɵprovideFakePlatformNavigation` from `./navigation/provide_fake_platform_navigation`
  - exports `FakeNavigation as ɵFakeNavigation` from `./navigation/fake_navigation`
  - exports `FakeNavigationPlatformLocation as ɵFakeNavigationPlatformLocation` from `./mock_platform_location`
- `packages/common/testing/src/provide_location_mocks.ts` — 27 lines _(test-support)_
  - function: `provideLocationMocks`
- `packages/common/testing/src/testing.ts` — 24 lines _(test-support)_
  - re-exports * from `./private_export`
  - exports `SpyLocation` from `./location_mock`
  - exports `MockLocationStrategy` from `./mock_location_strategy`
  - exports `MOCK_PLATFORM_LOCATION_CONFIG`, `MockPlatformLocation`, `MockPlatformLocationConfig` from `./mock_platform_location`
  - exports `provideLocationMocks` from `./provide_location_mocks`



## `packages/common/testing/src/navigation/`

- `packages/common/testing/src/navigation/fake_navigation.ts` — 10 lines _(test-support)_
  - exports `ɵFakeNavigation as FakeNavigation` from `@angular/core/testing`
- `packages/common/testing/src/navigation/provide_fake_platform_navigation.ts` — 45 lines _(test-support)_
  - function: `provideFakePlatformNavigation`



## `packages/common/upgrade/`

- `packages/common/upgrade/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/common/upgrade/public_api.ts` — 17 lines
  - re-exports * from `./src/index`



## `packages/common/upgrade/src/`

- `packages/common/upgrade/src/index.ts` — 16 lines
  - exports `$locationShim`, `$locationShimProvider` from `./location_shim`
  - exports `LOCATION_UPGRADE_CONFIGURATION`, `LocationUpgradeConfig`, `LocationUpgradeModule` from `./location_upgrade_module`
  - exports `AngularJSUrlCodec`, `UrlCodec` from `./params`
- `packages/common/upgrade/src/location_shim.ts` — 799 lines
  - class: `$locationShim`, `$locationShimProvider`
- `packages/common/upgrade/src/location_upgrade_module.ts` — 137 lines
  - interface: `LocationUpgradeConfig`
  - const: `LOCATION_UPGRADE_CONFIGURATION`
  - class: `LocationUpgradeModule`
- `packages/common/upgrade/src/params.ts` — 351 lines
  - class: `UrlCodec`, `AngularJSUrlCodec`
- `packages/common/upgrade/src/utils.ts` — 33 lines
  - function: `stripPrefix`, `deepEqual`, `isAnchor`



## `packages/common/upgrade/test/`

- `packages/common/upgrade/test/params.spec.ts` — 89 lines _(spec)_
- `packages/common/upgrade/test/upgrade.spec.ts` — 753 lines _(spec)_
  - class: `MockUpgradeModule`, `$rootScopeMock`
  - function: `injectorFactory`
- `packages/common/upgrade/test/upgrade_location_test_module.ts` — 113 lines _(test-support)_
  - interface: `LocationUpgradeTestingConfig`
  - const: `LOC_UPGRADE_TEST_CONFIG`, `APP_BASE_HREF_RESOLVED`
  - class: `LocationUpgradeTestModule`
  - function: `provide$location`

