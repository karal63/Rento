<script setup lang="ts">
    import type { Breadcrumb } from '@/shared/ui';
    import { ActiveRentals, TotalAdminCards } from '@/widgets';
    import { onMounted, ref } from 'vue';
    import type { DashboardSummary } from '@/features/adminDashboard/model/types';
    import { useAdminDashboard } from '@/features/adminDashboard/model/useAdminDashboard';

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();
    const data = ref<DashboardSummary>();

    const breadcrumbs = [
        {
            label: 'Dashboard',
        },
    ];

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
        data.value = await useAdminDashboard();
    });
</script>

<template>
    <div class="flex">
        <TotalAdminCards :data="data" class="w-1/2" />
    </div>
    <div class="my-7">
        <ActiveRentals :activeRentals="data?.rentals.activeRentals" class="w-2/3" />
    </div>
</template>
