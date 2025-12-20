<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { BookingForm } from '@/features/booking';

    const { params } = useRoute();
    const carStore = useCarStore();

    onMounted(async () => {
        if (!carStore.selectedCar?._id) await carStore.getCarById(params.id as string);
    });
</script>

<template>
    <BookingForm />
</template>
