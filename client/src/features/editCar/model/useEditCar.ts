import type { Car, CarFormType } from '@/entities/car';
import { useEditCarMutation } from './mutation';
import { buildEditPayload } from '../lib/buildEditPayload';

export const useEditCar = () => {
    const mutation = useEditCarMutation();

    const editCar = (originalCar: Car, newCar: CarFormType) => {
        const payload = buildEditPayload(originalCar, newCar);

        try {
            mutation.mutateAsync({ id: originalCar._id, car: payload });
        } catch (error) {
            throw error;
        }
    };

    return { editCar };
};
