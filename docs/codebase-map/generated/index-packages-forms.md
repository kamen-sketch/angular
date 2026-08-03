<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/forms/`

190 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/forms/`

- `packages/forms/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/forms/public_api.ts` — 17 lines
  - re-exports * from `./src/forms`



## `packages/forms/signals/`

- `packages/forms/signals/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/forms/signals/public_api.ts` — 27 lines
  - re-exports * from `./src/api/assertions`
  - re-exports * from `./src/api/control`
  - re-exports * from `./src/api/di`
  - re-exports * from `./src/api/rules`
  - re-exports * from `./src/api/rules/debounce`
  - re-exports * from `./src/api/rules/metadata`
  - re-exports * from `./src/api/rules/validation/validation_errors`
  - re-exports * from `./src/api/structure`
  - re-exports * from `./src/api/transformed_value`
  - re-exports * from `./src/api/types`
  - re-exports * from `./src/directive/form_field`
  - re-exports * from `./src/directive/form_root`
  - re-exports * from `./src/webmcp`



## `packages/forms/signals/compat/`

- `packages/forms/signals/compat/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/forms/signals/compat/public_api.ts` — 19 lines
  - re-exports * from `./src/api/compat_form`
  - re-exports * from `./src/api/di`
  - exports `extractValue` from `./src/api/extract`
  - exports `CompatValidationError` from `../src/compat/validation_errors`
  - exports `SignalFormControl` from `./src/signal_form_control/signal_form_control`



## `packages/forms/signals/compat/src/`

- `packages/forms/signals/compat/src/compat_field_adapter.ts` — 133 lines
  - class: `CompatFieldAdapter`
  - function: `createCompatNode`
- `packages/forms/signals/compat/src/compat_field_node.ts` — 133 lines
  - class: `CompatFieldNode`
  - function: `extractControlPropToSignal`
  - const: `getControlStatusSignal`, `getControlEventsSignal`
- `packages/forms/signals/compat/src/compat_node_state.ts` — 55 lines
  - class: `CompatNodeState`
- `packages/forms/signals/compat/src/compat_structure.ts` — 152 lines
  - interface: `CompatChildFieldNodeOptions`, `CompatRootFieldNodeOptions`
  - type: `CompatFieldNodeOptions`
  - class: `CompatStructure`
- `packages/forms/signals/compat/src/compat_validation_state.ts` — 76 lines
  - class: `CompatValidationState`



## `packages/forms/signals/compat/src/api/`

- `packages/forms/signals/compat/src/api/compat_form.ts` — 143 lines
  - type: `CompatFormOptions`
  - function: `compatForm`, `compatForm`, `compatForm`, `compatForm`
- `packages/forms/signals/compat/src/api/di.ts` — 28 lines
  - const: `NG_STATUS_CLASSES`
- `packages/forms/signals/compat/src/api/extract.ts` — 197 lines
  - type: `RawValue`, `DeepPartial`
  - interface: `ExtractFilter`
  - function: `extractValue`, `extractValue`, `extractValue`



## `packages/forms/signals/compat/src/signal_form_control/`

- `packages/forms/signals/compat/src/signal_form_control/signal_form_control.ts` — 597 lines
  - type: `ValueUpdateOptions`
  - class: `SignalFormControl`



## `packages/forms/signals/src/`

- `packages/forms/signals/src/errors.ts` — 35 lines
  - const enum: `RuntimeErrorCode`



## `packages/forms/signals/src/api/`

- `packages/forms/signals/src/api/assertions.ts` — 21 lines
  - function: `isFieldTree`
- `packages/forms/signals/src/api/control.ts` — 208 lines
  - interface: `FormUiControl`, `FormValueControl`, `FormCheckboxControl`
- `packages/forms/signals/src/api/di.ts` — 37 lines
  - interface: `SignalFormsConfig`
  - function: `provideSignalFormsConfig`
- `packages/forms/signals/src/api/structure.ts` — 555 lines
  - interface: `FormOptions`
  - function: `form`, `form`, `form`, `form`, `applyEach`, `applyEach`, `applyEach`, `apply`, `applyWhen`, `applyWhenValue`, `applyWhenValue`, `applyWhenValue`, `submit`, `submit`, `submit`, `schema`
- `packages/forms/signals/src/api/symbols.ts` — 18 lines
  - const: `FIELD_TREE`
- `packages/forms/signals/src/api/transformed_value.ts` — 159 lines
  - interface: `ParseResult`, `TransformedValueOptions`, `TransformedValueSignal`
  - function: `transformedValue`
