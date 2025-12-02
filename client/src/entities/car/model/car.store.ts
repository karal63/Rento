import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Car } from './car.types';
import { apiGetCars, apiGetSingleCar } from '../api/car.api';

export const useCarStore = defineStore('car', () => {
    const cars = ref<Car[]>([
        {
            id: '1',
            name: 'Lamborghini Huracán EVO',
            image: 'https://cylindersi.pl/wp-content/uploads/2022/08/Lamborghini-Huracan-Evo-Sylwetka.jpg',
            details: {
                acceleration: '2,9 s do 100km/h',
                transmission: 'Auto',
                power: '640 KM / 600 Nm',
                numberOfSeats: 2,
            },
            deposit: 30000,
            pricing: [
                {
                    price: 5000,
                    name: 'day',
                },
                {
                    price: 4200,
                    name: '2_3_days',
                },
                {
                    price: 3800,
                    name: '4_6_days',
                },
                {
                    price: 3000,
                    name: '7_13_days',
                },
                {
                    price: 2100,
                    name: '14_29_days',
                },
                {
                    price: 45000,
                    name: 'month',
                },
            ],
        },
        {
            id: '2',
            name: 'Ferrari 812 Superfast',
            image: 'https://imgs.search.brave.com/YesM_rqi60uWX8lpnIZzx3xaoyUGpD7eECKiSM9kYuI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL210Zy1wcm9k/LzY1YjhlYTdjY2U3/ZGM5MDAwODI3MjJm/NC8yMDIwLWZlcnJh/cmktODEyLXN1cGVy/ZmFzdC1mcm9udC5q/cGc_dz03Njgmd2lk/dGg9NzY4JnE9NzUm/Zm9ybWF0PXdlYnA',
            details: {
                acceleration: '2,9 s do 100km/h',
                transmission: 'Auto',
                power: '640 KM / 600 Nm',
                numberOfSeats: 2,
            },
            deposit: 30000,
            pricing: [
                {
                    price: 5000,
                    name: 'day',
                },
                {
                    price: 4200,
                    name: '2_3_days',
                },
                {
                    price: 3800,
                    name: '4_6_days',
                },
                {
                    price: 3000,
                    name: '7_13_days',
                },
                {
                    price: 2100,
                    name: '14_29_days',
                },
                {
                    price: 45000,
                    name: 'month',
                },
            ],
        },
        {
            id: '1',
            name: 'Lamborghini Huracán EVO',
            image: 'https://cylindersi.pl/wp-content/uploads/2022/08/Lamborghini-Huracan-Evo-Sylwetka.jpg',
            details: {
                acceleration: '2,9 s do 100km/h',
                transmission: 'Auto',
                power: '640 KM / 600 Nm',
                numberOfSeats: 2,
            },
            deposit: 30000,
            pricing: [
                {
                    price: 5000,
                    name: 'day',
                },
                {
                    price: 4200,
                    name: '2_3_days',
                },
                {
                    price: 3800,
                    name: '4_6_days',
                },
                {
                    price: 3000,
                    name: '7_13_days',
                },
                {
                    price: 2100,
                    name: '14_29_days',
                },
                {
                    price: 45000,
                    name: 'month',
                },
            ],
        },
        {
            id: '1',
            name: 'Lamborghini Huracán EVO',
            image: 'https://cylindersi.pl/wp-content/uploads/2022/08/Lamborghini-Huracan-Evo-Sylwetka.jpg',
            details: {
                acceleration: '2,9 s do 100km/h',
                transmission: 'Auto',
                power: '640 KM / 600 Nm',
                numberOfSeats: 2,
            },
            deposit: 30000,
            pricing: [
                {
                    price: 5000,
                    name: 'day',
                },
                {
                    price: 4200,
                    name: '2_3_days',
                },
                {
                    price: 3800,
                    name: '4_6_days',
                },
                {
                    price: 3000,
                    name: '7_13_days',
                },
                {
                    price: 2100,
                    name: '14_29_days',
                },
                {
                    price: 45000,
                    name: 'month',
                },
            ],
        },
    ]);
    const selectedCar = ref<Car | null>(null);

    const setCars = (newCars: Car[]) => (cars.value = newCars);
    const selectCar = (car: Car) => (selectedCar.value = car);

    const getCars = async (page: number): Promise<{ pagesAmount: number }> => {
        const res = await apiGetCars(page);
        cars.value = res.data.cars;

        return { pagesAmount: res.data.pagesAmount };
    };

    const getCarById = async (id: string) => {
        const carRes = await apiGetSingleCar(id);
        selectCar(carRes.data);
    };

    return { cars, setCars, selectCar, selectedCar, getCarById, getCars };
});
