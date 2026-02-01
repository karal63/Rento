<script setup lang="ts">
    import type { RentalWithAllDetails } from '@/entities/rental';
    import { Pagination } from '@/shared/ui';
    import Card from './Card.vue';

    const page = defineModel<number>({ required: true });

    defineProps<{
        rows: RentalWithAllDetails[];
        loading: boolean;
        pages: number;
    }>();
</script>

<template>
    <section class="mt-5">
        <ul class="flex-col gap-3">
            <Card v-for="row in rows" :key="row._id" :rental="row">
                <template #actions="{ rental }">
                    <slot name="actions" v-bind="{ rental }" />
                </template>
            </Card>
        </ul>
    </section>

    <Pagination v-model="page" :total="pages" />
</template>
