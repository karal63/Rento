<script setup lang="ts">
    import { useRentalsQuery } from '@/entities/rental';
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

    const { loading, rentals } = useRentalsQuery();

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });
</script>

<template>
    <RentalsHeader />
    <RentalsSort />

    <RentalsTable :rows="rentals" :loading="loading">
        <template #actions="{ rental }">
            <button>{{ rental._id }}</button>
        </template>
    </RentalsTable>
</template>
