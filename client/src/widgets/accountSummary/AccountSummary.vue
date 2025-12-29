<script setup lang="ts">
    import { UserSummary } from '@/entities/user';
</script>

<template>
    <section>
        <UserSummary @edit="console.log($event)" />
    </section>
</template>
