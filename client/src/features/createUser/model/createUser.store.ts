import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiCreateUser } from '../api/api';
import type { UserPayload } from '@/shared/ui/userForm';
import { showDialog, showErrorDialog } from '@/features/dialog/@x';
import { invalidateUsersQuery } from '@/entities/user';
import type { AppError } from '@/shared/model';
import { useI18n } from 'vue-i18n';

export const useCreateUserStore = defineStore('createUser', () => {
    const { t } = useI18n();
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
            await apiCreateUser(user);
            showDialog(
                'success',
                t('app.message.user_created'),
                t('app.message.user_created_desc')
            );
            invalidateUsersQuery();
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
