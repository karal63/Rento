<script setup lang="ts">
    import Input from '@/shared/ui/input/Input.vue';
    import { useVuelidate } from '@vuelidate/core';
    import { ref } from 'vue';
    import { email, minLength, required, sameAs } from '@vuelidate/validators';
    import { signup } from '../model/signup.model';
    import Button from '@/shared/ui/button/Button.vue';

    defineEmits<{
        (e: 'setIsLoginType', value: boolean): void;
    }>();

    const signupRules = {
        name: { required },
        secondName: { required },
        email: { required, email },
        phoneNumber: { required, length: minLength(12) },
        password: { required, minLength: minLength(4) },
        passwordRepeat: {
            required,
            sameAsPassword: sameAs(() => signupUser.value.password),
        },
    };

    const signupUser = ref({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordRepeat: '',
    });
    const loading = ref(false);

    const signupV$ = useVuelidate(signupRules, signupUser);

    const handleSubmit = async () => {
        const isValid = signupV$.value.$validate();
        if (!isValid) return;
        loading.value = true;
        await signup(signupUser.value);
        loading.value = false;
    };
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex-col gap-2">
        <Input
            v-model="signupUser.name"
            size="medium"
            :isError="signupV$.name.$errors.length >= 1"
            placeholder="Name"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUser.secondName"
            size="medium"
            :isError="signupV$.secondName.$errors.length >= 1"
            placeholder="Second name"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUser.email"
            type="email"
            size="medium"
            :isError="signupV$.email.$errors.length >= 1"
            placeholder="Email addres"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUser.phoneNumber"
            type="tel"
            size="medium"
            :isError="signupV$.phoneNumber.$errors.length >= 1"
            placeholder="Phone number"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUser.password"
            type="password"
            size="medium"
            :isError="signupV$.password.$errors.length >= 1"
            placeholder="Password"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUser.passwordRepeat"
            type="password"
            size="medium"
            :isError="signupV$.passwordRepeat.$errors.length >= 1"
            placeholder="Password (repeat)"
            :disabled="loading"
            class="w-full"
        />

        <div class="flex gap-2">
            <Button type="submit" size="sm" :disabled="loading" class="max-w-max">CREATE</Button>
            <Button
                @click="$emit('setIsLoginType', true)"
                size="sm"
                color="transparent"
                :disabled="loading"
                class="max-w-max border border-main-border"
            >
                already have an account
            </Button>
        </div>
    </form>
</template>
