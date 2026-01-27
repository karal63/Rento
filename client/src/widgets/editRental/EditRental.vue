<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import {
        useEditRentalMutation,
        useRentalQuery,
        type ReadyRental,
        type RentalPeriod,
    } from '@/entities/rental';
    import { showDialog, showErrorDialog } from '@/features/dialog';
    import { RentalForm, type RentalFormType } from '@/features/rentalForm';
    import { DateRangePicker } from '@/features/selectDateRange';
    import type { AppError } from '@/shared/model';
    import { required } from '@vuelidate/validators';
    import { onMounted, ref, watch, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute, useRouter } from 'vue-router';

    const router = useRouter();
    const { t } = useI18n();
    const { params } = useRoute();

    const editRentalMutation = useEditRentalMutation();
    const { data } = useRentalQuery(params['id'] as string);

    const rules = {
        user: { required },
        car: { required },
        period: {
            dateFrom: { required },
            dateTo: { required },
        },
        pickupLocation: { required },
        pickupTime: { required },
    };

    const rental = ref<RentalFormType>({
        user: null,
        car: null,
        period: {
            dateFrom: null,
            dateTo: null,
        },
        pickupLocation: '',
        pickupTime: '',
    });

    const edit = async () => {
        // const payload = buildRentalPayload(rental.value);

        try {
            console.log(rental.value);

            // await editRentalMutation.mutateAsync({
            //     rentalId: params['id'] as string,
            //     payload,
            // });
            // showDialog(
            //     'success',
            //     t('app.message.rental_edited'),
            //     t('app.message.rental_edited_desc', { name: username })
            // );
            router.push('/admin/rentals');
        } catch (error) {
            console.log(error);
            showErrorDialog(error as AppError);
        }
    };

    watch(data, () => {
        console.log(data);

        rental.value = data.value;
    });
</script>

<template>
    <RentalForm @handleSubmit="edit" :rules="rules" v-model:rental="rental">
        <DateRangePicker
            :car="rental.car"
            @setPeriod="rental.period = $event"
            :period="rental.period"
        />

        <template #header>
            {{ t('app.edit_rental_page.title') }}
        </template>
    </RentalForm>
</template>
