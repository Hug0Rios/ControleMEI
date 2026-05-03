export type CnpjResponse = {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;
  descricao_situacao_cadastral: string;
  cnae_fiscal_descricao: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  data_inicio_atividade: string;
};

export type EmpresaCnpj = {
  id?: number;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  situacao: string;
  cnaePrincipal: string;
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  dataAbertura: string;
};

export async function consultarCNPJ(cnpj: string): Promise<EmpresaCnpj> {
  const cnpjLimpo = cnpj.replace(/\D/g, '');

  if (cnpjLimpo.length !== 14) {
    throw new Error('CNPJ inválido. Digite 14 números.');
  }

  const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);

  if (!response.ok) {
    throw new Error('CNPJ não encontrado ou erro na consulta.');
  }

  const dados: CnpjResponse = await response.json();

  return {
    cnpj: dados.cnpj,
    razaoSocial: dados.razao_social,
    nomeFantasia: dados.nome_fantasia ?? '',
    situacao: dados.descricao_situacao_cadastral,
    cnaePrincipal: dados.cnae_fiscal_descricao,
    endereco: {
      logradouro: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      cidade: dados.municipio,
      uf: dados.uf,
    },
    dataAbertura: dados.data_inicio_atividade,
  };
}

export function formatarCNPJ(cnpj: string) {
  return cnpj
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}
