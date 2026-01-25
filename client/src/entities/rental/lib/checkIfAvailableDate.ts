import type { CarAvailability } from '../model/rental.types';

export const checkIfAvailableDate = (day: Date, carAvailability: CarAvailability[] | undefined) => {
    const iso = day.toISOString();

    return !carAvailability?.some(rental => rental.dateFrom <= iso && iso < rental.dateTo);
};
