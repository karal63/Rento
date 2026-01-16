<script setup lang="ts">
    defineProps<{
        title: string;
    }>();
</script>

<template>
    <section class="flex-between items-center">
        <h1 class="text-2xl font-semibold">{{ title }}</h1>

        <div class="flex items-center gap-3">
            <slot />
        </div>
    </section>
</template>
