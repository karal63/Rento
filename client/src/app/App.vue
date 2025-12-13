<script setup lang="ts">
    import { refreshTokens } from '@/features/auth/refresh';
    import { Footer, Navbar, Sidebar } from '@/widgets';
    import { onMounted } from 'vue';

    onMounted(async () => {
        await refreshTokens();
    });
</script>

<template>
    <Navbar />
    <RouterView />
    <Footer />

    <Sidebar />
</template>
