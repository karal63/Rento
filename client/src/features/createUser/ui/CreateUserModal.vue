<script setup lang="ts">
    import { Button } from '@/shared/ui';
    import { UserForm, type UserPayload } from '@/shared/ui/userForm';
    import { useI18n } from 'vue-i18n';
    import { useCreateUserStore } from '../model/createUser.store';
    import { ref } from 'vue';
    import { showDialog, showErrorDialog } from '@/features/dialog/@x';
    import type { AppError } from '@/shared/model';
    import { rules } from '../const/rules';
    import useVuelidate from '@vuelidate/core';

    const { t } = useI18n();
    const createUserStore = useCreateUserStore();

    const errorFields = ref<string[]>([]);

    const user = ref<UserPayload>({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
        roles: ['user'],
    });

    const v$ = useVuelidate(rules, user);

    const handleCreate = async () => {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        try {
            await createUserStore.create(user.value);
            showDialog(
                'success',
                t('app.message.user_created'),
                t('app.message.user_created_desc')
            );
            clearUser();
        } catch (e) {
            const error = e as AppError;
            showErrorDialog(e as AppError);
            if (error.code === 'VALIDATION_ERROR' && error.context) {
                errorFields.value = error.context?.map(c => c.field);

                return;
            }
        }
    };

    const handleClose = () => {
        clearUser();
        createUserStore.closeModal();
    };

    const clearError = (field: string) => {
        errorFields.value = errorFields.value.filter(f => f !== field);
    };

    const clearUser = () => {
        user.value = {
            name: '',
            secondName: '',
            email: '',
            phoneNumber: '',
            password: '',
            roles: [],
        };
    };
</script>

<template>
    <UserForm
        v-model="user"
        :is-open="createUserStore.isModalOpen"
        :error-fields="errorFields"
        :rules="rules"
        :v$="v$"
        @handle-submit="handleCreate"
        @close-modal="handleClose"
        @clear-error="clearError"
    >
        <template #header>
            <div>
                <h2 class="text-2xl font-bold">{{ t('app.protected_users_page.new_user') }}</h2>
            </div>
        </template>
        <template #footer>
            <div class="md:flex space-y-3 md:space-y-0 justify-end gap-3 mt-5">
                <Button
                    size="sm"
                    color="transparent"
                    class="border border-main-border w-full md:max-w-max"
                >
                    {{ t('app.protected_users_page.cancel') }}
                </Button>
                <Button
                    type="submit"
                    size="sm"
                    :disabled="user.roles.length <= 0 || createUserStore.loading"
                    class="w-full md:max-w-max"
                >
                    {{ t('app.protected_users_page.save') }}
                </Button>
            </div>
        </template>
    </UserForm>
</template>
