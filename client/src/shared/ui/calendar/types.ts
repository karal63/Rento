export type CalendarDayState = {
    date: Date;
    disabled?: boolean | null;
    selected?: boolean | null;
    inRange?: boolean | null;
    available?: boolean;
    showAvailabilityMark?: boolean;
};
