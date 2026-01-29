import { apiCreateUser } from '@/features/createUser/api/api';
import { queryClient } from '@/shared/config';
import type { UserPayload } from '@/shared/ui/userForm';
import { useMutation } from '@tanstack/vue-query';

export function useCreateUserMutation() {
    return useMutation({
        mutationKey: ['users'],
        mutationFn: (user: UserPayload) => apiCreateUser(user).then(r => r.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
