import { CheckCircle2, CircleX, X } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button } from '../ui/button.js';

export type NotificationPayload = {
  type: 'success' | 'error';
  message: string;
  title?: string;
};

export function Notification({ payload, onClose, className }: {
  payload: NotificationPayload;
  onClose?: () => void;
  className?: string;
}) {
  const error = payload.type === 'error';
  const Icon = error ? CircleX : CheckCircle2;
  const tone = error ? 'text-[#B22222]' : 'text-[#228B22]';

  return (
    <div className={cn('flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3', className)} role={error ? 'alert' : 'status'}>
      <Icon aria-hidden="true" className={cn('size-5 shrink-0', tone)} />
      <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-foreground">
        <span className="shrink-0 whitespace-nowrap font-semibold">{payload.title ?? (error ? 'Error' : 'Success')}</span>
        <span className="min-w-0 truncate" title={payload.message}>{payload.message}</span>
      </div>
      {onClose && (
        <Button aria-label="Close notification" className="-mr-1" onClick={onClose} size="icon-sm" variant="ghost">
          <X aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
