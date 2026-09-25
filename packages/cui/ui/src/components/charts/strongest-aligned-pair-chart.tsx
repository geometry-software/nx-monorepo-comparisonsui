import { Activity } from "lucide-react";
import { SeriesLineChart } from "../app/correlation-charts.js";
import { ChartCard } from "./chart-card.js";

export type AlignedPairChartData = {
  title: string;
  periods: string[];
  series: Array<{ label: string; values: number[]; color: string }>;
};

export function StrongestAlignedPairChart({
  data,
}: {
  data?: AlignedPairChartData;
}) {
  return (
    <ChartCard
      description="The two normalized shapes across shared periods."
      icon={<Activity />}
      title={data?.title ?? "Strongest aligned pair"}
    >
      {data?.periods.length ? (
        <SeriesLineChart periods={data.periods} series={data.series} />
      ) : (
        <div className="grid h-52 place-items-center text-muted-foreground">
          {data ? 'No shared periods for this source pair.' : 'Calculate comparisons to populate this chart.'}
        </div>
      )}
    </ChartCard>
  );
}
