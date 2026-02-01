<script setup lang="ts">
    import { RENTAL_STATUS, useRentalsQuery, type RentalWithAllDetails } from '@/entities/rental';
    import { useBreakpoint } from '@/shared/lib';
    import type { Breadcrumb } from '@/shared/ui';
    import type { TableColumn } from '@/shared/ui/table';
    import { ProtectedHeader, RentalCards, RentalsTable } from '@/widgets';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const { isMobile } = useBreakpoint();

    const breadcrumbs = [
        {
            label: t('app.employee_page.dashboard'),
        },
    ];

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    onMounted(() => {
        emit('setBreadcrumbs', breadcrumbs);
    });

    const pendingParams = computed(() => ({
        statuses: [RENTAL_STATUS.Pending, RENTAL_STATUS.Active],
        page: page.value,
        my: true,
    }));
    const page = ref(1);

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
            width: '25%',
            minWidth: 300,
        },
        {
            key: 'status',
            header: t('app.protected_rentals_page.status'),
            render: rental => rental.status,
            width: '25%',
        },
        {
            key: 'name',
            header: t('app.protected_rentals_page.car_name'),
            render: rental => rental.carId.name,
            width: '25%',
        },
    ];
</script>

<template>
    <ProtectedHeader title="Rentals assigned to you" />

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
                    @click="console.log(rental._id)"
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
                    @click="console.log(row._id)"
                    class="px-3 py-2 w-full text-left text-green-600 hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                >
                    <Icon icon="material-symbols:add-rounded" class="text-xl" />
                    Pick
                </button>
            </div>
        </template>
    </RentalsTable>
</template>
