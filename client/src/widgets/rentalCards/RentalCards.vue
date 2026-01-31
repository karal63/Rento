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
    <section>
        <ul class="flex-col gap-3">
            <Card v-for="row in rows" :key="row._id" :rental="row" />
        </ul>
    </section>

    <Pagination v-model="page" :total="pages" />
</template>
