
# ControleMEI

<<<<<<< HEAD
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
=======
Sistema web desenvolvido para auxiliar Microempreendedores Individuais (MEI) no controle financeiro do seu negócio de forma simples, organizada e eficiente.

---

##  Sobre o projeto

O ControleMEI foi criado com o objetivo de resolver um problema comum entre microempreendedores: a falta de organização financeira.

Muitos MEIs não possuem controle adequado de receitas, despesas e limite anual, o que pode gerar problemas fiscais e dificuldades na gestão do negócio.

Este sistema busca centralizar essas informações em um único lugar, facilitando a visualização e tomada de decisões.

---

##  Objetivo

Fornecer uma ferramenta prática e acessível para:

- Controlar receitas e despesas
- Acompanhar o faturamento mensal
- Evitar ultrapassar o limite anual do MEI
- Melhorar a organização financeira do negócio

---

##  Funcionalidades (atuais e planejadas)

- Cadastro de receitas
- Cadastro de despesas
- Organização por categorias
- Visualização de saldo
- Controle do limite anual do MEI
- Dashboard financeiro (em desenvolvimento)
- Importação de dados (planejado)
- Relatórios mensais e anuais (planejado)

---

##  Guia de uso

### 1. Cadastro de dados
O usuário pode registrar:
- Entradas (receitas)
- Saídas (despesas)

### 2. Organização
Os dados podem ser categorizados para melhor controle financeiro.

### 3. Acompanhamento
O sistema permite visualizar:
- Total de receitas
- Total de despesas
- Saldo atual
- Progresso do limite anual

### 4. Análise
Com base nos dados inseridos, o usuário consegue:
- Entender sua situação financeira
- Tomar decisões mais seguras
- Evitar problemas com faturamento

---

##  Público-alvo

- Microempreendedores Individuais (MEI)
- Pequenos negócios
- Profissionais autônomos

---

##  Futuro do projeto

- Integração com APIs de CNPJ
- Importação automática de notas fiscais
- Integração com Open Finance
- Dashboard avançado com gráficos
- Versão mobile

---

##  Tecnologias

- TypeScript
- HTML

---

##  Autores

- Hugo Rios  
- Mauricio Zenão
>>>>>>> origin/main
