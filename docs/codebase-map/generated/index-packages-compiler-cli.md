<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/compiler-cli/`

2549 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/compiler-cli/`

- `packages/compiler-cli/esbuild.config.js` — 20 lines
- `packages/compiler-cli/index.ts` — 100 lines
  - re-exports * from `./src/ngtsc/transform/jit`
  - re-exports * from `./src/transformers/api`
  - re-exports * from `./src/transformers/entry_points`
  - re-exports * from `./src/perform_compile`
  - re-exports * from `./private/tooling`
  - re-exports * from `./private/hybrid_analysis`
  - re-exports * from `./src/ngtsc/logging`
  - re-exports * from `./src/ngtsc/file_system`
  - re-exports * from `./src/ngtsc/typecheck/api`
  - re-exports * from `./src/ngtsc/docs`
  - exports `VERSION` from `./src/version`
  - exports `CompilerOptions as AngularCompilerOptions` from `./src/transformers/api`
  - exports `NgTscPlugin`, `PluginCompilerHost` from `./src/ngtsc/tsc_plugin`
  - exports `NgtscProgram` from `./src/ngtsc/program`
  - exports `OptimizeFor` from `./src/ngtsc/typecheck/api`
  - exports `getAngularDecorators` from `./src/ngtsc/annotations`
  - exports `NgCompiler`, `type NgCompilerOptions`, `type CompilationTicket`, `freshCompilationTicket`, `incrementalFromCompilerTicket`, `resourceChangeTicket` from `./src/ngtsc/core`
  - exports `type NgCompilerAdapter` from `./src/ngtsc/core/api`
  - exports `Reference` from `./src/ngtsc/imports`
  - exports `type DirectiveMeta`, `type InputMapping`, `isExternalResource`, `MetaKind`, `type PipeMeta`, `type Resource` from `./src/ngtsc/metadata`
  - exports `type DeclarationNode`, `isNamedClassDeclaration`, `type ReflectionHost`, `type ClassDeclaration` from `./src/ngtsc/reflection`
  - exports `isFatalDiagnosticError` from `./src/ngtsc/diagnostics`
  - exports `PerfPhase` from `./src/ngtsc/perf`
  - exports `type FileUpdate`, `InliningMode`, `type ProgramDriver` from `./src/ngtsc/program_driver`
  - exports `TrackedIncrementalBuildStrategy` from `./src/ngtsc/incremental`
  - exports `isShim` from `./src/ngtsc/shims`
  - exports `getRootDirs` from `./src/ngtsc/util/src/typescript`
  - exports `ConsoleLogger`, `Logger`, `LogLevel` from `./src/ngtsc/logging`
  - exports `NodeJSFileSystem`, `absoluteFrom`, `absoluteFromSourceFile`, `resolve`, `type FileStats`, `type PathSegment`, `type PathString`, `getSourceFileOrError`, `type FileSystem`, `type AbsoluteFsPath`, `NgtscCompilerHost`, `getFileSystem`, `setFileSystem`, `isLocalRelativePath` from `./src/ngtsc/file_system`
  - exports `isLocalCompilationDiagnostics`, `ErrorCode`, `ngErrorCode` from `./src/ngtsc/diagnostics`



## `packages/compiler-cli/linker/`

- `packages/compiler-cli/linker/index.ts` — 16 lines
  - exports `AstHost`, `Range` from `./src/ast/ast_host`
  - exports `assert` from `./src/ast/utils`
  - exports `FatalLinkerError`, `isFatalLinkerError` from `./src/fatal_linker_error`
  - exports `DeclarationScope` from `./src/file_linker/declaration_scope`
  - exports `FileLinker` from `./src/file_linker/file_linker`
  - exports `LinkerEnvironment` from `./src/file_linker/linker_environment`
  - exports `DEFAULT_LINKER_OPTIONS`, `LinkerOptions` from `./src/file_linker/linker_options`
  - exports `needsLinking` from `./src/file_linker/needs_linking`



## `packages/compiler-cli/linker/babel/`

- `packages/compiler-cli/linker/babel/index.ts` — 12 lines
  - exports `createEs2015LinkerPlugin` from `./src/es2015_linker_plugin`
  - has a default export



## `packages/compiler-cli/linker/babel/src/`

- `packages/compiler-cli/linker/babel/src/babel_declaration_scope.ts` — 74 lines
  - type: `ConstantScopePath`
  - class: `BabelDeclarationScope`
- `packages/compiler-cli/linker/babel/src/babel_plugin.ts` — 40 lines
  - function: `defaultLinkerPlugin`
- `packages/compiler-cli/linker/babel/src/es2015_linker_plugin.ts` — 195 lines
  - function: `createEs2015LinkerPlugin`
- `packages/compiler-cli/linker/babel/src/linker_plugin_options.ts` — 23 lines
  - interface: `LinkerPluginOptions`



## `packages/compiler-cli/linker/babel/src/ast/`

- `packages/compiler-cli/linker/babel/src/ast/babel_ast_factory.ts` — 402 lines
  - class: `BabelAstFactory`
- `packages/compiler-cli/linker/babel/src/ast/babel_ast_host.ts` — 217 lines
  - class: `BabelAstHost`



## `packages/compiler-cli/linker/babel/test/`

- `packages/compiler-cli/linker/babel/test/babel_declaration_scope_spec.ts` — 122 lines _(spec)_
- `packages/compiler-cli/linker/babel/test/babel_plugin_spec.ts` — 58 lines _(spec)_
- `packages/compiler-cli/linker/babel/test/es2015_linker_plugin_spec.ts` — 379 lines _(spec)_



## `packages/compiler-cli/linker/babel/test/ast/`

- `packages/compiler-cli/linker/babel/test/ast/babel_ast_factory_spec.ts` — 563 lines _(spec)_
- `packages/compiler-cli/linker/babel/test/ast/babel_ast_host_spec.ts` — 404 lines _(spec)_



## `packages/compiler-cli/linker/src/`

- `packages/compiler-cli/linker/src/fatal_linker_error.ts` — 35 lines
  - class: `FatalLinkerError`
  - function: `isFatalLinkerError`
- `packages/compiler-cli/linker/src/linker_import_generator.ts` — 48 lines
  - class: `LinkerImportGenerator`



## `packages/compiler-cli/linker/src/ast/`

- `packages/compiler-cli/linker/src/ast/ast_host.ts` — 127 lines
  - interface: `AstHost`, `Range`
- `packages/compiler-cli/linker/src/ast/ast_value.ts` — 365 lines
  - class: `AstObject`, `AstValue`
- `packages/compiler-cli/linker/src/ast/utils.ts` — 22 lines
  - function: `assert`



## `packages/compiler-cli/linker/src/ast/typescript/`

- `packages/compiler-cli/linker/src/ast/typescript/typescript_ast_host.ts` — 210 lines
  - class: `TypeScriptAstHost`



## `packages/compiler-cli/linker/src/file_linker/`

- `packages/compiler-cli/linker/src/file_linker/declaration_scope.ts` — 46 lines
  - interface: `DeclarationScope`
- `packages/compiler-cli/linker/src/file_linker/file_linker.ts` — 121 lines
  - const: `NO_STATEMENTS`
  - class: `FileLinker`
- `packages/compiler-cli/linker/src/file_linker/get_source_file.ts` — 40 lines
  - type: `GetSourceFileFn`
  - function: `createGetSourceFile`
- `packages/compiler-cli/linker/src/file_linker/linker_environment.ts` — 50 lines
  - class: `LinkerEnvironment`
- `packages/compiler-cli/linker/src/file_linker/linker_options.ts` — 50 lines
  - interface: `LinkerOptions`
  - const: `DEFAULT_LINKER_OPTIONS`
- `packages/compiler-cli/linker/src/file_linker/needs_linking.ts` — 29 lines
  - function: `needsLinking`
- `packages/compiler-cli/linker/src/file_linker/translator.ts` — 62 lines
  - class: `Translator`



## `packages/compiler-cli/linker/src/file_linker/emit_scopes/`

- `packages/compiler-cli/linker/src/file_linker/emit_scopes/emit_scope.ts` — 86 lines
  - class: `EmitScope`
- `packages/compiler-cli/linker/src/file_linker/emit_scopes/local_emit_scope.ts` — 45 lines
  - class: `LocalEmitScope`



## `packages/compiler-cli/linker/src/file_linker/partial_linkers/`

- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_class_metadata_async_linker_1.ts` — 65 lines
  - class: `PartialClassMetadataAsyncLinkerVersion1`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_class_metadata_linker_1.ts` — 50 lines
  - class: `PartialClassMetadataLinkerVersion1`
  - function: `toR3ClassMetadata`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_component_linker_1.ts` — 426 lines
  - class: `PartialComponentLinkerVersion1`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_directive_linker_1.ts` — 303 lines
  - class: `PartialDirectiveLinkerVersion1`
  - function: `toR3DirectiveMeta`, `createSourceSpan`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_factory_linker_1.ts` — 78 lines
  - class: `PartialFactoryLinkerVersion1`
  - function: `toR3FactoryMeta`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_injectable_linker_1.ts` — 81 lines
  - class: `PartialInjectableLinkerVersion1`
  - function: `toR3InjectableMeta`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_injector_linker_1.ts` — 58 lines
  - class: `PartialInjectorLinkerVersion1`
  - function: `toR3InjectorMeta`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_linker.ts` — 36 lines
  - interface: `LinkedDefinition`, `PartialLinker`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_linker_selector.ts` — 222 lines
  - const: `ɵɵngDeclareDirective`, `ɵɵngDeclareClassMetadata`, `ɵɵngDeclareComponent`, `ɵɵngDeclareFactory`, `ɵɵngDeclareInjectable`, `ɵɵngDeclareInjector`, `ɵɵngDeclareNgModule`, `ɵɵngDeclarePipe`, `ɵɵngDeclareClassMetadataAsync`, `ɵɵngDeclareService`, `declarationFunctions`
  - interface: `LinkerRange`
  - function: `createLinkerMap`
  - class: `PartialLinkerSelector`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_ng_module_linker_1.ts` — 138 lines
  - class: `PartialNgModuleLinkerVersion1`
  - function: `toR3NgModuleMeta`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_pipe_linker_1.ts` — 70 lines
  - class: `PartialPipeLinkerVersion1`
  - function: `toR3PipeMeta`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/partial_service_linker_1.ts` — 60 lines
  - class: `PartialServiceLinkerVersion1`
  - function: `toR3ServiceMeta`
- `packages/compiler-cli/linker/src/file_linker/partial_linkers/util.ts` — 125 lines
  - const: `PLACEHOLDER_VERSION`
  - function: `wrapReference`, `parseEnum`, `getDependency`, `extractForwardRef`, `getDefaultStandaloneValue`



## `packages/compiler-cli/linker/test/`

- `packages/compiler-cli/linker/test/fatal_linker_error_spec.ts` — 31 lines _(spec)_
- `packages/compiler-cli/linker/test/linker_import_generator_spec.ts` — 82 lines _(spec)_



## `packages/compiler-cli/linker/test/ast/`

- `packages/compiler-cli/linker/test/ast/ast_value_spec.ts` — 497 lines _(spec)_



## `packages/compiler-cli/linker/test/ast/typescript/`

- `packages/compiler-cli/linker/test/ast/typescript/typescript_ast_host_spec.ts` — 392 lines _(spec)_



## `packages/compiler-cli/linker/test/file_linker/`

- `packages/compiler-cli/linker/test/file_linker/file_linker_spec.ts` — 435 lines _(spec)_
- `packages/compiler-cli/linker/test/file_linker/helpers.ts` — 18 lines _(test-support)_
  - function: `generate`
- `packages/compiler-cli/linker/test/file_linker/needs_linking_spec.ts` — 108 lines _(spec)_
- `packages/compiler-cli/linker/test/file_linker/translator_spec.ts` — 48 lines _(spec)_



## `packages/compiler-cli/linker/test/file_linker/emit_scopes/`

- `packages/compiler-cli/linker/test/file_linker/emit_scopes/emit_scope_spec.ts` — 114 lines _(spec)_
- `packages/compiler-cli/linker/test/file_linker/emit_scopes/local_emit_scope_spec.ts` — 98 lines _(spec)_



## `packages/compiler-cli/linker/test/file_linker/partial_linkers/`

- `packages/compiler-cli/linker/test/file_linker/partial_linkers/partial_linker_selector_spec.ts` — 129 lines _(spec)_



## `packages/compiler-cli/private/`

- `packages/compiler-cli/private/hybrid_analysis.ts` — 32 lines
  - re-exports * from `../src/ngtsc/indexer/src/api`
  - exports `type TemplateDiagnostic`, `type SourceMapping`, `type SymbolReference`, `SymbolKind` from `../src/ngtsc/typecheck/api`
  - exports `RegistryDomSchemaChecker` from `../src/ngtsc/typecheck/src/dom`
  - exports `Environment` from `../src/ngtsc/typecheck/src/environment`
  - exports `ImportManager` from `../src/ngtsc/translator`
  - exports `findFirstMatchingNode`, `ExpressionIdentifier`, `hasExpressionIdentifier` from `../src/ngtsc/typecheck/src/comments`
  - exports `SymbolBuilder`, `SymbolBoundTarget`, `SymbolDirectiveMeta` from `../src/ngtsc/typecheck/src/template_symbol_builder`
- `packages/compiler-cli/private/localize.ts` — 17 lines
  - re-exports * from `../src/ngtsc/logging`
  - re-exports * from `../src/ngtsc/file_system`
  - exports `SourceFile`, `SourceFileLoader` from `../src/ngtsc/sourcemaps`
- `packages/compiler-cli/private/migrations.ts` — 78 lines
  - exports `createForwardRefResolver`, `ExternalTemplateDeclaration`, `extractDecoratorQueryMetadata`, `extractTemplate`, `findAngularDecorator`, `getAngularDecorators`, `InlineTemplateDeclaration`, `queryDecoratorNames`, `QueryFunctionName`, `ResourceLoader`, `unwrapExpression`, `parseDecoratorInputTransformFunction` from `../src/ngtsc/annotations`
  - exports `AbsoluteFsPath`, `FileSystem`, `getFileSystem`, `isLocalRelativePath`, `NodeJSFileSystem` from `../src/ngtsc/file_system`
  - exports `CompilationMode` from `../src/ngtsc/transform`
  - exports `DiagnosticCategoryLabel`, `NgCompiler`, `NgCompilerOptions`, `UnifiedModulesHost` from `../src/ngtsc/core`
  - exports `Reference`, `ReferenceEmitter`, `ReferenceEmitKind` from `../src/ngtsc/imports`
  - exports `DecoratorInputTransform`, `DtsMetadataReader`, `MetadataReader`, `DirectiveMeta`, `InputMapping` from `../src/ngtsc/metadata`
  - exports `DynamicValue`, `PartialEvaluator`, `ResolvedValue`, `ResolvedValueMap`, `StaticInterpreter` from `../src/ngtsc/partial_evaluator`
  - exports `ClassDeclaration`, `Decorator`, `ReflectionHost`, `reflectObjectLiteral`, `TypeScriptReflectionHost` from `../src/ngtsc/reflection`
  - exports `PotentialImport`, `PotentialImportKind`, `PotentialImportMode`, `SymbolKind`, `TemplateTypeChecker` from `../src/ngtsc/typecheck/api`
  - exports `getRootDirs` from `../src/ngtsc/util/src/typescript`
  - exports `FatalDiagnosticError` from `../src/ngtsc/diagnostics`
  - exports `isShim` from `../src/ngtsc/shims`
  - exports `ImportManager` from `../src/ngtsc/translator`
- `packages/compiler-cli/private/testing.ts` — 14 lines
  - exports `ImportedSymbolsTracker` from `../src/ngtsc/imports`
  - exports `TypeScriptReflectionHost` from `../src/ngtsc/reflection`
  - exports `getInitializerApiJitTransform` from `../src/ngtsc/transform/jit`
  - exports `initMockFileSystem`, `MockFileSystem` from `../src/ngtsc/file_system/testing`
- `packages/compiler-cli/private/tooling.ts` — 46 lines
  - const: `GLOBAL_DEFS_FOR_TERSER`, `GLOBAL_DEFS_FOR_TERSER_WITH_AOT`, `constructorParametersDownlevelTransform`



## `packages/compiler-cli/src/`

- `packages/compiler-cli/src/extract_i18n.ts` — 47 lines
  - function: `mainXi18n`
- `packages/compiler-cli/src/main.ts` — 242 lines
  - function: `main`, `mainDiagnosticsForTest`, `readNgcCommandLineAndConfiguration`, `readCommandLineAndConfiguration`, `watchMode`
  - interface: `NgcParsedConfiguration`
- `packages/compiler-cli/src/perform_compile.ts` — 367 lines
  - function: `formatDiagnostics`, `calcProjectFileAndBasePath`, `readConfiguration`, `exitCodeFromResult`, `performCompilation`, `defaultGatherDiagnostics`
  - type: `ConfigurationHost`
  - interface: `ParsedConfiguration`, `PerformCompilationResult`
- `packages/compiler-cli/src/perform_watch.ts` — 337 lines
  - enum: `FileChangeEvent`
  - interface: `PerformWatchHost`
  - function: `createPerformWatchHost`, `performWatchCompilation`
- `packages/compiler-cli/src/typescript_support.ts` — 67 lines
  - function: `setTypeScriptVersionForTesting`, `restoreTypeScriptVersionForTesting`, `checkVersion`, `verifySupportedTypeScriptVersion`
- `packages/compiler-cli/src/version.ts` — 18 lines
  - const: `VERSION`
- `packages/compiler-cli/src/version_helpers.ts` — 101 lines
  - function: `toNumbers`, `compareNumbers`, `isVersionBetween`, `compareVersions`



## `packages/compiler-cli/src/bin/`

- `packages/compiler-cli/src/bin/ng_xi18n.ts` — 21 lines
- `packages/compiler-cli/src/bin/ngc.ts` — 29 lines



## `packages/compiler-cli/src/ngtsc/`

- `packages/compiler-cli/src/ngtsc/preprocessor.ts` — 145 lines
  - class: `NgtscIsolatedPreprocessor`
- `packages/compiler-cli/src/ngtsc/program.ts` — 442 lines
  - class: `NgtscProgram`
- `packages/compiler-cli/src/ngtsc/tsc_plugin.ts` — 194 lines
  - interface: `PluginCompilerHost`
  - class: `NgTscPlugin`



## `packages/compiler-cli/src/ngtsc/annotations/`

- `packages/compiler-cli/src/ngtsc/annotations/index.ts` — 49 lines
  - exports `createForwardRefResolver`, `findAngularDecorator`, `getAngularDecorators`, `isAngularDecorator`, `NoopReferencesRegistry`, `ReferencesRegistry`, `ResourceLoader`, `ResourceLoaderContext`, `JitDeclarationRegistry`, `unwrapExpression` from `./common`
  - exports `ComponentDecoratorHandler` from `./component`
  - exports `extractTemplate`, `ExternalTemplateDeclaration`, `InlineTemplateDeclaration` from `./component/src/resources`
  - exports `DirectiveDecoratorHandler`, `InitializerApiFunction`, `INPUT_INITIALIZER_FN`, `MODEL_INITIALIZER_FN`, `OUTPUT_INITIALIZER_FNS`, `QUERY_INITIALIZER_FNS`, `queryDecoratorNames`, `QueryFunctionName`, `tryParseInitializerApi`, `tryParseInitializerBasedOutput`, `tryParseSignalInputMapping`, `tryParseSignalModelMapping`, `tryParseSignalQueryFromInitializer`, `extractDecoratorQueryMetadata`, `parseDecoratorInputTransformFunction` from `./directive`
  - exports `NgModuleDecoratorHandler` from `./ng_module`
  - exports `InjectableDecoratorHandler` from `./src/injectable`
  - exports `PipeDecoratorHandler` from `./src/pipe`



## `packages/compiler-cli/src/ngtsc/annotations/common/`

- `packages/compiler-cli/src/ngtsc/annotations/common/index.ts` — 22 lines
  - re-exports * from `./src/api`
  - re-exports * from `./src/di`
  - re-exports * from `./src/diagnostics`
  - re-exports * from `./src/evaluation`
  - re-exports * from `./src/factory`
  - re-exports * from `./src/injectable_registry`
  - re-exports * from `./src/metadata`
  - re-exports * from `./src/debug_info`
  - re-exports * from `./src/references_registry`
  - re-exports * from `./src/schema`
  - re-exports * from `./src/util`
  - re-exports * from `./src/input_transforms`
  - re-exports * from `./src/jit_declaration_registry`



## `packages/compiler-cli/src/ngtsc/annotations/common/src/`

- `packages/compiler-cli/src/ngtsc/annotations/common/src/api.ts` — 107 lines
  - interface: `ResourceLoader`, `ResourceLoaderContext`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/debug_info.ts` — 37 lines
  - function: `extractClassDebugInfo`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/di.ts` — 265 lines
  - type: `ConstructorDeps`
  - interface: `ConstructorDepError`
  - function: `getConstructorDependencies`, `unwrapConstructorDependencies`, `getValidConstructorDependencies`, `validateConstructorDependencies`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/diagnostics.ts` — 520 lines
  - function: `makeDuplicateDeclarationError`, `createValueHasWrongTypeError`, `getProviderDiagnostics`, `getDirectiveDiagnostics`, `validateHostDirectives`, `getUndecoratedClassWithAngularFeaturesDiagnostic`, `checkInheritanceOfInjectable`, `findInheritedCtor`, `assertLocalCompilationUnresolvedConst`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/evaluation.ts` — 124 lines
  - function: `resolveEnumValue`, `resolveEncapsulationEnumValueLocally`, `isStringArray`, `isClassReferenceArray`, `isArray`, `resolveLiteral`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/factory.ts` — 40 lines
  - type: `CompileFactoryFn`
  - function: `compileNgFactoryDefField`, `compileDeclareFactory`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/injectable_registry.ts` — 55 lines
  - interface: `InjectableMeta`
  - class: `InjectableClassRegistry`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/input_transforms.ts` — 39 lines
  - function: `compileInputTransformFields`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/jit_declaration_registry.ts` — 18 lines
  - class: `JitDeclarationRegistry`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/metadata.ts` — 254 lines
  - type: `UndecoratedMetadataExtractor`
  - function: `extractClassMetadata`, `removeIdentifierReferences`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/references_registry.ts` — 30 lines
  - interface: `ReferencesRegistry`
  - class: `NoopReferencesRegistry`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/schema.ts` — 64 lines
  - function: `extractSchemas`
- `packages/compiler-cli/src/ngtsc/annotations/common/src/util.ts` — 560 lines
  - const: `CORE_MODULE`
  - function: `valueReferenceToExpression`, `valueReferenceToExpression`, `valueReferenceToExpression`, `toR3Reference`, `isAngularCore`, `isAngularCoreReferenceWithPotentialAliasing`, `findAngularDecorator`, `isAngularDecorator`, `getAngularDecorators`, `unwrapExpression`, `tryUnwrapForwardRef`, `createForwardRefResolver`, `combineResolvers`, `isExpressionForwardReference`, `isWrappedTsNodeExpr`, `readBaseClass`, `wrapFunctionExpressionsInParens`, `resolveProvidersRequiringFactory`, `wrapTypeReference`, `createSourceSpan`, `compileResults`, `toFactoryMetadata`, `resolveImportedFile`, `getOriginNodeForDiagnostics`, `isAbstractClassDeclaration`, `parseStandaloneOption`



## `packages/compiler-cli/src/ngtsc/annotations/common/test/`

- `packages/compiler-cli/src/ngtsc/annotations/common/test/diagnostics_spec.ts` — 130 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/annotations/common/test/metadata_spec.ts` — 168 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/annotations/common/test/util_spec.ts` — 43 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/annotations/component/`

- `packages/compiler-cli/src/ngtsc/annotations/component/index.ts` — 10 lines
  - exports `ComponentDecoratorHandler` from `./src/handler`



## `packages/compiler-cli/src/ngtsc/annotations/component/src/`

- `packages/compiler-cli/src/ngtsc/annotations/component/src/animations.ts` — 53 lines
  - function: `analyzeTemplateForAnimations`
- `packages/compiler-cli/src/ngtsc/annotations/component/src/diagnostics.ts` — 58 lines
  - function: `makeCyclicImportInfo`, `checkCustomElementSelectorForErrors`
- `packages/compiler-cli/src/ngtsc/annotations/component/src/foreign_component.ts` — 367 lines
  - function: `analyzeForeignComponentFeatures`
- `packages/compiler-cli/src/ngtsc/annotations/component/src/handler.ts` — 2730 lines
  - class: `ComponentDecoratorHandler`
- `packages/compiler-cli/src/ngtsc/annotations/component/src/metadata.ts` — 172 lines
  - type: `ComponentMetadataResolvedFields`, `DeferredComponentDependency`
  - interface: `ComponentAnalysisData`, `ComponentResolutionData`
  - exports `ForeignComponentMeta` from `../../../metadata`
- `packages/compiler-cli/src/ngtsc/annotations/component/src/resources.ts` — 762 lines
  - interface: `StyleUrlMeta`, `ParsedComponentTemplate`, `ParsedTemplateWithSource`, `InlineTemplateDeclaration`, `ExternalTemplateDeclaration`, `ExtractTemplateOptions`
  - const enum: `ResourceTypeForDiagnostics`
  - type: `TemplateDeclaration`
  - function: `getTemplateDeclarationNodeForError`, `extractTemplate`, `createEmptyTemplate`, `parseTemplateDeclaration`, `preloadAndParseTemplate`, `makeResourceNotFoundError`, `transformDecoratorResources`, `extractComponentStyleUrls`, `extractInlineStyleResources`, `_extractTemplateStyleUrls`
- `packages/compiler-cli/src/ngtsc/annotations/component/src/selectorless.ts` — 68 lines
  - function: `analyzeTemplateForSelectorless`
- `packages/compiler-cli/src/ngtsc/annotations/component/src/symbol.ts` — 98 lines
  - class: `ComponentSymbol`
- `packages/compiler-cli/src/ngtsc/annotations/component/src/util.ts` — 297 lines
  - function: `collectLegacyAnimationNames`, `isLegacyAngularAnimationsReference`, `validateAndFlattenComponentImports`, `extractForeignImportsFromAst`
  - const: `legacyAnimationTriggerResolver`



## `packages/compiler-cli/src/ngtsc/annotations/component/test/`

- `packages/compiler-cli/src/ngtsc/annotations/component/test/component_spec.ts` — 1404 lines _(spec)_
  - class: `StubResourceLoader`



## `packages/compiler-cli/src/ngtsc/annotations/directive/`

- `packages/compiler-cli/src/ngtsc/annotations/directive/index.ts` — 17 lines
  - re-exports * from `./src/shared`
  - re-exports * from `./src/input_function`
  - re-exports * from `./src/output_function`
  - re-exports * from `./src/query_functions`
  - re-exports * from `./src/model_function`
  - re-exports * from `./src/initializer_functions`
  - exports `DirectiveDecoratorHandler` from `./src/handler`
  - exports `DirectiveSymbol` from `./src/symbol`



## `packages/compiler-cli/src/ngtsc/annotations/directive/src/`

- `packages/compiler-cli/src/ngtsc/annotations/directive/src/handler.ts` — 553 lines
  - interface: `DirectiveHandlerData`
  - class: `DirectiveDecoratorHandler`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/initializer_function_access.ts` — 46 lines
  - function: `validateAccessOfInitializerApiMember`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/initializer_functions.ts` — 232 lines
  - interface: `InitializerApiFunction`, `InitializerFunctionMetadata`
  - function: `tryParseInitializerApi`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/input_function.ts` — 77 lines
  - const: `INPUT_INITIALIZER_FN`
  - function: `tryParseSignalInputMapping`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/input_output_parse_options.ts` — 50 lines
  - function: `parseAndValidateInputAndOutputOptions`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/model_function.ts` — 82 lines
  - const: `MODEL_INITIALIZER_FN`
  - function: `tryParseSignalModelMapping`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/output_function.ts` — 97 lines
  - const: `OUTPUT_INITIALIZER_FNS`
  - function: `tryParseInitializerBasedOutput`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/query_functions.ts` — 200 lines
  - type: `QueryFunctionName`
  - const: `QUERY_INITIALIZER_FNS`
  - function: `tryParseSignalQueryFromInitializer`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/shared.ts` — 2283 lines
  - const: `queryDecoratorNames`
  - interface: `HostBindingNodes`
  - function: `extractDirectiveMetadata`, `extractDecoratorQueryMetadata`, `parseDirectiveStyles`, `parseFieldStringArrayValue`, `getDirectiveUndecoratedMetadataExtractor`, `parseDecoratorInputTransformFunction`, `extractHostBindingResources`
