import httpx

from app.schemas import CompanyLookup, only_digits


class BrasilApiError(RuntimeError):
    pass


async def lookup_cnpj(cnpj: str) -> CompanyLookup:
    digits = only_digits(cnpj)

    if len(digits) != 14:
        raise BrasilApiError("CNPJ inválido. Digite 14 números.")

    async with httpx.AsyncClient(timeout=12) as client:
        response = await client.get(f"https://brasilapi.com.br/api/cnpj/v1/{digits}")

    if response.status_code == 404:
        raise BrasilApiError("CNPJ não encontrado.")

    if response.is_error:
        raise BrasilApiError("Erro ao consultar CNPJ na BrasilAPI.")

    data = response.json()

    return CompanyLookup(
        cnpj=data["cnpj"],
        legal_name=data["razao_social"],
        trade_name=data.get("nome_fantasia") or None,
        registration_status=data["descricao_situacao_cadastral"],
        main_cnae=data["cnae_fiscal_descricao"],
        street=data["logradouro"],
        number=data["numero"] or "S/N",
        district=data["bairro"],
        city=data["municipio"],
        state=data["uf"],
        opened_at=data["data_inicio_atividade"],
    )
