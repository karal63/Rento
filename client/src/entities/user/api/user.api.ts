import { axiosInstance } from '@/shared/config';
import { API_GET_USERS_LIST } from '@/shared/model';
import type { AxiosResponse } from 'axios';
import type { User } from '../model/types';

export const apiGetUsers = async (): Promise<AxiosResponse<User[]>> => {
    return await axiosInstance.get(API_GET_USERS_LIST);
};
