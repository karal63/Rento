import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserPayload } from '@/shared/ui/userForm';
import { useCreateUserMutation } from './mutations';

export const useCreateUserStore = defineStore('createUser', () => {
    const createUserMutaion = useCreateUserMutation();

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
            await createUserMutaion.mutateAsync(user);
            closeModal();
        } catch (e) {
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return { isModalOpen, closeModal, openModal, loading, create };
});
