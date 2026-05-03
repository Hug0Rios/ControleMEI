# ControleMEI

Sistema para controle financeiro e operacional de Microempreendedores Individuais (MEI).

## Sobre o Projeto

O ControleMEI ajuda pequenos negocios a acompanhar receitas, despesas, limite anual do MEI, empresas cadastradas e obrigacoes do dia a dia em uma interface simples e profissional.

## Funcionalidades Atuais

- Dashboard financeiro
- Cadastro de empresas com consulta de CNPJ
- Backend FastAPI com PostgreSQL
- Docker Compose para rodar frontend, backend e banco
- Estrutura preparada para notas fiscais, DAS e relatorios

## Estrutura

- `frontend/`: aplicacao React/Vite.
- `backend/`: API FastAPI.
- `docker-compose.yml`: orquestracao local com PostgreSQL, backend e frontend.
- `assets/`: arquivos visuais do projeto.

## Rodando Tudo com Docker

```bash
docker compose up --build
```

Depois abra:

- Frontend: `http://127.0.0.1:8080`
- Backend: `http://127.0.0.1:8000`
- Documentacao da API: `http://127.0.0.1:8000/docs`

Esse e o caminho mais simples para outro desenvolvedor do projeto rodar tudo igual na propria maquina.

## Rodando Separado para Desenvolvimento

Suba apenas o banco:

```bash
docker compose up -d postgres
```

Rode o backend:

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Rode o frontend:

```bash
cd frontend
npm install
npm run dev
```

O frontend de desenvolvimento fica em `http://127.0.0.1:5173`.

## Tecnologias

- React
- Vite
- TypeScript
- Tailwind CSS
- FastAPI
- PostgreSQL
- Docker

## Autores

- Hugo Rios
- Mauricio Zenao
