import { useUserStore } from '@/entities/user';
import { apiLogin } from '../api/user.api';
import type { LoginDto } from './types';

export const login = async (loginDto: LoginDto) => {
    const userStore = useUserStore();

    try {
        const res = await apiLogin(loginDto);
        userStore.authenticateUser(true, res.data.user);

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
};
