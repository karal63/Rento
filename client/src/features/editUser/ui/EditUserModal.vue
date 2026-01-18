<script setup lang="ts">
    import { useEditUserStore } from '../model/editUser.store';
    import { ref, watch } from 'vue';
    import type { UserPayload } from '../../../shared/ui/userForm/types';
    import { Button } from '@/shared/ui';
    import { UserForm } from '@/shared/ui/userForm';

    const editUserStore = useEditUserStore();

    const newUser = ref<UserPayload>({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
        roles: [],
    });

    watch(
        () => editUserStore.user,
        () => {
            if (!editUserStore.user) return;

            newUser.value.name = editUserStore.user.name;
            newUser.value.secondName = editUserStore.user.secondName ?? '';
            newUser.value.email = editUserStore.user.email ?? '';
            newUser.value.phoneNumber = editUserStore.user.phoneNumber ?? '';
            newUser.value.roles = [...editUserStore.user.roles];
        }
    );

    const handleEdit = async () => {
        if (!editUserStore.user) return;
        await editUserStore.edit(editUserStore.user?._id, newUser.value);
    };
</script>

<template>
    <UserForm
        :is-open="editUserStore.isOpen"
        :selectedUser="editUserStore.user"
        @handle-submit="handleEdit"
        @close-modal="editUserStore.close"
        v-model="newUser"
    >
        <template #header>
            <div>
                <h2 class="text-2xl font-bold">{{ editUserStore.user?.name }}</h2>
            </div>
        </template>
        <template #footer>
            <div class="mt-5 flex justify-end gap-3">
                <Button
                    @click="editUserStore.close"
                    size="sm"
                    color="transparent"
                    class="border border-main-border"
                >
                    Cancel
                </Button>
                <Button type="submit" size="sm" :disabled="newUser.roles.length <= 0">Save</Button>
            </div>
        </template>
    </UserForm>
</template>
