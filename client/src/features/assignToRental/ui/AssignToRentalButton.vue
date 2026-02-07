<script setup lang="ts">
    import type { RentalWithAllDetails } from '@/entities/rental';
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';
    import { useAssignToRental } from '../model/useAssignToRental';

    const { t } = useI18n();
    const { assignToRental } = useAssignToRental();

    const props = defineProps<{
        rental: RentalWithAllDetails | null;
    }>();
    const emit = defineEmits<{
        (e: 'closeMenu'): void;
    }>();

    const handleClick = () => {
        if (!props.rental || !props.rental._id) return;
        assignToRental(props.rental._id);
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
        <Icon icon="material-symbols:add-rounded" class="text-xl" />
        {{ t('app.employee_page.pick') }}
    </Button>
</template>
