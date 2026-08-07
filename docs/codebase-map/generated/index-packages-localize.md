<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/localize/`

103 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/localize/`

- `packages/localize/index.ts` — 113 lines
  - re-exports * from `./private`
  - exports `clearTranslations`, `loadTranslations` from `./src/translate`
  - exports `MessageId`, `TargetMessage` from `./src/utils`
- `packages/localize/private.ts` — 34 lines
  - exports `$localize as ɵ$localize`, `LocalizeFn as ɵLocalizeFn`, `TranslateFn as ɵTranslateFn` from `./src/localize`
  - exports `computeMsgId as ɵcomputeMsgId`, `findEndOfBlock as ɵfindEndOfBlock`, `isMissingTranslationError as ɵisMissingTranslationError`, `makeParsedTranslation as ɵmakeParsedTranslation`, `makeTemplateObject as ɵmakeTemplateObject`, `MissingTranslationError as ɵMissingTranslationError`, `ParsedMessage as ɵParsedMessage`, `ParsedTranslation as ɵParsedTranslation`, `ParsedTranslations as ɵParsedTranslations`, `parseMessage as ɵparseMessage`, `parseMetadata as ɵparseMetadata`, `parseTranslation as ɵparseTranslation`, `SourceLocation as ɵSourceLocation`, `SourceMessage as ɵSourceMessage`, `splitBlock as ɵsplitBlock`, `translate as ɵtranslate` from `./src/utils`



## `packages/localize/init/`

- `packages/localize/init/index.ts` — 18 lines
  - exports `$localize`, `LocalizeFn`, `TranslateFn`



## `packages/localize/schematics/ng-add/`

- `packages/localize/schematics/ng-add/index.ts` — 183 lines
  - has a default export
- `packages/localize/schematics/ng-add/index_spec.ts` — 300 lines _(spec)_
- `packages/localize/schematics/ng-add/schema.d.ts` — 22 lines _(typings)_
  - interface: `Schema`



## `packages/localize/src/`

- `packages/localize/src/translate.ts` — 112 lines
  - function: `loadTranslations`, `clearTranslations`, `translate`



## `packages/localize/src/localize/`

- `packages/localize/src/localize/doc_index.ts` — 9 lines
  - exports `$localize` from `./src/localize`
- `packages/localize/src/localize/index.ts` — 9 lines
  - exports `$localize`, `LocalizeFn`, `TranslateFn` from `./src/localize`



## `packages/localize/src/localize/src/`

- `packages/localize/src/localize/src/localize.ts` — 183 lines
  - interface: `LocalizeFn`, `TranslateFn`
  - const: `$localize`



## `packages/localize/src/localize/test/`

- `packages/localize/src/localize/test/localize_spec.ts` — 133 lines _(spec)_



## `packages/localize/src/utils/`

- `packages/localize/src/utils/index.ts` — 11 lines
  - re-exports * from `./src/constants`
  - re-exports * from `./src/messages`
  - re-exports * from `./src/translations`



## `packages/localize/src/utils/src/`

- `packages/localize/src/utils/src/constants.ts` — 62 lines
  - const: `BLOCK_MARKER`, `MEANING_SEPARATOR`, `ID_SEPARATOR`, `LEGACY_ID_INDICATOR`
- `packages/localize/src/utils/src/messages.ts` — 354 lines
  - type: `SourceMessage`, `TargetMessage`, `MessageId`
  - interface: `SourceLocation`, `MessageMetadata`, `ParsedMessage`
  - function: `parseMessage`, `parseMetadata`, `parsePlaceholder`, `splitBlock`, `findEndOfBlock`
  - exports `computeMsgId`
- `packages/localize/src/utils/src/translations.ts` — 151 lines
  - interface: `ParsedTranslation`
  - type: `ParsedTranslations`
  - class: `MissingTranslationError`
  - function: `isMissingTranslationError`, `translate`, `parseTranslation`, `makeParsedTranslation`, `makeTemplateObject`



## `packages/localize/src/utils/test/`

