import type { Car, CarFormType } from '@/entities/car';
import { describe, expect, it } from 'vitest';
import type { DeepPartial } from '../model/types';
import { buildEditPayload } from './buildEditPayload';

describe('Build edit car payload', () => {
    it('edits car', () => {
        const original: Car = {
            _id: '69d3caf9e7dbbd5d54f01a3c',
            name: 'BMW M4 Competition',
            images: [
                'https://imgs.search.brave.com/eaCR_w_VfYVOy_w8TGEcEv10Hf6GIhQ-Do1tSH1Slls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI3LzE3LzI3/LzM2MF9GXzQyNzE3/Mjc5Ml9BWlFSQ3BV/b3FtazgwQTdhOU1J/bFFiaVB5ZjJNd2V3/dy5qcGc',
            ],
            details: {
                accelerationTo100: 3.9,
                horsepower: 510,
                torqueNm: 650,
                transmission: 'Automatic (8-speed Steptronic)',
                numberOfSeats: 4,
            },
            deposit: 20000,
            pricing: {
                day: 1800,
                days2_3: 1650,
                days4_6: 1500,
                days7_13: 1350,
                days14_29: 1200,
                month: 28000,
            },
            brand: 'BMW',
        };

        const current: CarFormType = {
            name: 'BMW M4 Competition',
            images: [
                'https://imgs.search.brave.com/eaCR_w_VfYVOy_w8TGEcEv10Hf6GIhQ-Do1tSH1Slls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI3LzE3LzI3/LzM2MF9GXzQyNzE3/Mjc5Ml9BWlFSQ3BV/b3FtazgwQTdhOU1J/bFFiaVB5ZjJNd2V3/dy5qcGc',
            ],
            details: {
                accelerationTo100: 3.9,
                horsepower: 510,
                torqueNm: 650,
                transmission: 'Automatic (8-speed Steptronic)',
                numberOfSeats: 5,
            },
            deposit: 20000,
            pricing: {
                day: 1800,
                days2_3: 1650,
                days4_6: 1500,
                days7_13: 1350,
                days14_29: 1200,
                month: 28000,
            },
            brand: 'test',
        };

        const result: DeepPartial<CarFormType> = {
            brand: 'test',
            details: {
                numberOfSeats: 5,
            },
        };

        expect(buildEditPayload(original, current)).toMatchObject(result);
    });
});
