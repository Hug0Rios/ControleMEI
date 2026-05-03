import { FormEvent, useEffect, useMemo, useState } from 'react';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import {
  cadastrarEmpresa,
  consultarEmpresaPorCnpj,
  listarEmpresas,
  removerEmpresa,
} from '../../../services/companies.service';
import { EmpresaCnpj, formatarCNPJ } from '../../../services/cnpj.service';

const empresaInicial: EmpresaCnpj = {
  cnpj: '',
  razaoSocial: '',
  nomeFantasia: '',
  situacao: '',
  cnaePrincipal: '',
  endereco: {
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
  },
  dataAbertura: '',
};

function campoVazio(value: string, fallback = '-') {
  return value.trim() || fallback;
}

function CadastroField({
  label,
  value,
  placeholder,
  className = '',
}: {
  label: string;
  value: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <Input value={value} placeholder={placeholder} readOnly className="bg-slate-50 dark:bg-slate-950" />
    </label>
  );
}

export function Empresas() {
  const [cnpj, setCnpj] = useState('');
  const [empresa, setEmpresa] = useState<EmpresaCnpj>(empresaInicial);
  const [empresas, setEmpresas] = useState<EmpresaCnpj[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function carregarEmpresas() {
      try {
        const dados = await listarEmpresas();
        setEmpresas(dados);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar as empresas.');
      } finally {
        setIsFetching(false);
      }
    }

    void carregarEmpresas();
  }, []);

  const empresasFiltradas = useMemo(() => {
    const termo = search.trim().toLowerCase();

    if (!termo) {
      return empresas;
    }

    return empresas.filter((item) => {
      const texto = `${item.cnpj} ${item.razaoSocial} ${item.nomeFantasia} ${item.endereco.cidade} ${item.endereco.uf}`;
      return texto.toLowerCase().includes(termo);
    });
  }, [empresas, search]);

  async function handleConsultar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const dados = await consultarEmpresaPorCnpj(cnpj);
      setEmpresa(dados);
      setCnpj(formatarCNPJ(dados.cnpj));
    } catch (err) {
      setEmpresa(empresaInicial);
      setError(err instanceof Error ? err.message : 'Não foi possível consultar o CNPJ.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCadastrar() {
    setError('');
    setSuccess('');

    if (!empresa.cnpj) {
      setError('Consulte um CNPJ antes de cadastrar a empresa.');
      return;
    }

    setIsSaving(true);

    try {
      const cadastrada = await cadastrarEmpresa(empresa);
      setEmpresas((current) => [cadastrada, ...current]);
      setEmpresa(cadastrada);
      setCnpj(formatarCNPJ(cadastrada.cnpj));
      setSuccess('Empresa cadastrada com sucesso.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível cadastrar a empresa.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleRemover(item: EmpresaCnpj) {
    if (!item.id) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      await removerEmpresa(item.id);
      setEmpresas((current) => current.filter((empresaAtual) => empresaAtual.id !== item.id));
      setSuccess('Empresa removida com sucesso.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível remover a empresa.');
    }
  }

  function handleSelecionar(item: EmpresaCnpj) {
    setEmpresa(item);
    setCnpj(formatarCNPJ(item.cnpj));
    setError('');
    setSuccess('Empresa carregada no painel.');
  }

  function handleLimpar() {
    setCnpj('');
    setEmpresa(empresaInicial);
    setError('');
    setSuccess('');
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Cadastro de Empresas</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Consulte o CNPJ no backend e cadastre empresas para usar no sistema.
            </p>
          </div>

          <span className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
            {empresas.length} cadastrada{empresas.length === 1 ? '' : 's'}
          </span>
        </div>

        <form onSubmit={handleConsultar} className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_auto_auto]">
          <label>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              CNPJ
            </span>
            <Input
              value={cnpj}
              onChange={(event) => setCnpj(formatarCNPJ(event.target.value))}
              placeholder="00.000.000/0000-00"
              inputMode="numeric"
              autoComplete="off"
            />
          </label>

          <Button
            type="submit"
            disabled={isLoading}
            className="self-end bg-blue-700 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Consultando...' : 'Consultar CNPJ'}
          </Button>

          <Button
            type="button"
            onClick={handleLimpar}
            className="self-end border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Limpar
          </Button>
        </form>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
            {success}
          </div>
        )}
      </Card>

      <Card>
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">Dados consultados</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Revise as informações antes de cadastrar no banco.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleCadastrar}
            disabled={!empresa.cnpj || isSaving}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? 'Salvando...' : 'Cadastrar empresa'}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CadastroField label="Razão Social" value={empresa.razaoSocial} placeholder="Empresa não consultada" />
          <CadastroField label="Nome Fantasia" value={empresa.nomeFantasia} placeholder="Não informado" />
          <CadastroField label="Situação" value={empresa.situacao} placeholder="Empresa não consultada" />
          <CadastroField
            label="CNAE Principal"
            value={empresa.cnaePrincipal}
            placeholder="Empresa não consultada"
            className="xl:col-span-2"
          />
          <CadastroField label="Data de Abertura" value={empresa.dataAbertura} placeholder="Empresa não consultada" />
          <CadastroField label="Logradouro" value={empresa.endereco.logradouro} placeholder="Empresa não consultada" />
          <CadastroField label="Número" value={empresa.endereco.numero} placeholder="S/N" />
          <CadastroField label="Bairro" value={empresa.endereco.bairro} placeholder="Empresa não consultada" />
          <CadastroField label="Cidade" value={empresa.endereco.cidade} placeholder="Empresa não consultada" />
          <CadastroField label="UF" value={empresa.endereco.uf} placeholder="UF" />
        </div>
      </Card>

      <Card>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">Empresas cadastradas</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Empresas salvas no banco PostgreSQL.
            </p>
          </div>

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome, CNPJ ou cidade"
            className="md:max-w-xs"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full min-w-[840px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Empresa</th>
                <th className="px-4 py-3 font-semibold">CNPJ</th>
                <th className="px-4 py-3 font-semibold">Situação</th>
                <th className="px-4 py-3 font-semibold">Cidade/UF</th>
                <th className="px-4 py-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {empresasFiltradas.map((item) => (
                <tr key={item.id ?? item.cnpj} className="text-slate-700 dark:text-slate-200">
                  <td className="px-4 py-4">
                    <strong className="block text-slate-950 dark:text-white">{item.razaoSocial}</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {campoVazio(item.nomeFantasia, 'Sem nome fantasia')}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium">{formatarCNPJ(item.cnpj)}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                      {campoVazio(item.situacao)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {campoVazio(item.endereco.cidade)}
                    {item.endereco.uf ? `/${item.endereco.uf}` : ''}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelecionar(item)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Abrir
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemover(item)}
                        className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-200 dark:hover:bg-rose-500/10"
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {empresasFiltradas.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400" colSpan={5}>
                    {isFetching ? 'Carregando empresas...' : 'Nenhuma empresa cadastrada.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
