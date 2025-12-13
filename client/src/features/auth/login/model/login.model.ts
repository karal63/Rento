import { apiLogin } from '../api/user.api';
import type { LoginDto } from './types';

export const login = async (loginDto: LoginDto) => {
    try {
        const res = await apiLogin(loginDto);
        console.log(res);
        // save user to store

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
};
