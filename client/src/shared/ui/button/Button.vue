<script setup lang="ts">
    defineProps<{
        color?: 'red' | 'transparent';
    }>();

    defineEmits<{
        (e: 'click'): void;
    }>();
</script>

<template>
    <button
        @click="$emit('click')"
        class="px-5 h-10 rounded-md transition cursor-pointer tracking-widest"
        :class="
            color === 'transparent'
                ? `bg-${color}-500 hover:bg-main-hover-bg`
                : color
                  ? `bg-${color}-500 hover:bg-${color}-400`
                  : `text-white bg-primary hover:bg-blue-400`
        "
    >
        <slot />
    </button>
</template>
