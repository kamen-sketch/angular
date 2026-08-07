<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/examples/`

134 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/examples/common/`

- `packages/examples/common/main.ts` — 16 lines
- `packages/examples/common/test_module.ts` — 43 lines
  - class: `TestsAppComponent`, `TestsAppModule`



## `packages/examples/common/location/ts/`

- `packages/examples/common/location/ts/hash_location_component.ts` — 32 lines
  - class: `HashLocationComponent`
- `packages/examples/common/location/ts/module.ts` — 29 lines
  - class: `AppComponent`, `AppModule`
- `packages/examples/common/location/ts/path_location_component.ts` — 32 lines
  - class: `PathLocationComponent`



## `packages/examples/common/location/ts/e2e_test/`

- `packages/examples/common/location/ts/e2e_test/location_component_spec.ts` — 29 lines _(spec)_



## `packages/examples/common/ngComponentOutlet/ts/`

- `packages/examples/common/ngComponentOutlet/ts/module.ts` — 108 lines
  - class: `HelloWorld`, `NgComponentOutletSimpleExample`, `Greeter`, `CompleteComponent`, `NgComponentOutletCompleteExample`, `AppComponent`



## `packages/examples/common/ngComponentOutlet/ts/e2e_test/`

- `packages/examples/common/ngComponentOutlet/ts/e2e_test/ngComponentOutlet_spec.ts` — 31 lines _(spec)_



## `packages/examples/common/ngIf/ts/`

- `packages/examples/common/ngIf/ts/module.ts` — 123 lines
  - class: `NgIfSimple`, `NgIfElse`, `NgIfThenElse`, `NgIfAs`, `AppComponent`



## `packages/examples/common/ngIf/ts/e2e_test/`

- `packages/examples/common/ngIf/ts/e2e_test/ngIf_spec.ts` — 86 lines _(spec)_



## `packages/examples/common/ngTemplateOutlet/ts/`

- `packages/examples/common/ngTemplateOutlet/ts/module.ts` — 44 lines
  - class: `NgTemplateOutletExample`, `AppComponent`



## `packages/examples/common/ngTemplateOutlet/ts/e2e_test/`

- `packages/examples/common/ngTemplateOutlet/ts/e2e_test/ngTemplateOutlet_spec.ts` — 35 lines _(spec)_



## `packages/examples/common/pipes/ts/`

- `packages/examples/common/pipes/ts/async_pipe.ts` — 79 lines
  - class: `AsyncPromisePipeComponent`, `AsyncObservablePipeComponent`
- `packages/examples/common/pipes/ts/currency_pipe.ts` — 49 lines
  - class: `CurrencyPipeComponent`
- `packages/examples/common/pipes/ts/date_pipe.ts` — 70 lines
  - class: `DatePipeComponent`, `DeprecatedDatePipeComponent`
- `packages/examples/common/pipes/ts/i18n_pipe.ts` — 39 lines
  - class: `I18nPluralPipeComponent`, `I18nSelectPipeComponent`
- `packages/examples/common/pipes/ts/json_pipe.ts` — 27 lines
  - class: `JsonPipeComponent`
- `packages/examples/common/pipes/ts/keyvalue_pipe.ts` — 39 lines
  - class: `KeyValuePipeComponent`
- `packages/examples/common/pipes/ts/locale-fr.ts` — 123 lines
  - has a default export
- `packages/examples/common/pipes/ts/lowerupper_pipe.ts` — 31 lines
  - class: `LowerUpperPipeComponent`
- `packages/examples/common/pipes/ts/module.ts` — 80 lines
  - class: `AppComponent`
- `packages/examples/common/pipes/ts/number_pipe.ts` — 44 lines
  - class: `NumberPipeComponent`
- `packages/examples/common/pipes/ts/percent_pipe.ts` — 37 lines
  - class: `PercentPipeComponent`
- `packages/examples/common/pipes/ts/slice_pipe.ts` — 44 lines
  - class: `SlicePipeStringComponent`, `SlicePipeListComponent`
- `packages/examples/common/pipes/ts/titlecase_pipe.ts` — 33 lines
  - class: `TitleCasePipeComponent`



## `packages/examples/common/pipes/ts/e2e_test/`

- `packages/examples/common/pipes/ts/e2e_test/pipe_spec.ts` — 114 lines _(spec)_



## `packages/examples/core/`

- `packages/examples/core/main.ts` — 30 lines
- `packages/examples/core/test_app_component.ts` — 35 lines
  - class: `TestsAppComponent`
  - const: `routes`



