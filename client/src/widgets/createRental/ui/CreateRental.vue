<script setup lang="ts">
    import { useCreateRentalMutation } from '@/entities/rental';
    import { showDialog, showErrorDialog } from '@/features/dialog';
    import { buildRentalPayload, RentalForm, type RentalFormType } from '@/features/rentalForm';
    import { DateRangePicker } from '@/features/selectDateRange';
    import type { AppError } from '@/shared/model';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const { t } = useI18n();

    const createRentalMutation = useCreateRentalMutation();

    const rental = ref<RentalFormType>({
        employee: null,
        user: null,
        car: null,
        period: {
            dateFrom: null,
            dateTo: null,
        },
        pickupLocation: '',
        pickupTime: '',
    });

    const create = async () => {
        const payload = buildRentalPayload(rental.value);
        if (!payload) return;

        try {
            await createRentalMutation.mutateAsync(payload);
            showDialog(
                'success',
                t('app.message.rental_created'),
                t('app.message.rental_created_desc', { name: rental.value.user?.name })
            );
            router.push('/admin/rentals');
        } catch (error) {
            console.log(error);
            showErrorDialog(error as AppError);
        }
    };
</script>

<template>
    <RentalForm @handleSubmit="create" v-model:rental="rental">
        <DateRangePicker
            :car="rental.car"
            @setPeriod="rental.period = $event"
            :period="rental.period"
        />

        <template #header>
            <h1 class="text-4xl font-medium mb-10">
                {{ t('app.rental_form.create_title') }}
            </h1>
        </template>
    </RentalForm>
</template>
