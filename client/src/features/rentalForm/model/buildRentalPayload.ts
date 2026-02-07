import type { ReadyRental } from '@/entities/rental';
import type { RentalFormType } from './types';

export const buildRentalPayload = (rental: RentalFormType): ReadyRental | undefined => {
    if (!rental.period.dateFrom || !rental.period.dateTo || !rental.user || !rental.car) return;

    return {
        employee: rental.employee?._id ?? '',
        userId: rental.user._id,
        carId: rental.car._id,
        rentFrom: rental.period.dateFrom.getTime(),
        rentTo: rental.period.dateTo.getTime(),
        pickupLocation: rental.pickupLocation,
        pickupTime: rental.pickupTime,
        status: rental.status ? rental.status : undefined,
    };
};
