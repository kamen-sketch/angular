<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/compiler/`

291 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/compiler/`

- `packages/compiler/compiler.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/compiler/index.ts` — 15 lines
  - re-exports * from `./compiler`
- `packages/compiler/public_api.ts` — 17 lines
  - re-exports * from `./src/compiler`



## `packages/compiler/src/`

- `packages/compiler/src/chars.ts` — 105 lines
  - const: `$EOF`, `$BSPACE`, `$TAB`, `$LF`, `$VTAB`, `$FF`, `$CR`, `$SPACE`, `$BANG`, `$DQ`, `$HASH`, `$$`, `$PERCENT`, `$AMPERSAND`, `$SQ`, `$LPAREN`, `$RPAREN`, `$STAR`, `$PLUS`, `$COMMA`, `$MINUS`, `$PERIOD`, `$SLASH`, `$COLON`, `$SEMICOLON`, `$LT`, `$EQ`, `$GT`, `$QUESTION`, `$0`, `$7`, `$9`, `$A`, `$E`, `$F`, `$X`, `$Z`, `$LBRACKET`, `$BACKSLASH`, `$RBRACKET`, `$CARET`, `$_`, `$a`, `$b`, `$e`, `$f`, `$n`, `$r`, `$t`, `$u`, `$v`, `$x`, `$z`, `$LBRACE`, `$BAR`, `$RBRACE`, `$NBSP`, `$PIPE`, `$TILDA`, `$AT`, `$BT`
  - function: `isWhitespace`, `isDigit`, `isAsciiLetter`, `isAsciiHexDigit`, `isNewLine`, `isOctalDigit`, `isQuote`
- `packages/compiler/src/combined_visitor.ts` — 165 lines
  - class: `CombinedRecursiveAstVisitor`
- `packages/compiler/src/compiler.ts` — 285 lines
  - re-exports * from `./expression_parser/ast`
  - re-exports * from `./expression_parser/lexer`
  - re-exports * from `./expression_parser/parser`
  - re-exports * from `./i18n/index`
  - re-exports * from `./injectable_compiler_2`
  - re-exports * from `./service_compiler`
  - re-exports * from `./ml_parser/ast`
  - re-exports * from `./ml_parser/html_parser`
  - re-exports * from `./ml_parser/html_tags`
  - re-exports * from `./ml_parser/tags`
  - re-exports * from `./ml_parser/xml_parser`
  - re-exports * from `./parse_util`
  - re-exports * from `./render3/partial/api`
  - re-exports * from `./render3/view/api`
  - re-exports * from `./render3/view/t2_api`
  - re-exports * from `./render3/view/t2_binder`
  - re-exports * from `./resource_loader`
  - re-exports * from `./schema/dom_element_schema_registry`
  - re-exports * from `./schema/element_schema_registry`
  - re-exports * from `./directive_matching`
  - re-exports * from `./version`
  - re-exports * from `./typecheck/api`
  - re-exports * from `./typecheck/host_bindings`
  - exports `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`, `SchemaMetadata` from `./core`
  - exports `core`
  - exports `CompilerConfig`, `preserveWhitespacesDefault` from `./config`
  - exports `ConstantPool` from `./constant_pool`
  - exports `ChangeDetectionStrategy`, `emitDistinctChangesOnlyDefaultValue`, `ViewEncapsulation` from `./core`
  - exports `publishFacade` from `./jit_compiler_facade`
  - exports `ClassPropertyMapping`, `ClassPropertyName`, `InputOrOutput`, `BindingPropertyName` from `./property_mapping`
  - exports `MatchSource` from `./render3/view/t2_api`
  - exports `LexerRange` from `./ml_parser/lexer`
  - exports `ParseTreeResult`, `TreeError` from `./ml_parser/parser`
  - exports `TokenType as LexerTokenType` from `./ml_parser/tokens`
  - exports `EmitterVisitorContext`, `AbstractEmitterVisitor` from `./output/abstract_emitter`
  - exports `ArrayType`, `ArrowFunctionExpr`, `BinaryOperator`, `BinaryOperatorExpr`, `BuiltinType`, `BuiltinTypeName`, `CommaExpr`, `ConditionalExpr`, `DeclareFunctionStmt`, `DeclareVarStmt`, `DYNAMIC_TYPE`, `DynamicImportExpr`, `Expression`, `ExpressionStatement`, `ExpressionType`, `ExpressionVisitor`, `ExternalExpr`, `ExternalReference`, `FunctionExpr`, `IfStmt`, `InstantiateExpr`, `InvokeFunctionExpr`, `jsDocComment`, `JSDocComment`, …(+36) from `./output/output_ast`
  - exports `JitEvaluator` from `./output/output_jit`
  - exports `SourceMap` from `./output/source_map`
  - exports `compileComponentDeclareClassMetadata`, `compileDeclareClassMetadata` from `./render3/partial/class_metadata`
  - exports `compileDeclareComponentFromMetadata`, `DeclareComponentTemplateInfo` from `./render3/partial/component`
  - exports `compileDeclareDirectiveFromMetadata` from `./render3/partial/directive`
  - exports `compileDeclareFactoryFunction` from `./render3/partial/factory`
  - exports `compileDeclareInjectableFromMetadata` from `./render3/partial/injectable`
  - exports `compileDeclareServiceFromMetadata` from `./render3/partial/service`
  - exports `compileDeclareInjectorFromMetadata` from `./render3/partial/injector`
  - exports `compileDeclareNgModuleFromMetadata` from `./render3/partial/ng_module`
  - exports `compileDeclarePipeFromMetadata` from `./render3/partial/pipe`
  - exports `BlockNode as TmplAstBlockNode`, `BoundAttribute as TmplAstBoundAttribute`, `BoundDeferredTrigger as TmplAstBoundDeferredTrigger`, `BoundEvent as TmplAstBoundEvent`, `BoundText as TmplAstBoundText`, `Content as TmplAstContent`, `DeferredBlock as TmplAstDeferredBlock`, `DeferredBlockError as TmplAstDeferredBlockError`, `DeferredBlockLoading as TmplAstDeferredBlockLoading`, `DeferredBlockPlaceholder as TmplAstDeferredBlockPlaceholder`, `DeferredBlockTriggers as TmplAstDeferredBlockTriggers`, `DeferredTrigger as TmplAstDeferredTrigger`, `Element as TmplAstElement`, `ForLoopBlock as TmplAstForLoopBlock`, `ForLoopBlockEmpty as TmplAstForLoopBlockEmpty`, `HoverDeferredTrigger as TmplAstHoverDeferredTrigger`, `Icu as TmplAstIcu`, `IdleDeferredTrigger as TmplAstIdleDeferredTrigger`, `IfBlock as TmplAstIfBlock`, `IfBlockBranch as TmplAstIfBlockBranch`, `ImmediateDeferredTrigger as TmplAstImmediateDeferredTrigger`, `InteractionDeferredTrigger as TmplAstInteractionDeferredTrigger`, `LetDeclaration as TmplAstLetDeclaration`, `NeverDeferredTrigger as TmplAstNeverDeferredTrigger`, …(+20) from `./render3/r3_ast`
  - exports `compileClassDebugInfo`, `R3ClassDebugInfo` from `./render3/r3_class_debug_info_compiler`
  - exports `compileClassMetadata`, `CompileClassMetadataFn`, `compileComponentClassMetadata`, `compileOpaqueAsyncClassMetadata`, `R3ClassMetadata` from `./render3/r3_class_metadata_compiler`
  - exports `compileFactoryFunction`, `R3DependencyMetadata`, `R3FactoryMetadata` from `./render3/r3_factory`
  - exports `compileHmrInitializer`, `compileHmrUpdateCallback`, `R3HmrMetadata`, `R3HmrNamespaceDependency` from `./render3/r3_hmr_compiler`
  - exports `Identifiers as R3Identifiers` from `./render3/r3_identifiers`
  - exports `compileInjector`, `R3InjectorMetadata` from `./render3/r3_injector_compiler`
  - exports `compileNgModule`, `R3NgModuleMetadata`, `R3NgModuleMetadataGlobal`, `R3NgModuleMetadataKind`, `R3SelectorScopeMode` from `./render3/r3_module_compiler`
  - exports `compilePipeFromMetadata`, `R3PipeMetadata` from `./render3/r3_pipe_compiler`
  - exports `createMayBeForwardRefExpression`, `devOnlyGuardedExpression`, `ForwardRefHandling`, `getSafePropertyAccessString`, `MaybeForwardRefExpression`, `R3CompiledExpression`, `R3Reference`, `isUnsafeObjectKey` from `./render3/util`
  - exports `compileComponentFromMetadata`, `compileDeferResolverFunction`, `compileDirectiveFromMetadata`, `encapsulateStyle`, `ParsedHostBindings`, `parseHostBindings`, `verifyHostBindings` from `./render3/view/compiler`
  - exports `makeBindingParser`, `ParsedTemplate`, `parseTemplate`, `ParseTemplateOptions` from `./render3/view/template`
  - exports `CombinedRecursiveAstVisitor` from `./combined_visitor`
  - exports `type BindingParser` from `./template_parser/binding_parser`
  - exports `createCssSelectorFromNode` from `./render3/view/util`
  - exports `Version`, `escapeRegExp` from `./util`
  - exports `outputAst`
  - exports `CompilerFacadeImpl` from `./jit_compiler_facade`
  - exports `FactoryTarget` from `./compiler_facade_interface`
  - exports `QueryFlags` from `./render3/view/query_generation`
  - exports `setEnableTemplateSourceLocations` from `./render3/view/config`
  - exports `CommentTriviaType`, `ExpressionIdentifier` from `./typecheck/comments`
  - exports `OutOfBandDiagnosticRecorder`, `OutOfBandDiagnosticCategory` from `./typecheck/oob`
  - exports `DomSchemaChecker` from `./typecheck/schema`
  - exports `generateTypeCheckBlock` from `./typecheck/type_check_block`
  - exports `TcbExpr` from `./typecheck/ops/codegen`
  - exports `TcbGenericContextBehavior` from `./typecheck/ops/context`
  - exports `LEGACY_OPTIONAL_CHAINING_DEFAULT` from `./legacy_optional_chaining_default`
