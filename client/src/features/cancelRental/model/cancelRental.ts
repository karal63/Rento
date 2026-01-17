import { apiCancelRental } from '../api/cancelRental';

export const cancelRental = async (id: string) => {
    try {
        await apiCancelRental(id);
    } catch (error) {
        console.log(error);
    }
};
