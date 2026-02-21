import type { CarFormType } from '@/entities/car';
import { axiosInstance } from '@/shared/config';
import { API_POST_CAR_ADD } from '@/shared/model';

export const apiAddCar = async (car: CarFormType) => {
    await axiosInstance.post(API_POST_CAR_ADD, { ...car });
};
