<script setup lang="ts">
    import type { Breadcrumb } from '@/shared/ui';
    import { onMounted } from 'vue';

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: 'Dashboard',
        },
    ];

    onMounted(() => emit('setBreadcrumbs', breadcrumbs));
</script>

<template></template>
