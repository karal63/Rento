import { axiosInstance } from '@/shared/config';
import { API_GET_CAR_LIST, API_GET_CAR_SINGLE, API_GET_CARS_FOUND } from '@/shared/model';
import type { Car } from '../model/car.types';
import type { AxiosResponse } from 'axios';

export const apiGetSingleCar = async (id: string): Promise<AxiosResponse<Car>> => {
    return await axiosInstance.get(API_GET_CAR_SINGLE(id));
};

export const apiGetCars = async (
    page: number,
    brands: string[],
    search: string
): Promise<AxiosResponse<{ cars: Car[]; pagesAmount: number; allBrands: string[] }>> => {
    return await axiosInstance.get(API_GET_CAR_LIST(page, brands, search));
};

export const apiGetFoundCars = async (search: string) => {
    return await axiosInstance.get(API_GET_CARS_FOUND(search));
};
