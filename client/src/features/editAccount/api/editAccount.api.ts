import type { User } from '@/entities/user';
import { axiosInstance } from '@/shared/config';
import { API_PATCH_USER_EDIT } from '@/shared/model';
import type { AxiosResponse } from 'axios';

export const apiEditAccount = async (
    email: string,
    phoneNumber: string,
    secondName: string
): Promise<AxiosResponse<User>> => {
    return await axiosInstance.patch(API_PATCH_USER_EDIT, { email, phoneNumber, secondName });
};
