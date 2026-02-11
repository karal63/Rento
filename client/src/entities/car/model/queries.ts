import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { apiGetCars, apiGetFoundCars } from '../api/car.api';
import type { ComputedRef, Ref } from 'vue';
import type { Car } from './car.types';

export const useCarsQuery = (search: Ref<string>) =>
    useQuery<Car[], Error>({
        queryKey: ['foundCars', search],
        queryFn: () => apiGetFoundCars(search.value).then(r => r.data),
        placeholderData: keepPreviousData,
    });

export const useAllCarsQuery = (
    carsOptions: ComputedRef<{
        page: number;
        brands?: string[];
        search?: string;
    }>
) =>
    useQuery<{ cars: Car[]; pagesAmount: number; allBrands: string[] }, Error>({
        queryKey: ['allCars', carsOptions.value],
        queryFn: () => apiGetCars({ ...carsOptions.value }).then(r => r.data),
        placeholderData: keepPreviousData,
    });
