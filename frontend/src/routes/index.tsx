import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../components/layout/Layout';
import { Categorias } from '../pages/private/Cadastros/Categorias';
import { Clientes } from '../pages/private/Cadastros/Clientes';
import { Fornecedores } from '../pages/private/Cadastros/Fornecedores';
import { Historico } from '../pages/private/Das/Historico';
import { GerarDas } from '../pages/private/Das/Gerar';
import { Empresa } from '../pages/private/Configuracoes/Empresa';
import { Usuario } from '../pages/private/Configuracoes/Usuario';
import { Dashboard } from '../pages/private/Dashboard';
import { Despesas } from '../pages/private/Financeiro/Despesas';
import { Faturamento } from '../pages/private/Financeiro/Faturamento';
import { Nfe } from '../pages/private/Notas/Nfe';
import { Nfse } from '../pages/private/Notas/Nfse';
import { Anual } from '../pages/private/Relatorios/Anual';
import { Mensal } from '../pages/private/Relatorios/Mensal';
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
        <Route path="notas/nfse" element={<Nfse />} />
        <Route path="notas/nfe" element={<Nfe />} />
        <Route path="das/gerar" element={<GerarDas />} />
        <Route path="das/historico" element={<Historico />} />
        <Route path="relatorios/mensal" element={<Mensal />} />
        <Route path="relatorios/anual" element={<Anual />} />
        <Route path="cadastros/clientes" element={<Clientes />} />
        <Route path="cadastros/categorias" element={<Categorias />} />
        <Route path="cadastros/fornecedores" element={<Fornecedores />} />
        <Route path="configuracoes/empresa" element={<Empresa />} />
        <Route path="configuracoes/usuario" element={<Usuario />} />
      </Route>
    </Routes>
  );
}
