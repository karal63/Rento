import type { UserPayload } from '@/shared/ui/userForm';
import { useMutation } from '@tanstack/vue-query';
import { apiEditUser } from '../api/editUser.api';
import { queryClient } from '@/shared/config';

export function useEditUserMutation() {
    return useMutation({
        mutationKey: ['users'],
        mutationFn: ({ id, payload }: { id: string; payload: Partial<UserPayload> }) =>
            apiEditUser(id, payload).then(r => r.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
