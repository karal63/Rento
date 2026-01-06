export type Role = 'user' | 'admin' | 'employee';

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
