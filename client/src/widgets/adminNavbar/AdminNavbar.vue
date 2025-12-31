<script setup lang="ts">
    import { type Breadcrumb, Breadcrumbs, Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';

    defineProps<{
        breadcrumps: Breadcrumb[];
    }>();
</script>

<template>
    <nav class="flex-between mb-10">
        <Breadcrumbs :breadcrumbs="breadcrumps" />
        <Button size="sm" class="flex-center gap-3">
            Back to client view
            <Icon icon="streamline-cyber:door-exit" class="text-2xl" />
        </Button>
    </nav>
</template>
