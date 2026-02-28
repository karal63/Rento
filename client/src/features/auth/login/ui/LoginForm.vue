<script setup lang="ts">
    import Input from '@/shared/ui/input/Input.vue';
    import { reactive, ref } from 'vue';
    import { email, minLength, required } from '@vuelidate/validators';
    import useVuelidate from '@vuelidate/core';
    import { login } from '../model/login.model';
    import Button from '@/shared/ui/button/Button.vue';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';
    import { showErrorDialog } from '@/features/dialog/@x';
    import type { AppError } from '@/shared/model';

    const { t } = useI18n();

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
        try {
            await login(loginUser);
        } catch (error) {
            showErrorDialog(error as AppError);
        } finally {
            loading.value = false;
        }
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
                :placeholder="t('app.auth.email')"
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
                :placeholder="t('app.auth.password')"
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
            <Button type="submit" size="sm" :disabled="loading" class="max-w-max">
                {{ t('app.auth.login') }}
            </Button>
            <Button
                @click="$emit('setIsLoginType', false)"
                size="sm"
                color="transparent"
                :disabled="loading"
                class="max-w-max border border-main-border"
            >
                {{ t('app.auth.create_an_account') }}
            </Button>
        </div>
    </form>
</template>