- `packages/localize/src/utils/test/messages_spec.ts` — 316 lines _(spec)_
- `packages/localize/src/utils/test/translations_spec.ts` — 240 lines _(spec)_



## `packages/localize/test/`

- `packages/localize/test/translate_spec.ts` — 138 lines _(spec)_



## `packages/localize/tools/`

- `packages/localize/tools/esbuild.config.js` — 21 lines
- `packages/localize/tools/index.ts` — 41 lines
  - exports `DiagnosticHandlingStrategy`, `Diagnostics` from `./src/diagnostics`
  - exports `checkDuplicateMessages` from `./src/extract/duplicates`
  - exports `MessageExtractor` from `./src/extract/extraction`
  - exports `ArbTranslationSerializer` from `./src/extract/translation_files/arb_translation_serializer`
  - exports `SimpleJsonTranslationSerializer` from `./src/extract/translation_files/json_translation_serializer`
  - exports `LegacyMessageIdMigrationSerializer` from `./src/extract/translation_files/legacy_message_id_migration_serializer`
  - exports `Xliff1TranslationSerializer` from `./src/extract/translation_files/xliff1_translation_serializer`
  - exports `Xliff2TranslationSerializer` from `./src/extract/translation_files/xliff2_translation_serializer`
  - exports `XmbTranslationSerializer` from `./src/extract/translation_files/xmb_translation_serializer`
  - exports `buildLocalizeReplacement`, `isGlobalIdentifier`, `translate`, `unwrapExpressionsFromTemplateLiteral`, `unwrapMessagePartsFromLocalizeCall`, `unwrapMessagePartsFromTemplateLiteral`, `unwrapSubstitutionsFromLocalizeCall` from `./src/source_file_utils`
  - exports `makeEs2015TranslatePlugin` from `./src/translate/source_files/es2015_translate_plugin`
  - exports `makeEs5TranslatePlugin` from `./src/translate/source_files/es5_translate_plugin`
  - exports `makeLocalePlugin` from `./src/translate/source_files/locale_plugin`
  - exports `ArbTranslationParser` from `./src/translate/translation_files/translation_parsers/arb_translation_parser`
  - exports `SimpleJsonTranslationParser` from `./src/translate/translation_files/translation_parsers/simple_json_translation_parser`
  - exports `Xliff1TranslationParser` from `./src/translate/translation_files/translation_parsers/xliff1_translation_parser`
  - exports `Xliff2TranslationParser` from `./src/translate/translation_files/translation_parsers/xliff2_translation_parser`
  - exports `XtbTranslationParser` from `./src/translate/translation_files/translation_parsers/xtb_translation_parser`



## `packages/localize/tools/src/`

- `packages/localize/tools/src/diagnostics.ts` — 53 lines
  - type: `DiagnosticHandlingStrategy`
  - class: `Diagnostics`
- `packages/localize/tools/src/source_file_utils.ts` — 526 lines
  - function: `isLocalize`, `isNamedIdentifier`, `isGlobalIdentifier`, `buildLocalizeReplacement`, `unwrapMessagePartsFromLocalizeCall`, `unwrapSubstitutionsFromLocalizeCall`, `unwrapMessagePartsFromTemplateLiteral`, `unwrapExpressionsFromTemplateLiteral`, `wrapInParensIfNecessary`, `unwrapStringLiteralArray`, `unwrapLazyLoadHelperCall`, `isStringLiteralArray`, `isArrayOfExpressions`, `translate`, `isBabelParseError`, `buildCodeFrameError`, `getLocation`, `serializeLocationPosition`
  - interface: `TranslatePluginOptions`
  - class: `BabelParseError`



## `packages/localize/tools/src/extract/`

- `packages/localize/tools/src/extract/cli.ts` — 132 lines
- `packages/localize/tools/src/extract/duplicates.ts` — 66 lines
  - function: `checkDuplicateMessages`
- `packages/localize/tools/src/extract/extraction.ts` — 144 lines
  - interface: `ExtractionOptions`
  - class: `MessageExtractor`
- `packages/localize/tools/src/extract/index.ts` — 165 lines
  - interface: `ExtractTranslationsOptions`
  - function: `extractTranslations`



