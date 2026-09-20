export type NumericObservation = { year: number; value: number };

export type AlignedObservation = {
  year: number;
  left: number;
  right: number;
};

export function alignSeries(
  left: NumericObservation[],
  right: NumericObservation[],
): AlignedObservation[] {
  const rightByYear = new Map(right.map((item) => [item.year, item.value]));
  return left
    .filter((item) => rightByYear.has(item.year))
    .map((item) => ({
      year: item.year,
      left: item.value,
      right: rightByYear.get(item.year) as number,
    }))
    .sort((a, b) => a.year - b.year);
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
