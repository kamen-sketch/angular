<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/elements/`

14 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/elements/`

- `packages/elements/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/elements/public_api.ts` — 29 lines
  - exports `createCustomElement`, `NgElement`, `NgElementConfig`, `NgElementConstructor`, `WithProperties` from `./src/create-custom-element`
  - exports `NgElementStrategy`, `NgElementStrategyEvent`, `NgElementStrategyFactory` from `./src/element-strategy`
  - exports `VERSION` from `./src/version`



## `packages/elements/src/`

- `packages/elements/src/component-factory-strategy.ts` — 249 lines
  - class: `ComponentNgElementStrategyFactory`, `ComponentNgElementStrategy`
- `packages/elements/src/create-custom-element.ts` — 256 lines
  - interface: `NgElementConstructor`, `NgElementConfig`
  - class: `NgElement`
  - type: `WithProperties`
  - function: `createCustomElement`
- `packages/elements/src/element-strategy.ts` — 45 lines
  - interface: `NgElementStrategyEvent`, `NgElementStrategy`, `NgElementStrategyFactory`
- `packages/elements/src/extract-projectable-nodes.ts` — 55 lines
  - function: `extractProjectableNodes`
- `packages/elements/src/utils.ts` — 110 lines
  - const: `scheduler`
  - function: `camelToDashCase`, `isElement`, `isFunction`, `kebabToCamelCase`, `matchesSelector`, `strictEquals`, `getDefaultAttributeToPropertyInputs`, `getComponentInputs`
- `packages/elements/src/version.ts` — 15 lines
  - const: `VERSION`



## `packages/elements/test/`

- `packages/elements/test/component-factory-strategy_spec.ts` — 424 lines _(spec)_
  - class: `CdTrackerDir`, `TestComponent`
- `packages/elements/test/create-custom-element-env_spec.ts` — 48 lines _(spec)_
- `packages/elements/test/create-custom-element_spec.ts` — 452 lines _(spec)_
- `packages/elements/test/extract-projectable-nodes_spec.ts` — 107 lines _(spec)_
- `packages/elements/test/slots_spec.ts` — 162 lines _(spec)_
- `packages/elements/test/utils_spec.ts` — 177 lines _(spec)_

