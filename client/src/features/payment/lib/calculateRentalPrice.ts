import type { CarDetails } from '@/entities/car';

export function calculateRentalPrice(daysCount: number, pricing: CarDetails): number {
    if (daysCount === 1) return pricing.day;
    if (daysCount <= 3) return pricing.days2_3;
    if (daysCount <= 6) return pricing.days4_6;
    if (daysCount <= 13) return pricing.days7_13;
    if (daysCount <= 29) return pricing.days14_29;
    if (daysCount === 30) return pricing.month;

    return 0;
}
