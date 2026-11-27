<script setup lang="ts">
import AlertCard from '@/components/mei/AlertCard.vue';
import ChartCard from '@/components/mei/ChartCard.vue';
import MetricCard from '@/components/mei/MetricCard.vue';
import StatusBadge from '@/components/mei/StatusBadge.vue';
import { useTheme } from '@/composables/useTheme';
import AppLayout from '@/layouts/AppLayout.vue';
import { formatCurrency } from '@/lib/format';
import { getDashboardData } from '@/services/dashboard.service';
import { Head, Link } from '@inertiajs/vue3';
import type { ApexOptions } from 'apexcharts';
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const { metrics, monthlyRevenue, meiLimit, cashFlow, cashFlowSummary, dueItems, invoiceSummary, alerts } = getDashboardData();
const { isDark } = useTheme();

const cardActionClass =
    'rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#172554] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-200';

// Exibe só o intervalo de meses com faturamento > 0
const visibleRevenue = (() => {
    const first = monthlyRevenue.findIndex((m) => m.revenue > 0);
    const last = monthlyRevenue.map((m) => m.revenue > 0).lastIndexOf(true);
    return first === -1 ? monthlyRevenue : monthlyRevenue.slice(first, last + 1);
})();

const currentMonthLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date()).replace(/^[a-z]/, (l) => l.toUpperCase());

const circumference = 2 * Math.PI * 44;
const usedPercent = Math.max(0, Math.min(100, meiLimit.usedPercent));

function thousands(value: number) {
    if (value === 0) return '0';
    if (Math.abs(value) >= 1000) return `${(value / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil`;
    return value.toLocaleString('pt-BR');
}

const tooltipBox = 'rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900';

function baseOptions() {
    const dark = isDark.value;
    const muted = isDark.value ? '#94a3b8' : '#64748b';
    return {
        chart: { background: 'transparent', toolbar: { show: false }, zoom: { enabled: false }, fontFamily: 'inherit', foreColor: muted },
        theme: { mode: (dark ? 'dark' : 'light') as 'dark' | 'light' },
        grid: { borderColor: isDark.value ? '#1e293b' : '#e2e8f0', strokeDashArray: 4, xaxis: { lines: { show: false } } },
        legend: { show: false },
        dataLabels: { enabled: false },
        xaxis: { axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { fontSize: '11px' } } },
    };
}

const revenueSeries = [
    { name: 'Faturamento Mensal', type: 'column', data: visibleRevenue.map((m) => m.revenue) },
    { name: 'Média Mensal', type: 'line', data: visibleRevenue.map((m) => m.average) },
];

const revenueOptions = computed((): ApexOptions => {
    const base = baseOptions();
    return {
        ...base,
        colors: [isDark.value ? '#2f7cf6' : '#172554', '#94a3b8'],
        stroke: { width: [0, 2], dashArray: [0, 5], curve: 'smooth' as const },
        plotOptions: { bar: { columnWidth: '40%', borderRadius: 3, borderRadiusApplication: 'end' as const } },
        xaxis: { ...base.xaxis, categories: visibleRevenue.map((m) => m.month) },
        yaxis: { labels: { formatter: thousands } },
        tooltip: {
            shared: true,
            custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
                const m = visibleRevenue[dataPointIndex];
                return `<div class="${tooltipBox}"><div class="mb-1 text-xs font-semibold text-slate-500">${m.month}</div>
                    <div class="flex items-baseline justify-between gap-4"><div><div class="text-2xl font-bold text-slate-900 dark:text-white">${formatCurrency(m.revenue)}</div><div class="text-xs text-slate-500">Faturamento mensal</div></div>
                    <div class="text-right"><div class="text-lg font-medium text-slate-700 dark:text-slate-200">${formatCurrency(m.average)}</div><div class="text-xs text-slate-500">Média mensal</div></div></div></div>`;
            },
        },
    };
});

const cashFlowSeries = [
    { name: 'Entradas', data: cashFlow.map((p) => p.income) },
    { name: 'Saídas', data: cashFlow.map((p) => p.expense) },
];

