import { axiosInstance } from '@/shared/config';
import { API_DELETE_USER } from '@/shared/model';

export const apiDeleteUser = async (id: string) => {
    return await axiosInstance.delete(API_DELETE_USER(id));
};
