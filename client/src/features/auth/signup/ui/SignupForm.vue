<script setup lang="ts">
    import Input from '@/shared/ui/input/Input.vue';
    import { useVuelidate } from '@vuelidate/core';
    import { computed, reactive, ref } from 'vue';
    import { email, minLength, required, sameAs } from '@vuelidate/validators';
    import { signup } from '../model/signup.model';
    import Button from '@/shared/ui/button/Button.vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    defineEmits<{
        (e: 'setIsLoginType', value: boolean): void;
    }>();

    const signupUser = reactive({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordRepeat: '',
    });

    const password = computed(() => signupUser.password);

    const signupRules = {
        name: { required },
        secondName: { required },
        email: { required, email },
        phoneNumber: { required, length: minLength(12) },
        password: { required, minLength: minLength(4) },
        passwordRepeat: {
            required,
            sameAsPassword: sameAs(password),
        },
    };

    const loading = ref(false);
    const serverErrors = ref<string[]>([]);

    const signupV$ = useVuelidate(signupRules, signupUser);

    const handleSubmit = async () => {
        serverErrors.value = [];
        const isValid = await signupV$.value.$validate();
        if (!isValid) return;

        loading.value = true;

        const res = await signup(signupUser);
        serverErrors.value = Array.isArray(res) ? res : res ? [res] : [];

        loading.value = false;
    };
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex-col gap-2">
        <div>
            <span
                v-for="error in signupV$.name.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
            >
                {{ error.$message }}
            </span>
            <Input
                v-model="signupUser.name"
                size="medium"
                :isError="signupV$.name.$errors.length >= 1"
                :placeholder="t('app.auth.name')"
                :disabled="loading"
                class="w-full"
            />
        </div>
        <div>
            <span
                v-for="error in signupV$.secondName.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
            >
                {{ error.$message }}
            </span>
            <Input
                v-model="signupUser.secondName"
                size="medium"
                :isError="signupV$.secondName.$errors.length >= 1"
                :placeholder="t('app.auth.second_name')"
                :disabled="loading"
                class="w-full"
            />
        </div>
        <div>
            <span
                v-for="error in signupV$.email.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
            >
                {{ error.$message }}
            </span>
            <Input
                v-model="signupUser.email"
                type="email"
                size="medium"
                :isError="signupV$.email.$errors.length >= 1"
                :placeholder="t('app.auth.email')"
                :disabled="loading"
                class="w-full"
            />
        </div>
        <div>
            <span
                v-for="error in signupV$.phoneNumber.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
            >
                {{ error.$message }}
            </span>
            <Input
                v-model="signupUser.phoneNumber"
                type="tel"
                size="medium"
                :isError="signupV$.phoneNumber.$errors.length >= 1"
                :placeholder="t('app.auth.phone_number')"
                :disabled="loading"
                class="w-full"
            />
        </div>
        <div>
            <span
                v-for="error in signupV$.password.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
            >
                {{ error.$message }}
            </span>
            <Input
                v-model="signupUser.password"
                type="password"
                size="medium"
                :isError="signupV$.password.$errors.length >= 1"
                :placeholder="t('app.auth.password')"
                :disabled="loading"
                class="w-full"
            />
        </div>
        <div>
            <span
                v-for="error in signupV$.passwordRepeat.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
            >
                {{ error.$message }}
            </span>
            <Input
                v-model="signupUser.passwordRepeat"
                type="password"
                size="medium"
                :isError="signupV$.passwordRepeat.$errors.length >= 1"
                :placeholder="t('app.auth.password_repeat')"
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
                {{ t('app.auth.create') }}
            </Button>
            <Button
                @click="$emit('setIsLoginType', true)"
                size="sm"
                color="transparent"
                :disabled="loading"
                class="max-w-max border border-main-border"
            >
                {{ t('app.auth.already_have_an_account') }}
            </Button>
        </div>
    </form>
</template>
