import { axiosInstance } from '@/shared/config';
import type { AxiosResponse } from 'axios';
import type {
    CarAvailability,
    Rental,
    RentalStatus,
    RentalWithAllDetails,
    RentalWithCar,
} from '../model/rental.types';
import {
    API_GET_CAR_AVAILABILITY,
    API_GET_RENTAL_SINGLE,
    API_GET_RENTALS,
    API_GET_RENTALS_LIST,
} from '@/shared/model';

export const apiGetRentalDetails = async (sessionId: string): Promise<AxiosResponse<Rental>> => {
    return await axiosInstance.get(API_GET_RENTAL_SINGLE(sessionId));
};

// user rentals
export const apiGetRentals = async (): Promise<AxiosResponse<RentalWithCar[]>> => {
    return await axiosInstance.get(API_GET_RENTALS_LIST);
};

export const apiGetCarAvailability = async (
    carId: string
): Promise<AxiosResponse<CarAvailability[]>> => {
    return await axiosInstance.get(API_GET_CAR_AVAILABILITY(carId));
};

export const apiGetAllRentals = async ({
    status,
    search,
}: {
    status: RentalStatus | '';
    search: string;
}): Promise<AxiosResponse<RentalWithAllDetails[]>> => {
    return await axiosInstance.get(API_GET_RENTALS(status, search));
};
