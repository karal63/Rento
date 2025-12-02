<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import CarCard from './CarCard.vue';
    import { ref, watch } from 'vue';
    import Pagination from '../pagination/ui/Pagination.vue';

    const carStore = useCarStore();

    const loading = ref(false);
    const pages = ref(1);
    const currentPage = ref(1);

    watch(
        currentPage,
        async newPage => {
            loading.value = true;
            const { pagesAmount: newPagesAmount } = await carStore.getCars(newPage);
            pages.value = newPagesAmount;
            loading.value = false;
        },
        { immediate: true }
    );
</script>

<template>
    <div v-if="loading" class="w-[80%] grid grid-cols-2 gap-8">
        <div v-for="(_, i) in 4" :key="i" class="h-[600px] skeleton rounded-md"></div>
    </div>
    <div v-else class="w-[80%]">
        <div class="grid grid-cols-2 gap-8">
            <CarCard v-for="car in carStore.cars" :key="car._id" :car="car" />
        </div>
        <Pagination v-model="currentPage" :total="pages" />
    </div>
</template>
