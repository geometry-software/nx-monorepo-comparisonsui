import { describe, expect, it } from 'vitest';
import { alignSeries, pearsonCorrelation, uniquePairs } from './correlation.js';

describe('correlation utilities', () => {
  it('aligns only shared periods', () => {
    expect(
      alignSeries(
        [{ period: '2020', value: 1 }, { period: '2021', value: 2 }],
        [{ period: '2021', value: 4 }, { period: '2022', value: 8 }],
      ),
    ).toEqual([{ period: '2021', left: 2, right: 4 }]);
  });

  it('calculates Pearson R and all unique pairs', () => {
    expect(pearsonCorrelation([
      { period: '2020', left: 1, right: 2 },
      { period: '2021', left: 2, right: 4 },
      { period: '2022', left: 3, right: 6 },
    ])).toBe(1);
    expect(uniquePairs(['a', 'b', 'c'])).toEqual([
      ['a', 'b'], ['a', 'c'], ['b', 'c'],
    ]);
  });
});
