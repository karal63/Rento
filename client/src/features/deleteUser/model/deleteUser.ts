import { invalidateUsersQuery } from '@/entities/user';
import { apiDeleteUser } from '../api/deleteUser.api';

export const deleteUser = async (id: string) => {
    try {
        await apiDeleteUser(id);
        invalidateUsersQuery();
    } catch (error) {
        console.log(error);
    }
};