- `packages/forms/signals/src/api/types.ts` — 1041 lines
  - interface: `FormSubmitOptions`, `MarkAsTouchedOptions`, `DisabledReason`, `ReadonlyArrayLike`, `ReadonlyFieldState`, `FieldState`, `FormFieldBinding`, `RootFieldContext`, `ChildFieldContext`, `ItemFieldContext`
  - type: `OneOrMany`, `PathKind`, `ValidationSuccess`, `TreeValidationResult`, `ValidationResult`, `AsyncValidationResult`, `Field`, `FieldTree`, `ReadonlyFieldTree`, `Subfields`, `MaybeFieldTree`, `CompatFieldState`, `ReadonlyCompatFieldState`, `FieldStateByMode`, `SchemaPathRules`, `SchemaPath`, `CompatSchemaPath`, `SchemaPathTree`, `MaybeSchemaPathTree`, `Schema`, `SchemaFn`, `SchemaOrSchemaFn`, `LogicFn`, `FieldValidator`, `TreeValidator`, `Validator`, `FieldContext`, `ItemType`, `Debouncer`
  - namespace: `PathKind`, `SchemaPathRules`



## `packages/forms/signals/src/api/rules/`

- `packages/forms/signals/src/api/rules/debounce.ts` — 97 lines
  - function: `debounce`
- `packages/forms/signals/src/api/rules/disabled.ts` — 76 lines
  - function: `disabled`, `disabled`, `disabled`
- `packages/forms/signals/src/api/rules/hidden.ts` — 67 lines
  - function: `hidden`, `hidden`, `hidden`
- `packages/forms/signals/src/api/rules/index.ts` — 14 lines
  - re-exports * from `./disabled`
  - re-exports * from `./hidden`
  - re-exports * from `./metadata`
  - re-exports * from `./readonly`
  - re-exports * from `./validation`
- `packages/forms/signals/src/api/rules/metadata.ts` — 431 lines
  - function: `metadata`, `createMetadataKey`, `createMetadataKey`, `createMetadataKey`, `createManagedMetadataKey`, `createManagedMetadataKey`, `createManagedMetadataKey`, `createLimitSelectionKey`
  - interface: `MetadataReducer`
  - const: `MetadataReducer`, `IS_ASYNC_VALIDATION_RESOURCE`, `REQUIRED`, `MIN`, `MIN_DATE`, `MIN_NUMBER`, `MAX`, `MAX_DATE`, `MAX_NUMBER`, `MIN_LENGTH`, `MAX_LENGTH`, `PATTERN`
  - class: `MetadataKey`
  - type: `LimitKey`, `LimitSelectionKey`, `MetadataSetterType`
- `packages/forms/signals/src/api/rules/readonly.ts` — 65 lines
  - function: `readonly`, `readonly`, `readonly`



## `packages/forms/signals/src/api/rules/validation/`

- `packages/forms/signals/src/api/rules/validation/email.ts` — 83 lines
  - function: `email`
- `packages/forms/signals/src/api/rules/validation/index.ts` — 24 lines
  - re-exports * from `./email`
  - re-exports * from `./max`
  - re-exports * from `./max_date`
  - re-exports * from `./max_length`
  - re-exports * from `./min`
  - re-exports * from `./min_date`
  - re-exports * from `./min_length`
  - re-exports * from `./pattern`
  - re-exports * from `./required`
  - re-exports * from `./standard_schema`
  - re-exports * from `./validate`
  - re-exports * from `./validate_async`
  - re-exports * from `./validate_http`
  - re-exports * from `./validate_tree`
  - re-exports * from `./validation_errors`
- `packages/forms/signals/src/api/rules/validation/max.ts` — 72 lines
  - function: `max`
- `packages/forms/signals/src/api/rules/validation/max_date.ts` — 73 lines
  - function: `maxDate`
- `packages/forms/signals/src/api/rules/validation/max_length.ts` — 72 lines
  - function: `maxLength`
- `packages/forms/signals/src/api/rules/validation/min.ts` — 72 lines
  - function: `min`
- `packages/forms/signals/src/api/rules/validation/min_date.ts` — 73 lines
  - function: `minDate`
- `packages/forms/signals/src/api/rules/validation/min_length.ts` — 72 lines
  - function: `minLength`
- `packages/forms/signals/src/api/rules/validation/pattern.ts` — 61 lines
  - function: `pattern`
- `packages/forms/signals/src/api/rules/validation/required.ts` — 54 lines
  - function: `required`
- `packages/forms/signals/src/api/rules/validation/standard_schema.ts` — 199 lines
  - type: `RemoveStringIndexUnknownKey`, `IgnoreUnknownProperties`
  - function: `validateStandardSchema`, `standardSchemaError`, `standardSchemaError`, `standardSchemaError`
  - class: `StandardSchemaValidationError`
- `packages/forms/signals/src/api/rules/validation/util.ts` — 79 lines
  - type: `ValueWithLengthOrSize`, `BaseValidatorConfig`
  - function: `getLengthOrSize`, `getOption`, `isEmpty`, `normalizeErrors`
- `packages/forms/signals/src/api/rules/validation/validate.ts` — 44 lines
  - function: `validate`
- `packages/forms/signals/src/api/rules/validation/validate_async.ts` — 181 lines
  - type: `MapToErrorsFn`
  - interface: `AsyncValidatorOptions`
  - function: `validateAsync`
