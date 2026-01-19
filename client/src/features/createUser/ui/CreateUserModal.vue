<script setup lang="ts">
    import { Button } from '@/shared/ui';
    import { UserForm, type UserPayload } from '@/shared/ui/userForm';
    import { useI18n } from 'vue-i18n';
    import { useCreateUserStore } from '../model/createUser.store';
    import type { User } from '@/entities/user';
    import { ref } from 'vue';
    import { showDialog } from '@/features/dialog/@x';

    const { t } = useI18n();
    const createUserStore = useCreateUserStore();

    const emit = defineEmits<{
        (e: 'onCreate', user: User): void;
    }>();

    const user = ref<UserPayload>({
        name: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        password: '',
        roles: ['user'],
    });

    const handleCreate = async () => {
        const newUser = await createUserStore.create(user.value);
        if (!newUser) return;
        emit('onCreate', newUser);
        showDialog('success', 'User created', [
            'You successfully created a new user. You can edit it at anytime.',
        ]);
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
</script>

<template>
    <UserForm
        :is-open="createUserStore.isModalOpen"
        :user="user"
        @handle-submit="handleCreate"
        @close-modal="handleClose"
        v-model="user"
    >
        <template #header>
            <div>
                <h2 class="text-2xl font-bold">{{ t('app.protected_users_page.new_user') }}</h2>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end gap-3">
                <Button size="sm" color="transparent" class="border border-main-border">
                    {{ t('app.protected_users_page.cancel') }}
                </Button>
                <Button
                    type="submit"
                    size="sm"
                    :disabled="user.roles.length <= 0 || createUserStore.loading"
                >
                    {{ t('app.protected_users_page.save') }}
                </Button>
            </div>
        </template>
    </UserForm>
</template>

<!--  -->
