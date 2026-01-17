<script setup lang="ts">
    import type { User } from '@/entities/user';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { deleteUser } from '@/features/deleteUser';
    import { Table, type TableColumn } from '@/shared/ui/table';
    import { Icon } from '@iconify/vue';

    const acceptanceModalStore = useAcceptanceModalStore();

    defineProps<{
        users: User[];
        loading: boolean;
    }>();

    const emit = defineEmits<{
        (e: 'deleteUser', userId: string): void;
    }>();

    const columns: TableColumn<User>[] = [
        {
            key: 'name',
            header: 'Name',
            render: user => user.name,
            width: '15%',
        },
        {
            key: 'authProvider',
            header: 'Auth provider',
            render: user => user.auth_provider,
            width: '10%',
        },
        {
            key: 'email',
            header: 'Email',
            render: user => user.email ?? '-',
            width: '15%',
        },
        {
            key: 'phoneNumber',
            header: 'Phone number',
            render: user => user.phoneNumber ?? '-',
            width: '15%',
        },
        {
            key: 'createdAt',
            header: 'Created At',
            render: user => new Date(user.createdAt).toLocaleString(),
            width: '15%',
        },
        {
            key: 'roles',
            header: 'Roles',
            render: user => user.roles.join(', '),
            width: '10%',
        },
    ];

    const handleDelete = (user: User) => {
        acceptanceModalStore.open({
            title: 'Confirm deletion',
            message: `Are you sure you want to delete ${user.name}?`,
            async onConfirm() {
                await deleteUser(user._id);
                emit('deleteUser', user._id);
            },
        });
    };
</script>

<template>
    <section class="mt-10">
        <Table :rows="users" :columns="columns" :loading="false">
            <template #actions="{ row }">
                <div class="w-[120px] bg-main-bg rounded-md">
                    <button
                        @click="console.log(row._id)"
                        class="px-3 py-2 w-full text-left hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                    >
                        <Icon icon="lucide:edit" class="text-xl" />
                        Edit
                    </button>

                    <button
                        @click="handleDelete(row)"
                        class="px-3 py-2 w-full text-left hover:bg-red-600/10 cursor-pointer flex items-center gap-2 text-red-600 transition rounded-bl-md rounded-br-md"
                    >
                        <Icon icon="material-symbols:delete-outline-rounded" class="text-xl" />
                        Delete
                    </button>
                </div>
            </template>
        </Table>
    </section>
</template>
