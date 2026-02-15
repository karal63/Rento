<script setup lang="ts">
    import { calculateRentalPrice } from '@/features/payment';
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
            if (!carStore.selectedCar) return;
            pricePerDay.value = calculateRentalPrice(daysCount, carStore.selectedCar.pricing);
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
