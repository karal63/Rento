<script setup lang="ts">
    import { useEditUserStore } from '../model/editUser.store';
    import { ref, watch } from 'vue';
    import { Button } from '@/shared/ui';
    import { UserForm } from '@/shared/ui/userForm';
    import { useI18n } from 'vue-i18n';
    import type { AppError } from '@/shared/model';
    import { showErrorDialog } from '@/features/dialog/@x';

    const editUserStore = useEditUserStore();
    const { t } = useI18n();

    const errorFields = ref<string[]>([]);

    watch(
        () => editUserStore.user,
        () => {
            if (!editUserStore.user) return;

            editUserStore.newUser.name = editUserStore.user.name;
            editUserStore.newUser.secondName = editUserStore.user.secondName ?? '';
            editUserStore.newUser.email = editUserStore.user.email ?? '';
            editUserStore.newUser.phoneNumber = editUserStore.user.phoneNumber ?? '';
            editUserStore.newUser.roles = [...editUserStore.user.roles];
        }
    );

    const handleEdit = async () => {
        if (!editUserStore.user) return;

        try {
            await editUserStore.edit(editUserStore.user?._id, editUserStore.newUser);
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
</script>

<template>
    <UserForm
        :is-open="editUserStore.isOpen"
        :user="editUserStore.newUser"
        @handle-submit="handleEdit"
        @close-modal="editUserStore.close"
        v-model="editUserStore.newUser"
        :errorFields="errorFields"
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
                    :disabled="editUserStore.newUser.roles.length <= 0 || editUserStore.loading"
                    class="w-full md:max-w-max"
                >
                    {{ t('app.protected_users_page.save') }}
                </Button>
            </div>
        </template>
    </UserForm>
</template>
