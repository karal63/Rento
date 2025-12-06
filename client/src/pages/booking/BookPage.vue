<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { BookingSummary } from '@/widgets';
    import { BookingForm } from '@/features/booking';

    const router = useRouter();
    const carStore = useCarStore();

    onMounted(() => {
        if (!carStore.selectedCar?._id) router.back();
    });
</script>

<template>
    <div>
        <main class="max-w-[1000px] m-auto 0 px-5 mt-32 flex gap-10">
            <BookingSummary />
            <BookingForm />
        </main>
    </div>
</template>
