import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 transition-colors dark:bg-[#0b111d] dark:text-slate-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="min-h-screen lg:pl-[284px]">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="px-3 pb-5 pt-3 sm:px-4 lg:px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
