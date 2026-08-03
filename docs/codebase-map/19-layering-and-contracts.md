# Layering and contracts

Two properties of the repository that the directory structure does not show: **which package may
depend on which**, and **the contract between the compiler and the runtime**. Both are derived from
source by [`tools/analyze-contracts.mjs`](./tools/analyze-contracts.mjs), which writes
[`generated/package-dependencies.md`](./generated/package-dependencies.md) and
[`generated/instruction-contract.md`](./generated/instruction-contract.md) and fails if the
contract is broken.

```bash
node docs/codebase-map/tools/analyze-contracts.mjs
```

---

## 1. Package layering

Counting `@angular/*` imports across `packages/` gives 70 edges. They only make sense once split by
**where in the package the import lives**, because a package ships more than its runtime:

| Area         | What it is                                         | Constrains the shipped framework? |
| ------------ | -------------------------------------------------- | --------------------------------- |
| `runtime`    | code that ends up in an application bundle         | yes                               |
| `schematics` | the bundled `ng update` / `ng generate` migrations | no — build-time only              |
| `testing`    | a `testing/` secondary entry point                 | no — test-time only               |
| `tools`      | a build-time CLI shipped in the package            | no                                |

Reduced to runtime code, the layering is a clean DAG:

```
        compiler ────────────► compiler-cli ──────► language-service
           │                                              │
           └──────────────► platform-browser-dynamic      │
                                                          ▼
  core ◄─── everything below ────────────────────────── core
   ▲
   ├── animations ◄──── platform-browser ◄──── platform-server
   ├── common     ◄──── forms, router, misc, platform-browser, platform-server
   ├── elements, service-worker, benchpress
   └── upgrade    ◄──── common/upgrade, router/upgrade
```

Facts worth knowing:

- **`core` and `compiler` have no runtime dependency on anything else in the repository.** They are
  the two roots. `compiler` has no outgoing edges at all — it does not even depend on TypeScript,
  which is why `compiler-cli` exists.
- **`core` → `compiler-cli` (83 imports) is not a cycle.** Every one of those imports is in
  `packages/core/schematics/`, the migration code bundled into the npm package but never loaded by
  an application. The same is true of `core` → `compiler` (20 imports in `schematics/`, plus one in
  `core/testing/` for `TestBed`'s JIT path).
- **`platform-browser` → `animations` includes a dynamic import.** That is
  `provideAnimationsAsync()`: the animation engine is `import()`-ed on first use, so applications
  that never animate do not pay for it.
- **`common` → `upgrade` and `router` → `upgrade`** exist only inside the `common/upgrade` and
  `router/upgrade` secondary entry points (the AngularJS `$location` shims). The main entry points
  of both packages have no such dependency.
- **`localize` reaches `compiler` and `compiler-cli` only from `tools/`** — the extract/translate/
  migrate CLIs. The `$localize` runtime itself depends on nothing.
- **`language-service` loads `compiler-cli` dynamically in six places**, because the editor plugin
  has to load the compiler as ESM from a CommonJS host.

### A measurement caveat worth repeating

The first version of this analysis reported `core` → `platform-browser` and `compiler` → `core`
edges that do not exist. They came from `import` statements inside JSDoc code samples — for example
the usage examples in `core/src/i18n/tokens.ts`. The analyzer strips comments before scanning, and
any future tooling that measures imports in this repository should do the same.

## 2. The compiler → runtime instruction contract

[`packages/compiler/src/render3/r3_identifiers.ts`](../../packages/compiler/src/render3/r3_identifiers.ts)
is the single table of everything the compiler may emit a reference to — **211 symbols**, all with
`moduleName: '@angular/core'`. It is the narrowest description of the compiler/runtime boundary in
the repository: adding an instruction to the runtime is invisible to the compiler until it is
listed here, and listing a symbol that the runtime does not export produces code that fails at
load time rather than at build time.

All 211 resolve to declarations in `packages/core`. Where they land:

| Area                                  | Symbols | Implemented in                                                                                                                                                           |
| ------------------------------------- | ------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@defer` blocks                       |      24 | `src/defer/instructions.ts` (+ `rendering.ts`)                                                                                                                           |
| Text/value interpolation              |      20 | `instructions/text_interpolation.ts`, `instructions/value_interpolation.ts`                                                                                              |
| Pure-function memoisation             |      10 | `render3/pure_function.ts`                                                                                                                                               |
| Partial declarations (`ɵɵngDeclare*`) |      10 | `render3/jit/partial.ts`                                                                                                                                                 |
| Sanitization / Trusted Types          |       9 | `src/sanitization/sanitization.ts`                                                                                                                                       |
| Instruction-state control             |       7 | `render3/state.ts` (namespaces, `ɵɵenableBindings`, `ɵɵrestoreView`)                                                                                                     |
| Control flow (`@if`/`@for`/`@switch`) |       7 | `instructions/control_flow.ts`                                                                                                                                           |
| i18n                                  |       7 | `instructions/i18n.ts`                                                                                                                                                   |
| Elements and containers               |      12 | `instructions/element.ts`, `instructions/element_container.ts`                                                                                                           |
| Pipes                                 |       6 | `render3/pipe.ts`                                                                                                                                                        |
| `.d.ts` declaration types             |       6 | `render3/interfaces/public_definitions.ts`                                                                                                                               |
| Styling                               |       4 | `instructions/styling.ts`                                                                                                                                                |
| `animate.enter`/`animate.leave`       |       4 | `instructions/animation.ts`                                                                                                                                              |
| Definitions (`ɵɵdefineComponent` …)   |       4 | `render3/definition.ts`                                                                                                                                                  |
| Queries (decorator + signal)          |       7 | `instructions/queries.ts`, `instructions/queries_signals.ts`                                                                                                             |
| Features (`ɵɵNgOnChangesFeature` …)   |       6 | `render3/features/*.ts`                                                                                                                                                  |
| DI                                    |      12 | `di/interface/defs.ts`, `di/interface/service.ts`, `di/injector_compatibility.ts`, `di/forward_ref.ts`, `instructions/di.ts`, `instructions/di_attr.ts`, `render3/di.ts` |
| Everything else                       |      56 | one file per concern — see the generated table                                                                                                                           |

The full symbol → file table is in
[`generated/instruction-contract.md`](./generated/instruction-contract.md).

Reading it top-down is a good way to see what the framework's language surface actually costs: the
24 `@defer` symbols and the 20 interpolation arities are the two largest groups, and the
`ɵɵdomElement*` / `ɵɵdomProperty` / `ɵɵdomListener` family alongside the older `ɵɵelement*` family
shows the in-progress split between DOM-only and directive-aware instructions.

### Aliases

Four symbols are reached through a re-export alias in
`packages/core/src/core_render3_private_export.ts` rather than being declared under their emitted
name — `ɵsetClassMetadata`, `ɵsetClassMetadataAsync`, `ɵɵFactoryTarget` and
`ɵɵregisterNgModuleType`. The generated table records the original name in its `via` column, so a
search for the emitted name does not dead-end.

### One more ASCII trap

Angular's private surface is spelled with `ɵ`, and JavaScript's `\w` matches ASCII only. Both the
first version of this analyzer and the symbol-index generator used `[\w$]*` for identifiers and so
silently dropped every `ɵ`-prefixed export — 259 symbols, including `ɵɵdefineComponent` itself.
Both now spell out `[\w$ɵ]*`. Any script in this repository that pattern-matches identifiers needs
the same treatment.
