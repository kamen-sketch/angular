# `packages/compiler` — template compiler

`@angular/compiler` (291 files, ~90k lines) turns component metadata and template source into the
`ɵcmp`/`ɵdir`/`ɵmod`/`ɵpipe` definitions the runtime consumes. It is deliberately free of any
TypeScript-program dependency: `packages/compiler-cli` owns the `ts.Program` integration and calls
into this package. The same code runs in JIT mode inside `@angular/core` via
`jit_compiler_facade.ts`.

Entry point: [`packages/compiler/index.ts`](../../packages/compiler/index.ts) → `src/compiler.ts`.
Full file/symbol listing: [`generated/index-packages-compiler.md`](./generated/index-packages-compiler.md).

---

## 1. Front end: source text → template AST

1. **Lexing/parsing HTML — `src/ml_parser/`.** `lexer.ts` tokenises (`tokens.ts` defines the token
   kinds, including the block syntax `@if`/`@for` and `@let`), `parser.ts` + `html_parser.ts` build
   the `ast.ts` node tree (`Element`, `Text`, `Attribute`, `Comment`, `Block`, `BlockParameter`,
   `LetDeclaration`, `Expansion` for ICU). `html_tags.ts`/`tags.ts` carry the tag/content-model
   tables that drive implicit tag closing; `html_whitespaces.ts` implements
   `preserveWhitespaces: false`; `entities.ts` decodes HTML entities; `xml_parser.ts` is used by the
   translation-file serializers.

2. **Parsing expressions — `src/expression_parser/`.** `lexer.ts` tokenises Angular expression
   syntax, `parser.ts` produces `ast.ts` nodes (`PropertyRead`, `Call`, `SafePropertyRead`,
   `BindingPipe`, `Interpolation`, `TemplateLiteral`, `TypeofExpression`, …) with precise source
   spans, and also parses interpolations, actions, and the simple-binding subset used by host
   bindings. `serializer.ts` prints an AST back to source (used by the language service and
   migrations).

3. **Template semantics — `src/render3/r3_template_transform.ts`** converts the HTML AST into the
   render3 template AST (`src/render3/r3_ast.ts`: `Element`, `Template`, `Content`, `BoundText`,
   `IfBlock`, `ForLoopBlock`, `SwitchBlock`, `DeferredBlock`, `LetDeclaration`, …). The block-specific
   parsing lives next to it: `r3_control_flow.ts`, `r3_deferred_blocks.ts`,
   `r3_deferred_triggers.ts`, `r3_content_blocks.ts`.

4. **Binding classification — `src/template_parser/binding_parser.ts`** splits attributes into
   property/attribute/class/style/animation/two-way bindings and events, and assigns each one a
   `SecurityContext` using `src/schema/dom_security_schema.ts` and
   `src/schema/dom_element_schema_registry.ts` (which also powers unknown-element/property
   diagnostics). `src/property_mapping.ts` maps between attribute and DOM property names.

5. **Scope analysis — `src/render3/view/t2_binder.ts`** (`R3TargetBinder`, interface in `t2_api.ts`)
   resolves which directives match each node, which template variables/references a given expression
   refers to, and which nesting level a reference lives at. `src/directive_matching.ts` holds the
   selector matcher itself.

## 2. Middle: the template pipeline (`src/template/pipeline/`)

This is the compiler's IR-based back end. Rather than emitting instructions directly from the
template AST, the pipeline ingests it into an intermediate representation, runs ~72 ordered
transformation phases over it, then reifies it into output AST.

**IR — `pipeline/ir/src/`**

- `operations.ts` — the doubly-linked `OpList<OpT>` all phases mutate in place.
- `ops/create.ts` — creation-mode ops (`ElementStart`, `Template`, `Projection`, `DeferOp`,
  `RepeaterCreate`, `ConditionalCreate`, `I18nStart`, `Listener`, …).
- `ops/update.ts` — update-mode ops (`Property`, `Attribute`, `StyleProp`, `InterpolateText`,
  `Conditional`, `Repeater`, `TwoWayProperty`, `StoreLet`, …).
- `ops/host.ts`, `ops/shared.ts` — host-binding ops and ops common to both phases.
- `expression.ts` — IR-level expressions (`NextContextExpr`, `ReferenceExpr`, `ContextExpr`,
  `PureFunctionExpr`, `PipeBindingExpr`, `TrackContextExpr`, …) that later phases resolve away.
