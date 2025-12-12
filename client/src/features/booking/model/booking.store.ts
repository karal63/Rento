import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookingStore = defineStore('booking', () => {
    const daysCount = ref(0);
    const pickupTime = ref<string>('');
    const location = ref<string>('');

    return {
        daysCount,
        pickupTime,
        location,
    };
});
