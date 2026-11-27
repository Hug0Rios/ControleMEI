<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { isDark, setDark } = useTheme();
</script>

<template>
    <label
        class="relative inline-flex h-8 w-16 cursor-pointer items-center rounded-full border border-slate-200 bg-slate-100 p-1 shadow-inner transition dark:border-slate-700 dark:bg-slate-800"
    >
        <span class="sr-only">Alternar tema</span>
        <input type="checkbox" :checked="!!isDark" class="sr-only" @change="setDark(($event.target as HTMLInputElement).checked)" />
        <span class="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-amber-500">☀</span>
        <span class="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-blue-300">☾</span>
        <span
            :class="[
                'relative z-10 block h-6 w-6 rounded-full bg-white shadow-sm transition dark:bg-blue-500',
                isDark ? 'translate-x-8' : 'translate-x-0',
            ]"
        />
    </label>
</template>
