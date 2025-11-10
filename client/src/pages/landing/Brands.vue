<script setup lang="ts">
    import { mercedes, lamborghini, porsche, bmw } from '@/shared/assets';

    const carBrands = [
        {
            img: mercedes,
        },
        {
            img: lamborghini,
        },
        {
            img: porsche,
        },
        {
            img: bmw,
        },
    ];
</script>

<template>
    <div class="mt-40 grid grid-cols-9 gap-10">
        <div
            v-for="(brand, i) in carBrands"
            :key="i"
            class="h-full flex-center py-4 rounded-lg border grayscale transition shadow-md cursor-pointer hover:grayscale-0 border-main-border"
        >
            <img :src="brand.img" alt="" class="h-[100px]" />
        </div>
    </div>
</template>
