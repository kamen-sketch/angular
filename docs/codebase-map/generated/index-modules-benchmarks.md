<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `modules/benchmarks/`

84 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `modules/benchmarks/src/`

- `modules/benchmarks/src/util.ts` — 94 lines
  - function: `getIntParameter`, `getStringParameter`, `bindAction`, `profile`



## `modules/benchmarks/src/change_detection/`

- `modules/benchmarks/src/change_detection/change_detection.e2e-spec.ts` — 37 lines _(spec)_
- `modules/benchmarks/src/change_detection/change_detection.perf-spec.ts` — 79 lines _(spec)_
- `modules/benchmarks/src/change_detection/util.ts` — 22 lines
  - const: `numViews`
  - function: `newArray`, `newArray`, `newArray`



## `modules/benchmarks/src/change_detection/transplanted_views/`

- `modules/benchmarks/src/change_detection/transplanted_views/index_aot.ts` — 17 lines
- `modules/benchmarks/src/change_detection/transplanted_views/init.ts` — 49 lines
  - function: `init`
- `modules/benchmarks/src/change_detection/transplanted_views/main.ts` — 17 lines
- `modules/benchmarks/src/change_detection/transplanted_views/transplanted_views.ts` — 76 lines
  - class: `InsertionComponent`, `DeclarationComponent`, `TransplantedViewsModule`



## `modules/benchmarks/src/class_bindings/`

- `modules/benchmarks/src/class_bindings/app.component.ts` — 46 lines
  - class: `AppComponent`
- `modules/benchmarks/src/class_bindings/app.module.ts` — 21 lines
  - class: `AppModule`
- `modules/benchmarks/src/class_bindings/class_bindings.component.ts` — 38 lines
  - class: `ClassBindingsComponent`
- `modules/benchmarks/src/class_bindings/class_bindings.perf-spec.ts` — 37 lines _(spec)_



## `modules/benchmarks/src/defer/`

- `modules/benchmarks/src/defer/defer.e2e-spec.ts` — 28 lines _(spec)_
- `modules/benchmarks/src/defer/defer.perf-spec.ts` — 75 lines _(spec)_
- `modules/benchmarks/src/defer/init.ts` — 53 lines
  - function: `syncUrlParamsToForm`, `init`
- `modules/benchmarks/src/defer/util.ts` — 53 lines
  - class: `TableCell`
  - function: `initTableUtils`, `buildTable`
  - const: `emptyTable`



## `modules/benchmarks/src/defer/baseline/`

- `modules/benchmarks/src/defer/baseline/app.component.ts` — 57 lines
  - class: `AppComponent`
- `modules/benchmarks/src/defer/baseline/main.ts` — 21 lines



## `modules/benchmarks/src/defer/main/`

- `modules/benchmarks/src/defer/main/app.component.ts` — 57 lines
  - class: `AppComponent`
- `modules/benchmarks/src/defer/main/main.ts` — 21 lines



## `modules/benchmarks/src/expanding_rows/`

- `modules/benchmarks/src/expanding_rows/benchmark.ts` — 86 lines
  - class: `InitializationRoot`, `ExpandingRowBenchmarkModule`
  - function: `execTimed`, `nextTick`
- `modules/benchmarks/src/expanding_rows/benchmark_module.ts` — 54 lines
  - class: `BenchmarkArea`, `BenchmarkErrorHandler`, `BenchmarkModule`
- `modules/benchmarks/src/expanding_rows/benchmarkable_expanding_row.ts` — 72 lines
  - interface: `MlbTeam`
  - class: `BenchmarkableExpandingRow`
- `modules/benchmarks/src/expanding_rows/benchmarkable_expanding_row_module.ts` — 21 lines
  - class: `BenchmarkableExpandingRowModule`
- `modules/benchmarks/src/expanding_rows/expanding_row.ts` — 386 lines
  - const: `EXPANDING_ROW_HOST_INJECTION_TOKEN`
  - interface: `ExpandingRowHostBase`
  - class: `ExpandingRow`
- `modules/benchmarks/src/expanding_rows/expanding_row_css.ts` — 88 lines
  - const: `expanding_row_css`
