import { useMutation } from '@tanstack/vue-query';
import { apiCreateRental } from '../api/rental.api';
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
