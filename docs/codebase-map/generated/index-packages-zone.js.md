<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/generate-index.mjs
-->

# Symbol index — `packages/zone.js/`

260 indexed source files. Each entry lists the file's top-level exported symbols,
its `export * from` re-exports and its re-export lists. Files with no exported symbols
(scripts, side-effect modules, Bazel-only helpers) appear with their size alone.

See [`../README.md`](../README.md) for how this index relates to the hand-written maps.



## `packages/zone.js/`

- `packages/zone.js/check-file-size.js` — 30 lines
- `packages/zone.js/karma-base.conf.js` — 54 lines
- `packages/zone.js/karma-build-jasmine.conf.js` — 7 lines
- `packages/zone.js/karma-build-jasmine.es2015.conf.js` — 5 lines
- `packages/zone.js/karma-build-mocha.conf.js` — 11 lines
- `packages/zone.js/karma-build.conf.js` — 18 lines
- `packages/zone.js/karma-dist-jasmine.conf.js` — 7 lines
- `packages/zone.js/karma-dist-mocha.conf.js` — 23 lines
- `packages/zone.js/karma-dist.conf.js` — 27 lines
- `packages/zone.js/karma-evergreen-dist-jasmine.conf.js` — 7 lines
- `packages/zone.js/karma-evergreen-dist.conf.js` — 28 lines
- `packages/zone.js/simple-server.js` — 46 lines
- `packages/zone.js/zone.ts` — 4 lines



## `packages/zone.js/example/benchmarks/`

- `packages/zone.js/example/benchmarks/event_emitter.js` — 51 lines



## `packages/zone.js/example/js/`

- `packages/zone.js/example/js/counting-zone.js` — 36 lines



## `packages/zone.js/lib/`

- `packages/zone.js/lib/zone-global.d.ts` — 14 lines _(typings)_
- `packages/zone.js/lib/zone-impl.ts` — 1641 lines
  - interface: `Zone`, `ZoneType`, `ZonePrivate`, `ZoneFrame`, `UncaughtPromiseError`, `ZoneSpec`, `ZoneDelegate`, `TaskData`, `Task`, `MicroTask`, `MacroTask`, `EventTask`
  - type: `PatchFn`, `HasTaskState`, `TaskType`, `TaskState`, `AmbientZone`
  - function: `__symbol__`, `initZone`
- `packages/zone.js/lib/zone.api.extensions.ts` — 49 lines
- `packages/zone.js/lib/zone.configurations.api.ts` — 819 lines
- `packages/zone.js/lib/zone.ts` — 90 lines
  - function: `loadZone`



## `packages/zone.js/lib/browser/`

- `packages/zone.js/lib/browser/api-util.ts` — 91 lines
  - function: `patchUtil`
- `packages/zone.js/lib/browser/browser-util.ts` — 57 lines
  - function: `patchCallbacks`
- `packages/zone.js/lib/browser/browser.ts` — 332 lines
  - function: `patchBrowser`
- `packages/zone.js/lib/browser/canvas.ts` — 25 lines
  - function: `patchCanvas`
- `packages/zone.js/lib/browser/custom-elements.ts` — 29 lines
  - function: `patchCustomElements`
- `packages/zone.js/lib/browser/define-property.ts` — 157 lines
  - function: `propertyPatch`, `_redefineProperty`
- `packages/zone.js/lib/browser/event-target.ts` — 40 lines
  - function: `eventTargetPatch`, `patchEvent`
- `packages/zone.js/lib/browser/message-port.ts` — 23 lines
  - function: `patchMessagePort`
- `packages/zone.js/lib/browser/property-descriptor.ts` — 117 lines
  - interface: `IgnoreProperty`
  - function: `filterProperties`, `patchFilteredProperties`, `getOnEventNames`, `propertyDescriptorPatch`
- `packages/zone.js/lib/browser/register-element.ts` — 24 lines
  - function: `registerElementPatch`