- `packages/compiler/src/compiler_facade_interface.ts` — 435 lines
  - interface: `ExportedCompilerFacade`, `CompilerFacade`, `CoreEnvironment`, `R3DependencyMetadataFacade`, `R3DeclareDependencyMetadataFacade`, `R3PipeMetadataFacade`, `R3InjectableMetadataFacade`, `R3ServiceMetadataFacade`, `R3NgModuleMetadataFacade`, `R3InjectorMetadataFacade`, `R3HostDirectiveMetadataFacade`, `R3DirectiveMetadataFacade`, `R3ComponentMetadataFacade`, `R3DeclareDirectiveFacade`, `R3DeclareComponentFacade`, `R3DeclareDirectiveDependencyFacade`, `R3DeclarePipeDependencyFacade`, `R3DeclareNgModuleDependencyFacade`, `R3TemplateDependencyFacade`, `R3FactoryDefMetadataFacade`, `R3DeclareFactoryFacade`, `R3DeclareInjectableFacade`, `R3DeclareServiceFacade`, `R3QueryMetadataFacade`, `R3DeclareQueryMetadataFacade`, `R3DeclareInjectorFacade`, `R3DeclareNgModuleFacade`, `R3DeclarePipeFacade`, `ParseSourceSpan`
  - type: `ResourceLoader`, `Provider`, `Type`, `OpaqueValue`, `LegacyInputPartialMapping`, `R3DeclareTemplateDependencyFacade`, `ChangeDetectionStrategy`
  - enum: `FactoryTarget`, `R3TemplateDependencyKind`, `ViewEncapsulation`
- `packages/compiler/src/config.ts` — 38 lines
  - class: `CompilerConfig`
  - function: `preserveWhitespacesDefault`
- `packages/compiler/src/constant_pool.ts` — 287 lines
  - class: `ConstantPool`, `GenericKeyFn`
  - interface: `ExpressionKeyFn`, `SharedConstantDefinition`
- `packages/compiler/src/core.ts` — 326 lines
  - const: `emitDistinctChangesOnlyDefaultValue`, `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`, `Type`
  - enum: `ViewEncapsulation`, `ChangeDetectionStrategy`, `InputFlags`, `MissingTranslationStrategy`
  - interface: `Input`, `Output`, `HostBinding`, `HostListener`, `SchemaMetadata`, `Type`
  - const enum: `InjectFlags`, `SelectorFlags`, `RenderFlags`, `AttributeMarker`
  - type: `R3CssSelector`, `R3CssSelectorList`
  - function: `parseSelectorToR3Selector`
  - exports `SecurityContext` from `./schema/dom_security_schema`
- `packages/compiler/src/directive_matching.ts` — 483 lines
  - class: `CssSelector`, `SelectorMatcher`, `SelectorListContext`, `SelectorContext`, `SelectorlessMatcher`
- `packages/compiler/src/injectable_compiler_2.ts` — 189 lines
  - interface: `R3InjectableMetadata`
  - function: `compileInjectable`, `createInjectableType`, `delegateToFactory`
- `packages/compiler/src/jit_compiler_facade.ts` — 1101 lines
  - class: `CompilerFacadeImpl`
  - function: `publishFacade`
- `packages/compiler/src/legacy_optional_chaining_default.ts` — 16 lines
  - const: `LEGACY_OPTIONAL_CHAINING_DEFAULT`
- `packages/compiler/src/parse_util.ts` — 242 lines
  - class: `ParseLocation`, `ParseSourceFile`, `ParseSourceSpan`, `ParseError`
  - enum: `ParseErrorLevel`
  - function: `r3JitTypeSourceSpan`, `identifierName`, `sanitizeIdentifier`
  - interface: `CompileIdentifierMetadata`
- `packages/compiler/src/property_mapping.ts` — 212 lines
  - type: `ClassPropertyName`, `BindingPropertyName`
  - interface: `InputOrOutput`
  - class: `ClassPropertyMapping`
- `packages/compiler/src/resource_loader.ts` — 19 lines
  - class: `ResourceLoader`
- `packages/compiler/src/service_compiler.ts` — 59 lines
  - interface: `R3ServiceMetadata`
  - function: `compileService`
- `packages/compiler/src/shadow_css.ts` — 1338 lines
  - class: `ShadowCss`, `CssRule`
  - function: `namespaceCssVariables`, `processRules`, `repeatGroups`
- `packages/compiler/src/style_url_resolver.ts` — 19 lines
  - function: `isStyleUrlResolvable`
- `packages/compiler/src/util.ts` — 182 lines
  - function: `dashCaseToCamelCase`, `splitAtColon`, `splitAtPeriod`, `noUndefined`, `error`, `escapeRegExp`, `utf8Encode`, `stringify`, `getJitStandaloneDefaultForVersion`, `namespaceCssVariable`
  - type: `Byte`
  - class: `Version`
  - interface: `Console`
  - exports `_global as global`
- `packages/compiler/src/version.ts` — 18 lines
  - const: `VERSION`



## `packages/compiler/src/expression_parser/`

- `packages/compiler/src/expression_parser/ast.ts` — 953 lines
  - class: `ParseSpan`, `AST`, `ASTWithName`, `EmptyExpr`, `ImplicitReceiver`, `ThisReceiver`, `Chain`, `Conditional`, `PropertyRead`, `SafePropertyRead`, `KeyedRead`, `SafeKeyedRead`, `BindingPipe`, `LiteralPrimitive`, `LiteralArray`, `SpreadElement`, `LiteralMap`, `Interpolation`, `Binary`, `Unary`, `PrefixNot`, `TypeofExpression`, `VoidExpression`, `NonNullAssert`, `Call`, `SafeCall`, `TaggedTemplateLiteral`, `TemplateLiteral`, `TemplateLiteralElement`, `ParenthesizedExpression`, `ArrowFunctionIdentifierParameter`, `ArrowFunction`, `RegularExpressionLiteral`, `AbsoluteSourceSpan`, `ASTWithSource`, `VariableBinding`, `ExpressionBinding`, `RecursiveAstVisitor`, `ParsedProperty`, `ParsedEvent`, `ParsedVariable`, `BoundElementProperty`
  - enum: `BindingPipeType`, `ParsedPropertyType`, `ParsedEventType`, `BindingType`
  - interface: `LiteralMapPropertyKey`, `LiteralMapSpreadKey`, `TemplateBindingIdentifier`, `AstVisitor`
  - type: `LiteralMapKey`, `AssignmentOperation`, `ArrowFunctionParameter`, `TemplateBinding`
- `packages/compiler/src/expression_parser/lexer.ts` — 792 lines
  - enum: `TokenType`, `StringTokenKind`
  - class: `Lexer`, `Token`, `StringToken`
  - const: `EOF`
- `packages/compiler/src/expression_parser/parser.ts` — 1950 lines
  - interface: `InterpolationPiece`
  - class: `SplitInterpolation`, `TemplateBindingParseResult`, `Parser`
  - const enum: `ParseFlags`
- `packages/compiler/src/expression_parser/serializer.ts` — 211 lines
  - function: `serialize`



## `packages/compiler/src/i18n/`

- `packages/compiler/src/i18n/digest.ts` — 385 lines
  - function: `digest`, `computeDigest`, `decimalDigest`, `computeDecimalDigest`, `serializeNodes`, `sha1`, `fingerprint`, `computeMsgId`
- `packages/compiler/src/i18n/extractor_merger.ts` — 703 lines
  - function: `extractMessages`, `mergeTranslations`
  - class: `ExtractionResult`
- `packages/compiler/src/i18n/i18n_ast.ts` — 323 lines
  - interface: `MessagePlaceholder`, `MessageSpan`, `Node`, `Visitor`
  - class: `Message`, `Text`, `Container`, `Icu`, `TagPlaceholder`, `Placeholder`, `IcuPlaceholder`, `BlockPlaceholder`, `CloneVisitor`, `RecurseVisitor`
  - type: `I18nMeta`
- `packages/compiler/src/i18n/i18n_html_parser.ts` — 86 lines
  - class: `I18NHtmlParser`
- `packages/compiler/src/i18n/i18n_parser.ts` — 462 lines
  - type: `VisitNodeFn`
  - interface: `I18nMessageFactory`
  - function: `createI18nMessageFactory`
- `packages/compiler/src/i18n/index.ts` — 16 lines
  - exports `computeMsgId` from `./digest`
  - exports `I18NHtmlParser` from `./i18n_html_parser`
  - exports `MessageBundle` from `./message_bundle`
  - exports `Serializer` from `./serializers/serializer`
  - exports `Xliff` from `./serializers/xliff`
  - exports `Xliff2` from `./serializers/xliff2`
  - exports `Xmb` from `./serializers/xmb`
  - exports `Xtb` from `./serializers/xtb`
- `packages/compiler/src/i18n/message_bundle.ts` — 158 lines
  - class: `MessageBundle`
- `packages/compiler/src/i18n/translation_bundle.ts` — 226 lines
  - class: `TranslationBundle`



