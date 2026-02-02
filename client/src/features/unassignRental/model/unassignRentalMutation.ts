import { queryClient } from '@/shared/config';
import { useMutation } from '@tanstack/vue-query';
import { apiUnassignRental } from '../api/unassignRental.api';
import type { UnassignPayload } from './types';

export function useUnassignRentalMutation() {
    return useMutation({
        mutationFn: ({ rentalId, userId }: UnassignPayload) =>
            apiUnassignRental({ rentalId, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rentals'] });
        },
    });
}
