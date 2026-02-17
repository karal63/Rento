export type Car = {
    _id: string;
    name: string;
    image: string;
    details: {
        accelerationTo100: number;
        horsepower: number;
        torqueNm: number;
        transmission: string;
        numberOfSeats: number;
    };
    deposit: number;
    pricing: CarDetails;
    brand: string;
};

export type CarDetails = {
    day: number;
    days2_3: number;
    days4_6: number;
    days7_13: number;
    days14_29: number;
    month: number;
};

export type PriceRange = {
    price: number;
    name: string;
};

export type CarFormType = {
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
