import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { isSameDay } from '../isSameDay';

describe('isPastDate', () => {
    it('chech if date is same', () => {
        const dateA = new Date();
        const dateB = new Date();
        expect(isSameDay(dateA, dateB)).toBeTruthy();
    });

    it("chech if date isn't same", () => {
        const dateA = new Date();
        const dateB = new Date();
        dateB.setDate(dateB.getDate() + 1);
        expect(isSameDay(dateA, dateB)).toBeFalsy();
    });
});
