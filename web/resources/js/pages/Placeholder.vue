<script setup lang="ts">
import MeiCard from '@/components/mei/MeiCard.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps<{ title: string; description: string }>();
</script>

<template>
    <Head :title="title" />
    <AppLayout>
        <MeiCard>
            <h2 class="text-lg font-semibold text-slate-950 dark:text-white">{{ title }}</h2>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ description }}</p>
        </MeiCard>
    </AppLayout>
</template>
