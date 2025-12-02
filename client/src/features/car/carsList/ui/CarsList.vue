<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import CarCard from './CarCard.vue';
    import { onMounted, ref } from 'vue';

    const carStore = useCarStore();

    const loading = ref(false);

    onMounted(async () => {
        loading.value = true;
        await carStore.getCars();
        loading.value = false;
    });
</script>

<template>
    <div v-if="loading" class="w-[80%] grid grid-cols-2 gap-8">
        <div v-for="(_, i) in 4" :key="i" class="h-[600px] skeleton rounded-md"></div>
    </div>
    <div v-else class="w-[80%] grid grid-cols-2 gap-8">
        <CarCard v-for="car in carStore.cars" :key="car._id" :car="car" />
    </div>
</template>
