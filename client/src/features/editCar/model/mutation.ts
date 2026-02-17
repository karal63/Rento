import { useMutation } from '@tanstack/vue-query';
import { apiEditCar } from '../api/editCar.api';
import type { CarFormType } from '@/entities/car';
import type { DeepPartial } from './types';
import { queryClient } from '@/shared/config';

export function useEditCarMutation() {
    return useMutation({
        mutationFn: ({ id, car }: { id: string; car: DeepPartial<CarFormType> }) =>
            apiEditCar(id, car),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
        },
    });
}