- `packages/compiler-cli/src/ngtsc/annotations/directive/src/symbol.ts` — 169 lines
  - class: `DirectiveSymbol`



## `packages/compiler-cli/src/ngtsc/annotations/directive/test/`

- `packages/compiler-cli/src/ngtsc/annotations/directive/test/directive_spec.ts` — 264 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/annotations/directive/test/initializer_functions_spec.ts` — 479 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/annotations/ng_module/`

- `packages/compiler-cli/src/ngtsc/annotations/ng_module/index.ts` — 15 lines
  - exports `NgModuleDecoratorHandler`, `NgModuleSymbol` from `./src/handler`
  - exports `createModuleWithProvidersResolver`, `isResolvedModuleWithProviders`, `ResolvedModuleWithProviders` from `./src/module_with_providers`



## `packages/compiler-cli/src/ngtsc/annotations/ng_module/src/`

- `packages/compiler-cli/src/ngtsc/annotations/ng_module/src/handler.ts` — 1499 lines
  - interface: `NgModuleAnalysis`, `NgModuleResolution`, `TopLevelImportedExpression`
  - class: `NgModuleSymbol`, `NgModuleDecoratorHandler`
- `packages/compiler-cli/src/ngtsc/annotations/ng_module/src/module_with_providers.ts` — 168 lines
  - function: `createModuleWithProvidersResolver`, `isResolvedModuleWithProviders`
  - interface: `ResolvedModuleWithProviders`



## `packages/compiler-cli/src/ngtsc/annotations/ng_module/test/`

- `packages/compiler-cli/src/ngtsc/annotations/ng_module/test/ng_module_spec.ts` — 346 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/annotations/src/`

- `packages/compiler-cli/src/ngtsc/annotations/src/injectable.ts` — 483 lines
  - interface: `InjectableHandlerData`
  - class: `InjectableDecoratorHandler`
- `packages/compiler-cli/src/ngtsc/annotations/src/pipe.ts` — 304 lines
  - interface: `PipeHandlerData`
  - class: `PipeSymbol`, `PipeDecoratorHandler`
- `packages/compiler-cli/src/ngtsc/annotations/src/service.ts` — 319 lines
  - interface: `ServiceHandlerData`
  - class: `ServiceDecoratorHandler`



## `packages/compiler-cli/src/ngtsc/annotations/test/`

- `packages/compiler-cli/src/ngtsc/annotations/test/injectable_spec.ts` — 100 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/core/`

- `packages/compiler-cli/src/ngtsc/core/index.ts` — 12 lines
  - re-exports * from `./src/compiler`
  - exports `NgCompilerHost` from `./src/host`
  - exports `UnifiedModulesHost`, `NgCompilerOptions`, `DiagnosticCategoryLabel` from `./api`



## `packages/compiler-cli/src/ngtsc/core/api/`

- `packages/compiler-cli/src/ngtsc/core/api/index.ts` — 13 lines
  - re-exports * from `./src/adapter`
  - re-exports * from `./src/interfaces`
  - re-exports * from `./src/options`
  - re-exports * from `./src/public_options`



## `packages/compiler-cli/src/ngtsc/core/api/src/`

- `packages/compiler-cli/src/ngtsc/core/api/src/adapter.ts` — 110 lines
  - type: `ExtendedCompilerHostMethods`
  - interface: `NgCompilerAdapter`, `SourceFileTypeIdentifier`
- `packages/compiler-cli/src/ngtsc/core/api/src/interfaces.ts` — 133 lines
  - interface: `UnifiedModulesHost`, `ResourceHost`, `ResourceHostContext`, `TransformResourceResult`, `ExtendedTsCompilerHost`
- `packages/compiler-cli/src/ngtsc/core/api/src/options.ts` — 149 lines
  - interface: `TestOnlyOptions`, `InternalOptions`, `NgCompilerOptions`
- `packages/compiler-cli/src/ngtsc/core/api/src/public_options.ts` — 459 lines
  - interface: `LegacyNgcOptions`, `TypeCheckingOptions`, `DiagnosticOptions`, `BazelAndG3Options`, `I18nOptions`, `TargetOptions`, `MiscOptions`
  - enum: `DiagnosticCategoryLabel`



## `packages/compiler-cli/src/ngtsc/core/src/`

- `packages/compiler-cli/src/ngtsc/core/src/compiler.ts` — 1929 lines
  - enum: `CompilationTicketKind`
  - interface: `FreshCompilationTicket`, `IncrementalTypeScriptCompilationTicket`, `IncrementalResourceCompilationTicket`
  - type: `CompilationTicket`
  - function: `freshCompilationTicket`, `incrementalFromCompilerTicket`, `incrementalFromStateTicket`, `resourceChangeTicket`, `isAngularCorePackage`
  - class: `NgCompiler`
- `packages/compiler-cli/src/ngtsc/core/src/feature_detection.ts` — 29 lines
  - function: `coreVersionSupportsFeature`
- `packages/compiler-cli/src/ngtsc/core/src/host.ts` — 362 lines
  - class: `DelegatingCompilerHost`, `NgCompilerHost`



## `packages/compiler-cli/src/ngtsc/core/test/`

- `packages/compiler-cli/src/ngtsc/core/test/compiler_spec.ts` — 443 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/cycles/`

- `packages/compiler-cli/src/ngtsc/cycles/index.ts` — 11 lines
  - exports `Cycle`, `CycleAnalyzer`, `CycleHandlingStrategy` from `./src/analyzer`
  - exports `ImportGraph` from `./src/imports`



## `packages/compiler-cli/src/ngtsc/cycles/src/`

- `packages/compiler-cli/src/ngtsc/cycles/src/analyzer.ts` — 164 lines
  - class: `CycleAnalyzer`, `Cycle`
  - const enum: `CycleHandlingStrategy`
- `packages/compiler-cli/src/ngtsc/cycles/src/imports.ts` — 173 lines
  - class: `ImportGraph`



## `packages/compiler-cli/src/ngtsc/cycles/test/`

- `packages/compiler-cli/src/ngtsc/cycles/test/analyzer_spec.ts` — 110 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/cycles/test/imports_spec.ts` — 74 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/cycles/test/util.ts` — 73 lines _(test-support)_
  - function: `makeProgramFromGraph`, `importPath`



## `packages/compiler-cli/src/ngtsc/diagnostics/`

- `packages/compiler-cli/src/ngtsc/diagnostics/index.ts` — 23 lines
  - exports `COMPILER_ERRORS_WITH_GUIDES` from `./src/docs`
  - exports `addDiagnosticChain`, `FatalDiagnosticError`, `isFatalDiagnosticError`, `isLocalCompilationDiagnostics`, `makeDiagnostic`, `makeDiagnosticChain`, `makeRelatedInformation` from `./src/error`
  - exports `ErrorCode` from `./src/error_code`
  - exports `ERROR_DETAILS_PAGE_BASE_URL`, `DOC_PAGE_BASE_URL` from `./src/error_details_base_url`
  - exports `ExtendedTemplateDiagnosticName` from `./src/extended_template_diagnostic_name`
  - exports `ngErrorCode`, `replaceTsWithNgInErrors` from `./src/util`



## `packages/compiler-cli/src/ngtsc/diagnostics/src/`

- `packages/compiler-cli/src/ngtsc/diagnostics/src/docs.ts` — 25 lines
  - const: `COMPILER_ERRORS_WITH_GUIDES`
- `packages/compiler-cli/src/ngtsc/diagnostics/src/error.ts` — 127 lines
  - class: `FatalDiagnosticError`
  - function: `makeDiagnostic`, `makeDiagnosticChain`, `makeRelatedInformation`, `addDiagnosticChain`, `isFatalDiagnosticError`, `isLocalCompilationDiagnostics`
- `packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.ts` — 742 lines
  - enum: `ErrorCode`
- `packages/compiler-cli/src/ngtsc/diagnostics/src/error_details_base_url.ts` — 29 lines
  - const: `DOC_PAGE_BASE_URL`, `ERROR_DETAILS_PAGE_BASE_URL`
- `packages/compiler-cli/src/ngtsc/diagnostics/src/extended_template_diagnostic_name.ts` — 38 lines
  - enum: `ExtendedTemplateDiagnosticName`
- `packages/compiler-cli/src/ngtsc/diagnostics/src/util.ts` — 29 lines
  - function: `replaceTsWithNgInErrors`, `ngErrorCode`



## `packages/compiler-cli/src/ngtsc/docs/`

- `packages/compiler-cli/src/ngtsc/docs/index.ts` — 11 lines
  - re-exports * from `./src/entities`
  - exports `DocsExtractor` from `./src/extractor`



## `packages/compiler-cli/src/ngtsc/docs/src/`

- `packages/compiler-cli/src/ngtsc/docs/src/class_extractor.ts` — 257 lines
  - function: `extractClass`
- `packages/compiler-cli/src/ngtsc/docs/src/constant_extractor.ts` — 116 lines
  - function: `extractConstant`, `isSyntheticAngularConstant`
- `packages/compiler-cli/src/ngtsc/docs/src/decorator_extractor.ts` — 284 lines
  - function: `extractorDecorator`, `isDecoratorDeclaration`, `isDecoratorOptionsInterface`
- `packages/compiler-cli/src/ngtsc/docs/src/entities.ts` — 265 lines
  - interface: `EntryCollection`, `JsDocTagEntry`, `GenericEntry`, `SourceEntry`, `DocEntryWithSourceInfo`, `DocEntry`, `ConstantEntry`, `TypeAliasEntry`, `ClassEntry`, `InterfaceEntry`, `EnumEntry`, `DecoratorEntry`, `DirectiveEntry`, `PipeEntry`, `FunctionSignatureMetadata`, `MemberEntry`, `EnumMemberEntry`, `PropertyEntry`, `ParameterEntry`, `FunctionDefinitionEntry`, `NamespaceEntry`, `InitializerApiFunctionEntry`
  - enum: `EntryType`, `MemberType`, `DecoratorType`, `MemberTags`
  - type: `MethodEntry`, `InterfaceMemberEntry`, `TypeAliasMemberEntry`, `FunctionEntry`
  - function: `isDocEntryWithSourceInfo`
- `packages/compiler-cli/src/ngtsc/docs/src/enum_extractor.ts` — 60 lines
  - function: `extractEnum`
- `packages/compiler-cli/src/ngtsc/docs/src/extractor.ts` — 303 lines
  - class: `DocsExtractor`
- `packages/compiler-cli/src/ngtsc/docs/src/filters.ts` — 14 lines
  - function: `isAngularPrivateName`
- `packages/compiler-cli/src/ngtsc/docs/src/function_extractor.ts` — 223 lines
  - type: `FunctionLike`
  - class: `FunctionExtractor`
  - function: `extractAllParams`, `extractCallSignatures`, `findImplementationOfFunction`
- `packages/compiler-cli/src/ngtsc/docs/src/generics_extractor.ts` — 27 lines
  - function: `extractGenerics`
- `packages/compiler-cli/src/ngtsc/docs/src/import_extractor.ts` — 46 lines
  - function: `getImportedSymbols`
- `packages/compiler-cli/src/ngtsc/docs/src/initializer_api_function_extractor.ts` — 211 lines
  - function: `isInitializerApiFunction`, `extractInitializerApiFunction`
- `packages/compiler-cli/src/ngtsc/docs/src/interface_extractor.ts` — 69 lines
  - function: `extractInterface`
- `packages/compiler-cli/src/ngtsc/docs/src/internal.ts` — 40 lines
  - function: `isInternal`
- `packages/compiler-cli/src/ngtsc/docs/src/jsdoc_extractor.ts` — 122 lines
  - function: `extractJsDocTags`, `extractJsDocDescription`, `extractRawJsDoc`
- `packages/compiler-cli/src/ngtsc/docs/src/namespace_extractor.ts` — 66 lines
  - function: `extractNamespace`
- `packages/compiler-cli/src/ngtsc/docs/src/properties_extractor.ts` — 377 lines
  - type: `ClassDeclarationLike`
  - class: `PropertiesExtractor`
- `packages/compiler-cli/src/ngtsc/docs/src/type_alias_extractor.ts` — 31 lines
  - function: `extractTypeAlias`
- `packages/compiler-cli/src/ngtsc/docs/src/type_extractor.ts` — 19 lines
  - function: `extractResolvedTypeString`
- `packages/compiler-cli/src/ngtsc/docs/src/variable_extractor.ts` — 27 lines
  - function: `extractFromVariableStatement`



## `packages/compiler-cli/src/ngtsc/entry_point/`

- `packages/compiler-cli/src/ngtsc/entry_point/index.ts` — 13 lines
  - exports `FlatIndexGenerator` from `./src/generator`
  - exports `findFlatIndexEntryPoint` from `./src/logic`
  - exports `checkForPrivateExports` from `./src/private_export_checker`
  - exports `ReferenceGraph` from `./src/reference_graph`



## `packages/compiler-cli/src/ngtsc/entry_point/src/`

- `packages/compiler-cli/src/ngtsc/entry_point/src/generator.ts` — 51 lines
  - class: `FlatIndexGenerator`
  - re-exports * from `${relativeEntryPoint}`
- `packages/compiler-cli/src/ngtsc/entry_point/src/logic.ts` — 42 lines
  - function: `findFlatIndexEntryPoint`
- `packages/compiler-cli/src/ngtsc/entry_point/src/private_export_checker.ts` — 154 lines
  - function: `checkForPrivateExports`
- `packages/compiler-cli/src/ngtsc/entry_point/src/reference_graph.ts` — 74 lines
  - class: `ReferenceGraph`



## `packages/compiler-cli/src/ngtsc/entry_point/test/`

- `packages/compiler-cli/src/ngtsc/entry_point/test/entry_point_spec.ts` — 30 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/entry_point/test/reference_graph_spec.ts` — 52 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/file_system/`

- `packages/compiler-cli/src/ngtsc/file_system/index.ts` — 39 lines
  - exports `NgtscCompilerHost` from `./src/compiler_host`
  - exports `absoluteFrom`, `absoluteFromSourceFile`, `basename`, `dirname`, `getFileSystem`, `isLocalRelativePath`, `isRoot`, `isRooted`, `join`, `relative`, `relativeFrom`, `resolve`, `setFileSystem`, `toRelativeImport` from `./src/helpers`
  - exports `LogicalFileSystem`, `LogicalProjectPath` from `./src/logical`
  - exports `NodeJSFileSystem` from `./src/node_js_file_system`
  - exports `AbsoluteFsPath`, `FileStats`, `FileSystem`, `PathManipulation`, `PathSegment`, `PathString`, `ReadonlyFileSystem` from `./src/types`
  - exports `getSourceFileOrError` from `./src/util`
  - exports `createFileSystemTsReadDirectoryFn` from `./src/ts_read_directory`
  - exports `InvalidFileSystem` from `./src/invalid_file_system`



## `packages/compiler-cli/src/ngtsc/file_system/src/`

- `packages/compiler-cli/src/ngtsc/file_system/src/compiler_host.ts` — 89 lines
  - class: `NgtscCompilerHost`
- `packages/compiler-cli/src/ngtsc/file_system/src/helpers.ts` — 127 lines
  - function: `getFileSystem`, `setFileSystem`, `absoluteFrom`, `absoluteFromSourceFile`, `relativeFrom`, `dirname`, `join`, `resolve`, `isRoot`, `isRooted`, `relative`, `basename`, `isLocalRelativePath`, `toRelativeImport`
- `packages/compiler-cli/src/ngtsc/file_system/src/invalid_file_system.ts` — 107 lines
  - class: `InvalidFileSystem`
- `packages/compiler-cli/src/ngtsc/file_system/src/logical.ts` — 134 lines
  - type: `LogicalProjectPath`
  - const: `LogicalProjectPath`
  - class: `LogicalFileSystem`
- `packages/compiler-cli/src/ngtsc/file_system/src/node_js_file_system.ts` — 156 lines
  - class: `NodeJSPathManipulation`, `NodeJSReadonlyFileSystem`, `NodeJSFileSystem`
- `packages/compiler-cli/src/ngtsc/file_system/src/ts_read_directory.ts` — 115 lines
  - function: `createFileSystemTsReadDirectoryFn`
- `packages/compiler-cli/src/ngtsc/file_system/src/types.ts` — 98 lines
  - type: `BrandedPath`, `AbsoluteFsPath`, `PathSegment`, `PathString`
  - interface: `PathManipulation`, `ReadonlyFileSystem`, `FileSystem`, `FileStats`
- `packages/compiler-cli/src/ngtsc/file_system/src/util.ts` — 40 lines
  - function: `normalizeSeparators`, `stripExtension`, `getSourceFileOrError`



## `packages/compiler-cli/src/ngtsc/file_system/test/`

- `packages/compiler-cli/src/ngtsc/file_system/test/compiler_host_spec.ts` — 68 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/file_system/test/helpers_spec.ts` — 59 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/file_system/test/logical_spec.ts` — 112 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/file_system/test/node_js_file_system_spec.ts` — 198 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/file_system/testing/`

- `packages/compiler-cli/src/ngtsc/file_system/testing/index.ts` — 19 lines _(test-support)_
  - exports `Folder`, `MockFileSystem` from `./src/mock_file_system`
  - exports `MockFileSystemNative` from `./src/mock_file_system_native`
  - exports `MockFileSystemPosix` from `./src/mock_file_system_posix`
  - exports `MockFileSystemWindows` from `./src/mock_file_system_windows`
  - exports `initMockFileSystem`, `lockMockFileSystem`, `runInEachFileSystem`, `TestFile` from `./src/test_helper`



## `packages/compiler-cli/src/ngtsc/file_system/testing/src/`

- `packages/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system.ts` — 426 lines _(test-support)_
  - class: `MockFileSystem`, `SymLink`
  - interface: `FindResult`, `Folder`
  - type: `Entity`, `File`
  - function: `isFile`, `isSymLink`, `isFolder`
- `packages/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system_native.ts` — 71 lines _(test-support)_
  - class: `MockFileSystemNative`
- `packages/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system_posix.ts` — 48 lines _(test-support)_
  - class: `MockFileSystemPosix`
- `packages/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system_windows.ts` — 48 lines _(test-support)_
  - class: `MockFileSystemWindows`
- `packages/compiler-cli/src/ngtsc/file_system/testing/src/test_helper.ts` — 190 lines _(test-support)_
  - interface: `TestFile`, `RunInEachFileSystemFn`
  - const: `runInEachFileSystem`
  - function: `lockMockFileSystem`, `initMockFileSystem`



## `packages/compiler-cli/src/ngtsc/file_system/testing/test/`

- `packages/compiler-cli/src/ngtsc/file_system/testing/test/mock_file_system_spec.ts` — 47 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/hmr/`

- `packages/compiler-cli/src/ngtsc/hmr/index.ts` — 11 lines
  - re-exports * from `./src/metadata`
  - re-exports * from `./src/update_declaration`



## `packages/compiler-cli/src/ngtsc/hmr/src/`

- `packages/compiler-cli/src/ngtsc/hmr/src/extract_dependencies.ts` — 422 lines
  - function: `extractHmrDependencies`
- `packages/compiler-cli/src/ngtsc/hmr/src/metadata.ts` — 80 lines
  - function: `extractHmrMetatadata`
- `packages/compiler-cli/src/ngtsc/hmr/src/update_declaration.ts` — 76 lines
  - function: `getHmrUpdateDeclaration`



## `packages/compiler-cli/src/ngtsc/imports/`

- `packages/compiler-cli/src/ngtsc/imports/index.ts` — 49 lines
  - exports `AliasingHost`, `AliasStrategy`, `PrivateExportAliasingHost`, `UnifiedModulesAliasingHost` from `./src/alias`
  - exports `ImportRewriter`, `NoopImportRewriter`, `R3SymbolsImportRewriter`, `validateAndRewriteCoreSymbol` from `./src/core`
  - exports `DefaultImportTracker` from `./src/default`
  - exports `DeferredSymbolTracker` from `./src/deferred_symbol_tracker`
  - exports `AbsoluteModuleStrategy`, `assertSuccessfulReferenceEmit`, `EmittedReference`, `FailedEmitResult`, `ImportedFile`, `ImportFlags`, `LocalIdentifierStrategy`, `LogicalProjectStrategy`, `ReferenceEmitKind`, `ReferenceEmitResult`, `ReferenceEmitStrategy`, `ReferenceEmitter`, `RelativePathStrategy`, `UnifiedModulesStrategy` from `./src/emitter`
  - exports `ImportedSymbolsTracker` from `./src/imported_symbols_tracker`
  - exports `LocalCompilationExtraImportsTracker` from `./src/local_compilation_extra_imports_tracker`
  - exports `AliasImportDeclaration`, `isAliasImportDeclaration`, `loadIsReferencedAliasDeclarationPatch` from `./src/patch_alias_reference_resolution`
  - exports `Reexport` from `./src/reexport`
  - exports `OwningModule`, `Reference` from `./src/references`
  - exports `ModuleResolver` from `./src/resolver`



## `packages/compiler-cli/src/ngtsc/imports/src/`

- `packages/compiler-cli/src/ngtsc/imports/src/alias.ts` — 237 lines
  - interface: `AliasingHost`
  - class: `UnifiedModulesAliasingHost`, `PrivateExportAliasingHost`, `AliasStrategy`
- `packages/compiler-cli/src/ngtsc/imports/src/core.ts` — 115 lines
  - interface: `ImportRewriter`
  - class: `NoopImportRewriter`, `R3SymbolsImportRewriter`
  - function: `validateAndRewriteCoreSymbol`
- `packages/compiler-cli/src/ngtsc/imports/src/default.ts` — 121 lines
  - function: `attachDefaultImportDeclaration`, `getDefaultImportDeclaration`
  - class: `DefaultImportTracker`
- `packages/compiler-cli/src/ngtsc/imports/src/deferred_symbol_tracker.ts` — 237 lines
  - class: `DeferredSymbolTracker`
- `packages/compiler-cli/src/ngtsc/imports/src/emitter.ts` — 563 lines
  - enum: `ImportFlags`, `ReferenceEmitKind`
  - type: `ImportedFile`, `ReferenceEmitResult`
  - interface: `EmittedReference`, `FailedEmitResult`, `ReferenceEmitStrategy`
  - function: `assertSuccessfulReferenceEmit`
  - class: `ReferenceEmitter`, `LocalIdentifierStrategy`, `AbsoluteModuleStrategy`, `LogicalProjectStrategy`, `RelativePathStrategy`, `UnifiedModulesStrategy`
- `packages/compiler-cli/src/ngtsc/imports/src/find_export.ts` — 45 lines
  - function: `findExportedNameOfNode`
- `packages/compiler-cli/src/ngtsc/imports/src/imported_symbols_tracker.ts` — 140 lines
  - class: `ImportedSymbolsTracker`
- `packages/compiler-cli/src/ngtsc/imports/src/local_compilation_extra_imports_tracker.ts` — 118 lines
  - class: `LocalCompilationExtraImportsTracker`
- `packages/compiler-cli/src/ngtsc/imports/src/patch_alias_reference_resolution.ts` — 151 lines
  - type: `AliasImportDeclaration`
  - function: `loadIsReferencedAliasDeclarationPatch`, `isAliasImportDeclaration`
- `packages/compiler-cli/src/ngtsc/imports/src/reexport.ts` — 14 lines
  - interface: `Reexport`
- `packages/compiler-cli/src/ngtsc/imports/src/references.ts` — 209 lines
  - interface: `OwningModule`
  - class: `Reference`
- `packages/compiler-cli/src/ngtsc/imports/src/resolver.ts` — 41 lines
  - class: `ModuleResolver`



## `packages/compiler-cli/src/ngtsc/imports/test/`

- `packages/compiler-cli/src/ngtsc/imports/test/default_spec.ts` — 150 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/imports/test/emitter_spec.ts` — 473 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/incremental/`

- `packages/compiler-cli/src/ngtsc/incremental/api.ts` — 60 lines
  - interface: `IncrementalBuild`, `DependencyTracker`
- `packages/compiler-cli/src/ngtsc/incremental/index.ts` — 20 lines
  - re-exports * from `./src/strategy`
  - exports `IncrementalCompilation` from `./src/incremental`
  - exports `NOOP_INCREMENTAL_BUILD` from `./src/noop`
  - exports `AnalyzedIncrementalState`, `DeltaIncrementalState`, `FreshIncrementalState`, `IncrementalState`, `IncrementalStateKind` from `./src/state`



## `packages/compiler-cli/src/ngtsc/incremental/semantic_graph/`

- `packages/compiler-cli/src/ngtsc/incremental/semantic_graph/index.ts` — 17 lines
  - exports `SemanticReference`, `SemanticSymbol` from `./src/api`
  - exports `SemanticDepGraph`, `SemanticDepGraphUpdater` from `./src/graph`
  - exports `areTypeParametersEqual`, `extractSemanticTypeParameters`, `SemanticTypeParameter` from `./src/type_parameters`
  - exports `isArrayEqual`, `isReferenceEqual`, `isSetEqual`, `isSymbolEqual` from `./src/util`



## `packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/`

- `packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/api.ts` — 130 lines
  - class: `SemanticSymbol`
  - interface: `SemanticReference`
- `packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/graph.ts` — 295 lines
  - interface: `SemanticDependencyResult`
  - class: `SemanticDepGraph`, `SemanticDepGraphUpdater`
- `packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/type_parameters.ts` — 75 lines
  - interface: `SemanticTypeParameter`
  - function: `extractSemanticTypeParameters`, `areTypeParametersEqual`
- `packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/util.ts` — 98 lines
  - function: `isSymbolEqual`, `isReferenceEqual`, `referenceEquality`, `isArrayEqual`, `isSetEqual`



## `packages/compiler-cli/src/ngtsc/incremental/src/`

- `packages/compiler-cli/src/ngtsc/incremental/src/dependency_tracking.ts` — 152 lines
  - class: `FileDependencyGraph`
- `packages/compiler-cli/src/ngtsc/incremental/src/incremental.ts` — 432 lines
  - class: `IncrementalCompilation`
- `packages/compiler-cli/src/ngtsc/incremental/src/noop.ts` — 16 lines
  - const: `NOOP_INCREMENTAL_BUILD`
- `packages/compiler-cli/src/ngtsc/incremental/src/state.ts` — 118 lines
  - enum: `IncrementalStateKind`
  - interface: `FreshIncrementalState`, `AnalyzedIncrementalState`, `DeltaIncrementalState`
  - type: `IncrementalState`
- `packages/compiler-cli/src/ngtsc/incremental/src/strategy.ts` — 116 lines
  - interface: `IncrementalBuildStrategy`
  - class: `NoopIncrementalBuildStrategy`, `TrackedIncrementalBuildStrategy`, `PatchedProgramIncrementalBuildStrategy`



## `packages/compiler-cli/src/ngtsc/incremental/test/`

- `packages/compiler-cli/src/ngtsc/incremental/test/incremental_spec.ts` — 44 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/indexer/`

- `packages/compiler-cli/src/ngtsc/indexer/index.ts` — 12 lines
  - re-exports * from `./src/api`
  - exports `IndexingContext` from `./src/context`
  - exports `generateAnalysis` from `./src/transform`



## `packages/compiler-cli/src/ngtsc/indexer/src/`

- `packages/compiler-cli/src/ngtsc/indexer/src/api.ts` — 222 lines
  - enum: `IdentifierKind`
  - interface: `TemplateIdentifier`, `PropertyIdentifier`, `MethodIdentifier`, `AttributeIdentifier`, `ElementIdentifier`, `TemplateNodeIdentifier`, `ComponentNodeIdentifier`, `DirectiveNodeIdentifier`, `ReferenceIdentifier`, `VariableIdentifier`, `LetDeclarationIdentifier`, `IndexedComponent`, `AbstractBoundTemplate`, `NodeAdapter`
  - type: `TopLevelIdentifier`, `DirectiveHostIdentifier`
  - class: `AbsoluteSourceSpan`
- `packages/compiler-cli/src/ngtsc/indexer/src/context.ts` — 67 lines
  - interface: `ComponentMeta`, `ComponentInfo`
  - class: `IndexingContext`
- `packages/compiler-cli/src/ngtsc/indexer/src/template.ts` — 418 lines
  - function: `getTemplateIdentifiers`
- `packages/compiler-cli/src/ngtsc/indexer/src/transform.ts` — 55 lines
  - function: `generateAnalysis`



## `packages/compiler-cli/src/ngtsc/indexer/test/`

- `packages/compiler-cli/src/ngtsc/indexer/test/context_spec.ts` — 48 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/indexer/test/template_spec.ts` — 1201 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/indexer/test/transform_spec.ts` — 112 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/indexer/test/util.ts` — 126 lines _(test-support)_
  - function: `getComponentDeclaration`, `getBoundTemplate`



