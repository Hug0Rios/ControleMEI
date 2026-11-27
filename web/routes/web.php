<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Landing')->name('home');

Route::middleware(['auth', 'verified'])->prefix('app')->group(function () {
    Route::redirect('/', '/app/dashboard');
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');

    Route::get('cadastros/empresas', [CompanyController::class, 'index'])->name('companies.index');
    Route::get('cadastros/empresas/lookup/{cnpj}', [CompanyController::class, 'lookup'])->name('companies.lookup');
    Route::post('cadastros/empresas', [CompanyController::class, 'store'])->name('companies.store');
    Route::put('cadastros/empresas/{company}', [CompanyController::class, 'update'])->name('companies.update');
    Route::delete('cadastros/empresas/{company}', [CompanyController::class, 'destroy'])->name('companies.destroy');

    $pages = [
        'financeiro/faturamento' => ['Faturamento', 'Controle mensal de receitas.'],
        'financeiro/despesas' => ['Despesas', 'Registro de custos e pagamentos.'],
        'notas' => ['Notas Fiscais', 'Central de emissão e histórico de notas fiscais.'],
        'das/gerar' => ['Gerar DAS', 'Emissão e acompanhamento da guia mensal do DAS MEI.'],
        'das/historico' => ['Histórico DAS', 'Acompanhamento dos pagamentos do DAS MEI.'],
        'declaracao-anual/visao-geral' => ['Declaração Anual', 'Visão geral da declaração anual do MEI, com os principais indicadores e status.'],
        'declaracao-anual/dados' => ['Dados', 'Cadastro e conferência dos dados usados para a declaração anual.'],
        'relatorios' => ['Relatórios', 'Relatórios mensais e anuais para acompanhamento e envio ao contador.'],
    ];

    foreach ($pages as $uri => [$title, $description]) {
        Route::inertia($uri, 'Placeholder', compact('title', 'description'));
    }

    Route::redirect('declaracao-anual', '/app/declaracao-anual/visao-geral');
    Route::redirect('configuracoes/empresa', '/app/cadastros/empresas');
    Route::redirect('configuracoes/usuario', '/settings/profile');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
