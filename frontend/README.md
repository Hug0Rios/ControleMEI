# Meu MEI Brasil - Frontend

Frontend em React, Vite, TypeScript, Tailwind CSS e React Router.

## Instalar dependencias

```bash
npm install
```

## Rodar o projeto

```bash
npm run dev
```

## Build de producao

```bash
npm run build
```

## Rotas

- `/` - Landing page publica
- `/app/dashboard` - Dashboard privado com layout, sidebar, header e tema claro/escuro

## Dashboard

A pagina de Dashboard usa dados ficticios centralizados em:

- `src/mocks/dashboard.mock.ts`

O componente nao consome mocks diretamente. Os dados passam pelo service:

- `src/services/dashboard.service.ts`
- `src/services/notifications.service.ts`

Essa separacao deixa a tela pronta para trocar o mock por API futuramente, sem alterar a estrutura visual da pagina.

As notificacoes do header usam dados ficticios em:

- `src/mocks/notifications.mock.ts`

## Graficos

Os graficos do Dashboard usam `recharts`, declarado nas dependencias do projeto.
