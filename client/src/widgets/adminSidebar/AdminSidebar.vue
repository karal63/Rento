<script setup lang="ts">
    import { adminLinks } from '@/shared/config';
    import { Icon } from '@iconify/vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
</script>

<template>
    <nav
        class="hidden lg:block fixed top-0 left-0 bg-main-bg border-r border-main-border h-full w-60 my-5 px-5"
    >
        <h1 class="text-2xl font-semibold text-center pt-4 pb-6 border-b border-main-border">
            Rento
            <span class="text-primary">| Admin</span>
        </h1>

        <ul class="mt-4">
            <li v-for="link in adminLinks" :key="link.path">
                <RouterLink
                    :to="link.path"
                    class="border px-2 py-2 rounded-md flex items-center gap-2 cursor-pointer"
                    :class="
                        route.fullPath.includes(link.path)
                            ? 'bg-main-gray-bg border-main-border shadow shadow-main-border'
                            : 'border-transparent'
                    "
                >
                    <div
                        class="w-8 h-8 rounded-md flex-center"
                        :class="
                            route.fullPath.includes(link.path)
                                ? 'bg-primary text-white'
                                : 'bg-main-gray-bg shadow shadow-main-border'
                        "
                    >
                        <Icon :icon="link.icon" class="text-xl" />
                    </div>
                    <span class="font-semibold text-sm">{{ link.name }}</span>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>
