import { axiosInstance } from '@/shared/config';
import { API_POST_RENTAL_UNASSIGN } from '@/shared/model';
import type { UnassignPayload } from '../model/types';

export const apiUnassignRental = async ({ rentalId, userId }: UnassignPayload) => {
    await axiosInstance.post(API_POST_RENTAL_UNASSIGN(rentalId), { userId });
};
