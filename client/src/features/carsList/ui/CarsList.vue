<script setup lang="ts">
    import { useAllCarsQuery } from '@/entities/car';
    import CarCard from './CarCard.vue';
    import { computed, ref } from 'vue';
    import { Pagination } from '@/shared/ui';

    import CarsFilter from './CarsFilter.vue';

    const page = ref(1);
    const selectedBrands = ref<string[]>([]);
    const searchInput = ref('');

    const addBrand = (brand: string) => {
        console.log(321);

        selectedBrands.value.push(brand);
    };

    const removeBrands = (brand: string) => {
        selectedBrands.value = selectedBrands.value.filter(b => b !== brand);
    };

    const getCarsParams = computed(() => ({
        page: 1,
        brands: selectedBrands.value,
        search: searchInput.value,
    }));
    const { data, isLoading } = useAllCarsQuery(getCarsParams);
</script>

<template>
    <div class="xl:flex xl:flex-row gap-8">
        <CarsFilter
            v-model="searchInput"
            @addBrand="addBrand"
            @removeBrand="removeBrands"
            :allBrands="data?.allBrands ?? []"
            :selectedBrands="selectedBrands"
        />

        <div v-if="isLoading" class="w-full lg:w-[80%] grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div v-for="(_, i) in 4" :key="i" class="h-[600px] skeleton rounded-md"></div>
        </div>
        <div v-else class="w-full xl:w-[80%]">
            <div class="grid grid-col-1 md:grid-cols-2 gap-8">
                <CarCard v-for="car in data?.cars" :key="car._id" :car="car" />
            </div>
            <Pagination v-model="page" :total="data?.pagesAmount ?? 1" />
        </div>
    </div>
</template>
