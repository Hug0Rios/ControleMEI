import type { ReactNode } from 'react';

type ChartCardProps = {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function ChartCard({ title, children, action, className = '' }: ChartCardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/95 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-blue-950 dark:text-blue-100">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
