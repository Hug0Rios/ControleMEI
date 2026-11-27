<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
    <section
        class="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-slate-300/80 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-slate-700"
    >
        <div class="mb-3 flex items-center justify-between gap-3">
            <h2 class="text-sm font-bold text-[#172554] dark:text-white">{{ title }}</h2>
            <slot name="action" />
        </div>
        <slot />
    </section>
</template>
