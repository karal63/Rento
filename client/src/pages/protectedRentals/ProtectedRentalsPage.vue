<script setup lang="ts">
    import { useRentalsQuery, type RentalWithAllDetails } from '@/entities/rental';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { useCancelRental } from '@/features/cancelRental';
    import { useFilterRentals } from '@/features/filterRentals';
    import { useSortRentals } from '@/features/sortRentals';
    import { Button, type Breadcrumb } from '@/shared/ui';
    import type { TableColumn } from '@/shared/ui/table';
    import { ProtectedHeader, RentalsFilter, RentalsTable } from '@/widgets';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: t('app.protected_rentals_page.rentals'),
        },
    ];

    const acceptanceModalStore = useAcceptanceModalStore();
    const filters = useFilterRentals();
    const sorting = useSortRentals();
    const { cancelRental } = useCancelRental();

    const page = ref(1);

    const queryParams = computed(() => ({
        ...filters,
        ...sorting,
        page: page.value,
    }));

    const { data, isLoading } = useRentalsQuery(queryParams);

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });

    const columns: TableColumn<RentalWithAllDetails>[] = [
        {
            key: 'rentalPeriod',
            header: t('app.protected_rentals_page.period'),
            render: rental =>
                `${new Date(rental.rentFrom).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })} - ${new Date(rental.rentTo).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}`,
            width: '35%',
            minWidth: 300,
        },
        {
            key: 'status',
            header: t('app.protected_rentals_page.status'),
            render: rental => rental.status,
            width: '15%',
        },
        {
            key: 'name',
            header: t('app.protected_rentals_page.car_name'),
            render: rental => rental.carId.name,
        },
        {
            key: 'createdAt',
            header: t('app.table.created_at'),
            render: rental => new Date(rental.createdAt).toLocaleString(),
        },
        {
            key: 'createdBy',
            header: t('app.table.created_by'),
            render: rental => rental.userId.name,
        },
    ];

    const handleDelete = (rental: RentalWithAllDetails) => {
        acceptanceModalStore.open({
            title: t('app.acceptance_modal.cancellation_title'),
            message: t('app.acceptance_modal.cancellation_desc'),
            async onConfirm() {
                cancelRental(rental._id);
            },
        });
    };
</script>

<!-- deleting user is not cached, fix it -->

<template>
    <ProtectedHeader :title="t('app.protected_rentals_page.all_rentals')">
        <RouterLink to="rentals/create">
            <Button size="sm" class="flex items-center gap-3">
                <Icon icon="material-symbols:add-rounded" class="text-xl" />
                {{ t('app.protected_rentals_page.new_rental') }}
            </Button>
        </RouterLink>
    </ProtectedHeader>

    <RentalsFilter
        @setStatus="filters.status = $event"
        @setSearch="filters.search = $event"
        @setSort="sorting.sort = $event"
        :status="filters.status"
        :search="filters.search"
        :sort="sorting.sort"
    />

    <RentalsTable
        v-model="page"
        :rows="data?.rentals ?? []"
        :columns="columns"
        :loading="isLoading"
        :pages="data.pages"
    >
        <template #actions="{ row }">
            <div class="w-[120px] bg-main-bg rounded-md">
                <RouterLink
                    :to="`rentals/edit/${row._id}`"
                    class="px-3 py-2 w-full text-left hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                >
                    <Icon icon="lucide:edit" class="text-xl" />
                    {{ t('app.protected_rentals_page.edit') }}
                </RouterLink>

                <button
                    @click="handleDelete(row)"
                    class="px-3 py-2 w-full text-left hover:bg-red-600/10 cursor-pointer flex items-center gap-2 text-red-600 transition rounded-bl-md rounded-br-md"
                >
                    <Icon icon="material-symbols:cancel-outline-rounded" class="text-xl" />
                    {{ t('app.protected_rentals_page.cancel') }}
                </button>
            </div>
        </template>
    </RentalsTable>
</template>
