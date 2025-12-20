import { axiosInstance } from '@/shared/config';
import { API_POST_PAYMENT_CREATE } from '@/shared/model';
import type { AxiosResponse } from 'axios';

export const apiCreatePaymentIntent = async (
    amount: number
): Promise<AxiosResponse<{ clientSecret: string }>> => {
    return axiosInstance.post(API_POST_PAYMENT_CREATE, { amount });
};
