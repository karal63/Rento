<script setup lang="ts">
    import { useUserStore } from '@/entities/user';
    import { login, LoginForm } from '@/features/auth/login';
    import { signup, SignupForm } from '@/features/auth/signup';
    import { baseURL } from '@/shared/config';
    import { Button } from '@/shared/ui';
    import { computed, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const userStore = useUserStore();
    const { params } = useRoute();

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

    const submit = async () => {
        loading.value = true;

        if (isAuthLogin.value) {
            await login(loginUser.value);
        } else {
            if (signupUser.value.password === passwordRepeat.value) {
                await signup(signupUser.value);
            }
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

    onMounted(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', 'rento_cr_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-userpic', 'false');
        script.setAttribute('data-radius', '8');
        script.setAttribute('data-auth-url', `${baseURL}auth/telegram?car_id=${params.id}`);

        document.getElementById('telegram-login')?.appendChild(script);
    });
</script>

<template>
    <form @submit.prevent>
        <div v-if="!userStore.isAuthenticated" class="flex-col gap-2">
            <h2 class="text-2xl mb-3">Login to continue</h2>
            <LoginForm v-if="isAuthLogin" v-model:loginUser="loginUser" :loading="loading" />
            <SignupForm
                v-else
                v-model:signupUser="signupUser"
                v-model:repeatPass="passwordRepeat"
                :loading="loading"
            />

            <div v-if="isAuthLogin" class="flex gap-2">
                <Button
                    @click="submit"
                    size="sm"
                    :disabled="loading || isDisabled"
                    class="max-w-max"
                >
                    Login
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
                    CREATE
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

                <!-- <Button size="sm" color="transparent" class="border border-main-border">
                    <Icon icon="ic:baseline-telegram" class="text-3xl" />
                </Button> -->
                <div id="telegram-login"></div>
            </div>
        </div>
    </form>
</template>
