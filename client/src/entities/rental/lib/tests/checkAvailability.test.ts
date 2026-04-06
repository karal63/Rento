import { describe, expect, it } from 'vitest';
import type { CarAvailability } from '../../model/rental.types';
import { checkIfAvailableDate } from '../checkIfAvailableDate';

describe('Check car availability', () => {
    it('check if returns false if given date inside any range', () => {
        const availability: CarAvailability[] = [
            {
                dateFrom: '2026-04-05T00:00:00.000Z',
                dateTo: '2026-04-10T00:00:00.000Z',
            },
            {
                dateFrom: '2026-04-11T00:00:00.000Z',
                dateTo: '2026-04-14T00:00:00.000Z',
            },
        ];

        const day = new Date('2026-04-06');

        expect(checkIfAvailableDate(day, availability)).toBeFalsy();
    });

    it('check if returns true if given date beside any range', () => {
        const availability: CarAvailability[] = [
            {
                dateFrom: '2026-04-05T00:00:00.000Z',
                dateTo: '2026-04-10T00:00:00.000Z',
            },
            {
                dateFrom: '2026-04-11T00:00:00.000Z',
                dateTo: '2026-04-14T00:00:00.000Z',
            },
        ];

        const day = new Date('2026-04-10');

        expect(checkIfAvailableDate(day, availability)).toBeTruthy();
    });
});
