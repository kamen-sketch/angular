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

## 3. A defect this analysis found, and fixed

`ErrorCode.CONFLICTING_HOST_DIRECTIVE_BINDING` was declared as **`-8024`** — the only negative
value in the compile-time enum, where the sign means nothing.

The consequence was mechanical, because `ngErrorCode` builds its number by string concatenation:

```
ngErrorCode(8024)   → parseInt('-99' + '8024')  → -998024   prints as NG8024
ngErrorCode(-8024)  → parseInt('-99' + '-8024') → -99       prints as TS-99
```

`parseInt('-99-8024')` stops at the second `-` and yields `-99`. The diagnostic was therefore
emitted with TS code `-99` instead of `-998024`, and because `ERROR_CODE_MATCHER` requires digits
between `TS-99` and the colon, the `TS…` → `NG…` rewrite did not match it either — so the error
surfaced to users as `TS-99` rather than `NG8024`.

The code is live, not dead: it is raised from
[`typecheck/src/oob.ts`](../../packages/compiler-cli/src/ngtsc/typecheck/src/oob.ts) when a host
directive exposes an input or output twice under the same name, and a guide page for it,
`adev/src/content/reference/errors/NG8024.md`, already existed. The likely cause is the runtime
convention leaking across: in a `RuntimeErrorCode` enum, `-8024` would correctly mean "this one has
a guide".

The value is now `8024`, the public API golden is updated to match, and the existing spec for the
diagnostic in `test/ngtsc/host_directives_spec.ts` now also asserts the emitted code so the
regression cannot come back silently. The analyzer's "no negative compile-time codes" check keeps
the whole enum honest.

## 4. A second, related defect — still open

While confirming the fix above, the same confusion between "an `ErrorCode`" and "a TS diagnostic
code" turned up one level higher, in `NgCompiler.addMessageTextDetails`
([`core/src/compiler.ts`](../../packages/compiler-cli/src/ngtsc/core/src/compiler.ts)):

```ts
if (diag.code && COMPILER_ERRORS_WITH_GUIDES.has(ngErrorCode(diag.code))) {
  // … messageText + `. Find more at ${ERROR_DETAILS_PAGE_BASE_URL}/NG${ngErrorCode(diag.code)}`
}
```

`diag.code` is already a TS code: every diagnostic is built by `makeDiagnostic` or
`makeTemplateDiagnostic`, both of which set `code: ngErrorCode(errorCode)`. Applying `ngErrorCode`
a second time gives `parseInt('-99' + '-991001')` → `-99` for _every_ diagnostic, and
`COMPILER_ERRORS_WITH_GUIDES` holds plain `ErrorCode` values, so the membership test is always
false.

The effect is that **no compile-time error ever gets its "Find more at …" link appended**, and
`COMPILER_ERRORS_WITH_GUIDES` — 8 entries — is effectively dead. Fixing it needs the inverse
conversion (TS code → `ErrorCode`) in both the lookup and the URL, and it changes the message text
of 8 existing errors, so this map reports it rather than changing that behaviour unasked.

## 5. Where to look when you see a code

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
