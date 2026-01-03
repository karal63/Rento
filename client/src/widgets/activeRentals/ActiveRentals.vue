<script setup lang="ts">
    import type { RentalWithCar } from '@/entities/rental';
    import { formatTimeLeft } from '@/shared/lib';
    import { Button } from '@/shared/ui';

    defineProps<{
        activeRentals: RentalWithCar[] | undefined;
    }>();
</script>

<template>
    <section class="bg-main-gray-bg rounded-md p-5 shadow-md">
        <div class="flex-between">
            <h2 class="font-semibold">Active rentals</h2>
            <RouterLink to="/admin/rentals">
                <Button size="sm" color="transparent" class="border border-main-lightgray">
                    View all
                </Button>
            </RouterLink>
        </div>
        <table class="mt-3 w-full">
            <thead>
                <tr class="text-sm text-main-gray">
                    <td class="py-1">Name</td>
                    <td class="py-1">Ends in</td>
                    <td class="py-1">Total price</td>
                    <td class="py-1">Status</td>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="rental in activeRentals"
                    :key="rental._id"
                    class="border-t border-main-border text-sm"
                >
                    <td class="py-4 w-1/2 font-semibold">{{ rental.carId.name }}</td>
                    <td class="py-4 w-[16%] font-semibold text-main-gray">
                        {{ formatTimeLeft(new Date(rental.rentTo)) }}
                    </td>
                    <td class="py-4 w-[16%] font-semibold text-main-gray">
                        {{ rental.totalPrice / 100 }}PLN
                    </td>
                    <td class="py-4 w-[16%] font-semibold text-green-600">{{ rental.status }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
