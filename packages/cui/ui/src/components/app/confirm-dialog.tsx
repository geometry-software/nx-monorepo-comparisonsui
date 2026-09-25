import { AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { ButtonLoader } from './button-loader';

export function ConfirmDialog({
  open,
  itemName,
  busy,
  error,
  onClose,
  onConfirm,
  labels,
  tone = 'destructive',
  children,
  confirmDisabled = false,
}: {
  open: boolean;
  itemName: string;
  busy: boolean;
  error?: string;
  onClose: () => void;
  onConfirm: () => void;
  labels: {
    title: string;
    description: string;
    note?: string;
    warning?: string;
    cancel: string;
    pending?: string;
    deleting?: string;
    confirm?: string;
    confirmDelete?: string;
  };
  tone?: 'destructive' | 'confirm' | 'warn';
  children?: ReactNode;
  confirmDisabled?: boolean;
}) {
  const isConfirm = tone === 'confirm';
  const isWarn = tone === 'warn';
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => !next && !busy && onClose()}
    >
      <AlertDialogContent aria-busy={busy} onOverlayClick={() => !busy && onClose()}>
        <AlertDialogHeader>
          <AlertDialogMedia
            className={
              isConfirm
                ? 'bg-emerald-50 text-emerald-700'
                : isWarn
                  ? 'bg-[#FFA500]/15 text-[#FF8C00]'
                : 'text-destructive'
            }
          >
            {isConfirm ? <CheckCircle2 /> : <AlertTriangle />}
          </AlertDialogMedia>
          <AlertDialogTitle>{labels.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {labels.description.replace('{{name}}', itemName)}{' '}
            {labels.note ?? labels.warning}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {busy && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
            <ButtonLoader /> {labels.pending ?? labels.deleting}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>{labels.cancel}</AlertDialogCancel>
          <AlertDialogAction
            disabled={busy || confirmDisabled}
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
            variant={isConfirm ? 'default' : isWarn ? 'warn' : 'destructive'}
          >
            {isConfirm ? (
              <CheckCircle2 />
            ) : isWarn ? (
              <AlertTriangle />
            ) : (
              <Trash2 />
            )}
            {labels.confirm ?? labels.confirmDelete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
