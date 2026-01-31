<script setup lang="ts">
    import { useRentalsQuery, type RentalWithAllDetails } from '@/entities/rental';
    import { useBreakpoint } from '@/shared/lib';
    import type { Breadcrumb } from '@/shared/ui';
    import type { TableColumn } from '@/shared/ui/table';
    import { RentalCards, RentalsTable } from '@/widgets';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const { isMobile } = useBreakpoint();

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
        status: 'PENDING' as const,
        search: '',
        sort: null,
        page: page.value,
    }));
    const page = ref(1);

    const { data, isLoading } = useRentalsQuery(pendingParams);

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
</script>

<template>
    <RentalCards
        v-if="isMobile"
        :rows="data.rentals"
        :loading="isLoading"
        :pages="data.pages"
        v-model="page"
    />

    <RentalsTable
        v-else
        :columns="columns"
        :rows="data.rentals"
        :loading="isLoading"
        :pages="data.pages"
        v-model="page"
    >
        <template #actions="{ row }">
            <div class="min-w-max bg-main-bg rounded-md">
                <button
                    @click="console.log(row)"
                    class="px-3 py-2 w-full text-left text-green-600 hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                >
                    <Icon icon="material-symbols:add-rounded" class="text-xl" />
                    Pick
                </button>
            </div>
        </template>
    </RentalsTable>
</template>
