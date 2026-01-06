import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
    const isOpen = ref(false);
    const isAdminOpen = ref(false);

    const setSidebarOpen = (open: boolean) => {
        isOpen.value = open;
    };

    const setAdminSidebarOpen = (open: boolean) => {
        isAdminOpen.value = open;
    };

    return { isOpen, setSidebarOpen, isAdminOpen, setAdminSidebarOpen };
});
