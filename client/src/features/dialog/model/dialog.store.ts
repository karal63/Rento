import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DialogType } from './types';
import type { ErrorContext } from '@/shared/model';

export const useDialogStore = defineStore('dialogStore', () => {
    const dialog = ref<{
        isOpen: boolean;
        type: DialogType | '';
        message: string;
        description: string;
        context: ErrorContext | undefined;
    }>({
        isOpen: false,
        type: '',
        message: '',
        description: '',
        context: [],
    });

    const show = (
        type: DialogType,
        message: string,
        description: string,
        context?: ErrorContext
    ) => {
        dialog.value = {
            isOpen: true,
            type,
            message,
            description,
            context,
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
