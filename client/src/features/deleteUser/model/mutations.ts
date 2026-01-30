import { useMutation } from '@tanstack/vue-query';
import { apiDeleteUser } from '../api/deleteUser.api';
import { queryClient } from '@/shared/config';

export function useDeleteUserMutation() {
    return useMutation({
        mutationFn: (id: string) => apiDeleteUser(id).then(r => r.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
