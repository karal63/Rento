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
            acceleration: { required },
            transmission: { required },
            power: { required },
            numberOfSeats: { required },
        },
        deposit: { required },
        pricing: { required },
        brand: { required },
    };

    const car = ref({
        name: '',
        image: '',
        details: {
            acceleration: '',
            transmission: '',
            power: '',
            numberOfSeats: '',
        },
        deposit: 0,
        pricing: [],
        brand: '',
    });
</script>

<template>
    <h1 class="text-4xl font-medium mb-10">
        {{ t('app.add_car_page.add_new_car') }}
    </h1>
    <CarForm v-model="car" :rules="rules" />
</template>
