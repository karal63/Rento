import type { ReadyRental } from '@/entities/rental';
import type { CreateRental } from './types';

export const buildCreateRentalPayload = (rental: CreateRental): ReadyRental | undefined => {
    if (!rental.period.dateFrom || !rental.period.dateTo || !rental.user || !rental.car) return;

    return {
        ...rental,
        rentFrom: rental.period.dateFrom.getTime(),
        rentTo: rental.period.dateTo.getTime(),
        userId: rental.user._id,
        carId: rental.car._id,
    };
};
