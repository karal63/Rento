<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import { checkIfAvailableDate, useCarAvailabilityQuery } from '@/entities/rental';
    import { Calendar } from '@/shared/ui';
    import { computed, ref, toRef } from 'vue';
    import { useRangeCalendar } from '../model/useRangeCalendar';
    import { isPastDate, isSameDay } from '@/shared/lib/date';
    import type { RentalPeriod } from '@/entities/rental';

    const props = defineProps<{
        car: Car | null;
        period: RentalPeriod;
        excludedId?: string;
    }>();

    const emit = defineEmits<{
        (e: 'setPeriod', period: RentalPeriod): void;
    }>();

    const isDateFromSelected = ref(false);
    const month = ref(new Date());
    const carRef = toRef(props, 'car');
    const periodRef = toRef(props, 'period');
    const excludedIdRef = toRef(props, 'excludedId');

    const carId = computed(() => props.car?._id);
    const carAvailability = useCarAvailabilityQuery(carId, excludedIdRef);
    const { days } = useRangeCalendar(month, carRef, periodRef, carAvailability?.data);

    const dateToISO = (date: Date) => date.toISOString();

    const getValidEndDate = (day: Date) => {
        const rentalEndDate = new Date(day);
        rentalEndDate.setDate(rentalEndDate.getDate() + 1);

        return rentalEndDate;
    };

    const hasRentalOverlap = (from: Date, to: Date) => {
        const fromISO = dateToISO(from);
        const toISO = dateToISO(to);

        return carAvailability?.data.value?.some(
            rental => rental.dateFrom <= toISO && rental.dateTo > fromISO
        );
    };

    const selectDate = (date: Date) => {
        if (isPastDate(date) || !checkIfAvailableDate(date, carAvailability?.data.value)) return;

        const { dateFrom } = props.period;

        if (!isDateFromSelected.value || !dateFrom) {
            const rentalEndDate = getValidEndDate(date);
            emit('setPeriod', { dateFrom: date, dateTo: rentalEndDate });
            isDateFromSelected.value = true;

            return;
        }

        // Prevent selecting the same date twice
        if (isSameDay(date, dateFrom)) return;

        // Normalize range
        const start = date < dateFrom ? date : dateFrom;
        const end = date < dateFrom ? dateFrom : date;

        // Block overlapping rentals
        if (hasRentalOverlap(start, end)) {
            const rentalEndDate = getValidEndDate(date);
            emit('setPeriod', { dateFrom: date, dateTo: rentalEndDate });
            isDateFromSelected.value = true;

            return;
        }

        // add date
        const updatedDate = new Date(end);
        updatedDate.setDate(end.getDate() + 1);
        updatedDate.setHours(0, 0, 0, 0);

        emit('setPeriod', { dateFrom: start, dateTo: updatedDate });
        isDateFromSelected.value = false;
    };
</script>

<template>
    <Calendar
        @select-date="selectDate($event)"
        @set-month="month = $event"
        :days="days"
        :month="month"
    />
</template>