## `packages/compiler/src/i18n/serializers/`

- `packages/compiler/src/i18n/serializers/placeholder.ts` — 163 lines
  - class: `PlaceholderRegistry`
- `packages/compiler/src/i18n/serializers/serializer.ts` — 117 lines
  - class: `Serializer`, `SimplePlaceholderMapper`
  - interface: `PlaceholderMapper`
- `packages/compiler/src/i18n/serializers/xliff.ts` — 410 lines
  - class: `Xliff`
- `packages/compiler/src/i18n/serializers/xliff2.ts` — 467 lines
  - class: `Xliff2`
- `packages/compiler/src/i18n/serializers/xmb.ts` — 236 lines
  - class: `Xmb`
  - function: `digest`, `toPublicName`
- `packages/compiler/src/i18n/serializers/xml_helper.ts` — 133 lines
  - interface: `IVisitor`, `Node`
  - function: `serialize`, `escapeXml`
  - class: `Declaration`, `Doctype`, `Tag`, `Text`, `CR`
- `packages/compiler/src/i18n/serializers/xtb.ts` — 253 lines
  - class: `Xtb`



## `packages/compiler/src/ml_parser/`

- `packages/compiler/src/ml_parser/ast.ts` — 321 lines
  - type: `Node`
  - class: `NodeWithI18n`, `Text`, `Expansion`, `ExpansionCase`, `Attribute`, `StartTagComment`, `Element`, `Comment`, `Block`, `Component`, `Directive`, `BlockParameter`, `LetDeclaration`, `RecursiveVisitor`
  - interface: `Visitor`
  - function: `visitAll`
- `packages/compiler/src/ml_parser/entities.ts` — 2147 lines
  - const: `NAMED_ENTITIES`, `NGSP_UNICODE`
- `packages/compiler/src/ml_parser/html_parser.ts` — 22 lines
  - class: `HtmlParser`
- `packages/compiler/src/ml_parser/html_tags.ts` — 195 lines
  - class: `HtmlTagDefinition`
  - function: `getHtmlTagDefinition`
- `packages/compiler/src/ml_parser/html_whitespaces.ts` — 357 lines
  - const: `PRESERVE_WS_ATTR_NAME`
  - function: `replaceNgsp`, `removeWhitespaces`, `visitAllWithSiblings`
  - class: `WhitespaceVisitor`
- `packages/compiler/src/ml_parser/lexer.ts` — 1886 lines
  - class: `TokenizeResult`, `CursorError`
  - interface: `LexerRange`, `TokenizeOptions`
  - function: `tokenize`
- `packages/compiler/src/ml_parser/parser.ts` — 1044 lines
  - class: `TreeError`, `ParseTreeResult`, `Parser`
- `packages/compiler/src/ml_parser/tags.ts` — 69 lines
  - enum: `TagContentType`
  - interface: `TagDefinition`
  - function: `splitNsName`, `isNgContainer`, `isNgContent`, `isNgTemplate`, `getNsPrefix`, `getNsPrefix`, `getNsPrefix`, `mergeNsAndName`
- `packages/compiler/src/ml_parser/tokens.ts` — 326 lines
  - const enum: `TokenType`
  - type: `Token`, `InterpolatedTextToken`, `InterpolatedAttributeToken`
  - interface: `TokenBase`, `TagOpenStartToken`, `TagOpenEndToken`, `TagOpenEndVoidToken`, `TagCloseToken`, `IncompleteTagOpenToken`, `TextToken`, `InterpolationToken`, `EncodedEntityToken`, `CommentStartToken`, `CommentEndToken`, `InElementCommentToken`, `CdataStartToken`, `CdataEndToken`, `AttributeNameToken`, `AttributeQuoteToken`, `AttributeValueTextToken`, `AttributeValueInterpolationToken`, `DocTypeToken`, `ExpansionFormStartToken`, `ExpansionCaseValueToken`, `ExpansionCaseExpressionStartToken`, `ExpansionCaseExpressionEndToken`, `ExpansionFormEndToken`, `EndOfFileToken`, `BlockParameterToken`, `BlockOpenStartToken`, `BlockOpenEndToken`, `BlockCloseToken`, `IncompleteBlockOpenToken`, `LetStartToken`, `LetValueToken`, `LetEndToken`, `IncompleteLetToken`, `ComponentOpenStartToken`, `ComponentOpenEndToken`, `ComponentOpenEndVoidToken`, `ComponentCloseToken`, `IncompleteComponentOpenToken`, `DirectiveNameToken`, `DirectiveOpenToken`, `DirectiveCloseToken`, `ProcessingInstructionToken`
- `packages/compiler/src/ml_parser/xml_parser.ts` — 28 lines
  - class: `XmlParser`
- `packages/compiler/src/ml_parser/xml_tags.ts` — 37 lines
  - class: `XmlTagDefinition`
  - function: `getXmlTagDefinition`



## `packages/compiler/src/output/`

- `packages/compiler/src/output/abstract_emitter.ts` — 743 lines
  - class: `EmitterVisitorContext`, `AbstractEmitterVisitor`
  - function: `escapeIdentifier`
- `packages/compiler/src/output/abstract_js_emitter.ts` — 113 lines
  - class: `AbstractJsEmitterVisitor`
- `packages/compiler/src/output/map_util.ts` — 35 lines
  - type: `MapEntry`, `MapLiteral`
  - function: `mapEntry`, `mapLiteral`
- `packages/compiler/src/output/output_ast.ts` — 2120 lines
  - enum: `TypeModifier`, `BuiltinTypeName`, `UnaryOperator`, `BinaryOperator`, `StmtModifier`
  - class: `Type`, `BuiltinType`, `ExpressionType`, `ArrayType`, `MapType`, `TransplantedType`, `Expression`, `ReadVarExpr`, `TypeofExpr`, `VoidExpr`, `WrappedNodeExpr`, `InvokeFunctionExpr`, `TaggedTemplateLiteralExpr`, `InstantiateExpr`, `RegularExpressionLiteralExpr`, `LiteralExpr`, `TemplateLiteralExpr`, `TemplateLiteralElementExpr`, `LiteralPiece`, `PlaceholderPiece`, `LocalizedString`, `ExternalExpr`, `ExternalReference`, `ConditionalExpr`, `DynamicImportExpr`, `NotExpr`, `FnParam`, `FunctionExpr`, `ArrowFunctionExpr`, `UnaryOperatorExpr`, `ParenthesizedExpr`, `BinaryOperatorExpr`, `ReadPropExpr`, `ReadKeyExpr`, `LiteralArrayExpr`, `LiteralMapPropertyAssignment`, `LiteralMapSpreadAssignment`, `LiteralMapExpr`, `CommaExpr`, `SpreadElementExpr`, `LeadingComment`, `JSDocComment`, `Statement`, `DeclareVarStmt`, `DeclareFunctionStmt`, `ExpressionStatement`, `ReturnStatement`, `IfStmt`, `RecursiveAstVisitor`
  - const: `DYNAMIC_TYPE`, `INFERRED_TYPE`, `BOOL_TYPE`, `INT_TYPE`, `NUMBER_TYPE`, `STRING_TYPE`, `FUNCTION_TYPE`, `NONE_TYPE`, `NULL_EXPR`, `TYPED_NULL_EXPR`
  - interface: `TypeVisitor`, `CookedRawString`, `ExpressionVisitor`, `StatementVisitor`
  - function: `nullSafeIsEquivalent`, `areAllEquivalent`, `leadingComment`, `jsDocComment`, `variable`, `importExpr`, `importType`, `expressionType`, `transplantedType`, `typeofExpr`, `literalArr`, `literalMap`, `unary`, `not`, `fn`, `arrowFn`, `ifStmt`, `taggedTemplate`, `literal`, `localizedString`, `isNull`
  - type: `MessagePiece`, `LiteralMapEntry`, `JSDocTag`
  - const enum: `JSDocTagName`
- `packages/compiler/src/output/output_jit.ts` — 177 lines
  - interface: `ExternalReferenceResolver`
  - class: `JitEvaluator`, `JitEmitterVisitor`
- `packages/compiler/src/output/output_jit_trusted_types.ts` — 145 lines
  - interface: `TrustedScript`, `TrustedTypePolicyFactory`, `TrustedTypePolicy`
  - function: `newTrustedFunctionForJIT`
- `packages/compiler/src/output/source_map.ts` — 193 lines
  - type: `SourceMap`
  - class: `SourceMapGenerator`
  - function: `toBase64String`



## `packages/compiler/src/render3/`

- `packages/compiler/src/render3/r3_ast.ts` — 890 lines
  - interface: `Node`, `DeferredBlockTriggers`, `Visitor`
  - class: `Comment`, `Text`, `BoundText`, `TextAttribute`, `BoundAttribute`, `BoundEvent`, `Element`, `DeferredTrigger`, `BoundDeferredTrigger`, `NeverDeferredTrigger`, `IdleDeferredTrigger`, `ImmediateDeferredTrigger`, `HoverDeferredTrigger`, `TimerDeferredTrigger`, `InteractionDeferredTrigger`, `ViewportDeferredTrigger`, `BlockNode`, `DeferredBlockPlaceholder`, `DeferredBlockLoading`, `DeferredBlockError`, `ContentBlock`, `DeferredBlock`, `SwitchBlock`, `SwitchBlockCase`, `SwitchBlockCaseGroup`, `SwitchExhaustiveCheck`, `ForLoopBlock`, `ForLoopBlockEmpty`, `IfBlock`, `IfBlockBranch`, `UnknownBlock`, `LetDeclaration`, `Component`, `Directive`, `Template`, `Content`, `Variable`, `Reference`, `Icu`, `HostElement`, `RecursiveVisitor`
  - function: `visitAll`
