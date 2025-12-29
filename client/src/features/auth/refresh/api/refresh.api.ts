import type { User } from '@/entities/user';
import { axiosInstance } from '@/shared/config';
import { API_POST_TOKEN_REFRESH } from '@/shared/model';
import type { AxiosResponse } from 'axios';

export const apiRefreshTokens = async (): Promise<AxiosResponse<User>> => {
    return await axiosInstance.post(API_POST_TOKEN_REFRESH);
};
