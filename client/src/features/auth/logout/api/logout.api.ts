import { axiosInstance } from '@/shared/config';
import { API_POST_USER_LOGOUT } from '@/shared/model';

export const apiLogout = async () => {
    await axiosInstance.get(API_POST_USER_LOGOUT);
};
