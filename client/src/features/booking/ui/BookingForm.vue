<script setup lang="ts">
    import { Input } from '@/shared/ui';
    import { ref, watch } from 'vue';
    import { VueDatePicker } from '@vuepic/vue-datepicker';
    import { useThemeStore } from '@/shared/model';
    import { useBookingStore } from '../model/booking.store';
    import { calculateDays } from '@/entities/date';

    const themeStore = useThemeStore();
    const bookingStore = useBookingStore();

    const name = ref('');
    const dateRange = ref<Date[]>([]);
    const pickupTime = ref('');
    const location = ref('');

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
    <form class="w-2/3 flex-col gap-8">
        <div class="flex-col gap-4">
            <h2 class="text-2xl mb-3">Rent details</h2>

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

        <div>
            <h2 class="text-2xl mb-3">Personal details</h2>
            <div class="flex-col gap-2">
                <Input v-model="name" size="medium" placeholder="Name" class="w-full" />
                <Input v-model="name" size="medium" placeholder="Second name" class="w-full" />
                <Input v-model="name" size="medium" placeholder="Email addres" class="w-full" />
                <Input v-model="name" size="medium" placeholder="Phone number" class="w-full" />
            </div>
        </div>
    </form>
</template>

<style>
    :root {
        --dp-button-height: 100%;
        --dp-border-radius: 6px;

        --dp-input-padding: 8px 30px 8px 12px;
    }

    .dp__theme_light {
        --dp-background-color: #efefef;
        --dp-border-color-focus: hsl(220 90% 66%);
        --dp-border-color: #d5d5d5;
    }

    .dp__theme_dark {
        --dp-background-color: #141414;
        --dp-border-color-focus: hsl(220 90% 66%);
        --dp-border-color: #292929;
    }
</style>
