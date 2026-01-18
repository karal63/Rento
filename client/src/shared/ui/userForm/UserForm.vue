<script setup lang="ts">
    import { ref } from 'vue';
    import ModalTransition from '../modalTransition/ModalTransition.vue';
    import { USER_ROLE, type UserRole } from '@/entities/user/model/types';
    import type { UserPayload } from '@/shared/ui/userForm/types';
    import Input from '../input/Input.vue';
    import { Button } from '../button';
    import { Dropdown } from '..';
    import { Icon } from '@iconify/vue';

    const isRoleDropdownOpen = ref(false);
    const selectedRole = ref<UserRole | ''>('');

    defineProps<{
        isOpen: boolean;
    }>();

    const emit = defineEmits<{
        (e: 'addRole', role: UserRole): void;
        (e: 'removeRole', role: UserRole): void;
        (e: 'closeModal'): void;
        (e: 'handleSubmit'): void;
        (e: 'addRole', selectedRole: UserRole | ''): void;
    }>();

    const newUser = defineModel<UserPayload>({ required: true });

    const roles = [
        {
            label: USER_ROLE.User,
            callback: () => {
                selectedRole.value = USER_ROLE.User;
                isRoleDropdownOpen.value = false;
            },
        },
        {
            label: USER_ROLE.Employee,
            callback: () => {
                selectedRole.value = USER_ROLE.Employee;
                isRoleDropdownOpen.value = false;
            },
        },
        {
            label: USER_ROLE.Admin,
            callback: () => {
                selectedRole.value = USER_ROLE.Admin;
                isRoleDropdownOpen.value = false;
            },
        },
    ];

    const handleCloseModal = () => {
        emit('closeModal');
    };

    const addRole = (selectedRole: UserRole | '') => {
        if (selectedRole && !newUser.value.roles.includes(selectedRole))
            newUser.value.roles.push(selectedRole);
    };

    const removeRole = (role: UserRole) => {
        newUser.value.roles = newUser.value.roles.filter(r => r !== role);
    };
</script>

<template>
    <ModalTransition :is-open="isOpen" :onCancel="handleCloseModal">
        <div class="relative w-2/3 bg-main-bg rounded-md p-7">
            <slot name="header" />

            <form @submit.prevent="$emit('handleSubmit')" class="mt-5">
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

                <hr class="text-main-border mt-7 mb-4" />

                <div class="flex gap-7">
                    <div class="w-1/2">
                        <p class="text-xl font-semibold mb-2">Roles</p>

                        <ul class="flex gap-3 mb-4">
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

                            <Button
                                @click="addRole(selectedRole)"
                                size="sm"
                                class="w-[20%] flex-between"
                            >
                                <Icon icon="material-symbols:add-rounded" class="text-xl" />
                                Add
                            </Button>
                        </div>
                    </div>

                    <div class="w-1/2"></div>
                </div>

                <slot name="footer" />
            </form>

            <button
                @click="handleCloseModal"
                class="absolute right-3 top-3 cursor-pointer hover:bg-main-hover-bg p-1 rounded-md"
            >
                <Icon icon="material-symbols-light:close" class="text-xl" />
            </button>
        </div>
    </ModalTransition>
</template>