- `packages/compiler/src/render3/r3_class_debug_info_compiler.ts` — 83 lines
  - interface: `R3ClassDebugInfo`
  - function: `compileClassDebugInfo`
- `packages/compiler/src/render3/r3_class_metadata_compiler.ts` — 165 lines
  - type: `CompileClassMetadataFn`
  - interface: `R3ClassMetadata`
  - function: `compileClassMetadata`, `compileComponentClassMetadata`, `compileOpaqueAsyncClassMetadata`, `compileComponentMetadataAsyncResolver`
- `packages/compiler/src/render3/r3_content_blocks.ts` — 143 lines
  - function: `createContentBlock`
- `packages/compiler/src/render3/r3_control_flow.ts` — 805 lines
  - function: `isConnectedForLoopBlock`, `isConnectedIfLoopBlock`, `createIfBlock`, `createForLoop`, `createSwitchBlock`
- `packages/compiler/src/render3/r3_deferred_blocks.ts` — 309 lines
  - function: `isConnectedDeferLoopBlock`, `createDeferredBlock`
- `packages/compiler/src/render3/r3_deferred_triggers.ts` — 775 lines
  - function: `parseNeverTrigger`, `parseWhenTrigger`, `parseOnTrigger`, `getTriggerParametersStart`, `parseDeferredTime`
- `packages/compiler/src/render3/r3_factory.ts` — 343 lines
  - interface: `R3ConstructorFactoryMetadata`, `R3DelegatedFnOrClassMetadata`, `R3ExpressionFactoryMetadata`, `R3DependencyMetadata`
  - enum: `R3FactoryDelegateType`
  - type: `R3FactoryMetadata`
  - function: `compileFactoryFunction`, `createFactoryType`, `isDelegatedFactoryMetadata`, `isExpressionFactoryMetadata`
- `packages/compiler/src/render3/r3_hmr_compiler.ts` — 214 lines
  - interface: `R3HmrMetadata`, `R3HmrNamespaceDependency`
  - function: `compileHmrInitializer`, `compileHmrUpdateCallback`
- `packages/compiler/src/render3/r3_identifiers.ts` — 507 lines
  - class: `Identifiers`
- `packages/compiler/src/render3/r3_injector_compiler.ts` — 45 lines
  - interface: `R3InjectorMetadata`
  - function: `compileInjector`, `createInjectorType`
- `packages/compiler/src/render3/r3_jit.ts` — 34 lines
  - class: `R3JitReflector`
- `packages/compiler/src/render3/r3_module_compiler.ts` — 435 lines
  - enum: `R3SelectorScopeMode`, `R3NgModuleMetadataKind`
  - interface: `R3NgModuleMetadataGlobal`, `R3NgModuleMetadataLocal`, `R3NgModuleMetadataIsolated`
  - type: `R3NgModuleMetadata`
  - function: `compileNgModule`, `compileNgModuleDeclarationExpression`, `createNgModuleType`
- `packages/compiler/src/render3/r3_pipe_compiler.ts` — 88 lines
  - interface: `R3PipeMetadata`
  - function: `compilePipeFromMetadata`, `createPipeType`
- `packages/compiler/src/render3/r3_template_transform.ts` — 1297 lines
  - interface: `Render3ParseResult`
  - function: `htmlAstToRender3Ast`
- `packages/compiler/src/render3/util.ts` — 195 lines
  - const: `IDENTIFIER_PATTERN`, `LET_PATTERN`
  - function: `typeWithParameters`, `prepareSyntheticPropertyName`, `prepareSyntheticListenerName`, `getSafePropertyAccessString`, `prepareSyntheticListenerFunctionName`, `jitOnlyGuardedExpression`, `devOnlyGuardedExpression`, `guardedExpression`, `wrapReference`, `refsToArray`, `tsIgnoreComment`, `isUnsafeObjectKey`, `createMayBeForwardRefExpression`, `convertFromMaybeForwardRefExpression`, `generateForwardRef`
  - interface: `R3Reference`, `R3CompiledExpression`, `MaybeForwardRefExpression`
  - const enum: `ForwardRefHandling`



## `packages/compiler/src/render3/partial/`

- `packages/compiler/src/render3/partial/api.ts` — 608 lines
  - interface: `R3PartialDeclaration`, `R3DeclareDirectiveMetadata`, `R3DeclareComponentMetadata`, `R3DeclareDirectiveDependencyMetadata`, `R3DeclarePipeDependencyMetadata`, `R3DeclareNgModuleDependencyMetadata`, `R3DeclareQueryMetadata`, `R3DeclareNgModuleMetadata`, `R3DeclareInjectorMetadata`, `R3DeclarePipeMetadata`, `R3DeclareFactoryMetadata`, `R3DeclareInjectableMetadata`, `R3DeclareDependencyMetadata`, `R3DeclareClassMetadata`, `R3DeclareClassMetadataAsync`, `R3DeclareHostDirectiveMetadata`, `R3DeclareServiceMetadata`
  - type: `LegacyInputPartialMapping`, `R3DeclareTemplateDependencyMetadata`
- `packages/compiler/src/render3/partial/class_metadata.ts` — 75 lines
  - function: `compileDeclareClassMetadata`, `compileComponentDeclareClassMetadata`
- `packages/compiler/src/render3/partial/component.ts` — 289 lines
  - interface: `DeclareComponentTemplateInfo`
  - function: `compileDeclareComponentFromMetadata`, `createComponentDefinitionMap`
- `packages/compiler/src/render3/partial/directive.ts` — 345 lines
  - function: `compileDeclareDirectiveFromMetadata`, `createDirectiveDefinitionMap`
- `packages/compiler/src/render3/partial/factory.ts` — 42 lines
  - function: `compileDeclareFactoryFunction`
- `packages/compiler/src/render3/partial/injectable.ts` — 83 lines
  - function: `compileDeclareInjectableFromMetadata`, `createInjectableDefinitionMap`
- `packages/compiler/src/render3/partial/injector.ts` — 54 lines
  - function: `compileDeclareInjectorFromMetadata`
- `packages/compiler/src/render3/partial/ng_module.ts` — 95 lines
  - function: `compileDeclareNgModuleFromMetadata`
- `packages/compiler/src/render3/partial/pipe.ts` — 66 lines
  - function: `compileDeclarePipeFromMetadata`, `createPipeDefinitionMap`
- `packages/compiler/src/render3/partial/service.ts` — 60 lines
  - function: `compileDeclareServiceFromMetadata`, `createServiceDefinitionMap`
- `packages/compiler/src/render3/partial/util.ts` — 92 lines
  - function: `toOptionalLiteralArray`, `toOptionalLiteralMap`, `compileDependencies`, `compileDependency`



## `packages/compiler/src/render3/view/`

- `packages/compiler/src/render3/view/api.ts` — 596 lines
  - interface: `R3DirectiveMetadata`, `R3ComponentMetadata`, `R3InputMetadata`, `R3TemplateDependency`, `R3DirectiveDependencyMetadata`, `R3PipeDependencyMetadata`, `R3NgModuleDependencyMetadata`, `R3ForeignComponentMetadata`, `R3QueryMetadata`, `R3HostMetadata`, `R3HostDirectiveMetadata`, `R3DeferPerBlockDependency`, `R3DeferPerComponentDependency`
  - const enum: `DeferBlockDepsEmitMode`, `DeclarationListEmitMode`
  - type: `R3ComponentDeferMetadata`, `R3TemplateDependencyMetadata`, `R3DeferResolverFunctionMetadata`
  - enum: `R3TemplateDependencyKind`
- `packages/compiler/src/render3/view/compiler.ts` — 802 lines
  - function: `compileDirectiveFromMetadata`, `compileComponentFromMetadata`, `createComponentType`, `createDirectiveType`, `parseHostBindings`, `verifyHostBindings`, `encapsulateStyle`, `createHostDirectivesMappingArray`, `compileDeferResolverFunction`
  - interface: `ParsedHostBindings`
- `packages/compiler/src/render3/view/config.ts` — 29 lines
  - function: `setEnableTemplateSourceLocations`, `getTemplateSourceLocationsEnabled`
- `packages/compiler/src/render3/view/query_generation.ts` — 297 lines
  - const enum: `QueryFlags`
  - function: `getQueryPredicate`, `createViewQueriesFunction`, `createContentQueriesFunction`
- `packages/compiler/src/render3/view/t2_api.ts` — 337 lines
  - type: `ScopedNode`, `ReferenceTarget`, `TemplateEntity`, `DirectiveOwner`
  - interface: `ConflictingHostDirectiveBinding`, `Target`, `LegacyAnimationTriggerNames`, `DirectiveMeta`, `ForeignComponentMeta`, `TargetBinder`, `BoundTarget`
  - enum: `MatchSource`
- `packages/compiler/src/render3/view/t2_binder.ts` — 1473 lines
  - function: `findMatchingDirectivesAndPipes`
  - type: `DirectiveMatcher`
  - class: `R3TargetBinder`
- `packages/compiler/src/render3/view/template.ts` — 332 lines
  - const: `LEADING_TRIVIA_CHARS`
  - interface: `ParseTemplateOptions`, `ParsedTemplate`
  - function: `parseTemplate`, `makeBindingParser`
- `packages/compiler/src/render3/view/util.ts` — 231 lines
  - const: `TEMPORARY_NAME`, `CONTEXT_NAME`, `RENDER_FLAGS`
  - function: `temporaryAllocator`, `invalid`, `asLiteral`, `conditionallyCreateDirectiveBindingLiteral`, `createCssSelectorFromNode`
  - class: `DefinitionMap`



