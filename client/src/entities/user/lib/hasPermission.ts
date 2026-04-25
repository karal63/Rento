import { useUserStore } from '../model/user.store';

type Role = keyof typeof ROLES;
export type Permission = (typeof ROLES)[Role][number];

const ROLES = {
    admin: [
        'view:admin-page',
        'edit:rental',
        'create:rental',
        'view:rentals',
        'view:admin-dashboard',
        'view:users',
    ],
    employee: ['view:employee-page'],
    user: [],
} as const;

export const hasPermission = (permission: Permission) => {
    const userStore = useUserStore();

    if (!userStore.user) return false;

    return userStore.user.roles.some(role =>
        (ROLES[role] as readonly Permission[]).includes(permission)
    );
};
