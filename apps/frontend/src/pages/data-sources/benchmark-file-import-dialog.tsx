import { useRef, useState, type DragEvent } from 'react';
import { FileUp, Upload } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@cui/ui/components';
import { benchmarkFileSystemService } from '../../services/benchmark-file-system.service';
import type { BenchmarkReport } from '../../services/benchmark.types';

export function BenchmarkFileImportDialog({ open, onOpenChange, onImported }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImported: (report: BenchmarkReport, file: File) => void;
}) {
  const picker = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  function selectFile(candidate?: File) {
    setError(undefined);
    if (!candidate) return;
    if (!candidate.name.toLowerCase().endsWith('.bump.ts')) {
      setFile(null);
      setError('Select a .bump.ts Benchmark Report.');
      return;
    }
    if (!candidate.size || candidate.size > 20 * 1024 * 1024) {
      setFile(null);
      setError('The report must be non-empty and smaller than 20 MB.');
      return;
    }
    setFile(candidate);
  }

  async function importFile() {
    if (!file) { setError('Choose a report file first.'); return; }
    setBusy(true);
    setError(undefined);
    try {
      onImported(await benchmarkFileSystemService.importReport(file), file);
      setFile(null);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Unable to import the report.');
    } finally {
      setBusy(false);
    }
  }

  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  }

  return <Dialog open={open} onOpenChange={(next) => { if (!busy) onOpenChange(next); }}>
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Import File</DialogTitle>
        <DialogDescription>Open a Bump Benchmark Report in the report viewer.</DialogDescription>
      </DialogHeader>
      <input aria-label="Choose Bump report" accept=".ts" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} ref={picker} type="file" />
      <div
        className={`flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-5 text-center ${dragging ? 'border-primary' : 'border-border'}`}
        onClick={() => picker.current?.click()}
        onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
        onDragLeave={(event) => { event.preventDefault(); setDragging(false); }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={drop}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); picker.current?.click(); } }}
        role="button"
        tabIndex={0}
      >
        <FileUp aria-hidden="true" className="text-muted-foreground" />
        <span className="text-sm font-medium">Drop a file here or choose one</span>
        <span className="text-xs text-muted-foreground">.bump.ts · up to 20 MB</span>
      </div>
      {file && <div className="rounded-md border p-3 text-sm">
        <p className="break-all font-medium">{file.name}</p>
        <p className="text-muted-foreground">Bump TS · {(file.size / 1024).toFixed(1)} KB · Modified {new Date(file.lastModified).toLocaleString()}</p>
      </div>}
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      <DialogFooter>
        <Button disabled={busy} onClick={() => onOpenChange(false)} type="button" variant="outline">Cancel</Button>
        <Button disabled={busy || !file} onClick={() => void importFile()} type="button"><Upload aria-hidden="true" /> {busy ? 'Importing…' : 'Import File'}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>;
}