- `packages/zone.js/lib/browser/rollup-canvas.ts` — 12 lines
- `packages/zone.js/lib/browser/rollup-common.ts` — 20 lines
  - function: `patchCommon`
- `packages/zone.js/lib/browser/rollup-main.ts` — 17 lines
- `packages/zone.js/lib/browser/rollup-message-port.ts` — 12 lines
- `packages/zone.js/lib/browser/rollup-shadydom.ts` — 12 lines
- `packages/zone.js/lib/browser/rollup-webapis-media-query.ts` — 12 lines
- `packages/zone.js/lib/browser/rollup-webapis-notification.ts` — 12 lines
- `packages/zone.js/lib/browser/rollup-webapis-resize-observer.ts` — 12 lines
- `packages/zone.js/lib/browser/rollup-webapis-rtc-peer-connection.ts` — 12 lines
- `packages/zone.js/lib/browser/rollup-webapis-user-media.ts` — 12 lines
- `packages/zone.js/lib/browser/shadydom.ts` — 37 lines
  - function: `patchShadyDom`
- `packages/zone.js/lib/browser/webapis-media-query.ts` — 71 lines
  - function: `patchMediaQuery`
- `packages/zone.js/lib/browser/webapis-notification.ts` — 24 lines
  - function: `patchNotifications`
- `packages/zone.js/lib/browser/webapis-resize-observer.ts` — 112 lines
  - function: `patchResizeObserver`
- `packages/zone.js/lib/browser/webapis-rtc-peer-connection.ts` — 32 lines
  - function: `patchRtcPeerConnection`
- `packages/zone.js/lib/browser/webapis-user-media.ts` — 26 lines
  - function: `patchUserMedia`
- `packages/zone.js/lib/browser/websocket.ts` — 61 lines
  - function: `apply`



## `packages/zone.js/lib/common/`

- `packages/zone.js/lib/common/error-rewrite.ts` — 422 lines
  - function: `patchError`
- `packages/zone.js/lib/common/events.ts` — 957 lines
  - const: `zoneSymbolEventNames`, `globalSources`
  - interface: `PatchEventTargetOptions`
  - function: `patchEventTarget`, `findEventTasks`, `patchEventPrototype`
- `packages/zone.js/lib/common/fetch.ts` — 145 lines
  - function: `patchFetch`
- `packages/zone.js/lib/common/promise.ts` — 643 lines
  - function: `patchPromise`
- `packages/zone.js/lib/common/queue-microtask.ts` — 20 lines
  - function: `patchQueueMicrotask`
- `packages/zone.js/lib/common/rollup-error-rewrite.ts` — 12 lines
- `packages/zone.js/lib/common/rollup-fetch.ts` — 12 lines
- `packages/zone.js/lib/common/timers.ts` — 186 lines
  - const: `taskSymbol`
  - function: `patchTimer`
- `packages/zone.js/lib/common/to-string.ts` — 62 lines
  - function: `patchToString`
- `packages/zone.js/lib/common/utils.ts` — 553 lines
  - const: `ObjectGetOwnPropertyDescriptor`, `ObjectDefineProperty`, `ObjectGetPrototypeOf`, `ObjectCreate`, `ArraySlice`, `ADD_EVENT_LISTENER_STR`, `REMOVE_EVENT_LISTENER_STR`, `ZONE_SYMBOL_ADD_EVENT_LISTENER`, `ZONE_SYMBOL_REMOVE_EVENT_LISTENER`, `TRUE_STR`, `FALSE_STR`, `ZONE_SYMBOL_PREFIX`, `zoneSymbol`, `isWebWorker`, `isNode`, `isBrowser`, `isMix`
  - function: `wrapWithCurrentZone`, `scheduleMacroTaskWithCurrentZone`, `bindArguments`, `patchPrototype`, `isPropertyWritable`, `patchProperty`, `patchOnProperties`, `patchClass`, `copySymbolProperties`, `setShouldCopySymbolProperties`, `patchMethod`, `patchMacroTask`, `patchMicroTask`, `attachOriginToPatched`, `isFunction`, `isNumber`
  - interface: `MacroTaskMeta`, `MicroTaskMeta`



