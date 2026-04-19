<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import CarItem from './CarItem.vue';
    import { Pagination } from '@/shared/ui';

    const page = defineModel<number>({ required: true });

    defineProps<{
        cars: Car[];
        loading: boolean;
        totalPages: number;
    }>();
</script>

<template>
    <section class="mt-10">
        <div v-if="!loading">
            <ul class="flex-col gap-3 md:gap-5" data-testid="admin-cars-list">
                <CarItem v-for="car in cars" :key="car._id" :car="car">
                    <template #actions="{ car }">
                        <slot name="actions" v-bind="{ car }" />
                    </template>
                </CarItem>
            </ul>

            <Pagination v-model="page" :total="totalPages" />
        </div>

        <ul v-else class="flex-col gap-3 md:gap-5">
            <li
                v-for="(_, i) in 5"
                :key="i"
                class="skeleton h-[137px] md:h-[162px] bg-black rounded-md"
            ></li>
        </ul>
    </section>
</template>
