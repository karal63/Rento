import type { UserPayload } from '@/shared/ui/userForm';
import type { ValidationArgs } from '@vuelidate/core';
import { required, minLength, maxLength, email, helpers } from '@vuelidate/validators';

// Basic E.164 phone validation
const phoneValidator = helpers.withMessage(
    'Phone number must be in international format (e.g. +12345678901)',
    (value: string) => /^\+[1-9]\d{10,14}$/.test(value)
);

export const userRules: ValidationArgs<UserPayload> = {
    name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
    },

    secondName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
    },

    email: {
        required,
        email,
        maxLength: maxLength(254), // RFC-safe upper bound
    },

    phoneNumber: {
        required,
        phoneValidator,
    },

    password: {
        // required,
        minLength: minLength(6),
        maxLength: maxLength(100),
        // strongPassword, // remove if not required
    },

    roles: {
        required,
        minLength: minLength(1),
    },
};
