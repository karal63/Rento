<script setup lang="ts">
    import { carBrands } from '@/shared/const';
</script>

<template>
    <div
        class="my-10 lg:mt-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-5 lg:gap-10"
    >
        <div
            v-for="brand in carBrands"
            :key="brand.id"
            class="h-full flex-center py-4 rounded-lg grayscale transition shadow-md cursor-pointer bg-main-bg hover:grayscale-0"
        >
            <img :src="brand.img" alt="" class="h-[70px] sm:h-[90px] lg:h-[100px]" />
        </div>
    </div>
</template>
