import { useMutation } from '@tanstack/vue-query';
import { apiAssignToRental, apiCreateRental, apiEditRentalDetails } from '../api/rental.api';
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
        mutationFn: ({ rentalId, payload }: { rentalId: string; payload: Partial<ReadyRental> }) =>
            apiEditRentalDetails(rentalId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rentals'] });
            queryClient.invalidateQueries({ queryKey: ['carAvailability'] });
        },
    });

export function useAssignToRentalMutation() {
    return useMutation({
        mutationFn: (rentalId: string) => apiAssignToRental(rentalId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rentals'] });
        },
    });
}
