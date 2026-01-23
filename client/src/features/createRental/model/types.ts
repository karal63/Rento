export type CreateUser = {
    userId: string;
    carId: string;
    period: {
        from: Date | '';
        to: Date | '';
    };
    pickupLocation: string;
    pickupTime: string;
};
