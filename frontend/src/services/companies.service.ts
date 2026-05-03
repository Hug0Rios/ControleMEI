import type { EmpresaCnpj } from './cnpj.service';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api/v1';

type ApiCompany = {
  id?: number;
  cnpj: string;
  legal_name: string;
  trade_name: string | null;
  registration_status: string;
  main_cnae: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  opened_at: string;
};

function mapCompany(company: ApiCompany): EmpresaCnpj {
  return {
    id: company.id,
    cnpj: company.cnpj,
    razaoSocial: company.legal_name,
    nomeFantasia: company.trade_name ?? '',
    situacao: company.registration_status,
    cnaePrincipal: company.main_cnae,
    endereco: {
      logradouro: company.street,
      numero: company.number,
      bairro: company.district,
      cidade: company.city,
      uf: company.state,
    },
    dataAbertura: company.opened_at,
  };
}

function mapPayload(company: EmpresaCnpj): ApiCompany {
  return {
    cnpj: company.cnpj,
    legal_name: company.razaoSocial,
    trade_name: company.nomeFantasia || null,
    registration_status: company.situacao,
    main_cnae: company.cnaePrincipal,
    street: company.endereco.logradouro,
    number: company.endereco.numero,
    district: company.endereco.bairro,
    city: company.endereco.cidade,
    state: company.endereco.uf,
    opened_at: company.dataAbertura,
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail ?? 'Não foi possível completar a operação.');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function consultarEmpresaPorCnpj(cnpj: string) {
  const company = await request<ApiCompany>(`/companies/lookup/${cnpj.replace(/\D/g, '')}`);
  return mapCompany(company);
}

export async function listarEmpresas(search?: string) {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  const companies = await request<ApiCompany[]>(`/companies${params}`);
  return companies.map(mapCompany);
}

export async function cadastrarEmpresa(company: EmpresaCnpj) {
  const created = await request<ApiCompany>('/companies', {
    method: 'POST',
    body: JSON.stringify(mapPayload(company)),
  });

  return mapCompany(created);
}

export async function removerEmpresa(id: number) {
  await request<void>(`/companies/${id}`, { method: 'DELETE' });
}
