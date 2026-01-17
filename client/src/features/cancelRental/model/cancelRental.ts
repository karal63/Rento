import { apiCancelRental } from '../api/cancelRental';

export const cancelRental = async (id: string) => {
    try {
        await apiCancelRental(id);
        // rentalsStore.rentals = rentalsStore.rentals.map((rental: RentalWithCar) => {
        //     if (id === rental._id) {
        //         return {
        //             ...rental,
        //             status: 'CANCELLED',
        //         };
        //     }

        //     return rental;
        // });
    } catch (error) {
        console.log(error);
    }
};
