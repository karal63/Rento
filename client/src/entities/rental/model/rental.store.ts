import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RentalWithCar } from './rental.types';
import { apiGetRentals } from '../api/rental.api';

export const useRentalStore = defineStore('rentals', () => {
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
