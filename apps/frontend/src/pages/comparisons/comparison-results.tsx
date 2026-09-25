import { Fragment, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ComparisonDefinition, ComputeComparison, PearsonCorrelationCalculation } from "@/lib/types";
import {
  Badge, Button, EmptyList, SeriesLineChart, Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@cui/ui/components";

const secondSourceColor = '#228B22';

function CorrelationPair({ calculation, definition, highlighted }: {
  calculation: PearsonCorrelationCalculation;
  definition?: ComparisonDefinition;
  highlighted: boolean;
}) {
  return (
    <article className={`min-w-0 rounded-lg border bg-background p-4 ${highlighted ? 'border-primary' : ''}`}>
      <div className="grid min-w-0 gap-4 md:grid-cols-2 md:items-center">
        <div className="min-w-0 space-y-3">
          <div className="flex min-w-0 flex-wrap gap-2">
            <Badge className="h-auto min-w-0 max-w-full shrink border-primary py-1 text-left text-primary whitespace-normal break-all" variant="outline">
              {calculation.sourceA}
            </Badge>
            <Badge
              className="h-auto min-w-0 max-w-full shrink py-1 text-left whitespace-normal break-all"
              style={{ borderColor: secondSourceColor, color: secondSourceColor }}
              variant="outline"
            >
              {calculation.sourceB}
            </Badge>
          </div>
          <p className="text-foreground">
            Correlation Rate: {calculation.r?.toFixed(definition?.metric.precision ?? 4) ?? definition?.metric.emptyLabel ?? '—'}
          </p>
        </div>
        <div className="min-w-0 break-all">
          {calculation.periods.length > 0 ? (
            <SeriesLineChart
              height={140}
              periods={calculation.periods}
              series={[
                { label: calculation.sourceA, values: calculation.sourceAValues, color: 'var(--primary)' },
                { label: calculation.sourceB, values: calculation.sourceBValues, color: secondSourceColor },
              ]}
            />
          ) : (
            <p className="text-sm text-muted-foreground">No shared periods for this source pair.</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function ComputeComparisonTable({ groups, definition }: { groups: ComputeComparison[]; definition?: ComparisonDefinition }) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  if (groups.length === 0) return <EmptyList />;
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border">
      <Table className="w-full table-fixed">
        <TableHeader><TableRow><TableHead /><TableHead>Compute</TableHead><TableHead>Provider</TableHead><TableHead>File</TableHead><TableHead className="text-center">Sources</TableHead><TableHead className="text-center">Pairs</TableHead><TableHead>Created</TableHead></TableRow></TableHeader>
        <TableBody>
          {groups.map((group) => {
            const groupKey = `${group.provider}:${group.id}`;
            const expanded = expandedIds.includes(groupKey);
            let highestCorrelationIndex = -1;
            let highestCorrelationRate = -Infinity;
            group.pearsonCorrelations.forEach(({ r }, index) => {
              if (r !== null && r > highestCorrelationRate) {
                highestCorrelationRate = r;
                highestCorrelationIndex = index;
              }
            });
            return (
              <Fragment key={groupKey}>
                <TableRow>
                  <TableCell>
                    <Button aria-expanded={expanded} aria-label={`${expanded ? 'Collapse' : 'Expand'} ${group.name}`} onClick={() => setExpandedIds((current) => expanded ? current.filter((id) => id !== groupKey) : [...current, groupKey])} size="icon" variant="ghost">
                      {expanded ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </TableCell>
                  <TableCell className="break-all whitespace-normal font-medium">{group.name}</TableCell>
                  <TableCell className="whitespace-normal">{group.provider === 'bump' ? 'Bump file' : 'MongoDB Atlas'}</TableCell>
                  <TableCell className="break-all whitespace-normal">{group.provider === 'bump' ? `${group.name}.bump.ts` : '–'}</TableCell>
                  <TableCell className="text-center">{group.sourceCount}</TableCell>
                  <TableCell className="text-center">{group.pearsonCorrelations.length}</TableCell>
                  <TableCell className="whitespace-normal">{new Date(group.createdAt).toLocaleString()}</TableCell>
                </TableRow>
                {expanded && (
                  <TableRow><TableCell colSpan={7} className="min-w-0 whitespace-normal bg-muted/30 p-4">
                    {group.pearsonCorrelations.length === 0 ? <EmptyList /> : (
                      <div className="grid min-w-0 max-w-full gap-3">
                        {group.pearsonCorrelations.map((calculation, index) => (
                          <CorrelationPair calculation={calculation} definition={definition} highlighted={index === highestCorrelationIndex} key={`${calculation.sourceA}:${calculation.sourceB}:${index}`} />
                        ))}
                      </div>
                    )}
                  </TableCell></TableRow>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
