<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import {
    BanknoteArrowDown,
    BanknoteArrowUp,
    BarChart3,
    BookText,
    Building2,
    Calendar1,
    ChevronDown,
    CircleDollarSign,
    ClipboardClock,
    ClipboardList,
    ClipboardPlus,
    FileText,
    LayoutDashboard,
    LogOut,
    Receipt,
    Settings,
    Users,
    type LucideIcon,
} from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

type NavigationChild = { label: string; to: string; icon: LucideIcon };
type NavigationItem = { label: string; icon: LucideIcon; to?: string; prefix?: string; children?: NavigationChild[] };

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: []; expandedChange: [value: boolean] }>();

const navigation: NavigationItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/app/dashboard' },
    {
        label: 'Financeiro',
        icon: CircleDollarSign,
        prefix: '/app/financeiro',
        children: [
            { label: 'Faturamento', to: '/app/financeiro/faturamento', icon: BanknoteArrowUp },
            { label: 'Despesas', to: '/app/financeiro/despesas', icon: BanknoteArrowDown },
        ],
    },
    { label: 'Notas Fiscais', icon: Receipt, to: '/app/notas' },
    {
        label: 'DAS Mensal',
        icon: ClipboardList,
        prefix: '/app/das',
        children: [
            { label: 'Gerar DAS', to: '/app/das/gerar', icon: ClipboardPlus },
            { label: 'Histórico', to: '/app/das/historico', icon: ClipboardClock },
        ],
    },
    {
        label: 'Declaração Anual',
        icon: Calendar1,
        prefix: '/app/declaracao-anual',
        children: [
            { label: 'Visão Geral', to: '/app/declaracao-anual/visao-geral', icon: FileText },
            { label: 'Dados', to: '/app/declaracao-anual/dados', icon: BookText },
        ],
    },
    { label: 'Relatórios', icon: BarChart3, to: '/app/relatorios' },
    {
        label: 'Configurações',
        icon: Settings,
        prefix: '/app/cadastros',
        children: [
            { label: 'Empresa', to: '/app/cadastros/empresas', icon: Building2 },
            { label: 'Usuário', to: '/settings/profile', icon: Users },
        ],
    },
];

const page = usePage();
const pathname = computed(() => page.url.split('?')[0]);
const isHovered = ref(false);
const isExpanded = computed(() => props.isOpen || isHovered.value);

function groupForPath(path: string) {
    return navigation.find((item) => item.children?.some((child) => path.startsWith(child.to)) || (item.prefix && path.startsWith(item.prefix)))?.label ?? null;
}

const openGroup = ref<string | null>(groupForPath(pathname.value));

watch(isExpanded, (value) => emit('expandedChange', value), { immediate: true });
watch(pathname, (path) => (openGroup.value = groupForPath(path)));

function isActive(item: NavigationItem) {
    return pathname.value === item.to || Boolean(item.children?.some((child) => pathname.value.startsWith(child.to)));
}

function itemClass(active: boolean) {
    return [
        'flex min-h-11 w-full items-center rounded-2xl text-sm font-semibold transition',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300',
        isExpanded.value ? 'gap-3 px-3' : 'justify-center px-0',
        active ? 'bg-white text-[#172554] shadow-sm dark:bg-blue-500 dark:text-white' : 'text-blue-100/75 hover:bg-white/10 hover:text-white',
    ];
}

function childClass(active: boolean) {
    return [
        'block rounded-xl px-3 py-2 text-xs font-medium transition',
        active ? 'bg-white/15 text-white' : 'text-blue-100/60 hover:bg-white/10 hover:text-white',
    ];
}
</script>

<template>
    <button v-if="isOpen" type="button" class="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" aria-label="Fechar menu" @click="emit('close')" />

    <aside
        :class="[
            'fixed bottom-4 left-4 top-4 z-40 flex flex-col rounded-[28px] border p-3 text-white shadow-2xl transition-all duration-300',
            'border-blue-300/20 bg-blue-950 shadow-blue-950/25 dark:border-blue-400/10 dark:bg-[#0b3bc7]',
            isExpanded ? 'w-[272px]' : 'w-[76px]',
            isOpen ? 'translate-x-0' : '-translate-x-[120%] lg:translate-x-0',
        ]"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <Link
            href="/app/dashboard"
            :class="['mb-4 flex min-h-12 items-center rounded-2xl transition', isExpanded ? 'justify-between gap-3 px-3' : 'justify-center px-0']"
            @click="emit('close')"
        >
            <img src="/favicon-white.ico" alt="Logo Meu MEI Brasil" class="h-8 w-8" />
            <span v-if="isExpanded" class="min-w-0 flex-1">
                <strong class="block truncate text-sm text-white">Meu MEI Brasil</strong>
                <span class="block truncate text-[11px] text-blue-100/65">Controle do MEI</span>
            </span>
        </Link>

        <nav class="flex-1 space-y-1 overflow-y-auto overflow-x-hidden pr-0.5">
            <template v-for="item in navigation" :key="item.label">
                <div v-if="item.children" class="space-y-1">
                    <button
                        type="button"
                        :class="itemClass(isActive(item))"
                        :title="!isExpanded ? item.label : undefined"
                        @click="openGroup = openGroup === item.label ? null : item.label"
                    >
                        <component :is="item.icon" class="h-5 w-5 shrink-0" :stroke-width="1.8" aria-hidden="true" />
                        <template v-if="isExpanded">
                            <span class="min-w-0 flex-1 truncate text-left">{{ item.label }}</span>
                            <ChevronDown :class="['h-4 w-4 transition-transform', openGroup === item.label && 'rotate-180']" />
                        </template>
                    </button>

                    <div v-if="isExpanded && openGroup === item.label" class="ml-6 space-y-1 border-l border-white/10 pl-3">
                        <Link
                            v-for="child in item.children"
                            :key="child.to"
                            :href="child.to"
                            :class="childClass(pathname.startsWith(child.to))"
                            @click="emit('close')"
                        >
                            <span class="flex items-center gap-2">
                                <component :is="child.icon" class="h-3.5 w-3.5 shrink-0" :stroke-width="2" aria-hidden="true" />
                                <span>{{ child.label }}</span>
                            </span>
                        </Link>
                    </div>
                </div>

                <Link
                    v-else
                    :href="item.to!"
                    :class="itemClass(isActive(item))"
                    :title="!isExpanded ? item.label : undefined"
                    @click="emit('close')"
                >
                    <component :is="item.icon" class="h-5 w-5 shrink-0" :stroke-width="1.8" aria-hidden="true" />
                    <span v-if="isExpanded" class="min-w-0 flex-1 truncate">{{ item.label }}</span>
                </Link>
            </template>
        </nav>

        <div class="mt-4 border-t border-white/10 pt-4">
            <Link :href="route('logout')" method="post" as="button" :class="itemClass(false)" :title="!isExpanded ? 'Sair' : undefined">
                <LogOut class="h-5 w-5 shrink-0" :stroke-width="1.8" aria-hidden="true" />
                <span v-if="isExpanded" class="min-w-0 flex-1 truncate text-left">Sair</span>
            </Link>
        </div>
    </aside>
</template>
