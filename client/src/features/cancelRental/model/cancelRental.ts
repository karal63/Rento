import { useRentalStore, type RentalWithCar } from '@/entities/rental';
import { apiCancelRental } from '../api/cancelRental';

export const cancelRental = async (id: string) => {
    const rentalsStore = useRentalStore();

    try {
        await apiCancelRental(id);
        rentalsStore.rentals = rentalsStore.rentals.map((rental: RentalWithCar) => {
            if (rental._id === id) {
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
