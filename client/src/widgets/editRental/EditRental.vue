<script setup lang="ts">
    import { buildPatchPayload, useEditRentalMutation, useRentalQuery } from '@/entities/rental';
    import { showDialog, showErrorDialog } from '@/features/dialog';
    import { buildRentalPayload, RentalForm, type RentalFormType } from '@/features/rentalForm';
    import { DateRangePicker } from '@/features/selectDateRange';
    import { StatusPicker } from '@/features/statusPicker';
    import type { AppError } from '@/shared/model';
    import { required } from '@vuelidate/validators';
    import { ref, watch } from 'vue';
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
        status: { required },
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
        status: '',
    });

    const edit = async () => {
        const payload = buildPatchPayload(data.value, buildRentalPayload(rental.value));

        try {
            await editRentalMutation.mutateAsync({
                rentalId: params['id'] as string,
                payload,
            });
            showDialog(
                'success',
                t('app.message.rental_edited'),
                t('app.message.rental_edited_desc', { name: data.value?.userId.name })
            );
            router.push('/admin/rentals');
        } catch (error) {
            console.log(error);
            showErrorDialog(error as AppError);
        }
    };

    watch(
        data,
        () => {
            if (!data.value) return;
            rental.value.car = data.value.carId;
            rental.value.user = data.value.userId;
            rental.value.period.dateFrom = new Date(data.value.rentFrom);
            rental.value.period.dateTo = new Date(data.value.rentTo);
            rental.value.pickupLocation = data.value.pickupLocation;
            rental.value.pickupTime = data.value.pickupTime;
            rental.value.status = data.value.status;
        },
        { immediate: true }
    );
</script>

<template>
    <RentalForm @handleSubmit="edit" :rules="rules" v-model:rental="rental">
        <DateRangePicker
            :car="rental.car"
            @setPeriod="rental.period = $event"
            :period="rental.period"
            :excludedId="data?._id"
        />

        <template #header>
            <div class="mb-10">
                <h1 class="text-4xl font-medium mb-4">
                    {{ t('app.rental_form.edit_title') }}
                </h1>

                <StatusPicker
                    allVariant
                    @setStatus="rental.status = $event"
                    :status="rental.status"
                />
            </div>
        </template>
    </RentalForm>
</template>