## `packages/zone.js/lib/extra/`

- `packages/zone.js/lib/extra/bluebird.ts` — 94 lines
  - function: `patchBluebird`
- `packages/zone.js/lib/extra/cordova.ts` — 51 lines
  - function: `patchCordova`
- `packages/zone.js/lib/extra/electron.ts` — 49 lines
  - function: `patchElectron`
- `packages/zone.js/lib/extra/jsonp.ts` — 93 lines
  - function: `patchJsonp`
- `packages/zone.js/lib/extra/rollup-bluebird.ts` — 12 lines
- `packages/zone.js/lib/extra/rollup-cordova.ts` — 12 lines
- `packages/zone.js/lib/extra/rollup-electron.ts` — 12 lines
- `packages/zone.js/lib/extra/rollup-jsonp.ts` — 12 lines
- `packages/zone.js/lib/extra/rollup-socket-io.ts` — 12 lines
- `packages/zone.js/lib/extra/socket-io.ts` — 32 lines
  - function: `patchSocketIo`



## `packages/zone.js/lib/jasmine/`

- `packages/zone.js/lib/jasmine/jasmine.ts` — 354 lines
  - function: `patchJasmine`
- `packages/zone.js/lib/jasmine/rollup-jasmine.ts` — 12 lines



## `packages/zone.js/lib/jest/`

- `packages/zone.js/lib/jest/jest.ts` — 316 lines
  - function: `patchJest`



## `packages/zone.js/lib/mix/`

- `packages/zone.js/lib/mix/rollup-mix.ts` — 18 lines



## `packages/zone.js/lib/mocha/`

- `packages/zone.js/lib/mocha/mocha.ts` — 193 lines
  - function: `patchMocha`
- `packages/zone.js/lib/mocha/rollup-mocha.ts` — 12 lines



## `packages/zone.js/lib/node/`

- `packages/zone.js/lib/node/events.ts` — 68 lines
  - function: `patchEvents`
- `packages/zone.js/lib/node/fs.ts` — 90 lines
  - function: `patchFs`
- `packages/zone.js/lib/node/main.ts` — 25 lines
  - function: `rollupMain`
- `packages/zone.js/lib/node/node.ts` — 175 lines
  - function: `patchNode`
- `packages/zone.js/lib/node/node_util.ts` — 27 lines
  - function: `patchNodeUtil`
- `packages/zone.js/lib/node/rollup-main.ts` — 12 lines
- `packages/zone.js/lib/node/rollup-test-main.ts` — 12 lines



## `packages/zone.js/lib/rxjs/`

- `packages/zone.js/lib/rxjs/rollup-rxjs.ts` — 12 lines
- `packages/zone.js/lib/rxjs/rxjs-fake-async.ts` — 26 lines
  - function: `patchRxJsFakeAsync`
- `packages/zone.js/lib/rxjs/rxjs.ts` — 216 lines
  - function: `patchRxJs`



## `packages/zone.js/lib/testing/`

- `packages/zone.js/lib/testing/async-testing.ts` — 12 lines _(test-support)_
- `packages/zone.js/lib/testing/fake-async.ts` — 11 lines _(test-support)_
- `packages/zone.js/lib/testing/promise-testing.ts` — 73 lines _(test-support)_
  - function: `patchPromiseTesting`
- `packages/zone.js/lib/testing/rollup-promise-testing.ts` — 12 lines _(test-support)_
- `packages/zone.js/lib/testing/rollup-zone-testing.ts` — 12 lines _(test-support)_
- `packages/zone.js/lib/testing/zone-testing.ts` — 32 lines _(test-support)_
  - function: `rollupTesting`



## `packages/zone.js/lib/vitest/`

- `packages/zone.js/lib/vitest/rollup-vitest.ts` — 12 lines
- `packages/zone.js/lib/vitest/vitest.ts` — 171 lines
  - function: `patchVitest`



## `packages/zone.js/lib/zone-spec/`

