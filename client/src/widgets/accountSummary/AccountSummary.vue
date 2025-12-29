<script setup lang="ts">
    import { UserSummary } from '@/entities/user';
    import { EditAccountModal, useEditAccountStore } from '@/features/editAccount';

    const editAccountStore = useEditAccountStore();
</script>

<template>
    <section>
        <UserSummary @edit="editAccountStore.open" />
        <EditAccountModal />
    </section>
</template>
