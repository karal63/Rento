<script setup lang="ts">
    import type { User } from '@/entities/user';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { deleteUser } from '@/features/deleteUser';
    import { useEditUserStore } from '@/features/editUser';
    import { Table, type TableColumn } from '@/shared/ui/table';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const acceptanceModalStore = useAcceptanceModalStore();
    const editUserStore = useEditUserStore();

    defineProps<{
        users: User[];
        loading: boolean;
    }>();

    const columns: TableColumn<User>[] = [
        {
            key: 'name',
            header: t('app.table.name'),
            render: user => user.name,
            width: '15%',
        },
        {
            key: 'authProvider',
            header: t('app.protected_users_page.auth_provider'),
            render: user => user.auth_provider,
            width: '10%',
            minWidth: 120,
        },
        {
            key: 'email',
            header: t('app.protected_users_page.email'),
            render: user => user.email ?? '-',
            width: '15%',
        },
        {
            key: 'phoneNumber',
            header: t('app.protected_users_page.phone_number'),
            render: user => user.phoneNumber ?? '-',
            width: '15%',
        },
        {
            key: 'createdAt',
            header: t('app.table.created_at'),
            render: user => new Date(user.createdAt).toLocaleString(),
            width: '15%',
        },
        {
            key: 'roles',
            header: t('app.protected_users_page.roles'),
            render: user => user.roles.join(', '),
            width: '5%',
            minWidth: 80,
        },
    ];

    const handleDelete = (user: User) => {
        acceptanceModalStore.open({
            title: t('app.acceptance_modal.deletion_title'),
            message: `${t('app.acceptance_modal.deletion_desc')} ${user.name}?`,
            async onConfirm() {
                await deleteUser(user._id);
            },
        });
    };

    const handleEdit = (user: User) => {
        editUserStore.open(user);
    };
</script>

<template>
    <section class="mt-10 overflow-x-scroll">
        <Table :rows="users" :columns="columns" :loading="false">
            <template #actions="{ row }">
                <div class="w-[120px] bg-main-bg rounded-md">
                    <button
                        @click="handleEdit(row)"
                        class="px-3 py-2 w-full text-left hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                    >
                        <Icon icon="lucide:edit" class="text-xl" />
                        {{ t('app.protected_users_page.edit') }}
                    </button>

                    <button
                        @click="handleDelete(row)"
                        class="px-3 py-2 w-full text-left hover:bg-red-600/10 cursor-pointer flex items-center gap-2 text-red-600 transition rounded-bl-md rounded-br-md"
                    >
                        <Icon icon="material-symbols:delete-outline-rounded" class="text-xl" />
                        {{ t('app.protected_users_page.delete') }}
                    </button>
                </div>
            </template>
        </Table>
    </section>
</template>