## `packages/localize/tools/src/extract/source_files/`

- `packages/localize/tools/src/extract/source_files/es2015_extract_plugin.ts` — 53 lines
  - function: `makeEs2015ExtractPlugin`
- `packages/localize/tools/src/extract/source_files/es5_extract_plugin.ts` — 66 lines
  - function: `makeEs5ExtractPlugin`



## `packages/localize/tools/src/extract/translation_files/`

- `packages/localize/tools/src/extract/translation_files/arb_translation_serializer.ts` — 113 lines
  - class: `ArbTranslationSerializer`
- `packages/localize/tools/src/extract/translation_files/format_options.ts` — 48 lines
  - type: `FormatOptions`, `ValidOption`, `ValidOptions`
  - function: `validateOptions`, `parseFormatOptions`
- `packages/localize/tools/src/extract/translation_files/icu_parsing.ts` — 217 lines
  - function: `extractIcuPlaceholders`
- `packages/localize/tools/src/extract/translation_files/json_translation_serializer.ts` — 34 lines
  - class: `SimpleJsonTranslationSerializer`
- `packages/localize/tools/src/extract/translation_files/legacy_message_id_migration_serializer.ts` — 54 lines
  - class: `LegacyMessageIdMigrationSerializer`
- `packages/localize/tools/src/extract/translation_files/translation_serializer.ts` — 22 lines
  - interface: `TranslationSerializer`
- `packages/localize/tools/src/extract/translation_files/utils.ts` — 81 lines
  - function: `consolidateMessages`, `hasLocation`, `compareLocations`
- `packages/localize/tools/src/extract/translation_files/xliff1_translation_serializer.ts` — 244 lines
  - class: `Xliff1TranslationSerializer`
- `packages/localize/tools/src/extract/translation_files/xliff2_translation_serializer.ts` — 234 lines
  - class: `Xliff2TranslationSerializer`
- `packages/localize/tools/src/extract/translation_files/xmb_translation_serializer.ts` — 145 lines
  - class: `XmbTranslationSerializer`
- `packages/localize/tools/src/extract/translation_files/xml_file.ts` — 111 lines
  - class: `XmlFile`



## `packages/localize/tools/src/migrate/`

- `packages/localize/tools/src/migrate/cli.ts` — 57 lines
- `packages/localize/tools/src/migrate/index.ts` — 53 lines
  - interface: `MigrateFilesOptions`
  - function: `migrateFiles`
- `packages/localize/tools/src/migrate/migrate.ts` — 31 lines
  - type: `MigrationMapping`
  - function: `migrateFile`



## `packages/localize/tools/src/translate/`

- `packages/localize/tools/src/translate/cli.ts` — 136 lines
- `packages/localize/tools/src/translate/index.ts` — 135 lines
  - interface: `TranslateFilesOptions`
  - function: `translateFiles`
- `packages/localize/tools/src/translate/output_path.ts` — 45 lines
  - interface: `OutputPathFn`
  - function: `getOutputPathFn`
- `packages/localize/tools/src/translate/translator.ts` — 109 lines
  - interface: `TranslationBundle`, `TranslationHandler`
  - class: `Translator`



## `packages/localize/tools/src/translate/asset_files/`

- `packages/localize/tools/src/translate/asset_files/asset_translation_handler.ts` — 68 lines
  - class: `AssetTranslationHandler`



## `packages/localize/tools/src/translate/source_files/`

- `packages/localize/tools/src/translate/source_files/es2015_translate_plugin.ts` — 68 lines
  - function: `makeEs2015TranslatePlugin`
- `packages/localize/tools/src/translate/source_files/es5_translate_plugin.ts` — 64 lines
  - function: `makeEs5TranslatePlugin`
- `packages/localize/tools/src/translate/source_files/locale_plugin.ts` — 101 lines
  - function: `makeLocalePlugin`
- `packages/localize/tools/src/translate/source_files/source_file_translation_handler.ts` — 161 lines
  - class: `SourceFileTranslationHandler`



## `packages/localize/tools/src/translate/translation_files/`

