import { ref, watch, type ComputedRef } from 'vue';
import { apiGetUsers } from '../api/user.api';
import type { User } from './types';
import type { SortMethod } from '@/entities/rental';

const usersQueryInvalidationCounter = ref(0); // global trigger

export function useUsersQuery(
    queryParams: ComputedRef<{
        search: string;
        sort: SortMethod | null;
    }>
) {
    const users = ref<User[]>([]);
    const loading = ref(true);

    async function fetchUsers() {
        loading.value = true;
        users.value = (await apiGetUsers({ ...queryParams.value })).data;
        loading.value = false;
    }

    watch(
        [queryParams, usersQueryInvalidationCounter],
        () => {
            fetchUsers();
        },
        { immediate: true }
    );

    return { users, loading };
}

export function invalidateUsersQuery() {
    usersQueryInvalidationCounter.value++;
}
