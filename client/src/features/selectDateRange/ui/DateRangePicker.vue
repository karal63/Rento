<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import { checkIfAvailableDate, type CarAvailability } from '@/entities/rental';
    import { getAvailability } from '@/features/booking/model/booking.model';
    import { Calendar } from '@/shared/ui';
    import { ref, toRef, watch } from 'vue';
    import { useRangeCalendar } from '../model/useRangeCalendar';
    import { isPastDate, isSameDay } from '@/shared/lib/date';
    import type { RentalPeriod } from '@/entities/rental/model/rental.types';

    const props = defineProps<{
        car: Car | null;
        period: RentalPeriod;
    }>();

    const emit = defineEmits<{
        (e: 'setPeriod', period: RentalPeriod): void;
    }>();

    const carAvailability = ref<CarAvailability[] | []>([]);
    const isDateFromSelected = ref(false);
    const month = ref(new Date());
    const carRef = toRef(props, 'car');
    const periodRef = toRef(props, 'period');

    const { days } = useRangeCalendar(month, carRef, periodRef, carAvailability);

    const dateToISO = (date: Date) => date.toISOString();

    const getValidEndDate = (day: Date) => {
        const rentalEndDate = new Date(day);
        rentalEndDate.setDate(rentalEndDate.getDate() + 1);

        return rentalEndDate;
    };

    const hasRentalOverlap = (from: Date, to: Date) => {
        const fromISO = dateToISO(from);
        const toISO = dateToISO(to);

        return carAvailability.value.some(
            rental => rental.dateFrom <= toISO && rental.dateTo > fromISO
        );
    };

    const selectDate = (date: Date) => {
        if (isPastDate(date) || !checkIfAvailableDate(date, carAvailability.value)) return;

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

    watch(
        () => props.car,
        async () => {
            if (!props.car) return;
            carAvailability.value = await getAvailability(props.car._id);
        }
    );
</script>

<template>
    <Calendar
        @select-date="selectDate($event)"
        @set-month="month = $event"
        :days="days"
        :month="month"
    />
</template>
