<script setup lang="ts">
    import { Button, Dropdown, Input, ModalTransition } from '@/shared/ui';
    import { useEditUserStore } from '../model/editUser.store';
    import { Icon } from '@iconify/vue';
    import { ref, watch } from 'vue';
    import { USER_ROLE, type UserRole } from '@/entities/user/model/types';
    import type { UserPayload } from '../model/types';
    // import { useClickOutside } from '@/shared/lib';

    const editUserStore = useEditUserStore();
    const isRoleDropdownOpen = ref(false);
    // const dropdownRef = ref<HTMLElement | null>(null);

    // useClickOutside(dropdownRef, () => (isRoleDropdownOpen.value = false));

    const newUser = ref<UserPayload>({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
        roles: [],
    });
    const selectedRole = ref<UserRole | ''>('');

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

    const roles = [
        {
            label: USER_ROLE.User,
            callback: () => (selectedRole.value = USER_ROLE.User),
        },
        {
            label: USER_ROLE.Employee,
            callback: () => (selectedRole.value = USER_ROLE.Employee),
        },
        {
            label: USER_ROLE.Admin,
            callback: () => (selectedRole.value = USER_ROLE.Admin),
        },
    ];

    const addRole = () => {
        if (selectedRole.value && !newUser.value.roles.includes(selectedRole.value))
            newUser.value.roles.push(selectedRole.value);
    };

    const removeRole = (role: UserRole) => {
        newUser.value.roles = newUser.value.roles.filter(r => r !== role);
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
                </div>

                <div class="mt-5 flex gap-7">
                    <div class="w-1/2">
                        <p class="text-sm text-main-gray">Roles</p>

                        <ul class="flex gap-3 mb-2">
                            <li v-for="role in newUser.roles" :key="role" class="max-w-max">
                                <Button
                                    @click="removeRole(role)"
                                    size="sm"
                                    color="transparent"
                                    class="max-w-max px-5 text-sm py-2 border border-main-border rounded-md flex gap-3 items-center"
                                >
                                    {{ role }}
                                    <Icon icon="material-symbols-light:close" />
                                </Button>
                            </li>
                        </ul>

                        <div class="flex gap-3">
                            <Dropdown
                                ref="dropdownRef"
                                :is-open="isRoleDropdownOpen"
                                :items="roles"
                                class="w-[80%]"
                            >
                                <Button
                                    size="sm"
                                    color="transparent"
                                    @click="isRoleDropdownOpen = !isRoleDropdownOpen"
                                    class="border border-main-border w-full flex-between"
                                >
                                    {{ selectedRole ? selectedRole : 'Select role' }}
                                    <Icon
                                        icon="weui:arrow-filled"
                                        class="transform rotate-90 text-xl text-main-gray"
                                    />
                                </Button>
                            </Dropdown>

                            <Button @click="addRole" size="sm" class="w-[20%]">Add</Button>
                        </div>
                    </div>

                    <div class="w-1/2"></div>
                </div>

                <div class="mt-5 flex justify-end gap-3">
                    <Button
                        @click="editUserStore.close"
                        size="sm"
                        color="transparent"
                        class="border border-main-border"
                    >
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