const cashFlowOptions = computed((): ApexOptions => {
    const base = baseOptions();
    return {
        ...base,
        colors: ['#10b981', '#ef4444'],
        stroke: { width: 2, curve: 'smooth' as const },
        markers: { size: 2 },
        xaxis: { ...base.xaxis, categories: cashFlow.map((p) => String(Number(p.day.split('/')[0]))) },
        yaxis: { labels: { formatter: (v: number) => (Math.abs(v) > 999 ? `${Math.floor(v / 1000)} mil` : v.toLocaleString('pt-BR')) } },
        tooltip: {
            shared: true,
            custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
                const p = cashFlow[dataPointIndex];
                return `<div class="${tooltipBox}"><div class="mb-1 text-xs font-semibold text-slate-500">${p.day}</div>
                    <div class="flex justify-between gap-6 text-sm"><span class="text-slate-500">Entradas</span><span class="font-medium text-slate-900 dark:text-white">${formatCurrency(p.income)}</span></div>
                    <div class="flex justify-between gap-6 text-sm"><span class="text-slate-500">Saídas</span><span class="font-medium text-slate-900 dark:text-white">${formatCurrency(p.expense)}</span></div></div>`;
            },
        },
    };
});
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout>
        <div class="space-y-4">
            <section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                <MetricCard v-for="m in metrics" :key="m.title" v-bind="m" />
            </section>

            <section class="grid gap-3 xl:grid-cols-[1.15fr_0.75fr_1fr]">
                <ChartCard title="Faturamento">
                    <template #action><Link href="/app/financeiro/faturamento" :class="cardActionClass">Ver financeiro</Link></template>
                    <VueApexCharts type="line" height="225" :options="revenueOptions" :series="revenueSeries" />
                </ChartCard>

                <ChartCard title="Limite MEI">
                    <template #action><Link href="/app/das/gerar" :class="cardActionClass">Gerar DAS</Link></template>
                    <div class="grid min-h-[225px] grid-cols-1 items-center gap-2 sm:h-[225px] sm:grid-cols-[1fr_0.95fr]">
                        <div class="relative mx-auto h-[178px] w-[178px]">
                            <svg class="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                                <circle cx="60" cy="60" r="44" stroke="currentColor" stroke-width="10" fill="none" class="text-slate-200 dark:text-slate-800" />
                                <circle
                                    cx="60" cy="60" r="44" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"
                                    :stroke-dasharray="circumference"
                                    :stroke-dashoffset="circumference - (usedPercent / 100) * circumference"
                                    class="text-[#172554] transition-all duration-500 dark:text-[#2f7cf6]"
                                />
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <strong class="text-2xl font-bold text-[#172554] dark:text-white">{{ usedPercent.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) }}%</strong>
                                <span class="text-xs text-slate-500 dark:text-slate-400">Utilizado</span>
                            </div>
                        </div>
                        <div class="space-y-3 text-xs">
                            <div><span class="text-slate-500 dark:text-slate-400">Total utilizado</span><strong class="block text-slate-950 dark:text-white">{{ meiLimit.used }}</strong></div>
                            <div><span class="text-slate-500 dark:text-slate-400">Limite anual</span><strong class="block text-slate-950 dark:text-white">{{ meiLimit.annualLimit }}</strong></div>
                            <div><span class="text-slate-500 dark:text-slate-400">Disponível</span><strong class="block text-slate-950 dark:text-white">{{ meiLimit.available }}</strong></div>
                        </div>
                    </div>
                </ChartCard>

                <ChartCard :title="`Fluxo de Entradas e Saídas (${currentMonthLabel})`">
                    <template #action><Link href="/app/financeiro/faturamento" :class="cardActionClass">Ver financeiro</Link></template>
                    <div class="grid min-h-[225px] grid-cols-1 gap-2 sm:h-[225px] sm:grid-cols-[0.48fr_1fr]">
                        <div class="space-y-3 pt-4 text-xs">
                            <div><span class="text-slate-500 dark:text-slate-400">Entradas</span><strong class="block text-emerald-600 dark:text-emerald-300">{{ cashFlowSummary.income }}</strong></div>
                            <div><span class="text-slate-500 dark:text-slate-400">Saídas</span><strong class="block text-rose-600 dark:text-rose-300">{{ cashFlowSummary.expense }}</strong></div>
                            <div><span class="text-slate-500 dark:text-slate-400">Saldo</span><strong class="block text-blue-600 dark:text-blue-300">{{ cashFlowSummary.balance }}</strong></div>
                        </div>
                        <VueApexCharts type="line" height="225" :options="cashFlowOptions" :series="cashFlowSeries" />
                    </div>
                </ChartCard>
            </section>

            <section class="grid gap-3 xl:grid-cols-[1.15fr_0.75fr_1fr]">
                <ChartCard title="Próximos Vencimentos">
                    <div class="space-y-2">
                        <Link
                            v-for="item in dueItems" :key="item.id" href="/app/das/gerar"
                            class="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-3 py-3 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/60"
                        >
                            <div class="min-w-0 flex-1">
                                <p class="truncate text-sm font-bold text-slate-950 dark:text-white">{{ item.title }}</p>
                                <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.dueDate }}</p>
                            </div>
                            <strong class="text-sm text-slate-950 dark:text-white">{{ item.amount }}</strong>
                            <StatusBadge :label="item.status" :tone="item.tone" />
                        </Link>
                    </div>
                </ChartCard>

                <ChartCard :title="`Notas Fiscais (${currentMonthLabel})`">
                    <div class="space-y-2">
                        <Link
                            v-for="item in invoiceSummary" :key="item.id" href="/app/notas"
                            class="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border border-slate-100 bg-white px-3 py-3 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/60"
                        >
                            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
                                {{ item.label }}
                                <span class="block text-xs text-slate-500 dark:text-slate-400">{{ currentMonthLabel }}</span>
                            </span>
                            <strong class="text-sm text-slate-950 dark:text-white">{{ item.quantity }}</strong>
                            <span class="text-sm text-slate-700 dark:text-slate-300">{{ item.amount }}</span>
                        </Link>
                    </div>
                </ChartCard>

                <ChartCard title="Avisos e Alertas">
                    <div class="space-y-2">
                        <AlertCard v-for="a in alerts" :key="a.id" :title="a.title" :message="a.message" :tone="a.tone" />
                    </div>
                </ChartCard>
            </section>
        </div>
    </AppLayout>
</template>
