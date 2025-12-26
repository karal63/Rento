<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { useBookingStore } from '../model/booking.store';
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { getAvailability } from '../model/booking.model';
    import { useCarStore } from '@/entities/car';
    import type { CarAvailability } from '@/entities/rental';

    const bookingStore = useBookingStore();
    const carStore = useCarStore();

    const isDateFromSelected = ref(false);
    const now = new Date();
    const year = ref(now.getFullYear());
    const month = ref(now.getMonth());
    const daysInMonth = ref(new Date(year.value, month.value + 1, 0).getDate());
    const datesInCurrentMonth = ref(
        Array.from(
            { length: daysInMonth.value },
            (_, i) => new Date(year.value, month.value, i + 1)
        )
    );
    const carAvailability = ref<CarAvailability[] | []>([]);

    watch(month, () => {
        daysInMonth.value = new Date(year.value, month.value + 1, 0).getDate();

        datesInCurrentMonth.value = Array.from(
            { length: daysInMonth.value },
            (_, i) => new Date(year.value, month.value, i + 1)
        );
    });

    const isSameDay = (a: Date, b: Date) => {
        return (
            a.getDate() === b.getDate() &&
            a.getMonth() === b.getMonth() &&
            a.getFullYear() === b.getFullYear()
        );
    };

    const isPastDate = (date: Date) => date < now;

    const dateToISO = (date: Date) => date.toISOString();

    const getValidEndDate = (day: Date) => {
        const rentalEndDate = new Date(day);
        rentalEndDate.setDate(rentalEndDate.getDate() + 1);

        return rentalEndDate;
    };

    const selectDate = (day: Date) => {
        if (isPastDate(day) || !checkIfAvailableDate(day)) return;

        const [from] = bookingStore.dateRange;

        if (!isDateFromSelected.value || !from) {
            const rentalEndDate = getValidEndDate(day);
            bookingStore.dateRange = [day, rentalEndDate];
            isDateFromSelected.value = true;

            return;
        }

        // Prevent selecting the same date twice
        if (isSameDay(day, from)) return;

        // Normalize range
        const start = day < from ? day : from;
        const end = day < from ? from : day;

        // Block overlapping rentals
        if (hasRentalOverlap(start, end)) {
            const rentalEndDate = getValidEndDate(day);
            bookingStore.dateRange = [day, rentalEndDate];
            isDateFromSelected.value = true;

            return;
        }

        // add date
        const updatedDate = new Date(end);
        updatedDate.setDate(end.getDate() + 1);
        updatedDate.setHours(0, 0, 0, 0);

        bookingStore.dateRange = [start, updatedDate];
        isDateFromSelected.value = false;
    };

    const getClasses = (date: Date) => {
        if (isPastDate(date)) {
            return 'bg-main-gray-bg text-gray-500';
        }

        const [from, to] = bookingStore.dateRange;

        if (from && to && date?.getTime() >= from?.getTime() && date?.getTime() < to?.getTime()) {
            return 'bg-primary hover:bg-primary/80 text-white';
        }

        return '';
    };

    const getMonthName = (monthNumber: number, locale = 'en-US') => {
        return new Intl.DateTimeFormat(locale, { month: 'long' }).format(
            new Date(now.getFullYear(), monthNumber, 1)
        );
    };

    const getFormattedDates = computed(() => {
        const rentalFrom = bookingStore.dateRange[0];
        const rentalTo = bookingStore.dateRange[1];

        if (!rentalFrom || !rentalTo) return false;

        return {
            rentalFrom: `${rentalFrom?.getFullYear()}/${rentalFrom?.getMonth() + 1}/${rentalFrom?.getDate()} ${rentalFrom.getHours().toString().padEnd(2, '0')}:${rentalFrom.getMinutes().toString().padEnd(2, '0')}`,
            rentalTo: `${rentalTo?.getFullYear()}/${rentalTo?.getMonth() + 1}/${rentalTo?.getDate()} ${rentalTo.getHours().toString().padEnd(2, '0')}:${rentalTo.getMinutes().toString().padEnd(2, '0')}`,
        };
    });

    watch(
        () => carStore.selectedCar,
        async () => {
            if (!carStore.selectedCar?._id) return;
            carAvailability.value = await getAvailability(carStore.selectedCar._id);
        },
        { immediate: true }
    );

    const checkIfAvailableDate = (day: Date) => {
        const iso = dateToISO(day);

        return !carAvailability.value.some(
            rental => rental.rentalFrom <= iso && iso < rental.rentalTo
        );
    };

    const hasRentalOverlap = (from: Date, to: Date) => {
        const fromISO = dateToISO(from);
        const toISO = dateToISO(to);

        return carAvailability.value.some(
            rental => rental.rentalFrom <= toISO && rental.rentalTo > fromISO
        );
    };
</script>

<template>
    <div class="md:flex md:flex-row items-center justify-between mb-5">
        <p
            v-if="getFormattedDates"
            class="flex items-center gap-2 bg-primary/10 border border-primary/50 px-4 py-2 rounded-md text-sm flex-center mb-5 md:mb-0"
        >
            <Icon icon="mingcute:time-line" class="text-lg" />
            {{ getFormattedDates.rentalFrom }} -
            {{ getFormattedDates.rentalTo }}
        </p>
        <p v-else></p>

        <div class="flex items-center justify-between">
            <Button size="sm" color="transparent" @click="month -= 1">
                <Icon icon="weui:arrow-outlined" class="transform rotate-180 text-2xl" />
            </Button>
            <p class="px-2 w-24 text-center">{{ getMonthName(month) }}</p>
            <Button size="sm" color="transparent" @click="month += 1">
                <Icon icon="weui:arrow-outlined" class="text-2xl" />
            </Button>
        </div>
    </div>
    <div
        class="grid grid-cols-5 divide-y divide-x divide-main-border border-l border-t border-main-border rounded-md"
    >
        <button
            v-for="day in datesInCurrentMonth"
            :key="day.getTime()"
            @click="selectDate(day)"
            class="py-2 transition flex-col items-center justify-center gap-2"
            :class="`${getClasses(day)} ${day > now ? 'hover:bg-main-hover-bg cursor-pointer' : ''}`"
        >
            <span>{{ day.getDate() }}</span>

            <div
                v-if="day > now"
                class="w-1.5 h-1.5 rounded-full"
                :class="checkIfAvailableDate(day) ? 'bg-green-500' : 'bg-red-500'"
            />
            <div v-else class="w-1.5 h-1.5 rounded-full bg-transparent" />
        </button>
    </div>
</template>
