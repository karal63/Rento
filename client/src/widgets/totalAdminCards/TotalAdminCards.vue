<script setup lang="ts">
    import type { DashboardSummary } from '@/features/adminDashboard/model/types';
    import { DashboardCard } from '@/shared/ui';

    defineProps<{
        data: DashboardSummary | undefined;
    }>();
</script>

<template>
    <section class="grid grid-cols-2 gap-4 md:gap-7">
        <DashboardCard
            color="blue"
            icon="material-symbols-light:car-rental"
            :value="data?.rentals.totalRentals"
            text="Total rentals"
            class="shadow-md"
        />
        <DashboardCard
            color="blue"
            icon="material-symbols-light:calendar-month"
            :value="data?.rentals.totalRentalsThisMonth"
            text="Total rentals this month"
            class="shadow-md"
        />
        <DashboardCard
            color="theme"
            icon="basil:user-solid"
            :value="data?.users.totalUsers"
            text="Total users"
            class="shadow-md"
        />
        <DashboardCard
            color="theme"
            icon="material-symbols:star-rounded"
            :value="data?.rentals.totalActiveRentals"
            text="Total acrive rentals"
            class="shadow-md"
        />
    </section>
</template>
