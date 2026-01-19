import type { User } from '@/entities/user';
import { axiosInstance } from '@/shared/config';
import { API_POST_USER_CREATE } from '@/shared/model';
import type { UserPayload } from '@/shared/ui/userForm';
import type { AxiosResponse } from 'axios';

export const apiCreateUser = async (user: UserPayload): Promise<AxiosResponse<User>> => {
    return await axiosInstance.post(API_POST_USER_CREATE, user);
};
