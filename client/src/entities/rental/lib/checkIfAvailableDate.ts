import type { CarAvailability } from '../model/rental.types';

export const checkIfAvailableDate = (day: Date, carAvailability: CarAvailability[]) => {
    const iso = day.toISOString();

    return !carAvailability.some(rental => rental.dateFrom <= iso && iso < rental.dateTo);
};
