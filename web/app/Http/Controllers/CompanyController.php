<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use App\Services\BrasilApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class CompanyController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));

        $companies = $request->user()->companies()
            ->when($search !== '', function ($query) use ($search) {
                $term = "%{$search}%";
                $digits = preg_replace('/\D/', '', $search);

                $query->where(function ($query) use ($term, $digits) {
                    $query->whereLike('legal_name', $term)
                        ->orWhereLike('trade_name', $term)
                        ->orWhereLike('city', $term)
                        ->orWhereLike('state', $term);

                    if ($digits !== '') {
                        $query->orWhereLike('cnpj', "%{$digits}%");
                    }
                });
            })
            ->latest()
            ->get();

        return Inertia::render('Cadastros/Empresas', [
            'companies' => $companies,
            'search' => $search,
        ]);
    }

    public function lookup(string $cnpj, BrasilApiService $brasilApi): JsonResponse
    {
        try {
            return response()->json($brasilApi->lookupCnpj($cnpj));
        } catch (RuntimeException $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        }
    }

    public function store(CompanyRequest $request): RedirectResponse
    {
        $request->user()->companies()->create($request->validated());

        return back()->with('success', 'Empresa cadastrada com sucesso.');
    }

    public function update(CompanyRequest $request, Company $company): RedirectResponse
    {
        $this->ensureOwner($request, $company);
        $company->update($request->validated());

        return back()->with('success', 'Empresa atualizada com sucesso.');
    }

    public function destroy(Request $request, Company $company): RedirectResponse
    {
        $this->ensureOwner($request, $company);
        $company->delete();

        return back()->with('success', 'Empresa removida com sucesso.');
    }

    private function ensureOwner(Request $request, Company $company): void
    {
        abort_unless($company->user_id === $request->user()->id, 404);
    }
}
