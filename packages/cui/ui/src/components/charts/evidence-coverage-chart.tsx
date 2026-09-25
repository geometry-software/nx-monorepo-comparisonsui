import { BarChart3 } from "lucide-react";
import {
  CorrelationBars,
  type CorrelationDatum,
} from "../app/correlation-charts.js";
import { ChartCard } from "./chart-card.js";

export function EvidenceCoverageChart({
  data,
}: {
  data: CorrelationDatum[];
}) {
  return (
    <ChartCard
      description="Number of aligned observations behind each leading R value."
      icon={<BarChart3 />}
      title="Evidence coverage"
    >
      <CorrelationBars data={data} />
    </ChartCard>
  );
}
