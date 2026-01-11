import type { RentalStatus, RentalWithAllDetails } from '@/entities/rental';

export const getStatus = (rental: RentalWithAllDetails): RentalStatus | null => {
    const now = new Date();
    const startDate = new Date(rental.rentFrom);
    const endDate = new Date(rental.rentTo);

    if (startDate < now && now < endDate) {
        return 'Active';
    } else if (endDate < now && rental.status !== 'CANCELLED') {
        return 'Completed';
    } else if (now < startDate) {
        return 'Pending';
    } else if (rental.status === 'CANCELLED') {
        return 'Cancelled';
    }

    return null;
};
