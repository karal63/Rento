import type { CarForm } from '@/entities/car';
import { axiosInstance } from '@/shared/config';
import { API_POST_CAR_ADD } from '@/shared/model';

export const apiAddCar = async (car: CarForm) => {
    await axiosInstance.post(API_POST_CAR_ADD, { ...car });
};
