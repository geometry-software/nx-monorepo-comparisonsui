export type CorrelationInsightPdfPair = {
  sourceA: string;
  sourceB: string;
  r: number | null;
  observationCount: number;
  periods: string[];
  sourceAValues: number[];
  sourceBValues: number[];
};

export type CorrelationInsightPdfModel = {
  label: string;
  description: string;
  provider: string;
  createdAt: Date;
  pairs: CorrelationInsightPdfPair[];
};