## `packages/compiler-cli/src/ngtsc/logging/`

- `packages/compiler-cli/src/ngtsc/logging/index.ts` — 10 lines
  - exports `ConsoleLogger` from `./src/console_logger`
  - exports `Logger`, `LogLevel` from `./src/logger`



## `packages/compiler-cli/src/ngtsc/logging/src/`

- `packages/compiler-cli/src/ngtsc/logging/src/console_logger.ts` — 40 lines
  - const: `DEBUG`, `WARN`, `ERROR`
  - class: `ConsoleLogger`
- `packages/compiler-cli/src/ngtsc/logging/src/logger.ts` — 27 lines
  - interface: `Logger`
  - enum: `LogLevel`



## `packages/compiler-cli/src/ngtsc/logging/test/`

- `packages/compiler-cli/src/ngtsc/logging/test/console_logger_spec.ts` — 59 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/logging/testing/`

- `packages/compiler-cli/src/ngtsc/logging/testing/index.ts` — 9 lines _(test-support)_
  - exports `MockLogger` from `./src/mock_logger`



## `packages/compiler-cli/src/ngtsc/logging/testing/src/`

- `packages/compiler-cli/src/ngtsc/logging/testing/src/mock_logger.ts` — 33 lines _(test-support)_
  - class: `MockLogger`



## `packages/compiler-cli/src/ngtsc/metadata/`

- `packages/compiler-cli/src/ngtsc/metadata/index.ts` — 29 lines
  - re-exports * from `./src/api`
  - exports `DtsMetadataReader` from `./src/dts`
  - exports `flattenInheritedDirectiveMetadata` from `./src/inheritance`
  - exports `CompoundMetadataRegistry`, `LocalMetadataRegistry` from `./src/registry`
  - exports `ResourceRegistry`, `Resource`, `DirectiveResources`, `isExternalResource`, `ExternalResource` from `./src/resource_registry`
  - exports `extractDirectiveTypeCheckMeta`, `hasInjectableFields`, `CompoundMetadataReader`, `isHostDirectiveMetaForGlobalMode`, `createForeignComponentMatcher` from `./src/util`
  - exports `ExportedProviderStatusResolver` from `./src/providers`
  - exports `HostDirectivesResolver` from `./src/host_directives_resolver`



## `packages/compiler-cli/src/ngtsc/metadata/src/`

- `packages/compiler-cli/src/ngtsc/metadata/src/api.ts` — 396 lines
  - interface: `ForeignComponentMeta`, `NgModuleMeta`, `DirectiveTypeCheckMeta`, `ModelMapping`, `DecoratorInputTransform`, `DirectiveMeta`, `HostDirectiveMeta`, `HostDirectiveMetaForGlobalMode`, `HostDirectiveMetaForLocalMode`, `PipeMeta`, `MetadataReader`, `MetadataReaderWithIndex`, `NgModuleIndex`, `MetadataRegistry`
  - enum: `MetaKind`
  - type: `InputMapping`
- `packages/compiler-cli/src/ngtsc/metadata/src/dts.ts` — 461 lines
  - class: `DtsMetadataReader`
- `packages/compiler-cli/src/ngtsc/metadata/src/host_directives_resolver.ts` — 124 lines
  - class: `HostDirectivesResolver`
- `packages/compiler-cli/src/ngtsc/metadata/src/inheritance.ts` — 101 lines
  - function: `flattenInheritedDirectiveMetadata`
- `packages/compiler-cli/src/ngtsc/metadata/src/ng_module_index.ts` — 131 lines
  - class: `NgModuleIndexImpl`
- `packages/compiler-cli/src/ngtsc/metadata/src/providers.ts` — 100 lines
  - class: `ExportedProviderStatusResolver`
- `packages/compiler-cli/src/ngtsc/metadata/src/registry.ts` — 87 lines
  - class: `LocalMetadataRegistry`, `CompoundMetadataRegistry`
- `packages/compiler-cli/src/ngtsc/metadata/src/resource_registry.ts` — 133 lines
  - interface: `Resource`, `ExternalResource`, `DirectiveResources`
  - function: `isExternalResource`
  - class: `ResourceRegistry`
- `packages/compiler-cli/src/ngtsc/metadata/src/util.ts` — 378 lines
  - function: `extractReferencesFromType`, `extraReferenceFromTypeQuery`, `readBooleanType`, `readStringType`, `readMapType`, `readStringArrayType`, `extractDirectiveTypeCheckMeta`, `hasInjectableFields`, `isHostDirectiveMetaForGlobalMode`, `createForeignComponentMatcher`
  - class: `CompoundMetadataReader`



## `packages/compiler-cli/src/ngtsc/metadata/test/`

- `packages/compiler-cli/src/ngtsc/metadata/test/dts_spec.ts` — 379 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/partial_evaluator/`

- `packages/compiler-cli/src/ngtsc/partial_evaluator/index.ts` — 21 lines
  - exports `describeResolvedType`, `traceDynamicValue` from `./src/diagnostics`
  - exports `DynamicValue` from `./src/dynamic`
  - exports `ForeignFunctionResolver`, `ForeignTypeResolver`, `PartialEvaluator` from `./src/interface`
  - exports `StaticInterpreter` from `./src/interpreter`
  - exports `EnumValue`, `KnownFn`, `ResolvedValue`, `ResolvedValueArray`, `ResolvedValueMap` from `./src/result`
  - exports `SyntheticValue` from `./src/synthetic`



## `packages/compiler-cli/src/ngtsc/partial_evaluator/src/`

- `packages/compiler-cli/src/ngtsc/partial_evaluator/src/builtin.ts` — 74 lines
  - class: `ArraySliceBuiltinFn`, `ArrayConcatBuiltinFn`, `StringConcatBuiltinFn`
- `packages/compiler-cli/src/ngtsc/partial_evaluator/src/diagnostics.ts` — 210 lines
  - function: `describeResolvedType`, `traceDynamicValue`
- `packages/compiler-cli/src/ngtsc/partial_evaluator/src/dynamic.ts` — 233 lines
  - const enum: `DynamicValueReason`
  - class: `DynamicValue`
  - interface: `DynamicValueVisitor`
- `packages/compiler-cli/src/ngtsc/partial_evaluator/src/interface.ts` — 73 lines
  - type: `ForeignFunctionResolver`, `ForeignTypeResolver`
  - class: `PartialEvaluator`
- `packages/compiler-cli/src/ngtsc/partial_evaluator/src/interpreter.ts` — 913 lines
  - class: `StaticInterpreter`
- `packages/compiler-cli/src/ngtsc/partial_evaluator/src/result.ts` — 103 lines
  - type: `ResolvedValue`
  - interface: `ResolvedValueArray`, `ResolvedValueMap`
  - class: `ResolvedModule`, `EnumValue`, `KnownFn`
- `packages/compiler-cli/src/ngtsc/partial_evaluator/src/synthetic.ts` — 19 lines
  - class: `SyntheticValue`



## `packages/compiler-cli/src/ngtsc/partial_evaluator/test/`

- `packages/compiler-cli/src/ngtsc/partial_evaluator/test/diagnostics_spec.ts` — 314 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/partial_evaluator/test/evaluator_spec.ts` — 947 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/partial_evaluator/test/utils.ts` — 92 lines _(test-support)_
  - function: `makeExpression`, `makeEvaluator`, `evaluate`, `owningModuleOf`, `firstArgFfr`
  - const: `arrowReturnValueFfr`, `returnTypeFfr`



## `packages/compiler-cli/src/ngtsc/perf/`

- `packages/compiler-cli/src/ngtsc/perf/index.ts` — 12 lines
  - re-exports * from `./src/api`
  - exports `NOOP_PERF_RECORDER` from `./src/noop`
  - exports `ActivePerfRecorder`, `DelegatingPerfRecorder` from `./src/recorder`



## `packages/compiler-cli/src/ngtsc/perf/src/`

- `packages/compiler-cli/src/ngtsc/perf/src/api.ts` — 418 lines
  - enum: `PerfPhase`, `PerfEvent`, `PerfCheckpoint`
  - interface: `PerfRecorder`
- `packages/compiler-cli/src/ngtsc/perf/src/clock.ts` — 22 lines
  - type: `HrTime`
  - function: `mark`, `timeSinceInMicros`
- `packages/compiler-cli/src/ngtsc/perf/src/noop.ts` — 27 lines
  - const: `NOOP_PERF_RECORDER`
- `packages/compiler-cli/src/ngtsc/perf/src/recorder.ts` — 156 lines
  - interface: `PerfResults`
  - class: `ActivePerfRecorder`, `DelegatingPerfRecorder`



## `packages/compiler-cli/src/ngtsc/program_driver/`

- `packages/compiler-cli/src/ngtsc/program_driver/index.ts` — 11 lines
  - re-exports * from `./src/api`
  - exports `TsCreateProgramDriver` from `./src/ts_create_program_driver`



## `packages/compiler-cli/src/ngtsc/program_driver/src/`

- `packages/compiler-cli/src/ngtsc/program_driver/src/api.ts` — 93 lines
  - interface: `FileUpdate`, `MaybeSourceFileWithOriginalFile`, `ProgramDriver`
  - const: `NgOriginalFile`
  - enum: `InliningMode`, `UpdateMode`
- `packages/compiler-cli/src/ngtsc/program_driver/src/ts_create_program_driver.ts` — 284 lines
  - class: `DelegatingCompilerHost`, `TsCreateProgramDriver`



## `packages/compiler-cli/src/ngtsc/reflection/`

- `packages/compiler-cli/src/ngtsc/reflection/index.ts` — 24 lines
  - re-exports * from `./src/host`
  - exports `typeNodeToValueExpr`, `entityNameToValue` from `./src/type_to_value`
  - exports `TypeScriptReflectionHost`, `filterToMembersWithDecorator`, `reflectIdentifierOfDeclaration`, `reflectNameOfDeclaration`, `reflectObjectLiteral`, `reflectTypeEntityToDeclaration` from `./src/typescript`
  - exports `isNamedClassDeclaration`, `isNamedFunctionDeclaration`, `isNamedVariableDeclaration` from `./src/util`



## `packages/compiler-cli/src/ngtsc/reflection/src/`

- `packages/compiler-cli/src/ngtsc/reflection/src/host.ts` — 719 lines
  - interface: `Decorator`, `ClassMember`, `LocalTypeValueReference`, `ImportedTypeValueReference`, `UnavailableTypeValueReference`, `UnsupportedType`, `NoValueDeclaration`, `TypeOnlyImport`, `NamespaceImport`, `UnknownReference`, `MissingType`, `CtorParameter`, `FunctionDefinition`, `Parameter`, `Import`, `Declaration`, `ReflectionHost`
  - type: `DecoratorIdentifier`, `NamespacedIdentifier`, `ClassDeclaration`, `UnavailableValue`, `TypeValueReference`, `DeclarationNode`, `AmbientImport`
  - function: `isDecoratorIdentifier`
  - enum: `ClassMemberKind`, `ClassMemberAccessLevel`
  - const enum: `TypeValueReferenceKind`, `ValueUnavailableKind`
  - const: `AmbientImport`
- `packages/compiler-cli/src/ngtsc/reflection/src/type_to_value.ts` — 328 lines
  - function: `typeToValue`, `typeNodeToValueExpr`, `entityNameToValue`
- `packages/compiler-cli/src/ngtsc/reflection/src/typescript.ts` — 877 lines
  - class: `TypeScriptReflectionHost`, `TypeEntityToDeclarationError`
  - function: `reflectNameOfDeclaration`, `reflectIdentifierOfDeclaration`, `reflectTypeEntityToDeclaration`, `filterToMembersWithDecorator`, `reflectClassMember`, `findMember`, `reflectObjectLiteral`, `getContainingImportDeclaration`
- `packages/compiler-cli/src/ngtsc/reflection/src/util.ts` — 54 lines
  - function: `isNamedClassDeclaration`, `isNamedFunctionDeclaration`, `isNamedVariableDeclaration`, `classMemberAccessLevelToString`



## `packages/compiler-cli/src/ngtsc/reflection/test/`

- `packages/compiler-cli/src/ngtsc/reflection/test/ts_host_spec.ts` — 695 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/resource/`

- `packages/compiler-cli/src/ngtsc/resource/index.ts` — 10 lines
  - exports `AdapterResourceLoader` from `./src/loader`



## `packages/compiler-cli/src/ngtsc/resource/src/`

- `packages/compiler-cli/src/ngtsc/resource/src/loader.ts` — 294 lines
  - class: `AdapterResourceLoader`



## `packages/compiler-cli/src/ngtsc/scope/`

- `packages/compiler-cli/src/ngtsc/scope/index.ts` — 24 lines
  - exports `ComponentScopeKind`, `ComponentScopeReader`, `ExportScope`, `LocalModuleScope`, `ScopeData`, `StandaloneScope`, `ComponentScope` from `./src/api`
  - exports `CompoundComponentScopeReader` from `./src/component_scope`
  - exports `DtsModuleScopeResolver`, `MetadataDtsModuleScopeResolver` from `./src/dependency`
  - exports `DeclarationData`, `LocalModuleScopeRegistry`, `LocalNgModuleData` from `./src/local`
  - exports `SelectorlessComponentScopeReader` from `./src/selectorless_scope`
  - exports `TypeCheckScope`, `TypeCheckScopeRegistry` from `./src/typecheck`
  - exports `makeNotStandaloneDiagnostic`, `makeUnknownComponentImportDiagnostic` from `./src/util`



## `packages/compiler-cli/src/ngtsc/scope/src/`

- `packages/compiler-cli/src/ngtsc/scope/src/api.ts` — 104 lines
  - interface: `ScopeData`, `ExportScope`, `RemoteScope`, `LocalModuleScope`, `StandaloneScope`, `SelectorlessScope`, `ComponentScopeReader`
  - enum: `ComponentScopeKind`
  - type: `ComponentScope`
- `packages/compiler-cli/src/ngtsc/scope/src/component_scope.ts` — 42 lines
  - class: `CompoundComponentScopeReader`
- `packages/compiler-cli/src/ngtsc/scope/src/dependency.ts` — 155 lines
  - interface: `DtsModuleScopeResolver`
  - class: `MetadataDtsModuleScopeResolver`
- `packages/compiler-cli/src/ngtsc/scope/src/local.ts` — 819 lines
  - interface: `LocalNgModuleData`, `DeclarationData`
  - class: `LocalModuleScopeRegistry`
- `packages/compiler-cli/src/ngtsc/scope/src/selectorless_scope.ts` — 143 lines
  - class: `SelectorlessComponentScopeReader`
- `packages/compiler-cli/src/ngtsc/scope/src/standalone.ts` — 141 lines
  - class: `StandaloneComponentScopeReader`
- `packages/compiler-cli/src/ngtsc/scope/src/typecheck.ts` — 246 lines
  - interface: `TypeCheckScope`
  - class: `TypeCheckScopeRegistry`
- `packages/compiler-cli/src/ngtsc/scope/src/util.ts` — 86 lines
  - function: `getDiagnosticNode`, `makeNotStandaloneDiagnostic`, `makeUnknownComponentImportDiagnostic`, `makeUnknownComponentDeferredImportDiagnostic`



## `packages/compiler-cli/src/ngtsc/scope/test/`

- `packages/compiler-cli/src/ngtsc/scope/test/dependency_spec.ts` — 300 lines _(spec)_
  - type: `ModuleMeta`, `ComponentMeta`, `DirectiveMeta`, `PipeMeta`
- `packages/compiler-cli/src/ngtsc/scope/test/local_spec.ts` — 404 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/shims/`

- `packages/compiler-cli/src/ngtsc/shims/api.ts` — 55 lines
  - interface: `TopLevelShimGenerator`, `PerFileShimGenerator`
- `packages/compiler-cli/src/ngtsc/shims/index.ts` — 22 lines
  - exports `ShimAdapter` from `./src/adapter`
  - exports `copyFileShimData`, `isShim`, `retagAllTsFiles`, `retagTsFile`, `sfExtensionData`, `untagAllTsFiles`, `untagTsFile` from `./src/expando`
  - exports `ShimReferenceTagger` from `./src/reference_tagger`



## `packages/compiler-cli/src/ngtsc/shims/src/`

- `packages/compiler-cli/src/ngtsc/shims/src/adapter.ts` — 236 lines
  - class: `ShimAdapter`
- `packages/compiler-cli/src/ngtsc/shims/src/expando.ts` — 173 lines
  - const: `NgExtension`
  - interface: `NgExtensionData`, `NgExtendedSourceFile`, `NgFileShimData`, `NgFileShimSourceFile`
  - function: `isExtended`, `sfExtensionData`, `isFileShimSourceFile`, `isShim`, `copyFileShimData`, `untagAllTsFiles`, `retagAllTsFiles`, `untagTsFile`, `retagTsFile`
- `packages/compiler-cli/src/ngtsc/shims/src/reference_tagger.ts` — 88 lines
  - class: `ShimReferenceTagger`
- `packages/compiler-cli/src/ngtsc/shims/src/util.ts` — 34 lines
  - function: `makeShimFileName`, `generatedModuleName`



## `packages/compiler-cli/src/ngtsc/shims/test/`

- `packages/compiler-cli/src/ngtsc/shims/test/adapter_spec.ts` — 110 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/shims/test/reference_tagger_spec.ts` — 157 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/shims/test/util.ts` — 35 lines _(test-support)_
  - class: `TestShimGenerator`



## `packages/compiler-cli/src/ngtsc/sourcemaps/`

- `packages/compiler-cli/src/ngtsc/sourcemaps/index.ts` — 12 lines
  - exports `ContentOrigin` from `./src/content_origin`
  - exports `MapAndPath`, `RawSourceMap` from `./src/raw_source_map`
  - exports `Mapping`, `SourceFile` from `./src/source_file`
  - exports `SourceFileLoader` from `./src/source_file_loader`



## `packages/compiler-cli/src/ngtsc/sourcemaps/src/`

- `packages/compiler-cli/src/ngtsc/sourcemaps/src/content_origin.ts` — 35 lines
  - enum: `ContentOrigin`
- `packages/compiler-cli/src/ngtsc/sourcemaps/src/raw_source_map.ts` — 42 lines
  - interface: `RawSourceMap`, `MapAndPath`, `SourceMapInfo`
- `packages/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker.ts` — 60 lines
  - interface: `SegmentMarker`
  - function: `compareSegments`, `offsetSegment`
- `packages/compiler-cli/src/ngtsc/sourcemaps/src/source_file.ts` — 569 lines
  - function: `removeSourceMapComments`, `findLastMappingIndexBefore`, `mergeMappings`, `parseMappings`, `extractOriginalSegments`, `ensureOriginalSegmentLinks`, `computeStartOfLinePositions`
  - class: `SourceFile`
  - interface: `Mapping`
- `packages/compiler-cli/src/ngtsc/sourcemaps/src/source_file_loader.ts` — 293 lines
  - class: `SourceFileLoader`



## `packages/compiler-cli/src/ngtsc/sourcemaps/test/`

- `packages/compiler-cli/src/ngtsc/sourcemaps/test/segment_marker_spec.ts` — 185 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/sourcemaps/test/source_file_loader_spec.ts` — 482 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/sourcemaps/test/source_file_spec.ts` — 956 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/testing/`

- `packages/compiler-cli/src/ngtsc/testing/index.ts` — 13 lines _(test-support)_
  - re-exports * from `./src/utils`
  - re-exports * from `./src/cached_source_files`
  - re-exports * from `./src/compiler_host`
  - re-exports * from `./src/mock_file_loading`
  - re-exports * from `./src/runfile_helpers`



## `packages/compiler-cli/src/ngtsc/testing/fake_common/`

- `packages/compiler-cli/src/ngtsc/testing/fake_common/index.ts` — 146 lines _(test-support)_
  - interface: `NgForOfContext`, `NgIfContext`
  - class: `NgForOf`, `NgIf`, `NgTemplateOutlet`, `DatePipe`, `IndexPipe`, `CommonModule`, `MatCard`



## `packages/compiler-cli/src/ngtsc/testing/fake_common/http/`

- `packages/compiler-cli/src/ngtsc/testing/fake_common/http/index.ts` — 14 lines _(test-support)_
  - type: `HttpResourceRef`
  - function: `httpResource`



## `packages/compiler-cli/src/ngtsc/testing/src/`

- `packages/compiler-cli/src/ngtsc/testing/src/cached_source_files.ts` — 51 lines _(test-support)_
  - function: `getCachedSourceFile`
- `packages/compiler-cli/src/ngtsc/testing/src/compiler_host.ts` — 29 lines _(test-support)_
  - class: `NgtscTestCompilerHost`
- `packages/compiler-cli/src/ngtsc/testing/src/mock_file_loading.ts` — 159 lines _(test-support)_
  - function: `loadTestFiles`, `loadStandardTestFiles`, `loadTsLib`, `loadFakeCommon`, `loadAngularCore`, `loadAngularForms`, `loadTestDirectory`
- `packages/compiler-cli/src/ngtsc/testing/src/runfile_helpers.ts` — 48 lines _(test-support)_
  - function: `getAngularPackagesFromRunfiles`, `resolveFromRunfiles`
- `packages/compiler-cli/src/ngtsc/testing/src/utils.ts` — 181 lines _(test-support)_
  - function: `makeProgram`, `getDeclaration`, `walkForDeclarations`, `isNamedDeclaration`, `expectCompleteReuse`, `getSourceCodeForDiagnostic`, `diagnosticToNode`



## `packages/compiler-cli/src/ngtsc/transform/`

- `packages/compiler-cli/src/ngtsc/transform/index.ts` — 27 lines
  - re-exports * from `./src/api`
  - exports `aliasTransformFactory` from `./src/alias`
  - exports `ClassRecord`, `TraitCompiler` from `./src/compilation`
  - exports `declarationTransformFactory`, `DtsTransformRegistry`, `IvyDeclarationDtsTransform` from `./src/declaration`
  - exports `AnalyzedTrait`, `PendingTrait`, `ResolvedTrait`, `SkippedTrait`, `Trait`, `TraitState` from `./src/trait`
  - exports `ivyTransformFactory` from `./src/transform`
  - exports `signalMetadataTransform` from `./src/implicit_signal_debug_name_transform`



## `packages/compiler-cli/src/ngtsc/transform/jit/`

- `packages/compiler-cli/src/ngtsc/transform/jit/index.ts` — 14 lines
  - exports `angularJitApplicationTransform`, `getDownlevelDecoratorsTransform`, `getInitializerApiJitTransform` from `./src/index`



## `packages/compiler-cli/src/ngtsc/transform/jit/src/`

- `packages/compiler-cli/src/ngtsc/transform/jit/src/downlevel_decorators_transform.ts` — 670 lines
  - function: `getDownlevelDecoratorsTransform`
- `packages/compiler-cli/src/ngtsc/transform/jit/src/index.ts` — 72 lines
  - function: `angularJitApplicationTransform`
  - exports `getDownlevelDecoratorsTransform` from `./downlevel_decorators_transform`
  - exports `getInitializerApiJitTransform` from `./initializer_api_transforms/transform`



## `packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/`

- `packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/input_function.ts` — 100 lines
  - const: `signalInputsTransform`
- `packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/model_function.ts` — 112 lines
  - const: `signalModelTransform`
- `packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/output_function.ts` — 70 lines
  - const: `initializerApiOutputTransform`
- `packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/query_functions.ts` — 102 lines
  - const: `queryFunctionsTransforms`
- `packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/transform.ts` — 150 lines
  - function: `getInitializerApiJitTransform`
- `packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/transform_api.ts` — 61 lines
  - type: `PropertyTransform`
  - function: `createSyntheticAngularCoreDecoratorAccess`, `castAsAny`



## `packages/compiler-cli/src/ngtsc/transform/jit/test/`

- `packages/compiler-cli/src/ngtsc/transform/jit/test/downlevel_decorators_transform_spec.ts` — 966 lines _(spec)_
  - function: `dedent`
- `packages/compiler-cli/src/ngtsc/transform/jit/test/initializer_api_transforms_spec.ts` — 582 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/transform/jit/test/signal_queries_metadata_transform_spec.ts` — 286 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/transform/src/`

- `packages/compiler-cli/src/ngtsc/transform/src/alias.ts` — 37 lines
  - function: `aliasTransformFactory`
- `packages/compiler-cli/src/ngtsc/transform/src/api.ts` — 299 lines
  - enum: `CompilationMode`, `HandlerPrecedence`
  - interface: `DecoratorHandler`, `DetectResult`, `AnalysisOutput`, `CompileResult`, `ResolveResult`, `DtsTransform`
- `packages/compiler-cli/src/ngtsc/transform/src/compilation.ts` — 821 lines
  - interface: `ClassRecord`
  - class: `TraitCompiler`
- `packages/compiler-cli/src/ngtsc/transform/src/declaration.ts` — 202 lines
  - class: `DtsTransformRegistry`, `IvyDeclarationDtsTransform`
  - function: `declarationTransformFactory`
  - interface: `IvyDeclarationField`
- `packages/compiler-cli/src/ngtsc/transform/src/implicit_signal_debug_name_transform.ts` — 513 lines
  - function: `signalMetadataTransform`
- `packages/compiler-cli/src/ngtsc/transform/src/trait.ts` — 275 lines
  - enum: `TraitState`
  - type: `Trait`
  - const: `Trait`
  - interface: `TraitBase`, `PendingTrait`, `SkippedTrait`, `AnalyzedTrait`, `ResolvedTrait`
- `packages/compiler-cli/src/ngtsc/transform/src/transform.ts` — 510 lines
  - function: `ivyTransformFactory`



## `packages/compiler-cli/src/ngtsc/transform/test/`

- `packages/compiler-cli/src/ngtsc/transform/test/compilation_spec.ts` — 586 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/translator/`

- `packages/compiler-cli/src/ngtsc/translator/index.ts` — 42 lines
  - exports `AstFactory`, `BinaryOperator`, `LeadingComment`, `ObjectLiteralProperty`, `SourceMapLocation`, `SourceMapRange`, `TemplateElement`, `TemplateLiteral`, `UnaryOperator`, `VariableDeclarationType` from `./src/api/ast_factory`
  - exports `ImportGenerator`, `ImportRequest` from `./src/api/import_generator`
  - exports `Context` from `./src/context`
  - exports `ImportManager`, `ImportManagerConfig`, `presetImportManagerForceNamespaceImports` from `./src/import_manager/import_manager`
  - exports `ExpressionTranslatorVisitor`, `RecordWrappedNodeFn`, `TranslatorOptions` from `./src/translator`
  - exports `canEmitType`, `TypeEmitter`, `TypeReferenceTranslator` from `./src/type_emitter`
  - exports `translateType` from `./src/type_translator`
  - exports `attachComments`, `createTemplateMiddle`, `createTemplateTail`, `TypeScriptAstFactory` from `./src/typescript_ast_factory`
  - exports `translateExpression`, `translateStatement` from `./src/typescript_translator`



## `packages/compiler-cli/src/ngtsc/translator/src/`

- `packages/compiler-cli/src/ngtsc/translator/src/context.ts` — 25 lines
  - class: `Context`
- `packages/compiler-cli/src/ngtsc/translator/src/translator.ts` — 676 lines
  - type: `RecordWrappedNodeFn`
  - interface: `TranslatorOptions`
  - class: `ExpressionTranslatorVisitor`
- `packages/compiler-cli/src/ngtsc/translator/src/ts_util.ts` — 24 lines
  - function: `tsNumericExpression`
- `packages/compiler-cli/src/ngtsc/translator/src/type_emitter.ts` — 171 lines
  - type: `TypeReferenceTranslator`
  - function: `canEmitType`
  - class: `TypeEmitter`
- `packages/compiler-cli/src/ngtsc/translator/src/type_translator.ts` — 447 lines
  - function: `translateType`
- `packages/compiler-cli/src/ngtsc/translator/src/typescript_ast_factory.ts` — 557 lines
  - class: `TypeScriptAstFactory`
  - function: `createTemplateMiddle`, `createTemplateTail`, `attachComments`
- `packages/compiler-cli/src/ngtsc/translator/src/typescript_translator.ts` — 50 lines
  - function: `translateExpression`, `translateStatement`



## `packages/compiler-cli/src/ngtsc/translator/src/api/`

