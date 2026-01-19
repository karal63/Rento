export type Role = 'user' | 'admin' | 'employee';
export const USER_ROLE = {
    User: 'user',
    Admin: 'admin',
    Employee: 'employee',
} as const;
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type User = {
    _id: string;
    name: string;
    secondName?: string;
    email?: string;
    phoneNumber?: string;
    roles: Role[];
    createdAt: number;
    updatedAt: number;
    auth_provider: string;
};
