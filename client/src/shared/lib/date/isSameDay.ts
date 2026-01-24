export const isSameDay = (a: Date | null, b: Date | null) => {
    if (!a || !b) return;

    return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
    );
};
