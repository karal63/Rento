import { axiosInstance } from '@/shared/config';
import { API_GET_USERS_FOUND, API_GET_USERS_LIST } from '@/shared/model';
import type { AxiosResponse } from 'axios';
import type { User } from '../model/types';
import type { SortMethod } from '@/entities/rental';

export const apiGetUsers = async ({
    search,
    sort,
    page,
}: {
    search: string;
    sort: SortMethod | null;
    page: number;
}): Promise<AxiosResponse<{ users: User[]; pages: number }>> => {
    return await axiosInstance.get(API_GET_USERS_LIST(search, sort, page));
};

export const apiGetFoundUsers = async (search: string): Promise<AxiosResponse<User[]>> => {
    return await axiosInstance.get(API_GET_USERS_FOUND(search));
};
