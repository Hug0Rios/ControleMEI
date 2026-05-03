import { useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'meu-mei-brasil-theme';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);

  return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove('light', 'dark');
  root.classList.add(theme);

  root.style.colorScheme = theme;
  root.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const isDark = theme === 'dark';

  useLayoutEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <label className="relative inline-flex h-8 w-16 cursor-pointer items-center rounded-full border border-slate-200 bg-slate-100 p-1 shadow-inner transition dark:border-slate-700 dark:bg-slate-800">
      <span className="sr-only">Alternar tema</span>
      <input
        type="checkbox"
        checked={isDark}
        onChange={(event) => setTheme(event.target.checked ? 'dark' : 'light')}
        className="sr-only"
      />
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-amber-500">
        ☀
      </span>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-blue-300">
        ☾
      </span>
      <span
        className={`relative z-10 block h-6 w-6 rounded-full bg-white shadow-sm transition dark:bg-blue-500 ${
          isDark ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
    </label>
  );
}
