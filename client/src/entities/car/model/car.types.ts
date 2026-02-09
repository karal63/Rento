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
