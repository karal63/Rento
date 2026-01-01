<script setup lang="ts">
    import type { DashboardSummary } from '@/features/adminDashboard/model/types';
    import { useAdminDashboard } from '@/features/adminDashboard/model/useAdminDashboard';
    import { DashboardCard } from '@/shared/ui';
    import { onMounted, ref } from 'vue';

    const data = ref<DashboardSummary>();

    onMounted(async () => {
        data.value = await useAdminDashboard();
    });
</script>

<template>
    <section>
        <div class="flex-between gap-5">
            <div class="w-1/2 grid grid-cols-2 gap-4">
                <DashboardCard
                    color="blue"
                    icon="material-symbols-light:car-rental"
                    :value="data?.rentals.totalRentals"
                    text="Total rentals"
                />
                <DashboardCard
                    color="theme"
                    icon="basil:user-solid"
                    :value="data?.users.totalUsers"
                    text="Total users"
                />
                <DashboardCard
                    color="theme"
                    icon="material-symbols:star-rounded"
                    :value="data?.rentals.totalActiveRentals"
                    text="Total acrive rentals"
                />
            </div>
            <div class="w-1/2"></div>
        </div>
    </section>
</template>
