import type { BadgeTone } from '../../mocks/dashboard.mock';

type StatusBadgeProps = {
  label: string;
  tone: BadgeTone;
};

const statusClasses: Record<BadgeTone, string> = {
  danger: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
  info: 'bg-blue-50 text-[#172554] dark:bg-blue-500/10 dark:text-blue-300',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${statusClasses[tone]}`}>
      {label}
    </span>
  );
}
