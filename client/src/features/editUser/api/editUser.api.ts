import type { User } from '@/entities/user';
import { axiosInstance } from '@/shared/config';
import { API_PATCH_USER_EDIT_ID } from '@/shared/model';

export const apiEditUser = async (id: string, body: Partial<User>) => {
    return axiosInstance.patch(API_PATCH_USER_EDIT_ID(id), body);
};
