import { ref, watchEffect } from 'vue';
import { apiGetAllRentals } from '../api/rental.api';
import type { RentalWithAllDetails } from './rental.types';

export function useRentalsQuery() {
    const rentals = ref<RentalWithAllDetails[]>([]);
    const loading = ref(false);

    watchEffect(async () => {
        loading.value = true;
        rentals.value = (await apiGetAllRentals()).data;
        loading.value = false;
    });

    return { rentals, loading };
}
