import { reactive } from 'vue';

export const useFilterUsers = () => {
    return reactive<{ search: string }>({
        search: '',
    });
};
