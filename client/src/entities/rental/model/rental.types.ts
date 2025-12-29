import type { Car } from '@/entities/car';

export type Rental = {
    _id: string;
    carId: string;
    userId: string;
    rentFrom: number;
    rentTo: number;
    pickupLocation: string;
    pickupTime: string;
    totalPrice: number;
    status: 'CONFIRMED' | 'CANCELLED';
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
