<script setup lang="ts">
    import { useAdminDashboardStore } from '@/features/adminDashboard';
    import { Button, ToolTip } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';

    const adminDashboard = useAdminDashboardStore();
    const { t } = useI18n();

    const getPercent = (count = 0, total = 0): number => {
        if (!total) return 0;

        return Math.min(100, Math.round((count / total) * 100));
    };

    const userStats = computed(() => [
        {
            label: t('app.admin_page.active_users'),
            value: adminDashboard.data?.users.activeUsersTotal,
            toolTip: t('app.admin_page.active_users_tooltip'),
        },
        {
            label: t('app.admin_page.inactive_users'),
            value: adminDashboard.data?.users.inactiveUsersTotal,
            toolTip: t('app.admin_page.inactive_users_tooltip'),
        },
        {
            label: t('app.admin_page.repeat_clients'),
            value: adminDashboard.data?.users.repeatClientsTotal,
            toolTip: t('app.admin_page.repeat_clients_tooltip'),
        },
    ]);
</script>

<template>
    <section v-if="adminDashboard.loading" class="rounded-md p-5 shadow-md skeleton"></section>
    <section v-else class="bg-main-gray-bg rounded-md p-5 shadow-md">
        <h2 class="font-semibold">{{ t('app.admin_page.user_statistics') }}</h2>

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
                    {{ t('app.admin_page.view_all') }}
                </Button>
            </RouterLink>
        </div>
    </section>
</template>
