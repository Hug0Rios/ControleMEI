<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class BrasilApiService
{
    /**
     * Consulta um CNPJ na BrasilAPI e devolve os campos no formato da tabela companies.
     *
     * @return array<string, string|null>
     */
    public function lookupCnpj(string $cnpj): array
    {
        $digits = preg_replace('/\D/', '', $cnpj);

        if (strlen($digits) !== 14) {
            throw new RuntimeException('CNPJ inválido. Digite 14 números.');
        }

        try {
            $response = Http::timeout(12)->get("https://brasilapi.com.br/api/cnpj/v1/{$digits}");
        } catch (ConnectionException) {
            throw new RuntimeException('Erro ao consultar CNPJ na BrasilAPI.');
        }

        if ($response->status() === 404) {
            throw new RuntimeException('CNPJ não encontrado.');
        }

        if ($response->failed()) {
            throw new RuntimeException('Erro ao consultar CNPJ na BrasilAPI.');
        }

        $data = $response->json();

        return [
            'cnpj' => $data['cnpj'],
            'legal_name' => $data['razao_social'],
            'trade_name' => ($data['nome_fantasia'] ?? null) ?: null,
            'registration_status' => $data['descricao_situacao_cadastral'],
            'main_cnae' => $data['cnae_fiscal_descricao'],
            'street' => $data['logradouro'],
            'number' => ($data['numero'] ?? null) ?: 'S/N',
            'district' => $data['bairro'],
            'city' => $data['municipio'],
            'state' => $data['uf'],
            'opened_at' => $data['data_inicio_atividade'],
        ];
    }
}