- `packages/forms/signals/src/api/rules/validation/validate_http.ts` — 111 lines
  - interface: `HttpValidatorOptions`
  - function: `validateHttp`
- `packages/forms/signals/src/api/rules/validation/validate_tree.ts` — 40 lines
  - function: `validateTree`
- `packages/forms/signals/src/api/rules/validation/validation_errors.ts` — 661 lines
  - interface: `ValidationErrorOptions`, `ValidationError`
  - type: `WithFieldTree`, `WithOptionalFieldTree`, `WithoutFieldTree`, `NgValidationError`
  - function: `requiredError`, `requiredError`, `requiredError`, `minError`, `minError`, `minError`, `minDateError`, `minDateError`, `minDateError`, `maxError`, `maxError`, `maxError`, `maxDateError`, `maxDateError`, `maxDateError`, `minLengthError`, `minLengthError`, `minLengthError`, `maxLengthError`, `maxLengthError`, `maxLengthError`, `patternError`, `patternError`, `patternError`, `emailError`, `emailError`, `emailError`
  - namespace: `ValidationError`
  - class: `BaseNgValidationError`, `RequiredValidationError`, `MinValidationError`, `MinDateValidationError`, `MaxValidationError`, `MaxDateValidationError`, `MinLengthValidationError`, `MaxLengthValidationError`, `PatternValidationError`, `EmailValidationError`, `NativeInputParseError`
  - const: `NgValidationError`



## `packages/forms/signals/src/compat/`

- `packages/forms/signals/src/compat/validation_errors.ts` — 88 lines
  - class: `CompatValidationError`
  - function: `signalErrorsToValidationErrors`, `reactiveErrorsToSignalErrors`, `extractNestedReactiveErrors`



## `packages/forms/signals/src/controls/`

- `packages/forms/signals/src/controls/interop_ng_control.ts` — 148 lines
  - class: `InteropNgControl`



## `packages/forms/signals/src/directive/`

- `packages/forms/signals/src/directive/bindings.ts` — 85 lines
  - type: `ControlBindingKey`
  - function: `readFieldStateBindingValue`, `createBindings`, `bindingUpdated`
  - const: `CONTROL_BINDING_NAMES`
- `packages/forms/signals/src/directive/control_custom.ts` — 64 lines
  - function: `customControlCreate`
- `packages/forms/signals/src/directive/control_cva.ts` — 118 lines
  - function: `cvaControlCreate`
- `packages/forms/signals/src/directive/control_native.ts` — 127 lines
  - function: `nativeControlCreate`
- `packages/forms/signals/src/directive/form_field.ts` — 439 lines
  - interface: `FormFieldBindingOptions`
  - const: `FORM_FIELD`
  - class: `FormField`
- `packages/forms/signals/src/directive/form_root.ts` — 58 lines
  - class: `FormRoot`
- `packages/forms/signals/src/directive/input_validity_monitor.ts` — 108 lines
  - class: `InputValidityMonitor`, `AnimationInputValidityMonitor`
- `packages/forms/signals/src/directive/native.ts` — 212 lines
  - function: `getNativeControlValue`, `setNativeControlValue`, `setNativeNumberControlValue`, `isInput`, `inputRequiresValidityTracking`, `formatDateForMinMax`
  - exports `ɵelementAcceptsMinMax as elementAcceptsMinMax`, `ɵisNativeFormElement as isNativeFormElement`, `ɵisTextualFormElement as isTextualFormElement`, `ɵsetNativeDomProperty as setNativeDomProperty`, `type ɵNativeFormControl as NativeFormControl` from `@angular/forms`
- `packages/forms/signals/src/directive/select.ts` — 81 lines
  - function: `observeSelectMutations`



## `packages/forms/signals/src/field/`

- `packages/forms/signals/src/field/context.ts` — 181 lines
  - class: `FieldNodeContext`
- `packages/forms/signals/src/field/debounce.ts` — 23 lines
  - const: `DEBOUNCER`
- `packages/forms/signals/src/field/di.ts` — 16 lines
  - const: `SIGNAL_FORMS_CONFIG`
- `packages/forms/signals/src/field/field_adapter.ts` — 125 lines
  - interface: `FieldAdapter`
  - class: `BasicFieldAdapter`
- `packages/forms/signals/src/field/manager.ts` — 91 lines
  - class: `FormFieldManager`
- `packages/forms/signals/src/field/metadata.ts` — 90 lines
  - class: `FieldMetadataState`
- `packages/forms/signals/src/field/node.ts` — 535 lines
  - interface: `ControlValueSignal`, `ParentFieldNode`
  - class: `FieldNode`
- `packages/forms/signals/src/field/proxy.ts` — 95 lines
  - const: `FIELD_PROXY_HANDLER`
- `packages/forms/signals/src/field/resolution.ts` — 62 lines
  - function: `getBoundPathDepth`, `setBoundPathDepthForResolution`
- `packages/forms/signals/src/field/state.ts` — 196 lines
  - class: `FieldNodeState`
