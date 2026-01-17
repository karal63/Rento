import { axiosInstance } from '@/shared/config';
import { API_DELETE_RENTAL } from '@/shared/model';

export const apiDeleteRental = async (id: string) => {
    return await axiosInstance.delete(API_DELETE_RENTAL(id));
};
