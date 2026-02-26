import { helpers, maxLength, minLength, required } from '@vuelidate/validators';

const timeValidator = helpers.withMessage(
    'Pickup time must be in format ex. 07:00',
    (value: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value)
);

export const rentalRules = {
    employee: {},
    user: {
        required,
    },
    car: {
        required,
    },
    period: {
        required,
        dateFrom: {
            required,
        },
        dateTo: {
            required,
        },
    },
    pickupLocation: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(50),
    },
    pickupTime: {
        required,
        timeValidator,
    },
};
