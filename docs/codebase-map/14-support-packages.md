# Support packages — `benchpress`, `misc`, `private`, `examples`, `docs`, `core/primitives`

The remaining `packages/` entries are not shipped as part of the framework's main surface but are
depended on by the build, the tests, or the documentation.

---

## 1. `packages/core/primitives/` — dependency-free building blocks

Each primitive is its own Bazel target with no dependency on `@angular/core` itself, so it can be
consumed by other packages (and, in some cases, by non-Angular code) without pulling in the
runtime:

| Primitive         | Contents                                                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `signals/`        | the reactive graph — `graph.ts`, `signal.ts`, `computed.ts`, `linked_signal.ts`, `effect.ts`, `watch.ts`, `equality.ts`, `untracked.ts`, `weak_ref.ts`, `errors.ts`, `formatter.ts`                                                                                |
| `di/`             | `injection_token.ts`, `injector.ts`, `not_found.ts`, `type.ts` — the DI vocabulary shared with the compiler                                                                                                                                                        |
| `event-dispatch/` | the early event contract used for SSR event replay: `eventcontract.ts`, `earlyeventcontract.ts`, `dispatcher.ts`, `event_dispatcher.ts`, `action_resolver.ts`, `event_contract_container.ts`, `event_info.ts`, `a11y_click.ts`, `key_code.ts`, `restriction.ts`, … |
| `defer/`          | `triggers.ts` — the shared `@defer` trigger definitions                                                                                                                                                                                                            |
| `devtools/`       | `debug_signal_graph.ts`, `framework.ts`, `profiler_types.ts`, `tool_definitions.ts` — the contract between the runtime and Angular DevTools                                                                                                                        |
| `dom-navigation/` | `navigation_types.ts` — typings for the Navigation API                                                                                                                                                                                                             |

## 2. `packages/benchpress` (43 files, ~5k lines)

A browser benchmarking harness used by `modules/benchmarks`.

`runner.ts` wires everything together; `sampler.ts` runs the measured loop until the
`validator/` says enough samples exist (`regression_slope_validator.ts` waits for the regression
slope to stabilise, `size_validator.ts` simply counts). `metric/` collects the numbers
(`perflog_metric.ts` reads the browser's performance log, `user_metric.ts` reads values the
benchmark itself reports, `multi_metric.ts` composes them), `reporter/` formats results
(`console_reporter.ts`, `json_file_reporter.ts`, `multi_reporter.ts`), and `webdriver/` adapts to
each browser (`chrome_driver_extension.ts`, `firefox_driver_extension.ts`,
`ios_driver_extension.ts`, `selenium_webdriver_adapter.ts`). `statistic.ts` holds the mean/
coefficient-of-variation maths; `sample_description*.ts` records the environment a sample was taken
in.

## 3. `packages/misc/angular-in-memory-web-api`

A standalone package (published separately) that intercepts `HttpClient` requests and serves them
from an in-memory database — used by tutorials and tests that need a backend without a server.

## 4. `packages/private/testing`

Internal test helpers shared across packages, not published. Includes `useAutoTick()` and
`timeout()`, which `AGENTS.md` directs agents and contributors to use for zoneless, async-first
tests, plus goldens/patching helpers.

## 5. `packages/examples`

Compilable, testable example applications, one directory per documented area (`core/`, `common/`,
`forms/`, `http/`, `router/`, `upgrade/`, `testing/`, `platform-browser/`, `service-worker/`,
`injection-token/`). The code snippets embedded in the API reference on angular.dev are extracted
from these files by region markers, so they are guaranteed to compile and are covered by e2e tests.
`test-utils/` holds the shared e2e assertion helpers (`verifyNoBrowserErrors`) those tests use.

## 6. `packages/docs`

Empty of source; it exists so documentation-only targets have a package to hang off.
