<script setup lang="ts">
import type { NotificationType } from '@/mocks/notifications.mock';
import { getNotifications } from '@/services/notifications.service';
import { Bell } from 'lucide-vue-next';
import { ref } from 'vue';

const notifications = getNotifications();
const isOpen = ref(false);
const unreadCount = ref(notifications.length);

const typeClasses: Record<NotificationType, string> = {
    alert: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
    info: 'bg-blue-50 text-[#172554] dark:bg-blue-500/10 dark:text-blue-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
};
</script>

<template>
    <div class="relative">
        <button
            type="button"
            class="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500"
            aria-label="Notificações"
            @click="isOpen = !isOpen"
        >
            <Bell class="h-4 w-4" aria-hidden="true" />
            <span
                v-if="unreadCount > 0"
                class="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
            >
                {{ unreadCount }}
            </span>
        </button>

        <div
            v-if="isOpen"
            class="absolute right-0 top-11 z-30 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30"
        >
            <div class="mb-2 flex items-center justify-between gap-3">
                <strong class="text-sm text-slate-950 dark:text-white">Notificações</strong>
                <button
                    type="button"
                    class="text-xs font-semibold text-[#172554] hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
                    @click="unreadCount = 0"
                >
                    Marcar todas como lidas
                </button>
            </div>
            <div class="space-y-2">
                <article v-for="n in notifications" :key="n.id" class="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
                    <div class="flex items-start justify-between gap-3">
                        <span :class="['rounded-lg px-2 py-1 text-[10px] font-bold uppercase', typeClasses[n.type]]">{{ n.type }}</span>
                        <span class="text-[11px] text-slate-400">{{ n.time }}</span>
                    </div>
                    <h3 class="mt-2 text-xs font-bold text-slate-950 dark:text-white">{{ n.title }}</h3>
                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ n.description }}</p>
                </article>
            </div>
        </div>
    </div>
</template>
