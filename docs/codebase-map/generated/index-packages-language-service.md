<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/language-service/`

90 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/language-service/`

- `packages/language-service/api.ts` — 503 lines
  - interface: `PluginConfig`, `ApplyRefactoringResult`, `TemplateDocumentSymbol`, `DocumentSymbolsOptions`, `LinkedEditingRanges`, `InlayHintDisplayPart`, `AngularInlayHint`, `InlayHintsConfig`, `NgLanguageService`
  - type: `GetTcbResponse`, `GetComponentLocationsForTemplateResponse`, `GetTemplateLocationForComponentResponse`, `ApplyRefactoringProgressFn`
  - enum: `AngularSymbolKind`
  - function: `isNgLanguageService`
- `packages/language-service/index.d.ts` — 14 lines _(typings)_
- `packages/language-service/index.js` — 14 lines
- `packages/language-service/override_rename_ts_plugin.ts` — 59 lines
  - exports `factory`
- `packages/language-service/plugin-factory.ts` — 19 lines
  - const: `factory`
- `packages/language-service/private.ts` — 10 lines
  - re-exports * from `./src/template_target`



## `packages/language-service/bundles/`

- `packages/language-service/bundles/rollup.config.js` — 64 lines



## `packages/language-service/src/`

- `packages/language-service/src/adapters.ts` — 213 lines
  - class: `LanguageServiceAdapter`, `LSParseConfigHost`
- `packages/language-service/src/attribute_completions.ts` — 737 lines
  - enum: `AttributeCompletionKind`, `AsciiSortPriority`
  - interface: `DomAttributeCompletion`, `DomPropertyCompletion`, `DomEventCompletion`, `DirectiveAttributeCompletion`, `DirectiveInputCompletion`, `DirectiveOutputCompletion`
  - type: `AttributeCompletion`
  - function: `buildAttributeCompletionTable`, `addAttributeCompletionEntries`, `getAttributeCompletionSymbol`, `buildAnimationCompletionEntries`
- `packages/language-service/src/compiler_factory.ts` — 89 lines
  - class: `CompilerFactory`
- `packages/language-service/src/completions.ts` — 1567 lines
  - enum: `CompletionNodeContext`
  - class: `CompletionBuilder`
- `packages/language-service/src/definitions.ts` — 478 lines
  - class: `DefinitionBuilder`
- `packages/language-service/src/document_symbols.ts` — 760 lines
  - function: `getTemplateDocumentSymbols`
- `packages/language-service/src/inlay_hints.ts` — 2111 lines
  - function: `getInlayHintsForTemplate`
- `packages/language-service/src/language_service.ts` — 1230 lines
  - class: `LanguageService`
- `packages/language-service/src/linked_editing_range.ts` — 146 lines
  - function: `getLinkedEditingRangeAtPosition`
- `packages/language-service/src/outlining_spans.ts` — 101 lines
  - function: `getOutliningSpans`
- `packages/language-service/src/quick_info.ts` — 349 lines
  - class: `QuickInfoBuilder`
- `packages/language-service/src/quick_info_built_ins.ts` — 255 lines
  - function: `isDollarAny`, `createDollarAnyQuickInfo`, `isDollarSafeNavigationMigration`, `createDollarSafeNavigationMigration`, `createNgTemplateQuickInfo`, `createQuickInfoForBuiltIn`
- `packages/language-service/src/references_and_rename.ts` — 639 lines
  - class: `ReferencesBuilder`, `RenameBuilder`
- `packages/language-service/src/references_and_rename_utils.ts` — 460 lines
  - interface: `FilePosition`, `TemplateLocationDetails`
  - function: `getTargetDetailsAtTemplatePosition`, `createLocationKey`, `convertToTemplateDocumentSpan`, `getRenameTextAndSpanAtPosition`, `getParentClassMeta`
  - class: `SelectorlessCollector`
- `packages/language-service/src/semantic_tokens.ts` — 234 lines
  - const enum: `TokenEncodingConsts`, `TokenType`, `TokenModifier`
  - function: `getClassificationsForTemplate`
- `packages/language-service/src/signature_help.ts` — 139 lines
  - function: `getSignatureHelp`
