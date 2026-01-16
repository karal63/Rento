<script setup lang="ts">
    import { useAdminDashboardStore } from '@/features/adminDashboard';
    import { DashboardCard, SkeletonCard } from '@/shared/ui/dashboardCard';
    import { useI18n } from 'vue-i18n';

    const adminDashboard = useAdminDashboardStore();
    const { t } = useI18n();
</script>

<template>
    <section v-if="adminDashboard.loading" class="grid grid-cols-2 gap-4 xl:gap-7">
        <SkeletonCard v-for="(_, i) in 4" :key="i" />
    </section>
    <section v-else class="grid grid-cols-2 gap-4 xl:gap-7">
        <DashboardCard
            color="blue"
            icon="material-symbols-light:car-rental"
            :value="adminDashboard.data?.rentals.totalRentals"
            :text="t('app.admin_page.total_rentals')"
            class="shadow-md"
        />
        <DashboardCard
            color="blue"
            icon="material-symbols-light:calendar-month"
            :value="adminDashboard.data?.rentals.totalRentalsThisMonth"
            :text="t('app.admin_page.total_rentals_this_month')"
            class="shadow-md"
        />
        <DashboardCard
            color="theme"
            icon="basil:user-solid"
            :value="adminDashboard.data?.users.totalUsers"
            :text="t('app.admin_page.total_users')"
            class="shadow-md"
        />
        <DashboardCard
            color="theme"
            icon="material-symbols:star-rounded"
            :value="adminDashboard.data?.rentals.totalActiveRentals"
            :text="t('app.admin_page.total_active_rentals')"
            class="shadow-md"
        />
    </section>
</template>
