import { apiDeleteUser } from '../api/deleteUser.api';

export const deleteUser = async (id: string) => {
    try {
        await apiDeleteUser(id);
    } catch (error) {
        console.log(error);
    }
};
