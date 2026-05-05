import type { AlertTone } from '../../mocks/dashboard.mock';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

type AlertCardProps = {
  title: string;
  message: string;
  tone: AlertTone;
};

const badgeClasses: Record<AlertTone, string> = {
  critical: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
  alert: 'bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100',
  info: 'bg-blue-50 text-[#172554] dark:bg-blue-500/10 dark:text-blue-300',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
};

export function AlertCard({ title, message, tone }: AlertCardProps) {
  function Icon() {
    switch (tone) {
      case 'critical':
        return <XCircle className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  }

  return (
    <article className="rounded-lg border border-slate-100 bg-white p-3 flex items-start gap-3 dark:border-slate-800 dark:bg-slate-900/50">
      <span className={`flex h-8 w-8 items-center justify-center rounded-md ${badgeClasses[tone]}`}>
        <Icon />
      </span>
      <div className="min-w-0">
        <strong className="block text-sm font-semibold text-slate-900 dark:text-white">{title}</strong>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{message}</p>
      </div>
    </article>
  );
}
