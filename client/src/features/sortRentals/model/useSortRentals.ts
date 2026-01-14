import type { SortMethod } from '@/entities/rental';
import { reactive } from 'vue';

export const useSortRentals = () => {
    return reactive<{ sort: SortMethod | null }>({
        sort: null,
    });
};
