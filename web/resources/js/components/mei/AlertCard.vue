<script setup lang="ts">
import type { AlertTone } from '@/mocks/dashboard.mock';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-vue-next';

defineProps<{ title: string; message: string; tone: AlertTone }>();

const badgeClasses: Record<AlertTone, string> = {
    critical: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
    alert: 'bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100',
    info: 'bg-blue-50 text-[#172554] dark:bg-blue-500/10 dark:text-blue-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
};
const icons = { critical: XCircle, alert: AlertTriangle, success: CheckCircle, info: Info };
</script>

<template>
    <article class="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/50">
        <span :class="['flex h-8 w-8 items-center justify-center rounded-md', badgeClasses[tone]]">
            <component :is="icons[tone]" class="h-4 w-4" />
        </span>
        <div class="min-w-0">
            <strong class="block text-sm font-semibold text-slate-900 dark:text-white">{{ title }}</strong>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ message }}</p>
        </div>
    </article>
</template>
