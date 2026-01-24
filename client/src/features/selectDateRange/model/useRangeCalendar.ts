import type { Car } from '@/entities/car';
import { checkIfAvailableDate } from '@/entities/rental';
import type { RentalPeriod, CarAvailability } from '@/entities/rental';
import { generateCalendarDays } from '@/shared/lib/calendar';
import { isPastDate, isSameDay } from '@/shared/lib/date';
import type { CalendarDayState } from '@/shared/ui/calendar';
import { computed, type Ref } from 'vue';

export const useRangeCalendar = (
    month: Ref<Date>,
    car: Ref<Car | null>,
    datesPeriod: Ref<RentalPeriod>,
    carAvailability: Ref<CarAvailability[]>
) => {
    const days = computed(() => generateCalendarDays(month.value).map(date => mapRangeState(date)));

    function mapRangeState(date: Date): CalendarDayState {
        return {
            date,
            disabled: isPastDate(date) || !car.value,
            inRange:
                datesPeriod.value.dateFrom &&
                datesPeriod.value.dateTo &&
                date >= datesPeriod.value.dateFrom &&
                date < datesPeriod.value.dateTo,
            selected:
                isSameDay(date, datesPeriod.value.dateFrom) ||
                isSameDay(date, datesPeriod.value.dateTo),
            available: checkIfAvailableDate(date, carAvailability.value),
            showAvailabilityMark: true,
        };
    }

    return { days };
};
