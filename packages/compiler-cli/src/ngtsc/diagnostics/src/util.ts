/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {ErrorCode} from './error_code';

const ERROR_CODE_MATCHER = /(\u001b\[\d+m ?)TS-99(\d+: ?\u001b\[\d+m)/g;

/**
 * During formatting of `ts.Diagnostic`s, the numeric code of each diagnostic is prefixed with the
 * hard-coded "TS" prefix. For Angular's own error codes, a prefix of "NG" is desirable. To achieve
 * this, all Angular error codes start with "-99" so that the sequence "TS-99" can be assumed to
 * correspond with an Angular specific error code. This function replaces those occurrences with
 * just "NG".
 *
 * @param errors The formatted diagnostics
 */
export function replaceTsWithNgInErrors(errors: string): string {
  return errors.replace(ERROR_CODE_MATCHER, '$1NG$2');
}

export function ngErrorCode(code: ErrorCode): number {
  return parseInt('-99' + code);
}

/**
 * The inverse of `ngErrorCode`: recovers the `ErrorCode` from the `ts.Diagnostic` code that
 * `ngErrorCode` produced for it.
 *
 * Note that `ngErrorCode` builds its result by string concatenation, so it must not be applied to
 * an already-converted code — `parseInt('-99' + -998001)` is `-99`, not `-99998001`. Use this
 * function whenever an `ErrorCode` has to be recovered from a diagnostic.
 *
 * @param code The `code` of a `ts.Diagnostic`.
 * @returns The originating `ErrorCode`, or `null` if the diagnostic is not one of Angular's.
 */
export function ngErrorCodeToErrorCode(code: number): ErrorCode | null {
  const text = `${code}`;
  if (!text.startsWith('-99') || text.length === 3) {
    return null;
  }
  const errorCode = parseInt(text.slice(3), 10);
  return Number.isNaN(errorCode) ? null : errorCode;
}
