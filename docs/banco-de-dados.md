# Banco de Dados

## Users
- id
- email
- password_hash
- created_at

## Companies
- id
- user_id
- cnpj
- razao_social
- nome_fantasia
- cnae
- data_abertura
- limite_anual

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