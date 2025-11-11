<script setup lang="ts">
    import CarCard from './CarCard.vue';
</script>

<template>
    <div class="mt-20 grid grid-cols-3 gap-8">
        <CarCard v-for="(_, i) in 6" :key="i" />
    </div>
</template>
