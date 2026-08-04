# The `ɵ` private surface

[21](./21-api-surface.md) describes the API Angular promises to keep. This describes the API it
promises nothing about and cannot remove: the **588 `ɵ`-prefixed symbols** that packages export to
each other.

`contributing-docs/public-api-surface.md` is explicit that the prefix means "not public":

> We explicitly consider the following to be _excluded_ from the public API: […] Any class members
> or symbols marked as `private`, or prefixed with underscore (`_`), barred latin o (`ɵ`), and
> double barred latin o (`ɵɵ`).

So it is outside SemVer, and the API goldens do not record it. It is nonetheless the thing that
actually holds the packages together — `@angular/router` does not build without core's
`ɵRuntimeError` — which makes it the largest piece of the repository with no record of its own.
This document is that record.

Measured by [`tools/analyze-private-surface.mjs`](./tools/analyze-private-surface.mjs), which writes
[`generated/private-surface.md`](./generated/private-surface.md).

```bash
node docs/codebase-map/tools/analyze-private-surface.mjs
```

---

## 1. It is almost entirely `@angular/core`

| Package            | `ɵ` names published | Imported by another package |
| ------------------ | ------------------: | --------------------------: |
| `core`             |                 447 |                         112 |
| `forms`            |                  32 |                           7 |
| `animations`       |                  28 |                           6 |
| `localize`         |                  19 |                           0 |
| `common`           |                  18 |                          14 |
| `platform-browser` |                  12 |                           1 |
| `compiler-cli`     |                  10 |                           0 |
| `router`           |                  10 |                           0 |
| `platform-server`  |                   8 |                           1 |
| `upgrade`          |                   4 |                           0 |

Core publishes 76% of it. The second column is the more interesting one: most of what a package
marks private is not read by any other package in this repository. `localize`, `compiler-cli`,
`router` and `upgrade` publish 43 private names between them that nothing here imports — they are
prefixed to keep them out of the public API, not to share them.

Only `common` inverts the ratio (14 of 18 consumed), because it is the layer everything on top of
the DOM goes through: `ɵgetDOM` alone is imported at 30 sites in four packages.

## 2. Five ways a private symbol is reached

Core's 447 names do not form one contract. They partition by _who reads them_, and the categories
carry very different obligations:

| Reached                                     | Symbols |
| ------------------------------------------- | ------: |
| as a compiler-emitted instruction           |     204 |
| through `@angular/core`, from shipping code |     110 |
| only relatively, inside core                |      53 |
| only from tests                             |      27 |
| no consumer in this repository              |      53 |

**Compiler-emitted (204)** is the largest group and the one with the strongest guarantee. These are
`ɵɵdefineComponent`, `ɵɵelementStart` and the rest of the instruction set; the contract is
[`r3_identifiers.ts`](../../packages/compiler/src/render3/r3_identifiers.ts), checked in
[19 §2](./19-layering-and-contracts.md). Renaming one breaks every application compiled by a
different version of the compiler, which is why they are the most stable "unstable" symbols in the
repository.

**Through the entry point (110)** is the real cross-package contract, and the only group where a
rename is a same-repository refactor. §3 covers it.

**Relative-only (53)** are not a coupling story at all. Something like `ɵFirstAvailable` is declared
in `render3/after_render/hooks.ts`, used within core, and re-exported from `core.ts` — the prefix
governs what leaves the package, nothing more.

**Test-only (27)** are pinned by specs and nothing else: `ɵMetadataOverrider`, `ɵLog`,
`ɵsetCurrentInjector`. The prefix is doing real work here — it lets tests reach into the runtime
without that reach becoming public API.

**No consumer (53)** is the interesting tail; §4.

Counting tests separately, rather than skipping them, is what makes the last two rows meaningful.
An earlier version of the analyzer excluded spec files and reported dozens of test-pinned symbols
as having no consumer at all.

## 3. What packages actually take from each other

18 package-to-package edges carry private symbols. All but two of them point at `core` or `common`;
the exceptions are `platform-browser` → `animations` and `platform-server` → `platform-browser`.

| Consumer           | Provider                    | Distinct symbols |
| ------------------ | --------------------------- | ---------------: |
| `common`           | `@angular/core`             |               39 |
| `platform-browser` | `@angular/core`             |               37 |
| `router`           | `@angular/core`             |               16 |
| `platform-server`  | `@angular/core`             |               10 |
| `forms`            | `@angular/core`             |                9 |
| `platform-browser` | `@angular/common`           |                7 |
| `platform-browser` | `@angular/animations`       |                6 |
| `platform-server`  | `@angular/common`           |                6 |
| …                  | (10 more edges of 1–5 each) |                  |

The most depended-on symbols are not framework machinery. They are error reporting:

