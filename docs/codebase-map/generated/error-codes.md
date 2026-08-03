<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/analyze-error-codes.mjs
-->

# Error code catalogue

Every `NG…` code Angular can produce, in two independent spaces. See
[`../20-error-codes.md`](../20-error-codes.md) for how the two conventions work.

## Runtime codes

`NG0` + the absolute value of a `RuntimeErrorCode` member. A negative value means the code has
a guide at angular.dev and `formatRuntimeError` appends a link to it.

| Package | Reserved range | Codes | With a guide |
| --- | --- | ---: | ---: |
| `animations` | 3000–3999 | 37 | 0 |
| `common` | 2000–2999 | 62 | 4 |
| `core` | 100–999 | 94 | 33 |
| `forms` | 1000–1999 | 36 | 4 |
| `platform-browser` | 5000–5500 | 12 | 5 |
| `platform-server` | 5700–5800 | 7 | 1 |
| `router` | 4000–4999 | 19 | 0 |
| `service-worker` | 5600–5699 | 5 | 0 |
| **total** | | **272** | **47** |

### `animations`

| Code | Name | Guide | Declared in |
| --- | --- | --- | --- |
| `NG03000` | `INVALID_TIMING_VALUE` | — | `packages/animations/src/errors.ts` |
| `NG03001` | `INVALID_STYLE_PARAMS` | — | `packages/animations/src/errors.ts` |
| `NG03002` | `INVALID_STYLE_VALUE` | — | `packages/animations/src/errors.ts` |
| `NG03003` | `INVALID_PARAM_VALUE` | — | `packages/animations/src/errors.ts` |
| `NG03004` | `INVALID_NODE_TYPE` | — | `packages/animations/src/errors.ts` |
| `NG03005` | `INVALID_CSS_UNIT_VALUE` | — | `packages/animations/src/errors.ts` |
| `NG03006` | `INVALID_TRIGGER` | — | `packages/animations/src/errors.ts` |
| `NG03007` | `INVALID_DEFINITION` | — | `packages/animations/src/errors.ts` |
| `NG03008` | `INVALID_STATE` | — | `packages/animations/src/errors.ts` |
| `NG03009` | `INVALID_PROPERTY` | — | `packages/animations/src/errors.ts` |
| `NG03010` | `INVALID_PARALLEL_ANIMATION` | — | `packages/animations/src/errors.ts` |
| `NG03011` | `INVALID_KEYFRAMES` | — | `packages/animations/src/errors.ts` |
| `NG03012` | `INVALID_OFFSET` | — | `packages/animations/src/errors.ts` |
| `NG03013` | `INVALID_STAGGER` | — | `packages/animations/src/errors.ts` |
| `NG03014` | `INVALID_QUERY` | — | `packages/animations/src/errors.ts` |
| `NG03015` | `INVALID_EXPRESSION` | — | `packages/animations/src/errors.ts` |
| `NG03016` | `INVALID_TRANSITION_ALIAS` | — | `packages/animations/src/errors.ts` |
| `NG03100` | `NEGATIVE_STEP_VALUE` | — | `packages/animations/src/errors.ts` |
| `NG03101` | `NEGATIVE_DELAY_VALUE` | — | `packages/animations/src/errors.ts` |
| `NG03200` | `KEYFRAME_OFFSETS_OUT_OF_ORDER` | — | `packages/animations/src/errors.ts` |
| `NG03202` | `KEYFRAMES_MISSING_OFFSETS` | — | `packages/animations/src/errors.ts` |
| `NG03300` | `MISSING_OR_DESTROYED_ANIMATION` | — | `packages/animations/src/errors.ts` |
| `NG03301` | `MISSING_PLAYER` | — | `packages/animations/src/errors.ts` |
| `NG03302` | `MISSING_TRIGGER` | — | `packages/animations/src/errors.ts` |
| `NG03303` | `MISSING_EVENT` | — | `packages/animations/src/errors.ts` |
| `NG03400` | `UNSUPPORTED_TRIGGER_EVENT` | — | `packages/animations/src/errors.ts` |
| `NG03401` | `UNREGISTERED_TRIGGER` | — | `packages/animations/src/errors.ts` |
| `NG03402` | `TRIGGER_TRANSITIONS_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03403` | `TRIGGER_PARSING_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03404` | `TRIGGER_BUILD_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03500` | `VALIDATION_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03501` | `BUILDING_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03502` | `ANIMATION_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03503` | `REGISTRATION_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03504` | `CREATE_ANIMATION_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03505` | `TRANSITION_FAILED` | — | `packages/animations/src/errors.ts` |
| `NG03600` | `BROWSER_ANIMATION_BUILDER_INJECTED_WITHOUT_ANIMATIONS` | — | `packages/animations/src/errors.ts` |

### `common`

