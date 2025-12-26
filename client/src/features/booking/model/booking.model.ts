import { apiGetCarAvailability } from '@/entities/rental';

export const getAvailability = async (carId: string) => {
    try {
        const res = await apiGetCarAvailability(carId);

        return res.data;
    } catch (error) {
        console.log(error);

        return [];
    }
};
