<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/animations/`

61 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/animations/`

- `packages/animations/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/animations/public_api.ts` — 15 lines
  - re-exports * from `./src/animations`



## `packages/animations/browser/`

- `packages/animations/browser/index.ts` — 15 lines
  - re-exports * from `./public_api`
- `packages/animations/browser/public_api.ts` — 15 lines
  - re-exports * from `./src/browser`



## `packages/animations/browser/src/`

- `packages/animations/browser/src/browser.ts` — 16 lines
  - re-exports * from `./private_export`
  - exports `AnimationDriver`, `NoopAnimationDriver` from `./render/animation_driver`
- `packages/animations/browser/src/create_engine.ts` — 23 lines
  - function: `createEngine`
- `packages/animations/browser/src/error_helpers.ts` — 300 lines
  - function: `invalidTimingValue`, `negativeStepValue`, `negativeDelayValue`, `invalidStyleParams`, `invalidParamValue`, `invalidNodeType`, `invalidCssUnitValue`, `invalidTrigger`, `invalidDefinition`, `invalidState`, `invalidStyleValue`, `invalidProperty`, `invalidParallelAnimation`, `invalidKeyframes`, `invalidOffset`, `keyframeOffsetsOutOfOrder`, `keyframesMissingOffsets`, `invalidStagger`, `invalidQuery`, `invalidExpression`, `invalidTransitionAlias`, `validationFailed`, `buildingFailed`, `triggerBuildFailed`, `animationFailed`, `registerFailed`, `missingOrDestroyedAnimation`, `createAnimationFailed`, `missingPlayer`, `missingTrigger`, `missingEvent`, `unsupportedTriggerEvent`, `unregisteredTrigger`, `triggerTransitionsFailed`, `triggerParsingFailed`, `transitionFailed`
- `packages/animations/browser/src/private_export.ts` — 37 lines
  - exports `createEngine as ɵcreateEngine` from `./create_engine`
  - exports `Animation as ɵAnimation` from `./dsl/animation`
  - exports `AnimationStyleNormalizer as ɵAnimationStyleNormalizer`, `NoopAnimationStyleNormalizer as ɵNoopAnimationStyleNormalizer` from `./dsl/style_normalization/animation_style_normalizer`
  - exports `WebAnimationsStyleNormalizer as ɵWebAnimationsStyleNormalizer` from `./dsl/style_normalization/web_animations_style_normalizer`
  - exports `AnimationEngine as ɵAnimationEngine` from `./render/animation_engine_next`
  - exports `AnimationRendererFactory as ɵAnimationRendererFactory` from `./render/animation_renderer`
  - exports `AnimationRenderer as ɵAnimationRenderer`, `BaseAnimationRenderer as ɵBaseAnimationRenderer` from `./render/renderer`
  - exports `containsElement as ɵcontainsElement`, `getParentElement as ɵgetParentElement`, `invokeQuery as ɵinvokeQuery`, `validateStyleProperty as ɵvalidateStyleProperty`, `validateWebAnimatableStyleProperty as ɵvalidateWebAnimatableStyleProperty` from `./render/shared`
  - exports `WebAnimationsDriver as ɵWebAnimationsDriver` from `./render/web_animations/web_animations_driver`
  - exports `WebAnimationsPlayer as ɵWebAnimationsPlayer` from `./render/web_animations/web_animations_player`
  - exports `allowPreviousPlayerStylesMerge as ɵallowPreviousPlayerStylesMerge`, `camelCaseToDashCase as ɵcamelCaseToDashCase`, `normalizeKeyframes as ɵnormalizeKeyframes` from `./util`
  - exports `TransitionAnimationPlayer as ɵTransitionAnimationPlayer` from `./render/transition_animation_engine`
  - exports `ENTER_CLASSNAME as ɵENTER_CLASSNAME`, `LEAVE_CLASSNAME as ɵLEAVE_CLASSNAME` from `./util`
