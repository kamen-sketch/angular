# Error codes

Angular reports problems as `NG…` codes. There are **two independent code spaces** with two
different conventions, and knowing which one a code belongs to tells you immediately where to look
for it: at run time in a package's `errors.ts`, or at build time in the compiler's diagnostics.

The full catalogue — every code, its name, whether it has a guide, and the file that declares it —
is generated into [`generated/error-codes.md`](./generated/error-codes.md) by
[`tools/analyze-error-codes.mjs`](./tools/analyze-error-codes.mjs), which also checks the
conventions described below.

```bash
node docs/codebase-map/tools/analyze-error-codes.mjs
```

---

## 1. Runtime codes — 272 of them

Thrown by the framework while an application runs. Each package declares a `RuntimeErrorCode`
`const enum` in its own `src/errors.ts`, and the ranges are reserved centrally in the header
comment of [`packages/core/src/errors.ts`](../../packages/core/src/errors.ts):

| Package                         | Reserved range |   Codes | With a guide |
| ------------------------------- | -------------- | ------: | -----------: |
| `core`                          | 100–999        |      94 |           33 |
| `forms` (incl. `forms/signals`) | 1000–1999      |      36 |            4 |
| `common` (incl. `common/http`)  | 2000–2999      |      62 |            4 |
| `animations`                    | 3000–3999      |      37 |            0 |
| `router`                        | 4000–4999      |      19 |            0 |
| `platform-browser`              | 5000–5500      |      12 |            5 |
| `service-worker`                | 5600–5699      |       5 |            0 |
| `platform-server`               | 5700–5800      |       7 |            1 |
| **total**                       |                | **272** |       **47** |

Secondary entry points share the owning package's range rather than getting their own:
`common/http` sits at 2800–2826 inside `common`'s block, `forms/signals` at 1900–1921 inside
`forms`'.

**The sign is a flag, not part of the number.** A negative value means "this code has a guide on
angular.dev". `formatRuntimeErrorCode` renders the code as `NG0` + `Math.abs(value)`, and
`formatRuntimeError` appends `Find more at https://angular.dev/errors/NG0…` only when the value is
negative _and_ `ngDevMode` is on:

```ts
// packages/core/src/errors.ts
export function formatRuntimeErrorCode<T extends number = RuntimeErrorCode>(code: T): string {
  return `NG0${Math.abs(code)}`;
}
```

That leading `0` is what distinguishes the two spaces in a stack trace: a runtime code always
reads `NG0…` (`NG0100`, `NG0201`, `NG01002`, `NG02800`), a compile-time code never does
(`NG2003`, `NG8001`).

The trade-off the comment in `errors.ts` spells out is that the sign avoids shipping a second
lookup table of "codes that have guides" into the runtime bundle — the information rides along in
the number that is already there.

All 47 negative codes have a matching guide file in
`adev/src/content/reference/errors/`, all 272 codes fall inside their package's reserved range, and
no value is used twice within a package. The analyzer checks all three.

## 2. Compile-time codes — 117 of them

Reported by `ngtsc` as TypeScript diagnostics, declared in one enum:
[`packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.ts`](../../packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.ts).

| Band    | Codes | Subject                                | Example                                                   |
| ------- | ----: | -------------------------------------- | --------------------------------------------------------- |
| NG1xxx  |    14 | decorator shape and static evaluation  | `DECORATOR_ARG_NOT_LITERAL`, `VALUE_HAS_WRONG_TYPE`       |
| NG2xxx  |    28 | class declaration metadata and DI      | `COMPONENT_MISSING_TEMPLATE`, `PARAM_MISSING_TOKEN`       |
| NG3xxx  |     3 | imports, exports and cycles            | `IMPORT_CYCLE_DETECTED`                                   |
| NG4xxx  |     6 | `tsconfig` / compiler options          | `CONFIG_STRICT_TEMPLATES_IMPLIES_FULL_TEMPLATE_TYPECHECK` |
| NG5xxx  |     2 | template and host-binding parse errors | `TEMPLATE_PARSE_ERROR`                                    |
| NG6xxx  |    10 | NgModule structure                     | `NGMODULE_INVALID_DECLARATION`                            |
| NG8xxx  |    49 | templates and template type checking   | `SCHEMA_INVALID_ELEMENT`, `MISSING_PIPE`                  |
| NG9xxx  |     1 | injectable resolution                  | `INJECTABLE_DUPLICATE_PROV`                               |
| NG10xxx |     2 | suggestions, not errors (see below)    | `SUGGEST_STRICT_TEMPLATES`                                |
| NG11xxx |     2 | local (per-file) compilation           | `LOCAL_COMPILATION_UNRESOLVED_CONST`                      |

