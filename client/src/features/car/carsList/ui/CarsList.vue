<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import CarCard from './CarCard.vue';
    import { ref, watch } from 'vue';
    import Pagination from '../pagination/ui/Pagination.vue';
    import { useRouter } from 'vue-router';
    import { CheckboxSelect, Input } from '@/shared/ui';
    import { Button } from '@/shared/ui/button';
    import { Icon } from '@iconify/vue';

    const carStore = useCarStore();
    const router = useRouter();

    const loading = ref(false);
    const pages = ref(1);
    const currentPage = ref(1);
    const brands = ref<string[]>([]);
    const search = ref('');

    const getCars = async () => {
        loading.value = true;
        const { pagesAmount: newPagesAmount } = await carStore.getCars(
            currentPage.value,
            brands.value,
            search.value
        );
        pages.value = newPagesAmount;
        router.push(`/cars?page=${currentPage.value}`);
        loading.value = false;
    };

    const addBrand = (brand: string) => {
        brands.value.push(brand);
    };

    watch(currentPage, async () => getCars(), { immediate: true });
</script>

<template>
    <div class="flex gap-8">
        <div class="w-[20%] border rounded-md border-main-border max-h-max p-5">
            <h1 class="text-3xl font-semibold mb-4">Filters</h1>

            <h2 class="text-main-gray mb-1">Search</h2>
            <Input v-model="search" placeholder="Search..." size="large" class="w-full" />

            <div>
                <h2 class="text-main-gray mt-6 mb-1">Brand</h2>
                <CheckboxSelect @addBrand="addBrand($event)" />
            </div>

            <div class="mt-10">
                <Button @click="getCars" class="w-full flex-center">
                    <span>BROWSE RESULT</span>
                    <Icon icon="mdi:magnify" class="w-5 h-5 ml-2" />
                </Button>
            </div>
        </div>
        <div v-if="loading" class="w-[80%] grid grid-cols-2 gap-8">
            <div v-for="(_, i) in 4" :key="i" class="h-[600px] skeleton rounded-md"></div>
        </div>
        <div v-else class="w-[80%]">
            <div class="grid grid-cols-2 gap-8">
                <CarCard v-for="car in carStore.cars" :key="car._id" :car="car" />
            </div>
            <Pagination v-model="currentPage" :total="pages" />
        </div>
    </div>
</template>
