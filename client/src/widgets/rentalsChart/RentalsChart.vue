<script setup lang="ts">
    import { useAdminDashboardStore } from '@/features/adminDashboard';
    import { Chart } from '@/shared/ui/chart';

    const adminDashboard = useAdminDashboardStore();
</script>

<template>
    <section v-if="adminDashboard.loading" class="skeleton h-96 rounded-md p-5 shadow-md"></section>
    <section v-else class="bg-main-gray-bg rounded-md p-5 shadow-md">
        <h2 class="font-semibold">Rentals overview</h2>
        <div class="mt-5">
            <Chart :rentalsStats="adminDashboard.data?.rentals.last6MonthsRentals" />
        </div>
    </section>
</template>
