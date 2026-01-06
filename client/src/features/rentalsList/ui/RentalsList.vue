<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { cancelRental } from '@/features/cancelRental';
    import { useRentalStore, type RentalWithCar } from '@/entities/rental';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { useEditRentalStore } from '@/features/editRental';
    import { useI18n } from 'vue-i18n';

    const rentalsStrore = useRentalStore();
    const acceptanceModalStore = useAcceptanceModalStore();
    const editRentalStore = useEditRentalStore();
    const { t } = useI18n();

    const props = defineProps<{
        status: 'active' | 'pending' | 'complited';
    }>();

    const now = new Date();
    const loading = ref(false);

    const getClasses = computed(() => {
        if (props.status === 'active') {
            return 'border-green-500/20 bg-green-500/10 ';
        } else if (props.status === 'pending') {
            return 'border-yellow-500/20 bg-yellow-500/10';
        }

        return 'border-main-border bg-main-gray-bg';
    });

    onMounted(async () => {
        loading.value = true;
        await rentalsStrore.getRentals();
        loading.value = false;
    });

    const cancel = async (rental: RentalWithCar) => {
        acceptanceModalStore.open({
            title: 'Confirm cancellation',
            message: 'Are you sure you want to cancel this rental? This action cannot be undone.',
            onConfirm: () => cancelRental(rental),
        });
    };

    const edit = async (rental: RentalWithCar) => editRentalStore.open(rental);

    const checkIfActive = (rental: RentalWithCar) => {
        const newStart = new Date(rental.rentFrom);
        const newEnd = new Date(rental.rentTo);

        return now >= newStart && now <= newEnd && rental.status !== 'CANCELLED';
    };

    const checkIfPending = (rental: RentalWithCar) => {
        const newStart = new Date(rental.rentFrom);

        return now < newStart && rental.status !== 'CANCELLED';
    };

    const canChange = (rental: RentalWithCar) => {
        const newStart = new Date(rental.rentFrom);
        newStart.setDate(newStart.getDate() - 1);

        return now < newStart && rental.status !== 'CANCELLED';
    };

    const filteredRentals = computed(() => {
        return rentalsStrore.rentals
            .filter(rental => {
                return props.status === 'active'
                    ? checkIfActive(rental)
                    : props.status === 'pending'
                      ? checkIfPending(rental)
                      : !checkIfActive(rental) && !checkIfPending(rental);
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
                :class="getClasses"
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
                    class="flex gap-2 justify-end absolute md:right-5 md:top-1/2 md:translate-x-2 transition-all"
                >
                    <button
                        @click="edit(rental)"
                        class="p-3 md:p-2 rounded-md transition bg-main-border/40 md:bg-transparent hover:bg-main-border text-main-gray cursor-pointer"
                        title="Edit rental"
                    >
                        <Icon icon="iconoir:edit" class="text-xl md:text-2xl" />
                    </button>

                    <button
                        @click="cancel(rental)"
                        class="p-3 md:p-2 rounded-md bg-red-500/10 md:bg-transparent hover:bg-red-500/20 text-red-500 cursor-pointer"
                        title="Cancel rental"
                    >
                        <Icon icon="iconoir:trash" class="text-xl md:text-2xl" />
                    </button>
                </div>
            </div>
        </li>

        <li v-if="filteredRentals.length === 0">
            {{ t('app.rentals_page.no') }} {{ t(`app.rentals_page.${status}`) }}
            {{ t('app.rentals_page.rentals') }}
        </li>
    </ul>
</template>
