export type Rental = {
    _id: string;
    carId: string;
    userId: string;
    rentFrom: number;
    rentTo: number;
    pickupLocation: string;
    pickupTime: string;
    totalPrice: number;
    status: string;
    createdAt: number;
    name: string;
};

export type CarAvailability = {
    rentalFrom: string;
    rentalTo: string;
};