## `packages/compiler/src/render3/view/i18n/`

- `packages/compiler/src/render3/view/i18n/get_msg_utils.ts` — 161 lines
  - function: `createGoogleGetMsgStatements`, `serializeI18nMessageForGetMsg`
- `packages/compiler/src/render3/view/i18n/icu_serializer.ts` — 61 lines
  - function: `serializeIcuNode`
- `packages/compiler/src/render3/view/i18n/localize_utils.ts` — 188 lines
  - function: `createLocalizeStatements`, `serializeI18nMessageForLocalize`
- `packages/compiler/src/render3/view/i18n/meta.ts` — 364 lines
  - type: `I18nMeta`
  - class: `I18nMetaVisitor`
  - function: `parseI18nMeta`, `i18nMetaToJSDoc`
- `packages/compiler/src/render3/view/i18n/util.ts` — 94 lines
  - const: `I18N_ATTR`, `I18N_ATTR_PREFIX`, `I18N_ICU_VAR_PREFIX`
  - function: `isI18nAttribute`, `hasI18nAttrs`, `icuFromI18nMessage`, `placeholdersToParams`, `formatI18nPlaceholderNamesInMap`, `formatI18nPlaceholderName`



## `packages/compiler/src/schema/`

- `packages/compiler/src/schema/dom_element_schema_registry.ts` — 571 lines
  - const: `SCHEMA`, `_ATTR_TO_PROP`
  - class: `DomElementSchemaRegistry`
- `packages/compiler/src/schema/dom_security_schema.ts` — 215 lines
  - enum: `SecurityContext`
  - const: `SVG_NAMESPACE`, `MATH_ML_NAMESPACE`
  - function: `SECURITY_SCHEMA`, `checkSecurityContext`
- `packages/compiler/src/schema/element_schema_registry.ts` — 31 lines
  - class: `ElementSchemaRegistry`
- `packages/compiler/src/schema/trusted_types_sinks.ts` — 50 lines
  - function: `isTrustedTypesSink`



## `packages/compiler/src/template/pipeline/ir/`

- `packages/compiler/src/template/pipeline/ir/index.ts` — 19 lines
  - re-exports * from `./src/enums`
  - re-exports * from `./src/expression`
  - re-exports * from `./src/operations`
  - re-exports * from `./src/ops/create`
  - re-exports * from `./src/ops/host`
  - re-exports * from `./src/ops/shared`
  - re-exports * from `./src/ops/update`
  - re-exports * from `./src/handle`
  - re-exports * from `./src/traits`
  - re-exports * from `./src/variable`



## `packages/compiler/src/template/pipeline/ir/src/`

- `packages/compiler/src/template/pipeline/ir/src/enums.ts` — 704 lines
  - enum: `OpKind`, `ExpressionKind`, `VariableFlags`, `SemanticVariableKind`, `BindingKind`, `I18nParamResolutionTime`, `I18nExpressionFor`, `I18nParamValueFlags`, `Namespace`, `DeferTriggerKind`, `I18nContextKind`, `TemplateKind`
  - const enum: `AnimationKind`, `AnimationBindingKind`, `DeferOpModifierKind`, `TDeferDetailsFlags`
- `packages/compiler/src/template/pipeline/ir/src/expression.ts` — 1493 lines
  - type: `Expression`, `ExpressionTransform`
  - function: `isIrExpression`, `visitExpressionsInOp`, `transformExpressionsInOp`, `transformExpressionsInExpression`, `transformExpressionsInStatement`, `isStringLiteral`
  - class: `ExpressionBase`, `LexicalReadExpr`, `ReferenceExpr`, `ForeignContentExpr`, `StoreLetExpr`, `ContextLetReferenceExpr`, `ContextExpr`, `TrackContextExpr`, `NextContextExpr`, `GetCurrentViewExpr`, `RestoreViewExpr`, `ResetViewExpr`, `TwoWayBindingSetExpr`, `ReadVariableExpr`, `PureFunctionExpr`, `PureFunctionParameterExpr`, `PipeBindingExpr`, `PipeBindingVariadicExpr`, `SafePropertyReadExpr`, `SafeKeyedReadExpr`, `SafeNavigationMigrationExpr`, `SafeTernaryExpr`, `EmptyExpr`, `AssignTemporaryExpr`, `ReadTemporaryExpr`, `SlotLiteralExpr`, `ConditionalCaseExpr`, `ConstCollectedExpr`, `ArrowFunctionExpr`
  - enum: `VisitorContextFlag`
- `packages/compiler/src/template/pipeline/ir/src/handle.ts` — 12 lines
  - class: `SlotHandle`
- `packages/compiler/src/template/pipeline/ir/src/operations.ts` — 359 lines
  - type: `XrefId`
  - interface: `Op`
  - class: `OpList`
- `packages/compiler/src/template/pipeline/ir/src/traits.ts` — 168 lines
  - const: `ConsumesSlot`, `DependsOnSlotContext`, `ConsumesVarsTrait`, `UsesVarOffset`, `TRAIT_CONSUMES_SLOT`, `TRAIT_DEPENDS_ON_SLOT_CONTEXT`, `TRAIT_CONSUMES_VARS`
  - interface: `ConsumesSlotOpTrait`, `DependsOnSlotContextOpTrait`, `ConsumesVarsTrait`, `UsesVarOffsetTrait`
  - function: `hasConsumesSlotTrait`, `hasDependsOnSlotContextTrait`, `hasDependsOnSlotContextTrait`, `hasDependsOnSlotContextTrait`, `hasConsumesVarsTrait`, `hasConsumesVarsTrait`, `hasConsumesVarsTrait`, `hasUsesVarOffsetTrait`
- `packages/compiler/src/template/pipeline/ir/src/variable.ts` — 87 lines
  - type: `SemanticVariable`
  - interface: `SemanticVariableBase`, `ContextVariable`, `IdentifierVariable`, `SavedViewVariable`, `AliasVariable`
  - const: `CTX_REF`



## `packages/compiler/src/template/pipeline/ir/src/ops/`

- `packages/compiler/src/template/pipeline/ir/src/ops/create.ts` — 2096 lines
  - type: `CreateOp`, `ElementOrContainerOps`, `DeferTrigger`, `ConstIndex`
  - function: `isElementOrContainerOp`, `createElementStartOp`, `createForeignComponentOp`, `createContentOp`, `createTemplateOp`, `createConditionalCreateOp`, `createConditionalBranchCreateOp`, `createRepeaterCreateOp`, `createElementEndOp`, `createDisableBindingsOp`, `createEnableBindingsOp`, `createTextOp`, `createAnimationStringOp`, `createAnimationOp`, `createListenerOp`, `createAnimationListenerOp`, `createTwoWayListenerOp`, `createPipeOp`, `createNamespaceOp`, `createProjectionDefOp`, `createEnableIncrementalHydrationRuntimeOp`, `createProjectionOp`, `createExtractedAttributeOp`, `createDeferOp`, `createDeferOnOp`, `createDeclareLetOp`, `createI18nMessageOp`, `createI18nStartOp`, `createI18nEndOp`, `createIcuStartOp`, `createIcuEndOp`, `createIcuPlaceholderOp`, `createI18nContextOp`, `createI18nAttributesOp`, `createSourceLocationOp`, `createControlCreateOp`
  - interface: `LocalRef`, `ElementOrContainerOpBase`, `ElementOpBase`, `ElementStartOp`, `ForeignComponentOp`, `ContentOp`, `ElementOp`, `TemplateOp`, `ConditionalCreateOp`, `ConditionalBranchCreateOp`, `RepeaterCreateOp`, `RepeaterVarNames`, `ElementEndOp`, `ContainerStartOp`, `ContainerOp`, `ContainerEndOp`, `DisableBindingsOp`, `EnableBindingsOp`, `TextOp`, `AnimationStringOp`, `AnimationOp`, `ListenerOp`, `AnimationListenerOp`, `TwoWayListenerOp`, `PipeOp`, `NamespaceOp`, `ProjectionDefOp`, `EnableIncrementalHydrationRuntimeOp`, `ProjectionOp`, `ExtractedAttributeOp`, `DeferOp`, `DeferOnOp`, `DeclareLetOp`, `I18nParamValue`, `I18nMessageOp`, `I18nOpBase`, `I18nOp`, `I18nStartOp`, `I18nEndOp`, `IcuStartOp`, `IcuEndOp`, `IcuPlaceholderOp`, `I18nContextOp`, `I18nAttributesOp`, `ElementSourceLocation`, `SourceLocationOp`, `ControlCreateOp`
- `packages/compiler/src/template/pipeline/ir/src/ops/host.ts` — 59 lines
  - interface: `DomPropertyOp`
  - function: `createDomPropertyOp`
- `packages/compiler/src/template/pipeline/ir/src/ops/shared.ts` — 105 lines
  - interface: `ListEndOp`, `StatementOp`, `VariableOp`
  - function: `createStatementOp`, `createVariableOp`
  - const: `NEW_OP`