- `packages/language-service/src/template_target.ts` — 799 lines
  - interface: `TemplateTarget`, `RawExpression`, `CallExpressionInArgContext`, `RawTemplateNode`, `ElementInTagContext`, `ElementInBodyContext`, `ComponentInTagContext`, `ComponentInBodyContext`, `DirectiveInNameContext`, `DirectiveInBodyContext`, `AttributeInKeyContext`, `AttributeInValueContext`, `TwoWayBindingContext`
  - type: `TargetContext`, `SingleNodeTarget`, `MultiNodeTarget`
  - enum: `TargetNodeKind`
  - function: `getTargetAtPosition`, `getTcbNodesOfTemplateAtPosition`
- `packages/language-service/src/ts_plugin.ts` — 441 lines
  - function: `create`, `initialize`



## `packages/language-service/src/codefixes/`

- `packages/language-service/src/codefixes/all_codefixes_metas.ts` — 23 lines
  - const: `ALL_CODE_FIXES_METAS`
- `packages/language-service/src/codefixes/code_fixes.ts` — 125 lines
  - class: `CodeFixes`
- `packages/language-service/src/codefixes/fix_invalid_banana_in_box.ts` — 135 lines
  - const: `fixInvalidBananaInBoxMeta`
- `packages/language-service/src/codefixes/fix_missing_import.ts` — 112 lines
  - const: `missingImportMeta`
- `packages/language-service/src/codefixes/fix_missing_member.ts` — 125 lines
  - const: `missingMemberMeta`
- `packages/language-service/src/codefixes/fix_missing_required_inputs.ts` — 221 lines
  - const: `fixMissingRequiredInput`
- `packages/language-service/src/codefixes/fix_unused_standalone_imports.ts` — 175 lines
  - const: `fixUnusedStandaloneImportsMeta`
- `packages/language-service/src/codefixes/index.ts` — 11 lines
  - exports `ALL_CODE_FIXES_METAS` from `./all_codefixes_metas`
  - exports `CodeFixes` from `./code_fixes`
- `packages/language-service/src/codefixes/utils.ts` — 143 lines
  - interface: `CodeActionContext`, `CodeFixAllContext`, `CodeActionMeta`
  - function: `convertFileTextChangeInTcb`, `isFixAllAvailable`
  - enum: `FixIdForCodeFixesAll`



## `packages/language-service/src/refactorings/`

- `packages/language-service/src/refactorings/refactoring.ts` — 90 lines
  - interface: `Refactoring`, `ActiveRefactoring`
  - const: `allRefactorings`



## `packages/language-service/src/refactorings/convert_to_signal_input/`

- `packages/language-service/src/refactorings/convert_to_signal_input/apply_input_refactoring.ts` — 160 lines
  - function: `applySignalInputRefactoring`
- `packages/language-service/src/refactorings/convert_to_signal_input/decorators.ts` — 34 lines
  - function: `isDecoratorInputClassField`, `isDirectiveOrComponentWithInputs`
- `packages/language-service/src/refactorings/convert_to_signal_input/full_class_input_refactoring.ts` — 118 lines
  - class: `ConvertFullClassToSignalInputsRefactoring`, `ConvertFullClassToSignalInputsBestEffortRefactoring`
- `packages/language-service/src/refactorings/convert_to_signal_input/individual_input_refactoring.ts` — 121 lines
  - class: `ConvertFieldToSignalInputRefactoring`, `ConvertFieldToSignalInputBestEffortRefactoring`



## `packages/language-service/src/refactorings/convert_to_signal_queries/`

- `packages/language-service/src/refactorings/convert_to_signal_queries/apply_query_refactoring.ts` — 151 lines
  - function: `applySignalQueriesRefactoring`
- `packages/language-service/src/refactorings/convert_to_signal_queries/decorators.ts` — 40 lines
  - function: `isDecoratorQueryClassField`, `isDirectiveOrComponentWithQueries`
- `packages/language-service/src/refactorings/convert_to_signal_queries/full_class_query_refactoring.ts` — 118 lines
  - class: `ConvertFullClassToSignalQueriesRefactoring`, `ConvertFullClassToSignalQueriesBestEffortRefactoring`
