import { axiosInstance } from '@/shared/config';
import type { AxiosResponse } from 'axios';
import type {
    CarAvailability,
    ReadyRental,
    Rental,
    RentalStatus,
    RentalWithAllDetails,
    RentalWithCar,
    SortMethod,
} from '../model/rental.types';
import {
    API_GET_CAR_AVAILABILITY,
    API_GET_CAR_FIND,
    API_GET_RENTAL_SINGLE,
    API_GET_RENTALS,
    API_GET_RENTALS_LIST,
    API_PATCH_RENTAL_DETAILS_EDIT,
    API_POST_RENTAL_CREATE,
} from '@/shared/model';

export const apiGetRentalDetails = async (sessionId: string): Promise<AxiosResponse<Rental>> => {
    return await axiosInstance.get(API_GET_RENTAL_SINGLE(sessionId));
};

// user rentals
export const apiGetRentals = async (): Promise<AxiosResponse<RentalWithCar[]>> => {
    return await axiosInstance.get(API_GET_RENTALS_LIST);
};

export const apiGetCarAvailability = async (
    carId: string,
    excludedId?: string
): Promise<AxiosResponse<CarAvailability[]>> => {
    return await axiosInstance.get(API_GET_CAR_AVAILABILITY(carId, excludedId));
};

export const apiGetAllRentals = async ({
    status,
    search,
    sort,
}: {
    status: RentalStatus | '';
    search: string;
    sort: SortMethod | null;
}): Promise<AxiosResponse<RentalWithAllDetails[]>> => {
    return await axiosInstance.get(API_GET_RENTALS(status, search, sort));
};

export const apiCreateRental = async (rental: ReadyRental) => {
    await axiosInstance.post(API_POST_RENTAL_CREATE, { ...rental });
};

export const apiEditRentalDetails = async (rentalId: string, payload: ReadyRental) => {
    await axiosInstance.patch(API_PATCH_RENTAL_DETAILS_EDIT(rentalId), payload);
};

export const getRentalById = async (rentalId: string) => {
    return await axiosInstance.get(API_GET_CAR_FIND(rentalId));
};