| Symbol                | Provider          | Packages | Import sites |
| --------------------- | ----------------- | -------: | -----------: |
| `ɵRuntimeError`       | `@angular/core`   |        7 |           71 |
| `ɵgetDOM`             | `@angular/common` |        4 |           30 |
| `ɵformatRuntimeError` | `@angular/core`   |        5 |           16 |
| `ɵWritable`           | `@angular/core`   |        4 |           13 |
| `ɵConsole`            | `@angular/core`   |        3 |            7 |

`ɵRuntimeError` is imported at 71 sites across 7 packages — more than any public API symbol crosses
package lines. It is the mechanism behind the whole `NG0…` catalogue in
[20](./20-error-codes.md): every package throws through core's error type so that codes and
documentation links stay uniform. That uniformity is bought entirely with private API.

`ɵWritable` is the same story for types rather than errors — a one-line utility type that four
packages import rather than redeclare.

### A package can hand-write what the compiler emits

Five symbols appear in both contracts — emitted by the compiler _and_ imported by hand across a
package boundary. Two are in `common`, and both trace to the same issue, cited in a comment at each
site as `// See #23917`. `ViewportScroller` skips the decorator altogether and writes the
definition the compiler would have generated:

```ts
// packages/common/src/viewport_scroller.ts
// De-sugared tree-shakable injection
/** @nocollapse */
static ɵprov = /** @pureOrBreakMyCode */ /* @__PURE__ */ ɵɵdefineInjectable({…});
```

`Location` keeps `@Injectable({providedIn: 'root', useFactory: createLocation})` and reaches for
the instruction only inside that factory, where it needs a cast the decorator cannot express:
`new Location(ɵɵinject(LocationStrategy as any))`.

The pair is a useful illustration of what the instruction set is for: it is the de-sugared form of
the decorators, so a package that needs to control the sugar can write the output directly.

The other three — `ɵɵDirectiveDeclaration`, `ɵɵNgModuleDeclaration`, `ɵɵPipeDeclaration` — are all
imported by one file, `packages/compiler-cli/src/ngtsc/testing/fake_common/index.ts`, which
hand-writes a stand-in for `@angular/common` so ngtsc's tests can compile against declaration types
without depending on the real package.

## 4. 53 symbols nothing here uses — and why that is expected

53 of core's `ɵ` names are imported by no file in `packages/`, `devtools/`, `adev/`, `modules/` or
`integration/`, and are not emitted by the compiler. Verified: they have no import _or_ re-export
binding anywhere in the repository.

They are not dead code. They cluster into recognisable audiences:

- **Debug metadata for external tooling** — `ɵAcxDirectiveDebugMetadata`,
  `ɵWizComponentDebugMetadata`, `ɵAngularDirectiveDebugMetadata`. ACX and Wiz are Google-internal
  frameworks; these types exist so that their inspectors can describe Angular components.
- **Runtime data-structure types** — `ɵComponentDef`, `ɵPipeDef`, `ɵLContext`, `ɵAttributeMarker`,
  `ɵCssSelectorList`, `ɵRenderFlags`. The shapes the compiler's output is typed against, needed by
  anything that generates or inspects Angular output outside this repository — most importantly
  `@angular/cli`, which lives in a different repository ([01](./01-repo-layout.md)).
- **Debug entry points that travel through the `ng` global.**
  [`render3/util/global_utils.ts`](../../packages/core/src/render3/util/global_utils.ts) publishes a
  table onto `window.ng`, and `getDirectives` and `getHostElement` are in it — reached by name at
  runtime, never imported, so a static scan cannot see the use. `ɵProfiler` is there indirectly, as
  the parameter type of `ng.ɵsetProfiler`. Note that the table publishes most of these _without_
  the prefix, so the exported `ɵgetDirectives` and the global `ng.getDirectives` are the same
  function under two names.
- **Exports whose underlying symbol is busy anyway.** `ɵgetLContext` is not on the global table and
  no file imports it under that name — but `getLContext` is core infrastructure, imported
  relatively at a dozen sites in `debug/`, `render3/util/` and elsewhere. Only the _prefixed
  export_ is unused. `ɵdisableProfiling` is the rarer case where both are: `enableProfiling` is on
  the global table, its counterpart is not, and `profiler.ts:73` is the only mention of it in the
  repository.

That last pair is the sharp edge of this measurement. It counts **export names**, not symbols. A
name in this list means nothing imports `ɵfoo`; it says nothing about how busy `foo` is inside the
package, because internal code always refers to the unprefixed declaration — the prefix is applied
at the barrel (§6). To ask whether a symbol is dead, this list is the start of the question, not
the answer.

