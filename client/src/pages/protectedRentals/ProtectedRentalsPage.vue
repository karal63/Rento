<script setup lang="ts">
    import { useRentalsQuery, type RentalWithAllDetails } from '@/entities/rental';
    import type { Breadcrumb } from '@/shared/ui';
    import type { TableColumn } from '@/shared/ui/table';
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

    const columns: TableColumn<RentalWithAllDetails>[] = [
        {
            key: 'name',
            header: 'Name',
            render: rental => rental.carId.name,
            width: '35%',
        },
        {
            key: 'status',
            header: 'Status',
            render: rental => rental.status,
            width: '15%',
        },
        {
            key: 'createdAt',
            header: 'Created At',
            render: rental => new Date(rental.createdAt).toLocaleString(),
        },
        {
            key: 'updatedAt',
            header: 'Updated At',
            render: rental => new Date(rental.updatedAt).toLocaleString(),
        },
        {
            key: 'createdBy',
            header: 'Created By',
            render: rental => rental.userId.name,
        },
    ];
</script>

<template>
    <RentalsHeader />
    <RentalsSort />

    <RentalsTable :rows="rentals" :columns="columns" :loading="loading">
        <template #actions="{ rental }">
            <button>Edit</button>
        </template>
    </RentalsTable>
</template>
