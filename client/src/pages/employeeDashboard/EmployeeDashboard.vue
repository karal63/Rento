<script setup lang="ts">
    import { RENTAL_STATUS, useRentalsQuery, type RentalWithAllDetails } from '@/entities/rental';
    import { ChangeStatusButton, ChangeStatusModal } from '@/features/changeStatus';
    import { RentalActions } from '@/features/rentalActions';
    import { UnassignRentalButton } from '@/features/unassignRental';
    import { useBreakpoint } from '@/shared/lib';
    import { Button, type Breadcrumb } from '@/shared/ui';
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
    const isMobilePanelOpen = ref(false);
    const selectedRental = ref<RentalWithAllDetails | null>(null);

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

    const openMobileMenu = (rental: RentalWithAllDetails) => {
        selectedRental.value = rental;
        isMobilePanelOpen.value = !isMobilePanelOpen.value;
    };
</script>

<template>
    <RentalActions :is-mobile-menu-open="isMobilePanelOpen" @close="isMobilePanelOpen = false">
        <div class="px-5 pt-4">
            <ChangeStatusButton :rental="selectedRental" @closeMenu="isMobilePanelOpen = false" />
            <UnassignRentalButton :rental="selectedRental" @closeMenu="isMobilePanelOpen = false" />
        </div>
    </RentalActions>

    <!-- TEMPORARY here, move to modal providers for future cases -->
    <ChangeStatusModal />

    <ProtectedHeader title="Rentals assigned to you">
        <Button
            size="sm"
            color="transparent"
            class="border border-main-border flex items-center gap-2"
        >
            <Icon icon="material-symbols-light:history-rounded" class="text-2xl" />
            <span class="hidden sm:block">History</span>
        </Button>
    </ProtectedHeader>

    <RentalCards
        v-if="isMobile"
        :rows="rentals"
        :loading="isFetching"
        :pages="pages"
        v-model="page"
    >
        <template #actions="{ rental }">
            <button
                @click="openMobileMenu(rental)"
                class="absolute top-3 right-3 text-xl cursor-pointer"
            >
                <Icon icon="pepicons-pencil:dots-y" />
            </button>
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
                    {{ t('app.tickets_page.pick') }}
                </button>
            </div>
        </template>
    </RentalsTable>
</template>
