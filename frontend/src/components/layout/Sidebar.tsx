import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Calendar1,
  CircleDollarSign,
  Building2,
  ClipboardClock,
  ClipboardPlus,
  BookText,
  FileText,
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  Users,
  type LucideIcon,
  ClipboardList,
} from 'lucide-react';

type NavigationChild = {
  label: string;
  to: string;
  icon: LucideIcon;
};

type NavigationItem = {
  label: string;
  icon: LucideIcon;
  to?: string;
  children?: NavigationChild[];
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onExpandedChange: (isExpanded: boolean) => void;
};

const navigation: NavigationItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/app/dashboard' },
  {
    label: 'Financeiro',
    icon: CircleDollarSign,
    children: [
      { label: 'Faturamento', to: '/app/financeiro/faturamento', icon: BanknoteArrowUp },
      { label: 'Despesas', to: '/app/financeiro/despesas', icon: BanknoteArrowDown },
    ],
  },
  {
    label: 'Notas Fiscais',
    icon: Receipt,
    to: '/app/notas',
  },
  {
    label: 'DAS Mensal',
    icon: ClipboardList,
    children: [
      { label: 'Gerar DAS', to: '/app/das/gerar', icon: ClipboardPlus },
      { label: 'Historico', to: '/app/das/historico', icon: ClipboardClock },
    ],
  },
  {
    label: 'Declaração Anual',
    icon: Calendar1,
    children: [
      { label: 'Visão Geral', to: '/app/declaracao-anual/visao-geral', icon: FileText },
      { label: 'Dados', to: '/app/declaracao-anual/dados', icon: BookText },
    ],
  },
  {
    label: 'Relatorios',
    icon: BarChart3,
    to: '/app/relatorios',
  },
  {
    label: 'Configuracoes',
    icon: Settings,
    children: [
      { label: 'Empresa', to: '/app/configuracoes/empresa', icon: Building2 },
      { label: 'Usuario', to: '/app/configuracoes/usuario', icon: Users },
    ],
  },
];

const autoOpenGroupPrefixes: Record<string, string> = {
  Financeiro: '/app/financeiro',
  'DAS MEI': '/app/das',
  'Declaração Anual': '/app/declaracao-anual',
  Configuracoes: '/app/configuracoes',
};

function getOpenGroupsForPath(pathname: string) {
  return Object.entries(autoOpenGroupPrefixes)
    .filter(([, prefix]) => pathname.startsWith(prefix))
    .map(([label]) => label);
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function isItemActive(pathname: string, item: NavigationItem) {
  return pathname === item.to || Boolean(item.children?.some((child) => child.to === pathname));
}

function itemClass(isActive: boolean, isExpanded: boolean) {
  return [
    'flex min-h-11 w-full items-center rounded-2xl text-sm font-semibold transition',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300',
    isExpanded ? 'gap-3 px-3' : 'justify-center px-0',
    isActive
      ? 'bg-white text-[#172554] shadow-sm dark:bg-blue-500 dark:text-white'
      : 'text-blue-100/75 hover:bg-white/10 hover:text-white',
  ].join(' ');
}

function childLinkClass(isActive: boolean) {
  return [
    'block rounded-xl px-3 py-2 text-xs font-medium transition',
    isActive
      ? 'bg-white/15 text-white'
      : 'text-blue-100/60 hover:bg-white/10 hover:text-white',
  ].join(' ');
}

export function Sidebar({ isOpen, onClose, onExpandedChange }: SidebarProps) {
  const { pathname } = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const isDashboard = pathname === '/app/dashboard';
  const [openGroup, setOpenGroup] = useState<string | null>(() => (isDashboard ? null : getOpenGroupsForPath(pathname)[0] ?? null));
  const isExpanded = isOpen || isHovered;

  useEffect(() => {
    onExpandedChange(isExpanded);
  }, [isExpanded, onExpandedChange]);

  useEffect(() => {
    const selectedGroup = isDashboard ? null : getOpenGroupsForPath(pathname)[0] ?? null;
    setOpenGroup(selectedGroup);
  }, [isDashboard, pathname]);

  function toggleGroup(label: string) {
    setOpenGroup((currentGroup) => (currentGroup === label ? null : label));
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={onClose}
          aria-label="Fechar menu"
        />
      )}

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={[
          'fixed bottom-4 left-4 top-4 z-40 flex flex-col rounded-[28px] border p-3 text-white shadow-2xl transition-all duration-300',
          'border-blue-300/20 bg-blue-950 shadow-blue-950/25 dark:border-blue-400/10 dark:bg-[#0b3bc7]',
          isExpanded ? 'w-[272px]' : 'w-[76px]',
          isOpen ? 'translate-x-0' : '-translate-x-[120%] lg:translate-x-0',
        ].join(' ')}
      >
        <Link
          to="/app/dashboard"
          onClick={onClose}
          className={[
            'mb-4 flex min-h-12 items-center rounded-2xl transition',
            isExpanded ? 'justify-between gap-3 px-3' : 'justify-center px-0',
          ].join(' ')}
        >
          <img src="/favicon-white.ico" alt="Logo Meu MEI Brasil" className="h-8 w-8" />
          {isExpanded && (
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-sm text-white">Meu MEI Brasil</strong>
              <span className="block truncate text-[11px] text-blue-100/65">Controle do MEI</span>
            </span>
          )}
        </Link>

        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden pr-0.5">
          {navigation.map((item) => {
            const isActive = isItemActive(pathname, item);
            const isGroupOpen = openGroup === item.label;
            const hasChildren = Boolean(item.children?.length);
            const Icon = item.icon;

            if (hasChildren) {
              return (
                <div key={item.label} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.label)}
                    className={itemClass(isActive, isExpanded)}
                    title={!isExpanded ? item.label : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    {isExpanded && (
                      <>
                        <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
                        <ChevronIcon isOpen={isGroupOpen} />
                      </>
                    )}
                  </button>

                  {isExpanded && isGroupOpen && (
                    <div className="ml-6 space-y-1 border-l border-white/10 pl-3">
                      {item.children?.map((child) => {
                        const ChildIcon = child.icon;

                        return (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={onClose}
                            className={({ isActive }) => childLinkClass(isActive)}
                          >
                            <span className="flex items-center gap-2">
                              <ChildIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                              <span>{child.label}</span>
                            </span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to ?? '/app/dashboard'}
                onClick={onClose}
                className={({ isActive }) => itemClass(isActive, isExpanded)}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                {isExpanded && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-white/10 pt-4">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) => itemClass(isActive, isExpanded)}
            title={!isExpanded ? 'Sair' : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
            {isExpanded && <span className="min-w-0 flex-1 truncate">Sair</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
