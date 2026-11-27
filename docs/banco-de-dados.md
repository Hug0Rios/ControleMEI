# Banco de Dados

## Users (implementada — starter kit Laravel)
- id
- name
- email
- email_verified_at
- password
- created_at, updated_at

## Companies (implementada — `web/database/migrations/*_create_companies_table.php`)
- id
- user_id (FK users, cascade)
- cnpj (14 dígitos; único por usuário)
- legal_name (razão social)
- trade_name (nome fantasia, opcional)
- registration_status (situação cadastral)
- main_cnae
- street, number, district, city, state (endereço)
- opened_at (data de abertura, texto vindo da BrasilAPI)
- created_at, updated_at
- limite_anual (planejado)

## Revenues
- id
- company_id
- valor
- data
- origem (manual, planilha, nota)

## Expenses
- id
- company_id
- valor
- data
- categoria

## Invoices
- id
- company_id
- tipo (NF-e, NFS-e)
- valor
- data_emissao
- xml_path

## DAS
- id
- company_id
- competencia
- valor
- status
- comprovante_path