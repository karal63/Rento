import type { Price } from './types';

export function calculateRentalPrice(daysCount: number, pricing: Price[]): number {
    if (daysCount === 1) return pricing[0]?.price ?? 0;
    if (daysCount <= 3) return pricing[1]?.price ?? 0;
    if (daysCount <= 6) return pricing[2]?.price ?? 0;
    if (daysCount <= 13) return pricing[3]?.price ?? 0;
    if (daysCount <= 29) return pricing[4]?.price ?? 0;
    if (daysCount === 30) return pricing[5]?.price ?? 0;

    return 0;
}
