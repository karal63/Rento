<script setup lang="ts">
    import { RENTAL_STATUS, type RentalStatus, type RentalWithAllDetails } from '@/entities/rental';
    import { Table, type TableColumn } from '@/shared/ui/table';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    defineProps<{
        rows: RentalWithAllDetails[];
        columns: TableColumn<RentalWithAllDetails>[];
        loading: boolean;
    }>();

    const getIcon = (status: RentalStatus | '') => {
        if (status === RENTAL_STATUS.Active)
            return 'grommet-icons:time'; //fontisto:checkbox-active
        else if (status === RENTAL_STATUS.Cancelled) return 'material-symbols:chat-error-outline';
        else if (status === RENTAL_STATUS.Pending) return 'wi:time-7';
        else if (status === RENTAL_STATUS.Completed) return 'material-symbols:draft-outline';

        return 'material-symbols:draft-outline';
    };

    const getClasses = (status: RentalStatus | '') => {
        if (status === RENTAL_STATUS.Active) {
            return 'bg-green-400/20 text-green-600';
        } else if (status === RENTAL_STATUS.Cancelled) {
            return 'bg-red-400/20 text-red-600';
        } else if (status === RENTAL_STATUS.Pending) {
            return 'bg-yellow-400/20 text-yellow-600';
        } else if (status === RENTAL_STATUS.Completed) {
            return 'bg-main-gray-bg text-opposite-theme/20';
        }

        return 'bg-main-gray-bg text-pure-theme/50';
    };
</script>

<template>
    <section class="mt-10">
        <Table :rows="rows" :columns="columns" :loading="loading">
            <template v-if="$slots.actions" #actions="slotProps">
                <slot name="actions" v-bind="slotProps" />
            </template>

            <template #cell-status="{ row }">
                <span
                    class="font-semibold px-2 py-1 rounded-md flex items-center max-w-max gap-2"
                    :class="getClasses(row.status)"
                >
                    <Icon :icon="getIcon(row.status)" class="text-xl" />
                    {{ t(`app.status.${row.status}`) }}
                </span>
            </template>
        </Table>
    </section>
</template>
