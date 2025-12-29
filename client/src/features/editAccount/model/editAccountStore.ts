import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiEditAccount } from '../api/editAccount';
import { useUserStore } from '@/entities/user';

export const useEditAccountStore = defineStore('editAccount', () => {
    const userStore = useUserStore();

    const isOpen = ref(false);

    const close = () => {
        isOpen.value = false;
    };

    const open = () => {
        isOpen.value = true;
    };

    const edit = async (email: string, phoneNumber: string, secondName: string) => {
        try {
            const res = await apiEditAccount(email, phoneNumber, secondName);
            userStore.authenticateUser(true, res.data);

            close();
        } catch (error) {
            console.log(error);
            close();
        }
    };

    return { isOpen, close, open, edit };
});
