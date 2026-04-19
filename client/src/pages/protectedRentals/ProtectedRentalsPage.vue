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
    import { computed, onMounted, ref, watch } from 'vue';
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
    const rentals = computed(() => data.value?.rentals ?? []);
    const pages = computed(() => data.value?.pages ?? 1);

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
            key: 'assignedTo',
            header: t('app.table.assigned_to'),
            render: rental =>
                rental.employee ? `${rental.employee.name} ${rental.employee.secondName}` : '-',
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

    watch(page, () => {
        window.scrollTo(0, 0);
    });
</script>

<template>
    <ProtectedHeader :title="t('app.protected_rentals_page.all_rentals')">
        <RouterLink to="rentals/create">
            <Button data-testid="create-rental-btn" size="sm" class="flex items-center gap-3">
                <Icon icon="material-symbols:add-rounded" class="text-xl" />
                {{ t('app.protected_rentals_page.new_rental') }}
            </Button>
        </RouterLink>
    </ProtectedHeader>

    <RentalsFilter
        @setStatus="filters.statuses = [$event]"
        @setSearch="filters.search = $event"
        @setSort="sorting.sort = $event"
        :status="filters.statuses[0] ?? ''"
        :search="filters.search"
        :sort="sorting.sort"
    />

    <RentalsTable
        v-model="page"
        :rows="rentals"
        :columns="columns"
        :loading="isLoading"
        :pages="pages"
    >
        <template #actions="{ row }">
            <div class="min-w-max bg-main-bg rounded-md">
                <RouterLink :to="`rentals/edit/${row._id}`">
                    <Button
                        size="sm"
                        color="transparent"
                        disableUppercase
                        class="w-full flex items-center gap-3"
                    >
                        <Icon icon="lucide:edit" class="text-xl" />
                        {{ t('app.protected_rentals_page.edit') }}
                    </Button>
                </RouterLink>

                <Button
                    size="sm"
                    color="transparent"
                    disableUppercase
                    @click="handleDelete(row)"
                    class="w-full flex items-center gap-3"
                >
                    <Icon icon="material-symbols:cancel-outline-rounded" class="text-xl" />
                    {{ t('app.protected_rentals_page.cancel') }}
                </Button>

                <RouterLink :to="`rentals/${row._id}`">
                    <Button
                        size="sm"
                        color="transparent"
                        disableUppercase
                        class="w-full flex items-center gap-3"
                    >
                        <Icon icon="ri:more-fill" class="text-xl" />
                        {{ t('app.button.more_details') }}
                    </Button>
                </RouterLink>
            </div>
        </template>
    </RentalsTable>
</template>
