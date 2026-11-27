<script setup lang="ts">
import type { MetricTone } from '@/mocks/dashboard.mock';
import { computed } from 'vue';

const props = defineProps<{ title: string; value: string; description: string; tone: MetricTone; progress?: number }>();

const toneClasses: Record<MetricTone, string> = {
    blue: 'text-blue-600 dark:text-blue-300',
    green: 'text-emerald-600 dark:text-emerald-300',
    red: 'text-rose-600 dark:text-rose-300',
    amber: 'text-amber-600 dark:text-amber-300',
};

const descriptionClass = computed(() => {
    const text = props.description.trim();
    if (text.startsWith('+')) return 'text-emerald-600 dark:text-emerald-300';
    if (text.startsWith('-')) return 'text-rose-600 dark:text-rose-300';
    return toneClasses[props.tone];
});
</script>

<template>
    <article
        class="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-slate-300/80 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-slate-700"
    >
        <div class="min-w-0">
            <p class="truncate text-xs font-bold text-[#172554] dark:text-white">{{ title }}</p>
            <strong class="mt-1 block truncate text-lg font-bold text-slate-950 dark:text-white">{{ value }}</strong>
            <div v-if="progress !== undefined" class="mt-3">
                <p class="mb-1 text-xs text-slate-500 dark:text-slate-400">{{ description }}</p>
                <div class="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div class="h-full rounded-full bg-[#172554] dark:bg-[#2f7cf6]" :style="{ width: `${progress}%` }" />
                </div>
            </div>
            <p v-else :class="['mt-2 truncate text-xs font-semibold', descriptionClass]">{{ description }}</p>
        </div>
    </article>
</template>
