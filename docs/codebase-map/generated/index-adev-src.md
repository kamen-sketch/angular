<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `adev/src/`

788 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `adev/src/`

- `adev/src/main.server.ts` — 17 lines
  - has a default export
- `adev/src/main.ts` — 14 lines



## `adev/src/app/`

- `adev/src/app/app-scroller.ts` — 127 lines
  - class: `AppScroller`
- `adev/src/app/app.component.spec.ts` — 44 lines _(spec)_
- `adev/src/app/app.component.ts` — 118 lines
  - class: `AppComponent`
- `adev/src/app/app.config.server.ts` — 23 lines
  - const: `config`
- `adev/src/app/app.config.ts` — 60 lines
  - const: `appConfig`
- `adev/src/app/environment.ts` — 30 lines
  - has a default export
- `adev/src/app/main.component.ts` — 33 lines
  - has a default export



## `adev/src/app/core/constants/`

- `adev/src/app/core/constants/element-ids.ts` — 12 lines
  - const: `PRIMARY_NAV_ID`, `SECONDARY_NAV_ID`, `SEARCH_DIALOG_ID`
- `adev/src/app/core/constants/keys.ts` — 13 lines
  - const: `COMMAND`, `CONTROL`, `ESCAPE`, `SEARCH_TRIGGER_KEY`
- `adev/src/app/core/constants/links.ts` — 18 lines
  - const: `ANGULAR_LINKS`
- `adev/src/app/core/constants/pages.ts` — 29 lines
  - const: `DEFAULT_PAGES`, `PAGE_PREFIX`



## `adev/src/app/core/layout/footer/`

- `adev/src/app/core/layout/footer/footer.component.spec.ts` — 44 lines _(spec)_
- `adev/src/app/core/layout/footer/footer.component.ts` — 24 lines
  - class: `Footer`



## `adev/src/app/core/layout/navigation/`

- `adev/src/app/core/layout/navigation/navigation.component.spec.ts` — 104 lines _(spec)_
- `adev/src/app/core/layout/navigation/navigation.component.ts` — 207 lines
  - class: `Navigation`



## `adev/src/app/core/layout/progress-bar/`

- `adev/src/app/core/layout/progress-bar/progress-bar.component.spec.ts` — 43 lines _(spec)_
- `adev/src/app/core/layout/progress-bar/progress-bar.component.ts` — 79 lines
  - const: `PROGRESS_BAR_DELAY`
  - class: `ProgressBarComponent`



## `adev/src/app/core/layout/secondary-navigation/`

- `adev/src/app/core/layout/secondary-navigation/secondary-navigation.component.spec.ts` — 43 lines _(spec)_
- `adev/src/app/core/layout/secondary-navigation/secondary-navigation.component.ts` — 192 lines
  - const: `ANIMATION_DURATION`
  - class: `SecondaryNavigation`



## `adev/src/app/core/services/`

- `adev/src/app/core/services/a-dev-title-strategy.spec.ts` — 114 lines _(spec)_
- `adev/src/app/core/services/a-dev-title-strategy.ts` — 61 lines
  - const: `ROUTE_TITLE_PROPERTY`, `ROUTE_PARENT_PROPERTY`, `TITLE_SUFFIX`, `TITLE_SEPARATOR`, `DEFAULT_PAGE_TITLE`, `TITLE_OG_META_TAG`, `TITLE_TWITTER_META_TAG`, `ALL_TITLE_META_TAGS`
  - class: `ADevTitleStrategy`
- `adev/src/app/core/services/content-loader.service.spec.ts` — 199 lines _(spec)_
- `adev/src/app/core/services/content-loader.service.ts` — 48 lines
  - class: `ContentLoader`
- `adev/src/app/core/services/example-content-loader.service.spec.ts` — 28 lines _(spec)_
- `adev/src/app/core/services/example-content-loader.service.ts` — 20 lines
  - class: `ExampleContentLoader`
- `adev/src/app/core/services/header.service.spec.ts` — 32 lines _(spec)_
- `adev/src/app/core/services/header.service.ts` — 41 lines
  - class: `HeaderService`
- `adev/src/app/core/services/theme-manager.service.spec.ts` — 65 lines _(spec)_
- `adev/src/app/core/services/theme-manager.service.ts` — 89 lines
  - const: `THEME_PREFERENCE_LOCAL_STORAGE_KEY`, `DARK_MODE_CLASS_NAME`, `LIGHT_MODE_CLASS_NAME`, `PREFERS_COLOR_SCHEME_DARK`
  - type: `Theme`
  - class: `ThemeManager`
- `adev/src/app/core/services/version-manager.service.ts` — 103 lines
  - interface: `Version`
  - type: `VersionMode`
  - const: `INITIAL_ADEV_DOCS_VERSION`, `VERSION_PLACEHOLDER`, `MODE_PLACEHOLDER`
  - class: `VersionManager`



## `adev/src/app/core/services/analytics/`

- `adev/src/app/core/services/analytics/analytics-format-error.ts` — 51 lines
  - function: `formatErrorEventForAnalytics`, `formatErrorForAnalytics`
- `adev/src/app/core/services/analytics/analytics.service.spec.ts` — 93 lines _(spec)_
- `adev/src/app/core/services/analytics/analytics.service.ts` — 110 lines
  - class: `AnalyticsService`



## `adev/src/app/core/services/errors-handling/`

- `adev/src/app/core/services/errors-handling/error-handler.ts` — 61 lines
  - class: `CustomErrorHandler`
- `adev/src/app/core/services/errors-handling/error-snack-bar.spec.ts` — 85 lines _(spec)_
- `adev/src/app/core/services/errors-handling/error-snack-bar.ts` — 76 lines
  - type: `ErrorSnackBarPose`
  - interface: `ErrorSnackBarData`
  - class: `ErrorSnackBar`



## `adev/src/app/core/services/routing/`

- `adev/src/app/core/services/routing/adev-url-serializer.ts` — 26 lines
  - class: `AdevUrlSerializer`
- `adev/src/app/core/services/routing/adev-url.serializer.spec.ts` — 37 lines _(spec)_



## `adev/src/app/editor/`

- `adev/src/app/editor/alert-manager.service.ts` — 114 lines
  - const: `MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES`, `WEBCONTAINERS_COUNTER_KEY`
  - enum: `AlertReason`
  - class: `AlertManager`
- `adev/src/app/editor/constants.ts` — 17 lines
  - const: `TUTORIALS_ASSETS_WEB_PATH`, `TUTORIALS_ASSETS_SOURCE_CODE_DIRECTORY`, `TUTORIALS_ASSETS_METADATA_DIRECTORY`, `TUTORIALS_SOURCE_CODE_WEB_PATH`, `TUTORIALS_METADATA_WEB_PATH`, `TUTORIALS_COMMON_DIRECTORY`
- `adev/src/app/editor/download-manager.service.spec.ts` — 24 lines _(spec)_
- `adev/src/app/editor/download-manager.service.ts` — 51 lines
  - class: `DownloadManager`
- `adev/src/app/editor/editor-ui-state.service.spec.ts` — 27 lines _(spec)_
- `adev/src/app/editor/editor-ui-state.service.ts` — 30 lines
  - class: `EditorUiState`
- `adev/src/app/editor/embedded-editor.component.ts` — 142 lines
  - const: `EMBEDDED_EDITOR_SELECTOR`, `LARGE_EDITOR_WIDTH_BREAKPOINT`, `LARGE_EDITOR_HEIGHT_BREAKPOINT`
  - class: `EmbeddedEditor`
- `adev/src/app/editor/embedded-tutorial-manager.service.spec.ts` — 501 lines _(spec)_
- `adev/src/app/editor/embedded-tutorial-manager.service.ts` — 191 lines
  - class: `EmbeddedTutorialManager`
- `adev/src/app/editor/error-filename-handler.ts` — 39 lines
  - function: `setupErrorFilenameHandler`
- `adev/src/app/editor/index.ts` — 17 lines
  - exports `EmbeddedTutorialManager` from `./embedded-tutorial-manager.service`
  - exports `LoadingStep` from `./enums/loading-steps`
  - exports `NodeRuntimeState` from `./node-runtime-state.service`
  - exports `injectNodeRuntimeSandbox` from `./inject-node-runtime-sandbox`
  - exports `EmbeddedEditor`, `EMBEDDED_EDITOR_SELECTOR` from `./embedded-editor.component`
  - exports `injectEmbeddedTutorialManager` from `./inject-embedded-tutorial-manager`
- `adev/src/app/editor/inject-embedded-tutorial-manager.ts` — 18 lines
  - function: `injectEmbeddedTutorialManager`
- `adev/src/app/editor/inject-node-runtime-sandbox.ts` — 16 lines
  - function: `injectNodeRuntimeSandbox`
- `adev/src/app/editor/node-runtime-errors.ts` — 11 lines
  - const: `DEV_SERVER_READY_MSG`, `OUT_OF_MEMORY_MSG`
- `adev/src/app/editor/node-runtime-sandbox.service.spec.ts` — 276 lines _(spec)_
- `adev/src/app/editor/node-runtime-sandbox.service.ts` — 533 lines
  - const: `PACKAGE_MANAGER`
  - class: `NodeRuntimeSandbox`
- `adev/src/app/editor/node-runtime-state.service.spec.ts` — 49 lines _(spec)_
- `adev/src/app/editor/node-runtime-state.service.ts` — 88 lines
  - const: `MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES`, `WEBCONTAINERS_COUNTER_KEY`
  - type: `NodeRuntimeError`
  - enum: `ErrorType`
  - class: `NodeRuntimeState`
- `adev/src/app/editor/stackblitz-opener.service.spec.ts` — 24 lines _(spec)_
- `adev/src/app/editor/stackblitz-opener.service.ts` — 44 lines
  - class: `StackBlitzOpener`
- `adev/src/app/editor/typings-loader.service.spec.ts` — 102 lines _(spec)_
- `adev/src/app/editor/typings-loader.service.ts` — 229 lines
  - class: `TypingsLoader`



## `adev/src/app/editor/code-editor/`

- `adev/src/app/editor/code-editor/code-editor.component.spec.ts` — 237 lines _(spec)_
- `adev/src/app/editor/code-editor/code-editor.component.ts` — 349 lines
  - const: `REQUIRED_FILES`
  - class: `CodeEditor`
- `adev/src/app/editor/code-editor/code-mirror-editor.service.spec.ts` — 191 lines _(spec)_
  - class: `FakeEmbeddedTutorialManager`
- `adev/src/app/editor/code-editor/code-mirror-editor.service.ts` — 526 lines
  - interface: `EditorFile`
  - const: `EDITOR_CONTENT_CHANGE_DELAY_MILLIES`
  - class: `CodeMirrorEditor`



## `adev/src/app/editor/code-editor/constants/`

- `adev/src/app/editor/code-editor/constants/code-editor-extensions.ts` — 94 lines
  - const: `CODE_EDITOR_EXTENSIONS`
  - exports `EditorView` from `@codemirror/view`
- `adev/src/app/editor/code-editor/constants/code-editor-languages.ts` — 28 lines
  - const: `LANGUAGES`
- `adev/src/app/editor/code-editor/constants/syntax-styles.ts` — 247 lines
  - const: `SYNTAX_STYLES`
- `adev/src/app/editor/code-editor/constants/theme-styles.ts` — 76 lines
  - const: `CODE_EDITOR_THEME_STYLES`



## `adev/src/app/editor/code-editor/extensions/`

- `adev/src/app/editor/code-editor/extensions/autocomplete.ts` — 119 lines
  - const: `getAutocompleteExtension`
- `adev/src/app/editor/code-editor/extensions/diagnostics.ts` — 56 lines
  - const: `getDiagnosticsExtension`
- `adev/src/app/editor/code-editor/extensions/tooltip.spec.ts` — 42 lines _(spec)_
- `adev/src/app/editor/code-editor/extensions/tooltip.ts` — 159 lines
  - const: `getTooltipExtension`
  - function: `getMarkedHtmlFromString`, `getTagsHtml`



## `adev/src/app/editor/code-editor/services/`

- `adev/src/app/editor/code-editor/services/diagnostics-state.service.spec.ts` — 24 lines _(spec)_
- `adev/src/app/editor/code-editor/services/diagnostics-state.service.ts` — 29 lines
  - interface: `DiagnosticWithLocation`
  - class: `DiagnosticsState`



