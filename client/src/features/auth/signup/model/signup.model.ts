import { useUserStore } from '@/entities/user';
import { apiSignup } from '../api/signup.api';
import type { SignupDto } from './types/types';

export const signup = async (signupDto: SignupDto) => {
    const userStore = useUserStore();

    try {
        const res = await apiSignup(signupDto);
        userStore.authenticateUser(true, res.data.user);

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
};