- `packages/zone.js/lib/zone-spec/async-test.ts` — 336 lines _(spec)_
  - function: `patchAsyncTest`
- `packages/zone.js/lib/zone-spec/fake-async-test.ts` — 1165 lines _(spec)_
  - function: `resetFakeAsyncZone`, `fakeAsync`, `tick`, `flush`, `discardPeriodicTasks`, `withProxyZone`, `flushMicrotasks`, `patchFakeAsyncTest`
- `packages/zone.js/lib/zone-spec/long-stack-trace.ts` — 204 lines
  - function: `patchLongStackTrace`
- `packages/zone.js/lib/zone-spec/proxy.ts` — 275 lines
  - function: `throwProxyZoneError`, `patchProxyZoneSpec`
  - class: `ProxyZoneSpec`
- `packages/zone.js/lib/zone-spec/rollup-long-stack-trace.ts` — 12 lines
- `packages/zone.js/lib/zone-spec/rollup-proxy.ts` — 12 lines
- `packages/zone.js/lib/zone-spec/rollup-sync-test.ts` — 12 lines _(spec)_
- `packages/zone.js/lib/zone-spec/rollup-task-tracking.ts` — 12 lines
- `packages/zone.js/lib/zone-spec/rollup-wtf.ts` — 12 lines
- `packages/zone.js/lib/zone-spec/sync-test.ts` — 40 lines _(spec)_
  - function: `patchSyncTest`
- `packages/zone.js/lib/zone-spec/task-tracking.ts` — 100 lines
  - class: `TaskTrackingZoneSpec`
  - function: `patchTaskTracking`
- `packages/zone.js/lib/zone-spec/wtf.ts` — 198 lines
  - function: `patchWtf`



## `packages/zone.js/test/`

- `packages/zone.js/test/browser-env-setup.ts` — 10 lines _(test-support)_
- `packages/zone.js/test/browser-zone-setup.ts` — 30 lines _(test-support)_
- `packages/zone.js/test/browser_disable_wrap_uncaught_promise_rejection_entry_point.ts` — 9 lines _(test-support)_
- `packages/zone.js/test/browser_disable_wrap_uncaught_promise_rejection_setup.ts` — 9 lines _(test-support)_
- `packages/zone.js/test/browser_entry_point.ts` — 31 lines _(test-support)_
- `packages/zone.js/test/browser_es2015_entry_point.ts` — 10 lines _(test-support)_
- `packages/zone.js/test/browser_shadydom_entry_point.ts` — 9 lines _(test-support)_
- `packages/zone.js/test/browser_shadydom_setup.ts` — 32 lines _(test-support)_
- `packages/zone.js/test/browser_symbol_setup.ts` — 5 lines _(test-support)_
- `packages/zone.js/test/common_tests.ts` — 33 lines _(test-support)_
- `packages/zone.js/test/fake_entry.js` — 2 lines _(test-support)_
- `packages/zone.js/test/jasmine-patch.spec.ts` — 93 lines _(spec)_
- `packages/zone.js/test/main.ts` — 83 lines _(test-support)_
- `packages/zone.js/test/mocha-patch.spec.ts` — 129 lines _(spec)_
- `packages/zone.js/test/node-env-setup.ts` — 6 lines _(test-support)_
  - function: `setupNodeEnv`
