import type { RentalWithCar } from '@/entities/rental';
import { axiosInstance } from '@/shared/config';
import { API_PATCH_RENTAL_EDIT } from '@/shared/model';
import type { AxiosResponse } from 'axios';

export const apiEditRental = async (
    rentalId: string,
    time: string,
    location: string
): Promise<AxiosResponse<RentalWithCar>> => {
    return await axiosInstance.patch(API_PATCH_RENTAL_EDIT(rentalId), {
        time,
        location,
    });
};
