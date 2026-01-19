import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiCreateUser } from '../api/api';
import { isAxiosError } from 'axios';
import type { UserPayload } from '@/shared/ui/userForm';

export const useCreateUserStore = defineStore('createUser', () => {
    const isModalOpen = ref(false);
    const loading = ref(false);
    const error = ref('');

    const openModal = () => {
        isModalOpen.value = true;
    };

    const closeModal = () => {
        isModalOpen.value = false;
    };

    const create = async (user: UserPayload) => {
        try {
            loading.value = true;
            closeModal();
            const res = await apiCreateUser(user);

            return res.data;
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                error.value = e.response?.data.message[0];
            }
        } finally {
            loading.value = false;
        }
    };

    return { isModalOpen, closeModal, openModal, loading, error, create };
});
