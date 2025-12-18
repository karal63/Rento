<script setup lang="ts">
    import Input from '@/shared/ui/input/Input.vue';
    import { reactive, ref } from 'vue';
    import { email, minLength, required } from '@vuelidate/validators';
    import useVuelidate from '@vuelidate/core';
    import { login } from '../model/login.model';
    import Button from '@/shared/ui/button/Button.vue';
    import { Icon } from '@iconify/vue';

    defineEmits<{
        (e: 'setIsLoginType', value: boolean): void;
    }>();

    const loginRules = {
        email: { required, email },
        password: { required, length: minLength(4) },
    };

    const loginUser = reactive({
        email: '',
        password: '',
    });

    const loading = ref(false);
    const serverErrors = ref<string[]>([]);

    const loginV$ = useVuelidate(loginRules, loginUser);

    const handleSubmit = async () => {
        serverErrors.value = [];
        const isValid = await loginV$.value.$validate();
        if (!isValid) return;

        loading.value = true;
        const res = await login(loginUser);
        serverErrors.value = Array.isArray(res) ? res : res ? [res] : [];
        loading.value = false;
    };
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex-col gap-2">
        <div>
            <span
                v-for="error in loginV$.email.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
            >
                {{ error.$message }}
            </span>
            <Input
                v-model="loginUser.email"
                type="email"
                size="medium"
                :isError="loginV$.email.$errors.length >= 1"
                placeholder="Name"
                :disabled="loading"
                class="w-full"
            />
        </div>
        <div>
            <span
                v-for="error in loginV$.password.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
            >
                {{ error.$message }}
            </span>
            <Input
                v-model="loginUser.password"
                type="password"
                size="medium"
                :isError="loginV$.password.$errors.length >= 1"
                placeholder="Password"
                :disabled="loading"
                class="w-full"
            />
        </div>

        <div v-if="serverErrors.length >= 1">
            <div
                v-for="error in serverErrors"
                :key="error"
                class="border border-red-400 bg-red-500/10 my-5 px-4 py-2 text-lg rounded-md flex-between"
            >
                <h2>{{ error }}</h2>
                <Icon icon="ic:sharp-error" class="text-2xl text-red-400" />
            </div>
        </div>

        <div class="flex gap-2">
            <Button type="submit" size="sm" :disabled="loading" class="max-w-max">Login</Button>
            <Button
                @click="$emit('setIsLoginType', false)"
                size="sm"
                color="transparent"
                :disabled="loading"
                class="max-w-max border border-main-border"
            >
                Create an account
            </Button>
        </div>
    </form>
</template>
