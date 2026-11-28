# ControleMEI

Sistema web para auxiliar Microempreendedores Individuais (MEI) no controle financeiro e operacional do negócio: receitas, despesas, limite anual, DAS, notas fiscais e relatórios, em uma interface simples e profissional.

## Sobre o projeto

Muitos MEIs não têm controle adequado de receitas, despesas e do limite anual, o que gera problemas fiscais e dificuldade de gestão. O ControleMEI centraliza essas informações em um único lugar. Detalhes em [`docs/`](docs/visao-geral.md).

## Funcionalidades atuais

- Autenticação (cadastro, login, recuperação de senha, perfil)
- Dashboard financeiro (dados fictícios em `web/resources/js/mocks`)
- Cadastro de empresas por usuário com consulta de CNPJ na BrasilAPI
- Tema claro/escuro
- Estrutura de rotas para Financeiro, Notas Fiscais, DAS, Declaração Anual e Relatórios

## Estrutura

- `web/`: aplicação Laravel 12 + Inertia + Vue 3 (TypeScript, Tailwind CSS).
  - `app/Http/Controllers`, `app/Models`, `app/Services`: backend.
  - `resources/js/pages`: telas Vue; `resources/js/components/layout`: sidebar e header.
  - `database/migrations`: esquema do banco.
- `docker-compose.yml`: PostgreSQL + aplicação.
- `docs/`: regras de negócio, telas, fluxos, banco e integrações.
- `assets/`: arquivos visuais do projeto.

## Rodando com Docker

```bash
docker compose up --build
```

Abra `http://127.0.0.1:8000` e crie uma conta. As migrations rodam automaticamente ao subir o container.

Usuário de desenvolvimento (opcional): `docker compose exec app php artisan db:seed --force` cria `dev@controlemei.test` com senha `password`.

> Não crie usuários inserindo linhas direto no banco (DBeaver etc.): a coluna `password` precisa de hash bcrypt e uma senha em texto puro derruba o login com *"This password does not use the Bcrypt algorithm"*. Use a tela de cadastro, o seeder ou `php artisan tinker`.

### Acessando o banco (DBeaver ou outro cliente)

| Campo | Valor |
|---|---|
| Host | `localhost` |
| Porta | `5433` (ou o valor de `DB_FORWARD_PORT`) |
| Banco / Usuário / Senha | `controlemei` |

Se as portas 8000 ou 5433 já estiverem em uso: `APP_PORT=18000 DB_FORWARD_PORT=55433 docker compose up --build`.

## Rodando para desenvolvimento

Requisitos: PHP 8.2+ com `pdo_pgsql`, Composer e Node 22+.

```bash
docker compose up -d postgres      # banco em localhost:5433

cd web
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
npm install
composer run dev                   # servidor Laravel + Vite com hot reload
```

## Testes e checagens

```bash
cd web
php artisan test        # testes de backend (usa SQLite em memória)
npm run typecheck       # checagem de tipos do Vue/TS
npm run build           # build de produção dos assets
```

## Tecnologias

- PHP 8 / Laravel 12
- Inertia.js + Vue 3 + TypeScript
- Tailwind CSS
- ApexCharts
- PostgreSQL
- Docker

## Autores

- Hugo Rios
- Mauricio Zenão
