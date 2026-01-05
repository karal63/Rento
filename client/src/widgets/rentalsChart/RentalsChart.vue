<script setup lang="ts">
    import { useAdminDashboardStore } from '@/features/adminDashboard';
    import { Chart } from '@/shared/ui/chart';
    import { useI18n } from 'vue-i18n';

    const adminDashboard = useAdminDashboardStore();
    const { t } = useI18n();
</script>

<template>
    <section v-if="adminDashboard.loading" class="skeleton h-96 rounded-md p-5 shadow-md"></section>
    <section v-else class="bg-main-gray-bg rounded-md p-5 shadow-md">
        <h2 class="font-semibold">{{ t('app.admin_page.rentals_overview') }}</h2>
        <div class="mt-5">
            <Chart :rentalsStats="adminDashboard.data?.rentals.last6MonthsRentals" />
        </div>
    </section>
</template>
