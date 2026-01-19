import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiEditUser } from '../api/editUser.api';
import { isAxiosError } from 'axios';
import { invalidateUsersQuery, type User } from '@/entities/user';
import type { UserPayload } from '../../../shared/ui/userForm/types';
import type { UserRole } from '@/entities/user/model/types';

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
            const res = await apiEditUser(id, buildPatchPayload(payload));
            invalidateUsersQuery();
            close();

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
