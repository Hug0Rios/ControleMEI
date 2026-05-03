import type { AlertTone } from '../../mocks/dashboard.mock';

type AlertCardProps = {
  title: string;
  message: string;
  tone: AlertTone;
};

const alertClasses: Record<AlertTone, string> = {
  warning:
    'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100',
  info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-100',
};

export function AlertCard({ title, message, tone }: AlertCardProps) {
  return (
    <article className={`rounded-xl border px-3 py-3 ${alertClasses[tone]}`}>
      <strong className="block text-xs">{title}</strong>
      <p className="mt-1 text-xs opacity-80">{message}</p>
    </article>
  );
}