- `modules/benchmarks/src/expanding_rows/expanding_row_details_caption.ts` — 67 lines
  - class: `ExpandingRowDetailsCaption`
- `modules/benchmarks/src/expanding_rows/expanding_row_details_content.ts` — 56 lines
  - class: `ExpandingRowDetailsContent`
- `modules/benchmarks/src/expanding_rows/expanding_row_host.ts` — 519 lines
  - const: `EXPANDING_ROW_KEYPRESS_THORTTLE_MS`
  - class: `ExpandingRowHost`
- `modules/benchmarks/src/expanding_rows/expanding_row_module.ts` — 40 lines
  - class: `ExpandingRowModule`
- `modules/benchmarks/src/expanding_rows/expanding_row_summary.ts` — 235 lines
  - class: `ExpandingRowSummary`
- `modules/benchmarks/src/expanding_rows/expanding_row_toggle_event.ts` — 23 lines
  - interface: `ExpandingRowToggleEvent`
- `modules/benchmarks/src/expanding_rows/expanding_row_uncollapsible.ts` — 20 lines
  - class: `ExpandingRowUncollapsible`
- `modules/benchmarks/src/expanding_rows/expanding_rows.perf-spec.ts` — 25 lines _(spec)_
- `modules/benchmarks/src/expanding_rows/main.ts` — 18 lines



## `modules/benchmarks/src/hydration/`

- `modules/benchmarks/src/hydration/hydration.e2e-spec.ts` — 29 lines _(spec)_
- `modules/benchmarks/src/hydration/hydration.perf-spec.ts` — 76 lines _(spec)_
- `modules/benchmarks/src/hydration/init.ts` — 123 lines
  - function: `syncUrlParamsToForm`, `init`
- `modules/benchmarks/src/hydration/table.ts` — 66 lines
  - class: `AppComponent`, `TableComponent`
  - function: `setupTransferState`
- `modules/benchmarks/src/hydration/util.ts` — 53 lines
  - class: `TableCell`
  - function: `initTableUtils`, `buildTable`
  - const: `emptyTable`



## `modules/benchmarks/src/hydration/baseline/`

- `modules/benchmarks/src/hydration/baseline/main.ts` — 19 lines



## `modules/benchmarks/src/hydration/main/`

- `modules/benchmarks/src/hydration/main/main.ts` — 24 lines



## `modules/benchmarks/src/js-web-frameworks/`

- `modules/benchmarks/src/js-web-frameworks/js-web-frameworks.perf-spec.ts` — 96 lines _(spec)_



## `modules/benchmarks/src/js-web-frameworks/ng2/`

- `modules/benchmarks/src/js-web-frameworks/ng2/init.ts` — 134 lines
  - function: `init`
- `modules/benchmarks/src/js-web-frameworks/ng2/main.ts` — 19 lines
- `modules/benchmarks/src/js-web-frameworks/ng2/rows.ts` — 61 lines
  - interface: `RowData`
  - class: `JsWebFrameworksComponent`



## `modules/benchmarks/src/largeform/`

- `modules/benchmarks/src/largeform/largeform.e2e-spec.ts` — 29 lines _(spec)_
- `modules/benchmarks/src/largeform/largeform.perf-spec.ts` — 53 lines _(spec)_



## `modules/benchmarks/src/largeform/ng2/`

- `modules/benchmarks/src/largeform/ng2/app.ts` — 99 lines
  - class: `AppComponent`, `AppModule`
- `modules/benchmarks/src/largeform/ng2/init.ts` — 41 lines
  - function: `init`
- `modules/benchmarks/src/largeform/ng2/main.ts` — 17 lines



## `modules/benchmarks/src/largetable/`

- `modules/benchmarks/src/largetable/largetable.e2e-spec.ts` — 32 lines _(spec)_
- `modules/benchmarks/src/largetable/largetable.perf-spec.ts` — 80 lines _(spec)_
- `modules/benchmarks/src/largetable/util.ts` — 53 lines
  - class: `TableCell`
  - function: `initTableUtils`, `buildTable`
  - const: `emptyTable`



## `modules/benchmarks/src/largetable/baseline/`

