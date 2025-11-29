<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { Button } from '@/shared/ui/button';
    import { Icon } from '@iconify/vue';
    import { onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    const carStore = useCarStore();
    const { t } = useI18n();
    const { params } = useRoute();

    onMounted(async () => {
        if (!carStore.selectedCar) {
            console.log('car doesnt exist, fetching car with id: ' + params.id);
            await carStore.getCarById(params.id as string);
        }
    });
</script>

<template>
    <div>
        <div class="max-w-[1700px] m-auto 0">
            <div class="mt-40 font-extrabold text-8xl">
                <div>{{ carStore.selectedCar?.name }}</div>
            </div>
            <div class="flex mt-20 gap-10">
                <div class="w-[75%]">
                    <img :src="carStore.selectedCar?.image" alt="" class="w-full rounded-md" />
                </div>

                <div
                    class="w-[25%] max-h-max p-7 flex-col gap-8 shadow-md shadow-main-border border border-main-border rounded-md"
                >
                    <div>
                        <h3 class="text-xl mb-2">Your phone</h3>
                        <div class="relative">
                            <input
                                type="tel"
                                class="w-full border border-main-lightgray outline-none pl-5 pr-10 py-3 rounded-md text-lg"
                            />
                            <Icon
                                icon="material-symbols-light:call-outline"
                                class="absolute right-0 top-1/2 transform -translate-1/2 text-3xl"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl mb-2">Choose dates</h3>
                        <div class="relative">
                            <input
                                type="tel"
                                class="w-full border border-main-lightgray outline-none pl-5 pr-10 py-3 rounded-md text-lg"
                            />
                            <Icon
                                icon="formkit:date"
                                class="absolute right-0 top-1/2 transform -translate-1/2 text-3xl"
                            />
                        </div>
                    </div>

                    <Button class="sticky top-24 w-full">
                        {{ t('app.book_btn') }}
                    </Button>

                    <hr class="text-main-lightgray" />

                    <div>
                        <h4 class="text-3xl mb-3 font-semibold">{{ t('app.prices_header') }}</h4>
                        <table class="w-full">
                            <tr v-for="price in carStore.selectedCar?.pricing" :key="price.name">
                                <td
                                    class="border border-collapse border-main-border pl-4 py-2 text-lg"
                                >
                                    {{ t(`app.prices.${price.name}`) }}
                                </td>
                                <td
                                    class="border border-collapse border-main-border pl-4 py-2 text-lg"
                                >
                                    {{ price.price }}zł
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
