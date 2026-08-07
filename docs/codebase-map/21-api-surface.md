# The public API surface

Angular describes its public API twice, in two records that answer different questions and are
maintained by different mechanisms. Knowing which one to consult is most of the work.

|                         | `goldens/public-api/**/*.api.md`                         | JSDoc tags in source                                                           |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Answers                 | **what is exported**                                     | **how stable it is**                                                           |
| Produced by             | API Extractor, from the built `.d.ts`                    | hand-written `@publicApi`, `@developerPreview`, `@experimental`, `@deprecated` |
| Enforced by             | CI — a surface change fails until the golden is accepted | nothing mechanical                                                             |
| Read by                 | reviewers                                                | the angular.dev docs pipeline                                                  |
| Release tags it records | `@public`, `@deprecated` only                            | all four tiers, each with an optional version                                  |

Both are measured by [`tools/analyze-api-surface.mjs`](./tools/analyze-api-surface.mjs), which
writes [`generated/api-surface.md`](./generated/api-surface.md).

```bash
node docs/codebase-map/tools/analyze-api-surface.mjs
```

---

## 1. Size and shape

**1,230 exported declarations across 50 goldens.** Of those goldens, 38 are real npm entry points;
the other 12 track internal surfaces that are not importable but are worth reviewing anyway (§3).

The five largest entry points are just over half the surface:

| Entry point              | Declarations |
| ------------------------ | -----------: |
| `@angular/core`          |          329 |
| `@angular/forms/signals` |          158 |
| `@angular/router`        |          137 |
| `@angular/common`        |          102 |
| `@angular/forms`         |           80 |

`@angular/forms/signals` being the second-largest entry point in the framework — larger than
`@angular/router` or `@angular/common`, and twice the size of the classic `@angular/forms` — is the
clearest single measurement of how much new surface signal forms introduce.

Only three `ɵ`-prefixed symbols appear in any golden, all in `@angular/localize`
(`ɵ$localize`, `ɵLocalizeFn`, `ɵTranslateFn`); everywhere else the private prefix does what
`contributing-docs/public-api-surface.md` says it does and keeps symbols out of the reviewed
surface entirely.

## 2. What SemVer actually covers

`contributing-docs/public-api-surface.md` names **11 packages** whose API is under Angular's SemVer
and deprecation policy: `animations`, `common`, `core`, `elements`, `forms`,
`platform-browser`, `platform-browser-dynamic`, `platform-server`, `router`, `service-worker`,
`upgrade`.

Notably outside it:

- **`@angular/compiler`** — explicitly "private/internal API [that] may change at any time".
- **`@angular/compiler-cli`** — only its _command-line usage_ is covered, not its APIs, even though
  three goldens track them.
- **`@angular/localize`** — has goldens, is not on the list.

Coverage is a property of the package, not of the entry point: the policy excludes "any
file/import paths within our package except for the `/`, `/testing` and `/bundles/*` and other
documented package entry-points", so `@angular/common/http` is covered because `@angular/common`
is. The generated table marks each entry point accordingly.

Also excluded regardless of package: constructors of injectable classes, anything `private`,
underscore-prefixed or `ɵ`-prefixed, and subclassing Angular's classes unless documented.

## 3. Internal-surface goldens

Twelve goldens are not entry points at all. They exist so that changes to a _contract_ get the same
review a public API change gets:

- `core_errors`, `common_errors`, `http_errors`, `forms_errors`, `router_errors`,
  `animations_errors`, `platform-browser_errors`, `service-worker_errors` — each package's
  `RuntimeErrorCode` enum. **This is how an error-code change gets reviewed**: adding, renumbering
  or removing a code produces a golden diff. See [20](./20-error-codes.md).
- `error_code_api`, `extended_template_diagnostic_name_api`, `compiler_options_api` — the
  compiler's diagnostic codes, the names of the opt-in template checks, and the supported
  `tsconfig` options.
- `ng_global_utils_api` — the `ng.*` debug helpers available in the console
  (`applyChanges`, `getComponent`, `getDirectiveMetadata`, …), which DevTools also depends on.

## 4. Stability tiers, and the gap between the two records

The source declares four tiers, counted across the packages:

| Tag                 | Symbols | Meaning                                                         |
| ------------------- | ------: | --------------------------------------------------------------- |
| `@publicApi`        |     977 | stable, under the SemVer policy                                 |
| `@deprecated`       |     125 | scheduled to go                                                 |
| `@experimental`     |      16 | "low-to-medium confidence the API should exist at all"          |
| `@developerPreview` |       5 | "high confidence it will ship as stable", shape may still shift |

`contributing-docs/dev_preview_and_experimental.md` is explicit that the two pre-stable tiers are
**not subject to the breaking-change and deprecation policy**.

**But the goldens record every one of those as `// @public`.** API Extractor's release tag is not
derived from Angular's JSDoc tiers, so:

- `withViewTransitions` is `@developerPreview` in source and `// @public` in
  `goldens/public-api/router/index.api.md`;
- `provideExperimentalWebMcpTools` is `@experimental` in source and `// @public` in the core golden.

The practical consequence is that **promoting an API from developer preview to stable produces no
golden diff**, and neither does demoting one. The reviewed record of the API surface carries no
signal about which parts of it are actually committed to. The generated report lists all 21
pre-stable symbols with a column showing whether each appears in a golden, so the gap is visible.

## 5. Deprecations

125 symbols carry `@deprecated`, and the largest single group is effectively the whole of
**`@angular/animations`: 37 of the 38 entries in its golden are deprecated**, at `20.2`, in favour
of the CSS-class based `animate.enter` / `animate.leave` that now live in `@angular/core`
(see [09](./09-animations-elements-upgrade.md)). The one exception is the `AnimationEvent`
re-export, which carries no tag of its own. `@angular/platform-browser/animations` and its
`async` sub-entry-point are deprecated in full alongside it.

Other notable groups: the structural directives `NgIf`/`NgFor`/`NgSwitch` and friends at `20.0`
(superseded by built-in control flow), the JSONP client at `22.1`, and the
`APP_INITIALIZER`/`ENVIRONMENT_INITIALIZER`/`PLATFORM_INITIALIZER` tokens at `19.0`.

### The version in a deprecation is parsed, not declared

`generate_manifest.mts` reads the version as _the first number anywhere in the tag comment_:

```ts
const version = tag.comment.match(/\d+(\.\d+)?/)?.[0];
```

There is no required syntax — no policy in this repository says a `@deprecated` tag must state a
version, and 34 of the 125 state none. That is fine on its own; the manifest records
`version: undefined` and angular.dev renders the label without a version.

What is not fine is that any _other_ number in the sentence is taken instead. Two live cases:

| Symbol                  | Tag comment                                                                     | Parsed version | Rendered on angular.dev  |
| ----------------------- | ------------------------------------------------------------------------------- | -------------- | ------------------------ |
| `getLocaleCurrencyCode` | "We recommend you create a map of locale to **ISO 4217** currency codes."       | `4217`         | "deprecated since v4217" |
| `ServerXhr`             | "Use the HttpClient fetch backend instead. Intent to remove in **Angular 23**." | `23`           | "deprecated since v23"   |

The first is nonsense; the second is plausible but wrong — 23 is the intended _removal_ version,
not the deprecation version. `header-api.tsx` renders this straight into the API reference header
as `since v{version}`.

This map reports the two cases rather than changing the docs pipeline, because the fix is a design
choice: either require an explicit leading version in the tag (`@deprecated 20.2 …`, which most
tags already follow) and parse only that, or keep the loose match and correct the two comments.
