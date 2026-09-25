import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Badge, Button, Card, CardContent, DataTable, FilterSelect, Input, Label,
} from "@cui/ui/components";
import type { Period, PeriodUnit } from "../../services/data-source.types";
import { periodService } from "../../services/period.service";
import { AddPeriodDialog } from "./add-period-dialog";

export function PeriodsActions({
  periods,
  onCreated,
}: {
  periods: Period[];
  onCreated: (period: Period) => void;
}) {
  async function createPeriod(name: string, unit: PeriodUnit, values: string[]) {
    onCreated(await periodService.createPeriod({ name, unit, values }));
  }

  return <AddPeriodDialog onCreate={createPeriod} periods={periods} />;
}

export function PeriodsTab({ periods }: { periods: Period[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"createdAt" | "name" | "unit">("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const filteredPeriods = useMemo(() => {
    const term = search.trim().toLowerCase();
    return periods
      .filter((period) => !term ||
        period.name.toLowerCase().includes(term) ||
        period.unit.includes(term) ||
        period.values.some((value) => value.includes(term)))
      .sort((left, right) => {
        const comparison = left[sort].localeCompare(right[sort]);
        return order === "asc" ? comparison : -comparison;
      });
  }, [order, periods, search, sort]);
  const pages = Math.max(1, Math.ceil(filteredPeriods.length / pageSize));
  const visiblePeriods = filteredPeriods.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  return (
    <div className="space-y-4">
      <DataTable<Period>
        columns={[
          { label: "Name", render: (period) => <strong>{period.name}</strong> },
          {
            label: "Type",
            render: (period) => <Badge variant="outline">{period.unit === "year" ? "Years" : "Days"}</Badge>,
          },
          {
            label: "IDs",
            render: (period) => (
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">{period.values.length} selected</span>
                <div className="flex flex-wrap gap-1">
                  {period.values.map((value) => <Badge className="border-primary bg-transparent text-primary" key={value} variant="outline">{value}</Badge>)}
                </div>
              </div>
            ),
          },
          {
            label: "Created",
            className: "w-44 whitespace-nowrap",
            render: (period) => new Date(period.createdAt).toLocaleString(),
          },
        ]}
        hideSearchBar
        itemLabel="periods"
        labels={{
          showing: "Showing {{first}}–{{last}} of {{total}} {{items}}",
          pagination: "Period pages",
          previous: "Previous",
          next: "Next",
          goToPage: (nextPage) => `Go to page ${nextPage}`,
        }}
        loading={false}
        onPage={setPage}
        page={page}
        pageSize={pageSize}
        pages={pages}
        rows={visiblePeriods}
        searchBar={(
          <Card>
            <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <Label htmlFor="period-search">Search periods</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto size-4 text-muted-foreground" />
                  <Input
                    className="w-full pl-9 lg:w-80"
                    id="period-search"
                    onChange={(event) => { setSearch(event.target.value); setPage(1); }}
                    placeholder="Search by name, type, or ID"
                    value={search}
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <div className="space-y-2">
                  <Label>Sort</Label>
                  <FilterSelect
                    ariaLabel="Sort periods"
                    onChange={(value) => { setSort(value as typeof sort); setPage(1); }}
                    options={[
                      { value: "createdAt", label: "Created date" },
                      { value: "name", label: "Name" },
                      { value: "unit", label: "Type" },
                    ]}
                    value={sort}
                  />
                </div>
                <div className="flex gap-1 rounded-lg border p-1">
                  {(["desc", "asc"] as const).map((value) => (
                    <Button
                      key={value}
                      onClick={() => { setOrder(value); setPage(1); }}
                      size="sm"
                      variant={order === value ? "default" : "ghost"}
                    >
                      {value === "desc" ? "Desc" : "Asc"}
                    </Button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label>Show</Label>
                  <FilterSelect
                    ariaLabel="Periods per page"
                    onChange={(value) => { setPageSize(Number(value)); setPage(1); }}
                    options={[5, 10, 20].map((value) => ({ value: String(value), label: `${value} rows` }))}
                    value={String(pageSize)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        total={filteredPeriods.length}
      />
    </div>
  );
}