- `packages/language-service/src/refactorings/convert_to_signal_queries/individual_query_refactoring.ts` — 119 lines
  - class: `ConvertFieldToSignalQueryRefactoring`, `ConvertFieldToSignalQueryBestEffortRefactoring`



## `packages/language-service/src/utils/`

- `packages/language-service/src/utils/decorators.ts` — 24 lines
  - function: `isDirectiveOrComponent`
- `packages/language-service/src/utils/display_parts.ts` — 246 lines
  - const: `ALIAS_NAME`, `SYMBOL_INTERFACE`, `SYMBOL_PUNC`, `SYMBOL_SPACE`, `SYMBOL_TEXT`
  - enum: `DisplayInfoKind`
  - interface: `DisplayInfo`
  - function: `getSymbolDisplayInfo`, `createDisplayParts`, `unsafeCastDisplayInfoKindToScriptElementKind`, `getDirectiveDisplayInfo`, `getTsSymbolDisplayInfo`
- `packages/language-service/src/utils/format.ts` — 40 lines
  - function: `guessIndentationInSingleLine`
- `packages/language-service/src/utils/index.ts` — 509 lines
  - function: `getTextSpanOfNode`, `toTextSpan`, `isTemplateNodeWithKeyAndValue`, `isWithinKey`, `isWithinKeyValue`, `isTemplateNode`, `isExpressionNode`, `getTypeCheckInfoAtPosition`, `getFirstComponentForTemplateFile`, `getDirectiveMatchesForElementTag`, `makeElementSelector`, `getDirectiveMatchesForAttribute`, `filterAliasImports`, `isDollarEvent`, `isTypeScriptFile`, `isExternalTemplate`, `isWithin`, `getTemplateLocationFromTcbLocation`, `isBoundEventWithSyntheticHandler`, `createQuickInfo`
  - interface: `TypeCheckInfo`
- `packages/language-service/src/utils/ts_utils.ts` — 1098 lines
  - function: `findTightestNode`, `findAllMatchingNodes`, `findFirstMatchingNode`, `getClassDeclarationFromSymbolReference`, `getParentClassDeclaration`, `getPropertyAssignmentFromValue`, `getClassDeclFromDecoratorProp`, `collectMemberMethods`, `addElementToArrayLiteral`, `objectPropertyAssignmentForKey`, `updateObjectValueForKey`, `ensureArrayWithIdentifier`, `hasImport`, `nonCollidingImportName`, `standaloneTraitOrNgModule`, `updateImportsForTypescriptFile`, `updateImportsForAngularTrait`, `isStandaloneDecorator`, `generateImport`, `updateImport`, `printNode`, `getCodeActionToImportTheDirectiveDeclaration`
  - interface: `FindOptions`



## `packages/language-service/test/`

- `packages/language-service/test/adapters_spec.ts` — 22 lines _(spec)_
- `packages/language-service/test/code_fixes_spec.ts` — 1628 lines _(spec)_
- `packages/language-service/test/compiler_spec.ts` — 217 lines _(spec)_
- `packages/language-service/test/completions_spec.ts` — 2483 lines _(spec)_
- `packages/language-service/test/definitions_spec.ts` — 1101 lines _(spec)_
- `packages/language-service/test/diagnostic_spec.ts` — 812 lines _(spec)_
- `packages/language-service/test/get_outlining_spans_spec.ts` — 215 lines _(spec)_
- `packages/language-service/test/get_template_location_for_component_spec.ts` — 167 lines _(spec)_
- `packages/language-service/test/gettcb_spec.ts` — 198 lines _(spec)_
- `packages/language-service/test/inlay_hints_spec.ts` — 3787 lines _(spec)_
- `packages/language-service/test/linked_editing_range_spec.ts` — 501 lines _(spec)_
- `packages/language-service/test/quick_info_spec.ts` — 1440 lines _(spec)_
- `packages/language-service/test/references_and_rename_spec.ts` — 2559 lines _(spec)_
- `packages/language-service/test/semantic_tokens_spec.ts` — 374 lines _(spec)_
- `packages/language-service/test/shared_env.ts` — 23 lines _(test-support)_
  - function: `getSharedEnv`, `resetSharedEnv`
