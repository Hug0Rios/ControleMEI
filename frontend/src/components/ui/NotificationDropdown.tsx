import { useMemo, useState } from 'react';

import type { NotificationType } from '../../mocks/notifications.mock';
import { getNotifications } from '../../services/notifications.service';

const typeClasses: Record<NotificationType, string> = {
  alert: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  info: 'bg-blue-50 text-[#172554] dark:bg-blue-500/10 dark:text-blue-300',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
};

export function NotificationDropdown() {
  const notifications = useMemo(() => getNotifications(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500"
        aria-label="Notificações"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-30 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
          <div className="mb-2 flex items-center justify-between gap-3">
            <strong className="text-sm text-slate-950 dark:text-white">Notificações</strong>
            <button
              type="button"
              onClick={() => setUnreadCount(0)}
              className="text-xs font-semibold text-[#172554] hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
            >
              Marcar todas como lidas
            </button>
          </div>

          <div className="space-y-2">
            {notifications.map((notification) => (
              <article
                key={notification.id}
                className="rounded-xl border border-slate-100 p-3 dark:border-slate-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`rounded-lg px-2 py-1 text-[10px] font-bold uppercase ${typeClasses[notification.type]}`}
                  >
                    {notification.type}
                  </span>
                  <span className="text-[11px] text-slate-400">{notification.time}</span>
                </div>
                <h3 className="mt-2 text-xs font-bold text-slate-950 dark:text-white">
                  {notification.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {notification.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