- `packages/compiler/src/template/pipeline/ir/src/ops/update.ts` — 1073 lines
  - type: `UpdateOp`
  - interface: `InterpolateTextOp`, `BindingOp`, `PropertyOp`, `TwoWayPropertyOp`, `StylePropOp`, `ClassPropOp`, `StyleMapOp`, `ClassMapOp`, `AttributeOp`, `AdvanceOp`, `ConditionalOp`, `RepeaterOp`, `AnimationBindingOp`, `DeferWhenOp`, `I18nExpressionOp`, `I18nApplyOp`, `StoreLetOp`, `ControlOp`
  - function: `createInterpolateTextOp`, `createBindingOp`, `createPropertyOp`, `createTwoWayPropertyOp`, `createStylePropOp`, `createClassPropOp`, `createStyleMapOp`, `createClassMapOp`, `createAttributeOp`, `createAdvanceOp`, `createConditionalOp`, `createRepeaterOp`, `createAnimationBindingOp`, `createDeferWhenOp`, `createI18nExpressionOp`, `createI18nApplyOp`, `createStoreLetOp`, `createControlOp`
  - class: `Interpolation`



## `packages/compiler/src/template/pipeline/src/`

- `packages/compiler/src/template/pipeline/src/compilation.ts` — 322 lines
  - enum: `CompilationJobKind`, `TemplateCompilationMode`
  - class: `CompilationJob`, `ComponentCompilationJob`, `CompilationUnit`, `ViewCompilationUnit`, `HostBindingCompilationJob`, `HostBindingCompilationUnit`
- `packages/compiler/src/template/pipeline/src/conversion.ts` — 85 lines
  - const: `BINARY_OPERATORS`
  - function: `namespaceForKey`, `keyForNamespace`, `prefixWithNamespace`, `literalOrArrayLiteral`
  - type: `LiteralType`
- `packages/compiler/src/template/pipeline/src/emit.ts` — 325 lines
  - function: `transform`, `emitTemplateFn`, `emitHostBindingFunction`
- `packages/compiler/src/template/pipeline/src/ingest.ts` — 2096 lines
  - function: `isI18nRootNode`, `isSingleI18nIcu`, `ingestComponent`, `ingestHostBinding`, `ingestDomProperty`, `ingestHostAttribute`, `ingestHostEvent`
  - interface: `HostBindingInput`
- `packages/compiler/src/template/pipeline/src/instruction.ts` — 1137 lines
  - function: `element`, `elementStart`, `foreignComponent`, `foreignContent`, `elementEnd`, `elementContainerStart`, `elementContainer`, `elementContainerEnd`, `template`, `disableBindings`, `enableBindings`, `listener`, `twoWayBindingSet`, `twoWayListener`, `pipe`, `namespaceHTML`, `namespaceSVG`, `namespaceMath`, `advance`, `reference`, `nextContext`, `getCurrentView`, `restoreView`, `resetView`, `text`, `defer`, `enableIncrementalHydrationRuntime`, `deferOn`, `projectionDef`, `projection`, `i18nStart`, `conditionalCreate`, `conditionalBranchCreate`, `repeaterCreate`, `repeater`, `deferWhen`, `declareLet`, `storeLet`, `readContextLet`, `i18n`, `i18nEnd`, `i18nAttributes`, `ariaProperty`, `property`, `control`, `controlCreate`, `twoWayProperty`, `attribute`, `styleProp`, `classProp`, `styleMap`, `classMap`, `domElement`, `domElementStart`, `domElementEnd`, `domElementContainerStart`, `domElementContainer`, `domElementContainerEnd`, `domListener`, `domTemplate`, `pipeBind`, `pipeBindV`, `textInterpolate`, `i18nExp`, `i18nApply`, `domProperty`, `animation`, `animationString`, `animationListener`, `syntheticHostProperty`, `pureFunction`, `attachSourceLocation`, `arrowFunction`, `conditional`
- `packages/compiler/src/template/pipeline/src/namespaces.ts` — 11 lines
  - const: `SVG_NAMESPACE`, `MATH_ML_NAMESPACE`



## `packages/compiler/src/template/pipeline/src/phases/`

- `packages/compiler/src/template/pipeline/src/phases/any_cast.ts` — 38 lines
  - function: `deleteAnyCasts`
- `packages/compiler/src/template/pipeline/src/phases/apply_i18n_expressions.ts` — 81 lines
  - function: `applyI18nExpressions`
- `packages/compiler/src/template/pipeline/src/phases/assign_i18n_slot_dependencies.ts` — 99 lines
  - function: `assignI18nSlotDependencies`
- `packages/compiler/src/template/pipeline/src/phases/attach_source_locations.ts` — 41 lines
  - function: `attachSourceLocations`
- `packages/compiler/src/template/pipeline/src/phases/attribute_extraction.ts` — 194 lines
  - function: `extractAttributes`
- `packages/compiler/src/template/pipeline/src/phases/binding_specialization.ts` — 181 lines
  - function: `specializeBindings`
- `packages/compiler/src/template/pipeline/src/phases/chaining.ts` — 163 lines
  - function: `chain`
- `packages/compiler/src/template/pipeline/src/phases/collapse_singleton_interpolations.ts` — 41 lines
  - function: `collapseSingletonInterpolations`
- `packages/compiler/src/template/pipeline/src/phases/conditionals.ts` — 79 lines
  - function: `generateConditionalExpressions`
- `packages/compiler/src/template/pipeline/src/phases/const_collection.ts` — 270 lines
  - function: `collectElementConsts`
- `packages/compiler/src/template/pipeline/src/phases/control_directives.ts` — 89 lines
  - function: `specializeControlProperties`
- `packages/compiler/src/template/pipeline/src/phases/convert_animations.ts` — 76 lines
  - function: `convertAnimations`
- `packages/compiler/src/template/pipeline/src/phases/convert_i18n_bindings.ts` — 82 lines
  - function: `convertI18nBindings`
- `packages/compiler/src/template/pipeline/src/phases/create_i18n_contexts.ts` — 129 lines
  - function: `createI18nContexts`
- `packages/compiler/src/template/pipeline/src/phases/deduplicate_text_bindings.ts` — 34 lines
  - function: `deduplicateTextBindings`
- `packages/compiler/src/template/pipeline/src/phases/defer_configs.ts` — 37 lines
  - function: `configureDeferInstructions`
- `packages/compiler/src/template/pipeline/src/phases/defer_resolve_targets.ts` — 145 lines
  - function: `resolveDeferTargetNames`
- `packages/compiler/src/template/pipeline/src/phases/empty_elements.ts` — 55 lines
  - function: `collapseEmptyInstructions`
- `packages/compiler/src/template/pipeline/src/phases/expand_safe_reads.ts` — 280 lines
  - function: `expandSafeReads`
- `packages/compiler/src/template/pipeline/src/phases/extract_i18n_messages.ts` — 262 lines
  - function: `extractI18nMessages`
- `packages/compiler/src/template/pipeline/src/phases/generate_advance.ts` — 77 lines
  - function: `generateAdvance`
- `packages/compiler/src/template/pipeline/src/phases/generate_arrow_functions.ts` — 62 lines
  - function: `generateArrowFunctions`
- `packages/compiler/src/template/pipeline/src/phases/generate_local_let_references.ts` — 43 lines
  - function: `generateLocalLetReferences`
- `packages/compiler/src/template/pipeline/src/phases/generate_projection_def.ts` — 54 lines
  - function: `generateProjectionDefs`
- `packages/compiler/src/template/pipeline/src/phases/generate_variables.ts` — 326 lines
  - function: `generateVariables`
- `packages/compiler/src/template/pipeline/src/phases/has_const_expression_collection.ts` — 35 lines
  - function: `collectConstExpressions`
- `packages/compiler/src/template/pipeline/src/phases/host_style_property_parsing.ts` — 96 lines
  - function: `parseHostStyleProperties`
- `packages/compiler/src/template/pipeline/src/phases/i18n_const_collection.ts` — 410 lines
  - const: `I18N_ICU_MAPPING_PREFIX`
  - function: `getTranslationConstPrefix`, `declareI18nVariable`, `collectI18nConsts`
- `packages/compiler/src/template/pipeline/src/phases/i18n_text_extraction.ts` — 119 lines
  - function: `convertI18nText`
- `packages/compiler/src/template/pipeline/src/phases/insert_incremental_hydration_runtime.ts` — 38 lines
  - function: `insertIncrementalHydrationRuntime`
- `packages/compiler/src/template/pipeline/src/phases/local_refs.ts` — 50 lines
  - function: `liftLocalRefs`
- `packages/compiler/src/template/pipeline/src/phases/namespace.ts` — 30 lines
  - function: `emitNamespaceChanges`
- `packages/compiler/src/template/pipeline/src/phases/naming.ts` — 220 lines
  - function: `nameFunctionsAndVariables`
- `packages/compiler/src/template/pipeline/src/phases/next_context_merging.ts` — 101 lines
  - function: `mergeNextContextExpressions`
- `packages/compiler/src/template/pipeline/src/phases/ng_container.ts` — 34 lines
  - function: `generateNgContainerOps`
- `packages/compiler/src/template/pipeline/src/phases/nonbindable.ts` — 59 lines
  - function: `disableBindings`
- `packages/compiler/src/template/pipeline/src/phases/ordering.ts` — 182 lines
  - function: `orderOps`
- `packages/compiler/src/template/pipeline/src/phases/parse_extracted_styles.ts` — 191 lines
  - function: `parse`, `hyphenate`, `parseExtractedStyles`
- `packages/compiler/src/template/pipeline/src/phases/phase_remove_content_selectors.ts` — 50 lines
  - function: `removeContentSelectors`
- `packages/compiler/src/template/pipeline/src/phases/pipe_creation.ts` — 83 lines
  - function: `createPipes`
- `packages/compiler/src/template/pipeline/src/phases/pipe_variadic.ts` — 46 lines
  - function: `createVariadicPipes`
- `packages/compiler/src/template/pipeline/src/phases/propagate_i18n_blocks.ts` — 126 lines
  - function: `propagateI18nBlocks`