| Code | Name | Guide | Declared in |
| --- | --- | --- | --- |
| `NG02000` | `PARENT_NG_SWITCH_NOT_FOUND` | — | `packages/common/src/errors.ts` |
| `NG02001` | `EQUALITY_NG_SWITCH_DIFFERENCE` | — | `packages/common/src/errors.ts` |
| `NG02020` | `NG_IF_NOT_A_TEMPLATE_REF` | — | `packages/common/src/errors.ts` |
| `NG02100` | `INVALID_PIPE_ARGUMENT` | — | `packages/common/src/errors.ts` |
| `NG02200` | `NG_FOR_MISSING_DIFFER` | [guide](https://angular.dev/errors/NG02200) | `packages/common/src/errors.ts` |
| `NG02300` | `SUSPICIOUS_DATE_FORMAT` | — | `packages/common/src/errors.ts` |
| `NG02301` | `UNKNOWN_DATE_TYPE_VALUE` | — | `packages/common/src/errors.ts` |
| `NG02302` | `UNEXPECTED_TRANSLATION_TYPE` | — | `packages/common/src/errors.ts` |
| `NG02303` | `MISSING_EXTRA_LOCALE_DATA_FOR_LOCALE` | — | `packages/common/src/errors.ts` |
| `NG02304` | `LOCALE_DATA_UNDEFINED` | — | `packages/common/src/errors.ts` |
| `NG02305` | `INVALID_INTEGER_LITERAL` | — | `packages/common/src/errors.ts` |
| `NG02306` | `INVALID_DIGIT_INFO` | — | `packages/common/src/errors.ts` |
| `NG02307` | `INVALID_NUMBER_OF_DIGITS_AFTER_FRACTION` | — | `packages/common/src/errors.ts` |
| `NG02308` | `NO_PLURAL_MESSAGE_FOUND` | — | `packages/common/src/errors.ts` |
| `NG02309` | `VALUE_NOT_A_NUMBER` | — | `packages/common/src/errors.ts` |
| `NG02310` | `UNKNOWN_ZONE_WIDTH` | — | `packages/common/src/errors.ts` |
| `NG02311` | `INVALID_TO_DATE_CONVERSION` | — | `packages/common/src/errors.ts` |
| `NG02400` | `SCROLL_RESTORATION_UNSUPPORTED` | — | `packages/common/src/errors.ts` |
| `NG02800` | `MISSING_JSONP_MODULE` | [guide](https://angular.dev/errors/NG02800) | `packages/common/http/src/errors.ts` |
| `NG02801` | `NOT_USING_FETCH_BACKEND_IN_SSR` | — | `packages/common/http/src/errors.ts` |
| `NG02802` | `HEADERS_ALTERED_BY_TRANSFER_CACHE` | [guide](https://angular.dev/errors/NG02802) | `packages/common/http/src/errors.ts` |
| `NG02803` | `HTTP_ORIGIN_MAP_USED_IN_CLIENT` | — | `packages/common/http/src/errors.ts` |
| `NG02804` | `HTTP_ORIGIN_MAP_CONTAINS_PATH` | — | `packages/common/http/src/errors.ts` |
| `NG02805` | `CANNOT_SPECIFY_BOTH_FROM_STRING_AND_FROM_OBJECT` | — | `packages/common/http/src/errors.ts` |
| `NG02806` | `RESPONSE_IS_NOT_AN_ARRAY_BUFFER` | — | `packages/common/http/src/errors.ts` |
| `NG02807` | `RESPONSE_IS_NOT_A_BLOB` | — | `packages/common/http/src/errors.ts` |
| `NG02808` | `RESPONSE_IS_NOT_A_STRING` | — | `packages/common/http/src/errors.ts` |
| `NG02809` | `UNHANDLED_OBSERVE_TYPE` | — | `packages/common/http/src/errors.ts` |
| `NG02810` | `JSONP_WRONG_METHOD` | — | `packages/common/http/src/errors.ts` |
| `NG02811` | `JSONP_WRONG_RESPONSE_TYPE` | — | `packages/common/http/src/errors.ts` |
| `NG02812` | `JSONP_HEADERS_NOT_SUPPORTED` | — | `packages/common/http/src/errors.ts` |
| `NG02813` | `KEEPALIVE_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02814` | `CACHE_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02815` | `PRIORITY_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02816` | `MODE_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02817` | `REDIRECT_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02818` | `CREDENTIALS_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02819` | `WITH_CREDENTIALS_OVERRIDES_EXPLICIT_CREDENTIALS` | — | `packages/common/http/src/errors.ts` |
| `NG02820` | `INTEGRITY_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02821` | `REFERRER_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02822` | `INVALID_TIMEOUT_VALUE` | — | `packages/common/http/src/errors.ts` |
| `NG02823` | `REFERRER_POLICY_NOT_SUPPORTED_WITH_XHR` | — | `packages/common/http/src/errors.ts` |
| `NG02824` | `FETCH_UPLOAD_PROGRESS_NOT_SUPPORTED` | — | `packages/common/http/src/errors.ts` |
| `NG02825` | `FETCH_RESPONSE_BODY_TOO_LARGE` | [guide](https://angular.dev/errors/NG02825) | `packages/common/http/src/errors.ts` |
| `NG02826` | `JSONP_UNSAFE_URL` | — | `packages/common/http/src/errors.ts` |
| `NG02950` | `UNEXPECTED_SRC_ATTR` | — | `packages/common/src/errors.ts` |
| `NG02951` | `UNEXPECTED_SRCSET_ATTR` | — | `packages/common/src/errors.ts` |
| `NG02952` | `INVALID_INPUT` | — | `packages/common/src/errors.ts` |
| `NG02953` | `UNEXPECTED_INPUT_CHANGE` | — | `packages/common/src/errors.ts` |
| `NG02954` | `REQUIRED_INPUT_MISSING` | — | `packages/common/src/errors.ts` |
| `NG02955` | `LCP_IMG_MISSING_PRIORITY` | — | `packages/common/src/errors.ts` |
| `NG02956` | `PRIORITY_IMG_MISSING_PRECONNECT_TAG` | — | `packages/common/src/errors.ts` |
| `NG02958` | `UNEXPECTED_DEV_MODE_CHECK_IN_PROD_MODE` | — | `packages/common/src/errors.ts` |
| `NG02959` | `INVALID_LOADER_ARGUMENTS` | — | `packages/common/src/errors.ts` |
| `NG02960` | `OVERSIZED_IMAGE` | — | `packages/common/src/errors.ts` |
| `NG02961` | `TOO_MANY_PRELOADED_IMAGES` | — | `packages/common/src/errors.ts` |
| `NG02962` | `MISSING_BUILTIN_LOADER` | — | `packages/common/src/errors.ts` |
| `NG02963` | `MISSING_NECESSARY_LOADER` | — | `packages/common/src/errors.ts` |
| `NG02964` | `LCP_IMG_NGSRC_MODIFIED` | — | `packages/common/src/errors.ts` |
| `NG02965` | `OVERSIZED_PLACEHOLDER` | — | `packages/common/src/errors.ts` |
| `NG02966` | `TOO_MANY_PRIORITY_ATTRIBUTES` | — | `packages/common/src/errors.ts` |
| `NG02967` | `PLACEHOLDER_DIMENSION_LIMIT_EXCEEDED` | — | `packages/common/src/errors.ts` |

### `core`

| Code | Name | Guide | Declared in |
| --- | --- | --- | --- |
| `NG0100` | `EXPRESSION_CHANGED_AFTER_CHECKED` | [guide](https://angular.dev/errors/NG0100) | `packages/core/src/errors.ts` |
| `NG0101` | `RECURSIVE_APPLICATION_REF_TICK` | — | `packages/core/src/errors.ts` |
| `NG0103` | `INFINITE_CHANGE_DETECTION` | — | `packages/core/src/errors.ts` |
| `NG0200` | `CYCLIC_DI_DEPENDENCY` | [guide](https://angular.dev/errors/NG0200) | `packages/core/src/errors.ts` |
| `NG0201` | `PROVIDER_NOT_FOUND` | [guide](https://angular.dev/errors/NG0201) | `packages/core/src/errors.ts` |
| `NG0202` | `INVALID_FACTORY_DEPENDENCY` | — | `packages/core/src/errors.ts` |
| `NG0203` | `MISSING_INJECTION_CONTEXT` | [guide](https://angular.dev/errors/NG0203) | `packages/core/src/errors.ts` |
| `NG0204` | `INVALID_INJECTION_TOKEN` | [guide](https://angular.dev/errors/NG0204) | `packages/core/src/errors.ts` |
| `NG0205` | `INJECTOR_ALREADY_DESTROYED` | [guide](https://angular.dev/errors/NG0205) | `packages/core/src/errors.ts` |
| `NG0207` | `PROVIDER_IN_WRONG_CONTEXT` | [guide](https://angular.dev/errors/NG0207) | `packages/core/src/errors.ts` |
| `NG0208` | `MISSING_INJECTION_TOKEN` | — | `packages/core/src/errors.ts` |
| `NG0209` | `INVALID_MULTI_PROVIDER` | [guide](https://angular.dev/errors/NG0209) | `packages/core/src/errors.ts` |
| `NG0210` | `MISSING_DOCUMENT` | — | `packages/core/src/errors.ts` |
| `NG0211` | `INVALID_APP_ID` | — | `packages/core/src/errors.ts` |
| `NG0300` | `MULTIPLE_COMPONENTS_MATCH` | [guide](https://angular.dev/errors/NG0300) | `packages/core/src/errors.ts` |
| `NG0301` | `EXPORT_NOT_FOUND` | [guide](https://angular.dev/errors/NG0301) | `packages/core/src/errors.ts` |
| `NG0302` | `PIPE_NOT_FOUND` | [guide](https://angular.dev/errors/NG0302) | `packages/core/src/errors.ts` |
| `NG0303` | `UNKNOWN_BINDING` | — | `packages/core/src/errors.ts` |
| `NG0304` | `UNKNOWN_ELEMENT` | — | `packages/core/src/errors.ts` |
| `NG0305` | `TEMPLATE_STRUCTURE_ERROR` | — | `packages/core/src/errors.ts` |
| `NG0306` | `INVALID_EVENT_BINDING` | — | `packages/core/src/errors.ts` |
| `NG0307` | `HOST_DIRECTIVE_UNRESOLVABLE` | — | `packages/core/src/errors.ts` |
| `NG0308` | `HOST_DIRECTIVE_NOT_STANDALONE` | — | `packages/core/src/errors.ts` |
| `NG0309` | `DUPLICATE_DIRECTIVE` | — | `packages/core/src/errors.ts` |
| `NG0310` | `HOST_DIRECTIVE_COMPONENT` | — | `packages/core/src/errors.ts` |
| `NG0311` | `HOST_DIRECTIVE_UNDEFINED_BINDING` | — | `packages/core/src/errors.ts` |
| `NG0312` | `HOST_DIRECTIVE_CONFLICTING_ALIAS` | — | `packages/core/src/errors.ts` |
| `NG0313` | `MULTIPLE_MATCHING_PIPES` | — | `packages/core/src/errors.ts` |
| `NG0314` | `UNINITIALIZED_LET_ACCESS` | — | `packages/core/src/errors.ts` |
| `NG0315` | `NO_BINDING_TARGET` | — | `packages/core/src/errors.ts` |
| `NG0316` | `INVALID_BINDING_TARGET` | — | `packages/core/src/errors.ts` |
| `NG0317` | `INVALID_SET_INPUT_CALL` | — | `packages/core/src/errors.ts` |
| `NG0318` | `INVALID_STYLE_PROP_VALUE` | [guide](https://angular.dev/errors/NG0318) | `packages/core/src/errors.ts` |
| `NG0400` | `MULTIPLE_PLATFORMS` | — | `packages/core/src/errors.ts` |
| `NG0401` | `PLATFORM_NOT_FOUND` | [guide](https://angular.dev/errors/NG0401) | `packages/core/src/errors.ts` |
| `NG0402` | `MISSING_REQUIRED_INJECTABLE_IN_BOOTSTRAP` | — | `packages/core/src/errors.ts` |
| `NG0403` | `BOOTSTRAP_COMPONENTS_NOT_FOUND` | [guide](https://angular.dev/errors/NG0403) | `packages/core/src/errors.ts` |
| `NG0404` | `PLATFORM_ALREADY_DESTROYED` | — | `packages/core/src/errors.ts` |
| `NG0405` | `ASYNC_INITIALIZERS_STILL_RUNNING` | — | `packages/core/src/errors.ts` |
| `NG0406` | `APPLICATION_REF_ALREADY_DESTROYED` | — | `packages/core/src/errors.ts` |
| `NG0407` | `RENDERER_NOT_FOUND` | — | `packages/core/src/errors.ts` |
| `NG0408` | `PROVIDED_BOTH_ZONE_AND_ZONELESS` | — | `packages/core/src/errors.ts` |
| `NG0500` | `HYDRATION_NODE_MISMATCH` | [guide](https://angular.dev/errors/NG0500) | `packages/core/src/errors.ts` |
| `NG0501` | `HYDRATION_MISSING_SIBLINGS` | [guide](https://angular.dev/errors/NG0501) | `packages/core/src/errors.ts` |
| `NG0502` | `HYDRATION_MISSING_NODE` | [guide](https://angular.dev/errors/NG0502) | `packages/core/src/errors.ts` |
| `NG0503` | `UNSUPPORTED_PROJECTION_DOM_NODES` | [guide](https://angular.dev/errors/NG0503) | `packages/core/src/errors.ts` |
| `NG0504` | `INVALID_SKIP_HYDRATION_HOST` | [guide](https://angular.dev/errors/NG0504) | `packages/core/src/errors.ts` |
| `NG0505` | `MISSING_HYDRATION_ANNOTATIONS` | [guide](https://angular.dev/errors/NG0505) | `packages/core/src/errors.ts` |
| `NG0506` | `HYDRATION_STABLE_TIMEDOUT` | [guide](https://angular.dev/errors/NG0506) | `packages/core/src/errors.ts` |
| `NG0507` | `MISSING_SSR_CONTENT_INTEGRITY_MARKER` | [guide](https://angular.dev/errors/NG0507) | `packages/core/src/errors.ts` |
| `NG0508` | `MISCONFIGURED_INCREMENTAL_HYDRATION` | — | `packages/core/src/errors.ts` |
| `NG0600` | `SIGNAL_WRITE_FROM_ILLEGAL_CONTEXT` | — | `packages/core/src/errors.ts` |
| `NG0601` | `REQUIRE_SYNC_WITHOUT_SYNC_EMIT` | — | `packages/core/src/errors.ts` |
| `NG0602` | `ASSERTION_NOT_INSIDE_REACTIVE_CONTEXT` | [guide](https://angular.dev/errors/NG0602) | `packages/core/src/errors.ts` |
| `NG0650` | `ANIMATE_INVALID_VALUE` | — | `packages/core/src/errors.ts` |
| `NG0700` | `INVALID_I18N_STRUCTURE` | — | `packages/core/src/errors.ts` |
| `NG0701` | `MISSING_LOCALE_DATA` | — | `packages/core/src/errors.ts` |
| `NG0750` | `DEFER_LOADING_FAILED` | [guide](https://angular.dev/errors/NG0750) | `packages/core/src/errors.ts` |
| `NG0751` | `DEFER_IN_HMR_MODE` | [guide](https://angular.dev/errors/NG0751) | `packages/core/src/errors.ts` |
| `NG0800` | `IMPORT_PROVIDERS_FROM_STANDALONE` | — | `packages/core/src/errors.ts` |
| `NG0900` | `INVALID_DIFFER_INPUT` | — | `packages/core/src/errors.ts` |
| `NG0901` | `NO_SUPPORTING_DIFFER_FACTORY` | — | `packages/core/src/errors.ts` |
| `NG0902` | `VIEW_ALREADY_ATTACHED` | — | `packages/core/src/errors.ts` |
| `NG0903` | `INVALID_INHERITANCE` | — | `packages/core/src/errors.ts` |
| `NG0904` | `UNSAFE_VALUE_IN_RESOURCE_URL` | — | `packages/core/src/errors.ts` |
| `NG0905` | `UNSAFE_VALUE_IN_SCRIPT` | — | `packages/core/src/errors.ts` |
| `NG0906` | `MISSING_GENERATED_DEF` | — | `packages/core/src/errors.ts` |
| `NG0907` | `TYPE_IS_NOT_STANDALONE` | — | `packages/core/src/errors.ts` |
| `NG0908` | `MISSING_ZONEJS` | — | `packages/core/src/errors.ts` |
| `NG0909` | `UNEXPECTED_ZONE_STATE` | — | `packages/core/src/errors.ts` |
| `NG0910` | `UNSAFE_ATTRIBUTE_BINDING` | [guide](https://angular.dev/errors/NG0910) | `packages/core/src/errors.ts` |
| `NG0911` | `VIEW_ALREADY_DESTROYED` | — | `packages/core/src/errors.ts` |
| `NG0912` | `COMPONENT_ID_COLLISION` | [guide](https://angular.dev/errors/NG0912) | `packages/core/src/errors.ts` |
| `NG0913` | `IMAGE_PERFORMANCE_WARNING` | [guide](https://angular.dev/errors/NG0913) | `packages/core/src/errors.ts` |
| `NG0914` | `UNEXPECTED_ZONEJS_PRESENT_IN_ZONELESS_MODE` | — | `packages/core/src/errors.ts` |
| `NG0915` | `MISSING_NG_MODULE_DEFINITION` | — | `packages/core/src/errors.ts` |
| `NG0916` | `MISSING_DIRECTIVE_DEFINITION` | — | `packages/core/src/errors.ts` |
| `NG0918` | `EXTERNAL_RESOURCE_LOADING_FAILED` | — | `packages/core/src/errors.ts` |
| `NG0919` | `DEF_TYPE_UNDEFINED` | [guide](https://angular.dev/errors/NG0919) | `packages/core/src/errors.ts` |
| `NG0920` | `NG_MODULE_ID_NOT_FOUND` | — | `packages/core/src/errors.ts` |
| `NG0921` | `DUPLICATE_NG_MODULE_ID` | — | `packages/core/src/errors.ts` |
| `NG0922` | `VIEW_DESTROYED_INSERT_ERROR` | — | `packages/core/src/errors.ts` |
| `NG0923` | `VIEW_DESTROYED_MOVE_ERROR` | — | `packages/core/src/errors.ts` |
| `NG0950` | `REQUIRED_INPUT_NO_VALUE` | [guide](https://angular.dev/errors/NG0950) | `packages/core/src/errors.ts` |
| `NG0951` | `REQUIRED_QUERY_NO_VALUE` | [guide](https://angular.dev/errors/NG0951) | `packages/core/src/errors.ts` |
| `NG0952` | `REQUIRED_MODEL_NO_VALUE` | — | `packages/core/src/errors.ts` |
| `NG0953` | `OUTPUT_REF_DESTROYED` | — | `packages/core/src/errors.ts` |
| `NG0955` | `LOOP_TRACK_DUPLICATE_KEYS` | [guide](https://angular.dev/errors/NG0955) | `packages/core/src/errors.ts` |
| `NG0956` | `LOOP_TRACK_RECREATE` | [guide](https://angular.dev/errors/NG0956) | `packages/core/src/errors.ts` |
| `NG0980` | `RUNTIME_DEPS_INVALID_IMPORTED_TYPE` | — | `packages/core/src/errors.ts` |
| `NG0981` | `RUNTIME_DEPS_ORPHAN_COMPONENT` | — | `packages/core/src/errors.ts` |
| `NG0990` | `MUST_PROVIDE_STREAM_OPTION` | — | `packages/core/src/errors.ts` |
| `NG0991` | `RESOURCE_COMPLETED_BEFORE_PRODUCING_VALUE` | — | `packages/core/src/errors.ts` |
| `NG0992` | `INVALID_RESOURCE_CREATION_IN_PARAMS` | — | `packages/core/src/errors.ts` |

### `forms`

| Code | Name | Guide | Declared in |
| --- | --- | --- | --- |
| `NG01000` | `NO_CONTROLS` | — | `packages/forms/src/errors.ts` |
| `NG01001` | `MISSING_CONTROL` | — | `packages/forms/src/errors.ts` |
| `NG01002` | `MISSING_CONTROL_VALUE` | [guide](https://angular.dev/errors/NG01002) | `packages/forms/src/errors.ts` |
| `NG01050` | `FORM_CONTROL_NAME_MISSING_PARENT` | — | `packages/forms/src/errors.ts` |
| `NG01051` | `FORM_CONTROL_NAME_INSIDE_MODEL_GROUP` | — | `packages/forms/src/errors.ts` |
| `NG01052` | `FORM_GROUP_MISSING_INSTANCE` | — | `packages/forms/src/errors.ts` |
| `NG01053` | `FORM_GROUP_NAME_MISSING_PARENT` | — | `packages/forms/src/errors.ts` |
| `NG01054` | `FORM_ARRAY_NAME_MISSING_PARENT` | — | `packages/forms/src/errors.ts` |
| `NG01101` | `WRONG_VALIDATOR_RETURN_TYPE` | [guide](https://angular.dev/errors/NG01101) | `packages/forms/src/errors.ts` |
| `NG01200` | `NG_VALUE_ACCESSOR_NOT_PROVIDED` | — | `packages/forms/src/errors.ts` |
| `NG01201` | `COMPAREWITH_NOT_A_FN` | — | `packages/forms/src/errors.ts` |
| `NG01202` | `NAME_AND_FORM_CONTROL_NAME_MUST_MATCH` | — | `packages/forms/src/errors.ts` |
| `NG01203` | `NG_MISSING_VALUE_ACCESSOR` | [guide](https://angular.dev/errors/NG01203) | `packages/forms/src/errors.ts` |
| `NG01350` | `NGMODEL_IN_FORM_GROUP` | — | `packages/forms/src/errors.ts` |
| `NG01351` | `NGMODEL_IN_FORM_GROUP_NAME` | — | `packages/forms/src/errors.ts` |
| `NG01352` | `NGMODEL_WITHOUT_NAME` | — | `packages/forms/src/errors.ts` |
| `NG01353` | `NGMODELGROUP_IN_FORM_GROUP` | — | `packages/forms/src/errors.ts` |
| `NG01900` | `PATH_NOT_IN_FIELD_TREE` | — | `packages/forms/signals/src/errors.ts` |
| `NG01901` | `PATH_RESOLUTION_FAILED` | — | `packages/forms/signals/src/errors.ts` |
| `NG01902` | `ORPHAN_FIELD_PROPERTY` | [guide](https://angular.dev/errors/NG01902) | `packages/forms/signals/src/errors.ts` |
| `NG01903` | `ORPHAN_FIELD_ARRAY` | — | `packages/forms/signals/src/errors.ts` |
| `NG01904` | `ORPHAN_FIELD_NOT_FOUND` | — | `packages/forms/signals/src/errors.ts` |
| `NG01905` | `ROOT_FIELD_NO_PARENT` | — | `packages/forms/signals/src/errors.ts` |
| `NG01906` | `PARENT_NOT_ARRAY` | — | `packages/forms/signals/src/errors.ts` |
| `NG01907` | `ABSTRACT_CONTROL_IN_FORM` | — | `packages/forms/signals/src/errors.ts` |
| `NG01908` | `PATH_OUTSIDE_SCHEMA` | — | `packages/forms/signals/src/errors.ts` |
| `NG01909` | `UNKNOWN_BUILDER_TYPE` | — | `packages/forms/signals/src/errors.ts` |
| `NG01910` | `UNKNOWN_STATUS` | — | `packages/forms/signals/src/errors.ts` |
| `NG01911` | `COMPAT_NO_CHILDREN` | — | `packages/forms/signals/src/errors.ts` |
| `NG01912` | `MANAGED_METADATA_LAZY_CREATION` | — | `packages/forms/signals/src/errors.ts` |
| `NG01913` | `BINDING_ALREADY_REGISTERED` | — | `packages/forms/signals/src/errors.ts` |
| `NG01914` | `INVALID_FIELD_DIRECTIVE_HOST` | — | `packages/forms/signals/src/errors.ts` |
| `NG01915` | `MISSING_SUBMIT_ACTION` | — | `packages/forms/signals/src/errors.ts` |
| `NG01916` | `RENDERED_HIDDEN_FIELD` | — | `packages/forms/signals/src/errors.ts` |
| `NG01920` | `UNSUPPORTED_FEATURE` | — | `packages/forms/signals/src/errors.ts` |
| `NG01921` | `TEXT_INPUT_NULL_VALUE` | — | `packages/forms/signals/src/errors.ts` |

### `platform-browser`

| Code | Name | Guide | Declared in |
| --- | --- | --- | --- |
| `NG05000` | `UNSUPPORTED_ZONEJS_INSTANCE` | [guide](https://angular.dev/errors/NG05000) | `packages/platform-browser/src/errors.ts` |
| `NG05001` | `HYDRATION_CONFLICTING_FEATURES` | — | `packages/platform-browser/src/errors.ts` |
| `NG05100` | `BROWSER_MODULE_ALREADY_LOADED` | — | `packages/platform-browser/src/errors.ts` |
| `NG05101` | `NO_PLUGIN_FOR_EVENT` | [guide](https://angular.dev/errors/NG05101) | `packages/platform-browser/src/errors.ts` |
| `NG05102` | `UNSUPPORTED_EVENT_TARGET` | [guide](https://angular.dev/errors/NG05102) | `packages/platform-browser/src/errors.ts` |
| `NG05103` | `TESTABILITY_NOT_FOUND` | — | `packages/platform-browser/src/errors.ts` |
| `NG05104` | `ROOT_NODE_NOT_FOUND` | [guide](https://angular.dev/errors/NG05104) | `packages/platform-browser/src/errors.ts` |
| `NG05105` | `UNEXPECTED_SYNTHETIC_PROPERTY` | — | `packages/platform-browser/src/errors.ts` |
| `NG05200` | `SANITIZATION_UNSAFE_SCRIPT` | — | `packages/platform-browser/src/errors.ts` |
| `NG05201` | `SANITIZATION_UNSAFE_RESOURCE_URL` | [guide](https://angular.dev/errors/NG05201) | `packages/platform-browser/src/errors.ts` |
| `NG05202` | `SANITIZATION_UNEXPECTED_CTX` | — | `packages/platform-browser/src/errors.ts` |
| `NG05300` | `ANIMATION_RENDERER_ASYNC_LOADING_FAILURE` | — | `packages/platform-browser/src/errors.ts` |

### `platform-server`

| Code | Name | Guide | Declared in |
| --- | --- | --- | --- |
| `NG05700` | `GET_COOKIE_NOT_IMPLEMENTED` | — | `packages/platform-server/src/errors.ts` |
| `NG05701` | `INVALID_URL` | — | `packages/platform-server/src/errors.ts` |
| `NG05702` | `PROTOCOL_RELATIVE_URL_NOT_ALLOWED` | — | `packages/platform-server/src/errors.ts` |
| `NG05703` | `SUSPICIOUS_URL_CHANGE_ORIGIN` | [guide](https://angular.dev/errors/NG05703) | `packages/platform-server/src/errors.ts` |
| `NG05704` | `DISABLED_DOM_EMULATION_IN_NON_BROWSER` | — | `packages/platform-server/src/errors.ts` |
| `NG05705` | `XHR_NOT_LOADED` | — | `packages/platform-server/src/errors.ts` |
| `NG05706` | `HOST_NOT_ALLOWED` | — | `packages/platform-server/src/errors.ts` |

### `router`

| Code | Name | Guide | Declared in |
| --- | --- | --- | --- |
| `NG04000` | `NAMED_OUTLET_REDIRECT` | — | `packages/router/src/errors.ts` |
| `NG04001` | `MISSING_REDIRECT` | — | `packages/router/src/errors.ts` |
| `NG04002` | `NO_MATCH` | — | `packages/router/src/errors.ts` |
| `NG04003` | `ROOT_SEGMENT_MATRIX_PARAMS` | — | `packages/router/src/errors.ts` |
| `NG04004` | `MISPLACED_OUTLETS_COMMAND` | — | `packages/router/src/errors.ts` |
| `NG04005` | `INVALID_DOUBLE_DOTS` | — | `packages/router/src/errors.ts` |
| `NG04006` | `TWO_SEGMENTS_WITH_SAME_OUTLET` | — | `packages/router/src/errors.ts` |
| `NG04007` | `FOR_ROOT_CALLED_TWICE` | — | `packages/router/src/errors.ts` |
| `NG04008` | `NULLISH_COMMAND` | — | `packages/router/src/errors.ts` |
| `NG04009` | `EMPTY_PATH_WITH_PARAMS` | — | `packages/router/src/errors.ts` |
| `NG04010` | `UNPARSABLE_URL` | — | `packages/router/src/errors.ts` |
| `NG04011` | `UNEXPECTED_VALUE_IN_URL` | — | `packages/router/src/errors.ts` |
| `NG04012` | `OUTLET_NOT_ACTIVATED` | — | `packages/router/src/errors.ts` |
| `NG04013` | `OUTLET_ALREADY_ACTIVATED` | — | `packages/router/src/errors.ts` |
| `NG04014` | `INVALID_ROUTE_CONFIG` | — | `packages/router/src/errors.ts` |
| `NG04015` | `INVALID_ROOT_URL_SEGMENT` | — | `packages/router/src/errors.ts` |
| `NG04016` | `INFINITE_REDIRECT` | — | `packages/router/src/errors.ts` |
| `NG04017` | `INVALID_ROUTER_LINK_INPUTS` | — | `packages/router/src/errors.ts` |
| `NG04018` | `ERROR_PARSING_URL` | — | `packages/router/src/errors.ts` |

### `service-worker`

| Code | Name | Guide | Declared in |
| --- | --- | --- | --- |
| `NG05600` | `UNKNOWN_REGISTRATION_STRATEGY` | — | `packages/service-worker/src/errors.ts` |
| `NG05601` | `SERVICE_WORKER_DISABLED_OR_NOT_SUPPORTED_BY_THIS_BROWSER` | — | `packages/service-worker/src/errors.ts` |
| `NG05602` | `NOT_SUBSCRIBED_TO_PUSH_NOTIFICATIONS` | — | `packages/service-worker/src/errors.ts` |
| `NG05603` | `PUSH_SUBSCRIPTION_UNSUBSCRIBE_FAILED` | — | `packages/service-worker/src/errors.ts` |
| `NG05604` | `SERVICE_WORKER_REGISTRATION_FAILED` | — | `packages/service-worker/src/errors.ts` |

## Compile-time codes

`ErrorCode` members from `packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.ts`,
reported as TypeScript diagnostics with the code `-99<value>` and rendered as `NG<value>`.
A guide is registered by adding the member to `COMPILER_ERRORS_WITH_GUIDES` in `docs.ts`.

117 codes, 8 of them with a guide.

| Code | Name | Guide |
| --- | --- | --- |
| `NG1001` | `DECORATOR_ARG_NOT_LITERAL` | yes |
| `NG1002` | `DECORATOR_ARITY_WRONG` | — |
| `NG1003` | `DECORATOR_NOT_CALLED` | — |
| `NG1005` | `DECORATOR_UNEXPECTED` | — |
| `NG1006` | `DECORATOR_COLLISION` | — |
| `NG1010` | `VALUE_HAS_WRONG_TYPE` | — |
| `NG1011` | `VALUE_NOT_LITERAL` | — |
| `NG1012` | `DUPLICATE_DECORATED_PROPERTIES` | — |
| `NG1050` | `INITIALIZER_API_WITH_DISALLOWED_DECORATOR` | — |
| `NG1051` | `INITIALIZER_API_DECORATOR_METADATA_COLLISION` | — |
| `NG1052` | `INITIALIZER_API_NO_REQUIRED_FUNCTION` | — |
| `NG1053` | `INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY` | — |
| `NG1054` | `DUPLICATE_BINDING_NAME` | — |
| `NG1100` | `INCORRECTLY_DECLARED_ON_STATIC_MEMBER` | — |
| `NG2001` | `COMPONENT_MISSING_TEMPLATE` | — |
| `NG2002` | `PIPE_MISSING_NAME` | — |
| `NG2003` | `PARAM_MISSING_TOKEN` | yes |
| `NG2004` | `DIRECTIVE_MISSING_SELECTOR` | — |
| `NG2005` | `UNDECORATED_PROVIDER` | — |
| `NG2006` | `DIRECTIVE_INHERITS_UNDECORATED_CTOR` | — |
| `NG2007` | `UNDECORATED_CLASS_USING_ANGULAR_FEATURES` | — |
| `NG2008` | `COMPONENT_RESOURCE_NOT_FOUND` | — |
| `NG2009` | `COMPONENT_INVALID_SHADOW_DOM_SELECTOR` | yes |
| `NG2010` | `COMPONENT_NOT_STANDALONE` | — |
| `NG2011` | `COMPONENT_IMPORT_NOT_STANDALONE` | — |
| `NG2012` | `COMPONENT_UNKNOWN_IMPORT` | — |
| `NG2013` | `HOST_DIRECTIVE_INVALID` | — |
| `NG2014` | `HOST_DIRECTIVE_NOT_STANDALONE` | — |
| `NG2015` | `HOST_DIRECTIVE_COMPONENT` | — |
| `NG2016` | `INJECTABLE_INHERITS_INVALID_CONSTRUCTOR` | — |
| `NG2017` | `HOST_DIRECTIVE_UNDEFINED_BINDING` | — |
| `NG2018` | `HOST_DIRECTIVE_CONFLICTING_ALIAS` | — |
| `NG2019` | `HOST_DIRECTIVE_MISSING_REQUIRED_BINDING` | — |
| `NG2020` | `CONFLICTING_INPUT_TRANSFORM` | — |
| `NG2021` | `COMPONENT_INVALID_STYLE_URLS` | — |
| `NG2022` | `COMPONENT_UNKNOWN_DEFERRED_IMPORT` | — |
| `NG2023` | `NON_STANDALONE_NOT_ALLOWED` | — |
| `NG2024` | `MISSING_NAMED_TEMPLATE_DEPENDENCY` | — |
| `NG2025` | `INCORRECT_NAMED_TEMPLATE_DEPENDENCY_TYPE` | — |
| `NG2026` | `UNSUPPORTED_SELECTORLESS_COMPONENT_FIELD` | — |
| `NG2027` | `COMPONENT_ANIMATIONS_CONFLICT` | — |
| `NG2028` | `SERVICE_CONSTRUCTOR_DI` | — |
| `NG3001` | `SYMBOL_NOT_EXPORTED` | — |
| `NG3003` | `IMPORT_CYCLE_DETECTED` | yes |
| `NG3004` | `IMPORT_GENERATION_FAILURE` | — |
| `NG4001` | `CONFIG_FLAT_MODULE_NO_INDEX` | — |
| `NG4002` | `CONFIG_STRICT_TEMPLATES_IMPLIES_FULL_TEMPLATE_TYPECHECK` | — |
| `NG4003` | `CONFIG_EXTENDED_DIAGNOSTICS_IMPLIES_STRICT_TEMPLATES` | — |
| `NG4004` | `CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CATEGORY_LABEL` | — |
| `NG4005` | `CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CHECK` | — |
| `NG4006` | `CONFIG_EMIT_DECLARATION_ONLY_UNSUPPORTED` | — |
| `NG5001` | `HOST_BINDING_PARSE_ERROR` | — |
| `NG5002` | `TEMPLATE_PARSE_ERROR` | — |
| `NG6001` | `NGMODULE_INVALID_DECLARATION` | — |
| `NG6002` | `NGMODULE_INVALID_IMPORT` | — |
| `NG6003` | `NGMODULE_INVALID_EXPORT` | — |
| `NG6004` | `NGMODULE_INVALID_REEXPORT` | — |
| `NG6005` | `NGMODULE_MODULE_WITH_PROVIDERS_MISSING_GENERIC` | — |
| `NG6006` | `NGMODULE_REEXPORT_NAME_COLLISION` | — |
| `NG6007` | `NGMODULE_DECLARATION_NOT_UNIQUE` | — |
| `NG6008` | `NGMODULE_DECLARATION_IS_STANDALONE` | — |
| `NG6009` | `NGMODULE_BOOTSTRAP_IS_STANDALONE` | — |
| `NG6100` | `WARN_NGMODULE_ID_UNNECESSARY` | yes |
| `NG8001` | `SCHEMA_INVALID_ELEMENT` | yes |
| `NG8002` | `SCHEMA_INVALID_ATTRIBUTE` | yes |
| `NG8003` | `MISSING_REFERENCE_TARGET` | yes |
| `NG8004` | `MISSING_PIPE` | — |
| `NG8005` | `WRITE_TO_READ_ONLY_VARIABLE` | — |
| `NG8006` | `DUPLICATE_VARIABLE_DECLARATION` | — |
| `NG8007` | `SPLIT_TWO_WAY_BINDING` | — |
| `NG8008` | `MISSING_REQUIRED_INPUTS` | — |
| `NG8009` | `ILLEGAL_FOR_LOOP_TRACK_ACCESS` | — |
| `NG8010` | `INACCESSIBLE_DEFERRED_TRIGGER_ELEMENT` | — |
| `NG8011` | `CONTROL_FLOW_PREVENTING_CONTENT_PROJECTION` | — |
| `NG8012` | `DEFERRED_PIPE_USED_EAGERLY` | — |
| `NG8013` | `DEFERRED_DIRECTIVE_USED_EAGERLY` | — |
| `NG8014` | `DEFERRED_DEPENDENCY_IMPORTED_EAGERLY` | — |
| `NG8015` | `ILLEGAL_LET_WRITE` | — |
| `NG8016` | `LET_USED_BEFORE_DEFINITION` | — |
| `NG8017` | `CONFLICTING_LET_DECLARATION` | — |
| `NG8018` | `UNCLAIMED_DIRECTIVE_BINDING` | — |
| `NG8019` | `DEFER_IMPLICIT_TRIGGER_MISSING_PLACEHOLDER` | — |
| `NG8020` | `DEFER_IMPLICIT_TRIGGER_INVALID_PLACEHOLDER` | — |
| `NG8021` | `DEFER_TRIGGER_MISCONFIGURATION` | — |
| `NG8022` | `FORM_FIELD_UNSUPPORTED_BINDING` | — |
| `NG8023` | `MULTIPLE_MATCHING_COMPONENTS` | — |
| `NG8024` | `CONFLICTING_HOST_DIRECTIVE_BINDING` | — |
| `NG8025` | `FOREIGN_COMPONENT_UNSUPPORTED_BINDING` | — |
| `NG8026` | `INVALID_CONTENT_PLACEMENT` | — |
| `NG8027` | `FOREIGN_COMPONENT_CONTENT_UNNECESSARY_FOR_CHILDREN` | — |
| `NG8028` | `CONFLICTING_CONTENT_DECLARATION` | — |
| `NG8029` | `CONFLICTING_CONTENT_AND_PROPERTY` | — |
| `NG8101` | `INVALID_BANANA_IN_BOX` | — |
| `NG8102` | `NULLISH_COALESCING_NOT_NULLABLE` | — |
| `NG8103` | `MISSING_CONTROL_FLOW_DIRECTIVE` | — |
| `NG8104` | `TEXT_ATTRIBUTE_NOT_BINDING` | — |
| `NG8105` | `MISSING_NGFOROF_LET` | — |
| `NG8106` | `SUFFIX_NOT_SUPPORTED` | — |
| `NG8107` | `OPTIONAL_CHAIN_NOT_NULLABLE` | — |
| `NG8108` | `SKIP_HYDRATION_NOT_STATIC` | — |
| `NG8109` | `INTERPOLATED_SIGNAL_NOT_INVOKED` | — |
| `NG8110` | `UNSUPPORTED_INITIALIZER_API_USAGE` | — |
| `NG8111` | `UNINVOKED_FUNCTION_IN_EVENT_BINDING` | — |
| `NG8112` | `UNUSED_LET_DECLARATION` | — |
| `NG8113` | `UNUSED_STANDALONE_IMPORTS` | — |
| `NG8114` | `UNPARENTHESIZED_NULLISH_COALESCING` | — |
| `NG8115` | `UNINVOKED_TRACK_FUNCTION` | — |
| `NG8116` | `MISSING_STRUCTURAL_DIRECTIVE` | — |
| `NG8117` | `UNINVOKED_FUNCTION_IN_TEXT_INTERPOLATION` | — |
| `NG8118` | `FORBIDDEN_REQUIRED_INITIALIZER_INVOCATION` | — |
| `NG8900` | `INLINE_TCB_REQUIRED` | — |
| `NG8901` | `INLINE_TYPE_CTOR_REQUIRED` | — |
| `NG9001` | `INJECTABLE_DUPLICATE_PROV` | — |
| `NG10001` | `SUGGEST_STRICT_TEMPLATES` | — |
| `NG10002` | `SUGGEST_SUBOPTIMAL_TYPE_INFERENCE` | — |
| `NG11001` | `LOCAL_COMPILATION_UNRESOLVED_CONST` | — |
| `NG11003` | `LOCAL_COMPILATION_UNSUPPORTED_EXPRESSION` | — |

## Guide files with no matching code

None.
