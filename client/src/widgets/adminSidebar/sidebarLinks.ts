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
        requiredAction: 'view:admin-page',
    },
    {
        path: '/admin/rentals',
        icon: 'material-symbols-light:car-rental',
        name: 'rentals',
        requiredAction: 'view:admin-page',
    },
    {
        path: '/admin/users',
        icon: 'mdi-light:account',
        name: 'users',
        requiredAction: 'view:admin-page',
    },
    {
        path: '/employee/dashboard',
        icon: 'material-symbols:dashboard-outline-rounded',
        name: 'dashboard',
        requiredAction: 'view:employee-page',
    },
    {
        path: '/employee/tickets',
        icon: 'ion:ticket-outline',
        name: 'tickets',
        requiredAction: 'view:employee-page',
    },
] as const;
