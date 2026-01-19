<script setup lang="ts">
    import { useUsersQuery, type User } from '@/entities/user';
    import { EditUserModal } from '@/features/editUser';
    import { useFilterUsers } from '@/features/filterUsers';
    import { useSortUsers } from '@/features/sortUsers';
    import { Button, type Breadcrumb } from '@/shared/ui';
    import { ProtectedHeader, UsersFilter } from '@/widgets';
    import { UsersTable } from '@/widgets/usersTable';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const filters = useFilterUsers();
    const sorting = useSortUsers();

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: t('app.protected_users_page.users'),
        },
    ];

    const queryParams = computed(() => ({
        ...filters,
        ...sorting,
    }));

    const { users, loading } = useUsersQuery(queryParams);

    function onUserDeleted(userId: string) {
        users.value = users.value.filter(user => user._id !== userId);
    }

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });

    const onEdit = (user: User | undefined) => {
        if (!user) return;
        users.value = users.value.map(u => {
            if (u._id === user._id) {
                return user;
            }

            return u;
        });
    };
</script>

<template>
    <ProtectedHeader :title="t('app.protected_users_page.all_users')">
        <Button size="sm" class="flex items-center gap-3">
            <Icon icon="material-symbols:add-rounded" class="text-xl" />
            {{ t('app.protected_users_page.new_user') }}
        </Button>
    </ProtectedHeader>

    <UsersFilter
        @set-search="filters.search = $event"
        @set-sort="sorting.sort = $event"
        :search="filters.search"
        :sort="sorting.sort"
    />

    <UsersTable :users="users" :loading="loading" @deleteUser="onUserDeleted($event)" />

    <EditUserModal @onEdit="onEdit($event)" />
</template>
