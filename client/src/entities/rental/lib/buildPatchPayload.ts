import type { ReadyRental, RentalWithAllDetails } from '../model/rental.types';

export const buildPatchPayload = (
    original: RentalWithAllDetails | undefined,
    newRental: Partial<ReadyRental> | undefined
) => {
    if (!original || !newRental) return {};

    const result: Partial<ReadyRental> = {};

    if (!original.employee || newRental.employee !== original.employee._id) {
        result.employee = newRental.employee;
    }

    if (newRental.carId !== original.carId._id) {
        result.carId = newRental.carId;
    }

    if (newRental.userId !== original.userId._id) {
        result.userId = newRental.userId;
    }

    if (newRental.rentFrom !== original.rentFrom) {
        result.rentFrom = newRental.rentFrom;
    }

    if (newRental.rentTo !== original.rentTo) {
        result.rentTo = newRental.rentTo;
    }

    if (newRental.pickupLocation !== original.pickupLocation) {
        result.pickupLocation = newRental.pickupLocation;
    }

    if (newRental.pickupTime !== original.pickupTime) {
        result.pickupTime = newRental.pickupTime;
    }

    if (newRental.status !== original.status) {
        result.status = newRental.status;
    }

    return result;
};
