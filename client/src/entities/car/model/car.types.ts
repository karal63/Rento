export type Car = {
    _id: string;
    name: string;
    image: string;
    details: {
        acceleration: string;
        transmission: string;
        power: string;
        numberOfSeats: number;
    };
    deposit: number;
    pricing: PriceRange[];
    brand: string;
};

export type PriceRange = {
    price: number;
    name: string;
};

export type CarForm = {
    name: string;
    image: string;
    details: {
        accelerationTo100: number | null;
        horsepower: number | null;
        torqueNm: number | null;
        transmission: string | null;
        numberOfSeats: number | null;
    };
    deposit: number | null;
    pricing: {
        day: number | null;
        days2_3: number | null;
        days4_6: number | null;
        days7_13: number | null;
        days14_29: number | null;
        month: number | null;
    };
    brand: string;
};