## `adev/src/app/editor/code-editor/utils/`

- `adev/src/app/editor/code-editor/utils/component-ts-syntax.ts` — 117 lines
  - function: `angularComponent`



## `adev/src/app/editor/code-editor/workers/`

- `adev/src/app/editor/code-editor/workers/factory-provider.ts` — 27 lines
  - type: `TypescriptVfsWorkerFactory`
  - const: `TYPESCRIPT_VFS_WORKER_FACTORY`, `TYPESCRIPT_VFS_WORKER_PROVIDER`
  - function: `createTypescriptVfsWorker`
- `adev/src/app/editor/code-editor/workers/typescript-vfs.worker.ts` — 279 lines



## `adev/src/app/editor/code-editor/workers/enums/`

- `adev/src/app/editor/code-editor/workers/enums/actions.ts` — 23 lines
  - const enum: `TsVfsWorkerActions`



## `adev/src/app/editor/code-editor/workers/interfaces/`

- `adev/src/app/editor/code-editor/workers/interfaces/autocomplete-request.ts` — 19 lines
  - interface: `AutocompleteRequest`
- `adev/src/app/editor/code-editor/workers/interfaces/autocomplete-response.ts` — 23 lines
  - interface: `AutocompleteItem`
  - type: `AutocompleteResponse`
- `adev/src/app/editor/code-editor/workers/interfaces/code-change-request.ts` — 16 lines
  - interface: `CodeChangeRequest`
- `adev/src/app/editor/code-editor/workers/interfaces/define-types-request.ts` — 15 lines
  - interface: `Typing`
  - type: `DefineTypesRequest`
- `adev/src/app/editor/code-editor/workers/interfaces/diagnostics-request.ts` — 28 lines
  - interface: `DiagnosticsRequest`, `DiagnosticsResult`
  - type: `DiagnosticsResponse`
- `adev/src/app/editor/code-editor/workers/interfaces/display-tooltip-request.ts` — 16 lines
  - interface: `DisplayTooltipRequest`
- `adev/src/app/editor/code-editor/workers/interfaces/display-tooltip-response.ts` — 16 lines
  - interface: `DisplayTooltipResponse`
- `adev/src/app/editor/code-editor/workers/interfaces/message.ts` — 15 lines
  - interface: `ActionMessage`



## `adev/src/app/editor/code-editor/workers/utils/`

- `adev/src/app/editor/code-editor/workers/utils/compiler-opts.ts` — 20 lines
  - const: `getCompilerOpts`
- `adev/src/app/editor/code-editor/workers/utils/environment.ts` — 46 lines
  - const: `EMPTY_FILE_CONTENT`
  - function: `updateOrCreateFile`, `updateFile`, `createFile`, `fileExists`, `normalizeFileContent`, `normalizeFileName`
- `adev/src/app/editor/code-editor/workers/utils/ts-constants.ts` — 57 lines
  - const: `USER_PREFERENCES`, `FORMAT_CODE_SETTINGS`



## `adev/src/app/editor/enums/`

- `adev/src/app/editor/enums/loading-steps.ts` — 18 lines
  - enum: `LoadingStep`



## `adev/src/app/editor/preview/`

- `adev/src/app/editor/preview/preview-error.component.spec.ts` — 26 lines _(spec)_
- `adev/src/app/editor/preview/preview-error.component.ts` — 28 lines
  - class: `PreviewError`
- `adev/src/app/editor/preview/preview.component.spec.ts` — 170 lines _(spec)_
- `adev/src/app/editor/preview/preview.component.ts` — 49 lines
  - class: `Preview`



## `adev/src/app/editor/terminal/`

- `adev/src/app/editor/terminal/command-validator.service.spec.ts` — 36 lines _(spec)_
- `adev/src/app/editor/terminal/command-validator.service.ts` — 37 lines
  - const: `ALLOWED_COMMAND_PREFIXES`
  - class: `CommandValidator`
- `adev/src/app/editor/terminal/interactive-terminal.ts` — 111 lines
  - const: `NOT_VALID_COMMAND_MSG`, `ALLOWED_KEYS`, `adevTerminalDefaultOptions`
  - class: `InteractiveTerminal`
- `adev/src/app/editor/terminal/terminal-handler.service.spec.ts` — 39 lines _(spec)_
- `adev/src/app/editor/terminal/terminal-handler.service.ts` — 101 lines
  - enum: `TerminalType`
  - class: `TerminalHandler`
- `adev/src/app/editor/terminal/terminal.component.spec.ts` — 70 lines _(spec)_
- `adev/src/app/editor/terminal/terminal.component.ts` — 61 lines
  - class: `Terminal`



## `adev/src/app/features/docs/`

- `adev/src/app/features/docs/docs.component.spec.ts` — 50 lines _(spec)_
- `adev/src/app/features/docs/docs.component.ts` — 29 lines
  - has a default export



## `adev/src/app/features/home/`

- `adev/src/app/features/home/home.component.spec.ts` — 50 lines _(spec)_
- `adev/src/app/features/home/home.component.ts` — 74 lines
  - has a default export



## `adev/src/app/features/home/animation/`

- `adev/src/app/features/home/animation/animation-creator.service.ts` — 32 lines
  - class: `AnimationCreatorService`
- `adev/src/app/features/home/animation/animation-layer.directive.ts` — 22 lines
  - class: `AnimationLayerDirective`
- `adev/src/app/features/home/animation/animation.spec.ts` — 414 lines _(spec)_
- `adev/src/app/features/home/animation/animation.ts` — 508 lines
  - class: `Animation`
- `adev/src/app/features/home/animation/index.ts` — 13 lines
  - re-exports * from `./animation-creator.service`
  - re-exports * from `./animation-layer.directive`
  - re-exports * from `./animation`
  - exports `AnimationConfig`, `AnimationDefinition`, `Styles` from `./types`
- `adev/src/app/features/home/animation/types.ts` — 59 lines
  - type: `AnimationConfig`, `Styles`, `ParsedStyles`, `AnimationRule`, `AnimationDefinition`
  - interface: `DynamicAnimationRule`, `StaticAnimationRule`



## `adev/src/app/features/home/animation/calculations/`

- `adev/src/app/features/home/animation/calculations/calc-css-value.spec.ts` — 267 lines _(spec)_
- `adev/src/app/features/home/animation/calculations/calc-css-value.ts` — 123 lines
  - function: `calculateNextCssValue`
- `adev/src/app/features/home/animation/calculations/index.ts` — 10 lines
  - re-exports * from `./calc-css-value`



## `adev/src/app/features/home/animation/parser/`

- `adev/src/app/features/home/animation/parser/css-value-lexer.spec.ts` — 102 lines _(spec)_
- `adev/src/app/features/home/animation/parser/css-value-lexer.ts` — 126 lines
  - function: `cssValueLexer`
- `adev/src/app/features/home/animation/parser/css-value-parser.spec.ts` — 287 lines _(spec)_
- `adev/src/app/features/home/animation/parser/css-value-parser.ts` — 217 lines
  - function: `cssValueParser`
- `adev/src/app/features/home/animation/parser/index.ts` — 12 lines
  - re-exports * from `./types`
  - re-exports * from `./utils`
  - exports `cssValueParser` from `./css-value-parser`
- `adev/src/app/features/home/animation/parser/types.ts` — 32 lines
  - type: `NumericValue`, `StaticValue`, `ColorValue`, `TransformValue`, `CssPropertyValue`
- `adev/src/app/features/home/animation/parser/utils.spec.ts` — 129 lines _(spec)_
- `adev/src/app/features/home/animation/parser/utils.ts` — 49 lines
  - function: `stringifyParsedValue`, `copyParsedValue`



## `adev/src/app/features/home/animation/plugins/`

- `adev/src/app/features/home/animation/plugins/animation-player.component.ts` — 123 lines
  - type: `ComponentAlignment`
  - class: `AnimationPlayerComponent`
- `adev/src/app/features/home/animation/plugins/animation-player.ts` — 41 lines
  - class: `AnimationPlayer`
- `adev/src/app/features/home/animation/plugins/animation-scroll-handler.ts` — 89 lines
  - class: `AnimationScrollHandler`
- `adev/src/app/features/home/animation/plugins/types.ts` — 22 lines
  - interface: `AnimationPlugin`



## `adev/src/app/features/home/code-highlighting/`

- `adev/src/app/features/home/code-highlighting/code-highlighter.ts` — 43 lines
  - class: `CodeHighlighter`



## `adev/src/app/features/home/components/code-block/`

- `adev/src/app/features/home/components/code-block/code-block.ts` — 44 lines
  - class: `CodeBlock`



## `adev/src/app/features/home/components/control-flow/`

- `adev/src/app/features/home/components/control-flow/control-flow-example.ts` — 50 lines
  - class: `ControlFlowExample`



## `adev/src/app/features/home/components/deferrable-views-example/`

- `adev/src/app/features/home/components/deferrable-views-example/deferrable-views-example.ts` — 44 lines
  - class: `DeferrableViewsExample`, `DataVisualizationPage`



## `adev/src/app/features/home/components/home-animation/`

- `adev/src/app/features/home/components/home-animation/animation-definition.ts` — 438 lines
  - const: `ANIM_TIMESTEP`
  - function: `generateHomeAnimationDefinition`
- `adev/src/app/features/home/components/home-animation/home-animation.component.ts` — 171 lines
  - const: `METEOR_HW_RATIO`, `METEOR_GAP_RATIO`, `METEOR_WIDTH_MAP`, `METEOR_WIDTH_DEFAULT`
  - class: `HomeAnimationComponent`



## `adev/src/app/features/home/components/hydration-example/`

- `adev/src/app/features/home/components/hydration-example/hydration-example.ts` — 243 lines
  - class: `HydrationExample`



## `adev/src/app/features/home/components/signals-demo/`

- `adev/src/app/features/home/components/signals-demo/signals-demo.ts` — 69 lines
  - class: `SignalsDemo`



## `adev/src/app/features/not-found/`

- `adev/src/app/features/not-found/not-found.ts` — 37 lines
  - class: `NotFound`



## `adev/src/app/features/playground/`

- `adev/src/app/features/playground/playground.component.spec.ts` — 78 lines _(spec)_
- `adev/src/app/features/playground/playground.component.ts` — 118 lines
  - has a default export



## `adev/src/app/features/references/api-item-label/`

- `adev/src/app/features/references/api-item-label/api-item-label.component.spec.ts` — 39 lines _(spec)_
- `adev/src/app/features/references/api-item-label/api-item-label.component.ts` — 25 lines
  - has a default export



## `adev/src/app/features/references/api-items-section/`

- `adev/src/app/features/references/api-items-section/api-items-section.component.spec.ts` — 80 lines _(spec)_
- `adev/src/app/features/references/api-items-section/api-items-section.component.ts` — 24 lines
  - has a default export



## `adev/src/app/features/references/api-reference-details-page/`

- `adev/src/app/features/references/api-reference-details-page/api-reference-details-page.component.spec.ts` — 70 lines _(spec)_
- `adev/src/app/features/references/api-reference-details-page/api-reference-details-page.component.ts` — 88 lines
  - has a default export



## `adev/src/app/features/references/api-reference-list/`

- `adev/src/app/features/references/api-reference-list/api-reference-list.component.spec.ts` — 223 lines _(spec)_
- `adev/src/app/features/references/api-reference-list/api-reference-list.component.ts` — 204 lines
  - const: `ALL_TYPES_KEY`, `ALL_PACKAGES`, `STATUSES`, `DEFAULT_STATUS`
  - has a default export
- `adev/src/app/features/references/api-reference-list/api-reference-manager.service.ts` — 51 lines
  - class: `ApiReferenceManager`



## `adev/src/app/features/references/cli-reference-details-page/`

- `adev/src/app/features/references/cli-reference-details-page/cli-reference-details-page.component.spec.ts` — 71 lines _(spec)_
- `adev/src/app/features/references/cli-reference-details-page/cli-reference-details-page.component.ts` — 21 lines
  - has a default export



## `adev/src/app/features/references/constants/`

- `adev/src/app/features/references/constants/api-reference-prerender.constants.ts` — 11 lines
  - const: `API_SECTION_CLASS_NAME`, `MEMBER_ID_ATTRIBUTE`



## `adev/src/app/features/references/helpers/`

