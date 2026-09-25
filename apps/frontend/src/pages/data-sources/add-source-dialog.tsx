import { type FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import {
  Alert, AlertDescription, Button, Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger, Input, Label, Select,
  SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea,
} from "@cui/ui/components";
import { dataSourceProviderOptions, sourceService } from "../../services/source.service";
import type { DataSourceProvider } from "../../services/data-source.types";

export function AddSourceDialog({
  onCreated,
}: {
  onCreated: (sourceId: string) => Promise<void>;
}) {
  const [provider, setProvider] = useState<DataSourceProvider>("memory");
  const [name, setName] = useState("");
  const [description, setDescription] = useState(dataSourceProviderOptions[0].description);
  const [message, setMessage] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const nameError = name && !/^[A-Za-z][A-Za-z0-9_-]{0,62}$/.test(name)
    ? "Name must start with a letter and contain only letters, numbers, underscores, or hyphens (up to 63 characters)."
    : ["data_sources", "source_maps"].includes(name)
      ? `The ${name} name is reserved.`
      : undefined;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (nameError || !name.trim()) return;
    setMessage(undefined);
    setSaving(true);
    try {
      const source = await sourceService.createSource({ name, provider, description });
      setName("");
      setDescription(dataSourceProviderOptions.find((option) => option.value === provider)?.description ?? "");
      try {
        await onCreated(source.id);
        setOpen(false);
      } catch (error) {
        setMessage(
          `Data source created, but the list could not be refreshed: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Data source creation failed.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Add Source
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Source</DialogTitle>
          <DialogDescription>
            Create a virtual data service backed by a selected provider.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={submit}>
          <div className="space-y-2">
            <Label htmlFor="data-source-provider">Provider</Label>
            <Select
              onValueChange={(value) => {
                setProvider(value as DataSourceProvider);
                setDescription(dataSourceProviderOptions.find((option) => option.value === value)?.description ?? "");
              }}
              value={provider}
            >
              <SelectTrigger className="w-full" id="data-source-provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dataSourceProviderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="data-source-name">Name</Label>
            <Input
              aria-invalid={Boolean(nameError)}
              id="data-source-name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Data source label"
              required
              value={name}
            />
            {nameError && <p className="text-sm text-destructive" role="alert">{nameError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="data-source-description">Description</Label>
            <Textarea
              id="data-source-description"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </div>
          {message && (
            <Alert variant="destructive">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-end">
            <Button disabled={saving || Boolean(nameError)} type="submit">
              {saving ? "Creating…" : "Create Data Source"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

