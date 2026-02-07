import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { apiGetAllRentals, apiGetCarAvailability, getRentalById } from '../api/rental.api';
import type {
    CarAvailability,
    RentalStatus,
    RentalWithAllDetails,
    SortMethod,
} from './rental.types';
import { computed, type ComputedRef, type Ref } from 'vue';
import type { AppError } from '@/shared/model';

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
        statuses?: (RentalStatus | '')[];
        search?: string;
        sort?: SortMethod | null;
        page?: number;
        unassigned?: boolean;
        my?: boolean;
    }>
) {
    return useQuery<{ rentals: RentalWithAllDetails[]; pages: number }, Error>({
        queryKey: ['rentals', queryParams],
        queryFn: () => apiGetAllRentals({ ...queryParams.value }).then(r => r.data),
        placeholderData: keepPreviousData,
    });
}

export function useRentalQuery(rentalId: string) {
    return useQuery<RentalWithAllDetails, AppError>({
        queryKey: ['rentals', rentalId],
        queryFn: () => getRentalById(rentalId).then(r => r.data),
    });
}
