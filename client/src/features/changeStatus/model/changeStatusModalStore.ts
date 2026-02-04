import {
    useChangeStatusMutation,
    type ChangeStatus,
    type RentalWithAllDetails,
} from '@/entities/rental';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChangeStatusModalStore = defineStore('changeStatus', () => {
    const changeStatusMutation = useChangeStatusMutation();
    const rental = ref<RentalWithAllDetails | null>(null);
    const isOpen = ref(false);

    const open = (newRental: RentalWithAllDetails) => {
        isOpen.value = true;
        rental.value = newRental;
    };

    const close = () => {
        isOpen.value = false;
    };

    const save = (status: ChangeStatus | null) => {
        if (!rental.value || !status) return;
        changeStatusMutation.mutate({ rentalId: rental.value?._id, status });
        isOpen.value = false;
    };

    return { isOpen, open, close, save, rental };
});
