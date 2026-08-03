# `packages/compiler-cli` — ngtsc, the TypeScript integration

`@angular/compiler-cli` (2,549 files, ~226k lines — the largest package by file count, mostly
tests and fixtures) is the bridge between TypeScript and `@angular/compiler`. It owns the
`ts.Program`, decides *what* to compile, drives template type checking, and emits the transformed
JavaScript and `.d.ts`. The Angular CLI consumes it through `NgtscProgram`/`NgCompiler`; the
language service consumes the same `NgCompiler` in a long-lived, incremental configuration.

Entry points: [`index.ts`](../../packages/compiler-cli/index.ts), `src/main.ts` (the `ngc` binary
in `src/bin/ngc.ts`), `src/bin/ng_xi18n.ts`, `linker/`, and the `private/` surface consumed by the
CLI, the language service and the migration tooling.
Full file/symbol listing: [`generated/index-packages-compiler-cli.md`](./generated/index-packages-compiler-cli.md).

---

## 1. Program-level entry points (`src/`)

- `main.ts` — the `ngc` CLI: reads `tsconfig`, calls `performCompilation`, formats diagnostics.
- `perform_compile.ts` — `performCompilation`, `readConfiguration`, diagnostic formatting.
- `perform_watch.ts` — watch-mode host with file-change debouncing.
- `transformers/program.ts` — `NgtscProgram`, the `ts.Program` wrapper that owns an `NgCompiler`
  and exposes `getTsProgram`, `getNgSemanticDiagnostics`, `emit`, `listLazyRoutes`.
- `transformers/compiler_host.ts`, `transformers/api.ts`, `transformers/entry_points.ts`,
  `transformers/i18n.ts` — the `CompilerHost` extension points and the i18n entry points.
- `typescript_support.ts` / `version_helpers.ts` — the supported-TypeScript-version check.
- `extract_i18n.ts` — message extraction driver (`xi18n`).
- `private/` — the deliberately non-public API other Angular tooling imports:
  `tooling.ts` (CLI hooks such as `constructorParametersDownlevelTransform`),
  `migrations.ts`, `localize.ts`, `hybrid_analysis.ts`, `testing.ts`.

## 2. `src/ngtsc/` — the compiler proper

### 2.1 The compilation lifecycle

`ngtsc/core/src/compiler.ts` holds **`NgCompiler`**, the object that coordinates everything. It is
created from a *ticket* that describes how this compilation relates to the previous one:

- `freshCompilationTicket` — no previous state (a cold build);
- `incrementalFromCompilerTicket` / `incrementalFromStateTicket` — reuse analysis from a previous
  `NgCompiler` or from serialised `IncrementalState`;
- `resourceChangeTicket` — only templates/styles changed, so TypeScript analysis can be reused
  wholesale.

Most work is deferred into a `LazyCompilationState` that is built on first use, so the language
service can ask narrow questions without paying for a whole compilation.

### 2.2 Traits and `DecoratorHandler` (`ngtsc/transform/`, `ngtsc/annotations/`)

Compilation is expressed as *traits*: a class plus a handler that knows how to compile one
decorator on it. `transform/src/api.ts` defines the contract, and every phase of the compiler is a
method on it, called in this order:

| Phase | Method | Purpose |
| --- | --- | --- |
| detect | `detect()` | does this handler apply to this class? returns `DetectResult` |
| analyze | `analyze()` | statically evaluate the decorator metadata → `AnalysisOutput` + diagnostics |
| symbol | `symbol()` | produce the `SemanticSymbol` used for incremental invalidation |
| register | `register()` | populate registries (metadata, scope, injectable) |
| index | `index()` | feed the indexer used by the language service |
| resolve | `resolve()` | cross-class work that needs all classes registered (e.g. template scope) |
| xi18n | `xi18n()` | contribute messages to an extraction bundle |
| typeCheck | `typeCheck()` | add the class's template to the type-check context |
| extendedTemplateCheck / templateSemanticsCheck | | the extra template diagnostics |
| compile | `compileFull()` / `compilePartial()` / `compileLocal()` / `compileHmrUpdateDeclaration()` | emit the static fields |

