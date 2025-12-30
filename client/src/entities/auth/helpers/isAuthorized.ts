import { useUserStore } from '@/entities/user';

export const isAuthorized = () => {
    const userStore = useUserStore();
};
