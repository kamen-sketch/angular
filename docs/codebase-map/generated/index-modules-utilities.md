<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `modules/utilities/`

3 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `modules/utilities/`

- `modules/utilities/e2e_util.ts` — 55 lines
  - function: `openBrowser`, `verifyNoBrowserErrors`
- `modules/utilities/index.ts` — 10 lines
  - exports `openBrowser`, `verifyNoBrowserErrors` from `./e2e_util`
  - exports `runBenchmark` from `./perf_util`
- `modules/utilities/perf_util.ts` — 131 lines
  - function: `runBenchmark`
  - exports `verifyNoBrowserErrors` from `./e2e_util`