`HandlerPrecedence` (`PRIMARY`, `SHARED`, `WEAK`) resolves what happens when several handlers match
one class; `CompilationMode` (`FULL`, `PARTIAL`, `LOCAL`) selects which `compile*` method runs —
`PARTIAL` for publishing libraries, `LOCAL` for the CLI's fast per-file dev loop.

The handlers themselves live in `ngtsc/annotations/`:

- `component/src/handler.ts` — the biggest one: resolves `templateUrl`/`styleUrls`
  (`resources.ts`), parses the template, computes the component scope, wires `@defer` dependencies,
  animations (`animations.ts`), selectorless imports (`selectorless.ts`), foreign components
  (`foreign_component.ts`), and produces `R3ComponentMetadata`.
- `directive/src/handler.ts` plus the initializer-API extraction that makes `input()`, `model()`,
  `output()`, `viewChild()` &c. statically visible: `initializer_functions.ts`,
  `input_function.ts`, `model_function.ts`, `output_function.ts`, `query_functions.ts`,
  `initializer_function_access.ts`.
- `ng_module/src/handler.ts` (+ `module_with_providers.ts`), `src/injectable.ts`, `src/pipe.ts`,
  `src/service.ts`.
- `common/src/` — shared machinery: `di.ts` (constructor dependency extraction),
  `evaluation.ts`, `factory.ts`, `metadata.ts`, `schema.ts`, `input_transforms.ts`,
  `injectable_registry.ts`, `references_registry.ts`, `debug_info.ts`, `diagnostics.ts`.

`transform/src/compilation.ts` (`TraitCompiler`) runs the phases across the program, and
`transform/src/transform.ts` is the `ts.TransformerFactory` that actually splices the generated
static fields into the emitted JS; `declaration.ts` does the same for `.d.ts` output.
`transform/jit/` holds the JIT-mode downlevel transforms (`downlevel_decorators_transform.ts`,
`initializer_api_transforms/`) that the CLI applies in dev builds.

### 2.3 Static evaluation and reflection

- `ngtsc/reflection/` — `ReflectionHost`, the abstraction over "what does this class look like",
  used so the compiler never touches `ts.Node` shapes directly.
- `ngtsc/partial_evaluator/` — the interpreter that evaluates decorator arguments at compile time
  (`interpreter.ts`, `dynamic.ts` for the "we could not evaluate this and here is why" traces,
  `builtin.ts`, `synthetic.ts`). Its `DynamicValue` diagnostics are what produce the familiar
  "function calls are not supported in decorators" errors.
- `ngtsc/imports/` — everything about turning a resolved class into an import in generated code:
  `references.ts` (`Reference` with its owning module), `emitter.ts` (`ReferenceEmitter` strategies:
  local, absolute-module, alias, relative), `alias.ts`, `reexport.ts`, `deferred_symbol_tracker.ts`
  (which imports may become `import()` for `@defer`), `local_compilation_extra_imports_tracker.ts`.
- `ngtsc/metadata/` — the `MetadataReader`/`MetadataRegistry` pair that answers "what are this
  directive's inputs/outputs/host directives", including reading from `.d.ts` (`dts.ts`),
  inheritance (`inheritance.ts`), and `host_directives_resolver.ts`.
- `ngtsc/scope/` — which directives/pipes are in scope for a template: `local.ts` (NgModule scopes),
  `standalone.ts`, `selectorless_scope.ts`, `component_scope.ts`, `dependency.ts`, and
  `typecheck.ts` for the type-checking view of the same data.

### 2.4 Template type checking (`ngtsc/typecheck/`)

The largest subsystem (57 files). `src/checker.ts` implements `TemplateTypeCheckerImpl`;
`src/context.ts` collects per-file type-check blocks; `src/type_check_file.ts` writes them into a
generated shim file; `@angular/compiler`'s `type_check_block.ts` generates the statements.
`src/environment.ts` and `src/type_constructor.ts` synthesise the type constructors that let
TypeScript infer generic directive types; `src/type_parameter_emitter.ts` copies generic
signatures into the shim. Diagnostics produced inside the shim are mapped back to template offsets
by `src/comments.ts`, `src/diagnostics.ts`, `src/line_mappings.ts`, and `src/source.ts`;
`src/oob.ts` reports the problems that cannot be expressed as a TS error in the shim.
`src/completion.ts`, `src/symbol_util.ts` and `src/template_symbol_builder.ts` exist for the
language service. `src/dom.ts` checks element/attribute names against the DOM schema.