- `packages/compiler-cli/src/ngtsc/translator/src/api/ast_factory.ts` — 521 lines
  - interface: `AstFactory`, `Parameter`, `SourceMapLocation`, `SourceMapRange`, `ObjectLiteralAssignment`, `ObjectLiteralSpread`, `TemplateLiteral`, `TemplateElement`, `LeadingComment`
  - type: `VariableDeclarationType`, `UnaryOperator`, `BuiltInType`, `AssignmentOperator`, `BinaryOperator`, `ObjectLiteralProperty`
- `packages/compiler-cli/src/ngtsc/translator/src/api/import_generator.ts` — 55 lines
  - interface: `ImportRequest`, `ImportGenerator`



## `packages/compiler-cli/src/ngtsc/translator/src/import_manager/`

- `packages/compiler-cli/src/ngtsc/translator/src/import_manager/check_unique_identifier_name.ts` — 59 lines
  - function: `createGenerateUniqueIdentifierHelper`
- `packages/compiler-cli/src/ngtsc/translator/src/import_manager/import_manager.ts` — 524 lines
  - interface: `ImportManagerConfig`
  - const: `presetImportManagerForceNamespaceImports`
  - type: `ModuleName`
  - class: `ImportManager`
- `packages/compiler-cli/src/ngtsc/translator/src/import_manager/import_typescript_transform.ts` — 149 lines
  - function: `createTsTransformForImportManager`
- `packages/compiler-cli/src/ngtsc/translator/src/import_manager/reuse_generated_imports.ts` — 83 lines
  - interface: `ReuseGeneratedImportsTracker`
  - function: `attemptToReuseGeneratedImports`, `captureGeneratedImport`
- `packages/compiler-cli/src/ngtsc/translator/src/import_manager/reuse_source_file_imports.ts` — 152 lines
  - interface: `ReuseExistingSourceFileImportsTracker`
  - function: `attemptToReuseExistingSourceFileImports`



## `packages/compiler-cli/src/ngtsc/translator/test/`

- `packages/compiler-cli/src/ngtsc/translator/test/import_manager_spec.ts` — 1158 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/translator/test/typescript_ast_factory_spec.ts` — 685 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/`

- `packages/compiler-cli/src/ngtsc/typecheck/index.ts` — 12 lines
  - exports `FileTypeCheckingData`, `TemplateTypeCheckerImpl` from `./src/checker`
  - exports `TypeCheckContextImpl`, `getTemplateDiagnostics` from `./src/context`
  - exports `TypeCheckShimGenerator` from `./src/shim`



## `packages/compiler-cli/src/ngtsc/typecheck/api/`

- `packages/compiler-cli/src/ngtsc/typecheck/api/api.ts` — 165 lines
  - interface: `TypeCheckableDirectiveMeta`, `TemplateDiagnostic`, `TypeCheckBlockMetadata`, `DirectSourceMapping`, `IndirectSourceMapping`, `ExternalTemplateSourceMapping`, `SourceLocation`, `FullSourceMapping`, `GetPotentialAngularMetaOptions`
  - type: `NgTemplateDiagnostic`, `SourceMapping`
- `packages/compiler-cli/src/ngtsc/typecheck/api/checker.ts` — 408 lines
  - interface: `TemplateTypeChecker`
  - enum: `OptimizeFor`
- `packages/compiler-cli/src/ngtsc/typecheck/api/completion.ts` — 94 lines
  - type: `Completion`
  - enum: `CompletionKind`
  - interface: `ReferenceCompletion`, `VariableCompletion`, `LetDeclarationCompletion`, `GlobalCompletion`
- `packages/compiler-cli/src/ngtsc/typecheck/api/context.ts` — 97 lines
  - interface: `TemplateContext`, `HostBindingsContext`, `TypeCheckContext`, `ProgramTypeCheckAdapter`
- `packages/compiler-cli/src/ngtsc/typecheck/api/index.ts` — 15 lines
  - re-exports * from `./api`
  - re-exports * from `./checker`
  - re-exports * from `./completion`
  - re-exports * from `./context`
  - re-exports * from `./scope`
  - re-exports * from `./symbols`
- `packages/compiler-cli/src/ngtsc/typecheck/api/scope.ts` — 158 lines
  - interface: `PotentialImport`, `TsCompletionEntryInfo`, `SymbolReference`, `PotentialDirective`, `PotentialPipe`, `DirectiveModuleExportDetails`, `PotentialDirectiveModuleSpecifierResolver`
  - enum: `PotentialImportKind`, `PotentialImportMode`
- `packages/compiler-cli/src/ngtsc/typecheck/api/symbols.ts` — 339 lines
  - enum: `SymbolKind`
  - type: `Symbol`, `TemplateDeclarationSymbol`, `DirectiveSymbol`
  - interface: `TcbLocation`, `TsNodeSymbolInfo`, `ExpressionSymbol`, `BindingSymbol`, `InputBindingSymbol`, `OutputBindingSymbol`, `ReferenceSymbol`, `VariableSymbol`, `LetDeclarationSymbol`, `ElementSymbol`, `TemplateSymbol`, `SelectorlessComponentSymbol`, `SelectorlessDirectiveSymbol`, `DomBindingSymbol`, `PipeSymbol`, `ClassSymbol`



## `packages/compiler-cli/src/ngtsc/typecheck/diagnostics/`

- `packages/compiler-cli/src/ngtsc/typecheck/diagnostics/index.ts` — 11 lines
  - re-exports * from `./src/diagnostic`
  - re-exports * from `./src/id`



## `packages/compiler-cli/src/ngtsc/typecheck/diagnostics/src/`

- `packages/compiler-cli/src/ngtsc/typecheck/diagnostics/src/diagnostic.ts` — 229 lines
  - function: `makeTemplateDiagnostic`, `setParseTemplateAsSourceFileForTest`, `resetParseTemplateAsSourceFileForTest`, `isTemplateDiagnostic`
- `packages/compiler-cli/src/ngtsc/typecheck/diagnostics/src/id.ts` — 29 lines
  - function: `getTypeCheckId`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/index.ts` — 58 lines
  - const: `ALL_DIAGNOSTIC_FACTORIES`, `SUPPORTED_DIAGNOSTIC_NAMES`
  - exports `ExtendedTemplateCheckerImpl` from `./src/extended_template_checker`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/api/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/api/api.ts` — 159 lines
  - interface: `TemplateCheck`, `TemplateContext`, `TemplateCheckFactory`
  - class: `TemplateCheckWithVisitor`
- `packages/compiler-cli/src/ngtsc/typecheck/extended/api/extended_template_checker.ts` — 22 lines
  - interface: `ExtendedTemplateChecker`
- `packages/compiler-cli/src/ngtsc/typecheck/extended/api/format-extended-error.ts` — 35 lines
  - const: `EXTENDED_ERROR_DETAILS_PAGE_BASE_URL`
  - function: `formatExtendedError`
- `packages/compiler-cli/src/ngtsc/typecheck/extended/api/index.ts` — 12 lines
  - re-exports * from `./api`
  - re-exports * from `./format-extended-error`
  - re-exports * from `./extended_template_checker`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/defer_trigger_misconfiguration/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/defer_trigger_misconfiguration/index.ts` — 255 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/interpolated_signal_not_invoked/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/interpolated_signal_not_invoked/index.ts` — 269 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/invalid_banana_in_box/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/invalid_banana_in_box/index.ts` — 60 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/missing_control_flow_directive/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/missing_control_flow_directive/index.ts` — 106 lines
  - const: `KNOWN_CONTROL_FLOW_DIRECTIVES`, `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/missing_ngforof_let/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/missing_ngforof_let/index.ts` — 68 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/missing_structural_directive/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/missing_structural_directive/index.ts` — 103 lines
  - const: `KNOWN_CONTROL_FLOW_DIRECTIVES`, `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/nullish_coalescing_not_nullable/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/nullish_coalescing_not_nullable/index.ts` — 92 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/optional_chain_not_nullable/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/optional_chain_not_nullable/index.ts` — 121 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/skip_hydration_not_static/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/skip_hydration_not_static/index.ts` — 75 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/suffix_not_supported/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/suffix_not_supported/index.ts` — 61 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/text_attribute_not_binding/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/text_attribute_not_binding/index.ts` — 76 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/uninvoked_function_in_event_binding/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/uninvoked_function_in_event_binding/index.ts` — 133 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/uninvoked_function_in_text_interpolation/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/uninvoked_function_in_text_interpolation/index.ts` — 73 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/uninvoked_track_function/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/uninvoked_track_function/index.ts` — 93 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/unparenthesized_nullish_coalescing/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/unparenthesized_nullish_coalescing/index.ts` — 71 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/unused_let_declaration/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/checks/unused_let_declaration/index.ts` — 96 lines
  - const: `factory`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/src/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/src/extended_template_checker.ts` — 129 lines
  - class: `ExtendedTemplateCheckerImpl`



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/defer_trigger_misconfiguration/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/defer_trigger_misconfiguration/defer_trigger_misconfiguration_spec.ts` — 213 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/interpolated_signal_not_invoked/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/interpolated_signal_not_invoked/interpolated_signal_not_invoked_spec.ts` — 1205 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/invalid_banana_in_box/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/invalid_banana_in_box/invalid_banana_in_box_spec.ts` — 163 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/missing_control_flow_directive/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/missing_control_flow_directive/missing_control_flow_directive_spec.ts` — 184 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/missing_ngforof_let/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/missing_ngforof_let/missing_ngforof_let_spec.ts` — 100 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/missing_structural_directive/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/missing_structural_directive/missing_structural_directive_spec.ts` — 508 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/nullish_coalescing_not_nullable/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/nullish_coalescing_not_nullable/nullish_coalescing_not_nullable_spec.ts` — 406 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/optional_chain_not_nullable/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/optional_chain_not_nullable/optional_chain_not_nullable_spec.ts` — 405 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/skip_hydration_not_static/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/skip_hydration_not_static/skip_hydration_not_static_spec.ts` — 158 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/suffix_not_supported/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/suffix_not_supported/suffix_not_supported_spec.ts` — 170 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/text_attribute_not_binding/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/text_attribute_not_binding/text_attribute_not_binding_spec.ts` — 133 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/uninvoked_function_in_event_binding/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/uninvoked_function_in_event_binding/uninvoked_function_in_event_binding_spec.ts` — 238 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/uninvoked_function_in_text_interpolation/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/uninvoked_function_in_text_interpolation/uninvoked_function_in_text_interpolation_spec.ts` — 164 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/uninvoked_track_function/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/uninvoked_track_function/uninvoked_track_function.spec.ts` — 113 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/unparenthesized_nullish_coalescing/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/unparenthesized_nullish_coalescing/unparenthesized_nullish_coalescing_spec.ts` — 162 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/unused_let_declaration/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/checks/unused_let_declaration/unused_let_declaration_spec.ts` — 122 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/extended/test/format_extended_error/`

- `packages/compiler-cli/src/ngtsc/typecheck/extended/test/format_extended_error/format_extended_error_spec.ts` — 22 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/src/`

- `packages/compiler-cli/src/ngtsc/typecheck/src/checker.ts` — 2257 lines
  - class: `TypeCheckableDirectiveMetaAdapter`, `BoundTargetAdapter`, `TemplateTypeCheckerImpl`
  - interface: `FileTypeCheckingData`
- `packages/compiler-cli/src/ngtsc/typecheck/src/comments.ts` — 212 lines
  - function: `readSpanComment`, `hasIgnoreForDiagnosticsMarker`, `findFirstMatchingNode`, `findAllMatchingNodes`, `hasExpressionIdentifier`, `readDirectiveIdFromComment`
  - interface: `FindOptions`
  - exports `CommentTriviaType`, `ExpressionIdentifier`
- `packages/compiler-cli/src/ngtsc/typecheck/src/completion.ts` — 299 lines
  - class: `CompletionEngine`
- `packages/compiler-cli/src/ngtsc/typecheck/src/context.ts` — 777 lines
  - interface: `ShimTypeCheckingData`, `TypeCheckData`, `PendingFileTypeCheckingData`, `PendingShimData`, `TypeCheckingHost`
  - class: `TypeCheckContextImpl`
  - function: `getTemplateDiagnostics`
- `packages/compiler-cli/src/ngtsc/typecheck/src/diagnostics.ts` — 76 lines
  - function: `shouldReportDiagnostic`, `translateDiagnostic`
- `packages/compiler-cli/src/ngtsc/typecheck/src/dom.ts` — 181 lines
  - const: `REGISTRY`
  - class: `RegistryDomSchemaChecker`
- `packages/compiler-cli/src/ngtsc/typecheck/src/environment.ts` — 120 lines
  - class: `Environment`
- `packages/compiler-cli/src/ngtsc/typecheck/src/line_mappings.ts` — 68 lines
  - function: `getLineAndCharacterFromPosition`, `computeLineStartsMap`
- `packages/compiler-cli/src/ngtsc/typecheck/src/oob.ts` — 736 lines
  - class: `OutOfBandDiagnosticRecorderImpl`
- `packages/compiler-cli/src/ngtsc/typecheck/src/reference_emit_environment.ts` — 81 lines
  - class: `ReferenceEmitEnvironment`
- `packages/compiler-cli/src/ngtsc/typecheck/src/shim.ts` — 51 lines
  - class: `TypeCheckShimGenerator`
- `packages/compiler-cli/src/ngtsc/typecheck/src/source.ts` — 114 lines
  - class: `DirectiveSourceManager`
- `packages/compiler-cli/src/ngtsc/typecheck/src/symbol_util.ts` — 67 lines
  - function: `isSignalReference`
- `packages/compiler-cli/src/ngtsc/typecheck/src/tcb_adapter.ts` — 417 lines
  - function: `adaptTypeCheckBlockMetadata`
- `packages/compiler-cli/src/ngtsc/typecheck/src/tcb_print.ts` — 22 lines
  - function: `tempPrint`
- `packages/compiler-cli/src/ngtsc/typecheck/src/tcb_util.ts` — 349 lines
  - interface: `TypeCheckSourceResolver`
  - enum: `TcbInliningRequirement`
  - function: `requiresInlineTypeCheckBlock`, `getSourceMapping`, `findTypeCheckBlock`, `findSourceLocation`, `ensureTypeCheckFilePreparationImports`, `checkIfGenericTypeBoundsCanBeEmitted`, `findNodeInFile`, `findNodeInFile`, `findNodeInFile`, `generateTcbTypeParameters`
- `packages/compiler-cli/src/ngtsc/typecheck/src/template_symbol_builder.ts` — 846 lines
  - interface: `SymbolDirectiveMeta`, `SymbolBoundTarget`
  - class: `SymbolBuilder`
- `packages/compiler-cli/src/ngtsc/typecheck/src/ts_util.ts` — 94 lines
  - function: `isAccessExpression`, `isDirectiveDeclaration`, `isSymbolAliasOf`, `isClassDeclarationOrName`
- `packages/compiler-cli/src/ngtsc/typecheck/src/type_check_file.ts` — 158 lines
  - const: `TCB_FUNCTION_PREFIX`
  - class: `TypeCheckFile`
- `packages/compiler-cli/src/ngtsc/typecheck/src/type_constructor.ts` — 252 lines
  - function: `generateTypeCtorDeclarationFn`, `generateInlineTypeCtor`, `requiresInlineTypeCtor`
- `packages/compiler-cli/src/ngtsc/typecheck/src/type_parameter_emitter.ts` — 149 lines
  - class: `TypeParameterEmitter`



## `packages/compiler-cli/src/ngtsc/typecheck/template_semantics/api/`

- `packages/compiler-cli/src/ngtsc/typecheck/template_semantics/api/api.ts` — 22 lines
  - interface: `TemplateSemanticsChecker`



## `packages/compiler-cli/src/ngtsc/typecheck/template_semantics/src/`

- `packages/compiler-cli/src/ngtsc/typecheck/template_semantics/src/template_semantics_checker.ts` — 176 lines
  - class: `TemplateSemanticsCheckerImpl`



## `packages/compiler-cli/src/ngtsc/typecheck/test/`

- `packages/compiler-cli/src/ngtsc/typecheck/test/diagnostics_spec.ts` — 1580 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/input_signal_diagnostics_spec.ts` — 433 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/model_signal_diagnostics_spec.ts` — 692 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/output_function_diagnostics.spec.ts` — 86 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/program_spec.ts` — 272 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/span_comments_spec.ts` — 271 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/test_case_helper.ts` — 155 lines _(test-support)_
  - interface: `TestInput`, `TestOutput`, `TestCase`
  - function: `typeCheckDiagnose`, `generateDiagnoseJasmineSpecs`
- `packages/compiler-cli/src/ngtsc/typecheck/test/type_check_block_spec.ts` — 3275 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/type_checker__completion_spec.ts` — 149 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/type_checker__get_symbol_of_template_node_spec.ts` — 3211 lines _(spec)_
  - function: `setup`
- `packages/compiler-cli/src/ngtsc/typecheck/test/type_checker_spec.ts` — 281 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/type_constructor_spec.ts` — 316 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/typecheck/test/type_parameter_emitter_spec.ts` — 480 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/typecheck/testing/`

- `packages/compiler-cli/src/ngtsc/typecheck/testing/index.ts` — 1156 lines _(test-support)_
  - function: `typescriptLibDts`, `angularCoreDtsFiles`, `angularAnimationsDts`, `ngIfDeclaration`, `ngIfDts`, `ngForDeclaration`, `ngForDts`, `ngForTypeCheckTarget`, `tcb`, `setup`, `diagnose`, `getClass`, `getFunction`, `createNgCompilerForFile`
  - const: `ALL_ENABLED_CONFIG`
  - interface: `TestDirective`, `TestPipe`, `TypeCheckingTarget`
  - type: `TestDeclaration`
  - class: `NoopSchemaChecker`, `NoopOobRecorder`



## `packages/compiler-cli/src/ngtsc/util/src/`

- `packages/compiler-cli/src/ngtsc/util/src/path.ts` — 49 lines
  - function: `relativePathBetween`, `normalizeSeparators`, `getProjectRelativePath`
- `packages/compiler-cli/src/ngtsc/util/src/typescript.ts` — 226 lines
  - type: `SymbolWithValueDeclaration`, `SubsetOfKeys`, `RequiredDelegations`
  - function: `isSymbolWithValueDeclaration`, `isDtsPath`, `isNonDeclarationTsPath`, `isFromDtsFile`, `nodeNameForError`, `getSourceFile`, `getSourceFileOrNull`, `getTokenAtPosition`, `identifierOfNode`, `isDeclaration`, `isValueDeclaration`, `isTypeDeclaration`, `isNamedDeclaration`, `isExported`, `getRootDirs`, `nodeDebugInfo`, `resolveModuleName`, `isAssignment`, `toUnredirectedSourceFile`
- `packages/compiler-cli/src/ngtsc/util/src/visitor.ts` — 147 lines
  - type: `VisitListEntryResult`
  - function: `visit`
  - class: `Visitor`



## `packages/compiler-cli/src/ngtsc/util/test/`

- `packages/compiler-cli/src/ngtsc/util/test/typescript_spec.ts` — 31 lines _(spec)_
- `packages/compiler-cli/src/ngtsc/util/test/visitor_spec.ts` — 109 lines _(spec)_



## `packages/compiler-cli/src/ngtsc/validation/`

- `packages/compiler-cli/src/ngtsc/validation/index.ts` — 10 lines
  - exports `SourceFileValidator` from `./src/source_file_validator`



## `packages/compiler-cli/src/ngtsc/validation/src/`

- `packages/compiler-cli/src/ngtsc/validation/src/source_file_validator.ts` — 89 lines
  - class: `SourceFileValidator`



## `packages/compiler-cli/src/ngtsc/validation/src/rules/`

- `packages/compiler-cli/src/ngtsc/validation/src/rules/api.ts` — 28 lines
  - interface: `SourceFileValidatorRule`
- `packages/compiler-cli/src/ngtsc/validation/src/rules/forbidden_required_initializer_invocation_rule.ts` — 130 lines
  - class: `ForbiddenRequiredInitializersInvocationRule`
- `packages/compiler-cli/src/ngtsc/validation/src/rules/initializer_api_usage_rule.ts` — 120 lines
  - class: `InitializerApiUsageRule`
- `packages/compiler-cli/src/ngtsc/validation/src/rules/unused_standalone_imports_rule.ts` — 202 lines
  - class: `UnusedStandaloneImportsRule`



## `packages/compiler-cli/src/ngtsc/xi18n/`

- `packages/compiler-cli/src/ngtsc/xi18n/index.ts` — 10 lines
  - re-exports * from `./src/context`



## `packages/compiler-cli/src/ngtsc/xi18n/src/`

- `packages/compiler-cli/src/ngtsc/xi18n/src/context.ts` — 26 lines
  - interface: `Xi18nContext`



## `packages/compiler-cli/src/transformers/`

- `packages/compiler-cli/src/transformers/api.ts` — 267 lines
  - const: `DEFAULT_ERROR_CODE`, `UNKNOWN_ERROR_CODE`, `SOURCE`
  - function: `isTsDiagnostic`
  - interface: `CompilerOptions`, `CompilerHost`, `CustomTransformers`, `TsEmitArguments`, `TsEmitCallback`, `TsMergeEmitResultsCallback`, `LazyRoute`, `EmitOptions`, `Program`
  - enum: `EmitFlags`
- `packages/compiler-cli/src/transformers/compiler_host.ts` — 33 lines
  - function: `setWrapHostForTest`, `createCompilerHost`
- `packages/compiler-cli/src/transformers/entry_points.ts` — 11 lines
  - exports `createCompilerHost` from `./compiler_host`
  - exports `createProgram` from `./program`
- `packages/compiler-cli/src/transformers/i18n.ts` — 82 lines
  - function: `i18nGetExtension`, `i18nExtract`, `i18nSerialize`
- `packages/compiler-cli/src/transformers/program.ts` — 26 lines
  - function: `createProgram`
- `packages/compiler-cli/src/transformers/util.ts` — 40 lines
  - function: `error`, `createMessageDiagnostic`, `stripComment`



## `packages/compiler-cli/test/`

- `packages/compiler-cli/test/extract_i18n_spec.ts` — 427 lines _(spec)_
- `packages/compiler-cli/test/mocks.ts` — 185 lines _(test-support)_
  - type: `Entry`
  - interface: `Directory`
  - class: `MockAotContext`, `MockCompilerHost`
- `packages/compiler-cli/test/perform_compile_spec.ts` — 302 lines _(spec)_
- `packages/compiler-cli/test/perform_watch_spec.ts` — 297 lines _(spec)_
- `packages/compiler-cli/test/test_support.ts` — 181 lines _(test-support)_
  - function: `makeTempDir`, `setupBazelTo`, `setup`, `expectNoDiagnostics`, `expectNoDiagnosticsInProgram`, `normalizeSeparators`, `stripAnsi`
  - interface: `TestSupport`
- `packages/compiler-cli/test/typescript_support_spec.ts` — 54 lines _(spec)_
- `packages/compiler-cli/test/version_helpers_spec.ts` — 71 lines _(spec)_



## `packages/compiler-cli/test/compliance/`

- `packages/compiler-cli/test/compliance/update_all_goldens.js` — 50 lines _(test-support)_



## `packages/compiler-cli/test/compliance/codegen/`

- `packages/compiler-cli/test/compliance/codegen/codegen_compile_spec.ts` — 96 lines _(spec)_



## `packages/compiler-cli/test/compliance/declaration-only/`

- `packages/compiler-cli/test/compliance/declaration-only/declaration_only_emit_spec.ts` — 59 lines _(spec)_



## `packages/compiler-cli/test/compliance/full/`

- `packages/compiler-cli/test/compliance/full/full_compile_spec.ts` — 24 lines _(spec)_



## `packages/compiler-cli/test/compliance/linked/`

- `packages/compiler-cli/test/compliance/linked/linked_compile_spec.ts` — 140 lines _(spec)_



## `packages/compiler-cli/test/compliance/local/`

- `packages/compiler-cli/test/compliance/local/local_compile_spec.ts` — 27 lines _(spec)_



## `packages/compiler-cli/test/compliance/partial/`

- `packages/compiler-cli/test/compliance/partial/cli.ts` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/partial/generate_golden_partial.ts` — 81 lines _(test-support)_
  - function: `generateGoldenPartial`



## `packages/compiler-cli/test/compliance/test_cases/`

- `packages/compiler-cli/test/compliance/test_cases/list_golden_update_rules.ts` — 19 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/model_inputs/`

- `packages/compiler-cli/test/compliance/test_cases/model_inputs/GOLDEN_PARTIAL.js` — 116 lines _(test-support)_
  - class: `TestDir`, `TestDir`, `TestComp`, `TestComp`, `TestDir`, `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/mixed_model_types.js` — 22 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/mixed_model_types.ts` — 17 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/mixed_model_types_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/model_component_definition.js` — 16 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/model_component_definition.ts` — 10 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/model_component_definition_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/model_directive_definition.js` — 16 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/model_directive_definition.ts` — 9 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/model_inputs/model_directive_definition_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestDir`



## `packages/compiler-cli/test/compliance/test_cases/output_function/`

