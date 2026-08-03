# `packages/forms` — reactive forms, template-driven forms, signal forms

`@angular/forms` (190 files, ~69k lines) now contains **two independent form systems** under
separate entry points:

- `@angular/forms` — the classic `FormControl`/`NgModel` world (`src/`);
- `@angular/forms/signals` — the newer signal-based form system (`signals/`), with
  `@angular/forms/signals/compat` for interop.

Full file/symbol listing: [`generated/index-packages-forms.md`](./generated/index-packages-forms.md).

---

## 1. Classic forms

### 1.1 The model (`src/model/`)

`abstract_model.ts` is the heart: `AbstractControl` holds `value`, `status`
(`VALID`/`INVALID`/`PENDING`/`DISABLED`), `errors`, `touched`/`dirty`/`pristine`, the
`valueChanges`/`statusChanges` observables and their signal equivalents, plus the
update-propagation algorithm (`updateValueAndValidity`, `_updateAncestors`, `setParent`,
`markAsTouched`/`markAsDirty` and their `emitEvent`/`onlySelf` options), async-validator
subscription management, and the `ControlEvent` stream (`events`).

Concrete containers: `form_control.ts` (`FormControl`, `FormControlState`,
`FormControlOptions`), `form_group.ts` (`FormGroup`, `FormRecord`), `form_array.ts`
(`FormArray`). `form_builder.ts` provides `FormBuilder`, `NonNullableFormBuilder` and
`UntypedFormBuilder`.

### 1.2 The directives (`src/directives/`)

Two parallel stacks share a common base:

- **Shared** — `abstract_control_directive.ts` (`AbstractControlDirective` — the read-only view
  every directive exposes), `control_container.ts`, `ng_control.ts`, `ng_control_status.ts` (the
  `ng-valid`/`ng-touched`/… host classes), `shared.ts` (`setUpControl`, `selectValueAccessor` and
  the wiring between a control and its accessor), `validators.ts` (the validator *directives*
  `required`, `minlength`, `pattern`, `email`, …), `abstract_form_group_directive.ts`,
  `ng_no_validate_directive.ts`, and the error-message modules (`template_driven_errors.ts`,
  `reactive_errors.ts`, `reactive_validation_error.ts`, `error_examples.ts`).
- **Template-driven** — `ng_form.ts` (`NgForm`), `ng_model.ts` (`NgModel`),
  `ng_model_group.ts` (`NgModelGroup`).
- **Reactive** — `reactive_directives/` with `FormControlDirective`, `FormControlName`,
  `FormGroupDirective`, `FormGroupName`, `FormArrayName`.

**`ControlValueAccessor`** (`control_value_accessor.ts`) is the extension point that connects a
control to a DOM element. Built-in accessors: `default_value_accessor.ts` (text inputs),
`checkbox_value_accessor.ts`, `number_value_accessor.ts`, `range_value_accessor.ts`,
`radio_control_value_accessor.ts` (with its `RadioControlRegistry`),
`select_control_value_accessor.ts`, `select_multiple_control_value_accessor.ts`, plus
`native.ts` for native-element support.

`src/validators.ts` holds the functional `Validators` (`required`, `min`, `max`, `minLength`,
`maxLength`, `pattern`, `email`, `nullValidator`, `compose`, `composeAsync`) and the
`NG_VALIDATORS`/`NG_ASYNC_VALIDATORS` tokens. `src/form_providers.ts` exports `FormsModule`,
`ReactiveFormsModule` and `provideForms`-style helpers.

## 2. Signal forms (`signals/`)

A schema-driven, signal-native form system. The public API is small and lives in `signals/src/api/`:

- `structure.ts` — `form(model, schema?, options?)` builds a `FieldTree` over a
  `WritableSignal` model; `schema()` defines reusable schemas; `apply`, `applyEach`, `applyWhen`,
  `applyWhenValue` compose schemas onto sub-paths; `submit()` runs a submit action and maps returned
  errors back onto fields.
- `types.ts`, `control.ts`, `structure.ts` — `FieldTree`, `FieldState`, `FieldPath`, `Control`.
- `rules/` — the logic rules attachable to a path: `disabled.ts`, `hidden.ts`, `readonly.ts`,
  `debounce.ts`, `metadata.ts` and `validation/` (the validator set and `ValidationError` model).
- `di.ts`, `assertions.ts`, `symbols.ts`, `transformed_value.ts`.

Internals:

- `signals/src/field/` — the runtime. `node.ts` (`FieldNode`, the per-field reactive state object),
  `structure.ts`/`manager.ts` (building and maintaining the field tree as the model changes),
  `proxy.ts` (the `FieldTree` proxy that makes `form.user.name` work), `state.ts`, `validation.ts`,
  `submit.ts`, `resolution.ts`, `metadata.ts`, `context.ts`, `debounce.ts`, `field_adapter.ts`,
  `di.ts`, `util.ts`.
- `signals/src/schema/` — `schema.ts`, `logic.ts`, `logic_node.ts`, `path_node.ts`: the compiled
  representation of a schema, i.e. which logic applies at which path.
- `signals/src/directive/` — the DOM binding layer: `form_root.ts`, `form_field.ts`,
  `bindings.ts`, `control_native.ts` / `control_cva.ts` / `control_custom.ts` (three ways to bind a
  field to a control), `select.ts`, `native.ts`, `input_validity_monitor.ts`.
- `signals/src/util/` — `deep_signal.ts` (a writable signal projected onto a nested property) and
  `array.ts`.
- `signals/src/webmcp/` — exposes forms as Model-Context-Protocol tools (`registration.ts`,
  `tokens.ts`), pairing with `core`'s `src/webmcp/`.
- `signals/src/compat/` + `signals/compat/` + `signals/src/controls/interop_ng_control.ts` —
  interop so a signal form can drive a classic `ControlValueAccessor` and vice versa.
