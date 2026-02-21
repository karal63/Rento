import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const storedTheme = localStorage.getItem('rento_theme_is_dark');

    const isDark = ref<boolean>(JSON.parse(localStorage.getItem('rento_theme_is_dark') ?? 'false'));

    const setTheme = (isDarkTheme: boolean) => {
        isDark.value = isDarkTheme;
        document.documentElement.classList.toggle('dark', isDark.value);
        localStorage.setItem('rento_theme_is_dark', JSON.stringify(isDarkTheme));
    };

    const toggleTheme = () => {
        isDark.value = !isDark.value;
        document.documentElement.classList.toggle('dark', isDark.value);
        localStorage.setItem('rento_theme_is_dark', JSON.stringify(isDark.value));
    };

    onMounted(() => {
        const isDark = storedTheme !== null ? JSON.parse(storedTheme) : false;
        setTheme(isDark);
    });

    return { isDark, setTheme, toggleTheme };
});
