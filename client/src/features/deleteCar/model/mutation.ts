import { useMutation } from '@tanstack/vue-query';
import { apiDeleteCar } from '../api/deleteCar.api';
import { queryClient } from '@/shared/config';

export function useDeleteCarMutation() {
    return useMutation({
        mutationFn: (id: string) => apiDeleteCar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCars'] });
        },
    });
}
