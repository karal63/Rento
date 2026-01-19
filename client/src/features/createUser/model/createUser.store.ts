import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiCreateUser } from '../api/api';
import { isAxiosError } from 'axios';
import type { UserPayload } from '@/shared/ui/userForm';
import { showDialog } from '@/features/dialog/@x';

export const useCreateUserStore = defineStore('createUser', () => {
    const isModalOpen = ref(false);
    const loading = ref(false);

    const openModal = () => {
        isModalOpen.value = true;
    };

    const closeModal = () => {
        isModalOpen.value = false;
    };

    const create = async (user: UserPayload) => {
        try {
            loading.value = true;
            const res = await apiCreateUser(user);
            closeModal();

            return res.data;
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                showDialog('error', 'Validation failed', e.response?.data.message);
            }
        } finally {
            loading.value = false;
        }
    };

    return { isModalOpen, closeModal, openModal, loading, create };
});