- `adev/src/app/features/references/helpers/manifest.helper.spec.ts` — 45 lines _(spec)_
- `adev/src/app/features/references/helpers/manifest.helper.ts` — 74 lines
  - function: `mapApiManifestToRoutes`, `getApiNavigationItems`, `getApiUrl`



## `adev/src/app/features/references/interfaces/`

- `adev/src/app/features/references/interfaces/api-item-type.ts` — 24 lines
  - enum: `ApiItemType`
- `adev/src/app/features/references/interfaces/api-item.ts` — 22 lines
  - interface: `ApiItem`
- `adev/src/app/features/references/interfaces/api-items-group.ts` — 16 lines
  - interface: `ApiItemsGroup`
- `adev/src/app/features/references/interfaces/api-manifest.ts` — 30 lines
  - interface: `ApiManifestEntry`, `ApiManifestPackage`
  - type: `ApiManifest`



## `adev/src/app/features/references/pipes/`

- `adev/src/app/features/references/pipes/api-label.pipe.spec.ts` — 29 lines _(spec)_
- `adev/src/app/features/references/pipes/api-label.pipe.ts` — 53 lines
  - class: `ApiLabel`
  - const: `shortLabelsMap`, `fullLabelsMap`



## `adev/src/app/features/references/services/`

- `adev/src/app/features/references/services/reference-scroll-handler.service.ts` — 75 lines
  - class: `ReferenceScrollHandler`



## `adev/src/app/features/tutorial/`

- `adev/src/app/features/tutorial/split-resizer-handler.service.ts` — 194 lines
  - class: `SplitResizerHandler`
- `adev/src/app/features/tutorial/tutorial-navigation-list.ts` — 50 lines
  - class: `TutorialNavigationList`
- `adev/src/app/features/tutorial/tutorial.component.spec.ts` — 193 lines _(spec)_
- `adev/src/app/features/tutorial/tutorial.component.ts` — 278 lines
  - has a default export
- `adev/src/app/features/tutorial/tutorials-route-reuse-strategy.ts` — 42 lines
  - const: `IS_TUTORIAL_PAGE_RULE`
  - class: `ReuseTutorialsRouteStrategy`



## `adev/src/app/features/update/`

- `adev/src/app/features/update/recommendations.ts` — 3243 lines
  - enum: `ApplicationComplexity`
  - interface: `Step`
  - const: `RECOMMENDATIONS`
- `adev/src/app/features/update/update.component.spec.ts` — 105 lines _(spec)_
- `adev/src/app/features/update/update.component.ts` — 328 lines
  - has a default export



## `adev/src/app/routing/`

- `adev/src/app/routing/redirections.spec.ts` — 32 lines _(spec)_
- `adev/src/app/routing/redirections.ts` — 167 lines
  - const: `REDIRECT_ROUTES`
- `adev/src/app/routing/router_providers.ts` — 149 lines
  - const: `routerProviders`
- `adev/src/app/routing/routes.ts` — 165 lines
  - const: `DOCS_ROUTES`, `REFERENCE_ROUTES`, `TUTORIALS_ROUTES`, `SUB_NAVIGATION_ROUTES`, `routes`
- `adev/src/app/routing/sub-navigation-data.ts` — 33 lines
  - const: `SUB_NAVIGATION_DATA`



## `adev/src/app/routing/navigation-entries/`

- `adev/src/app/routing/navigation-entries/index.ts` — 1824 lines
  - const: `DOCS_SUB_NAVIGATION_DATA`, `TUTORIALS_SUB_NAVIGATION_DATA`, `REFERENCE_SUB_NAVIGATION_DATA`, `FOOTER_NAVIGATION_DATA`, `ALL_ITEMS`



## `adev/src/content/examples/accessibility/e2e/src/`

- `adev/src/content/examples/accessibility/e2e/src/app.e2e-spec.ts` — 16 lines _(spec)_



## `adev/src/content/examples/accessibility/src/`

- `adev/src/content/examples/accessibility/src/main.ts` — 8 lines



## `adev/src/content/examples/accessibility/src/app/`

- `adev/src/content/examples/accessibility/src/app/app.component.ts` — 17 lines
  - class: `AppComponent`
- `adev/src/content/examples/accessibility/src/app/progress-bar.component.ts` — 30 lines
  - class: `ExampleProgressbarComponent`



## `adev/src/content/examples/angular-compiler-options/e2e/src/`

- `adev/src/content/examples/angular-compiler-options/e2e/src/app.e2e-spec.ts` — 23 lines _(spec)_



## `adev/src/content/examples/angular-compiler-options/src/`

- `adev/src/content/examples/angular-compiler-options/src/main.ts` — 8 lines



## `adev/src/content/examples/angular-compiler-options/src/app/`

- `adev/src/content/examples/angular-compiler-options/src/app/app.component.spec.ts` — 19 lines _(spec)_
- `adev/src/content/examples/angular-compiler-options/src/app/app.component.ts` — 11 lines
  - class: `AppComponent`



## `adev/src/content/examples/angular-linker-plugin/`

- `adev/src/content/examples/angular-linker-plugin/webpack.config.mjs` — 27 lines
  - has a default export



## `adev/src/content/examples/animations/e2e/src/`

- `adev/src/content/examples/animations/e2e/src/app.e2e-spec.ts` — 308 lines _(spec)_
- `adev/src/content/examples/animations/e2e/src/auto.po.ts` — 20 lines
  - function: `getPage`, `getComponent`, `getComponentContainer`, `getHeroesList`
- `adev/src/content/examples/animations/e2e/src/enter-leave.po.ts` — 20 lines
  - function: `getPage`, `getComponent`, `getComponentContainer`, `getHeroesList`
- `adev/src/content/examples/animations/e2e/src/filter-stagger.po.ts` — 21 lines
  - function: `getPage`, `getComponentContainer`, `getHeroesList`, `getInput`
- `adev/src/content/examples/animations/e2e/src/hero-groups.ts` — 20 lines
  - function: `getPage`, `getComponent`, `getComponentContainer`, `getHeroesList`
- `adev/src/content/examples/animations/e2e/src/open-close.po.ts` — 26 lines
  - function: `getPage`, `getComponent`, `getToggleButton`, `getLoggingCheckbox`, `getComponentContainer`
- `adev/src/content/examples/animations/e2e/src/querying.po.ts` — 17 lines
  - function: `getComponent`, `getToggleButton`, `getComponentSection`
- `adev/src/content/examples/animations/e2e/src/status-slider.po.ts` — 21 lines
  - function: `getPage`, `getComponent`, `getToggleButton`, `getComponentContainer`
- `adev/src/content/examples/animations/e2e/src/toggle.po.ts` — 26 lines
  - function: `getPage`, `getComponent`, `getToggleButton`, `getToggleAnimationsButton`, `getComponentContainer`
- `adev/src/content/examples/animations/e2e/src/util.ts` — 21 lines
  - function: `locate`, `sleepFor`, `getLinkById`



## `adev/src/content/examples/animations/src/`

- `adev/src/content/examples/animations/src/main.ts` — 6 lines



## `adev/src/content/examples/animations/src/app/`

- `adev/src/content/examples/animations/src/app/about.ts` — 9 lines
  - class: `About`
- `adev/src/content/examples/animations/src/app/animations.1.ts` — 41 lines
  - const: `transitionAnimation`, `sharedAnimation`, `triggerAnimation`
- `adev/src/content/examples/animations/src/app/animations.ts` — 72 lines
  - const: `transitionAnimation`, `slideInAnimation`
- `adev/src/content/examples/animations/src/app/app.config.ts` — 15 lines
  - const: `appConfig`
- `adev/src/content/examples/animations/src/app/app.module.1.ts` — 11 lines
  - class: `AppModule`
- `adev/src/content/examples/animations/src/app/app.routes.ts` — 74 lines
  - const: `routes`
- `adev/src/content/examples/animations/src/app/app.ts` — 52 lines
  - class: `AppComponent`
- `adev/src/content/examples/animations/src/app/hero-list-auto-page.ts` — 23 lines
  - class: `HeroListAutoCalcPage`
- `adev/src/content/examples/animations/src/app/hero-list-auto.ts` — 28 lines
  - class: `HeroListAuto`
- `adev/src/content/examples/animations/src/app/hero-list-enter-leave-page.ts` — 26 lines
  - class: `HeroListEnterLeavePage`
- `adev/src/content/examples/animations/src/app/hero-list-enter-leave.ts` — 40 lines
  - class: `HeroListEnterLeave`
- `adev/src/content/examples/animations/src/app/hero-list-group-page.ts` — 23 lines
  - class: `HeroListGroupPage`
- `adev/src/content/examples/animations/src/app/hero-list-groups.ts` — 80 lines
  - class: `HeroListGroups`
- `adev/src/content/examples/animations/src/app/hero-list-page.ts` — 82 lines
  - class: `HeroListPage`
- `adev/src/content/examples/animations/src/app/hero.ts` — 5 lines
  - interface: `Hero`
- `adev/src/content/examples/animations/src/app/home.ts` — 9 lines
  - class: `Home`
- `adev/src/content/examples/animations/src/app/insert-remove.ts` — 25 lines
  - class: `InsertRemove`
- `adev/src/content/examples/animations/src/app/mock-heroes.ts` — 15 lines
  - const: `HEROES`
- `adev/src/content/examples/animations/src/app/open-close-page.ts` — 24 lines
  - class: `OpenClosePage`
- `adev/src/content/examples/animations/src/app/open-close.1.ts` — 65 lines
  - class: `OpenCloseKeyframeComponent`
- `adev/src/content/examples/animations/src/app/open-close.2.ts` — 25 lines
  - class: `OpenCloseBooleanComponent`
- `adev/src/content/examples/animations/src/app/open-close.3.ts` — 41 lines
  - class: `OpenCloseBooleanComponent`
- `adev/src/content/examples/animations/src/app/open-close.4.ts` — 52 lines
  - class: `OpenCloseChild`
- `adev/src/content/examples/animations/src/app/open-close.ts` — 99 lines
  - class: `OpenClose`
- `adev/src/content/examples/animations/src/app/querying.ts` — 91 lines
  - class: `Querying`
- `adev/src/content/examples/animations/src/app/status-slider-page.ts` — 15 lines
  - class: `StatusSliderPage`
- `adev/src/content/examples/animations/src/app/status-slider.ts` — 62 lines
  - class: `StatusSlider`
- `adev/src/content/examples/animations/src/app/toggle-animations-page.ts` — 16 lines
  - class: `ToggleAnimationsPage`



## `adev/src/content/examples/animations/src/app/animations-package/`

- `adev/src/content/examples/animations/src/app/animations-package/auto-height.ts` — 23 lines
  - class: `AutoHeight`
- `adev/src/content/examples/animations/src/app/animations-package/increment-decrement.ts` — 28 lines
  - class: `IncrementDecrement`
- `adev/src/content/examples/animations/src/app/animations-package/insert-remove.ts` — 23 lines
  - class: `InsertRemove`
- `adev/src/content/examples/animations/src/app/animations-package/open-close.ts` — 48 lines
  - class: `OpenClose`
- `adev/src/content/examples/animations/src/app/animations-package/reorder.ts` — 38 lines
  - class: `Reorder`
- `adev/src/content/examples/animations/src/app/animations-package/stagger.ts` — 25 lines
  - class: `Stagger`



## `adev/src/content/examples/animations/src/app/enter-and-leave/`

- `adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.ts` — 18 lines
  - class: `EnterBinding`
- `adev/src/content/examples/animations/src/app/enter-and-leave/enter.ts` — 16 lines
  - class: `Enter`
- `adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.ts` — 18 lines
  - class: `LeaveBinding`
- `adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.ts` — 27 lines
  - class: `LeaveEvent`
- `adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.ts` — 16 lines
  - class: `LeaveParent`
- `adev/src/content/examples/animations/src/app/enter-and-leave/leave.ts` — 16 lines
  - class: `Leave`



## `adev/src/content/examples/animations/src/app/native-css/`

- `adev/src/content/examples/animations/src/app/native-css/auto-height.ts` — 15 lines
  - class: `AutoHeight`
- `adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts` — 36 lines
  - class: `IncrementDecrement`
- `adev/src/content/examples/animations/src/app/native-css/insert.ts` — 16 lines
  - class: `Insert`
- `adev/src/content/examples/animations/src/app/native-css/open-close.ts` — 15 lines
  - class: `OpenClose`
