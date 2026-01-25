<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import type { RentalPeriod } from '@/entities/rental';
    import { CreateRentalForm } from '@/features/createRental';
    import { DateRangePicker } from '@/features/selectDateRange';
    import { ref } from 'vue';

    const selectedCar = ref<Car | null>(null);
    const rentalPeriod = ref<RentalPeriod>({
        dateFrom: null,
        dateTo: null,
    });

    const setCar = (car: Car) => (selectedCar.value = car);
</script>

<template>
    <CreateRentalForm @setCar="setCar($event)" :period="rentalPeriod">
        <DateRangePicker
            :car="selectedCar"
            @setPeriod="rentalPeriod = $event"
            :period="rentalPeriod"
        />
    </CreateRentalForm>
</template>
