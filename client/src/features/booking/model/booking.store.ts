import type { RentalPeriod } from '@/entities/rental';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookingStore = defineStore('booking', () => {
    const daysCount = ref(0);
    const period = ref<RentalPeriod>({
        dateFrom: null,
        dateTo: null,
    });
    const pickupTime = ref<string>('');
    const location = ref<string>('');

    return {
        daysCount,
        pickupTime,
        location,
        period,
    };
});
