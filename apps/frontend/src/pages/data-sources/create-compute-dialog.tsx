import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, LoaderCircle } from "lucide-react";
import {
  Alert, AlertDescription, Button, ConfirmDialog, Dialog, DialogContent,
  DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Input, Label,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea,
} from "@cui/ui/components";
import type { Compute, DataSourceSummary, Period } from "../../services/data-source.types";
import { computeService } from "../../services/compute.service";
import { sourceService } from "../../services/source.service";
import {
  COMPUTE_NAME_MAX_LENGTH,
  COMPUTE_VERIFICATION_REQUIRED_MARKER,
  COMPUTE_VERIFICATION_REQUIRED_MESSAGE,
} from "./constants";

function computeNameValidationError(name: string): string | undefined {
  if (name.startsWith("_")) return "Compute name cannot start with an underscore.";
  if (name.endsWith("_")) return "Compute name cannot end with an underscore.";
  if (name.length > COMPUTE_NAME_MAX_LENGTH) {
    return `Compute name must be at most ${COMPUTE_NAME_MAX_LENGTH} characters.`;
  }
  if (!/^[a-z_]+$/.test(name)) return "Use only lowercase Latin letters (a–z) and underscores.";
  return undefined;
}

function alphabeticSuffix(index: number): string {
  let suffix = "";
  for (let value = index; value >= 0; value = Math.floor(value / 26) - 1) {
    suffix = String.fromCharCode(97 + value % 26) + suffix;
  }
  return suffix;
}

