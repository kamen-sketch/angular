# `adev/` — angular.dev

1,049 files, ~62k lines. The Angular documentation site: an Angular application (`adev/src/`), a
reusable documentation component library (`adev/shared-docs/`), and a Bazel-driven content pipeline
that turns Markdown and TypeScript source into the pages the app renders.

Generated indexes:
[`adev/src`](./generated/index-adev-src.md) ·
[`adev/shared-docs`](./generated/index-adev-shared-docs.md) ·
[`adev/scripts`](./generated/index-adev-scripts.md)

---

## 1. The application (`adev/src/app/`)

Standard standalone-Angular layout: `app.component.ts`, `app.config.ts` (+ `app.config.server.ts`
for SSR), `routing/`, `main.ts` / `main.server.ts`, and `app-scroller.ts` for anchor scrolling.

`features/` — one directory per section of the site:

| Feature       | What it renders                                          |
| ------------- | -------------------------------------------------------- |
| `home/`       | the landing page, including its animated hero            |
| `docs/`       | guide pages produced by the content pipeline             |
| `references/` | the API reference browser                                |
| `tutorial/`   | the interactive tutorials, hosted in the embedded editor |
| `playground/` | the "try Angular in the browser" playground              |
| `update/`     | the version update guide                                 |
| `not-found/`  | 404                                                      |

`core/` holds `layout/` (navigation, header, footer, sidebar), `services/` and `constants/`.

`editor/` is the most substantial subsystem: an in-browser IDE built on WebContainers.
`node-runtime-sandbox.service.ts` boots a WebContainer, installs dependencies and runs the Angular
CLI inside the browser; `embedded-tutorial-manager.service.ts` loads a tutorial's files into it;
`code-editor/` is the CodeMirror-based editor (with `workers/` running TypeScript for diagnostics
and completions); `terminal/` renders the WebContainer's output; `preview/` hosts the running app in
an iframe; `download-manager.service.ts` and `stackblitz-opener.service.ts` export the current
project; `typings-loader.service.ts` fetches `.d.ts` files so the editor can type-check.

## 2. Content (`adev/src/content/`)

Markdown and example sources: `introduction/`, `guide/`, `best-practices/`, `tools/` (CLI,
DevTools, language service), `ecosystem/`, `reference/`, `tutorials/`, `examples/`, `ai/`, `aria/`,
`cdk/`, `cli/`, `events/`, plus `error.md` and the `kitchen-sink.md` used to exercise every
Markdown feature the renderer supports.

## 3. The documentation pipeline (`adev/shared-docs/pipeline/`)

Bazel rules (`_guides.bzl`, `_navigation.bzl`, `_tutorial.bzl`, `_playground.bzl`,
`_previews.bzl`, `_stackblitz.bzl`, `_zip.bzl`) drive Node scripts:

- `guides/` — Markdown → HTML, with the Angular-specific extensions (docs callouts, code regions,
  `<docs-code>`/`<docs-tabs>` blocks) and Shiki syntax highlighting.
- `api-gen/extraction/` — runs the compiler's `ngtsc/docs` API extractor over each package entry
  point and emits JSON; `interpolate_code_examples.mts` splices in example code by region name from
  `packages/examples/`.
- `api-gen/rendering/` — turns that JSON into HTML pages: `entities/` (one renderer per API kind —
  class, function, decorator, const, type alias, CLI command), `transforms/`, `templates/`,
  `symbol-context.mts` (cross-linking symbols), `shiki/`, `styling/`.
- `api-gen/manifest/` — the combined manifest the reference browser loads.
- `navigation/`, `tutorials/`, `examples/`, `shared/` — navigation trees, tutorial packaging, and
  shared helpers.

## 4. Shared documentation components (`adev/shared-docs/`)

A component library used by both angular.dev and other Angular-team sites:
`components/` (`search-dialog/` and `search-history/` over Algolia, `table-of-contents/`,
`navigation-list/`, `breadcrumb/`, `tab-group/`, `viewers/` for docs/example viewers,
`cookie-popup/`, `top-level-banner/`, `copy-source-code-button/`, `select/`, `slide-toggle/`,
`text-field/`, `icon/`), plus `directives/`, `pipes/`, `services/`, `providers/`, `interfaces/`,
`utils/`, `styles/`, `icons/` and `testing/`.

## 5. Site configuration

`angular.json`, `firebase.json` (hosting and redirects), `tailwind.config.js` and the three
`tsconfig*.json` files. `adev/scripts/` holds the out-of-band maintenance jobs:
`synonyms/` regenerates the Algolia search synonym list, and `update-cross-repo-docs/` pulls
documentation assets from the CLI, CDK and Material repositories into this one (it is what the
`cross-repo-adev-docs.yml` workflow runs). `adev/src/llms.txt` and
`robots.txt` control machine access to the site.
