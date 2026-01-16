import { axiosInstance } from '@/shared/config';
import { API_GET_USERS_LIST } from '@/shared/model';
import type { AxiosResponse } from 'axios';
import type { User } from '../model/types';
import type { SortMethod } from '@/entities/rental';

export const apiGetUsers = async ({
    search,
    sort,
}: {
    search: string;
    sort: SortMethod | null;
}): Promise<AxiosResponse<User[]>> => {
    return await axiosInstance.get(API_GET_USERS_LIST(search, sort));
};
