import type { Car } from '@/entities/car';
import type { RentalStatus } from '@/entities/rental';
import type { User } from '@/entities/user';

export type RentalFormType = {
    user: User | null;
    car: Car | null;
    period: {
        dateFrom: Date | null;
        dateTo: Date | null;
    };
    pickupLocation: string;
    pickupTime: string;
    status?: RentalStatus | '';
};