## `packages/examples/core/animation/ts/dsl/`

- `packages/examples/core/animation/ts/dsl/animation_example.ts` — 54 lines
  - class: `MyExpandoCmp`
- `packages/examples/core/animation/ts/dsl/module.ts` — 10 lines
  - exports `MyExpandoCmp as AppComponent` from `./animation_example`



## `packages/examples/core/animation/ts/dsl/e2e_test/`

- `packages/examples/core/animation/ts/dsl/e2e_test/animation_example_spec.ts` — 32 lines _(spec)_



## `packages/examples/core/debug/ts/debug_element/`

- `packages/examples/core/debug/ts/debug_element/debug_element.ts` — 15 lines



## `packages/examples/core/di/ts/`

- `packages/examples/core/di/ts/injector_spec.ts` — 90 lines _(spec)_
- `packages/examples/core/di/ts/metadata_spec.ts` — 191 lines _(spec)_
- `packages/examples/core/di/ts/provider_spec.ts` — 227 lines _(spec)_



## `packages/examples/core/di/ts/contentChild/`

- `packages/examples/core/di/ts/contentChild/content_child_example.ts` — 50 lines
  - class: `Pane`, `Tab`, `ContentChildComp`
- `packages/examples/core/di/ts/contentChild/content_child_howto.ts` — 24 lines
- `packages/examples/core/di/ts/contentChild/module.ts` — 12 lines
  - exports `ContentChildComp as AppComponent`



## `packages/examples/core/di/ts/contentChild/e2e_test/`

- `packages/examples/core/di/ts/contentChild/e2e_test/content_child_spec.ts` — 32 lines _(spec)_



## `packages/examples/core/di/ts/contentChildren/`

- `packages/examples/core/di/ts/contentChildren/content_children_example.ts` — 76 lines
  - class: `Pane`, `Tab`, `ContentChildrenComp`
- `packages/examples/core/di/ts/contentChildren/content_children_howto.ts` — 28 lines
- `packages/examples/core/di/ts/contentChildren/module.ts` — 12 lines
  - exports `ContentChildrenComp as AppComponent`



## `packages/examples/core/di/ts/contentChildren/e2e_test/`

- `packages/examples/core/di/ts/contentChildren/e2e_test/content_children_spec.ts` — 42 lines _(spec)_



## `packages/examples/core/di/ts/forward_ref/`

- `packages/examples/core/di/ts/forward_ref/forward_ref_spec.ts` — 59 lines _(spec)_



## `packages/examples/core/di/ts/viewChild/`

- `packages/examples/core/di/ts/viewChild/module.ts` — 12 lines
  - exports `ViewChildComp as AppComponent`
- `packages/examples/core/di/ts/viewChild/view_child_example.ts` — 48 lines
  - class: `Pane`, `ViewChildComp`
- `packages/examples/core/di/ts/viewChild/view_child_howto.ts` — 29 lines
  - class: `ChildDirective`, `SomeCmp`



## `packages/examples/core/di/ts/viewChild/e2e_test/`

- `packages/examples/core/di/ts/viewChild/e2e_test/view_child_spec.ts` — 32 lines _(spec)_



## `packages/examples/core/di/ts/viewChildren/`

- `packages/examples/core/di/ts/viewChildren/module.ts` — 12 lines
  - exports `ViewChildrenComp as AppComponent`
- `packages/examples/core/di/ts/viewChildren/view_children_example.ts` — 68 lines
  - class: `Pane`, `ViewChildrenComp`
- `packages/examples/core/di/ts/viewChildren/view_children_howto.ts` — 29 lines



## `packages/examples/core/di/ts/viewChildren/e2e_test/`

- `packages/examples/core/di/ts/viewChildren/e2e_test/view_children_spec.ts` — 32 lines _(spec)_



## `packages/examples/core/testability/ts/whenStable/`

- `packages/examples/core/testability/ts/whenStable/module.ts` — 9 lines
  - exports `StableTestCmp as AppComponent` from `./testability_example`
- `packages/examples/core/testability/ts/whenStable/testability_example.ts` — 27 lines
  - class: `StableTestCmp`



## `packages/examples/core/testability/ts/whenStable/e2e_test/`

- `packages/examples/core/testability/ts/whenStable/e2e_test/testability_example_spec.ts` — 51 lines _(spec)_



## `packages/examples/core/testing/ts/`

- `packages/examples/core/testing/ts/example_spec.ts` — 13 lines _(spec)_
- `packages/examples/core/testing/ts/fake_async.ts` — 29 lines _(test-support)_