- `adev/src/content/examples/animations/src/app/native-css/remove.ts` — 16 lines
  - class: `Remove`
- `adev/src/content/examples/animations/src/app/native-css/reorder.ts` — 25 lines
  - class: `Reorder`
- `adev/src/content/examples/animations/src/app/native-css/stagger.ts` — 20 lines
  - class: `Stagger`



## `adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/`

- `adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/`

- `adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/`

- `adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/`

- `adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/`

- `adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/`

- `adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/`

- `adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/accordion/src/single-expansion/material/app/`

- `adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/`

- `adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/basic/app/`

- `adev/src/content/examples/aria/autocomplete/src/basic/app/app.ts` — 257 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/basic/material/app/`

- `adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.ts` — 257 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/basic/retro/app/`

- `adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.ts` — 257 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/highlight/app/`

- `adev/src/content/examples/aria/autocomplete/src/highlight/app/app.ts` — 256 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/highlight/material/app/`

- `adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.ts` — 256 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/`

- `adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.ts` — 256 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/manual/app/`

- `adev/src/content/examples/aria/autocomplete/src/manual/app/app.ts` — 246 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/manual/material/app/`

- `adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.ts` — 246 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/manual/retro/app/`

- `adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.ts` — 246 lines
  - class: `App`



## `adev/src/content/examples/aria/autocomplete/src/signal-forms/app/`

- `adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.ts` — 29 lines
  - class: `App`
- `adev/src/content/examples/aria/autocomplete/src/signal-forms/app/country-selector.ts` — 248 lines
  - class: `CountrySelector`
  - const: `ALL_COUNTRIES`



## `adev/src/content/examples/aria/combobox/src/datepicker/basic/app/`

- `adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.ts` — 389 lines
  - class: `App`



## `adev/src/content/examples/aria/combobox/src/datepicker/material/app/`

- `adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.ts` — 389 lines
  - class: `App`



## `adev/src/content/examples/aria/combobox/src/datepicker/retro/app/`

- `adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.ts` — 389 lines
  - class: `App`



## `adev/src/content/examples/aria/combobox/src/dialog/app/`

- `adev/src/content/examples/aria/combobox/src/dialog/app/app.ts` — 101 lines
  - class: `App`



## `adev/src/content/examples/aria/combobox/src/dialog/material/app/`

- `adev/src/content/examples/aria/combobox/src/dialog/material/app/app.ts` — 101 lines
  - class: `App`



## `adev/src/content/examples/aria/combobox/src/dialog/retro/app/`

- `adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.ts` — 101 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/calendar/basic/app/`

- `adev/src/content/examples/aria/grid/src/calendar/basic/app/app.ts` — 166 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/calendar/material/app/`

- `adev/src/content/examples/aria/grid/src/calendar/material/app/app.ts` — 166 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/calendar/retro/app/`

- `adev/src/content/examples/aria/grid/src/calendar/retro/app/app.ts` — 166 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/overview/basic/app/`

- `adev/src/content/examples/aria/grid/src/overview/basic/app/app.ts` — 67 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/pill-list/basic/app/`

- `adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/pill-list/material/app/`

- `adev/src/content/examples/aria/grid/src/pill-list/material/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/pill-list/retro/app/`

- `adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/table/basic/app/`

- `adev/src/content/examples/aria/grid/src/table/basic/app/app.ts` — 128 lines
  - class: `App`



## `adev/src/content/examples/aria/grid/src/table/retro/app/`

- `adev/src/content/examples/aria/grid/src/table/retro/app/app.ts` — 128 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/basic/app/`

- `adev/src/content/examples/aria/listbox/src/basic/app/app.ts` — 23 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/basic/material/app/`

- `adev/src/content/examples/aria/listbox/src/basic/material/app/app.ts` — 23 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/basic/retro/app/`

- `adev/src/content/examples/aria/listbox/src/basic/retro/app/app.ts` — 23 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/chips/horizontal/`

- `adev/src/content/examples/aria/listbox/src/chips/horizontal/app.ts` — 9 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/horizontal/app/`

- `adev/src/content/examples/aria/listbox/src/horizontal/app/app.ts` — 14 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/horizontal/material/app/`

- `adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.ts` — 14 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/horizontal/retro/app/`

- `adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.ts` — 14 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/modes/app/explicit/`

- `adev/src/content/examples/aria/listbox/src/modes/app/explicit/app.ts` — 13 lines
  - class: `App`



## `adev/src/content/examples/aria/listbox/src/modes/app/follow/`

- `adev/src/content/examples/aria/listbox/src/modes/app/follow/app.ts` — 13 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-context/app/`

- `adev/src/content/examples/aria/menu/src/menu-context/app/app.ts` — 46 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-standalone/app/`

- `adev/src/content/examples/aria/menu/src/menu-standalone/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-standalone/material/app/`

- `adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/`

- `adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/`

- `adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/`

- `adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/`

- `adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-trigger/app/`

- `adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-trigger/material/app/`

- `adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/`

- `adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts` — 15 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/basic/app/`

- `adev/src/content/examples/aria/menubar/src/basic/app/app.ts` — 31 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/basic/material/app/`

- `adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts` — 31 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/basic/retro/app/`

- `adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts` — 31 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/disabled/app/`

- `adev/src/content/examples/aria/menubar/src/disabled/app/app.ts` — 31 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/disabled/material/app/`

- `adev/src/content/examples/aria/menubar/src/disabled/material/app/app.ts` — 31 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/disabled/retro/app/`

- `adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.ts` — 31 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/rtl/app/`

- `adev/src/content/examples/aria/menubar/src/rtl/app/app.ts` — 32 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/rtl/material/app/`

- `adev/src/content/examples/aria/menubar/src/rtl/material/app/app.ts` — 32 lines
  - class: `App`



## `adev/src/content/examples/aria/menubar/src/rtl/retro/app/`

- `adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.ts` — 32 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/basic/app/`

- `adev/src/content/examples/aria/multiselect/src/basic/app/app.ts` — 53 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/basic/material/app/`

- `adev/src/content/examples/aria/multiselect/src/basic/material/app/app.ts` — 53 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/basic/retro/app/`

- `adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.ts` — 53 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/icons/app/`

- `adev/src/content/examples/aria/multiselect/src/icons/app/app.ts` — 60 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/icons/material/app/`

- `adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts` — 60 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/icons/retro/app/`

- `adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts` — 60 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/limited/app/`

- `adev/src/content/examples/aria/multiselect/src/limited/app/app.ts` — 61 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/limited/material/app/`

- `adev/src/content/examples/aria/multiselect/src/limited/material/app/app.ts` — 61 lines
  - class: `App`



## `adev/src/content/examples/aria/multiselect/src/limited/retro/app/`

- `adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.ts` — 61 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/basic/app/`

- `adev/src/content/examples/aria/select/src/basic/app/app.ts` — 40 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/basic/material/app/`

- `adev/src/content/examples/aria/select/src/basic/material/app/app.ts` — 40 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/basic/retro/app/`

- `adev/src/content/examples/aria/select/src/basic/retro/app/app.ts` — 40 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/disabled/app/`

- `adev/src/content/examples/aria/select/src/disabled/app/app.ts` — 40 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/disabled/material/app/`

- `adev/src/content/examples/aria/select/src/disabled/material/app/app.ts` — 40 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/disabled/retro/app/`

- `adev/src/content/examples/aria/select/src/disabled/retro/app/app.ts` — 40 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/icons/app/`

- `adev/src/content/examples/aria/select/src/icons/app/app.ts` — 47 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/icons/material/app/`

- `adev/src/content/examples/aria/select/src/icons/material/app/app.ts` — 47 lines
  - class: `App`



## `adev/src/content/examples/aria/select/src/icons/retro/app/`

- `adev/src/content/examples/aria/select/src/icons/retro/app/app.ts` — 47 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/disabled/app/`

- `adev/src/content/examples/aria/tabs/src/disabled/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/disabled/material/app/`

- `adev/src/content/examples/aria/tabs/src/disabled/material/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/disabled/retro/app/`

- `adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/explicit-selection/app/`

- `adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/`

- `adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/`

- `adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/`

- `adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/`

- `adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/`

- `adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/vertical/app/`

- `adev/src/content/examples/aria/tabs/src/vertical/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/vertical/material/app/`

- `adev/src/content/examples/aria/tabs/src/vertical/material/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tabs/src/vertical/retro/app/`

- `adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/basic/app/`

- `adev/src/content/examples/aria/toolbar/src/basic/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/basic/material/app/`

- `adev/src/content/examples/aria/toolbar/src/basic/material/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/basic/retro/app/`

- `adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/disabled/app/`

- `adev/src/content/examples/aria/toolbar/src/disabled/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/disabled/app/app/`

- `adev/src/content/examples/aria/toolbar/src/disabled/app/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/disabled/material/app/`

- `adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/disabled/retro/app/`

- `adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/rtl/app/`

- `adev/src/content/examples/aria/toolbar/src/rtl/app/app.ts` — 12 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/rtl/material/app/`

- `adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.ts` — 12 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/rtl/retro/app/`

- `adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.ts` — 12 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/vertical/app/`

- `adev/src/content/examples/aria/toolbar/src/vertical/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/vertical/material/app/`

- `adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/toolbar/src/vertical/retro/app/`

- `adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/`

- `adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.ts` — 80 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/`

- `adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.ts` — 63 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/multi-select/basic/app/`

- `adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.ts` — 78 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/multi-select/retro/app/`

- `adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.ts` — 62 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/nav/basic/app/`

- `adev/src/content/examples/aria/tree/src/nav/basic/app/app.ts` — 63 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/`

- `adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.ts` — 78 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/`

- `adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.ts` — 62 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/single-select/basic/app/`

- `adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts` — 78 lines
  - class: `App`



## `adev/src/content/examples/aria/tree/src/single-select/retro/app/`

- `adev/src/content/examples/aria/tree/src/single-select/retro/app/app.ts` — 62 lines
  - class: `App`



## `adev/src/content/examples/attribute-directives/e2e/src/`

- `adev/src/content/examples/attribute-directives/e2e/src/app.e2e-spec.ts` — 28 lines _(spec)_



## `adev/src/content/examples/attribute-directives/src/`

- `adev/src/content/examples/attribute-directives/src/main.ts` — 9 lines



## `adev/src/content/examples/attribute-directives/src/app/`

- `adev/src/content/examples/attribute-directives/src/app/app.component.1.ts` — 13 lines
  - class: `AppComponent`
- `adev/src/content/examples/attribute-directives/src/app/app.component.ts` — 14 lines
  - class: `AppComponent`
- `adev/src/content/examples/attribute-directives/src/app/highlight.directive.1.ts` — 14 lines
  - class: `HighlightDirective`
- `adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts` — 34 lines
  - class: `HighlightDirective`
- `adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts` — 33 lines
  - class: `HighlightDirective`
- `adev/src/content/examples/attribute-directives/src/app/highlight.directive.ts` — 33 lines
  - class: `HighlightDirective`



## `adev/src/content/examples/built-in-directives/e2e/src/`

- `adev/src/content/examples/built-in-directives/e2e/src/app.e2e-spec.ts` — 70 lines _(spec)_



## `adev/src/content/examples/built-in-directives/src/`

- `adev/src/content/examples/built-in-directives/src/main.ts` — 8 lines



## `adev/src/content/examples/built-in-directives/src/app/`

- `adev/src/content/examples/built-in-directives/src/app/app.component.ts` — 166 lines
  - class: `AppComponent`
- `adev/src/content/examples/built-in-directives/src/app/item-switch.component.ts` — 58 lines
  - class: `StoutItemComponent`, `BestItemComponent`, `DeviceItemComponent`, `LostItemComponent`, `UnknownItemComponent`
  - const: `ItemSwitchComponents`
- `adev/src/content/examples/built-in-directives/src/app/item.ts` — 26 lines
  - class: `Item`



## `adev/src/content/examples/built-in-directives/src/app/item-detail/`

- `adev/src/content/examples/built-in-directives/src/app/item-detail/item-detail.component.ts` — 13 lines
  - class: `ItemDetailComponent`



## `adev/src/content/examples/cli-builder/src/`