- `packages/compiler-cli/test/compliance/test_cases/output_function/GOLDEN_PARTIAL.js` — 118 lines _(test-support)_
  - class: `TestDir`, `TestDir`, `TestComp`, `TestComp`, `TestDir`, `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/output_function/mixed_variants.js` — 18 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/output_function/mixed_variants.ts` — 16 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/output_function/mixed_variants_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/output_function/output_in_component.js` — 15 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/output_function/output_in_component.ts` — 14 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/output_function/output_in_component_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/output_function/output_in_directive.js` — 15 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/output_function/output_in_directive.ts` — 13 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/output_function/output_in_directive_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `TestDir`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/GOLDEN_PARTIAL.js` — 323 lines _(test-support)_
  - function: `CustomClassDecorator`, `CustomPropDecorator`, `CustomParamDecorator`, `CustomClassDecorator`, `CustomPropDecorator`, `CustomParamDecorator`, `CustomClassDecorator`, `CustomPropDecorator`, `CustomParamDecorator`, `CustomClassDecorator`, `CustomPropDecorator`, `CustomParamDecorator`, `CustomClassDecorator`, `CustomPropDecorator`, `CustomParamDecorator`, `CustomClassDecorator`, `CustomPropDecorator`, `CustomParamDecorator`
  - class: `BasicInjectable`, `RootInjectable`, `ComponentWithExternalResource`, `BasicInjectable`, `RootInjectable`, `ComponentWithExternalResource`, `MyDir`, `MyDir`, `NoCtor`, `EmptyCtor`, `NoDecorators`, `DerivedInjectable`, `DerivedInjectableWithCtor`, `ParameterizedInjectable`, `NoCtor`, `EmptyCtor`, `NoDecorators`, `CustomInjectable`, `DerivedInjectable`, `DerivedInjectableWithCtor`
  - const: `TOKEN`, `TOKEN`
  - exports `ParameterizedInjectable`
  - exports `CustomInjectable`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/class_decorators.js` — 57 lines _(test-support)_
  - class: `BasicInjectable`, `RootInjectable`, `ComponentWithExternalResource`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/class_decorators.ts` — 24 lines _(test-support)_
  - class: `BasicInjectable`, `RootInjectable`, `ComponentWithExternalResource`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/custom.ts` — 12 lines _(test-support)_
  - function: `CustomClassDecorator`, `CustomPropDecorator`, `CustomParamDecorator`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/custom_isolated.golden.d.ts` — 5 lines _(typings)_
  - function: `CustomClassDecorator`, `CustomPropDecorator`, `CustomParamDecorator`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/parameter_decorators.ts` — 43 lines _(test-support)_
  - const: `TOKEN`
  - class: `ParameterizedInjectable`, `NoCtor`, `EmptyCtor`, `NoDecorators`, `CustomInjectable`, `DerivedInjectable`, `DerivedInjectableWithCtor`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/parameter_decorators_custom.js` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/parameter_decorators_decorators.js` — 31 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/parameter_decorators_derived.js` — 26 lines _(test-support)_
  - class: `DerivedInjectable`, `DerivedInjectableWithCtor`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/parameter_decorators_empty.js` — 12 lines _(test-support)_
  - class: `EmptyCtor`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/parameter_decorators_isolated.golden.d.ts` — 41 lines _(typings)_
  - const: `TOKEN`
  - class: `ParameterizedInjectable`, `NoCtor`, `EmptyCtor`, `NoDecorators`, `CustomInjectable`, `DerivedInjectable`, `DerivedInjectableWithCtor`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/parameter_decorators_no_ctor.js` — 12 lines _(test-support)_
  - class: `NoCtor`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/parameter_decorators_no_decorators.js` — 14 lines _(test-support)_
  - class: `NoDecorators`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/property_decorators.js` — 31 lines _(test-support)_
  - class: `MyDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/property_decorators.ts` — 16 lines _(test-support)_
  - class: `MyDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/class_metadata/property_decorators_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyDir`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/GOLDEN_PARTIAL.js` — 821 lines _(test-support)_
  - class: `HostBindingComp`, `MyModule`, `HostBindingComp`, `MyModule`, `HostBindingComp`, `MyModule`, `HostBindingComp`, `MyModule`, `SomeDirective`, `MyModule`, `SomeDirective`, `MyModule`, `AbstractDirective`, `AbstractDirective`, `SomeComp`, `MyApp`, `MyMod`, `SomeComp`, `MyApp`, `MyMod`, `SomeComp`, `MyApp`, `MyMod`, `SomeComp`, `MyApp`, `MyMod`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `Comp`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestComponent`, `TestModule`, `TestComponent`, `TestModule`, `Main`, `MainStandalone`, `Main`, `MainStandalone`, `AbstractDir`, `AbstractInherited`, `AbstractComp`, `AbstractDir`, `AbstractInherited`, `AbstractComp`, `TestCmp`, `TestCmp`
  - function: `Custom`, `Custom`
  - exports `Comp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/abstract_directive.js` — 34 lines _(test-support)_
  - class: `AbstractDir`, `AbstractInherited`, `AbstractComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/abstract_directive.ts` — 20 lines _(test-support)_
  - class: `AbstractDir`, `AbstractInherited`, `AbstractComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/array_literals_null_vs_empty.js` — 27 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/array_literals_null_vs_empty.ts` — 16 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/array_literals_null_vs_empty_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/constant_array_literals.js` — 25 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/constant_array_literals.ts` — 22 lines _(test-support)_
  - class: `SomeComp`, `MyApp`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/constant_array_literals_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `SomeComp`, `MyApp`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/constant_object_literals.js` — 25 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/constant_object_literals.ts` — 22 lines _(test-support)_
  - class: `SomeComp`, `MyApp`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/constant_object_literals_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `SomeComp`, `MyApp`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/custom_decorator_es5.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/custom_decorator_es5.ts` — 16 lines _(test-support)_
  - function: `Custom`
  - class: `Comp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/debug_info.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/debug_info.local.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/debug_info.ts` — 14 lines _(test-support)_
  - class: `Main`, `MainStandalone`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/debug_info_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `Main`, `MainStandalone`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/export_as.js` — 10 lines _(test-support)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/export_as.ts` — 13 lines _(test-support)_
  - class: `SomeDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/export_as_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `SomeDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/external_library.d.ts` — 17 lines _(typings)_
  - class: `LibModule`
  - exports `LibDirective as ɵangular_packages_forms_forms_a`
  - exports `LibDirective`
  - exports `LibDirective as ɵangular_packages_forms_forms_b`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/forward_referenced_directive.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/forward_referenced_directive.ts` — 23 lines _(test-support)_
  - class: `HostBindingComp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/forward_referenced_directive_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `HostBindingComp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/forward_referenced_pipe.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/forward_referenced_pipe.ts` — 24 lines _(test-support)_
  - class: `HostBindingComp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/forward_referenced_pipe_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `HostBindingComp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/host_animate_enter.js` — 25 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/host_animate_enter.ts` — 13 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/library_exports.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/library_exports.ts` — 22 lines _(test-support)_
  - class: `TestComponent`, `TestModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/library_exports_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `TestComponent`, `TestModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/nested_component_definition.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/nested_component_definition.ts` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/nested_component_definition_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/ng_template_empty_binding.js` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/ng_template_empty_binding.ts` — 13 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/ng_template_empty_binding_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/no_selector.js` — 7 lines _(test-support)_
  - class: `AbstractDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/no_selector.ts` — 6 lines _(test-support)_
  - class: `AbstractDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/no_selector_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `AbstractDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template_with_concatenation.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template_with_concatenation.ts` — 12 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template_with_concatenation_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template_with_substitution.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template_with_substitution.ts` — 12 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/non_literal_template_with_substitution_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/object_literals_null_vs_empty.js` — 27 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/object_literals_null_vs_empty.ts` — 16 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/object_literals_null_vs_empty_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/object_literals_null_vs_function.js` — 26 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/object_literals_null_vs_function.ts` — 19 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/object_literals_null_vs_function_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyApp`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/GOLDEN_PARTIAL.js` — 532 lines _(test-support)_
  - class: `SimpleComponent`, `ComplexComponent`, `MyApp`, `MyModule`, `SimpleComponent`, `ComplexComponent`, `MyApp`, `MyModule`, `SimpleComponent`, `MyApp`, `MyModule`, `SimpleComponent`, `MyApp`, `MyModule`, `SimpleComponent`, `MyApp`, `MyModule`, `SimpleComponent`, `MyApp`, `MyModule`, `MyApp`, `MyApp`, `SimpleComponent`, `SimpleComponent`, `TestComponent`, `TestComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/multiple_wildcards.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/multiple_wildcards.ts` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/multiple_wildcards_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/nested_template.js` — 32 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/nested_template.ts` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/nested_template_consts.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/nested_template_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_content_fallback.js` — 81 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_content_fallback.ts` — 30 lines _(test-support)_
  - class: `TestComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_content_fallback_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `TestComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_content_with_structural_dir.js` — 23 lines _(test-support)_
  - class: `SimpleComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_content_with_structural_dir.ts` — 9 lines _(test-support)_
  - class: `SimpleComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_content_with_structural_dir_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `SimpleComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_attribute.js` — 26 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_attribute.ts` — 10 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_attribute_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_compound_selector.js` — 26 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_compound_selector.ts` — 21 lines _(test-support)_
  - class: `SimpleComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_compound_selector_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `SimpleComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_selector.js` — 24 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_selector.ts` — 20 lines _(test-support)_
  - class: `SimpleComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/ng_project_as_selector_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `SimpleComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/project_as_ng_content.js` — 49 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/project_as_ng_content.ts` — 42 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/project_as_ng_content_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/root_and_nested.js` — 27 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/root_and_nested.ts` — 25 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/root_and_nested_consts.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/root_and_nested_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/root_template.ts` — 30 lines _(test-support)_
  - class: `SimpleComponent`, `ComplexComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/root_template_complex_def.js` — 27 lines _(test-support)_
  - class: `ComplexComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/root_template_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `SimpleComponent`, `ComplexComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/content_projection/root_template_simple_def.js` — 21 lines _(test-support)_
  - class: `SimpleComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/GOLDEN_PARTIAL.js` — 275 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `IfDirective`, `MyComponent`, `MyModule`, `IfDirective`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `LifecycleComp`, `SimpleLayout`, `LifecycleModule`, `LifecycleComp`, `SimpleLayout`, `LifecycleModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/lifecycle_hooks.ts` — 58 lines _(test-support)_
  - class: `LifecycleComp`, `SimpleLayout`, `LifecycleModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/lifecycle_hooks_isolated.golden.d.ts` — 27 lines _(typings)_
  - class: `LifecycleComp`, `SimpleLayout`, `LifecycleModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/lifecycle_hooks_lifecycle_comp_def.js` — 15 lines _(test-support)_
  - class: `LifecycleComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/lifecycle_hooks_simple_layout_def.js` — 24 lines _(test-support)_
  - class: `SimpleLayout`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference.js` — 24 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference.ts` — 13 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference_and_context_variables.ts` — 20 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference_and_context_variables_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference_and_context_variables_template.js` — 39 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference_nested.js` — 60 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference_nested.ts` — 31 lines _(test-support)_
  - class: `IfDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/lifecycle_hooks/local_reference_nested_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `IfDirective`, `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/GOLDEN_PARTIAL.js` — 269 lines _(test-support)_
  - class: `MyPipe`, `MyPurePipe`, `MyApp`, `MyModule`, `MyPipe`, `MyPurePipe`, `MyApp`, `MyModule`, `MyPipe`, `MyApp`, `MyModule`, `MyPipe`, `MyApp`, `MyModule`, `MyPipe`, `MyOtherPipe`, `MyApp`, `MyModule`, `MyPipe`, `MyOtherPipe`, `MyApp`, `MyModule`, `PipeWithoutName`, `PipeWithoutName`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/nameless_pipe.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/nameless_pipe.ts` — 10 lines _(test-support)_
  - class: `PipeWithoutName`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/nameless_pipe_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `PipeWithoutName`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_di_change_detector_ref.ts` — 38 lines _(test-support)_
  - class: `MyPipe`, `MyOtherPipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_di_change_detector_ref_isolated.golden.d.ts` — 26 lines _(typings)_
  - class: `MyPipe`, `MyOtherPipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_di_change_detector_ref_my_other_pipe_def.js` — 11 lines _(test-support)_
  - class: `MyOtherPipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_di_change_detector_ref_my_other_pipe_fac.js` — 9 lines _(test-support)_
  - class: `MyOtherPipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_di_change_detector_ref_my_pipe_def.js` — 11 lines _(test-support)_
  - class: `MyPipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_di_change_detector_ref_my_pipe_fac.js` — 9 lines _(test-support)_
  - class: `MyPipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_invocation.js` — 32 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_invocation.ts` — 26 lines _(test-support)_
  - class: `MyPipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipe_invocation_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `MyPipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipes.ts` — 38 lines _(test-support)_
  - class: `MyPipe`, `MyPurePipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipes_isolated.golden.d.ts` — 26 lines _(typings)_
  - class: `MyPipe`, `MyPurePipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipes_my_app_def.js` — 32 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipes_my_pipe_def.js` — 11 lines _(test-support)_
  - class: `MyPipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipes_my_pipe_fac.js` — 6 lines _(test-support)_
  - class: `MyPipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipes_my_pure_pipe_def.js` — 10 lines _(test-support)_
  - class: `MyPurePipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/pipes/pipes_my_pure_pipe_fac.js` — 6 lines _(test-support)_
  - class: `MyPurePipe`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/GOLDEN_PARTIAL.js` — 980 lines _(test-support)_
  - class: `SomeDirective`, `SomeDirective`, `ViewQueryComponent`, `MyModule`, `ViewQueryComponent`, `MyModule`, `ViewQueryComponent`, `MyApp`, `SomeDirective`, `MyModule`, `ViewQueryComponent`, `MyApp`, `SomeDirective`, `MyModule`, `ViewQueryComponent`, `MyModule`, `ViewQueryComponent`, `MyModule`, `SomeDirective`, `SomeDirective`, `ViewQueryComponent`, `MyModule`, `ViewQueryComponent`, `MyModule`, `SomeDirective`, `SomeDirective`, `ViewQueryComponent`, `MyModule`, `ViewQueryComponent`, `MyModule`, `SomeDirective`, `SomeDirective`, `ContentQueryComponent`, `MyApp`, `MyModule`, `ContentQueryComponent`, `MyApp`, `MyModule`, `ContentQueryComponent`, `MyApp`, `SomeDirective`, `MyModule`, `ContentQueryComponent`, `MyApp`, `SomeDirective`, `MyModule`, `ContentQueryComponent`, `MyModule`, `ContentQueryComponent`, `MyModule`, `SomeDirective`, `SomeDirective`, `ContentQueryComponent`, `MyApp`, `MyModule`, `ContentQueryComponent`, `MyApp`, `MyModule`, `SomeDirective`, `SomeDirective`, `ContentQueryComponent`, `MyModule`, `ContentQueryComponent`, `MyModule`, `SomeDirective`, `SomeDirective`, `ContentQueryComponent`, `MyModule`, `ContentQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_for_directive.js` — 31 lines _(test-support)_
  - class: `ContentQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_for_directive.ts` — 31 lines _(test-support)_
  - class: `ContentQueryComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_for_directive_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `ContentQueryComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_for_local_ref.js` — 21 lines _(test-support)_
  - class: `ContentQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_for_local_ref.ts` — 18 lines _(test-support)_
  - class: `ContentQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_for_local_ref_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `ContentQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_forward_ref.js` — 31 lines _(test-support)_
  - class: `ContentQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_forward_ref.ts` — 38 lines _(test-support)_
  - class: `ContentQueryComponent`, `MyApp`, `SomeDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_forward_ref_isolated.golden.d.ts` — 23 lines _(typings)_
  - class: `ContentQueryComponent`, `MyApp`, `SomeDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_read_token.js` — 23 lines _(test-support)_
  - class: `ContentQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_read_token.ts` — 23 lines _(test-support)_
  - class: `ContentQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/content_query_read_token_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `ContentQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/query_with_emit_distinct_changes_only.js` — 31 lines _(test-support)_
  - class: `ContentQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/query_with_emit_distinct_changes_only.ts` — 23 lines _(test-support)_
  - class: `ContentQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/query_with_emit_distinct_changes_only_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `ContentQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/some.directive.ts` — 9 lines _(test-support)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/some.directive_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/static_content_query.js` — 31 lines _(test-support)_
  - class: `ContentQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/static_content_query.ts` — 32 lines _(test-support)_
  - class: `ContentQueryComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/static_content_query_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `ContentQueryComponent`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/static_view_query.js` — 31 lines _(test-support)_
  - class: `ViewQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/static_view_query.ts` — 20 lines _(test-support)_
  - class: `ViewQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/static_view_query_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `ViewQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_for_directive.js` — 29 lines _(test-support)_
  - class: `ViewQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_for_directive.ts` — 20 lines _(test-support)_
  - class: `ViewQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_for_directive_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `ViewQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_for_local_ref.js` — 21 lines _(test-support)_
  - class: `ViewQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_for_local_ref.ts` — 19 lines _(test-support)_
  - class: `ViewQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_for_local_ref_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `ViewQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_forward_ref.js` — 19 lines _(test-support)_
  - class: `ViewQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_forward_ref.ts` — 36 lines _(test-support)_
  - class: `ViewQueryComponent`, `MyApp`, `SomeDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_forward_ref_isolated.golden.d.ts` — 23 lines _(typings)_
  - class: `ViewQueryComponent`, `MyApp`, `SomeDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_read_token.js` — 23 lines _(test-support)_
  - class: `ViewQueryComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_read_token.ts` — 24 lines _(test-support)_
  - class: `ViewQueryComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/queries/view_query_read_token_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `ViewQueryComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/signals/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/signals/GOLDEN_PARTIAL.js` — 73 lines _(test-support)_
  - class: `OtherCmp`, `SignalCmp`, `OtherCmp`, `SignalCmp`, `SignalDir`, `SignalDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/signals/component.js` — 18 lines _(test-support)_
  - class: `SignalCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/signals/component.ts` — 20 lines _(test-support)_
  - class: `OtherCmp`, `SignalCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/signals/component_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `OtherCmp`, `SignalCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/signals/directive.js` — 9 lines _(test-support)_
  - class: `SignalDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/signals/directive.ts` — 10 lines _(test-support)_
  - class: `SignalDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/signals/directive_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `SignalDir`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/GOLDEN_PARTIAL.js` — 536 lines _(test-support)_
  - class: `OtherCmp`, `StandaloneCmp`, `OtherCmp`, `StandaloneCmp`, `StandaloneDir`, `StandaloneDir`, `StandalonePipe`, `StandalonePipe`, `NotStandaloneDir`, `NotStandalonePipe`, `NotStandaloneStuffModule`, `IndirectDir`, `IndirectPipe`, `SomeModule`, `DirectDir`, `DirectPipe`, `TestCmp`, `NotStandaloneDir`, `NotStandalonePipe`, `NotStandaloneStuffModule`, `IndirectDir`, `IndirectPipe`, `SomeModule`, `DirectDir`, `DirectPipe`, `TestCmp`, `RecursiveComponent`, `RecursiveComponent`, `StandaloneCmp`, `StandaloneDir`, `Module`, `StandaloneCmp`, `StandaloneDir`, `Module`, `TestComponent`, `StandaloneComponent`, `TestComponent`, `StandaloneComponent`, `TestCmp`, `TestCmpChildren`, `TestCmpRenderProps`, `TestCmpConditional`, `TestCmp`, `TestCmpChildren`, `TestCmpRenderProps`, `TestCmpConditional`
  - function: `FancyButton`, `FancyButton`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/component.js` — 17 lines _(test-support)_
  - class: `StandaloneCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/component.local.js` — 17 lines _(test-support)_
  - class: `StandaloneCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/component.ts` — 16 lines _(test-support)_
  - class: `OtherCmp`, `StandaloneCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/component_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `OtherCmp`, `StandaloneCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/directive.js` — 7 lines _(test-support)_
  - class: `StandaloneDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/directive.ts` — 6 lines _(test-support)_
  - class: `StandaloneDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/directive_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `StandaloneDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/foreign_component.js` — 138 lines _(test-support)_
  - class: `TestCmp`, `TestCmpChildren`, `TestCmpRenderProps`, `TestCmpConditional`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/foreign_component.local.js` — 97 lines _(test-support)_
  - class: `TestCmp`, `TestCmpChildren`, `TestCmpRenderProps`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/foreign_component.ts` — 88 lines _(test-support)_
  - function: `FancyButton`
  - class: `TestCmp`, `TestCmpChildren`, `TestCmpRenderProps`, `TestCmpConditional`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/forward_ref.js` — 19 lines _(test-support)_
  - class: `TestComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/forward_ref.ts` — 17 lines _(test-support)_
  - class: `TestComponent`, `StandaloneComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/forward_ref_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `TestComponent`, `StandaloneComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/imports.js` — 1 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/imports.ts` — 71 lines _(test-support)_
  - class: `NotStandaloneDir`, `NotStandalonePipe`, `NotStandaloneStuffModule`, `IndirectDir`, `IndirectPipe`, `SomeModule`, `DirectDir`, `DirectPipe`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/imports_isolated.golden.d.ts` — 45 lines _(typings)_
  - class: `NotStandaloneDir`, `NotStandalonePipe`, `NotStandaloneStuffModule`, `IndirectDir`, `IndirectPipe`, `SomeModule`, `DirectDir`, `DirectPipe`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/module_optimization.js` — 5 lines _(test-support)_
  - class: `Module`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/module_optimization.ts` — 18 lines _(test-support)_
  - class: `StandaloneCmp`, `StandaloneDir`, `Module`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/module_optimization_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `StandaloneCmp`, `StandaloneDir`, `Module`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/pipe.js` — 9 lines _(test-support)_
  - class: `StandalonePipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/pipe.ts` — 9 lines _(test-support)_
  - class: `StandalonePipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/pipe_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `StandalonePipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/recursive.js` — 1 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/recursive.ts` — 10 lines _(test-support)_
  - class: `RecursiveComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/standalone/recursive_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `RecursiveComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/GOLDEN_PARTIAL.js` — 368 lines _(test-support)_
  - class: `ForOfDirective`, `ForOfDirective`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `ForOfDirective`, `ForOfDirective`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `ForOfDirective`, `ForOfDirective`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `ForOfDirective`, `ForOfDirective`
  - interface: `ForOfContext`, `ForOfContext`, `ForOfContext`, `ForOfContext`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/for_of.ts` — 23 lines _(test-support)_
  - interface: `ForOfContext`
  - class: `ForOfDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/for_of_def.js` — 9 lines _(test-support)_
  - class: `ForOfDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/for_of_fac.js` — 12 lines _(test-support)_
  - class: `ForOfDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/for_of_isolated.golden.d.ts` — 20 lines _(typings)_
  - interface: `ForOfContext`
  - class: `ForOfDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/let_variable_and_reference.js` — 38 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/let_variable_and_reference.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/let_variable_and_reference_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/parent_template_variable.js` — 58 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/parent_template_variable.ts` — 29 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/parent_template_variable_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/svg_embedded_view.js` — 35 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/svg_embedded_view.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/template_variables/svg_embedded_view_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/GOLDEN_PARTIAL.js` — 1088 lines _(test-support)_
  - class: `ChildComponent`, `SomeDirective`, `MyComponent`, `MyModule`, `ChildComponent`, `SomeDirective`, `MyComponent`, `MyModule`, `SomeDirective`, `OtherDirective`, `MyModule`, `SomeDirective`, `OtherDirective`, `MyModule`, `SomeComponent`, `MyModule`, `SomeComponent`, `MyModule`, `RouterOutlet`, `EmptyOutletComponent`, `MyModule`, `RouterOutlet`, `EmptyOutletComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `IfDirective`, `MyComponent`, `MyModule`, `IfDirective`, `MyComponent`, `MyModule`, `MyComp`, `MyApp`, `MyModule`, `MyComp`, `MyApp`, `MyModule`, `MyComp`, `MyApp`, `MyModule`, `MyComp`, `MyApp`, `MyModule`, `ArrayComp`, `ArrayComp`, `ObjectComp`, `MyApp`, `MyModule`, `ObjectComp`, `MyApp`, `MyModule`, `ObjectComp`, `ObjectComp`, `NestedComp`, `MyApp`, `MyModule`, `NestedComp`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `UppercasePipe`, `MyApp`, `UppercasePipe`, `MyApp`, `UppercasePipe`, `MyApp`, `UppercasePipe`, `MyApp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literal_spread.js` — 26 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literal_spread.ts` — 19 lines _(test-support)_
  - class: `ArrayComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literal_spread_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `ArrayComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literals.js` — 24 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literals.ts` — 29 lines _(test-support)_
  - class: `MyComp`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literals_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `MyComp`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literals_many.js` — 25 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literals_many.ts` — 47 lines _(test-support)_
  - class: `MyComp`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/array_literals_many_isolated.golden.d.ts` — 26 lines _(typings)_
  - class: `MyComp`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/call_rest.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/call_rest.ts` — 20 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/call_rest_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/complex_selectors.ts` — 20 lines _(test-support)_
  - class: `SomeDirective`, `OtherDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/complex_selectors_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `SomeDirective`, `OtherDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/complex_selectors_other_directive_dir.js` — 9 lines _(test-support)_
  - class: `OtherDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/complex_selectors_other_directive_fac.js` — 6 lines _(test-support)_
  - class: `OtherDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/complex_selectors_some_directive_dir.js` — 10 lines _(test-support)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/complex_selectors_some_directive_fac.js` — 6 lines _(test-support)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives.ts` — 27 lines _(test-support)_
  - class: `ChildComponent`, `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_child_component_def.js` — 17 lines _(test-support)_
  - class: `ChildComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_child_component_def.local.js` — 18 lines _(test-support)_
  - class: `ChildComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_child_component_fac.js` — 6 lines _(test-support)_
  - class: `ChildComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_child_component_fac.local.js` — 6 lines _(test-support)_
  - class: `ChildComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `ChildComponent`, `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_my_component_def.js` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_my_component_def.local.js` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_my_component_fac.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_my_component_fac.local.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_some_directive_dir.js` — 9 lines _(test-support)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_some_directive_dir.local.js` — 9 lines _(test-support)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_some_directive_fac.js` — 6 lines _(test-support)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/directives_some_directive_fac.local.js` — 6 lines _(test-support)_
  - class: `SomeDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/dollar_escape.js` — 21 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/dollar_escape.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/dollar_escape_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/id_selector.js` — 9 lines _(test-support)_
  - class: `SomeComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/id_selector.ts` — 13 lines _(test-support)_
  - class: `SomeComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/id_selector_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `SomeComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/literal_nested_expression.js` — 28 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/literal_nested_expression.ts` — 32 lines _(test-support)_
  - class: `NestedComp`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/literal_nested_expression_isolated.golden.d.ts` — 21 lines _(typings)_
  - class: `NestedComp`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/no_selector.ts` — 20 lines _(test-support)_
  - class: `RouterOutlet`, `EmptyOutletComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/no_selector_def.js` — 18 lines _(test-support)_
  - class: `EmptyOutletComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/no_selector_fac.js` — 6 lines _(test-support)_
  - class: `EmptyOutletComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/no_selector_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `RouterOutlet`, `EmptyOutletComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/number_separator.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/number_separator.ts` — 18 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/number_separator_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/object_literal_spread.js` — 26 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/object_literal_spread.ts` — 19 lines _(test-support)_
  - class: `ObjectComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/object_literal_spread_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `ObjectComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/object_literals.js` — 24 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/object_literals.ts` — 29 lines _(test-support)_
  - class: `ObjectComp`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/object_literals_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `ObjectComp`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_with_global_flag.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_with_global_flag.ts` — 9 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_with_global_flag_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_with_sticky_flag.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_with_sticky_flag.ts` — 9 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_with_sticky_flag_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_without_global_flag.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_without_global_flag.ts` — 9 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/regular_expression_without_global_flag_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/structural_directives.ts` — 23 lines _(test-support)_
  - class: `IfDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/structural_directives_if_directive_def.js` — 9 lines _(test-support)_
  - class: `IfDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/structural_directives_if_directive_fac.js` — 9 lines _(test-support)_
  - class: `IfDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/structural_directives_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `IfDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/structural_directives_my_component_def.js` — 35 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/structural_directives_my_component_fac.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/tagged_template_literals.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/tagged_template_literals.ts` — 24 lines _(test-support)_
  - class: `UppercasePipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/tagged_template_literals_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `UppercasePipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/template_literals.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/template_literals.ts` — 24 lines _(test-support)_
  - class: `UppercasePipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/template_literals_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `UppercasePipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/view_tokens_di.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/view_tokens_di_def.js` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/view_tokens_di_fac.js` — 9 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/components_and_directives/value_composition/view_tokens_di_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/GOLDEN_PARTIAL.js` — 783 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MathCmp`, `InfinityCmp`, `MyComponent`, `MyModule`, `MathCmp`, `InfinityCmp`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `DivDir`, `PipePipe`, `MyComponent`, `MyModule`, `DivDir`, `PipePipe`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/class_style_bindings.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/class_style_bindings_factory.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/class_style_bindings_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/class_style_bindings_template.js` — 19 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/deduplicate_attributes.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/deduplicate_attributes.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/deduplicate_attributes_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/dom.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/dom_factory.js` — 5 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/dom_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/dom_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/empty_ng-container.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/empty_ng-container.ts` — 13 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/empty_ng-container_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/host_binding_pure_functions.js` — 18 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/host_binding_pure_functions.ts` — 39 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/host_binding_pure_functions_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/iframe_attrs.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/iframe_attrs.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/iframe_attrs_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/mathml.js` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/mathml.ts` — 28 lines _(test-support)_
  - class: `MathCmp`, `InfinityCmp`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/mathml_factory.js` — 5 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/mathml_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `MathCmp`, `InfinityCmp`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/mathml_template.js` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/namespace.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/namespace_attr.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/namespace_attr.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/namespace_attr_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/namespace_factory.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/namespace_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/namespace_template.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/ng-container.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/ng-container.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/ng-container_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/properties.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/properties_factory.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/properties_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/properties_template.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/property_pure_functions.ts` — 44 lines _(test-support)_
  - class: `DivDir`, `PipePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/property_pure_functions_factory.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/property_pure_functions_isolated.golden.d.ts` — 31 lines _(typings)_
  - class: `DivDir`, `PipePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/property_pure_functions_template.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/security_sensitive_constant_attributes.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/security_sensitive_constant_attributes.ts` — 25 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/security_sensitive_constant_attributes_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/svg.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/svg_embedded_view.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/svg_embedded_view_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/svg_embedded_view_template.js` — 25 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/svg_factory.js` — 5 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/svg_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/elements/svg_template.js` — 15 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/`

- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/GOLDEN_PARTIAL.js` — 774 lines _(test-support)_
  - class: `BasicModule`, `BasicModule`, `BasicModule`, `BasicModule`, `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`, `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`, `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`, `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`, `Thing`, `BaseService`, `ChildService`, `FooModule`, `Thing`, `BaseService`, `ChildService`, `FooModule`, `A1Component`, `A2Component`, `AModule`, `B1Component`, `B2Component`, `BModule`, `AppModule`, `A1Component`, `A2Component`, `AModule`, `B1Component`, `B2Component`, `BModule`, `AppModule`, `A1Component`, `A2Component`, `AModule`, `B1Component`, `B2Component`, `BModule`, `AppModule`, `A1Component`, `A2Component`, `AModule`, `B1Component`, `B2Component`, `BModule`, `AppModule`, `NoAotModule`, `Service`, `BaseModule`, `BasicModule`, `Service`, `BaseModule`, `BasicModule`, `TestModule`, `ForwardModule`, `TestModule`, `ForwardModule`, `FooModule`, `FooModule`, `FooModule`, `FooModule`, `MyDecl`, `MyImport`, `MyExport`, `MyBootstrap`, `MyModule`, `MyDecl`, `MyImport`, `MyExport`, `MyBootstrap`, `MyModule`
  - function: `provideModule`, `provideModule`
  - exports `NoAotModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/all_options.js` — 24 lines _(test-support)_
  - class: `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/all_options.local.js` — 24 lines _(test-support)_
  - class: `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/all_options.ts` — 34 lines _(test-support)_
  - class: `MyDecl`, `MyImport`, `MyExport`, `MyBootstrap`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/basic_full.js` — 9 lines _(test-support)_
  - class: `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/basic_full.local.js` — 9 lines _(test-support)_
  - class: `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/basic_full.ts` — 6 lines _(test-support)_
  - class: `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/basic_full_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/basic_linked.js` — 10 lines _(test-support)_
  - class: `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/basic_linked.ts` — 6 lines _(test-support)_
  - class: `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/basic_linked_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/declarations.js` — 28 lines _(test-support)_
  - class: `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/declarations.ts` — 29 lines _(test-support)_
  - class: `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/declarations_isolated.golden.d.ts` — 23 lines _(typings)_
  - class: `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/declarations_jit_mode.js` — 31 lines _(test-support)_
  - class: `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/declarations_jit_mode.ts` — 29 lines _(test-support)_
  - class: `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/declarations_jit_mode_isolated.golden.d.ts` — 23 lines _(typings)_
  - class: `FooComponent`, `BarDirective`, `QuxPipe`, `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/empty_fields.js` — 7 lines _(test-support)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/empty_fields.local.js` — 7 lines _(test-support)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/empty_fields.ts` — 10 lines _(test-support)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/empty_fields_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/forward_refs.js` — 18 lines _(test-support)_
  - function: `provideModule`
  - class: `TestModule`, `ForwardModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/forward_refs.local.js` — 16 lines _(test-support)_
  - function: `provideModule`
  - class: `TestModule`, `ForwardModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/forward_refs.ts` — 13 lines _(test-support)_
  - function: `provideModule`
  - class: `TestModule`, `ForwardModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/imports_exports.js` — 40 lines _(test-support)_
  - class: `AModule`, `BModule`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/imports_exports.local.js` — 41 lines _(test-support)_
  - class: `AModule`, `BModule`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/imports_exports.ts` — 42 lines _(test-support)_
  - class: `A1Component`, `A2Component`, `AModule`, `B1Component`, `B2Component`, `BModule`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/imports_exports_isolated.golden.d.ts` — 34 lines _(typings)_
  - class: `A1Component`, `A2Component`, `AModule`, `B1Component`, `B2Component`, `BModule`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/imports_exports_jit_mode.js` — 39 lines _(test-support)_
  - class: `AModule`, `BModule`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/imports_exports_jit_mode.ts` — 42 lines _(test-support)_
  - class: `A1Component`, `A2Component`, `AModule`, `B1Component`, `B2Component`, `BModule`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/imports_exports_jit_mode_isolated.golden.d.ts` — 34 lines _(typings)_
  - class: `A1Component`, `A2Component`, `AModule`, `B1Component`, `B2Component`, `BModule`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/inheritance.js` — 34 lines _(test-support)_
  - class: `BaseModule`, `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/inheritance.local.js` — 36 lines _(test-support)_
  - class: `BaseModule`, `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/inheritance.ts` — 15 lines _(test-support)_
  - class: `Service`, `BaseModule`, `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/inheritance_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `Service`, `BaseModule`, `BasicModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/no_aot.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/no_aot.local.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/no_aot.ts` — 6 lines _(test-support)_
  - class: `NoAotModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/no_aot_isolated.golden.d.ts` — 4 lines _(typings)_
  - class: `NoAotModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/providers.js` — 24 lines _(test-support)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/providers.local.js` — 24 lines _(test-support)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/providers.ts` — 28 lines _(test-support)_
  - class: `Thing`, `BaseService`, `ChildService`, `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/providers_isolated.golden.d.ts` — 22 lines _(typings)_
  - class: `Thing`, `BaseService`, `ChildService`, `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/variable_providers.js` — 7 lines _(test-support)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/variable_providers.local.js` — 7 lines _(test-support)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/variable_providers.ts` — 8 lines _(test-support)_
  - class: `FooModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_compiler_compliance/ng_modules/variable_providers_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `FooModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/GOLDEN_PARTIAL.js` — 263 lines _(test-support)_
  - class: `MyApp`, `TodoComponent`, `TodoModule`, `MyApp`, `TodoComponent`, `TodoModule`, `IdentityPipe`, `Bar`, `MyApp`, `IdentityPipe`, `Bar`, `MyApp`, `IdentityPipe`, `Bar`, `MyApp`, `IdentityPipe`, `Bar`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/operators.ts` — 43 lines _(test-support)_
  - class: `IdentityPipe`, `Bar`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/operators_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `IdentityPipe`, `Bar`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/operators_template.js` — 39 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/operators_template_use_null.js` — 39 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/operators_use_null.ts` — 43 lines _(test-support)_
  - class: `IdentityPipe`, `Bar`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/todo_example.ts` — 27 lines _(test-support)_
  - class: `MyApp`, `TodoComponent`, `TodoModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/todo_example_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `MyApp`, `TodoComponent`, `TodoModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/todo_example_template.js` — 12 lines _(test-support)_
  - class: `MyApp`, `TodoComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/GOLDEN_PARTIAL.js` — 506 lines _(test-support)_
  - class: `MyComponent`, `MyComponent`, `AnyStructuralDirective`, `MyComponent`, `AnyStructuralDirective`, `MyComponent`, `ChildComponent`, `MyComponent`, `ChildComponent`, `MyComponent`, `ChildComponent`, `MyComponent`, `ChildComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `ChildComponent`, `MyComponent`, `ChildComponent`, `MyComponent`, `ChildComponent`, `MyComponent`, `ChildComponent`, `MyComponent`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_binding.ts` — 14 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_binding_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_binding_template.js` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_event_host_bindings.ts` — 24 lines _(test-support)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_event_host_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_event_host_bindings_template.js` — 42 lines _(test-support)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_event_listener.ts` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_event_listener_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_event_listener_template.js` — 10 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_string.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_string_host_bindings.ts` — 20 lines _(test-support)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_string_host_bindings_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_string_host_bindings_template.js` — 42 lines _(test-support)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_string_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_string_template.js` — 19 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_structural_directive.ts` — 18 lines _(test-support)_
  - class: `AnyStructuralDirective`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_structural_directive_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `AnyStructuralDirective`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_enter_with_structural_directive_template.js` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_binding.ts` — 14 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_binding_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_binding_template.js` — 10 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_event_host_bindings.ts` — 24 lines _(test-support)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_event_host_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_event_host_bindings_template.js` — 42 lines _(test-support)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_event_listener.ts` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_event_listener_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_event_listener_template.js` — 10 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_string.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_string_host_bindings.ts` — 20 lines _(test-support)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_string_host_bindings_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_string_host_bindings_template.js` — 42 lines _(test-support)_
  - class: `ChildComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_string_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_leave_with_string_template.js` — 10 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_prefix_with_event_listener.ts` — 14 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_prefix_with_event_listener_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/animate_prefix_with_event_listener_template.js` — 10 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/animations/test.js` — 17 lines _(spec)_
  - class: `MyComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/any/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/any/GOLDEN_PARTIAL.js` — 48 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/any/basic_any_cast.ts` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/any/basic_any_cast_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/any/basic_any_cast_template.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/any/this_any_access.ts` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/any/this_any_access_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/any/this_any_access_template.js` — 2 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/hello_world/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/hello_world/GOLDEN_PARTIAL.js` — 51 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/hello_world/test.js` — 7 lines _(spec)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/hello_world/test.ts` — 26 lines _(spec)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/hello_world/test_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/interpolations/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/interpolations/GOLDEN_PARTIAL.js` — 44 lines _(test-support)_
  - class: `MyApp`, `MyModule`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/interpolations/test.js` — 11 lines _(spec)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/interpolations/test.ts` — 14 lines _(spec)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/interpolations/test_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyApp`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/legacy_animations/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/legacy_animations/GOLDEN_PARTIAL.js` — 86 lines _(test-support)_
  - class: `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/legacy_animations/duplicate_animation_listeners.ts` — 14 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/legacy_animations/duplicate_animation_listeners_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/legacy_animations/duplicate_animation_listeners_template.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/legacy_animations/static_animation_attribute.ts` — 15 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/legacy_animations/static_animation_attribute_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/legacy_animations/static_animation_attribute_template.js` — 9 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/GOLDEN_PARTIAL.js` — 268 lines _(test-support)_
  - class: `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyApp`, `MyApp`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_host.ts` — 25 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_host_bindings.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_host_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_interpolation.ts` — 20 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_interpolation_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_interpolation_template.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_parens.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_parens_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_parens_template.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_parens_template_use_null.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_parens_use_null.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_property.ts` — 20 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_property_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/nullish_coalescing/nullish_coalescing_property_template.js` — 11 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/GOLDEN_PARTIAL.js` — 703 lines _(test-support)_
  - class: `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_deep.ts` — 19 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_deep_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_deep_template.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_deep_template_use_null.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_deep_use_null.ts` — 19 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_non_null.ts` — 23 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_non_null_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_non_null_template.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_non_null_template_use_null.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_non_null_use_null.ts` — 23 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_temporaries.ts` — 25 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_temporaries_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_temporaries_template.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_temporaries_template_use_null.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_access_temporaries_use_null.ts` — 25 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_call.ts` — 29 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_call_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_call_template.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_call_template_use_null.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_call_use_null.ts` — 23 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_keyed_read.ts` — 25 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_keyed_read_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_keyed_read_template.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_keyed_read_template_use_null.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_keyed_read_use_null.ts` — 25 lines _(test-support)_
  - class: `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_method_call.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_method_call.ts` — 19 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_method_call_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_method_call_use_null.js` — 20 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler/safe_access/safe_method_call_use_null.ts` — 19 lines _(test-support)_
  - class: `MyApp`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/GOLDEN_PARTIAL.js` — 793 lines _(test-support)_
  - class: `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestDir`, `TestDir`, `TestDir`, `TestDir`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestPipe`, `TestComp`, `TestPipe`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_defined_let.js` — 44 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_defined_let.ts` — 18 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_defined_let_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_dollar_event.js` — 40 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_dollar_event.ts` — 18 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_dollar_event_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_host_binding.js` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_host_binding.ts` — 12 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_host_binding_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_host_listener.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_host_listener.ts` — 13 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_host_listener_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_inside_pure_value.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_inside_pure_value.ts` — 12 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_inside_pure_value_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_let_nested.js` — 52 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_let_nested.ts` — 18 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_let_nested_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_loop_variables.js` — 42 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_loop_variables.ts` — 19 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_loop_variables_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_nested_listeners.js` — 50 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_nested_listeners.ts` — 22 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_nested_listeners_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_no_context.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_no_context.ts` — 14 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_no_context_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_pipe.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_pipe.ts` — 21 lines _(test-support)_
  - class: `TestPipe`, `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_pipe_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `TestPipe`, `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_pure_return_values.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_pure_return_values.ts` — 11 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_pure_return_values_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_nested_context.js` — 48 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_nested_context.ts` — 19 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_nested_context_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_no_context.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_no_context.ts` — 7 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_no_context_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_top_level_context.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_top_level_context.ts` — 9 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_returning_arrow_function_top_level_context_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access.ts` — 13 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access_nested_views.js` — 50 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access_nested_views.ts` — 17 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access_nested_views_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access_nested_views_use_null.js` — 66 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access_nested_views_use_null.ts` — 17 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access_use_null.js` — 57 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_safe_access_use_null.ts` — 13 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_this_access.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_this_access.ts` — 10 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_this_access_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_top_level_context.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_top_level_context.ts` — 9 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_arrow_functions/arrow_function_top_level_context_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/GOLDEN_PARTIAL.js` — 82 lines _(test-support)_
  - class: `SomeCmp`, `MyCmp`, `SomeCmp`, `MyCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/order_bindings.js` — 33 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/order_bindings.ts` — 41 lines _(test-support)_
  - class: `SomeCmp`, `MyCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/order_bindings_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `SomeCmp`, `MyCmp`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/GOLDEN_PARTIAL.js` — 432 lines _(test-support)_
  - class: `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `CustomEl`, `MyComponent`, `MyMod`, `CustomEl`, `MyComponent`, `MyMod`, `MyComponent`, `MyComponent`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_bindings_with_interpolations.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_bindings_with_interpolations.ts` — 14 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_bindings_with_interpolations_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_for_multiple_elements.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_for_multiple_elements.ts` — 26 lines _(test-support)_
  - class: `CustomEl`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_for_multiple_elements_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `CustomEl`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_mixed.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_mixed.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_mixed_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_with_child_elements.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_with_child_elements.ts` — 14 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_bindings_with_child_elements_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_single_interpolation.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_single_interpolation.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/chain_multiple_single_interpolation_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/duplicate_bindings.js` — 22 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/duplicate_bindings.ts` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/duplicate_bindings_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/exclude_bindings_from_consts.ts` — 24 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/exclude_bindings_from_consts_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/exclude_bindings_from_consts_template.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/interpolated_attributes.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/interpolated_attributes.ts` — 35 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/attribute_bindings/interpolated_attributes_isolated.golden.d.ts` — 22 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/control_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/control_bindings/GOLDEN_PARTIAL.js` — 124 lines _(test-support)_
  - class: `FormField`, `MyComponent`, `FormField`, `MyComponent`, `FormField`, `MyComponent`, `FormField`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/control_bindings/control_bindings.js` — 29 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/control_bindings/control_bindings.ts` — 19 lines _(test-support)_
  - class: `FormField`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/control_bindings/control_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `FormField`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/control_bindings/radio_bindings.js` — 27 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/control_bindings/radio_bindings.ts` — 31 lines _(test-support)_
  - class: `FormField`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/control_bindings/radio_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `FormField`, `MyComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/GOLDEN_PARTIAL.js` — 1262 lines _(test-support)_
  - class: `MyComponent`, `MyComponent`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `HostBindingDir`, `HostBindingDir`, `HostBindingDir`, `HostBindingComp`, `MyModule`, `HostBindingComp`, `MyModule`, `HostAttributeDir`, `MyModule`, `HostAttributeDir`, `MyModule`, `HostAttributeDir`, `MyModule`, `HostAttributeDir`, `MyModule`, `HostAttributeComp`, `HostAttributeDir`, `MyModule`, `HostAttributeComp`, `HostAttributeDir`, `MyModule`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyDirective`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `HostBindingDir`, `HostBindingDir`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `MyModule`, `HostBindingDir`, `MyModule`, `HostBindingLinkDir`, `HostBindingImageDir`, `HostBindingIframeDir`, `HostBindingSvgAnimateDir`, `HostBindingCustomSrcdocDir`, `HostBindingCustomSrcDir`, `HostBindingCustomDataDir`, `HostBindingLinkDir`, `HostBindingImageDir`, `HostBindingIframeDir`, `HostBindingSvgAnimateDir`, `HostBindingCustomSrcdocDir`, `HostBindingCustomSrcDir`, `HostBindingCustomDataDir`, `HostBindingDir`, `HostBindingDir2`, `HostBindingDir`, `HostBindingDir2`, `HostBindingDir`, `HostBindingDir`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent2`, `MyComponent`, `MyComponent2`
  - function: `getBar`, `getBar`
  - const: `BAR_CONST`, `BAR_CONST`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/aria_bindings.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/aria_bindings.ts` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/aria_bindings_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_attribute_bindings_all.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_attribute_bindings_all.ts` — 12 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_attribute_bindings_all_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_attribute_bindings_mixed.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_attribute_bindings_mixed.ts` — 10 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_attribute_bindings_mixed_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_attribute_bindings.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_attribute_bindings.ts` — 12 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_attribute_bindings_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_listeners.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_listeners.ts` — 19 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_listeners_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_property_bindings.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_property_bindings.ts` — 11 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_multiple_property_bindings_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_property_bindings_all.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_property_bindings_all.ts` — 12 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_property_bindings_all_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_property_bindings_mixed.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_property_bindings_mixed.ts` — 10 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_property_bindings_mixed_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_listeners.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_listeners.ts` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_listeners_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_listeners_mixed.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_listeners_mixed.ts` — 24 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_listeners_mixed_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_properties.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_properties.ts` — 12 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/chain_synthetic_properties_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/deceptive_attrs.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/deceptive_attrs.ts` — 26 lines _(test-support)_
  - class: `MyComponent`, `MyComponent2`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/deceptive_attrs_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyComponent`, `MyComponent2`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attribute_bindings.js` — 15 lines _(test-support)_
  - class: `HostAttributeDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attribute_bindings.ts` — 14 lines _(test-support)_
  - class: `HostAttributeDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attribute_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `HostAttributeDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attributes.js` — 10 lines _(test-support)_
  - class: `HostAttributeDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attributes.ts` — 13 lines _(test-support)_
  - class: `HostAttributeDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attributes_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `HostAttributeDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attributes_with_classes_and_styles.js` — 25 lines _(test-support)_
  - class: `HostAttributeComp`, `HostAttributeDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attributes_with_classes_and_styles.ts` — 29 lines _(test-support)_
  - class: `HostAttributeComp`, `HostAttributeDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_attributes_with_classes_and_styles_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `HostAttributeComp`, `HostAttributeDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings.js` — 15 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings.ts` — 14 lines _(test-support)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_primitive_names.js` — 15 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_primitive_names.ts` — 20 lines _(test-support)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_primitive_names_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_quoted_names.js` — 15 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_quoted_names.ts` — 16 lines _(test-support)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_quoted_names_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_with_pure_functions.js` — 22 lines _(test-support)_
  - class: `HostBindingComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_with_pure_functions.ts` — 14 lines _(test-support)_
  - class: `HostBindingComp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_with_pure_functions_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `HostBindingComp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_with_temporaries.js` — 15 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_with_temporaries.ts` — 18 lines _(test-support)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_with_temporaries_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_with_temporaries_use_null.js` — 16 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_bindings_with_temporaries_use_null.ts` — 18 lines _(test-support)_
  - class: `HostBindingDir`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_class_bindings_with_temporaries.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_class_bindings_with_temporaries.ts` — 13 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_class_bindings_with_temporaries_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_dollar_any.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_dollar_any.ts` — 13 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_dollar_any_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_listeners.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_listeners.ts` — 14 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_listeners_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_style_bindings_with_temporaries.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_style_bindings_with_temporaries.ts` — 13 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_style_bindings_with_temporaries_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_with_ts_expression_node.ts` — 19 lines _(test-support)_
  - function: `getBar`
  - const: `BAR_CONST`
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_with_ts_expression_node_isolated.golden.d.ts` — 9 lines _(typings)_
  - function: `getBar`
  - const: `BAR_CONST`
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/host_with_ts_expression_node_template.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/sanitization.js` — 45 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/sanitization.ts` — 82 lines _(test-support)_
  - class: `HostBindingLinkDir`, `HostBindingImageDir`, `HostBindingIframeDir`, `HostBindingSvgAnimateDir`, `HostBindingCustomSrcdocDir`, `HostBindingCustomSrcDir`, `HostBindingCustomDataDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/sanitization_isolated.golden.d.ts` — 39 lines _(typings)_
  - class: `HostBindingLinkDir`, `HostBindingImageDir`, `HostBindingIframeDir`, `HostBindingSvgAnimateDir`, `HostBindingCustomSrcdocDir`, `HostBindingCustomSrcDir`, `HostBindingCustomDataDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/security_sensitive_constant_attributes.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/security_sensitive_constant_attributes.ts` — 16 lines _(test-support)_
  - class: `HostBindingDir`, `HostBindingDir2`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/security_sensitive_constant_attributes_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `HostBindingDir`, `HostBindingDir2`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/security_sensitive_style_bindings.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/security_sensitive_style_bindings.ts` — 11 lines _(test-support)_
  - class: `HostBindingDir`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/host_bindings/security_sensitive_style_bindings_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `HostBindingDir`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/GOLDEN_PARTIAL.js` — 203 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/local_ref_on_host.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/local_ref_on_host.ts` — 20 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/local_ref_on_host_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/local_ref_on_nested.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/local_ref_on_nested.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/local_ref_on_nested_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/no_child_elements.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/no_child_elements.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/no_child_elements_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/property_bindings_and_listeners.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/property_bindings_and_listeners.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/non_bindable_behavior/property_bindings_and_listeners_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/GOLDEN_PARTIAL.js` — 1015 lines _(test-support)_
  - class: `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `AsyncPipe`, `MyComponent`, `MyMod`, `AsyncPipe`, `MyComponent`, `MyMod`, `AsyncPipe`, `MyComponent`, `MyMod`, `AsyncPipe`, `MyComponent`, `MyMod`, `MyComponent`, `MyComponent`, `ButtonDir`, `MyComponent`, `MyMod`, `ButtonDir`, `MyComponent`, `MyMod`, `ButtonDir`, `MyComponent`, `MyMod`, `ButtonDir`, `MyComponent`, `MyMod`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `SpanDir`, `CustomEl`, `MyComponent`, `MyMod`, `SpanDir`, `CustomEl`, `MyComponent`, `MyMod`, `SpanDir`, `MyComponent`, `MyMod`, `SpanDir`, `MyComponent`, `MyMod`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `Dir`, `App`, `Dir`, `App`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/aria_dom_properties.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/aria_dom_properties.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/aria_dom_properties_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/aria_properties.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/aria_properties.ts` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/aria_properties_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/bind.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/bind.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/bind_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_bindings_with_interpolations.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_bindings_with_interpolations.ts` — 20 lines _(test-support)_
  - class: `ButtonDir`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_bindings_with_interpolations_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `ButtonDir`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings.ts` — 11 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_for_multiple_elements.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_for_multiple_elements.ts` — 36 lines _(test-support)_
  - class: `SpanDir`, `CustomEl`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_for_multiple_elements_isolated.golden.d.ts` — 25 lines _(typings)_
  - class: `SpanDir`, `CustomEl`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_mixed.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_mixed.ts` — 19 lines _(test-support)_
  - class: `ButtonDir`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_mixed_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `ButtonDir`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_with_child_elements.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_with_child_elements.ts` — 26 lines _(test-support)_
  - class: `SpanDir`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_multiple_bindings_with_child_elements_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `SpanDir`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_ngtemplate_bindings.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_ngtemplate_bindings.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_ngtemplate_bindings_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_synthetic_bindings.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_synthetic_bindings.ts` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/chain_synthetic_bindings_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/empty_binding.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/empty_binding.ts` — 9 lines _(test-support)_
  - class: `FooCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/interpolated_properties.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/interpolated_properties.ts` — 35 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/interpolated_properties_isolated.golden.d.ts` — 22 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/interpolation.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/interpolation.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/interpolation_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/mixed_one_way_two_way_property_order.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/mixed_one_way_two_way_property_order.ts` — 25 lines _(test-support)_
  - class: `Dir`, `App`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/mixed_one_way_two_way_property_order_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `Dir`, `App`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/sanitization.js` — 37 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/sanitization.ts` — 28 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/sanitization_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/special_property_remapping_dom_property.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/special_property_remapping_dom_property.ts` — 9 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/special_property_remapping_dom_property_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/special_property_remapping_property.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/special_property_remapping_property.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/special_property_remapping_property_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/synthetic_bindings_and_listeners_on_structural.js` — 26 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/synthetic_bindings_and_listeners_on_structural.ts` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/synthetic_bindings_and_listeners_on_structural_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/temporary_variables.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/temporary_variables.ts` — 31 lines _(test-support)_
  - class: `AsyncPipe`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/temporary_variables_isolated.golden.d.ts` — 21 lines _(typings)_
  - class: `AsyncPipe`, `MyComponent`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/temporary_variables_use_null.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/property_bindings/temporary_variables_use_null.ts` — 31 lines _(test-support)_
  - class: `AsyncPipe`, `MyComponent`, `MyMod`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/text_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/text_bindings/GOLDEN_PARTIAL.js` — 46 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/text_bindings/interpolation.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/text_bindings/interpolation.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_bindings/text_bindings/interpolation_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/GOLDEN_PARTIAL.js` — 2936 lines _(test-support)_
  - class: `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `TestPipe`, `MyApp`, `TestPipe`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `TestPipe`, `MyApp`, `TestPipe`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `TestPipe`, `MyApp`, `TestPipe`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `Binding`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_for.ts` — 18 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_for_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_for_template.js` — 25 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if.ts` — 18 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if_else.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if_else_if.ts` — 25 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if_else_if_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if_else_if_template.js` — 39 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if_else_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if_else_template.js` — 27 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_if_template.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_switch.ts` — 32 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_switch_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/basic_switch_template.js` — 40 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/conditional_same_component_names.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/conditional_same_component_names.ts` — 34 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/conditional_same_component_names_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_multiple_with_alias.ts` — 29 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_multiple_with_alias_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_multiple_with_alias_template.js` — 65 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_nested_with_alias.ts` — 28 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_nested_with_alias_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_nested_with_alias_template.js` — 66 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_with_alias.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_with_alias_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_with_alias_template.js` — 35 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_with_same_alias.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_with_same_alias_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/else_if_with_same_alias_template.js` — 35 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/empty_switch.ts` — 16 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/empty_switch_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/empty_switch_template.js` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_aliased_template_variables.ts` — 23 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_aliased_template_variables_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_aliased_template_variables_template.js` — 26 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_both_aliased_and_original_variables.ts` — 30 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_both_aliased_and_original_variables_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_both_aliased_and_original_variables_template.js` — 32 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_data_slots.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_data_slots_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_data_slots_template.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_element_root_node.ts` — 21 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_element_root_node_at_end.ts` — 21 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_element_root_node_at_end_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_element_root_node_at_end_template.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_element_root_node_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_element_root_node_template.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_impure_track_reuse.ts` — 24 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_impure_track_reuse_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_impure_track_reuse_template.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_pure_track_reuse.ts` — 19 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_pure_track_reuse_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_pure_track_reuse_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_root_node.ts` — 21 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_root_node_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_root_node_template.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_nested.ts` — 22 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_nested_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_nested_template.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_only_index.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_only_index_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_only_index_template.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_root.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_root_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_track_method_root_template.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables.ts` — 23 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables_listener.ts` — 19 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables_listener_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables_listener_template.js` — 31 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables_scope.ts` — 25 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables_scope_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables_scope_template.js` — 28 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_template_variables_template.js` — 28 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_field.ts` — 18 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_field_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_field_template.js` — 26 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_index.ts` — 18 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_index_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_index_template.js` — 25 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_temporary_variables.ts` — 13 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_temporary_variables_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_temporary_variables_template.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_temporary_variables_template_use_null.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_by_temporary_variables_use_null.ts` — 13 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_literals.ts` — 18 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_literals_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_track_literals_template.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_variables_expression.ts` — 12 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_variables_expression_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_variables_expression_template.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_with_empty.ts` — 20 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_with_empty_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_with_empty_template.js` — 31 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_with_pipe.ts` — 25 lines _(test-support)_
  - class: `TestPipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_with_pipe_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `TestPipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/for_with_pipe_template.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_element_root_node.ts` — 23 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_element_root_node_at_end.ts` — 23 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_element_root_node_at_end_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_element_root_node_at_end_template.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_element_root_node_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_element_root_node_template.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_nested_alias.ts` — 22 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_nested_alias_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_nested_alias_listeners.ts` — 23 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_nested_alias_listeners_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_nested_alias_listeners_template.js` — 66 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_nested_alias_template.js` — 56 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_template_root_node.ts` — 24 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_template_root_node_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_template_root_node_template.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_with_alias.ts` — 18 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_with_alias_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_with_alias_template.js` — 26 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_with_pipe.ts` — 29 lines _(test-support)_
  - class: `TestPipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_with_pipe_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `TestPipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/if_with_pipe_template.js` — 36 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for.ts` — 25 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_computed_template_variables.ts` — 26 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_computed_template_variables_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_computed_template_variables_template.js` — 57 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_listener_computed_template_variables.ts` — 29 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_listener_computed_template_variables_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_listener_computed_template_variables_template.js` — 96 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_template.js` — 39 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_template_variables.ts` — 26 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_template_variables_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_template_variables_template.js` — 39 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_tracking_function.ts` — 21 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_tracking_function_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_for_tracking_function_template.js` — 48 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_if.ts` — 33 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_if_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_if_template.js` — 67 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_switch.ts` — 37 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_switch_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/nested_switch_template.js` — 58 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_element_root_node.ts` — 27 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_element_root_node_at_end.ts` — 27 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_element_root_node_at_end_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_element_root_node_at_end_template.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_element_root_node_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_element_root_node_template.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_multiple_cases.ts` — 30 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_multiple_cases_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_multiple_cases_template.js` — 36 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_template_root_node.ts` — 27 lines _(test-support)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_template_root_node_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `Binding`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_template_root_node_template.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_with_pipe.ts` — 33 lines _(test-support)_
  - class: `TestPipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_with_pipe_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `TestPipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_with_pipe_template.js` — 20 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_without_default.ts` — 26 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_without_default_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_control_flow/switch_without_default_template.js` — 34 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/GOLDEN_PARTIAL.js` — 1550 lines _(test-support)_
  - class: `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `EagerDep`, `LazyDep`, `LoadingDep`, `MyApp`, `EagerDep`, `LazyDep`, `LoadingDep`, `MyApp`, `LazyDep`, `MyApp`, `LazyDep`, `MyApp`, `EagerDep`, `EagerDep`, `LazyDep`, `LazyDep`, `LoadingDep`, `LoadingDep`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `InnerCmp`, `InnerCmp`, `MyApp`, `MyApp`, `TestPipe`, `MyApp`, `TestPipe`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `CmpA`, `CmpA`, `LocalDep`, `TestCmp`, `LocalDep`, `TestCmp`, `LocalDep`, `TestCmp`, `LocalDep`, `TestCmp`, `DuplicateLazyDep`, `DuplicateLazyDep`, `OtherLazyDep`, `OtherLazyDep`, `MyApp`, `MyApp`, `CounterComponent`, `CounterComponent`, `TestCmp`, `TestCmp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`
  - exports `CounterComponent as MyCounterCmp` from `./counter.component`
  - exports `CounterComponent as MyCounterCmp` from `./counter.component`
  - has a default export
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/basic_deferred.ts` — 16 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/basic_deferred_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/basic_deferred_template.js` — 31 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/counter.component.ts` — 9 lines _(test-support)_
  - class: `CounterComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/counter.component_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `CounterComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_default_deps.ts` — 24 lines _(test-support)_
  - class: `LocalDep`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_default_deps_ext.ts` — 6 lines _(test-support)_
  - has a default export
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_default_deps_ext_isolated.golden.d.ts` — 7 lines _(typings)_
  - has a default export
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_default_deps_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `LocalDep`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_default_deps_template.js` — 44 lines _(test-support)_
  - class: `LocalDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_deps.ts` — 23 lines _(test-support)_
  - class: `LocalDep`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_deps_ext.ts` — 5 lines _(test-support)_
  - class: `CmpA`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_deps_ext_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `CmpA`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_deps_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `LocalDep`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_deps_template.js` — 42 lines _(test-support)_
  - class: `LocalDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_hydrate_order.ts` — 15 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_hydrate_order_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_hydrate_order_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_multiple_hydrate_single_activator.ts` — 14 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_multiple_hydrate_single_activator_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_multiple_hydrate_single_activator_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_nested_hydrate.ts` — 15 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_nested_hydrate_inner.ts` — 13 lines _(test-support)_
  - class: `InnerCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_nested_hydrate_inner_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `InnerCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_nested_hydrate_inner_template.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_nested_hydrate_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_nested_hydrate_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_with_hydrate_triggers.ts` — 24 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_with_hydrate_triggers_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/defer_with_hydrate_triggers_template.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_hydrate_on_viewport_with_options.ts` — 14 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_hydrate_on_viewport_with_options_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_hydrate_on_viewport_with_options_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_import_alias.js` — 74 lines _(test-support)_
  - class: `CounterComponent`, `CounterComponent`, `TestCmp`, `TestCmp`
  - exports `CounterComponent as MyCounterCmp` from `./counter.component`
  - exports `CounterComponent as MyCounterCmp` from `./counter.component`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_import_alias.ts` — 15 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_import_alias_index.ts` — 2 lines _(test-support)_
  - exports `CounterComponent as MyCounterCmp` from `./counter.component`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_import_alias_index_isolated.golden.d.ts` — 3 lines _(typings)_
  - exports `CounterComponent as MyCounterCmp` from `./counter.component`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_import_alias_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_parent_view_trigger.ts` — 21 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_parent_view_trigger_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_parent_view_trigger_template.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_placeholder_trigger.ts` — 21 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_placeholder_trigger_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_placeholder_trigger_template.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_same_view_trigger.ts` — 21 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_same_view_trigger_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_interaction_same_view_trigger_template.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_on_idle_with_timeout.ts` — 15 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_on_idle_with_timeout_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_on_idle_with_timeout_template.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_on_viewport_with_options.ts` — 16 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_on_viewport_with_options_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_on_viewport_with_options_template.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_prefetch_on_viewport_with_options.ts` — 16 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_prefetch_on_viewport_with_options_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_prefetch_on_viewport_with_options_template.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_secondary_blocks.ts` — 24 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_secondary_blocks_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_secondary_blocks_template.js` — 59 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_when_with_pipe.ts` — 27 lines _(test-support)_
  - class: `TestPipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_when_with_pipe_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `TestPipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_when_with_pipe_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_duplicate_external_dep.ts` — 22 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_duplicate_external_dep_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_duplicate_external_dep_lazy.ts` — 5 lines _(test-support)_
  - class: `DuplicateLazyDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_duplicate_external_dep_lazy_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `DuplicateLazyDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_duplicate_external_dep_other.ts` — 5 lines _(test-support)_
  - class: `OtherLazyDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_duplicate_external_dep_other_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `OtherLazyDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_duplicate_external_dep_template.js` — 52 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps.ts` — 22 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps_eager.ts` — 6 lines _(test-support)_
  - class: `EagerDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps_eager_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `EagerDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps_lazy.ts` — 6 lines _(test-support)_
  - class: `LazyDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps_lazy_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `LazyDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps_loading.ts` — 6 lines _(test-support)_
  - class: `LoadingDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps_loading_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `LoadingDep`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_external_deps_template.js` — 57 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_implicit_triggers.ts` — 16 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_implicit_triggers_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_implicit_triggers_template.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_loading_params.ts` — 15 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_loading_params_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_loading_params_template.js` — 30 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_local_deps.ts` — 30 lines _(test-support)_
  - class: `EagerDep`, `LazyDep`, `LoadingDep`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_local_deps_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `EagerDep`, `LazyDep`, `LoadingDep`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_local_deps_template.js` — 24 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_placeholder_params.ts` — 15 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_placeholder_params_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_placeholder_params_template.js` — 31 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_prefetch_triggers.ts` — 27 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_prefetch_triggers_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_prefetch_triggers_template.js` — 20 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_triggers.ts` — 27 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_triggers_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_with_triggers_template.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_without_deps_followed_by_one_with.ts` — 24 lines _(test-support)_
  - class: `LazyDep`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_without_deps_followed_by_one_with_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `LazyDep`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/deferred_without_deps_followed_by_one_with_template.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/lazy_with_blocks.ts` — 38 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/lazy_with_blocks_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_deferred/lazy_with_blocks_template.js` — 56 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/GOLDEN_PARTIAL.js` — 438 lines _(test-support)_
  - class: `MyService`, `MyComponent`, `MyModule`, `MyService`, `MyComponent`, `MyModule`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `Dep`, `Service`, `Mod`, `Dep`, `Service`, `Mod`, `MyPipe`, `MyOtherPipe`, `MyApp`, `MyModule`, `MyPipe`, `MyOtherPipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/component_factory.js` — 9 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/component_factory.ts` — 31 lines _(test-support)_
  - class: `MyService`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/component_factory_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `MyService`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/ctor_overload.ts` — 11 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/ctor_overload_fac.js` — 9 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/ctor_overload_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/ctor_overload_prov.js` — 8 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/injectable_factory.ts` — 9 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/injectable_factory_fac.js` — 9 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/injectable_factory_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/injectable_factory_prov.js` — 8 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/pipe_and_injectable.ts` — 41 lines _(test-support)_
  - class: `MyPipe`, `MyOtherPipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/pipe_and_injectable_isolated.golden.d.ts` — 32 lines _(typings)_
  - class: `MyPipe`, `MyOtherPipe`, `MyApp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/pipe_and_injectable_pipe_first.js` — 11 lines _(test-support)_
  - class: `MyOtherPipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/pipe_and_injectable_pipe_last.js` — 11 lines _(test-support)_
  - class: `MyPipe`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/providedin_forwardref.js` — 19 lines _(test-support)_
  - class: `Service`, `Mod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/providedin_forwardref.ts` — 12 lines _(test-support)_
  - class: `Dep`, `Service`, `Mod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/providedin_forwardref_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `Dep`, `Service`, `Mod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_forwardref.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_forwardref.ts` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_forwardref_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_with_deps.js` — 18 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_with_deps.ts` — 13 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_with_deps_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_without_deps.js` — 9 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_without_deps.ts` — 10 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/useclass_without_deps_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/usefactory_with_deps.js` — 18 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/usefactory_with_deps.ts` — 15 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/usefactory_with_deps_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/usefactory_without_deps.js` — 9 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/usefactory_without_deps.ts` — 12 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_di/di/usefactory_without_deps_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyService`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/GOLDEN_PARTIAL.js` — 305 lines _(test-support)_
  - class: `DirectiveA`, `DirectiveB`, `MyComponent`, `DirectiveA`, `DirectiveB`, `MyComponent`, `DirectiveA`, `DirectiveB`, `DirectiveC`, `MyComponent`, `DirectiveA`, `DirectiveB`, `DirectiveC`, `MyComponent`, `MyComponent`, `DirectiveB`, `DirectiveA`, `MyComponent`, `DirectiveB`, `DirectiveA`, `HostDir`, `MyComponent`, `HostDir`, `MyComponent`, `HostDir`, `MyComponent`, `HostDir`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/basic_host_directives.ts` — 19 lines _(test-support)_
  - class: `DirectiveA`, `DirectiveB`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/basic_host_directives_definition.js` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/basic_host_directives_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `DirectiveA`, `DirectiveB`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/chained_host_directives.ts` — 27 lines _(test-support)_
  - class: `DirectiveA`, `DirectiveB`, `DirectiveC`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/chained_host_directives_definition.js` — 40 lines _(test-support)_
  - class: `DirectiveA`, `DirectiveB`, `DirectiveC`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/chained_host_directives_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `DirectiveA`, `DirectiveB`, `DirectiveC`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/forward_ref_host_directives.ts` — 22 lines _(test-support)_
  - class: `MyComponent`, `DirectiveB`, `DirectiveA`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/forward_ref_host_directives_definition.js` — 41 lines _(test-support)_
  - class: `MyComponent`, `DirectiveB`, `DirectiveA`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/forward_ref_host_directives_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComponent`, `DirectiveB`, `DirectiveA`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/host_directives_with_host_aliases.ts` — 23 lines _(test-support)_
  - class: `HostDir`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/host_directives_with_host_aliases_definition.js` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/host_directives_with_host_aliases_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `HostDir`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/host_directives_with_inputs_outputs.ts` — 23 lines _(test-support)_
  - class: `HostDir`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/host_directives_with_inputs_outputs_definition.js` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/host_directives/host_directives_with_inputs_outputs_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `HostDir`, `MyComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/GOLDEN_PARTIAL.js` — 501 lines _(test-support)_
  - class: `I18nDirective`, `MyComponent`, `MyModule`, `I18nDirective`, `MyComponent`, `MyModule`, `I18nDirective`, `I18nFooDirective`, `FooDirective`, `MyComponent`, `MyModule`, `I18nDirective`, `I18nFooDirective`, `FooDirective`, `MyComponent`, `MyModule`, `SomeDirective`, `MyComponent`, `MyModule`, `SomeDirective`, `MyComponent`, `MyModule`, `DirectiveA`, `MyComponent`, `MyModule`, `DirectiveA`, `MyComponent`, `MyModule`, `DirectiveA`, `MyComponent`, `MyModule`, `DirectiveA`, `MyComponent`, `MyModule`, `SomeDirective`, `MyComponent`, `MyModule`, `SomeDirective`, `MyComponent`, `MyModule`, `SomeDirective`, `MyComponent`, `MyModule`, `SomeDirective`, `MyComponent`, `MyModule`, `SomeDirective`, `MyComponent`, `MyModule`, `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/i18n_attribute_directive.ts` — 20 lines _(test-support)_
  - class: `I18nDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/i18n_attribute_directive_definition.js` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/i18n_attribute_directive_factory.js` — 8 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/i18n_attribute_directive_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `I18nDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/i18n_prefix_attribute_directive.ts` — 34 lines _(test-support)_
  - class: `I18nDirective`, `I18nFooDirective`, `FooDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/i18n_prefix_attribute_directive_definition.js` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/i18n_prefix_attribute_directive_factory.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/i18n_prefix_attribute_directive_isolated.golden.d.ts` — 24 lines _(typings)_
  - class: `I18nDirective`, `I18nFooDirective`, `FooDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_container_directive.ts` — 23 lines _(test-support)_
  - class: `DirectiveA`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_container_directive_definition.js` — 27 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_container_directive_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `DirectiveA`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_template_binding_directive.ts` — 22 lines _(test-support)_
  - class: `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_template_binding_directive_definition.js` — 19 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_template_binding_directive_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_template_directive.ts` — 23 lines _(test-support)_
  - class: `DirectiveA`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_template_directive_definition.js` — 22 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/ng_template_directive_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `DirectiveA`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/output_directive.ts` — 22 lines _(test-support)_
  - class: `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/output_directive_definition.js` — 18 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/output_directive_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/property_binding_directive.ts` — 21 lines _(test-support)_
  - class: `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/property_binding_directive_definition.js` — 19 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/property_binding_directive_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/structural_directive.ts` — 21 lines _(test-support)_
  - class: `SomeDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/structural_directive_definition.js` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_directives/matching/structural_directive_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `SomeDirective`, `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_dom_only/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_dom_only/GOLDEN_PARTIAL.js` — 35 lines _(test-support)_
  - class: `DomOnlyCmp`, `DomOnlyCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_dom_only/dom_only_instruction_set.js` — 15 lines _(test-support)_
  - class: `DomOnlyCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_dom_only/dom_only_instruction_set.local.js` — 15 lines _(test-support)_
  - class: `DomOnlyCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_dom_only/dom_only_instruction_set.ts` — 16 lines _(test-support)_
  - class: `DomOnlyCmp`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/GOLDEN_PARTIAL.js` — 201 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `PipeA`, `PipeB`, `PipeC`, `MyModule`, `MyComponent`, `PipeA`, `PipeB`, `PipeC`, `MyModule`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_and_i18n.js` — 26 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_and_i18n.ts` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_and_i18n_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/multiple_pipes.js` — 32 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/multiple_pipes.ts` — 50 lines _(test-support)_
  - class: `MyComponent`, `PipeA`, `PipeB`, `PipeC`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/multiple_pipes_isolated.golden.d.ts` — 31 lines _(typings)_
  - class: `MyComponent`, `PipeA`, `PipeB`, `PipeC`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/repeated_placeholder.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/repeated_placeholder.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/repeated_placeholder_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/GOLDEN_PARTIAL.js` — 205 lines _(test-support)_
  - class: `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/conditional.ts` — 25 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/conditional_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/conditional_template.js` — 102 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/defer.ts` — 23 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/defer_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/defer_template.js` — 106 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/for.ts` — 19 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/for_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/for_template.js` — 72 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/switch.ts` — 19 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/switch_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/blocks/switch_template.js` — 88 lines _(test-support)_
  - class: `MyApp`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/GOLDEN_PARTIAL.js` — 820 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `UppercasePipe`, `DivDir`, `MyComponent`, `MyModule`, `UppercasePipe`, `DivDir`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/bound_attributes.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/bound_attributes.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/bound_attributes_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/empty_attributes.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/empty_attributes.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/empty_attributes_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/i18n_root_node.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/i18n_root_node_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/i18n_root_node_template.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_basic.ts` — 44 lines _(test-support)_
  - class: `UppercasePipe`, `DivDir`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_basic_isolated.golden.d.ts` — 26 lines _(typings)_
  - class: `UppercasePipe`, `DivDir`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_basic_template.js` — 35 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_complex_expressions.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_complex_expressions_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_complex_expressions_template.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_complex_expressions_template_use_null.js` — 22 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_complex_expressions_use_null.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_nested_context.ts` — 27 lines _(test-support)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_nested_context_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/interpolation_nested_context_template.js` — 34 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/invalid_i18n_meta.js` — 27 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/invalid_i18n_meta.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/invalid_i18n_meta_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/meaning_description.ts` — 22 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/meaning_description_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/meaning_description_template.js` — 72 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_basic.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_basic.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_basic_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_interpolation.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_interpolation_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_interpolation_structural.ts` — 25 lines _(test-support)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_interpolation_structural_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_interpolation_structural_template.js` — 29 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_interpolation_template.js` — 18 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_structural.js` — 28 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_structural.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/ng-template_structural_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/static_attributes.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/static_attributes.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/static_attributes_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/static_attributes_structural.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/static_attributes_structural_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/element_attributes/static_attributes_structural_template.js` — 22 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/es5_support/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/es5_support/GOLDEN_PARTIAL.js` — 50 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
  - exports `MyComponent`
  - exports `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/es5_support/test.js` — 4 lines _(spec)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/es5_support/test.ts` — 13 lines _(spec)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/es5_support/test_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/GOLDEN_PARTIAL.js` — 938 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/attribute_interpolation.js` — 79 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/attribute_interpolation.ts` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/attribute_interpolation_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/bare_icu.js` — 65 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/bare_icu.ts` — 23 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/bare_icu_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/different_contexts.js` — 41 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/different_contexts.ts` — 22 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/different_contexts_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/escape_quotes.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/escape_quotes.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/escape_quotes_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/expressions.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/expressions.ts` — 20 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/expressions_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/html_content.js` — 28 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/html_content.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/html_content_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/icu_only.js` — 18 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/icu_only.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/icu_only_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/icu_with_interpolations.js` — 41 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/icu_with_interpolations.ts` — 24 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/icu_with_interpolations_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/keyword_spaces.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/keyword_spaces.ts` — 20 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/keyword_spaces_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/metadata.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/metadata.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/metadata_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/multiple_icus.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/multiple_icus.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/multiple_icus_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/named_interpolations.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/named_interpolations.ts` — 26 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/named_interpolations_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/nested_icu_in_other_block.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/nested_icu_in_other_block.ts` — 25 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/nested_icu_in_other_block_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/nested_icus.js` — 22 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/nested_icus.ts` — 24 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/nested_icus_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/root_icu_with_elements.js` — 46 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/root_icu_with_elements.ts` — 27 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/root_icu_with_elements_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/shared_placeholder.js` — 119 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/shared_placeholder.ts` — 25 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/shared_placeholder_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/single_icu.js` — 20 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/single_icu.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/icu_logic/single_icu_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/GOLDEN_PARTIAL.js` — 417 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_legacy_non_normalized.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_legacy_non_normalized.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_legacy_non_normalized_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_legacy_normalized.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_legacy_normalized.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_legacy_normalized_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_non_legacy.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_non_legacy_non_normalized.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_non_legacy_non_normalized_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_non_legacy_normalized.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/external_template_non_legacy_normalized_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_legacy.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_legacy_non_normalized.ts` — 27 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_legacy_non_normalized_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_legacy_normalized.ts` — 27 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_legacy_normalized_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_non_legacy.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_non_legacy_non_normalized.ts` — 27 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_non_legacy_non_normalized_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_non_legacy_normalized.ts` — 27 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/line_ending_normalization/inline_template_non_legacy_normalized_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/localize_legacy_message_ids/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/localize_legacy_message_ids/GOLDEN_PARTIAL.js` — 105 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/localize_legacy_message_ids/legacy_disabled.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/localize_legacy_message_ids/legacy_disabled.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/localize_legacy_message_ids/legacy_disabled_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/localize_legacy_message_ids/legacy_enabled.js` — 131 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/localize_legacy_message_ids/legacy_enabled.ts` — 23 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/localize_legacy_message_ids/legacy_enabled_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/namespaces/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/namespaces/GOLDEN_PARTIAL.js` — 115 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/namespaces/foreign_object.js` — 46 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/namespaces/foreign_object.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/namespaces/foreign_object_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/namespaces/namespaced_div.js` — 40 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/namespaces/namespaced_div.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/namespaces/namespaced_div_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/GOLDEN_PARTIAL.js` — 1081 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `AsyncPipe`, `MyComponent`, `MyModule`, `AsyncPipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/backtick_quotes.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/backtick_quotes.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/backtick_quotes_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/bindings_in_content.js` — 38 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/bindings_in_content.ts` — 31 lines _(test-support)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/bindings_in_content_isolated.golden.d.ts` — 22 lines _(typings)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/comments_in_translated_text.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/comments_in_translated_text.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/comments_in_translated_text_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/directives.js` — 34 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/directives.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/directives_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/empty_content.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/empty_content.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/empty_content_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/escape_quotes.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/escape_quotes.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/escape_quotes_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/event_listeners.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/event_listeners_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/event_listeners_template.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/i18n_after_binding.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/i18n_after_binding.ts` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/i18n_after_binding_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/interpolation_complex_expressions.js` — 20 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/interpolation_complex_expressions.ts` — 29 lines _(test-support)_
  - class: `AsyncPipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/interpolation_complex_expressions_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `AsyncPipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/last_elem_inside_i18n_block.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/last_elem_inside_i18n_block_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/last_elem_inside_i18n_block_template.js` — 29 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/named_interpolations.js` — 41 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/named_interpolations.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/named_interpolations_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_elements.js` — 36 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_elements.ts` — 40 lines _(test-support)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_elements_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_elements_with_i18n_attributes.ts` — 40 lines _(test-support)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_elements_with_i18n_attributes_isolated.golden.d.ts` — 22 lines _(typings)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_elements_with_i18n_attributes_template.js` — 49 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_ng-content.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_ng-content.ts` — 14 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_ng-content_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_templates.js` — 39 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_templates.ts` — 25 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_templates_context.js` — 75 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_templates_context.ts` — 35 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_templates_context_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/nested_templates_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/ng_content_with_i18n_children.js` — 32 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/ng_content_with_i18n_children.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/ng_content_with_i18n_children_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/plain_text_messages.js` — 30 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/plain_text_messages.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/plain_text_messages_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/self_closing.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/self_closing_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/nested_nodes/self_closing_template.js` — 45 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/GOLDEN_PARTIAL.js` — 693 lines _(test-support)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `UppercasePipe`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/bare_icus.js` — 35 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/bare_icus.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/bare_icus_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/child_elements.js` — 38 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/child_elements.ts` — 29 lines _(test-support)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/child_elements_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/duplicate_content.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/duplicate_content.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/duplicate_content_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/icus.js` — 35 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/icus.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/icus_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/nested_ng-container_const.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/nested_ng-container_const.ts` — 20 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/nested_templates.js` — 57 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/nested_templates.ts` — 25 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/nested_templates_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/ng-container_with_non_text_content.js` — 20 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/ng-container_with_non_text_content.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/ng-container_with_non_text_content_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/self_closing_ng-container.js` — 18 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/self_closing_ng-container.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/self_closing_ng-container_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/self_closing_tags.js` — 28 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/self_closing_tags.ts` — 20 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/self_closing_tags_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/sibling_i18n_blocks.js` — 33 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/sibling_i18n_blocks.ts` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/sibling_i18n_blocks_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/single_ng-container.js` — 22 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/single_ng-container.ts` — 25 lines _(test-support)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/single_ng-container_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `UppercasePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/single_ng-template.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/single_ng-template.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/single_ng-template_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/structural_directives.js` — 42 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/structural_directives.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/structural_directives_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/structural_directives_same_placeholder.js` — 69 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/structural_directives_same_placeholder.ts` — 24 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/ng-container_ng-template/structural_directives_same_placeholder_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/GOLDEN_PARTIAL.js` — 187 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/icu_only.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/icu_only.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/icu_only_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/ng-container_ng-template.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/ng-container_ng-template.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/ng-container_ng-template_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/styles.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/styles.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/styles_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/text_only_content.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/text_only_content.ts` — 15 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/self-closing_i18n_instructions/text_only_content_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/whitespace_preserving_mode/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/whitespace_preserving_mode/GOLDEN_PARTIAL.js` — 53 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/whitespace_preserving_mode/preserve_inner_content.js` — 41 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/whitespace_preserving_mode/preserve_inner_content.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_i18n/whitespace_preserving_mode/preserve_inner_content_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/GOLDEN_PARTIAL.js` — 175 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyDirective`, `MyModule`, `MyDirective`, `MyModule`, `MyDirective`, `MyModule`, `MyDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/component.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/component_definition.js` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/component_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/directive.ts` — 18 lines _(test-support)_
  - class: `MyDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/directive_definition.js` — 16 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/directive_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/input_transform.ts` — 23 lines _(test-support)_
  - class: `MyDirective`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_input_outputs/input_transform_definition.js` — 12 lines _(test-support)_
  - class: `MyDirective`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/GOLDEN_PARTIAL.js` — 917 lines _(test-support)_
  - class: `MyApp`, `MyApp`, `MyApp`, `MyApp`, `DoublePipe`, `MyApp`, `DoublePipe`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `DoublePipe`, `MyApp`, `DoublePipe`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_for_loop.ts` — 19 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_for_loop_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_for_loop_template.js` — 46 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view.ts` — 17 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view_inside_i18n.ts` — 14 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view_inside_i18n_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view_inside_i18n_template.js` — 59 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view_listener.ts` — 30 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view_listener_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view_listener_template.js` — 80 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_child_view_template.js` — 48 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_i18n.ts` — 14 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_i18n_and_child_view.ts` — 15 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_i18n_and_child_view_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_i18n_and_child_view_template.js` — 63 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_i18n_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_i18n_template.js` — 38 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_listener.ts` — 18 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_listener_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_in_listener_template.js` — 27 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_invalid_forward_ref.ts` — 14 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_invalid_forward_ref_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_invalid_forward_ref_template.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_local_forward_refs.ts` — 11 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_local_forward_refs_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_local_forward_refs_template.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_local_refs.ts` — 13 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_local_refs_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_local_refs_template.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_multiple_optimization.ts` — 16 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_multiple_optimization_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_multiple_optimization_template.js` — 22 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_optimization_child_view.ts` — 19 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_optimization_child_view_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_optimization_child_view_template.js` — 40 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_optimization_listener.ts` — 21 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_optimization_listener_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_optimization_listener_template.js` — 33 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_partial_optimization.ts` — 16 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_partial_optimization_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_partial_optimization_template.js` — 22 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_preceded_by_i18n.ts` — 13 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_preceded_by_i18n_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_preceded_by_i18n_template.js` — 54 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_shared_with_child_view.ts` — 11 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_shared_with_child_view_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_shared_with_child_view_template.js` — 32 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_single_optimization.ts` — 13 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_single_optimization_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_single_optimization_template.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_with_pipe.ts` — 23 lines _(test-support)_
  - class: `DoublePipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_with_pipe_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `DoublePipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_with_pipe_optimization.ts` — 22 lines _(test-support)_
  - class: `DoublePipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_with_pipe_optimization_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `DoublePipe`, `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_with_pipe_optimization_template.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/let_with_pipe_template.js` — 20 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/multiple_let.ts` — 14 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/multiple_let_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/multiple_let_template.js` — 18 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/shadowed_let.ts` — 14 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/shadowed_let_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/shadowed_let_template.js` — 28 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/simple_let.ts` — 12 lines _(test-support)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/simple_let_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyApp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_let/simple_let_template.js` — 16 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/GOLDEN_PARTIAL.js` — 1115 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyApp`, `MyComponent`, `MyModule`, `MyApp`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `SomeComp`, `MyComponent`, `MyModule`, `SomeComp`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `DivDir`, `MyMod`, `DivDir`, `MyMod`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `MyComponent`, `MyComponent`, `Dir`, `App`, `Dir`, `App`, `NgModelDirective`, `TestCmp`, `NgModelDirective`, `TestCmp`, `NgModelDirective`, `TestCmp`, `NgModelDirective`, `TestCmp`, `TestCmp`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/component_listener.ts` — 21 lines _(test-support)_
  - class: `MyApp`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/component_listener_isolated.golden.d.ts` — 17 lines _(typings)_
  - class: `MyApp`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/component_listener_template.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/cross_element_chained_listeners.ts` — 31 lines _(test-support)_
  - class: `SomeComp`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/cross_element_chained_listeners_isolated.golden.d.ts` — 23 lines _(typings)_
  - class: `SomeComp`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/cross_element_chained_listeners_template.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/element_listener.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/element_listener_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/element_listener_template.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/embedded_view_listener_context.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/embedded_view_listener_context_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/embedded_view_listener_context_template.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_arg_host_listener_implicit_meaning.ts` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_arg_host_listener_implicit_meaning_host_bindings.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_arg_host_listener_implicit_meaning_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_arg_listener_implicit_meaning.ts` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_arg_listener_implicit_meaning_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_arg_listener_implicit_meaning_template.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_explicit_access.ts` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_explicit_access_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_explicit_access_template.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_host_explicit_access.ts` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_host_explicit_access_host_bindings.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_host_explicit_access_isolated.golden.d.ts` — 3 lines _(typings)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_in_property_binding.ts` — 22 lines _(test-support)_
  - class: `DivDir`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_in_property_binding_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `DivDir`, `MyMod`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/event_in_property_binding_template.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/has_event_arg_host_listener.ts` — 9 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/has_event_arg_host_listener_host_bindings.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/has_event_arg_host_listener_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/host_listener_property.ts` — 11 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/host_listener_property_host_bindings.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/host_listener_property_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/implicit_receiver_keyed_write_inside_template.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/implicit_receiver_keyed_write_inside_template_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/implicit_receiver_keyed_write_inside_template_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/listener_unused_let.ts` — 13 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/listener_unused_let_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/listener_unused_let_template.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/local_ref_before_listener.js` — 28 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/local_ref_before_listener.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/local_ref_before_listener_factory.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/local_ref_before_listener_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/mixed_one_way_two_way_listener_order.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/mixed_one_way_two_way_listener_order.ts` — 26 lines _(test-support)_
  - class: `Dir`, `App`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/mixed_one_way_two_way_listener_order_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `Dir`, `App`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/multiple_statements.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/multiple_statements.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/multiple_statements_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/nested_two_way.ts` — 24 lines _(test-support)_
  - class: `TestCmp`, `NgModelDirective`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/nested_two_way_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `TestCmp`, `NgModelDirective`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/nested_two_way_template.js` — 18 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/no_event_arg_host_listener.ts` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/no_event_arg_host_listener_host_bindings.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/no_event_arg_host_listener_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/no_event_arg_listener.ts` — 10 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/no_event_arg_listener_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/no_event_arg_listener_template.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/same_element_chained_listeners.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/same_element_chained_listeners_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/same_element_chained_listeners_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/shared_snapshot_listeners.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/shared_snapshot_listeners_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/shared_snapshot_listeners_template.js` — 30 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/simple_two_way.ts` — 24 lines _(test-support)_
  - class: `TestCmp`, `NgModelDirective`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/simple_two_way_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `TestCmp`, `NgModelDirective`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/simple_two_way_template.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/template_chained_listeners.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/template_chained_listeners_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/template_chained_listeners_template.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/two_way_binding_to_signal_loop_variable.ts` — 21 lines _(test-support)_
  - class: `NgModelDirective`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/two_way_binding_to_signal_loop_variable_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `NgModelDirective`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/two_way_binding_to_signal_loop_variable_template.js` — 30 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/two_way_to_any.ts` — 16 lines _(test-support)_
  - class: `NgModelDirective`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/two_way_to_any_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `NgModelDirective`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_listener/two_way_to_any_template.js` — 16 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/GOLDEN_PARTIAL.js` — 187 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_no_providers.ts` — 13 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_no_providers_definition.js` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_no_providers_factory.js` — 6 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_no_providers_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_providers_and_view_providers.ts` — 26 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_providers_and_view_providers_features.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_providers_and_view_providers_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_providers_only.ts` — 25 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_providers_only_features.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_providers_only_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_view_providers_only.ts` — 23 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_view_providers_only_features.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_providers/providers_feature_view_providers_only_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/GOLDEN_PARTIAL.js` — 199 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `WidthDirective`, `WidthDirective`, `MyDir`, `MyAppComp`, `MyModule`, `MyDir`, `MyAppComp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/component_host_binding_slots.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/component_host_binding_slots.ts` — 24 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/component_host_binding_slots_isolated.golden.d.ts` — 21 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/directive_host_binding_slots.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/directive_host_binding_slots.ts` — 16 lines _(test-support)_
  - class: `WidthDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/directive_host_binding_slots_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `WidthDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/host_binding_slots.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/host_binding_slots.ts` — 39 lines _(test-support)_
  - class: `MyDir`, `MyAppComp`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/binding_slots/host_binding_slots_isolated.golden.d.ts` — 21 lines _(typings)_
  - class: `MyDir`, `MyAppComp`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/GOLDEN_PARTIAL.js` — 355 lines _(test-support)_
  - class: `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/break_different_instructions.js` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/break_different_instructions.ts` — 22 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/break_different_instructions_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/break_different_interpolation_instructions.js` — 15 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/break_different_interpolation_instructions.ts` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/break_different_interpolation_instructions_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/class_bindings.js` — 15 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/class_bindings.ts` — 15 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/class_bindings_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/host_bindings.js` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/host_bindings.ts` — 23 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/host_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/interpolations_different_arity.js` — 15 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/interpolations_different_arity.ts` — 18 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/interpolations_different_arity_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/interpolations_equal_arity.js` — 15 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/interpolations_equal_arity.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/interpolations_equal_arity_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/mixed_bindings.js` — 16 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/mixed_bindings.ts` — 21 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/mixed_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/style_bindings.js` — 15 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/style_bindings.ts` — 15 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/chaining/style_bindings_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/GOLDEN_PARTIAL.js` — 335 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding_on_structural.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding_on_structural.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding_on_structural_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding_special_chars.js` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding_special_chars.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_binding_special_chars_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_ordering.js` — 24 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_ordering.ts` — 22 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/class_ordering_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/empty_class_bindings.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/empty_class_bindings.ts` — 13 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/empty_class_bindings_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/host_class_binding_special_chars.js` — 11 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/host_class_binding_special_chars.ts` — 14 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/host_class_binding_special_chars_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/shared_name_with_consts.ts` — 18 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/shared_name_with_consts_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/shared_name_with_consts_template.js` — 32 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/static_bindings.js` — 22 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/static_bindings.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/class_bindings/static_bindings_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/GOLDEN_PARTIAL.js` — 251 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyModule`, `MyModule`, `MyModule`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_host_bindings.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_host_bindings.ts` — 27 lines _(test-support)_
  - class: `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_host_bindings_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_listeners.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_listeners.ts` — 38 lines _(test-support)_
  - class: `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_listeners_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_property_bindings.js` — 23 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_property_bindings.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/animation_property_bindings_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/metadata.js` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/metadata.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/metadata_empty.js` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/metadata_empty.ts` — 13 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/metadata_empty_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_animations/metadata_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/GOLDEN_PARTIAL.js` — 186 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_default.js` — 1 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_default.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_default_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_emulated.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_emulated.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_emulated_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_none.js` — 1 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_none.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_none_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_shadow_dom.js` — 9 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_shadow_dom.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/encapsulation_shadow_dom_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/external_runtime_files.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/external_runtime_files.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/component_styles/external_runtime_files_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/GOLDEN_PARTIAL.js` — 506 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `ClassDirective`, `WidthDirective`, `HeightDirective`, `MyComponent`, `MyModule`, `ClassDirective`, `WidthDirective`, `HeightDirective`, `MyComponent`, `MyModule`, `MyDirective`, `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/class_interpolation.js` — 25 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/class_interpolation.ts` — 33 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/class_interpolation_isolated.golden.d.ts` — 21 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/css_custom_properties.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/css_custom_properties.ts` — 15 lines _(test-support)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/css_custom_properties_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyDirective`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/important.ts` — 26 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/important_host.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/important_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/important_template.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/multiple_directives.js` — 25 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/multiple_directives.ts` — 42 lines _(test-support)_
  - class: `ClassDirective`, `WidthDirective`, `HeightDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/multiple_directives_isolated.golden.d.ts` — 31 lines _(typings)_
  - class: `ClassDirective`, `WidthDirective`, `HeightDirective`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/multiple_dynamic.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/multiple_dynamic.ts` — 25 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/multiple_dynamic_isolated.golden.d.ts` — 21 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/static_and_dynamic.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/static_and_dynamic.ts` — 22 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/static_and_dynamic_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/style_interpolation.js` — 25 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/style_interpolation.ts` — 33 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/host_bindings/style_interpolation_isolated.golden.d.ts` — 21 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/GOLDEN_PARTIAL.js` — 247 lines _(test-support)_
  - class: `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/class_interpolations.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/class_interpolations.ts` — 29 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/class_interpolations_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_important.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_important.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_important_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_sanitizer.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_sanitizer.ts` — 19 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_sanitizer_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_suffixed.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_suffixed.ts` — 13 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_binding_suffixed_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_properties.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_properties.ts` — 29 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/interpolations/style_properties_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/invalid/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/invalid/GOLDEN_PARTIAL.js` — 29 lines _(test-support)_
  - class: `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/invalid/individual_class_binding.ts` — 10 lines _(test-support)_
  - class: `MyComponent`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/GOLDEN_PARTIAL.js` — 277 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `StylePipe`, `ClassPipe`, `MyComponent`, `MyModule`, `StylePipe`, `ClassPipe`, `MyComponent`, `MyModule`, `PipePipe`, `MyComponent`, `MyModule`, `PipePipe`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/mixed.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/mixed.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/mixed_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/multiple_elements.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/multiple_elements.ts` — 23 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/multiple_elements_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/pipe_bindings.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/pipe_bindings.ts` — 32 lines _(test-support)_
  - class: `StylePipe`, `ClassPipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/pipe_bindings_isolated.golden.d.ts` — 30 lines _(typings)_
  - class: `StylePipe`, `ClassPipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/pipe_bindings_slots.js` — 20 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/pipe_bindings_slots.ts` — 34 lines _(test-support)_
  - class: `PipePipe`, `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/mixed_style_and_class/pipe_bindings_slots_isolated.golden.d.ts` — 23 lines _(typings)_
  - class: `PipePipe`, `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/GOLDEN_PARTIAL.js` — 431 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponentWithInterpolation`, `MyComponentWithMuchosInterpolation`, `MyComponentWithoutInterpolation`, `MyModule`, `MyComponentWithInterpolation`, `MyComponentWithMuchosInterpolation`, `MyComponentWithoutInterpolation`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/binding_slots.js` — 34 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/binding_slots.ts` — 45 lines _(test-support)_
  - class: `MyComponentWithInterpolation`, `MyComponentWithMuchosInterpolation`, `MyComponentWithoutInterpolation`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/binding_slots_interpolations.js` — 24 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/binding_slots_interpolations.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/binding_slots_interpolations_isolated.golden.d.ts` — 21 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/binding_slots_isolated.golden.d.ts` — 24 lines _(typings)_
  - class: `MyComponentWithInterpolation`, `MyComponentWithMuchosInterpolation`, `MyComponentWithoutInterpolation`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/colon_style.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/colon_style.ts` — 11 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/colon_style_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/css_custom_properties.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/css_custom_properties.ts` — 17 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/css_custom_properties_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/duplicate_style_bindings.js` — 2 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/duplicate_style_bindings.ts` — 11 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/duplicate_style_bindings_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/empty_style_bindings.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/empty_style_bindings.ts` — 13 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/empty_style_bindings_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_binding.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_binding.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_binding_isolated.golden.d.ts` — 19 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_binding_suffixed.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_binding_suffixed.ts` — 13 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_binding_suffixed_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_ordering.js` — 20 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_ordering.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_styling/style_bindings/style_ordering_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`



## `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/`

- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/GOLDEN_PARTIAL.js` — 1890 lines _(test-support)_
  - class: `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `TestComp`, `TestComp`, `TestComp`, `TestComp`, `AComponent`, `AModule`, `BComponent`, `BModule`, `AComponent`, `AModule`, `BComponent`, `BModule`, `AComponent`, `BComponent`, `AModule`, `AComponent`, `BComponent`, `AModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `MyComp`, `App`, `MyModule`, `MyComp`, `App`, `MyModule`, `MyComp`, `App`, `MyModule`, `MyComp`, `App`, `MyModule`, `MyComponent`, `MyComponent`, `OtherComponent`, `MyComponent`, `OtherComponent`, `MyComponent`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyModule`, `MyComponent`, `MyComponent`, `MyComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/attr_binding_on_structural_inside_ng_template.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/attr_binding_on_structural_inside_ng_template.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/attr_binding_on_structural_inside_ng_template_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/create_many_elements.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/create_many_elements.ts` — 271 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/create_many_elements_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/implicit_receiver.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/implicit_receiver_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/implicit_receiver_template.js` — 22 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_template_context.js` — 66 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_template_context.ts` — 27 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_template_context_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_template_context_many_bindings.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_template_context_many_bindings_isolated.golden.d.ts` — 14 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_template_context_many_bindings_template.js` — 28 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_ternary_operation.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_ternary_operation_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_ternary_operation_template.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_ternary_operation_template_use_null.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/nested_ternary_operation_use_null.ts` — 16 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_context_in_attr_binding.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_context_in_attr_binding.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_context_in_attr_binding_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_context_variables.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_context_variables_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_context_variables_template.js` — 24 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_parent_context_variables.js` — 42 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_parent_context_variables.ts` — 19 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_for_parent_context_variables_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template.ts` — 17 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_bindings.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_bindings.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_bindings_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_implicit.js` — 19 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_implicit.ts` — 12 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_implicit_isolated.golden.d.ts` — 10 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_interpolated_prop.ts` — 19 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_interpolated_prop_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_interpolated_prop_template.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_interpolated_prop_with_structural_directive.ts` — 19 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_interpolated_prop_with_structural_directive_inner_template.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_interpolated_prop_with_structural_directive_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_interpolated_prop_with_structural_directive_outer_template.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_local_ref.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_local_ref_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_local_ref_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_output.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_output_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_output_template.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/ng_template_template.js` — 18 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_structural_directives.js` — 72 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_structural_directives.ts` — 23 lines _(test-support)_
  - class: `OtherComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_structural_directives_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `OtherComponent`, `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_tags.ts` — 20 lines _(test-support)_
  - class: `MyComp`, `App`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_tags_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComp`, `App`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_tags_nested.ts` — 22 lines _(test-support)_
  - class: `MyComp`, `App`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_tags_nested_isolated.golden.d.ts` — 16 lines _(typings)_
  - class: `MyComp`, `App`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_tags_nested_template.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/self_closing_tags_template.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/shorthand_property_declaration.ts` — 18 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/shorthand_property_declaration_isolated.golden.d.ts` — 15 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/shorthand_property_declaration_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_binding_pipe.ts` — 14 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_binding_pipe_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_binding_pipe_template.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_context_skip.ts` — 21 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_context_skip_isolated.golden.d.ts` — 12 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_context_skip_template.js` — 50 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_with_structural_directive.js` — 23 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_with_structural_directive.ts` — 11 lines _(test-support)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/template_with_structural_directive_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyComponent`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_listener_function_names.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_listener_function_names.ts` — 23 lines _(test-support)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_listener_function_names_isolated.golden.d.ts` — 13 lines _(typings)_
  - class: `MyComponent`, `MyModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_template_function_names.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_template_function_names.ts` — 54 lines _(test-support)_
  - class: `AComponent`, `AModule`, `BComponent`, `BModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_template_function_names_isolated.golden.d.ts` — 25 lines _(typings)_
  - class: `AComponent`, `AModule`, `BComponent`, `BModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_template_function_names_ng_content.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_template_function_names_ng_content.ts` — 28 lines _(test-support)_
  - class: `AComponent`, `BComponent`, `AModule`
