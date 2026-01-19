<script setup lang="ts">
    import { ref } from 'vue';
    import ModalTransition from '../modalTransition/ModalTransition.vue';
    import { USER_ROLE, type UserRole } from '@/entities/user/model/types';
    import type { UserPayload } from '@/shared/ui/userForm/types';
    import Input from '../input/Input.vue';
    import { Button } from '../button';
    import { Dropdown } from '..';
    import { Icon } from '@iconify/vue';
    import { email, minLength, required } from '@vuelidate/validators';
    import useVuelidate from '@vuelidate/core';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const isRoleDropdownOpen = ref(false);
    const selectedRole = ref<UserRole | ''>('');

    const userRules = {
        name: { required, length: minLength(3) },
        secondName: { required, length: minLength(3) },
        email: { required, email },
        phoneNumber: { required, length: minLength(12) },
        password: { length: minLength(6) },
        roles: { required, length: minLength(1) },
    };

    const props = defineProps<{
        isOpen: boolean;
        selectedUser: UserPayload;
    }>();

    const v$ = useVuelidate(userRules, props.selectedUser);

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
            label: t(`app.role.${USER_ROLE.User}`),
            callback: () => {
                selectedRole.value = USER_ROLE.User;
                isRoleDropdownOpen.value = false;
            },
        },
        {
            label: t(`app.role.${USER_ROLE.Employee}`),
            callback: () => {
                selectedRole.value = USER_ROLE.Employee;
                isRoleDropdownOpen.value = false;
            },
        },
        {
            label: t(`app.role.${USER_ROLE.Admin}`),
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

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        emit('handleSubmit');
    };
</script>

<template>
    <ModalTransition :is-open="isOpen" :onCancel="handleCloseModal">
        <div class="relative w-2/3 bg-main-bg rounded-md p-7 border border-main-border">
            <slot name="header" />

            <form @submit.prevent="handleSubmit" class="mt-5">
                <div class="grid grid-cols-2 gap-x-7 gap-y-4">
                    <label>
                        <p class="text-sm text-main-gray">{{ t('app.auth.name') }}</p>
                        <p v-if="v$.name.$error" class="text-sm text-red-500">
                            {{ v$.name.$errors[0]?.$message }}
                        </p>
                        <Input size="medium" v-model="newUser.name" :is-error="v$.name.$error" />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">{{ t('app.auth.second_name') }}</p>
                        <p v-if="v$.secondName.$error" class="text-sm text-red-500">
                            {{ v$.secondName.$errors[0]?.$message }}
                        </p>
                        <Input
                            size="medium"
                            v-model="newUser.secondName"
                            :is-error="v$.secondName.$error"
                        />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">{{ t('app.auth.email') }}</p>
                        <p v-if="v$.email.$error" class="text-sm text-red-500">
                            {{ v$.email.$errors[0]?.$message }}
                        </p>
                        <Input size="medium" v-model="newUser.email" :is-error="v$.email.$error" />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">{{ t('app.auth.phone_number') }}</p>
                        <p v-if="v$.phoneNumber.$error" class="text-sm text-red-500">
                            {{ v$.phoneNumber.$errors[0]?.$message }}
                        </p>
                        <Input
                            size="medium"
                            v-model="newUser.phoneNumber"
                            :is-error="v$.phoneNumber.$error"
                        />
                    </label>
                    <label>
                        <p class="text-sm text-main-gray">{{ t('app.auth.password') }}</p>
                        <p v-if="v$.password.$error" class="text-sm text-red-500">
                            {{ v$.password.$errors[0]?.$message }}
                        </p>
                        <Input
                            size="medium"
                            v-model="newUser.password"
                            :is-error="v$.password.$error"
                        />
                    </label>
                </div>

                <hr class="text-main-border mt-7 mb-4" />

                <div class="flex gap-7">
                    <div class="w-1/2">
                        <p class="text-xl font-semibold mb-2">
                            {{ t('app.protected_users_page.roles') }}
                        </p>

                        <ul class="flex gap-3 mb-4">
                            <li v-for="role in newUser.roles" :key="role" class="max-w-max">
                                <Button
                                    @click="removeRole(role)"
                                    size="sm"
                                    color="transparent"
                                    class="max-w-max px-5 text-sm py-2 border border-main-border rounded-md flex gap-3 items-center"
                                >
                                    {{ t(`app.role.${role}`) }}
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
                                    {{
                                        selectedRole
                                            ? selectedRole
                                            : t('app.protected_users_page.select_role')
                                    }}
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
                                {{ t('app.protected_users_page.add') }}
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
