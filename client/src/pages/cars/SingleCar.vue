<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { useThemeStore } from '@/shared/model';
    import { Button } from '@/shared/ui/button';
    import { VueDatePicker } from '@vuepic/vue-datepicker';
    import { onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    const carStore = useCarStore();
    const themeStore = useThemeStore();
    const { t } = useI18n();
    const { params } = useRoute();

    const loading = ref(false);
    const dateRange = ref<[Date | null, Date | null]>([null!, null!]);
    const phone = ref('');

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
        <div class="max-w-[1700px] m-auto 0">
            <div class="mt-40 font-extrabold text-8xl">
                <div v-if="loading" class="skeleton h-[100px] w-2/3"></div>
                <div v-else>{{ carStore.selectedCar?.name }}</div>
            </div>
            <div class="flex xl:flex-row mt-20 gap-10">
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
                    class="w-full xl:w-1/4 p-7 flex flex-col border border-main-border rounded-2xl sticky top-24 h-max"
                >
                    <!-- Phone Number Input -->
                    <div class="mb-5">
                        <h3 class="text-xl mb-3 font-semibold">Your Phone</h3>
                        <vue-tel-input
                            v-model="phone"
                            mode="international"
                            :input-options="{ placeholder: 'Enter phone number' }"
                            class="outline-0 border-0 border-main-border px-4 py-2 w-full text-lg"
                        />
                    </div>

                    <!-- Date Picker -->
                    <div class="mb-10">
                        <h3 class="text-xl mb-3 font-semibold">Choose Dates</h3>
                        <VueDatePicker
                            v-model="dateRange"
                            range
                            text-input
                            :enable-time-picker="false"
                            placeholder="Select rental dates"
                            :dark="themeStore.isDark"
                            :ui="{
                                input: 'py-10 px-5 rounded-xl bg-main-bg border border-main-lightgray text-lg w-full',
                                menu: 'rounded-xl shadow-lg',
                                calendar: 'p-3',
                            }"
                        />
                    </div>

                    <!-- Book Button -->
                    <Button class="font-semibold mb-10">
                        {{ t('app.book_btn') }}
                    </Button>

                    <!-- Pricing Table -->
                    <hr class="text-main-lightgray" />
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
                                    {{ price.price }} zł
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
