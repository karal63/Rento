import type { CarForm } from '@/entities/car';
import { useMutation } from '@tanstack/vue-query';
import { apiAddCar } from '../api/addCar.api';
import { queryClient } from '@/shared/config';

export function addCarMutation() {
    return useMutation({
        mutationFn: (car: CarForm) => apiAddCar(car),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
        },
    });
}
