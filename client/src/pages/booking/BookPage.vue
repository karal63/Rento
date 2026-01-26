<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { Auth } from '@/features/booking';
    import { BookRental } from '@/widgets';
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const { params } = useRoute();
    const carStore = useCarStore();

    onMounted(async () => {
        if (!carStore.selectedCar?._id) await carStore.getCarById(params.id as string);
    });
</script>

<template>
    <BookRental />
    <Auth />
</template>