## `packages/examples/core/ts/bootstrap/`

- `packages/examples/core/ts/bootstrap/bootstrap.ts` — 23 lines
  - function: `main`



## `packages/examples/core/ts/change_detect/`

- `packages/examples/core/ts/change_detect/change-detection.ts` — 117 lines



## `packages/examples/core/ts/metadata/`

- `packages/examples/core/ts/metadata/directives.ts` — 63 lines
  - class: `BankAccountComponent`, `MyInputComponent`, `IntervalDirComponent`, `MyOutputComponent`
- `packages/examples/core/ts/metadata/encapsulation.ts` — 36 lines
  - class: `MyApp`
- `packages/examples/core/ts/metadata/lifecycle_hooks_spec.ts` — 196 lines _(spec)_
- `packages/examples/core/ts/metadata/metadata.ts` — 34 lines



## `packages/examples/core/ts/pipes/`

- `packages/examples/core/ts/pipes/pipeTransFormEx_module.ts` — 18 lines
- `packages/examples/core/ts/pipes/simple_truncate.ts` — 19 lines
  - class: `TruncatePipe`
- `packages/examples/core/ts/pipes/truncate.ts` — 19 lines
  - class: `TruncatePipe`



## `packages/examples/core/ts/platform/`

- `packages/examples/core/ts/platform/platform.ts` — 81 lines
  - class: `ComponentOne`, `ComponentTwo`, `ComponentThree`, `ComponentFour`, `AppModule`, `AppModuleTwo`, `AppModuleThree`



## `packages/examples/core/ts/prod_mode/`

- `packages/examples/core/ts/prod_mode/my_component.ts` — 16 lines
  - class: `MyComponent`
- `packages/examples/core/ts/prod_mode/prod_mode_example.ts` — 23 lines



## `packages/examples/forms/`

- `packages/examples/forms/main.ts` — 16 lines
- `packages/examples/forms/test_module.ts` — 68 lines
  - class: `TestsAppComponent`, `TestsAppModule`



## `packages/examples/forms/ts/formBuilder/`

- `packages/examples/forms/ts/formBuilder/form_builder_example.ts` — 63 lines
  - class: `FormBuilderComp`, `DisabledFormControlComponent`
- `packages/examples/forms/ts/formBuilder/module.ts` — 22 lines
  - class: `AppModule`
  - exports `FormBuilderComp as AppComponent`



## `packages/examples/forms/ts/formBuilder/e2e_test/`

- `packages/examples/forms/ts/formBuilder/e2e_test/form_builder_spec.ts` — 38 lines _(spec)_



## `packages/examples/forms/ts/nestedFormArray/`

- `packages/examples/forms/ts/nestedFormArray/module.ts` — 22 lines
  - class: `AppModule`
  - exports `NestedFormArray as AppComponent`
- `packages/examples/forms/ts/nestedFormArray/nested_form_array_example.ts` — 54 lines
  - class: `NestedFormArray`



## `packages/examples/forms/ts/nestedFormArray/e2e_test/`

- `packages/examples/forms/ts/nestedFormArray/e2e_test/nested_form_array_spec.ts` — 44 lines _(spec)_



## `packages/examples/forms/ts/nestedFormGroup/`

- `packages/examples/forms/ts/nestedFormGroup/module.ts` — 22 lines
  - class: `AppModule`
  - exports `NestedFormGroupComp as AppComponent`
- `packages/examples/forms/ts/nestedFormGroup/nested_form_group_example.ts` — 62 lines
  - class: `NestedFormGroupComp`



## `packages/examples/forms/ts/nestedFormGroup/e2e_test/`

- `packages/examples/forms/ts/nestedFormGroup/e2e_test/nested_form_group_spec.ts` — 45 lines _(spec)_



## `packages/examples/forms/ts/ngModelGroup/`

- `packages/examples/forms/ts/ngModelGroup/module.ts` — 22 lines
  - class: `AppModule`
  - exports `NgModelGroupComp as AppComponent`
- `packages/examples/forms/ts/ngModelGroup/ng_model_group_example.ts` — 48 lines
  - class: `NgModelGroupComp`



## `packages/examples/forms/ts/ngModelGroup/e2e_test/`

- `packages/examples/forms/ts/ngModelGroup/e2e_test/ng_model_group_spec.ts` — 45 lines _(spec)_



## `packages/examples/forms/ts/radioButtons/`

- `packages/examples/forms/ts/radioButtons/module.ts` — 22 lines
  - class: `AppModule`
  - exports `RadioButtonComp as AppComponent`