- `packages/localize/tools/src/translate/translation_files/base_visitor.ts` — 41 lines
  - class: `BaseVisitor`
- `packages/localize/tools/src/translate/translation_files/translation_loader.ts` — 160 lines
  - class: `TranslationLoader`



## `packages/localize/tools/src/translate/translation_files/message_serialization/`

- `packages/localize/tools/src/translate/translation_files/message_serialization/message_renderer.ts` — 22 lines
  - interface: `MessageRenderer`
- `packages/localize/tools/src/translate/translation_files/message_serialization/message_serializer.ts` — 109 lines
  - interface: `MessageSerializerConfig`
  - class: `MessageSerializer`
- `packages/localize/tools/src/translate/translation_files/message_serialization/target_message_renderer.ts` — 72 lines
  - class: `TargetMessageRenderer`



## `packages/localize/tools/src/translate/translation_files/translation_parsers/`

- `packages/localize/tools/src/translate/translation_files/translation_parsers/arb_translation_parser.ts` — 100 lines
  - interface: `ArbJsonObject`, `ArbMetadata`, `ArbLocation`
  - class: `ArbTranslationParser`
- `packages/localize/tools/src/translate/translation_files/translation_parsers/serialize_translation_message.ts` — 39 lines
  - function: `serializeTranslationMessage`
- `packages/localize/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser.ts` — 83 lines
  - class: `SimpleJsonTranslationParser`
- `packages/localize/tools/src/translate/translation_files/translation_parsers/translation_parser.ts` — 87 lines
  - interface: `CanParseAnalysis`, `CannotParseAnalysis`, `ParsedTranslationBundle`, `TranslationParser`
  - type: `ParseAnalysis`
- `packages/localize/tools/src/translate/translation_files/translation_parsers/translation_utils.ts` — 188 lines
  - function: `getAttrOrThrow`, `getAttribute`, `parseInnerRange`, `canParseXml`, `isNamedElement`, `addParseDiagnostic`, `addParseError`, `addErrorsToBundle`
  - interface: `XmlTranslationParserHint`
- `packages/localize/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser.ts` — 173 lines
  - class: `Xliff1TranslationParser`
- `packages/localize/tools/src/translate/translation_files/translation_parsers/xliff2_translation_parser.ts` — 180 lines
  - class: `Xliff2TranslationParser`
- `packages/localize/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser.ts` — 126 lines
  - class: `XtbTranslationParser`



## `packages/localize/tools/test/`

- `packages/localize/tools/test/diagnostics_spec.ts` — 51 lines _(spec)_
- `packages/localize/tools/test/source_file_utils_spec.ts` — 514 lines _(spec)_



## `packages/localize/tools/test/extract/`

- `packages/localize/tools/test/extract/extractor_spec.ts` — 157 lines _(spec)_



## `packages/localize/tools/test/extract/integration/`

- `packages/localize/tools/test/extract/integration/main_spec.ts` — 569 lines _(spec)_



## `packages/localize/tools/test/extract/integration/test_files/`

- `packages/localize/tools/test/extract/integration/test_files/duplicate.js` — 8 lines _(test-support)_
- `packages/localize/tools/test/extract/integration/test_files/test.js` — 8 lines _(spec)_



## `packages/localize/tools/test/extract/integration/test_files/src/`

- `packages/localize/tools/test/extract/integration/test_files/src/a.ts` — 4 lines _(test-support)_
  - const: `messageA`
- `packages/localize/tools/test/extract/integration/test_files/src/b.ts` — 4 lines _(test-support)_
  - const: `messageB`
- `packages/localize/tools/test/extract/integration/test_files/src/index.ts` — 3 lines _(test-support)_
  - re-exports * from `./a`
  - re-exports * from `./b`



## `packages/localize/tools/test/extract/source_files/`

- `packages/localize/tools/test/extract/source_files/es5_extract_plugin_spec.ts` — 53 lines _(spec)_



## `packages/localize/tools/test/extract/translation_files/`

