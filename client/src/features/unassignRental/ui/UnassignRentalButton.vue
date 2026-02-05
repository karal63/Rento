<script setup lang="ts">
    import type { RentalWithAllDetails } from '@/entities/rental';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal/@';
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useUnassignRentalMutation } from '../model/unassignRentalMutation';
    import { useI18n } from 'vue-i18n';

    const acceptanceModalStore = useAcceptanceModalStore();
    const mutation = useUnassignRentalMutation();
    const { t } = useI18n();

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
            title: t('app.acceptance_modal.confirm_action'),
            message: t('app.employee_page.confirm_unassign_desc'),
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
        {{ t('app.employee_page.unassign') }}
    </Button>
</template>
