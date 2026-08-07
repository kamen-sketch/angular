<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/analyze-contracts.mjs
-->

# Package dependency graph

Cross-package imports between `packages/*`, counted from source with comments stripped
(so `import` statements inside JSDoc samples are not counted) and with specs and `test/`
directories excluded.

- **area** — where in the importing package the import lives. `runtime` is shipped code;
  `schematics` is the bundled `ng update`/`ng generate` code; `testing` is a testing entry
  point; `tools` is a build-time CLI. Only `runtime` edges constrain the layering of the
  shipped framework.
- **kind** — `value` is a normal import, `type` is `import type` (erased at build time),
  `dynamic` is `import()` (a lazily loaded, optional dependency).

| From | To | Area | Kind | Imports |
| --- | --- | --- | --- | ---: |
| `animations` | `@angular/core` | runtime | value | 6 |
| `animations` | `@angular/core` | runtime | type | 1 |
| `benchpress` | `@angular/core` | runtime | value | 18 |
| `common` | `@angular/core` | runtime | value | 63 |
| `common` | `@angular/core` | runtime | type | 1 |
| `common` | `@angular/core` | testing | value | 9 |
| `common` | `@angular/upgrade` | runtime | value | 2 |
| `compiler-cli` | `@angular/compiler` | runtime | value | 118 |
| `compiler-cli` | `@angular/compiler` | testing | value | 1 |
| `compiler-cli` | `@angular/core` | testing | value | 1 |
| `core` | `@angular/compiler` | schematics | value | 20 |
| `core` | `@angular/compiler` | schematics | dynamic | 2 |
| `core` | `@angular/compiler` | schematics | type | 1 |
| `core` | `@angular/compiler` | testing | value | 1 |
| `core` | `@angular/compiler-cli` | schematics | value | 83 |
| `core` | `@angular/compiler-cli` | schematics | dynamic | 1 |
| `elements` | `@angular/core` | runtime | value | 5 |
| `examples` | `@angular/animations` | runtime | value | 1 |
| `examples` | `@angular/common` | runtime | value | 17 |
| `examples` | `@angular/core` | runtime | value | 82 |
| `examples` | `@angular/core` | testing | value | 1 |
| `examples` | `@angular/forms` | runtime | value | 22 |
| `examples` | `@angular/platform-browser` | runtime | value | 31 |
| `examples` | `@angular/router` | runtime | value | 8 |
| `examples` | `@angular/service-worker` | runtime | value | 4 |
| `examples` | `@angular/upgrade` | runtime | value | 4 |
| `forms` | `@angular/common` | runtime | value | 3 |
| `forms` | `@angular/core` | runtime | value | 80 |
| `forms` | `@angular/core` | runtime | type | 4 |
| `language-service` | `@angular/common` | testing | value | 1 |
| `language-service` | `@angular/compiler` | runtime | value | 19 |
| `language-service` | `@angular/compiler-cli` | runtime | value | 38 |
| `language-service` | `@angular/compiler-cli` | runtime | dynamic | 6 |
| `language-service` | `@angular/compiler-cli` | testing | value | 9 |
| `language-service` | `@angular/core` | runtime | value | 8 |
| `language-service` | `@angular/core` | testing | value | 1 |
| `localize` | `@angular/compiler` | tools | value | 7 |
| `localize` | `@angular/compiler-cli` | tools | value | 23 |
| `misc` | `@angular/common` | runtime | value | 7 |
| `misc` | `@angular/core` | runtime | value | 4 |
| `platform-browser` | `@angular/animations` | runtime | value | 2 |
| `platform-browser` | `@angular/animations` | runtime | dynamic | 1 |
| `platform-browser` | `@angular/common` | runtime | value | 15 |
| `platform-browser` | `@angular/common` | testing | value | 2 |
| `platform-browser` | `@angular/core` | runtime | value | 22 |
| `platform-browser` | `@angular/core` | runtime | type | 1 |
| `platform-browser` | `@angular/core` | testing | value | 4 |
| `platform-browser-dynamic` | `@angular/compiler` | runtime | value | 3 |
| `platform-browser-dynamic` | `@angular/core` | runtime | value | 4 |
| `platform-browser-dynamic` | `@angular/core` | testing | value | 1 |
| `platform-browser-dynamic` | `@angular/platform-browser` | runtime | value | 1 |
| `platform-browser-dynamic` | `@angular/platform-browser` | testing | value | 1 |
| `platform-server` | `@angular/common` | runtime | value | 9 |
| `platform-server` | `@angular/core` | runtime | value | 12 |
| `platform-server` | `@angular/core` | testing | value | 1 |
| `platform-server` | `@angular/platform-browser` | runtime | value | 4 |
| `platform-server` | `@angular/platform-browser-dynamic` | testing | value | 1 |
| `private` | `@angular/common` | testing | value | 2 |
| `private` | `@angular/core` | testing | value | 4 |
| `private` | `@angular/platform-browser` | testing | value | 1 |
| `router` | `@angular/common` | runtime | value | 10 |
| `router` | `@angular/common` | testing | value | 1 |
| `router` | `@angular/core` | runtime | value | 40 |
| `router` | `@angular/core` | testing | value | 3 |
| `router` | `@angular/platform-browser` | runtime | value | 1 |
| `router` | `@angular/upgrade` | runtime | value | 1 |
| `service-worker` | `@angular/core` | runtime | value | 5 |
| `upgrade` | `@angular/core` | runtime | value | 10 |
| `upgrade` | `@angular/core` | testing | value | 3 |
| `upgrade` | `@angular/platform-browser` | runtime | value | 1 |

## Runtime dependencies only

The same data reduced to shipped code, which is the layering that actually constrains the
framework. Packages with no row here depend on nothing else in the repository.

| Package | Depends on |
| --- | --- |
| `animations` | `core` |
| `benchpress` | `core` |
| `common` | `core`, `upgrade` |
| `compiler-cli` | `compiler` |
| `elements` | `core` |
| `examples` | `animations`, `common`, `core`, `forms`, `platform-browser`, `router`, `service-worker`, `upgrade` |
| `forms` | `common`, `core` |
| `language-service` | `compiler`, `compiler-cli`, `core` |
| `misc` | `common`, `core` |
| `platform-browser` | `animations`, `common`, `core` |
| `platform-browser-dynamic` | `compiler`, `core`, `platform-browser` |
| `platform-server` | `common`, `core`, `platform-browser` |
| `router` | `common`, `core`, `platform-browser`, `upgrade` |
| `service-worker` | `core` |
| `upgrade` | `core`, `platform-browser` |

No runtime dependencies: `compiler`, `core`, `docs`, `localize`, `private`, `ssr`, `zone.js`.
