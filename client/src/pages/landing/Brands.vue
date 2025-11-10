<script setup lang="ts">
    import { carBrands } from '@/shared/const';
</script>

<template>
    <div class="mt-32 grid grid-cols-9 gap-10">
        <div
            v-for="brand in carBrands"
            :key="brand.id"
            class="h-full flex-center py-4 rounded-lg border grayscale transition shadow-md cursor-pointer hover:grayscale-0 border-main-border"
        >
            <img :src="brand.img" alt="" class="h-[100px]" />
        </div>
    </div>
</template>
