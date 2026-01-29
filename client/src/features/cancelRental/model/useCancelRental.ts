import { useCancelRentalMutation } from './mutations';

export const useCancelRental = () => {
    const mutation = useCancelRentalMutation();

    const cancelRental = (id: string) => {
        try {
            mutation.mutate(id);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        cancelRental,
    };
};
