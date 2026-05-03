# ControleMEI
site voltado para o controle interno de micro empreendedores individuais MEI

## Estrutura

- `frontend/`: aplicação React/Vite.
- `backend/`: API FastAPI.
- `docker-compose.yml`: PostgreSQL local do projeto.

## Rodando o backend

## Rodando tudo com Docker

```bash
docker compose up --build
```

Depois abra:

- Frontend: `http://127.0.0.1:8080`
- Backend: `http://127.0.0.1:8000`
- Documentação da API: `http://127.0.0.1:8000/docs`

Esse é o caminho mais simples para outro desenvolvedor do projeto rodar tudo igual na própria máquina.

## Rodando separado para desenvolvimento

```bash
docker compose up -d postgres
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

A API fica em `http://127.0.0.1:8000`.

## Rodando o frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend fica em `http://127.0.0.1:5173`.
