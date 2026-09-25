import type { ComparisonModel } from "@/lib/types";
import {
  Alert, AlertDescription, Button, Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@cui/ui/components";

export function ComparisonModelDialog({ model, disabled }: {
  model?: ComparisonModel;
  disabled: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild><Button disabled={disabled} variant="outline">Comparison Model</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comparison Model</DialogTitle>
          <DialogDescription>Each data element across all sources in a compute contains a period (string) and a value (number).</DialogDescription>
        </DialogHeader>
        {model ? <pre className="overflow-x-auto rounded-lg border bg-muted/30 p-4 text-sm">{JSON.stringify(model.fields, null, 2)}</pre>
          : <Alert variant="destructive"><AlertDescription>Comparison model is unavailable.</AlertDescription></Alert>}
      </DialogContent>
    </Dialog>
  );
}