- `packages/animations/browser/src/util.ts` — 298 lines
  - const: `SUBSTITUTION_EXPR_START`, `SUBSTITUTION_EXPR_END`, `ENTER_CLASSNAME`, `LEAVE_CLASSNAME`, `NG_TRIGGER_CLASSNAME`, `NG_TRIGGER_SELECTOR`, `NG_ANIMATING_CLASSNAME`, `NG_ANIMATING_SELECTOR`
  - function: `resolveTimingValue`, `resolveTiming`, `normalizeKeyframes`, `normalizeStyles`, `setStyles`, `eraseStyles`, `normalizeAnimationEntry`, `validateStyleParams`, `extractStyleParams`, `interpolateParams`, `dashCaseToCamelCase`, `camelCaseToDashCase`, `allowPreviousPlayerStylesMerge`, `balancePreviousStylesIntoKeyframes`, `visitDslNode`, `visitDslNode`, `visitDslNode`, `computeStyle`
- `packages/animations/browser/src/warning_helpers.ts` — 46 lines
  - function: `warnValidation`, `warnTriggerBuild`, `warnRegister`, `triggerParsingWarnings`, `pushUnrecognizedPropertiesWarning`



## `packages/animations/browser/src/dsl/`

- `packages/animations/browser/src/dsl/animation.ts` — 79 lines
  - class: `Animation`
- `packages/animations/browser/src/dsl/animation_ast.ts` — 120 lines
  - interface: `AstVisitor`, `Ast`, `TriggerAst`, `StateAst`, `TransitionAst`, `SequenceAst`, `GroupAst`, `AnimateAst`, `StyleAst`, `KeyframesAst`, `ReferenceAst`, `AnimateChildAst`, `AnimateRefAst`, `QueryAst`, `StaggerAst`, `TimingAst`, `DynamicTimingAst`
- `packages/animations/browser/src/dsl/animation_ast_builder.ts` — 690 lines
  - function: `buildAnimationAst`
  - class: `AnimationAstBuilderVisitor`, `AnimationAstBuilderContext`
  - type: `StyleTimeTuple`
- `packages/animations/browser/src/dsl/animation_dsl_visitor.ts` — 39 lines
  - interface: `AnimationDslVisitor`
- `packages/animations/browser/src/dsl/animation_timeline_builder.ts` — 1076 lines
  - function: `buildAnimationTimelines`
  - class: `AnimationTimelineBuilderVisitor`, `AnimationTimelineContext`, `TimelineBuilder`
  - type: `StyleAtTime`
- `packages/animations/browser/src/dsl/animation_timeline_instruction.ts` — 51 lines
  - interface: `AnimationTimelineInstruction`
  - function: `createTimelineInstruction`
- `packages/animations/browser/src/dsl/animation_transition_expr.ts` — 107 lines
  - const: `ANY_STATE`
  - type: `TransitionMatcherFn`
  - function: `parseTransitionExpr`
- `packages/animations/browser/src/dsl/animation_transition_factory.ts` — 262 lines
  - class: `AnimationTransitionFactory`, `AnimationStateStyles`
- `packages/animations/browser/src/dsl/animation_transition_instruction.ts` — 66 lines
  - interface: `AnimationTransitionInstruction`
  - function: `createTransitionInstruction`
- `packages/animations/browser/src/dsl/animation_trigger.ts` — 98 lines
  - function: `buildTrigger`
  - class: `AnimationTrigger`
- `packages/animations/browser/src/dsl/element_instruction_map.ts` — 33 lines
  - class: `ElementInstructionMap`



## `packages/animations/browser/src/dsl/style_normalization/`

- `packages/animations/browser/src/dsl/style_normalization/animation_style_normalizer.ts` — 33 lines
  - class: `AnimationStyleNormalizer`, `NoopAnimationStyleNormalizer`
- `packages/animations/browser/src/dsl/style_normalization/web_animations_style_normalizer.ts` — 72 lines
  - class: `WebAnimationsStyleNormalizer`



