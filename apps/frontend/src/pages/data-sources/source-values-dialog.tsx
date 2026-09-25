import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Braces, LoaderCircle, RefreshCw, Upload } from "lucide-react";
import {
  Button, ConfirmDialog, Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, EmptyList, Input, Label, Textarea,
} from "@cui/ui/components";
import type { Compute } from "../../services/data-source.types";
import { sourceService } from "../../services/source.service";
import { EXISTING_SOURCE_VALUES_MESSAGE } from "./constants";

function validateValueArray(input: string, expectedCount: number):
  | { valid: true; values: number[] }
  | { valid: false; message: string } {
  if (!input.trim()) return { valid: false, message: "Enter a JSON array of numbers." };

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    return { valid: false, message: "Enter valid JSON, for example [10, 20, 30]." };
  }
  if (!Array.isArray(parsed)) {
    return { valid: false, message: "The value must be an array." };
  }
  const entries: unknown[] = parsed;
  if (entries.some((item) => typeof item !== "number")) {
    return { valid: false, message: "Every array item must be a number." };
  }
  if (entries.length !== expectedCount) {
    return { valid: false, message: `Expected ${expectedCount} values, received ${entries.length}.` };
  }
  const values = entries.map(Number);
  if (values.some((value) => !Number.isFinite(value))) {
    return { valid: false, message: "Every number must be finite." };
  }
  return { valid: true, values };
}

export function SourceValuesDialog({
  compute,
  sourceId,
  onSaved,
  mode,
}: {
  compute: Compute;
  sourceId: string;
  onSaved?: () => Promise<void>;
  mode: "fill" | "show";
}) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [arrayOpen, setArrayOpen] = useState(false);
  const [arrayInput, setArrayInput] = useState("");
  const [arrayAttempted, setArrayAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSavedValues, setHasSavedValues] = useState(false);
  const [error, setError] = useState<string>();
  const [overwriteOpen, setOverwriteOpen] = useState(false);
  const [overwriteError, setOverwriteError] = useState<string>();
  const periods = useMemo(
    () => [...compute.periodModel.values].sort((left, right) => left.localeCompare(right)),
    [compute.periodModel.values],
  );
  const arrayValidation = validateValueArray(arrayInput, periods.length);
  const arrayError = (arrayInput.length > 0 || arrayAttempted) && !arrayValidation.valid
    ? arrayValidation.message
    : undefined;
  const ready = periods.length > 0 && periods.every((period) =>
    values[period]?.trim() !== "" && values[period] !== undefined && Number.isFinite(Number(values[period])),
  );

  useEffect(() => {
    if (!open || mode !== "show") return;
    let active = true;
    setLoading(true);
    setError(undefined);
    setValues({});
    setHasSavedValues(false);
    void sourceService.listObservations(sourceId)
      .then((observations) => {
        if (!active) return;
        const matching = observations.filter(({ body }) => periods.includes(body.period));
        setHasSavedValues(matching.length > 0);
        setValues(Object.fromEntries(matching.map(({ body }) => [body.period, String(body.value)])));
      })
      .catch((reason) => {
        if (active) setError(reason instanceof Error ? reason.message : "Unable to load values.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [open, mode, sourceId, periods]);

  async function save(overwrite = false) {
    if (mode !== "fill" || !ready || saving) return;
    setSaving(true);
    setError(undefined);
    setOverwriteError(undefined);
    try {
      await sourceService.createFieldValues(
        sourceId,
        compute.id,
        periods.map((period) => ({ period, value: Number(values[period]) })),
        overwrite,
      );
      await onSaved?.();
      setOverwriteOpen(false);
      setOpen(false);
      setValues({});
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Unable to save field values.";
      if (!overwrite && message === EXISTING_SOURCE_VALUES_MESSAGE) {
        setOverwriteOpen(true);
      } else if (overwrite) {
        setOverwriteError(message);
      } else {
        setError(message);
      }
    } finally {
      setSaving(false);
    }
  }

  function fillFromArray(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setArrayAttempted(true);
    if (!arrayValidation.valid) return;
    setValues(Object.fromEntries(periods.map((period, index) => [period, String(arrayValidation.values[index])])));
    setArrayInput("");
    setArrayAttempted(false);
    setArrayOpen(false);
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {mode === "fill" ? <Upload aria-hidden="true" /> : <RefreshCw aria-hidden="true" />}
          {mode === "fill" ? "Insert" : "Request"}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        {mode === "fill" && (
          <Button
            aria-label="Add array"
            className="absolute top-2 right-10"
            onClick={() => { setArrayAttempted(false); setArrayOpen(true); }}
            size="icon-sm"
            title="Add Array"
            type="button"
            variant="ghost"
          >
            <Braces />
          </Button>
        )}
        <DialogHeader>
          <DialogTitle>{mode === "fill" ? "Fill Values" : "Show Values"}</DialogTitle>
        </DialogHeader>
        {mode === "fill" && (
          <Dialog onOpenChange={setArrayOpen} open={arrayOpen}>
            <DialogContent aria-describedby={undefined} className="min-w-0 overflow-hidden">
              <DialogHeader><DialogTitle>Add Array</DialogTitle></DialogHeader>
              <form className="min-w-0 space-y-4" onSubmit={fillFromArray}>
                <Textarea
                  aria-label="Array of numbers"
                  aria-invalid={Boolean(arrayError)}
                  className="min-w-0 max-w-full"
                  onChange={(event) => setArrayInput(event.target.value)}
                  placeholder="[1, 2, 3]"
                  rows={3}
                  style={{ fieldSizing: "fixed" }}
                  value={arrayInput}
                />
                {arrayError && <p className="text-sm text-destructive" role="alert">{arrayError}</p>}
                <div className="flex justify-end"><Button type="submit">Add Array</Button></div>
              </form>
            </DialogContent>
          </Dialog>
        )}
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); void save(); }}>
          {loading && <p className="text-sm text-muted-foreground" role="status">Loading values…</p>}
          {mode === "show" && !loading && !error && !hasSavedValues && (
            <EmptyList />
          )}
          {!loading && (mode === "fill" || (hasSavedValues && !error)) && <div className="max-h-80 space-y-2 overflow-y-auto">
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 text-xs font-medium text-muted-foreground">
              <span>Period</span><span>Value</span>
            </div>
            {periods.map((period) => (
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3" key={period}>
                <Label htmlFor={`field-value-${sourceId}-${period}`} className="truncate" title={period}>{period}</Label>
                <Input
                  id={`field-value-${sourceId}-${period}`}
                  disabled={mode === "show"}
                  onChange={(event) => setValues((current) => ({ ...current, [period]: event.target.value }))}
                  placeholder="Value"
                  required
                  step="any"
                  type="number"
                  value={values[period] ?? ""}
                />
              </div>
            ))}
          </div>}
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          {mode === "fill" && (
            <div className="flex justify-end">
              <Button disabled={!ready || saving} type="submit">
                {saving && <LoaderCircle aria-hidden="true" className="animate-spin" />}
                Save Values
              </Button>
            </div>
          )}
        </form>
        {mode === "fill" && (
          <ConfirmDialog
            busy={saving}
            error={overwriteError}
            itemName=""
            labels={{
              title: "Overwrite source values?",
              description: "This source already contains values for the selected period. Do you want to overwrite them?",
              cancel: "No, cancel",
              pending: "Overwriting values…",
              confirm: "Yes, overwrite",
            }}
            onClose={() => { setOverwriteOpen(false); setOverwriteError(undefined); }}
            onConfirm={() => void save(true)}
            open={overwriteOpen}
            tone="warn"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
