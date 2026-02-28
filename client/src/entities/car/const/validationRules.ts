import {
    required,
    minValue,
    maxValue,
    minLength,
    maxLength,
    numeric,
    integer,
} from '@vuelidate/validators';

export const carRules = {
    name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
    },

    images: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(10),
        $each: {
            required,
        },
    },

    details: {
        required,

        accelerationTo100: {
            required,
            numeric,
            minValue: minValue(0),
            maxValue: maxValue(20), // realistic upper bound
        },

        horsepower: {
            required,
            integer,
            minValue: minValue(1),
            maxValue: maxValue(3000),
        },

        torqueNm: {
            required,
            numeric,
            minValue: minValue(1),
            maxValue: maxValue(5000),
        },

        transmission: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(50),
        },

        numberOfSeats: {
            required,
            integer,
            minValue: minValue(1),
            maxValue: maxValue(20),
        },
    },

    deposit: {
        required,
        numeric,
        minValue: minValue(0),
    },

    pricing: {
        required,

        day: {
            required,
            numeric,
            minValue: minValue(0),
        },

        days2_3: {
            required,
            numeric,
            minValue: minValue(0),
        },

        days4_6: {
            required,
            numeric,
            minValue: minValue(0),
        },

        days7_13: {
            required,
            numeric,
            minValue: minValue(0),
        },

        days14_29: {
            required,
            numeric,
            minValue: minValue(0),
        },

        month: {
            required,
            numeric,
            minValue: minValue(0),
        },
    },

    brand: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
    },
};
