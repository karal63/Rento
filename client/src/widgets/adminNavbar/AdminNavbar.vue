<script setup lang="ts">
    import { useSidebarStore } from '@/shared/model';
    import { type Breadcrumb, Breadcrumbs, Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';

    defineProps<{
        breadcrumps: Breadcrumb[];
    }>();

    const sidebarStore = useSidebarStore();
</script>

<template>
    <nav class="flex-between mb-10">
        <Breadcrumbs :breadcrumbs="breadcrumps" />
        <div class="flex items-center gap-5">
            <RouterLink to="/" class="flex-center">
                <Button size="sm" class="hidden md:flex items-center justify-between gap-3">
                    Back to client view
                    <Icon icon="streamline-cyber:door-exit" class="text-2xl" />
                </Button>
                <Button size="sm" color="transparent" class="md:hidden border border-main-border">
                    <Icon icon="streamline-cyber:door-exit" class="text-2xl" />
                </Button>
            </RouterLink>

            <button
                @click="sidebarStore.setAdminSidebarOpen(!sidebarStore.isAdminOpen)"
                class="md:hidden"
            >
                <Icon icon="mdi:menu" class="text-3xl" />
            </button>
        </div>
    </nav>
</template>
