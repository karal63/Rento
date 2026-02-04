import type { Car } from '@/entities/car';
import type { User } from '@/entities/user';

export type Rental = {
    _id: string;
    carId: string;
    userId: string;
    rentFrom: number;
    rentTo: number;
    pickupLocation: string;
    pickupTime: string;
    totalPrice: number;
    status: RentalStatus;
    createdAt: number;
    updatedAt: number;
    cancelledAt: number;
};

export type CarAvailability = {
    dateFrom: string;
    dateTo: string;
};

export type RentalWithCar = Rental & {
    carId: Car;
};

export type RentalWithAllDetails = Rental & {
    carId: Car;
    userId: User;
};

export const RENTAL_STATUS = {
    Completed: 'COMPLETED',
    Active: 'ACTIVE',
    Pending: 'PENDING',
    Cancelled: 'CANCELLED',
} as const;

export type RentalStatus = (typeof RENTAL_STATUS)[keyof typeof RENTAL_STATUS];

export type SortMethod = {
    field: string;
    order: 'asc' | 'desc';
    label: string;
};

export type RentalPeriod = { dateFrom: Date | null; dateTo: Date | null };

export type ReadyRental = {
    userId: string;
    carId: string;
    rentFrom: number | null;
    rentTo: number | null;
    pickupLocation: string;
    pickupTime: string;
    status?: RentalStatus;
};

export const CHANGE_STATUS = {
    Completed: 'COMPLETED',
    Active: 'ACTIVE',
    Pending: 'PENDING',
} as const;

export type ChangeStatus = (typeof CHANGE_STATUS)[keyof typeof CHANGE_STATUS];
