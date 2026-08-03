<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/analyze-contracts.mjs
-->

# Compiler → runtime instruction contract

`packages/compiler/src/render3/r3_identifiers.ts` declares 211 symbols the
compiler may emit references to. Every one of them must be declared in `packages/core`; this
table resolves each to the file that declares it, grouped by that file. A symbol reached
through a re-export alias (for example `setClassMetadata as ɵsetClassMetadata`) shows the
original name in the `via` column.

## `packages/core/src/defer/instructions.ts` — 23

| Emitted symbol | via |
| --- | --- |
| `ɵɵdefer` | — |
| `ɵɵdeferHydrateNever` | — |
| `ɵɵdeferHydrateOnHover` | — |
| `ɵɵdeferHydrateOnIdle` | — |
| `ɵɵdeferHydrateOnImmediate` | — |
| `ɵɵdeferHydrateOnInteraction` | — |
| `ɵɵdeferHydrateOnTimer` | — |
| `ɵɵdeferHydrateOnViewport` | — |
| `ɵɵdeferHydrateWhen` | — |
| `ɵɵdeferOnHover` | — |
| `ɵɵdeferOnIdle` | — |
| `ɵɵdeferOnImmediate` | — |
| `ɵɵdeferOnInteraction` | — |
| `ɵɵdeferOnTimer` | — |
| `ɵɵdeferOnViewport` | — |
| `ɵɵdeferPrefetchOnHover` | — |
| `ɵɵdeferPrefetchOnIdle` | — |
| `ɵɵdeferPrefetchOnImmediate` | — |
| `ɵɵdeferPrefetchOnInteraction` | — |
| `ɵɵdeferPrefetchOnTimer` | — |
| `ɵɵdeferPrefetchOnViewport` | — |
| `ɵɵdeferPrefetchWhen` | — |
| `ɵɵdeferWhen` | — |

## `packages/core/src/render3/instructions/value_interpolation.ts` — 10

| Emitted symbol | via |
| --- | --- |
| `ɵɵinterpolate` | — |
| `ɵɵinterpolate1` | — |
| `ɵɵinterpolate2` | — |
| `ɵɵinterpolate3` | — |
| `ɵɵinterpolate4` | — |
| `ɵɵinterpolate5` | — |
| `ɵɵinterpolate6` | — |
| `ɵɵinterpolate7` | — |
| `ɵɵinterpolate8` | — |
| `ɵɵinterpolateV` | — |

## `packages/core/src/render3/instructions/text_interpolation.ts` — 10

| Emitted symbol | via |
| --- | --- |
| `ɵɵtextInterpolate` | — |
| `ɵɵtextInterpolate1` | — |
| `ɵɵtextInterpolate2` | — |
| `ɵɵtextInterpolate3` | — |
| `ɵɵtextInterpolate4` | — |
| `ɵɵtextInterpolate5` | — |
| `ɵɵtextInterpolate6` | — |
| `ɵɵtextInterpolate7` | — |
| `ɵɵtextInterpolate8` | — |
| `ɵɵtextInterpolateV` | — |

## `packages/core/src/render3/pure_function.ts` — 10

| Emitted symbol | via |
| --- | --- |
| `ɵɵpureFunction0` | — |
| `ɵɵpureFunction1` | — |
| `ɵɵpureFunction2` | — |
| `ɵɵpureFunction3` | — |
| `ɵɵpureFunction4` | — |
| `ɵɵpureFunction5` | — |
| `ɵɵpureFunction6` | — |
| `ɵɵpureFunction7` | — |
| `ɵɵpureFunction8` | — |
| `ɵɵpureFunctionV` | — |

## `packages/core/src/render3/jit/partial.ts` — 10

| Emitted symbol | via |
| --- | --- |
| `ɵɵngDeclareClassMetadata` | — |
| `ɵɵngDeclareClassMetadataAsync` | — |
| `ɵɵngDeclareComponent` | — |
| `ɵɵngDeclareDirective` | — |
| `ɵɵngDeclareFactory` | — |
| `ɵɵngDeclareInjectable` | — |
| `ɵɵngDeclareInjector` | — |
| `ɵɵngDeclareNgModule` | — |
| `ɵɵngDeclarePipe` | — |
| `ɵɵngDeclareService` | — |

## `packages/core/src/sanitization/sanitization.ts` — 9

| Emitted symbol | via |
| --- | --- |
| `ɵɵsanitizeHtml` | — |
| `ɵɵsanitizeResourceUrl` | — |
| `ɵɵsanitizeScript` | — |
| `ɵɵsanitizeStyle` | — |
| `ɵɵsanitizeUrl` | — |
| `ɵɵsanitizeUrlOrResourceUrl` | — |
| `ɵɵtrustConstantHtml` | — |
| `ɵɵtrustConstantResourceUrl` | — |
| `ɵɵvalidateAttribute` | — |

## `packages/core/src/render3/state.ts` — 7

