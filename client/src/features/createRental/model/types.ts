import type { Car } from '@/entities/car';
import type { User } from '@/entities/user';

export type CreateUser = {
    user: User | null;
    car: Car | null;
    period: {
        dateFrom: Date | null;
        dateTo: Date | null;
    };
    pickupLocation: string;
    pickupTime: string;
};
