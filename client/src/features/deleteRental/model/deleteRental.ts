import { apiDeleteRental } from '../api/deleteRental.api';

export const deleteRental = async (id: string) => {
    try {
        await apiDeleteRental(id);
    } catch (error) {
        console.log(error);
    }
};
