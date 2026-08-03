# Tooling and infrastructure

Everything outside `packages/`, `adev/` and `devtools/`: the build system, the test harnesses,
the benchmark suites, the integration tests, and CI.

Generated indexes:
[`tools`](./generated/index-tools.md) ·
[`modules/benchmarks`](./generated/index-modules-benchmarks.md) ·
[`modules/playground`](./generated/index-modules-playground.md) ·
[`scripts`](./generated/index-scripts.md)

---

## 1. Build system — Bazel

The repository builds with Bazel (bzlmod). `MODULE.bazel` declares the external dependencies,
`.bazelrc` the flags, and `packages.bzl` the published package list. Package-level `BUILD.bazel`
files use the macros in **`tools/defaults.bzl`** rather than raw rules, so build behaviour can be
changed repo-wide in one place.

`tools/bazel/` holds the custom rules and helpers:
`js_defs.bzl`, `esbuild.bzl`, `rollup/`, `npm_packages.bzl` (npm package assembly),
`jasmine_test.bzl` / `web_test.bzl` / `protractor_test.bzl` (the three test flavours),
`tsec.bzl` (Trusted Types security checks — see `packages/tsec-exemption.json`),
`node_loader/`, and `rules_angular_store/`.
`tools/ng_benchmark.bzl` defines benchmark targets; `tools/symbol-extractor/` implements the
payload-size golden tests that assert which symbols survive tree shaking; `tools/manual_api_docs/`
generates API-doc JSON for things that are not TypeScript symbols (control-flow **blocks** like
`@if`/`@defer` and built-in **elements** like `<ng-content>`); `tools/testing/` holds the browser
test bootstrap; `tools/tslint/` holds custom lint rules.

`pnpm` manages node dependencies (`pnpm-workspace.yaml`, `.pnpmfile.cjs`); `AGENTS.md` and
`contributing-docs/building-and-testing-angular.md` document the day-to-day commands
(`pnpm bazel test //target`).

## 2. Goldens (`goldens/`)

- `goldens/public-api/` — one `.api.md` per package entry point, generated from the built `.d.ts`.
  Any change to the public API surface fails CI until the golden is accepted with
  `goldens/public-api/manage.js`. This is the fastest way to see a package's entire public surface.
- `goldens/vscode-extension/` — golden data for the language-service extension.
- `packages/circular-deps-test.conf.cjs` guards against new circular imports.

## 3. `modules/`

- `benchmarks/src/` — the micro-benchmarks driven by `packages/benchpress`: change detection, the
  `@for` repeater, DI, class/style bindings, expression evaluation, hydration, and more. Each has a
  `benchmark_test.bzl`/`e2e_test.bzl` target.
- `ssr-benchmarks/` — server-render throughput benchmarks.
- `playground/` — small hand-run demo applications used for manual verification.
- `utilities/` — `e2e_util.ts` / `perf_util.ts` shared by the above.

## 4. `integration/`

End-to-end verification that the _published_ packages work in real project setups. Each directory
is a self-contained project built against the locally built npm packages:
`cli-hello-world*` (several CLI configurations, including i18n, lazy loading and signal inputs),
`platform-server`, `platform-server-hydration`, `platform-server-zoneless`,
`standalone-bootstrap`, `ng_elements`, `ng-add-localize`, `ng_update`,
`ng-modules-importability`, `animations`, `legacy-animations`, `legacy-animations-async`,
`defer`, `service-worker-schema`, `trusted-types`, `terser`, `no_ts_linker`,
`nodenext_resolution`, `typings_test_ts60`, `typings_test_rxjs7`.

## 5. `scripts/`

`build/` — `build-packages-dist.mts` and `package-builder.mts` produce the npm-shaped output from
Bazel, with dedicated builders for `zone.js` and `angular-in-memory-web-api`.
`ci/` — snapshot publishing and package-archive creation.
`test/`, `benchmarks/`, `compare-main-to-patch.js` and `diff-release-package.mts` support release
and triage work.

## 6. CI (`.github/`)

Workflows: `ci.yml` and `pr.yml` (build/test matrix), `dev-infra.yml`,
`google-internal-tests.yml` (the internal presubmit bridge), `perf.yml` and
`benchmark-compare.yml`, `adev-preview-build.yml`/`adev-preview-deploy.yml` (docs previews),
`cross-repo-adev-docs.yml`, `release.yml`, `merge-ready-status.yml`,
`assistant-to-the-branch-manager.yml`, `scorecard.yml`.

`.ng-dev/` configures the `ng-dev` tooling (commit-message format, merge rules, release config,
formatting); `.pullapprove.yml` maps directories to reviewer groups — it is also a useful index of
who owns what.

## 7. Repository conventions

- `AGENTS.md` — the instructions for AI agents and the summary of test conventions (zoneless,
  "act, wait, assert", `whenStable` over `detectChanges`).
- `contributing-docs/` — `building-and-testing-angular.md`, `coding-standards.md`,
  `commit-message-guidelines.md`, `caretaking.md`, `using-fixup-commits.md`, public API guidance.
- `.agent/skills/` and `skills/dev-skills/` — task-specific reference material for agents
  (`reference-core`, `reference-compiler-cli`, `reference-signal-forms`, `pr_review`,
  `adev-writing-guide`, and the `angular-developer` reference set).
- `.gemini/`, `.vscode/`, `.devcontainer/`, `.husky/` — editor and environment configuration.
- `vscode-ng-language-service/` — the VS Code extension wrapping `packages/language-service`.
