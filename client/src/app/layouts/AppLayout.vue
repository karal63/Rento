<script setup lang="ts">
    import { Footer, Navbar, Sidebar } from '@/widgets';
</script>

<template>
    <Navbar />
    <RouterView />
    <Footer />

    <Sidebar />
</template>
