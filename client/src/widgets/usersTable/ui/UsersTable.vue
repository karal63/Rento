<script setup lang="ts">
    import { RoleBlock, type User } from '@/entities/user';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { useDeleteUser } from '@/features/deleteUser';
    import { useEditUserStore } from '@/features/editUser';
    import { normalizeDate } from '@/shared/lib/date';
    import { Pagination } from '@/shared/ui';
    import { Table, type TableColumn } from '@/shared/ui/table';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const acceptanceModalStore = useAcceptanceModalStore();
    const editUserStore = useEditUserStore();
    const { deleteUser } = useDeleteUser();

    const page = defineModel<number>({ required: true });

    defineProps<{
        users: User[];
        loading: boolean;
        totalPages: number;
    }>();

    const columns: TableColumn<User>[] = [
        {
            key: 'name',
            header: t('app.table.name'),
            render: user => `${user.name} ${user.secondName ?? ''}`,
            width: '15%',
        },
        {
            key: 'roles',
            header: t('app.protected_users_page.roles'),
            render: user => user.roles.join(', '),
            width: '15%',
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
            render: user => normalizeDate(user.createdAt),
            width: '15%',
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
    <section class="mt-10">
        <div class="overflow-x-scroll">
            <Table :rows="users" :columns="columns" :loading="false" class="overflow-x-scroll">
                <template #actions="{ row }">
                    <div class="w-[120px] rounded-md">
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

                <template #cell-roles="{ row }">
                    <RoleBlock :role="row.roles[0]" />
                </template>
            </Table>
        </div>

        <Pagination v-model="page" :total="totalPages" />
    </section>
</template>
