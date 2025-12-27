import { axiosInstance } from '@/shared/config';
import { API_DELETE_RENTAL_CANCEL } from '@/shared/model';

export const apiCancelRental = async (rentalId: string) => {
    await axiosInstance.delete(API_DELETE_RENTAL_CANCEL(rentalId));
};
