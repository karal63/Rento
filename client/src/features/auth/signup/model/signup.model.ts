import { useUserStore } from '@/entities/user';
import { apiSignup } from '../api/signup.api';
import type { SignupDto } from './types/types';
import axios from 'axios';

export const signup = async (signupDto: SignupDto) => {
    const userStore = useUserStore();

    try {
        const res = await apiSignup(signupDto);
        userStore.authenticateUser(true, res.data.user);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(error);

            return error.response?.data.message;
        }
    }
};
