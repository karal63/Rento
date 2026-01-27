import { useMutation } from '@tanstack/vue-query';
import { apiCreateRental, apiEditRentalDetails } from '../api/rental.api';
import { queryClient } from '@/shared/config';
import type { ReadyRental } from './rental.types';

export const useCreateRentalMutation = () =>
    useMutation({
        mutationFn: (payload: ReadyRental) => apiCreateRental(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rentals'] });
            queryClient.invalidateQueries({ queryKey: ['carAvailability'] });
        },
    });

export const useEditRentalMutation = () =>
    useMutation({
        mutationFn: ({ rentalId, payload }: { rentalId: string; payload: ReadyRental }) =>
            apiEditRentalDetails(rentalId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rentals'] });
            queryClient.invalidateQueries({ queryKey: ['carAvailability'] });
        },
    });
