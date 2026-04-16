<script setup lang="ts">
    import { onMounted, ref, type HTMLAttributes } from 'vue';
    import { cn } from '@/shared/lib';
    import { Button } from '@/shared/shadcn/ui/button';
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/shared/shadcn/ui/card';
    import { Field, FieldGroup, FieldLabel } from '@/shared/shadcn/ui/field';
    import { Input } from '@/shared/shadcn/ui/input';
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n';
    import type { LoginDto } from '../model/types';
    import useVuelidate from '@vuelidate/core';
    import { email, maxLength, required } from '@vuelidate/validators';
    import { login } from '../model/login.model';
    import { showDialog, showErrorDialog } from '@/features/dialog/@x';
    import type { AppError } from '@/shared/model';
    import { baseURL } from '@/shared/config';

    const props = defineProps<{
        class?: HTMLAttributes['class'];
    }>();

    const rules = {
        email: { required, email, maxLength: maxLength(254) },
        password: { required },
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
            showDialog(
                'success',
                t('app.login_page.success_login_msg'),
                t('app.login_page.success_login_msg_desc')
            );
        } catch (error) {
            showErrorDialog(error as AppError);
        }
    };

    onMounted(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', 'rento_cr_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-userpic', 'false');
        script.setAttribute('data-radius', '8');
        script.setAttribute('data-auth-url', `${baseURL}auth/telegram?url=/`);

        document.getElementById('telegram-login')?.appendChild(script);

        window.scrollTo({
            top: 0,
        });
    });
</script>

<template>
    <div :class="cn('flex flex-col gap-6 max-w-md', props.class)">
        <Card>
            <CardHeader>
                <CardTitle>{{ t('app.login_page.card_title') }}</CardTitle>
                <CardDescription>{{ t('app.login_page.card_desc') }}</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="handleSubmit">
                    <FieldGroup>
                        <Field>
                            <p
                                v-if="v$.email.$error"
                                class="text-destructive text-sm font-medium mb-1"
                            >
                                {{ t(`app.login_page.${v$.email.$errors[0]?.$uid}`) }}
                            </p>
                            <FieldLabel v-else for="email">{{ t('app.auth.email') }}</FieldLabel>
                            <Input
                                v-model="loginDto.email"
                                id="email"
                                data-testid="email-input"
                                placeholder="m@example.com"
                                required
                            />
                        </Field>
                        <Field>
                            <p
                                v-if="v$.password.$error"
                                class="text-destructive text-sm font-medium mb-1"
                            >
                                {{ t(`app.login_page.${v$.password.$errors[0]?.$uid}`) }}
                            </p>
                            <FieldLabel v-else for="password">
                                {{ t('app.auth.password') }}
                            </FieldLabel>
                            <Input
                                v-model="loginDto.password"
                                id="password"
                                data-testid="password-input"
                                type="password"
                                required
                            />
                        </Field>
                        <Field>
                            <Button type="submit" data-testid="login-button">
                                {{ t('app.auth.login') }}
                            </Button>
                            <div id="telegram-login"></div>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
