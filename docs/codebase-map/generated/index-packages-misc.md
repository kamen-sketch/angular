<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/misc/`

16 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/misc/angular-in-memory-web-api/`

- `packages/misc/angular-in-memory-web-api/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/misc/angular-in-memory-web-api/public_api.ts` — 12 lines
  - re-exports * from `./src/in-memory-web-api`



## `packages/misc/angular-in-memory-web-api/src/`

- `packages/misc/angular-in-memory-web-api/src/backend-service.ts` — 739 lines
  - class: `BackendService`
- `packages/misc/angular-in-memory-web-api/src/delay-response.ts` — 40 lines
  - function: `delayResponse`
- `packages/misc/angular-in-memory-web-api/src/http-client-backend-service.ts` — 121 lines
  - class: `HttpClientBackendService`
- `packages/misc/angular-in-memory-web-api/src/http-client-in-memory-web-api-module.ts` — 75 lines
  - function: `httpClientInMemBackendServiceFactory`
  - class: `HttpClientInMemoryWebApiModule`
- `packages/misc/angular-in-memory-web-api/src/http-status-codes.ts` — 527 lines
  - const: `STATUS`, `STATUS_CODE_INFO`
  - function: `getStatusText`, `isSuccess`
- `packages/misc/angular-in-memory-web-api/src/in-memory-web-api-module.ts` — 65 lines
  - class: `InMemoryWebApiModule`
- `packages/misc/angular-in-memory-web-api/src/in-memory-web-api.ts` — 15 lines
  - re-exports * from `./backend-service`
  - re-exports * from `./http-status-codes`
  - re-exports * from `./http-client-backend-service`
  - re-exports * from `./in-memory-web-api-module`
  - re-exports * from `./http-client-in-memory-web-api-module`
  - re-exports * from `./interfaces`
- `packages/misc/angular-in-memory-web-api/src/interfaces.ts` — 317 lines
  - class: `InMemoryDbService`, `InMemoryBackendConfigArgs`, `InMemoryBackendConfig`
  - function: `parseUri`, `removeTrailingSlash`
  - interface: `ParsedRequestUrl`, `PassThruBackend`, `RequestCore`, `RequestInfo`, `RequestInfoUtilities`, `ResponseOptions`, `UriInfo`
  - type: `ResponseInterceptor`



## `packages/misc/angular-in-memory-web-api/test/`

- `packages/misc/angular-in-memory-web-api/test/http-client-backend-service_spec.ts` — 677 lines _(spec)_



## `packages/misc/angular-in-memory-web-api/test/fixtures/`

- `packages/misc/angular-in-memory-web-api/test/fixtures/hero-in-mem-data-override-service.ts` — 101 lines _(test-support)_
  - class: `HeroInMemDataOverrideService`
- `packages/misc/angular-in-memory-web-api/test/fixtures/hero-in-mem-data-service.ts` — 85 lines _(test-support)_
  - class: `HeroInMemDataService`
- `packages/misc/angular-in-memory-web-api/test/fixtures/hero-service.ts` — 22 lines _(test-support)_
  - class: `HeroService`
- `packages/misc/angular-in-memory-web-api/test/fixtures/hero.ts` — 18 lines _(test-support)_
  - class: `Hero`
- `packages/misc/angular-in-memory-web-api/test/fixtures/http-client-hero-service.ts` — 78 lines _(test-support)_
  - class: `HttpClientHeroService`