- `adev/src/content/examples/cli-builder/src/my-builder.spec.ts` — 48 lines _(spec)_
- `adev/src/content/examples/cli-builder/src/my-builder.ts` — 44 lines
  - has a default export



## `adev/src/content/examples/drag-drop/src/axis-lock/`

- `adev/src/content/examples/drag-drop/src/axis-lock/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/axis-lock/app/`

- `adev/src/content/examples/drag-drop/src/axis-lock/app/app.ts` — 14 lines
  - class: `CdkDragDropAxisLockExample`



## `adev/src/content/examples/drag-drop/src/boundary/`

- `adev/src/content/examples/drag-drop/src/boundary/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/boundary/app/`

- `adev/src/content/examples/drag-drop/src/boundary/app/app.ts` — 14 lines
  - class: `CdkDragDropBoundaryExample`



## `adev/src/content/examples/drag-drop/src/connected-sorting/`

- `adev/src/content/examples/drag-drop/src/connected-sorting/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/connected-sorting-group/`

- `adev/src/content/examples/drag-drop/src/connected-sorting-group/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/connected-sorting-group/app/`

- `adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.ts` — 38 lines
  - class: `CdkDragDropConnectedSortingGroupExample`



## `adev/src/content/examples/drag-drop/src/connected-sorting/app/`

- `adev/src/content/examples/drag-drop/src/connected-sorting/app/app.ts` — 37 lines
  - class: `CdkDragDropConnectedSortingExample`



## `adev/src/content/examples/drag-drop/src/copy-list/`

- `adev/src/content/examples/drag-drop/src/copy-list/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/copy-list/app/`

- `adev/src/content/examples/drag-drop/src/copy-list/app/app.ts` — 36 lines
  - class: `CdkDragDropCopyListExample`



## `adev/src/content/examples/drag-drop/src/custom-handle/`

- `adev/src/content/examples/drag-drop/src/custom-handle/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/custom-handle/app/`

- `adev/src/content/examples/drag-drop/src/custom-handle/app/app.ts` — 14 lines
  - class: `CdkDragDropHandleExample`



## `adev/src/content/examples/drag-drop/src/custom-placeholder/`

- `adev/src/content/examples/drag-drop/src/custom-placeholder/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/custom-placeholder/app/`

- `adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.ts` — 36 lines
  - class: `CdkDragDropCustomPlaceholderExample`



## `adev/src/content/examples/drag-drop/src/custom-preview/`

- `adev/src/content/examples/drag-drop/src/custom-preview/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/custom-preview/app/`

- `adev/src/content/examples/drag-drop/src/custom-preview/app/app.ts` — 70 lines
  - class: `CdkDragDropCustomPreviewExample`



## `adev/src/content/examples/drag-drop/src/delay-drag/`

- `adev/src/content/examples/drag-drop/src/delay-drag/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/delay-drag/app/`

- `adev/src/content/examples/drag-drop/src/delay-drag/app/app.ts` — 14 lines
  - class: `CdkDragDropDelayExample`



## `adev/src/content/examples/drag-drop/src/disable-drag/`

- `adev/src/content/examples/drag-drop/src/disable-drag/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/disable-drag/app/`

- `adev/src/content/examples/drag-drop/src/disable-drag/app/app.ts` — 24 lines
  - class: `CdkDragDropDisabledExample`



## `adev/src/content/examples/drag-drop/src/disable-sorting/`

- `adev/src/content/examples/drag-drop/src/disable-sorting/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/disable-sorting/app/`

- `adev/src/content/examples/drag-drop/src/disable-sorting/app/app.ts` — 38 lines
  - class: `CdkDragDropDisabledSortingExample`



## `adev/src/content/examples/drag-drop/src/enter-predicate/`

- `adev/src/content/examples/drag-drop/src/enter-predicate/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/enter-predicate/app/`

- `adev/src/content/examples/drag-drop/src/enter-predicate/app/app.ts` — 46 lines
  - class: `CdkDragDropEnterPredicateExample`



## `adev/src/content/examples/drag-drop/src/free-drag-position/`

- `adev/src/content/examples/drag-drop/src/free-drag-position/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/free-drag-position/app/`

- `adev/src/content/examples/drag-drop/src/free-drag-position/app/app.ts` — 20 lines
  - class: `CdkDragDropFreeDragPositionExample`



## `adev/src/content/examples/drag-drop/src/horizontal-sorting/`

- `adev/src/content/examples/drag-drop/src/horizontal-sorting/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/horizontal-sorting/app/`

- `adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.ts` — 26 lines
  - class: `CdkDragDropHorizontalSortingExample`



## `adev/src/content/examples/drag-drop/src/mixed-sorting/`

- `adev/src/content/examples/drag-drop/src/mixed-sorting/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/mixed-sorting/app/`

- `adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.ts` — 20 lines
  - class: `CdkDragDropMixedSortingExample`



## `adev/src/content/examples/drag-drop/src/overview/`

- `adev/src/content/examples/drag-drop/src/overview/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/overview/app/`

- `adev/src/content/examples/drag-drop/src/overview/app/app.ts` — 14 lines
  - class: `CdkDragDropOverviewExample`



## `adev/src/content/examples/drag-drop/src/root-element/`

- `adev/src/content/examples/drag-drop/src/root-element/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/root-element/app/`

- `adev/src/content/examples/drag-drop/src/root-element/app/app.ts` — 47 lines
  - class: `CdkDragDropRootElementExample`



## `adev/src/content/examples/drag-drop/src/sort-predicate/`

- `adev/src/content/examples/drag-drop/src/sort-predicate/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/sort-predicate/app/`

- `adev/src/content/examples/drag-drop/src/sort-predicate/app/app.ts` — 28 lines
  - class: `CdkDragDropSortPredicateExample`



## `adev/src/content/examples/drag-drop/src/sorting/`

- `adev/src/content/examples/drag-drop/src/sorting/main.ts` — 6 lines



## `adev/src/content/examples/drag-drop/src/sorting/app/`

- `adev/src/content/examples/drag-drop/src/sorting/app/app.ts` — 30 lines
  - class: `CdkDragDropSortingExample`



## `adev/src/content/examples/dynamic-form/e2e/src/`

- `adev/src/content/examples/dynamic-form/e2e/src/app.e2e-spec.ts` — 22 lines _(spec)_



## `adev/src/content/examples/dynamic-form/src/`

- `adev/src/content/examples/dynamic-form/src/main.ts` — 9 lines



## `adev/src/content/examples/dynamic-form/src/app/`

- `adev/src/content/examples/dynamic-form/src/app/app.component.ts` — 25 lines
  - class: `AppComponent`
- `adev/src/content/examples/dynamic-form/src/app/dynamic-form-question.component.ts` — 20 lines
  - class: `DynamicFormQuestionComponent`
- `adev/src/content/examples/dynamic-form/src/app/dynamic-form.component.ts` — 29 lines
  - class: `DynamicFormComponent`
- `adev/src/content/examples/dynamic-form/src/app/question-base.ts` — 34 lines
  - class: `QuestionBase`
- `adev/src/content/examples/dynamic-form/src/app/question-control.service.ts` — 20 lines
  - class: `QuestionControlService`
- `adev/src/content/examples/dynamic-form/src/app/question-dropdown.ts` — 7 lines
  - class: `DropdownQuestion`
- `adev/src/content/examples/dynamic-form/src/app/question-textbox.ts` — 7 lines
  - class: `TextboxQuestion`
- `adev/src/content/examples/dynamic-form/src/app/question.service.ts` — 45 lines
  - class: `QuestionService`



## `adev/src/content/examples/elements/e2e/src/`

- `adev/src/content/examples/elements/e2e/src/app.e2e-spec.ts` — 82 lines _(spec)_



## `adev/src/content/examples/elements/src/`

- `adev/src/content/examples/elements/src/main.ts` — 8 lines



## `adev/src/content/examples/elements/src/app/`

- `adev/src/content/examples/elements/src/app/app.ts` — 27 lines
  - class: `App`
- `adev/src/content/examples/elements/src/app/popup.service.ts` — 60 lines
  - class: `PopupService`
- `adev/src/content/examples/elements/src/app/popup.ts` — 50 lines
  - class: `Popup`



## `adev/src/content/examples/form-validation/e2e/src/`

- `adev/src/content/examples/form-validation/e2e/src/app.e2e-spec.ts` — 247 lines _(spec)_



## `adev/src/content/examples/form-validation/src/`

- `adev/src/content/examples/form-validation/src/main.ts` — 9 lines



## `adev/src/content/examples/form-validation/src/app/`

- `adev/src/content/examples/form-validation/src/app/app.component.ts` — 22 lines
  - class: `AppComponent`



## `adev/src/content/examples/form-validation/src/app/reactive/`

- `adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.1.ts` — 41 lines
  - class: `HeroFormReactiveComponent`
- `adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.2.ts` — 57 lines
  - class: `HeroFormReactiveComponent`
- `adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.ts` — 49 lines
  - class: `ActorFormReactiveComponent`



## `adev/src/content/examples/form-validation/src/app/shared/`

- `adev/src/content/examples/form-validation/src/app/shared/actors.service.ts` — 15 lines
  - class: `ActorsService`
- `adev/src/content/examples/form-validation/src/app/shared/forbidden-name.directive.ts` — 43 lines
  - function: `forbiddenNameValidator`
  - class: `ForbiddenValidatorDirective`
- `adev/src/content/examples/form-validation/src/app/shared/role.directive.ts` — 45 lines
  - class: `UniqueRoleValidator`, `UniqueRoleValidatorDirective`
- `adev/src/content/examples/form-validation/src/app/shared/unambiguous-role.directive.ts` — 40 lines
  - const: `unambiguousRoleValidator`
  - class: `UnambiguousRoleValidatorDirective`
- `adev/src/content/examples/form-validation/src/app/shared/unambiguous-role.ts` — 40 lines
  - const: `unambiguousRoleValidator`
  - class: `UnambiguousRoleValidatorDirective`



## `adev/src/content/examples/form-validation/src/app/template/`

- `adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.ts` — 23 lines
  - class: `ActorFormTemplateComponent`



## `adev/src/content/examples/forms-overview/e2e/src/`

- `adev/src/content/examples/forms-overview/e2e/src/app.e2e-spec.ts` — 15 lines _(spec)_



## `adev/src/content/examples/forms-overview/src/`

- `adev/src/content/examples/forms-overview/src/main.ts` — 8 lines



## `adev/src/content/examples/forms-overview/src/app/`

- `adev/src/content/examples/forms-overview/src/app/app.component.spec.ts` — 29 lines _(spec)_
- `adev/src/content/examples/forms-overview/src/app/app.component.ts` — 14 lines
  - class: `AppComponent`



## `adev/src/content/examples/forms-overview/src/app/reactive/favorite-color/`

- `adev/src/content/examples/forms-overview/src/app/reactive/favorite-color/favorite-color.component.spec.ts` — 42 lines _(spec)_
- `adev/src/content/examples/forms-overview/src/app/reactive/favorite-color/favorite-color.component.ts` — 12 lines
  - class: `FavoriteColorReactive`



## `adev/src/content/examples/forms-overview/src/app/shared/`

- `adev/src/content/examples/forms-overview/src/app/shared/utils.ts` — 6 lines
  - function: `createNewEvent`



## `adev/src/content/examples/forms-overview/src/app/template/favorite-color/`

- `adev/src/content/examples/forms-overview/src/app/template/favorite-color/favorite-color.component.spec.ts` — 45 lines _(spec)_
- `adev/src/content/examples/forms-overview/src/app/template/favorite-color/favorite-color.component.ts` — 12 lines
  - class: `FavoriteColorTemplate`



## `adev/src/content/examples/forms/e2e/src/`

- `adev/src/content/examples/forms/e2e/src/app.e2e-spec.ts` — 57 lines _(spec)_



## `adev/src/content/examples/forms/src/`

- `adev/src/content/examples/forms/src/main.ts` — 8 lines



## `adev/src/content/examples/forms/src/app/`

- `adev/src/content/examples/forms/src/app/actor.ts` — 10 lines
  - class: `Actor`
- `adev/src/content/examples/forms/src/app/app.component.ts` — 10 lines
  - class: `AppComponent`



## `adev/src/content/examples/forms/src/app/actor-form/`

- `adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts` — 58 lines
  - class: `ActorFormComponent`



