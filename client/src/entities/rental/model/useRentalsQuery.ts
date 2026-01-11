import { ref, watchEffect, type ComputedRef } from 'vue';
import { apiGetAllRentals } from '../api/rental.api';
import type { RentalStatus, RentalWithAllDetails } from './rental.types';

export function useRentalsQuery(queryParams: ComputedRef<{ status: RentalStatus | '' }>) {
    const rentals = ref<RentalWithAllDetails[]>([]);
    const loading = ref(false);

    watchEffect(async () => {
        loading.value = true;
        rentals.value = (await apiGetAllRentals({ ...queryParams.value })).data;
        loading.value = false;
    });

    return { rentals, loading };
}
