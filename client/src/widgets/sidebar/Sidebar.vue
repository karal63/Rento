<script setup lang="ts">
    import { useSidebarStore } from '@/shared/model';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const sidebarStore = useSidebarStore();
</script>

<template>
    <aside
        class="w-full sm:w-64 h-full bg-main-bg border-r border-main-border fixed top-0 left-0 pt-36 shadow shadow-main-border transition"
        :class="sidebarStore.isOpen ? 'translate-x-0' : '-translate-x-full '"
    >
        <nav>
            <ul>
                <li>
                    <RouterLink
                        to="/about"
                        @click="sidebarStore.setSidebarOpen(false)"
                        class="text-xl transition font-semibold block hover:bg-main-hover-bg w-full py-3 px-5"
                    >
                        {{ t('app.about_us') }}
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        to="/cars"
                        @click="sidebarStore.setSidebarOpen(false)"
                        class="text-xl transition font-semibold block hover:bg-main-hover-bg w-full py-3 px-5"
                    >
                        {{ t('app.cars') }}
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        to="/contact"
                        @click="sidebarStore.setSidebarOpen(false)"
                        class="text-xl transition font-semibold block hover:bg-main-hover-bg w-full py-3 px-5"
                    >
                        {{ t('app.contact') }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>