- `packages/language-service/test/signal_input_refactoring_action_spec.ts` — 467 lines _(spec)_
- `packages/language-service/test/signal_queries_refactoring_action_spec.ts` — 526 lines _(spec)_
- `packages/language-service/test/signature_help_spec.ts` — 162 lines _(spec)_
- `packages/language-service/test/ts_utils_spec.ts` — 235 lines _(spec)_
- `packages/language-service/test/type_definitions_spec.ts` — 229 lines _(spec)_
- `packages/language-service/test/version_detection_spec.ts` — 57 lines _(spec)_



## `packages/language-service/test/legacy/`

- `packages/language-service/test/legacy/compiler_factory_spec.ts` — 88 lines _(spec)_
- `packages/language-service/test/legacy/definitions_spec.ts` — 626 lines _(spec)_
- `packages/language-service/test/legacy/diagnostic_spec.ts` — 42 lines _(spec)_
- `packages/language-service/test/legacy/language_service_spec.ts` — 234 lines _(spec)_
- `packages/language-service/test/legacy/mock_host.ts` — 302 lines _(test-support)_
  - const: `TEST_SRCDIR`, `PROJECT_DIR`, `TSCONFIG`, `APP_COMPONENT`, `APP_MAIN`, `PARSING_CASES`, `TEST_TEMPLATE`
  - class: `MockConfigFileFs`, `MockService`
  - function: `setup`
- `packages/language-service/test/legacy/mock_host_spec.ts` — 174 lines _(spec)_
- `packages/language-service/test/legacy/template_target_spec.ts` — 1299 lines _(spec)_
- `packages/language-service/test/legacy/test_utils.ts` — 32 lines _(test-support)_
  - interface: `HumanizedDefinitionInfo`
  - function: `humanizeDefinitionInfo`
- `packages/language-service/test/legacy/ts_plugin_spec.ts` — 57 lines _(spec)_
- `packages/language-service/test/legacy/type_definitions_spec.ts` — 397 lines _(spec)_



## `packages/language-service/test/legacy/project/app/`

- `packages/language-service/test/legacy/project/app/app.component.ts` — 60 lines _(test-support)_
  - interface: `Address`, `Hero`
  - class: `AppComponent`
- `packages/language-service/test/legacy/project/app/main.ts` — 35 lines _(test-support)_
  - class: `AppModule`
- `packages/language-service/test/legacy/project/app/parsing-cases.ts` — 174 lines _(test-support)_
  - class: `StringModel`, `NumberModel`, `HintModel`, `CounterDirective`, `WithContextDirective`, `CompoundCustomButtonDirective`, `EventSelectorDirective`, `TestPipe`, `TestComponent`, `TemplateReference`



## `packages/language-service/test/legacy/project/app/#inner/`

- `packages/language-service/test/legacy/project/app/#inner/component.ts` — 17 lines _(test-support)_
  - class: `InnerComponent`



## `packages/language-service/testing/`

- `packages/language-service/testing/index.ts` — 13 lines _(test-support)_
  - re-exports * from `./src/buffer`
  - re-exports * from `./src/env`
  - re-exports * from `./src/project`
  - re-exports * from `./src/util`



## `packages/language-service/testing/src/`

- `packages/language-service/testing/src/buffer.ts` — 188 lines _(test-support)_
  - class: `OpenBuffer`
- `packages/language-service/testing/src/env.ts` — 127 lines _(test-support)_
  - class: `LanguageServiceTestEnv`
- `packages/language-service/testing/src/host.ts` — 129 lines _(test-support)_
  - class: `MockServerHost`
- `packages/language-service/testing/src/language_service_test_cache.ts` — 74 lines _(test-support)_
  - function: `patchLanguageServiceProjectsWithTestHost`
- `packages/language-service/testing/src/project.ts` — 343 lines _(test-support)_
  - type: `ProjectFiles`, `TestableOptions`
  - class: `Project`
- `packages/language-service/testing/src/util.ts` — 170 lines _(test-support)_
  - function: `assertFileNames`, `assertFilePaths`, `assertTextSpans`, `isNgSpecificDiagnostic`, `createModuleAndProjectWithDeclarations`, `createProjectWithStandaloneDeclarations`, `humanizeDocumentSpanLike`, `getText`

