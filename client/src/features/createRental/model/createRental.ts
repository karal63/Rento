import type { CreateRental } from '@/entities/rental';
import type { CreateUser } from './types';
import { showDialog } from '@/features/dialog/@x';
import { apiCreateRental } from '@/entities/rental/api/rental.api';

export const createRental = async (rental: CreateUser) => {
    const { car, user, period, ...rest } = rental;

    if (!user || !car || !period.dateFrom || !period.dateTo) return;

    const readyRental: CreateRental = {
        ...rest,
        rentFrom: period.dateFrom.getTime(),
        rentTo: period.dateTo.getTime(),
        userId: user._id,
        carId: car._id,
    };

    await apiCreateRental(readyRental);

    showDialog('success', 'Rental created', 'You can cancel or edit it at any time');
};
