<script setup lang="ts">
    import FeetbackProvider from './providers/FeetbackProvider.vue';
    import ModalProvider from './providers/ModalProvider.vue';
</script>

<template>
    <RouterView />
    <ModalProvider />
    <FeetbackProvider />
</template>
