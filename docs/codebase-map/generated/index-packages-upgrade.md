<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/upgrade/`

45 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/upgrade/`

- `packages/upgrade/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/upgrade/public_api.ts` — 20 lines
  - exports `VERSION` from `./src/common/src/version`



## `packages/upgrade/src/common/src/`

- `packages/upgrade/src/common/src/angular1.ts` — 343 lines
  - type: `Ng1Token`, `Ng1Expression`, `IInjectable`, `SingleOrListOrMap`, `DirectiveRequireProperty`, `DirectiveTranscludeProperty`, `IAugmentedJQuery`, `IController`
  - interface: `IAnnotatedFunction`, `IModule`, `ICompileService`, `ILinkFn`, `ILinkFnOptions`, `IRootScopeService`, `IScope`, `IAngularBootstrapConfig`, `IDirective`, `IDirectiveCompileFn`, `IDirectivePrePost`, `IDirectiveLinkFn`, `IComponent`, `IAttributes`, `ITranscludeFunction`, `ICloneAttachFunction`, `IProvider`, `IProvideService`, `IParseService`, `ICompiledExpression`, `IHttpBackendService`, `ICacheObject`, `ITemplateCacheService`, `IControllerService`, `IInjectorService`, `IIntervalService`, `ITestabilityService`, `INgModelController`
  - function: `setAngularLib`, `getAngularLib`, `setAngularJSGlobal`, `getAngularJSGlobal`
  - const: `bootstrap`, `module_`, `element`, `injector`, `resumeBootstrap`, `getTestability`
- `packages/upgrade/src/common/src/component_info.ts` — 36 lines
  - class: `PropertyBinding`
- `packages/upgrade/src/common/src/constants.ts` — 38 lines
  - const: `$COMPILE`, `$CONTROLLER`, `$DELEGATE`, `$EXCEPTION_HANDLER`, `$HTTP_BACKEND`, `$INJECTOR`, `$INTERVAL`, `$PARSE`, `$PROVIDE`, `$ROOT_ELEMENT`, `$ROOT_SCOPE`, `$SCOPE`, `$TEMPLATE_CACHE`, `$TEMPLATE_REQUEST`, `$$TESTABILITY`, `COMPILER_KEY`, `DOWNGRADED_MODULE_COUNT_KEY`, `GROUP_PROJECTABLE_NODES_KEY`, `INJECTOR_KEY`, `LAZY_MODULE_REF`, `NG_ZONE_KEY`, `UPGRADE_APP_TYPE_KEY`, `REQUIRE_INJECTOR`, `REQUIRE_NG_MODEL`, `UPGRADE_MODULE_NAME`
- `packages/upgrade/src/common/src/downgrade_component.ts` — 282 lines
  - function: `downgradeComponent`
- `packages/upgrade/src/common/src/downgrade_component_adapter.ts` — 418 lines
  - class: `DowngradeComponentAdapter`
  - function: `groupNodesBySelector`
- `packages/upgrade/src/common/src/downgrade_injectable.ts` — 94 lines
  - function: `downgradeInjectable`
- `packages/upgrade/src/common/src/promise_util.ts` — 68 lines
  - interface: `Thenable`
  - function: `isThenable`
  - class: `SyncPromise`
- `packages/upgrade/src/common/src/upgrade_helper.ts` — 338 lines
  - interface: `IBindingDestination`, `IControllerInstance`
  - class: `UpgradeHelper`
- `packages/upgrade/src/common/src/util.ts` — 223 lines
  - function: `onError`, `cleanData`, `controllerKey`, `destroyApp`, `directiveNormalize`, `getTypeName`, `getDowngradedModuleCount`, `getUpgradeAppType`, `isFunction`, `isNgModuleType`, `validateInjectionKey`, `hookupNgModel`, `strictEquals`
  - class: `Deferred`
  - interface: `LazyModuleRef`
  - const enum: `UpgradeAppType`
- `packages/upgrade/src/common/src/version.ts` — 21 lines
  - const: `VERSION`



## `packages/upgrade/src/common/src/security/`

- `packages/upgrade/src/common/src/security/trusted_types.ts` — 62 lines
  - function: `trustedHTMLFromLegacyTemplate`
- `packages/upgrade/src/common/src/security/trusted_types_defs.ts` — 43 lines
  - type: `TrustedHTML`
  - interface: `TrustedTypePolicyFactory`, `TrustedTypePolicy`



## `packages/upgrade/src/common/test/`

- `packages/upgrade/src/common/test/component_info_spec.ts` — 36 lines _(spec)_
- `packages/upgrade/src/common/test/downgrade_component_adapter_spec.ts` — 211 lines _(spec)_
- `packages/upgrade/src/common/test/downgrade_injectable_spec.ts` — 64 lines _(spec)_
- `packages/upgrade/src/common/test/promise_util_spec.ts` — 121 lines _(spec)_



