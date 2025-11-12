<script setup lang="ts">
    import { useCarStore } from '@/entities/car';

    const carStore = useCarStore();
    console.log();
</script>

<template>
    <div class="mt-20">
        <img :src="carStore.selectedCar?.image" alt="" class="w-full" />
        123
    </div>
</template>
