<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { RentDetails, useBookingStore } from '@/features/booking';
    import { DateRangePicker } from '@/features/selectDateRange';

    const carStore = useCarStore();
    const bookingStore = useBookingStore();
</script>

<template>
    <RentDetails>
        <DateRangePicker
            :car="carStore.selectedCar"
            :period="bookingStore.period"
            @set-period="bookingStore.period = $event"
        />
    </RentDetails>
</template>
