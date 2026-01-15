<script setup lang="ts">
    import { useUsersQuery } from '@/entities/user';
    import { UsersTable } from '@/widgets/usersTable';

    const { users, loading } = useUsersQuery();
</script>

<template>
    <UsersTable :users="users" :loading="loading" />
</template>
