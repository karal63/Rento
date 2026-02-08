import type { UserRole } from '@/entities/user';
import { reactive } from 'vue';

export const useFilterUsers = () => {
    return reactive<{ search: string; role: UserRole | '' }>({
        search: '',
        role: '',
    });
};
