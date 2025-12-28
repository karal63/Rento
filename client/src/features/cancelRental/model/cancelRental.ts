import { useRentalStore, type RentalWithCar } from '@/entities/rental';
import { apiCancelRental } from '../api/cancelRental';

export const cancelRental = async (selectedRental: RentalWithCar) => {
    const rentalsStore = useRentalStore();

    try {
        await apiCancelRental(selectedRental._id);
        rentalsStore.rentals = rentalsStore.rentals.map((rental: RentalWithCar) => {
            if (selectedRental._id === rental._id) {
                return {
                    ...rental,
                    status: 'CANCELLED',
                };
            }

            return rental;
        });
    } catch (error) {
        console.log(error);
    }
};
