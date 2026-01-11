<script setup lang="ts">
    import type { RentalWithAllDetails } from '@/entities/rental';
    import { Table, type TableColumn } from '@/shared/ui/table';
    import { Icon } from '@iconify/vue';

    defineProps<{
        rows: RentalWithAllDetails[];
        columns: TableColumn<RentalWithAllDetails>[];
        loading: boolean;
    }>();

    const getIcon = (status: 'CONFIRMED' | 'CANCELLED') => {
        if (status === 'CONFIRMED') return 'icon-park-outline:folder-success';
        if (status === 'CANCELLED') return 'material-symbols:chat-error-outline-rounded';

        return 'material-symbols:draft-outline';
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
                    :class="
                        row.status === 'CONFIRMED'
                            ? 'bg-green-400/20 text-green-600'
                            : 'bg-red-400/20 text-red-600'
                    "
                >
                    <!--  -->
                    <Icon :icon="getIcon(row.status)" class="text-xl" />
                    {{ row.status }}
                </span>
            </template>
        </Table>
    </section>
</template>
