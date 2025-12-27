import { useRentalStore, type RentalWithCar } from '@/entities/rental';
import { apiCancelRental } from '../api/cancelRental';

export const cancelRental = async (rental: RentalWithCar) => {
    const rentalsStore = useRentalStore();

    try {
        await apiCancelRental(rental._id);
        rentalsStore.rentals = rentalsStore.rentals.map((rental: RentalWithCar) => {
            if (rental._id === rental._id) {
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
