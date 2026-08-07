/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Component, ɵdefaultKeyValueDiffers as defaultKeyValueDiffers} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {KeyValuePipe} from '../../index';
import {JsonPipe} from '../../public_api';
import {defaultComparator} from '../../src/pipes/keyvalue_pipe';

describe('KeyValuePipe', () => {
  it('should return null when given null', () => {
    const pipe = new KeyValuePipe(defaultKeyValueDiffers);
    expect(pipe.transform(null)).toEqual(null);
  });
  it('should return null when given undefined', () => {
    const pipe = new KeyValuePipe(defaultKeyValueDiffers);
    expect(pipe.transform(undefined)).toEqual(null);
  });
  it('should return null for an unsupported type', () => {
    const pipe = new KeyValuePipe(defaultKeyValueDiffers);
    const fn = () => {};
    expect(pipe.transform(fn as any as null)).toEqual(null);
  });
  describe('object dictionary', () => {
    it('should return empty array of an empty dictionary', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform({})).toEqual([]);
    });
    it('should transform a basic dictionary', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform({1: 2})).toEqual([{key: '1', value: 2}]);
    });
    it('should order by alpha', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform({'b': 1, 'a': 1})).toEqual([
        {key: 'a', value: 1},
        {key: 'b', value: 1},
      ]);
    });
    it('should order by numerical', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform({2: 1, 1: 1})).toEqual([
        {key: '1', value: 1},
        {key: '2', value: 1},
      ]);
    });
    it('should order by numerical and alpha', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const input = {2: 1, 1: 1, 'b': 1, 0: 1, 3: 1, 'a': 1};
      expect(pipe.transform(input)).toEqual([
        {key: '0', value: 1},
        {key: '1', value: 1},
        {key: '2', value: 1},
        {key: '3', value: 1},
        {key: 'a', value: 1},
        {key: 'b', value: 1},
      ]);
    });
    it('should not order by alpha when compareFn is null', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform({'b': 1, 'a': 1}, null)).toEqual([
        {key: 'b', value: 1},
        {key: 'a', value: 1},
      ]);
    });
    it('should reorder when compareFn changes', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const input = {'b': 1, 'a': 2};
      pipe.transform<string, number>(input);
      expect(pipe.transform<string, number>(input, (a, b) => a.value - b.value)).toEqual([
        {key: 'b', value: 1},
        {key: 'a', value: 2},
      ]);
    });
    it('should return the same ref if nothing changes', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const transform1 = pipe.transform({1: 2});
      const transform2 = pipe.transform({1: 2});
      expect(transform1 === transform2).toEqual(true);
    });
    it('should return a new ref if something changes', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const transform1 = pipe.transform({1: 2});
      const transform2 = pipe.transform({1: 3});
      expect(transform1 !== transform2).toEqual(true);
    });
    it('should accept a type union of an object with string keys and null', () => {
      let value!: {[key: string]: string} | null;
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform(value)).toEqual(null);
    });
    it('should accept a type union of an object with number keys and null', () => {
      let value!: {[key: number]: string} | null;
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform(value)).toEqual(null);
    });

    it('should accept an object with optional keys', () => {
      interface MyInterface {
        one: string;
        two: number;
        three: string;
        four: string;
      }
      const myData: Partial<MyInterface> = {
        one: 'One',
        two: 2,
        three: undefined,
      };

      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform(myData)?.length).toEqual(3);

      const differ = (a: string | number | undefined, b: string | number | undefined): number => {
        return 1;
      };
      expect(pipe.transform(myData, differ)?.length).toEqual(3);
    });

    it('should accept an nullable object with optional keys (null)', () => {
      interface MyInterface {
        one?: string;
        two?: string;
        three?: string;
      }

      let value!: MyInterface | null;
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform(value)).toEqual(null);
    });

    it('should accept an nullable object with optional keys (non-null)', () => {
      interface MyInterface {
        one?: string;
        two?: string;
        three?: string;
      }

      const value: MyInterface | null = {};
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform(value)?.length).toEqual(0);

      // we use the random condition to make sure the typing includes null (else TS's inference is too smart and strips null)
      const value2: MyInterface | null = Math.random() <= 1 ? {one: '1', three: '3'} : null;
      const kv = pipe.transform(value2);
      expect(kv?.length).toEqual(2);
      expect(kv).toContain({key: 'one', value: '1'});
      expect(kv).toContain({key: 'three', value: '3'});
    });
  });

  describe('Map', () => {
    it('should return an empty array for an empty Map', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform(new Map())).toEqual([]);
    });
    it('should transform a basic Map', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform(new Map([[1, 2]]))).toEqual([{key: 1, value: 2}]);
    });
    it('should order by alpha', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(
        pipe.transform(
          new Map([
            ['b', 1],
            ['a', 1],
          ]),
        ),
      ).toEqual([
        {key: 'a', value: 1},
        {key: 'b', value: 1},
      ]);
    });
    it('should order by numerical', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(
        pipe.transform(
          new Map([
            [2, 1],
            [1, 1],
          ]),
        ),
      ).toEqual([
        {key: 1, value: 1},
        {key: 2, value: 1},
      ]);
    });
    it('should order by numerical and alpha', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const input = [
        [2, 1],
        [1, 1],
        ['b', 1],
        [0, 1],
        [3, 1],
        ['a', 1],
      ] as Array<[number | string, number]>;
      expect(pipe.transform(new Map(input))).toEqual([
        {key: 0, value: 1},
        {key: 1, value: 1},
        {key: 2, value: 1},
        {key: 3, value: 1},
        {key: 'a', value: 1},
        {key: 'b', value: 1},
      ]);
    });
    it('should order by complex types with compareFn', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const input = new Map([
        [{id: 1}, 1],
        [{id: 0}, 1],
      ]);
      expect(
        pipe.transform<{id: number}, number>(input, (a, b) => (a.key.id > b.key.id ? 1 : -1)),
      ).toEqual([
        {key: {id: 0}, value: 1},
        {key: {id: 1}, value: 1},
      ]);
    });
    it('should not order by alpha when compareFn is null', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(
        pipe.transform(
          new Map([
            ['b', 1],
            ['a', 1],
          ]),
          null,
        ),
      ).toEqual([
        {key: 'b', value: 1},
        {key: 'a', value: 1},
      ]);
    });
    it('should reorder when compareFn changes', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const input = new Map([
        ['b', 1],
        ['a', 2],
      ]);
      pipe.transform<string, number>(input);
      expect(pipe.transform<string, number>(input, (a, b) => a.value - b.value)).toEqual([
        {key: 'b', value: 1},
        {key: 'a', value: 2},
      ]);
    });
    it('should return the same ref if nothing changes', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const transform1 = pipe.transform(new Map([[1, 2]]));
      const transform2 = pipe.transform(new Map([[1, 2]]));
      expect(transform1 === transform2).toEqual(true);
    });
    it('should return a new ref if something changes', () => {
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      const transform1 = pipe.transform(new Map([[1, 2]]));
      const transform2 = pipe.transform(new Map([[1, 3]]));
      expect(transform1 !== transform2).toEqual(true);
    });
    it('should accept a type union of a Map and null', () => {
      let value!: Map<number, number> | null;
      const pipe = new KeyValuePipe(defaultKeyValueDiffers);
      expect(pipe.transform(value)).toEqual(null);
    });
  });

  it('should be available as a standalone pipe', async () => {
    @Component({
      selector: 'test-component',
      imports: [KeyValuePipe, JsonPipe],
      template: '{{ value | keyvalue | json }}',
    })
    class TestComponent {
      value = {'b': 1, 'a': 2};
    }

    const fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();

    const content = fixture.nativeElement.textContent;
    expect(content.replace(/\s/g, '')).toBe('[{"key":"a","value":2},{"key":"b","value":1}]');
  });
});

