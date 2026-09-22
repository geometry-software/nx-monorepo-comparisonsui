import type { ReactNode } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';
import type { Comparison, ComparisonDefinition } from '@/lib/types';
import {
  useDeleteAllComparisonsMutation,
  useGetComparisonDefinitionQuery,
  useListComparisonsQuery,
  useRefreshComparisonsMutation,
} from '@/services/api';
import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@cui/ui/components';

type TableColumn<Row> = Readonly<{
  id: string;
  label: string;
  align?: 'left' | 'right';
  cellClassName?: string;
  render: (row: Row, index: number) => ReactNode;
}>;

type TypedTableProps<Row extends { id: string }> = Readonly<{
  rows: readonly Row[];
  columns: readonly TableColumn<Row>[];
  isFetching: boolean;
  emptyMessage: string;
}>;

function TypedTable<Row extends { id: string }>({ rows, columns, isFetching, emptyMessage }: TypedTableProps<Row>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead className={column.align === 'right' ? 'text-right' : undefined} key={column.id}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell
                className={[column.align === 'right' ? 'text-right' : '', column.cellClassName ?? ''].filter(Boolean).join(' ')}
                key={column.id}
              >
                {column.render(row, index)}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {!isFetching && !rows.length && (
          <TableRow>
            <TableCell className="h-32 text-center text-muted-foreground" colSpan={Math.max(columns.length, 1)}>
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function coefficientClassName(value: number | null) {
  return value !== null && value < 0
    ? 'border-error/40 bg-error/10 text-error'
    : 'border-success/60 bg-success/20 text-success-foreground';
}

function createComparisonColumns(definition: ComparisonDefinition): readonly TableColumn<Comparison>[] {
  const { metric, table } = definition;
  return [
    { id: 'sequence', label: table.idLabel, cellClassName: 'text-muted-foreground', render: (_row, index) => index + 1 },
    {
      id: 'pair', label: table.pairLabel, cellClassName: 'font-medium',
      render: (row) => `${row.leftEntity}${table.pairSeparator}${row.rightEntity}`,
    },
    { id: 'coverage', label: table.coverageLabel, align: 'right', render: (row) => row.observationCount },
    {
      id: metric.field, label: metric.label, align: 'right',
      render: (row) => {
        const value = row[metric.field];
        return <Badge className={coefficientClassName(value)} variant="outline">{value?.toFixed(metric.precision) ?? metric.emptyLabel}</Badge>;
      },
    },
  ];
}

export function Comparisons() {
  const definitionQuery = useGetComparisonDefinitionQuery();
  const comparisonsQuery = useListComparisonsQuery();
  const [refresh, refreshState] = useRefreshComparisonsMutation();
  const [deleteAll, deleteState] = useDeleteAllComparisonsMutation();
  const definition = definitionQuery.data;
  const comparisons = comparisonsQuery.data ?? [];
  const columns = definition ? createComparisonColumns(definition) : [];
  const hasError = definitionQuery.isError || comparisonsQuery.isError || refreshState.isError;

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Comparisons</h1>
          <p className="mt-2 text-muted-foreground">
            {definition
              ? `${definition.pairCount} unique pairs from ${definition.sources.length} sources, aligned by shared ${definition.alignment.label} values and stored by the orchestrator.`
              : 'Loading the comparison service definition…'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button disabled={deleteState.isLoading || !comparisons.length} onClick={() => void deleteAll()} variant="outline"><Trash2 />Delete all</Button>
          <Button disabled={refreshState.isLoading || !definition} onClick={() => void refresh()}><RefreshCw className={refreshState.isLoading ? 'animate-spin' : ''} />Calculate comparisons</Button>
        </div>
      </header>
      {hasError && <Alert variant="destructive"><AlertDescription>Comparison data or its service definition is unavailable.</AlertDescription></Alert>}
      <Card>
        <CardHeader>
          <CardTitle>Correlation table</CardTitle>
          <CardDescription>
            {definition
              ? `${definition.metric.label} ranges from ${definition.metric.minimum} to +${definition.metric.maximum}. These are hypotheses from the current dataset, not causal conclusions.`
              : 'The table is initialized from the comparison service definition.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <TypedTable columns={columns} emptyMessage="No stored comparisons. Add source data, then calculate." isFetching={definitionQuery.isFetching || comparisonsQuery.isFetching} rows={comparisons} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
