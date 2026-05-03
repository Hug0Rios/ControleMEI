import { NavLink, useLocation } from 'react-router-dom';

const Logo = '/logo.png';

type NavigationChild = {
  label: string;
  to: string;
};

type NavigationItem = {
  label: string;
  to: string;
  children?: NavigationChild[];
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigation: NavigationItem[] = [
  {
    label: 'Dashboard',
    to: '/app/dashboard',
  },
  {
    label: 'Financeiro',
    to: '/app/financeiro/faturamento',
    children: [
      { label: 'Faturamento', to: '/app/financeiro/faturamento' },
      { label: 'Despesas', to: '/app/financeiro/despesas' },
    ],
  },
  {
    label: 'Notas Fiscais',
    to: '/app/notas/nfse',
    children: [
      { label: 'NFS-e', to: '/app/notas/nfse' },
      { label: 'NF-e', to: '/app/notas/nfe' },
    ],
  },
  {
    label: 'DAS MEI',
    to: '/app/das/gerar',
    children: [
      { label: 'Gerar DAS', to: '/app/das/gerar' },
      { label: 'Histórico', to: '/app/das/historico' },
    ],
  },
  {
    label: 'Relatórios',
    to: '/app/relatorios/mensal',
    children: [
      { label: 'Relatórios Mensais', to: '/app/relatorios/mensal' },
      { label: 'Relatórios Anuais', to: '/app/relatorios/anual' },
    ],
  },
  {
    label: 'Cadastros',
    to: '/app/cadastros/clientes',
    children: [
      { label: 'Clientes', to: '/app/cadastros/clientes' },
      { label: 'Empresas', to: '/app/cadastros/empresas' },
      { label: 'Categorias', to: '/app/cadastros/categorias' },
      { label: 'Fornecedores', to: '/app/cadastros/fornecedores' },
    ],
  },
  {
    label: 'Configurações',
    to: '/app/configuracoes/empresa',
    children: [
      { label: 'Empresa', to: '/app/configuracoes/empresa' },
      { label: 'Usuário', to: '/app/configuracoes/usuario' },
    ],
  },
];

function parentLinkClass(isActive: boolean) {
  return [
    'group relative flex min-h-10 items-center rounded-xl px-4 text-sm font-semibold transition',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300',
    isActive
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/25'
      : 'text-slate-300 hover:bg-white/[0.08] hover:text-white',
  ].join(' ');
}

function childLinkClass(isActive: boolean) {
  return [
    'relative block rounded-lg px-4 py-2 text-sm font-medium transition',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300',
    isActive
      ? 'bg-white/10 text-white'
      : 'text-slate-400 hover:bg-white/[0.08] hover:text-slate-100',
  ].join(' ');
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { pathname } = useLocation();

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
        className={`fixed bottom-3 left-3 top-3 z-40 w-[264px] rounded-2xl border border-white/10 bg-slate-950 p-3 text-white shadow-xl shadow-blue-950/25 transition-transform dark:border-slate-700/60 dark:bg-slate-900 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-[110%]'
        }`}
      >
        <div className="mb-4 flex justify-center overflow-hidden rounded-lg px-2 py-2">
          <img src={Logo} alt="Meu MEI Brasil" className="h-20 w-full object-contain" />
        </div>

        <nav className="space-y-1 overflow-y-auto pr-1 lg:max-h-[calc(100vh-104px)]">
          {navigation.map((item) => {
            const isGroupActive =
              pathname === item.to || Boolean(item.children?.some((child) => child.to === pathname));

            return (
              <div key={item.label} className="space-y-1">
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={() => parentLinkClass(isGroupActive)}
                >
                  <span className="truncate">{item.label}</span>
                </NavLink>

                {item.children && (
                  <div className="space-y-0.5 pb-2 pl-5">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={onClose}
                        className={({ isActive }) => childLinkClass(isActive)}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <NavLink to="/" onClick={onClose} className={({ isActive }) => parentLinkClass(isActive)}>
            Sair
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
