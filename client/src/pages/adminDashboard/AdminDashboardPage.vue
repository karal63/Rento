<script setup lang="ts">
    import type { Breadcrumb } from '@/shared/ui';
    import {
        ActiveRentals,
        LastPayments,
        RentalsChart,
        TotalAdminCards,
        UsersStats,
    } from '@/widgets';
    import { onMounted } from 'vue';
    import { useAdminDashboardStore } from '@/features/adminDashboard';

    const adminDashboarStore = useAdminDashboardStore();

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: 'Dashboard',
        },
    ];

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
        await adminDashboarStore.getData();
    });
</script>

<template>
    <div class="xl:flex xl:flex-row xl:gap-7">
        <TotalAdminCards class="w-full xl:w-1/2" />
        <UsersStats class="w-full xl:w-1/2 mt-4 xl:mt-0" />
    </div>
    <div class="mt-4 xl:my-7 xl:flex xl:flex-row xl:gap-7">
        <ActiveRentals class="w-full xl:w-2/3" />
        <LastPayments class="w-full xl:w-1/3 mt-4 xl:mt-0" />
    </div>
    <div class="mt-4 xl:my-7 xl:flex xl:flex-row xl:gap-7">
        <RentalsChart class="w-full xl:w-[60%]" />
    </div>
</template>
