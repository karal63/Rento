export const generateCalendarDays = (month: Date): Date[] => {
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

    return Array.from(
        { length: daysInMonth },
        (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)
    );
};
