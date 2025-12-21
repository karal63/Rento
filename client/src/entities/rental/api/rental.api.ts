import { axiosInstance } from '@/shared/config';
import type { AxiosResponse } from 'axios';
import type { Rental } from '../model/rental.types';

export const apiGetRentalDetails = async (sessionId: string): Promise<AxiosResponse<Rental>> => {
    return await axiosInstance.get(`/rent/${sessionId}`);
};
