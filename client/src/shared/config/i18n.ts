import { createI18n } from 'vue-i18n';

const languages: string[] = [];

function loadLocaleMessages() {
    const messages: Record<string, never> = {};

    const locales = import.meta.glob('../const/lang/*.json', { eager: true });

    for (const path in locales) {
        const matched = path.match(/\.\/const\/lang\/([A-Za-z0-9-_]+)\.json$/i);
        if (matched && matched[1]) {
            const locale = matched[1];
            messages[locale] =
                ((locales[path] as { default: Record<string, never> }).default as never) ||
                locales[path];
        }
    }

    return messages;
}

const i18n = createI18n({
    legacy: false, // optional, depending on Composition or Legacy API
    locale: JSON.parse(localStorage.getItem('rento_lang') ?? '"en"'),
    fallbackLocale: 'en',
    messages: loadLocaleMessages(),
});

export { i18n, languages };
