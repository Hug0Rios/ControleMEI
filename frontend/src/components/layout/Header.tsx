import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { NotificationDropdown } from '../ui/NotificationDropdown';
import { ThemeToggle } from '../ui/ThemeToggle';

const ACTIVE_COMPANY_STORAGE_KEY = 'controlemei.activeCompanyName';

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const [companyName, setCompanyName] = useState('sua empresa');

  useEffect(() => {
    function syncCompanyName() {
      const storedCompanyName = window.localStorage.getItem(ACTIVE_COMPANY_STORAGE_KEY);
      setCompanyName(storedCompanyName?.trim() || 'sua empresa');
    }

    syncCompanyName();
    window.addEventListener('storage', syncCompanyName);

    return () => window.removeEventListener('storage', syncCompanyName);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/0 px-3 py-3 backdrop-blur dark:border-slate-800 dark:bg-[#0b111d]/90 sm:px-4">
      <div className="flex min-h-9 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Abrir menu"
          >
            <span className="h-0.5 w-5 bg-current shadow-[0_6px_0_current,0_-6px_0_current]" />
          </button>

          <div className="hidden min-w-0 sm:flex">
            <span className="truncate text-sm font-medium text-slate-600 dark:text-slate-300">
              Bem vindo(a), {companyName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationDropdown />
          
        </div>
      </div>
    </header>
  );
}
