import { useState } from 'react';
import { NavLink } from 'react-router-dom';
const Logo = '/logo.png';

type NavigationItem = {
  label: string;
  icon: string;
  to?: string;
  children?: {
    label: string;
    to: string;
  }[];
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigation: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: 'D',
    to: '/app/dashboard',
  },
  {
    label: 'Financeiro',
    icon: 'F',
    children: [
      { label: 'Faturamento', to: '/app/financeiro/faturamento' },
      { label: 'Despesas', to: '/app/financeiro/despesas' },
    ],
  },
  {
    label: 'Notas Fiscais',
    icon: 'N',
    children: [
      { label: 'NFS-e', to: '/app/notas/nfse' },
      { label: 'NF-e', to: '/app/notas/nfe' },
    ],
  },
  {
    label: 'DAS MEI',
    icon: 'M',
    children: [
      { label: 'Gerar DAS', to: '/app/das/gerar' },
      { label: 'Histórico', to: '/app/das/historico' },
    ],
  },
  {
    label: 'Relatórios',
    icon: 'R',
    children: [
      { label: 'Relatórios Mensais', to: '/app/relatorios/mensal' },
      { label: 'Relatórios Anuais', to: '/app/relatorios/anual' },
    ],
  },
  {
    label: 'Cadastros',
    icon: 'C',
    children: [
      { label: 'Clientes', to: '/app/cadastros/clientes' },
      { label: 'Categorias', to: '/app/cadastros/categorias' },
      { label: 'Fornecedores', to: '/app/cadastros/fornecedores' },
    ],
  },
  {
    label: 'Configurações',
    icon: 'S',
    children: [
      { label: 'Empresa', to: '/app/configuracoes/empresa' },
      { label: 'Usuário', to: '/app/configuracoes/usuario' },
    ],
  },
];

const defaultOpenGroups = ['Financeiro', 'Notas Fiscais', 'DAS MEI', 'Relatórios'];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [openGroups, setOpenGroups] = useState<string[]>(defaultOpenGroups);

  function toggleGroup(label: string) {
    setOpenGroups((currentGroups) =>
      currentGroups.includes(label)
        ? currentGroups.filter((group) => group !== label)
        : [...currentGroups, label],
    );
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
        className={`fixed bottom-3 left-3 top-3 z-40 w-[264px] rounded-2xl border border-white/10 bg-blue-950 p-3 pl-2 text-white shadow-xl shadow-blue-950/25 transition-transform dark:border-slate-700/60 dark:bg-slate-900 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-[110%]'
        }`}
      >
        <div className="mb-3 flex justify-center overflow-hidden rounded-lg py-2">
          <img src={Logo} alt="Logo" className="h-20 w-full object-cover" />
        </div>

        <nav className="space-y-1 overflow-y-auto pr-1 lg:max-h-[calc(100vh-96px)]">
          {navigation.map((item) => {
            const isGroupOpen = openGroups.includes(item.label);

            if (item.to) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition',
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/25'
                        : 'text-blue-50/80 hover:bg-white/10 hover:text-white',
                    ].join(' ')
                  }
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px]">
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              );
            }

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(item.label)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-blue-50/85 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px]">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <span className={`text-xs transition ${isGroupOpen ? 'rotate-180' : ''}`}>v</span>
                </button>

                {isGroupOpen && (
                  <div className="ml-8 mt-1 space-y-1 border-l border-white/10 pl-3">
                    {item.children?.map((child) => (
                      <span
                        key={child.to}
                        className="block cursor-default rounded-lg px-2 py-1.5 text-xs font-medium text-blue-50/60"
                      >
                        {child.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-blue-50/85 transition hover:bg-white/10 hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px]">
              X
            </span>
            Sair
          </button>
        </nav>
      </aside>
    </>
  );
}
