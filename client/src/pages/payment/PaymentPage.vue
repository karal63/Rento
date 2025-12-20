<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    import { PaymentPanel } from '@/features/payment';

    const router = useRouter();
    const carStore = useCarStore();

    onMounted(async () => {
        if (!carStore.selectedCar?._id) return router.back();
    });
</script>

<template>
    <div class="lg:w-2/3">
        <PaymentPanel />
    </div>
</template>
