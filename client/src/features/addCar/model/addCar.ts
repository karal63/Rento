import { addCarMutation } from './mutation';
import type { CarFormType } from '@/entities/car';

export const useAddCar = () => {
    const mutation = addCarMutation();

    const addCar = async (car: CarFormType) => {
        try {
            await mutation.mutateAsync(car);
        } catch (error) {
            throw error;
        }
    };

    return { addCar };
};
