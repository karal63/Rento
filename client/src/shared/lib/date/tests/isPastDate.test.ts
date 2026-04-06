import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { isPastDate } from '../isPastDate';

describe('isPastDate', () => {
    it('chech if date is past', () => {
        const date = new Date('2026-04-04');
        expect(isPastDate(date)).toBeTruthy();
    });

    it('chech if date is not past', () => {
        const tommorow = new Date();
        tommorow.setDate(tommorow.getDate() + 1);
        expect(isPastDate(tommorow)).toBeFalsy();
    });
});
