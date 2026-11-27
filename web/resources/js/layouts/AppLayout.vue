<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import type { BreadcrumbItemType } from '@/types';
import { ref } from 'vue';

// breadcrumbs mantido por compatibilidade com as páginas de settings do starter kit
withDefaults(defineProps<{ breadcrumbs?: BreadcrumbItemType[] }>(), { breadcrumbs: () => [] });

const isSidebarOpen = ref(false);
const isSidebarExpanded = ref(false);
</script>

<template>
    <div class="min-h-screen bg-slate-100 text-slate-950 transition-colors dark:bg-[#0b111d] dark:text-slate-100">
        <Sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" @expanded-change="isSidebarExpanded = $event" />
        <div :class="['flex min-h-screen flex-col overflow-hidden transition-[padding] duration-300', isSidebarExpanded ? 'lg:pl-[304px]' : 'lg:pl-[108px]']">
            <Header @menu-click="isSidebarOpen = true" />
            <main class="px-3 pb-5 pt-3 sm:px-4 lg:px-4">
                <slot />
            </main>
        </div>
    </div>
</template>
