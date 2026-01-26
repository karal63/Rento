<script setup lang="ts">
    import { Input } from '@/shared/ui';
    import { calculateDays } from '@/entities/date';

    import { computed, watch } from 'vue';
    import { useBookingStore } from '../model/booking.store';
    import { useUserStore } from '@/entities/user';
    import Button from '@/shared/ui/button/Button.vue';
    import { useI18n } from 'vue-i18n';
    import { useCarStore } from '@/entities/car';

    const bookingStore = useBookingStore();
    const userStore = useUserStore();
    const carStore = useCarStore();
    const { t } = useI18n();

    const isDisabled = computed(() => {
        return (
            !bookingStore.pickupTime ||
            !bookingStore.location ||
            !bookingStore.period.dateFrom ||
            !bookingStore.period.dateTo
        );
    });

    watch(
        () => bookingStore.period,
        () => {
            if (!bookingStore.period.dateFrom || !bookingStore.period.dateTo) return;

            bookingStore.daysCount = calculateDays(
                bookingStore.period.dateFrom,
                bookingStore.period.dateTo
            );
        },
        { deep: true }
    );
</script>

<template>
    <form @click.prevent>
        <h2 class="text-2xl mb-3">{{ t('app.auth.rent_details') }}</h2>

        <div class="flex-col gap-2">
            <div>
                <label class="block text-sm font-medium text-main-gray mb-1">
                    {{ t('app.auth.pickup_date') }}
                </label>

                <slot />
            </div>

            <div>
                <label class="block text-sm font-medium text-main-gray mb-1">
                    {{ t('app.auth.pickup_time') }}
                </label>
                <Input v-model="bookingStore.pickupTime" type="time" size="medium" class="w-full" />
            </div>

            <div>
                <label class="block text-sm font-medium text-main-gray mb-1">
                    {{ t('app.auth.pickup_location') }}
                </label>
                <Input
                    v-model="bookingStore.location"
                    size="medium"
                    placeholder="Airport, Main Office, Hotel..."
                    class="w-full"
                />
            </div>

            <div v-if="userStore.isAuthenticated" class="flex justify-end mt-5">
                <RouterLink :to="`/book/${carStore.selectedCar?._id}/payment`">
                    <Button size="sm" class="flex-center gap-3" :disabled="isDisabled">
                        {{ t('app.proceed') }}
                    </Button>
                </RouterLink>
            </div>
        </div>
    </form>
</template>