## `packages/animations/browser/src/render/`

- `packages/animations/browser/src/render/animation_driver.ts` — 111 lines
  - class: `NoopAnimationDriver`, `AnimationDriver`
- `packages/animations/browser/src/render/animation_engine_instruction.ts` — 16 lines
  - const enum: `AnimationTransitionInstructionType`
  - interface: `AnimationEngineInstruction`
- `packages/animations/browser/src/render/animation_engine_next.ts` — 140 lines
  - class: `AnimationEngine`
- `packages/animations/browser/src/render/animation_renderer.ts` — 146 lines
  - class: `AnimationRendererFactory`
- `packages/animations/browser/src/render/renderer.ts` — 234 lines
  - class: `BaseAnimationRenderer`, `AnimationRenderer`
- `packages/animations/browser/src/render/shared.ts` — 230 lines
  - function: `optimizeGroupPlayer`, `normalizeKeyframes`, `listenOnPlayer`, `copyAnimationEvent`, `makeAnimationEvent`, `getOrSetDefaultValue`, `parseTimelineCommand`, `getParentElement`, `validateStyleProperty`, `validateWebAnimatableStyleProperty`, `getBodyNode`, `containsElement`, `invokeQuery`, `hypenatePropsKeys`
- `packages/animations/browser/src/render/special_cased_styles.ts` — 137 lines
  - function: `packageNonAnimatableStyles`
  - class: `SpecialCasedStyles`
- `packages/animations/browser/src/render/timeline_animation_engine.ts` — 206 lines
  - class: `TimelineAnimationEngine`
- `packages/animations/browser/src/render/transition_animation_engine.ts` — 1944 lines
  - class: `TransitionAnimationEngine`, `TransitionAnimationPlayer`



## `packages/animations/browser/src/render/web_animations/`

- `packages/animations/browser/src/render/web_animations/animatable_props_set.ts` — 215 lines
  - const: `ANIMATABLE_PROP_SET`
- `packages/animations/browser/src/render/web_animations/web_animations_driver.ts` — 95 lines
  - class: `WebAnimationsDriver`
- `packages/animations/browser/src/render/web_animations/web_animations_player.ts` — 247 lines
  - class: `WebAnimationsPlayer`



## `packages/animations/browser/test/`

- `packages/animations/browser/test/shared.ts` — 37 lines _(test-support)_
  - function: `makeTrigger`



## `packages/animations/browser/test/dsl/`

- `packages/animations/browser/test/dsl/animation_ast_builder_spec.ts` — 67 lines _(spec)_
- `packages/animations/browser/test/dsl/animation_spec.ts` — 1488 lines _(spec)_
- `packages/animations/browser/test/dsl/animation_trigger_spec.ts` — 321 lines _(spec)_



## `packages/animations/browser/test/dsl/style_normalizer/`

- `packages/animations/browser/test/dsl/style_normalizer/web_animations_style_normalizer_spec.ts` — 64 lines _(spec)_



## `packages/animations/browser/test/render/`

- `packages/animations/browser/test/render/timeline_animation_engine_spec.ts` — 151 lines _(spec)_
- `packages/animations/browser/test/render/transition_animation_engine_spec.ts` — 845 lines _(spec)_



## `packages/animations/browser/test/render/web_animations/`

- `packages/animations/browser/test/render/web_animations/web_animations_driver_spec.ts` — 48 lines _(spec)_
- `packages/animations/browser/test/render/web_animations/web_animations_player_spec.ts` — 226 lines _(spec)_



## `packages/animations/browser/testing/`

- `packages/animations/browser/testing/index.ts` — 15 lines _(test-support)_
  - re-exports * from `./public_api`
- `packages/animations/browser/testing/public_api.ts` — 15 lines _(test-support)_
  - re-exports * from `./src/testing`



## `packages/animations/browser/testing/src/`

- `packages/animations/browser/testing/src/mock_animation_driver.ts` — 175 lines _(test-support)_
  - class: `MockAnimationDriver`, `MockAnimationPlayer`
