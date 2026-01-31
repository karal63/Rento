<script setup lang="ts">
    import { computed } from 'vue';
    import { RENTAL_STATUS, type RentalStatus } from '../model/rental.types';
    import { Icon } from '@iconify/vue';

    const props = defineProps<{
        status: RentalStatus;
    }>();

    const getIcon = computed(() => {
        if (props.status === RENTAL_STATUS.Active)
            return 'grommet-icons:time'; //fontisto:checkbox-active
        else if (props.status === RENTAL_STATUS.Cancelled)
            return 'material-symbols:chat-error-outline';
        else if (props.status === RENTAL_STATUS.Pending) return 'wi:time-7';
        else if (props.status === RENTAL_STATUS.Completed) return 'material-symbols:draft-outline';

        return 'lets-icons:filter-big';
    });

    const getClasses = computed(() => {
        if (props.status === RENTAL_STATUS.Active) {
            return 'bg-green-400/20 text-green-600 hover:bg-green-400/30 transition-all font-semibold';
        } else if (props.status === RENTAL_STATUS.Cancelled) {
            return 'bg-red-400/20 text-red-600 hover:bg-red-400/30 transition-all font-semibold';
        } else if (props.status === RENTAL_STATUS.Pending) {
            return 'bg-yellow-400/20 text-yellow-600 hover:bg-yellow-400/30 transition-all font-semibold';
        } else if (props.status === RENTAL_STATUS.Completed) {
            return 'bg-main-gray-bg text-opposite-theme/20 hover:bg-gray-400/30 transition-all font-semibold';
        }

        return 'bg-transparent border border-main-border hover:bg-gray-400/30 transition-all';
    });
</script>

<template>
    <div class="flex items-center gap-2 max-w-max px-3 py-1 rounded-md" :class="getClasses">
        <Icon :icon="getIcon" class="text-xl" />
        <slot />
    </div>
</template>
