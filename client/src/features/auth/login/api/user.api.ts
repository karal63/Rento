import { axiosInstance } from '@/shared/config';
import { API_POST_USER_LOGIN } from '@/shared/model';
import type { LoginDto } from '../model/types';
import type { AxiosResponse } from 'axios';
import type { User } from '@/entities/user';

export const apiLogin = async (loginDto: LoginDto): Promise<AxiosResponse<{ user: User }>> => {
    return await axiosInstance.post(API_POST_USER_LOGIN, { ...loginDto });
};