- `packages/compiler/src/template/pipeline/src/phases/pure_function_extraction.ts` — 73 lines
  - function: `extractPureFunctions`
- `packages/compiler/src/template/pipeline/src/phases/pure_literal_structures.ts` — 96 lines
  - function: `generatePureLiteralStructures`
- `packages/compiler/src/template/pipeline/src/phases/regular_expression_optimization.ts` — 55 lines
  - function: `optimizeRegularExpressions`
- `packages/compiler/src/template/pipeline/src/phases/reify.ts` — 992 lines
  - function: `reify`
- `packages/compiler/src/template/pipeline/src/phases/remove_empty_bindings.ts` — 34 lines
  - function: `removeEmptyBindings`
- `packages/compiler/src/template/pipeline/src/phases/remove_i18n_contexts.ts` — 30 lines
  - function: `removeI18nContexts`
- `packages/compiler/src/template/pipeline/src/phases/remove_illegal_let_references.ts` — 47 lines
  - function: `removeIllegalLetReferences`
- `packages/compiler/src/template/pipeline/src/phases/remove_unused_i18n_attrs.ts` — 38 lines
  - function: `removeUnusedI18nAttributesOps`
- `packages/compiler/src/template/pipeline/src/phases/resolve_contexts.ts` — 87 lines
  - function: `resolveContexts`
- `packages/compiler/src/template/pipeline/src/phases/resolve_defer_deps_fns.ts` — 40 lines
  - function: `resolveDeferDepsFns`
- `packages/compiler/src/template/pipeline/src/phases/resolve_dollar_event.ts` — 48 lines
  - function: `resolveDollarEvent`
- `packages/compiler/src/template/pipeline/src/phases/resolve_foreign_content.ts` — 59 lines
  - function: `resolveForeignContent`
- `packages/compiler/src/template/pipeline/src/phases/resolve_i18n_attr_sanitizers.ts` — 76 lines
  - function: `resolveI18nAttrSanitizers`
- `packages/compiler/src/template/pipeline/src/phases/resolve_i18n_element_placeholders.ts` — 450 lines
  - function: `resolveI18nElementPlaceholders`
- `packages/compiler/src/template/pipeline/src/phases/resolve_i18n_expression_placeholders.ts` — 84 lines
  - function: `resolveI18nExpressionPlaceholders`
- `packages/compiler/src/template/pipeline/src/phases/resolve_names.ts` — 167 lines
  - function: `resolveNames`
- `packages/compiler/src/template/pipeline/src/phases/resolve_sanitizers.ts` — 135 lines
  - function: `resolveSanitizers`
- `packages/compiler/src/template/pipeline/src/phases/safe_navigation_migration.ts` — 44 lines
  - function: `removeSafeNavigationMigration`
- `packages/compiler/src/template/pipeline/src/phases/save_restore_view.ts` — 107 lines
  - function: `saveAndRestoreView`
- `packages/compiler/src/template/pipeline/src/phases/slot_allocation.ts` — 78 lines
  - function: `allocateSlots`
- `packages/compiler/src/template/pipeline/src/phases/store_let_optimization.ts` — 77 lines
  - function: `optimizeStoreLet`
- `packages/compiler/src/template/pipeline/src/phases/strip_nonrequired_parentheses.ts` — 121 lines
  - function: `stripNonrequiredParentheses`
- `packages/compiler/src/template/pipeline/src/phases/style_binding_specialization.ts` — 57 lines
  - function: `specializeStyleBindings`
- `packages/compiler/src/template/pipeline/src/phases/temporary_variables.ts` — 116 lines
  - function: `generateTemporaryVariables`
- `packages/compiler/src/template/pipeline/src/phases/track_fn_optimization.ts` — 123 lines
  - function: `optimizeTrackFns`
- `packages/compiler/src/template/pipeline/src/phases/track_variables.ts` — 45 lines
  - function: `generateTrackVariables`
- `packages/compiler/src/template/pipeline/src/phases/transform_two_way_binding_set.ts` — 54 lines
  - function: `transformTwoWayBindingSet`
- `packages/compiler/src/template/pipeline/src/phases/var_counting.ts` — 204 lines
  - function: `countVariables`
- `packages/compiler/src/template/pipeline/src/phases/variable_optimization.ts` — 593 lines
  - function: `optimizeVariables`
- `packages/compiler/src/template/pipeline/src/phases/wrap_icus.ts` — 47 lines
  - function: `wrapI18nIcus`



## `packages/compiler/src/template/pipeline/src/util/`

- `packages/compiler/src/template/pipeline/src/util/attributes.ts` — 19 lines
  - function: `isAriaAttribute`
- `packages/compiler/src/template/pipeline/src/util/elements.ts` — 35 lines
  - function: `createOpXrefMap`



## `packages/compiler/src/template_parser/`

- `packages/compiler/src/template_parser/binding_parser.ts` — 955 lines
  - interface: `HostProperties`, `HostListeners`
  - class: `BindingParser`
  - function: `calcPossibleSecurityContexts`
- `packages/compiler/src/template_parser/template_preparser.ts` — 80 lines
  - function: `preparseElement`
  - enum: `PreparsedElementType`
  - class: `PreparsedElement`



## `packages/compiler/src/typecheck/`

- `packages/compiler/src/typecheck/api.ts` — 292 lines
  - interface: `TypeCtorMetadata`, `TcbReferenceMetadata`, `TcbTypeParameter`, `TcbPipeMetadata`, `TemplateGuardMeta`, `TcbDirectiveMetadata`, `TcbComponentMetadata`, `TcbTypeCheckBlockMetadata`, `TcbEnvironment`, `TypeCheckingConfig`
  - type: `TcbReferenceKey`, `TcbInputMapping`, `TypeCheckId`
- `packages/compiler/src/typecheck/comments.ts` — 23 lines
  - enum: `CommentTriviaType`, `ExpressionIdentifier`
- `packages/compiler/src/typecheck/expression.ts` — 512 lines
  - function: `astToTcbExpr`
- `packages/compiler/src/typecheck/host_bindings.ts` — 519 lines
  - const: `HOST_BINDING_GUARD_COMMENT_TEXT`
  - type: `SourceNode`
  - interface: `StaticSourceNode`, `HostObjectLiteralBinding`, `HostListenerDecorator`, `HostBindingDecorator`
  - function: `createHostElement`, `createHostBindingsBlockGuard`
- `packages/compiler/src/typecheck/oob.ts` — 237 lines
  - enum: `OutOfBandDiagnosticCategory`
  - interface: `OutOfBandDiagnosticRecorder`
- `packages/compiler/src/typecheck/schema.ts` — 85 lines
  - interface: `DomSchemaChecker`
- `packages/compiler/src/typecheck/type_check_block.ts` — 100 lines
  - function: `generateTypeCheckBlock`



## `packages/compiler/src/typecheck/ops/`

- `packages/compiler/src/typecheck/ops/base.ts` — 56 lines
  - class: `TcbOp`
- `packages/compiler/src/typecheck/ops/bindings.ts` — 190 lines
  - interface: `TcbBoundAttribute`, `TcbDirectiveBoundInput`, `TcbDirectiveUnsetInput`
  - type: `TcbDirectiveInput`
  - function: `getBoundAttributes`, `checkSplitTwoWayBinding`, `widenBinding`
- `packages/compiler/src/typecheck/ops/codegen.ts` — 138 lines
  - class: `TcbExpr`
  - function: `declareVariable`, `getStatementsBlock`
- `packages/compiler/src/typecheck/ops/completions.ts` — 36 lines
  - class: `TcbComponentContextCompletionOp`
- `packages/compiler/src/typecheck/ops/content_projection.ts` — 158 lines
  - class: `TcbControlFlowContentProjectionOp`
- `packages/compiler/src/typecheck/ops/context.ts` — 82 lines
  - enum: `TcbGenericContextBehavior`
  - class: `Context`
- `packages/compiler/src/typecheck/ops/directive_constructor.ts` — 210 lines
  - class: `TcbDirectiveCtorOp`, `TcbDirectiveCtorCircularFallbackOp`
- `packages/compiler/src/typecheck/ops/directive_type.ts` — 118 lines
  - class: `TcbDirectiveTypeOpBase`, `TcbNonGenericDirectiveTypeOp`, `TcbGenericDirectiveTypeWithAnyParamsOp`
- `packages/compiler/src/typecheck/ops/element.ts` — 51 lines
  - class: `TcbElementOp`
- `packages/compiler/src/typecheck/ops/events.ts` — 329 lines
  - function: `tcbEventHandlerExpression`
  - class: `TcbDirectiveOutputsOp`, `TcbUnclaimedOutputsOp`
- `packages/compiler/src/typecheck/ops/expression.ts` — 283 lines
  - function: `tcbExpression`, `unwrapWritableSignal`
  - class: `TcbExpressionOp`, `TcbConditionOp`, `TcbExpressionTranslator`
- `packages/compiler/src/typecheck/ops/for_block.ts` — 109 lines
  - class: `TcbForOfOp`, `TcbForLoopTrackTranslator`
- `packages/compiler/src/typecheck/ops/host.ts` — 47 lines
  - class: `TcbHostElementOp`
- `packages/compiler/src/typecheck/ops/if_block.ts` — 138 lines
  - class: `TcbIfBlockOp`
- `packages/compiler/src/typecheck/ops/inputs.ts` — 303 lines
  - function: `translateInput`
  - class: `TcbDirectiveInputsOp`, `TcbUnclaimedInputsOp`
