# ControleMEI Backend

API inicial do ControleMEI com FastAPI, PostgreSQL e integração com BrasilAPI para consulta de CNPJ.

## Rodando localmente

1. Suba o banco:

```bash
docker compose up -d postgres
```

2. Crie e ative um ambiente virtual dentro de `backend/`.

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

4. Copie `.env.example` para `.env` e ajuste se necessário.

5. Rode a API:

```bash
uvicorn app.main:app --reload --port 8000
```

O PostgreSQL do projeto fica exposto em `localhost:5433` para evitar conflito com bancos locais que já usam a porta `5432`.

## Endpoints principais

- `GET /health`
- `GET /api/v1/companies`
- `POST /api/v1/companies`
- `GET /api/v1/companies/{company_id}`
- `DELETE /api/v1/companies/{company_id}`
- `GET /api/v1/companies/lookup/{cnpj}`
