# Schematics and migrations (`packages/core/schematics`)

`ng update` and `ng generate` code transformations live inside `packages/core/schematics`, next to
the framework code they migrate. Each migration is a self-contained directory that is bundled into
a single `.cjs` file at build time (`rollup.config.js`) and registered in `migrations.json` (for
`ng update`) or `collection.json` (for `ng generate`).

---

## 1. Tsurge — the migration framework (`utils/tsurge/`)

Most non-trivial migrations are written against **Tsurge**, a three-stage framework designed so a
migration can be sharded across workers in Google's internal build system and still produce a
consistent result:

1. **analyze** — run per compilation unit, produces serialisable `UnitAnalysisMetadata`;
2. **merge/combine** — folds all unit metadata into `CombinedGlobalMetadata`
   (`helpers/combine_units.ts`, `executors/combine_exec.ts`, `executors/global_meta_exec.ts`);
3. **migrate** — computes `Replacement`s (`replacement.ts`) from the global metadata, which are
   grouped per file (`helpers/group_replacements.ts`) and applied.

Two base classes express how much fan-out a migration needs: `TsurgeFunnelMigration` (analysis
fans out, migration happens once) and `TsurgeComplexMigration` (both stages fan out).
`base_migration.ts`, `program_info.ts`, `project_paths.ts` and the `helpers/` directory
(`create_program.ts`, `ngtsc_program.ts`, `ts_program.ts`, `apply_import_manager.ts`,
`ts_parse_config.ts`, `unique_id.ts`, plus `angular_devkit/` and `google3/` adapters) let the same
migration run under `ng update`, under Bazel, and inside the language service's refactorings.

Shared AST utilities sit beside it in `utils/`: `change_tracker.ts` (accumulating and applying
edits), `ng_decorators.ts`/`extract_metadata.ts` (recognising Angular decorators),
`ng_component_template.ts` (locating inline and external templates), `parse_html.ts` +
`template_ast_visitor.ts` (template rewriting), `project_tsconfig_paths.ts`, `line_mappings.ts`,
`load_esm.ts`, and `typescript/`.

## 2. `ng update` migrations (`migrations/`)

`migrations.json` registers the ones that run automatically on `ng update` — currently all at
version `22.0.0`:

| Migration                       | What it does                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| `change-detection-eager`        | adds `ChangeDetectionStrategy.Eager` to all components                                        |
| `http-xhr-backend`              | adds `withXhr()` to `provideHttpClient` where `HttpXhrBackend` was used                       |
| `strict-templates-default`      | writes an explicit `strictTemplates: false` into `tsconfig.json` when unset                   |
| `can-match-snapshot-required`   | adds the required third argument to `canMatch` callsites                                      |
| `incremental-hydration`         | adds `withNoIncrementalHydration()` so pre-v22 behaviour is retained                          |
| `strict-safe-navigation-narrow` | disables the `nullishCoalescingNotNullable` / `optionalChainNotNullable` extended diagnostics |
| `model-output`                  | migrates `@Output` declarations that are better expressed as `model()`                        |
| `safe-optional-chaining`        | template safe-navigation adjustments                                                          |

The `migrations/` directory also holds migrations that are _not_ auto-run — `output-migration`,
`signal-migration` (`@Input` → `input()`), `signal-queries-migration` (`@ViewChild`/`@ContentChild`
→ `viewChild()`/`contentChild()`) and `self-closing-tags-migration`. These are invoked through
their `ng generate` counterparts below, or from the language service's refactorings, so developers
opt into them one codebase at a time.

## 3. `ng generate` schematics (`ng-generate/`, registered in `collection.json`)

Opt-in, developer-invoked transformations: `control-flow-migration` (`*ngIf`/`*ngFor`/`ngSwitch`
→ `@if`/`@for`/`@switch`), `standalone-migration` and `common-to-standalone-migration`,
`inject-migration` (constructor DI → `inject()`), `route-lazy-loading`,
`router-testing-module-migration`, `service-migration`, `cleanup-unused-imports`,
`ngclass-to-class-migration`, `ngstyle-to-style-migration`, `self-closing-tags-migration`,
`signal-input-migration`, `signal-queries-migration`, `output-migration`, and `signals`.

Several of these are also exposed as editor refactorings through
`packages/language-service/src/refactorings/`, which imports the same Tsurge migrations directly.

## 4. Other packages' schematics

`packages/localize/schematics/` (the `ng add @angular/localize` schematic) is the only other
schematic collection in the repository.
