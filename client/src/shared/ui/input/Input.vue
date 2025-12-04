<script setup lang="ts">
    import { computed } from 'vue';

    const modelValue = defineModel<string>('modelValue');

    const props = defineProps<{
        size: 'small' | 'medium' | 'large';
        placeholder?: string;
    }>();

    const getSizeClasses = computed(() => {
        switch (props.size) {
            case 'small':
                return 'px-2 py-1 text-sm';
            case 'medium':
                return 'px-3 py-2 text-base';
            case 'large':
                return 'px-4 py-3 text-lg';
            default:
                return '';
        }
    });
</script>

<template>
    <input
        type="text"
        v-model="modelValue"
        :placeholder="placeholder"
        class="border border-main-border rounded-md outline-0 focus:ring-1 transition ring-primary"
        :class="getSizeClasses"
    />
</template>
