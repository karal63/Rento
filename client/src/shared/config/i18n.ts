import { createI18n } from 'vue-i18n';

const languages: string[] = [];

function loadLocaleMessages() {
    const messages: Record<string, any> = {};

    const locales = import.meta.glob('../const/lang/*.json', { eager: true });

    for (const path in locales) {
        const matched = path.match(/\.\/const\/lang\/([A-Za-z0-9-_]+)\.json$/i);
        if (matched && matched[1]) {
            const locale = matched[1];
            messages[locale] = (locales[path] as any).default || locales[path];
            languages.push(locale);
        }
    }

    return messages;
}

const i18n = createI18n({
    legacy: false, // optional, depending on Composition or Legacy API
    locale: 'en',
    fallbackLocale: 'en',
    messages: loadLocaleMessages(),
});

export { i18n, languages };
