import { CorrelationArchitecture } from '@cui/ui/components';

export function Info() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">
          How correlation data moves through the workspace
        </h1>
        <p className="mt-2 max-w-3xl text-lg text-muted-foreground">
          The Data Sources service manages provider-backed sources and computes.
          The comparison service aligns observations from sources in each compute,
          calculates correlations, and shares the results with Comparisons and Insights.
        </p>
      </header>
      <CorrelationArchitecture
        correlationCodeUrl="https://github.com/geometry-software/nx-monorepo-comparisonsui/blob/main/apps/comparison-service/src/app/correlation/correlation.ts"
        orchestratorCodeUrl="https://github.com/geometry-software/nx-monorepo-comparisonsui/blob/main/apps/comparison-service/src/app/comparisons.service.ts"
      />
    </div>
  );
}