- `packages/forms/signals/src/field/structure.ts` — 685 lines
  - type: `TrackingKey`, `ChildNodeCtor`, `FieldNodeOptions`
  - class: `FieldNodeStructure`, `RootFieldNodeStructure`, `ChildFieldNodeStructure`
  - interface: `RootFieldNodeOptions`, `ChildFieldNodeOptions`
- `packages/forms/signals/src/field/submit.ts` — 41 lines
  - class: `FieldSubmitState`
- `packages/forms/signals/src/field/util.ts` — 35 lines
  - function: `shortCircuitFalse`, `shortCircuitTrue`, `cast`, `getInjectorFromOptions`
- `packages/forms/signals/src/field/validation.ts` — 445 lines
  - function: `calculateValidationSelfStatus`, `addDefaultField`, `addDefaultField`, `addDefaultField`
  - interface: `ValidationState`
  - class: `FieldValidationState`



## `packages/forms/signals/src/schema/`

- `packages/forms/signals/src/schema/logic.ts` — 353 lines
  - const: `DYNAMIC`
  - interface: `Predicate`, `BoundPredicate`
  - class: `AbstractLogic`, `BooleanOrLogic`, `ArrayMergeIgnoreLogic`, `ArrayMergeLogic`, `MetadataMergeLogic`, `LogicContainer`
- `packages/forms/signals/src/schema/logic_node.ts` — 556 lines
  - class: `AbstractLogicNodeBuilder`, `LogicNodeBuilder`
  - interface: `LogicNode`
- `packages/forms/signals/src/schema/path_node.ts` — 111 lines
  - class: `FieldPathNode`
  - const: `FIELD_PATH_PROXY_HANDLER`
- `packages/forms/signals/src/schema/schema.ts` — 118 lines
  - class: `SchemaImpl`
  - function: `isSchemaOrSchemaFn`, `assertPathIsCurrent`



## `packages/forms/signals/src/util/`

- `packages/forms/signals/src/util/array.ts` — 25 lines
  - function: `shallowArrayEquals`
- `packages/forms/signals/src/util/deep_signal.ts` — 60 lines
  - function: `deepSignal`
- `packages/forms/signals/src/util/normalize_form_args.ts` — 43 lines
  - function: `normalizeFormArgs`
- `packages/forms/signals/src/util/parser.ts` — 69 lines
  - interface: `Parser`
  - function: `createParser`
- `packages/forms/signals/src/util/type_guards.ts` — 22 lines
  - function: `isArray`, `isObject`



## `packages/forms/signals/src/webmcp/`

- `packages/forms/signals/src/webmcp/index.ts` — 10 lines
  - exports `provideExperimentalWebMcpForms` from `./registration`
- `packages/forms/signals/src/webmcp/registration.ts` — 154 lines
  - function: `provideExperimentalWebMcpForms`
- `packages/forms/signals/src/webmcp/tokens.ts` — 27 lines
  - const: `REGISTER_WEBMCP_FORM`
  - type: `RegisterWebMcpForm`



## `packages/forms/signals/test/node/`

- `packages/forms/signals/test/node/deep_signal.spec.ts` — 82 lines _(spec)_
- `packages/forms/signals/test/node/dynamic.spec.ts` — 55 lines _(spec)_
- `packages/forms/signals/test/node/field_context.spec.ts` — 180 lines _(spec)_
- `packages/forms/signals/test/node/field_node.spec.ts` — 1716 lines _(spec)_
- `packages/forms/signals/test/node/field_proxy.spec.ts` — 145 lines _(spec)_
- `packages/forms/signals/test/node/form.spec.ts` — 86 lines _(spec)_
- `packages/forms/signals/test/node/form_root.spec.ts` — 154 lines _(spec)_
- `packages/forms/signals/test/node/logic_node.spec.ts` — 429 lines _(spec)_
- `packages/forms/signals/test/node/parse_errors.spec.ts` — 420 lines _(spec)_
- `packages/forms/signals/test/node/path.spec.ts` — 95 lines _(spec)_
- `packages/forms/signals/test/node/recursive_logic.spec.ts` — 132 lines _(spec)_
- `packages/forms/signals/test/node/resource.spec.ts` — 539 lines _(spec)_
- `packages/forms/signals/test/node/submit.spec.ts` — 666 lines _(spec)_
- `packages/forms/signals/test/node/types.spec.ts` — 232 lines _(spec)_
- `packages/forms/signals/test/node/validation_status.spec.ts` — 697 lines _(spec)_



## `packages/forms/signals/test/node/api/`

- `packages/forms/signals/test/node/api/debounce.spec.ts` — 544 lines _(spec)_
- `packages/forms/signals/test/node/api/hidden.spec.ts` — 159 lines _(spec)_
- `packages/forms/signals/test/node/api/metadata.spec.ts` — 133 lines _(spec)_
- `packages/forms/signals/test/node/api/structure.spec.ts` — 134 lines _(spec)_
- `packages/forms/signals/test/node/api/when.spec.ts` — 217 lines _(spec)_
  - interface: `User`



