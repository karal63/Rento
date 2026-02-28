<script setup lang="ts">
    import { useEditUserStore } from '../model/editUser.store';
    import { ref, watch } from 'vue';
    import { Button } from '@/shared/ui';
    import { UserForm, type UserPayload } from '@/shared/ui/userForm';
    import { useI18n } from 'vue-i18n';
    import type { AppError } from '@/shared/model';
    import { showErrorDialog } from '@/features/dialog/@x';
    import { rules } from '../const/rules';
    import useVuelidate from '@vuelidate/core';

    const editUserStore = useEditUserStore();
    const { t } = useI18n();

    const errorFields = ref<string[]>([]);
    const formUser = ref<UserPayload>({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
        roles: ['user'],
    });

    const v$ = useVuelidate(rules, formUser);

    watch(
        () => editUserStore.user,
        () => {
            if (!editUserStore.user) return;

            formUser.value.name = editUserStore.user.name;
            formUser.value.secondName = editUserStore.user.secondName ?? '';
            formUser.value.email = editUserStore.user.email ?? '';
            formUser.value.phoneNumber = editUserStore.user.phoneNumber ?? '';
            formUser.value.roles = [...editUserStore.user.roles];
        }
    );

    const handleEdit = async () => {
        const isValid = await v$.value.$validate();

        if (!editUserStore.user || !isValid) return;

        try {
            await editUserStore.edit(editUserStore.user?._id, formUser.value);
            clearUser();
            v$.value.$reset();
        } catch (e) {
            const error = e as AppError;
            showErrorDialog(error);
            if (error.code === 'VALIDATION_ERROR' && error.context) {
                errorFields.value = error.context?.map(c => c.field);

                return;
            }
        }
    };

    const clearError = (field: string) => {
        errorFields.value = errorFields.value.filter(f => f !== field);
    };

    const handleCloseModal = () => {
        clearUser();
        editUserStore.close();

        // makes errors show up only after clicking submit button
        v$.value.$reset();
    };

    const clearUser = () => {
        formUser.value = {
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
        v-model="formUser"
        :is-open="editUserStore.isOpen"
        :errorFields="errorFields"
        :rules="rules"
        :v$="v$"
        @handle-submit="handleEdit"
        @close-modal="handleCloseModal"
        @clearError="clearError"
    >
        <template #header>
            <div>
                <h2 class="text-2xl font-bold">{{ editUserStore.user?.name }}</h2>
            </div>
        </template>
        <template #footer>
            <div class="md:flex space-y-3 md:space-y-0 justify-end gap-3 mt-5">
                <Button
                    @click="editUserStore.close"
                    size="sm"
                    color="transparent"
                    class="border border-main-border w-full md:max-w-max"
                >
                    {{ t('app.protected_users_page.cancel') }}
                </Button>
                <Button
                    type="submit"
                    size="sm"
                    :disabled="formUser.roles.length <= 0 || editUserStore.loading"
                    class="w-full md:max-w-max"
                >
                    {{ t('app.protected_users_page.save') }}
                </Button>
            </div>
        </template>
    </UserForm>
</template>
