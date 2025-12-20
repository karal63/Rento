<script setup lang="ts">
    import { BookingSummary } from '@/widgets';
</script>

<template>
    <div>
        <main class="max-w-[1000px] m-auto 0 px-5 mt-32 lg:flex gap-10">
            <BookingSummary />
            <router-view />
        </main>
    </div>
</template>
