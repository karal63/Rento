import { useCarsQuery } from '@/entities/car';
import { refDebounced } from '@vueuse/core';
import { ref } from 'vue';

export const useCreateRentalOptions = () => {
    const carSearch = ref('');
    const debouncedSearch = refDebounced(carSearch, 700);

    const carsQuery = useCarsQuery(debouncedSearch);

    return {
        carSearch,
        cars: carsQuery.data,
        isLoading: carsQuery.isLoading,
    };
};
