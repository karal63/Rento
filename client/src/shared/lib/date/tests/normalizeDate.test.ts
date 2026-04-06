import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { normalizeDate } from '../normalizeDate';

describe('normalizeDate', () => {
    it('chech if date is in correct format', () => {
        const date = new Date('2026-04-06');
        expect(normalizeDate(date.getTime())).toBe('April 6, 2026');
    });
});
