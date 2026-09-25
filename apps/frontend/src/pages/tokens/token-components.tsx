import type { ReactNode } from "react";
import { Label } from "@cui/ui/components";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className="grid gap-2"><Label>{label}</Label>{children}</div>;
}

export function TokenStatusToggle({ label, value, displayValue, disabled, onChange }: {
  label: string;
  value: string | null;
  displayValue: string;
  disabled: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
      <div className="min-w-0">
        <p className="font-medium">{label}</p>
        <p className="break-words text-sm text-muted-foreground">{displayValue}</p>
      </div>
      <button
        aria-checked={Boolean(value)}
        aria-label={label}
        className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 ${value ? 'bg-primary' : 'bg-muted-foreground/40'}`}
        disabled={disabled}
        onClick={() => onChange(!value)}
        role="switch"
        type="button"
      >
        <span className={`size-4 rounded-full bg-background shadow-sm transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

