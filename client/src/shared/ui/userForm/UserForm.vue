<script setup lang="ts">
    import { ref } from 'vue';
    import ModalTransition from '../modalTransition/ModalTransition.vue';
    import { USER_ROLE, type UserRole } from '@/entities/user/model/types';
    import type { UserPayload } from '@/shared/ui/userForm/types';
    import Input from '../input/Input.vue';
    import { Button } from '../button';
    import { Dropdown } from '..';
    import { Icon } from '@iconify/vue';
    import type { Validation, ValidationArgs } from '@vuelidate/core';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const isRoleDropdownOpen = ref(false);
    const selectedRole = ref<UserRole | ''>('');

    defineProps<{
        isOpen: boolean;
        errorFields: string[];
        rules: ValidationArgs<UserPayload>;
        v$: Validation<UserPayload>;
    }>();

    const emit = defineEmits<{
        (e: 'closeModal'): void;
        (e: 'handleSubmit'): void;
        (e: 'clearError', field: string): void;
    }>();

    const user = defineModel<UserPayload>({ required: true });

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
        // modal doesnt close
        emit('closeModal');
    };

    const addRole = (selectedRole: UserRole | '') => {
        if (selectedRole && !user.value.roles.includes(selectedRole))
            user.value.roles.push(selectedRole);
    };

    const removeRole = (role: UserRole) => {
        user.value.roles = user.value.roles.filter(r => r !== role);
    };

    const handleSubmit = async () => {
        emit('handleSubmit');
    };
</script>

<template>
    <ModalTransition :is-open="isOpen" :onCancel="handleCloseModal">
        <div class="fixed inset-0 flex items-center justify-center p-4">
            <div
                class="relative w-full max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl max-h-[90vh] bg-main-bg rounded-md border border-main-border flex flex-col"
            >
                <!-- Header -->
                <div class="p-5 md:p-7 border-b border-main-border shrink-0">
                    <slot name="header" />
                </div>

                <!-- Scrollable Content -->
                <div class="overflow-y-auto p-5 md:p-7">
                    <form @submit.prevent="handleSubmit" class="mt-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4">
                            <label>
                                <p v-if="v$.name.$error" class="text-sm text-red-500">
                                    {{ t(`app.user_form.${v$.name.$errors[0]?.$uid}`) }}
                                </p>
                                <p v-else class="text-sm text-main-gray">
                                    {{ t('app.auth.name') }}
                                </p>
                                <Input
                                    size="medium"
                                    v-model="user.name"
                                    :is-error="v$.name.$error || errorFields.includes('name')"
                                    @onUpdate="$emit('clearError', 'name')"
                                />
                            </label>
                            <label>
                                <p v-if="v$.secondName.$error" class="text-sm text-red-500">
                                    {{ t(`app.user_form.${v$.secondName.$errors[0]?.$uid}`) }}
                                </p>
                                <p v-else class="text-sm text-main-gray">
                                    {{ t('app.auth.second_name') }}
                                </p>
                                <Input
                                    size="medium"
                                    v-model="user.secondName"
                                    :is-error="
                                        v$.secondName.$error || errorFields.includes('secondName')
                                    "
                                    @onUpdate="$emit('clearError', 'secondName')"
                                />
                            </label>
                            <label>
                                <p v-if="v$.email.$error" class="text-sm text-red-500">
                                    {{ t(`app.user_form.${v$.email.$errors[0]?.$uid}`) }}
                                </p>
                                <p v-else class="text-sm text-main-gray">
                                    {{ t('app.auth.email') }}
                                </p>
                                <Input
                                    size="medium"
                                    v-model="user.email"
                                    :is-error="v$.email.$error || errorFields.includes('email')"
                                    @onUpdate="$emit('clearError', 'email')"
                                />
                            </label>
                            <label>
                                <p v-if="v$.phoneNumber.$error" class="text-sm text-red-500">
                                    {{ t(`app.user_form.${v$.phoneNumber.$errors[0]?.$uid}`) }}
                                </p>
                                <p v-else class="text-sm text-main-gray">
                                    {{ t('app.auth.phone_number') }}
                                </p>
                                <Input
                                    size="medium"
                                    v-model="user.phoneNumber"
                                    :is-error="
                                        v$.phoneNumber.$error || errorFields.includes('phoneNumber')
                                    "
                                    @onUpdate="$emit('clearError', 'phoneNumber')"
                                />
                            </label>
                            <label>
                                <p v-if="v$.password.$error" class="text-sm text-red-500">
                                    {{ t(`app.user_form.${v$.password.$errors[0]?.$uid}`) }}
                                </p>
                                <p v-else class="text-sm text-main-gray">
                                    {{ t('app.auth.password') }}
                                </p>
                                <Input
                                    size="medium"
                                    v-model="user.password"
                                    :is-error="
                                        v$.password.$error || errorFields.includes('password')
                                    "
                                    @onUpdate="$emit('clearError', 'password')"
                                />
                            </label>
                        </div>

                        <hr class="text-main-border mt-7 mb-4" />

                        <div class="flex gap-7">
                            <div>
                                <p class="text-xl font-semibold mb-2">
                                    {{ t('app.protected_users_page.roles') }}
                                </p>

                                <ul class="flex gap-3 mb-4">
                                    <li v-for="role in user.roles" :key="role" class="max-w-max">
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
                                    >
                                        <Button
                                            size="sm"
                                            color="transparent"
                                            @click="isRoleDropdownOpen = !isRoleDropdownOpen"
                                            class="border border-main-border flex-between gap-3"
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
                                        class="flex items-center gap-3"
                                    >
                                        <Icon icon="material-symbols:add-rounded" class="text-xl" />
                                        {{ t('app.protected_users_page.add') }}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <slot name="footer" />
                    </form>
                </div>

                <button
                    @click="handleCloseModal"
                    class="absolute right-3 top-3 cursor-pointer hover:bg-main-hover-bg p-1 rounded-md"
                >
                    <Icon icon="material-symbols-light:close" class="text-xl" />
                </button>
            </div>
        </div>
    </ModalTransition>
</template>
