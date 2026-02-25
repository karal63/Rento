import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/entities/user';
import type { UserPayload } from '../../../shared/ui/userForm/types';
import type { UserRole } from '@/entities/user/model/types';
import { showDialog } from '@/features/dialog/@x';
import { useI18n } from 'vue-i18n';
import { useEditUserMutation } from './mutations';

export const useEditUserStore = defineStore('editUser', () => {
    const { t } = useI18n();
    const editUserMutation = useEditUserMutation();

    const isOpen = ref(false);
    const error = ref('');
    const user = ref<User | null>(null);
    const loading = ref(false);

    const close = () => {
        isOpen.value = false;
        resetUser();
        error.value = '';
    };

    const open = (selectedUser: User) => {
        isOpen.value = true;
        user.value = selectedUser;
    };

    const edit = async (id: string, payload: UserPayload) => {
        try {
            loading.value = true;
            await editUserMutation.mutateAsync({ id, payload: buildPatchPayload(payload) });
            showDialog('success', t('app.message.user_edited'), t('app.message.user_edited_desc'));
            close();
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const buildPatchPayload = (newUser: UserPayload) => {
        if (!user.value) return {};

        const payload: Partial<UserPayload> = {};

        if (newUser.name !== user.value.name) {
            payload.name = newUser.name;
        }

        if (newUser.secondName !== user.value.secondName) {
            payload.secondName = newUser.secondName;
        }

        if (newUser.email !== user.value.email) {
            payload.email = newUser.email;
        }

        if (newUser.phoneNumber !== user.value.phoneNumber) {
            payload.phoneNumber = newUser.phoneNumber;
        }

        if (newUser.password !== '') {
            payload.password = newUser.password;
        }

        if (!arraysHaveSameRoles(newUser.roles, user.value.roles)) {
            payload.roles = newUser.roles;
        }

        return payload;
    };

    function arraysHaveSameRoles(a: UserRole[], b: UserRole[]) {
        if (a.length !== b.length) return false;

        const sortedA = [...a].sort();
        const sortedB = [...b].sort();

        return sortedA.every((val, index) => val === sortedB[index]);
    }

    const resetUser = () => {
        user.value = null;
    };

    return { isOpen, close, open, edit, error, user, loading };
});
