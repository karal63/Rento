import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiEditUser } from '../api/editUser.api';
import { isAxiosError } from 'axios';
import type { User } from '@/entities/user';
import type { UserPayload } from '../../../shared/ui/userForm/types';

export const useEditUserStore = defineStore('editUser', () => {
    const isOpen = ref(false);
    const error = ref('');
    const user = ref<User | null>(null);
    const loading = ref(false);
    const newUser = ref<UserPayload>({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
        roles: [],
    });

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
            await apiEditUser(id, buildPatchPayload(payload));
            close();
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                error.value = e.response?.data.message[0];
            }
        } finally {
            loading.value = false;
        }
    };

    const buildPatchPayload = (newUser: UserPayload) => {
        if (!user.value) return {};

        const payload: Partial<UserPayload> = {};

        for (const key of Object.keys(newUser) as (keyof UserPayload)[]) {
            if (key === 'password') {
                if (newUser[key] !== '') {
                    payload[key] = newUser[key];
                } else {
                    continue;
                }
            } else if (newUser[key] !== user.value[key]) {
                payload[key] = newUser[key];
            }
        }

        return payload;
    };

    const resetUser = () => {
        user.value = null;
        newUser.value = {
            name: '',
            secondName: '',
            email: '',
            phoneNumber: '',
            password: '',
            roles: [],
        };
    };

    return { isOpen, close, open, edit, error, user, newUser, loading };
});
