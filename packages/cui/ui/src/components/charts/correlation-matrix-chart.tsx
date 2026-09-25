import { Grid3X3 } from "lucide-react";
import { CorrelationMatrix } from "../app/correlation-charts.js";
import { ChartCard } from "./chart-card.js";

export function CorrelationMatrixChart({
  entities,
  values,
}: {
  entities: string[];
  values: Record<string, number | null>;
}) {
  return (
    <ChartCard
      description="Green is positive; primary is negative."
      icon={<Grid3X3 />}
      title="Correlation Matrix"
    >
      <CorrelationMatrix entities={entities} values={values} />
    </ChartCard>
  );
}
