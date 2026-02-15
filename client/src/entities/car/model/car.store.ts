import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Car } from './car.types';
import { apiGetSingleCar } from '../api/car.api';

export const useCarStore = defineStore('car', () => {
    const selectedCar = ref<Car | null>(null);

    const selectCar = (car: Car) => (selectedCar.value = car);

    const getCarById = async (id: string) => {
        const carRes = await apiGetSingleCar(id);
        selectCar(carRes.data);
    };

    return {
        selectCar,
        selectedCar,
        getCarById,
    };
});
