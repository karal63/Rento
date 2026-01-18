<script setup lang="ts">
    import { useEditUserStore } from '../model/editUser.store';
    import { watch } from 'vue';
    import { Button, Message } from '@/shared/ui';
    import { UserForm } from '@/shared/ui/userForm';
    import { useI18n } from 'vue-i18n';

    const editUserStore = useEditUserStore();
    const { t } = useI18n();

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
        await editUserStore.edit(editUserStore.user?._id, editUserStore.newUser);
    };
</script>

<template>
    <UserForm
        :is-open="editUserStore.isOpen"
        :selectedUser="editUserStore.newUser"
        @handle-submit="handleEdit"
        @close-modal="editUserStore.close"
        v-model="editUserStore.newUser"
    >
        <template #header>
            <div>
                <h2 class="text-2xl font-bold">{{ editUserStore.user?.name }}</h2>
            </div>
        </template>
        <template #footer>
            <div class="flex-between mt-5">
                <div class="w-1/2">
                    <Message
                        v-if="editUserStore.error"
                        type="error"
                        :message="editUserStore.error"
                        class="mb-0 mt-0"
                    />
                </div>
                <div class="flex justify-end gap-3">
                    <Button
                        @click="editUserStore.close"
                        size="sm"
                        color="transparent"
                        class="border border-main-border"
                    >
                        {{ t('app.protected_users_page.cancel') }}
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        :disabled="editUserStore.newUser.roles.length <= 0 || editUserStore.loading"
                    >
                        {{ t('app.protected_users_page.save') }}
                    </Button>
                </div>
            </div>
        </template>
    </UserForm>
</template>
