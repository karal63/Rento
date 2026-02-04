<script setup lang="ts">
    import type { RentalWithAllDetails } from '@/entities/rental';
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useChangeStatusModalStore } from '../model/changeStatusModalStore';

    const changeStatusModalStore = useChangeStatusModalStore();

    const props = defineProps<{
        rental: RentalWithAllDetails | null;
    }>();
    const emit = defineEmits<{
        (e: 'closeMenu'): void;
    }>();

    const handleClick = () => {
        if (!props.rental || !props.rental._id) return;
        changeStatusModalStore.open(props.rental);
        emit('closeMenu');
    };
</script>

<template>
    <Button
        @click="handleClick"
        size="sm"
        color="transparent"
        disable-uppercase
        class="flex justify-start items-center gap-3 w-full"
    >
        <Icon icon="ic:round-edit" class="text-xl" />
        Change status
    </Button>
</template>