- `enums.ts`, `traits.ts`, `variable.ts`, `handle.ts` — op kinds, mix-in traits
  (`ConsumesSlot`, `DependsOnSlotContext`, `UsesVarOffset`), and slot/variable handles.

**Compilation units — `pipeline/src/compilation.ts`**
`CompilationJob` is the root (`ComponentCompilationJob` for templates, `HostBindingCompilationJob`
for host bindings). A `ComponentCompilationJob` owns one `ViewCompilationUnit` per view (the root
template plus every embedded template), an `XrefId` allocator, and the `ConstantPool`.
`TemplateCompilationMode` distinguishes full vs. local (standalone/HMR) compilation.

**Ingest — `pipeline/src/ingest.ts`** (2,096 lines) walks the template AST and creates ops:
`ingestComponent`/`ingestHostBinding` are the entry points; `ingestElement`, `ingestTemplate`,
`ingestContent`, `ingestBoundText`, `ingestIfBlock`, `ingestSwitchBlock`, `ingestForBlock`,
`ingestDeferBlock` (+ `ingestDeferTriggers`), `ingestIcu`, `ingestLetDeclaration` handle each node
kind, while `convertAst` lowers expression-parser AST into output AST.

**Phases — `pipeline/src/emit.ts`** declares the single ordered `phases` array; each entry is tagged
`Kind.Tmpl`, `Kind.Host` or `Kind.Both` so template and host-binding jobs share code safely. The
order matters and is the best available documentation of the compiler's invariants. Roughly:

| Stage                   | Phases                                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Normalisation           | `resolveForeignContent`, `removeContentSelectors`, `optimizeRegularExpressions`, `parseHostStyleProperties`, `emitNamespaceChanges`                                                                                                                                                                     |
| i18n structure          | `propagateI18nBlocks`, `wrapI18nIcus`, `createI18nContexts`                                                                                                                                                                                                                                             |
| Binding specialisation  | `deduplicateTextBindings`, `specializeStyleBindings`, `specializeBindings`, `specializeControlProperties`, `convertAnimations`, `extractAttributes`, `parseExtractedStyles`, `removeEmptyBindings`, `collapseSingletonInterpolations`, `orderOps`                                                       |
| Feature lowering        | `generateConditionalExpressions`, `createPipes`, `configureDeferInstructions`, `insertIncrementalHydrationRuntime`, `createVariadicPipes`, `generateArrowFunctions`, `generatePureLiteralStructures`, `generateProjectionDefs`, `generateLocalLetReferences`, `generateVariables`, `saveAndRestoreView` |
| Name/context resolution | `deleteAnyCasts`, `removeSafeNavigationMigration`, `resolveDollarEvent`, `generateTrackVariables`, `removeIllegalLetReferences`, `resolveNames`, `resolveDeferTargetNames`, `transformTwoWayBindingSet`, `optimizeTrackFns`, `resolveContexts`, `resolveSanitizers`, `liftLocalRefs`                    |
| Expression cleanup      | `expandSafeReads`, `stripNonrequiredParentheses`, `generateTemporaryVariables`, `optimizeVariables`, `optimizeStoreLet`                                                                                                                                                                                 |
| i18n lowering           | `convertI18nText`, `convertI18nBindings`, `removeUnusedI18nAttributesOps`, `assignI18nSlotDependencies`, `applyI18nExpressions`                                                                                                                                                                         |
| Slot allocation         | `allocateSlots`, then `resolveI18nElementPlaceholders`, `resolveI18nExpressionPlaceholders`, `extractI18nMessages`, `collectI18nConsts`, `resolveI18nAttrSanitizers`                                                                                                                                    |
| Const collection        | `collectConstExpressions`, `collectElementConsts`, `removeI18nContexts`                                                                                                                                                                                                                                 |
| Final layout            | `countVariables`, `generateAdvance`, `nameFunctionsAndVariables`, `resolveDeferDepsFns`, `mergeNextContextExpressions`, `generateNgContainerOps`, `collapseEmptyInstructions`, `attachSourceLocations`, `disableBindings`, `extractPureFunctions`                                                       |
| Emission                | `reify` (ops → `ɵɵ` instruction calls), `chain` (merges consecutive compatible calls into `ɵɵelementStart(...).ɵɵelementEnd()`-style chains)                                                                                                                                                            |

`emitTemplateFn`/`emitHostBindingFunction` then wrap the reified statements into the two-phase
`function Tpl(rf, ctx) { if (rf & 1) {…} if (rf & 2) {…} }` shape (`maybeGenerateRfBlock`).

