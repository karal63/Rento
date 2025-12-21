<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { getRentalDetails } from '../model/getRentalDetails';
    import { useRoute } from 'vue-router';
    import type { Rental } from '@/entities/rental';
    import { Icon } from '@iconify/vue';
    import Button from '@/shared/ui/button/Button.vue';
    import type { Car } from '@/entities/car';

    const { query } = useRoute();
    const rental = ref<Rental | null>(null);
    const car = ref<Car | null>(null);

    onMounted(async () => {
        const data = await getRentalDetails(query['payment_intent'] as string);
        if (!data) return;
        rental.value = data.newRental;
        car.value = data.newCar;
    });
</script>

<template>
    <div class="bg-main-gray-bg rounded-2xl shadow-lg shadow-main-border p-8 text-center">
        <div
            class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
            <Icon icon="wpf:checkmark" class="text-primary text-3xl" />
        </div>

        <h1 class="text-2xl font-bold mb-2">Payment Successful 🎉</h1>
        <p class="text-main-gray mb-6">
            Your car rental has been confirmed. We’ve sent the receipt to your email.
        </p>

        <div class="border border-main-border rounded-xl p-4 text-left mb-6">
            <h2 class="font-semibold text-main-gray mb-3">Booking Summary</h2>
            <div class="space-y-2 text-sm text-main-gray">
                <div class="flex justify-between">
                    <span>Car</span>
                    <span class="font-medium">{{ car?.name }}</span>
                </div>
                <div class="flex justify-between">
                    <span>Pickup</span>
                    <span class="font-medium">{{ rental?.pickupLocation }}</span>
                </div>
                <div class="flex justify-between">
                    <span>Total Paid</span>
                    <span class="font-semibold text-primary">
                        {{ rental && (rental.totalPrice / 100).toFixed(2) }}zl
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
            <RouterLink to="/">
                <Button size="sm" class="w-full">View My Bookings</Button>
            </RouterLink>
            <RouterLink to="/">
                <Button size="sm" class="w-full">Back to Home</Button>
            </RouterLink>
        </div>
    </div>
</template>
