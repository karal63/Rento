export function calculateDays(timeStart: Date, timeEnd: Date) {
    const diffMs = timeEnd.getTime() - timeStart.getTime();

    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
