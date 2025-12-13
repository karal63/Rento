<script setup lang="ts">
    import { login, LoginForm } from '@/features/auth/login';
    import { Input, Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { computed, ref } from 'vue';

    const loginUser = ref({
        email: '',
        password: '',
    });

    const signupUser = ref({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const isAuthLogin = ref(true);
    const passwordRepeat = ref('');
    const loading = ref(false);
    const isAuthenticated = ref(false);

    const submit = async () => {
        loading.value = true;

        if (isAuthLogin.value) {
            const success = await login(loginUser.value);
            if (success) isAuthenticated.value = true;
        } else {
            isAuthenticated.value = true;
        }

        loading.value = false;
    };

    const isDisabled = computed(() => {
        if (isAuthLogin.value) return !loginUser.value.email || !loginUser.value.password;
        else
            return (
                !signupUser.value.email ||
                !signupUser.value.password ||
                !signupUser.value.name ||
                !signupUser.value.phoneNumber ||
                !signupUser.value.secondName ||
                !passwordRepeat.value
            );
    });
</script>

<template>
    <form @submit.prevent>
        <div v-if="!isAuthenticated" class="flex-col gap-2">
            <h2 class="text-2xl mb-3">Login to continue</h2>
            <LoginForm v-if="isAuthLogin" v-model:loginUser="loginUser" :loading="loading" />

            <div v-else class="flex-col gap-2">
                <Input
                    v-model="signupUser.name"
                    size="medium"
                    placeholder="Name"
                    :disabled="loading"
                    class="w-full"
                />
                <Input
                    v-model="signupUser.secondName"
                    size="medium"
                    placeholder="Second name"
                    :disabled="loading"
                    class="w-full"
                />
                <Input
                    v-model="signupUser.email"
                    type="email"
                    size="medium"
                    placeholder="Email addres"
                    :disabled="loading"
                    class="w-full"
                />
                <Input
                    v-model="signupUser.phoneNumber"
                    type="tel"
                    size="medium"
                    placeholder="Phone number"
                    :disabled="loading"
                    class="w-full"
                />
                <Input
                    v-model="signupUser.password"
                    type="password"
                    size="medium"
                    placeholder="Password"
                    :disabled="loading"
                    class="w-full"
                />
                <Input
                    v-model="passwordRepeat"
                    type="password"
                    size="medium"
                    placeholder="Password (repeat)"
                    :disabled="loading"
                    class="w-full"
                />
            </div>

            <div v-if="isAuthLogin" class="flex gap-2">
                <Button
                    @click="submit"
                    size="sm"
                    :disabled="loading || isDisabled"
                    class="max-w-max"
                >
                    Login & proceed
                </Button>
                <Button
                    @click="isAuthLogin = false"
                    size="sm"
                    color="transparent"
                    :disabled="loading"
                    class="max-w-max border border-main-border"
                >
                    Create an account
                </Button>
            </div>

            <div v-else class="flex gap-2">
                <Button
                    @click="submit"
                    size="sm"
                    :disabled="loading || isDisabled"
                    class="max-w-max"
                >
                    CREATE & proceed
                </Button>
                <Button
                    @click="isAuthLogin = true"
                    size="sm"
                    color="transparent"
                    :disabled="loading"
                    class="max-w-max border border-main-border"
                >
                    already have an account
                </Button>
            </div>

            <div>
                <p class="my-2 text-sm text-main-gray">———— or ————</p>

                <Button size="sm" color="transparent" class="border border-main-border">
                    <Icon icon="ic:baseline-telegram" class="text-3xl" />
                </Button>
            </div>
        </div>

        <div v-else class="flex justify-end">
            <Button size="sm" class="flex-center gap-3">PROCEED</Button>
        </div>
    </form>
</template>
