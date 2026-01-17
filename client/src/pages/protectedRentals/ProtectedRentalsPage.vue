<script setup lang="ts">
    import { RENTAL_STATUS, useRentalsQuery, type RentalWithAllDetails } from '@/entities/rental';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { cancelRental } from '@/features/cancelRental';
    import { useFilterRentals } from '@/features/filterRentals';
    import { useSortRentals } from '@/features/sortRentals';
    import { Button, type Breadcrumb } from '@/shared/ui';
    import type { TableColumn } from '@/shared/ui/table';
    import { ProtectedHeader, RentalsFilter, RentalsTable } from '@/widgets';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: 'Rentals',
        },
    ];

    const acceptanceModalStore = useAcceptanceModalStore();
    const { t } = useI18n();
    const filters = useFilterRentals();
    const sorting = useSortRentals();

    const queryParams = computed(() => ({
        ...filters,
        ...sorting,
    }));

    const { loading, rentals } = useRentalsQuery(queryParams);

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });

    const columns: TableColumn<RentalWithAllDetails>[] = [
        {
            key: 'rentalPeriod',
            header: 'Period',
            render: rental =>
                `${new Date(rental.rentFrom).toLocaleString()} - ${new Date(rental.rentTo).toLocaleString()}`,
            width: '35%',
        },
        {
            key: 'status',
            header: 'Status',
            render: rental => rental.status,
            width: '15%',
        },
        {
            key: 'name',
            header: 'Car name',
            render: rental => rental.carId.name,
        },
        {
            key: 'createdAt',
            header: 'Created At',
            render: rental => new Date(rental.createdAt).toLocaleString(),
        },
        {
            key: 'createdBy',
            header: 'Created By',
            render: rental => rental.userId.name,
        },
    ];

    function onRentalCancelled(rentalId: string) {
        rentals.value = rentals.value.map(rental => {
            if (rental._id === rentalId) {
                return {
                    ...rental,
                    status: RENTAL_STATUS.Cancelled,
                };
            }

            return rental;
        });
    }

    const handleDelete = (rental: RentalWithAllDetails) => {
        acceptanceModalStore.open({
            title: t('app.acceptance_modal.cancellation_title'),
            message: t('app.acceptance_modal.cancellation_desc'),
            async onConfirm() {
                await cancelRental(rental._id);
                onRentalCancelled(rental._id);
            },
        });
    };
</script>

<template>
    <ProtectedHeader title="All rentals">
        <Button size="sm" class="flex items-center gap-3">
            <Icon icon="material-symbols:add-rounded" class="text-xl" />
            New Rental
        </Button>
    </ProtectedHeader>

    <RentalsFilter
        @setStatus="filters.status = $event"
        @setSearch="filters.search = $event"
        @setSort="sorting.sort = $event"
        :status="filters.status"
        :search="filters.search"
        :sort="sorting.sort"
    />

    <RentalsTable :rows="rentals" :columns="columns" :loading="loading">
        <template #actions="{ row }">
            <div class="w-[120px] bg-main-bg rounded-md">
                <button
                    @click="console.log(row._id)"
                    class="px-3 py-2 w-full text-left hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                >
                    <Icon icon="lucide:edit" class="text-xl" />
                    Edit
                </button>

                <button
                    @click="handleDelete(row)"
                    class="px-3 py-2 w-full text-left hover:bg-red-600/10 cursor-pointer flex items-center gap-2 text-red-600 transition rounded-bl-md rounded-br-md"
                >
                    <Icon icon="material-symbols:cancel-outline-rounded" class="text-xl" />
                    Cancel
                </button>
            </div>
        </template>
    </RentalsTable>
</template>
