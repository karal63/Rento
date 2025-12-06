<script setup lang="ts">
    import { useCarStore } from '@/entities/car';

    const carStore = useCarStore();
</script>

<template>
    <div class="w-1/3 bg-main-gray-bg shadow-lg rounded-2xl p-6 mb-10">
        <!-- Image + name -->
        <div class="flex flex-col md:flex-row gap-6">
            <img
                :src="carStore.selectedCar?.image"
                :alt="carStore.selectedCar?.name"
                class="w-full md:w-72 h-48 object-cover rounded-xl"
            />

            <div class="flex flex-col justify-between w-full">
                <div>
                    <h2 class="text-2xl font-semibold">
                        {{ carStore.selectedCar?.name }}
                    </h2>
                    <!-- <p class="text-gray-500 text-sm mt-1">
                                    {{ car.class }} • {{ car.type }}
                                </p> -->
                </div>

                <!-- Pricing -->
                <div class="mt-4">
                    <p class="text-lg font-semibold">€1000/day</p>
                    <p class="text-main-gray text-sm mt-1">
                        Total for 1 days:
                        <span class="font-semibold">€5000</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
