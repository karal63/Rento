<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import CarItem from './CarItem.vue';

    defineProps<{
        cars: Car[];
        loading: boolean;
    }>();
</script>

<template>
    <section class="mt-10">
        <ul v-if="!loading" class="flex-col gap-3 md:gap-5">
            <CarItem v-for="car in cars" :key="car._id" :car="car">
                <template #actions="{ car }">
                    <slot name="actions" v-bind="{ car }" />
                </template>
            </CarItem>
        </ul>

        <ul v-else class="flex-col gap-3 md:gap-5">
            <li
                v-for="(_, i) in 5"
                :key="i"
                class="skeleton h-[137px] md:h-[162px] bg-black rounded-md"
            ></li>
        </ul>
    </section>
</template>
