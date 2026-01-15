import { ref, watchEffect } from 'vue';
import { apiGetUsers } from '../api/user.api';
import type { User } from './types';

export function useUsersQuery() {
    const users = ref<User[]>([]);
    const loading = ref(true);

    watchEffect(async () => {
        loading.value = true;
        users.value = (await apiGetUsers()).data;
        loading.value = false;
    });

    return { users, loading };
}
