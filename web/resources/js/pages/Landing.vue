<script setup lang="ts">
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/vue3';

const page = usePage<SharedData>();

const btn = 'inline-flex rounded-md px-4 py-2 text-sm font-medium transition';
</script>

<template>
    <Head title="Início" />
    <main class="min-h-screen bg-white px-6 py-16 text-slate-900">
        <section class="mx-auto flex max-w-5xl flex-col gap-6">
            <p class="text-sm font-semibold uppercase tracking-wide text-[#172554]">Meu MEI Brasil</p>
            <h1 class="max-w-2xl text-4xl font-bold">Organize sua rotina de MEI em um só lugar.</h1>
            <p class="max-w-2xl text-lg text-slate-600">Base inicial do painel para faturamento, despesas, notas, DAS e relatórios.</p>
            <div class="flex gap-3">
                <template v-if="page.props.auth.user">
                    <Link :href="route('dashboard')" :class="[btn, 'bg-[#172554] text-white hover:bg-blue-900']">Acessar dashboard</Link>
                </template>
                <template v-else>
                    <Link :href="route('login')" :class="[btn, 'bg-[#172554] text-white hover:bg-blue-900']">Entrar</Link>
                    <Link :href="route('register')" :class="[btn, 'border border-slate-200 text-slate-700 hover:bg-slate-50']">Criar conta</Link>
                </template>
            </div>
        </section>
    </main>
</template>
