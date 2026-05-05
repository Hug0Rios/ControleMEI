import type { MetricTone } from '../../mocks/dashboard.mock';

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  tone: MetricTone;
  progress?: number;
};

const titleProgressClasses: Record<MetricTone, string> = {
  blue: 'text-blue-600 dark:text-blue-300',
  green: 'text-emerald-600 dark:text-emerald-300',
  red: 'text-rose-600 dark:text-rose-300',
  amber: 'text-amber-600 dark:text-amber-300',
};

const descriptionClasses: Record<MetricTone, string> = {
  blue: 'text-blue-600 dark:text-blue-300',
  green: 'text-emerald-600 dark:text-emerald-300',
  red: 'text-rose-600 dark:text-rose-300',
  amber: 'text-amber-600 dark:text-amber-300',
};

const progressBarClasses: Record<MetricTone, string> = {
  blue: 'bg-[#172554] dark:bg-[#2f7cf6]',
  green: 'bg-[#172554] dark:bg-[#2f7cf6]',
  red: 'bg-[#172554] dark:bg-[#2f7cf6]',
  amber: 'bg-[#172554] dark:bg-[#2f7cf6]',
};

function getDescriptionColorClass(description: string, tone: MetricTone) {
  const descriptionTrimmed = description.trim();

  if (/^\+/.test(descriptionTrimmed)) {
    return 'text-emerald-600 dark:text-emerald-300';
  }

  if (/^-/.test(descriptionTrimmed)) {
    return 'text-rose-600 dark:text-rose-300';
  }

  return descriptionClasses[tone];
}

export function MetricCard({ title, value, description, tone, progress }: MetricCardProps) {
  const descriptionClass = getDescriptionColorClass(description, tone);

  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-slate-300/80 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-slate-700">
      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-[#172554] dark:text-white">{title}</p>
        <strong className="mt-1 block truncate text-lg font-bold text-slate-950 dark:text-white">
          {value}
        </strong>
        {progress !== undefined ? (
          <div className="mt-3">
            <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>
            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full rounded-full ${progressBarClasses[tone]}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <p className={`mt-2 truncate text-xs font-semibold ${descriptionClass}`}>
            {description}
          </p>
        )}
      </div>
    </article>
  );
}
