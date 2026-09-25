import { BarChart3 } from "lucide-react";
import {
  CorrelationBars,
  type CorrelationDatum,
} from "../app/correlation-charts.js";
import { ChartCard } from "./chart-card.js";

export function StrongestRelationshipsChart({
  data,
}: {
  data: CorrelationDatum[];
}) {
  return (
    <ChartCard
      description="Pairs ranked by absolute Pearson correlation."
      icon={<BarChart3 />}
      title="Strongest relationships"
    >
      <CorrelationBars data={data} layout="stacked" />
    </ChartCard>
  );
}
