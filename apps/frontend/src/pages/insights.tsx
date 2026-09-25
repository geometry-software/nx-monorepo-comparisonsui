import { useState } from "react";
import { FileDown } from 'lucide-react';
import type { ComputeComparison } from "@/lib/types";
import { Button, toast } from '@cui/ui/components';
import { insightsService } from '@/services/insights.service';
import { CreateInsightDialog } from "./insights/create-insight-dialog";
import { InsightCharts } from "./insights/insight-charts";

export function Insights() {
  const [insight, setInsight] = useState<ComputeComparison | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);

  async function exportPdf() {
    if (!insight || exportingPdf) return;
    setExportingPdf(true);
    try {
      const content = await insightsService.exportPdf(insight);
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${insight.name.replace(/[^a-zA-Z0-9_-]/g, '_')}-correlation-insights.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      toast.success('Correlation insight PDF exported.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to export the PDF.');
    } finally {
      setExportingPdf(false);
    }
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Correlation insights</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">Explore one selected comparison. Correlation describes association, not causation.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CreateInsightDialog onCreate={setInsight} />
          {insight && <Button disabled={exportingPdf} onClick={() => void exportPdf()} variant="outline"><FileDown /> Export PDF</Button>}
        </div>
      </header>
      {insight && <InsightCharts comparison={insight} />}
    </section>
  );
}
