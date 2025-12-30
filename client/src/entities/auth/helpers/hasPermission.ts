import type { User } from '@/entities/user';

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
    admin: ['view:admin-page'],
    employee: [],
    user: [],
} as const;

export const hasPermission = (user: User | null | undefined, permission: Permission) => {
    if (!user) return false;

    return user.roles.every(role => (ROLES[role] as readonly Permission[]).includes(permission));
};
