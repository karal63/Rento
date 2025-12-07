<script setup lang="ts">
    import { Input, Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';

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

    const submit = () => {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
            isAuthenticated.value = true;
        }, 2000);
    };
</script>

<template>
    <form @submit.prevent>
        <h2 class="text-2xl mb-3">Login to continue</h2>
        <div>
            <div v-if="!isAuthenticated" class="flex-col gap-2">
                <div v-if="isAuthLogin" class="flex-col gap-2">
                    <Input
                        v-model="loginUser.email"
                        type="email"
                        size="medium"
                        placeholder="Name"
                        :disabled="loading"
                        class="w-full"
                    />
                    <Input
                        v-model="loginUser.password"
                        type="password"
                        size="medium"
                        placeholder="Password"
                        :disabled="loading"
                        class="w-full"
                    />
                </div>

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
                    <Button @click="submit" size="sm" :disabled="loading" class="max-w-max">
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
                    <Button @click="submit" size="sm" :disabled="loading" class="max-w-max">
                        RESERVE
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

            <div
                v-else
                class="flex items-center gap-10 bg-primary/10 border border-primary rounded-md py-2 px-4 max-w-max"
            >
                <p class="text-lg text-primary">Successfully logged in</p>
                <Icon icon="material-symbols:check-rounded" class="text-2xl text-primary" />
            </div>
        </div>
    </form>
</template>
