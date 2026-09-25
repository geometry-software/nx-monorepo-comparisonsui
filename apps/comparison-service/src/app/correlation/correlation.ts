export type NumericObservation = { period: string; value: number };

export type AlignedObservation = {
  period: string;
  left: number;
  right: number;
};

export function alignSeries(
  left: NumericObservation[],
  right: NumericObservation[],
): AlignedObservation[] {
  const rightByPeriod = new Map(right.map((item) => [item.period, item.value]));
  return left
    .filter((item) => rightByPeriod.has(item.period))
    .map((item) => ({
      period: item.period,
      left: item.value,
      right: rightByPeriod.get(item.period) as number,
    }))
    .sort((a, b) => a.period.localeCompare(b.period));
}

export function pearsonCorrelation(points: AlignedObservation[]): number | null {
  if (points.length < 2) return null;
  const leftMean = points.reduce((sum, item) => sum + item.left, 0) / points.length;
  const rightMean = points.reduce((sum, item) => sum + item.right, 0) / points.length;
  let numerator = 0;
  let leftSquares = 0;
  let rightSquares = 0;
  points.forEach((item) => {
    const leftDelta = item.left - leftMean;
    const rightDelta = item.right - rightMean;
    numerator += leftDelta * rightDelta;
    leftSquares += leftDelta ** 2;
    rightSquares += rightDelta ** 2;
  });
  const denominator = Math.sqrt(leftSquares * rightSquares);
  return denominator === 0 ? null : Number((numerator / denominator).toFixed(6));
}

export function uniquePairs<T>(items: readonly T[]): Array<readonly [T, T]> {
  return items.flatMap((left, leftIndex) =>
    items.slice(leftIndex + 1).map((right) => [left, right] as const),
  );
}
