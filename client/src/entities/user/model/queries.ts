import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import type { User } from './types';
import { apiGetFoundUsers } from '../api/user.api';

export const useFoundUsersQuery = (search: Ref<string>) =>
    useQuery<User[], Error>({
        queryKey: ['foundUsers', search],
        queryFn: () => apiGetFoundUsers(search.value).then(r => r.data),
        placeholderData: keepPreviousData,
    });