Two mechanisms are worth knowing:

**How a code becomes a `NG…` string.** TypeScript only carries numeric diagnostic codes, so
`ngErrorCode()` prefixes each with `-99` _as a string_, and the formatter rewrites the result:

```ts
// packages/compiler-cli/src/ngtsc/diagnostics/src/util.ts
export function ngErrorCode(code: ErrorCode): number {
  return parseInt('-99' + code);
}
const ERROR_CODE_MATCHER = /(\u001b\[\d+m ?)TS-99(\d+: ?\u001b\[\d+m)/g;
```

So `ErrorCode.SCHEMA_INVALID_ELEMENT = 8001` becomes TS code `-998001`, printed as `TS-998001`,
and rewritten to `NG8001`.

**How a guide is registered.** Unlike the runtime space, the sign means nothing here. A code has a
guide when it is listed in `COMPILER_ERRORS_WITH_GUIDES` in
[`diagnostics/src/docs.ts`](../../packages/compiler-cli/src/ngtsc/diagnostics/src/docs.ts) — currently
8 of the 117.

`NG10xxx` is reserved for diagnostics that are not errors (warnings and suggestions produced for
the language service), and `ExtendedTemplateDiagnosticName` in the same directory gives each
opt-in template check a string name for `tsconfig.json`, alongside its numeric code.

## 3. A defect this analysis found

`ErrorCode.CONFLICTING_HOST_DIRECTIVE_BINDING` is declared as **`-8024`** — the only negative value
in the compile-time enum, and the compile-time space does not use the sign for anything.

The consequence is mechanical. `ngErrorCode` builds its number by string concatenation:

```
ngErrorCode(8024)   → parseInt('-99' + '8024')  → -998024   ✓ prints as NG8024
ngErrorCode(-8024)  → parseInt('-99' + '-8024') → -99       ✗ prints as TS-99
```

`parseInt('-99-8024')` stops at the second `-` and yields `-99`. The diagnostic is therefore
emitted with TS code `-99` instead of `-998024`, and because `ERROR_CODE_MATCHER` requires digits
between `TS-99` and the colon, the `TS…` → `NG…` rewrite does not match it either. The error
surfaces to users as `TS-99` rather than `NG8024`.

The code is live, not dead: it is raised from
[`typecheck/src/oob.ts`](../../packages/compiler-cli/src/ngtsc/typecheck/src/oob.ts) when a host
directive exposes an input or output twice under the same name. A guide page for it,
`adev/src/content/reference/errors/NG8024.md`, already exists — but nothing the compiler emits will
ever carry that code.

The likely cause is the runtime convention leaking across: in a `RuntimeErrorCode` enum, `-8024`
would correctly mean "this one has a guide".

**The fix** is to change the value to `8024` and, if the guide should be linked, add
`ErrorCode.CONFLICTING_HOST_DIRECTIVE_BINDING` to `COMPILER_ERRORS_WITH_GUIDES` in `docs.ts`. This
map does not apply the fix — it only reports it — so
`node docs/codebase-map/tools/analyze-error-codes.mjs` currently exits non-zero with this one
finding.

## 4. Where to look when you see a code

| Code shape                             | Space                     | Where it is declared                                          |
| -------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| `NG0…` (e.g. `NG0100`, `NG02800`)      | runtime                   | `packages/<pkg>/src/errors.ts`, picked by range               |
| `NG1…`–`NG11…` without the leading `0` | compile time              | `compiler-cli/src/ngtsc/diagnostics/src/error_code.ts`        |
| `TS-99…`                               | compile time, unrewritten | same enum — the reporting tool did not apply the `NG` rewrite |

The last row is worth remembering when reading build logs. `ERROR_CODE_MATCHER` matches the ANSI
escape sequences that surround the code, and `ngc`'s own `formatDiagnostics`
([`perform_compile.ts`](../../packages/compiler-cli/src/perform_compile.ts)) always formats through
`ts.formatDiagnosticsWithColorAndContext`, so the rewrite fires there. A tool that consumes
Angular's `ts.Diagnostic`s and formats them itself — without calling `replaceTsWithNgInErrors` —
will show the raw `TS-99…` code instead, and `-99` is simply the `NG` code with its prefix
still attached.