- `packages/examples/forms/ts/radioButtons/radio_button_example.ts` — 29 lines
  - class: `RadioButtonComp`



## `packages/examples/forms/ts/radioButtons/e2e_test/`

- `packages/examples/forms/ts/radioButtons/e2e_test/radio_button_spec.ts` — 44 lines _(spec)_



## `packages/examples/forms/ts/reactiveRadioButtons/`

- `packages/examples/forms/ts/reactiveRadioButtons/module.ts` — 22 lines
  - class: `AppModule`
  - exports `ReactiveRadioButtonComp as AppComponent`
- `packages/examples/forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts` — 33 lines
  - class: `ReactiveRadioButtonComp`



## `packages/examples/forms/ts/reactiveRadioButtons/e2e_test/`

- `packages/examples/forms/ts/reactiveRadioButtons/e2e_test/reactive_radio_button_spec.ts` — 40 lines _(spec)_



## `packages/examples/forms/ts/reactiveSelectControl/`

- `packages/examples/forms/ts/reactiveSelectControl/module.ts` — 22 lines
  - class: `AppModule`
  - exports `ReactiveSelectComp as AppComponent`
- `packages/examples/forms/ts/reactiveSelectControl/reactive_select_control_example.ts` — 43 lines
  - class: `ReactiveSelectComp`



## `packages/examples/forms/ts/reactiveSelectControl/e2e_test/`

- `packages/examples/forms/ts/reactiveSelectControl/e2e_test/reactive_select_control_spec.ts` — 38 lines _(spec)_



## `packages/examples/forms/ts/selectControl/`

- `packages/examples/forms/ts/selectControl/module.ts` — 22 lines
  - class: `AppModule`
  - exports `SelectControlComp as AppComponent`
- `packages/examples/forms/ts/selectControl/select_control_example.ts` — 39 lines
  - class: `SelectControlComp`



## `packages/examples/forms/ts/selectControl/e2e_test/`

- `packages/examples/forms/ts/selectControl/e2e_test/select_control_spec.ts` — 37 lines _(spec)_



## `packages/examples/forms/ts/simpleForm/`

- `packages/examples/forms/ts/simpleForm/module.ts` — 22 lines
  - class: `AppModule`
  - exports `SimpleFormComp as AppComponent`
- `packages/examples/forms/ts/simpleForm/simple_form_example.ts` — 37 lines
  - class: `SimpleFormComp`



## `packages/examples/forms/ts/simpleForm/e2e_test/`

- `packages/examples/forms/ts/simpleForm/e2e_test/simple_form_spec.ts` — 45 lines _(spec)_



## `packages/examples/forms/ts/simpleFormControl/`

- `packages/examples/forms/ts/simpleFormControl/module.ts` — 22 lines
  - class: `AppModule`
  - exports `SimpleFormControl as AppComponent`
- `packages/examples/forms/ts/simpleFormControl/simple_form_control_example.ts` — 33 lines
  - class: `SimpleFormControl`



## `packages/examples/forms/ts/simpleFormControl/e2e_test/`

- `packages/examples/forms/ts/simpleFormControl/e2e_test/simple_form_control_spec.ts` — 55 lines _(spec)_



## `packages/examples/forms/ts/simpleFormGroup/`

- `packages/examples/forms/ts/simpleFormGroup/module.ts` — 22 lines
  - class: `AppModule`
  - exports `SimpleFormGroup as AppComponent`
- `packages/examples/forms/ts/simpleFormGroup/simple_form_group_example.ts` — 50 lines
  - class: `SimpleFormGroup`



## `packages/examples/forms/ts/simpleFormGroup/e2e_test/`

- `packages/examples/forms/ts/simpleFormGroup/e2e_test/simple_form_group_spec.ts` — 46 lines _(spec)_



## `packages/examples/forms/ts/simpleNgModel/`

- `packages/examples/forms/ts/simpleNgModel/module.ts` — 22 lines
  - class: `AppModule`
  - exports `SimpleNgModelComp as AppComponent`
- `packages/examples/forms/ts/simpleNgModel/simple_ng_model_example.ts` — 32 lines
  - class: `SimpleNgModelComp`



## `packages/examples/forms/ts/simpleNgModel/e2e_test/`

- `packages/examples/forms/ts/simpleNgModel/e2e_test/simple_ng_model_spec.ts` — 46 lines _(spec)_



## `packages/examples/injection-token/src/`

- `packages/examples/injection-token/src/main.ts` — 34 lines



