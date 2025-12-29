import { useUserStore } from '@/entities/user';
import { apiRefreshTokens } from '../api/refresh.api';

export const refreshTokens = async () => {
    const userStore = useUserStore();

    try {
        const res = await apiRefreshTokens();
        userStore.authenticateUser(true, res.data);
    } catch (error) {
        console.log(error);
    }
};
