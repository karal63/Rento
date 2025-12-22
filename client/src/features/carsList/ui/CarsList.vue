<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import CarCard from './CarCard.vue';
    import { ref, watch } from 'vue';
    import Pagination from '../pagination/ui/Pagination.vue';
    import { useRouter } from 'vue-router';
    import { CheckboxSelect, Input } from '@/shared/ui';
    import { Button } from '@/shared/ui/button';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';

    const carStore = useCarStore();
    const router = useRouter();
    const { t } = useI18n();

    const loading = ref(false);
    const pages = ref(1);
    const currentPage = ref(1);
    const brands = ref<string[]>([]);

    // input
    const selectedBrands = ref<string[]>([]);
    const searchInput = ref('');

    const getCars = async () => {
        loading.value = true;

        const { pagesAmount: newPagesAmount, allBrands } = await carStore.getCars(
            currentPage.value,
            selectedBrands.value,
            searchInput.value
        );
        pages.value = newPagesAmount;
        brands.value = allBrands;
        router.push(`/cars?page=${currentPage.value}`);
        loading.value = false;
    };

    const manualGetCars = async () => {
        currentPage.value = 1;
        await getCars();
    };

    const addBrand = (brand: string) => {
        selectedBrands.value.push(brand);
    };

    const removeBrands = (brand: string) => {
        selectedBrands.value = selectedBrands.value.filter(b => b !== brand);
        manualGetCars();
    };

    watch(currentPage, async () => getCars(), { immediate: true });
</script>

<template>
    <div class="xl:flex xl:flex-row gap-8">
        <div
            class="w-full mb-10 xl:mb-0 xl:w-[20%] xl:sticky xl:top-24 border rounded-md border-main-border max-h-max p-5"
        >
            <h1 class="text-3xl font-semibold mb-4">{{ t('app.filters') }}</h1>

            <h2 class="text-main-gray mb-1">{{ t('app.search') }}</h2>
            <Input
                v-model="searchInput"
                :placeholder="t('app.search') + '...'"
                size="large"
                class="w-full"
            />

            <div>
                <h2 class="text-main-gray mt-6 mb-1">{{ t('app.brand') }}</h2>
                <CheckboxSelect
                    @addBrand="addBrand($event)"
                    :items="brands"
                    :selectedCount="selectedBrands.length"
                />

                <ul class="mt-2 flex-col gap-2">
                    <li
                        v-for="brand in selectedBrands"
                        :key="brand"
                        class="bg-main-border px-2 py-1 rounded-md max-w-max flex-center"
                    >
                        <span>{{ brand }}</span>
                        <button @click="removeBrands(brand)">
                            <Icon icon="mdi:close" class="w-4 h-4 ml-2 cursor-pointer" />
                        </button>
                    </li>
                </ul>
            </div>

            <div class="mt-10">
                <Button @click="manualGetCars" class="w-full flex-center">
                    <span>{{ t('app.browse_results') }}</span>
                    <Icon icon="mdi:magnify" class="w-5 h-5 ml-2" />
                </Button>
            </div>
        </div>
        <div v-if="loading" class="w-full lg:w-[80%] grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div v-for="(_, i) in 4" :key="i" class="h-[600px] skeleton rounded-md"></div>
        </div>
        <div v-else class="w-full xl:w-[80%]">
            <div class="grid grid-col-1 lg:grid-cols-2 gap-8">
                <CarCard v-for="car in carStore.cars" :key="car._id" :car="car" />
            </div>
            <Pagination v-model="currentPage" :total="pages" />
        </div>
    </div>
</template>
