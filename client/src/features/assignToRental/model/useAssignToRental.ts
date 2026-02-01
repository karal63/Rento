import { useAssignToRentalMutation } from '@/entities/rental';
import { showDialog } from '@/features/dialog/@x';
import { useI18n } from 'vue-i18n';

export const useAssignToRental = () => {
    const mutation = useAssignToRentalMutation();
    const { t } = useI18n();

    const assignToRental = (rentalId: string) => {
        try {
            mutation.mutate(rentalId);
            showDialog(
                'success',
                t('app.messages.assigned_to_project'),
                t('app.messages.assigned_to_project_desc')
            );
        } catch (error) {
            console.log(error);
        }
    };

    return { assignToRental };
};
