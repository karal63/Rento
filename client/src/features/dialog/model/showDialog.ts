import type { ErrorContext } from '@/shared/model';
import { useDialogStore } from './dialog.store';
import type { DialogType } from './types';

export const showDialog = (
    type: DialogType,
    message: string,
    description: string,
    context?: ErrorContext
) => {
    const dialogStore = useDialogStore();
    dialogStore.show(type, message, description, context);
};
