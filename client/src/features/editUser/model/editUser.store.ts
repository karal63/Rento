import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiEditUser } from '../api/editUser.api';
import { isAxiosError } from 'axios';
import type { User } from '@/entities/user';
import type { UserPayload } from './types';

export const useEditUserStore = defineStore('editUser', () => {
    const isOpen = ref(false);
    const error = ref('');
    const user = ref<User | null>(null);

    const close = () => {
        isOpen.value = false;
    };

    const open = (selectedUser: User) => {
        isOpen.value = true;
        user.value = selectedUser;
    };

    const edit = async (id: string, payload: UserPayload) => {
        try {
            await apiEditUser(id, buildPatchPayload(payload));
            close();
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                error.value = e.response?.data.message[0];
            }
        }
    };

    const buildPatchPayload = (newUser: UserPayload) => {
        if (!user.value) return {};

        const payload: Partial<UserPayload> = {};

        if (newUser.password) {
            payload.password = newUser.password;
        }

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

    return { isOpen, close, open, edit, error, user };
});
