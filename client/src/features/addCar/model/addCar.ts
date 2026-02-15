import { addCarMutation } from './mutation';
import type { CarForm } from '@/entities/car';

export const useAddCar = () => {
    const mutation = addCarMutation();

    const addCar = async (car: CarForm) => {
        try {
            await mutation.mutateAsync(car);
        } catch (error) {
            throw error;
        }
    };

    return { addCar };
};
