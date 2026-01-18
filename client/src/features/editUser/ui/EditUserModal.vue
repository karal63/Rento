<script setup lang="ts">
    import { Button, Input, ModalTransition } from '@/shared/ui';
    import { useEditUserStore } from '../model/editUser.store';
    import { Icon } from '@iconify/vue';
    import { ref, watch } from 'vue';

    type NewUser = {
        name: string;
        secondName: string;
        email: string;
        phoneNumber: string;
        password: string;
    };

    const editUserStore = useEditUserStore();

    const newUser = ref<NewUser>({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    watch(
        () => editUserStore.user,
        () => {
            if (!editUserStore.user) return;

            newUser.value.name = editUserStore.user.name;
            newUser.value.secondName = editUserStore.user.secondName ?? '';
            newUser.value.email = editUserStore.user.email ?? '';
            newUser.value.phoneNumber = editUserStore.user.phoneNumber ?? '';
        }
    );

    const handleEdit = async () => {
        if (!editUserStore.user) return;
        await editUserStore.edit(editUserStore.user?._id, newUser.value);
    };
</script>

<template>
    <ModalTransition :is-open="editUserStore.isOpen" :onCancel="editUserStore.close">
        <div class="relative w-2/3 bg-main-bg rounded-md p-7">
            <div>
                <h2 class="text-2xl font-bold">{{ editUserStore.user?.name }}</h2>
            </div>

            <form @submit.prevent="handleEdit" class="mt-5">
                <div class="grid grid-cols-2 gap-x-7 gap-y-4">
                    <label>
                        <p class="text-sm text-main-gray">Name</p>
                        <Input size="medium" v-model="newUser.name" />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">Second name</p>
                        <Input size="medium" v-model="newUser.secondName" />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">Email</p>
                        <Input size="medium" v-model="newUser.email" />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">Phone number</p>
                        <Input size="medium" v-model="newUser.phoneNumber" />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">Password</p>
                        <Input size="medium" v-model="newUser.password" />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">Roles</p>
                        <Input size="medium" disabled />
                    </label>
                </div>

                <div class="mt-5 flex justify-end gap-3">
                    <Button size="sm" color="transparent" class="border border-main-border">
                        Cancel
                    </Button>
                    <Button type="submit" size="sm">Save</Button>
                </div>
            </form>

            <button
                @click="editUserStore.close"
                class="absolute right-3 top-3 cursor-pointer hover:bg-main-hover-bg p-1 rounded-md"
            >
                <Icon icon="material-symbols-light:close" class="text-xl" />
            </button>
        </div>
    </ModalTransition>
</template>
