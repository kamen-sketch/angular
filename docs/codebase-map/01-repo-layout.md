# Repository layout

The `angular/angular` monorepo holds the framework, its tooling, the documentation site and the
DevTools extension. ~7,000 first-party source files, ~1.08M lines (see
[`generated/summary.md`](./generated/summary.md) for the exact per-package breakdown).

---

## Top level

| Path                                       | What it is                                                                                        | Map                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `packages/`                                | the published npm packages — the framework itself                                                 | §"Packages" below                           |
| `adev/`                                    | angular.dev: the documentation site, its content and its build pipeline                           | [16](./16-adev.md)                          |
| `devtools/`                                | the Angular DevTools browser extension                                                            | [15](./15-devtools.md)                      |
| `modules/`                                 | benchmarks (`benchmarks/`, `ssr-benchmarks/`), manual demos (`playground/`), shared e2e utilities | [17](./17-tooling-and-infrastructure.md)    |
| `integration/`                             | end-to-end projects that consume the built npm packages                                           | [17](./17-tooling-and-infrastructure.md)    |
| `tools/`                                   | Bazel rules and macros, the symbol extractor, lint rules, manual API-doc generators               | [17](./17-tooling-and-infrastructure.md)    |
| `scripts/`                                 | release, build-output and CI helper scripts                                                       | [17](./17-tooling-and-infrastructure.md)    |
| `goldens/`                                 | public-API goldens (`public-api/*.api.md`) — the accepted API surface                             | [17](./17-tooling-and-infrastructure.md)    |
| `dev-app/`                                 | a scratch Angular application for experimenting against the local framework build                 | —                                           |
| `vscode-ng-language-service/`              | the VS Code extension (`client/`, `server/`) wrapping `packages/language-service`                 | [11](./11-localize-and-language-service.md) |
| `contributing-docs/`                       | contributor documentation: building/testing, coding standards, commit format, caretaking          | —                                           |
| `.agent/`, `skills/`, `AGENTS.md`          | agent-facing instructions and reference skills                                                    | [17](./17-tooling-and-infrastructure.md)    |
| `.ng-dev/`, `.github/`, `.pullapprove.yml` | dev-infra config, CI workflows, reviewer ownership                                                | [17](./17-tooling-and-infrastructure.md)    |
| `third_party/`                             | vendored assets (currently only `fonts.google.com`)                                               | —                                           |

Build configuration lives at the root: `MODULE.bazel` (+ `.lock`), `.bazelrc`, `packages.bzl`,
`package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `tsconfig-tslint.json`, `tslint.json`,
`.prettierrc`.

## Packages

| Package                    | Lines | Role                                                                     | Map                                         |
| -------------------------- | ----: | ------------------------------------------------------------------------ | ------------------------------------------- |
| `core`                     |  309k | the runtime: rendering, DI, reactivity, authoring API                    | [02](./02-core.md)                          |
| `compiler-cli`             |  226k | ngtsc — TypeScript integration, type checking, the linker                | [04](./04-compiler-cli.md)                  |
| `compiler`                 |   90k | template parsing and the instruction-generating pipeline                 | [03](./03-compiler.md)                      |
| `forms`                    |   69k | reactive/template-driven forms **and** signal forms                      | [06](./06-forms.md)                         |
| `common`                   |   43k | built-in directives and pipes, i18n formatting, `Location`, `HttpClient` | [05](./05-common.md)                        |
| `router`                   |   39k | URL parsing, navigation pipeline, outlets and links                      | [07](./07-router.md)                        |
| `zone.js`                  |   38k | execution-context tracking (independent library)                         | [12](./12-zone-js.md)                       |
| `language-service`         |   37k | the TypeScript language-service plugin                                   | [11](./11-localize-and-language-service.md) |
| `platform-server`          |   17k | server-side rendering                                                    | [08](./08-platform-packages.md)             |
| `localize`                 |   15k | `$localize` runtime and the i18n extract/translate/migrate tools         | [11](./11-localize-and-language-service.md) |
| `animations`               |   13k | the DSL-based animation engine                                           | [09](./09-animations-elements-upgrade.md)   |
| `upgrade`                  |   13k | AngularJS interoperability                                               | [09](./09-animations-elements-upgrade.md)   |
| `service-worker`           |   13k | `ngsw-worker` plus its config generator and app-side API                 | [10](./10-service-worker.md)                |
| `platform-browser`         |   11k | the DOM renderer, sanitizer, event plugins, `bootstrapApplication`       | [08](./08-platform-packages.md)             |
| `examples`                 |    7k | compilable examples embedded into the API reference                      | [14](./14-support-packages.md)              |
| `benchpress`               |    5k | the benchmarking harness                                                 | [14](./14-support-packages.md)              |
| `misc`                     |    3k | `angular-in-memory-web-api`                                              | [14](./14-support-packages.md)              |
| `elements`                 |    2k | custom-element wrapper for components                                    | [09](./09-animations-elements-upgrade.md)   |
| `platform-browser-dynamic` |  0.7k | JIT bootstrapping                                                        | [08](./08-platform-packages.md)             |
| `private`                  |  0.7k | internal test helpers                                                    | [14](./14-support-packages.md)              |
| `ssr`                      |     — | docs-only re-export shim; `@angular/ssr` lives in the CLI repo           | [08](./08-platform-packages.md)             |
| `docs`                     |     — | Markdown-only package (`di/`)                                            | [14](./14-support-packages.md)              |

Cross-cutting concerns that do not map onto one package:

- `packages/core/primitives/` — dependency-free building blocks (signals graph, DI vocabulary,
  event dispatch, devtools contract) — [14](./14-support-packages.md).
- `packages/core/schematics/` — every `ng update` migration and `ng generate` transformation,
  built on the Tsurge framework — [13](./13-schematics-and-migrations.md).

## Package anatomy

Every package follows the same shape, which makes navigation predictable:

```
packages/<name>/
  index.ts             re-exports public_api.ts
  public_api.ts        the public surface (matches goldens/public-api/<name>/index.api.md)
  package.json         npm metadata, entry points
  PACKAGE.md           the package's overview page on angular.dev
  BUILD.bazel          build targets
  src/                 implementation
    <name>.ts          the top-level barrel for src
    private_export.ts  the ɵ-prefixed symbols other Angular packages may import
    errors.ts          the package's RuntimeErrorCode enum
    version.ts         the VERSION const
  test/                specs (also `*_spec.ts` co-located under src in some packages)
  testing/             the `@angular/<name>/testing` secondary entry point
  schematics/          migrations, where the package has them
```

Secondary entry points (`@angular/common/http`, `@angular/forms/signals`,
`@angular/core/rxjs-interop`, `@angular/platform-browser/animations/async`, …) are directories at
the package root with their own `index.ts`/`public_api.ts`/`BUILD.bazel`, mirroring the same shape.
