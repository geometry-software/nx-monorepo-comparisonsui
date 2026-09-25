import { type FormEvent, useEffect, useState } from "react";
import { Info, LoaderCircle, Plus, X } from "lucide-react";
import {
  Alert, AlertDescription, Badge, Button, Dialog, DialogContent,
  DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Input, Label,
  Textarea, Tooltip, TooltipContent, TooltipTrigger,
} from "@cui/ui/components";
import type { Period, PeriodUnit } from "../../services/data-source.types";
import { periodService } from "../../services/period.service";

function normalizePeriodEntry(unit: PeriodUnit, input: string): string | undefined {
  if (unit === "year") {
    const year = Number(input);
    return Number.isInteger(year) && year >= 1 && year <= 9999
      ? String(year).padStart(4, "0")
      : undefined;
  }
  const date = new Date(`${input}T00:00:00.000Z`);
  return /^\d{4}-\d{2}-\d{2}$/.test(input) &&
    !input.startsWith("0000") &&
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === input
    ? input
    : undefined;
}

export function AddPeriodDialog({
  periods,
  onCreate,
}: {
  periods: Period[];
  onCreate: (name: string, unit: PeriodUnit, values: string[]) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState<PeriodUnit>("year");
  const [valueInput, setValueInput] = useState("");
  const [arrayInput, setArrayInput] = useState("");
  const [values, setValues] = useState<string[]>([]);
  const [entryError, setEntryError] = useState("");
  const [arrayError, setArrayError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [nameAvailability, setNameAvailability] = useState<{
    name: string;
    status: "checking" | "available" | "unavailable" | "error";
  }>();
  const [nameCheckRetry, setNameCheckRetry] = useState(0);
  const nameSyntaxError = name && !/^[a-z]{1,63}$/.test(name)
    ? "Use lowercase Latin letters (a–z) only, up to 63 characters."
    : "";
  const nameCheckPending = Boolean(name && !nameSyntaxError && (
    nameAvailability?.name !== name || nameAvailability.status === "checking"
  ));
  const nameError = nameSyntaxError || (
    periods.some((period) => period.name === name) ||
    (nameAvailability?.name === name && nameAvailability.status === "unavailable")
      ? "A period with this name already exists."
      : nameAvailability?.name === name && nameAvailability.status === "error"
        ? "Unable to check this period name. Try again."
        : ""
  );
  const nameIsAvailable = nameAvailability?.name === name &&
    nameAvailability.status === "available" && !nameError;

  useEffect(() => {
    if (!open || !/^[a-z]{1,63}$/.test(name)) {
      setNameAvailability(undefined);
      return;
    }
    let active = true;
    setNameAvailability({ name, status: "checking" });
    const timer = setTimeout(() => {
      void periodService.isPeriodNameAvailable(name)
        .then((available) => {
          if (active) setNameAvailability({ name, status: available ? "available" : "unavailable" });
        })
        .catch(() => {
          if (active) setNameAvailability({ name, status: "error" });
        });
    }, 300);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [name, open, nameCheckRetry]);
  const normalizedValueInput = unit === "year" && valueInput
    ? String(Number(valueInput)).padStart(4, "0")
    : valueInput;
  const duplicateValueError = valueInput && values.includes(normalizedValueInput)
    ? "This ID is already selected."
    : "";
  const duplicatePeriodError = values.length > 0 && periods.some((period) =>
    period.unit === unit &&
    period.values.length === values.length &&
    values.every((value) => period.values.includes(value))
  )
    ? "A period with the same type and IDs already exists."
    : "";

  function changeUnit(nextUnit: PeriodUnit) {
    if (nextUnit === unit) return;
    setUnit(nextUnit);
    setValues([]);
    setValueInput("");
    setEntryError("");
    setArrayInput("");
    setArrayError("");
  }

  function addValue() {
    const value = normalizePeriodEntry(unit, valueInput);
    if (!value) {
      setEntryError(unit === "year" ? "Enter a year from 1 to 9999." : "Choose a valid calendar day.");
      return;
    }
    if (values.includes(value)) {
      setEntryError("This ID is already selected.");
      return;
    }
    setValues((current) => [...current, value].sort());
    setValueInput("");
    setEntryError("");
  }

  function addArray() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(arrayInput);
    } catch {
      setArrayError('Enter a JSON array of strings, such as ["2024", "2025", "2026"].');
      return;
    }
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.every((item) => typeof item === "string")) {
      setArrayError("Enter a non-empty array containing only strings.");
      return;
    }
    const normalized = parsed.map((item: string) => normalizePeriodEntry(unit, item.trim()));
    if (normalized.some((value) => !value)) {
      setArrayError(unit === "year" ? "Every entry must be a year from 1 to 9999." : "Every entry must be a valid calendar day.");
      return;
    }
    const nextValues = normalized as string[];
    if (new Set(nextValues).size !== nextValues.length || nextValues.some((value) => values.includes(value))) {
      setArrayError("The array contains a duplicate or an already selected period.");
      return;
    }
    setValues((current) => [...current, ...nextValues].sort());
    setArrayInput("");
    setArrayError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nameIsAvailable || duplicatePeriodError || values.length === 0) return;
    setSaving(true);
    setMessage("");
    try {
      await onCreate(name, unit, values);
      setName("");
      setUnit("year");
      setValueInput("");
      setArrayInput("");
      setValues([]);
      setOpen(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Period creation failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button><Plus /> Add Period</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Period</DialogTitle>
          <DialogDescription>Select exactly which years or days belong to this period.</DialogDescription>
        </DialogHeader>
        <form className="min-w-0 space-y-5" onSubmit={submit}>
          <div className="space-y-2">
            <Label htmlFor="period-name">Period name</Label>
            <div className="relative">
              <Input
                aria-busy={nameCheckPending}
                aria-invalid={Boolean(nameError)}
                className="pr-10"
                id="period-name"
                onChange={(event) => setName(event.target.value)}
                placeholder="reporting"
                required
                value={name}
              />
              {nameCheckPending && (
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center" role="status">
                  <LoaderCircle aria-hidden="true" className="size-4 animate-spin text-muted-foreground" />
                  <span className="sr-only">Checking period name…</span>
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Lowercase Latin letters only (a–z).</p>
            {nameError && <p className="text-sm text-destructive" role="alert">{nameError}</p>}
            {nameAvailability?.name === name && nameAvailability.status === "error" && (
              <Button onClick={() => setNameCheckRetry((current) => current + 1)} size="sm" type="button" variant="outline">
                Retry check
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label>Period type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => changeUnit("year")} type="button" variant={unit === "year" ? "default" : "outline"}>Years</Button>
              <Button onClick={() => changeUnit("day")} type="button" variant={unit === "day" ? "default" : "outline"}>Days</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="period-value">{unit === "year" ? "Year ID" : "Calendar day ID"}</Label>
            <div className="flex gap-2">
              <Input
                aria-invalid={Boolean(entryError || duplicateValueError)}
                id="period-value"
                max={unit === "year" ? 9999 : undefined}
                min={unit === "year" ? 1 : undefined}
                onChange={(event) => { setValueInput(event.target.value); setEntryError(""); }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addValue();
                  }
                }}
                placeholder={unit === "year" ? "2026" : undefined}
                type={unit === "year" ? "number" : "date"}
                value={valueInput}
              />
              <Button disabled={!valueInput || Boolean(duplicateValueError)} onClick={addValue} type="button" variant="outline"><Plus /> Add ID</Button>
            </div>
            {entryError && <p className="text-sm text-destructive" role="alert">{entryError}</p>}
            {duplicateValueError && <p className="text-sm text-destructive" role="alert">{duplicateValueError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="period-array">Bulk Operation</Label>
            <div className="flex items-start gap-2">
              <Textarea
                aria-invalid={Boolean(arrayError)}
                id="period-array"
                onChange={(event) => { setArrayInput(event.target.value); setArrayError(""); }}
                placeholder={unit === "year" ? '["2024", "2025", "2026"]' : '["2026-01-01", "2026-01-02"]'}
                rows={3}
                value={arrayInput}
              />
              <Button disabled={!arrayInput.trim()} onClick={addArray} type="button" variant="outline"><Plus /> Add Array</Button>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center gap-1 text-xs text-muted-foreground underline decoration-dotted underline-offset-2" type="button">
                  <Info aria-hidden="true" className="size-3" /> How to fill this field
                </button>
              </TooltipTrigger>
              <TooltipContent>Enter a JSON array of strings with double quotes, for example <code>["2024", "2025", "2026"]</code>.</TooltipContent>
            </Tooltip>
            {arrayError && <p className="text-sm text-destructive" role="alert">{arrayError}</p>}
          </div>
          <div className="space-y-2">
            <Label>Selected periods</Label>
            <div className="flex min-h-16 flex-wrap items-start gap-2 rounded-lg border p-3">
              {values.length === 0 && <span className="text-sm text-muted-foreground">Add at least one {unit === "year" ? "year" : "day"}.</span>}
              {values.map((value) => (
                <Badge className="gap-1" key={value} variant="secondary">
                  {value}
                  <button aria-label={`Remove ${value}`} onClick={() => setValues((current) => current.filter((item) => item !== value))} type="button"><X className="size-3" /></button>
                </Badge>
              ))}
            </div>
            {duplicatePeriodError && <p className="text-sm text-destructive" role="alert">{duplicatePeriodError}</p>}
          </div>
          {message && <Alert variant="destructive"><AlertDescription>{message}</AlertDescription></Alert>}
          <Button className="w-full" disabled={saving || !nameIsAvailable || Boolean(duplicatePeriodError) || values.length === 0} type="submit">
            {saving ? "Creating…" : "Create Period"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