## `adev/src/content/examples/hello-world/src/`

- `adev/src/content/examples/hello-world/src/main.ts` — 5 lines



## `adev/src/content/examples/hello-world/src/app/`

- `adev/src/content/examples/hello-world/src/app/app.component-old.ts` — 11 lines
  - class: `HelloWorldComponent`
- `adev/src/content/examples/hello-world/src/app/app.component.ts` — 11 lines
  - class: `HelloWorldComponent`
- `adev/src/content/examples/hello-world/src/app/tailwind-app.component.ts` — 10 lines
  - class: `HelloWorldComponent`



## `adev/src/content/examples/i18n/doc-files/`

- `adev/src/content/examples/i18n/doc-files/app.locale_data.ts` — 6 lines
- `adev/src/content/examples/i18n/doc-files/app.locale_data_extra.ts` — 6 lines
- `adev/src/content/examples/i18n/doc-files/app.module.ts` — 15 lines
  - class: `AppModule`
- `adev/src/content/examples/i18n/doc-files/locale_plural_function.ts` — 9 lines
- `adev/src/content/examples/i18n/doc-files/main.1.ts` — 5 lines



## `adev/src/content/examples/i18n/e2e/src/`

- `adev/src/content/examples/i18n/e2e/src/app.e2e-spec.ts` — 42 lines _(spec)_



## `adev/src/content/examples/i18n/src/`

- `adev/src/content/examples/i18n/src/main.ts` — 14 lines



## `adev/src/content/examples/i18n/src/app/`

- `adev/src/content/examples/i18n/src/app/app.component.ts` — 37 lines
  - class: `AppComponent`



## `adev/src/content/examples/reactive-forms/e2e/src/`

- `adev/src/content/examples/reactive-forms/e2e/src/app.e2e-spec.ts` — 139 lines _(spec)_



## `adev/src/content/examples/reactive-forms/src/`

- `adev/src/content/examples/reactive-forms/src/main.ts` — 8 lines



## `adev/src/content/examples/reactive-forms/src/app/`

- `adev/src/content/examples/reactive-forms/src/app/app.component.ts` — 23 lines
  - type: `EditorType`
  - class: `AppComponent`



## `adev/src/content/examples/reactive-forms/src/app/name-editor/`

- `adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.ts` — 27 lines
  - class: `NameEditorComponent`



## `adev/src/content/examples/reactive-forms/src/app/profile-editor/`

- `adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts` — 42 lines
  - class: `ProfileEditorComponent`
- `adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts` — 53 lines
  - class: `ProfileEditorComponent`
- `adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts` — 60 lines
  - class: `ProfileEditorComponent`



## `adev/src/content/examples/routing-with-urlmatcher/e2e/src/`

- `adev/src/content/examples/routing-with-urlmatcher/e2e/src/app.e2e-spec.ts` — 10 lines _(spec)_



## `adev/src/content/examples/routing-with-urlmatcher/src/`

- `adev/src/content/examples/routing-with-urlmatcher/src/main.ts` — 8 lines



## `adev/src/content/examples/routing-with-urlmatcher/src/app/`

- `adev/src/content/examples/routing-with-urlmatcher/src/app/app.config.ts` — 13 lines
  - const: `appConfig`
- `adev/src/content/examples/routing-with-urlmatcher/src/app/app.routes.ts` — 19 lines
  - const: `routes`
- `adev/src/content/examples/routing-with-urlmatcher/src/app/app.ts` — 13 lines
  - class: `App`



## `adev/src/content/examples/routing-with-urlmatcher/src/app/profile/`

- `adev/src/content/examples/routing-with-urlmatcher/src/app/profile/profile.ts` — 11 lines
  - class: `Profile`



## `adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/`

- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.1.ts` — 10 lines
  - function: `myService`
- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts` — 81 lines
  - function: `myService`
- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/schema.ts` — 11 lines
  - interface: `Schema`



## `adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/ng-add/`

- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/ng-add/index.ts` — 12 lines
  - function: `ngAdd`
- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/ng-add/schema.ts` — 5 lines
  - interface: `Schema`



## `adev/src/content/examples/schematics-for-libraries/projects/my-lib/src/`

- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/src/public_api.ts` — 8 lines
  - re-exports * from `./lib/my-lib.service`
  - re-exports * from `./lib/my-lib.component`
  - re-exports * from `./lib/my-lib.module`



## `adev/src/content/examples/schematics-for-libraries/projects/my-lib/src/lib/`

- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/src/lib/my-lib.component.spec.ts` — 23 lines _(spec)_
- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/src/lib/my-lib.component.ts` — 10 lines
  - class: `MyLibComponent`
- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/src/lib/my-lib.module.ts` — 10 lines
  - class: `MyLibModule`
- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/src/lib/my-lib.service.spec.ts` — 11 lines _(spec)_
- `adev/src/content/examples/schematics-for-libraries/projects/my-lib/src/lib/my-lib.service.ts` — 7 lines
  - class: `MyLibService`



## `adev/src/content/examples/schematics-for-libraries/src/`

- `adev/src/content/examples/schematics-for-libraries/src/main.ts` — 8 lines



## `adev/src/content/examples/schematics-for-libraries/src/app/`

- `adev/src/content/examples/schematics-for-libraries/src/app/app.component.ts` — 12 lines
  - class: `AppComponent`
- `adev/src/content/examples/schematics-for-libraries/src/app/app.module.ts` — 13 lines
  - class: `AppModule`



## `adev/src/content/examples/security/e2e/src/`

- `adev/src/content/examples/security/e2e/src/app.e2e-spec.ts` — 37 lines _(spec)_



## `adev/src/content/examples/security/src/`

- `adev/src/content/examples/security/src/main.ts` — 8 lines



## `adev/src/content/examples/security/src/app/`

- `adev/src/content/examples/security/src/app/app.component.ts` — 16 lines
  - class: `AppComponent`
- `adev/src/content/examples/security/src/app/bypass-security.component.ts` — 39 lines
  - class: `BypassSecurityComponent`
- `adev/src/content/examples/security/src/app/inner-html-binding.component.ts` — 13 lines
  - class: `InnerHtmlBindingComponent`



## `adev/src/content/examples/service-worker-getting-started/e2e/src/`

- `adev/src/content/examples/service-worker-getting-started/e2e/src/app.e2e-spec.ts` — 44 lines _(spec)_



## `adev/src/content/examples/service-worker-getting-started/src/`

- `adev/src/content/examples/service-worker-getting-started/src/main.ts` — 10 lines



## `adev/src/content/examples/service-worker-getting-started/src/app/`

- `adev/src/content/examples/service-worker-getting-started/src/app/app.component.ts` — 21 lines
  - class: `AppComponent`
- `adev/src/content/examples/service-worker-getting-started/src/app/check-for-update.service.ts` — 28 lines
  - class: `CheckForUpdateService`
- `adev/src/content/examples/service-worker-getting-started/src/app/handle-unrecoverable-state.service.ts` — 21 lines
  - class: `HandleUnrecoverableStateService`
- `adev/src/content/examples/service-worker-getting-started/src/app/log-update.service.ts` — 29 lines
  - class: `LogUpdateService`
- `adev/src/content/examples/service-worker-getting-started/src/app/prompt-update.service.ts` — 41 lines
  - class: `PromptUpdateService`



## `adev/src/content/examples/signal-forms/src/comparison/app/`

- `adev/src/content/examples/signal-forms/src/comparison/app/reactive-forms.ts` — 60 lines
  - class: `LoginComponent`
- `adev/src/content/examples/signal-forms/src/comparison/app/signal-forms.ts` — 58 lines
  - class: `LoginComponent`
- `adev/src/content/examples/signal-forms/src/comparison/app/template-driven-forms.ts` — 73 lines
  - class: `LoginComponent`



## `adev/src/content/examples/signal-forms/src/compat-form-control-integration/app/`

- `adev/src/content/examples/signal-forms/src/compat-form-control-integration/app/app.ts` — 50 lines
  - class: `App`



## `adev/src/content/examples/signal-forms/src/compat-form-group-integration/app/`

- `adev/src/content/examples/signal-forms/src/compat-form-group-integration/app/app.ts` — 41 lines
  - class: `App`



## `adev/src/content/examples/signal-forms/src/login-simple/app/`

- `adev/src/content/examples/signal-forms/src/login-simple/app/app.ts` — 33 lines
  - class: `App`



## `adev/src/content/examples/signal-forms/src/login-validation-complete/app/`

- `adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.ts` — 48 lines
  - class: `App`



## `adev/src/content/examples/signal-forms/src/login-validation/app/`

- `adev/src/content/examples/signal-forms/src/login-validation/app/app.ts` — 36 lines
  - class: `App`



## `adev/src/content/examples/structural-directives/e2e/src/`

- `adev/src/content/examples/structural-directives/e2e/src/app.e2e-spec.ts` — 49 lines _(spec)_



## `adev/src/content/examples/structural-directives/src/`

- `adev/src/content/examples/structural-directives/src/main.ts` — 8 lines



## `adev/src/content/examples/structural-directives/src/app/`

- `adev/src/content/examples/structural-directives/src/app/app.component.ts` — 31 lines
  - class: `AppComponent`
- `adev/src/content/examples/structural-directives/src/app/hero-switch.components.ts` — 48 lines
  - class: `HappyHeroComponent`, `SadHeroComponent`, `ConfusedHeroComponent`, `UnknownHeroComponent`
  - const: `heroSwitchComponents`
- `adev/src/content/examples/structural-directives/src/app/hero.component.ts` — 24 lines
  - class: `HeroComponent`
- `adev/src/content/examples/structural-directives/src/app/hero.ts` — 14 lines
  - interface: `Hero`
  - const: `heroes`
- `adev/src/content/examples/structural-directives/src/app/if-loaded.directive.ts` — 35 lines
  - class: `IfLoadedDirective`
- `adev/src/content/examples/structural-directives/src/app/loading-state.ts` — 6 lines
  - type: `Loaded`, `Loading`, `LoadingState`
- `adev/src/content/examples/structural-directives/src/app/trigonometry.directive.ts` — 48 lines
  - class: `TrigonometryDirective`



## `adev/src/content/examples/v21-game-world/e2e/src/`

- `adev/src/content/examples/v21-game-world/e2e/src/app.e2e-spec.ts` — 173 lines _(spec)_



## `adev/src/content/examples/v21-game-world/src/`

- `adev/src/content/examples/v21-game-world/src/main.ts` — 10 lines



## `adev/src/content/examples/v21-game-world/src/app/`

- `adev/src/content/examples/v21-game-world/src/app/app.ts` — 727 lines
  - class: `App`



## `adev/src/content/tutorials/deferrable-views/intro/src/app/`

- `adev/src/content/tutorials/deferrable-views/intro/src/app/app.ts` — 8 lines
  - class: `App`



## `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/answer/src/`

- `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/answer/src/main.ts` — 6 lines



## `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/answer/src/app/`

- `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/answer/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/answer/src/app/app.ts` — 25 lines
  - class: `App`
- `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/answer/src/app/article-comments.ts` — 23 lines
  - class: `ArticleComments`



## `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/src/`

- `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/src/main.ts` — 6 lines



## `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/src/app/`

- `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/src/app/app.ts` — 23 lines
  - class: `App`
- `adev/src/content/tutorials/deferrable-views/steps/1-what-are-deferrable-views/src/app/article-comments.ts` — 23 lines
  - class: `ArticleComments`



## `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/answer/src/`

- `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/answer/src/main.ts` — 6 lines



## `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/answer/src/app/`

- `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/answer/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/answer/src/app/app.ts` — 31 lines
  - class: `App`
- `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/answer/src/app/article-comments.ts` — 23 lines
  - class: `ArticleComments`



## `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/src/`

- `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/src/main.ts` — 6 lines



## `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/src/app/`

- `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/src/app/app.ts` — 25 lines
  - class: `App`
- `adev/src/content/tutorials/deferrable-views/steps/2-loading-error-placeholder/src/app/article-comments.ts` — 23 lines
  - class: `ArticleComments`



## `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/answer/src/`

- `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/answer/src/main.ts` — 6 lines



## `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/answer/src/app/`

- `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/answer/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/answer/src/app/app.ts` — 33 lines
  - class: `App`
- `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/answer/src/app/article-comments.ts` — 23 lines
  - class: `ArticleComments`



## `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/src/`

