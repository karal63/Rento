<script setup lang="ts">
    import { Icon } from '@iconify/vue';
</script>

<template>
    <div>
        <div class="max-w-[1500px] m-auto flex mt-36 gap-5 items-center px-4">
            <div class="w-1/2">
                <h1 class="text-8xl font-extrabold">
                    Premium
                    <br />
                    Car Rental
                    <br />
                    In Warsaw
                </h1>
                <p class="mt-10 text-xl text-gray-400 leading-8 max-w-4/5">
                    Here you’ll find the car you’ve always dreamed of — a thrilling and stylish ride
                    that fits your budget without compromising on quality or value.
                </p>

                <button
                    class="mt-10 inline-flex gap-2 justify-center items-center rounded-md text-lg tracking-widest bg-blue-500 px-7 h-14 hover:bg-blue-400 transition cursor-pointer"
                >
                    BROWSE OFFERS
                    <Icon icon="material-symbols:search-rounded" class="text-xl" />
                </button>
            </div>
            <div class="w-1/2">
                <img src="../assets/car.png" alt="" />
            </div>
        </div>
    </div>
</template>
