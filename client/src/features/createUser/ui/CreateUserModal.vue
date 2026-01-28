<script setup lang="ts">
    import { Button } from '@/shared/ui';
    import { UserForm, type UserPayload } from '@/shared/ui/userForm';
    import { useI18n } from 'vue-i18n';
    import { useCreateUserStore } from '../model/createUser.store';
    import { ref } from 'vue';
    import { showErrorDialog } from '@/features/dialog/@x';
    import type { AppError } from '@/shared/model';

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

    const handleCreate = async () => {
        try {
            await createUserStore.create(user.value);
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
        user.value = {
            name: '',
            secondName: '',
            email: '',
            phoneNumber: '',
            password: '',
            roles: ['user'],
        };
        createUserStore.closeModal();
    };

    const clearError = (field: string) => {
        errorFields.value = errorFields.value.filter(f => f !== field);
    };
</script>

<template>
    <UserForm
        :is-open="createUserStore.isModalOpen"
        :user="user"
        @handle-submit="handleCreate"
        @close-modal="handleClose"
        v-model="user"
        @clear-error="clearError"
        :error-fields="errorFields"
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
