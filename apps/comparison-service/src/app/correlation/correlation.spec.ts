import { describe, expect, it } from 'vitest';
import { alignSeries, pearsonCorrelation, uniquePairs } from './correlation.js';

describe('correlation utilities', () => {
  it('aligns only shared years', () => {
    expect(
      alignSeries(
        [{ year: 2020, value: 1 }, { year: 2021, value: 2 }],
        [{ year: 2021, value: 4 }, { year: 2022, value: 8 }],
      ),
    ).toEqual([{ year: 2021, left: 2, right: 4 }]);
  });

  it('calculates Pearson R and all unique pairs', () => {
    expect(pearsonCorrelation([
      { year: 2020, left: 1, right: 2 },
      { year: 2021, left: 2, right: 4 },
      { year: 2022, left: 3, right: 6 },
    ])).toBe(1);
    expect(uniquePairs(['a', 'b', 'c'])).toEqual([
      ['a', 'b'], ['a', 'c'], ['b', 'c'],
    ]);
  });
});
