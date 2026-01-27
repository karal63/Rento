import { useCarsQuery } from '@/entities/car';
import { useFoundUsersQuery } from '@/entities/user';
import { refDebounced } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useRentalOptions = () => {
    const carSearch = ref('');
    const userSearch = ref('');
    const debouncedCarSearch = refDebounced(carSearch, 700);
    const debouncedUserSearch = refDebounced(userSearch, 700);

    const carsQuery = useCarsQuery(debouncedCarSearch);
    const usersQuery = useFoundUsersQuery(debouncedUserSearch);

    const isLoading = computed(
        () =>
            carsQuery.isFetching.value ||
            usersQuery.isFetching.value ||
            userSearch.value !== debouncedUserSearch.value ||
            carSearch.value !== debouncedCarSearch.value
    );

    return {
        carSearch,
        userSearch,
        cars: carsQuery.data,
        users: usersQuery.data,
        isLoading,
    };
};
