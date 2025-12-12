<script setup lang="ts">
    import { VueDatePicker } from '@vuepic/vue-datepicker';
    import { Input } from '@/shared/ui';
    import { useThemeStore } from '@/shared/model';
    import { calculateDays } from '@/entities/date';

    import { ref, watch } from 'vue';
    import { useBookingStore } from '../model/booking.store';

    const themeStore = useThemeStore();
    const bookingStore = useBookingStore();

    const pickupTime = ref('');
    const location = ref('');
    const dateRange = ref<Date[]>([]);

    watch(
        dateRange,
        () => {
            if (!dateRange.value[0] || !dateRange.value[1]) return;
            bookingStore.daysCount = calculateDays(dateRange.value[0], dateRange.value[1]);
        },
        { deep: true }
    );
</script>

<template>
    <form>
        <h2 class="text-2xl mb-3">Rent details</h2>

        <div class="flex-col gap-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="">
                    <label class="block text-sm font-medium text-main-gray mb-1">Pickup Date</label>

                    <VueDatePicker
                        v-model="dateRange"
                        range
                        text-input
                        :time-config="{ enableTimePicker: false }"
                        :enable-time-picker="false"
                        placeholder="Select rental dates"
                        :dark="themeStore.isDark"
                    />
                </div>

                <div class="">
                    <label class="block text-sm font-medium text-main-gray mb-1">Pickup Time</label>
                    <Input v-model="pickupTime" type="time" size="medium" class="w-full" />
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-main-gray mb-1">Pickup Location</label>
                <Input
                    v-model="location"
                    size="medium"
                    placeholder="Airport, Main Office, Hotel..."
                    class="w-full"
                />
            </div>
        </div>
    </form>
</template>
