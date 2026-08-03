# Codebase map

A map of this repository: what each package is responsible for, which module owns which piece of
logic, and the order things happen in. It is written for someone who needs to find the right file
before they can start working — not as a replacement for the user-facing documentation on
[angular.dev](https://angular.dev), and not as API reference.

The map has two halves, and they are maintained differently:

|             | Hand-written maps (`0x-*.md`)                        | Generated index (`generated/`)                    |
| ----------- | ---------------------------------------------------- | ------------------------------------------------- |
| Answers     | _why_ a file exists, what owns what, execution order | _where_ every symbol is declared                  |
| Coverage    | every package and top-level directory                | every first-party source file (7,040 files)       |
| Maintenance | edited by hand when a subsystem changes              | `node docs/codebase-map/tools/generate-index.mjs` |

Because the generated half is exhaustive and mechanical, the hand-written half is free to stay at
the level of explanation — if a file is not mentioned by name in a map document, it is still listed
in the index for its package.

---

## Contents

| #   | Document                                                                   | Covers                                                                                      |
| --- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 01  | [Repository layout](./01-repo-layout.md)                                   | top-level directories, package inventory, the shape every package follows                   |
| 02  | [`core`](./02-core.md)                                                     | `LView`/`TView`, the instruction set, change detection, reactivity, DI, hydration, `@defer` |
| 03  | [`compiler`](./03-compiler.md)                                             | template parsing, the 72-phase template pipeline, definition emit, i18n                     |
| 04  | [`compiler-cli`](./04-compiler-cli.md)                                     | ngtsc, `DecoratorHandler`s, template type checking, incrementality, the linker              |
| 05  | [`common`](./05-common.md)                                                 | built-in directives and pipes, locale formatting, `Location`, `HttpClient`                  |
| 06  | [`forms`](./06-forms.md)                                                   | reactive and template-driven forms, and signal forms                                        |
| 07  | [`router`](./07-router.md)                                                 | `UrlTree`, the navigation pipeline, guards/resolvers, outlets                               |
| 08  | [Platform packages](./08-platform-packages.md)                             | `platform-browser`, `platform-browser-dynamic`, `platform-server`, `ssr`                    |
| 09  | [`animations`, `elements`, `upgrade`](./09-animations-elements-upgrade.md) | the animation engine, custom elements, AngularJS interop                                    |
| 10  | [`service-worker`](./10-service-worker.md)                                 | `ngsw-worker`, config generation, `SwUpdate`/`SwPush`                                       |
| 11  | [`localize` and `language-service`](./11-localize-and-language-service.md) | `$localize`, i18n tooling, the editor plugin                                                |
| 12  | [`zone.js`](./12-zone-js.md)                                               | zones, tasks, the patch set, test-framework integration                                     |
| 13  | [Schematics and migrations](./13-schematics-and-migrations.md)             | Tsurge, `ng update` migrations, `ng generate` transformations                               |
| 14  | [Support packages](./14-support-packages.md)                               | `core/primitives`, `benchpress`, `misc`, `private`, `examples`, `docs`                      |
| 15  | [`devtools`](./15-devtools.md)                                             | the DevTools extension: protocol, in-page backend, panel UI                                 |
| 16  | [`adev`](./16-adev.md)                                                     | angular.dev: the app, the content, the docs pipeline                                        |
| 17  | [Tooling and infrastructure](./17-tooling-and-infrastructure.md)           | Bazel, goldens, benchmarks, integration tests, CI, repo conventions                         |
| 18  | [Cross-cutting flows](./18-cross-cutting-flows.md)                         | five end-to-end traces that span packages                                                   |
| 19  | [Layering and contracts](./19-layering-and-contracts.md)                   | the package dependency DAG and the 211-symbol compiler→runtime contract                     |
| 20  | [Error codes](./20-error-codes.md)                                         | the two `NG…` code spaces, their conventions, and the full catalogue                        |

Start with [01](./01-repo-layout.md) if you are new to the repository, or with
[18](./18-cross-cutting-flows.md) if you already know roughly where things live and need to follow
one behaviour across package boundaries.

## The generated index

[`generated/summary.md`](./generated/summary.md) has per-root and per-package file/line/symbol
counts and links to every index file. Each `generated/index-<package>.md` lists, per directory,
every source file with:

- its size in lines and whether it is implementation, a spec, test support or typings;
- its top-level exported declarations, grouped by kind (`class`, `function`, `interface`, …);
- its `export * from` re-exports and named re-export lists.

To refresh it after moving or adding files:

```bash
node docs/codebase-map/tools/generate-index.mjs
```

The generator ([`tools/generate-index.mjs`](./tools/generate-index.mjs)) has no dependencies — not
even TypeScript — so it runs in a bare checkout before `pnpm install`. It reads exports with
regular expressions rather than a parser, which is reliable here because all source is
Prettier-formatted with top-level declarations at column 0; the trade-off is that it indexes
declared exports, not the full type signatures. For signatures, use the API goldens in
[`goldens/public-api/`](../../goldens/public-api), which are checked against the built `.d.ts` in CI.

## Derived analyses

```bash
node docs/codebase-map/tools/analyze-contracts.mjs
```

[`tools/analyze-contracts.mjs`](./tools/analyze-contracts.mjs) derives two things that cannot be
read off the directory structure and writes them to `generated/`:

- [`package-dependencies.md`](./generated/package-dependencies.md) — every cross-package import,
  split by the area doing the importing (runtime / schematics / testing / tools) and by kind
  (value / `import type` / dynamic), plus the runtime-only layering;
- [`instruction-contract.md`](./generated/instruction-contract.md) — every symbol the compiler may
  emit a reference to, resolved to the file in `packages/core` that declares it.

The script exits non-zero if an emitted symbol has no declaration in `core`, i.e. if the compiler
could generate a call into a runtime symbol that does not exist.
[19](./19-layering-and-contracts.md) reads the results.

```bash
node docs/codebase-map/tools/analyze-error-codes.mjs
```

[`tools/analyze-error-codes.mjs`](./tools/analyze-error-codes.mjs) catalogues every `NG…` error
code into [`error-codes.md`](./generated/error-codes.md) and checks the conventions that hold the
two code spaces together: reserved ranges, no duplicate values, and that a code marked as having a
guide actually has one. [20](./20-error-codes.md) reads the results.

It found one real defect — a negative value in the compile-time enum that made a diagnostic report
under the wrong code — which is now fixed; see [20 §3](./20-error-codes.md). A second, related
defect it surfaced is documented in [20 §4](./20-error-codes.md) and left open, because fixing it
changes the message text of eight existing errors.

## Keeping the hand-written half honest

```bash
node docs/codebase-map/tools/check-coverage.mjs
```

[`tools/check-coverage.mjs`](./tools/check-coverage.mjs) lists every subsystem directory that no
map document mentions, and exits non-zero if there are any. "Subsystem" means a directory at depth
one or two below `packages/`, `devtools/`, `adev/`, `modules/` or `tools/`, plus the direct
children of each package's `src/` — the level the maps promise to explain. Anything deeper is left
to the generated index. As of this commit the checker reports no gaps; when it reports one, either
add a sentence about the new directory to the relevant map or, if it is a collection of leaves with
no architecture of its own, add its name to `IGNORED_NAMES` in the script.

## Conventions used in the maps

- Paths are given relative to the repository root, so they can be pasted into an editor directly.
- `ɵ` marks a symbol that is exported for other Angular packages but is not public API; `ɵɵ` marks
  a runtime instruction the compiler emits.
- Where a document states an _order_ (the phases of the template pipeline, the steps in
  `refreshView`, the stages of a navigation), that order is taken from the source and is
  load-bearing — reordering those steps changes behaviour.

## Scope and limits

- The map describes `main` as of the commit it was added in. Structural claims (which directory
  owns what) age slowly; specific function names age faster. When they disagree, the source wins.
- Test files, fixtures and goldens are counted and indexed, but the hand-written maps only discuss
  them where the test infrastructure is itself the subject (for example
  `packages/core/testing`, `ngtsc/testing`, `integration/`).
- Packages published from other repositories — `@angular/cli`, `@angular/ssr`, `@angular/cdk`,
  `@angular/material` — are out of scope; where this repository has a shim for them
  (`packages/ssr`), the map says so.
