import { useCarsQuery } from '@/entities/car';
import { USER_ROLE, useUsersQuery } from '@/entities/user';
import { refDebounced } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useRentalOptions = () => {
    const carSearch = ref('');
    const userSearch = ref('');
    const employeeSearch = ref('');
    const debouncedCarSearch = refDebounced(carSearch, 700);
    const debouncedUserSearch = refDebounced(userSearch, 700);
    const debouncedEmployeeSearch = refDebounced(employeeSearch, 700);

    const carsQuery = useCarsQuery(debouncedCarSearch);
    const usersQuery = useUsersQuery(computed(() => ({ search: debouncedUserSearch.value })));
    const employeeQuery = useUsersQuery(computed(() => ({ role: USER_ROLE.Employee })));

    const isLoading = computed(
        () =>
            carsQuery.isFetching.value ||
            usersQuery.isFetching.value ||
            employeeQuery.isFetching.value ||
            userSearch.value !== debouncedUserSearch.value ||
            carSearch.value !== debouncedCarSearch.value ||
            employeeSearch.value !== debouncedEmployeeSearch.value
    );

    return {
        carSearch,
        userSearch,
        employeeSearch,
        cars: carsQuery.data,
        users: usersQuery.data,
        employees: employeeQuery.data,
        isLoading,
    };
};
