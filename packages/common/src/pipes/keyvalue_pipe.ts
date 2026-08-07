/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {
  KeyValueChangeRecord,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  Pipe,
  PipeTransform,
} from '@angular/core';
import {warnIfSignal} from './utils';

function makeKeyValuePair<K, V>(key: K, value: V): KeyValue<K, V> {
  return {key: key, value: value};
}

/**
 * A key value pair.
 * Usually used to represent the key value pairs from a Map or Object.
 *
 * @publicApi
 */
export interface KeyValue<K, V> {
  key: K;
  value: V;
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms Object or Map into an array of key value pairs.
 *
 * The output array will be ordered by keys.
 * By default, keys of the same type are compared by value — strings by Unicode point value,
 * numbers numerically, booleans with `false` first — and keys of different types are grouped by
 * type, since no single value comparison can order them consistently. This only arises for `Map`
 * input: the keys of a plain object are always strings.
 * You can optionally pass a compareFn if your keys are complex types.
 * Passing `null` as the compareFn will use natural ordering of the input.
 *
 * @usageNotes
 * ### Examples
 *
 * This examples show how an Object or a Map can be iterated by ngFor with the use of this
 * keyvalue pipe.
 *
 * {@example common/pipes/ts/keyvalue_pipe.ts region='KeyValuePipe'}
 *
 * @see [Built-in Pipes](guide/templates/pipes#built-in-pipes)
 *
 * @publicApi
 */
@Pipe({
  name: 'keyvalue',
  pure: false,
})
export class KeyValuePipe implements PipeTransform {
  constructor(private readonly differs: KeyValueDiffers) {}

  private differ!: KeyValueDiffer<any, any>;
  private keyValues: Array<KeyValue<any, any>> = [];
  private compareFn: ((a: KeyValue<any, any>, b: KeyValue<any, any>) => number) | null =
    defaultComparator;

  /*
   * NOTE: when the `input` value is a simple Record<K, V> object, the keys are extracted with
   * Object.keys(). This means that even if the `input` type is Record<number, V> the keys are
   * compared/returned as `string`s.
   */
  transform<K, V>(
    input: ReadonlyMap<K, V>,
    compareFn?: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null,
  ): Array<KeyValue<K, V>>;
  transform<K extends number, V>(
    input: Record<K, V>,
    compareFn?: ((a: KeyValue<string, V>, b: KeyValue<string, V>) => number) | null,
  ): Array<KeyValue<string, V>>;
  transform<K extends string, V>(
    input: Record<K, V> | ReadonlyMap<K, V>,
    compareFn?: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null,
  ): Array<KeyValue<K, V>>;
  transform(
    input: null | undefined,
    compareFn?: ((a: KeyValue<unknown, unknown>, b: KeyValue<unknown, unknown>) => number) | null,
  ): null;
  transform<K, V>(
    input: ReadonlyMap<K, V> | null | undefined,
    compareFn?: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null,
  ): Array<KeyValue<K, V>> | null;
  transform<K extends number, V>(
    input: Record<K, V> | null | undefined,
    compareFn?: ((a: KeyValue<string, V>, b: KeyValue<string, V>) => number) | null,
  ): Array<KeyValue<string, V>> | null;

  transform<K extends string, V>(
    input: Record<K, V> | ReadonlyMap<K, V> | null | undefined,
    compareFn?: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null,
  ): Array<KeyValue<K, V>> | null;

  transform<T>(
    input: T,
    compareFn?: T extends object ? (a: T[keyof T], b: T[keyof T]) => number : never,
  ): T extends object ? Array<KeyValue<keyof T, T[keyof T]>> : null;

  transform<K, V>(
    input: undefined | null | {[key: string]: V; [key: number]: V} | ReadonlyMap<K, V>,
    compareFn: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null = defaultComparator,
  ): Array<KeyValue<K, V>> | null {
    ngDevMode && warnIfSignal('KeyValuePipe', input);

    if (!input || (!(input instanceof Map) && typeof input !== 'object')) {
      return null;
    }

    // make a differ for whatever type we've been passed in
    this.differ ??= this.differs.find(input).create();

    const differChanges: KeyValueChanges<K, V> | null = this.differ.diff(input as any);
    const compareFnChanged = compareFn !== this.compareFn;

    if (differChanges) {
      this.keyValues = [];
      differChanges.forEachItem((r: KeyValueChangeRecord<K, V>) => {
        this.keyValues.push(makeKeyValuePair(r.key, r.currentValue!));
      });
    }
    if (differChanges || compareFnChanged) {
      if (compareFn) {
        this.keyValues.sort(compareFn);
      }
      this.compareFn = compareFn;
    }
    return this.keyValues;
  }
}

/**
 * Ranks a key by its type, so that keys of different types are ordered by type before they are
 * ordered by value.
 *
 * `Array.prototype.sort` requires a comparator that is antisymmetric and transitive. Comparing
 * keys of different types by their string representations cannot satisfy that alongside numeric
 * ordering for numbers: `9 < 10` numerically, but `"10" < "9"` as strings, which makes
 * `9 < 10 < "9"` while `9` and `"9"` compare equal. Grouping by type first removes the conflict.
 *
 * `NaN`, `null` and `undefined` get ranks of their own because none of them is ordered by the
 * usual comparisons — `NaN` makes every arithmetic comparison false, and `null`/`undefined` are
 * not distinguishable by a loose equality test.
 */
function keyTypeRank(value: unknown): number {
  if (value === null) return 5;
  if (value === undefined) return 6;
  switch (typeof value) {
    case 'number':
      return Number.isNaN(value) ? 4 : 1;
    case 'string':
      return 2;
    case 'boolean':
      return 3;
    default:
      return 7;
  }
}

export function defaultComparator<K, V>(
  keyValueA: KeyValue<K, V>,
  keyValueB: KeyValue<K, V>,
): number {
  const a: any = keyValueA.key;
  const b: any = keyValueB.key;
  // If both keys are the same, return 0 (no sorting needed).
  if (a === b) return 0;

  // Keys of different types are ordered by type: numbers, then strings, then booleans, then the
  // unordered values (`NaN`, `null`, `undefined`), then everything else.
  const rankA = keyTypeRank(a);
  const rankB = keyTypeRank(b);
  if (rankA !== rankB) return rankA < rankB ? -1 : 1;

  switch (rankA) {
    // Numbers (neither of which is `NaN`) and strings both order with `<`.
    case 1:
    case 2:
      return a < b ? -1 : a > b ? 1 : 0;
    // Booleans sort `false` before `true`; `a === b` above has already handled equal ones.
    case 3:
      return a ? 1 : -1;
    // `NaN`, `null` and `undefined` each have no ordering within their own rank.
    case 4:
    case 5:
    case 6:
      return 0;
    // Anything else — objects, symbols, functions — falls back to the string representation.
    default: {
      const aString = String(a);
      const bString = String(b);
      return aString < bString ? -1 : aString > bString ? 1 : 0;
    }
  }
}
