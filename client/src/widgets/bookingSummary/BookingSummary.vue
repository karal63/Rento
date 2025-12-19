<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { useBookingStore } from '@/features/booking';
    import { ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    const carStore = useCarStore();
    const bookingStore = useBookingStore();
    const { t } = useI18n();

    const pricePerDay = ref<number>(0);

    watch(
        [() => bookingStore.daysCount],
        ([daysCount]) => {
            if (daysCount === 1) {
                pricePerDay.value = carStore.selectedCar?.pricing[0]?.price ?? 0;
            } else if (daysCount === 2 || daysCount === 3) {
                pricePerDay.value = carStore.selectedCar?.pricing[1]?.price ?? 0;
            } else if (daysCount >= 4 && daysCount <= 6) {
                pricePerDay.value = carStore.selectedCar?.pricing[2]?.price ?? 0;
            } else if (daysCount >= 7 && daysCount <= 13) {
                pricePerDay.value = carStore.selectedCar?.pricing[3]?.price ?? 0;
            } else if (daysCount >= 14 && daysCount <= 29) {
                pricePerDay.value = carStore.selectedCar?.pricing[4]?.price ?? 0;
            } else if (daysCount === 30) {
                pricePerDay.value = carStore.selectedCar?.pricing[5]?.price ?? 0;
            }
        },
        { immediate: true }
    );
</script>

<template>
    <div class="lg:w-1/3 bg-main-gray-bg shadow-lg rounded-2xl p-6 mb-10">
        <!-- Image + name -->
        <div class="flex flex-col md:flex-row gap-6">
            <img
                :src="carStore.selectedCar?.image"
                :alt="carStore.selectedCar?.name"
                class="w-full md:w-72 h-48 object-cover rounded-xl"
            />

            <div class="flex flex-col justify-between w-full">
                <div>
                    <h2 class="text-2xl font-semibold">
                        {{ carStore.selectedCar?.name }}
                    </h2>
                </div>

                <!-- Pricing -->
                <div class="mt-4">
                    <p class="text-lg font-semibold">
                        {{ pricePerDay }}{{ t('app.zl') }}/{{ t('app.day') }}
                    </p>
                    <p class="text-main-gray text-sm mt-1">
                        {{ t('app.total_for') }} {{ bookingStore.daysCount }}
                        {{ bookingStore.daysCount === 1 ? t('app.day') : t('app.days') }}:
                        <span class="font-semibold">
                            {{ bookingStore.daysCount * pricePerDay }}{{ t('app.zl') }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
