<script setup lang="ts">
    import { Input } from '@/shared/ui';
    import { calculateDays } from '@/entities/date';

    import { computed, watch } from 'vue';
    import { useBookingStore } from '../model/booking.store';
    import { useUserStore } from '@/entities/user';
    import Button from '@/shared/ui/button/Button.vue';
    import { useI18n } from 'vue-i18n';
    import { useCarStore } from '@/entities/car';
    import Calendar from './Calendar.vue';

    const bookingStore = useBookingStore();
    const userStore = useUserStore();
    const carStore = useCarStore();
    const { t } = useI18n();

    const isDisabled = computed(() => {
        return !bookingStore.pickupTime || !bookingStore.location || !bookingStore.dateRange;
    });

    const applyTimeToDate = (date: Date, time: string): Date => {
        const [hours, minutes] = time.split(':').map(Number);

        const result = new Date(date);
        result.setHours(hours!, minutes, 0, 0);

        return result;
    };

    watch(
        () => bookingStore.dateRange,
        () => {
            if (!bookingStore.dateRange[0] || !bookingStore.dateRange[1]) return;

            bookingStore.daysCount = calculateDays(
                bookingStore.dateRange[0],
                bookingStore.dateRange[1]
            );
        },
        { deep: true }
    );

    watch(
        () => bookingStore.pickupTime,
        () => {
            if (!bookingStore.dateRange[0] || !bookingStore.dateRange[1]) return;
            bookingStore.dateRange[0] = applyTimeToDate(
                bookingStore.dateRange[0],
                bookingStore.pickupTime
            );
            bookingStore.dateRange[1] = applyTimeToDate(
                bookingStore.dateRange[1],
                bookingStore.pickupTime
            );
        }
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

                <Calendar />

                <!-- <VueDatePicker
                    v-model="bookingStore.dateRange"
                    range
                    text-input
                    :time-config="{ enableTimePicker: false }"
                    :enable-time-picker="false"
                    :placeholder="t('app.auth.select_rental_dates')"
                    :dark="themeStore.isDark"
                /> -->
            </div>

            <div class="">
                <label class="block text-sm font-medium text-main-gray mb-1">
                    {{ t('app.auth.pickup_time') }}
                </label>
                <Input
                    :disabled="!bookingStore.dateRange[0] || !bookingStore.dateRange[1]"
                    v-model="bookingStore.pickupTime"
                    type="time"
                    size="medium"
                    class="w-full"
                />
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
                        PROCEED
                    </Button>
                </RouterLink>
            </div>
        </div>
    </form>
</template>
