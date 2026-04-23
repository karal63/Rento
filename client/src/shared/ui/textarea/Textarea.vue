<script setup lang="ts">
    import { computed } from 'vue';

    const modelValue = defineModel<string | number | null>('modelValue');

    const props = defineProps<{
        size: 'small' | 'medium' | 'large';
        placeholder?: string;
        type?: 'time' | 'date' | 'tel' | 'password' | 'email' | 'search' | 'number';
        isError?: boolean;
        icon?: string;
        disabled?: boolean;
        min?: number;
        max?: number;
        testid?: string;
    }>();

    defineEmits<{
        (e: 'onUpdate'): void;
    }>();

    const getSizeClasses = computed(() => {
        switch (props.size) {
            case 'small':
                return `${props.icon ? 'pl-8' : 'pl-2'} pr-2 py-1 text-sm`;
            case 'medium':
                return `${props.icon ? 'pl-9' : 'pl-3'} pr-3 py-2 text-base`;
            case 'large':
                return `${props.icon ? 'pl-10' : 'pl-4'} px-4 py-3 text-lg`;
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
    <textarea
        v-model="modelValue"
        @input="$emit('onUpdate')"
        :disabled="disabled"
        :placeholder="placeholder"
        class="border rounded-md outline-0 focus:ring-1 transition ring-primary disabled:opacity-50 w-full"
        :class="getClasses"
        :data-testid="testid"
    />
</template>
