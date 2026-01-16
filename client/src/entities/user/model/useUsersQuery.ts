import { ref, watchEffect, type ComputedRef } from 'vue';
import { apiGetUsers } from '../api/user.api';
import type { User } from './types';
import type { SortMethod } from '@/entities/rental';

export function useUsersQuery(
    queryParams: ComputedRef<{
        search: string;
        sort: SortMethod | null;
    }>
) {
    const users = ref<User[]>([]);
    const loading = ref(true);

    watchEffect(async () => {
        loading.value = true;
        users.value = (await apiGetUsers({ ...queryParams.value })).data;
        loading.value = false;
    });

    return { users, loading };
}
