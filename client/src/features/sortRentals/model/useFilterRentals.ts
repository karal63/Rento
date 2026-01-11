import type { RentalStatus } from '@/entities/rental';
import { reactive } from 'vue';

export const useFilterRentals = () => {
    return reactive<{ status: RentalStatus | '' }>({
        status: '',
    });
};
