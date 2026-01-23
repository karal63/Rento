import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { apiGetFoundCars } from '../api/car.api';
import { computed, type Ref } from 'vue';
import type { Car } from './car.types';

export const useCarsQuery = (search: Ref<string>) =>
    useQuery<Car[], Error>({
        queryKey: ['foundCars', search],
        queryFn: () => apiGetFoundCars(search.value).then(r => r.data),
        placeholderData: keepPreviousData,
        enabled: computed(() => search.value.length > 0),
    });
