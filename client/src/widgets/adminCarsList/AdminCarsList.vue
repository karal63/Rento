<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';

    defineProps<{
        cars: Car[];
        loading: boolean;
    }>();
</script>

<template>
    <section class="mt-10">
        <ul v-if="!loading" class="flex-col gap-3 md:gap-5">
            <li
                v-for="car in cars"
                :key="car._id"
                class="shadow border bg-main-gray-bg border-main-border rounded-md p-3"
            >
                <RouterLink :to="`cars/${car._id}`" class="flex">
                    <img
                        :src="car.image"
                        :alt="car.name"
                        class="w-[110px] md:w-[150px] rounded-md"
                    />

                    <div class="ml-5 flex-col justify-between">
                        <h3 class="font-semibold text-md md:text-xl">{{ car.name }}</h3>
                        <div
                            class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 md:gap-y-1 text-sm xl:gap-y-2 xl:text-base text-main-gray"
                        >
                            <p class="flex gap-2 items-center">
                                <Icon icon="ic:outline-speed" class="text-2xl" />
                                {{ car.details.acceleration }}
                            </p>
                            <p class="flex gap-2 items-center">
                                <Icon icon="ph:horse" class="text-2xl" />
                                {{ car.details.power }}
                            </p>
                            <p class="hidden lg:flex gap-2 items-center">
                                <Icon icon="mingcute:seat-line" class="text-2xl" />
                                {{ car.details.numberOfSeats }}
                            </p>
                            <p class="hidden lg:flex gap-2 items-center">
                                <Icon icon="fluent:transmission-20-filled" class="text-2xl" />
                                {{ car.details.transmission }}
                            </p>
                        </div>
                    </div>
                </RouterLink>
            </li>
        </ul>

        <ul v-else class="flex-col gap-3 md:gap-5">
            <li
                v-for="(_, i) in 5"
                :key="i"
                class="skeleton h-[137px] md:h-[162px] bg-black rounded-md"
            ></li>
        </ul>
    </section>
</template>
