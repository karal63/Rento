import { useUserStore } from '../model/user.store';

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
    admin: ['view:protected-page', 'edit:rental'],
    employee: ['view:protected-page'],
    user: [],
} as const;

export const hasPermission = (permission: Permission) => {
    const userStore = useUserStore();

    if (!userStore.user) return false;

    return userStore.user.roles.every(role =>
        (ROLES[role] as readonly Permission[]).includes(permission)
    );
};
