<script setup lang="ts">
    defineProps<{
        breadcrumbs: { label: string; href?: string }[];
    }>();
</script>

<template>
    <nav aria-label="Breadcrumb" class="mb-4">
        <ol class="flex flex-wrap items-center gap-1 text-sm sm:text-lg">
            <li v-for="(item, index) in breadcrumbs" :key="index" class="flex items-center">
                <!-- Link -->
                <RouterLink
                    v-if="item.href && index !== breadcrumbs.length - 1"
                    :to="item.href"
                    class="text-main-gray hover:text-inherit transition-colors font-medium"
                >
                    {{ item.label }}
                </RouterLink>

                <!-- Current page -->
                <span v-else class="font-semibold" aria-current="page">
                    {{ item.label }}
                </span>

                <!-- Separator -->
                <span
                    v-if="index < breadcrumbs.length - 1"
                    class="mx-2 text-main-border select-none"
                >
                    /
                </span>
            </li>
        </ol>
    </nav>
</template>
