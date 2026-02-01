import type { RentalStatus } from '@/entities/rental';
import { reactive } from 'vue';

export const useFilterRentals = () => {
    return reactive<{ statuses: (RentalStatus | '')[]; search: string }>({
        search: '',
        statuses: [],
    });
};
