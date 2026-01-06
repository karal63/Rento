<script setup lang="ts">
    import { useAdminDashboardStore } from '@/features/adminDashboard';
    import { formatTimeLeft } from '@/shared/lib';
    import { Button } from '@/shared/ui';
    import { useI18n } from 'vue-i18n';

    const adminDashboard = useAdminDashboardStore();
    const { t } = useI18n();
</script>

<template>
    <section v-if="adminDashboard.loading" class="skeleton rounded-md p-5 shadow-md h-96"></section>
    <section v-else class="bg-main-gray-bg rounded-md p-5 shadow-md">
        <div class="flex-between">
            <h2 class="font-semibold">{{ t('app.admin_page.active_rentals') }}</h2>
            <RouterLink to="/admin/rentals">
                <Button size="sm" color="transparent" class="border border-main-lightgray">
                    {{ t('app.admin_page.view_all') }}
                </Button>
            </RouterLink>
        </div>
        <table class="mt-3 w-full">
            <thead class="hidden md:table-header-group">
                <tr class="text-sm text-main-gray">
                    <th class="py-1 text-left">
                        {{ t('app.admin_page.name') }}
                    </th>
                    <th class="py-1 text-left">
                        {{ t('app.admin_page.ends_in') }}
                    </th>
                    <th class="py-1 text-left">
                        {{ t('app.admin_page.total_price') }}
                    </th>
                    <th class="py-1 text-left">
                        {{ t('app.admin_page.status') }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="rental in adminDashboard.data?.rentals.activeRentals"
                    :key="rental._id"
                    class="block md:table-row border border-main-border md:border-0 rounded-md md:rounded-none mb-3 md:mb-0 p-3 md:p-0 text-sm"
                >
                    <td
                        class="text-lg md:text-sm block md:table-cell pb-2 font-semibold"
                        :data-label="t('app.admin_page.name')"
                    >
                        {{ rental.carId.name }}
                    </td>

                    <td
                        class="block md:table-cell py-2 font-semibold text-main-gray"
                        :data-label="t('app.admin_page.ends_in')"
                    >
                        <span class="md:hidden mr-2">{{ t('app.admin_page.ends_in') }}:</span>
                        {{ formatTimeLeft(new Date(rental.rentTo)) }}
                    </td>

                    <td
                        class="block md:table-cell pb-2 font-semibold text-main-gray"
                        :data-label="t('app.admin_page.total_price')"
                    >
                        <span class="md:hidden mr-2">{{ t('app.admin_page.total_price') }}:</span>
                        {{ rental.totalPrice / 100 }}{{ t('app.zl') }}
                    </td>

                    <td
                        class="block md:table-cell pb-2 font-semibold text-green-600"
                        :data-label="t('app.admin_page.status')"
                    >
                        <span class="md:hidden mr-2 text-main-gray">
                            {{ t('app.admin_page.status') }}:
                        </span>
                        {{ rental.status }}
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
