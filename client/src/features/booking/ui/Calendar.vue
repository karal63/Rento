<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { useBookingStore } from '../model/booking.store';
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';

    const bookingStore = useBookingStore();

    const isDateFromSelected = ref(false);
    const now = ref(new Date());
    const year = ref(now.value.getFullYear());
    const month = ref(now.value.getMonth());

    // Number of days in the current month
    const daysInMonth = ref(new Date(year.value, month.value + 1, 0).getDate());
    watch(month, () => {
        daysInMonth.value = new Date(year.value, month.value + 1, 0).getDate();
    });

    // Create array of Date objects for each day
    const datesInCurrentMonth = ref(
        Array.from(
            { length: daysInMonth.value },
            (_, i) => new Date(year.value, month.value, i + 1)
        )
    );
    watch(month, () => {
        datesInCurrentMonth.value = Array.from(
            { length: daysInMonth.value },
            (_, i) => new Date(year.value, month.value, i + 1)
        );
    });

    const selectDate = (day: Date) => {
        if (day < now.value) return;

        if (!isDateFromSelected.value) {
            bookingStore.dateRange = [];
            bookingStore.dateRange[0] = day;
            isDateFromSelected.value = true;
        } else {
            if (bookingStore.dateRange[0] && day === bookingStore.dateRange[0]) return;
            bookingStore.dateRange[1] = day;

            // switch dates if date[1] is newer
            if (bookingStore.dateRange[0]! > day) {
                const temp = bookingStore.dateRange[0]!;
                bookingStore.dateRange[0] = bookingStore.dateRange[1];
                bookingStore.dateRange[1] = temp;
            }
            isDateFromSelected.value = false;
        }
    };

    const isBetweenDates = (date: Date) => {
        if (date < now.value) {
            return 'bg-main-gray-bg text-gray-500';
        }
        if (
            (bookingStore.dateRange[0] &&
                date >= bookingStore.dateRange[0] &&
                bookingStore.dateRange[1] &&
                date <= bookingStore.dateRange[1]) ||
            date === bookingStore.dateRange[0] ||
            date === bookingStore.dateRange[1]
        ) {
            return 'bg-primary hover:bg-primary/80 text-white';
        }
    };

    const getMonthName = (monthNumber: number, locale = 'en-US') => {
        return new Intl.DateTimeFormat(locale, { month: 'long' }).format(
            new Date(2025, monthNumber, 1)
        );
    };

    const next = () => {
        month.value += 1;
    };

    const prev = () => {
        month.value -= 1;
    };

    const getFormattedDates = computed(() => {
        const rentalFrom = bookingStore.dateRange[0]?.toLocaleString();
        const rentalTo = bookingStore.dateRange[1]?.toLocaleString();

        return [rentalFrom, rentalTo];
    });
</script>

<template>
    <div class="md:flex md:flex-row items-center justify-between mb-5">
        <p
            v-if="getFormattedDates[0]"
            class="flex items-center gap-2 bg-primary/10 border border-primary/50 px-4 py-2 rounded-md text-sm flex-center mb-5 md:mb-0"
        >
            <Icon icon="mingcute:time-line" class="text-lg" />
            {{ getFormattedDates[0] }} -
            {{ getFormattedDates[1] }}
        </p>
        <p v-else></p>

        <div class="flex items-center justify-between">
            <Button size="sm" color="transparent" @click="prev">
                <Icon icon="weui:arrow-outlined" class="transform rotate-180 text-2xl" />
            </Button>
            <p class="px-2 w-24 text-center">{{ getMonthName(month) }}</p>
            <Button size="sm" color="transparent" @click="next">
                <Icon icon="weui:arrow-outlined" class="text-2xl" />
            </Button>
        </div>
    </div>
    <div
        class="grid grid-cols-5 divide-y divide-x divide-main-border border-l border-t border-main-border rounded-md"
    >
        <button
            v-for="day in datesInCurrentMonth"
            :key="day.getDate()"
            @click="selectDate(day)"
            class="py-2 text-center transition flex-col gap-2"
            :class="`${isBetweenDates(day)} ${day > now && 'hover:bg-main-hover-bg cursor-pointer'}`"
        >
            <span>{{ day.getDate() }}</span>
            <div class="flex-center">
                <div v-if="day > now" class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
        </button>
    </div>
</template>
