import { useQuery } from '@tanstack/vue-query';
import { apiGetAllRentals, apiGetCarAvailability, getRentalById } from '../api/rental.api';
import type { CarAvailability, RentalStatus, SortMethod } from './rental.types';
import { computed, type ComputedRef, type Ref } from 'vue';

export function useCarAvailabilityQuery(
    carId: Ref<string | undefined> | ComputedRef<string | undefined>
) {
    if (!carId) return;

    return useQuery<CarAvailability[], Error>({
        queryKey: ['carAvailability', carId],
        queryFn: () => apiGetCarAvailability(carId.value!).then(r => r.data),
        enabled: computed(() => Boolean(carId.value)),
    });
}

export function useRentalsQuery(
    queryParams: ComputedRef<{
        status: RentalStatus | '';
        search: string;
        sort: SortMethod | null;
    }>
) {
    return useQuery({
        queryKey: ['rentals', queryParams],
        queryFn: () => apiGetAllRentals({ ...queryParams.value }).then(r => r.data),
    });
}

export function useRentalQuery(rentalId: string) {
    return useQuery({
        queryKey: ['rentals', rentalId],
        queryFn: () => getRentalById(rentalId).then(r => r.data),
    });
}
