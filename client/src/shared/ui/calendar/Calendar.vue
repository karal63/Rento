<script setup lang="ts">
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import type { CalendarDayState } from './types';

    const props = defineProps<{
        days: CalendarDayState[];
        month: Date;
    }>();

    const emit = defineEmits<{
        (e: 'selectDate', date: Date): void;
        (e: 'setMonth', date: Date): void;
    }>();

    const selectDate = (date: Date) => {
        emit('selectDate', date);
    };

    const getMonthName = (month: Date, locale = 'en-US') => {
        return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(
            new Date(month.getFullYear(), month.getMonth(), 1)
        );
    };

    const getClasses = (day: CalendarDayState) => {
        if (day.disabled) {
            return 'bg-main-gray-bg text-gray-500';
        }

        if (day.inRange) {
            return 'bg-primary hover:bg-primary/80 text-white';
        }

        return 'hover:bg-main-hover-bg cursor-pointer';
    };

    const decreaseMonth = () => {
        emit('setMonth', new Date(props.month.setMonth(props.month.getMonth() - 1)));
    };

    const increaseMonth = () => {
        emit('setMonth', new Date(props.month.setMonth(props.month.getMonth() + 1)));
    };
</script>

<template>
    <div class="md:flex md:flex-row items-center justify-between mb-5">
        <div class="flex items-center justify-between w-full">
            <Button size="sm" color="transparent" @click="decreaseMonth">
                <Icon icon="weui:arrow-outlined" class="transform rotate-180 text-2xl" />
            </Button>
            <p class="px-2 w-24 text-center">{{ getMonthName(month) }}</p>
            <Button size="sm" color="transparent" @click="increaseMonth">
                <Icon icon="weui:arrow-outlined" class="text-2xl" />
            </Button>
        </div>
    </div>
    <div
        class="grid grid-cols-5 divide-y divide-x divide-main-border border-l border-t border-main-border rounded-md"
    >
        <button
            v-for="day in days"
            :key="day.date.getTime()"
            @click="selectDate(day.date)"
            class="py-2 transition flex-col items-center justify-center gap-2"
            :class="getClasses(day)"
        >
            <span>{{ day.date.getDate() }}</span>

            <div
                v-if="!day.disabled && day.showAvailabilityMark"
                class="w-1.5 h-1.5 rounded-full"
                :class="day.available ? 'bg-green-500' : 'bg-red-500'"
            />
            <div v-else class="w-1.5 h-1.5 rounded-full bg-transparent" />
        </button>
    </div>
</template>
