import { useAssignToRentalMutation } from '@/entities/rental';

export const useAssignToRental = () => {
    const mutation = useAssignToRentalMutation();

    const assignToRental = (rentalId: string) => {
        try {
            mutation.mutate(rentalId);
        } catch (error) {
            console.log(error);
        }
    };

    return { assignToRental };
};
