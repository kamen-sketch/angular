# `localize` and `language-service`

Two tooling-facing packages: one implements the `$localize` runtime and the i18n build tools, the
other is the editor integration.

Generated indexes:
[`localize`](./generated/index-packages-localize.md) ·
[`language-service`](./generated/index-packages-language-service.md)

---

## 1. `packages/localize` (103 files, ~15k lines)

### 1.1 Runtime

- `src/localize/src/localize.ts` — the `$localize` tagged template function itself. At runtime it
  looks up a translation by message id in `$localize.TRANSLATIONS` and re-substitutes the
  expressions; when no translation exists it returns the source text.
- `src/utils/src/messages.ts` — parsing the `:meta:` blocks the compiler encodes in the template
  strings (message id, meaning, description, placeholder names) and computing message ids.
- `src/utils/src/translations.ts` — `translate()`, the matching of a parsed message against loaded
  translations, and the "missing/extra placeholder" errors.
- `src/utils/src/constants.ts`, `src/translate.ts`, `private.ts` — shared constants and the
  internal surface used by the tools.
- `init/` — the side-effect entry point (`import '@angular/localize/init'`) that installs
  `$localize` on the global object.

### 1.2 Build tools (`tools/`)

Three CLIs, all built on Babel:

- **extract** (`src/extract/`) — `cli.ts` drives `extraction.ts`, which walks compiled JS for
  `$localize` calls and collects `ɵParsedMessage`s (`duplicates.ts` reports conflicting
  definitions of the same id). `translation_files/` has one serializer per output format:
  `xliff1_translation_serializer.ts`, `xliff2_translation_serializer.ts`,
  `xmb_translation_serializer.ts`, `json_translation_serializer.ts`,
  `arb_translation_serializer.ts`, plus `legacy_message_id_migration_serializer.ts`,
  `icu_parsing.ts` and `xml_file.ts`.
- **translate** (`src/translate/`) — `translator.ts` applies translations to a bundle per locale.
  `source_files/` holds the Babel plugins that do the substitution
  (`es2015_translate_plugin.ts` for tagged templates, `es5_translate_plugin.ts` for downlevelled
  output, `locale_plugin.ts` for `$localize.locale`), `translation_files/translation_parsers/`
  parse each supported input format back into messages, `asset_files/` copies non-JS assets, and
  `output_path.ts` implements the `{{LOCALE}}` output pattern.
- **migrate** (`src/migrate/`) — rewrites legacy message ids to the current hashing scheme.

`src/source_file_utils.ts` and `src/diagnostics.ts` are shared across all three.
`schematics/` holds the `ng add @angular/localize` schematic.

### 1.3 Findings in this package

Read file by file; the evidence for each is in the
[findings register](./findings-register.md). Worth knowing before changing anything here:

| #   | Where                                                  | What                                                                            |
| --- | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| 31  | `src/utils/src/messages.ts:253`                        | metadata parser truncates where the compiler's `parseI18nMeta` does not         |
| 32  | `tools/…/extract/…/xml_file.ts:35`                     | empty attributes dropped; the three serializers disagree about whether they are |
| 33  | `tools/…/translation_parsers/translation_utils.ts:130` | one message names XLIFF 1.2 for all three formats                               |
| 34  | `tools/src/source_file_utils.ts:156`                   | arity check crashes where its twin raises a diagnostic                          |
| 35  | `tools/src/source_file_utils.ts:509`                   | optional chain broken by parentheses                                            |
| 36  | `src/utils/src/messages.ts:344`                        | `findEndOfBlock` desyncs on escapes longer than two raw characters              |
| 37  | `src/utils/src/translations.ts:58`                     | tools bundles are plain objects keyed by message id                             |

The register also clears `icu_parsing.ts`, `escapeXml`, and two things in `translation_utils.ts`
that look wrong and are not.

## 2. `packages/language-service` (90 files, ~37k lines)

A TypeScript language-service plugin (`src/ts_plugin.ts`) that adds Angular template awareness to
editors. It creates an `NgCompiler` (`src/compiler_factory.ts`) configured for incremental,
long-lived use and answers editor requests against it — the same compiler the CLI uses, so
diagnostics in the editor match the build.

- `src/language_service.ts` — `LanguageService`, the class implementing every request below;
  `src/adapters.ts` adapts the TS language-service host to the compiler's `FileSystem`/
  `ProgramDriver` interfaces.
- `src/template_target.ts` — given a file + offset, work out _what_ the cursor is on (an element,
  an attribute, an expression node, a block parameter). Nearly every feature starts here.
- `src/completions.ts` + `src/attribute_completions.ts` — completions for template expressions,
  element names, attributes/inputs/outputs, pipe names, and structural-directive shorthands.
- `src/quick_info.ts` + `src/quick_info_built_ins.ts` — hover information, including for the
  built-in blocks (`@if`, `@for`, `@defer`, `@let`).
- `src/definitions.ts` — go-to-definition and go-to-type-definition across the template/TS boundary.
- `src/references_and_rename.ts` (+ `_utils.ts`) — find-all-references and rename, using the
  compiler's indexer.
- `src/signature_help.ts`, `src/inlay_hints.ts`, `src/semantic_tokens.ts`,
  `src/outlining_spans.ts`, `src/document_symbols.ts`, `src/linked_editing_range.ts` — the
  remaining editor features (the last one keeps a tag's open/close names in sync while typing).
- `src/codefixes/` — quick fixes: `fix_invalid_banana_in_box.ts`, `fix_missing_import.ts`,
  `fix_missing_member.ts`, `fix_missing_required_inputs.ts`, `fix_unused_standalone_imports.ts`,
  registered through `all_codefixes_metas.ts`.
- `src/refactorings/` — `convert_to_signal_input/` and `convert_to_signal_queries/`, which reuse the
  migration logic from `packages/core/schematics`.
- `src/utils/` — `display_parts.ts` (building the rich text editors show), `decorators.ts`,
  `format.ts`.
- `bundles/` — the rollup config that produces the single-file plugin shipped to editors.

The VS Code extension that consumes this plugin lives in `vscode-ng-language-service/` at the
repository root.
