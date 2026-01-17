<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { RENTAL_STATUS, useRentalStore, type RentalWithCar } from '@/entities/rental';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { useEditRentalStore } from '@/features/editRental';
    import { useI18n } from 'vue-i18n';
    import { cancelRental } from '@/features/cancelRental';

    type RentalClass = {
        container: string;
        statusText: string;
    };

    const rentalsStore = useRentalStore();
    const acceptanceModalStore = useAcceptanceModalStore();
    const editRentalStore = useEditRentalStore();
    const { t } = useI18n();

    const props = defineProps<{
        status: 'active' | 'pending' | 'completed' | 'cancelled';
    }>();

    const now = new Date();
    const loading = ref(false);

    const getClasses = computed<RentalClass>(() => {
        if (props.status === 'active') {
            return {
                container: 'border-green-500/20 bg-green-500/10',
                statusText: 'text-green-500',
            };
        } else if (props.status === 'pending') {
            return {
                container: 'border-yellow-500/20 bg-yellow-500/10',
                statusText: 'text-yellow-500',
            };
        } else if (props.status === 'cancelled') {
            return {
                container: 'border-red-500/20 bg-red-500/10',
                statusText: 'text-red-500',
            };
        }

        return {
            container: 'border-main-border bg-main-gray-bg',
            statusText: 'text-main-gray',
        };
    });

    onMounted(async () => {
        loading.value = true;
        await rentalsStore.getRentals();
        loading.value = false;
    });

    const cancel = async (id: string) => {
        acceptanceModalStore.open({
            title: 'Confirm cancellation',
            message: 'Are you sure you want to cancel this rental? This action cannot be undone.',
            onConfirm: async () => {
                await cancelRental(id);
                rentalsStore.rentals = rentalsStore.rentals.map((rental: RentalWithCar) => {
                    if (rental._id === id) {
                        return {
                            ...rental,
                            status: RENTAL_STATUS.Cancelled,
                        };
                    }

                    return rental;
                });
            },
        });
    };

    const edit = async (rental: RentalWithCar) => editRentalStore.open(rental);

    const canChange = (rental: RentalWithCar) => {
        const newStart = new Date(rental.rentFrom);
        newStart.setDate(newStart.getDate() - 1);

        return now < newStart && rental.status === RENTAL_STATUS.Pending;
    };

    const filteredRentals = computed(() => {
        return rentalsStore.rentals
            .filter(rental => {
                if (props.status === 'active') return rental.status === RENTAL_STATUS.Active;
                if (props.status === 'pending') return rental.status === RENTAL_STATUS.Pending;
                if (props.status === 'completed') return rental.status === RENTAL_STATUS.Completed;
                if (props.status === 'cancelled') return rental.status === RENTAL_STATUS.Cancelled;
            })
            .sort((a: RentalWithCar, b: RentalWithCar) => b.createdAt - a.createdAt);
    });
</script>

<template>
    <ul class="flex-col gap-3">
        <li v-if="loading" class="flex-col gap-3">
            <div v-for="(_, i) in 4" :key="i" class="h-[100px] skeleton rounded-md"></div>
        </li>
        <li v-else v-for="rental in filteredRentals" :key="rental._id">
            <div
                class="group relative border rounded-md p-3 md:p-5 flex flex-col gap-3"
                :class="getClasses.container"
            >
                <!-- Main content -->
                <div class="md:flex md:flex-row md:items-center gap-4">
                    <!-- Image -->
                    <img
                        :src="rental.carId.image"
                        alt=""
                        class="w-full h-36 sm:h-52 object-cover rounded-md md:w-24 md:h-20"
                    />

                    <!-- Details -->
                    <div class="flex-1">
                        <h3 class="text-xl font-bold mt-2 md:mt-0 mb-1">
                            {{ rental.carId.name }}
                        </h3>

                        <div class="md:flex md:flex-row md:gap-8 gap-2 text-sm md:text-base">
                            <div>
                                <p class="flex gap-1">
                                    <span class="text-main-gray">
                                        {{ t('app.rentals_page.status') }}:
                                    </span>
                                    <span class="font-semibold" :class="getClasses.statusText">
                                        {{ t(`app.status.${rental.status}`) }}
                                    </span>
                                </p>

                                <p class="flex gap-1">
                                    <span class="text-main-gray">
                                        {{ t('app.rentals_page.period') }}:
                                    </span>
                                    <span>
                                        {{ new Date(rental.rentFrom).toLocaleDateString() }} -
                                        {{ new Date(rental.rentTo).toLocaleDateString() }}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p class="flex gap-1">
                                    <span class="text-main-gray">
                                        {{ t('app.rentals_page.total') }}:
                                    </span>
                                    <span class="font-semibold">
                                        {{ (rental.totalPrice / 100).toFixed(2) }} {{ t('app.zl') }}
                                    </span>
                                </p>

                                <p class="flex gap-1">
                                    <span class="text-main-gray">
                                        {{ t('app.rentals_page.pickup') }}:
                                    </span>
                                    <span>
                                        {{ rental.pickupLocation }} {{ t('app.rentals_page.at') }}
                                        {{ rental.pickupTime }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div
                    v-if="canChange(rental)"
                    class="flex gap-2 justify-end absolute right-5 bottom-3 md:bottom-5 translate-x-2 transition-all"
                >
                    <button
                        @click="edit(rental)"
                        class="p-3 md:p-2 rounded-md transition bg-main-border/40 md:bg-transparent hover:bg-main-border text-main-gray cursor-pointer"
                        title="Edit rental"
                    >
                        <Icon icon="iconoir:edit" class="text-xl md:text-2xl" />
                    </button>

                    <button
                        @click="cancel(rental._id)"
                        class="p-3 md:p-2 rounded-md bg-red-500/10 md:bg-transparent hover:bg-red-500/20 text-red-500 cursor-pointer"
                        title="Cancel rental"
                    >
                        <Icon icon="iconoir:trash" class="text-xl md:text-2xl" />
                    </button>
                </div>
            </div>
        </li>

        <li v-if="filteredRentals.length === 0" class="text-main-gray">
            {{ t('app.rentals_page.no') }} {{ t(`app.rentals_page.${status}`) }}
            {{ t('app.rentals_page.rentals') }}
        </li>
    </ul>
</template>
