<script setup lang="ts">
    import { useUsersQuery } from '@/entities/user';
    import { useFilterUsers } from '@/features/filterUsers';
    import { useSortUsers } from '@/features/sortUsers';
    import { Button } from '@/shared/ui';
    import { ProtectedHeader, UsersFilter } from '@/widgets';
    import { UsersTable } from '@/widgets/usersTable';
    import { Icon } from '@iconify/vue';
    import { computed } from 'vue';

    const filters = useFilterUsers();
    const sorting = useSortUsers();

    const queryParams = computed(() => ({
        ...filters,
        ...sorting,
    }));

    const { users, loading } = useUsersQuery(queryParams);

    function onUserDeleted(userId: string) {
        users.value = users.value.filter(user => user._id !== userId);
    }
</script>

<template>
    <ProtectedHeader title="All rentals">
        <Button size="sm" class="flex items-center gap-3">
            <Icon icon="material-symbols:add-rounded" class="text-xl" />
            New User
        </Button>
    </ProtectedHeader>

    <UsersFilter
        @set-search="filters.search = $event"
        @set-sort="sorting.sort = $event"
        :search="filters.search"
        :sort="sorting.sort"
    />

    <UsersTable :users="users" :loading="loading" @deleteUser="onUserDeleted($event)" />
</template>
