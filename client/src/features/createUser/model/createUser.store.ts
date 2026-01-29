import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserPayload } from '@/shared/ui/userForm';
import { showDialog } from '@/features/dialog/@x';
import { useI18n } from 'vue-i18n';
import { useCreateUserMutation } from './mutations';

export const useCreateUserStore = defineStore('createUser', () => {
    const { t } = useI18n();
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
            showDialog(
                'success',
                t('app.message.user_created'),
                t('app.message.user_created_desc')
            );
            createUserMutaion.mutate(user);
            closeModal();
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return { isModalOpen, closeModal, openModal, loading, create };
});
