<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { Button } from '@/shared/ui/button';
    import { onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    const carStore = useCarStore();
    const { t } = useI18n();
    const { params } = useRoute();

    const loading = ref(false);

    onMounted(async () => {
        if (!carStore.selectedCar) {
            loading.value = true;
            await carStore.getCarById(params.id as string);
            loading.value = false;
        }
    });
</script>

<template>
    <div>
        <div class="max-w-[1700px] m-auto 0 px-5">
            <div class="mt-24 sm:mt-32 xl:mt-40 font-extrabold text-4xl md:text-6xl lg:text-8xl">
                <div v-if="loading" class="skeleton h-[100px] w-2/3"></div>
                <div v-else>{{ carStore.selectedCar?.name }}</div>
            </div>
            <div class="xl:flex xl:flex-row mt-5 md:mt-16 xl:mt-20 gap-10">
                <!-- Car Image Section -->
                <div class="w-full xl:w-3/4">
                    <div v-if="loading" class="w-full h-[420px] skeleton rounded-xl"></div>
                    <img
                        v-else
                        :src="carStore.selectedCar?.image"
                        alt="Selected car"
                        class="w-full rounded-xl shadow-md"
                    />
                </div>

                <!-- Booking Card -->
                <div
                    class="w-full xl:w-1/4 flex flex-col rounded-2xl sticky top-24 h-max mt-10 xl:mt-0"
                >
                    <!-- Cars details highlighted -->
                    <div class="mb-5 space-y-4 divide-y divide-main-border">
                        <h3 class="flex items-end justify-between">
                            <span class="text-lg font-semibold">{{ t('app.acceleration') }}</span>
                            <span class="text-primary text-2xl">
                                {{ carStore.selectedCar?.details.acceleration }}
                            </span>
                        </h3>
                        <h3 class="flex items-end justify-between">
                            <span class="text-lg font-semibold">{{ t('app.power') }}</span>
                            <span class="text-primary text-2xl">
                                {{ carStore.selectedCar?.details.power }}
                            </span>
                        </h3>
                        <h3 class="flex items-end justify-between">
                            <span class="text-lg font-semibold">{{ t('app.transmission') }}</span>
                            <span class="text-primary text-2xl">
                                {{ carStore.selectedCar?.details.transmission }}
                            </span>
                        </h3>
                        <h3 class="flex items-end justify-between">
                            <span class="text-lg font-semibold">
                                {{ t('app.number_of_seats') }}
                            </span>
                            <span class="text-primary text-2xl">
                                {{ carStore.selectedCar?.details.numberOfSeats }}
                            </span>
                        </h3>
                    </div>

                    <!-- Book Button -->
                    <Button class="font-semibold mb-10">
                        <RouterLink
                            :to="`/book/${carStore.selectedCar?._id}`"
                            class="w-full h-full flex items-center justify-center"
                        >
                            {{ t('app.book_btn') }}
                        </RouterLink>
                    </Button>

                    <!-- Pricing Table -->
                    <hr class="text-main-lightgray mb-4" />
                    <div>
                        <h4 class="text-3xl mb-4 font-semibold">{{ t('app.prices_header') }}</h4>
                        <table class="w-full border-collapse overflow-hidden rounded-xl">
                            <tr
                                v-for="price in carStore.selectedCar?.pricing"
                                :key="price.name"
                                class="even:bg-main-gray-bg"
                            >
                                <td class="border border-main-border px-4 py-2 text-lg">
                                    {{ t(`app.prices.${price.name}`) }}
                                </td>
                                <td class="border border-main-border px-4 py-2 text-lg font-medium">
                                    {{ price.price }} {{ t('app.zl') }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
