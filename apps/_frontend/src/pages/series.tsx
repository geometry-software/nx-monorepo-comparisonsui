import { type FormEvent, useState } from 'react';
import { Database, Plus, Trash2 } from 'lucide-react';
import type { SeriesKey, SeriesObservation } from '@/lib/types';
import {
  useCreateObservationMutation,
  useDeleteAllObservationsMutation,
  useListSeriesQuery,
} from '@/services/api';
import { Alert, AlertDescription } from '@nx-react-nestjs/components/ui/alert';
import { Badge } from '@nx-react-nestjs/components/ui/badge';
import { Button } from '@nx-react-nestjs/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nx-react-nestjs/components/ui/card';
import { Input } from '@nx-react-nestjs/components/ui/input';
import { Label } from '@nx-react-nestjs/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@nx-react-nestjs/components/ui/table';

type SeriesDefinition = Readonly<{
  key: SeriesKey;
  label: string;
  collection: string;
  requiresValue: boolean;
}>;

const seriesDefinitions: readonly SeriesDefinition[] = [
  { key: 'years', label: 'Year', collection: 'nm_years', requiresValue: false },
  { key: 'tgi', label: 'TGI', collection: 'nm_tgi', requiresValue: true },
];

export function Series() {
  const [selectedKey, setSelectedKey] = useState<SeriesKey>('years');
  const [year, setYear] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState<string>();
  const definition = seriesDefinitions.find(({ key }) => key === selectedKey) ?? seriesDefinitions[0];
  const list = useListSeriesQuery(selectedKey);
  const [create, createState] = useCreateObservationMutation();
  const [deleteAll, deleteState] = useDeleteAllObservationsMutation();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(undefined);
    const parsedYear = Number(year);
    const parsedValue = definition.requiresValue ? Number(value) : undefined;
    if (
      !Number.isInteger(parsedYear) ||
      (definition.requiresValue &&
        (parsedValue === undefined || !Number.isFinite(parsedValue)))
    ) {
      setMessage('Enter a valid year and numeric value.');
      return;
    }
    try {
      await create({ key: selectedKey, year: parsedYear, value: parsedValue }).unwrap();
      setYear('');
      setValue('');
    } catch {
      setMessage('The observation could not be saved. Verify the service connection and year uniqueness.');
    }
  }

  const rows = list.data?.data ?? [];

  return (
    <section className="space-y-6">
      <header>
        <Badge className="mb-3" variant="outline"><Database /> Independent data sources</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Year and TGI observations</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Record observations with the form and render the selected Atlas collection as a list.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.7fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Add observation</CardTitle>
            <CardDescription>Each year is unique within its collection.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submit}>
              <div className="space-y-2">
                <Label htmlFor="series-source">Data source</Label>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
                  id="series-source"
                  onChange={(event) => {
                    setSelectedKey(event.target.value as SeriesKey);
                    setMessage(undefined);
                  }}
                  value={selectedKey}
                >
                  {seriesDefinitions.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="series-year">Year</Label>
                <Input id="series-year" max={2200} min={1900} onChange={(event) => setYear(event.target.value)} required type="number" value={year} />
              </div>
              {definition.requiresValue && (
                <div className="space-y-2">
                  <Label htmlFor="series-value">Value</Label>
                  <Input id="series-value" onChange={(event) => setValue(event.target.value)} required step="any" type="number" value={value} />
                </div>
              )}
              {message && <Alert variant="destructive"><AlertDescription>{message}</AlertDescription></Alert>}
              <Button className="w-full" disabled={createState.isLoading} type="submit"><Plus />{createState.isLoading ? 'Saving…' : 'Save observation'}</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between gap-3">
            <div>
              <CardTitle>{definition.label} collection</CardTitle>
              <CardDescription>Atlas MongoDB Cloud · <code>{definition.collection}</code></CardDescription>
            </div>
            <Button
              disabled={deleteState.isLoading || !rows.length}
              onClick={() => void deleteAll(selectedKey)}
              variant="destructive"
            >
              <Trash2 />Delete all
            </Button>
          </CardHeader>
          <CardContent>
            {list.isError && <Alert className="mb-4" variant="destructive"><AlertDescription>This data source is unavailable.</AlertDescription></Alert>}
            <ObservationTable loading={list.isFetching} requiresValue={definition.requiresValue} rows={rows} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ObservationTable({ rows, loading, requiresValue }: { rows: SeriesObservation[]; loading: boolean; requiresValue: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader><TableRow><TableHead>Year</TableHead>{requiresValue && <TableHead className="text-right">Value</TableHead>}</TableRow></TableHeader>
        <TableBody>
          {rows.map((row) => <TableRow key={row.id}><TableCell className="font-medium">{row.year}</TableCell>{requiresValue && <TableCell className="text-right">{row.value}</TableCell>}</TableRow>)}
          {!loading && !rows.length && <TableRow><TableCell className="h-28 text-center text-muted-foreground" colSpan={requiresValue ? 2 : 1}>No observations in this collection.</TableCell></TableRow>}
        </TableBody>
      </Table>
    </div>
  );
}
