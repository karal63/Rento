import { apiGetRentals, type RentalWithCar } from '@/entities/rental';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRentalsStore = defineStore('rentals', () => {
    const rentals = ref<RentalWithCar[]>([]);

    const getRentals = async () => {
        try {
            rentals.value = (await apiGetRentals()).data;
        } catch (error) {
            console.log(error);
        }
    };

    return { getRentals, rentals };
});
