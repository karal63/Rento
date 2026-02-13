<script setup lang="ts">
    import { CarForm } from '@/features/carForm';
    import { required } from '@vuelidate/validators';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

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

    const car = ref({
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

    const addCar = () => {
        console.log(car.value);
    };
</script>

<template>
    <h1 class="text-4xl font-medium mb-10">
        {{ t('app.add_car_page.add_new_car') }}
    </h1>
    <CarForm v-model="car" :rules="rules" @submit="addCar" />
</template>
