import { axiosInstance } from '@/shared/config';
import type { AxiosResponse } from 'axios';
import type { CarAvailability, Rental } from '../model/rental.types';
import { API_GET_CAR_AVAILABILITY, API_GET_RENTAL_SINGLE } from '@/shared/model';

export const apiGetRentalDetails = async (sessionId: string): Promise<AxiosResponse<Rental>> => {
    return await axiosInstance.get(API_GET_RENTAL_SINGLE(sessionId));
};

export const apiGetCarAvailability = async (
    carId: string
): Promise<AxiosResponse<CarAvailability[]>> => {
    return await axiosInstance.get(API_GET_CAR_AVAILABILITY(carId));
};
