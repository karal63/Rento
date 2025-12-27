<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { computed, onMounted } from 'vue';
    import { useRentalsStore } from '../model/rentals.store';

    const rentalsStrore = useRentalsStore();

    const props = defineProps<{
        status: 'active' | 'past';
    }>();

    const getClasses = computed(() => {
        if (props.status === 'active') {
            return 'border-green-500/20 bg-green-500/10 hover:border-green-500/40';
        }

        return 'border-main-border bg-main-gray-bg';
    });

    onMounted(async () => {
        await rentalsStrore.getRentals();
        console.log(rentalsStrore.rentals);
    });

    const checkIfActive = (start: number, end: number) => {
        const now = new Date();
        const newStart = new Date(start);
        const newEnd = new Date(end);

        return now >= newStart && now <= newEnd;
    };

    const getFormattedDates = (start: number, end: number) => {
        const newStart = new Date(start);
        const newEnd = new Date(end);

        const formattedStart = `${(newStart.getMonth() + 1).toString().padStart(2, '0')}-${newStart.getDate().toString().padStart(2, '0')}-${newStart.getFullYear()}`;
        const formattedEnd = `${(newEnd.getMonth() + 1).toString().padStart(2, '0')}-${(newEnd.getDate() - 1).toString().padStart(2, '0')}-${newEnd.getFullYear()}`;

        return `${formattedStart} - ${formattedEnd}`;
    };
</script>

<template>
    <ul>
        <li v-for="rental in rentalsStrore.rentals" :key="rental._id">
            <div
                v-if="
                    props.status === 'active'
                        ? checkIfActive(rental.rentFrom, rental.rentTo)
                        : !checkIfActive(rental.rentFrom, rental.rentTo)
                "
                class="group relative border rounded-md p-5"
                :class="getClasses"
            >
                <div class="flex items-center gap-5">
                    <img :src="rental.carId.image" alt="" class="h-20 rounded-md" />

                    <div>
                        <h3 class="text-xl mb-2 font-bold">{{ rental.carId.name }}</h3>

                        <div class="flex gap-8">
                            <div>
                                <h3 class="flex gap-1">
                                    <span class="text-main-gray">Status:</span>
                                    <span class="font-semibold text-green-500">Active</span>
                                </h3>
                                <h3 class="flex gap-1">
                                    <span class="text-main-gray">Rental Period:</span>
                                    <span>
                                        {{ getFormattedDates(rental.rentFrom, rental.rentTo) }}
                                    </span>
                                </h3>
                            </div>

                            <div>
                                <h3 class="flex gap-1">
                                    <span class="text-main-gray">Total price:</span>
                                    <span>{{ (rental.totalPrice / 100).toFixed(2) }}PLN</span>
                                </h3>
                                <h3 class="flex gap-1">
                                    <span class="text-main-gray">Pickup:</span>
                                    <span>
                                        {{ rental.pickupLocation }} at {{ rental.pickupTime }}
                                    </span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div
                    v-if="checkIfActive(rental.rentFrom, rental.rentTo)"
                    class="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                >
                    <button
                        class="p-2 rounded-md transition hover:bg-main-border text-main-gray hover:text-white cursor-pointer"
                        title="Edit rental"
                    >
                        <Icon icon="iconoir:edit" class="text-2xl" />
                    </button>

                    <button
                        class="p-2 rounded-md hover:bg-red-500/10 text-red-500 cursor-pointer"
                        title="Cancel rental"
                    >
                        <Icon icon="iconoir:trash" class="text-2xl" />
                    </button>
                </div>
            </div>
        </li>
    </ul>
</template>
