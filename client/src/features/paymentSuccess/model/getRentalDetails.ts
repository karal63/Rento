import type { Car } from '@/entities/car';
import { apiGetSingleCar } from '@/entities/car/api/car.api';
import { apiGetRentalDetails, type Rental } from '@/entities/rental';

export const getRentalDetails = async (
    sessionId: string
): Promise<{ newRental: Rental; newCar: Car } | null> => {
    try {
        const rentalRes = await apiGetRentalDetails(sessionId);
        const carRes = await apiGetSingleCar(rentalRes.data.carId);

        return { newRental: rentalRes.data, newCar: carRes.data };
    } catch (error) {
        console.log(error);

        return null;
    }
};
