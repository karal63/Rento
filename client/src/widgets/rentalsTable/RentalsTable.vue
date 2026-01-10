<script setup lang="ts">
    import type { RentalWithAllDetails } from '@/entities/rental';
    import { Table } from '@/shared/ui';
    import type { TableColumn } from '@/shared/ui/table';

    defineProps<{
        rows: RentalWithAllDetails[];
        columns: TableColumn<RentalWithAllDetails>[];
        loading: boolean;
    }>();
</script>

<template>
    <section class="mt-10">
        <Table :rows="rows" :columns="columns" :loading="loading">
            <template v-if="$slots.actions" #actions="slotProps">
                <slot name="actions" v-bind="slotProps" />
            </template>
        </Table>
    </section>
</template>
