import { useCarsQuery } from '@/entities/car';
import { useFoundUsersQuery } from '@/entities/user';
import { refDebounced } from '@vueuse/core';
import { ref } from 'vue';

export const useCreateRentalOptions = () => {
    const carSearch = ref('');
    const userSearch = ref('');
    const debouncedCarSearch = refDebounced(carSearch, 700);
    const debouncedUserSearch = refDebounced(userSearch, 700);

    const carsQuery = useCarsQuery(debouncedCarSearch);
    const usersQuery = useFoundUsersQuery(debouncedUserSearch);

    return {
        carSearch,
        userSearch,
        cars: carsQuery.data,
        users: usersQuery.data,
        isLoading: carsQuery.isLoading || usersQuery.isLoading,
    };
};
