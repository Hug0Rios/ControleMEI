# Rotas

A aplicação usa Laravel + Inertia: as rotas abaixo renderizam páginas Vue (ou redirecionam) e exigem login, exceto onde indicado. Definidas em `web/routes/`.

## Auth (`routes/auth.php`, `routes/settings.php`)
GET|POST /register
GET|POST /login
POST /logout
GET|POST /forgot-password, /reset-password
GET|PATCH|DELETE /settings/profile
GET|PUT /settings/password

## Páginas (`routes/web.php`, prefixo `/app`)
GET /app/dashboard
GET /app/financeiro/faturamento
GET /app/financeiro/despesas
GET /app/notas
GET /app/das/gerar
GET /app/das/historico
GET /app/declaracao-anual/visao-geral
GET /app/declaracao-anual/dados
GET /app/relatorios

## Empresas (`CompanyController`)
GET /app/cadastros/empresas?search= — lista as empresas do usuário
GET /app/cadastros/empresas/lookup/{cnpj} — JSON com os dados da BrasilAPI (erro: 400 `{ "message": "..." }`)
POST /app/cadastros/empresas — cadastra (CNPJ duplicado → erro de validação "Empresa já cadastrada.")
PUT /app/cadastros/empresas/{id}
DELETE /app/cadastros/empresas/{id}

## Planejado
Receitas: GET/POST/DELETE /app/financeiro/faturamento
Despesas: GET/POST/DELETE /app/financeiro/despesas
Notas: POST upload XML, GET lista
DAS: GET, POST, PUT /{id}
