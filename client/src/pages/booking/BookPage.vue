<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { BookingSummary } from '@/widgets';
    import { BookingForm } from '@/features/booking';

    const { params } = useRoute();
    const carStore = useCarStore();

    onMounted(async () => {
        if (!carStore.selectedCar?._id) await carStore.getCarById(params.id as string);
    });
</script>

<template>
    <div>
        <main class="max-w-[1000px] m-auto 0 px-5 mt-32 lg:flex gap-10">
            <BookingSummary />
            <BookingForm />
        </main>
    </div>
</template>
