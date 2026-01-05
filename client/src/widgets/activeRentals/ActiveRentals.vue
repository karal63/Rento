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
            <thead>
                <tr class="text-sm text-main-gray">
                    <td class="py-1">
                        {{ t('app.admin_page.name') }}
                    </td>
                    <td class="py-1">{{ t('app.admin_page.ends_in') }}</td>
                    <td class="py-1">{{ t('app.admin_page.total_price') }}</td>
                    <td class="py-1">{{ t('app.admin_page.status') }}</td>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="rental in adminDashboard.data?.rentals.activeRentals"
                    :key="rental._id"
                    class="border-t border-main-border text-sm"
                >
                    <td class="py-4 w-1/2 font-semibold">{{ rental.carId.name }}</td>
                    <td class="py-4 w-[16%] font-semibold text-main-gray">
                        {{ formatTimeLeft(new Date(rental.rentTo)) }}
                    </td>
                    <td class="py-4 w-[16%] font-semibold text-main-gray">
                        {{ rental.totalPrice / 100 }}{{ t('app.zl') }}
                    </td>
                    <td class="py-4 w-[16%] font-semibold text-green-600">{{ rental.status }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
