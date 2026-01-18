import type { UserRole } from '@/entities/user/model/types';

export type UserPayload = {
    name: string;
    secondName: string;
    email: string;
    phoneNumber: string;
    password: string;
    roles: UserRole[];
};
