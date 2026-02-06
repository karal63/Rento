import { axiosInstance } from '@/shared/config';
import { API_GET_USERS_FOUND, API_GET_USERS_LIST } from '@/shared/model';
import type { AxiosResponse } from 'axios';
import type { User, UserRole } from '../model/types';
import type { SortMethod } from '@/entities/rental';

export const apiGetUsers = async ({
    search,
    role,
    sort,
    page,
}: {
    search?: string;
    role?: UserRole;
    sort?: SortMethod | null;
    page?: number;
}): Promise<AxiosResponse<{ users: User[]; pages: number }>> => {
    return await axiosInstance.get(API_GET_USERS_LIST(search, role, sort, page));
};

export const apiGetFoundUsers = async (search: string): Promise<AxiosResponse<User[]>> => {
    return await axiosInstance.get(API_GET_USERS_FOUND(search));
};
