import { NotificationDropdown } from '../ui/NotificationDropdown';
import { ThemeToggle } from '../ui/ThemeToggle';

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-3 py-3 backdrop-blur dark:border-slate-800 dark:bg-[#0b111d]/90 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Abrir menu"
          >
            <span className="h-0.5 w-5 bg-current shadow-[0_6px_0_current,0_-6px_0_current]" />
          </button>
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:flex"
            aria-label="Menu"
          >
            <span className="h-0.5 w-5 bg-current shadow-[0_6px_0_current,0_-6px_0_current]" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-slate-950 dark:text-white">Dashboard</h1>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              Visão geral do seu negócio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:flex">
            <span className="text-slate-400">Cal</span>
            01/05/2024 - 31/05/2024
            <span className="text-slate-400">v</span>
          </div>
          <button
            type="button"
            className="hidden h-9 rounded-lg bg-blue-900 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 sm:block"
          >
            + Novo lançamento
          </button>
          <ThemeToggle />
          <NotificationDropdown />
          <div className="flex items-center gap-2 rounded-xl px-1 py-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-xs font-bold text-white dark:bg-blue-600">
              JS
            </div>
            <div className="hidden leading-tight xl:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white">João Silva</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">MEI</p>
            </div>
            <span className="hidden text-xs text-slate-400 xl:block">v</span>
          </div>
        </div>
      </div>
    </header>
  );
}
