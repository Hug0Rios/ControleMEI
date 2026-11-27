<script setup lang="ts">
import MeiCard from '@/components/mei/MeiCard.vue';
import { useActiveCompany } from '@/composables/useActiveCompany';
import AppLayout from '@/layouts/AppLayout.vue';
import { formatarCNPJ } from '@/lib/format';
import type { Company, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';

const props = defineProps<{ companies: Company[] }>();
const page = usePage<SharedData>();
const { setActiveCompany } = useActiveCompany();

const emptyCompany = {
    cnpj: '', legal_name: '', trade_name: '' as string | null, registration_status: '', main_cnae: '',
    street: '', number: '', district: '', city: '', state: '', opened_at: '',
};

const form = useForm({ ...emptyCompany });
const cnpjInput = ref('');
const search = ref('');
const isLoading = ref(false);
const error = ref('');
const success = ref('');

const inputClass =
    'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20';
const labelClass = 'mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400';
const primaryBtn = 'rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500';
const secondaryBtn = 'rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800';

const fields: { key: keyof typeof emptyCompany; label: string; wide?: boolean }[] = [
    { key: 'legal_name', label: 'Razão Social' },
    { key: 'trade_name', label: 'Nome Fantasia' },
    { key: 'registration_status', label: 'Situação' },
    { key: 'main_cnae', label: 'CNAE Principal', wide: true },
    { key: 'opened_at', label: 'Data de Abertura' },
    { key: 'street', label: 'Logradouro' },
    { key: 'number', label: 'Número' },
    { key: 'district', label: 'Bairro' },
    { key: 'city', label: 'Cidade' },
    { key: 'state', label: 'UF' },
];

const filtered = computed(() => {
    const term = search.value.trim().toLowerCase();
    if (!term) return props.companies;
    return props.companies.filter((c) => `${c.cnpj} ${c.legal_name} ${c.trade_name ?? ''} ${c.city} ${c.state}`.toLowerCase().includes(term));
});

watch(() => page.props.flash?.success, (value) => value && (success.value = value), { immediate: true });
watch(() => form.errors, (errors) => (error.value = Object.values(errors)[0] ?? ''), { deep: true });

function resetMessages() {
    error.value = '';
    success.value = '';
}

function fill(company: Partial<Company>) {
    Object.keys(emptyCompany).forEach((key) => {
        (form as unknown as Record<string, unknown>)[key] = company[key as keyof Company] ?? '';
    });
    cnpjInput.value = formatarCNPJ(company.cnpj ?? '');
}

async function consultar() {
    resetMessages();
    isLoading.value = true;
    try {
        const response = await fetch(route('companies.lookup', { cnpj: cnpjInput.value.replace(/\D/g, '') || '0' }), {
            headers: { Accept: 'application/json' },
        });
        const body = await response.json().catch(() => null);
        if (!response.ok) throw new Error(body?.message ?? 'Não foi possível consultar o CNPJ.');
        fill(body);
    } catch (err) {
        form.reset();
        error.value = err instanceof Error ? err.message : 'Não foi possível consultar o CNPJ.';
    } finally {
        isLoading.value = false;
    }
}

function cadastrar() {
    resetMessages();
    const name = form.legal_name;
    form.post(route('companies.store'), { preserveScroll: true, onSuccess: () => setActiveCompany(name) });
}

function remover(company: Company) {
    resetMessages();
    router.delete(route('companies.destroy', { company: company.id }), { preserveScroll: true });
}

function selecionar(company: Company) {
    fill(company);
    setActiveCompany(company.legal_name);
    error.value = '';
    success.value = 'Empresa carregada no painel.';
}

function limpar() {
    cnpjInput.value = '';
    form.reset();
    form.clearErrors();
    resetMessages();
}
</script>

<template>
    <Head title="Empresas" />
    <AppLayout>
        <div class="space-y-4">
            <MeiCard>
                <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 class="text-xl font-bold text-slate-950 dark:text-white">Cadastro de Empresas</h2>
                        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Consulte o CNPJ e cadastre empresas para usar no sistema.</p>
                    </div>
                    <span class="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-[#172554] dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
                        {{ companies.length }} cadastrada{{ companies.length === 1 ? '' : 's' }}
                    </span>
                </div>

                <form class="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_auto_auto]" @submit.prevent="consultar">
                    <label>
                        <span :class="labelClass">CNPJ</span>
                        <input
                            :value="cnpjInput" :class="inputClass" placeholder="00.000.000/0000-00" inputmode="numeric" autocomplete="off"
                            @input="cnpjInput = formatarCNPJ(($event.target as HTMLInputElement).value)"
                        />
                    </label>
                    <button type="submit" :disabled="isLoading" :class="[primaryBtn, 'self-end']">{{ isLoading ? 'Consultando...' : 'Consultar CNPJ' }}</button>
                    <button type="button" :class="[secondaryBtn, 'self-end']" @click="limpar">Limpar</button>
                </form>

                <div v-if="error" class="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                    {{ error }}
                </div>
                <div v-if="success" class="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                    {{ success }}
                </div>
            </MeiCard>

            <MeiCard>
                <div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 class="text-base font-bold text-slate-950 dark:text-white">Dados consultados</h3>
                        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Revise as informações antes de cadastrar no banco.</p>
                    </div>
                    <button type="button" :disabled="!form.cnpj || form.processing" :class="primaryBtn" @click="cadastrar">
                        {{ form.processing ? 'Salvando...' : 'Cadastrar empresa' }}
                    </button>
                </div>
                <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <label v-for="f in fields" :key="f.key" :class="['block', f.wide && 'xl:col-span-2']">
                        <span :class="labelClass">{{ f.label }}</span>
                        <input :value="form[f.key] ?? ''" readonly placeholder="Empresa não consultada" :class="[inputClass, 'bg-slate-50 dark:bg-slate-950']" />
                    </label>
                </div>
            </MeiCard>

            <MeiCard>
                <div class="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 class="text-base font-bold text-slate-950 dark:text-white">Empresas cadastradas</h3>
                        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Selecione uma empresa para exibir no painel.</p>
                    </div>
                    <input v-model="search" placeholder="Buscar por nome, CNPJ ou cidade" :class="[inputClass, 'md:max-w-xs']" />
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
                    <table class="w-full min-w-[840px] border-collapse text-left text-sm">
                        <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Empresa</th>
                                <th class="px-4 py-3 font-semibold">CNPJ</th>
                                <th class="px-4 py-3 font-semibold">Situação</th>
                                <th class="px-4 py-3 font-semibold">Cidade/UF</th>
                                <th class="px-4 py-3 font-semibold">Ações</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr v-for="c in filtered" :key="c.id" class="text-slate-700 dark:text-slate-200">
                                <td class="px-4 py-4">
                                    <strong class="block text-slate-950 dark:text-white">{{ c.legal_name }}</strong>
                                    <span class="text-xs text-slate-500 dark:text-slate-400">{{ c.trade_name || 'Sem nome fantasia' }}</span>
                                </td>
                                <td class="px-4 py-4 font-medium">{{ formatarCNPJ(c.cnpj) }}</td>
                                <td class="px-4 py-4">
                                    <span class="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">{{ c.registration_status || '-' }}</span>
                                </td>
                                <td class="px-4 py-4">{{ c.city || '-' }}{{ c.state ? `/${c.state}` : '' }}</td>
                                <td class="px-4 py-4">
                                    <div class="flex gap-2">
                                        <button type="button" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" @click="selecionar(c)">Abrir</button>
                                        <button type="button" class="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-200 dark:hover:bg-rose-500/10" @click="remover(c)">Remover</button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filtered.length === 0">
                                <td class="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400" colspan="5">Nenhuma empresa cadastrada.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </MeiCard>
        </div>
    </AppLayout>
</template>