- `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/src/main.ts` — 6 lines



## `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/src/app/`

- `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/src/app/app.ts` — 31 lines
  - class: `App`
- `adev/src/content/tutorials/deferrable-views/steps/3-defer-triggers/src/app/article-comments.ts` — 23 lines
  - class: `ArticleComments`



## `adev/src/content/tutorials/first-app/intro/src/app/`

- `adev/src/content/tutorials/first-app/intro/src/app/app.ts` — 8 lines
  - class: `App`



## `adev/src/content/tutorials/first-app/steps/01-hello-world/src/`

- `adev/src/content/tutorials/first-app/steps/01-hello-world/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/01-hello-world/src/app/`

- `adev/src/content/tutorials/first-app/steps/01-hello-world/src/app/app.ts` — 12 lines
  - class: `App`



## `adev/src/content/tutorials/first-app/steps/02-Home/src/`

- `adev/src/content/tutorials/first-app/steps/02-Home/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/02-Home/src/app/`

- `adev/src/content/tutorials/first-app/steps/02-Home/src/app/app.ts` — 12 lines
  - class: `App`



## `adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/`

- `adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/`

- `adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/app.ts` — 22 lines
  - class: `App`



## `adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/home/home.ts` — 16 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/04-interfaces/src/`

- `adev/src/content/tutorials/first-app/steps/04-interfaces/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/`

- `adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/app.ts` — 22 lines
  - class: `App`



## `adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/home/home.ts` — 21 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/housing-location/housing-location.ts` — 9 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/05-inputs/src/`

- `adev/src/content/tutorials/first-app/steps/05-inputs/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/05-inputs/src/app/`

- `adev/src/content/tutorials/first-app/steps/05-inputs/src/app/app.ts` — 22 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/05-inputs/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`



## `adev/src/content/tutorials/first-app/steps/05-inputs/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/05-inputs/src/app/home/home.ts` — 35 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/05-inputs/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/05-inputs/src/app/housing-location/housing-location.ts` — 9 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/06-property-binding/src/`

- `adev/src/content/tutorials/first-app/steps/06-property-binding/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/`

- `adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/app.ts` — 22 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`



## `adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/home/home.ts` — 35 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/housing-location/housing-location.ts` — 12 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/`

- `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/`

- `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/app.ts` — 22 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`



## `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/home/home.ts` — 35 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/housing-location/housing-location.ts` — 12 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/08-ngFor/src/`

- `adev/src/content/tutorials/first-app/steps/08-ngFor/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/`

- `adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/app.ts` — 22 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`



## `adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/home/home.ts` — 35 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/housing-location/housing-location.ts` — 23 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/09-services/src/`

- `adev/src/content/tutorials/first-app/steps/09-services/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/09-services/src/app/`

- `adev/src/content/tutorials/first-app/steps/09-services/src/app/app.ts` — 22 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/09-services/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`



## `adev/src/content/tutorials/first-app/steps/09-services/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/09-services/src/app/home/home.ts` — 129 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/09-services/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/09-services/src/app/housing-location/housing-location.ts` — 24 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/10-routing/src/`

- `adev/src/content/tutorials/first-app/steps/10-routing/src/main.ts` — 11 lines



## `adev/src/content/tutorials/first-app/steps/10-routing/src/app/`

- `adev/src/content/tutorials/first-app/steps/10-routing/src/app/app.ts` — 22 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/10-routing/src/app/housing.service.ts` — 118 lines
  - class: `HousingService`
- `adev/src/content/tutorials/first-app/steps/10-routing/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`



## `adev/src/content/tutorials/first-app/steps/10-routing/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/10-routing/src/app/home/home.ts` — 31 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/10-routing/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/10-routing/src/app/housing-location/housing-location.ts` — 24 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/11-details-page/src/`

- `adev/src/content/tutorials/first-app/steps/11-details-page/src/main.ts` — 13 lines



## `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/`

- `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/app.ts` — 24 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/housing.service.ts` — 119 lines
  - class: `HousingService`
- `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`
- `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/routes.ts` — 19 lines
  - has a default export



## `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/details/`

- `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/details/details.ts` — 9 lines
  - class: `Details`



## `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/home/home.ts` — 32 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/11-details-page/src/app/housing-location/housing-location.ts` — 25 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/12-forms/src/`

- `adev/src/content/tutorials/first-app/steps/12-forms/src/main.ts` — 13 lines



## `adev/src/content/tutorials/first-app/steps/12-forms/src/app/`

- `adev/src/content/tutorials/first-app/steps/12-forms/src/app/app.ts` — 25 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/12-forms/src/app/housing.service.ts` — 119 lines
  - class: `HousingService`
- `adev/src/content/tutorials/first-app/steps/12-forms/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`
- `adev/src/content/tutorials/first-app/steps/12-forms/src/app/routes.ts` — 19 lines
  - has a default export



## `adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/`

- `adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts` — 42 lines
  - class: `Details`



## `adev/src/content/tutorials/first-app/steps/12-forms/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/12-forms/src/app/home/home.ts` — 32 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/12-forms/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/12-forms/src/app/housing-location/housing-location.ts` — 26 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/13-search/src/`

- `adev/src/content/tutorials/first-app/steps/13-search/src/main.ts` — 13 lines



## `adev/src/content/tutorials/first-app/steps/13-search/src/app/`

- `adev/src/content/tutorials/first-app/steps/13-search/src/app/app.ts` — 25 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/13-search/src/app/housing.service.ts` — 124 lines
  - class: `HousingService`
- `adev/src/content/tutorials/first-app/steps/13-search/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`
- `adev/src/content/tutorials/first-app/steps/13-search/src/app/routes.ts` — 19 lines
  - has a default export



## `adev/src/content/tutorials/first-app/steps/13-search/src/app/details/`

- `adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts` — 70 lines
  - class: `Details`



## `adev/src/content/tutorials/first-app/steps/13-search/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/13-search/src/app/home/home.ts` — 32 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/13-search/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/13-search/src/app/housing-location/housing-location.ts` — 26 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/14-http/src/`

- `adev/src/content/tutorials/first-app/steps/14-http/src/main.ts` — 13 lines



## `adev/src/content/tutorials/first-app/steps/14-http/src-final/`

- `adev/src/content/tutorials/first-app/steps/14-http/src-final/main.ts` — 13 lines



## `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/`

- `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/app.ts` — 25 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts` — 24 lines
  - class: `HousingService`
- `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`
- `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/routes.ts` — 19 lines
  - has a default export



## `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/details/`

- `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/details/details.ts` — 76 lines
  - class: `Details`



## `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/home/`

- `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/home/home.ts` — 51 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing-location/housing-location.ts` — 26 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/first-app/steps/14-http/src/app/`

- `adev/src/content/tutorials/first-app/steps/14-http/src/app/app.ts` — 25 lines
  - class: `App`
- `adev/src/content/tutorials/first-app/steps/14-http/src/app/housing.service.ts` — 125 lines
  - class: `HousingService`
- `adev/src/content/tutorials/first-app/steps/14-http/src/app/housinglocation.ts` — 11 lines
  - interface: `HousingLocationInfo`
- `adev/src/content/tutorials/first-app/steps/14-http/src/app/routes.ts` — 19 lines
  - has a default export



## `adev/src/content/tutorials/first-app/steps/14-http/src/app/details/`

- `adev/src/content/tutorials/first-app/steps/14-http/src/app/details/details.ts` — 73 lines
  - class: `Details`



## `adev/src/content/tutorials/first-app/steps/14-http/src/app/home/`

- `adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts` — 46 lines
  - class: `Home`



## `adev/src/content/tutorials/first-app/steps/14-http/src/app/housing-location/`

- `adev/src/content/tutorials/first-app/steps/14-http/src/app/housing-location/housing-location.ts` — 26 lines
  - class: `HousingLocation`



## `adev/src/content/tutorials/homepage/src/`

- `adev/src/content/tutorials/homepage/src/main.ts` — 20 lines
  - class: `Demo`



## `adev/src/content/tutorials/learn-angular/intro/src/app/`

- `adev/src/content/tutorials/learn-angular/intro/src/app/app.ts` — 8 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/1-components-in-angular/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/1-components-in-angular/answer/src/app/app.ts` — 13 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/1-components-in-angular/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/1-components-in-angular/src/app/app.ts` — 13 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/answer/src/`

- `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/answer/src/main.ts` — 6 lines



## `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/answer/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/answer/src/app/app.ts` — 68 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/answer/src/app/comments.ts` — 14 lines
  - class: `Comments`



## `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/src/`

- `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/src/main.ts` — 6 lines



## `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/src/app/app.ts` — 16 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/10-deferrable-views/src/app/comments.ts` — 14 lines
  - class: `Comments`



## `adev/src/content/tutorials/learn-angular/steps/11-optimizing-images/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/11-optimizing-images/answer/src/app/app.ts` — 10 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/11-optimizing-images/answer/src/app/user.ts` — 27 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/11-optimizing-images/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/11-optimizing-images/src/app/app.ts` — 10 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/11-optimizing-images/src/app/user.ts` — 26 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/`

- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/main.ts` — 6 lines



## `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/app/app.config.ts` — 9 lines
  - const: `appConfig`
- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/app/app.routes.ts` — 4 lines
  - const: `routes`
- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/app/home/`

- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/app/home/home.ts` — 8 lines
  - class: `Home`



## `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/app/user/`

- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/answer/src/app/user/user.ts` — 10 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/`

- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/main.ts` — 6 lines



## `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/app/app.config.ts` — 6 lines
  - const: `appConfig`
- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/app/app.routes.ts` — 0 lines
- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/app/home/`

- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/app/home/home.ts` — 8 lines
  - class: `Home`



## `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/app/user/`

- `adev/src/content/tutorials/learn-angular/steps/12-enable-routing/src/app/user/user.ts` — 10 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/`

- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/main.ts` — 6 lines



## `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/app/app.config.ts` — 9 lines
  - const: `appConfig`
- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/app/app.routes.ts` — 18 lines
  - const: `routes`
- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/app/home/`

- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/app/home/home.ts` — 8 lines
  - class: `Home`



## `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/app/user/`

- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/answer/src/app/user/user.ts` — 10 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/`

- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/main.ts` — 6 lines



## `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/app/app.config.ts` — 9 lines
  - const: `appConfig`
- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/app/app.routes.ts` — 6 lines
  - const: `routes`
- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/app/home/`

- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/app/home/home.ts` — 8 lines
  - class: `Home`



## `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/app/user/`

- `adev/src/content/tutorials/learn-angular/steps/13-define-a-route/src/app/user/user.ts` — 10 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/`

- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/main.ts` — 6 lines



## `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/app/app.config.ts` — 9 lines
  - const: `appConfig`
- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/app/app.routes.ts` — 18 lines
  - const: `routes`
- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/app/home/`

- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/app/home/home.ts` — 8 lines
  - class: `Home`



## `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/app/user/`

- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/answer/src/app/user/user.ts` — 10 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/`

- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/main.ts` — 6 lines



## `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/app/app.config.ts` — 9 lines
  - const: `appConfig`
- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/app/app.routes.ts` — 18 lines
  - const: `routes`
- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/app/home/`

- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/app/home/home.ts` — 8 lines
  - class: `Home`



## `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/app/user/`

- `adev/src/content/tutorials/learn-angular/steps/14-routerLink/src/app/user/user.ts` — 10 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/15-forms/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/15-forms/answer/src/app/app.ts` — 10 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/15-forms/answer/src/app/user.ts` — 20 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/15-forms/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/15-forms/src/app/app.ts` — 10 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/15-forms/src/app/user.ts` — 16 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/16-form-control-values/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/16-form-control-values/answer/src/app/app.ts` — 10 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/16-form-control-values/answer/src/app/user.ts` — 25 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/16-form-control-values/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/16-form-control-values/src/app/app.ts` — 10 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/16-form-control-values/src/app/user.ts` — 23 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/17-reactive-forms/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/17-reactive-forms/answer/src/app/app.ts` — 30 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/17-reactive-forms/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/17-reactive-forms/src/app/app.ts` — 21 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/18-forms-validation/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/18-forms-validation/answer/src/app/app.ts` — 22 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/18-forms-validation/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/18-forms-validation/src/app/app.ts` — 22 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/19-creating-an-injectable-service/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/19-creating-an-injectable-service/answer/src/app/app.ts` — 11 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/19-creating-an-injectable-service/answer/src/app/car.service.ts` — 15 lines
  - class: `CarService`



