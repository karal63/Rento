<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import {
        useCreateRentalMutation,
        type ReadyRental,
        type RentalPeriod,
    } from '@/entities/rental';
    import { showDialog, showErrorDialog } from '@/features/dialog';
    import { RentalForm } from '@/features/rentalForm';
    import { DateRangePicker } from '@/features/selectDateRange';
    import type { AppError } from '@/shared/model';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const { t } = useI18n();

    const selectedCar = ref<Car | null>(null);
    const rentalPeriod = ref<RentalPeriod>({
        dateFrom: null,
        dateTo: null,
    });
    const createRentalMutation = useCreateRentalMutation();

    const setCar = (car: Car) => (selectedCar.value = car);

    const create = async ({
        payload,
        username,
    }: {
        payload: ReadyRental;
        username: string | undefined;
    }) => {
        try {
            await createRentalMutation.mutateAsync(payload);
            showDialog(
                'success',
                t('app.message.rental_created'),
                t('app.message.rental_created_desc', { name: username })
            );
            router.push('/admin/rentals');
        } catch (error) {
            console.log(error);
            showErrorDialog(error as AppError);
        }
    };
</script>

<template>
    <RentalForm @setCar="setCar($event)" @handleSubmit="create" :period="rentalPeriod">
        <DateRangePicker
            :car="selectedCar"
            @setPeriod="rentalPeriod = $event"
            :period="rentalPeriod"
        />

        <template #header>
            {{ t('app.create_rental_page.title') }}
        </template>
    </RentalForm>
</template>
