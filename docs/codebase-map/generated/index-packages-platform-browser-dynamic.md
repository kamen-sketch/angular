<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/platform-browser-dynamic/`

13 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/platform-browser-dynamic/`

- `packages/platform-browser-dynamic/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/platform-browser-dynamic/public_api.ts` — 22 lines
  - re-exports * from `./src/platform-browser-dynamic`



## `packages/platform-browser-dynamic/src/`

- `packages/platform-browser-dynamic/src/compiler_factory.ts` — 84 lines
  - const: `COMPILER_PROVIDERS`
  - class: `JitCompilerFactory`
- `packages/platform-browser-dynamic/src/platform-browser-dynamic.ts` — 12 lines
  - exports `VERSION` from `./version`
  - exports `JitCompilerFactory` from `./compiler_factory`
  - exports `platformBrowserDynamic` from `./platform_providers`
- `packages/platform-browser-dynamic/src/platform_providers.ts` — 40 lines
  - const: `platformBrowserDynamic`
- `packages/platform-browser-dynamic/src/version.ts` — 21 lines
  - const: `VERSION`



## `packages/platform-browser-dynamic/src/resource_loader/`

- `packages/platform-browser-dynamic/src/resource_loader/resource_loader_impl.ts` — 51 lines
  - class: `ResourceLoaderImpl`



## `packages/platform-browser-dynamic/test/`

- `packages/platform-browser-dynamic/test/metadata_overrider_spec.ts` — 180 lines _(spec)_
- `packages/platform-browser-dynamic/test/testing_public_browser_spec.ts` — 202 lines _(spec)_
  - class: `TestModule`



## `packages/platform-browser-dynamic/test/resource_loader/`

- `packages/platform-browser-dynamic/test/resource_loader/resource_loader_impl_spec.ts` — 39 lines _(spec)_



## `packages/platform-browser-dynamic/testing/`

- `packages/platform-browser-dynamic/testing/index.ts` — 15 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/platform-browser-dynamic/testing/public_api.ts` — 20 lines _(test-support)_
  - re-exports * from `./src/testing`



## `packages/platform-browser-dynamic/testing/src/`

- `packages/platform-browser-dynamic/testing/src/testing.ts` — 29 lines _(test-support)_
  - const: `platformBrowserDynamicTesting`
  - class: `BrowserDynamicTestingModule`

