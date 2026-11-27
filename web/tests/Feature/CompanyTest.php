<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class CompanyTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'cnpj' => '12.345.678/0001-90',
            'legal_name' => 'Empresa Teste LTDA',
            'trade_name' => null,
            'registration_status' => 'ATIVA',
            'main_cnae' => 'Desenvolvimento de software',
            'street' => 'Rua A',
            'number' => '10',
            'district' => 'Centro',
            'city' => 'São Paulo',
            'state' => 'sp',
            'opened_at' => '2020-01-01',
        ], $overrides);
    }

    public function test_guests_are_redirected(): void
    {
        $this->get('/app/cadastros/empresas')->assertRedirect('/login');
    }

    public function test_user_can_create_list_and_delete_company(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/app/cadastros/empresas', $this->payload())
            ->assertSessionHasNoErrors()->assertSessionHas('success');

        $company = Company::first();
        $this->assertSame('12345678000190', $company->cnpj);
        $this->assertSame('SP', $company->state);
        $this->assertSame($user->id, $company->user_id);

        $this->actingAs($user)->get('/app/cadastros/empresas?search=teste')
            ->assertInertia(fn ($page) => $page->component('Cadastros/Empresas')->has('companies', 1));

        $this->actingAs($user)->delete("/app/cadastros/empresas/{$company->id}")->assertSessionHas('success');
        $this->assertDatabaseCount('companies', 0);
    }

    public function test_duplicate_cnpj_is_rejected(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post('/app/cadastros/empresas', $this->payload());

        $this->actingAs($user)->post('/app/cadastros/empresas', $this->payload())
            ->assertSessionHasErrors(['cnpj' => 'Empresa já cadastrada.']);
    }

    public function test_user_cannot_delete_company_of_another_user(): void
    {
        $owner = User::factory()->create();
        $company = $owner->companies()->create(array_merge($this->payload(), ['cnpj' => '12345678000190', 'state' => 'SP']));

        $this->actingAs(User::factory()->create())->delete("/app/cadastros/empresas/{$company->id}")->assertNotFound();
        $this->assertDatabaseCount('companies', 1);
    }

    public function test_lookup_maps_brasilapi_response(): void
    {
        Http::fake(['brasilapi.com.br/*' => Http::response([
            'cnpj' => '12345678000190', 'razao_social' => 'ACME', 'nome_fantasia' => '',
            'descricao_situacao_cadastral' => 'ATIVA', 'cnae_fiscal_descricao' => 'Software',
            'logradouro' => 'Rua B', 'numero' => '', 'bairro' => 'Centro', 'municipio' => 'RIO',
            'uf' => 'RJ', 'data_inicio_atividade' => '2021-05-01',
        ])]);

        $this->actingAs(User::factory()->create())->getJson('/app/cadastros/empresas/lookup/12345678000190')
            ->assertOk()->assertJson(['legal_name' => 'ACME', 'trade_name' => null, 'number' => 'S/N', 'state' => 'RJ']);
    }

    public function test_lookup_returns_error_message(): void
    {
        Http::fake(['brasilapi.com.br/*' => Http::response([], 404)]);

        $this->actingAs(User::factory()->create())->getJson('/app/cadastros/empresas/lookup/12345678000190')
            ->assertStatus(400)->assertJson(['message' => 'CNPJ não encontrado.']);

        $this->actingAs(User::factory()->create())->getJson('/app/cadastros/empresas/lookup/123')
            ->assertStatus(400)->assertJson(['message' => 'CNPJ inválido. Digite 14 números.']);
    }
}
