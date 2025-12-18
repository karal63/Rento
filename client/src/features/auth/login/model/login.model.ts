import { useUserStore } from '@/entities/user';
import { apiLogin } from '../api/user.api';
import type { LoginDto } from './types';
import axios from 'axios';

export const login = async (loginDto: LoginDto) => {
    const userStore = useUserStore();

    try {
        const res = await apiLogin(loginDto);
        userStore.authenticateUser(true, res.data.user);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
};
