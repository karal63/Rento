import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import type { ComputedRef, Ref } from 'vue';
import type { User } from './types';
import { apiGetFoundUsers, apiGetUsers } from '../api/user.api';
import type { SortMethod } from '@/entities/rental';

export const useFoundUsersQuery = (search: Ref<string>) =>
    useQuery<User[], Error>({
        queryKey: ['foundUsers', search],
        queryFn: () => apiGetFoundUsers(search.value).then(r => r.data),
        placeholderData: keepPreviousData,
    });

export function useUsersQuery(
    queryParams: ComputedRef<{
        search: string;
        sort: SortMethod | null;
        page: number;
    }>
) {
    return useQuery<{ users: User[]; pages: number }, Error>({
        queryKey: ['users', queryParams],
        queryFn: () => apiGetUsers({ ...queryParams.value }).then(r => r.data),
        placeholderData: keepPreviousData,
    });
}