## `packages/forms/signals/test/node/api/validators/`

- `packages/forms/signals/test/node/api/validators/email.spec.ts` — 91 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/max.spec.ts` — 306 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/max_date.spec.ts` — 71 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/max_length.spec.ts` — 269 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/min.spec.ts` — 315 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/min_date.spec.ts` — 71 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/min_length.spec.ts` — 270 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/pattern.spec.ts` — 187 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/required.spec.ts` — 114 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/standard_schema.spec.ts` — 488 lines _(spec)_
- `packages/forms/signals/test/node/api/validators/validation_errors.spec.ts` — 183 lines _(spec)_



## `packages/forms/signals/test/node/compat/`

- `packages/forms/signals/test/node/compat/compat.spec.ts` — 833 lines _(spec)_
- `packages/forms/signals/test/node/compat/compat_validation_error.spec.ts` — 122 lines _(spec)_
- `packages/forms/signals/test/node/compat/extract_value.spec.ts` — 330 lines _(spec)_
- `packages/forms/signals/test/node/compat/signal_form_control.spec.ts` — 756 lines _(spec)_
- `packages/forms/signals/test/node/compat/signal_form_control_in_form_group.spec.ts` — 395 lines _(spec)_



## `packages/forms/signals/test/web/`

- `packages/forms/signals/test/web/assertions.spec.ts` — 41 lines _(spec)_
- `packages/forms/signals/test/web/compat_form.spec.ts` — 98 lines _(spec)_
- `packages/forms/signals/test/web/debounce_async_validation_bug.spec.ts` — 59 lines _(spec)_
- `packages/forms/signals/test/web/dynamic_binding.spec.ts` — 218 lines _(spec)_
- `packages/forms/signals/test/web/field_proxy.spec.ts` — 70 lines _(spec)_
- `packages/forms/signals/test/web/focus.spec.ts` — 317 lines _(spec)_
- `packages/forms/signals/test/web/form_field.spec.ts` — 6534 lines _(spec)_
- `packages/forms/signals/test/web/input_validity_monitor.spec.ts` — 129 lines _(spec)_
- `packages/forms/signals/test/web/interop.spec.ts` — 1545 lines _(spec)_
- `packages/forms/signals/test/web/number_input.spec.ts` — 318 lines _(spec)_
- `packages/forms/signals/test/web/orphan_repro.spec.ts` — 226 lines _(spec)_
- `packages/forms/signals/test/web/reactive_fvc.spec.ts` — 767 lines _(spec)_
- `packages/forms/signals/test/web/signal_form_control_web.spec.ts` — 134 lines _(spec)_
- `packages/forms/signals/test/web/template_fvc.spec.ts` — 472 lines _(spec)_
- `packages/forms/signals/test/web/test_input_validity_monitor.ts` — 45 lines _(test-support)_
  - class: `TestInputValidityMonitor`
- `packages/forms/signals/test/web/webmcp.spec.ts` — 354 lines _(spec)_



## `packages/forms/src/`

- `packages/forms/src/directives.ts` — 118 lines
  - const: `SHARED_FORM_DIRECTIVES`, `TEMPLATE_DRIVEN_DIRECTIVES`, `REACTIVE_DRIVEN_DIRECTIVES`
  - exports `CheckboxControlValueAccessor` from `./directives/checkbox_value_accessor`
  - exports `ControlValueAccessor` from `./directives/control_value_accessor`
  - exports `DefaultValueAccessor` from `./directives/default_value_accessor`
  - exports `NgControl` from `./directives/ng_control`
  - exports `NgControlStatus`, `NgControlStatusGroup` from `./directives/ng_control_status`
  - exports `NgForm` from `./directives/ng_form`
  - exports `NgModel` from `./directives/ng_model`
  - exports `NgModelGroup` from `./directives/ng_model_group`
  - exports `NumberValueAccessor` from `./directives/number_value_accessor`
  - exports `RadioControlValueAccessor` from `./directives/radio_control_value_accessor`
  - exports `RangeValueAccessor` from `./directives/range_value_accessor`
  - exports `FormArrayDirective` from `./directives/reactive_directives/form_array_directive`
  - exports `FormControlDirective`, `NG_MODEL_WITH_FORM_CONTROL_WARNING` from `./directives/reactive_directives/form_control_directive`
  - exports `FormControlName` from `./directives/reactive_directives/form_control_name`
  - exports `FormGroupDirective` from `./directives/reactive_directives/form_group_directive`
  - exports `FormArrayName`, `FormGroupName` from `./directives/reactive_directives/form_group_name`
  - exports `NgSelectOption`, `SelectControlValueAccessor` from `./directives/select_control_value_accessor`
  - exports `NgSelectMultipleOption`, `SelectMultipleControlValueAccessor` from `./directives/select_multiple_control_value_accessor`
  - exports `CALL_SET_DISABLED_STATE` from `./directives/shared`
  - exports `ɵInternalFormsSharedModule as InternalFormsSharedModule`
- `packages/forms/src/errors.ts` — 41 lines
  - const enum: `RuntimeErrorCode`
- `packages/forms/src/form_builder.ts` — 549 lines
  - type: `ControlConfig`
  - class: `FormBuilder`, `NonNullableFormBuilder`, `UntypedFormBuilder`
- `packages/forms/src/form_providers.ts` — 103 lines
  - class: `FormsModule`, `ReactiveFormsModule`
- `packages/forms/src/forms.ts` — 136 lines
  - re-exports * from `./form_providers`
  - exports `ɵInternalFormsSharedModule` from `./directives`
  - exports `AbstractControlDirective` from `./directives/abstract_control_directive`
  - exports `AbstractFormGroupDirective` from `./directives/abstract_form_group_directive`
  - exports `CheckboxControlValueAccessor` from `./directives/checkbox_value_accessor`
  - exports `ControlContainer` from `./directives/control_container`
  - exports `ControlValueAccessor`, `NG_VALUE_ACCESSOR` from `./directives/control_value_accessor`
  - exports `COMPOSITION_BUFFER_MODE`, `DefaultValueAccessor` from `./directives/default_value_accessor`
  - exports `Form` from `./directives/form_interface`
  - exports `NgControl` from `./directives/ng_control`
  - exports `NgControlStatus`, `NgControlStatusGroup` from `./directives/ng_control_status`
  - exports `NgForm` from `./directives/ng_form`
  - exports `NgModel` from `./directives/ng_model`
  - exports `NgModelGroup` from `./directives/ng_model_group`
  - exports `ɵNgNoValidate` from `./directives/ng_no_validate_directive`
  - exports `NumberValueAccessor` from `./directives/number_value_accessor`
  - exports `RadioControlValueAccessor` from `./directives/radio_control_value_accessor`
  - exports `RangeValueAccessor` from `./directives/range_value_accessor`
  - exports `FormControlDirective` from `./directives/reactive_directives/form_control_directive`
  - exports `FormControlName` from `./directives/reactive_directives/form_control_name`
  - exports `AbstractFormDirective` from `./directives/reactive_directives/abstract_form.directive`
  - exports `FormArrayDirective` from `./directives/reactive_directives/form_array_directive`
  - exports `FormGroupDirective` from `./directives/reactive_directives/form_group_directive`
  - exports `FormArrayName`, `FormGroupName` from `./directives/reactive_directives/form_group_name`
  - exports `NgSelectOption`, `SelectControlValueAccessor` from `./directives/select_control_value_accessor`
  - exports `SelectMultipleControlValueAccessor`, `ɵNgSelectMultipleOption` from `./directives/select_multiple_control_value_accessor`
  - exports `selectValueAccessor as ɵselectValueAccessor`, `SetDisabledStateOption`, `ɵFORM_CONTROL_INTEGRATION`, `ɵFormControlIntegration` from `./directives/shared`
  - exports `AsyncValidator`, `AsyncValidatorFn`, `CheckboxRequiredValidator`, `EmailValidator`, `MaxLengthValidator`, `MaxValidator`, `MinLengthValidator`, `MinValidator`, `PatternValidator`, `RequiredValidator`, `ValidationErrors`, `Validator`, `ValidatorFn` from `./directives/validators`
  - exports `ControlConfig`, `FormBuilder`, `NonNullableFormBuilder`, `UntypedFormBuilder`, `ɵElement` from `./form_builder`
  - exports `AbstractControl`, `AbstractControlOptions`, `ControlEvent`, `FormControlStatus`, `FormResetEvent`, `FormSubmittedEvent`, `PristineChangeEvent`, `StatusChangeEvent`, `TouchedChangeEvent`, `ValueChangeEvent`, `ɵCoerceStrArrToNumArr`, `ɵGetProperty`, `ɵNavigate`, `ɵRawValue`, `ɵTokenize`, `ɵTypedOrUntyped`, `ɵValue`, `ɵWriteable` from `./model/abstract_model`
  - exports `FormArray`, `isFormArray`, `UntypedFormArray`, `ɵFormArrayRawValue`, `ɵFormArrayValue` from `./model/form_array`
  - exports `FormControl`, `FormControlOptions`, `FormControlState`, `isFormControl`, `UntypedFormControl`, `ɵFormControlCtor` from `./model/form_control`
  - exports `FormGroup`, `FormRecord`, `isFormGroup`, `isFormRecord`, `UntypedFormGroup`, `ɵFormGroupRawValue`, `ɵFormGroupValue`, `ɵOptionalKeys` from `./model/form_group`
  - exports `NG_ASYNC_VALIDATORS`, `NG_VALIDATORS`, `Validators` from `./validators`
  - exports `VERSION` from `./version`
  - exports `isNativeFormElement as ɵisNativeFormElement`, `elementAcceptsMinMax as ɵelementAcceptsMinMax`, `isTextualFormElement as ɵisTextualFormElement`, `setNativeDomProperty as ɵsetNativeDomProperty`, `type NativeFormControl as ɵNativeFormControl` from `./directives/native`
- `packages/forms/src/util.ts` — 13 lines
  - function: `removeListItem`
- `packages/forms/src/validators.ts` — 800 lines
  - const: `NG_VALIDATORS`, `NG_ASYNC_VALIDATORS`
  - class: `Validators`
  - function: `minValidator`, `maxValidator`, `requiredValidator`, `requiredTrueValidator`, `emailValidator`, `minLengthValidator`, `maxLengthValidator`, `patternValidator`, `nullValidator`, `toObservable`, `normalizeValidators`, `composeValidators`, `composeAsyncValidators`, `mergeValidators`, `getControlValidators`, `getControlAsyncValidators`, `makeValidatorsArray`, `hasValidator`, `addValidators`, `removeValidators`
- `packages/forms/src/version.ts` — 21 lines
  - const: `VERSION`



## `packages/forms/src/directives/`

- `packages/forms/src/directives/abstract_control_directive.ts` — 335 lines
  - class: `AbstractControlDirective`
- `packages/forms/src/directives/abstract_form_group_directive.ts` — 75 lines
  - class: `AbstractFormGroupDirective`
- `packages/forms/src/directives/checkbox_value_accessor.ts` — 65 lines
  - class: `CheckboxControlValueAccessor`
- `packages/forms/src/directives/control_container.ts` — 42 lines
  - class: `ControlContainer`
- `packages/forms/src/directives/control_value_accessor.ts` — 217 lines
  - interface: `ControlValueAccessor`
  - class: `BaseControlValueAccessor`, `BuiltInControlValueAccessor`
  - const: `NG_VALUE_ACCESSOR`
- `packages/forms/src/directives/default_value_accessor.ts` — 143 lines
  - const: `DEFAULT_VALUE_ACCESSOR`, `COMPOSITION_BUFFER_MODE`
  - class: `DefaultValueAccessor`
- `packages/forms/src/directives/error_examples.ts` — 62 lines
  - const: `formControlNameExample`, `formGroupNameExample`, `formArrayNameExample`, `ngModelGroupExample`, `ngModelWithFormGroupExample`
- `packages/forms/src/directives/form_interface.ts` — 81 lines
  - interface: `Form`
- `packages/forms/src/directives/native.ts` — 82 lines
  - type: `NativeFormControl`
  - function: `isNativeFormElement`, `elementAcceptsMinMax`, `isTextualFormElement`, `setNativeDomProperty`
- `packages/forms/src/directives/ng_control.ts` — 387 lines
  - const: `NG_CONTROL_INTEGRATION_PROVIDER`
  - class: `NgControl`
- `packages/forms/src/directives/ng_control_status.ts` — 147 lines
  - class: `AbstractControlStatus`, `NgControlStatus`, `NgControlStatusGroup`
  - const: `ngControlStatusHost`
- `packages/forms/src/directives/ng_form.ts` — 374 lines
  - class: `NgForm`
- `packages/forms/src/directives/ng_model.ts` — 433 lines
  - class: `NgModel`
- `packages/forms/src/directives/ng_model_group.ts` — 100 lines
  - const: `modelGroupProvider`
  - class: `NgModelGroup`
- `packages/forms/src/directives/ng_no_validate_directive.ts` — 36 lines
  - exports `ɵNgNoValidate as NgNoValidate`
- `packages/forms/src/directives/number_value_accessor.ts` — 78 lines
  - class: `NumberValueAccessor`
- `packages/forms/src/directives/radio_control_value_accessor.ts` — 266 lines
  - class: `RadioControlRegistry`, `RadioControlValueAccessor`
- `packages/forms/src/directives/range_value_accessor.ts` — 80 lines
  - class: `RangeValueAccessor`
- `packages/forms/src/directives/reactive_errors.ts` — 164 lines
  - function: `controlParentException`, `ngModelGroupException`, `missingFormException`, `groupParentException`, `arrayParentException`, `ngModelWarning`, `noControlsError`, `missingControlError`, `missingControlValueError`
  - const: `disabledAttrWarning`, `asyncValidatorsDroppedWithOptsWarning`
- `packages/forms/src/directives/reactive_validation_error.ts` — 28 lines
  - class: `ReactiveValidationError`
- `packages/forms/src/directives/select_control_value_accessor.ts` — 303 lines
  - class: `SelectControlValueAccessor`, `NgSelectOption`
- `packages/forms/src/directives/select_multiple_control_value_accessor.ts` — 279 lines
  - class: `SelectMultipleControlValueAccessor`
  - exports `ɵNgSelectMultipleOption as NgSelectMultipleOption`
- `packages/forms/src/directives/shared.ts` — 461 lines
  - const: `CALL_SET_DISABLED_STATE`, `setDisabledStateDefault`
  - type: `SetDisabledStateOption`
  - function: `controlPath`, `setUpControlValueAccessor`, `cleanUpControl`, `setUpDisabledChangeHandler`, `setUpValidators`, `cleanUpValidators`, `setUpFormContainer`, `cleanUpFormContainer`, `isPropertyUpdated`, `isBuiltInAccessor`, `syncPendingControls`, `selectValueAccessor`, `removeListItem`, `_ngModelWarning`
- `packages/forms/src/directives/template_driven_errors.ts` — 79 lines
  - function: `modelParentException`, `formGroupNameException`, `missingNameException`, `modelGroupParentException`
- `packages/forms/src/directives/validators.ts` — 697 lines
  - type: `ValidationErrors`
  - interface: `Validator`, `AsyncValidator`, `ValidatorFn`, `AsyncValidatorFn`
  - const: `MAX_VALIDATOR`, `MIN_VALIDATOR`, `REQUIRED_VALIDATOR`, `CHECKBOX_REQUIRED_VALIDATOR`, `EMAIL_VALIDATOR`, `MIN_LENGTH_VALIDATOR`, `MAX_LENGTH_VALIDATOR`, `PATTERN_VALIDATOR`
  - class: `MaxValidator`, `MinValidator`, `RequiredValidator`, `CheckboxRequiredValidator`, `EmailValidator`, `MinLengthValidator`, `MaxLengthValidator`, `PatternValidator`



## `packages/forms/src/directives/reactive_directives/`

- `packages/forms/src/directives/reactive_directives/abstract_form.directive.ts` — 387 lines
  - class: `AbstractFormDirective`
- `packages/forms/src/directives/reactive_directives/form_array_directive.ts` — 71 lines
  - class: `FormArrayDirective`
- `packages/forms/src/directives/reactive_directives/form_control_directive.ts` — 244 lines
  - const: `NG_MODEL_WITH_FORM_CONTROL_WARNING`
  - class: `FormControlDirective`
- `packages/forms/src/directives/reactive_directives/form_control_name.ts` — 288 lines
  - class: `FormControlName`
- `packages/forms/src/directives/reactive_directives/form_group_directive.ts` — 73 lines
  - class: `FormGroupDirective`
- `packages/forms/src/directives/reactive_directives/form_group_name.ts` — 240 lines
  - class: `FormGroupName`, `FormArrayName`
  - const: `formArrayNameProvider`



## `packages/forms/src/model/`

- `packages/forms/src/model/abstract_model.ts` — 1817 lines
  - const: `VALID`, `INVALID`, `PENDING`, `DISABLED`
  - type: `FormControlStatus`, `FormHooks`
  - class: `ControlEvent`, `ValueChangeEvent`, `PristineChangeEvent`, `TouchedChangeEvent`, `StatusChangeEvent`, `FormSubmittedEvent`, `FormResetEvent`, `AbstractControl`
  - function: `pickValidators`, `pickAsyncValidators`, `isOptionsObj`, `assertControlPresent`, `assertAllValuesPresent`, `hasOwnControl`
  - interface: `AbstractControlOptions`
- `packages/forms/src/model/form_array.ts` — 597 lines
  - class: `FormArray`
  - type: `UntypedFormArray`
  - const: `UntypedFormArray`, `isFormArray`
- `packages/forms/src/model/form_control.ts` — 640 lines
  - interface: `FormControlState`, `FormControlOptions`, `FormControl`
  - const: `FormControl`, `UntypedFormControl`, `isFormControl`
  - type: `UntypedFormControl`
- `packages/forms/src/model/form_group.ts` — 843 lines
  - class: `FormGroup`, `FormRecord`
  - type: `UntypedFormGroup`
  - const: `UntypedFormGroup`, `isFormGroup`, `isFormRecord`
  - interface: `FormRecord`



## `packages/forms/test/`

- `packages/forms/test/directives_spec.ts` — 774 lines _(spec)_
- `packages/forms/test/form_array_spec.ts` — 1763 lines _(spec)_
- `packages/forms/test/form_builder_spec.ts` — 419 lines _(spec)_
- `packages/forms/test/form_control_spec.ts` — 1805 lines _(spec)_
- `packages/forms/test/form_group_spec.ts` — 2915 lines _(spec)_
- `packages/forms/test/ng_control_status_spec.ts` — 48 lines _(spec)_
- `packages/forms/test/reactive_integration_spec.ts` — 6674 lines _(spec)_
  - class: `RadioForm`
- `packages/forms/test/template_integration_spec.ts` — 3127 lines _(spec)_
- `packages/forms/test/typed_integration_spec.ts` — 1945 lines _(spec)_
- `packages/forms/test/util.ts` — 94 lines _(test-support)_
  - function: `asyncValidator`, `simpleAsyncValidator`, `currentStateOf`, `asyncValidatorReturningObservable`
- `packages/forms/test/validators_spec.ts` — 631 lines _(spec)_
- `packages/forms/test/value_accessor_integration_spec.ts` — 2241 lines _(spec)_
  - class: `FormControlComp`, `FormGroupComp`, `FormControlRadioButtons`, `MyInput`, `MyInputForm`, `NgModelCustomComp`, `NgModelCustomWrapper`