- `modules/benchmarks/src/largetable/baseline/main.ts` — 41 lines
- `modules/benchmarks/src/largetable/baseline/table.ts` — 74 lines
  - class: `TableComponent`



## `modules/benchmarks/src/largetable/ng2/`

- `modules/benchmarks/src/largetable/ng2/init.ts` — 40 lines
  - function: `init`
- `modules/benchmarks/src/largetable/ng2/main.ts` — 19 lines
- `modules/benchmarks/src/largetable/ng2/table.ts` — 47 lines
  - class: `TableComponent`



## `modules/benchmarks/src/largetable/ng2_switch/`

- `modules/benchmarks/src/largetable/ng2_switch/init.ts` — 43 lines
  - function: `init`
- `modules/benchmarks/src/largetable/ng2_switch/main.ts` — 17 lines
- `modules/benchmarks/src/largetable/ng2_switch/table.ts` — 52 lines
  - class: `TableComponent`, `AppModule`



## `modules/benchmarks/src/ng_template_outlet_context/`

- `modules/benchmarks/src/ng_template_outlet_context/ng_template_outlet_context.perf-spec.ts` — 78 lines _(spec)_



## `modules/benchmarks/src/ng_template_outlet_context/ng2/`

- `modules/benchmarks/src/ng_template_outlet_context/ng2/main.ts` — 87 lines



## `modules/benchmarks/src/styling/`

- `modules/benchmarks/src/styling/styling_perf.spec.ts` — 121 lines _(spec)_



## `modules/benchmarks/src/styling/ng2/`

- `modules/benchmarks/src/styling/ng2/init.ts` — 92 lines
  - function: `init`
- `modules/benchmarks/src/styling/ng2/main.ts` — 17 lines
- `modules/benchmarks/src/styling/ng2/styling.ts` — 64 lines
  - class: `StylingComponent`, `StylingModule`



## `modules/benchmarks/src/tree/`

- `modules/benchmarks/src/tree/test_utils.ts` — 43 lines
  - function: `runTreeBenchmark`, `openTreeBenchmark`
- `modules/benchmarks/src/tree/tree.e2e-spec.ts` — 29 lines _(spec)_
- `modules/benchmarks/src/tree/tree.perf-spec.ts` — 50 lines _(spec)_
- `modules/benchmarks/src/tree/tree_detect_changes.e2e-spec.ts` — 20 lines _(spec)_
- `modules/benchmarks/src/tree/tree_detect_changes.perf-spec.ts` — 21 lines _(spec)_
- `modules/benchmarks/src/tree/util.ts` — 89 lines
  - class: `TreeNode`
  - function: `getMaxDepth`, `initTreeUtils`, `buildTree`, `flattenTree`, `newArray`, `newArray`, `newArray`
  - const: `emptyTree`



## `modules/benchmarks/src/tree/baseline/`

- `modules/benchmarks/src/tree/baseline/main.ts` — 41 lines
- `modules/benchmarks/src/tree/baseline/tree.ts` — 70 lines
  - class: `TreeComponent`



## `modules/benchmarks/src/tree/ng2/`

- `modules/benchmarks/src/tree/ng2/init.ts` — 56 lines
  - function: `init`
- `modules/benchmarks/src/tree/ng2/main.ts` — 17 lines
- `modules/benchmarks/src/tree/ng2/tree.ts` — 50 lines
  - class: `TreeComponent`, `AppModule`



## `modules/benchmarks/src/tree/ng2_static/`

- `modules/benchmarks/src/tree/ng2_static/main.ts` — 56 lines
- `modules/benchmarks/src/tree/ng2_static/tree.ts` — 80 lines
  - class: `RootTreeComponent`
  - function: `createAppModule`



## `modules/benchmarks/src/tree/ng2_switch/`

- `modules/benchmarks/src/tree/ng2_switch/init.ts` — 43 lines
  - function: `init`
- `modules/benchmarks/src/tree/ng2_switch/main.ts` — 17 lines
- `modules/benchmarks/src/tree/ng2_switch/tree.ts` — 42 lines
  - class: `TreeComponent`, `AppModule`

