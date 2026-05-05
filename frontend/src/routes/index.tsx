import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../components/layout/Layout';
import { Categorias } from '../pages/private/Cadastros/Categorias';
import { Clientes } from '../pages/private/Cadastros/Clientes';
import { Empresas } from '../pages/private/Cadastros/Empresas';
import { Fornecedores } from '../pages/private/Cadastros/Fornecedores';
import { Historico } from '../pages/private/Das/Historico';
import { GerarDas } from '../pages/private/Das/Gerar';
import { Empresa } from '../pages/private/Configuracoes/Empresa';
import { Usuario } from '../pages/private/Configuracoes/Usuario';
import { Dashboard } from '../pages/private/Dashboard';
import { Despesas } from '../pages/private/Financeiro/Despesas';
import { Faturamento } from '../pages/private/Financeiro/Faturamento';
import { Notas } from '../pages/private/Notas';
import { Relatorios } from '../pages/private/Relatorios';
import { Landing } from '../pages/public/Landing';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/app" element={<Layout />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="financeiro/faturamento" element={<Faturamento />} />
        <Route path="financeiro/despesas" element={<Despesas />} />
        <Route path="notas" element={<Notas />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="das/gerar" element={<GerarDas />} />
        <Route path="das/historico" element={<Historico />} />
        <Route path="cadastros/clientes" element={<Clientes />} />
        <Route path="cadastros/empresas" element={<Empresas />} />
        <Route path="cadastros/categorias" element={<Categorias />} />
        <Route path="cadastros/fornecedores" element={<Fornecedores />} />
        <Route path="configuracoes/empresa" element={<Empresa />} />
        <Route path="configuracoes/usuario" element={<Usuario />} />
      </Route>
    </Routes>
  );
}