- **Sanitization types** — `ɵSafeUrl`, `ɵSafeStyle`, `ɵSafeScript`, `ɵSafeResourceUrl`. `common`'s
  golden references `ɵSafeValue`; the siblings are exported for symmetry.

This is the honest limit of the measurement: **"no consumer in this repository" is not "no
consumer."** For a repository that publishes 22 packages consumed by a separate CLI, a separate
component library and a large internal codebase, the out-of-repo audience is the whole point of
having a private surface at all.

## 5. The private surface is in the goldens anyway

The goldens are supposed to be free of `ɵ` names. They are not: **63 distinct `ɵ` names appear
across 25 of the 50 golden files**, and only 3 of them (`ɵ$localize`, `ɵLocalizeFn`, `ɵTranslateFn`,
all in `@angular/localize`) are declared entries. The other 60 appear inside the signatures of
public symbols, which means the golden — and therefore the published `.d.ts` — depends on them.

Three kinds:

- **Definition fields, on every exported class.** `ɵfac` and `ɵɵFactoryDeclaration` appear in 20
  goldens; `ɵmod`/`ɵɵNgModuleDeclaration` and `ɵinj`/`ɵɵInjectorDeclaration` in 16; `ɵprov`,
  `ɵdir`, `ɵpipe` alongside. This is unavoidable — it is how an AOT consumer links against a
  published class — and it is the reason `.d.ts` output cannot be read without the instruction set.
- **Type-level helpers in public signatures.** Forms is the heaviest user: `ɵTypedOrUntyped`,
  `ɵFormGroupValue`, `ɵFormArrayRawValue`, `ɵElement`, `ɵOptionalKeys` and ten more are what make
  `FormGroup<T>` typed. `AbstractControl`'s public signature is unreadable without them.
- **Brands.** `ɵbrand`, `ɵWRITABLE_SIGNAL`, `ɵINPUT_SIGNAL_BRAND_READ_TYPE`, `ɵɵTYPE` — nominal
  typing markers with no runtime existence.

The practical consequence is that the `ɵ` prefix means two different things depending on where the
symbol lands. For `ɵMetadataOverrider`, it means what the policy says: rename it freely. For
`ɵTypedOrUntyped`, renaming it changes the type of a public API and breaks compilation for anyone
who wrote the type out — the golden diff would show it, but as a change to `FormGroup`, not as a
change to a private symbol.

Nothing enforces the distinction. Neither the goldens nor the size-tracking checks
([17](./17-tooling-and-infrastructure.md)) treat a private symbol reaching a public signature as an
event, so which of the two categories a given `ɵ` name is in has to be worked out by reading.

## 6. How the surface is published

Private exports are not scattered through the barrels; each package funnels them through a
dedicated file, which is what makes the surface reviewable at all:

| File                                                  | Lines |
| ----------------------------------------------------- | ----: |
| `packages/core/src/core_render3_private_export.ts`    |   325 |
| `packages/core/src/core_private_export.ts`            |   189 |
| `packages/core/testing/src/testing_private_export.ts` |    10 |

Nine more files named `src/private_export.ts`, across five packages (`animations`, `common`,
`platform-browser`, `platform-server`, `router`), follow the same pattern — including one per
secondary entry point, so `common`, `common/http` and `common/testing` each have their own.
`core.ts` re-exports the barrels alongside the public ones:

```ts
export * from './core_private_export';
export * from './core_reactivity_export';
export * from './core_render3_private_export';
```

The renaming happens at the barrel, not at the declaration:

```ts
export {maybeUnwrapDefaultExport as ɵmaybeUnwrapDefaultExport} from './util/default_export';
```

So the prefix is a property of the _export_, and internal code refers to symbols by their unprefixed
names. Searching for a `ɵ` name finds the barrel line and usually nothing else; searching for the
name without the prefix finds the implementation. [19](./19-layering-and-contracts.md) records the
same trap for the four emitted symbols reached through an alias.

## 7. What this does not measure

- **Export names, not symbols.** Everything here counts the `ɵ`-prefixed name. Because the prefix
  is applied at the barrel (§6), a symbol can be unused under its export name and load-bearing
  under its declaration name — `ɵgetLContext` versus `getLContext` is the worked example in §4.
- **Runtime access through the `ng` global.** DevTools and the Angular CLI reach debug APIs by name
  at runtime. No static scan sees it, which is why §4's list should be read as "no _import_" rather
  than "no use".
- **Out-of-repo consumers**, which are the main audience for the private surface and are invisible
  from here by construction.
- **Whether a private symbol _should_ be private.** The analyzer reports that `ɵTypedOrUntyped`
  reaches a public golden; it does not judge whether that is a mistake. Several of these are
  deliberate — a type helper that has to be nameable but is not meant to be written by hand is
  exactly what the prefix is for.