export function CreateComputeDialog({
  availableSourceIds,
  selectedCount,
  selectedSourceIds,
  snapshots,
  computes,
  periods,
  onSave,
  onCreated,
  onVerifyAccountSession,
  onSelectAllSources,
  onSelectionChange,
  onRefreshSources,
}: {
  availableSourceIds: string[];
  selectedCount: number;
  selectedSourceIds: string[];
  snapshots: DataSourceSummary[];
  computes: Compute[];
  periods: Period[];
  onSave: (name: string, description: string, periodId: string, accountSessionId: number) => Promise<void>;
  onCreated: () => void;
  onVerifyAccountSession: () => Promise<number>;
  onSelectAllSources: (sourceIds: string[]) => void;
  onSelectionChange: (sourceIds: string[]) => void;
  onRefreshSources: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [periodId, setPeriodId] = useState("");
  const [message, setMessage] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState<{ name: string; description: string; periodId: string; accountSessionId: number }>();
  const [confirmationError, setConfirmationError] = useState<string>();
  const [confirming, setConfirming] = useState(false);
  const [registrationFailure, setRegistrationFailure] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [repairReady, setRepairReady] = useState(false);
  const [repairSteps, setRepairSteps] = useState<string[]>([]);
  const [registrationVerified, setRegistrationVerified] = useState(false);
  const nameError = name.length === 0
    ? undefined
    : computeNameValidationError(name) ?? (
      computes.some((compute) => compute.name === name)
        ? "A compute with this name already exists."
        : undefined
    );

  function resetForm() {
    setName("");
    setDescription("");
    setPeriodId("");
    setMessage(undefined);
    setConfirmation(undefined);
    setConfirmationError(undefined);
    setRegistrationFailure(false);
    setRepairReady(false);
    setRepairSteps([]);
    setRegistrationVerified(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) resetForm();
    setOpen(nextOpen);
  }

  function openForAllSources() {
    if (!availableSourceIds.length) return;
    const baseName = "all_sources";
    let nextName = baseName;
    let suffix = 0;
    while (computes.some((compute) => compute.name.toLowerCase() === nextName)) {
      nextName = `${baseName}_${alphabeticSuffix(suffix++)}`;
    }
    handleOpenChange(true);
    onSelectAllSources(availableSourceIds);
    setName(nextName);
    setDescription("All available sources grouped in one compute.");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (nameError || !name || !description.trim() || !periodId || !selectedCount) return;
    setMessage(undefined);
    setSaving(true);
    try {
      const accountSessionId = await onVerifyAccountSession();
      setConfirmation({ name, description: description.trim(), periodId, accountSessionId });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Compute creation failed.");
    } finally {
      setSaving(false);
    }
  }

  async function confirmCreate() {
    if (!confirmation) return;
    setConfirming(true);
    setConfirmationError(undefined);
    try {
      await onSave(confirmation.name, confirmation.description, confirmation.periodId, confirmation.accountSessionId);
      setName("");
      setDescription("");
      setPeriodId("");
      setConfirmation(undefined);
      setOpen(false);
      onCreated();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Compute creation failed.";
      if (errorMessage.includes(COMPUTE_VERIFICATION_REQUIRED_MARKER)) {
        setConfirmation(undefined);
        setMessage(COMPUTE_VERIFICATION_REQUIRED_MESSAGE);
      } else if (errorMessage.includes("A compute can contain only registered sources.")) {
        setConfirmation(undefined);
        setMessage("A compute can contain only registered sources.");
        setRegistrationFailure(true);
        setRegistrationVerified(false);
        setRepairReady(false);
        setRepairSteps([]);
      } else {
        setConfirmationError(errorMessage);
      }
    } finally {
      setConfirming(false);
    }
  }

  async function repairSources() {
    setRepairing(true);
    setRepairReady(false);
    setRepairSteps(["Checking selected source IDs in the registry…"]);
    try {
      const validation = await computeService.validateSources(selectedSourceIds);
      const replacements = new Map<string, string>();
      let failed = false;
      for (const sourceId of validation.missingIds) {
        const snapshot = snapshots.find(({ source }) => source.id === sourceId);
        if (!snapshot) {
          failed = true;
          setRepairSteps((current) => [...current, `${sourceId}: source details are unavailable. Refresh Sources and select it again.`]);
          continue;
        }
        setRepairSteps((current) => [...current, `Repairing ${snapshot.source.name} (${snapshot.source.provider})…`]);
        try {
          const result = await sourceService.repairRegistration(snapshot);
          replacements.set(result.previousId, result.sourceId);
          setRepairSteps((current) => [...current, result.message]);
        } catch (error) {
          failed = true;
          setRepairSteps((current) => [...current,
            `${snapshot.source.name}: ${error instanceof Error ? error.message : "Registration could not be repaired."}`]);
        }
      }
      if (!validation.missingIds.length) {
        setRepairSteps((current) => [...current, "All selected sources are already registered."]);
      }
      if (replacements.size) {
        onSelectionChange(selectedSourceIds.map((id) => replacements.get(id) ?? id));
      }
      setRepairSteps((current) => [...current, "Refreshing source metadata…"]);
      await onRefreshSources();
      setRepairReady(true);
      if (failed) setMessage("Some sources could not be registered. Review the steps below.");
    } catch (error) {
      setRepairSteps((current) => [...current,
        error instanceof Error ? error.message : "Source repair failed."]);
    } finally {
      setRepairing(false);
    }
  }

  async function updateRegistration() {
    setUpdating(true);
    setRepairSteps((current) => [...current, "Refreshing sources and checking all selected IDs again…"]);
    try {
      await onRefreshSources();
      const validation = await computeService.validateSources(selectedSourceIds);
      if (validation.registered) {
        setRegistrationFailure(false);
        setRegistrationVerified(true);
        setMessage("Source registration is valid. You can create the compute now.");
        setRepairSteps((current) => [...current, "All selected sources are registered. No collections were cleared."]);
      } else {
        setRegistrationVerified(false);
        setMessage("A compute can contain only registered sources.");
        setRepairSteps((current) => [...current, `Still missing: ${validation.missingIds.join(", ")}.`]);
        setRepairReady(false);
      }
    } catch (error) {
      setRepairSteps((current) => [...current,
        error instanceof Error ? error.message : "Source validation failed."]);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <Button disabled={!availableSourceIds.length} onClick={openForAllSources} variant="outline">
          Compute All
        </Button>
        <DialogTrigger asChild>
          <Button disabled={!selectedCount} onClick={resetForm}>
            <Cpu /> Compute ({selectedCount})
          </Button>
        </DialogTrigger>
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Compute</DialogTitle>
            <DialogDescription>
              Name the compute and choose its period model.
            </DialogDescription>
          </DialogHeader>
          <form className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden" onSubmit={submit}>
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <Label>Selected sources</Label>
              <div className="flex min-h-12 max-h-[400px] flex-col gap-2 overflow-y-auto rounded-lg border border-border p-2">
                {selectedSourceIds.map((sourceId) => {
                  const sourceSnapshot = snapshots.find(({ source }) => source.id === sourceId);
                  return (
                    <div className="flex w-full min-w-0 shrink-0 flex-col gap-0.5 rounded-lg border border-border px-3 py-2 text-xs" key={sourceId}>
                      <span className="break-words font-bold text-primary">{sourceSnapshot?.source.name ?? sourceId}</span>
                      <span className="break-words font-normal text-muted-foreground">
                        {sourceSnapshot?.meta?.description ?? "Description unavailable"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="compute-name">Compute name ({name.length}/{COMPUTE_NAME_MAX_LENGTH})</Label>
              <Input
                aria-describedby="compute-name-hint"
                aria-invalid={Boolean(nameError)}
                id="compute-name"
                maxLength={COMPUTE_NAME_MAX_LENGTH}
                onChange={(event) => setName(event.target.value)}
                placeholder="primary_sources"
                required
                title={`Lowercase Latin letters and underscores inside the name, up to ${COMPUTE_NAME_MAX_LENGTH} characters.`}
                value={name}
              />
              <p className="text-xs text-muted-foreground" id="compute-name-hint">
                Lowercase Latin letters and underscores inside the name, up to {COMPUTE_NAME_MAX_LENGTH} characters.
              </p>
              {nameError && <p className="text-sm text-destructive" role="alert">{nameError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="compute-description">Description</Label>
              <Textarea
                id="compute-description"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What do these sources represent?"
                required
                value={description}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compute-period">Period</Label>
              <Select onValueChange={setPeriodId} value={periodId}>
                <SelectTrigger className="w-full" id="compute-period">
                  <SelectValue placeholder="Select a period" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.name} · {period.unit === "year" ? "Years" : "Days"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!periods.length && <p className="text-xs text-muted-foreground">Create a period in the Periods tab first.</p>}
            </div>
            {message && (
              <div className="flex items-stretch gap-4">
                <Alert className="min-w-0 flex-1" variant={registrationVerified ? "default" : "destructive"}>
                  <AlertDescription className="break-words">{message}</AlertDescription>
                </Alert>
                {message.includes(COMPUTE_VERIFICATION_REQUIRED_MARKER) && (
                  <Button
                    asChild
                    className="h-auto shrink-0 self-stretch border-[#008000] bg-transparent text-[#008000] no-underline hover:bg-[#008000]/10 hover:text-[#008000] dark:border-[#008000] dark:bg-transparent"
                    size="sm"
                    variant="outline"
                  >
                    <Link to="/account">Verify Session</Link>
                  </Button>
                )}
              </div>
            )}
            {registrationFailure && (
              <div className="space-y-3 rounded-lg border border-border p-3">
                <p className="text-sm text-muted-foreground">
                  A selected source ID is missing from the Data Sources registry. Repair will match its current registry entry or register its provider collection again. An in-memory source lost after a service restart is recreated empty.
                </p>
                <div className="flex flex-wrap justify-end gap-2">
                  <Button disabled={repairing || updating} onClick={() => void repairSources()} type="button" variant="outline">
                    {repairing && <LoaderCircle className="size-4 animate-spin" />} Fix Sources
                  </Button>
                  {repairReady && (
                    <Button disabled={repairing || updating} onClick={() => void updateRegistration()} type="button" variant="outline">
                      {updating && <LoaderCircle className="size-4 animate-spin" />} Update
                    </Button>
                  )}
                </div>
              </div>
            )}
            {repairSteps.length > 0 && (
              <ol aria-live="polite" className="space-y-1 rounded-lg border border-border p-3 text-xs text-muted-foreground">
                {repairSteps.map((step, index) => <li key={`${index}-${step}`}>{index + 1}. {step}</li>)}
              </ol>
            )}
            {saving && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                <LoaderCircle className="size-4 animate-spin" /> Checking account session…
              </p>
            )}
            <div className="flex justify-end">
              <Button className="px-4" disabled={saving || repairing || updating || registrationFailure || Boolean(nameError) || !name || !description.trim() || !periodId} type="submit">
                Create Compute
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        busy={confirming}
        error={confirmationError}
        itemName={confirmation?.name ?? ""}
        labels={{
          title: "Confirm Compute",
          description: `Create “{{name}}” with the selected sources and period model?`,
          cancel: "Cancel",
          pending: "Creating Compute and loading sources…",
          confirm: "Create Compute",
        }}
        onClose={() => {
          setConfirmation(undefined);
          setConfirmationError(undefined);
        }}
        onConfirm={() => void confirmCreate()}
        open={Boolean(confirmation)}
        tone="confirm"
      />
    </>
  );
}