- `packages/zone.js/test/node_bluebird_entry_point.init.ts` — 46 lines _(test-support)_
- `packages/zone.js/test/node_entry_point.init.ts` — 44 lines _(test-support)_
- `packages/zone.js/test/node_error_disable_policy.ts` — 11 lines _(test-support)_
- `packages/zone.js/test/node_error_disable_policy_entry_point.init.ts` — 12 lines _(test-support)_
- `packages/zone.js/test/node_error_entry_point.init.ts` — 47 lines _(test-support)_
- `packages/zone.js/test/node_error_lazy_policy.ts` — 11 lines _(test-support)_
- `packages/zone.js/test/node_error_lazy_policy_entry_point.init.ts` — 12 lines _(test-support)_
- `packages/zone.js/test/node_tests.ts` — 17 lines _(test-support)_
- `packages/zone.js/test/test-env-setup-jasmine.ts` — 10 lines _(test-support)_
- `packages/zone.js/test/test-env-setup-mocha.ts` — 188 lines _(test-support)_
- `packages/zone.js/test/test-util.ts` — 137 lines _(test-support)_
  - function: `ifEnvSupports`, `ifEnvSupportsWithDone`, `supportPatchXHROnProperty`, `isSupportSetErrorStack`, `asyncTest`, `isFirefox`, `isSafari`, `isPhantomJS`
  - exports `zoneSymbol`
- `packages/zone.js/test/test_fake_polyfill.ts` — 111 lines _(test-support)_
  - function: `setupFakePolyfill`
- `packages/zone.js/test/ws-server.js` — 22 lines _(test-support)_
- `packages/zone.js/test/ws-webworker-context.ts` — 14 lines _(test-support)_
- `packages/zone.js/test/wtf_mock.ts` — 96 lines _(test-support)_
- `packages/zone.js/test/zone_worker_entry_point.ts` — 32 lines _(test-support)_



## `packages/zone.js/test/assets/`

- `packages/zone.js/test/assets/empty-worker.js` — 8 lines _(test-support)_
- `packages/zone.js/test/assets/worker.js` — 9 lines _(test-support)_



## `packages/zone.js/test/browser/`

- `packages/zone.js/test/browser/FileReader.spec.ts` — 115 lines _(spec)_
- `packages/zone.js/test/browser/HTMLImports.spec.ts` — 80 lines _(spec)_
- `packages/zone.js/test/browser/MediaQuery.spec.ts` — 30 lines _(spec)_
- `packages/zone.js/test/browser/MutationObserver.spec.ts` — 87 lines _(spec)_
- `packages/zone.js/test/browser/Notification.spec.ts` — 31 lines _(spec)_
- `packages/zone.js/test/browser/WebSocket.spec.ts` — 161 lines _(spec)_
- `packages/zone.js/test/browser/Worker.spec.ts` — 45 lines _(spec)_
- `packages/zone.js/test/browser/XMLHttpRequest.spec.ts` — 534 lines _(spec)_
- `packages/zone.js/test/browser/browser.spec.ts` — 3910 lines _(spec)_
- `packages/zone.js/test/browser/custom-element.spec.js` — 140 lines _(spec)_
- `packages/zone.js/test/browser/define-property.spec.ts` — 142 lines _(spec)_
- `packages/zone.js/test/browser/element.spec.ts` — 340 lines _(spec)_
- `packages/zone.js/test/browser/geolocation.spec.manual.ts` — 42 lines _(test-support)_
- `packages/zone.js/test/browser/messageport.spec.ts` — 50 lines _(spec)_
- `packages/zone.js/test/browser/registerElement.spec.ts` — 172 lines _(spec)_
- `packages/zone.js/test/browser/requestAnimationFrame.spec.ts` — 61 lines _(spec)_
- `packages/zone.js/test/browser/shadydom.spec.ts` — 43 lines _(spec)_



## `packages/zone.js/test/closure/`

- `packages/zone.js/test/closure/zone.closure.ts` — 229 lines _(test-support)_



## `packages/zone.js/test/common/`

- `packages/zone.js/test/common/Error.spec.ts` — 532 lines _(spec)_
- `packages/zone.js/test/common/Promise.spec.ts` — 996 lines _(spec)_
- `packages/zone.js/test/common/fetch.spec.ts` — 311 lines _(spec)_
- `packages/zone.js/test/common/microtasks.spec.ts` — 115 lines _(spec)_
- `packages/zone.js/test/common/promise-disable-wrap-uncaught-promise-rejection.spec.ts` — 138 lines _(spec)_
- `packages/zone.js/test/common/queue-microtask.spec.ts` — 35 lines _(spec)_
- `packages/zone.js/test/common/setInterval.spec.ts` — 104 lines _(spec)_
- `packages/zone.js/test/common/setTimeout.spec.ts` — 155 lines _(spec)_
- `packages/zone.js/test/common/task.spec.ts` — 1343 lines _(spec)_
- `packages/zone.js/test/common/toString.spec.ts` — 112 lines _(spec)_
- `packages/zone.js/test/common/util.spec.ts` — 474 lines _(spec)_
- `packages/zone.js/test/common/zone.spec.ts` — 659 lines _(spec)_



