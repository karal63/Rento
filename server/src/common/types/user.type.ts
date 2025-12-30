import { Role } from 'src/enums/role.enum';

export type UserPayload = {
    id: string;
    roles: Role[];
    email?: string;
    username?: string;
};
