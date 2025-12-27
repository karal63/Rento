<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { computed, onMounted } from 'vue';
    import { cancelRental } from '@/features/cancelRental';
    import { useRentalStore, type RentalWithCar } from '@/entities/rental';

    const rentalsStrore = useRentalStore();

    const props = defineProps<{
        status: 'active' | 'past';
    }>();

    const now = new Date();

    const getClasses = computed(() => {
        if (props.status === 'active') {
            return 'border-green-500/20 bg-green-500/10 hover:border-green-500/40';
        }

        return 'border-main-border bg-main-gray-bg';
    });

    onMounted(async () => {
        await rentalsStrore.getRentals();
    });

    const cancel = async (rental: RentalWithCar) => {
        await cancelRental(rental);
    };

    const checkIfActive = (rental: RentalWithCar) => {
        const newStart = new Date(rental.rentFrom);
        const newEnd = new Date(rental.rentTo);

        return now >= newStart && now <= newEnd && rental.status !== 'CANCELLED';
    };

    const canChange = (rental: RentalWithCar) => {
        const newStart = new Date(rental.rentFrom);
        newStart.setDate(newStart.getDate() - 1);

        return now < newStart && rental.status !== 'CANCELLED';
    };

    const getFormattedDates = (start: number, end: number) => {
        const newStart = new Date(start);
        const newEnd = new Date(end);

        const formattedStart = `${(newStart.getMonth() + 1).toString().padStart(2, '0')}-${newStart.getDate().toString().padStart(2, '0')}-${newStart.getFullYear()}`;
        const formattedEnd = `${(newEnd.getMonth() + 1).toString().padStart(2, '0')}-${(newEnd.getDate() - 1).toString().padStart(2, '0')}-${newEnd.getFullYear()}`;

        return `${formattedStart} - ${formattedEnd}`;
    };

    const filteredRentals = computed(() => {
        return rentalsStrore.rentals.filter(rental => {
            return props.status === 'active' ? checkIfActive(rental) : !checkIfActive(rental);
        });
    });
</script>

<template>
    <ul class="flex-col gap-3">
        <li v-for="rental in filteredRentals" :key="rental._id">
            <div
                v-if="props.status === 'active' ? checkIfActive(rental) : !checkIfActive(rental)"
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
                                    <span
                                        class="font-semibold"
                                        :class="
                                            rental.status === 'CANCELLED'
                                                ? 'text-red-500'
                                                : 'text-green-500'
                                        "
                                    >
                                        {{ rental.status }}
                                    </span>
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
                    v-if="!checkIfActive(rental) && canChange(rental)"
                    class="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                >
                    <button
                        class="p-2 rounded-md transition hover:bg-main-border text-main-gray hover:text-white cursor-pointer"
                        title="Edit rental"
                    >
                        <Icon icon="iconoir:edit" class="text-2xl" />
                    </button>

                    <button
                        @click="cancel(rental)"
                        class="p-2 rounded-md hover:bg-red-500/10 text-red-500 cursor-pointer"
                        title="Cancel rental"
                    >
                        <Icon icon="iconoir:trash" class="text-2xl" />
                    </button>
                </div>
            </div>
        </li>

        <li v-if="filteredRentals.length === 0">No {{ status }} rentals</li>
    </ul>
</template>
