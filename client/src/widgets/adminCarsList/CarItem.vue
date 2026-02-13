<script setup lang="ts">
    import type { Car } from '@/entities/car';
    import Dropdown from '@/shared/ui/dropdown/Dropdown.vue';
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';

    defineProps<{
        car: Car;
    }>();

    const isMenuOpen = ref(false);
</script>

<template>
    <li class="relative shadow border bg-main-gray-bg border-main-border rounded-md p-3">
        <RouterLink :to="`cars/${car._id}`" class="flex">
            <!-- make images same wodth and height -->
            <div class="w-[110px] md:w-[150px] max-h-[100px]">
                <img
                    :src="car.image"
                    :alt="car.name"
                    class="rounded-md h-full w-full object-cover"
                />
            </div>

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

        <div class="absolute top-2 right-2">
            <Dropdown
                :is-open="isMenuOpen"
                side="left"
                @close="isMenuOpen = false"
                class="max-w-max"
            >
                <button
                    @click="isMenuOpen = !isMenuOpen"
                    class="w-7 h-7 hover:bg-main-hover-bg transition rounded-md text-2xl cursor-pointer flex-center"
                >
                    <Icon icon="pepicons-pencil:dots-y" />
                </button>

                <template #actions>
                    <slot name="actions" v-bind="{ car }" />
                </template>
            </Dropdown>
        </div>
    </li>
</template>
