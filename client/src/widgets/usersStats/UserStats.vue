<script setup lang="ts">
    import { useAdminDashboardStore } from '@/features/adminDashboard';
    import { Button, ToolTip } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { computed } from 'vue';

    const adminDashboard = useAdminDashboardStore();

    const getPercent = (count = 0, total = 0): number => {
        if (!total) return 0;

        return Math.min(100, Math.round((count / total) * 100));
    };

    const userStats = computed(() => [
        {
            label: 'Active users',
            value: adminDashboard.data?.users.activeUsersTotal,
            toolTip: 'Users who made a rental at least once in the last 30 days',
        },
        {
            label: 'Inactive users',
            value: adminDashboard.data?.users.inactiveUsersTotal,
            toolTip: "Users who didn't make a rental at least once in the last 30 days",
        },
        {
            label: 'Repeat clients',
            value: adminDashboard.data?.users.repeatClientsTotal,
            toolTip: 'Users who made multiple rentals. Percentage calculation based on user total',
        },
    ]);
</script>

<template>
    <section v-if="adminDashboard.loading" class="rounded-md p-5 shadow-md skeleton"></section>
    <section v-else class="bg-main-gray-bg rounded-md p-5 shadow-md">
        <h2 class="font-semibold">User statistics</h2>

        <div class="mt-5">
            <div v-for="stat in userStats" :key="stat.label" class="flex-col gap-2 mb-4">
                <div class="flex-between">
                    <h4 class="font-semibold text-sm flex items-center gap-2">
                        {{ stat.label }}
                        <ToolTip :text="stat.toolTip">
                            <Icon
                                icon="material-symbols:info-outline-rounded"
                                class="text-lg text-main-gray"
                            />
                        </ToolTip>
                    </h4>
                    <span class="text-main-gray font-semibold">
                        {{ getPercent(stat.value, adminDashboard.data?.users.totalUsers) }}%
                    </span>
                </div>

                <div class="relative">
                    <div class="w-full h-1 bg-main-border rounded-md"></div>
                    <div
                        class="absolute left-0 top-0 h-2 bg-primary rounded-md transform -translate-0.5"
                        :style="{
                            width: `${getPercent(stat.value, adminDashboard.data?.users.totalUsers)}%`,
                        }"
                    ></div>
                </div>
            </div>
        </div>

        <div class="mt-5 flex justify-end">
            <RouterLink to="/admin/users">
                <Button size="sm" color="transparent" class="border border-main-lightgray">
                    View all
                </Button>
            </RouterLink>
        </div>
    </section>
</template>