## `packages/zone.js/test/extra/`

- `packages/zone.js/test/extra/bluebird.spec.ts` — 868 lines _(spec)_
- `packages/zone.js/test/extra/cordova.spec.ts` — 46 lines _(spec)_
- `packages/zone.js/test/extra/electron.js` — 50 lines _(test-support)_



## `packages/zone.js/test/jest/`

- `packages/zone.js/test/jest/jest-zone-patch-fake-timer.js` — 7 lines _(test-support)_
- `packages/zone.js/test/jest/jest-zone.js` — 10 lines _(test-support)_
- `packages/zone.js/test/jest/jest.config.js` — 6 lines _(test-support)_
- `packages/zone.js/test/jest/jest.node.config.js` — 6 lines _(test-support)_
- `packages/zone.js/test/jest/jest.spec.js` — 527 lines _(spec)_
- `packages/zone.js/test/jest/zone-jsdom-environment.js` — 24 lines _(test-support)_
- `packages/zone.js/test/jest/zone-node-environment.js` — 24 lines _(test-support)_



## `packages/zone.js/test/node/`

- `packages/zone.js/test/node/Error.spec.ts` — 49 lines _(spec)_
- `packages/zone.js/test/node/console.spec.ts` — 45 lines _(spec)_
- `packages/zone.js/test/node/crypto.spec.ts` — 75 lines _(spec)_
- `packages/zone.js/test/node/events.spec.ts` — 221 lines _(spec)_
- `packages/zone.js/test/node/fs.spec.ts` — 273 lines _(spec)_
- `packages/zone.js/test/node/http.spec.ts` — 45 lines _(spec)_
- `packages/zone.js/test/node/process.spec.ts` — 167 lines _(spec)_
- `packages/zone.js/test/node/timer.spec.ts` — 95 lines _(spec)_



## `packages/zone.js/test/npm_package/`

- `packages/zone.js/test/npm_package/npm_package.spec.ts` — 198 lines _(spec)_



## `packages/zone.js/test/patch/`

- `packages/zone.js/test/patch/IndexedDB.spec.js` — 141 lines _(spec)_



## `packages/zone.js/test/performance/`

- `packages/zone.js/test/performance/eventTarget.js` — 85 lines _(test-support)_
- `packages/zone.js/test/performance/performance_setup.js` — 302 lines _(test-support)_
- `packages/zone.js/test/performance/performance_ui.js` — 163 lines _(test-support)_
- `packages/zone.js/test/performance/promise.js` — 64 lines _(test-support)_
- `packages/zone.js/test/performance/requestAnimationFrame.js` — 71 lines _(test-support)_
- `packages/zone.js/test/performance/timeout.js` — 68 lines _(test-support)_
- `packages/zone.js/test/performance/xhr.js` — 52 lines _(test-support)_



## `packages/zone.js/test/promise/`

- `packages/zone.js/test/promise/promise-adapter.mjs` — 22 lines _(test-support)_
  - has a default export
- `packages/zone.js/test/promise/promise.finally.spec.mjs` — 426 lines _(spec)_



## `packages/zone.js/test/rxjs/`