describe('defaultComparator', () => {
  it('should remain the same order when keys are equal', () => {
    const key = 1;
    const values = [
      {key, value: 2},
      {key, value: 1},
    ];
    expect(values.sort(defaultComparator)).toEqual(values);
  });
  it('should sort undefined keys to the end', () => {
    const values = [
      {key: 3, value: 1},
      {key: undefined, value: 3},
      {key: 1, value: 2},
    ];
    expect(values.sort(defaultComparator)).toEqual([
      {key: 1, value: 2},
      {key: 3, value: 1},
      {key: undefined, value: 3},
    ]);
  });
  it('should sort null keys to the end', () => {
    const values = [
      {key: 3, value: 1},
      {key: null, value: 3},
      {key: 1, value: 2},
    ];
    expect(values.sort(defaultComparator)).toEqual([
      {key: 1, value: 2},
      {key: 3, value: 1},
      {key: null, value: 3},
    ]);
  });
  it('should sort strings in alpha ascending', () => {
    const values = [
      {key: 'b', value: 1},
      {key: 'a', value: 3},
    ];
    expect(values.sort(defaultComparator)).toEqual([
      {key: 'a', value: 3},
      {key: 'b', value: 1},
    ]);
  });
  it('should sort numbers in numerical ascending', () => {
    const values = [
      {key: 2, value: 1},
      {key: 1, value: 3},
    ];
    expect(values.sort(defaultComparator)).toEqual([
      {key: 1, value: 3},
      {key: 2, value: 1},
    ]);
  });
  it('should sort boolean in false (0) -> true (1)', () => {
    const values = [
      {key: true, value: 3},
      {key: false, value: 1},
    ];
    expect(values.sort(defaultComparator)).toEqual([
      {key: false, value: 1},
      {key: true, value: 3},
    ]);
  });
  it('should sort numbers as strings in numerical ascending', () => {
    // We need to cast the values array to "any[]" because the object keys
    // have no type overlap and the "Array.sort" expects all keys to have the
    // same type when passed to the sort comparator.
    const values = [
      {key: '2', value: 1},
      {key: 1, value: 3},
    ] as any[];
    expect(values.sort(defaultComparator)).toEqual([
      {key: 1, value: 3},
      {key: '2', value: 1},
    ]);
  });

  describe('defaultComparator sort contract', () => {
    // `Array.prototype.sort` gives implementation-defined results for a comparator that is not
    // antisymmetric and transitive, so the order would otherwise depend on key insertion order.
    const keyPool: unknown[] = [null, undefined, 0, 1, 10, 9, NaN, '9', '10', 'a', true, false, {}];
    const compare = (a: unknown, b: unknown) =>
      defaultComparator({key: a, value: 0} as any, {key: b, value: 0} as any);

    it('should be antisymmetric for every pair of key types', () => {
      const violations: string[] = [];
      for (const a of keyPool) {
        for (const b of keyPool) {
          const ab = compare(a, b);
          const ba = compare(b, a);
          const ok = (ab < 0 && ba > 0) || (ab > 0 && ba < 0) || (ab === 0 && ba === 0);
          if (!ok) violations.push(`compare(${String(a)}, ${String(b)}) = ${ab}, reverse = ${ba}`);
        }
      }
      expect(violations).toEqual([]);
    });

    it('should be transitive for every triple of key types', () => {
      const violations: string[] = [];
      for (const a of keyPool) {
        for (const b of keyPool) {
          for (const c of keyPool) {
            const ab = Math.sign(compare(a, b));
            const bc = Math.sign(compare(b, c));
            const ac = Math.sign(compare(a, c));
            if (ab < 0 && bc < 0 && !(ac < 0)) {
              violations.push(`${String(a)} < ${String(b)} < ${String(c)} but compare = ${ac}`);
            }
            if (ab === 0 && bc === 0 && ac !== 0) {
              violations.push(`${String(a)} == ${String(b)} == ${String(c)} but compare = ${ac}`);
            }
          }
        }
      }
      expect(violations).toEqual([]);
    });

    it('should never return NaN', () => {
      for (const a of keyPool) {
        for (const b of keyPool) {
          expect(Number.isNaN(compare(a, b)))
            .withContext(`compare(${String(a)}, ${String(b)})`)
            .toBe(false);
        }
      }
    });

    it('should produce the same order regardless of insertion order', () => {
      const permutations = <T>(items: T[]): T[][] => {
        if (items.length <= 1) return [items];
        const out: T[][] = [];
        for (let i = 0; i < items.length; i++) {
          const rest = items.slice(0, i).concat(items.slice(i + 1));
          for (const p of permutations(rest)) out.push([items[i], ...p]);
        }
        return out;
      };
      const keySets: unknown[][] = [
        [10, '9', 9],
        [null, undefined, 'a'],
        [NaN, 1, 2],
        ['b', 'a', 'x'],
        [3, 1, 2],
      ];
      for (const keys of keySets) {
        const orders = new Set(
          permutations(keys).map((perm) =>
            perm
              .map((key) => ({key, value: 0}))
              .sort(defaultComparator as any)
              .map((pair) => String(pair.key))
              .join(','),
          ),
        );
        expect(orders.size)
          .withContext(`key set ${keys.map(String).join(',')}`)
          .toBe(1);
      }
    });

    it('should distinguish null from undefined instead of placing each after the other', () => {
      expect(Math.sign(compare(null, undefined))).toBe(-Math.sign(compare(undefined, null)));
    });
  });
});
