<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/benchpress/`

43 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/benchpress/`

- `packages/benchpress/index.ts` — 37 lines
  - exports `InjectionToken`, `Injector`, `Provider`, `StaticProvider` from `@angular/core`
  - exports `Options` from `./src/common_options`
  - exports `MeasureValues` from `./src/measure_values`
  - exports `Metric` from `./src/metric`
  - exports `MultiMetric` from `./src/metric/multi_metric`
  - exports `PerflogMetric` from `./src/metric/perflog_metric`
  - exports `UserMetric` from `./src/metric/user_metric`
  - exports `Reporter` from `./src/reporter`
  - exports `ConsoleReporter` from `./src/reporter/console_reporter`
  - exports `JsonFileReporter` from `./src/reporter/json_file_reporter`
  - exports `MultiReporter` from `./src/reporter/multi_reporter`
  - exports `Runner` from `./src/runner`
  - exports `SampleDescription` from `./src/sample_description`
  - exports `Sampler`, `SampleState` from `./src/sampler`
  - exports `Validator` from `./src/validator`
  - exports `RegressionSlopeValidator` from `./src/validator/regression_slope_validator`
  - exports `SizeValidator` from `./src/validator/size_validator`
  - exports `WebDriverAdapter` from `./src/web_driver_adapter`
  - exports `PerfLogEvent`, `PerfLogFeatures`, `WebDriverExtension` from `./src/web_driver_extension`
  - exports `ChromeDriverExtension` from `./src/webdriver/chrome_driver_extension`
  - exports `FirefoxDriverExtension` from `./src/webdriver/firefox_driver_extension`
  - exports `IOsDriverExtension` from `./src/webdriver/ios_driver_extension`
  - exports `SeleniumWebDriverAdapter` from `./src/webdriver/selenium_webdriver_adapter`



## `packages/benchpress/src/`

- `packages/benchpress/src/common_options.ts` — 57 lines
  - class: `Options`
- `packages/benchpress/src/measure_values.ts` — 24 lines
  - class: `MeasureValues`
- `packages/benchpress/src/metric.ts` — 37 lines
  - class: `Metric`
- `packages/benchpress/src/reporter.ts` — 23 lines
  - class: `Reporter`
- `packages/benchpress/src/runner.ts` — 126 lines
  - class: `Runner`
- `packages/benchpress/src/sample_description.ts` — 32 lines
  - class: `SampleDescription`
- `packages/benchpress/src/sample_description_providers.ts` — 47 lines
  - const: `sampleDescriptionProviders`
- `packages/benchpress/src/sampler.ts` — 106 lines
  - class: `Sampler`, `SampleState`
- `packages/benchpress/src/statistic.ts` — 44 lines
  - class: `Statistic`
- `packages/benchpress/src/validator.ts` — 32 lines
  - class: `Validator`
- `packages/benchpress/src/web_driver_adapter.ts` — 31 lines
  - class: `WebDriverAdapter`
- `packages/benchpress/src/web_driver_extension.ts` — 121 lines
  - type: `PerfLogEvent`
  - class: `WebDriverExtension`, `PerfLogFeatures`



## `packages/benchpress/src/metric/`

- `packages/benchpress/src/metric/multi_metric.ts` — 71 lines
  - class: `MultiMetric`
- `packages/benchpress/src/metric/perflog_metric.ts` — 430 lines
  - class: `PerflogMetric`
- `packages/benchpress/src/metric/user_metric.ts` — 81 lines
  - class: `UserMetric`



## `packages/benchpress/src/reporter/`

- `packages/benchpress/src/reporter/console_reporter.ts` — 61 lines
  - class: `ConsoleReporter`
- `packages/benchpress/src/reporter/json_file_reporter.ts` — 84 lines
  - class: `JsonFileReporter`
- `packages/benchpress/src/reporter/json_file_reporter_types.ts` — 21 lines
  - interface: `JsonReport`
- `packages/benchpress/src/reporter/multi_reporter.ts` — 49 lines
  - class: `MultiReporter`
- `packages/benchpress/src/reporter/text_reporter_base.ts` — 78 lines
  - const: `COLUMN_WIDTH`, `defaultColumnWidth`
  - class: `TextReporterBase`
- `packages/benchpress/src/reporter/util.ts` — 29 lines
  - function: `formatNum`, `sortedProps`, `formatStats`



## `packages/benchpress/src/validator/`

- `packages/benchpress/src/validator/regression_slope_validator.ts` — 69 lines
  - class: `RegressionSlopeValidator`
- `packages/benchpress/src/validator/size_validator.ts` — 41 lines
  - class: `SizeValidator`



## `packages/benchpress/src/webdriver/`

- `packages/benchpress/src/webdriver/chrome_driver_extension.ts` — 289 lines
  - class: `ChromeDriverExtension`
- `packages/benchpress/src/webdriver/firefox_driver_extension.ts` — 57 lines
  - class: `FirefoxDriverExtension`
- `packages/benchpress/src/webdriver/ios_driver_extension.ts` — 145 lines
  - class: `IOsDriverExtension`
- `packages/benchpress/src/webdriver/selenium_webdriver_adapter.ts` — 91 lines
  - class: `SeleniumWebDriverAdapter`



## `packages/benchpress/test/`

- `packages/benchpress/test/runner_spec.ts` — 163 lines _(spec)_
- `packages/benchpress/test/sampler_spec.ts` — 307 lines _(spec)_
- `packages/benchpress/test/statistic_spec.ts` — 35 lines _(spec)_
- `packages/benchpress/test/trace_event_factory.ts` — 57 lines _(test-support)_
  - class: `TraceEventFactory`
- `packages/benchpress/test/web_driver_extension_spec.ts` — 56 lines _(spec)_



## `packages/benchpress/test/metric/`

- `packages/benchpress/test/metric/multi_metric_spec.ts` — 76 lines _(spec)_
- `packages/benchpress/test/metric/perflog_metric_spec.ts` — 852 lines _(spec)_
- `packages/benchpress/test/metric/user_metric_spec.ts` — 90 lines _(spec)_



## `packages/benchpress/test/reporter/`

- `packages/benchpress/test/reporter/console_reporter_spec.ts` — 99 lines _(spec)_
- `packages/benchpress/test/reporter/json_file_reporter_spec.ts` — 85 lines _(spec)_
- `packages/benchpress/test/reporter/multi_reporter_spec.ts` — 76 lines _(spec)_



## `packages/benchpress/test/validator/`

- `packages/benchpress/test/validator/regression_slope_validator_spec.ts` — 58 lines _(spec)_
- `packages/benchpress/test/validator/size_validator_spec.ts` — 42 lines _(spec)_



## `packages/benchpress/test/webdriver/`

- `packages/benchpress/test/webdriver/chrome_driver_extension_spec.ts` — 488 lines _(spec)_
- `packages/benchpress/test/webdriver/ios_driver_extension_spec.ts` — 215 lines _(spec)_

