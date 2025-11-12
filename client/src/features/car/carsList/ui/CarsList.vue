<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import CarCard from './CarCard.vue';

    const carStore = useCarStore();
</script>

<template>
    <div class="w-[80%] grid grid-cols-2 gap-8">
        <CarCard v-for="car in carStore.cars" :key="car.id" :car="car" />
    </div>
</template>