- `packages/zone.js/test/rxjs/rxjs.Observable.audit.spec.ts` — 96 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.buffer.spec.ts` — 208 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.catch.spec.ts` — 95 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.collection.spec.ts` — 829 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.combine.spec.ts` — 156 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.concat.spec.ts` — 221 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.count.spec.ts` — 49 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.debounce.spec.ts` — 84 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.default.spec.ts` — 50 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.delay.spec.ts` — 84 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.distinct.spec.ts` — 108 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.do.spec.ts` — 55 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.map.spec.ts` — 121 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.merge.spec.ts` — 281 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.multicast.spec.ts` — 99 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.notification.spec.ts` — 61 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.race.spec.ts` — 51 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.retry.spec.ts` — 61 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.sample.spec.ts` — 86 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.take.spec.ts` — 145 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.timeout.spec.ts` — 78 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.Observable.window.spec.ts` — 169 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.asap.spec.ts` — 85 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.bindCallback.spec.ts` — 92 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.bindNodeCallback.spec.ts` — 117 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.combineLatest.spec.ts` — 103 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.common.spec.ts` — 240 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.concat.spec.ts` — 101 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.defer.spec.ts` — 47 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.empty.spec.ts` — 40 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.forkjoin.spec.ts` — 72 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.from.spec.ts` — 105 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.fromEvent.spec.ts` — 113 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.fromPromise.spec.ts` — 56 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.interval.spec.ts` — 49 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.merge.spec.ts` — 65 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.never.spec.ts` — 44 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.of.spec.ts` — 44 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.range.spec.ts` — 77 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.retry.spec.ts` — 47 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.spec.ts` — 59 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.throw.spec.ts` — 77 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.timer.spec.ts` — 51 lines _(spec)_
- `packages/zone.js/test/rxjs/rxjs.util.ts` — 15 lines _(test-support)_
  - function: `supportFeature`
- `packages/zone.js/test/rxjs/rxjs.zip.spec.ts` — 54 lines _(spec)_



## `packages/zone.js/test/typings/`

- `packages/zone.js/test/typings/type.test.ts` — 18 lines _(spec)_



## `packages/zone.js/test/vitest/`

- `packages/zone.js/test/vitest/vitest-patch-globals.spec.js` — 116 lines _(spec)_
- `packages/zone.js/test/vitest/with-proxy-zone.spec.js` — 128 lines _(spec)_



## `packages/zone.js/test/webdriver/`

- `packages/zone.js/test/webdriver/test.js` — 36 lines _(spec)_



## `packages/zone.js/test/zone-spec/`

- `packages/zone.js/test/zone-spec/async-test.spec.ts` — 713 lines _(spec)_
- `packages/zone.js/test/zone-spec/fake-async-test.spec.ts` — 1688 lines _(spec)_
- `packages/zone.js/test/zone-spec/long-stack-trace-zone.spec.ts` — 220 lines _(spec)_
- `packages/zone.js/test/zone-spec/proxy.spec.ts` — 240 lines _(spec)_
- `packages/zone.js/test/zone-spec/sync-test.spec.ts` — 76 lines _(spec)_
- `packages/zone.js/test/zone-spec/task-tracking.spec.ts` — 102 lines _(spec)_



## `packages/zone.js/test/zone-spec/clock-tests/`

- `packages/zone.js/test/zone-spec/clock-tests/enable-clock-patch.ts` — 10 lines _(test-support)_
- `packages/zone.js/test/zone-spec/clock-tests/fake-async-patched-clock.spec.ts` — 68 lines _(spec)_
- `packages/zone.js/test/zone-spec/clock-tests/fake-async-unpatched-clock.spec.ts` — 116 lines _(spec)_
- `packages/zone.js/test/zone-spec/clock-tests/patched.init.ts` — 11 lines _(test-support)_
- `packages/zone.js/test/zone-spec/clock-tests/unpatched.init.ts` — 10 lines _(test-support)_



## `packages/zone.js/tools/`

- `packages/zone.js/tools/base.mjs` — 24 lines
  - has a default export
- `packages/zone.js/tools/esm.mjs` — 15 lines
  - has a default export
- `packages/zone.js/tools/iife.mjs` — 15 lines
  - has a default export
- `packages/zone.js/tools/release.mts` — 388 lines
- `packages/zone.js/tools/umd.mjs` — 17 lines
  - has a default export

