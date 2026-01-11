import type { Car } from '@/entities/car';
import type { User } from '@/entities/user';

type RentalDBStatus = 'CONFIRMED' | 'CANCELLED';

export type Rental = {
    _id: string;
    carId: string;
    userId: string;
    rentFrom: number;
    rentTo: number;
    pickupLocation: string;
    pickupTime: string;
    totalPrice: number;
    status: RentalDBStatus;
    createdAt: number;
    updatedAt: number;
    cancelledAt: number;
};

export type CarAvailability = {
    rentalFrom: string;
    rentalTo: string;
};

export type RentalWithCar = Rental & {
    carId: Car;
};

export type RentalWithAllDetails = Rental & {
    carId: Car;
    userId: User;
};

export const RENTAL_STATUS = {
    Completed: 'Completed',
    Active: 'Active',
    Pending: 'Pending',
    Cancelled: 'Cancelled',
} as const;

export type RentalStatus = (typeof RENTAL_STATUS)[keyof typeof RENTAL_STATUS];