- `packages/animations/browser/testing/src/testing.ts` — 9 lines _(test-support)_
  - exports `MockAnimationDriver`, `MockAnimationPlayer` from `./mock_animation_driver`



## `packages/animations/src/`

- `packages/animations/src/animation_builder.ts` — 268 lines
  - class: `AnimationBuilder`, `AnimationFactory`, `BrowserAnimationBuilder`
- `packages/animations/src/animation_event.ts` — 73 lines
  - interface: `AnimationEvent`
- `packages/animations/src/animation_metadata.ts` — 1425 lines
  - type: `AnimateTimings`
  - interface: `AnimationOptions`, `AnimateChildOptions`, `AnimationMetadata`, `AnimationTriggerMetadata`, `AnimationStateMetadata`, `AnimationTransitionMetadata`, `AnimationReferenceMetadata`, `AnimationQueryMetadata`, `AnimationKeyframesSequenceMetadata`, `AnimationStyleMetadata`, `AnimationAnimateMetadata`, `AnimationAnimateChildMetadata`, `AnimationAnimateRefMetadata`, `AnimationSequenceMetadata`, `AnimationGroupMetadata`, `AnimationQueryOptions`, `AnimationStaggerMetadata`
  - enum: `AnimationMetadataType`
  - const: `AUTO_STYLE`
  - function: `trigger`, `animate`, `group`, `sequence`, `style`, `state`, `keyframes`, `transition`, `animation`, `animateChild`, `useAnimation`, `query`, `stagger`
- `packages/animations/src/animations.ts` — 56 lines
  - re-exports * from `./private_export`
  - exports `AnimationBuilder`, `AnimationFactory` from `./animation_builder`
  - exports `AnimationEvent` from `./animation_event`
  - exports `animate`, `animateChild`, `AnimateChildOptions`, `AnimateTimings`, `animation`, `AnimationAnimateChildMetadata`, `AnimationAnimateMetadata`, `AnimationAnimateRefMetadata`, `AnimationGroupMetadata`, `AnimationKeyframesSequenceMetadata`, `AnimationMetadata`, `AnimationMetadataType`, `AnimationOptions`, `AnimationQueryMetadata`, `AnimationQueryOptions`, `AnimationReferenceMetadata`, `AnimationSequenceMetadata`, `AnimationStaggerMetadata`, `AnimationStateMetadata`, `AnimationStyleMetadata`, `AnimationTransitionMetadata`, `AnimationTriggerMetadata`, `AUTO_STYLE`, `group`, …(+11) from `./animation_metadata`
  - exports `AnimationPlayer`, `NoopAnimationPlayer` from `./players/animation_player`
- `packages/animations/src/errors.ts` — 60 lines
  - const enum: `RuntimeErrorCode`
- `packages/animations/src/private_export.ts` — 13 lines
  - exports `BrowserAnimationBuilder as ɵBrowserAnimationBuilder` from `./animation_builder`
  - exports `RuntimeErrorCode as ɵRuntimeErrorCode` from `./errors`
  - exports `AnimationGroupPlayer as ɵAnimationGroupPlayer` from `./players/animation_group_player`
- `packages/animations/src/version.ts` — 17 lines
  - const: `VERSION`



## `packages/animations/src/players/`

- `packages/animations/src/players/animation_group_player.ts` — 176 lines
  - class: `AnimationGroupPlayer`
- `packages/animations/src/players/animation_player.ts` — 215 lines
  - interface: `AnimationPlayer`
  - class: `NoopAnimationPlayer`



## `packages/animations/test/`

- `packages/animations/test/animation_group_player_spec.ts` — 41 lines _(spec)_
- `packages/animations/test/animation_player_spec.ts` — 84 lines _(spec)_
- `packages/animations/test/browser_animation_builder_spec.ts` — 317 lines _(spec)_
- `packages/animations/test/util_spec.ts` — 22 lines _(spec)_

