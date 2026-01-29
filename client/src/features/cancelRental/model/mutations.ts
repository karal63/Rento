import { useMutation } from '@tanstack/vue-query';
import { apiCancelRental } from '../api/cancelRental';
import { queryClient } from '@/shared/config';

export function useCancelRentalMutation() {
    return useMutation({
        mutationFn: (id: string) => apiCancelRental(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