## `packages/upgrade/src/common/test/helpers/`

- `packages/upgrade/src/common/test/helpers/common_test_helpers.ts` — 182 lines _(test-support)_
  - function: `createWithEachNg1VersionFn`, `html`, `multiTrim`, `nodes`
  - const: `withEachNg1Version`



## `packages/upgrade/static/`

- `packages/upgrade/static/common.ts` — 25 lines
  - exports `ɵangular1`, `ɵconstants`, `ɵupgradeHelper`, `ɵutil`
- `packages/upgrade/static/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/upgrade/static/public_api.ts` — 19 lines
  - re-exports * from `./common`
  - exports `getAngularJSGlobal`, `setAngularJSGlobal` from `../src/common/src/angular1`
  - exports `downgradeComponent` from `../src/common/src/downgrade_component`
  - exports `downgradeInjectable` from `../src/common/src/downgrade_injectable`
  - exports `VERSION` from `../src/common/src/version`
  - exports `downgradeModule` from `./src/downgrade_module`
  - exports `UpgradeComponent` from `./src/upgrade_component`
  - exports `UpgradeModule` from `./src/upgrade_module`



## `packages/upgrade/static/src/`

- `packages/upgrade/static/src/angular1_providers.ts` — 51 lines
  - function: `setTempInjectorRef`, `injectorFactory`, `rootScopeFactory`, `compileFactory`, `parseFactory`
  - const: `angular1Providers`
- `packages/upgrade/static/src/downgrade_module.ts` — 457 lines
  - function: `downgradeModule`, `downgradeModule`, `downgradeModule`
- `packages/upgrade/static/src/upgrade_component.ts` — 316 lines
  - class: `UpgradeComponent`
- `packages/upgrade/static/src/upgrade_module.ts` — 366 lines
  - class: `UpgradeModule`
- `packages/upgrade/static/src/util.ts` — 29 lines
  - class: `NgAdapterInjector`



## `packages/upgrade/static/test/`

- `packages/upgrade/static/test/angular1_providers_spec.ts` — 73 lines _(spec)_



## `packages/upgrade/static/test/integration/`

- `packages/upgrade/static/test/integration/change_detection_spec.ts` — 255 lines _(spec)_
- `packages/upgrade/static/test/integration/content_projection_spec.ts` — 197 lines _(spec)_
- `packages/upgrade/static/test/integration/downgrade_component_spec.ts` — 1208 lines _(spec)_
- `packages/upgrade/static/test/integration/downgrade_module_spec.ts` — 1790 lines _(spec)_
- `packages/upgrade/static/test/integration/examples_spec.ts` — 103 lines _(spec)_
- `packages/upgrade/static/test/integration/injection_spec.ts` — 135 lines _(spec)_
- `packages/upgrade/static/test/integration/static_test_helpers.ts` — 51 lines _(test-support)_
  - function: `bootstrap`, `$apply`, `$digest`
- `packages/upgrade/static/test/integration/testability_spec.ts` — 153 lines _(spec)_
- `packages/upgrade/static/test/integration/upgrade_component_spec.ts` — 4895 lines _(spec)_
- `packages/upgrade/static/test/integration/upgrade_module_spec.ts` — 157 lines _(spec)_



## `packages/upgrade/static/testing/`

- `packages/upgrade/static/testing/index.ts` — 10 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/upgrade/static/testing/public_api.ts` — 11 lines _(test-support)_
  - exports `createAngularTestingModule` from `./src/create_angular_testing_module`
  - exports `createAngularJSTestingModule` from `./src/create_angularjs_testing_module`



## `packages/upgrade/static/testing/src/`

- `packages/upgrade/static/testing/src/create_angular_testing_module.ts` — 104 lines _(test-support)_
  - function: `$injectorFactory`, `createAngularTestingModule`
  - class: `AngularTestingModule`
- `packages/upgrade/static/testing/src/create_angularjs_testing_module.ts` — 95 lines _(test-support)_
  - function: `createAngularJSTestingModule`



## `packages/upgrade/static/testing/test/`

- `packages/upgrade/static/testing/test/create_angular_testing_module_spec.ts` — 49 lines _(spec)_
- `packages/upgrade/static/testing/test/create_angularjs_testing_module_spec.ts` — 35 lines _(spec)_
- `packages/upgrade/static/testing/test/mocks.ts` — 74 lines _(test-support)_
  - class: `Logger`, `Inventory`, `AppModule`
  - function: `serverRequestFactory`, `defineAppModule`
  - const: `serverRequestInstance`, `shoppingCartInstance`

