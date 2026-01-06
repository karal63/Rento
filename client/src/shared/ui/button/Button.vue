<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        color?: 'red' | 'transparent' | 'gray';
        size?: 'sm' | 'md';
    }>();

    defineEmits<{
        (e: 'click'): void;
    }>();

    const sizeClasses = {
        sm: 'px-5 h-10 text-md',
        md: 'px-7 h-14 text-lg',
        // lg: 'px-6 py-3 text-lg',
    };

    const colorClasses = computed(() => {
        if (props.color === 'transparent') {
            return 'bg-transparent hover:bg-main-hover-bg';
        } else if (props.color === 'red') {
            return `bg-red-500 hover:bg-red-600 text-white`;
        } else if (props.color === 'gray') {
            return `bg-main-gray-bg hover:bg-transparent transition`;
        } else {
            return 'text-white bg-primary hover:bg-blue-400 text-white';
        }
    });

    const buttonClass = computed(() => {
        const sizeClass = (props.size && sizeClasses[props.size]) || sizeClasses.md;

        return `${colorClasses.value} ${sizeClass} px-5 h-10 rounded-md transition cursor-pointer tracking-widest`;
    });
</script>

<template>
    <button
        @click="$emit('click')"
        class="uppercase disabled:opacity-50 disabled:cursor-default"
        :class="buttonClass"
    >
        <slot />
    </button>
</template>
