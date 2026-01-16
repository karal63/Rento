import type { SortMethod } from '@/entities/rental';
import { reactive } from 'vue';

export const useSortUsers = () => {
    return reactive<{ sort: SortMethod | null }>({
        sort: null,
    });
};
