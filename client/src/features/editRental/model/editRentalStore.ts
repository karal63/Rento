import { useRentalStore, type RentalWithCar } from '@/entities/rental';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiEditRental } from '../api/editRental';

export const useEditRentalStore = defineStore('editRental', () => {
    const rentalsStore = useRentalStore();

    const isOpen = ref(false);
    const rental = ref<RentalWithCar | null>(null);

    const open = (rentalPayload: RentalWithCar) => {
        isOpen.value = true;
        rental.value = rentalPayload;
    };
    const close = () => {
        isOpen.value = false;
        rental.value = null;
    };

    const edit = async (time: string, location: string) => {
        try {
            if (!rental.value) return;

            const res = await apiEditRental(rental.value?._id, time, location);

            rentalsStore.rentals = rentalsStore.rentals.map((rental: RentalWithCar) => {
                if (res.data._id === rental._id) {
                    return res.data;
                }

                return rental;
            });

            close();
        } catch (error) {
            console.log(error);
            close();
        }
    };

    return { isOpen, open, close, edit, rental };
});
