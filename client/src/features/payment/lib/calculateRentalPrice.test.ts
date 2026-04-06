import { describe, expect, it } from 'vitest';
import { calculateRentalPrice } from './calculateRentalPrice';
import type { CarDetails } from '@/entities/car';

describe('calculateRentalPrice', () => {
    it('get correct car price for specific day category', () => {
        const pricing: CarDetails = {
            day: 1800,
            days2_3: 1650,
            days4_6: 1500,
            days7_13: 1350,
            days14_29: 1200,
            month: 28000,
        };

        expect(calculateRentalPrice(1, pricing)).toBe(pricing.day);
        expect(calculateRentalPrice(2, pricing)).toBe(pricing.days2_3);
        expect(calculateRentalPrice(5, pricing)).toBe(pricing.days4_6);
        expect(calculateRentalPrice(11, pricing)).toBe(pricing.days7_13);
        expect(calculateRentalPrice(29, pricing)).toBe(pricing.days14_29);
    });
});
