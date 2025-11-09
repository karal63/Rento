<script setup lang="ts"></script>

<template>
    <v-main color="customWhite">
        <div class="w-full max-w-[1800px] m-auto flex items-center px-4">
            <v-container style="width: 1400px" class="mt-28 flex gap-5">
                <v-sheet width="50%">
                    <h1 class="text-8xl font-extrabold">
                        Premium
                        <br />
                        Car Rental
                        <br />
                        In Warsaw
                    </h1>
                    <p class="mt-10 text-xl text-gray-500">
                        Here you’ll find the car you’ve always dreamed of — a thrilling and stylish
                        ride that fits your budget without compromising on quality or value.
                    </p>
                    <v-btn class="mt-10" variant="flat" color="primary" size="x-large">
                        Browse offers
                        <v-icon class="ml-2">mdi-arrow-right</v-icon>
                    </v-btn>
                </v-sheet>
                <v-sheet width="50%">
                    <img src="../assets/car.png" alt="" />
                </v-sheet>
            </v-container>
        </div>
    </v-main>
</template>
