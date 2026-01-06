<script setup lang="ts">
    defineProps<{
        text: string;
    }>();
</script>

<template>
    <div class="relative group inline-flex">
        <!-- icon -->
        <slot />

        <div
            class="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-opposite-theme text-pure-theme px-2 py-1 text-xs group-hover:block z-20"
        >
            {{ text }}
        </div>
    </div>
</template>
