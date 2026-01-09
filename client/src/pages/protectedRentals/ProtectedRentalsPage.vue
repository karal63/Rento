<script setup lang="ts">
    import type { Breadcrumb } from '@/shared/ui';
    import { RentalsHeader, RentalsSort, RentalsTable } from '@/widgets';
    import { onMounted } from 'vue';

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: 'Rentals',
        },
    ];

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });
</script>

<template>
    <RentalsHeader />
    <RentalsSort />
    <RentalsTable />
</template>
