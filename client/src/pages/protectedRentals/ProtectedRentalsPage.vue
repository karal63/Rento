<script setup lang="ts">
    import { useRentalsQuery, type RentalWithAllDetails } from '@/entities/rental';
    import type { Breadcrumb } from '@/shared/ui';
    import type { TableColumn } from '@/shared/ui/table';
    import { RentalsHeader, RentalsSort, RentalsTable } from '@/widgets';
    import { Icon } from '@iconify/vue';
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
            <div class="w-[120px] bg-main-bg rounded-md">
                <button
                    class="px-3 py-2 w-full text-left hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                >
                    <Icon icon="lucide:edit" class="text-xl" />
                    Edit
                </button>

                <button
                    class="px-3 py-2 w-full text-left hover:bg-red-600/10 cursor-pointer flex items-center gap-2 text-red-600 transition rounded-bl-md rounded-br-md"
                >
                    <Icon icon="material-symbols:delete-outline-rounded" class="text-xl" />
                    Delete
                </button>
            </div>
        </template>
    </RentalsTable>
</template>