- `packages/compiler-cli/test/compliance/test_cases/r3_view_compiler_template/unique_template_function_names_ng_content_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `AComponent`, `BComponent`, `AModule`



## `packages/compiler-cli/test/compliance/test_cases/service_decorator/`

- `packages/compiler-cli/test/compliance/test_cases/service_decorator/GOLDEN_PARTIAL.js` — 124 lines _(test-support)_
  - class: `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`, `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/basic_service.js` — 9 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/basic_service.ts` — 5 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/basic_service_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/explicitly_provided_service.js` — 10 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/explicitly_provided_service.ts` — 5 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/explicitly_provided_service_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/generic_service.js` — 7 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/generic_service.ts` — 13 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/generic_service_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/not_provided_service.js` — 10 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/not_provided_service.ts` — 5 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/not_provided_service_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/service_with_factory.js` — 12 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/service_with_factory.ts` — 7 lines _(test-support)_
  - class: `MyService`
- `packages/compiler-cli/test/compliance/test_cases/service_decorator/service_with_factory_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `MyService`



## `packages/compiler-cli/test/compliance/test_cases/signal_inputs/`

- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/GOLDEN_PARTIAL.js` — 172 lines _(test-support)_
  - class: `TestDir`, `TestDir`, `TestComp`, `TestComp`, `TestDir`, `TestDir`, `TestDir`, `TestDir`, `TestDir`, `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/complex_transform_functions.js` — 14 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/complex_transform_functions.ts` — 20 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/complex_transform_functions_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/input_component_definition.js` — 12 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/input_component_definition.ts` — 10 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/input_component_definition_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/input_directive_definition.js` — 12 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/input_directive_definition.ts` — 9 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/input_directive_definition_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/mixed_input_types.js` — 16 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/mixed_input_types.ts` — 20 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/transform_not_captured.js` — 11 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/transform_not_captured.ts` — 14 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_inputs/transform_not_captured_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestDir`