`extended/` adds the opt-in diagnostics, one directory per check under `extended/checks/`:
`invalid_banana_in_box`, `nullish_coalescing_not_nullable`, `optional_chain_not_nullable`,
`missing_control_flow_directive`, `missing_structural_directive`, `missing_ngforof_let`,
`text_attribute_not_binding`, `suffix_not_supported`, `interpolated_signal_not_invoked`,
`uninvoked_function_in_event_binding`, `uninvoked_function_in_text_interpolation`,
`uninvoked_track_function`, `unused_let_declaration`, `unparenthesized_nullish_coalescing`,
`skip_hydration_not_static`, `defer_trigger_misconfiguration`.
`template_semantics/` holds checks that need scope knowledge rather than types.

### 2.5 Incrementality and performance

- `ngtsc/incremental/` — `IncrementalCompilation` tracks per-file dependencies
  (`dependency_tracking.ts`) and reuses analysis when a file's semantic shape is unchanged.
  `semantic_graph/` models each class as a `SemanticSymbol` whose *public shape* determines whether
  dependents must be re-emitted, so a change to a method body does not invalidate consumers.
- `ngtsc/program_driver/` — abstracts "update the program with these new shim files" so the same
  compiler works under `tsc`, the CLI's watch mode, and the language service.
- `ngtsc/perf/` — the phase/event recorder behind `ng build --verbose` timing output.
- `ngtsc/cycles/` — import-cycle analysis, which decides whether a component may reference another
  directly or must go through a remote-scope registration.

### 2.6 Supporting subsystems

`ngtsc/file_system/` (the `FileSystem` abstraction and `AbsoluteFsPath` branded type used
everywhere in the compiler), `ngtsc/shims/` (generated `.ngtypecheck.ts`/factory shims),
`ngtsc/resource/` (template/style loading and the CLI's resource-change protocol),
`ngtsc/translator/` (output AST → TypeScript AST, including the `.d.ts` type emitters),
`ngtsc/sourcemaps/` (source-map chaining), `ngtsc/diagnostics/` (`ErrorCode`, the
`NG` error-code namespace and `extended_template_diagnostic_name.ts`), `ngtsc/validation/`
(post-compilation source-level rules), `ngtsc/indexer/` (the index the language service uses for
find-references), `ngtsc/docs/` (the API-doc extraction that powers angular.dev's reference pages),
`ngtsc/hmr/` (generating HMR update modules), `ngtsc/xi18n/`, `ngtsc/logging/`,
`ngtsc/entry_point/` (flat-module index and `.d.ts` bundling), `ngtsc/testing/` (the in-memory
compiler test harness used by hundreds of specs), and `ngtsc/tsc_plugin.ts` (the tsc plugin entry).

## 3. `linker/` — consuming partially-compiled libraries

Libraries published with `compilationMode: 'partial'` contain `ɵɵngDeclare*` calls instead of real
definitions. The linker rewrites them at application build time (it runs as a Babel plugin in the
CLI):

- `linker/src/file_linker/needs_linking.ts` — cheap check whether a file contains declarations.
- `file_linker.ts` — walks a file and links each declaration.
- `partial_linkers/` — one linker per declaration kind (component, directive, NgModule, pipe,
  injectable, injector, factory, class metadata), each responsible for translating the declaration
  object into a call to the corresponding `compile*FromMetadata` in `@angular/compiler`, including
  handling of older declaration versions.
- `emit_scopes/`, `translator.ts`, `linker_environment.ts`, `linker_options.ts`,
  `declaration_scope.ts`, `linker_import_generator.ts` — the plumbing that lets the same linker run
  over either Babel or TypeScript ASTs (`linker/src/ast/`), with `linker/babel/` being the Babel
  binding published to npm.
