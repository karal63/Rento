import { useCarsQuery } from '@/entities/car';
import { ref } from 'vue';

export const useCreateRentalOptions = () => {
    const carSearch = ref('');
    const carsQuery = useCarsQuery(carSearch);

    return {
        carSearch,
        cars: carsQuery.data,
        isLoading: carsQuery.isLoading,
    };
};
