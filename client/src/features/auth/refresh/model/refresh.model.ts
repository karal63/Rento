import { useUserStore } from '@/entities/user';
import { apiRefreshTokens } from '../api/refresh.api';

export const refreshTokens = async () => {
    const userStore = useUserStore();

    const res = await apiRefreshTokens();
    userStore.authenticateUser(true, res.data.user);
};