- `packages/compiler/src/typecheck/ops/intersection_observer.ts` — 36 lines
  - class: `TcbIntersectionObserverOp`
- `packages/compiler/src/typecheck/ops/let.ts` — 45 lines
  - class: `TcbLetDeclarationOp`
- `packages/compiler/src/typecheck/ops/references.ts` — 125 lines
  - type: `LocalSymbol`
  - class: `TcbReferenceOp`, `TcbInvalidReferenceOp`
- `packages/compiler/src/typecheck/ops/schema.ts` — 98 lines
  - class: `TcbDomSchemaCheckerOp`
- `packages/compiler/src/typecheck/ops/scope.ts` — 1067 lines
  - class: `Scope`
- `packages/compiler/src/typecheck/ops/selectorless.ts` — 48 lines
  - function: `getComponentTagName`
  - class: `TcbComponentNodeOp`
- `packages/compiler/src/typecheck/ops/signal_forms.ts` — 497 lines
  - type: `CustomFormControlType`
  - const: `customFormControlBannedInputFields`
  - class: `TcbNativeFieldOp`, `TcbNativeRadioButtonFieldOp`
  - function: `expandBoundAttributesForField`, `isFieldDirective`, `getCustomFieldDirectiveType`, `isNativeField`, `checkUnsupportedFieldBindings`, `isFormControl`
- `packages/compiler/src/typecheck/ops/switch_block.ts` — 148 lines
  - class: `TcbSwitchOp`
- `packages/compiler/src/typecheck/ops/template.ts` — 200 lines
  - class: `TcbTemplateContextOp`, `TcbTemplateBodyOp`
- `packages/compiler/src/typecheck/ops/variables.ts` — 114 lines
  - class: `TcbBlockImplicitVariableOp`, `TcbTemplateVariableOp`, `TcbBlockVariableOp`



## `packages/compiler/test/`

- `packages/compiler/test/compiler_facade_interface_spec.ts` — 148 lines _(spec)_
- `packages/compiler/test/integration_spec.ts` — 69 lines _(spec)_
- `packages/compiler/test/style_url_resolver_spec.ts` — 34 lines _(spec)_
- `packages/compiler/test/util_spec.ts` — 90 lines _(spec)_



## `packages/compiler/test/expression_parser/`

- `packages/compiler/test/expression_parser/ast_spec.ts` — 47 lines _(spec)_
- `packages/compiler/test/expression_parser/lexer_spec.ts` — 1003 lines _(spec)_
- `packages/compiler/test/expression_parser/parser_spec.ts` — 1866 lines _(spec)_
- `packages/compiler/test/expression_parser/serializer_spec.ts` — 141 lines _(spec)_



## `packages/compiler/test/expression_parser/utils/`

- `packages/compiler/test/expression_parser/utils/span.ts` — 17 lines _(test-support)_
  - function: `getFakeSpan`
- `packages/compiler/test/expression_parser/utils/unparser.ts` — 307 lines _(test-support)_
  - function: `unparse`, `unparseWithSpan`
- `packages/compiler/test/expression_parser/utils/validator.ts` — 185 lines _(test-support)_
  - function: `validate`



## `packages/compiler/test/i18n/`

- `packages/compiler/test/i18n/digest_spec.ts` — 128 lines _(spec)_
- `packages/compiler/test/i18n/extractor_merger_spec.ts` — 742 lines _(spec)_
- `packages/compiler/test/i18n/i18n_ast_spec.ts` — 102 lines _(spec)_
  - function: `parseHtml`
- `packages/compiler/test/i18n/i18n_html_parser_spec.ts` — 28 lines _(spec)_
- `packages/compiler/test/i18n/i18n_parser_spec.ts` — 433 lines _(spec)_
  - function: `_humanizeMessages`, `_extractMessages`
- `packages/compiler/test/i18n/integration_common.ts` — 209 lines _(test-support)_
  - class: `I18nComponent`, `FrLocalization`
  - function: `validateHtml`, `configureCompiler`, `createComponent`, `serializeTranslations`
  - const: `HTML`
- `packages/compiler/test/i18n/integration_xliff2_spec.ts` — 456 lines _(spec)_
- `packages/compiler/test/i18n/integration_xliff_spec.ts` — 386 lines _(spec)_
- `packages/compiler/test/i18n/integration_xmb_xtb_spec.ts` — 134 lines _(spec)_
- `packages/compiler/test/i18n/message_bundle_spec.ts` — 60 lines _(spec)_
- `packages/compiler/test/i18n/translation_bundle_spec.ts` — 189 lines _(spec)_
- `packages/compiler/test/i18n/whitespace_sensitivity_spec.ts` — 469 lines _(spec)_



## `packages/compiler/test/i18n/serializers/`

- `packages/compiler/test/i18n/serializers/i18n_ast_spec.ts` — 74 lines _(spec)_
- `packages/compiler/test/i18n/serializers/placeholder_spec.ts` — 109 lines _(spec)_
- `packages/compiler/test/i18n/serializers/xliff2_spec.ts` — 461 lines _(spec)_
- `packages/compiler/test/i18n/serializers/xliff_spec.ts` — 445 lines _(spec)_
- `packages/compiler/test/i18n/serializers/xmb_spec.ts` — 86 lines _(spec)_
- `packages/compiler/test/i18n/serializers/xml_helper_spec.ts` — 50 lines _(spec)_
- `packages/compiler/test/i18n/serializers/xtb_spec.ts` — 192 lines _(spec)_



## `packages/compiler/test/ml_parser/`

- `packages/compiler/test/ml_parser/ast_serializer_spec.ts` — 62 lines _(spec)_
- `packages/compiler/test/ml_parser/ast_spec_utils.ts` — 176 lines _(test-support)_
  - function: `humanizeDom`, `humanizeDomSourceSpans`, `humanizeNodes`, `humanizeLineColumn`
- `packages/compiler/test/ml_parser/html_parser_spec.ts` — 2121 lines _(spec)_
  - function: `humanizeErrors`
- `packages/compiler/test/ml_parser/html_whitespaces_spec.ts` — 197 lines _(spec)_
- `packages/compiler/test/ml_parser/inline_comment_spec.ts` — 146 lines _(spec)_
- `packages/compiler/test/ml_parser/lexer_spec.ts` — 3915 lines _(spec)_



## `packages/compiler/test/ml_parser/util/`

- `packages/compiler/test/ml_parser/util/util.ts` — 76 lines _(test-support)_
  - function: `serializeNodes`



## `packages/compiler/test/output/`

- `packages/compiler/test/output/abstract_emitter_node_only_spec.ts` — 145 lines _(spec)_
- `packages/compiler/test/output/abstract_emitter_spec.ts` — 46 lines _(spec)_
  - function: `stripSourceMapAndNewLine`
- `packages/compiler/test/output/output_jit_spec.ts` — 65 lines _(spec)_
- `packages/compiler/test/output/source_map_spec.ts` — 133 lines _(spec)_
- `packages/compiler/test/output/source_map_util.ts` — 38 lines _(test-support)_
  - interface: `SourceLocation`
  - function: `originalPositionFor`, `extractSourceMap`



## `packages/compiler/test/render3/`

- `packages/compiler/test/render3/r3_ast_absolute_span_spec.ts` — 490 lines _(spec)_
- `packages/compiler/test/render3/r3_ast_spans_spec.ts` — 1098 lines _(spec)_
- `packages/compiler/test/render3/r3_ast_visitor_spec.ts` — 53 lines _(spec)_
- `packages/compiler/test/render3/r3_template_transform_spec.ts` — 3089 lines _(spec)_
- `packages/compiler/test/render3/style_parser_spec.ts` — 87 lines _(spec)_



## `packages/compiler/test/render3/util/`

- `packages/compiler/test/render3/util/expression.ts` — 278 lines _(test-support)_
  - function: `humanizeExpressionSource`



## `packages/compiler/test/render3/view/`

- `packages/compiler/test/render3/view/binding_spec.ts` — 1628 lines _(spec)_
- `packages/compiler/test/render3/view/i18n_spec.ts` — 550 lines _(spec)_
- `packages/compiler/test/render3/view/parse_template_options_spec.ts` — 95 lines _(spec)_
- `packages/compiler/test/render3/view/util.ts` — 201 lines _(test-support)_
  - function: `findExpression`, `toStringExpression`, `parseR3`, `processI18nMeta`



## `packages/compiler/test/schema/`

- `packages/compiler/test/schema/dom_element_schema_registry_spec.ts` — 302 lines _(spec)_
- `packages/compiler/test/schema/trusted_types_sinks_spec.ts` — 33 lines _(spec)_



## `packages/compiler/test/selector/`

- `packages/compiler/test/selector/selector_spec.ts` — 607 lines _(spec)_



## `packages/compiler/test/shadow_css/`

- `packages/compiler/test/shadow_css/at_rules_spec.ts` — 247 lines _(spec)_
- `packages/compiler/test/shadow_css/host_and_host_context_spec.ts` — 339 lines _(spec)_
- `packages/compiler/test/shadow_css/keyframes_spec.ts` — 563 lines _(spec)_
- `packages/compiler/test/shadow_css/ng_deep_spec.ts` — 35 lines _(spec)_
- `packages/compiler/test/shadow_css/process_rules_spec.ts` — 69 lines _(spec)_
- `packages/compiler/test/shadow_css/repeat_groups_spec.ts` — 50 lines _(spec)_
- `packages/compiler/test/shadow_css/shadow_css_spec.ts` — 602 lines _(spec)_
- `packages/compiler/test/shadow_css/utils.ts` — 59 lines _(test-support)_
  - function: `shim`

