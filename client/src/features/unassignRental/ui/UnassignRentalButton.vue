<script setup lang="ts">
    import type { RentalWithAllDetails } from '@/entities/rental';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal/@';
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useUnassignRentalMutation } from '../model/unassignRentalMutation';

    const acceptanceModalStore = useAcceptanceModalStore();
    const mutation = useUnassignRentalMutation();

    const props = defineProps<{
        rental: RentalWithAllDetails | null;
    }>();
    const emit = defineEmits<{
        (e: 'closeMenu'): void;
    }>();

    const handleClick = () => {
        if (!props.rental || !props.rental._id) return;
        const rentalId = props.rental._id;

        acceptanceModalStore.open({
            title: 'Confirm action',
            message: 'Are you sure you want to unassign yourself from this rental?',
            onConfirm: () => {
                mutation.mutate({ rentalId });
                emit('closeMenu');
            },
        });
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
        <Icon icon="ep:remove-filled" class="text-xl" />
        Unassign
    </Button>
</template>
