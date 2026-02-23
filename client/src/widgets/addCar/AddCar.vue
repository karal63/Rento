<script setup lang="ts">
    import type { CarFormType } from '@/entities/car';
    import { useAddCar } from '@/features/addCar';
    import { CarForm } from '@/features/carForm';
    import { showDialog, showErrorDialog } from '@/features/dialog';
    import type { AppError } from '@/shared/model';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const { addCar } = useAddCar();

    const car = ref<CarFormType>({
        name: '',
        images: [],
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
        try {
            await addCar(car.value);
            showDialog(
                'success',
                t('app.add_car_page.car_added'),
                t('app.add_car_page.car_added_desc')
            );
        } catch (error) {
            showErrorDialog(error as AppError);
        }
    };
</script>

<template>
    <h1 class="text-4xl font-medium mb-10">
        {{ t('app.add_car_page.add_new_car') }}
    </h1>
    <CarForm v-model="car" @submit="submit" />
</template>
