import { useUserStore } from '@/entities/user';
import { apiLogout } from '../api/logout.api';

export const logout = async () => {
    const userStore = useUserStore();

    try {
        await apiLogout();
        userStore.authenticateUser(false, null);
    } catch (error) {
        console.log(error);
    }
};
