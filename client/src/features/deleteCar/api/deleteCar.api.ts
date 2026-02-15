import { axiosInstance } from '@/shared/config';
import { API_DELETE_CAR_REMOVE } from '@/shared/model';

export const apiDeleteCar = async (id: string) => {
    await axiosInstance.delete(API_DELETE_CAR_REMOVE(id));
};
