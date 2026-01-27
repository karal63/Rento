import type { ReadyRental } from '@/entities/rental';
import type { RentalForm } from './types';

export const buildRentalPayload = (rental: RentalForm): ReadyRental | undefined => {
    if (!rental.period.dateFrom || !rental.period.dateTo || !rental.user || !rental.car) return;

    return {
        ...rental,
        rentFrom: rental.period.dateFrom.getTime(),
        rentTo: rental.period.dateTo.getTime(),
        userId: rental.user._id,
        carId: rental.car._id,
    };
};
