export type User = {
    _id: string;
    name: string;
    secondName?: string;
    email?: string;
    phoneNumber?: string;
    role: ('admin' | 'user' | 'employee')[];
    createdAt: number;
    updatedAt: number;
    auth_provider: string;
};
