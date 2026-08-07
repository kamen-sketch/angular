<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/private/`

5 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/private/testing/`

- `packages/private/testing/index.ts` — 12 lines _(test-support)_
  - re-exports * from `./src/utils`
  - re-exports * from `./src/browser_utils`
  - re-exports * from `./src/globals`



## `packages/private/testing/matchers/`

- `packages/private/testing/matchers/index.ts` — 232 lines _(test-support)_
  - interface: `NgMatchers`
  - exports `_expect as expect`



## `packages/private/testing/src/`

- `packages/private/testing/src/browser_utils.ts` — 150 lines _(test-support)_
  - function: `dispatchEvent`, `createMouseEvent`, `el`, `stringifyElement`, `createNgZone`, `isCommentNode`, `isTextNode`, `getContent`, `templateAwareRoot`, `setCookie`, `hasStyle`, `hasClass`, `sortedClassList`, `createTemplate`, `childNodesAsList`
- `packages/private/testing/src/globals.ts` — 13 lines _(test-support)_
  - const: `isBrowser`, `isNode`
- `packages/private/testing/src/utils.ts` — 301 lines _(test-support)_
  - function: `withBody`, `withHead`, `ensureDocument`, `cleanupDocument`, `timeout`, `useAutoTick`, `expectText`, `waitFor`
  - interface: `WaitForOptions`, `ExpectTextOptions`

