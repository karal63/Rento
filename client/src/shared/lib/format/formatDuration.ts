export const formatTimeLeft = (dateTo: Date): string => {
    const now = new Date();
    const diffMs = dateTo.getTime() - now.getTime();

    if (diffMs <= 0) return '0 min';

    const totalMinutes = Math.floor(diffMs / 1000 / 60);

    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    const parts: string[] = [];

    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${hours}h`);
    parts.push(`${minutes}m`);

    return parts.join(' ');
};
