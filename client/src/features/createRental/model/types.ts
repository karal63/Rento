import type { Car } from '@/entities/car';
import type { User } from '@/entities/user';

export type CreateUser = {
    user: User | null;
    car: Car | null;
    period: {
        from: Date | '';
        to: Date | '';
    };
    pickupLocation: string;
    pickupTime: string;
};
