import { axiosInstance } from '@/shared/config';
import { API_POST_PAYMENT_CREATE } from '@/shared/model';
import type { AxiosResponse } from 'axios';

export const apiCreatePaymentIntent = async (
    carId: string,
    rentFrom: number,
    rentTo: number,
    pickupLocation: string,
    pickupTime: string
): Promise<AxiosResponse<{ clientSecret: string }>> => {
    return axiosInstance.post(API_POST_PAYMENT_CREATE, {
        carId,
        rentFrom,
        rentTo,
        pickupLocation,
        pickupTime,
    });
};
