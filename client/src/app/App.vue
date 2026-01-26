<script setup lang="ts">
    import FeetbackProvider from './providers/FeetbackProvider.vue';
    import ModalProvider from './providers/ModalProvider.vue';
    import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
    <RouterView />
    <ModalProvider />
    <FeetbackProvider />

    <VueQueryDevtools />
</template>