## `packages/compiler-cli/test/compliance/test_cases/signal_queries/`

- `packages/compiler-cli/test/compliance/test_cases/signal_queries/GOLDEN_PARTIAL.js` — 129 lines _(test-support)_
  - class: `SomeToken`, `TestDir`, `SomeToken`, `TestDir`, `TestComp`, `TestComp`, `TestDir`, `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/mixed_query_variants.js` — 28 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/mixed_query_variants.ts` — 12 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/mixed_query_variants_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/query_in_component.js` — 22 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/query_in_component.ts` — 12 lines _(test-support)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/query_in_component_isolated.golden.d.ts` — 11 lines _(typings)_
  - class: `TestComp`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/query_in_directive.js` — 31 lines _(test-support)_
  - class: `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/query_in_directive.ts` — 21 lines _(test-support)_
  - class: `SomeToken`, `TestDir`
- `packages/compiler-cli/test/compliance/test_cases/signal_queries/query_in_directive_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `SomeToken`, `TestDir`



## `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/`

- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/GOLDEN_PARTIAL.js` — 163 lines _(test-support)_
  - class: `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/escaped_chars.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/escaped_chars.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/escaped_chars_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/escaped_chars_partial.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/external_template.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/external_template.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/external_template_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/external_template_partial.js` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/extra_root_dir.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/extra_root_dir.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/extra_root_dir_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/external_templates/extra_root_dir_partial.js` — 14 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/`

- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/GOLDEN_PARTIAL.js` — 2053 lines _(test-support)_
  - class: `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `PercentPipe`, `AppModule`, `TestCmp`, `PercentPipe`, `AppModule`, `TestCmp`, `PercentPipe`, `AppModule`, `TestCmp`, `PercentPipe`, `AppModule`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `NgModelDirective`, `AppModule`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`, `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/escape_sequences.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/escape_sequences.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/escape_sequences_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/escape_sequences_partial.js` — 3 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_container_tag.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_container_tag.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_container_tag_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_container_tag_partial.js` — 15 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_element_whitespace.js` — 21 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_element_whitespace.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_element_whitespace_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_element_whitespace_partial.js` — 22 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_interpolation_whitespace.ts` — 12 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_interpolation_whitespace_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_interpolation_whitespace_partial_template.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_interpolation_whitespace_template.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_placeholder.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_placeholder.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_placeholder_entities.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_placeholder_entities.ts` — 12 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_placeholder_entities_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_placeholder_entities_partial.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_placeholder_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_placeholder_partial.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_simple.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_simple.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_simple_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/i18n_message_simple_partial.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_class.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_class.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_class_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_class_partial.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_complex.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_complex.ts` — 12 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_complex_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_complex_partial.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_longhand.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_longhand.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_longhand_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_longhand_partial.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_simple.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_simple.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_simple_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/input_binding_simple_partial.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_basic.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_basic.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_basic_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_basic_partial.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_complex.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_complex.ts` — 12 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_complex_isolated.golden.d.ts` — 9 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_complex_partial.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_properties.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_properties.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_properties_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_properties_partial.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_with_pipe.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_with_pipe.ts` — 21 lines _(test-support)_
  - class: `TestCmp`, `PercentPipe`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_with_pipe_isolated.golden.d.ts` — 18 lines _(typings)_
  - class: `TestCmp`, `PercentPipe`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/interpolation_with_pipe_partial.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_for_simple.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_for_simple.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_for_simple_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_for_simple_partial.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_for_templated.js` — 4 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_for_templated.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_for_templated_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_for_templated_partial.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_if_simple.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_if_simple.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_if_simple_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_if_simple_partial.js` — 13 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_if_templated.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_if_templated.ts` — 14 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_if_templated_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/ng_if_templated_partial.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_complex.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_complex.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_complex_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_complex_partial.js` — 14 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_longhand.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_longhand.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_longhand_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_longhand_partial.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_simple.js` — 9 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_simple.ts` — 11 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_simple_isolated.golden.d.ts` — 8 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/output_binding_simple_partial.js` — 10 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/projection.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/projection.ts` — 12 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/projection_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/projection_partial.js` — 12 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/simple_element.js` — 5 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/simple_element.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/simple_element_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/simple_element_partial.js` — 6 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/two_way_binding_longhand.js` — 7 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/two_way_binding_longhand.ts` — 24 lines _(test-support)_
  - class: `TestCmp`, `NgModelDirective`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/two_way_binding_longhand_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `TestCmp`, `NgModelDirective`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/two_way_binding_longhand_partial.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/two_way_binding_simple.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/two_way_binding_simple.ts` — 24 lines _(test-support)_
  - class: `TestCmp`, `NgModelDirective`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/two_way_binding_simple_isolated.golden.d.ts` — 20 lines _(typings)_
  - class: `TestCmp`, `NgModelDirective`, `AppModule`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/two_way_binding_simple_partial.js` — 8 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/update_mode.js` — 16 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/update_mode.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/update_mode_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/update_mode_partial.js` — 17 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/void_element.js` — 1 lines _(test-support)_
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/void_element.ts` — 10 lines _(test-support)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/void_element_isolated.golden.d.ts` — 7 lines _(typings)_
  - class: `TestCmp`
- `packages/compiler-cli/test/compliance/test_cases/source_mapping/inline_templates/void_element_partial.js` — 2 lines _(test-support)_



## `packages/compiler-cli/test/compliance/test_helpers/`

- `packages/compiler-cli/test/compliance/test_helpers/check_errors.ts` — 43 lines _(test-support)_
  - function: `checkErrors`, `checkNoUnexpectedErrors`
- `packages/compiler-cli/test/compliance/test_helpers/check_expectations.ts` — 120 lines _(test-support)_
  - function: `checkExpectations`
- `packages/compiler-cli/test/compliance/test_helpers/check_type_declarations.ts` — 63 lines _(test-support)_
  - function: `checkTypeDeclarations`, `getReferenceFileForTypeDeclaration`
- `packages/compiler-cli/test/compliance/test_helpers/compile_test.ts` — 186 lines _(spec)_
  - function: `initMockTestFileSystem`, `compileTest`, `getRootDirectory`, `getBuildOutputDirectory`, `getOptions`
  - interface: `CompileResult`
- `packages/compiler-cli/test/compliance/test_helpers/di_checks.ts` — 19 lines _(test-support)_
  - function: `verifyUniqueFactory`
- `packages/compiler-cli/test/compliance/test_helpers/expect_emit.ts` — 270 lines _(test-support)_
  - function: `expectEmit`
- `packages/compiler-cli/test/compliance/test_helpers/expected_file_macros.ts` — 260 lines _(test-support)_
  - function: `replaceMacros`
- `packages/compiler-cli/test/compliance/test_helpers/function_checks.ts` — 37 lines _(test-support)_
  - function: `verifyUniqueFunctions`
- `packages/compiler-cli/test/compliance/test_helpers/get_compliance_tests.ts` — 360 lines _(test-support)_
  - const: `fs`
  - function*: `getAllComplianceTests`, `getComplianceTests`
  - interface: `ComplianceTest`, `Expectation`, `ExpectedFile`, `ExpectedError`, `TestCaseJson`
  - type: `CompilationMode`, `ExtraCheck`, `ConfigOptions`
- `packages/compiler-cli/test/compliance/test_helpers/golden_partials.ts` — 52 lines _(test-support)_
  - function: `renderGoldenPartial`, `parseGoldenPartial`
  - interface: `PartiallyCompiledFile`
- `packages/compiler-cli/test/compliance/test_helpers/i18n_checks.ts` — 95 lines _(test-support)_
  - function: `verifyPlaceholdersIntegrity`, `verifyUniqueConsts`
- `packages/compiler-cli/test/compliance/test_helpers/i18n_helpers.ts` — 161 lines _(test-support)_
  - function: `resetMessageIndex`, `i18nMsg`, `i18nMsgWithPostprocess`, `i18nIcuMsg`
  - interface: `Options`
  - type: `Placeholder`
- `packages/compiler-cli/test/compliance/test_helpers/sourcemap_helpers.ts` — 245 lines _(test-support)_
  - function: `stripAndCheckMappings`
- `packages/compiler-cli/test/compliance/test_helpers/test_runner.ts` — 111 lines _(test-support)_
  - function: `runTests`



## `packages/compiler-cli/test/ngtsc/`

- `packages/compiler-cli/test/ngtsc/attach_source_location_spec.ts` — 141 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/authoring_diagnostics_spec.ts` — 471 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/authoring_inputs_spec.ts` — 539 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/authoring_models_spec.ts` — 761 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/authoring_outputs_spec.ts` — 350 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/authoring_queries_spec.ts` — 536 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/component_indexing_spec.ts` — 205 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/debug_transform_spec.ts` — 3256 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/declaration_only_emission_spec.ts` — 918 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/defer_spec.ts` — 1747 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/env.ts` — 497 lines _(test-support)_
  - type: `TsConfigOptions`
  - class: `NgtscTestEnvironment`
- `packages/compiler-cli/test/ngtsc/extended_template_diagnostics_spec.ts` — 260 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/hmr_spec.ts` — 1024 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/host_bindings_type_check_spec.ts` — 989 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/host_directives_spec.ts` — 1488 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/imports_spec.ts` — 180 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/incremental_error_spec.ts` — 750 lines _(spec)_
  - function: `writeTwoComponentSystem`, `writeRandomFile`
- `packages/compiler-cli/test/ngtsc/incremental_semantic_changes_spec.ts` — 2900 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/incremental_spec.ts` — 1376 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/incremental_typecheck_spec.ts` — 2091 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/local_compilation_spec.ts` — 2671 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/ls_typecheck_helpers_spec.ts` — 228 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/monorepo_spec.ts` — 135 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/ngtsc_spec.ts` — 11770 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/scope_spec.ts` — 709 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/selectorless_spec.ts` — 1190 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/service_spec.ts` — 128 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/signal_forms_spec.ts` — 793 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/sourcemap_utils.ts` — 115 lines _(test-support)_
  - interface: `SegmentMapping`
  - function: `getMappedSegments`
- `packages/compiler-cli/test/ngtsc/standalone_spec.ts` — 1196 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/template_mapping_spec.ts` — 903 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/template_typecheck_spec.ts` — 9340 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/util.ts` — 19 lines _(test-support)_
  - function: `getClass`
- `packages/compiler-cli/test/ngtsc/xi18n_spec.ts` — 370 lines _(spec)_



## `packages/compiler-cli/test/ngtsc/doc_extraction/`

- `packages/compiler-cli/test/ngtsc/doc_extraction/class_doc_extraction_spec.ts` — 768 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/common_doc_extraction_spec.ts` — 41 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/constant_doc_extraction_spec.ts` — 173 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/decorator_doc_extraction_spec.ts` — 228 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/directive_doc_extraction_spec.ts` — 443 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/doc_extraction_filtering_spec.ts` — 75 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/docs_private_spec.ts` — 74 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/enum_doc_extraction_spec.ts` — 98 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/function_doc_extraction_spec.ts` — 214 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/import_extractor_spec.ts` — 111 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/initializer_api_extraction_spec.ts` — 221 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/interface_doc_extraction_spec.ts` — 410 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/jsdoc_extraction_spec.ts` — 435 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/ng_module_doc_extraction_spec.ts` — 51 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/pipe_doc_extraction_spec.ts` — 82 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/reexport_docs_extraction_spec.ts` — 131 lines _(spec)_
- `packages/compiler-cli/test/ngtsc/doc_extraction/type_alias_doc_extraction_spec.ts` — 89 lines _(spec)_

