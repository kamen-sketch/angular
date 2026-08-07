# Guides and the code they show

angular.dev never inlines the code it teaches. Guides and API docs both point at real files that
compile and are tested, and the pipeline splices the code in at build time. That keeps the
documentation honest, and it creates a second contract across the repository: **1,253 references
from 117 documents into 671 source files**, all of them plain strings.

Measured by [`tools/analyze-docs-examples.mjs`](./tools/analyze-docs-examples.mjs), which writes
[`generated/docs-examples.md`](./generated/docs-examples.md).

```bash
node docs/codebase-map/tools/analyze-docs-examples.mjs
```

---

## 1. Two reference syntaxes, one idea

**Guides** use a Markdown extension, with a repo-root-relative path:

```html
<docs-code path="adev/src/content/examples/…/app.component.ts" region="template" />
```

**API reference docs** pull from JSDoc in the framework source, with a path relative to
`packages/examples`:

```ts
/**
 * @usageNotes
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 */
```

Both resolve a _region_: a block delimited by `#docregion name` / `#enddocregion name` comments in
the target file, parsed by
[`regions/region-parser.mts`](../../adev/shared-docs/pipeline/shared/regions/region-parser.mts).
The marker syntax follows the file type — `//` for TypeScript, `<!-- -->` for HTML, `/* */` for
CSS, `#` for YAML and shell — a name list is comma-separated, and an empty list means the whole
file. 332 of the references name a region; the rest take the file entire.

## 2. This contract is enforced — loudly

Unlike the DevTools protocol ([22](./22-devtools-protocol.md)), both halves fail the build when
they break:

| Failure                                       | Where it throws                                      |
| --------------------------------------------- | ---------------------------------------------------- |
| `<docs-code path>` that does not exist        | `loadWorkspaceRelativeFile` — `Cannot find: <path>`  |
| `<docs-code region>` not declared in the file | `extractRegions` — `Cannot find <region> in <path>!` |
| `{@example}` path or region missing           | `interpolateCodeExamples` — `Missing code example …` |

So the analyzer here is a fast pre-flight rather than a safety net: it answers in a second what a
full docs build answers in minutes. Every one of the 1,253 live references resolves today.

Two things it has to get right to say that, both of which produced wrong answers first:

- **Commented-out markup is not a reference.** Guides park retired examples inside `<!-- … -->`;
  `guide/i18n/example.md` has one pointing at a path that no longer resolves. The analyzer blanks
  comments before scanning (keeping line numbers intact).
- **A `live` example points at a directory**, not a file — the whole runnable project gets embedded.
  Requiring a regular file reports those as missing.

## 3. What the enforcement does not cover

Two gaps sit outside what any build checks.

**Dangling references in packages that are not doc-extracted.** The file
`packages/private/testing/matchers/index.ts`
carries five `{@example testing/ts/matchers.ts region='…'}` tags pointing at a file that
does not exist — `packages/examples/testing/` contains only `testing.ts`, which declares no
regions at all. `interpolateCodeExamples` would throw on them, but `packages/private` ships no
documentation, so its JSDoc is never processed and the tags are inert. They are dead references
kept alive by never being read. The analyzer reports them as warnings rather than failures, since
they cannot break anything until that package is doc-extracted.

**Examples nothing points at.** The build checks that every reference resolves; nothing checks the
reverse. Five directories under the example roots are referenced by no guide and no JSDoc:

| Directory                                         | What it actually is                                                                                                                                            |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `adev/src/content/examples/built-in-directives`   | **stale** — `guide/directives/*` was rewritten to use plain fenced code blocks (18 of them in `structural-directives.md`) and no longer pulls from the project |
| `adev/src/content/examples/structural-directives` | same                                                                                                                                                           |
| `packages/examples/http`                          | still compiled; carries its own `BUILD.bazel`                                                                                                                  |
| `packages/examples/service-worker`                | still compiled and **e2e-tested** (`push/e2e_test/`, `registration-options/e2e_test/`)                                                                         |
| `packages/examples/test-utils`                    | not an example at all — the shared `verifyNoBrowserErrors` helper                                                                                              |

Only the first two are rot in the ordinary sense: 28 files of example project whose guide stopped
using them. The rest are referenced by build targets and tests instead of by prose, which is why
"unreferenced" is a starting point for review and not a delete list.

`adev/src/content/examples/BUILD.bazel` globs `**` into a filegroup regardless, so unreferenced
projects are still copied into the docs build. That file is also worth reading for its own
inventory: an explicit `exclude` list naming five example projects — `ssr`,
`resolution-modifiers`, `reactive-forms`, `form-validation`, `dependency-injection` — under a TODO
saying they "have broken code that does not compile".

## 4. Where the documented code lives

| Area                          | References | What it is                                                                   |
| ----------------------------- | ---------: | ---------------------------------------------------------------------------- |
| `adev/src/content/examples`   |      1,046 | purpose-built example projects, one per guide topic                          |
| `packages/examples`           |        146 | the API-reference snippets, compiled and e2e-tested with the framework       |
| `adev/src` (elsewhere)        |         60 | the tutorials' own step projects under `content/tutorials/first-app/steps/…` |
| `packages` (framework source) |          1 | `packages/core/resources/best-practices.md`, quoted verbatim by a guide      |

The tutorial row is worth knowing about, because those files serve two masters: each step directory
is both a runnable project the in-browser editor loads ([16](./16-adev.md)) and a source the
surrounding prose quotes from. Editing one to fix the other is how a step and its narration drift
apart.

The single framework-source reference is `best-practices.md` — the Angular style guidance shipped
inside `@angular/core` for AI tooling ([02](./02-core.md)), quoted into the docs so both copies stay
identical. The generated report lists the most-referenced files and the guides that lean hardest on
them.
