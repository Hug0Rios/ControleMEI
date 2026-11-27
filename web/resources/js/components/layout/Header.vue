<script setup lang="ts">
import NotificationDropdown from '@/components/mei/NotificationDropdown.vue';
import ThemeToggle from '@/components/mei/ThemeToggle.vue';
import { useActiveCompany } from '@/composables/useActiveCompany';
import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const emit = defineEmits<{ menuClick: [] }>();
const page = usePage<SharedData>();
const { companyName } = useActiveCompany();
const welcomeName = computed(() => companyName.value.trim() || page.props.auth.user?.name || 'sua empresa');
</script>

<template>
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/0 px-3 py-3 backdrop-blur dark:border-slate-800 dark:bg-[#0b111d]/90 sm:px-4">
        <div class="flex min-h-9 items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-2 sm:gap-3">
                <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
                    aria-label="Abrir menu"
                    @click="emit('menuClick')"
                >
                    <span class="h-0.5 w-5 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
                </button>
                <span class="hidden truncate text-sm font-medium text-slate-600 dark:text-slate-300 sm:block">Bem vindo(a), {{ welcomeName }}</span>
            </div>
            <div class="flex items-center gap-2">
                <ThemeToggle />
                <NotificationDropdown />
            </div>
        </div>
    </header>
</template>
