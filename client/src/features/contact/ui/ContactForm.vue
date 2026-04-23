<script setup lang="ts">
    import { Button, Input, Textarea } from '@/shared/ui';
    import useVuelidate from '@vuelidate/core';
    import { email, maxLength, minLength, required } from '@vuelidate/validators';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import type { AppError } from '@/shared/model';
    import { showDialog, showErrorDialog } from '@/features/dialog';
    import { useRouter } from 'vue-router';
    import { sendMessage } from '../model/sendMessage';
    import type { ContactMessage } from '../model/types';

    const { t } = useI18n();
    const router = useRouter();

    const rules = {
        name: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(25),
        },
        email: {
            required,
            email,
        },
        content: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(500),
        },
    };

    const message = ref<ContactMessage>({
        name: '',
        email: '',
        content: '',
    });

    const v$ = useVuelidate(rules, message);

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        try {
            await sendMessage(message.value);

            showDialog(
                'success',
                t('app.contact_form.message_sent'),
                t('app.contact_form.message_sent_desc')
            );
            router.push('/');
        } catch (error) {
            showErrorDialog(error as AppError);
        }
    };
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4 w-full lg:w-1/2">
        <div>
            <label class="block text-sm font-medium mb-1">
                <span v-if="v$.name.$error" :class="v$.name.$error && 'text-destructive'">
                    {{ t(`app.contact_form.${v$.name.$errors[0]?.$uid}`) }}
                </span>
                <span v-else>{{ t('app.contact_form.name') }}</span>
            </label>
            <Input v-model="message.name" size="medium" :is-error="v$.name.$error" />
        </div>
        <div>
            <label for="email" class="block text-sm font-medium mb-1">
                <span v-if="v$.email.$error" :class="v$.email.$error && 'text-destructive'">
                    {{ t(`app.contact_form.${v$.email.$errors[0]?.$uid}`) }}
                </span>
                <span v-else>{{ t('app.contact_form.email') }}</span>
            </label>
            <Input v-model="message.email" size="medium" type="email" :is-error="v$.email.$error" />
        </div>
        <div>
            <label for="message" class="block text-sm font-medium mb-1">
                <span v-if="v$.content.$error" :class="v$.content.$error && 'text-destructive'">
                    {{ t(`app.contact_form.${v$.content.$errors[0]?.$uid}`) }}
                </span>
                <span v-else>{{ t('app.contact_form.content') }}</span>
            </label>
            <Textarea v-model="message.content" size="medium" :is-error="v$.content.$error" />
        </div>

        <Button type="submit" size="sm">{{ t('app.contact_form.send-btn') }}</Button>
    </form>
</template>
