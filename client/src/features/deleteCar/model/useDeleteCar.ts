import { useDeleteCarMutation } from './mutation';

export const useDeleteCar = () => {
    const mutation = useDeleteCarMutation();

    const deleteCar = async (id: string) => {
        try {
            await mutation.mutateAsync(id);
        } catch (error) {
            throw error;
        }
    };

    return { deleteCar };
};