## `adev/src/content/tutorials/learn-angular/steps/19-creating-an-injectable-service/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/19-creating-an-injectable-service/src/app/app.ts` — 11 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/19-creating-an-injectable-service/src/app/car.service.ts` — 14 lines
  - class: `CarService`



## `adev/src/content/tutorials/learn-angular/steps/2-updating-the-component-class/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/2-updating-the-component-class/answer/src/app/app.ts` — 10 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/2-updating-the-component-class/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/2-updating-the-component-class/src/app/app.ts` — 8 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/20-inject-based-di/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/20-inject-based-di/answer/src/app/app.ts` — 13 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/20-inject-based-di/answer/src/app/car.service.ts` — 15 lines
  - class: `CarService`



## `adev/src/content/tutorials/learn-angular/steps/20-inject-based-di/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/20-inject-based-di/src/app/app.ts` — 11 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/20-inject-based-di/src/app/car.service.ts` — 15 lines
  - class: `CarService`



## `adev/src/content/tutorials/learn-angular/steps/22-pipes/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/22-pipes/answer/src/app/app.ts` — 12 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/22-pipes/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/22-pipes/src/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/23-pipes-format-data/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/23-pipes-format-data/answer/src/app/app.ts` — 20 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/23-pipes-format-data/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/23-pipes-format-data/src/app/app.ts` — 20 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/24-create-a-pipe/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/24-create-a-pipe/answer/src/app/app.ts` — 12 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/24-create-a-pipe/answer/src/app/reverse.pipe.ts` — 17 lines
  - class: `ReversePipe`



## `adev/src/content/tutorials/learn-angular/steps/24-create-a-pipe/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/24-create-a-pipe/src/app/app.ts` — 12 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/24-create-a-pipe/src/app/reverse.pipe.ts` — 8 lines
  - class: `ReversePipe`



## `adev/src/content/tutorials/learn-angular/steps/3-composing-components/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/3-composing-components/answer/src/app/app.ts` — 21 lines
  - class: `User`, `App`



## `adev/src/content/tutorials/learn-angular/steps/3-composing-components/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/3-composing-components/src/app/app.ts` — 17 lines
  - class: `User`, `App`



## `adev/src/content/tutorials/learn-angular/steps/4-control-flow-if/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/4-control-flow-if/answer/src/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/4-control-flow-if/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/4-control-flow-if/src/app/app.ts` — 10 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/5-control-flow-for/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/5-control-flow-for/answer/src/app/app.ts` — 20 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/5-control-flow-for/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/5-control-flow-for/src/app/app.ts` — 8 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/6-property-binding/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/6-property-binding/answer/src/app/app.ts` — 11 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/6-property-binding/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/6-property-binding/src/app/app.ts` — 9 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/7-event-handling/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/7-event-handling/answer/src/app/app.ts` — 19 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/7-event-handling/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/7-event-handling/src/app/app.ts` — 17 lines
  - class: `App`



## `adev/src/content/tutorials/learn-angular/steps/8-input/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/8-input/answer/src/app/app.ts` — 10 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/8-input/answer/src/app/user.ts` — 10 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/8-input/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/8-input/src/app/app.ts` — 10 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/8-input/src/app/user.ts` — 8 lines
  - class: `User`



## `adev/src/content/tutorials/learn-angular/steps/9-output/answer/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/9-output/answer/src/app/app.ts` — 19 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/9-output/answer/src/app/child.ts` — 19 lines
  - class: `Child`



## `adev/src/content/tutorials/learn-angular/steps/9-output/src/app/`

- `adev/src/content/tutorials/learn-angular/steps/9-output/src/app/app.ts` — 19 lines
  - class: `App`
- `adev/src/content/tutorials/learn-angular/steps/9-output/src/app/child.ts` — 15 lines
  - class: `Child`



## `adev/src/content/tutorials/playground/0-hello-world/src/`

- `adev/src/content/tutorials/playground/0-hello-world/src/main.ts` — 11 lines
  - class: `Playground`



## `adev/src/content/tutorials/playground/1-signals/src/`

- `adev/src/content/tutorials/playground/1-signals/src/main.ts` — 34 lines
  - class: `CookieRecipe`



## `adev/src/content/tutorials/playground/2-control-flow/src/`

- `adev/src/content/tutorials/playground/2-control-flow/src/main.ts` — 38 lines
  - class: `Todos`



## `adev/src/content/tutorials/playground/3-minigame/src/`

- `adev/src/content/tutorials/playground/3-minigame/src/main.ts` — 233 lines
  - class: `Playground`



## `adev/src/content/tutorials/playground/4-signal-forms/src/`

- `adev/src/content/tutorials/playground/4-signal-forms/src/main.ts` — 74 lines
  - class: `LoginApp`



## `adev/src/content/tutorials/playground/5-aria-accordion/src/`

- `adev/src/content/tutorials/playground/5-aria-accordion/src/main.ts` — 77 lines
  - class: `AccordionApp`



## `adev/src/content/tutorials/signal-forms/intro/src/app/`

- `adev/src/content/tutorials/signal-forms/intro/src/app/app.ts` — 9 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/1-set-up-form-model/answer/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/1-set-up-form-model/answer/src/app/app.ts` — 24 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/1-set-up-form-model/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/1-set-up-form-model/src/app/app.ts` — 16 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/2-connect-form-template/answer/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/2-connect-form-template/answer/src/app/app.ts` — 25 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/2-connect-form-template/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/2-connect-form-template/src/app/app.ts` — 26 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/3-add-validation/answer/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/3-add-validation/answer/src/app/app.ts` — 29 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/3-add-validation/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/3-add-validation/src/app/app.ts` — 29 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/4-display-errors/answer/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/4-display-errors/answer/src/app/app.ts` — 29 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/4-display-errors/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/4-display-errors/src/app/app.ts` — 29 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/5-add-submission/answer/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/5-add-submission/answer/src/app/app.ts` — 38 lines
  - class: `App`



## `adev/src/content/tutorials/signal-forms/steps/5-add-submission/src/app/`

- `adev/src/content/tutorials/signal-forms/steps/5-add-submission/src/app/app.ts` — 35 lines
  - class: `App`



## `adev/src/content/tutorials/signals/intro/src/app/`

- `adev/src/content/tutorials/signals/intro/src/app/app.ts` — 21 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/1-creating-your-first-signal/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/1-creating-your-first-signal/answer/src/app/app.ts` — 37 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/1-creating-your-first-signal/src/app/`

- `adev/src/content/tutorials/signals/steps/1-creating-your-first-signal/src/app/app.ts` — 31 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/10-reacting-to-signal-changes-with-effect/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/10-reacting-to-signal-changes-with-effect/answer/src/app/app.ts` — 102 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/10-reacting-to-signal-changes-with-effect/src/app/`

- `adev/src/content/tutorials/signals/steps/10-reacting-to-signal-changes-with-effect/src/app/app.ts` — 84 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/2-deriving-state-with-computed-signals/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/2-deriving-state-with-computed-signals/answer/src/app/app.ts` — 96 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/2-deriving-state-with-computed-signals/src/app/`

- `adev/src/content/tutorials/signals/steps/2-deriving-state-with-computed-signals/src/app/app.ts` — 78 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/3-deriving-state-with-linked-signals/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/3-deriving-state-with-linked-signals/answer/src/app/app.ts` — 109 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/3-deriving-state-with-linked-signals/src/app/`

- `adev/src/content/tutorials/signals/steps/3-deriving-state-with-linked-signals/src/app/app.ts` — 109 lines
  - class: `App`



## `adev/src/content/tutorials/signals/steps/4-managing-async-data-with-signals/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/4-managing-async-data-with-signals/answer/src/app/app.ts` — 52 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/4-managing-async-data-with-signals/answer/src/app/user-api.ts` — 16 lines
  - function: `getUserData`



## `adev/src/content/tutorials/signals/steps/4-managing-async-data-with-signals/src/app/`

- `adev/src/content/tutorials/signals/steps/4-managing-async-data-with-signals/src/app/app.ts` — 38 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/4-managing-async-data-with-signals/src/app/user-api.ts` — 16 lines
  - function: `getUserData`



## `adev/src/content/tutorials/signals/steps/5-component-communication-with-signals/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/5-component-communication-with-signals/answer/src/app/app.ts` — 45 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/5-component-communication-with-signals/answer/src/app/product-card.ts` — 26 lines
  - class: `ProductCard`



## `adev/src/content/tutorials/signals/steps/5-component-communication-with-signals/src/app/`

- `adev/src/content/tutorials/signals/steps/5-component-communication-with-signals/src/app/app.ts` — 42 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/5-component-communication-with-signals/src/app/product-card.ts` — 21 lines
  - class: `ProductCard`



## `adev/src/content/tutorials/signals/steps/6-two-way-binding-with-model-signals/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/6-two-way-binding-with-model-signals/answer/src/app/app.ts` — 58 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/6-two-way-binding-with-model-signals/answer/src/app/custom-checkbox.ts` — 25 lines
  - class: `CustomCheckbox`



## `adev/src/content/tutorials/signals/steps/6-two-way-binding-with-model-signals/src/app/`

- `adev/src/content/tutorials/signals/steps/6-two-way-binding-with-model-signals/src/app/app.ts` — 59 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/6-two-way-binding-with-model-signals/src/app/custom-checkbox.ts` — 24 lines
  - class: `CustomCheckbox`



## `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/answer/src/app/app.ts` — 27 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/answer/src/app/cart-display.ts` — 89 lines
  - class: `CartDisplay`
- `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/answer/src/app/cart-store.ts` — 53 lines
  - class: `CartStore`
- `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/answer/src/app/cart-types.ts` — 7 lines
  - interface: `CartItem`



## `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/src/app/`

- `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/src/app/app.ts` — 26 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/src/app/cart-display.ts` — 82 lines
  - class: `CartDisplay`
- `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/src/app/cart-store.ts` — 51 lines
  - class: `CartStore`
- `adev/src/content/tutorials/signals/steps/7-using-signals-with-services/src/app/cart-types.ts` — 7 lines
  - interface: `CartItem`



## `adev/src/content/tutorials/signals/steps/8-using-signals-with-directives/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/8-using-signals-with-directives/answer/src/app/app.ts` — 21 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/8-using-signals-with-directives/answer/src/app/highlight-directive.ts` — 43 lines
  - class: `HighlightDirective`



## `adev/src/content/tutorials/signals/steps/8-using-signals-with-directives/src/app/`

- `adev/src/content/tutorials/signals/steps/8-using-signals-with-directives/src/app/app.ts` — 21 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/8-using-signals-with-directives/src/app/highlight-directive.ts` — 13 lines
  - class: `HighlightDirective`



## `adev/src/content/tutorials/signals/steps/9-query-child-elements-with-signal-queries/answer/src/app/`

- `adev/src/content/tutorials/signals/steps/9-query-child-elements-with-signal-queries/answer/src/app/app.ts` — 75 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/9-query-child-elements-with-signal-queries/answer/src/app/cart-summary.ts` — 33 lines
  - class: `CartSummary`
- `adev/src/content/tutorials/signals/steps/9-query-child-elements-with-signal-queries/answer/src/app/product-card.ts` — 49 lines
  - class: `ProductCard`



## `adev/src/content/tutorials/signals/steps/9-query-child-elements-with-signal-queries/src/app/`

- `adev/src/content/tutorials/signals/steps/9-query-child-elements-with-signal-queries/src/app/app.ts` — 71 lines
  - class: `App`
- `adev/src/content/tutorials/signals/steps/9-query-child-elements-with-signal-queries/src/app/cart-summary.ts` — 33 lines
  - class: `CartSummary`
- `adev/src/content/tutorials/signals/steps/9-query-child-elements-with-signal-queries/src/app/product-card.ts` — 49 lines
  - class: `ProductCard`



## `adev/src/content/tutorials/zoneless-migration/steps/4-make-tests-compatible-with-zoneless/src/app/`

- `adev/src/content/tutorials/zoneless-migration/steps/4-make-tests-compatible-with-zoneless/src/app/test-helpers.ts` — 18 lines
  - function: `fakeAsync`, `withProxyZone`



## `adev/src/context/`

- `adev/src/context/llms.mts` — 143 lines

