import { axiosInstance } from '@/shared/config';
import { API_POST_RENTAL_CREATE } from '@/shared/model';

export const apiCreateRental = async () => {
    await axiosInstance.post(API_POST_RENTAL_CREATE);
};