## `packages/examples/platform-browser/dom/debug/ts/by/`

- `packages/examples/platform-browser/dom/debug/ts/by/by.ts` — 26 lines



## `packages/examples/router/`

- `packages/examples/router/route_functional_guards.ts` — 181 lines
  - class: `App`, `TeamComponent`, `UserComponent`, `HeroDetailComponent`, `HeroService`
  - const: `heroResolver`



## `packages/examples/router/activated-route/`

- `packages/examples/router/activated-route/activated_route_component.ts` — 34 lines
  - class: `ActivatedRouteComponent`
- `packages/examples/router/activated-route/main.ts` — 21 lines



## `packages/examples/router/testing/test/`

- `packages/examples/router/testing/test/router_testing_harness_examples.spec.ts` — 93 lines _(spec)_



## `packages/examples/router/utils/`

- `packages/examples/router/utils/functional_guards.ts` — 41 lines
  - class: `AdminGuard`, `ResolveUser`



## `packages/examples/service-worker/push/`

- `packages/examples/service-worker/push/main.ts` — 25 lines
- `packages/examples/service-worker/push/ngsw-worker.js` — 15 lines
- `packages/examples/service-worker/push/service_worker_component.ts` — 50 lines
  - class: `AppComponent`



## `packages/examples/service-worker/push/e2e_test/`

- `packages/examples/service-worker/push/e2e_test/push_spec.ts` — 23 lines _(spec)_



## `packages/examples/service-worker/registration-options/`

- `packages/examples/service-worker/registration-options/main.ts` — 16 lines
- `packages/examples/service-worker/registration-options/module.ts` — 43 lines
  - class: `AppComponent`, `AppModule`
- `packages/examples/service-worker/registration-options/ngsw-worker.js` — 15 lines



## `packages/examples/service-worker/registration-options/e2e_test/`

- `packages/examples/service-worker/registration-options/e2e_test/registration-options_spec.ts` — 28 lines _(spec)_



## `packages/examples/test-utils/`

- `packages/examples/test-utils/index.ts` — 31 lines
  - function: `verifyNoBrowserErrors`



## `packages/examples/testing/ts/`

- `packages/examples/testing/ts/testing.ts` — 79 lines _(test-support)_



## `packages/examples/upgrade/static/ts/full/`

- `packages/examples/upgrade/static/ts/full/module.spec.ts` — 50 lines _(spec)_
- `packages/examples/upgrade/static/ts/full/module.ts` — 199 lines
  - interface: `Hero`
  - class: `TextFormatter`, `Ng2HeroesComponent`, `HeroesService`, `Ng1HeroComponentWrapper`, `Ng2AppModule`
  - const: `ng1AppModule`



## `packages/examples/upgrade/static/ts/full/e2e_test/`

- `packages/examples/upgrade/static/ts/full/e2e_test/static_full_spec.ts` — 54 lines _(spec)_



## `packages/examples/upgrade/static/ts/lite/`

- `packages/examples/upgrade/static/ts/lite/module.ts` — 221 lines



## `packages/examples/upgrade/static/ts/lite-multi/`

- `packages/examples/upgrade/static/ts/lite-multi/module.ts` — 146 lines
  - class: `Ng2AComponent`, `Ng1AComponentFacade`, `Ng2AService`, `Ng2AModule`, `Ng2BComponent`, `Ng2BModule`



## `packages/examples/upgrade/static/ts/lite-multi-shared/`

- `packages/examples/upgrade/static/ts/lite-multi-shared/module.ts` — 159 lines
  - class: `Ng2Service`, `Ng2RootModule`, `Ng2AComponent`, `Ng2AModule`, `Ng2BComponent`, `Ng2BModule`, `Ng2CComponent`, `Ng2CModule`



## `packages/examples/upgrade/static/ts/lite-multi-shared/e2e_test/`

- `packages/examples/upgrade/static/ts/lite-multi-shared/e2e_test/static_lite_multi_shared_spec.ts` — 30 lines _(spec)_



## `packages/examples/upgrade/static/ts/lite-multi/e2e_test/`

- `packages/examples/upgrade/static/ts/lite-multi/e2e_test/static_lite_multi_spec.ts` — 28 lines _(spec)_



## `packages/examples/upgrade/static/ts/lite/e2e_test/`

- `packages/examples/upgrade/static/ts/lite/e2e_test/e2e_util.ts` — 71 lines
  - function: `addCustomMatchers`
- `packages/examples/upgrade/static/ts/lite/e2e_test/static_lite_spec.ts` — 91 lines _(spec)_

