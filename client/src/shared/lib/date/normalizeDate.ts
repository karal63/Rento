import { i18n } from '@/shared/config';

export const normalizeDate = (date: number) => {
    const locale = i18n.global.locale.value || 'en-US';

    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
