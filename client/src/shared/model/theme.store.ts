import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false);

    const setTheme = (isDarkTheme: boolean) => {
        isDark.value = isDarkTheme;
    };

    return { isDark, setTheme };
});
