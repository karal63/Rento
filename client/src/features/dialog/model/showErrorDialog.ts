import { i18n } from '@/shared/config';
import { showDialog } from './showDialog';
import type { AppError } from '@/shared/model';

export function showErrorDialog(error: AppError) {
    const t = i18n.global.t;

    const message = t('app.message.error');
    const description = t(`app.errors.${error.code}`);

    showDialog('error', message, description, error.context);
}