| Emitted symbol | via |
| --- | --- |
| `ɵɵdisableBindings` | — |
| `ɵɵenableBindings` | — |
| `ɵɵnamespaceHTML` | — |
| `ɵɵnamespaceMathML` | — |
| `ɵɵnamespaceSVG` | — |
| `ɵɵresetView` | — |
| `ɵɵrestoreView` | — |

## `packages/core/src/render3/instructions/control_flow.ts` — 7

| Emitted symbol | via |
| --- | --- |
| `ɵɵconditional` | — |
| `ɵɵconditionalBranchCreate` | — |
| `ɵɵconditionalCreate` | — |
| `ɵɵrepeater` | — |
| `ɵɵrepeaterCreate` | — |
| `ɵɵrepeaterTrackByIdentity` | — |
| `ɵɵrepeaterTrackByIndex` | — |

## `packages/core/src/render3/instructions/i18n.ts` — 7

| Emitted symbol | via |
| --- | --- |
| `ɵɵi18n` | — |
| `ɵɵi18nApply` | — |
| `ɵɵi18nAttributes` | — |
| `ɵɵi18nEnd` | — |
| `ɵɵi18nExp` | — |
| `ɵɵi18nPostprocess` | — |
| `ɵɵi18nStart` | — |

## `packages/core/src/render3/instructions/element.ts` — 6

| Emitted symbol | via |
| --- | --- |
| `ɵɵdomElement` | — |
| `ɵɵdomElementEnd` | — |
| `ɵɵdomElementStart` | — |
| `ɵɵelement` | — |
| `ɵɵelementEnd` | — |
| `ɵɵelementStart` | — |

## `packages/core/src/render3/instructions/element_container.ts` — 6

| Emitted symbol | via |
| --- | --- |
| `ɵɵdomElementContainer` | — |
| `ɵɵdomElementContainerEnd` | — |
| `ɵɵdomElementContainerStart` | — |
| `ɵɵelementContainer` | — |
| `ɵɵelementContainerEnd` | — |
| `ɵɵelementContainerStart` | — |

## `packages/core/src/render3/pipe.ts` — 6

| Emitted symbol | via |
| --- | --- |
| `ɵɵpipe` | — |
| `ɵɵpipeBind1` | — |
| `ɵɵpipeBind2` | — |
| `ɵɵpipeBind3` | — |
| `ɵɵpipeBind4` | — |
| `ɵɵpipeBindV` | — |

## `packages/core/src/render3/interfaces/public_definitions.ts` — 6

| Emitted symbol | via |
| --- | --- |
| `ɵɵComponentDeclaration` | — |
| `ɵɵDirectiveDeclaration` | — |
| `ɵɵFactoryDeclaration` | — |
| `ɵɵInjectorDeclaration` | — |
| `ɵɵNgModuleDeclaration` | — |
| `ɵɵPipeDeclaration` | — |

## `packages/core/src/render3/instructions/styling.ts` — 4

| Emitted symbol | via |
| --- | --- |
| `ɵɵclassMap` | — |
| `ɵɵclassProp` | — |
| `ɵɵstyleMap` | — |
| `ɵɵstyleProp` | — |

## `packages/core/src/render3/instructions/animation.ts` — 4

| Emitted symbol | via |
| --- | --- |
| `ɵɵanimateEnter` | — |
| `ɵɵanimateEnterListener` | — |
| `ɵɵanimateLeave` | — |
| `ɵɵanimateLeaveListener` | — |

## `packages/core/src/render3/definition.ts` — 4

| Emitted symbol | via |
| --- | --- |
| `ɵɵdefineComponent` | — |
| `ɵɵdefineDirective` | — |
| `ɵɵdefineNgModule` | — |
| `ɵɵdefinePipe` | — |

## `packages/core/src/render3/instructions/queries.ts` — 4

| Emitted symbol | via |
| --- | --- |
| `ɵɵcontentQuery` | — |
| `ɵɵloadQuery` | — |
| `ɵɵqueryRefresh` | — |
| `ɵɵviewQuery` | — |

## `packages/core/src/metadata/di.ts` — 4

| Emitted symbol | via |
| --- | --- |
| `ContentChild` | — |
| `ContentChildren` | — |
| `ViewChild` | — |
| `ViewChildren` | — |

## `packages/core/src/render3/instructions/foreign_component.ts` — 3

| Emitted symbol | via |
| --- | --- |
| `ɵɵforeignComponent` | — |
| `ɵɵforeignContent` | — |
| `ɵɵforeignContentFn` | — |

## `packages/core/src/render3/instructions/listener.ts` — 3

| Emitted symbol | via |
| --- | --- |
| `ɵɵdomListener` | — |
| `ɵɵlistener` | — |
| `ɵɵsyntheticHostListener` | — |

## `packages/core/src/di/interface/defs.ts` — 3

| Emitted symbol | via |
| --- | --- |
| `ɵɵdefineInjectable` | — |
| `ɵɵdefineInjector` | — |
| `ɵɵInjectorDef` | — |

## `packages/core/src/render3/util/misc_utils.ts` — 3

| Emitted symbol | via |
| --- | --- |
| `ɵɵresolveBody` | — |
| `ɵɵresolveDocument` | — |
| `ɵɵresolveWindow` | — |

