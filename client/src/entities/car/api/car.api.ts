import { axiosInstance } from '@/shared/config';
import { API_GET_CAR_SINGLE } from '@/shared/model';
import type { Car } from '../model/car.types';
import type { AxiosResponse } from 'axios';

export const apiGetSingleCar = async (id: string): Promise<AxiosResponse<Car>> => {
    return await axiosInstance.get(API_GET_CAR_SINGLE(id));
};