- `packages/localize/tools/test/extract/translation_files/arb_translation_serializer_spec.ts` — 197 lines _(spec)_
- `packages/localize/tools/test/extract/translation_files/format_options_spec.ts` — 55 lines _(spec)_
- `packages/localize/tools/test/extract/translation_files/icu_parsing_spec.ts` — 84 lines _(spec)_
- `packages/localize/tools/test/extract/translation_files/json_translation_serializer_spec.ts` — 69 lines _(spec)_
- `packages/localize/tools/test/extract/translation_files/legacy_message_id_migration_serializer_spec.ts` — 80 lines _(spec)_
- `packages/localize/tools/test/extract/translation_files/mock_message.ts` — 60 lines _(test-support)_
  - interface: `MockMessageOptions`
  - function: `mockMessage`, `location`
- `packages/localize/tools/test/extract/translation_files/utils.ts` — 18 lines _(test-support)_
  - function: `toAttributes`
- `packages/localize/tools/test/extract/translation_files/xliff1_translation_serializer_spec.ts` — 424 lines _(spec)_
- `packages/localize/tools/test/extract/translation_files/xliff2_translation_serializer_spec.ts` — 451 lines _(spec)_
- `packages/localize/tools/test/extract/translation_files/xmb_translation_serializer_spec.ts` — 151 lines _(spec)_



## `packages/localize/tools/test/helpers/`

- `packages/localize/tools/test/helpers/index.ts` — 26 lines _(test-support)_
  - function: `runInNativeFileSystem`



## `packages/localize/tools/test/migrate/`

- `packages/localize/tools/test/migrate/migrate_spec.ts` — 137 lines _(spec)_



## `packages/localize/tools/test/migrate/integration/`

- `packages/localize/tools/test/migrate/integration/main_spec.ts` — 218 lines _(spec)_



## `packages/localize/tools/test/translate/`

- `packages/localize/tools/test/translate/output_path_spec.ts` — 54 lines _(spec)_
- `packages/localize/tools/test/translate/translator_spec.ts` — 149 lines _(spec)_



## `packages/localize/tools/test/translate/asset_files/`

- `packages/localize/tools/test/translate/asset_files/asset_file_translation_handler_spec.ts` — 94 lines _(spec)_



## `packages/localize/tools/test/translate/integration/`

- `packages/localize/tools/test/translate/integration/main_spec.ts` — 274 lines _(spec)_



## `packages/localize/tools/test/translate/integration/test_files/`

- `packages/localize/tools/test/translate/integration/test_files/test-extra.js` — 4 lines _(test-support)_
- `packages/localize/tools/test/translate/integration/test_files/test.js` — 3 lines _(spec)_



## `packages/localize/tools/test/translate/source_files/`

- `packages/localize/tools/test/translate/source_files/es2015_translate_plugin_spec.ts` — 200 lines _(spec)_
- `packages/localize/tools/test/translate/source_files/es5_translate_plugin_spec.ts` — 387 lines _(spec)_
- `packages/localize/tools/test/translate/source_files/locale_plugin_spec.ts` — 97 lines _(spec)_
- `packages/localize/tools/test/translate/source_files/source_file_translation_handler_spec.ts` — 185 lines _(spec)_



## `packages/localize/tools/test/translate/translation_files/`

- `packages/localize/tools/test/translate/translation_files/translation_loader_spec.ts` — 248 lines _(spec)_



## `packages/localize/tools/test/translate/translation_files/translation_parsers/`

- `packages/localize/tools/test/translate/translation_files/translation_parsers/arb_translation_parser_spec.ts` — 55 lines _(spec)_
- `packages/localize/tools/test/translate/translation_files/translation_parsers/simple_json_spec.ts` — 93 lines _(spec)_
- `packages/localize/tools/test/translate/translation_files/translation_parsers/xliff1_translation_parser_spec.ts` — 871 lines _(spec)_
- `packages/localize/tools/test/translate/translation_files/translation_parsers/xliff2_translation_parser_spec.ts` — 792 lines _(spec)_
- `packages/localize/tools/test/translate/translation_files/translation_parsers/xtb_translation_parser_spec.ts` — 454 lines _(spec)_

