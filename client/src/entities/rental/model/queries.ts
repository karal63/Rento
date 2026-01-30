import { useQuery } from '@tanstack/vue-query';
import { apiGetAllRentals, apiGetCarAvailability, getRentalById } from '../api/rental.api';
import type {
    CarAvailability,
    RentalStatus,
    RentalWithAllDetails,
    SortMethod,
} from './rental.types';
import { computed, type ComputedRef, type Ref } from 'vue';

export function useCarAvailabilityQuery(
    carId: Ref<string | undefined> | ComputedRef<string | undefined>,
    excludedId?: Ref<string | undefined>
) {
    if (!carId) return;

    return useQuery<CarAvailability[], Error>({
        queryKey: ['carAvailability', carId],
        queryFn: () => apiGetCarAvailability(carId.value!, excludedId?.value).then(r => r.data),
        enabled: computed(() => Boolean(carId.value)),
    });
}

export function useRentalsQuery(
    queryParams: ComputedRef<{
        status: RentalStatus | '';
        search: string;
        sort: SortMethod | null;
        page: number;
    }>
) {
    return useQuery<{ rentals: RentalWithAllDetails[]; pages: number }, Error>({
        queryKey: ['rentals', queryParams],
        queryFn: () => apiGetAllRentals({ ...queryParams.value }).then(r => r.data),
        initialData: () => ({
            rentals: [],
            pages: 1,
        }),
    });
}

export function useRentalQuery(rentalId: string) {
    return useQuery<RentalWithAllDetails, Error>({
        queryKey: ['rentals', rentalId],
        queryFn: () => getRentalById(rentalId).then(r => r.data),
    });
}