## 3. Back end: definitions and output

- **`src/render3/view/compiler.ts`** — `compileComponentFromMetadata` and
  `compileDirectiveFromMetadata` build the `DefinitionMap` that becomes `ɵcmp`/`ɵdir`: selectors,
  inputs/outputs, host bindings (`createHostBindingsFunction`, `parseHostBindings`,
  `verifyHostBindings`), features (`ɵɵNgOnChangesFeature`, `ɵɵInputTransformsFeature`,
  `ɵɵHostDirectivesFeature`, `ɵɵProvidersFeature`, …), styles with view encapsulation
  (`encapsulateStyle`, `%COMP%`/`_nghost-`/`_ngcontent-` rewriting via `src/shadow_css.ts`),
  and `compileDeferResolverFunction` for `@defer` dependency loaders.
- Sibling compilers: `r3_module_compiler.ts` (`ɵmod`/`ɵinj`), `r3_pipe_compiler.ts`,
  `r3_factory.ts` (`ɵfac`), `r3_injector_compiler.ts`, `injectable_compiler_2.ts`,
  `r3_class_metadata_compiler.ts` (`ɵsetClassMetadata` for JIT/testing),
  `r3_class_debug_info_compiler.ts`, `r3_hmr_compiler.ts`, `service_compiler.ts`.
- **`src/render3/partial/`** — the "partial" (library / `ngcc`-free) output used when publishing
  libraries: `ɵɵngDeclareComponent`, `ɵɵngDeclareDirective`, `ɵɵngDeclareNgModule`, … Their runtime
  counterpart is the linker in `compiler-cli/linker/`.
- **`src/output/`** — the output AST and emitters: `output_ast.ts` (`Expression`/`Statement` types
  shared by every compiler above), `abstract_emitter.ts`/`abstract_js_emitter.ts`,
  `source_map.ts`, `output_jit.ts` + `output_jit_trusted_types.ts` (JIT evaluation via `new Function`
  behind Trusted Types).
- **`src/constant_pool.ts`** — deduplicates literal arrays/objects into module-level `const`s so
  templates share them.
- **`src/render3/r3_identifiers.ts`** — the single table mapping every emitted instruction name to
  its runtime import. When an instruction is added to core, this is the file that connects them.

## 4. i18n

`src/i18n/` covers extraction and translation: `i18n_ast.ts` (`Message`, `Placeholder`, `Icu`),
`i18n_parser.ts` and `i18n_html_parser.ts` (turning templates into messages),
`digest.ts` (message-id hashing, incl. the legacy digests), `extractor_merger.ts`,
`message_bundle.ts`, `translation_bundle.ts`, and `serializers/` (`serializer.ts`, `xliff.ts`,
`xliff2.ts`, `xmb.ts`, `xtb.ts`, `placeholder.ts`, `xml_helper.ts`). Template-side i18n op
generation lives in `src/render3/view/i18n/` (`get_msg_utils.ts` for the `goog.getMsg` form,
`localize_utils.ts` for `$localize`, `icu_serializer.ts`, `meta.ts`) and the pipeline's i18n phases.

## 5. Template type checking support

`src/typecheck/` holds the compiler-side half of template type checking that `compiler-cli` drives:
`type_check_block.ts` (generating the TCB statements that make TypeScript check a template),
`expression.ts`, `comments.ts` (the markers used to map diagnostics back to template spans),
`oob.ts` (out-of-band diagnostics), `schema.ts`, and `host_bindings.ts`. `ops/` has one module per
construct that needs its own TCB shape — `element.ts`, `template.ts`, `if_block.ts`,
`for_block.ts`, `switch_block.ts`, `let.ts`, `inputs.ts`, `events.ts`, `references.ts`,
`variables.ts`, `content_projection.ts`, `directive_constructor.ts`, `selectorless.ts`,
`signal_forms.ts`, `completions.ts` (the language service's completion hooks), and `codegen.ts`.

## 6. JIT and facades

`src/jit_compiler_facade.ts` implements `CompilerFacade`, the interface `@angular/core` calls at
runtime when a decorated class has no AOT definition; `src/compiler_facade_interface.ts` is the
duplicated-by-design contract shared with core (both copies must stay in sync);
`src/render3/r3_jit.ts` evaluates the generated output AST. `src/resource_loader.ts` and
`src/style_url_resolver.ts` resolve `templateUrl`/`styleUrls`.
