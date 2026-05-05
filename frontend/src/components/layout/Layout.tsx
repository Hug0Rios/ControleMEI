import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { pathname } = useLocation();
  const isDashboard = pathname === '/app/dashboard';

  useEffect(() => {
    if (!isDashboard) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isDashboard]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 transition-colors dark:bg-[#0b111d] dark:text-slate-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onExpandedChange={setIsSidebarExpanded}
      />
      <div
        className={`flex min-h-screen flex-col overflow-hidden transition-[padding] duration-300 ${
          isSidebarExpanded ? 'lg:pl-[304px]' : 'lg:pl-[108px]'
        }`}
      >
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="px-3 pb-5 pt-3 sm:px-4 lg:px-4">
          <Outlet />
        </main>
        <footer className="mt-auto border-t border-slate-200/80 bg-white/0 px-3 py-3 backdrop-blur dark:border-slate-800 dark:bg-[#0b111d]/90 sm:px-4 lg:px-4">
          <div className="min-h-9" aria-hidden="true" />
        </footer>
      </div>
    </div>
  );
}
