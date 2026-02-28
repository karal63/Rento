<script setup lang="ts">
    import { Button, Input } from '@/shared/ui';
    import { ref } from 'vue';
    import type { LoginDto } from '../model/types';
    import { login } from '../model/login.model';
    import { useRouter } from 'vue-router';
    import { showErrorDialog } from '@/features/dialog/@x';
    import type { AppError } from '@/shared/model';
    import useVuelidate from '@vuelidate/core';
    import { email, maxLength, required } from '@vuelidate/validators';
    import { strongPassword } from '../model/validation';
    import { useI18n } from 'vue-i18n';

    const rules = {
        email: { required, email, maxLength: maxLength(254) },
        password: { required, strongPassword },
    };
    const router = useRouter();
    const { t } = useI18n();

    const loginDto = ref<LoginDto>({
        email: '',
        password: '',
    });

    const v$ = useVuelidate(rules, loginDto);

    const handleSubmit = async () => {
        try {
            const isValid = await v$.value.$validate();
            if (!isValid) return;
            await login(loginDto.value);
            router.push('/');
        } catch (error) {
            showErrorDialog(error as AppError);
        }
    };
</script>

<template>
    <section class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-xl rounded-2xl border border-main-border shadow-lg p-8">
            <h1 class="text-3xl font-semibold">Welcome back!</h1>

            <form @submit.prevent="handleSubmit" class="mt-8 space-y-5">
                <div>
                    <p v-if="v$.email.$error" class="text-red-500 text-sm font-medium mb-1">
                        {{ t(`app.auth_form.${v$.email.$errors[0]?.$uid}`) }}
                    </p>
                    <label v-else class="block text-sm font-medium mb-1">Email</label>
                    <Input
                        v-model="loginDto.email"
                        size="large"
                        placeholder="you@example.com"
                        class="w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <div class="flex justify-between items-center mb-1">
                        <p v-if="v$.password.$error" class="text-red-500 text-sm font-medium mb-1">
                            {{ t(`app.login_form.${v$.password.$errors[0]?.$uid}`) }}
                        </p>
                        <label v-else class="block text-sm font-medium mb-1">Password</label>
                    </div>
                    <Input
                        v-model="loginDto.password"
                        size="large"
                        type="password"
                        placeholder="••••••••"
                        class="w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <Button type="submit" size="md" class="mt-5 w-full">Sign in</Button>
            </form>
        </div>
    </section>
</template>
