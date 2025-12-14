import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Car } from './car.types';
import { apiGetCars, apiGetSingleCar } from '../api/car.api';

export const useCarStore = defineStore('car', () => {
    const cars = ref<Car[]>([]);
    const selectedCar = ref<Car | null>(null);

    const setCars = (newCars: Car[]) => (cars.value = newCars);
    const selectCar = (car: Car) => (selectedCar.value = car);

    const getCars = async (
        page: number,
        brands: string[],
        search: string
    ): Promise<{ pagesAmount: number; allBrands: string[] }> => {
        const res = await apiGetCars(page, brands, search);
        cars.value = res.data.cars;

        return { pagesAmount: res.data.pagesAmount, allBrands: res.data.allBrands };
    };

    const getCarById = async (id: string) => {
        const carRes = await apiGetSingleCar(id);
        selectCar(carRes.data);
    };

    return { cars, setCars, selectCar, selectedCar, getCarById, getCars };
});
