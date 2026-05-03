import type { MetricTone } from '../../mocks/dashboard.mock';

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: string;
  tone: MetricTone;
  progress?: number;
};

const toneClasses: Record<MetricTone, string> = {
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  red: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
};

const descriptionClasses: Record<MetricTone, string> = {
  blue: 'text-blue-600 dark:text-blue-300',
  green: 'text-emerald-600 dark:text-emerald-300',
  red: 'text-rose-600 dark:text-rose-300',
  amber: 'text-amber-600 dark:text-amber-300',
};

export function MetricCard({ title, value, description, icon, tone, progress }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/95">
      <div className="flex gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold ${toneClasses[tone]}`}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <strong className="mt-1 block truncate text-lg font-bold text-slate-950 dark:text-white">
            {value}
          </strong>
          {progress !== undefined ? (
            <div className="mt-3">
              <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <p className={`mt-2 truncate text-xs font-semibold ${descriptionClasses[tone]}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
