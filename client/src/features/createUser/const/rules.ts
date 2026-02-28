import { userRules } from '@/entities/user';
import type { UserPayload } from '@/shared/ui/userForm';
import type { ValidationArgs } from '@vuelidate/core';
import { helpers, maxLength, minLength } from '@vuelidate/validators';
import { required } from '@vuelidate/validators';

const strongPassword = helpers.withMessage(
    'Password must contain at least one uppercase letter, one lowercase letter and one number',
    (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value)
);

export const rules: ValidationArgs<UserPayload> = {
    ...userRules,
    password: {
        minLength: minLength(8),
        maxLength: maxLength(100),
        required,
        strongPassword, // remove if not required
    },
};
