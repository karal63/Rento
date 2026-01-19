import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DialogType } from './types';

export const useDialogStore = defineStore('dialogStore', () => {
    const dialog = ref<{
        isOpen: boolean;
        type: DialogType | '';
        message: string;
        description: string | string[];
    }>({
        isOpen: false,
        type: '',
        message: '',
        description: [''],
    });

    const show = (type: DialogType, message: string, description: string[]) => {
        dialog.value = {
            isOpen: true,
            type,
            message,
            description,
        };
    };

    const hide = () => {
        dialog.value = {
            ...dialog.value,
            isOpen: false,
        };
    };

    return { dialog, show, hide };
});
