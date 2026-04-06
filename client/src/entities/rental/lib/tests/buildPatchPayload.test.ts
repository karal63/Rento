import { USER_ROLE } from '@/entities/user';
import { describe, expect, it } from 'vitest';
import type { ReadyRental, RentalWithAllDetails } from '../../model/rental.types';
import { buildPatchPayload } from '../buildPatchPayload';

describe('Build patch edit rental payload', () => {
    it('should properly build patch payload for rental', () => {
        const original: RentalWithAllDetails = {
            _id: '69d203ca9cbb6135f955c155',
            carId: {
                _id: '69d203ca9cbb6135f955c155',
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
            },
            userId: {
                _id: '69d203ca9cbb6135f955c155',
                name: 'add',
                secondName: 'add',
                email: 'add@gmail.com',
                phoneNumber: '+48123123123',
                roles: [USER_ROLE.Admin],
                auth_provider: 'local',
                createdAt: 1774994400000,
                updatedAt: 1774994400000,
            },
            rentFrom: 1774994400000,
            rentTo: 1775253600000,
            pickupLocation: 'test',
            pickupTime: '07:00',
            status: 'PENDING',
            totalPrice: 10000,
            cancelledAt: 0,
            employee: null,
            createdAt: 1774994400000,
            updatedAt: 1774994400000,
        };

        const newRental: Partial<ReadyRental> = {
            carId: '69ce6890764b541fae48634e',
            userId: '69ce688368650c3b2f10e882',
            rentFrom: 1774994400000,
            rentTo: 1775253600000,
            pickupLocation: 'test',
            pickupTime: '07:00',
            employee: '69ce688368650c3b2f10e882',
            status: 'ACTIVE',
        };

        const result: Partial<ReadyRental> = {
            employee: '69ce688368650c3b2f10e882',
            status: 'ACTIVE',
        };

        expect(buildPatchPayload(original, newRental)).toMatchObject(result);
    });

    it('should check if date ran');
});
