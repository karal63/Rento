<script setup lang="ts">
    import type { Car, CarFormType } from '@/entities/car';
    import { CarForm } from '@/features/carForm';
    import { showDialog, showErrorDialog } from '@/features/dialog';
    import { useEditCar } from '@/features/editCar';
    import type { AppError } from '@/shared/model';
    import { required } from '@vuelidate/validators';
    import { ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const { editCar } = useEditCar();

    const props = defineProps<{
        originalCar?: Car;
    }>();

    const rules = {
        name: { required },
        image: { required },
        details: {
            accelerationTo100: { required },
            horsepower: { required },
            torqueNm: { required },
            transmission: { required },
            numberOfSeats: { required },
        },
        deposit: { required },
        pricing: {
            day: { required },
            days2_3: { required },
            days4_6: { required },
            days7_13: { required },
            days14_29: { required },
            month: { required },
        },
        brand: { required },
    };

    const car = ref<CarFormType>({
        name: '',
        image: '',
        details: {
            accelerationTo100: null,
            horsepower: null,
            torqueNm: null,
            transmission: null,
            numberOfSeats: null,
        },
        deposit: null,
        pricing: {
            day: null,
            days2_3: null,
            days4_6: null,
            days7_13: null,
            days14_29: null,
            month: null,
        },
        brand: '',
    });

    const submit = async () => {
        if (!props.originalCar) return;

        try {
            editCar(props.originalCar, car.value);
            showDialog(
                'success',
                t('app.edit_car_page.car_edited'),
                t('app.edit_car_page.car_edited_desc')
            );
        } catch (error) {
            showErrorDialog(error as AppError);
        }
    };

    watch(
        () => props.originalCar,
        () => {
            car.value = {
                brand: props.originalCar?.brand ?? '',
                name: props.originalCar?.name ?? '',
                image: props.originalCar?.image ?? '',
                details: {
                    accelerationTo100: props.originalCar?.details.accelerationTo100 ?? null,
                    horsepower: props.originalCar?.details.horsepower ?? null,
                    torqueNm: props.originalCar?.details.torqueNm ?? null,
                    transmission: props.originalCar?.details.transmission ?? null,
                    numberOfSeats: props.originalCar?.details.numberOfSeats ?? null,
                },
                deposit: props.originalCar?.deposit ?? null,
                pricing: {
                    day: props.originalCar?.pricing.day ?? null,
                    days2_3: props.originalCar?.pricing.days2_3 ?? null,
                    days4_6: props.originalCar?.pricing.days4_6 ?? null,
                    days7_13: props.originalCar?.pricing.days7_13 ?? null,
                    days14_29: props.originalCar?.pricing.days14_29 ?? null,
                    month: props.originalCar?.pricing.month ?? null,
                },
            };
        },
        { immediate: true }
    );
</script>

<template>
    <h1 class="text-4xl font-medium mb-10">
        {{ t('app.edit_car_page.edit_car') }}
    </h1>
    <CarForm v-model="car" :rules="rules" @submit="submit" />
</template>
