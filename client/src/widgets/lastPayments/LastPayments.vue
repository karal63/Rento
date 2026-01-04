<script setup lang="ts">
    import type { Rental } from '@/entities/rental';
    import { Icon } from '@iconify/vue';

    defineProps<{
        lastPayments: Rental[] | undefined;
    }>();

    const getPaymentUI = (payment: Rental) => {
        const isConfirmed = payment.status === 'CONFIRMED';

        return {
            sign: isConfirmed ? '+' : '-',
            text: isConfirmed ? 'New rental' : 'New refund',
            icon: isConfirmed
                ? 'material-symbols-light:car-rental'
                : 'material-symbols-light:money-off',
            amountClass: isConfirmed ? 'text-green-500' : 'text-red-500',
        };
    };
</script>

<template>
    <section class="bg-main-gray-bg rounded-md p-5 shadow-md">
        <h2 class="font-semibold">Last payments</h2>

        <ul class="mt-5 flex-col gap-2">
            <li v-for="payment in lastPayments" :key="payment._id">
                <div class="font-semibold flex items-center gap-2">
                    <Icon :icon="getPaymentUI(payment).icon" class="text-3xl" />
                    <div class="text-sm font-semibold">
                        <div class="flex">
                            <p :class="getPaymentUI(payment).amountClass">
                                {{ getPaymentUI(payment).sign }}{{ payment.totalPrice / 100 }}PLN
                            </p>
                            <button class="ml-1 hover:text-primary transition cursor-pointer">
                                {{ getPaymentUI(payment).text }}
                            </button>
                        </div>
                        <p class="text-main-gray">
                            {{ new Date(payment.createdAt).toLocaleString() }}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>
