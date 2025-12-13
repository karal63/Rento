import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from './types';

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false);
    const user = ref<User | null>();

    const authenticateUser = (value: boolean, authUser: User | null) => {
        isAuthenticated.value = value;
        user.value = authUser;
    };

    return { user, isAuthenticated, authenticateUser };
});
