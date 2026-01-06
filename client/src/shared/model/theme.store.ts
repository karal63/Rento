import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false);

    const setTheme = (isDarkTheme: boolean) => {
        isDark.value = isDarkTheme;
        document.documentElement.classList.toggle('dark', isDark.value);
    };

    const toggleTheme = () => {
        isDark.value = !isDark.value;
        document.documentElement.classList.toggle('dark', isDark.value);
    };

    return { isDark, setTheme, toggleTheme };
});
