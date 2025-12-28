import { useUserStore } from '@/entities/user';
import { apiLogout } from '../api/logout.api';
import router from '@/app/router/router';

export const logout = async () => {
    const userStore = useUserStore();

    try {
        await apiLogout();
        userStore.authenticateUser(false, null);
        router.push('/');
    } catch (error) {
        console.log(error);
    }
};
