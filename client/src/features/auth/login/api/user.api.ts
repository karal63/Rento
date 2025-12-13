import { axiosInstance } from '@/shared/config';
import { API_POST_USER_LOGIN } from '@/shared/model';
import type { LoginDto } from '../model/types';

export const apiLogin = async (loginDto: LoginDto) => {
    return await axiosInstance.post(API_POST_USER_LOGIN, { ...loginDto });
};