## `packages/core/src/render3/instructions/queries_signals.ts` — 3

| Emitted symbol | via |
| --- | --- |
| `ɵɵcontentQuerySignal` | — |
| `ɵɵqueryAdvance` | — |
| `ɵɵviewQuerySignal` | — |

## `packages/core/src/render3/instructions/two_way.ts` — 3

| Emitted symbol | via |
| --- | --- |
| `ɵɵtwoWayBindingSet` | — |
| `ɵɵtwoWayListener` | — |
| `ɵɵtwoWayProperty` | — |

## `packages/core/src/render3/instructions/let_declaration.ts` — 3

| Emitted symbol | via |
| --- | --- |
| `ɵɵdeclareLet` | — |
| `ɵɵreadContextLet` | — |
| `ɵɵstoreLet` | — |

## `packages/core/src/render3/instructions/template.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵdomTemplate` | — |
| `ɵɵtemplate` | — |

## `packages/core/src/render3/instructions/dom_property.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵdomProperty` | — |
| `ɵɵsyntheticHostProperty` | — |

## `packages/core/src/render3/instructions/control.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵcontrol` | — |
| `ɵɵcontrolCreate` | — |

## `packages/core/src/render3/instructions/projection.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵprojection` | — |
| `ɵɵprojectionDef` | — |

## `packages/core/src/di/injector_compatibility.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵinject` | — |
| `ɵɵinvalidFactoryDep` | — |

## `packages/core/src/render3/instructions/di.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵdirectiveInject` | — |
| `ɵɵinvalidFactory` | — |

## `packages/core/src/di/forward_ref.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `forwardRef` | — |
| `resolveForwardRef` | — |

## `packages/core/src/render3/hmr.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵgetReplaceMetadataURL` | — |
| `ɵɵreplaceMetadata` | — |

## `packages/core/src/render3/scope.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵsetComponentScope` | — |
| `ɵɵsetNgModuleScope` | — |

## `packages/core/src/compiler/compiler_facade_interface.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵɵFactoryTarget` | `FactoryTarget` |
| `ViewEncapsulation` | — |

## `packages/core/src/render3/metadata.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `ɵsetClassMetadata` | `setClassMetadata` |
| `ɵsetClassMetadataAsync` | `setClassMetadataAsync` |

## `packages/core/src/metadata/directives.ts` — 2

| Emitted symbol | via |
| --- | --- |
| `Input` | — |
| `Output` | — |

## `packages/core/src/render3/instructions/advance.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵadvance` | — |

## `packages/core/src/render3/instructions/attribute.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵattribute` | — |

## `packages/core/src/render3/instructions/next_context.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵnextContext` | — |

## `packages/core/src/defer/rendering.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵdeferEnableTimerScheduling` | — |

## `packages/core/src/hydration/incremental_runtime.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵenableIncrementalHydrationRuntime` | — |

## `packages/core/src/render3/instructions/component_instance.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵcomponentInstance` | — |

## `packages/core/src/render3/instructions/text.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵtext` | — |

## `packages/core/src/render3/instructions/get_current_view.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵgetCurrentView` | — |

## `packages/core/src/render3/instructions/aria_property.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵariaProperty` | — |

## `packages/core/src/render3/instructions/property.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵproperty` | — |

## `packages/core/src/render3/instructions/storage.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵreference` | — |

## `packages/core/src/render3/instructions/di_attr.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵinjectAttribute` | — |

## `packages/core/src/render3/view_engine_compatibility_prebound.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵtemplateRefExtractor` | — |

## `packages/core/primitives/di/src/injection_token.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵInjectableDeclaration` | — |

## `packages/core/src/di/interface/service.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵdefineService` | — |

## `packages/core/src/render3/local_compilation.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵgetComponentDepsFactory` | — |

## `packages/core/src/change_detection/constants.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ChangeDetectionStrategy` | — |

## `packages/core/src/di/interface/provider.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ModuleWithProviders` | — |

## `packages/core/src/linker/ng_module_registration.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵregisterNgModuleType` | `registerNgModuleType` |

## `packages/core/src/render3/debug/set_debug_info.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵsetClassDebugInfo` | — |

## `packages/core/src/render3/instructions/arrow_function.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵarrowFunction` | — |

## `packages/core/src/render3/instructions/attach_source_locations.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵattachSourceLocations` | — |

## `packages/core/src/render3/features/ng_onchanges_feature.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵNgOnChangesFeature` | — |

## `packages/core/src/render3/features/control_feature.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵControlFeature` | — |

## `packages/core/src/render3/features/inherit_definition_feature.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵInheritDefinitionFeature` | — |

## `packages/core/src/render3/features/providers_feature.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵProvidersFeature` | — |

## `packages/core/src/render3/features/host_directives_feature.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵHostDirectivesFeature` | — |

## `packages/core/src/render3/features/external_styles_feature.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵExternalStylesFeature` | — |

## `packages/core/src/render3/di.ts` — 1

| Emitted symbol | via |
| --- | --- |
| `ɵɵgetInheritedFactory` | — |
