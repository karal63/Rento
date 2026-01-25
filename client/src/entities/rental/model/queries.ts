import { useQuery } from '@tanstack/vue-query';
import { apiGetCarAvailability } from '../api/rental.api';
import type { CarAvailability } from './rental.types';
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
