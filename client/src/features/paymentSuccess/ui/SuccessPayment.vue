<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { getRentalDetails } from '../model/getRentalDetails';
    import { useRoute } from 'vue-router';
    import type { Rental } from '@/entities/rental';
    import { Icon } from '@iconify/vue';
    import Button from '@/shared/ui/button/Button.vue';
    import type { Car } from '@/entities/car';
    import { useI18n } from 'vue-i18n';

    const { query } = useRoute();
    const { t } = useI18n();
    const rental = ref<Rental | null>(null);
    const car = ref<Car | null>(null);

    onMounted(async () => {
        const data = await getRentalDetails(query['payment_intent'] as string);
        if (!data) return;
        rental.value = data.newRental;
        car.value = data.newCar;
    });

    const getFormattedDates = computed(() => {
        if (!rental.value || !car.value) return [null, null];

        const rentalFrom = new Date(rental.value.rentFrom);
        const rentalTo = new Date(rental.value.rentTo);

        const formattedFrom = `${(rentalFrom.getMonth() + 1).toString().padStart(2, '0')}-${rentalFrom.getDate().toString().padStart(2, '0')}-${rentalFrom.getFullYear()}`;
        const formattedTo = `${(rentalTo.getMonth() + 1).toString().padStart(2, '0')}-${(rentalTo.getDate() - 1).toString().padStart(2, '0')}-${rentalTo.getFullYear()}`;

        return [formattedFrom, formattedTo];
    });
</script>

<template>
    <div class="bg-main-gray-bg rounded-2xl shadow-lg shadow-main-border p-8 text-center">
        <div
            class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
            <Icon icon="wpf:checkmark" class="text-primary text-3xl" />
        </div>

        <h1 class="text-2xl font-bold mb-2">{{ t('app.payment_success_title') }} 🎉</h1>
        <p class="text-main-gray mb-6">
            {{ t('app.payment_success_desc') }}
        </p>

        <div class="border border-main-border rounded-xl p-4 text-left mb-6">
            <h2 class="font-semibold text-main-gray mb-3">{{ t('app.booking_summary') }}</h2>
            <div class="space-y-2 text-sm text-main-gray">
                <div class="flex justify-between">
                    <span>{{ t('app.car') }}</span>
                    <span class="font-medium">{{ car?.name }}</span>
                </div>
                <div class="flex justify-between">
                    <span>{{ t('app.pickup') }}</span>
                    <span class="font-medium">{{ rental?.pickupLocation }}</span>
                </div>
                <div class="flex justify-between">
                    <span>{{ t('app.pickup_time') }}</span>
                    <span class="font-medium">{{ rental?.pickupTime }}</span>
                </div>
                <div class="flex justify-between">
                    <span>{{ t('app.rental_starts') }}</span>
                    <span class="font-medium">{{ getFormattedDates[0] }}</span>
                </div>
                <div class="flex justify-between">
                    <span>{{ t('app.rental_ends') }}</span>
                    <span class="font-medium">{{ getFormattedDates[1] }}</span>
                </div>
                <div class="flex justify-between">
                    <span>{{ t('app.total_paid') }}</span>
                    <span class="font-semibold text-primary">
                        {{ rental && (rental.totalPrice / 100).toFixed(2) }}{{ t('app.zl') }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
            <RouterLink to="/">
                <Button size="sm" class="w-full">{{ t('app.wiev_my_bookings') }}</Button>
            </RouterLink>
            <RouterLink to="/">
                <Button size="sm" class="w-full">{{ t('app.back_to_home') }}</Button>
            </RouterLink>
        </div>
    </div>
</template>
