import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Car } from './car.types';

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
    ]);
    const selectedCar = ref<Car | null>(null);

    const setCars = (newCars: Car[]) => (cars.value = newCars);
    const selectCar = (car: Car) => (selectedCar.value = car);

    return { cars, setCars, selectCar, selectedCar };
});
