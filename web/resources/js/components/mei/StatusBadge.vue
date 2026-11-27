<script setup lang="ts">
import type { BadgeTone } from '@/mocks/dashboard.mock';

defineProps<{ label: string; tone: BadgeTone }>();

const statusClasses: Record<BadgeTone, string> = {
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
    info: 'bg-blue-50 text-[#172554] dark:bg-blue-500/10 dark:text-blue-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
};
</script>

<template>
    <span :class="['rounded-md px-2.5 py-1 text-xs font-semibold', statusClasses[tone]]">{{ label }}</span>
</template>
