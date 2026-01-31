import type { Permission } from '@/entities/user';

type Link = {
    path: string;
    icon: string;
    name: string;
    requiredAction: Permission;
};

export const adminLinks: Link[] = [
    {
        path: '/admin/dashboard',
        icon: 'material-symbols:dashboard-outline-rounded',
        name: 'dashboard',
        requiredAction: 'view:admin-dashboard',
    },
    {
        path: '/admin/rentals',
        icon: 'material-symbols-light:car-rental',
        name: 'rentals',
        requiredAction: 'view:rentals',
    },
    {
        path: '/admin/users',
        icon: 'mdi-light:account',
        name: 'users',
        requiredAction: 'view:users',
    },
] as const;
