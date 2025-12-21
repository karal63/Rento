<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { computed } from 'vue';

    const props = defineProps<{
        type: 'error' | 'warning' | 'info';
        message: string;
    }>();

    const getBlockClasses = computed(() => {
        if (props.type === 'error') {
            return 'border-red-400 bg-red-500/10';
        } else if (props.type === 'warning') {
            return 'border-yellow-400 bg-yellow-500/10';
        } else if (props.type === 'info') {
            return 'border-blue-400 bg-blue-500/10';
        }

        return '';
    });

    const getIconClasses = computed(() => {
        if (props.type === 'error') {
            return 'text-red-400';
        } else if (props.type === 'warning') {
            return 'text-yellow-400';
        } else if (props.type === 'info') {
            return 'text-blue-400';
        }

        return '';
    });

    const getIcon = computed(() => {
        if (props.type === 'error') {
            return 'ic:sharp-error';
        } else if (props.type === 'warning') {
            return 'mingcute:warning-fill';
        } else if (props.type === 'info') {
            return 'ic:round-info';
        }

        return '';
    });
</script>

<template>
    <div class="border my-5 px-4 py-2 text-lg rounded-md flex-between" :class="getBlockClasses">
        <h2>{{ message }}</h2>
        <Icon :icon="getIcon" class="text-2xl" :class="getIconClasses" />
    </div>
</template>
