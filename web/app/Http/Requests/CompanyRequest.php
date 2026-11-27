<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'cnpj' => preg_replace('/\D/', '', (string) $this->input('cnpj')),
            'state' => strtoupper((string) $this->input('state')),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $company = $this->route('company');

        return [
            'cnpj' => [
                'required', 'digits:14',
                Rule::unique('companies')->where('user_id', $this->user()->id)->ignore($company?->id),
            ],
            'legal_name' => ['required', 'string', 'max:255'],
            'trade_name' => ['nullable', 'string', 'max:255'],
            'registration_status' => ['required', 'string', 'max:80'],
            'main_cnae' => ['required', 'string'],
            'street' => ['required', 'string', 'max:255'],
            'number' => ['required', 'string', 'max:40'],
            'district' => ['required', 'string', 'max:120'],
            'city' => ['required', 'string', 'max:120'],
            'state' => ['required', 'string', 'size:2'],
            'opened_at' => ['required', 'string', 'max:20'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'cnpj.required' => 'Consulte um CNPJ antes de cadastrar a empresa.',
            'cnpj.digits' => 'CNPJ deve conter 14 números.',
            'cnpj.unique' => 'Empresa já cadastrada.',
            '*.required' => 'Campo obrigatório.',
        ];
    }
}
