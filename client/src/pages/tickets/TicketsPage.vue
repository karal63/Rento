<script setup lang="ts">
    import { RENTAL_STATUS, useRentalsQuery, type RentalWithAllDetails } from '@/entities/rental';
    import { useAssignToRental } from '@/features/assignToRental';
    import { useSortRentals } from '@/features/sortRentals';
    import { useBreakpoint } from '@/shared/lib';
    import { Button, Dropdown, type Breadcrumb } from '@/shared/ui';
    import type { TableColumn } from '@/shared/ui/table';
    import { RentalCards, RentalsTable } from '@/widgets';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const { isMobile } = useBreakpoint();
    const { assignToRental } = useAssignToRental();
    const sorting = useSortRentals();

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: t('app.tickets_page.tickets'),
        },
    ];

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });

    const pendingParams = computed(() => ({
        statuses: [RENTAL_STATUS.Pending],
        page: page.value,
        unassigned: true,
        sort: sorting.sort,
    }));
    const page = ref(1);
    const isSortByDropdownOpen = ref(false);

    const { data, isFetching } = useRentalsQuery(pendingParams);
    const rentals = computed(() => data.value?.rentals ?? []);
    const pages = computed(() => data.value?.pages ?? 1);

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
            render: rental =>
                rental.userId
                    ? rental.userId.name
                    : `(${t('app.protected_rentals_page.deleted_user')})`,
        },
    ];

    const handlePick = (rentalId: string) => {
        assignToRental(rentalId);
    };

    const sortByList = [
        {
            label: t('app.sort.created_at_latest'),
            callback: () =>
                (sorting.sort = {
                    field: 'createdAt',
                    order: 'desc',
                    label: t('app.sort.by_date_latest'),
                }),
        },
        {
            label: t('app.sort.created_at_oldest'),
            callback: () =>
                (sorting.sort = {
                    field: 'createdAt',
                    order: 'asc',
                    label: t('app.sort.created_at_oldest'),
                }),
        },
        {
            label: t('app.sort.rental_start_closest'),
            callback: () =>
                (sorting.sort = {
                    field: 'rentFrom',
                    order: 'asc',
                    label: t('app.sort.rental_start_closest'),
                }),
        },
        {
            label: t('app.sort.rental_start_oldest'),
            callback: () =>
                (sorting.sort = {
                    field: 'rentFrom',
                    order: 'desc',
                    label: t('app.sort.rental_start_oldest'),
                }),
        },
    ];
</script>

<template>
    <section class="mt-5">
        <hr class="text-main-border" />

        <div class="mt-5">
            <Dropdown
                :isOpen="isSortByDropdownOpen"
                :items="sortByList"
                @close="isSortByDropdownOpen = false"
                class="max-w-max"
            >
                <Button
                    @click="isSortByDropdownOpen = !isSortByDropdownOpen"
                    size="sm"
                    color="transparent"
                    :disableUppercase="true"
                    class="border border-main-border flex-between gap-2 text-sm md:text-base"
                >
                    {{ sorting.sort ? sorting.sort.label : t('app.sort.by_date_latest') }}
                    <Icon
                        icon="weui:arrow-filled"
                        class="transform rotate-90 text-xl text-main-gray"
                    />
                </Button>
            </Dropdown>
        </div>
    </section>

    <RentalCards
        v-if="isMobile"
        :rows="rentals"
        :loading="isFetching"
        :pages="pages"
        v-model="page"
    >
        <template #actions="{ rental }">
            <div class="min-w-max bg-main-bg rounded-md">
                <button
                    @click="handlePick(rental._id)"
                    class="px-3 py-2 w-full text-left text-green-600 hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                >
                    <Icon icon="material-symbols:add-rounded" class="text-xl" />
                    {{ t('app.tickets_page.pick') }}
                </button>
            </div>
        </template>
    </RentalCards>

    <RentalsTable
        v-else
        :columns="columns"
        :rows="rentals"
        :loading="isFetching"
        :pages="pages"
        v-model="page"
    >
        <template #actions="{ row }">
            <div class="min-w-max bg-main-bg rounded-md">
                <button
                    @click="handlePick(row._id)"
                    class="px-3 py-2 w-full text-left text-green-600 hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                >
                    <Icon icon="material-symbols:add-rounded" class="text-xl" />
                    Pick
                </button>
            </div>
        </template>
    </RentalsTable>
</template>
