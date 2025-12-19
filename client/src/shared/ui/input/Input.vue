<script setup lang="ts">
    import { computed } from 'vue';

    const modelValue = defineModel<string>('modelValue');

    const props = defineProps<{
        size: 'small' | 'medium' | 'large';
        placeholder?: string;
        type?: 'time' | 'date' | 'tel' | 'password' | 'email';
        isError?: boolean;
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

    const getErrorClasses = computed(() => {
        if (props.isError) {
            return 'border-red-500';
        }

        return 'border-main-border';
    });

    const getClasses = computed(() => {
        return `${getSizeClasses.value} ${getErrorClasses.value}`;
    });
</script>

<template>
    <input
        :type="type ? type : 'text'"
        v-model="modelValue"
        :placeholder="placeholder"
        class="border rounded-md outline-0 focus:ring-1 transition ring-primary disabled:opacity-50"
        :class="getClasses"
    />
</template>
