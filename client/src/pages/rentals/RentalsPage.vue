<script setup lang="ts">
    import { RentalsList } from '@/features/rentalsList';
</script>

<template>
    <section>
        <h1 class="text-2xl mb-5">Active</h1>
        <RentalsList status="active" />

        <h1 class="text-2xl mt-10 mb-5">History</h1>
        <RentalsList status="past" />
    </section>
</template>
