import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAcceptanceModalStore = defineStore('acceptanceModal', () => {
    const isOpen = ref(false);
    const title = ref('');
    const message = ref('');
    const onConfirm = ref(() => {});

    const open = (payload: { title: string; message: string; onConfirm: () => void }) => {
        isOpen.value = true;
        title.value = payload.title;
        message.value = payload.message;
        onConfirm.value = payload.onConfirm;
    };

    const close = () => {
        isOpen.value = false;
        title.value = '';
        message.value = '';
        onConfirm.value = () => {};
    };

    const confirm = () => {
        onConfirm.value();
        close();
    };

    return { isOpen, title, message, onConfirm, open, close, confirm };
});
