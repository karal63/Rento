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
        class="px-5 h-10 rounded-md transition cursor-pointer"
        :class="
            color === 'transparent'
                ? `bg-${color}-500 hover:bg-mainHoverDarkBg`
                : color
                  ? `bg-${color}-500 hover:bg-${color}-400`
                  : `bg-blue-500 hover:bg-blue-400`
        "
    >
        <slot />
    </button>
</template>
