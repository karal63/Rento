<script setup lang="ts">
    import Input from '@/shared/ui/input/Input.vue';
    import { computed } from 'vue';

    const props = defineProps<{
        signupUser: {
            name: string;
            secondName: string;
            email: string;
            phoneNumber: string;
            password: string;
        };
        loading: boolean;
        repeatPass: string;
    }>();

    const emit = defineEmits<{
        (e: 'update:signupUser', value: typeof props.signupUser): void;
        (e: 'update:repeatPass', value: typeof props.repeatPass): void;
    }>();

    const signupUserModel = computed({
        get: () => props.signupUser,
        set: value => emit('update:signupUser', value),
    });

    const repeatPassModel = computed({
        get: () => props.repeatPass,
        set: value => emit('update:repeatPass', value),
    });
</script>

<template>
    <div class="flex-col gap-2">
        <Input
            v-model="signupUserModel.name"
            size="medium"
            placeholder="Name"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUserModel.secondName"
            size="medium"
            placeholder="Second name"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUserModel.email"
            type="email"
            size="medium"
            placeholder="Email addres"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUserModel.phoneNumber"
            type="tel"
            size="medium"
            placeholder="Phone number"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="signupUserModel.password"
            type="password"
            size="medium"
            placeholder="Password"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="repeatPassModel"
            type="password"
            size="medium"
            placeholder="Password (repeat)"
            :disabled="loading"
            class="w-full"
        />
    </div>
</template>
