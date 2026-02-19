import type { Car, CarFormType } from '@/entities/car';
import type { DeepPartial } from '../model/types';

export const buildEditPayload = (originalCar: Car, newCar: CarFormType) => {
    const result: DeepPartial<CarFormType> = {};

    if (originalCar.name !== newCar.name) {
        result.name = newCar.name;
    }
    if (originalCar.brand !== newCar.brand) {
        result.brand = newCar.brand;
    }
    if (originalCar.deposit !== newCar.deposit) {
        result.deposit = newCar.deposit;
    }
    if (JSON.stringify(originalCar.images) !== JSON.stringify(newCar.images)) {
        result.images = newCar.images;
    }

    // details
    if (originalCar.details.accelerationTo100 !== newCar.details.accelerationTo100) {
        result.details = {
            ...result.details,
            accelerationTo100: newCar.details.accelerationTo100,
        };
    }
    if (originalCar.details.horsepower !== newCar.details.horsepower) {
        result.details = {
            ...result.details,
            horsepower: newCar.details.horsepower,
        };
    }
    if (originalCar.details.torqueNm !== newCar.details.torqueNm) {
        result.details = {
            ...result.details,
            torqueNm: newCar.details.torqueNm,
        };
    }
    if (originalCar.details.transmission !== newCar.details.transmission) {
        result.details = {
            ...result.details,
            transmission: newCar.details.transmission,
        };
    }
    if (originalCar.details.numberOfSeats !== newCar.details.numberOfSeats) {
        result.details = {
            ...result.details,
            numberOfSeats: newCar.details.numberOfSeats,
        };
    }

    // pricing
    if (originalCar.pricing.day !== newCar.pricing.day) {
        result.pricing = {
            ...result.pricing,
            day: newCar.pricing.day,
        };
    }
    if (originalCar.pricing.days2_3 !== newCar.pricing.days2_3) {
        result.pricing = {
            ...result.pricing,
            days2_3: newCar.pricing.days2_3,
        };
    }
    if (originalCar.pricing.days4_6 !== newCar.pricing.days4_6) {
        result.pricing = {
            ...result.pricing,
            days4_6: newCar.pricing.days4_6,
        };
    }
    if (originalCar.pricing.days7_13 !== newCar.pricing.days7_13) {
        result.pricing = {
            ...result.pricing,
            days7_13: newCar.pricing.days7_13,
        };
    }
    if (originalCar.pricing.days14_29 !== newCar.pricing.days14_29) {
        result.pricing = {
            ...result.pricing,
            days14_29: newCar.pricing.days14_29,
        };
    }
    if (originalCar.pricing.month !== newCar.pricing.month) {
        result.pricing = {
            ...result.pricing,
            month: newCar.pricing.month,
        };
    }

    return result;
};
