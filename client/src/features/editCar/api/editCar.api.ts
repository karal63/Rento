import type { CarFormType } from '@/entities/car';
import { axiosInstance } from '@/shared/config';
import { API_PATCH_CAR_EDIT } from '@/shared/model';
import type { DeepPartial } from '../model/types';

export const apiEditCar = async (carId: string, payload: DeepPartial<CarFormType>) => {
    await axiosInstance.patch(API_PATCH_CAR_EDIT(carId), { ...payload });
};
