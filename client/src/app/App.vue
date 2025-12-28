<script setup lang="ts">
    import { Footer, Navbar, Sidebar } from '@/widgets';
    import ModalProvider from './providers/ModalProvider.vue';
</script>

<template>
    <Navbar />
    <RouterView />
    <Footer />

    <Sidebar />

    <ModalProvider />
</template>
